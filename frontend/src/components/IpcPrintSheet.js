import React from 'react';
import { IPC_PRINT_BRANDING } from './ipcPrintBranding';

function formatTahunPelajaran(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month >= 7) {
    return `${year}/${year + 1}`;
  }
  return `${year - 1}/${year}`;
}

function getSemester(date = new Date()) {
  const month = date.getMonth() + 1;
  return month >= 1 && month <= 6 ? 'Genap' : 'Ganjil';
}

function formatPrintDate(date = new Date()) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

function formatNisNisn(nis, nisn) {
  if (nis && nisn) return `${nis}/${nisn}`;
  return nis || nisn || '-';
}

function IpcPrintSheet({ student, wali, history, printDate = new Date() }) {
  // Calculate IPC points from history
  const calculatePoints = () => {
    const points = {
      point_awal: 50,
      prestasi_akademik: 0,
      prestasi_nonakademik: 0,
      tanggung_jawab: 3,
      disiplin: 3,
      kepedulian: 3,
      kemandirian: 3,
      spiritual: 3,
      kejujuran: 3,
      kepercayaan_diri: 3,
      organisasi: 0,
      kepanitiaan: 0,
      event: 0,
      pelanggaran_ringan: 0,
      pelanggaran_sedang: 0,
      pelanggaran_berat: 0
    };

    if (history && history.length > 0) {
      history.forEach(item => {
        const category = item.kategori?.toLowerCase() || '';
        const point = item.point_change || 0;

        if (category.includes('prestasi')) {
          if (category.includes('akademik')) {
            points.prestasi_akademik += point;
          } else {
            points.prestasi_nonakademik += point;
          }
        } else if (category.includes('karakter') || category.includes('perilaku')) {
          if (category.includes('tanggung')) points.tanggung_jawab += point;
          else if (category.includes('disiplin')) points.disiplin += point;
          else if (category.includes('kepedulian')) points.kepedulian += point;
          else if (category.includes('kemandirian')) points.kemandirian += point;
          else if (category.includes('spiritual')) points.spiritual += point;
          else if (category.includes('jujur')) points.kejujuran += point;
          else if (category.includes('percaya')) points.kepercayaan_diri += point;
        } else if (category.includes('organisasi')) {
          points.organisasi += point;
        } else if (category.includes('kepanitiaan')) {
          points.kepanitiaan += point;
        } else if (category.includes('event')) {
          points.event += point;
        } else if (category.includes('pelanggaran')) {
          if (category.includes('ringan')) points.pelanggaran_ringan += Math.abs(point);
          else if (category.includes('sedang')) points.pelanggaran_sedang += Math.abs(point);
          else if (category.includes('berat')) points.pelanggaran_berat += Math.abs(point);
        }
      });
    }

    return points;
  };

  const points = calculatePoints();

  const calculateTotal = () => {
    let total = points.point_awal;
    total += points.prestasi_akademik;
    total += points.prestasi_nonakademik;
    total += points.tanggung_jawab;
    total += points.disiplin;
    total += points.kepedulian;
    total += points.kemandirian;
    total += points.spiritual;
    total += points.kejujuran;
    total += points.kepercayaan_diri;
    total += points.organisasi;
    total += points.kepanitiaan;
    total += points.event;
    total -= points.pelanggaran_ringan;
    total -= points.pelanggaran_sedang;
    total -= points.pelanggaran_berat;
    return total;
  };

  const total = calculateTotal();

  return (
    <div className="ipc-print-sheet">
      {/* Header */}
      <header className="report-header">
        <img src="/header.png" alt="SMK Negeri Bali Mandara Header" className="header-image" />
      </header>

      {/* Title */}
      <div className="report-title">
        <h3>INDIVIDUAL POINT CARD</h3>
        <h3>SMK NEGERI BALI MANDARA</h3>
        <p>Tahun Ajaran {formatTahunPelajaran(printDate)}</p>
      </div>

      {/* Student Information */}
      <section className="student-info">
        <div className="info-column-left">
          <div className="info-row">
            <span className="info-label">Nama:</span>
            <span className="info-value">{student?.nama || '-'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">NIS/NISN:</span>
            <span className="info-value">{formatNisNisn(student?.nis, student?.nisn)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Wali Kelas:</span>
            <span className="info-value">{wali?.nama || 'Putu Andika Wirasatriya, S.Pd.'}</span>
          </div>
        </div>
        <div className="info-column-right">
          <div className="info-row">
            <span className="info-label">Kelas:</span>
            <span className="info-value">{student?.kelas || '-'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Grha:</span>
            <span className="info-value">{student?.grha || '-'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Semester:</span>
            <span className="info-value">{formatTahunPelajaran(printDate)}</span>
          </div>
        </div>
      </section>

      {/* IPC Points Table */}
      <div className="ipc-table-container">
        <table className="ipc-table">
          <thead>
            <tr>
              <th colSpan="2">Point IPC</th>
            </tr>
          </thead>
          <tbody>
            <tr className="section-header">
              <td colSpan="2">I Point Awal</td>
            </tr>
            <tr>
              <td></td>
              <td className="point-value">{points.point_awal}</td>
            </tr>

            <tr className="section-header">
              <td colSpan="2">II Prestasi</td>
            </tr>
            <tr>
              <td>1. Akademik</td>
              <td className="point-value">{points.prestasi_akademik}</td>
            </tr>
            <tr>
              <td>2. Non-Akademik</td>
              <td className="point-value">{points.prestasi_nonakademik}</td>
            </tr>

            <tr className="section-header">
              <td colSpan="2">III Perkembangan Karakter</td>
            </tr>
            <tr>
              <td>1. Tanggung Jawab</td>
              <td className="point-value">{points.tanggung_jawab}</td>
            </tr>
            <tr>
              <td>2. Disiplin</td>
              <td className="point-value">{points.disiplin}</td>
            </tr>
            <tr>
              <td>3. Kepedulian</td>
              <td className="point-value">{points.kepedulian}</td>
            </tr>
            <tr>
              <td>4. Kemandirian</td>
              <td className="point-value">{points.kemandirian}</td>
            </tr>
            <tr>
              <td>5. Spiritual</td>
              <td className="point-value">{points.spiritual}</td>
            </tr>
            <tr>
              <td>6. Kejujuran</td>
              <td className="point-value">{points.kejujuran}</td>
            </tr>
            <tr>
              <td>7. Kepercayaan Diri</td>
              <td className="point-value">{points.kepercayaan_diri}</td>
            </tr>

            <tr className="section-header">
              <td colSpan="2">IV Organisasi</td>
            </tr>
            <tr>
              <td></td>
              <td className="point-value">{points.organisasi}</td>
            </tr>

            <tr className="section-header">
              <td colSpan="2">V Kepanitiaan</td>
            </tr>
            <tr>
              <td></td>
              <td className="point-value">{points.kepanitiaan}</td>
            </tr>

            <tr className="section-header">
              <td colSpan="2">VI Event</td>
            </tr>
            <tr>
              <td></td>
              <td className="point-value">{points.event}</td>
            </tr>

            <tr className="section-header">
              <td colSpan="2">VII Pelanggaran</td>
            </tr>
            <tr>
              <td>1. Ringan</td>
              <td className="point-value negative">{points.pelanggaran_ringan}</td>
            </tr>
            <tr>
              <td>2. Sedang</td>
              <td className="point-value negative">{points.pelanggaran_sedang}</td>
            </tr>
            <tr>
              <td>3. Berat</td>
              <td className="point-value negative">{points.pelanggaran_berat}</td>
            </tr>

            <tr className="total-row">
              <td><strong>TOTAL POINT IPC</strong></td>
              <td className="point-value total"><strong>{total}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signatures */}
      <section className="signatures">
        <div className="signature-block">
          <p>Kubutambahan, {formatPrintDate(printDate)}</p>
          <p className="signature-title">Kepala SMK Negeri Bali Mandara</p>
          <div className="signature-space"></div>
          <p className="signature-name">{IPC_PRINT_BRANDING.kepalaSekolah.nama}</p>
          <p className="signature-nip">NIP. {IPC_PRINT_BRANDING.kepalaSekolah.nip}</p>
        </div>
        <div className="signature-block">
          <p>Kubutambahan, {formatPrintDate(printDate)}</p>
          <p className="signature-title">Wali Kelas</p>
          <div className="signature-space"></div>
          <p className="signature-name">{wali?.nama || 'Putu Andika Wirasatriya, S.Pd.'}</p>
          <p className="signature-nip">NIP. {wali?.nip || '19980913 202321 1 004'}</p>
        </div>
      </section>
    </div>
  );
}

export default IpcPrintSheet;
export { formatTahunPelajaran, getSemester, formatPrintDate };
