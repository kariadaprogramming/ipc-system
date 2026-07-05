import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Import from source to avoid CRA sourcemap warning on dist bundle
import html2pdf from 'html2pdf.js/src';
import IpcPrintSheet from './IpcPrintSheet';
import '../ipcPrint.css';

function LaporanCetak({ user }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [ipcCardData, setIpcCardData] = useState(null);
  const [ipcLoading, setIpcLoading] = useState(false);
  const [bulkPrintCards, setBulkPrintCards] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setSelectedStudentId('');
    setIpcCardData(null);
    setBulkPrintCards([]);
  }, [selectedClass]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/reports/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);

      const uniqueClasses = [...new Set(response.data.map(s => s.kelas).filter(Boolean))];
      setClasses(uniqueClasses.sort());
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredStudents = () => {
    if (!selectedClass) return students;
    return students.filter(s => s.kelas === selectedClass);
  };

  const fetchIpcCard = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/reports/ipc-card/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };

  const handleLoadIpcPreview = async () => {
    if (!selectedStudentId) {
      alert('Pilih siswa terlebih dahulu');
      return;
    }

    setIpcLoading(true);
    setBulkPrintCards([]);
    try {
      const data = await fetchIpcCard(selectedStudentId);
      setIpcCardData(data);
    } catch (error) {
      console.error('Error fetching IPC card:', error);
      alert(error.response?.data?.message || 'Gagal memuat data IPC');
    } finally {
      setIpcLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    const el = document.getElementById('ipc-print-area');
    if (!el) {
      alert('Area print tidak ditemukan');
      return;
    }
    if (!ipcCardData && bulkPrintCards.length === 0) {
      alert('Muat preview IPC terlebih dahulu');
      return;
    }

    const filename = bulkPrintCards.length > 0
      ? `IPC_${selectedClass || 'KELAS'}.pdf`
      : `IPC_${ipcCardData?.student?.nama || 'SISWA'}.pdf`;

    try {
      setIpcLoading(true);
      await html2pdf()
        .set({
          margin: 0,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 1.5, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: 'css' },
        })
        .from(el)
        .save();
    } catch (e) {
      console.error(e);
      alert('Gagal membuat PDF');
    } finally {
      setIpcLoading(false);
    }
  };

  const handleBulkPrintClass = async () => {
    if (!selectedClass) {
      alert('Pilih kelas terlebih dahulu');
      return;
    }

    const classStudents = getFilteredStudents();
    if (classStudents.length === 0) {
      alert('Tidak ada siswa di kelas ini');
      return;
    }

    setBulkLoading(true);
    setIpcCardData(null);
    try {
      const cards = await Promise.all(
        classStudents.map(async (student) => fetchIpcCard(student.id))
      );
      setBulkPrintCards(cards);
    } catch (error) {
      console.error('Error loading bulk IPC cards:', error);
      alert(error.response?.data?.message || 'Gagal memuat data IPC kelas');
    } finally {
      setBulkLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const filteredStudents = getFilteredStudents();
  const hasPrintPreview = ipcCardData || bulkPrintCards.length > 0;

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2 className="ipc-print-no-print laporan-cetak-title" style={{ marginBottom: '20px' }}>Laporan & Cetak</h2>

      <div className="ipc-print-no-print" style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Filter Kelas:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd', minWidth: '200px' }}
        >
          <option value="">Semua Kelas</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div className="ipc-print-no-print" style={{ marginBottom: '24px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '12px' }}>Cetak Individual Point Card (IPC)</h3>
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          Format cetak mengikuti lembar IPC resmi sekolah (satu siswa per halaman A4).
        </p>

        <div className="ipc-print-toolbar">
          <div>
            <label htmlFor="ipc-student-select">Siswa:</label>
            <select
              id="ipc-student-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">{selectedClass ? '— Pilih siswa —' : '— Pilih kelas dulu —'}</option>
              {filteredStudents.map(s => (
                <option key={s.id} value={s.id}>{s.nama} ({s.nis})</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleLoadIpcPreview} disabled={!selectedStudentId || ipcLoading}>
            {ipcLoading ? 'Memuat...' : 'Muat Preview'}
          </button>
          <button type="button" onClick={handleBulkPrintClass} disabled={!selectedClass || bulkLoading}>
            {bulkLoading ? 'Memuat kelas...' : 'Muat Semua Siswa Kelas'}
          </button>
          <button type="button" onClick={handleDownloadPdf} disabled={!hasPrintPreview || ipcLoading}>
            {ipcLoading ? 'Membuat PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {hasPrintPreview && (
        <div className="ipc-print-preview-wrap">
          <h3 className="ipc-print-no-print" style={{ marginBottom: '16px' }}>
            Preview IPC
            {bulkPrintCards.length > 0
              ? ` — ${bulkPrintCards.length} siswa`
              : ipcCardData?.student?.nama
                ? ` — ${ipcCardData.student.nama}`
                : ''}
          </h3>

          <div id="ipc-print-area">
            {bulkPrintCards.length > 0
              ? bulkPrintCards.map((card) => (
                <IpcPrintSheet
                  key={card.student.id}
                  student={card.student}
                  wali={card.wali}
                  history={card.history}
                />
              ))
              : ipcCardData && (
                <IpcPrintSheet
                  student={ipcCardData.student}
                  wali={ipcCardData.wali}
                  history={ipcCardData.history}
                />
              )}
          </div>
        </div>
      )}

      <div className="ipc-print-no-print laporan-cetak-bulk" style={{ marginTop: '24px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>
          Preview Data ({selectedClass ? `Kelas ${selectedClass}` : 'Semua Kelas'}) - {filteredStudents.length} Siswa
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Nama</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>NIS</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Kelas</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Jurusan</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Total IPC</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.nama}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.nis}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.kelas}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.jurusan || '-'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>{student.ipc_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LaporanCetak;
