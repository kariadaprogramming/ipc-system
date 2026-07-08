const db = require('../config/database');

async function resolveStudentIdByNis(nis, fallbackUserId) {
    if (!nis) {
        return fallbackUserId;
    }

    const [rows] = await db.query(
        'SELECT id FROM users WHERE nis = ? AND role = ?',
        [nis, 'siswa']
    );

    if (rows.length === 0) {
        const error = new Error('Siswa dengan NIS tersebut tidak ditemukan');
        error.statusCode = 400;
        throw error;
    }

    return rows[0].id;
}

async function applyIpcChange(userId, jenis, pointChange, keterangan) {
    const [user] = await db.query('SELECT ipc_total FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
        return null;
    }

    const ipcSebelum = user[0].ipc_total;
    let ipcBaru = ipcSebelum + pointChange;
    if (ipcBaru < 0) {
        ipcBaru = 0;
    }

    await db.query('UPDATE users SET ipc_total = ? WHERE id = ?', [ipcBaru, userId]);
    await db.query(
        `INSERT INTO ipc_history (user_id, jenis_perubahan, point_change, ipc_sebelum, ipc_sesudah, keterangan)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, jenis, pointChange, ipcSebelum, ipcBaru, keterangan]
    );

    return { ipcSebelum, ipcBaru };
}

module.exports = { resolveStudentIdByNis, applyIpcChange };
