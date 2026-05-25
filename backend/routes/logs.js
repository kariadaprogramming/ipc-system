const express = require('express');
const router = express.Router();
const { auth, superAdminOnly } = require('../middleware/auth');
const db = require('../config/database');

// Get all activity logs
router.get('/', auth, superAdminOnly, async (req, res) => {
    try {
        const [logs] = await db.query(`
            SELECT al.*, u.nama, u.role 
            FROM activity_logs al 
            JOIN users u ON al.user_id = u.id 
            ORDER BY al.created_at DESC 
            LIMIT 100
        `);
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get logs by user
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const [logs] = await db.query(
            'SELECT * FROM activity_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
            [req.params.userId]
        );
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
