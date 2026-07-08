const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { auth, superAdminOnly, teacherOrSuperAdmin } = require('../middleware/auth');
const db = require('../config/database');

// Get student data by NIS (for auto-fill in input forms) - MUST BE BEFORE /:id
router.get('/nis/:nis', auth, async (req, res) => {
    try {
        console.log('Fetching student by NIS:', req.params.nis);
        const [users] = await db.query(
            'SELECT id, nama, nis, nisn, kelas, jurusan, grha FROM users WHERE nis = ? AND role = ?',
            [req.params.nis, 'siswa']
        );
        
        console.log('Found students:', users.length);
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }
        
        res.json(users[0]);
    } catch (error) {
        console.error('Error fetching student by NIS:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users (Superadmin and Teacher)
router.get('/', auth, teacherOrSuperAdmin, async (req, res) => {
    try {
        // If guru, only return students
        if (req.user.role === 'guru') {
            const [users] = await db.query('SELECT id, nama, nis, nisn, nip, role, kelas, jurusan, grha, wali_kelas, ipc_total, created_at FROM users WHERE role = ?', ['siswa']);
            return res.json(users);
        }
        // If superadmin, return all users
        const [users] = await db.query('SELECT id, nama, nis, nisn, nip, role, kelas, jurusan, grha, wali_kelas, ipc_total, created_at FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users (Superadmin and Teacher)
router.get('/biodata-approvals', auth, superAdminOnly, async (req, res) => {
    try {
        const [approvals] = await db.query(
            `SELECT b.*, u.nama as student_name, u.nis as student_nis, 
                    requester.nama as requested_by_name
             FROM biodata_update_approvals b
             JOIN users u ON b.user_id = u.id
             JOIN users requester ON b.requested_by = requester.id
             WHERE b.superadmin_status = 'pending'
             ORDER BY b.created_at DESC`
        );
        res.json(approvals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get student creation approvals for SuperAdmin - MUST BE BEFORE /:id
router.get('/student-creation-approvals', auth, superAdminOnly, async (req, res) => {
    try {
        const [approvals] = await db.query(
            `SELECT s.*, requester.nama as requested_by_name
             FROM student_creation_approvals s
             JOIN users requester ON s.requested_by = requester.id
             WHERE s.superadmin_status = 'pending'
             ORDER BY s.created_at DESC`
        );
        res.json(approvals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, nama, nis, nisn, nip, role, kelas, jurusan, grha, wali_kelas, ipc_total, alamat, no_hp, jabatan, created_at FROM users WHERE id = ?',
            [req.params.id]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(users[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create student account (Superadmin creates directly, Guru needs approval)
router.post('/create-student', auth, teacherOrSuperAdmin, async (req, res) => {
    try {
        const { nama, nis, nisn, kelas, jurusan, password, wali_kelas, grha } = req.body;

        // Check for duplicate in users table
        const [existing] = await db.query(
            'SELECT id FROM users WHERE nis = ? OR nisn = ?',
            [nis, nisn]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'NIS or NISN already exists' });
        }

        // Check for duplicate in pending approvals
        const [existingApproval] = await db.query(
            'SELECT id FROM student_creation_approvals WHERE (nis = ? OR nisn = ?) AND superadmin_status = "pending"',
            [nis, nisn]
        );

        if (existingApproval.length > 0) {
            return res.status(400).json({ message: 'NIS or NISN sedang dalam proses approval' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        // If SuperAdmin, create directly
        if (req.user.role === 'superadmin') {
            const ipc_awal = 80;
            const [result] = await db.query(
                'INSERT INTO users (nama, nis, nisn, password, role, kelas, jurusan, wali_kelas, grha, ipc_total, ipc_awal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nama, nis, nisn, hashedPassword, 'siswa', kelas, jurusan, wali_kelas, grha, ipc_awal, ipc_awal]
            );

            // Create default permissions
            await db.query(
                'INSERT INTO permissions (user_id) VALUES (?)',
                [result.insertId]
            );

            // Log IPC history
            await db.query(
                'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
                [result.insertId, 'initial', ipc_awal, 0, ipc_awal, 'IPC awal diberikan']
            );

            // Log activity
            await db.query(
                'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
                [req.user.id, 'Create Student', `Created student account for ${nama} (${nis})`]
            );

            return res.status(201).json({ message: 'Akun siswa berhasil dibuat!' });
        }

        // If Guru, create approval request
        const [result] = await db.query(
            'INSERT INTO student_creation_approvals (nama, nis, nisn, kelas, jurusan, grha, password, requested_by, superadmin_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "pending")',
            [nama, nis, nisn, kelas, jurusan, grha, hashedPassword, req.user.id]
        );

        // Notify superadmin
        const [superadmins] = await db.query('SELECT id FROM users WHERE role = "superadmin"');
        for (const admin of superadmins) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approval_needed', 'Persetujuan Pembuatan Akun Siswa', ?, ?, 'student_creation')`,
                [admin.id, `Guru mengajukan pembuatan akun siswa: ${nama} (${nis})`, result.insertId]
            );
        }

        res.status(201).json({ message: 'Permintaan pembuatan akun siswa berhasil diajukan, menunggu persetujuan SuperAdmin!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create teacher account
router.post('/create-teacher', auth, superAdminOnly, async (req, res) => {
    try {
        const { nama, nip, password, jabatan, alamat, no_hp, wali_kelas } = req.body;

        // Check for duplicate
        const [existing] = await db.query(
            'SELECT id FROM users WHERE nip = ?',
            [nip]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'NIP already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (nama, nip, password, role, jabatan, alamat, no_hp, wali_kelas, ipc_total, ipc_awal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nama, nip, hashedPassword, 'guru', jabatan, alamat, no_hp, wali_kelas, 0, 0]
        );

        // Create default permissions
        await db.query(
            'INSERT INTO permissions (user_id) VALUES (?)',
            [result.insertId]
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Create Teacher', `Created teacher account for ${nama} (${nip})`]
        );

        res.status(201).json({ message: 'Teacher account created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user
router.put('/:id', auth, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const currentUser = req.user;

        // Check permissions
        if (currentUser.role !== 'superadmin' && currentUser.id !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Teachers can only edit their own biodata, not superadmin
        if (currentUser.role === 'guru') {
            const [targetUser] = await db.query('SELECT role FROM users WHERE id = ?', [userId]);
            if (targetUser.length > 0 && targetUser[0].role === 'superadmin') {
                return res.status(403).json({ message: 'Cannot edit superadmin account' });
            }
        }

        const { nama, alamat, no_hp, jabatan } = req.body;
        
        await db.query(
            'UPDATE users SET nama = ?, alamat = ?, no_hp = ?, jabatan = ? WHERE id = ?',
            [nama, alamat, no_hp, jabatan, userId]
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [currentUser.id, 'Update User', `Updated user ID ${userId}`]
        );

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user
router.delete('/:id', auth, superAdminOnly, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Prevent deleting superadmin
        const [user] = await db.query('SELECT role FROM users WHERE id = ?', [userId]);
        if (user.length > 0 && user[0].role === 'superadmin') {
            return res.status(403).json({ message: 'Cannot delete superadmin account' });
        }

        await db.query('DELETE FROM users WHERE id = ?', [userId]);

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Delete User', `Deleted user ID ${userId}`]
        );

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update student IPC (Superadmin only)
router.put('/:id/ipc', auth, superAdminOnly, async (req, res) => {
    try {
        const { ipc_total } = req.body;
        const userId = parseInt(req.params.id);

        const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const ipcSebelum = user[0].ipc_total;
        const pointChange = ipc_total - ipcSebelum;

        await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipc_total, userId]);

        // Log IPC history
        await db.query(
            'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, 'manual', pointChange, ipcSebelum, ipc_total, 'Manual adjustment by superadmin']
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Update IPC', `Updated IPC for user ID ${userId} to ${ipc_total}`]
        );

        res.json({ message: 'IPC updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Request biodata update (Guru only - needs SuperAdmin approval)
router.post('/:id/biodata-request', auth, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const requestedBy = req.user.id;
        const { nama, nis, nisn, kelas, jurusan, grha } = req.body;
        
        // Only guru can request biodata updates
        if (req.user.role !== 'guru') {
            return res.status(403).json({ message: 'Only teachers can request biodata updates' });
        }
        
        // Get current student data
        const [student] = await db.query(
            'SELECT nama, nis, nisn, kelas, jurusan, grha FROM users WHERE id = ? AND role = ?',
            [userId, 'siswa']
        );
        
        if (student.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        const current = student[0];
        
        // Create approval request
        const [result] = await db.query(
            `INSERT INTO biodata_update_approvals 
            (user_id, nama_baru, nis_baru, nisn_baru, kelas_baru, jurusan_baru, grha_baru,
             nama_lama, nis_lama, nisn_lama, kelas_lama, jurusan_lama, grha_lama, requested_by,
             pembina_status, superadmin_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')`,
            [userId, nama, nis, nisn, kelas, jurusan, grha,
             current.nama, current.nis, current.nisn, current.kelas, current.jurusan, current.grha,
             requestedBy]
        );
        
        // Notify superadmin
        const [superadmins] = await db.query('SELECT id FROM users WHERE role = "superadmin"');
        for (const admin of superadmins) {
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approval_needed', 'Persetujuan Update Biodata', ?, ?, 'biodata')`,
                [admin.id, `Guru mengajukan perubahan biodata untuk siswa: ${current.nama} (${current.nis})`, result.insertId]
            );
        }
        
        res.json({ message: 'Permintaan update biodata berhasil diajukan, menunggu persetujuan SuperAdmin' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve/Reject biodata update (SuperAdmin only)
router.put('/biodata-approvals/:id', auth, superAdminOnly, async (req, res) => {
    try {
        const approvalId = parseInt(req.params.id);
        const { status, notes } = req.body;
        
        // Get approval data
        const [approval] = await db.query(
            'SELECT * FROM biodata_update_approvals WHERE id = ?',
            [approvalId]
        );
        
        if (approval.length === 0) {
            return res.status(404).json({ message: 'Approval request not found' });
        }
        
        const data = approval[0];
        
        if (status === 'approved') {
            // Update student data with new biodata
            await db.query(
                'UPDATE users SET nama = ?, nis = ?, nisn = ?, kelas = ?, jurusan = ?, grha = ? WHERE id = ?',
                [data.nama_baru, data.nis_baru, data.nisn_baru, data.kelas_baru, data.jurusan_baru, data.grha_baru, data.user_id]
            );
            
            // Update approval status
            await db.query(
                'UPDATE biodata_update_approvals SET superadmin_status = ?, superadmin_notes = ?, superadmin_approved_at = NOW() WHERE id = ?',
                ['approved', notes || 'Disetujui oleh SuperAdmin', approvalId]
            );
            
            // Notify student
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approved', 'Biodata Diperbarui', ?, ?, 'biodata')`,
                [data.user_id, 'Biodata Anda telah berhasil diperbarui oleh SuperAdmin.', approvalId]
            );
            
            res.json({ message: 'Biodata siswa berhasil diupdate' });
        } else {
            // Reject
            await db.query(
                'UPDATE biodata_update_approvals SET superadmin_status = ?, superadmin_notes = ? WHERE id = ?',
                ['rejected', notes || 'Ditolak oleh SuperAdmin', approvalId]
            );
            
            // Notify student
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'rejected', 'Pengajuan Update Biodata Ditolak', ?, ?, 'biodata')`,
                [data.user_id, `Pengajuan update biodata ditolak: ${notes || 'Tidak ada alasan'}`, approvalId]
            );
            
            res.json({ message: 'Pengajuan update biodata ditolak' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update biodata directly (Superadmin only - no approval needed)
router.put('/:id/biodata', auth, superAdminOnly, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { nama, nis, nisn, kelas, jurusan, grha, nip, jabatan, alamat, no_hp } = req.body;
        
        // Get user current data
        const [user] = await db.query('SELECT role FROM users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const role = user[0].role;
        
        if (role === 'siswa') {
            // Update siswa biodata
            await db.query(
                'UPDATE users SET nama = ?, nis = ?, nisn = ?, kelas = ?, jurusan = ?, grha = ? WHERE id = ?',
                [nama, nis, nisn, kelas, jurusan, grha, userId]
            );
        } else if (role === 'guru') {
            // Update guru biodata
            await db.query(
                'UPDATE users SET nama = ?, nip = ?, jabatan = ?, alamat = ?, no_hp = ? WHERE id = ?',
                [nama, nip, jabatan, alamat, no_hp, userId]
            );
        }
        
        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Update Biodata', `Updated biodata for ${role} ID ${userId}`]
        );
        
        res.json({ message: 'Biodata updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve/Reject student creation (SuperAdmin only)
router.put('/student-creation-approvals/:id', auth, superAdminOnly, async (req, res) => {
    try {
        const approvalId = parseInt(req.params.id);
        const { status, notes } = req.body;
        
        // Get approval data
        const [approval] = await db.query(
            'SELECT * FROM student_creation_approvals WHERE id = ?',
            [approvalId]
        );
        
        if (approval.length === 0) {
            return res.status(404).json({ message: 'Approval request not found' });
        }
        
        const data = approval[0];
        
        if (status === 'approved') {
            // Create student account
            const ipc_awal = 80;
            const [result] = await db.query(
                'INSERT INTO users (nama, nis, nisn, password, role, kelas, jurusan, grha, ipc_total, ipc_awal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [data.nama, data.nis, data.nisn, data.password, 'siswa', data.kelas, data.jurusan, data.grha, ipc_awal, ipc_awal]
            );
            
            // Create default permissions
            await db.query(
                'INSERT INTO permissions (user_id) VALUES (?)',
                [result.insertId]
            );
            
            // Log IPC history
            await db.query(
                'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
                [result.insertId, 'initial', ipc_awal, 0, ipc_awal, 'IPC awal diberikan']
            );
            
            // Update approval status
            await db.query(
                'UPDATE student_creation_approvals SET superadmin_status = ?, superadmin_notes = ?, superadmin_approved_at = NOW() WHERE id = ?',
                ['approved', notes || 'Disetujui oleh SuperAdmin', approvalId]
            );
            
            // Notify the requesting teacher
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'approved', 'Pembuatan Akun Siswa Disetujui', ?, ?, 'student_creation')`,
                [data.requested_by, `Pembuatan akun siswa ${data.nama} (${data.nis}) telah disetujui oleh SuperAdmin.`, approvalId]
            );
            
            res.json({ message: 'Akun siswa berhasil dibuat!' });
        } else {
            // Reject
            await db.query(
                'UPDATE student_creation_approvals SET superadmin_status = ?, superadmin_notes = ? WHERE id = ?',
                ['rejected', notes || 'Ditolak oleh SuperAdmin', approvalId]
            );
            
            // Notify the requesting teacher
            await db.query(
                `INSERT INTO notifications (user_id, type, title, message, related_id, related_type) 
                 VALUES (?, 'rejected', 'Pembuatan Akun Siswa Ditolak', ?, ?, 'student_creation')`,
                [data.requested_by, `Pembuatan akun siswa ${data.nama} (${data.nis}) ditolak: ${notes || 'Tidak ada alasan'}`, approvalId]
            );
            
            res.json({ message: 'Pengajuan pembuatan akun siswa ditolak' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
