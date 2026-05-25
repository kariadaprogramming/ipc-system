const express = require('express');
const router = express.Router();
const { auth, checkInputAccess } = require('../middleware/auth');
const db = require('../config/database');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pelanggaran/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Calculate points deduction for pelanggaran
const calculatePelanggaranPoints = (jenis) => {
    const points = {
        'ringan': 1,
        'sedang': 5,
        'berat': 25
    };
    
    return points[jenis.toLowerCase()] || 0;
};

// Get all pelanggaran (for approvals)
router.get('/all', auth, async (req, res) => {
    try {
        const [pelanggaran] = await db.query(`
            SELECT p.*, u.nama as user_name 
            FROM pelanggaran p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `);
        res.json(pelanggaran);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's pelanggaran
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const [pelanggaran] = await db.query(
            'SELECT * FROM pelanggaran WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [req.params.userId, 'approved']
        );
        res.json(pelanggaran);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create pelanggaran
router.post('/', auth, checkInputAccess('pelanggaran'), upload.single('foto'), async (req, res) => {
    try {
        const { nama, nis, kelas, jurusan, grha, keterangan, jenis_pelanggaran } = req.body;
        const foto = req.file ? req.file.filename : null;
        
        const point_dikurangi = calculatePelanggaranPoints(jenis_pelanggaran);
        
        const [result] = await db.query(
            'INSERT INTO pelanggaran (user_id, nama, nis, kelas, jurusan, grha, keterangan, foto, jenis_pelanggaran, point_dikurangi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, nama, nis, kelas, jurusan, grha, keterangan, foto, jenis_pelanggaran, point_dikurangi]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Submit Pelanggaran', `Submitted pelanggaran: ${jenis_pelanggaran}`]
        );

        res.status(201).json({ message: 'Pelanggaran submitted for approval', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve pelanggaran
router.put('/:id/approve', auth, async (req, res) => {
    try {
        const pelanggaranId = req.params.id;
        
        const [pelanggaran] = await db.query('SELECT * FROM pelanggaran WHERE id = ?', [pelanggaranId]);
        if (pelanggaran.length === 0) {
            return res.status(404).json({ message: 'Pelanggaran not found' });
        }

        const pelanggaranData = pelanggaran[0];
        
        await db.query('UPDATE pelanggaran SET status = ? WHERE id = ?', ['approved', pelanggaranId]);
        
        const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [pelanggaranData.user_id]);
        const ipcSebelum = user[0].ipc_total;
        const ipcSesudah = ipcSebelum - pelanggaranData.point_dikurangi;
        
        await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipcSesudah, pelanggaranData.user_id]);
        
        await db.query(
            'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
            [pelanggaranData.user_id, 'pelanggaran', -pelanggaranData.point_dikurangi, ipcSebelum, ipcSesudah, `Pelanggaran: ${pelanggaranData.jenis_pelanggaran}`]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Approve Pelanggaran', `Approved pelanggaran ID ${pelanggaranId}`]
        );

        res.json({ message: 'Pelanggaran approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject pelanggaran
router.put('/:id/reject', auth, async (req, res) => {
    try {
        const { rejection_reason } = req.body;
        const pelanggaranId = req.params.id;
        
        await db.query('UPDATE pelanggaran SET status = ?, rejection_reason = ? WHERE id = ?', ['rejected', rejection_reason, pelanggaranId]);

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Reject Pelanggaran', `Rejected pelanggaran ID ${pelanggaranId}`]
        );

        res.json({ message: 'Pelanggaran rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
