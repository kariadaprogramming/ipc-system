const db = require('../config/database');

let statusColumn = null;

async function getApprovalStatusColumn() {
    if (statusColumn) {
        return statusColumn;
    }

    // Postgres equivalent of SHOW COLUMNS ... LIKE (schema is fixed, but keep the probe PG-safe)
    const [columns] = await db.query(
        `SELECT column_name FROM information_schema.columns
         WHERE table_name = 'prestasi_approvals' AND column_name = 'superadmin_status'`
    );
    statusColumn = columns.length > 0 ? 'superadmin_status' : 'status';
    return statusColumn;
}

function getRowApprovalStatus(row) {
    return row.superadmin_status ?? row.status;
}

async function fetchPendingApprovals(table, alias) {
    const col = await getApprovalStatusColumn();
    const [rows] = await db.query(`
        SELECT ${alias}.*, u.nama as user_name
        FROM ${table} ${alias}
        JOIN users u ON ${alias}.user_id = u.id
        WHERE ${alias}.${col} = 'pending'
    `);
    return rows;
}

async function approveSubmission(table, id, notes) {
    const col = await getApprovalStatusColumn();
    const noteText = notes || 'Disetujui oleh SuperAdmin';

    if (col === 'superadmin_status') {
        await db.query(
            `UPDATE ${table}
             SET superadmin_status = 'approved',
                 superadmin_approved_at = NOW(),
                 superadmin_notes = ?
             WHERE id = ?`,
            [noteText, id]
        );
        return;
    }

    await db.query(
        `UPDATE ${table}
         SET status = 'approved',
             approved_at = NOW(),
             notes = ?
         WHERE id = ?`,
        [noteText, id]
    );
}

async function rejectSubmission(table, id, notes) {
    const col = await getApprovalStatusColumn();
    const noteText = notes || 'Ditolak oleh SuperAdmin';

    if (col === 'superadmin_status') {
        await db.query(
            `UPDATE ${table}
             SET superadmin_status = 'rejected',
                 superadmin_notes = ?
             WHERE id = ?`,
            [noteText, id]
        );
        return;
    }

    await db.query(
        `UPDATE ${table}
         SET status = 'rejected',
             notes = ?
         WHERE id = ?`,
        [noteText, id]
    );
}

module.exports = {
    getApprovalStatusColumn,
    getRowApprovalStatus,
    fetchPendingApprovals,
    approveSubmission,
    rejectSubmission
};
