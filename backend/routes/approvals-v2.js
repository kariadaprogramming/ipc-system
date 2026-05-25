const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, superAdminOnly, teacherOrSuperAdmin, checkInputAccess } = require('../middleware/auth');
const db = require('../config/database');
const { uploadToDrive, extractFolderId } = require('../config/google-drive');
const { uploadToPersonalDrive, isAuthenticated } = require('../config/google-drive-oauth');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/approvals';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Helper function to upload to Drive (OAuth first, then Service Account fallback)
const uploadPhotoToDrive = async (filePath, fileName, folderId, mimeType) => {
  // Try OAuth first (personal Drive)
  if (isAuthenticated()) {
    try {
      console.log('Using OAuth (Personal Drive) for upload');
      const result = await uploadToPersonalDrive(filePath, fileName, folderId, mimeType);
      return { ...result, method: 'oauth' };
    } catch (oauthError) {
      console.log('OAuth upload failed, trying Service Account:', oauthError.message);
    }
  }
  
  // Fallback to Service Account
  console.log('Using Service Account for upload');
  const result = await uploadToDrive(filePath, fileName, folderId, mimeType);
  return { ...result, method: 'service_account' };
};

// ==================== SUBMIT FOR APPROVAL ====================

// Helper function to calculate prestasi points
const calculatePrestasiPoints = (juara, kategori) => {
    const points = {
        'juara 1': { 'kecamatan': 15, 'kabupaten': 20, 'provinsi': 30, 'nasional': 50, 'internasional': 100 },
        'juara 2': { 'kecamatan': 12, 'kabupaten': 17, 'provinsi': 27, 'nasional': 45, 'internasional': 90 },
        'juara 3': { 'kecamatan': 10, 'kabupaten': 15, 'provinsi': 25, 'nasional': 40, 'internasional': 80 },
        'juara harapan 1': { 'kecamatan': 8, 'kabupaten': 12, 'provinsi': 20, 'nasional': 35, 'internasional': 70 },
        'juara harapan 2': { 'kecamatan': 6, 'kabupaten': 10, 'provinsi': 18, 'nasional': 30, 'internasional': 60 },
        'juara harapan 3': { 'kecamatan': 5, 'kabupaten': 8, 'provinsi': 15, 'nasional': 25, 'internasional': 50 },
        'finalis': { 'kecamatan': 4, 'kabupaten': 6, 'provinsi': 12, 'nasional': 20, 'internasional': 40 },
        'peserta': { 'kecamatan': 3, 'kabupaten': 5, 'provinsi': 10, 'nasional': 15, 'internasional': 30 }
    };
    return points[juara]?.[kategori] || 0;
};

// Submit Prestasi for Approval (or Direct Submit for Superadmin)
router.post('/prestasi/submit', auth, checkInputAccess('prestasi'), upload.single('foto'), async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { nama, nis, jenis, nama_lomba, jurusan, kelas, pembina, grha, juara, kategori } = req.body;
        let fotoPath = req.file ? req.file.path : null;
        let driveLink = null;
        
        // Upload to Google Drive if file exists (optional - skip if Drive not configured)
        if (req.file) {
            try {
                console.log('Prestasi - Checking Drive configuration...');
                const [driveConfig] = await db.query('SELECT drive_url FROM drive_links WHERE type = ?', ['prestasi']);
                console.log('Prestasi - Drive config:', driveConfig);
                
                const folderId = driveConfig.length > 0 ? extractFolderId(driveConfig[0].drive_url) : null;
                console.log('Prestasi - Extracted folder ID:', folderId);
                
                if (folderId) {
                    console.log('Prestasi - Uploading to Drive...');
                    // Format: Nama_NIS_foto.jpg untuk memudahkan pencarian
                    const fileExt = req.file.originalname.includes('.') ? req.file.originalname.substring(req.file.originalname.lastIndexOf('.')) : '.jpg';
                    const descriptiveFileName = `${nama}_${nis}_foto${fileExt}`;
                    console.log('Prestasi - File will be named:', descriptiveFileName, '(original:', req.file.originalname, ')');
                    const uploadResult = await uploadPhotoToDrive(
                        req.file.path,
                        descriptiveFileName,
                        folderId,
                        req.file.mimetype
                    );
                    driveLink = uploadResult.webViewLink;
                    console.log('Prestasi - Uploaded to Drive:', driveLink, 'Method:', uploadResult.method, 'File:', descriptiveFileName);
                    
                    // Delete local file after upload
                    fs.unlinkSync(req.file.path);
                    fotoPath = driveLink; // Save Drive link instead of local path
                } else {
                    console.log('Prestasi - Drive not configured, using local storage');
                    // Keep local file, but save relative URL path instead of full path
                    const relativePath = path.join('/uploads/approvals', path.basename(req.file.path));
                    fotoPath = relativePath.replace(/\\/g, '/'); // Convert backslashes to forward slashes
                    console.log('Prestasi - Using local path:', fotoPath);
                }
            } catch (driveError) {
                console.error('Prestasi - Drive upload error:', driveError);
                // Continue with local file if Drive upload fails
                const relativePath = path.join('/uploads/approvals', path.basename(req.file.path));
                fotoPath = relativePath.replace(/\\/g, '/');
                console.log('Prestasi - Using local path (fallback):', fotoPath);
            }
        }
        
        // SUPERADMIN: Direct submit to main table
        if (userRole === 'superadmin') {
            console.log('Prestasi - Superadmin direct submission');
            const point = calculatePrestasiPoints(juara, kategori);
            
            const [result] = await db.query(
                `INSERT INTO prestasi 
                (user_id, nama, nis, jenis, nama_lomba, jurusan, kelas, pembina, grha, juara, kategori, foto, point, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
                [userId, nama, nis, jenis, nama_lomba, jurusan, kelas, pembina, grha, juara, kategori, fotoPath, point]
            );
            
            // Add to IPC History
            await db.query(
                `INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, keterangan, created_by) 
                 VALUES (?, 'prestasi', ?, ?, ?)`,
                [userId, point, `Prestasi: ${nama_lomba} - ${juara} ${kategori}`, userId]
            );
            
            console.log('Prestasi - Directly added by superadmin:', result.insertId);
            
            return res.status(201).json({ 
                message: 'Prestasi berhasil ditambahkan', 
                id: result.insertId 
            });
        }
        
        // SISWA/GURU: Submit for approval
        // Find pembina user ID
        const [pembinaUser] = await db.query('SELECT id FROM users WHERE nama = ? AND role = "guru" LIMIT 1', [pembina]);
        const pembinaId = pembinaUser.length > 0 ? pembinaUser[0].id : null;
        console.log('Prestasi - Pembina found:', pembinaId, 'for pembina name:', pembina);
        
        const [result] = await db.query(
            `INSERT INTO prestasi_approvals 
            (user_id, nama, nis, jenis, nama_lomba, jurusan, kelas, pembina, grha, juara, kategori, foto_path, pembina_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, nama, nis, jenis, nama_lomba, jurusan, kelas, pembina, grha, juara, kategori, fotoPath, pembinaId]
        );
        
        // Create notification for pembina
        if (pembinaId) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approval_needed', 'Persetujuan Prestasi', ?, ?, 'prestasi')`,
                [pembinaId, `${nama} (${nis}) mengajukan prestasi: ${nama_lomba}`, result.insertId]
            );
            console.log('Prestasi - Notification sent to pembina:', pembinaId);
        } else {
            console.log('Prestasi - No pembina found, notification not sent to pembina');
        }
        
        // Create notification for superadmin
        const [superadmins] = await db.query('SELECT id FROM users WHERE role = "superadmin"');
        console.log('Prestasi - Superadmins found:', superadmins.length);
        for (const admin of superadmins) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'new_submission', 'Pengajuan Prestasi Baru', ?, ?, 'prestasi')`,
                [admin.id, `${nama} (${nis}) mengajukan prestasi: ${nama_lomba}`, result.insertId]
            );
            console.log('Prestasi - Notification sent to superadmin:', admin.id);
        }
        
        res.status(201).json({ 
            message: 'Prestasi berhasil diajukan untuk persetujuan', 
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Helper function to calculate event points
const calculateEventPoints = (tingkat) => {
    const points = {
        'sekolah': 2,
        'kecamatan': 4,
        'kabupaten': 6,
        'provinsi': 8,
        'nasional': 10,
        'internasional': 12
    };
    return points[tingkat] || 0;
};

// Submit Event for Approval (or Direct Submit for Superadmin)
router.post('/event/submit', auth, checkInputAccess('event'), upload.single('foto'), async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { nama, nis, kelas, grha, jurusan, pembina, nama_event, tingkat } = req.body;
        let foto_path = req.file ? req.file.filename : null;
        
        // Upload to Google Drive if file exists
        if (req.file) {
            try {
                console.log('Event - Checking Drive configuration...');
                const [driveConfig] = await db.query('SELECT drive_url FROM drive_links WHERE type = ?', ['event']);
                console.log('Event - Drive config:', driveConfig);
                
                const folderId = driveConfig.length > 0 ? extractFolderId(driveConfig[0].drive_url) : null;
                console.log('Event - Extracted folder ID:', folderId);
                
                if (folderId) {
                    console.log('Event - Uploading to Drive...');
                    // Format: Nama_NIS_foto.jpg untuk memudahkan pencarian
                    const fileExt = req.file.originalname.includes('.') ? req.file.originalname.substring(req.file.originalname.lastIndexOf('.')) : '.jpg';
                    const descriptiveFileName = `${nama}_${nis}_foto${fileExt}`;
                    console.log('Event - File will be named:', descriptiveFileName, '(original:', req.file.originalname, ')');
                    const uploadResult = await uploadPhotoToDrive(
                        req.file.path,
                        descriptiveFileName,
                        folderId,
                        req.file.mimetype
                    );
                    console.log('Event - Uploaded to Drive:', uploadResult.webViewLink, 'Method:', uploadResult.method, 'File:', descriptiveFileName);
                    
                    // Delete local file after upload
                    fs.unlinkSync(req.file.path);
                    foto_path = uploadResult.webViewLink; // Save Drive link instead of local path
                } else {
                    console.log('Event - Drive not configured, using local storage');
                    // Keep local file, but save relative URL path instead of full path
                    const relativePath = path.join('/uploads/approvals', path.basename(req.file.path));
                    foto_path = relativePath.replace(/\\/g, '/');
                    console.log('Event - Using local path:', foto_path);
                }
            } catch (driveError) {
                console.error('Event - Drive upload error:', driveError);
                // Continue with local file if Drive upload fails
                const relativePath = path.join('/uploads/approvals', path.basename(req.file.path));
                foto_path = relativePath.replace(/\\/g, '/');
                console.log('Event - Using local path (fallback):', foto_path);
            }
        }
        
        // SUPERADMIN: Direct submit to main table
        if (userRole === 'superadmin') {
            console.log('Event - Superadmin direct submission');
            const point = calculateEventPoints(tingkat);
            
            const [result] = await db.query(
                `INSERT INTO event 
                (user_id, nama, nis, kelas, grha, jurusan, nama_event, tingkat, foto, point, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
                [userId, nama, nis, kelas, grha, jurusan, nama_event, tingkat, foto_path, point]
            );
            
            // Add to IPC History
            await db.query(
                `INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, keterangan, created_by) 
                 VALUES (?, 'event', ?, ?, ?)`,
                [userId, point, `Event: ${nama_event} - ${tingkat}`, userId]
            );
            
            console.log('Event - Directly added by superadmin:', result.insertId);
            
            return res.status(201).json({ 
                message: 'Event berhasil ditambahkan', 
                id: result.insertId 
            });
        }
        
        // SISWA/GURU: Submit for approval
        const [pembinaUser] = await db.query('SELECT id FROM users WHERE nama = ? AND role = "guru" LIMIT 1', [pembina]);
        const pembinaId = pembinaUser.length > 0 ? pembinaUser[0].id : null;
        console.log('Event - Pembina found:', pembinaId, 'for pembina name:', pembina);
        
        const [result] = await db.query(
            `INSERT INTO event_approvals 
            (user_id, nama, nis, kelas, grha, jurusan, pembina, nama_event, tingkat, foto_path, pembina_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, nama, nis, kelas, grha, jurusan, pembina, nama_event, tingkat, foto_path, pembinaId]
        );
        
        if (pembinaId) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approval_needed', 'Persetujuan Event', ?, ?, 'event')`,
                [pembinaId, `${nama} (${nis}) mengajukan event: ${nama_event}`, result.insertId]
            );
            console.log('Event - Notification sent to pembina:', pembinaId);
        } else {
            console.log('Event - No pembina found, notification not sent to pembina');
        }
        
        const [superadmins] = await db.query('SELECT id FROM users WHERE role = "superadmin"');
        console.log('Event - Superadmins found:', superadmins.length);
        for (const admin of superadmins) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'new_submission', 'Pengajuan Event Baru', ?, ?, 'event')`,
                [admin.id, `${nama} (${nis}) mengajukan event: ${nama_event}`, result.insertId]
            );
            console.log('Event - Notification sent to superadmin:', admin.id);
        }
        
        res.status(201).json({ 
            message: 'Event berhasil diajukan untuk persetujuan', 
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Helper function to calculate organisasi points
const calculateOrganisasiPoints = (jabatan) => {
    const points = {
        'ketua': 6,
        'wakil ketua': 5,
        'sekretaris': 4,
        'bendahara': 3,
        'koordinator': 2,
        'anggota': 1
    };
    return points[jabatan] || 0;
};

// Submit Organisasi for Approval (or Direct Submit for Superadmin)
router.post('/organisasi/submit', auth, checkInputAccess('organisasi'), upload.single('foto'), async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { nama, nis, kelas, grha, jurusan, pembina, jabatan_organisasi, kategori_organisasi } = req.body;
        let foto_path = req.file ? req.file.filename : null;
        
        // Upload to Google Drive if file exists
        if (req.file) {
            try {
                console.log('Organisasi - Checking Drive configuration...');
                const [driveConfig] = await db.query('SELECT drive_url FROM drive_links WHERE type = ?', ['organisasi']);
                console.log('Organisasi - Drive config:', driveConfig);
                
                const folderId = driveConfig.length > 0 ? extractFolderId(driveConfig[0].drive_url) : null;
                console.log('Organisasi - Extracted folder ID:', folderId);
                
                if (folderId) {
                    console.log('Organisasi - Uploading to Drive...');
                    // Format: Nama_NIS_foto.jpg untuk memudahkan pencarian
                    const fileExt = req.file.originalname.includes('.') ? req.file.originalname.substring(req.file.originalname.lastIndexOf('.')) : '.jpg';
                    const descriptiveFileName = `${nama}_${nis}_foto${fileExt}`;
                    console.log('Organisasi - File will be named:', descriptiveFileName, '(original:', req.file.originalname, ')');
                    const uploadResult = await uploadPhotoToDrive(
                        req.file.path,
                        descriptiveFileName,
                        folderId,
                        req.file.mimetype
                    );
                    console.log('Organisasi - Uploaded to Drive:', uploadResult.webViewLink, 'Method:', uploadResult.method, 'File:', descriptiveFileName);
                    
                    // Delete local file after upload
                    fs.unlinkSync(req.file.path);
                    foto_path = uploadResult.webViewLink; // Save Drive link instead of local path
                } else {
                    console.log('Organisasi - Drive not configured, using local storage');
                    // Keep local file, but save relative URL path instead of full path
                    const relativePath = path.join('/uploads/approvals', path.basename(req.file.path));
                    foto_path = relativePath.replace(/\\/g, '/');
                    console.log('Organisasi - Using local path:', foto_path);
                }
            } catch (driveError) {
                console.error('Organisasi - Drive upload error:', driveError);
                // Continue with local file if Drive upload fails
                const relativePath = path.join('/uploads/approvals', path.basename(req.file.path));
                foto_path = relativePath.replace(/\\/g, '/');
                console.log('Organisasi - Using local path (fallback):', foto_path);
            }
        }
        
        // SUPERADMIN: Direct submit to main table
        if (userRole === 'superadmin') {
            console.log('Organisasi - Superadmin direct submission');
            const point = calculateOrganisasiPoints(jabatan_organisasi);
            
            const [result] = await db.query(
                `INSERT INTO organisasi 
                (user_id, nama, nis, kelas, grha, jurusan, jabatan_organisasi, foto, kategori_organisasi, point, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
                [userId, nama, nis, kelas, grha, jurusan, jabatan_organisasi, foto_path, kategori_organisasi, point]
            );
            
            // Add to IPC History
            await db.query(
                `INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, keterangan, created_by) 
                 VALUES (?, 'organisasi', ?, ?, ?)`,
                [userId, point, `Organisasi: ${kategori_organisasi} - ${jabatan_organisasi}`, userId]
            );
            
            console.log('Organisasi - Directly added by superadmin:', result.insertId);
            
            return res.status(201).json({ 
                message: 'Organisasi berhasil ditambahkan', 
                id: result.insertId 
            });
        }
        
        // SISWA/GURU: Submit for approval
        const [pembinaUser] = await db.query('SELECT id FROM users WHERE nama = ? AND role = "guru" LIMIT 1', [pembina]);
        const pembinaId = pembinaUser.length > 0 ? pembinaUser[0].id : null;
        console.log('Pembina found:', pembinaId, 'for pembina name:', pembina);
        
        const [result] = await db.query(
            `INSERT INTO organisasi_approvals 
            (user_id, nama, nis, kelas, grha, jurusan, pembina, jabatan_organisasi, kategori_organisasi, foto_path, pembina_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, nama, nis, kelas, grha, jurusan, pembina, jabatan_organisasi, kategori_organisasi, foto_path, pembinaId]
        );
        
        if (pembinaId) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approval_needed', 'Persetujuan Organisasi', ?, ?, 'organisasi')`,
                [pembinaId, `${nama} (${nis}) mengajukan organisasi: ${kategori_organisasi}`, result.insertId]
            );
            console.log('Notification sent to pembina:', pembinaId);
        } else {
            console.log('No pembina found, notification not sent to pembina');
        }
        
        const [superadmins] = await db.query('SELECT id FROM users WHERE role = "superadmin"');
        console.log('Superadmins found:', superadmins.length);
        for (const admin of superadmins) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'new_submission', 'Pengajuan Organisasi Baru', ?, ?, 'organisasi')`,
                [admin.id, `${nama} (${nis}) mengajukan organisasi: ${kategori_organisasi}`, result.insertId]
            );
            console.log('Notification sent to superadmin:', admin.id);
        }
        
        res.status(201).json({ 
            message: 'Organisasi berhasil diajukan untuk persetujuan', 
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit Siswa for Approval (by Guru)
router.post('/siswa/submit', auth, teacherOrSuperAdmin, async (req, res) => {
    try {
        const createdBy = req.user.id;
        const { nama, nis, nisn, kelas, jurusan, grha, password } = req.body;
        
        const hashedPassword = bcrypt.hashSync(password, 10);
        const ipcAwal = 80;
        
        const [result] = await db.query(
            `INSERT INTO siswa_approvals 
            (user_id, nama, nis, nisn, kelas, jurusan, grha, password_hash, ipc_awal, created_by) 
            VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nama, nis, nisn, kelas, jurusan, grha, hashedPassword, ipcAwal, createdBy]
        );
        
        // Notify superadmin
        const [superadmins] = await db.query('SELECT id FROM users WHERE role = "superadmin"');
        for (const admin of superadmins) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approval_needed', 'Persetujuan Akun Siswa Baru', ?, ?, 'siswa')`,
                [admin.id, `Guru mengajukan pembuatan akun siswa: ${nama} (${nis})`, result.insertId]
            );
        }
        
        res.status(201).json({ 
            message: 'Akun siswa berhasil diajukan untuk persetujuan SuperAdmin', 
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== APPROVAL ACTIONS ====================

// Pembina Approve/Reject
router.put('/pembina/:type/:id', auth, teacherOrSuperAdmin, async (req, res) => {
    try {
        const { type, id } = req.params;
        const { status, notes } = req.body;
        const pembinaId = req.user.id;
        
        let table, points, pointType;
        switch(type) {
            case 'prestasi':
                table = 'prestasi_approvals';
                points = { 'juara 1': 20, 'juara 2': 15, 'juara 3': 10 };
                break;
            case 'event':
                table = 'event_approvals';
                points = { 'sekolah': 2, 'kecamatan': 4, 'kabupaten': 6, 'provinsi': 8, 'nasional': 10, 'internasional': 12 };
                break;
            case 'organisasi':
                table = 'organisasi_approvals';
                points = { 'ketua': 6, 'wakil ketua': 5, 'sekretaris': 4, 'bendahara': 3, 'koordinator': 2, 'anggota': 1 };
                break;
            default:
                return res.status(400).json({ message: 'Invalid type' });
        }
        
        if (status === 'approved') {
            await db.query(
                `UPDATE ${table} SET pembina_status = 'approved', pembina_approved_at = NOW(), pembina_notes = ?, pembina_id = ? WHERE id = ?`,
                [notes || 'Disetujui oleh pembina', pembinaId, id]
            );
            
            // Notify student
            const [submission] = await db.query(`SELECT user_id, nama, ${type === 'organisasi' ? 'kategori_organisasi, jabatan_organisasi' : type === 'prestasi' ? 'nama_lomba, juara' : 'nama_event, tingkat'} FROM ${table} WHERE id = ?`, [id]);
            if (submission.length > 0) {
                await db.query(
                    `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                     VALUES (?, 'pembina_approved', 'Persetujuan Pembina', ?, ?, ?)`,
                    [submission[0].user_id, `Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin`, id, type]
                );
                
                // Notify all SuperAdmins
                const detailField = type === 'organisasi' ? submission[0].kategori_organisasi : type === 'prestasi' ? submission[0].nama_lomba : submission[0].nama_event;
                const [superadmins] = await db.query('SELECT id FROM users WHERE role = "superadmin"');
                for (const admin of superadmins) {
                    await db.query(
                        `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                         VALUES (?, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', ?, ?, ?)`,
                        [admin.id, `Pengajuan ${type} dari ${submission[0].nama} telah disetujui oleh Pembina dan menunggu persetujuan Anda: ${detailField}`, id, type]
                    );
                }
            }
        } else {
            await db.query(
                `UPDATE ${table} SET pembina_status = 'rejected', pembina_notes = ?, pembina_id = ? WHERE id = ?`,
                [notes || 'Ditolak oleh pembina', pembinaId, id]
            );
            
            // Notify student of rejection
            const [submission] = await db.query(`SELECT user_id, nama FROM ${table} WHERE id = ?`, [id]);
            if (submission.length > 0) {
                await db.query(
                    `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                     VALUES (?, 'rejected', 'Pengajuan Ditolak', ?, ?, ?)`,
                    [submission[0].user_id, `Pengajuan Anda ditolak oleh Pembina: ${notes || 'Tidak ada alasan'}`, id, type]
                );
            }
        }
        
        res.json({ message: `Pengajuan ${type} ${status === 'approved' ? 'disetujui' : 'ditolak'} oleh Pembina` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// SuperAdmin Final Approve/Reject
router.put('/superadmin/:type/:id', auth, superAdminOnly, async (req, res) => {
    try {
        const { type, id } = req.params;
        const { status, notes } = req.body;
        
        console.log(`SuperAdmin ${status} request: type=${type}, id=${id}`);
        
        if (type === 'siswa') {
            return handleSiswaApproval(id, status, notes, res);
        }
        
        let table, targetTable, points, pointField, pointType;
        switch(type) {
            case 'prestasi':
                table = 'prestasi_approvals';
                targetTable = 'prestasi';
                points = { 'juara 1': 20, 'juara 2': 15, 'juara 3': 10 };
                pointField = 'juara';
                pointType = 'Prestasi';
                break;
            case 'event':
                table = 'event_approvals';
                targetTable = 'event';
                points = { 'sekolah': 2, 'kecamatan': 4, 'kabupaten': 6, 'provinsi': 8, 'nasional': 10, 'internasional': 12 };
                pointField = 'tingkat';
                pointType = 'Event';
                break;
            case 'organisasi':
                table = 'organisasi_approvals';
                targetTable = 'organisasi';
                points = { 'ketua': 6, 'wakil ketua': 5, 'sekretaris': 4, 'bendahara': 3, 'koordinator': 2, 'anggota': 1 };
                pointField = 'jabatan_organisasi';
                pointType = 'Organisasi';
                break;
            default:
                return res.status(400).json({ message: 'Invalid type' });
        }
        
        // Get submission data
        const [data] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        if (data.length === 0) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        
        console.log('Submission data:', data[0]);
        
        if (status === 'approved') {
            // Get submission data
            const [submission] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
            if (submission.length === 0) {
                return res.status(404).json({ message: 'Submission not found' });
            }
            
            const data = submission[0];
            console.log('Approving data:', data);
            
            // Check if pembina already approved
            if (data.pembina_status !== 'approved') {
                return res.status(400).json({ message: 'Belum disetujui oleh Pembina' });
            }
            
            // Calculate points
            const pointChange = points[data[pointField]] || 0;
            
            // Insert to actual table
            let insertQuery, insertParams;
            if (type === 'prestasi') {
                insertQuery = `INSERT INTO prestasi (user_id, nama, nis, jenis, nama_lomba, jurusan, kelas, pembina, grha, juara, kategori, foto, point, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`;
                insertParams = [data.user_id, data.nama || 'Unknown', data.nis || '', data.jenis || 'akademik', data.nama_lomba || '', data.jurusan || '', data.kelas || '', data.pembina || '', data.grha || '', data.juara || '', data.kategori || '', data.foto_path || null, pointChange];
            } else if (type === 'event') {
                insertQuery = `INSERT INTO event (user_id, nama, nis, kelas, grha, jurusan, nama_event, tingkat, foto, point, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`;
                insertParams = [data.user_id, data.nama || 'Unknown', data.nis || '', data.kelas || '', data.grha || '', data.jurusan || '', data.nama_event || '', data.tingkat || '', data.foto_path || null, pointChange];
            } else {
                insertQuery = `INSERT INTO organisasi (user_id, nama, nis, kelas, grha, jurusan, jabatan_organisasi, kategori_organisasi, foto, point, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`;
                insertParams = [data.user_id, data.nama || 'Unknown', data.nis || '', data.kelas || '', data.grha || '', data.jurusan || '', data.jabatan_organisasi || '', data.kategori_organisasi || '', data.foto_path || null, pointChange];
            }
            
            await db.query(insertQuery, insertParams);
            
            // Update IPC
            const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [data.user_id]);
            if (user.length > 0) {
                const ipcSebelum = user[0].ipc_total;
                const ipcBaru = ipcSebelum + pointChange;
                await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipcBaru, data.user_id]);
                
                // Log IPC history
                await db.query(
                    `INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) 
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [data.user_id, type, pointChange, ipcSebelum, ipcBaru, `Poin dari ${pointType}: ${data[pointField]}`]
                );
            }
            
            // Update approval status
            await db.query(
                `UPDATE ${table} SET superadmin_status = 'approved', superadmin_approved_at = NOW(), superadmin_notes = ? WHERE id = ?`,
                [notes || 'Disetujui oleh SuperAdmin', id]
            );
            
            // Notify student
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approved', 'Pengajuan Disetujui', ?, ?, ?)`,
                [data.user_id, `Selamat! Pengajuan ${pointType} Anda telah disetujui dan poin telah ditambahkan.`, id, type]
            );
            
        } else {
            // Reject
            await db.query(
                `UPDATE ${table} SET superadmin_status = 'rejected', superadmin_notes = ? WHERE id = ?`,
                [notes || 'Ditolak oleh SuperAdmin', id]
            );
            
            const [submission] = await db.query(`SELECT user_id FROM ${table} WHERE id = ?`, [id]);
            if (submission.length > 0) {
                await db.query(
                    `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                     VALUES (?, 'rejected', 'Pengajuan Ditolak', ?, ?, ?)`,
                    [submission[0].user_id, `Pengajuan Anda ditolak oleh SuperAdmin: ${notes || 'Tidak ada alasan'}`, id, type]
                );
            }
        }
        
        res.json({ message: `Pengajuan ${type} ${status === 'approved' ? 'disetujui' : 'ditolak'} oleh SuperAdmin` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Handle Siswa Approval
async function handleSiswaApproval(id, status, notes, res) {
    try {
        const [submission] = await db.query('SELECT * FROM siswa_approvals WHERE id = ?', [id]);
        if (submission.length === 0) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        
        const data = submission[0];
        
        if (status === 'approved') {
            // Check for duplicate
            const [existing] = await db.query('SELECT id FROM users WHERE nis = ? OR nisn = ?', [data.nis, data.nisn]);
            if (existing.length > 0) {
                return res.status(400).json({ message: 'NIS or NISN already exists' });
            }
            
            // Create user
            const [result] = await db.query(
                `INSERT INTO users (nama, nis, nisn, password, role, kelas, jurusan, grha, ipc_total, ipc_awal) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.nama, data.nis, data.nisn, data.password_hash, 'siswa', data.kelas, data.jurusan, data.grha, data.ipc_awal, data.ipc_awal]
            );
            
            // Create permissions
            await db.query('INSERT INTO permissions (user_id) VALUES (?)', [result.insertId]);
            
            // Log IPC history
            await db.query(
                `INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [result.insertId, 'initial', data.ipc_awal, 0, data.ipc_awal, 'IPC awal diberikan']
            );
            
            // Update approval
            await db.query(
                `UPDATE siswa_approvals SET user_id = ?, superadmin_status = 'approved', superadmin_approved_at = NOW(), superadmin_notes = ? WHERE id = ?`,
                [result.insertId, notes || 'Disetujui oleh SuperAdmin', id]
            );
            
            // Notify guru who created
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approved', 'Akun Siswa Disetujui', ?, ?, 'siswa')`,
                [data.created_by, `Akun siswa ${data.nama} (${data.nis}) telah disetujui dan dibuat.`, id]
            );
            
        } else {
            await db.query(
                `UPDATE siswa_approvals SET superadmin_status = 'rejected', superadmin_notes = ? WHERE id = ?`,
                [notes || 'Ditolak oleh SuperAdmin', id]
            );
            
            // Notify guru who created
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'rejected', 'Akun Siswa Ditolak', ?, ?, 'siswa')`,
                [data.created_by, `Pembuatan akun siswa ${data.nama} (${data.nis}) ditolak: ${notes || 'Tidak ada alasan'}`, id]
            );
        }
        
        res.json({ message: `Pengajuan siswa ${status === 'approved' ? 'disetujui' : 'ditolak'}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// ==================== GET APPROVALS ====================

// Get all approvals for SuperAdmin
router.get('/all', auth, superAdminOnly, async (req, res) => {
    try {
        const [prestasi] = await db.query(`
            SELECT p.*, u.nama as user_name, pembina.nama as pembina_name, pembina.foto as pembina_foto
            FROM prestasi_approvals p
            JOIN users u ON p.user_id = u.id
            LEFT JOIN users pembina ON p.pembina_id = pembina.id
            WHERE p.superadmin_status = 'pending'
        `);
        
        const [event] = await db.query(`
            SELECT e.*, u.nama as user_name, pembina.nama as pembina_name, pembina.foto as pembina_foto
            FROM event_approvals e
            JOIN users u ON e.user_id = u.id
            LEFT JOIN users pembina ON e.pembina_id = pembina.id
            WHERE e.superadmin_status = 'pending'
        `);
        
        const [organisasi] = await db.query(`
            SELECT o.*, u.nama as user_name, pembina.nama as pembina_name, pembina.foto as pembina_foto
            FROM organisasi_approvals o
            JOIN users u ON o.user_id = u.id
            LEFT JOIN users pembina ON o.pembina_id = pembina.id
            WHERE o.superadmin_status = 'pending'
        `);
        
        const [siswa] = await db.query(`
            SELECT s.*, creator.nama as created_by_name
            FROM siswa_approvals s
            JOIN users creator ON s.created_by = creator.id
            WHERE s.superadmin_status = 'pending'
        `);
        
        res.json({
            prestasi: prestasi.map(p => ({ ...p, type: 'prestasi' })),
            event: event.map(e => ({ ...e, type: 'event' })),
            organisasi: organisasi.map(o => ({ ...o, type: 'organisasi' })),
            siswa: siswa.map(s => ({ ...s, type: 'siswa' }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get approvals for Pembina (Guru)
router.get('/pembina', auth, teacherOrSuperAdmin, async (req, res) => {
    try {
        const pembinaId = req.user.id;
        
        const [prestasi] = await db.query(`
            SELECT p.*, u.nama as user_name, u.foto as user_foto
            FROM prestasi_approvals p
            JOIN users u ON p.user_id = u.id
            WHERE p.pembina_id = ? AND p.pembina_status = 'pending'
        `, [pembinaId]);
        
        const [event] = await db.query(`
            SELECT e.*, u.nama as user_name, u.foto as user_foto
            FROM event_approvals e
            JOIN users u ON e.user_id = u.id
            WHERE e.pembina_id = ? AND e.pembina_status = 'pending'
        `, [pembinaId]);
        
        const [organisasi] = await db.query(`
            SELECT o.*, u.nama as user_name, u.foto as user_foto
            FROM organisasi_approvals o
            JOIN users u ON o.user_id = u.id
            WHERE o.pembina_id = ? AND o.pembina_status = 'pending'
        `, [pembinaId]);
        
        res.json({
            prestasi: prestasi.map(p => ({ ...p, type: 'prestasi' })),
            event: event.map(e => ({ ...e, type: 'event' })),
            organisasi: organisasi.map(o => ({ ...o, type: 'organisasi' }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's submissions
router.get('/user-submissions', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [prestasi] = await db.query(`
            SELECT *, 'prestasi' as type FROM prestasi_approvals WHERE user_id = ? ORDER BY created_at DESC
        `, [userId]);
        
        const [event] = await db.query(`
            SELECT *, 'event' as type FROM event_approvals WHERE user_id = ? ORDER BY created_at DESC
        `, [userId]);
        
        const [organisasi] = await db.query(`
            SELECT *, 'organisasi' as type FROM organisasi_approvals WHERE user_id = ? ORDER BY created_at DESC
        `, [userId]);
        
        res.json({
            prestasi,
            event,
            organisasi
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== NOTIFICATIONS ====================

// Get unread notifications count
router.get('/notifications/count', auth, async (req, res) => {
    try {
        const [result] = await db.query(
            'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
            [req.user.id]
        );
        res.json({ count: result[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all notifications
router.get('/notifications', auth, async (req, res) => {
    try {
        const [notifications] = await db.query(
            `SELECT n.*, 
                CASE 
                    WHEN n.related_type = 'prestasi' THEN (SELECT nama_lomba FROM prestasi_approvals WHERE id = n.related_id)
                    WHEN n.related_type = 'event' THEN (SELECT nama_event FROM event_approvals WHERE id = n.related_id)
                    WHEN n.related_type = 'organisasi' THEN (SELECT kategori_organisasi FROM organisasi_approvals WHERE id = n.related_id)
                    WHEN n.related_type = 'siswa' THEN (SELECT nama FROM siswa_approvals WHERE id = n.related_id)
                END as detail_name
             FROM notifications n 
             WHERE n.user_id = ? 
             ORDER BY n.created_at DESC 
             LIMIT 50`,
            [req.user.id]
        );
        
        // Mark as read
        await db.query(
            'UPDATE notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
            [req.user.id]
        );
        
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
