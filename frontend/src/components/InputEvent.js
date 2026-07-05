import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InputEvent() {
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    kelas: '',
    grha: '',
    jurusan: 'TKJ',
    pembina: '',
    nama_event: '',
    tingkat: 'sekolah'
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

  const kelasOptions = [
    'KELAS 10 TKJ 1', 'KELAS 10 TKJ 2', 'KELAS 10 TO 1', 'KELAS 10 TO 2',
    'KELAS 10 DPIB 1', 'KELAS 10 DPIB 2',
    'KELAS 11 TKJ 1', 'KELAS 11 TKJ 2', 'KELAS 11 TO 1', 'KELAS 11 TO 2',
    'KELAS 11 DPIB 1', 'KELAS 11 DPIB 2',
    'KELAS 12 TKJ 1', 'KELAS 12 TKJ 2', 'KELAS 12 TO 1', 'KELAS 12 TO 2',
    'KELAS 12 DPIB 1', 'KELAS 12 DPIB 2'
  ];

  const grhaOptions = [
    'Airsanya', 'Daksina', 'Genya', 'Madhya', 'Nairiti', 'Pascima', 'Purwa', 'Uttara', 'Wayabhya'
  ];

  const tingkatOptions = [
    { value: 'sekolah', label: 'Sekolah (2 point)' },
    { value: 'kecamatan', label: 'Kecamatan (4 point)' },
    { value: 'kabupaten', label: 'Kabupaten (6 point)' },
    { value: 'provinsi', label: 'Provinsi (8 point)' },
    { value: 'nasional', label: 'Nasional (10 point)' },
    { value: 'internasional', label: 'Internasional (12 point)' }
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
      
      const canInputEvent = response.data.event;
      setHasAccess(canInputEvent);
      
      if (!canInputEvent) {
        setAccessMessage('Anda tidak memiliki izin untuk input data event. Silakan hubungi SuperAdmin.');
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
      setSubmissions(response.data.event || []);
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
  //     setHasPermission(response.data.can_input_event === true);
  //   } catch (error) {
  //     console.error('Error checking permission:', error);
  //     setHasPermission(false);
  //   } finally {
  //     setCheckingPermission(false);
  //   }
  // };

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
      const token = localStorage.getItem('token');
      const response = await axios.get(`/users/nis/${nis}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          nama: response.data.nama || '',
          kelas: response.data.kelas || '',
          jurusan: response.data.jurusan || '',
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

      await axios.post('/approvals-v2/event/submit', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(userRole === 'superadmin' ? 'Event berhasil ditambahkan!' : 'Event berhasil diajukan untuk persetujuan!');
      setFormData({
        nama: '',
        nis: '',
        kelas: '',
        grha: '',
        jurusan: 'TKJ',
        pembina: '',
        nama_event: '',
        tingkat: 'sekolah'
      });
      setFoto(null);
      setIsAutoFilled(false);
      fetchUserSubmissions(); // Refresh submissions list
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengirim event');
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
      <h2>Input Event</h2>
      
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
          <label>Jurusan</label>
          <select name="jurusan" value={formData.jurusan} onChange={handleChange} disabled={isAutoFilled} style={{ backgroundColor: isAutoFilled ? '#f0f0f0' : '' }}>
            <option value="TKJ">TKJ</option>
            <option value="TO">TO</option>
            <option value="DPIB">DPIB</option>
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
          <label>Nama Event</label>
          <input
            type="text"
            name="nama_event"
            value={formData.nama_event}
            onChange={handleChange}
            placeholder="Nama event yang diikuti"
            required
          />
        </div>

        <div className="form-group">
          <label>Tingkat Event</label>
          <select name="tingkat" value={formData.tingkat} onChange={handleChange}>
            {tingkatOptions.map(tingkat => (
              <option key={tingkat.value} value={tingkat.value}>{tingkat.label}</option>
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

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Mengirim...' : (userRole === 'superadmin' ? 'Kirim' : 'Ajukan untuk Persetujuan')}
        </button>
      </form>

      {/* Submission History */}
      {submissions.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>📋 Riwayat Pengajuan Event</h3>
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
                  <strong style={{ fontSize: '14px' }}>{sub.nama_event}</strong>
                  <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                    {sub.nama} ({sub.nis}) - {sub.tingkat}
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

export default InputEvent;
