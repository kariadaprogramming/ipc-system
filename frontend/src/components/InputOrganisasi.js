import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KELAS_OPTIONS, JURUSAN_OPTIONS, applyKelasChange, jurusanFromKelas, isJurusanLocked } from '../utils/kelasJurusan';

function InputOrganisasi() {
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    kelas: '',
    grha: '',
    jurusan: 'TKJ',
    pembina: '',
    jabatan_organisasi: '',
    kategori_organisasi: ''
  });
  const [foto, setFoto] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [hasAccess, setHasAccess] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [accessMessage, setAccessMessage] = useState('');
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [nisLoading, setNisLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allOrganisasi, setAllOrganisasi] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(false);

  const grhaOptions = [
    'Airsanya', 'Daksina', 'Genya', 'Madhya', 'Nairiti', 'Pascima', 'Purwa', 'Uttara', 'Wayabhya'
  ];

  const jabatanOptions = [
    { value: 'ketua', label: 'Ketua Organisasi (6 point)' },
    { value: 'wakil ketua', label: 'Wakil Ketua (5 point)' },
    { value: 'sekretaris', label: 'Sekretaris (4 point)' },
    { value: 'bendahara', label: 'Bendahara (3 point)' },
    { value: 'koordinator', label: 'Koordinator (2 point)' },
    { value: 'anggota', label: 'Anggota (1 point)' }
  ];

  // useEffect(() => {
  //   checkPermission();
  // }, []);

  useEffect(() => {
    fetchTeachers();
    fetchUserSubmissions();
    checkAccess();
    // Get user role from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.role || '');
    if (user.role === 'superadmin') {
      fetchAllOrganisasi();
    }
  }, []);

  const fetchAllOrganisasi = async () => {
    try {
      setLoadingIndex(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/organisasi/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllOrganisasi(response.data);
    } catch (error) {
      console.error('Error fetching all organisasi:', error);
    } finally {
      setLoadingIndex(false);
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
      
      const canInputOrganisasi = response.data.organisasi;
      setHasAccess(canInputOrganisasi);
      
      if (!canInputOrganisasi) {
        setAccessMessage('Anda tidak memiliki izin untuk input data organisasi. Silakan hubungi SuperAdmin.');
      }
    } catch (error) {
      console.error('Error checking access:', error);
      setHasAccess(true);
    } finally {
      setCheckingAccess(false);
    }
  };

  const fetchUserSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/approvals-v2/user-submissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(response.data.organisasi || []);
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
  //     setHasPermission(response.data.can_input_organisasi === true);
  //   } catch (error) {
  //     console.error('Error checking permission:', error);
  //     setHasPermission(false);
  //   } finally {
  //     setCheckingPermission(false);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'kelas') {
      setFormData(prev => applyKelasChange(prev, value));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Auto-fill student data when NIS is entered
    if (name === 'nis' && value.length >= 1) {
      fetchStudentData(value);
    }
  };

  const fetchStudentData = async (nis) => {
    try {
      setNisLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/users/nis/${nis}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          nama: response.data.nama || '',
          kelas: response.data.kelas || '',
          jurusan: jurusanFromKelas(response.data.kelas) || response.data.jurusan || '',
          grha: response.data.grha || ''
        }));
        setIsAutoFilled(true);
      }
    } catch (error) {
      // Student not found or error, don't auto-fill
      console.log('Student not found or error fetching data');
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

      await axios.post('/approvals-v2/organisasi/submit', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(userRole === 'superadmin' ? 'Organisasi berhasil ditambahkan!' : 'Organisasi berhasil diajukan untuk persetujuan!');
      if (userRole === 'superadmin') {
        fetchAllOrganisasi();
      }
      setFormData({
        nama: '',
        nis: '',
        kelas: '',
        grha: '',
        jurusan: 'TKJ',
        pembina: '',
        jabatan_organisasi: '',
        kategori_organisasi: ''
      });
      setFoto(null);
      setIsAutoFilled(false);
      setShowForm(false);
      fetchUserSubmissions(); // Refresh submissions list
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengirim organisasi');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { background: '#ffc107', color: '#333' },
      approved: { background: '#28a745', color: 'white' },
      rejected: { background: '#dc3545', color: 'white' }
    };
    const labels = {
      pending: '⏳ Menunggu',
      approved: '✅ Disetujui',
      rejected: '❌ Ditolak'
    };
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
        ...styles[status]
      }}>
        {labels[status] || status}
      </span>
    );
  };

  // Permission checking disabled for now
  // if (checkingPermission) {
  //   return <div className="loading"><div className="spinner"></div></div>;
  // }

  // if (!hasPermission) {
  //   return (
  //     <div className="card">
  //       <h2>Akses Ditolak</h2>
  //       <p>Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi SuperAdmin.</p>
  //     </div>
  //   );
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
        <h2>Input Organisasi</h2>
        {userRole === 'superadmin' && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Tutup Form' : '+ Input Organisasi Baru'}
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
          <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>📋 Index Organisasi</h3>
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
                    <th>Kategori</th>
                    <th>Jabatan</th>
                    <th>Pembina</th>
                    <th>Point</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrganisasi.map(item => (
                    <tr key={item.id}>
                      <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                      <td>{item.nama}</td>
                      <td>{item.nis}</td>
                      <td>{item.kategori_organisasi}</td>
                      <td>{item.jabatan_organisasi}</td>
                      <td>{item.pembina || '-'}</td>
                      <td>{item.point}</td>
                      <td>{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allOrganisasi.length === 0 && (
                <p className="text-muted">Belum ada data organisasi</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Input Form - Show for non-superadmin or when showForm is true */}
      {(userRole !== 'superadmin' || showForm) && (
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
          <label>Jurusan</label>
          <select name="jurusan" value={formData.jurusan} onChange={handleChange} disabled={isJurusanLocked(formData.kelas, isAutoFilled)} style={{ backgroundColor: isJurusanLocked(formData.kelas, isAutoFilled) ? '#f0f0f0' : '' }}>
            {JURUSAN_OPTIONS.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
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
          <label>Jabatan Organisasi</label>
          <select name="jabatan_organisasi" value={formData.jabatan_organisasi} onChange={handleChange} required>
            <option value="">Pilih Jabatan</option>
            {jabatanOptions.map(jabatan => (
              <option key={jabatan.value} value={jabatan.value}>{jabatan.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Kategori Organisasi</label>
          <input
            type="text"
            name="kategori_organisasi"
            value={formData.kategori_organisasi}
            onChange={handleChange}
            placeholder="Nama organisasi"
          />
        </div>
        <div className="form-group">
          <label>Foto Bukti</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Mengirim...' : (userRole === 'superadmin' ? 'Kirim' : 'Ajukan untuk Persetujuan')}
        </button>
      </form>
      )}

      {/* Submission History */}
      {submissions.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>📋 Riwayat Pengajuan Organisasi</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {submissions.map((sub, index) => (
              <div key={sub.id || index} style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '10px',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ fontSize: '14px' }}>{sub.kategori_organisasi}</strong>
                  <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                    {sub.nama} ({sub.nis}) - {sub.jabatan_organisasi}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                    Diajukan: {new Date(sub.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  {getStatusBadge(sub.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InputOrganisasi;
