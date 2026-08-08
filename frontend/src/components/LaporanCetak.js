import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../ipcPrint.css';

function LaporanCetak({ user }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [ipcLoading, setIpcLoading] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  
  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setSelectedStudentId('');
    setPdfPreviewUrl(null);
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

  const generatePdfBlob = async () => {
    let data = [];
    
    // If no data yet but a student is selected, fetch it
    if (data.length === 0 && selectedStudentId) {
      try {
        const studentData = await fetchIpcCard(selectedStudentId);
        data = [studentData];
      } catch (error) {
        console.error('Error fetching IPC card:', error);
        return null;
      }
    }
    
    if (data.length === 0) {
      return null;
    }

    try {
      // Create jsPDF instance with selected options
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add content for each student
      
      data.forEach((cardData, index) => {
        if (index > 0) {
          doc.addPage();
        }

        const { student, wali, points, ipcTotal } = cardData;
        const breakdown = points || {
          point_awal: student?.ipc_awal ?? 80,
          prestasi_akademik: 0,
          prestasi_nonakademik: 0,
          tanggung_jawab: 0,
          disiplin: 0,
          kepedulian: 0,
          kemandirian: 0,
          spiritual: 0,
          kejujuran: 0,
          kepercayaan_diri: 0,
          organisasi: 0,
          kepanitiaan: 0,
          event: 0,
          pelanggaran_ringan: 0,
          pelanggaran_sedang: 0,
          pelanggaran_berat: 0
        };

        const total = ipcTotal ?? student?.ipc_total ?? breakdown.point_awal;

        // Header Image
        try {
          const headerImg = '/header.png';
          doc.addImage(headerImg, 'PNG', 20, 10, doc.internal.pageSize.getWidth() - 40, 40);
        } catch (e) {
          console.log('Header image not found, using text fallback');
          // Fallback to text if image fails
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('SMK NEGERI BALI MANDARA', doc.internal.pageSize.getWidth() / 2, 16, { align: 'center' });
        }
        
        // Title
        doc.setFontSize(10);
        doc.setFont('times', 'bold');
        doc.text('INDIVIDUAL POINT CARD', doc.internal.pageSize.getWidth() / 2, 55, { align: 'center' });
        doc.text('SMK NEGERI BALI MANDARA', doc.internal.pageSize.getWidth() / 2, 60, { align: 'center' }); 
        doc.text(`TAHUN PELAJARAN ${new Date().getFullYear()}/${new Date().getFullYear() + 1}`, doc.internal.pageSize.getWidth() / 2, 65, { align: 'center' });

        // Student Info
        let yPos = 72;
        doc.setFontSize(8);
        doc.setFont('times', 'bold');
        
        // Left column
        doc.text('Nama:', 20, yPos);
        doc.setFont('times', 'normal');
        doc.text(student?.nama || '-', 20 + 20, yPos);
        
        yPos += 5;
        doc.setFont('times', 'bold');
        doc.text('NIS:', 20, yPos);
        doc.setFont('times', 'normal');
        const nisNisn = `${student.nis}` || '-';
        doc.text(nisNisn, 20 + 20, yPos);
        
        yPos += 5;
        doc.setFont('times', 'bold');
        doc.text('Wali Kelas:', 20, yPos);
        doc.setFont('times', 'normal');
        doc.text(wali?.nama || 'Putu Andika Wirasatriya, S.Pd.', 20 + 20, yPos);

        // Right column
        yPos = 72;
        const rightX = doc.internal.pageSize.getWidth() - 55;
        doc.setFont('times', 'bold');
        doc.text('Kelas:', rightX, yPos);
        doc.setFont('times', 'normal');
        doc.text(student?.kelas || '-', rightX + 15, yPos);
        
        yPos += 5;
        doc.setFont('times', 'bold');
        doc.text('Grha:', rightX, yPos);
        doc.setFont('times', 'normal');
        doc.text(student?.grha || '-', rightX + 15, yPos);
        
        yPos += 5;
        doc.setFont('times', 'bold');
        doc.text('Semester:', rightX, yPos);
        doc.setFont('times', 'normal');
        doc.text(`${new Date().getFullYear()}/${new Date().getFullYear() + 1}`, rightX + 15, yPos);

        // Table using jspdf-autotable
        const tableData = [
          ['I Point Awal', ''],
          ['', breakdown.point_awal],
          ['II Prestasi', ''],
          ['1. Akademik', breakdown.prestasi_akademik],
          ['2. Non-Akademik', breakdown.prestasi_nonakademik],
          ['III Perkembangan Karakter', ''],
          ['1. Tanggung Jawab', breakdown.tanggung_jawab],
          ['2. Disiplin', breakdown.disiplin],
          ['3. Kepedulian', breakdown.kepedulian],
          ['4. Kemandirian', breakdown.kemandirian],
          ['5. Spiritual', breakdown.spiritual],
          ['6. Kejujuran', breakdown.kejujuran],
          ['7. Kepercayaan Diri', breakdown.kepercayaan_diri],
          ['IV Organisasi', ''],
          ['', breakdown.organisasi],
          ['V Kepanitiaan', ''],
          ['', breakdown.kepanitiaan],
          ['VI Event', ''],
          ['', breakdown.event],
          ['VII Pelanggaran', ''],
          ['1. Ringan', breakdown.pelanggaran_ringan],
          ['2. Sedang', breakdown.pelanggaran_sedang],
          ['3. Berat', breakdown.pelanggaran_berat],
          ['TOTAL POINT IPC', total]
        ];

        autoTable(doc, {
          startY: 88,
          head: [['Point IPC', 'Point']],
          body: tableData,
          theme: 'grid',
          styles: {
            font: 'times',
            fontSize: 8,
            cellPadding: 1.5,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            textColor: [0, 0, 0]
          },
          headStyles: {
            fillColor: [240, 240, 240],
            fontStyle: 'bold',
            halign: 'center',
            fontSize: 8,
            textColor: [0, 0, 0]
          },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 'auto', halign: 'right' }
          },
          margin: { left: 20, right: 20, top: 10, bottom: 20 },
          didParseCell: function(data) {
            // Style section headers (rows where first cell contains Roman numerals or section names)
            const sectionHeaders = ['I Point Awal', 'II Prestasi', 'III Perkembangan Karakter', 'IV Organisasi', 'V Kepanitiaan', 'VI Event', 'VII Pelanggaran', 'TOTAL POINT IPC'];
            if (sectionHeaders.includes(data.row.raw[0])) {
              data.cell.styles.fillColor = [224, 224, 224];
              data.cell.styles.fontStyle = 'bold';
            }
            // Style total row specifically
            if (data.row.raw[0] === 'TOTAL POINT IPC') {
              data.cell.styles.fillColor = [240, 240, 240];
              data.cell.styles.fontStyle = 'bold';
            }
            // Style negative values in red
            if (data.section === 'body' && data.column.index === 1 && typeof data.cell.raw === 'number' && data.cell.raw < 0) {
              data.cell.styles.textColor = [255, 0, 0];
            }
          }
        });

        // Signatures - get the final Y position from the table
        const finalY = doc.lastAutoTable.finalY || 78;
        const sigY = finalY + 8;
        const leftSigX = 20;
        const rightSigX = doc.internal.pageSize.getWidth() - 75;
        
        const formatDate = () => {
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          return new Date().toLocaleDateString('id-ID', options);
        };

        doc.setFontSize(8);
        doc.setFont('times', 'normal');
        doc.text('Mengetahui,', leftSigX, sigY);
        doc.text(`Kubutambahan, ${formatDate()}`, rightSigX, sigY);
        
        doc.setFont('times', 'bold');
        doc.setFontSize(8);
        doc.text('Kepala SMK Negeri Bali Mandara', leftSigX, sigY + 5);
        doc.text('Wali Kelas', rightSigX, sigY + 5);
        
        doc.setFont('times', 'bold');
        doc.setFontSize(8);
        doc.text('Ketut Susila Widiarsana, S.Pd., M.Pd.', leftSigX, sigY + 20);
        doc.text(wali?.nama || 'ERROR', rightSigX, sigY + 20);
        
        doc.setFont('times', 'normal');
        doc.setFontSize(7);
        doc.text('NIP.  19831101 200803 1 001', leftSigX, sigY + 25);
        doc.text(`NIP. ${wali?.nip || '19980913 202321 1 004'}`, rightSigX, sigY + 25);
      });

      return doc.output('blob');
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleDownloadPdf = async () => {
    let filename;
    
    if (selectedStudentId) {
      // Fetch student data to get the name
      try {
        const studentData = await fetchIpcCard(selectedStudentId);
        filename = `IPC_${studentData.student.nama || 'SISWA'}.pdf`;
      } catch {
        filename = `IPC_SISWA.pdf`;
      }
    } else {
      filename = `IPC_SISWA.pdf`;
    }

    try {
      setIpcLoading(true);
      const blob = await generatePdfBlob();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        alert('Gagal membuat PDF');
      }
    } catch (e) {
      console.error(e);
      alert('Gagal membuat PDF');
    } finally {
      setIpcLoading(false);
    }
  };

  const handleGeneratePreview = async () => {
    try {
      setIpcLoading(true);
      const blob = await generatePdfBlob();
      if (blob) {
        const url = URL.createObjectURL(blob);
        setPdfPreviewUrl(url);
      } else {
        alert('Gagal membuat preview PDF');
      }
    } catch (e) {
      console.error(e);
      alert('Gagal membuat preview PDF');
    } finally {
      setIpcLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const filteredStudents = getFilteredStudents();

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
          <button type="button" onClick={handleGeneratePreview} disabled={(!selectedStudentId) || ipcLoading}>
            {ipcLoading ? 'Membuat Preview PDF...' : 'Preview PDF'}
          </button>
          <button type="button" onClick={handleDownloadPdf} disabled={(!selectedStudentId) || ipcLoading}>
            {ipcLoading ? 'Membuat PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {pdfPreviewUrl && (
        <div className="ipc-print-preview-wrap">
          <h3 className="ipc-print-no-print" style={{ marginBottom: '16px' }}>
            Preview PDF
            {selectedStudentId
              ? ` — Siswa Terpilih`
              : ''}
          </h3>

          <div style={{ width: '100%', height: '800px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe
              src={pdfPreviewUrl}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LaporanCetak;
