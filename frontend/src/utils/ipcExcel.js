import ExcelJS from 'exceljs';

// ------------------------------------------------------------------
// Individual Point Card Excel ("Raport IPC")
// Layout direplika dari dokumen resmi sekolah (format_ipc.xlsx):
// kop di baris 1-8, judul 9-13, biodata 15-17, tabel point 19-39,
// tanda tangan 42-48. Area cetak A1:L48, portrait A4.
// ------------------------------------------------------------------

const TNR = 'Times New Roman';
const INK = 'FF000000';

// Lebar kolom A..L (satuan Excel) sesuai dokumen asli
const COL_WIDTHS = [4.22, 4.11, 3.33, 3.22, 6.78, 7.78, 14.22, 7.22, 2.11, 3.22, 12, 4.44];

const F_TITLE = { name: TNR, size: 12, bold: true };
const F_TEXT = { name: TNR, size: 12 };
const F_BOLD = { name: TNR, size: 12, bold: true };
const F_SIGN = { name: TNR, size: 12, bold: true, underline: true };

const A_CENTER = { vertical: 'middle', horizontal: 'center', wrapText: true };
const A_LEFT = { vertical: 'middle', horizontal: 'left', wrapText: true };
const A_LEFT_NW = { vertical: 'middle', horizontal: 'left' }; // tanpa wrap (area tanda tangan)

const MERGES = [
  'A9:K9', 'A11:K11', 'A12:K12', 'A13:K13',
  'A15:C15', 'E15:G15', 'H15:I15',
  'E16:G16', 'H16:I16',
  'A17:C17', 'E17:G17', 'H17:I17',
  'A19:G19', 'H19:K19',
  'B20:G20', 'H20:K20',
  'A21:A23', 'B21:G21', 'H21:K21',
  'C22:G22', 'H22:K22', 'C23:G23', 'H23:K23',
  'A24:A31', 'B24:G24', 'H24:K24',
  'C25:G25', 'H25:K25', 'C26:G26', 'H26:K26', 'C27:G27', 'H27:K27',
  'C28:G28', 'H28:K28', 'C29:G29', 'H29:K29', 'C30:G30', 'H30:K30',
  'C31:G31', 'H31:K31',
  'B32:G32', 'H32:K32', 'B33:G33', 'H33:K33', 'B34:G34', 'H34:K34',
  'A35:A38', 'B35:G35', 'H35:K35',
  'C36:G36', 'H36:K36', 'C37:G37', 'H37:K37', 'C38:G38', 'H38:K38',
  'A39:G39', 'H39:K39',
];

const ROW_HEIGHTS = {
  9: 14.55, 10: 1.95, 11: 15.6, 12: 15.6, 13: 15.6, 14: 15.6,
  15: 15.6, 16: 15.6, 17: 15.6, 18: 16.2,
  19: 15.45, 20: 15.45,
  21: 16.05, 22: 16.05, 23: 16.05, 24: 16.05, 25: 16.05,
  26: 16.05, 27: 16.05, 28: 16.05, 29: 16.05, 30: 16.2,
  31: 16.05, 32: 16.05, 33: 16.05, 34: 16.05, 35: 16.05,
  36: 16.05, 37: 16.05, 38: 16.05, 39: 15.45,
  41: 15.6, 42: 15.6, 43: 15.6, 44: 15.6, 45: 15.6,
  46: 15.6, 47: 15.6, 48: 15.6, 49: 15.6,
};

function setCell(sheet, addr, value, { font, alignment } = {}) {
  const cell = sheet.getCell(addr);
  cell.value = value;
  if (font) cell.font = font;
  if (alignment) cell.alignment = alignment;
  return cell;
}

// Grid tabel A19:K39: garis horizontal medium, vertikal tipis di dalam,
// medium di tepi luar — sesuai dokumen asli.
function styleTableGrid(sheet) {
  const thin = { style: 'thin', color: { argb: INK } };
  const medium = { style: 'medium', color: { argb: INK } };
  for (let r = 19; r <= 39; r++) {
    for (let c = 1; c <= 11; c++) {
      const cell = sheet.getCell(r, c);
      cell.border = {
        top: r === 19 ? medium : thin,
        bottom: r === 39 ? medium : thin,
        left: c === 1 ? medium : thin,
        right: c === 11 ? medium : thin,
      };
    }
  }
}

// Ambil gambar kop (logo sekolah -> header.png) sebagai base64 + dimensi asli.
// Dipisah agar mudah diuji; di browser memakai fetch + Image.
export async function fetchKopImage(urls) {
  for (const url of urls) {
    if (!url) continue;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const buf = await res.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let binary = '';
      const CHUNK = 0x8000;
      for (let i = 0; i < bytes.length; i += CHUNK) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
      }
      const clean = String(url).split('?')[0];
      const ext = (clean.split('.').pop() || 'png').toLowerCase();
      const extension = ext === 'jpg' ? 'jpeg' : ['png', 'jpeg', 'gif'].includes(ext) ? ext : 'png';
      const dims = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => resolve(null);
        img.src = URL.createObjectURL(new Blob([buf]));
      });
      if (!dims) continue;
      return { base64: btoa(binary), extension, dims };
    } catch {
      // coba URL berikutnya
    }
  }
  return null;
}

function fitImage(dims, maxW, maxH) {
  const scale = Math.min(maxW / dims.w, maxH / dims.h, 1);
  return { width: Math.round(dims.w * scale), height: Math.round(dims.h * scale) };
}

// Bentuk normalisasi nilai point dari breakdown API (string/null -> number)
const num = (v) => Number(v) || 0;

export function calcIndividualPoints(points = {}) {
  const pointAwal = num(points.point_awal) || 80;
  const prestasiAkademik = num(points.prestasi_akademik);
  const prestasiNonakademik = num(points.prestasi_nonakademik);
  const tanggungJawab = num(points.tanggung_jawab);
  const disiplin = num(points.disiplin);
  const kepedulian = num(points.kepedulian);
  const kemandirian = num(points.kemandirian);
  const spiritual = num(points.spiritual);
  const kejujuran = num(points.kejujuran);
  const kepercayaanDiri = num(points.kepercayaan_diri);
  const organisasi = num(points.organisasi);
  const kepanitiaan = num(points.kepanitiaan);
  const event = num(points.event);
  const pelanggaranRingan = num(points.pelanggaran_ringan);
  const pelanggaranSedang = num(points.pelanggaran_sedang);
  const pelanggaranBerat = num(points.pelanggaran_berat);
  const total =
    pointAwal +
    prestasiAkademik + prestasiNonakademik +
    tanggungJawab + disiplin + kepedulian + kemandirian + spiritual + kejujuran + kepercayaanDiri +
    organisasi + kepanitiaan + event -
    (pelanggaranRingan + pelanggaranSedang + pelanggaranBerat);
  return {
    pointAwal, prestasiAkademik, prestasiNonakademik,
    tanggungJawab, disiplin, kepedulian, kemandirian, spiritual, kejujuran, kepercayaanDiri,
    organisasi, kepanitiaan, event,
    pelanggaranRingan, pelanggaranSedang, pelanggaranBerat,
    total,
  };
}

// Susun workbook "Raport IPC" untuk satu siswa.
// school: { school_name, principal_name, principal_nip }
// kopImage: { base64, extension, dims: { w, h } } | null
export async function createIndividualIpcExcelBuffer({
  student = {},
  wali = null,
  points = {},
  ipcTotal = null,
  school = {},
  semester = 'Ganjil', // sama seperti default backend (templateData semester)
  tahunPelajaran = null,
  tanggal = null,
  kopImage = null,
}) {
  const p = calcIndividualPoints(points);
  const total = ipcTotal ?? p.total;

  const schoolName = school.school_name || 'SMK Negeri Bali Mandara';
  const principalName = school.principal_name || 'Nama Kepala Sekolah';
  const principalNip = school.principal_nip || '-';
  const waliNama = wali?.nama || '-';
  const waliNip = wali?.nip || '-';
  const year = new Date().getFullYear();
  const tp = tahunPelajaran || `${year}/${year + 1}`;
  const tgl = tanggal || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Raport IPC', {
    pageSetup: { paperSize: 9, orientation: 'portrait', scale: 115 },
  });
  sheet.pageMargins = { left: 0.53, right: 0.61, top: 0.18, bottom: 0.3, header: 0.12, footer: 0.12 };
  sheet.pageSetup.printArea = 'A1:L48';

  COL_WIDTHS.forEach((w, i) => { sheet.getColumn(i + 1).width = w; });
  Object.entries(ROW_HEIGHTS).forEach(([r, h]) => { sheet.getRow(Number(r)).height = h; });
  MERGES.forEach((m) => sheet.mergeCells(m));

  // Kop (baris 1-8 dikosongkan untuk gambar, seperti dokumen asli)
  if (kopImage) {
    const imageId = workbook.addImage({ base64: kopImage.base64, extension: kopImage.extension || 'png' });
    const size = fitImage(kopImage.dims || { w: 480, h: 130 }, 490, 128);
    sheet.addImage(imageId, { tl: { col: 0, row: 0 }, ext: size });
  }

  // Judul
  setCell(sheet, 'A9', 'INDIVIDUAL POINT CARD', { font: F_TITLE, alignment: A_CENTER });
  setCell(sheet, 'A11', String(schoolName).toUpperCase(), { font: F_TITLE, alignment: A_CENTER });
  setCell(sheet, 'A12', 'TAHUN PELAJARAN', { font: F_TITLE, alignment: A_CENTER });
  setCell(sheet, 'A13', tp, { font: F_TITLE, alignment: A_CENTER });

  // Biodata
  setCell(sheet, 'A15', 'Nama', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'D15', ':', { font: F_TEXT, alignment: A_CENTER });
  setCell(sheet, 'E15', student.nama || '-', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'H15', 'Kelas', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'J15', ':', { font: F_TEXT, alignment: A_CENTER });
  setCell(sheet, 'K15', student.kelas || '-', { font: F_TEXT, alignment: A_LEFT });

  setCell(sheet, 'A16', 'NIS/NISN', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'D16', ':', { font: F_TEXT, alignment: A_CENTER });
  setCell(sheet, 'E16', student.nis != null ? String(student.nis) : '-', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'H16', 'Grha', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'J16', ':', { font: F_TEXT, alignment: A_CENTER });
  setCell(sheet, 'K16', student.grha || '-', { font: F_TEXT, alignment: A_LEFT });

  setCell(sheet, 'A17', 'Wali Kelas', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'D17', ':', { font: F_TEXT, alignment: A_CENTER });
  setCell(sheet, 'E17', waliNama, { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'H17', 'Semester', { font: F_TEXT, alignment: A_LEFT });
  setCell(sheet, 'J17', ':', { font: F_TEXT, alignment: A_CENTER });
  setCell(sheet, 'K17', semester, { font: F_TEXT, alignment: A_LEFT });

  // Tabel point
  setCell(sheet, 'A19', 'Point IPC', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'H19', 'Point', { font: F_BOLD, alignment: A_CENTER });

  setCell(sheet, 'A20', 'I', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'B20', 'Point Awal', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'H20', p.pointAwal, { font: F_BOLD, alignment: A_CENTER });

  setCell(sheet, 'A21', 'II', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'B21', 'Prestasi', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'H21', '', { font: F_BOLD, alignment: A_CENTER });

  const prestasiRows = [['Akademik', p.prestasiAkademik], ['Non-Akademik', p.prestasiNonakademik]];
  prestasiRows.forEach(([label, val], i) => {
    const r = 22 + i;
    setCell(sheet, `B${r}`, i + 1, { font: F_TEXT, alignment: A_CENTER });
    setCell(sheet, `C${r}`, label, { font: F_TEXT, alignment: A_CENTER });
    setCell(sheet, `H${r}`, val, { font: F_TEXT, alignment: A_CENTER });
  });

  setCell(sheet, 'A24', 'III', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'B24', 'Perkembangan karakter', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'H24', '', { font: F_BOLD, alignment: A_CENTER });

  const karakterRows = [
    ['Tanggung Jawab', p.tanggungJawab], ['Disiplin', p.disiplin], ['Kepedulian', p.kepedulian],
    ['Kemandirian', p.kemandirian], ['Spiritual', p.spiritual], ['Kejujuran', p.kejujuran],
    ['Kepercayaan Diri', p.kepercayaanDiri],
  ];
  karakterRows.forEach(([label, val], i) => {
    const r = 25 + i;
    setCell(sheet, `B${r}`, i + 1, { font: F_TEXT, alignment: A_CENTER });
    setCell(sheet, `C${r}`, label, { font: F_TEXT, alignment: A_CENTER });
    setCell(sheet, `H${r}`, val, { font: F_TEXT, alignment: A_CENTER });
  });

  const aktifRows = [['IV', 'Organisasi', p.organisasi], ['V', 'Kepanitiaan', p.kepanitiaan], ['VI', 'Event', p.event]];
  aktifRows.forEach(([roman, label, val], i) => {
    const r = 32 + i;
    setCell(sheet, `A${r}`, roman, { font: F_BOLD, alignment: A_CENTER });
    setCell(sheet, `B${r}`, label, { font: F_BOLD, alignment: A_CENTER });
    setCell(sheet, `H${r}`, val, { font: F_BOLD, alignment: A_CENTER });
  });

  setCell(sheet, 'A35', 'VII', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'B35', 'Pelanggaran', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'H35', '', { font: F_BOLD, alignment: A_CENTER });

  const langgarRows = [['Ringan', p.pelanggaranRingan], ['Sedang', p.pelanggaranSedang], ['Berat', p.pelanggaranBerat]];
  langgarRows.forEach(([label, val], i) => {
    const r = 36 + i;
    setCell(sheet, `B${r}`, i + 1, { font: F_TEXT, alignment: A_CENTER });
    setCell(sheet, `C${r}`, label, { font: F_TEXT, alignment: A_CENTER });
    setCell(sheet, `H${r}`, val, { font: F_TEXT, alignment: A_CENTER });
  });

  setCell(sheet, 'A39', 'TOTAL POINT IPC', { font: F_BOLD, alignment: A_CENTER });
  setCell(sheet, 'H39', total, { font: F_BOLD, alignment: A_CENTER });

  styleTableGrid(sheet);

  // Label tabel (A19:G38) rata kiri; kolom Point (H) tetap rata tengah.
  for (let r = 19; r <= 38; r++) {
    for (let c = 1; c <= 7; c++) {
      sheet.getCell(r, c).alignment = A_LEFT;
    }
  }

  // Tanda tangan (tanpa merge & tanpa wrap)
  setCell(sheet, 'A42', 'Mengetahui.', { font: F_BOLD, alignment: A_LEFT_NW });
  setCell(sheet, 'H42', `Kubutambahan, ${tgl}`, { font: F_BOLD, alignment: A_LEFT_NW });
  setCell(sheet, 'A43', `Kepala ${schoolName}`, { font: F_BOLD, alignment: A_LEFT_NW });
  setCell(sheet, 'H43', 'Wali Kelas', { font: F_BOLD, alignment: A_LEFT_NW });
  setCell(sheet, 'A47', principalName, { font: F_SIGN, alignment: A_LEFT_NW });
  setCell(sheet, 'H47', waliNama, { font: F_SIGN, alignment: A_LEFT_NW });
  setCell(sheet, 'A48', `NIP. ${principalNip}`, { font: F_BOLD, alignment: A_LEFT_NW });
  setCell(sheet, 'H48', `NIP. ${waliNip}`, { font: F_BOLD, alignment: A_LEFT_NW });

  // Kunci border tabel: ExcelJS menyalin referensi objek style dari sel master
  // merge ke semua anggotanya, sehingga penulisan border per-sel saling
  // menimpa antar-sel dalam satu merge (tepi kiri A19/A39 jadi thin).
  // Tulis ulang setiap sel tabel dengan objek style BARU yang lengkap agar
  // tidak lagi berbagi referensi.
  for (let r = 19; r <= 39; r++) {
    for (let c = 1; c <= 11; c++) {
      const cell = sheet.getCell(r, c);
      const st = cell.style || {};
      const side = (s) => ({ style: s, color: { argb: INK } });
      cell.style = {
        ...(st.font ? { font: { ...st.font } } : {}),
        ...(st.alignment ? { alignment: { ...st.alignment } } : {}),
        border: {
          top: side(r === 19 ? 'medium' : 'thin'),
          bottom: side(r === 39 ? 'medium' : 'thin'),
          left: side(c === 1 ? 'medium' : 'thin'),
          right: side(c === 11 ? 'medium' : 'thin'),
        },
      };
    }
  }

  return workbook.xlsx.writeBuffer();
}
