export const JURUSAN_OPTIONS = ['TKJ', 'TO', 'DPIB'];

export const KELAS_OPTIONS = [
  'X TKJ 1', 'X TKJ 2', 'X TO 1', 'X TO 2',
  'X DPIB 1', 'X DPIB 2',
  'XI TKJ 1', 'XI TKJ 2', 'XI TO 1', 'XI TO 2',
  'XI DPIB 1', 'XI DPIB 2',
  'XII TKJ 1', 'XII TKJ 2', 'XII TO 1', 'XII TO 2',
  'XII DPIB 1', 'XII DPIB 2'
];

export function jurusanFromKelas(kelas) {
  if (!kelas) return '';
  const parts = kelas.trim().split(/\s+/);
  const jurusan = parts[1];
  return JURUSAN_OPTIONS.includes(jurusan) ? jurusan : '';
}

export function applyKelasChange(prev, kelas) {
  const derivedJurusan = jurusanFromKelas(kelas);
  return {
    ...prev,
    kelas,
    ...(derivedJurusan ? { jurusan: derivedJurusan } : {})
  };
}

export function isJurusanLocked(kelas, isAutoFilled = false) {
  return isAutoFilled || !!kelas;
}
