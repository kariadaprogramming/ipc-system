// Parser untuk kolom `karakter_siswa` (TEXT) di tabel perilaku.
// Backend menyimpannya via formatPerilakuKarakter sebagai:
//   "Tanggung Jawab: baik, Disiplin: sangat baik, ..." (Label: nilai, ...)
// Helper ini mengembalikannya ke bentuk per-field agar bisa ditampilkan
// di tabel admin & di form edit.

const KARAKTER_FIELDS = [
  'tanggung_jawab',
  'disiplin',
  'kepedulian',
  'kemandirian',
  'spiritual',
  'kejujuran',
  'kepercayaan_diri',
];

const KARAKTER_LABELS = {
  tanggung_jawab: 'Tanggung Jawab',
  disiplin: 'Disiplin',
  kepedulian: 'Kepedulian',
  kemandirian: 'Kemandirian',
  spiritual: 'Spiritual',
  kejujuran: 'Kejujuran',
  kepercayaan_diri: 'Kepercayaan Diri',
};

const LABEL_TO_FIELD = Object.entries(KARAKTER_LABELS).reduce((acc, [field, label]) => {
  acc[label.toLowerCase()] = field;
  return acc;
}, {});

function emptyTraits() {
  return KARAKTER_FIELDS.reduce((acc, f) => ({ ...acc, [f]: '' }), {});
}

// "sangat baik" -> "Sangat Baik". Hanya untuk tampilan; nilai asli
// (lowercase) tetap dipakai untuk pencocokan config & submit.
function toTitleCase(value) {
  if (!value || typeof value !== 'string') return '';
  return value.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

function parseKarakterSiswa(karakterSiswa) {  const result = emptyTraits();
  if (!karakterSiswa || typeof karakterSiswa !== 'string') return result;

  let matched = false;
  for (const part of karakterSiswa.split(',')) {
    const idx = part.indexOf(':');
    if (idx === -1) continue;
    const field = LABEL_TO_FIELD[part.slice(0, idx).trim().toLowerCase()];
    const value = part.slice(idx + 1).trim();
    if (field && value) {
      result[field] = value;
      matched = true;
    }
  }

  // Format lama: satu nilai tanpa label -> anggap Tanggung Jawab (sama seperti backend)
  if (!matched && karakterSiswa.trim()) {
    result.tanggung_jawab = karakterSiswa.trim();
  }

  return result;
}

module.exports = { KARAKTER_FIELDS, KARAKTER_LABELS, parseKarakterSiswa, toTitleCase };
