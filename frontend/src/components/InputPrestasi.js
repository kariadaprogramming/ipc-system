import { useState, useEffect } from 'react';
import axios from 'axios';
import { KELAS_OPTIONS, JURUSAN_OPTIONS, applyKelasChange, jurusanFromKelas, isJurusanLocked } from '../utils/kelasJurusan';

function InputPrestasi() {
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    jenis: 'akademik',
    nama_lomba: '',
    jurusan: 'TKJ',
    kelas: '',
    pembina: '',
    grha: '',
    juara: 'juara 1',
    kategori: 'kecamatan'
  });
  const [foto, setFoto] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [hasAccess, setHasAccess] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [accessMessage, setAccessMessage] = useState('');
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [nisLoading, setNisLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allPrestasi, setAllPrestasi] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editFoto, setEditFoto] = useState(null);

  const grhaOptions = [
    'Airsanya', 'Daksina', 'Genya', 'Madhya', 'Nairiti', 'Pascima', 'Purwa', 'Uttara', 'Wayabhya'
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.role || '');
    fetchTeachers();
    fetchUserSubmissions();
    checkAccess();
    if (user.role === 'superadmin') {
      fetchAllPrestasi();
    }
  }, []);

  const fetchAllPrestasi = async () => {
    try {
      setLoadingIndex(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/prestasi/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllPrestasi(response.data);
    } catch (error) {
      console.error('Error fetching all prestasi:', error);
    } finally {
      setLoadingIndex(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditFormData({
      nama: item.nama,
      nis: item.nis,
      jenis: item.jenis,
      nama_lomba: item.nama_lomba,
      jurusan: item.jurusan,
      kelas: item.kelas,
      pembina: item.pembina || '',
      grha: item.grha || '',
      juara: item.juara,
      kategori: item.kategori
    });
    setEditFoto(null);
    setShowEditModal(true);
  };

  const handleEditFileChange = (e) => {
    setEditFoto(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      Object.keys(editFormData).forEach(key => {
        data.append(key, editFormData[key]);
      });
      if (editFoto) {
        const fileToUpload = editFormData.nis
          ? new File([editFoto], `${editFormData.nis}_${editFormData.nama_lomba}`, { type: editFoto.type })
          : editFoto;
        data.append('foto', fileToUpload);
      }
      await axios.put(`/prestasi/${editingItem.id}`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Data berhasil diupdate!');
      setShowEditModal(false);
      fetchAllPrestasi();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengupdate data');
    } finally {
      setLoading(false);
    }
  };

  const checkAccess = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Superadmin always has access
      if (user.role === 'superadmin') {
        setHasAccess(true);
        setCheckingAccess(false);
        return;
      }
      
      const response = await axios.get('/input-access/status/my-access', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('[Access Check] Response:', response.data);
      
      const canInputPrestasi = response.data.prestasi;
      setHasAccess(canInputPrestasi);
      
      if (!canInputPrestasi) {
        setAccessMessage('Anda tidak memiliki izin untuk input data prestasi. Silakan hubungi SuperAdmin.');
      }
    } catch (error) {
      console.error('Error checking access:', error);
      // Fail open - allow access if error
      setHasAccess(true);
    } finally {
      setCheckingAccess(false);
    }
  };

  // const checkPermission = async () => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user?.role === 'superadmin') {
  //     setHasPermission(true);
  //     setCheckingPermission(false);
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.get('/permissions/' + user.id, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setHasPermission(response.data.can_input_prestasi === true);
  //   } catch (error) {
  //     console.error('Error checking permission:', error);
  //     setHasPermission(false);
  //   } finally {
  //     setCheckingPermission(false);
  //   }
  // };

  const fetchUserSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/approvals-v2/user-submissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(response.data.prestasi || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/prestasi/teachers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'kelas') {
      setFormData(prev => applyKelasChange(prev, value));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === 'nis' && value.length >= 1) {
      fetchStudentData(value);
    }
  };

  const fetchStudentData = async (nis) => {
    try {
      setNisLoading(true);
      console.log('Fetching student data for NIS:', nis);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/users/nis/${nis}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Student data response:', response.data);
      
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          nama: response.data.nama || '',
          kelas: response.data.kelas || '',
          jurusan: jurusanFromKelas(response.data.kelas) || response.data.jurusan || '',
          grha: response.data.grha || ''
        }));
        setIsAutoFilled(true);
        console.log('Form data updated:', { nama: response.data.nama, kelas: response.data.kelas, jurusan: response.data.jurusan, grha: response.data.grha });
      }
    } catch (error) {
      // Student not found or error, don't show error to user and don't auto-fill
      console.log('Student not found or error fetching data:', error.message);
      // Don't update form data if student not found
    } finally {
      setNisLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (foto) {
        // Prepend NIS to filename if NIS exists
        const fileToUpload = formData.nis
          ? new File([foto], `${formData.nis}_${foto.name}`, { type: foto.type })
          : foto;
        data.append('foto', fileToUpload);
      }

      const response = await axios.post('/approvals-v2/prestasi/submit', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Use message from backend response (different for superadmin vs regular user)
      setMessage(response.data?.message || 'Data prestasi berhasil dikirim!');
      fetchUserSubmissions();
      if (userRole === 'superadmin') {
        fetchAllPrestasi();
      }
      setFormData({
        nama: '',
        nis: '',
        jenis: 'akademik',
        nama_lomba: '',
        jurusan: 'TKJ',
        kelas: '',
        pembina: '',
        grha: '',
        juara: 'juara 1',
        kategori: 'kecamatan'
      });
      setFoto(null);
      setIsAutoFilled(false);
      setShowForm(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengirim prestasi');
    } finally {
      setLoading(false);
    }
  };

  // Permission checking disabled for now
  // if (checkingPermission) {
  //   return <div className="loading"><div className="spinner"></div></div>;
  // }

  if (checkingAccess) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!hasAccess) {
    return (
      <div className="card">
        <h2>🚫 Akses Ditolak</h2>
        <div className="alert alert-danger" style={{ marginTop: '15px' }}>
          {accessMessage || 'Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi SuperAdmin.'}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Input Prestasi</h2>
        {userRole === 'superadmin' && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Tutup Form' : '+ Input Prestasi Baru'}
          </button>
        )}
      </div>
      
      {message && (
        <div className="alert alert-success" style={{ marginBottom: '16px' }}>
          {message}
        </div>
      )}
      
      {/* Index Display for Superadmin */}
      {userRole === 'superadmin' && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>📋 Index Prestasi</h3>
          {loadingIndex ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Nama</th>
                    <th>NIS</th>
                    <th>Lomba</th>
                    <th>Jenis</th>
                    <th>Juara</th>
                    <th>Kategori</th>
                    <th>Pembina</th>
                    <th>Point</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {allPrestasi.map(item => (
                    <tr key={item.id}>
                      <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                      <td>{item.nama}</td>
                      <td>{item.nis}</td>
                      <td>{item.nama_lomba}</td>
                      <td>{item.jenis}</td>
                      <td>{item.juara}</td>
                      <td>{item.kategori}</td>
                      <td>{item.pembina || '-'}</td>
                      <td>{item.point}</td>
                      <td>{getStatusBadge(item)}</td>
                      <td>
                        <button className="btn btn-info" onClick={() => handleEdit(item)} style={{ padding: '3px 8px', fontSize: '12px' }}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allPrestasi.length === 0 && (
                <p className="text-muted">Belum ada data prestasi</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Input Form - Show for non-superadmin or when showForm is true */}
      {(userRole !== 'superadmin' || showForm) && (
        <div style={{
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
          <div className="card" style={{ width: 500, maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3>Input Prestasi Baru</h3>
            <button className="btn btn-danger" onClick={() => setShowForm(false)} style={{ marginBottom: '10px' }}>Tutup</button>
            <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label>Nama <span className="required">*</span></label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama siswa"
              required
              disabled={isAutoFilled}
              style={{ backgroundColor: isAutoFilled ? '#f0f0f0' : '' }}
            />
            {isAutoFilled && <p className="form-helper-text">Data diisi otomatis dari NIS</p>}
          </div>
          <div className="form-group">
            <label>NIS <span className="required">*</span></label>
            <input
              type="text"
              name="nis"
              value={formData.nis}
              onChange={handleChange}
              placeholder="Masukkan NIS siswa"
              required
              className={nisLoading ? 'auto-fill-loading' : (isAutoFilled ? 'auto-fill-success' : 'nis-input-highlight')}
            />
            <p className="form-helper-text">Masukkan NIS untuk mengisi data siswa secara otomatis</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label>Jenis</label>
            <select name="jenis" value={formData.jenis} onChange={handleChange}>
              <option value="akademik">Akademik</option>
              <option value="nonakademik">Non-Akademik</option>
            </select>
          </div>
          <div className="form-group">
            <label>Jurusan</label>
            <select name="jurusan" value={formData.jurusan} onChange={handleChange} disabled={isJurusanLocked(formData.kelas, isAutoFilled)} style={{ backgroundColor: isJurusanLocked(formData.kelas, isAutoFilled) ? '#f0f0f0' : '' }}>
              {JURUSAN_OPTIONS.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Nama Lomba</label>
          <input
            type="text"
            name="nama_lomba"
            value={formData.nama_lomba}
            onChange={handleChange}
            placeholder="Nama lomba"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label>Kelas</label>
            <select name="kelas" value={formData.kelas} onChange={handleChange} required disabled={isAutoFilled} style={{ backgroundColor: isAutoFilled ? '#f0f0f0' : '' }}>
              <option value="">Pilih Kelas</option>
              {KELAS_OPTIONS.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Grha</label>
            <select name="grha" value={formData.grha} onChange={handleChange} disabled={isAutoFilled} style={{ backgroundColor: isAutoFilled ? '#f0f0f0' : '' }}>
              <option value="">Pilih Grha</option>
              {grhaOptions.map(grha => (
                <option key={grha} value={grha}>{grha}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Pembina</label>
          <select name="pembina" value={formData.pembina} onChange={handleChange}>
            <option value="">Pilih Pembina</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.nama}>{teacher.nama} ({teacher.nip})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Foto Bukti</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label>Juara</label>
            <select name="juara" value={formData.juara} onChange={handleChange}>
              <option value="juara 1">Juara 1</option>
              <option value="juara 2">Juara 2</option>
              <option value="juara 3">Juara 3</option>
              <option value="juara harapan 1">Juara Harapan 1</option>
              <option value="juara harapan 2">Juara Harapan 2</option>
              <option value="juara harapan 3">Juara Harapan 3</option>
              <option value="finalis">Finalis</option>
              <option value="peserta">Peserta</option>
            </select>
          </div>
          <div className="form-group">
            <label>Kategori</label>
            <select name="kategori" value={formData.kategori} onChange={handleChange}>
              <option value="kecamatan">Kecamatan</option>
              <option value="kabupaten">Kabupaten</option>
              <option value="provinsi">Provinsi</option>
              <option value="nasional">Nasional</option>
              <option value="internasional">Internasional</option>
            </select>
          </div>
        </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Mengirim...' : (JSON.parse(localStorage.getItem('user') || '{}').role === 'superadmin' ? 'Kirim' : 'Ajukan untuk Persetujuan')}
            </button>
          </form>
        </div>
      </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div style={{
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
          <div className="card" style={{ width: 500, maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3>Edit Prestasi</h3>
            <button className="btn btn-danger" onClick={() => setShowEditModal(false)} style={{ marginBottom: '10px' }}>Tutup</button>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Nama</label>
                <input type="text" value={editFormData.nama || ''} onChange={(e) => setEditFormData({...editFormData, nama: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>NIS</label>
                <input type="text" value={editFormData.nis || ''} onChange={(e) => setEditFormData({...editFormData, nis: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Jenis</label>
                <select value={editFormData.jenis || 'akademik'} onChange={(e) => setEditFormData({...editFormData, jenis: e.target.value})}>
                  <option value="akademik">Akademik</option>
                  <option value="non-akademik">Non-Akademik</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nama Lomba</label>
                <input type="text" value={editFormData.nama_lomba || ''} onChange={(e) => setEditFormData({...editFormData, nama_lomba: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Kelas</label>
                <select value={editFormData.kelas || ''} onChange={(e) => setEditFormData({...editFormData, kelas: e.target.value})}>
                  <option value="">Pilih Kelas</option>
                  {KELAS_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Jurusan</label>
                <select value={editFormData.jurusan || 'TKJ'} disabled>
                  {JURUSAN_OPTIONS.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Pembina</label>
                <input type="text" value={editFormData.pembina || ''} onChange={(e) => setEditFormData({...editFormData, pembina: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Grha</label>
                <select value={editFormData.grha || ''} onChange={(e) => setEditFormData({...editFormData, grha: e.target.value})}>
                  <option value="">Pilih Grha</option>
                  {grhaOptions.map(grha => <option key={grha} value={grha}>{grha}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Juara</label>
                <select value={editFormData.juara || 'juara 1'} onChange={(e) => setEditFormData({...editFormData, juara: e.target.value})}>
                  <option value="juara 1">Juara 1</option>
                  <option value="juara 2">Juara 2</option>
                  <option value="juara 3">Juara 3</option>
                  <option value="harapan 1">Harapan 1</option>
                  <option value="harapan 2">Harapan 2</option>
                  <option value="partisipasi">Partisipasi</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select value={editFormData.kategori || 'kecamatan'} onChange={(e) => setEditFormData({...editFormData, kategori: e.target.value})}>
                  <option value="kecamatan">Kecamatan</option>
                  <option value="kabupaten">Kabupaten</option>
                  <option value="provinsi">Provinsi</option>
                  <option value="nasional">Nasional</option>
                  <option value="internasional">Internasional</option>
                </select>
              </div>
              <div className="form-group">
                <label>Foto Bukti</label>
                <input type="file" onChange={handleEditFileChange} accept="image/*" />
                {editingItem && editingItem.foto && (
                  <div style={{ marginTop: '10px' }}>
                    <small>Foto saat ini: {editingItem.foto}</small>
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>Update</button>
            </form>
          </div>
        </div>
      )}

      {/* Submission History - Hidden for Superadmin */}
      {JSON.parse(localStorage.getItem('user') || '{}').role !== 'superadmin' && (
        <div style={{ marginTop: '30px' }}>
          <h3>Riwayat Pengajuan</h3>
          {submissions.length === 0 ? (
            <p className="text-muted">Belum ada pengajuan</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Lomba</th>
                  <th>Juara</th>
                  <th>Pembina</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.slice(0, 5).map(item => (
                  <tr key={item.id}>
                    <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                    <td>{item.nama_lomba}</td>
                    <td>{item.juara}</td>
                    <td>{item.pembina || '-'}</td>
                    <td>{getStatusBadge(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

function getStatusBadge(item) {
  if (item.status === 'rejected') {
    return <span className="badge badge-danger">Ditolak</span>;
  }
  if (item.status === 'approved') {
    return <span className="badge badge-success">Disetujui</span>;
  }
  return <span className="badge badge-warning">Menunggu</span>;
}

export default InputPrestasi;
