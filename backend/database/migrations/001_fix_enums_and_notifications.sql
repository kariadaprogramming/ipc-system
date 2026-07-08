-- Run this on existing databases to align ENUMs with application code

-- Fix prestasi_approvals jenis ENUM (non_akademik → nonakademik)
ALTER TABLE prestasi_approvals
    MODIFY COLUMN jenis ENUM('akademik', 'non_akademik', 'nonakademik') DEFAULT 'akademik';

UPDATE prestasi_approvals SET jenis = 'nonakademik' WHERE jenis = 'non_akademik';

ALTER TABLE prestasi_approvals
    MODIFY COLUMN jenis ENUM('akademik', 'nonakademik') DEFAULT 'akademik';

-- Expand notifications.related_type ENUM
ALTER TABLE notifications
    MODIFY COLUMN related_type ENUM(
        'prestasi', 'event', 'organisasi', 'siswa',
        'student_creation', 'biodata', 'input_access', 'wali_kelas',
        'pelanggaran', 'perilaku'
    ) NOT NULL;
