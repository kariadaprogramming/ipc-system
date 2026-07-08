const JURUSAN_OPTIONS = ['TKJ', 'TO', 'DPIB'];

function jurusanFromKelas(kelas) {
    if (!kelas) return null;
    const parts = kelas.trim().split(/\s+/);
    const jurusan = parts[1];
    return JURUSAN_OPTIONS.includes(jurusan) ? jurusan : null;
}

function resolveJurusan(kelas, jurusan) {
    return jurusanFromKelas(kelas) || jurusan;
}

module.exports = { JURUSAN_OPTIONS, jurusanFromKelas, resolveJurusan };
