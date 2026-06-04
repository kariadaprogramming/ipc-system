import React, { useState } from 'react';
import axios from 'axios';

function InputPelanggaran() {
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    kelas: '',
    jurusan: 'TKJ',
    grha: '',
    keterangan: '',
    jenis_pelanggaran: 'ringan'
  });
  const [foto, setFoto] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [nisLoading, setNisLoading] = useState(false);
  // const [hasPermission, setHasPermission] = useState(true);
  // const [checkingPermission, setCheckingPermission] = useState(true);

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

  const jenisOptions = [
    { value: 'ringan', label: 'Ringan (-1 point)' },
    { value: 'sedang', label: 'Sedang (-5 point)' },
    { value: 'berat', label: 'Berat (-25 point)' }
  ];

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
  //     setHasPermission(response.data.can_input_pelanggaran === true);
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
    if (name === 'nis' && value.length >= 3) {
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
        data.append('foto', foto);
      }

      await axios.post('/pelanggaran', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Pelanggaran berhasil dikirim untuk approval!');
      setFormData({
        nama: '',
        nis: '',
        kelas: '',
        jurusan: 'TKJ',
        grha: '',
        keterangan: '',
        jenis_pelanggaran: 'ringan'
      });
      setFoto(null);
      setIsAutoFilled(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengirim pelanggaran');
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
      <h2>Input Pelanggaran</h2>
      
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
          <label>Keterangan Pelanggaran</label>
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            placeholder="Jelaskan pelanggaran yang dilakukan"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Jenis Pelanggaran</label>
          <select name="jenis_pelanggaran" value={formData.jenis_pelanggaran} onChange={handleChange}>
            {jenisOptions.map(jenis => (
              <option key={jenis.value} value={jenis.value}>{jenis.label}</option>
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
          {loading ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>
    </div>
  );
}

export default InputPelanggaran;
