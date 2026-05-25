const express = require('express');
const router = express.Router();
const { auth, superAdminOnly } = require('../middleware/auth');
const db = require('../config/database');

// Get all drive links (SuperAdmin only)
router.get('/', auth, superAdminOnly, async (req, res) => {
    try {
        const [links] = await db.query('SELECT * FROM drive_links ORDER BY type');
        res.json(links);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get drive link by type (SuperAdmin only)
router.get('/:type', auth, superAdminOnly, async (req, res) => {
    try {
        const validTypes = ['prestasi', 'event', 'organisasi', 'pelanggaran', 'perilaku'];
        if (!validTypes.includes(req.params.type)) {
            return res.status(400).json({ message: 'Invalid drive type' });
        }

        const [links] = await db.query('SELECT * FROM drive_links WHERE type = ?', [req.params.type]);
        
        if (links.length === 0) {
            return res.status(404).json({ message: 'Drive link not found' });
        }
        
        res.json(links[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update drive link (SuperAdmin only)
router.put('/:type', auth, superAdminOnly, async (req, res) => {
    try {
        const validTypes = ['prestasi', 'event', 'organisasi', 'pelanggaran', 'perilaku'];
        if (!validTypes.includes(req.params.type)) {
            return res.status(400).json({ message: 'Invalid drive type' });
        }

        const { drive_url } = req.body;
        
        if (!drive_url) {
            return res.status(400).json({ message: 'Drive URL is required' });
        }

        await db.query(
            'UPDATE drive_links SET drive_url = ? WHERE type = ?',
            [drive_url, req.params.type]
        );

        const [updated] = await db.query('SELECT * FROM drive_links WHERE type = ?', [req.params.type]);
        res.json(updated[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
