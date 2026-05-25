const express = require('express');
const router = express.Router();
const { auth, superAdminOnly } = require('../middleware/auth');
const db = require('../config/database');

// Get all permissions
router.get('/', auth, superAdminOnly, async (req, res) => {
    try {
        const [permissions] = await db.query(`
            SELECT p.*, u.nama, u.nis, u.nip, u.role 
            FROM permissions p 
            JOIN users u ON p.user_id = u.id
        `);
        res.json(permissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user permissions
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const [permissions] = await db.query(
            'SELECT * FROM permissions WHERE user_id = ?',
            [req.params.userId]
        );
        
        if (permissions.length === 0) {
            return res.json({
                can_input_prestasi: false,
                can_input_organisasi: false,
                can_input_event: false,
                can_input_pelanggaran: false,
                can_input_perilaku: false,
                can_view_all_data: false
            });
        }
        
        res.json(permissions[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user permissions
router.put('/user/:userId', auth, superAdminOnly, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { can_input_prestasi, can_input_organisasi, can_input_event, can_input_pelanggaran, can_input_perilaku, can_view_all_data } = req.body;

        await db.query(
            'UPDATE permissions SET can_input_prestasi = ?, can_input_organisasi = ?, can_input_event = ?, can_input_pelanggaran = ?, can_input_perilaku = ?, can_view_all_data = ? WHERE user_id = ?',
            [can_input_prestasi, can_input_organisasi, can_input_event, can_input_pelanggaran, can_input_perilaku, can_view_all_data, userId]
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Update Permissions', `Updated permissions for user ID ${userId}`]
        );

        res.json({ message: 'Permissions updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Set permissions for all students (bulk)
router.post('/bulk-students', auth, superAdminOnly, async (req, res) => {
    try {
        const { can_input_prestasi, can_input_organisasi, can_input_event, can_input_pelanggaran, can_input_perilaku } = req.body;

        await db.query(
            `UPDATE permissions p 
             JOIN users u ON p.user_id = u.id 
             SET p.can_input_prestasi = ?, 
                 p.can_input_organisasi = ?, 
                 p.can_input_event = ?, 
                 p.can_input_pelanggaran = ?, 
                 p.can_input_perilaku = ? 
             WHERE u.role = 'siswa'`,
            [can_input_prestasi, can_input_organisasi, can_input_event, can_input_pelanggaran, can_input_perilaku]
        );

        // Log activity
        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Bulk Update Permissions', 'Updated permissions for all students']
        );

        res.json({ message: 'Bulk permissions updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
