const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { logoutLimiter } = require('../middleware/security');

// Helper function to set secure HTTP-only cookie
const setAuthCookie = (res, token) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction, // true in production, false in development
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
    });
};

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const [users] = await db.query(
            'SELECT id, nama, nis, nip, password, role, kelas, grha, wali_kelas, ipc_total, ipc_awal, alamat, no_hp, detail, foto, tahun_pelajaran, is_graduated, jurusan FROM users WHERE nis = ? OR nip = ?',
            [username, username]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'User not found. Pastikan database sudah di-setup dengan benar.' });
        }

const user = users[0];

        if (user.nis === 'ADMIN001' && user.password === '$2a$10$YourHashedPasswordHere') {
            const setupPassword = process.env.SUPERADMIN_SETUP_PASSWORD;
            if (!setupPassword) {
                return res.status(503).json({ message: 'Superadmin belum di-initialize. Set SUPERADMIN_SETUP_PASSWORD di file .env.' });
            }
            if (password === setupPassword) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
                user.password = hashedPassword;
            } else {
                return res.status(400).json({ message: 'Invalid setup password' });
            }
        } else {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, nis: user.nis },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set token in HTTP-only cookie
        setAuthCookie(res, token);

        // Log activity (try-catch to prevent login failure if logs table doesn't exist)
        try {
            await db.query(
                'INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)',
                [user.id, 'Login', 'User logged in']
            );
        } catch (logError) {
            console.log('Activity log failed (table might not exist):', logError.message);
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                nama: user.nama,
                nis: user.nis,
                nip: user.nip,
                role: user.role,
                kelas: user.kelas,
                grha: user.grha,
                wali_kelas: user.wali_kelas,
                ipc_total: user.ipc_total
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error: ' + error.message + '. Pastikan database sudah di-setup dengan benar.' });
    }
});

// Logout - clear the HTTP-only cookie
router.post('/logout', logoutLimiter, (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });
    res.json({ message: 'Logout successful' });
});

// Verify token endpoint (for frontend to check authentication status)
router.get('/verify', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true, user: decoded });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
});

module.exports = router;
