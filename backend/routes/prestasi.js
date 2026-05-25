const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const db = require('../config/database');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/prestasi/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Calculate points for prestasi
const calculatePrestasiPoints = (juara, kategori) => {
    const points = {
        'juara 1': { kecamatan: 8, kabupaten: 12, provinsi: 30, nasional: 40, internasional: 50 },
        'juara 2': { kecamatan: 7, kabupaten: 10, provinsi: 25, nasional: 35, internasional: 45 },
        'juara 3': { kecamatan: 6, kabupaten: 8, provinsi: 20, nasional: 30, internasional: 40 },
        'juara harapan 1': { kecamatan: 5, kabupaten: 7, provinsi: 15, nasional: 25, internasional: 35 },
        'juara harapan 2': { kecamatan: 4, kabupaten: 6, provinsi: 12, nasional: 20, internasional: 30 },
        'juara harapan 3': { kecamatan: 3, kabupaten: 5, provinsi: 10, nasional: 15, internasional: 25 },
        'finalis': { kecamatan: 2, kabupaten: 4, provinsi: 8, nasional: 10, internasional: 20 },
        'peserta': { kecamatan: 1, kabupaten: 3, provinsi: 5, nasional: 8, internasional: 15 }
    };
    
    return points[juara][kategori] || 0;
};

// Get all prestasi (for approvals)
router.get('/all', auth, async (req, res) => {
    try {
        const [prestasi] = await db.query(`
            SELECT p.*, u.nama as user_name 
            FROM prestasi p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `);
        res.json(prestasi);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all teachers (for pembina dropdown)
router.get('/teachers', auth, async (req, res) => {
    try {
        const [teachers] = await db.query(
            'SELECT id, nama, nip FROM users WHERE role = ? ORDER BY nama ASC',
            ['guru']
        );
        res.json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's prestasi
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const [prestasi] = await db.query(
            'SELECT * FROM prestasi WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [req.params.userId, 'approved']
        );
        res.json(prestasi);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create prestasi
router.post('/', auth, upload.single('foto'), async (req, res) => {
    try {
        const { nama, nis, jenis, nama_lomba, jurusan, kelas, pembina, grha, juara, kategori } = req.body;
        const foto = req.file ? req.file.filename : null;
        
        const point = calculatePrestasiPoints(juara, kategori);
        
        const [result] = await db.query(
            'INSERT INTO prestasi (user_id, nama, nis, jenis, nama_lomba, jurusan, foto, kelas, pembina, grha, juara, kategori, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, nama, nis, jenis, nama_lomba, jurusan, foto, kelas, pembina, grha, juara, kategori, point]
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Submit Prestasi', `Submitted prestasi: ${nama_lomba}`]
        );

        res.status(201).json({ message: 'Prestasi submitted for approval', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve prestasi
router.put('/:id/approve', auth, async (req, res) => {
    try {
        const prestasiId = req.params.id;
        
        const [prestasi] = await db.query('SELECT * FROM prestasi WHERE id = ?', [prestasiId]);
        if (prestasi.length === 0) {
            return res.status(404).json({ message: 'Prestasi not found' });
        }

        const prestasiData = prestasi[0];
        
        // Update status
        await db.query('UPDATE prestasi SET status = ? WHERE id = ?', ['approved', prestasiId]);
        
        // Update user IPC
        const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [prestasiData.user_id]);
        const ipcSebelum = user[0].ipc_total;
        const ipcSesudah = ipcSebelum + prestasiData.point;
        
        await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipcSesudah, prestasiData.user_id]);
        
        // Log IPC history
        await db.query(
            'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
            [prestasiData.user_id, 'prestasi', prestasiData.point, ipcSebelum, ipcSesudah, `Prestasi: ${prestasiData.nama_lomba}`]
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Approve Prestasi', `Approved prestasi ID ${prestasiId}`]
        );

        res.json({ message: 'Prestasi approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject prestasi
router.put('/:id/reject', auth, async (req, res) => {
    try {
        const { rejection_reason } = req.body;
        const prestasiId = req.params.id;
        
        await db.query('UPDATE prestasi SET status = ?, rejection_reason = ? WHERE id = ?', ['rejected', rejection_reason, prestasiId]);

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Reject Prestasi', `Rejected prestasi ID ${prestasiId}`]
        );

        res.json({ message: 'Prestasi rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
