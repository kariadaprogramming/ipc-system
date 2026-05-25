import React, { useState, useEffect } from 'react';
import axios from 'axios';

function KelolaAkun() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('student');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [userRole, setUserRole] = useState(null);

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserRole(user?.role);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // If guru, only show students. If superadmin, show all users
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'guru') {
        const students = response.data.filter(user => user.role === 'siswa');
        setUsers(students);
      } else {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
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
      setFormData({});
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal membuat akun');
    }
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/users/create-teacher', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Akun guru berhasil dibuat!');
      setShowForm(false);
      setFormData({});
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal membuat akun');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus akun ini?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Akun berhasil dihapus!');
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menghapus akun');
    }
  };

  const handleUpdateIPC = async (userId, currentIPC) => {
    const newIPC = prompt('Masukkan IPC baru:', currentIPC);
    if (newIPC === null) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/users/${userId}/ipc`, { ipc_total: parseInt(newIPC) }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('IPC berhasil diupdate!');
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal update IPC');
    }
  };

  const handleEditUser = (user) => {
    setEditStudent(user);
    if (user.role === 'siswa') {
      setFormData({
        nama: user.nama,
        nis: user.nis,
        nisn: user.nisn,
        kelas: user.kelas,
        jurusan: user.jurusan,
        grha: user.grha
      });
    } else if (user.role === 'guru') {
      setFormData({
        nama: user.nama,
        nip: user.nip,
        jabatan: user.jabatan,
        alamat: user.alamat,
        no_hp: user.no_hp
      });
    }
    setShowEditForm(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (userRole === 'guru' && editStudent.role === 'siswa') {
        // Guru needs approval to update student biodata
        await axios.post(`/users/${editStudent.id}/biodata-request`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Permintaan update biodata berhasil diajukan, menunggu persetujuan SuperAdmin!');
      } else {
        // SuperAdmin updates directly
        await axios.put(`/users/${editStudent.id}/biodata`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(`Data ${editStudent.role === 'siswa' ? 'siswa' : 'guru'} berhasil diupdate!`);
      }
      
      setShowEditForm(false);
      setEditStudent(null);
      setFormData({});
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal update data');
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  // Siswa cannot access Kelola Akun
  if (userRole === 'siswa') {
    return (
      <div className="card">
        <h2>Akses Ditolak</h2>
        <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Kelola Akun</h2>
      {message && <div className="alert alert-success">{message}</div>}
      
      <div style={{ marginBottom: '20px' }}>
        {/* Debug: show current role */}
        <small style={{ color: '#666', display: 'block', marginBottom: '10px' }}>
          Role: {userRole || 'loading...'}
        </small>
        
        {/* Buat Akun Siswa - available for superadmin and guru */}
        {(userRole === 'superadmin' || userRole === 'guru') && (
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setFormType('student'); setFormData({}); }} style={{ marginRight: '10px' }}>
            + Buat Akun Siswa
          </button>
        )}
        
        {/* Buat Akun Guru - only for superadmin */}
        {userRole === 'superadmin' && (
          <button className="btn btn-success" onClick={() => { setShowForm(true); setFormType('teacher'); setFormData({}); }}>
            + Buat Akun Guru
          </button>
        )}
      </div>

      {showForm && (
        <div className="card">
          <h3>{formType === 'student' ? 'Buat Akun Siswa' : 'Buat Akun Guru'}</h3>
          <button className="btn btn-danger" onClick={() => setShowForm(false)} style={{ marginBottom: '10px' }}>Tutup</button>

          {formType === 'student' ? (
            <form onSubmit={handleCreateStudent}>
            <div className="form-group">
              <label>Nama</label>
              <input type="text" value={formData.nama || ''} onChange={(e) => setFormData({...formData, nama: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>NIS</label>
              <input type="text" value={formData.nis || ''} onChange={(e) => setFormData({...formData, nis: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>NISN</label>
              <input type="text" value={formData.nisn || ''} onChange={(e) => setFormData({...formData, nisn: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Kelas</label>
              <select value={formData.kelas || ''} onChange={(e) => setFormData({...formData, kelas: e.target.value})} required>
                <option value="">Pilih Kelas</option>
                {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Jurusan</label>
              <select value={formData.jurusan || 'TKJ'} onChange={(e) => setFormData({...formData, jurusan: e.target.value})}>
                <option value="TKJ">TKJ</option>
                <option value="TO">TO</option>
                <option value="DPIB">DPIB</option>
              </select>
            </div>
            <div className="form-group">
              <label>Grha</label>
              <select value={formData.grha || ''} onChange={(e) => setFormData({...formData, grha: e.target.value})}>
                <option value="">Pilih Grha</option>
                {grhaOptions.map(grha => (
                  <option key={grha} value={grha}>{grha}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-primary">Buat Akun Siswa</button>
          </form>
          ) : (
            <form onSubmit={handleCreateTeacher}>
              <div className="form-group">
                <label>Nama</label>
                <input type="text" value={formData.nama || ''} onChange={(e) => setFormData({...formData, nama: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>NIP</label>
                <input type="text" value={formData.nip || ''} onChange={(e) => setFormData({...formData, nip: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Jabatan</label>
                <input type="text" value={formData.jabatan || ''} onChange={(e) => setFormData({...formData, jabatan: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Alamat</label>
                <input type="text" value={formData.alamat || ''} onChange={(e) => setFormData({...formData, alamat: e.target.value})} />
              </div>
              <div className="form-group">
                <label>No HP</label>
                <input type="text" value={formData.no_hp || ''} onChange={(e) => setFormData({...formData, no_hp: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-success">Buat Akun Guru</button>
            </form>
          )}
        </div>
      )}

      {showEditForm && (
        <div className="card">
          <h3>Edit Data {editStudent?.role === 'siswa' ? 'Siswa' : 'Guru'}</h3>
          <button className="btn btn-danger" onClick={() => setShowEditForm(false)} style={{ marginBottom: '10px' }}>Tutup</button>

          <form onSubmit={handleUpdateUser}>
            <div className="form-group">
              <label>Nama</label>
              <input type="text" value={formData.nama || ''} onChange={(e) => setFormData({...formData, nama: e.target.value})} required />
            </div>
            
            {editStudent?.role === 'siswa' ? (
              <>
                <div className="form-group">
                  <label>NIS</label>
                  <input type="text" value={formData.nis || ''} onChange={(e) => setFormData({...formData, nis: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>NISN</label>
                  <input type="text" value={formData.nisn || ''} onChange={(e) => setFormData({...formData, nisn: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Kelas</label>
                  <select value={formData.kelas || ''} onChange={(e) => setFormData({...formData, kelas: e.target.value})} required>
                    <option value="">Pilih Kelas</option>
                    {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Jurusan</label>
                  <select value={formData.jurusan || 'TKJ'} onChange={(e) => setFormData({...formData, jurusan: e.target.value})}>
                    <option value="TKJ">TKJ</option>
                    <option value="TO">TO</option>
                    <option value="DPIB">DPIB</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Grha</label>
                  <select value={formData.grha || ''} onChange={(e) => setFormData({...formData, grha: e.target.value})}>
                    <option value="">Pilih Grha</option>
                    {grhaOptions.map(grha => (
                      <option key={grha} value={grha}>{grha}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>NIP</label>
                  <input type="text" value={formData.nip || ''} onChange={(e) => setFormData({...formData, nip: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Jabatan</label>
                  <input type="text" value={formData.jabatan || ''} onChange={(e) => setFormData({...formData, jabatan: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Alamat</label>
                  <input type="text" value={formData.alamat || ''} onChange={(e) => setFormData({...formData, alamat: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>No HP</label>
                  <input type="text" value={formData.no_hp || ''} onChange={(e) => setFormData({...formData, no_hp: e.target.value})} />
                </div>
              </>
            )}
            <button type="submit" className="btn btn-primary">Update Data</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>{userRole === 'guru' ? 'Daftar Siswa' : 'Daftar Pengguna'}</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>{userRole === 'guru' ? 'NIS' : 'NIS/NIP'}</th>
              {userRole !== 'guru' && <th>NISN</th>}
              <th>Role</th>
              <th>Kelas</th>
              <th>Jurusan</th>
              <th>IPC</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.nama}</td>
                <td>{user.nis || user.nip || '-'}</td>
                {userRole !== 'guru' && <td>{user.nisn || '-'}</td>}
                <td><span className={`badge badge-${user.role === 'superadmin' ? 'danger' : user.role === 'guru' ? 'warning' : 'info'}`}>{user.role}</span></td>
                <td>{user.kelas || '-'}</td>
                <td>{user.jurusan || '-'}</td>
                <td>{user.ipc_total || 0}</td>
                <td>
                  {/* Debug: {userRole} vs {user.role} */}
                  {userRole === 'superadmin' && user.role !== 'superadmin' && (
                    <>
                      <button className="btn btn-info" onClick={() => handleEditUser(user)} style={{ padding: '5px 10px', marginRight: '5px' }}>Edit Biodata</button>
                      {user.role === 'siswa' && (
                        <button className="btn btn-warning" onClick={() => handleUpdateIPC(user.id, user.ipc_total)} style={{ padding: '5px 10px', marginRight: '5px' }}>Edit IPC</button>
                      )}
                      <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)} style={{ padding: '5px 10px' }}>Hapus</button>
                    </>
                  )}
                  {userRole === 'guru' && user.role === 'siswa' && (
                    <button className="btn btn-info" onClick={() => handleEditUser(user)} style={{ padding: '5px 10px' }}>Edit Biodata</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KelolaAkun;
