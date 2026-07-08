const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const { buildIpcCardBreakdown } = require('../utils/ipcCardBreakdown');

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

// Individual Point Card data for print (superadmin / guru)
router.get('/ipc-card/:userId', auth, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (Number.isNaN(userId)) {
            return res.status(400).json({ message: 'ID siswa tidak valid' });
        }

        const cardData = await buildIpcCardBreakdown(userId);
        if (!cardData) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        }

        const { student } = cardData;

        const [waliRows] = await db.query(
            `SELECT u.nama AS wali_nama, u.nip AS wali_nip, wka.tahun_ajaran
             FROM wali_kelas_assignment wka
             JOIN users u ON wka.guru_id = u.id
             WHERE wka.kelas = ?
             ORDER BY wka.tahun_ajaran DESC, wka.id DESC
             LIMIT 1`,
            [student.kelas]
        );

        const wali = waliRows.length
            ? { nama: waliRows[0].wali_nama, nip: waliRows[0].wali_nip, tahun_ajaran: waliRows[0].tahun_ajaran }
            : null;

        const [history] = await db.query(
            `SELECT id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan, created_at
             FROM ipc_history
             WHERE user_id = ?
             ORDER BY created_at ASC, id ASC`,
            [userId]
        );

        res.json({
            student,
            wali,
            points: cardData.points,
            ipc_total: cardData.ipc_total,
            breakdown_total: cardData.breakdown_total,
            history
        });
    } catch (error) {
        console.error('Error fetching IPC card data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
