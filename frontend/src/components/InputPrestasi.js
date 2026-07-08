import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const kelasOptions = [
    'X TKJ 1', 'X TKJ 2', 'X TO 1', 'X TO 2',
    'X DPIB 1', 'X DPIB 2',
    'XI TKJ 1', 'XI TKJ 2', 'XI TO 1', 'XI TO 2',
    'XI DPIB 1', 'XI DPIB 2',
    'XII TKJ 1', 'XII TKJ 2', 'XII TO 1', 'XII TO 2',
    'XII DPIB 1', 'XII DPIB 2'
  ];

  const grhaOptions = [
    'Airsanya', 'Daksina', 'Genya', 'Madhya', 'Nairiti', 'Pascima', 'Purwa', 'Uttara', 'Wayabhya'
  ];

  useEffect(() => {
    fetchTeachers();
    fetchUserSubmissions();
    checkAccess();
  }, []);

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
    setFormData({ ...formData, [name]: value });

    // Auto-fill student data when NIS is entered
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
          jurusan: response.data.jurusan || '',
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
      <h2>Input Prestasi</h2>
      
      {message && (
        <div className="alert alert-success" style={{ marginBottom: '16px' }}>
          {message}
        </div>
      )}
      
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
            <select name="jurusan" value={formData.jurusan} onChange={handleChange} disabled={isAutoFilled} style={{ backgroundColor: isAutoFilled ? '#f0f0f0' : '' }}>
              <option value="TKJ">TKJ</option>
              <option value="TO">TO</option>
              <option value="DPIB">DPIB</option>
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
              {kelasOptions.map(kelas => (
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

export default InputPrestasi;
