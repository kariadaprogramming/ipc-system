const express = require('express');
const router = express.Router();
const { auth, checkInputAccess, superAdminOnly } = require('../middleware/auth');
const db = require('../config/database');
const {
    calculatePerilakuPoints,
    calculatePerilakuPointsFromFields,
    formatPerilakuKarakter
} = require('../constants/points');
const { resolveStudentIdByNis, applyIpcChange } = require('../utils/ipc');

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
        const {
            nama,
            nis,
            kelas,
            jurusan,
            grha,
            karakter_siswa,
            tanggung_jawab,
            disiplin,
            kepedulian,
            kemandirian,
            spiritual,
            kejujuran,
            kepercayaan_diri
        } = req.body;

        const userId = await resolveStudentIdByNis(nis, req.user.id);
        const karakter = karakter_siswa || formatPerilakuKarakter({
            tanggung_jawab,
            disiplin,
            kepedulian,
            kemandirian,
            spiritual,
            kejujuran,
            kepercayaan_diri
        });
        const point = karakter_siswa
            ? calculatePerilakuPoints(karakter_siswa)
            : calculatePerilakuPointsFromFields({
                tanggung_jawab,
                disiplin,
                kepedulian,
                kemandirian,
                spiritual,
                kejujuran,
                kepercayaan_diri
            });
        
        const [result] = await db.query(
            'INSERT INTO perilaku (user_id, nama, nis, kelas, jurusan, grha, karakter_siswa, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, nama, nis, kelas, jurusan, grha, karakter, point]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Submit Perilaku', `Submitted perilaku: ${karakter}`]
        );

        res.status(201).json({ message: 'Perilaku submitted for approval', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
});

// Approve perilaku
router.put('/:id/approve', auth, superAdminOnly, async (req, res) => {
    try {
        const perilakuId = req.params.id;
        
        const [perilaku] = await db.query(
            'SELECT * FROM perilaku WHERE id = ? AND status = ?',
            [perilakuId, 'pending']
        );
        if (perilaku.length === 0) {
            return res.status(404).json({ message: 'Perilaku not found or already processed' });
        }

        const perilakuData = perilaku[0];
        
        await db.query(
            'UPDATE perilaku SET status = ? WHERE id = ? AND status = ?',
            ['approved', perilakuId, 'pending']
        );
        
        await applyIpcChange(
            perilakuData.user_id,
            'perilaku',
            perilakuData.point,
            `Perilaku: ${perilakuData.karakter_siswa}`
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
router.put('/:id/reject', auth, superAdminOnly, async (req, res) => {
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
