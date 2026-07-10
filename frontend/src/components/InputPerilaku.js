import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KELAS_OPTIONS, JURUSAN_OPTIONS, applyKelasChange, jurusanFromKelas, isJurusanLocked } from '../utils/kelasJurusan';

function InputPerilaku() {
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    kelas: '',
    jurusan: 'TKJ',
    grha: '',
    tanggung_jawab: '',
    disiplin: '',
    kepedulian: '',
    kemandirian: '',
    spiritual: '',
    kejujuran: '',
    kepercayaan_diri: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [nisLoading, setNisLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allPerilaku, setAllPerilaku] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(false);
  const [userRole, setUserRole] = useState('');
  // const [hasPermission, setHasPermission] = useState(true);
  // const [checkingPermission, setCheckingPermission] = useState(true);

  const grhaOptions = [
    'Airsanya', 'Daksina', 'Genya', 'Madhya', 'Nairiti', 'Pascima', 'Purwa', 'Uttara', 'Wayabhya'
  ];

  const karakterOptions = [
    { value: 'kurang baik', label: 'Kurang Baik (1 point)' },
    { value: 'cukup baik', label: 'Cukup Baik (2 point)' },
    { value: 'baik', label: 'Baik (3 point)' },
    { value: 'sangat baik', label: 'Sangat Baik (4 point)' }
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.role || '');
    if (user.role === 'superadmin') {
      fetchAllPerilaku();
    }
  }, []);

  const fetchAllPerilaku = async () => {
    try {
      setLoadingIndex(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/perilaku/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllPerilaku(response.data);
    } catch (error) {
      console.error('Error fetching all perilaku:', error);
    } finally {
      setLoadingIndex(false);
    }
  };

  // useEffect(() => {
  //   checkPermission();
  // }, []);

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
  //     setHasPermission(response.data.can_input_perilaku === true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/perilaku', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(response.data.message || 'Perilaku berhasil dikirim!');
      if (userRole === 'superadmin') {
        fetchAllPerilaku();
      }
      setFormData({
        nama: '',
        nis: '',
        kelas: '',
        jurusan: 'TKJ',
        grha: '',
        tanggung_jawab: '',
        disiplin: '',
        kepedulian: '',
        kemandirian: '',
        spiritual: '',
        kejujuran: '',
        kepercayaan_diri: ''
      });
      setIsAutoFilled(false);
      setShowForm(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengirim perilaku');
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Input Perilaku</h2>
        {userRole === 'superadmin' && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Tutup Form' : '+ Input Perilaku Baru'}
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
          <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>📋 Index Perilaku</h3>
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
                    <th>Tanggung Jawab</th>
                    <th>Disiplin</th>
                    <th>Kepedulian</th>
                    <th>Kemandirian</th>
                    <th>Spiritual</th>
                    <th>Kejujuran</th>
                    <th>Kepercayaan Diri</th>
                  </tr>
                </thead>
                <tbody>
                  {allPerilaku.map(item => (
                    <tr key={item.id}>
                      <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                      <td>{item.nama}</td>
                      <td>{item.nis}</td>
                      <td>{item.tanggung_jawab}</td>
                      <td>{item.disiplin}</td>
                      <td>{item.kepedulian}</td>
                      <td>{item.kemandirian}</td>
                      <td>{item.spiritual}</td>
                      <td>{item.kejujuran}</td>
                      <td>{item.kepercayaan_diri}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allPerilaku.length === 0 && (
                <p className="text-muted">Belum ada data perilaku</p>
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

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>Perkembangan Karakter</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Tanggung Jawab <span className="required">*</span></label>
              <select name="tanggung_jawab" value={formData.tanggung_jawab} onChange={handleChange} required>
                <option value="">Pilih Nilai</option>
                {karakterOptions.map(karakter => (
                  <option key={karakter.value} value={karakter.value}>{karakter.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Disiplin <span className="required">*</span></label>
              <select name="disiplin" value={formData.disiplin} onChange={handleChange} required>
                <option value="">Pilih Nilai</option>
                {karakterOptions.map(karakter => (
                  <option key={karakter.value} value={karakter.value}>{karakter.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Kepedulian <span className="required">*</span></label>
              <select name="kepedulian" value={formData.kepedulian} onChange={handleChange} required>
                <option value="">Pilih Nilai</option>
                {karakterOptions.map(karakter => (
                  <option key={karakter.value} value={karakter.value}>{karakter.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Kemandirian <span className="required">*</span></label>
              <select name="kemandirian" value={formData.kemandirian} onChange={handleChange} required>
                <option value="">Pilih Nilai</option>
                {karakterOptions.map(karakter => (
                  <option key={karakter.value} value={karakter.value}>{karakter.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Spiritual <span className="required">*</span></label>
              <select name="spiritual" value={formData.spiritual} onChange={handleChange} required>
                <option value="">Pilih Nilai</option>
                {karakterOptions.map(karakter => (
                  <option key={karakter.value} value={karakter.value}>{karakter.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Kejujuran <span className="required">*</span></label>
              <select name="kejujuran" value={formData.kejujuran} onChange={handleChange} required>
                <option value="">Pilih Nilai</option>
                {karakterOptions.map(karakter => (
                  <option key={karakter.value} value={karakter.value}>{karakter.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Kepercayaan Diri <span className="required">*</span></label>
              <select name="kepercayaan_diri" value={formData.kepercayaan_diri} onChange={handleChange} required>
                <option value="">Pilih Nilai</option>
                {karakterOptions.map(karakter => (
                  <option key={karakter.value} value={karakter.value}>{karakter.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>
      )}
    </div>
  );
}

export default InputPerilaku;
