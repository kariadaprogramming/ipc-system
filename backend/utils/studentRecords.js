const db = require('../config/database');

async function getStudentRecords(userId) {
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

    const [pelanggaran] = await db.query(
        'SELECT * FROM pelanggaran WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
        [userId, 'approved']
    );

    const [perilaku] = await db.query(
        'SELECT * FROM perilaku WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
        [userId, 'approved']
    );

    const akademikCount = prestasi.filter((p) => p.jenis === 'akademik').length;
    const nonakademikCount = prestasi.filter(
        (p) => p.jenis === 'nonakademik' || p.jenis === 'non_akademik'
    ).length;

    return {
        total_prestasi_akademik: akademikCount,
        total_prestasi_nonakademik: nonakademikCount,
        total_organisasi: organisasi.length,
        total_event: event.length,
        total_pelanggaran: pelanggaran.length,
        total_perilaku: perilaku.length,
        prestasi,
        organisasi,
        event,
        pelanggaran,
        perilaku
    };
}

module.exports = { getStudentRecords };
