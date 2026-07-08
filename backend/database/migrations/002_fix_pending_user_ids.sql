-- Optional migration: fix wrong user_id on pending approval records
-- Run after deploying the IPC fix if existing pending submissions used submitter ID instead of student ID

UPDATE prestasi_approvals pa
JOIN users u ON u.nis = pa.nis AND u.role = 'siswa'
SET pa.user_id = u.id
WHERE pa.superadmin_status = 'pending' AND pa.user_id != u.id;

UPDATE event_approvals ea
JOIN users u ON u.nis = ea.nis AND u.role = 'siswa'
SET ea.user_id = u.id
WHERE ea.superadmin_status = 'pending' AND ea.user_id != u.id;

UPDATE organisasi_approvals oa
JOIN users u ON u.nis = oa.nis AND u.role = 'siswa'
SET oa.user_id = u.id
WHERE oa.superadmin_status = 'pending' AND oa.user_id != u.id;

UPDATE pelanggaran p
JOIN users u ON u.nis = p.nis AND u.role = 'siswa'
SET p.user_id = u.id
WHERE p.status = 'pending' AND p.user_id != u.id;

UPDATE perilaku p
JOIN users u ON u.nis = p.nis AND u.role = 'siswa'
SET p.user_id = u.id
WHERE p.status = 'pending' AND p.user_id != u.id;
