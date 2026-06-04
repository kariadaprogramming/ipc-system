import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IpcReport.css';

function IpcReport({ studentId, onClose }) {
  const [studentData, setStudentData] = useState(null);
  const [ipcData, setIpcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [printDate, setPrintDate] = useState(new Date().toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }));

  useEffect(() => {
    fetchReportData();
  }, [studentId]);

  const fetchReportData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch student data
      const studentResponse = await axios.get(`/users/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch IPC data
      const ipcResponse = await axios.get(`/ipc/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStudentData(studentResponse.data);
      setIpcData(ipcResponse.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!ipcData) return 0;
    
    let total = ipcData.point_awal || 50;
    total += ipcData.prestasi_akademik || 0;
    total += ipcData.prestasi_nonakademik || 0;
    total += ipcData.tanggung_jawab || 0;
    total += ipcData.disiplin || 0;
    total += ipcData.kepedulian || 0;
    total += ipcData.kemandirian || 0;
    total += ipcData.spiritual || 0;
    total += ipcData.kejujuran || 0;
    total += ipcData.kepercayaan_diri || 0;
    total += ipcData.organisasi || 0;
    total += ipcData.kepanitiaan || 0;
    total += ipcData.event || 0;
    total -= ipcData.pelanggaran_ringan || 0;
    total -= ipcData.pelanggaran_sedang || 0;
    total -= ipcData.pelanggaran_berat || 0;
    
    return total;
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!studentData || !ipcData) {
    return <div className="card">Data tidak tersedia</div>;
  }

  const total = calculateTotal();

  return (
    <div className="ipc-report-container">
      <div className="ipc-report">
        {/* Header */}
        <div className="report-header">
          <img src="./public/logo.png" alt="Logo" />
        </div>

        <div className="report-divider"></div>

        {/* Title */}
        <div className="report-title">
          <h2>INDIVIDUAL POINT CARD</h2>
          <p>Tahun Ajaran 2025/2026</p>
        </div>

        {/* Student Information */}
        <div className="student-info">
          <div className="info-row">
            <span className="info-label">Nama:</span>
            <span className="info-value">{studentData.nama}</span>
          </div>
          <div className="info-row">
            <span className="info-label">NIS/NISN:</span>
            <span className="info-value">{studentData.nis}/{studentData.nisn || '-'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Kelas:</span>
            <span className="info-value">{studentData.kelas}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Grha:</span>
            <span className="info-value">{studentData.grha}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Wali Kelas:</span>
            <span className="info-value">{studentData.wali_kelas || 'Putu Andika Wirasatriya, S.Pd.'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Semester:</span>
            <span className="info-value">2025/2026</span>
          </div>
        </div>

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
                <td className="point-value">{ipcData.point_awal || 50}</td>
              </tr>

              <tr className="section-header">
                <td colSpan="2">II Prestasi</td>
              </tr>
              <tr>
                <td>1. Akademik</td>
                <td className="point-value">{ipcData.prestasi_akademik || 0}</td>
              </tr>
              <tr>
                <td>2. Non-Akademik</td>
                <td className="point-value">{ipcData.prestasi_nonakademik || 0}</td>
              </tr>

              <tr className="section-header">
                <td colSpan="2">III Perkembangan Karakter</td>
              </tr>
              <tr>
                <td>1. Tanggung Jawab</td>
                <td className="point-value">{ipcData.tanggung_jawab || 3}</td>
              </tr>
              <tr>
                <td>2. Disiplin</td>
                <td className="point-value">{ipcData.disiplin || 3}</td>
              </tr>
              <tr>
                <td>3. Kepedulian</td>
                <td className="point-value">{ipcData.kepedulian || 3}</td>
              </tr>
              <tr>
                <td>4. Kemandirian</td>
                <td className="point-value">{ipcData.kemandirian || 3}</td>
              </tr>
              <tr>
                <td>5. Spiritual</td>
                <td className="point-value">{ipcData.spiritual || 3}</td>
              </tr>
              <tr>
                <td>6. Kejujuran</td>
                <td className="point-value">{ipcData.kejujuran || 3}</td>
              </tr>
              <tr>
                <td>7. Kepercayaan Diri</td>
                <td className="point-value">{ipcData.kepercayaan_diri || 3}</td>
              </tr>

              <tr className="section-header">
                <td colSpan="2">IV Organisasi</td>
              </tr>
              <tr>
                <td></td>
                <td className="point-value">{ipcData.organisasi || 0}</td>
              </tr>

              <tr className="section-header">
                <td colSpan="2">V Kepanitiaan</td>
              </tr>
              <tr>
                <td></td>
                <td className="point-value">{ipcData.kepanitiaan || 0}</td>
              </tr>

              <tr className="section-header">
                <td colSpan="2">VI Event</td>
              </tr>
              <tr>
                <td></td>
                <td className="point-value">{ipcData.event || 0}</td>
              </tr>

              <tr className="section-header">
                <td colSpan="2">VII Pelanggaran</td>
              </tr>
              <tr>
                <td>1. Ringan</td>
                <td className="point-value negative">{ipcData.pelanggaran_ringan || 0}</td>
              </tr>
              <tr>
                <td>2. Sedang</td>
                <td className="point-value negative">{ipcData.pelanggaran_sedang || 0}</td>
              </tr>
              <tr>
                <td>3. Berat</td>
                <td className="point-value negative">{ipcData.pelanggaran_berat || 0}</td>
              </tr>

              <tr className="total-row">
                <td><strong>TOTAL POINT IPC</strong></td>
                <td className="point-value total"><strong>{total}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div className="signatures">
          <div className="signature-block">
            <p>Kubutambahan, {printDate}</p>
            <p className="signature-title">Kepala SMK Negeri Bali Mandara</p>
            <div className="signature-space"></div>
            <p className="signature-name">Ketut Susila Widiarsana, S.Pd., M.Pd.</p>
            <p className="signature-nip">NIP. 19831191 200803 1 001</p>
          </div>
          <div className="signature-block">
            <p>Kubutambahan, {printDate}</p>
            <p className="signature-title">Wali Kelas</p>
            <div className="signature-space"></div>
            <p className="signature-name">{studentData.wali_kelas || 'Putu Andika Wirasatriya, S.Pd.'}</p>
            <p className="signature-nip">NIP. 19980913 202321 1 004</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="report-actions">
        <button className="btn btn-primary" onClick={handlePrint}>Cetak Laporan</button>
        <button className="btn btn-danger" onClick={onClose}>Tutup</button>
      </div>
    </div>
  );
}

export default IpcReport;
