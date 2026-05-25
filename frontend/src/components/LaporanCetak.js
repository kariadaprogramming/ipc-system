import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function LaporanCetak({ user }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/reports/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
      
      // Extract unique classes
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

  const exportToExcel = () => {
    const data = getFilteredStudents();
    const worksheet = XLSX.utils.json_to_sheet(data.map(s => ({
      Nama: s.nama,
      NIS: s.nis,
      Kelas: s.kelas,
      Jurusan: s.jurusan || '-',
      'Total IPC': s.ipc_total
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan IPC');
    XLSX.writeFile(workbook, `laporan_ipc_${selectedClass || 'semua'}.xlsx`);
  };

  const exportToWord = () => {
    const data = getFilteredStudents();
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'><title>Laporan IPC</title></head><body>`;
    const tableRows = data.map(s => 
      `<tr><td>${s.nama}</td><td>${s.nis}</td><td>${s.kelas}</td><td>${s.jurusan || '-'}</td><td>${s.ipc_total}</td></tr>`
    ).join('');
    const table = `
      <table border='1' style='border-collapse: collapse; width: 100%;'>
        <tr style='background-color: #4CAF50; color: white;'>
          <th style='padding: 10px;'>Nama</th>
          <th style='padding: 10px;'>NIS</th>
          <th style='padding: 10px;'>Kelas</th>
          <th style='padding: 10px;'>Jurusan</th>
          <th style='padding: 10px;'>Total IPC</th>
        </tr>
        ${tableRows}
      </table>
    `;
    const footer = `</body></html>`;
    const sourceHTML = header + `<h2>Laporan IPC ${selectedClass ? '- Kelas ' + selectedClass : '- Semua Kelas'}</h2>` + table + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `laporan_ipc_${selectedClass || 'semua'}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const exportToPDF = () => {
    const data = getFilteredStudents();
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Laporan IPC ${selectedClass ? '- Kelas ' + selectedClass : '- Semua Kelas'}`, 14, 22);
    
    doc.setFontSize(10);
    doc.text(`Total Siswa: ${data.length}`, 14, 30);
    
    const tableColumn = ['Nama', 'NIS', 'Kelas', 'Jurusan', 'Total IPC'];
    const tableRows = data.map(s => [s.nama, s.nis, s.kelas, s.jurusan || '-', s.ipc_total.toString()]);
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [76, 175, 80] }
    });
    
    doc.save(`laporan_ipc_${selectedClass || 'semua'}.pdf`);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Laporan & Cetak</h2>
      
      <div style={{ marginBottom: '20px' }}>
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

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={exportToExcel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#217346',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📊 Export Excel
        </button>
        <button 
          onClick={exportToWord}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2b579a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📝 Export Word
        </button>
        <button 
          onClick={exportToPDF}
          style={{
            padding: '10px 20px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📄 Export PDF
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>
          Preview Data ({selectedClass ? `Kelas ${selectedClass}` : 'Semua Kelas'}) - {getFilteredStudents().length} Siswa
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
            {getFilteredStudents().map((student, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
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
