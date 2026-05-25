const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all students for reports (grouped by class)
router.get('/students', auth, async (req, res) => {
    try {
        const query = `
            SELECT 
                id,
                nama,
                nis,
                nisn,
                kelas,
                jurusan,
                ipc_total,
                ipc_awal
            FROM users 
            WHERE role = 'siswa'
            ORDER BY kelas, nama
        `;
        
        const [students] = await db.query(query);
        res.json(students);
    } catch (error) {
        console.error('Error fetching students for reports:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get students filtered by class
router.get('/students/class/:kelas', auth, async (req, res) => {
    try {
        const { kelas } = req.params;
        const query = `
            SELECT 
                id,
                nama,
                nis,
                nisn,
                kelas,
                jurusan,
                ipc_total,
                ipc_awal
            FROM users 
            WHERE role = 'siswa' AND kelas = ?
            ORDER BY nama
        `;
        
        const [students] = await db.query(query, [kelas]);
        res.json(students);
    } catch (error) {
        console.error('Error fetching students by class:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get class statistics
router.get('/statistics', auth, async (req, res) => {
    try {
        const query = `
            SELECT 
                kelas,
                jurusan,
                COUNT(*) as total_siswa,
                AVG(ipc_total) as rata_rata_ipc,
                MAX(ipc_total) as ipc_tertinggi,
                MIN(ipc_total) as ipc_terendah
            FROM users 
            WHERE role = 'siswa' AND kelas IS NOT NULL
            GROUP BY kelas, jurusan
            ORDER BY kelas
        `;
        
        const [stats] = await db.query(query);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching class statistics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
