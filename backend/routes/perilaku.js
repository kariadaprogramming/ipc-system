const express = require('express');
const router = express.Router();
const { auth, checkInputAccess } = require('../middleware/auth');
const db = require('../config/database');

// Calculate points for perilaku
const calculatePerilakuPoints = (karakter) => {
    const points = {
        'kurang baik': 1,
        'cukup baik': 2,
        'baik': 3,
        'sangat baik': 4
    };
    
    return points[karakter.toLowerCase()] || 0;
};

// Get all perilaku (for approvals)
router.get('/all', auth, async (req, res) => {
    try {
        const [perilaku] = await db.query(`
            SELECT p.*, u.nama as user_name 
            FROM perilaku p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `);
        res.json(perilaku);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's perilaku
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const [perilaku] = await db.query(
            'SELECT * FROM perilaku WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [req.params.userId, 'approved']
        );
        res.json(perilaku);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create perilaku
router.post('/', auth, checkInputAccess('perilaku'), async (req, res) => {
    try {
        const { nama, nis, kelas, jurusan, grha, karakter_siswa } = req.body;
        
        const point = calculatePerilakuPoints(karakter_siswa);
        
        const [result] = await db.query(
            'INSERT INTO perilaku (user_id, nama, nis, kelas, jurusan, grha, karakter_siswa, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, nama, nis, kelas, jurusan, grha, karakter_siswa, point]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Submit Perilaku', `Submitted perilaku: ${karakter_siswa}`]
        );

        res.status(201).json({ message: 'Perilaku submitted for approval', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve perilaku
router.put('/:id/approve', auth, async (req, res) => {
    try {
        const perilakuId = req.params.id;
        
        const [perilaku] = await db.query('SELECT * FROM perilaku WHERE id = ?', [perilakuId]);
        if (perilaku.length === 0) {
            return res.status(404).json({ message: 'Perilaku not found' });
        }

        const perilakuData = perilaku[0];
        
        await db.query('UPDATE perilaku SET status = ? WHERE id = ?', ['approved', perilakuId]);
        
        const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [perilakuData.user_id]);
        const ipcSebelum = user[0].ipc_total;
        const ipcSesudah = ipcSebelum + perilakuData.point;
        
        await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipcSesudah, perilakuData.user_id]);
        
        await db.query(
            'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
            [perilakuData.user_id, 'perilaku', perilakuData.point, ipcSebelum, ipcSesudah, `Perilaku: ${perilakuData.karakter_siswa}`]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Approve Perilaku', `Approved perilaku ID ${perilakuId}`]
        );

        res.json({ message: 'Perilaku approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject perilaku
router.put('/:id/reject', auth, async (req, res) => {
    try {
        const { rejection_reason } = req.body;
        const perilakuId = req.params.id;
        
        await db.query('UPDATE perilaku SET status = ?, rejection_reason = ? WHERE id = ?', ['rejected', rejection_reason, perilakuId]);

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Reject Perilaku', `Rejected perilaku ID ${perilakuId}`]
        );

        res.json({ message: 'Perilaku rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
