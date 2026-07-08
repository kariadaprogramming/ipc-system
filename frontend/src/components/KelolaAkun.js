import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

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
  const [filters, setFilters] = useState({
    role: '',
    kelas: '',
    jurusan: '',
    grha: ''
  });
  const [excelFile, setExcelFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState([]);
  const [importType, setImportType] = useState('siswa');

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

  const filteredUsers = users.filter(user => {
    if (filters.role && user.role !== filters.role) return false;
    if (filters.kelas && user.kelas !== filters.kelas) return false;
    if (filters.jurusan && user.jurusan !== filters.jurusan) return false;
    if (filters.grha && user.grha !== filters.grha) return false;
    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ role: '', kelas: '', jurusan: '', grha: '' });
  };

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

  const handleExcelFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleExcelImport = async () => {
    if (!excelFile) {
      setMessage('Please select an Excel file');
      return;
    }

    setImporting(true);
    setImportResults([]);
    const results = [];

    try {
      const data = await excelFile.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const token = localStorage.getItem('token');

      for (const row of jsonData) {
        try {
          if (importType === 'siswa') {
            // Import student
            const studentData = {
              nama: row.nama || row.Nama || '',
              nis: row.nis || row.NIS || '',
              nisn: row.nisn || row.NISN || '',
              kelas: row.kelas || row.Kelas || '',
              jurusan: row.jurusan || row.Jurusan || 'TKJ',
              grha: row.grha || row.Gra || '',
              password: row.password || row.Password || '123456'
            };

            await axios.post('/users/create-student', studentData, {
              headers: { Authorization: `Bearer ${token}` }
            });
            results.push({ status: 'success', name: studentData.nama, type: 'siswa' });
          } else {
            // Import teacher
            const teacherData = {
              nama: row.nama || row.Nama || '',
              nip: row.nip || row.NIP || '',
              jabatan: row.jabatan || row.Jabatan || '',
              no_hp: row.no_hp || row.NoHP || row['No HP'] || '',
              password: row.password || row.Password || '123456'
            };

            await axios.post('/users/create-teacher', teacherData, {
              headers: { Authorization: `Bearer ${token}` }
            });
            results.push({ status: 'success', name: teacherData.nama, type: 'guru' });
          }
        } catch (error) {
          results.push({
            status: 'error',
            name: row.nama || row.Nama || 'Unknown',
            error: error.response?.data?.message || error.message
          });
        }
      }

      setImportResults(results);
      setMessage(`Import completed: ${results.filter(r => r.status === 'success').length} successful, ${results.filter(r => r.status === 'error').length} failed`);
      fetchUsers();
    } catch (error) {
      setMessage('Error reading Excel file: ' + error.message);
    } finally {
      setImporting(false);
      setExcelFile(null);
    }
  };

  const downloadTemplate = (type) => {
    const templateData = type === 'siswa'
      ? [
          { Nama: '', NIS: '', NISN: '', Kelas: 'X TKJ 1', Jurusan: 'TKJ', Gra: '', Password: '123456' }
        ]
      : [
          { Nama: '', NIP: '', Jabatan: '', NoHP: '', Password: '123456' }
        ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, `template_${type}.xlsx`);
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
          <button className="btn btn-success" onClick={() => { setShowForm(true); setFormType('teacher'); setFormData({}); }} style={{ marginRight: '10px' }}>
            + Buat Akun Guru
          </button>
        )}

        {/* Import from Excel - only for superadmin */}
        {userRole === 'superadmin' && (
          <>
            <button className="btn btn-info" onClick={() => { setImportType('siswa'); setExcelFile({}); }} style={{ marginRight: '10px' }}>
              📥 Import Siswa
            </button>
            <button className="btn btn-info" onClick={() => { setImportType('guru'); setExcelFile({}); }} style={{ marginRight: '10px' }}>
              📥 Import Guru
            </button>
          </>
        )}
      </div>

      {/* Excel Import Section */}
      {userRole === 'superadmin' && excelFile && (
        <div className="card" style={{ marginBottom: '20px', padding: '15px' }}>
          <h4>Import {importType === 'siswa' ? 'Siswa' : 'Guru'} dari Excel</h4>
          <div style={{ marginBottom: '15px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => downloadTemplate(importType)}
              style={{ marginBottom: '10px' }}
            >
              📥 Download Template {importType === 'siswa' ? 'Siswa' : 'Guru'}
            </button>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelFileChange}
              style={{ marginBottom: '10px' }}
            />
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              {importType === 'siswa' ? (
                <strong>Format Siswa:</strong>
              ) : (
                <strong>Format Guru:</strong>
              )} {importType === 'siswa' ? 'nama, nis, nisn, kelas, jurusan, grha, password' : 'nama, nip, jabatan, no_hp, password'}
            </div>
            <button
              className="btn btn-primary"
              onClick={handleExcelImport}
              disabled={importing || !excelFile}
            >
              {importing ? 'Importing...' : 'Import'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => { setExcelFile(null); setImportResults([]); }}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </div>

          {importResults.length > 0 && (
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
              <h5>Import Results:</h5>
              {importResults.map((result, index) => (
                <div key={index} style={{ 
                  padding: '5px', 
                  marginBottom: '5px', 
                  backgroundColor: result.status === 'success' ? '#d4edda' : '#f8d7da',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {result.status === 'success' ? '✅' : '❌'} {result.name} ({result.type}) - {result.status === 'error' ? result.error : 'Success'}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="card" style={{ marginBottom: '20px', padding: '15px' }}>
        <h4>Filter</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {userRole === 'superadmin' && (
            <div style={{ flex: '1', minWidth: '150px' }}>
              <label>Role</label>
              <select
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="form-control"
              >
                <option value="">Semua Role</option>
                <option value="superadmin">Superadmin</option>
                <option value="guru">Guru</option>
                <option value="siswa">Siswa</option>
              </select>
            </div>
          )}
          <div style={{ flex: '1', minWidth: '150px' }}>
            <label>Kelas</label>
            <select
              value={filters.kelas}
              onChange={(e) => handleFilterChange('kelas', e.target.value)}
              className="form-control"
            >
              <option value="">Semua Kelas</option>
              {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <label>Jurusan</label>
            <select
              value={filters.jurusan}
              onChange={(e) => handleFilterChange('jurusan', e.target.value)}
              className="form-control"
            >
              <option value="">Semua Jurusan</option>
              <option value="TKJ">TKJ</option>
              <option value="TO">TO</option>
              <option value="DPIB">DPIB</option>
            </select>
          </div>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <label>Grha</label>
            <select
              value={filters.grha}
              onChange={(e) => handleFilterChange('grha', e.target.value)}
              className="form-control"
            >
              <option value="">Semua Grha</option>
              {grhaOptions.map(grha => <option key={grha} value={grha}>{grha}</option>)}
            </select>
          </div>
          <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
        </div>
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
            {filteredUsers.map(user => (
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
