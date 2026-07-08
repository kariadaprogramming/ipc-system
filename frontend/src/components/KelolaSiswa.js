import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDetail from './StudentDetail';

function KelolaSiswa() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    nisn: '',
    kelas: 'X TKJ 1',
    jurusan: 'TKJ',
    grha: 'Airsanya',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [detailStudent, setDetailStudent] = useState(null);

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
    const user = JSON.parse(localStorage.getItem('user'));
    setUserRole(user?.role);
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response?.status === 403) {
        setMessage('Akses ditolak. Pastikan Anda login sebagai Guru.');
      } else {
        setMessage('Gagal memuat data siswa');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/users/create-student', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Akun siswa berhasil dibuat!');
      setShowForm(false);
      setFormData({
        nama: '',
        nis: '',
        nisn: '',
        kelas: 'X TKJ 1',
        jurusan: 'TKJ',
        grha: 'Airsanya',
        password: ''
      });
      fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal membuat akun siswa');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setFormData({
      nama: student.nama,
      nis: student.nis,
      nisn: student.nisn,
      kelas: student.kelas,
      jurusan: student.jurusan,
      grha: student.grha,
      password: ''
    });
    setShowEditForm(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (userRole === 'guru') {
        // Guru needs approval
        await axios.post(`/users/${editStudent.id}/biodata-request`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Permintaan update biodata berhasil diajukan, menunggu persetujuan SuperAdmin!');
      } else {
        // SuperAdmin updates directly
        await axios.put(`/users/${editStudent.id}/biodata`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Biodata siswa berhasil diupdate!');
      }
      
      setShowEditForm(false);
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal update biodata');
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <h2>Kelola Siswa</h2>
      {message && <div className="alert alert-success">{message}</div>}
      
      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setFormData({
          nama: '',
          nis: '',
          nisn: '',
          kelas: 'X TKJ 1',
          jurusan: 'TKJ',
          grha: 'Airsanya',
          password: ''
        }); }}>
          + Tambah Siswa
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Tambah Akun Siswa</h3>
          <button className="btn btn-danger" onClick={() => setShowForm(false)} style={{ marginBottom: '10px' }}>Tutup</button>
          <form onSubmit={handleCreateStudent}>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>NIS</label>
              <input type="text" name="nis" value={formData.nis} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>NISN</label>
              <input type="text" name="nisn" value={formData.nisn} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Kelas</label>
              <select name="kelas" value={formData.kelas} onChange={handleChange}>
                {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Jurusan</label>
              <select name="jurusan" value={formData.jurusan} onChange={handleChange}>
                <option value="TKJ">TKJ</option>
                <option value="TO">TO</option>
                <option value="DPIB">DPIB</option>
              </select>
            </div>
            <div className="form-group">
              <label>Grha</label>
              <select name="grha" value={formData.grha} onChange={handleChange}>
                {grhaOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Buat Akun</button>
          </form>
        </div>
      )}

      {showEditForm && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>Edit Biodata Siswa</h3>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {userRole === 'guru' ? 'Perubahan akan diajukan ke SuperAdmin untuk persetujuan' : 'SuperAdmin dapat langsung mengupdate'}
          </p>
          <button className="btn btn-danger" onClick={() => { setShowEditForm(false); setEditStudent(null); }} style={{ marginBottom: '10px' }}>Tutup</button>

          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label>Nama</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>NIS</label>
              <input type="text" name="nis" value={formData.nis} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>NISN</label>
              <input type="text" name="nisn" value={formData.nisn} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Kelas</label>
              <select name="kelas" value={formData.kelas} onChange={handleChange} required>
                {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Jurusan</label>
              <select name="jurusan" value={formData.jurusan} onChange={handleChange}>
                <option value="TKJ">TKJ</option>
                <option value="TO">TO</option>
                <option value="DPIB">DPIB</option>
              </select>
            </div>
            <div className="form-group">
              <label>Grha</label>
              <select name="grha" value={formData.grha} onChange={handleChange}>
                <option value="">Pilih Grha</option>
                {grhaOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {userRole === 'guru' ? 'Ajukan Perubahan' : 'Update Biodata'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Daftar Siswa</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIS</th>
              <th>NISN</th>
              <th>Kelas</th>
              <th>Jurusan</th>
              <th>Grha</th>
              <th>IPC</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.nama}</td>
                <td>{student.nis || '-'}</td>
                <td>{student.nisn || '-'}</td>
                <td>{student.kelas || '-'}</td>
                <td>{student.jurusan || '-'}</td>
                <td>{student.grha || '-'}</td>
                <td>{student.ipc_total || 0}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => setDetailStudent(student)}
                    style={{ padding: '5px 10px', fontSize: '12px', marginRight: 5 }}
                  >
                    Detail
                  </button>
                  <button 
                    className="btn btn-info" 
                    onClick={() => handleEditClick(student)}
                    style={{ padding: '5px 10px', fontSize: '12px' }}
                  >
                    Edit Biodata
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detailStudent && (
        <StudentDetail student={detailStudent} onClose={() => setDetailStudent(null)} />
      )}
    </div>
  );
}

export default KelolaSiswa;
