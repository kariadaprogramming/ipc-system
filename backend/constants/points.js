// Single source of truth for IPC point calculations

const PRESTASI_POINTS = {
    'juara 1': { kecamatan: 15, kabupaten: 20, provinsi: 30, nasional: 50, internasional: 100 },
    'juara 2': { kecamatan: 12, kabupaten: 17, provinsi: 27, nasional: 45, internasional: 90 },
    'juara 3': { kecamatan: 10, kabupaten: 15, provinsi: 25, nasional: 40, internasional: 80 },
    'juara harapan 1': { kecamatan: 8, kabupaten: 12, provinsi: 20, nasional: 35, internasional: 70 },
    'juara harapan 2': { kecamatan: 6, kabupaten: 10, provinsi: 18, nasional: 30, internasional: 60 },
    'juara harapan 3': { kecamatan: 5, kabupaten: 8, provinsi: 15, nasional: 25, internasional: 50 },
    'finalis': { kecamatan: 4, kabupaten: 6, provinsi: 12, nasional: 20, internasional: 40 },
    'peserta': { kecamatan: 3, kabupaten: 5, provinsi: 10, nasional: 15, internasional: 30 }
};

const EVENT_POINTS = {
    'sekolah': 2,
    'kecamatan': 4,
    'kabupaten': 6,
    'provinsi': 8,
    'nasional': 10,
    'internasional': 12
};

const ORGANISASI_POINTS = {
    'ketua': 6,
    'wakil ketua': 5,
    'sekretaris': 4,
    'bendahara': 3,
    'koordinator': 2,
    'anggota': 1
};

const PELANGGARAN_POINTS = {
    'ringan': 1,
    'sedang': 5,
    'berat': 25
};

const PERILAKU_POINTS = {
    'kurang baik': 1,
    'cukup baik': 2,
    'baik': 3,
    'sangat baik': 4
};

const calculatePrestasiPoints = (juara, kategori) => {
    return PRESTASI_POINTS[juara]?.[kategori] || 0;
};

const calculateEventPoints = (tingkat) => {
    return EVENT_POINTS[tingkat?.toLowerCase()] || EVENT_POINTS[tingkat] || 0;
};

const calculateOrganisasiPoints = (jabatan) => {
    return ORGANISASI_POINTS[jabatan?.toLowerCase()] || ORGANISASI_POINTS[jabatan] || 0;
};

const calculatePelanggaranPoints = (jenis) => {
    return PELANGGARAN_POINTS[jenis?.toLowerCase()] || 0;
};

const calculatePerilakuPoints = (karakter) => {
    return PERILAKU_POINTS[karakter?.toLowerCase()] || 0;
};

// Normalize prestasi jenis across tables (legacy non_akademik → nonakademik)
const normalizePrestasiJenis = (jenis) => {
    if (jenis === 'non_akademik') return 'nonakademik';
    return jenis;
};

module.exports = {
    PRESTASI_POINTS,
    EVENT_POINTS,
    ORGANISASI_POINTS,
    PELANGGARAN_POINTS,
    PERILAKU_POINTS,
    calculatePrestasiPoints,
    calculateEventPoints,
    calculateOrganisasiPoints,
    calculatePelanggaranPoints,
    calculatePerilakuPoints,
    normalizePrestasiJenis
};
