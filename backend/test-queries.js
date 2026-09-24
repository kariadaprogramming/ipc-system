const db = require('./config/database');

async function test() {
    try {
        const [users] = await db.query("SELECT id, nama, nis, password, role FROM users WHERE role = 'siswa' LIMIT 3");
        console.log('Users:', JSON.stringify(users, null, 2));

        const [rows] = await db.query(`
            SELECT *,
               superadmin_status as status,
               'prestasi' as type
            FROM prestasi_approvals
            WHERE user_id = ?
            ORDER BY created_at DESC
        `, [2]);
        console.log('Prestasi approvals for user 2:', JSON.stringify(rows, null, 2));

        const [eventRows] = await db.query(`
            SELECT *,
               superadmin_status as status,
               'event' as type
            FROM event_approvals
            WHERE user_id = ?
            ORDER BY created_at DESC
        `, [2]);
        console.log('Event approvals for user 2:', JSON.stringify(eventRows, null, 2));

        const [orgRows] = await db.query(`
            SELECT *,
               superadmin_status as status,
               'organisasi' as type
            FROM organisasi_approvals
            WHERE user_id = ?
            ORDER BY created_at DESC
        `, [2]);
        console.log('Organisasi approvals for user 2:', JSON.stringify(orgRows, null, 2));

        const [kepRows] = await db.query(`
            SELECT *,
               superadmin_status as status,
               'kepanitiaan' as type
            FROM kepanitiaan_approvals
            WHERE user_id = ?
            ORDER BY created_at DESC
        `, [2]);
        console.log('Kepanitiaan approvals for user 2:', JSON.stringify(kepRows, null, 2));
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
    if (typeof db.end === 'function') {
        await db.end();
    }
    process.exit(0);
}

test();
