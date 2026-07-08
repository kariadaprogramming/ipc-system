import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IzinAkun() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('individual');
  const [filters, setFilters] = useState({
    role: '',
    kelas: '',
    jurusan: '',
    grha: ''
  });

  const jenisInputs = [
    { key: 'prestasi', label: 'Prestasi', icon: '🏆' },
    { key: 'organisasi', label: 'Organisasi', icon: '👥' },
    { key: 'event', label: 'Event', icon: '📅' },
    { key: 'pelanggaran', label: 'Pelanggaran', icon: '⚠️' },
    { key: 'perilaku', label: 'Perilaku', icon: '✅' }
  ];

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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ role: '', kelas: '', jurusan: '', grha: '' });
    setSearchQuery('');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.nis?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.nip?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }
    if (filters.kelas) {
      filtered = filtered.filter(user => user.kelas === filters.kelas);
    }
    if (filters.jurusan) {
      filtered = filtered.filter(user => user.jurusan === filters.jurusan);
    }
    if (filters.grha) {
      filtered = filtered.filter(user => user.grha === filters.grha);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, filters, users]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/input-access/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update Individual User Access
  const handleIndividualUpdate = async (userId, permissions) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.post('/input-access/admin/individual', {
        user_id: userId,
        permissions: permissions
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, ...permissions } : user
      ));
      
      setMessage('✅ Izin individual berhasil diupdate!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Gagal update izin individual');
    }
  };

  const handleIndividualToggle = (user, jenis) => {
    const permKey = `can_input_${jenis}`;
    const newValue = !user[permKey];
    
    const newPermissions = {
      can_input_prestasi: user.can_input_prestasi,
      can_input_organisasi: user.can_input_organisasi,
      can_input_event: user.can_input_event,
      can_input_pelanggaran: user.can_input_pelanggaran,
      can_input_perilaku: user.can_input_perilaku,
      [permKey]: newValue
    };
    
    handleIndividualUpdate(user.id, newPermissions);
  };

  // Reset all permissions
  const handleResetAll = async () => {
    if (!window.confirm('⚠️ PERINGATAN!\n\nIni akan menghapus SEMUA individual permissions dan mereset sistem ke default (semua input aktif untuk semua user).\n\nYakin ingin melanjutkan?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/input-access/admin/reset-all', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage(`✅ ${response.data.message}`);
      
      // Refresh users
      fetchUsers();
      
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('❌ Gagal reset sistem: ' + (error.response?.data?.message || error.message));
    }
  };

  // Bulk update permissions by role (enable/disable all users with specific role)
  const handleBulkRoleUpdate = async (role, jenis, enable) => {
    try {
      const token = localStorage.getItem('token');
      const roleLabel = role === 'siswa' ? 'Siswa' : 'Guru';
      const jenisLabel = jenisInputs.find(j => j.key === jenis)?.label || jenis;
      
      // Get all users with this role
      const usersWithRole = users.filter(u => u.role === role);
      
      if (usersWithRole.length === 0) {
        setMessage(`❌ Tidak ada user dengan role ${roleLabel}`);
        return;
      }
      
      // Update each user - only change the selected jenis, keep others as is
      let successCount = 0;
      for (const user of usersWithRole) {
        try {
          // Keep existing permissions, only change the selected jenis
          const newPermissions = {
            can_input_prestasi: jenis === 'prestasi' ? enable : (user.can_input_prestasi ?? true),
            can_input_organisasi: jenis === 'organisasi' ? enable : (user.can_input_organisasi ?? true),
            can_input_event: jenis === 'event' ? enable : (user.can_input_event ?? true),
            can_input_pelanggaran: jenis === 'pelanggaran' ? enable : (user.can_input_pelanggaran ?? true),
            can_input_perilaku: jenis === 'perilaku' ? enable : (user.can_input_perilaku ?? true)
          };
          
          await axios.post('/input-access/admin/individual', {
            user_id: user.id,
            permissions: newPermissions
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          successCount++;
        } catch (err) {
          console.error(`Error updating user ${user.id}:`, err);
        }
      }
      
      setMessage(`✅ ${jenisLabel} ${enable ? 'diaktifkan' : 'dimatikan'} untuk ${successCount} ${roleLabel}!`);
      fetchUsers(); // Refresh user list
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Gagal update bulk: ' + (error.response?.data?.message || error.message));
    }
  };

  // Clear individual permissions for specific user
  const handleClearUserPermissions = async (user) => {
    if (!window.confirm(`Hapus izin individual untuk ${user.nama}?\n\nUser akan mengikuti pengaturan global/role.`)) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/input-access/admin/clear-user-permissions/${user.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage(`✅ ${response.data.message}`);
      
      // Refresh users
      fetchUsers();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Gagal hapus izin: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <h2>🛡️ Izin Akses Input Data</h2>
      
      {message && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('individual')}
          className={`btn ${activeTab === 'individual' ? 'btn-primary' : 'btn-secondary'}`}
        >
          👤 Individual
        </button>
        <button
          onClick={handleResetAll}
          className="btn btn-danger"
          style={{ marginLeft: 'auto' }}
        >
          🔄 Reset Sistem
        </button>
      </div>

      {/* INDIVIDUAL CONTROL */}
      {activeTab === 'individual' && (
        <div className="card">
          <h3>👤 Kontrol Individual</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Berikan atau cabut akses untuk user tertentu. Atau gunakan tombol di bawah untuk bulk update berdasarkan role.
          </p>

          {/* Bulk Action Buttons by Role */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            {/* Siswa Bulk Actions */}
            <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '2px solid #1976d2' }}>
              <h4 style={{ marginBottom: '15px', color: '#1976d2' }}>🎓 Bulk Update Siswa</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('siswa', 'prestasi', true)}>
                  ✅ Aktifkan Prestasi
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('siswa', 'prestasi', false)}>
                  ❌ Matikan Prestasi
                </button>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('siswa', 'organisasi', true)}>
                  ✅ Aktifkan Organisasi
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('siswa', 'organisasi', false)}>
                  ❌ Matikan Organisasi
                </button>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('siswa', 'event', true)}>
                  ✅ Aktifkan Event
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('siswa', 'event', false)}>
                  ❌ Matikan Event
                </button>
              </div>
            </div>

            {/* Guru Bulk Actions */}
            <div style={{ padding: '15px', backgroundColor: '#fff3e0', borderRadius: '8px', border: '2px solid #f57c00' }}>
              <h4 style={{ marginBottom: '15px', color: '#f57c00' }}>👨‍🏫 Bulk Update Guru</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('guru', 'prestasi', true)}>
                  ✅ Aktifkan Prestasi
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('guru', 'prestasi', false)}>
                  ❌ Matikan Prestasi
                </button>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('guru', 'organisasi', true)}>
                  ✅ Aktifkan Organisasi
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('guru', 'organisasi', false)}>
                  ❌ Matikan Organisasi
                </button>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('guru', 'event', true)}>
                  ✅ Aktifkan Event
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('guru', 'event', false)}>
                  ❌ Matikan Event
                </button>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('guru', 'pelanggaran', true)}>
                  ✅ Aktifkan Pelanggaran
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('guru', 'pelanggaran', false)}>
                  ❌ Matikan Pelanggaran
                </button>
                <button className="btn btn-success" onClick={() => handleBulkRoleUpdate('guru', 'perilaku', true)}>
                  ✅ Aktifkan Perilaku
                </button>
                <button className="btn btn-danger" onClick={() => handleBulkRoleUpdate('guru', 'perilaku', false)}>
                  ❌ Matikan Perilaku
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card" style={{ marginBottom: '20px', padding: '15px' }}>
            <h4>Filter</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
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

          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="🔍 Cari nama, NIS, atau NIP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ minWidth: '800px' }}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th style={{ textAlign: 'center' }}>🏆 Prestasi</th>
                  <th style={{ textAlign: 'center' }}>👥 Organisasi</th>
                  <th style={{ textAlign: 'center' }}>📅 Event</th>
                  <th style={{ textAlign: 'center', color: '#f57c00' }}>⚠️ Pelanggaran<br/><small>(Guru only)</small></th>
                  <th style={{ textAlign: 'center', color: '#f57c00' }}>✅ Perilaku<br/><small>(Guru only)</small></th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.nama}</strong>
                      <br />
                      <small style={{ color: '#666' }}>
                        {user.nis || user.nip || '-'}
                      </small>
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: user.role === 'siswa' ? '#e3f2fd' : '#fff3e0',
                        color: user.role === 'siswa' ? '#1976d2' : '#f57c00',
                        fontSize: '12px',
                        textTransform: 'uppercase'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    {/* Siswa only sees prestasi, organisasi, event (no pelanggaran/perilaku) */}
                    {user.role === 'siswa' ? (
                      <>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleIndividualToggle(user, 'prestasi')}
                            style={{
                              padding: '8px 12px',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: user.can_input_prestasi ? '#28a745' : '#dc3545',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            {user.can_input_prestasi ? '✅' : '❌'}
                          </button>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleIndividualToggle(user, 'organisasi')}
                            style={{
                              padding: '8px 12px',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: user.can_input_organisasi ? '#28a745' : '#dc3545',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            {user.can_input_organisasi ? '✅' : '❌'}
                          </button>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleIndividualToggle(user, 'event')}
                            style={{
                              padding: '8px 12px',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: user.can_input_event ? '#28a745' : '#dc3545',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            {user.can_input_event ? '✅' : '❌'}
                          </button>
                        </td>
                        <td style={{ textAlign: 'center', color: '#999' }}>—</td>
                        <td style={{ textAlign: 'center', color: '#999' }}>—</td>
                      </>
                    ) : (
                      /* Guru sees all 5 columns */
                      jenisInputs.map(({ key }) => {
                        const permKey = `can_input_${key}`;
                        const isEnabled = user[permKey];
                        return (
                          <td key={key} style={{ textAlign: 'center' }}>
                            <button
                              onClick={() => handleIndividualToggle(user, key)}
                              style={{
                                padding: '8px 12px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor: isEnabled ? '#28a745' : '#dc3545',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              {isEnabled ? '✅' : '❌'}
                            </button>
                          </td>
                        );
                      })
                    )}
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleClearUserPermissions(user)}
                        className="btn btn-warning"
                        style={{ padding: '5px 10px', fontSize: '11px' }}
                        title="Hapus izin individual, gunakan global/role"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
              Tidak ada user yang ditemukan
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default IzinAkun;
