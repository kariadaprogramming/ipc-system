export const KELAS_OPTIONS = [
  'X TKJ 1', 'X TKJ 2', 'X TO 1', 'X TO 2',
  'X DPIB 1', 'X DPIB 2',
  'XI TKJ 1', 'XI TKJ 2', 'XI TO 1', 'XI TO 2',
  'XI DPIB 1', 'XI DPIB 2',
  'XII TKJ 1', 'XII TKJ 2', 'XII TO 1', 'XII TO 2',
  'XII DPIB 1', 'XII DPIB 2'
];

export function applyKelasChange(prev, kelas) {
  return {
    ...prev,
    kelas
  };
}
