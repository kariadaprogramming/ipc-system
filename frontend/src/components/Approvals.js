import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toTitleCase } from '../utils/perilaku';

function Approvals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchApprovals();
    fetchPendingCount();
  }, []);

  const fetchApprovals = async () => {
    try {
      const response = await api.get('/approvals-v2/all');
      setApprovals(response.data);
    } catch (error) {
      console.error('Error fetching approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCount = async () => {
    try {
      const response = await api.get('/approvals-v2/pending-count');
      setPendingCount(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching pending count:', error);
    }
  };

  const handleApprove = async (item) => {
    try {
      let endpoint = '';

      switch(item.type) {
        case 'prestasi':
          endpoint = `/approvals-v2/superadmin/prestasi/${item.id}`;
          break;
        case 'organisasi':
          endpoint = `/approvals-v2/superadmin/organisasi/${item.id}`;
          break;
        case 'event':
          endpoint = `/approvals-v2/superadmin/event/${item.id}`;
          break;
        case 'kepanitiaan':
          endpoint = `/approvals-v2/superadmin/kepanitiaan/${item.id}`;
          break;
        case 'pelanggaran':
          endpoint = `/approvals-v2/superadmin/pelanggaran/${item.id}`;
          break;
        case 'perilaku':
          endpoint = `/approvals-v2/superadmin/perilaku/${item.id}`;
          break;
        default:
          return;
      }

      await api.put(endpoint, { status: 'approved' });

      alert('Berhasil diapprove!');
      fetchApprovals();
      fetchPendingCount();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal approve');
    }
  };

  const handleReject = async (item) => {
    const reason = prompt('Masukkan alasan penolakan:');
    if (!reason) return;

    try {
      let endpoint = '';

      switch(item.type) {
        case 'prestasi':
          endpoint = `/approvals-v2/superadmin/prestasi/${item.id}`;
          break;
        case 'organisasi':
          endpoint = `/approvals-v2/superadmin/organisasi/${item.id}`;
          break;
        case 'event':
          endpoint = `/approvals-v2/superadmin/event/${item.id}`;
          break;
        case 'kepanitiaan':
          endpoint = `/approvals-v2/superadmin/kepanitiaan/${item.id}`;
          break;
        case 'pelanggaran':
          endpoint = `/approvals-v2/superadmin/pelanggaran/${item.id}`;
          break;
        case 'perilaku':
          endpoint = `/approvals-v2/superadmin/perilaku/${item.id}`;
          break;
        default:
          return;
      }

      await api.put(endpoint, { status: 'rejected', notes: reason });

      alert('Berhasil direject!');
      fetchApprovals();
      fetchPendingCount();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal reject');
    }
  };

  const renderItemDetails = (item) => {
    switch(item.type) {
      case 'prestasi':
        return (
          <>
            <p><strong>Nama Lomba:</strong> {item.nama_lomba}</p>
            <p><strong>Jenis:</strong> {item.jenis}</p>
            <p><strong>Juara:</strong> {item.juara}</p>
            <p><strong>Kategori:</strong> {item.kategori}</p>
            <p><strong>Point:</strong> {item.point}</p>
          </>
        );
      case 'organisasi':
        return (
          <>
            <p><strong>Jabatan:</strong> {item.jabatan_organisasi}</p>
            <p><strong>Kategori:</strong> {item.kategori_organisasi}</p>
            <p><strong>Point:</strong> {item.point}</p>
          </>
        );
      case 'event':
        return (
          <>
            <p><strong>Nama Event:</strong> {item.nama_event}</p>
            <p><strong>Tingkat:</strong> {item.tingkat}</p>
            <p><strong>Point:</strong> {item.point}</p>
          </>
        );
      case 'pelanggaran':
        return (
          <>
            <p><strong>Keterangan:</strong> {item.keterangan}</p>
            <p><strong>Jenis:</strong> {item.jenis_pelanggaran}</p>
            <p><strong>Point Dikurangi:</strong> {typeof item.point_dikurangi === 'number' && item.point_dikurangi > 0 ? '-' : ''}{item.point_dikurangi}</p>
          </>
        );
      case 'perilaku':
        return (
          <>
            <p><strong>Karakter:</strong> {toTitleCase(item.karakter_siswa)}</p>
            <p><strong>Point:</strong> {item.point}</p>
          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Approvals</h2>
        {pendingCount > 0 && (
          <span style={{
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            minWidth: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '0 8px'
          }}>
            {pendingCount}
          </span>
        )}
      </div>
      <p>Pending submissions yang menunggu approval</p>
      
      {approvals.length === 0 ? (
        <div className="card">
          <p>Tidak ada pending submissions</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Tipe</th>
                <th>Diajukan Oleh</th>
                <th>Nama Siswa</th>
                <th>NIS</th>
                <th>Detail</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map(item => (
                <tr key={`${item.type}-${item.id}`}>
                  <td>
                    <span className={`badge badge-${item.type === 'pelanggaran' ? 'danger' : 'info'}`}>
                      {item.type.toUpperCase()}
                    </span>
                  </td>
                  <td>{item.user_name || item.submitted_by || 'Unknown'}</td>
                  <td>{item.nama}</td>
                  <td>{item.nis}</td>
                  <td>
                    {renderItemDetails(item)}
                  </td>
                  <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(item)}
                      style={{ padding: '5px 10px', marginRight: '5px' }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(item)}
                      style={{ padding: '5px 10px' }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Approvals;
