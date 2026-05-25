const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const db = require('../config/database');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/organisasi/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Calculate points for organisasi
const calculateOrganisasiPoints = (jabatan) => {
    const points = {
        'ketua': 6,
        'wakil ketua': 5,
        'sekretaris': 4,
        'bendahara': 3,
        'koordinator': 2,
        'anggota': 1
    };
    
    return points[jabatan.toLowerCase()] || 0;
};

// Get all organisasi (for approvals)
router.get('/all', auth, async (req, res) => {
    try {
        const [organisasi] = await db.query(`
            SELECT o.*, u.nama as user_name 
            FROM organisasi o 
            JOIN users u ON o.user_id = u.id 
            ORDER BY o.created_at DESC
        `);
        res.json(organisasi);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's organisasi
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const [organisasi] = await db.query(
            'SELECT * FROM organisasi WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [req.params.userId, 'approved']
        );
        res.json(organisasi);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create organisasi
router.post('/', auth, upload.single('foto'), async (req, res) => {
    try {
        const { nama, nis, kelas, grha, jurusan, jabatan_organisasi, kategori_organisasi } = req.body;
        const foto = req.file ? req.file.filename : null;
        
        const point = calculateOrganisasiPoints(jabatan_organisasi);
        
        const [result] = await db.query(
            'INSERT INTO organisasi (user_id, nama, nis, kelas, grha, jurusan, jabatan_organisasi, foto, kategori_organisasi, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, nama, nis, kelas, grha, jurusan, jabatan_organisasi, foto, kategori_organisasi, point]
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Submit Organisasi', `Submitted organisasi: ${jabatan_organisasi}`]
        );

        res.status(201).json({ message: 'Organisasi submitted for approval', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve organisasi
router.put('/:id/approve', auth, async (req, res) => {
    try {
        const organisasiId = req.params.id;
        
        const [organisasi] = await db.query('SELECT * FROM organisasi WHERE id = ?', [organisasiId]);
        if (organisasi.length === 0) {
            return res.status(404).json({ message: 'Organisasi not found' });
        }

        const organisasiData = organisasi[0];
        
        await db.query('UPDATE organisasi SET status = ? WHERE id = ?', ['approved', organisasiId]);
        
        const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [organisasiData.user_id]);
        const ipcSebelum = user[0].ipc_total;
        const ipcSesudah = ipcSebelum + organisasiData.point;
        
        await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipcSesudah, organisasiData.user_id]);
        
        await db.query(
            'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
            [organisasiData.user_id, 'organisasi', organisasiData.point, ipcSebelum, ipcSesudah, `Organisasi: ${organisasiData.jabatan_organisasi}`]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Approve Organisasi', `Approved organisasi ID ${organisasiId}`]
        );

        res.json({ message: 'Organisasi approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject organisasi
router.put('/:id/reject', auth, async (req, res) => {
    try {
        const { rejection_reason } = req.body;
        const organisasiId = req.params.id;
        
        await db.query('UPDATE organisasi SET status = ?, rejection_reason = ? WHERE id = ?', ['rejected', rejection_reason, organisasiId]);

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Reject Organisasi', `Rejected organisasi ID ${organisasiId}`]
        );

        res.json({ message: 'Organisasi rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
