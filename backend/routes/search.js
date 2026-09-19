const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const db = require('../config/database');

// Search students by name or NIS
router.get('/students', auth, async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        // Optimized single query with subqueries instead of N+1
        const [students] = await db.query(`
            SELECT
                u.id,
                u.nama,
                u.nis,
                u.kelas,
                u.grha,
                u.ipc_total,
                COALESCE(akademik.count, 0) as total_prestasi_akademik,
                COALESCE(nonakademik.count, 0) as total_prestasi_nonakademik
            FROM users u
            LEFT JOIN (
                SELECT user_id, COUNT(*) as count
                FROM prestasi
                WHERE jenis = 'akademik' AND status = 'approved'
                GROUP BY user_id
            ) akademik ON u.id = akademik.user_id
            LEFT JOIN (
                SELECT user_id, COUNT(*) as count
                FROM prestasi
                WHERE jenis = 'nonakademik' AND status = 'approved'
                GROUP BY user_id
            ) nonakademik ON u.id = nonakademik.user_id
            WHERE u.role = 'siswa'
            AND (u.nama LIKE ? OR u.nis LIKE ?)
            LIMIT 20
        `, [`%${query}%`, `%${query}%`]);

        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get student details with achievements
router.get('/student/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;

        const [student] = await db.query(
            'SELECT id, nama, nis, kelas, grha, ipc_total FROM users WHERE id = ? AND role = ?',
            [userId, 'siswa']
        );

        if (student.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const [prestasi] = await db.query(
            'SELECT * FROM prestasi WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [userId, 'approved']
        );

        const [organisasi] = await db.query(
            'SELECT * FROM organisasi WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [userId, 'approved']
        );

        const [event] = await db.query(
            'SELECT * FROM event WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
            [userId, 'approved']
        );

        const akademikCount = prestasi.filter(p => p.jenis === 'akademik').length;
        const nonakademikCount = prestasi.filter(p => p.jenis === 'nonakademik').length;

        res.json({
            student: student[0],
            prestasi,
            organisasi,
            event,
            total_prestasi_akademik: akademikCount,
            total_prestasi_nonakademik: nonakademikCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get leaderboard - Akademik (Top 20)
router.get('/leaderboard/akademik', auth, async (req, res) => {
    try {
        // Optimized single query instead of N+1 with subquery for details
        const [students] = await db.query(`
            SELECT
                u.id,
                u.nama,
                u.nis,
                u.kelas,
                u.grha,
                u.foto,
                COUNT(DISTINCT p.id) as total_prestasi,
                COALESCE(SUM(p.point), 0) as total_point,
                GROUP_CONCAT(
                    CONCAT(p.nama_lomba, '|', p.kategori, '|', p.juara)
                    ORDER BY p.created_at DESC
                    SEPARATOR '|||'
                ) as competition_details
            FROM users u
            LEFT JOIN prestasi p ON u.id = p.user_id
                AND p.jenis = 'akademik'
                AND p.status = 'approved'
            WHERE u.role = 'siswa'
            GROUP BY u.id, u.nama, u.nis, u.kelas, u.grha, u.foto
            HAVING total_prestasi > 0
            ORDER BY total_prestasi DESC, total_point DESC, u.nama ASC
            LIMIT 20
        `);

        // Parse competition details on the server (much faster than N+1 queries)
        const studentsWithDetails = students.map((student, index) => {
            let competitions = [];
            if (student.competition_details) {
                competitions = student.competition_details.split('|||').map(detail => {
                    const [nama_lomba, kategori, juara] = detail.split('|');
                    return { nama_lomba, kategori, juara };
                });
            }

            const kategoriSet = new Set(competitions.map(c => c.kategori));
            const kategoriList = Array.from(kategoriSet).join(', ');

            return {
                ...student,
                rank: index + 1,
                kategori: kategoriList,
                detail_prestasi: competitions
            };
        });

        res.json(studentsWithDetails);
    } catch (error) {
        console.error('Error fetching akademik leaderboard:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get leaderboard - Non-Akademik (Top 20)
router.get('/leaderboard/nonakademik', auth, async (req, res) => {
    try {
        // Optimized single query instead of N+1 with subquery for details
        const [students] = await db.query(`
            SELECT
                u.id,
                u.nama,
                u.nis,
                u.kelas,
                u.grha,
                u.foto,
                COUNT(DISTINCT p.id) as total_prestasi,
                COALESCE(SUM(p.point), 0) as total_point,
                GROUP_CONCAT(
                    CONCAT(p.nama_lomba, '|', p.kategori, '|', p.juara)
                    ORDER BY p.created_at DESC
                    SEPARATOR '|||'
                ) as competition_details
            FROM users u
            LEFT JOIN prestasi p ON u.id = p.user_id
                AND p.jenis = 'nonakademik'
                AND p.status = 'approved'
            WHERE u.role = 'siswa'
            GROUP BY u.id, u.nama, u.nis, u.kelas, u.grha, u.foto
            HAVING total_prestasi > 0
            ORDER BY total_prestasi DESC, total_point DESC, u.nama ASC
            LIMIT 20
        `);

        // Parse competition details on the server (much faster than N+1 queries)
        const studentsWithDetails = students.map((student, index) => {
            let competitions = [];
            if (student.competition_details) {
                competitions = student.competition_details.split('|||').map(detail => {
                    const [nama_lomba, kategori, juara] = detail.split('|');
                    return { nama_lomba, kategori, juara };
                });
            }

            const kategoriSet = new Set(competitions.map(c => c.kategori));
            const kategoriList = Array.from(kategoriSet).join(', ');

            return {
                ...student,
                rank: index + 1,
                tingkat: kategoriList,
                detail_prestasi: competitions
            };
        });

        res.json(studentsWithDetails);
    } catch (error) {
        console.error('Error fetching non-akademik leaderboard:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
