import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function IzinAkun() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    kelas: '',
    grha: ''
  });
  const [bulkUpdating, setBulkUpdating] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());

  const jenisInputs = [
    { key: 'prestasi', label: 'Prestasi', icon: '🏆' },
    { key: 'organisasi', label: 'Organisasi', icon: '👥' },
    { key: 'kepanitiaan', label: 'Kepanitiaan', icon: '🤝' },
    { key: 'event', label: 'Event', icon: '📅' },
    { key: 'pelanggaran', label: 'Pelanggaran', icon: '⚠️' },
    { key: 'perilaku', label: 'Perilaku', icon: '✅' }
  ];

  // Pelanggaran & Perilaku are guru-only (students never receive these permissions)
  const GURU_ONLY_KEYS = ['pelanggaran', 'perilaku'];

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
    setFilters({ role: '', kelas: '', grha: '' });
    setSearchQuery('');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Fallback: add 'in' class after a short delay if observer doesn't trigger
    const timeout = setTimeout(() => {
      revealElements.forEach(el => el.classList.add('in'));
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [filteredUsers]);

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
    if (filters.grha) {
      filtered = filtered.filter(user => user.grha === filters.grha);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, filters, users]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/input-access/admin/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
      // Selection is intentionally preserved across refreshes (stored as user IDs).
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update Individual User Access
  const handleIndividualUpdate = async (userId, permissions) => {
    try {
      await api.post('/input-access/admin/individual', {
        user_id: userId,
        permissions: permissions
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
      can_input_kepanitiaan: user.can_input_kepanitiaan,
      can_input_event: user.can_input_event,
      can_input_pelanggaran: user.can_input_pelanggaran,
      can_input_perilaku: user.can_input_perilaku,
      [permKey]: newValue
    };
    
    handleIndividualUpdate(user.id, newPermissions);
  };

  // Reset all permissions
  const handleResetAll = async () => {
    if (!window.confirm('⚠️ PERINGATAN!\n\nIni akan menghapus SEMUA individual permissions dan mereset izin ke default (semua input aktif untuk semua user).\n\nYakin ingin melanjutkan?')) {
      return;
    }
    
    try {
      const response = await api.post('/input-access/admin/reset-all', {});
      
      setMessage(`✅ ${response.data.message}`);
      
      // Refresh users
      fetchUsers();
      
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('❌ Gagal reset izin: ' + (error.response?.data?.message || error.message));
    }
  };

  // Toggle one user in the multi-select set
  const handleToggleSelect = (userId) => {
    setSelectedUserIds(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  // Select all users currently visible (after search/filter)
  const handleSelectAllVisible = () => {
    setSelectedUserIds(new Set(filteredUsers.map(u => u.id)));
  };

  const handleClearSelection = () => {
    setSelectedUserIds(new Set());
  };

  // Derived: which users are currently selected (used for guru-only bulk button gating)
  // Guru-only permissions require a guru-ONLY selection: if even one siswa is
  // selected, the "Aktifkan Pelanggaran/Perilaku" buttons stay disabled.
  const selectedUsers = users.filter(u => selectedUserIds.has(u.id));
  const onlyGuruSelected = selectedUsers.length > 0 && selectedUsers.every(u => u.role === 'guru');

  // Bulk update ONE permission type, but only for the explicitly selected users
  const handleBulkSelectedUpdate = async (jenis, enable) => {
    if (bulkUpdating) return; // Prevent multiple simultaneous updates

    if (selectedUserIds.size === 0) {
      setMessage('❌ Pilih minimal satu user lewat checkbox terlebih dahulu');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Guru-only permissions can never be granted to students, so a mixed
    // selection (guru + siswa) cannot use the enable buttons at all —
    // deselect the siswa first. The backend enforces the same rule.
    if (enable && GURU_ONLY_KEYS.includes(jenis) && !onlyGuruSelected) {
      setMessage('⚠️ Pelanggaran & Perilaku hanya dapat diaktifkan untuk guru saja — hapus siswa dari pilihan Anda terlebih dahulu');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    setBulkUpdating(true);
    try {
      const jenisLabel = jenisInputs.find(j => j.key === jenis)?.label || jenis;

      const response = await api.post('/input-access/admin/bulk', {
        user_ids: [...selectedUserIds],
        jenis,
        enable
      });

      const skippedSiswa = response.data.skipped_siswa_count || 0;
      const skipNote = skippedSiswa > 0 ? ` (${skippedSiswa} siswa dilewati — khusus guru)` : '';
      setMessage(`✅ ${jenisLabel} ${enable ? 'diaktifkan' : 'dimatikan'} untuk ${response.data.success_count} user terpilih!${skipNote}`);
      await fetchUsers(); // Refresh user list (also clears selection)
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Gagal update bulk: ' + (error.response?.data?.message || error.message));
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setBulkUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ fontSize: '1.2rem', color: '#64748b' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px', fontFamily: 'Segoe UI, Inter, -apple-system, BlinkMacSystemFont, sans-serif', background: '#f8fafc', color: '#0f172a', minHeight: '100vh' }}>
      <style>{`
        :root{
          --blue:#2563eb;
          --blue-dark:#1d4ed8;
          --blue-light:#eff6ff;
          --sky-light:#e0f2fe;
          --green:#16a34a;
          --green-dark:#15803d;
          --green-light:#dcfce7;
          --orange:#f59e0b;
          --orange-light:#fef3c7;
          --amber-bg:#fffbeb;
          --red:#ef4444;
          --red-dark:#dc2626;
          --gray-50:#f8fafc;
          --gray-100:#f1f5f9;
          --gray-200:#e2e8f0;
          --gray-400:#94a3b8;
          --gray-500:#64748b;
          --gray-700:#334155;
          --gray-900:#0f172a;
          --radius:14px;
          --radius-sm:10px;
          --shadow:0 1px 2px rgba(15,23,42,.04), 0 1px 8px rgba(15,23,42,.05);
          --shadow-hover:0 6px 20px rgba(15,23,42,.10);
        }
        .reveal{
          opacity:0;
          transform:translateY(14px);
          transition:opacity .5s ease, transform .5s ease;
        }
        .reveal.in{
          opacity:1;
          transform:translateY(0);
        }
        .btn{
          border:none;
          border-radius:var(--radius-sm);
          padding:10px 18px;
          font-size:.85rem;
          font-weight:600;
          cursor:pointer;
          display:inline-flex;
          align-items:center;
          gap:7px;
          transition:filter .15s ease, transform .12s ease, box-shadow .15s ease;
          white-space:nowrap;
        }
        .btn:hover{filter:brightness(1.06); box-shadow:var(--shadow-hover);}
        .btn:active{transform:scale(.96);}
        .btn-primary{background:var(--blue); color:#fff;}
        .btn-red{background:var(--red); color:#fff;}
        .btn-green{background:var(--green); color:#fff;}
        .btn-orange{background:var(--orange); color:#fff;}
        .btn-outline{background:#fff; border:1px solid var(--gray-200); color:var(--gray-700);}
        .btn-sm{padding:7px 12px; font-size:.78rem;}
        .chip-btn{
          border:none;
          border-radius:9px;
          padding:10px 12px;
          font-size:.8rem;
          font-weight:600;
          color:#fff;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:7px;
          min-height:42px;
          transition:transform .12s ease, box-shadow .15s ease, filter .15s ease;
          box-shadow:0 1px 2px rgba(0,0,0,.06);
        }
        .chip-btn:hover{filter:brightness(1.07); box-shadow:0 4px 10px rgba(0,0,0,.12);}
        .chip-btn:active{transform:scale(.95);}
        .chip-btn.on{background:var(--green);}
        .chip-btn.off{background:var(--red);}
        .chip-btn .ic{
          width:16px; height:16px;
          display:inline-flex; align-items:center; justify-content:center;
          font-size:11px;
          background:rgba(255,255,255,.25);
          border-radius:4px;
          flex-shrink:0;
        }
        .main-card{
          background:#fff;
          border:1px solid var(--gray-200);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          padding:22px 24px;
          display:flex;
          flex-direction:column;
          gap:18px;
        }
        .main-card-title{
          display:flex;
          align-items:center;
          gap:9px;
          font-weight:700;
          font-size:1.05rem;
          line-height:1.3;
        }
        .main-card-sub{
          margin:8px 0 0;
          font-size:.85rem;
          color:var(--gray-500);
          line-height:1.55;
        }
        .bulk-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:18px;
        }
        .bulk-panel{
          border-radius:var(--radius);
          padding:18px 18px 20px;
          border:1.5px solid;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        .bulk-panel.siswa{
          background:var(--sky-light);
          border-color:#bfdbfe;
        }
        .bulk-panel.guru{
          background:var(--amber-bg);
          border-color:#fde68a;
        }
        .bulk-panel-title{
          display:flex;
          align-items:center;
          gap:7px;
          font-weight:700;
          font-size:.92rem;
        }
        .bulk-panel.siswa .bulk-panel-title{color:var(--blue-dark);}
        .bulk-panel.guru .bulk-panel-title{color:#b45309;}
        .bulk-panel.unified{
          background:var(--blue-light);
          border-color:#bfdbfe;
          grid-column:span 2;
        }
        .bulk-panel.unified .bulk-panel-title{color:var(--blue-dark);}
        .select-checkbox{
          width:17px;
          height:17px;
          padding:0;
          margin:0;
          accent-color:var(--blue);
          cursor:pointer;
          vertical-align:middle;
        }
        tbody tr.row-selected{background:#eff6ff;}
        tbody tr.row-selected:hover{background:#dbeafe;}
        .chip-flow{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
        }
        .chip-flow .chip-btn{justify-content:center; min-width:0;}
        .filter-card{
          background:#fff;
          border:1px solid var(--gray-200);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          padding:18px 22px;
          display:flex;
          flex-direction:column;
          gap:14px;
        }
        .filter-title{font-weight:700; font-size:.95rem;}
        .filter-row{
          display:grid;
          grid-template-columns:1fr 1fr 1fr auto;
          gap:14px;
          align-items:end;
        }
        .field label{
          display:block;
          font-size:.72rem;
          font-weight:600;
          color:var(--gray-500);
          margin-bottom:5px;
        }
        select, input{
          font-family:inherit;
          font-size:.85rem;
          padding:9px 12px;
          border-radius:var(--radius-sm);
          border:1px solid var(--gray-200);
          background:#fff;
          color:var(--gray-900);
          outline:none;
          width:100%;
          transition:border-color .15s ease, box-shadow .15s ease;
        }
        select:focus, input:focus{border-color:var(--blue); box-shadow:0 0 0 3px rgba(37,99,235,.12);}
        .search-box{
          position:relative;
        }
        .search-box .ic{
          position:absolute;
          left:14px;
          top:50%;
          transform:translateY(-50%);
          color:var(--gray-400);
          font-size:.9rem;
        }
        .search-box input{padding-left:38px;}
        .table-card{
          background:#fff;
          border:1px solid var(--gray-200);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          overflow:hidden;
        }
        .table-wrap{overflow-x:auto;}
        table{
          width:100%;
          border-collapse:collapse;
          min-width:900px;
        }
        thead th{
          background:var(--gray-50);
          text-align:left;
          font-size:.68rem;
          font-weight:700;
          color:var(--gray-500);
          letter-spacing:.03em;
          padding:13px 14px;
          border-bottom:1px solid var(--gray-200);
          white-space:nowrap;
        }
        thead th .th-ic{margin-right:4px;}
        thead th.col-prestasi{color:#a16207;}
        thead th.col-organisasi{color:var(--blue);}
        thead th.col-kepanitiaan{color:var(--orange);}
        thead th.col-event{color:#0891b2;}
        thead th.col-pelanggaran{color:var(--red);}
        thead th.col-perilaku{color:var(--green);}
        tbody td{
          padding:13px 14px;
          font-size:.85rem;
          border-bottom:1px solid var(--gray-100);
          color:var(--gray-700);
          text-align:center;
        }
        tbody td.user-cell{text-align:left;}
        tbody tr{transition:background .12s ease;}
        tbody tr:last-child td{border-bottom:none;}
        tbody tr:hover{background:var(--gray-50);}
        .user-name{font-weight:700; color:var(--gray-900); font-size:.88rem;}
        .user-sub{font-size:.75rem; color:var(--gray-400); margin-top:1px;}
        .role-pill{
          display:inline-block;
          background:var(--orange-light);
          color:#b45309;
          font-size:.7rem;
          font-weight:700;
          padding:3px 10px;
          border-radius:999px;
        }
        .toggle-cell{
          width:34px;
          height:34px;
          border-radius:9px;
          border:none;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          font-size:.8rem;
          color:#fff;
          cursor:pointer;
          transition:transform .12s ease, filter .15s ease;
        }
        .toggle-cell:hover{filter:brightness(1.1);}
        .toggle-cell:active{transform:scale(.88);}
        .toggle-cell.on{background:var(--green);}
        .toggle-cell.off{background:var(--red);}
        @media (max-width: 900px){
          .bulk-grid{grid-template-columns:1fr;}
          .filter-row{grid-template-columns:1fr 1fr; }
          .filter-row .field:last-of-type{grid-column:span 2;}
        }
        @media (max-width: 600px){
          body{padding:14px;}
          .page-header{font-size:1.05rem;}
          .main-card{padding:16px;}
          .bulk-panel{padding:14px;}
          .chip-flow{grid-template-columns:1fr 1fr; gap:8px;}
          .chip-btn{font-size:.72rem; padding:9px 8px; min-height:40px;}
          .filter-row{grid-template-columns:1fr;}
          .filter-row .field:last-of-type{grid-column:span 1;}
          .filter-row .btn-outline{width:100%; justify-content:center;}
          .filter-card{padding:16px;}
          table{min-width:760px;}
        }
      `}</style>

      {/* Header */}
      <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 700 }}>
          <span style={{ fontSize: '1.3rem' }}>🛡️</span>
          Izin Akses Input Data
        </div>
        <button
          onClick={handleResetAll}
          className="btn btn-red"
          title="Hapus semua individual permissions dan kembali ke pengaturan default"
        >
          🔄 Reset Izin
        </button>
      </div>

      {message && (
        <div style={{ padding: '12px 16px', borderRadius: '10px', background: message.startsWith('✅') ? '#dcfce7' : '#fee2e2', color: message.startsWith('✅') ? '#16a34a' : '#ef4444', fontSize: '.85rem', fontWeight: 600 }}>
          {message}
        </div>
      )}

      {/* INDIVIDUAL CONTROL */}
      <>
          <div className="main-card reveal">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="main-card-title">
                <span style={{ fontSize: '1.15rem' }}>👤</span>
                Kontrol Individual
              </div>
              <p className="main-card-sub">
                Centang user pada tabel di bawah, lalu gunakan tombol bulk update — hanya user yang dicentang yang akan diupdate.
              </p>
            </div>

            {/* Unified bulk update - applies only to checked users */}
            <div className="bulk-grid">
              <div className="bulk-panel unified">
                <div className="bulk-panel-title">📦 Bulk Update ({selectedUserIds.size} user dipilih)</div>
                <div className="chip-flow">
                  {jenisInputs.map(({ key, label }) => {
                    const baseDisabled = bulkUpdating || selectedUserIds.size === 0;
                    const enableBlocked = enable => enable && GURU_ONLY_KEYS.includes(key) && !onlyGuruSelected;
                    const enableDisabled = baseDisabled || enableBlocked(true);
                    return (
                      <React.Fragment key={key}>
                        <button
                          className="chip-btn on"
                          onClick={() => handleBulkSelectedUpdate(key, true)}
                          disabled={enableDisabled}
                          title={enableBlocked(true) ? 'Hanya untuk pilihan berisi guru saja — hapus siswa dari pilihan' : undefined}
                          style={{ opacity: enableDisabled ? 0.6 : 1, cursor: enableDisabled ? 'not-allowed' : 'pointer' }}
                        >
                          <span className="ic">✓</span>
                          <span>Aktifkan {label}</span>
                        </button>
                        <button
                          className="chip-btn off"
                          onClick={() => handleBulkSelectedUpdate(key, false)}
                          disabled={baseDisabled}
                          style={{ opacity: baseDisabled ? 0.6 : 1, cursor: baseDisabled ? 'not-allowed' : 'pointer' }}
                        >
                          <span className="ic">✕</span>
                          <span>Matikan {label}</span>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="filter-card reveal">
            <div className="filter-title">Filter</div>
            <div className="filter-row">
              <div className="field">
                <label>Role</label>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                >
                  <option value="">Semua Role</option>
                  <option value="superadmin">Superadmin</option>
                  <option value="guru">Guru</option>
                  <option value="siswa">Siswa</option>
                </select>
              </div>
              <div className="field">
                <label>Kelas</label>
                <select
                  value={filters.kelas}
                  onChange={(e) => handleFilterChange('kelas', e.target.value)}
                >
                  <option value="">Semua Kelas</option>
                  {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Grha</label>
                <select
                  value={filters.grha}
                  onChange={(e) => handleFilterChange('grha', e.target.value)}
                >
                  <option value="">Semua Grha</option>
                  {grhaOptions.map(grha => <option key={grha} value={grha}>{grha}</option>)}
                </select>
              </div>
              <button className="btn btn-outline" onClick={resetFilters}>Reset</button>
            </div>
            <div className="search-box">
              <span className="ic">🔍</span>
              <input
                type="text"
                placeholder="Cari nama, NIS, atau NIP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Selection bar */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontSize: '.85rem', color: '#334155' }}>
            <strong>{selectedUserIds.size} user dipilih</strong>
            <button className="btn btn-outline btn-sm" onClick={handleSelectAllVisible}>
              Pilih semua yang tampil ({filteredUsers.length})
            </button>
            {selectedUserIds.size > 0 && (
              <button className="btn btn-outline btn-sm" onClick={handleClearSelection}>
                Hapus pilihan
              </button>
            )}
          </div>

          {/* Table */}
          <div className="table-card reveal">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '44px' }}>
                      <input
                        type="checkbox"
                        className="select-checkbox"
                        checked={filteredUsers.length > 0 && filteredUsers.every(u => selectedUserIds.has(u.id))}
                        ref={(el) => {
                          if (el) {
                            const someSelected = filteredUsers.some(u => selectedUserIds.has(u.id));
                            const allSelected = filteredUsers.length > 0 && filteredUsers.every(u => selectedUserIds.has(u.id));
                            el.indeterminate = someSelected && !allSelected;
                          }
                        }}
                        onChange={() => {
                          const allSelected = filteredUsers.length > 0 && filteredUsers.every(u => selectedUserIds.has(u.id));
                          if (allSelected) {
                            handleClearSelection();
                          } else {
                            handleSelectAllVisible();
                          }
                        }}
                        title="Pilih semua yang tampil"
                      />
                    </th>
                    <th>User</th>
                    <th>Role</th>
                    <th className="col-prestasi"><span className="th-ic">🏆</span>Prestasi</th>
                    <th className="col-organisasi"><span className="th-ic">👥</span>Organisasi</th>
                    <th className="col-kepanitiaan"><span className="th-ic">📋</span>Kepanitiaan</th>
                    <th className="col-event"><span className="th-ic">📅</span>Event</th>
                    <th className="col-pelanggaran"><span className="th-ic">⚠️</span>Pelanggaran<br/><span style={{ fontWeight: 500 }}>(GURU ONLY)</span></th>
                    <th className="col-perilaku"><span className="th-ic">✅</span>Perilaku<br/><span style={{ fontWeight: 500 }}>(GURU ONLY)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className={selectedUserIds.has(user.id) ? 'row-selected' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          className="select-checkbox"
                          checked={selectedUserIds.has(user.id)}
                          onChange={() => handleToggleSelect(user.id)}
                        />
                      </td>
                      <td className="user-cell">
                        <div className="user-name">{user.nama}</div>
                        <div className="user-sub">{user.nis || user.nip || '-'}</div>
                      </td>
                      <td>
                        <span className="role-pill">{user.role}</span>
                      </td>
                      {/* Siswa only sees prestasi, organisasi, kepanitiaan, event (no pelanggaran/perilaku) */}
                      {user.role === 'siswa' ? (
                        <>
                          <td>
                            <button
                              onClick={() => handleIndividualToggle(user, 'prestasi')}
                              className={`toggle-cell ${user.can_input_prestasi ? 'on' : 'off'}`}
                            >
                              {user.can_input_prestasi ? '✓' : '✕'}
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleIndividualToggle(user, 'organisasi')}
                              className={`toggle-cell ${user.can_input_organisasi ? 'on' : 'off'}`}
                            >
                              {user.can_input_organisasi ? '✓' : '✕'}
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleIndividualToggle(user, 'kepanitiaan')}
                              className={`toggle-cell ${user.can_input_kepanitiaan ? 'on' : 'off'}`}
                            >
                              {user.can_input_kepanitiaan ? '✓' : '✕'}
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleIndividualToggle(user, 'event')}
                              className={`toggle-cell ${user.can_input_event ? 'on' : 'off'}`}
                            >
                              {user.can_input_event ? '✓' : '✕'}
                            </button>
                          </td>
                          <td style={{ color: '#94a3b8' }}>—</td>
                          <td style={{ color: '#94a3b8' }}>—</td>
                        </>
                      ) : (
                        /* Guru sees all 5 columns */
                        jenisInputs.map(({ key }) => {
                          const permKey = `can_input_${key}`;
                          const isEnabled = user[permKey];
                          return (
                            <td key={key}>
                              <button
                                onClick={() => handleIndividualToggle(user, key)}
                                className={`toggle-cell ${isEnabled ? 'on' : 'off'}`}
                              >
                                {isEnabled ? '✓' : '✕'}
                              </button>
                            </td>
                          );
                        })
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '26px' }}>
                Tidak ada data yang cocok
              </div>
            )}
          </div>
      </>
    </div>
  );
}

export default IzinAkun;
