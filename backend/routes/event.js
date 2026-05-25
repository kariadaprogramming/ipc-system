const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const db = require('../config/database');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/event/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Calculate points for event
const calculateEventPoints = (tingkat) => {
    const points = {
        'sekolah': 2,
        'kecamatan': 4,
        'kabupaten': 6,
        'provinsi': 8,
        'nasional': 10,
        'internasional': 12
    };
    
    return points[tingkat.toLowerCase()] || 0;
};

// Get all event (for approvals)
router.get('/all', auth, async (req, res) => {
    try {
        const [events] = await db.query(`
            SELECT e.*, u.nama as user_name 
            FROM event e 
            JOIN users u ON e.user_id = u.id 
            ORDER BY e.created_at DESC
        `);
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's event
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const [events] = await db.query(
            'SELECT * FROM event WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [req.params.userId, 'approved']
        );
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create event
router.post('/', auth, upload.single('foto'), async (req, res) => {
    try {
        const { nama, nis, kelas, grha, jurusan, nama_event, tingkat } = req.body;
        const foto = req.file ? req.file.filename : null;
        
        const point = calculateEventPoints(tingkat);
        
        const [result] = await db.query(
            'INSERT INTO event (user_id, nama, nis, kelas, grha, jurusan, nama_event, tingkat, foto, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, nama, nis, kelas, grha, jurusan, nama_event, tingkat, foto, point]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Submit Event', `Submitted event: ${nama_event}`]
        );

        res.status(201).json({ message: 'Event submitted for approval', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve event
router.put('/:id/approve', auth, async (req, res) => {
    try {
        const eventId = req.params.id;
        
        const [event] = await db.query('SELECT * FROM event WHERE id = ?', [eventId]);
        if (event.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const eventData = event[0];
        
        await db.query('UPDATE event SET status = ? WHERE id = ?', ['approved', eventId]);
        
        const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [eventData.user_id]);
        const ipcSebelum = user[0].ipc_total;
        const ipcSesudah = ipcSebelum + eventData.point;
        
        await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipcSesudah, eventData.user_id]);
        
        await db.query(
            'INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
            [eventData.user_id, 'event', eventData.point, ipcSebelum, ipcSesudah, `Event: ${eventData.nama_event}`]
        );

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Approve Event', `Approved event ID ${eventId}`]
        );

        res.json({ message: 'Event approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject event
router.put('/:id/reject', auth, async (req, res) => {
    try {
        const { rejection_reason } = req.body;
        const eventId = req.params.id;
        
        await db.query('UPDATE event SET status = ?, rejection_reason = ? WHERE id = ?', ['rejected', rejection_reason, eventId]);

        await db.query(
            'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
            [req.user.id, 'Reject Event', `Rejected event ID ${eventId}`]
        );

        res.json({ message: 'Event rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
