import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PembinaApprovals() {
  const [approvals, setApprovals] = useState({
    prestasi: [],
    event: [],
    organisasi: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('prestasi');
  const [selectedItem, setSelectedItem] = useState(null);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/approvals-v2/pembina', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApprovals(response.data);
    } catch (error) {
      console.error('Error fetching approvals:', error);
      setMessage('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (type, id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/approvals-v2/pembina/${type}/${id}`, {
        status: 'approved',
        notes: notes || 'Disetujui oleh Pembina'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('Berhasil disetujui! Menunggu persetujuan SuperAdmin.');
      setSelectedItem(null);
      setNotes('');
      fetchApprovals();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menyetujui');
    }
  };

  const handleReject = async (type, id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/approvals-v2/pembina/${type}/${id}`, {
        status: 'rejected',
        notes: notes || 'Ditolak oleh Pembina'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('Pengajuan ditolak');
      setSelectedItem(null);
      setNotes('');
      fetchApprovals();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menolak');
    }
  };

  const renderTable = (data, type) => {
    if (data.length === 0) {
      return <p className="text-muted">Tidak ada pengajuan yang menunggu persetujuan</p>;
    }

    const typeLabels = {
      prestasi: { title: 'Lomba', field: 'nama_lomba' },
      event: { title: 'Event', field: 'nama_event' },
      organisasi: { title: 'Organisasi', field: 'kategori_organisasi' }
    };

    const getPhotoUrl = (path) => {
      if (!path) return null;
      // If it's already a full URL (http/https or Google Drive), use as-is
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
      }
      // If it's a full local Windows path, extract just the filename
      let cleanPath = path;
      if (path.includes('\\') || path.includes(':')) {
        // Extract filename from full path
        cleanPath = path.split('\\').pop();
        cleanPath = `/uploads/approvals/${cleanPath}`;
      } else if (!path.startsWith('/')) {
        // If it's a relative path without leading slash, add it
        cleanPath = `/${path}`;
      }
      return `http://localhost:5000${cleanPath}`;
    };

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nama Siswa</th>
            <th>NIS</th>
            <th>{typeLabels[type].title}</th>
            <th>Kelas</th>
            <th>Foto</th>
            <th>Tanggal Pengajuan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>{item.nis}</td>
              <td>{item[typeLabels[type].field]}</td>
              <td>{item.kelas}</td>
              <td>
                <div>
                  {item.user_foto && (
                    <div style={{ marginBottom: '5px' }}>
                      <small style={{ display: 'block', color: '#666' }}>Foto Siswa:</small>
                      <img 
                        src={getPhotoUrl(item.user_foto)} 
                        alt="Foto Siswa" 
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => window.open(getPhotoUrl(item.user_foto), '_blank')}
                        title="Klik untuk memperbesar"
                      />
                    </div>
                  )}
                  {item.foto_path && (
                    <div>
                      <small style={{ display: 'block', color: '#666' }}>Foto Bukti:</small>
                      <img 
                        src={getPhotoUrl(item.foto_path)} 
                        alt="Foto Bukti" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => window.open(getPhotoUrl(item.foto_path), '_blank')}
                        title="Klik untuk memperbesar"
                      />
                      <div style={{ marginTop: '3px' }}>
                        <a href={getPhotoUrl(item.foto_path)} download target="_blank" rel="noopener noreferrer">
                          <button className="btn btn-sm btn-primary" style={{ padding: '2px 6px', fontSize: '10px' }}>
                            ⬇️ Download
                          </button>
                        </a>
                      </div>
                    </div>
                  )}
                  {!item.user_foto && !item.foto_path && <span className="text-muted">-</span>}
                </div>
              </td>
              <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
              <td>
                {item.pembina_status === 'pending' ? (
                  <>
                    <button 
                      className="btn btn-success" 
                      onClick={() => setSelectedItem({ ...item, type, action: 'approve' })}
                      style={{ marginRight: '5px', padding: '6px 12px', fontSize: '13px' }}
                    >
                      ✅ Setuju
                    </button>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => setSelectedItem({ ...item, type, action: 'reject' })}
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                    >
                      ❌ Tolak
                    </button>
                  </>
                ) : item.pembina_status === 'approved' ? (
                  <span className="badge badge-success">✅ Disetujui</span>
                ) : (
                  <span className="badge badge-danger">❌ Ditolak</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const tabs = [
    { key: 'prestasi', label: 'Prestasi', count: approvals.prestasi.length },
    { key: 'event', label: 'Event', count: approvals.event.length },
    { key: 'organisasi', label: 'Organisasi', count: approvals.organisasi.length }
  ];

  return (
    <div>
      <h2>Persetujuan Pembina</h2>
      <p>Daftar pengajuan siswa yang memerlukan persetujuan Anda sebagai Pembina</p>
      
      {message && <div className="alert alert-info">{message}</div>}

      <div className="tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="badge badge-danger" style={{ marginLeft: '5px' }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="card">
        {renderTable(approvals[activeTab], activeTab)}
      </div>

      {selectedItem && (
        <div className="modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <h3>
              {selectedItem.action === 'reject' ? 'Tolak Pengajuan' : 'Setujui Pengajuan'}
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <p><strong>Siswa:</strong> {selectedItem.nama} ({selectedItem.nis})</p>
              <p><strong>Kelas:</strong> {selectedItem.kelas}</p>
              {selectedItem.type === 'prestasi' && (
                <>
                  <p><strong>Lomba:</strong> {selectedItem.nama_lomba}</p>
                  <p><strong>Juara:</strong> {selectedItem.juara}</p>
                </>
              )}
              {selectedItem.type === 'event' && (
                <>
                  <p><strong>Event:</strong> {selectedItem.nama_event}</p>
                  <p><strong>Tingkat:</strong> {selectedItem.tingkat}</p>
                </>
              )}
              {selectedItem.type === 'organisasi' && (
                <>
                  <p><strong>Organisasi:</strong> {selectedItem.kategori_organisasi}</p>
                  <p><strong>Jabatan:</strong> {selectedItem.jabatan_organisasi}</p>
                </>
              )}
            </div>

            <div className="form-group">
              <label>Catatan:</label>
              <textarea
                className="form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={selectedItem.action === 'reject' ? 'Alasan penolakan (wajib)' : 'Catatan tambahan (opsional)'}
                rows="3"
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {selectedItem.action === 'reject' ? (
                <button className="btn btn-danger" onClick={() => handleReject(selectedItem.type, selectedItem.id)}>Tolak</button>
              ) : (
                <button className="btn btn-success" onClick={() => handleApprove(selectedItem.type, selectedItem.id)}>Setujui</button>
              )}
              <button className="btn btn-secondary" onClick={() => { setSelectedItem(null); setNotes(''); }}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PembinaApprovals;
