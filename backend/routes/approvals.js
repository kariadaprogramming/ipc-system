const express = require('express');
const router = express.Router();
const { auth, superAdminOnly } = require('../middleware/auth');
const db = require('../config/database');

// Get all pending approvals
router.get('/pending', auth, superAdminOnly, async (req, res) => {
    try {
        const [prestasi] = await db.query(`
            SELECT p.*, 'prestasi' as type, u.nama as user_name 
            FROM prestasi p 
            JOIN users u ON p.user_id = u.id 
            WHERE p.status = 'pending'
        `);
        
        const [organisasi] = await db.query(`
            SELECT o.*, 'organisasi' as type, u.nama as user_name 
            FROM organisasi o 
            JOIN users u ON o.user_id = u.id 
            WHERE o.status = 'pending'
        `);
        
        const [event] = await db.query(`
            SELECT e.*, 'event' as type, u.nama as user_name 
            FROM event e 
            JOIN users u ON e.user_id = u.id 
            WHERE e.status = 'pending'
        `);
        
        const [pelanggaran] = await db.query(`
            SELECT p.*, 'pelanggaran' as type, u.nama as user_name 
            FROM pelanggaran p 
            JOIN users u ON p.user_id = u.id 
            WHERE p.status = 'pending'
        `);
        
        const [perilaku] = await db.query(`
            SELECT p.*, 'perilaku' as type, u.nama as user_name 
            FROM perilaku p 
            JOIN users u ON p.user_id = u.id 
            WHERE p.status = 'pending'
        `);

        const allApprovals = [
            ...prestasi.map(p => ({ ...p, type: 'prestasi' })),
            ...organisasi.map(o => ({ ...o, type: 'organisasi' })),
            ...event.map(e => ({ ...e, type: 'event' })),
            ...pelanggaran.map(p => ({ ...p, type: 'pelanggaran' })),
            ...perilaku.map(p => ({ ...p, type: 'perilaku' }))
        ];

        res.json(allApprovals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's pending submissions
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const [prestasi] = await db.query(`
            SELECT p.*, 'prestasi' as type 
            FROM prestasi p 
            WHERE p.user_id = ? AND p.status = 'pending'
        `, [userId]);
        
        const [organisasi] = await db.query(`
            SELECT o.*, 'organisasi' as type 
            FROM organisasi o 
            WHERE o.user_id = ? AND o.status = 'pending'
        `, [userId]);
        
        const [event] = await db.query(`
            SELECT e.*, 'event' as type 
            FROM event e 
            WHERE e.user_id = ? AND e.status = 'pending'
        `, [userId]);
        
        const [pelanggaran] = await db.query(`
            SELECT p.*, 'pelanggaran' as type 
            FROM pelanggaran p 
            WHERE p.user_id = ? AND p.status = 'pending'
        `, [userId]);
        
        const [perilaku] = await db.query(`
            SELECT p.*, 'perilaku' as type 
            FROM perilaku p 
            WHERE p.user_id = ? AND p.status = 'pending'
        `, [userId]);

        const allSubmissions = [
            ...prestasi.map(p => ({ ...p, type: 'prestasi' })),
            ...organisasi.map(o => ({ ...o, type: 'organisasi' })),
            ...event.map(e => ({ ...e, type: 'event' })),
            ...pelanggaran.map(p => ({ ...p, type: 'pelanggaran' })),
            ...perilaku.map(p => ({ ...p, type: 'perilaku' }))
        ];

        res.json(allSubmissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
