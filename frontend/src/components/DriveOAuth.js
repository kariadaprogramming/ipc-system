import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DriveOAuth() {
  const [status, setStatus] = useState({
    initialized: false,
    authenticated: false,
    authUrl: null,
    loading: true
  });
  const [createdFolders, setCreatedFolders] = useState([]);
  const [driveLinks, setDriveLinks] = useState({
    prestasi: '',
    event: '',
    organisasi: '',
    pelanggaran: '',
    perilaku: ''
  });
  const [message, setMessage] = useState('');
  const [creatingFolder, setCreatingFolder] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('prestasi');

  // Folder types that can be created
  const driveTypes = [
    { value: 'prestasi', label: 'Folder Prestasi', defaultName: 'IPC-Prestasi' },
    { value: 'event', label: 'Folder Event', defaultName: 'IPC-Event' },
    { value: 'organisasi', label: 'Folder Organisasi', defaultName: 'IPC-Organisasi' },
    { value: 'pelanggaran', label: 'Folder Pelanggaran', defaultName: 'IPC-Pelanggaran' },
    { value: 'perilaku', label: 'Folder Perilaku', defaultName: 'IPC-Perilaku' }
  ];

  useEffect(() => {
    checkStatus();
    loadCreatedFolders();
    fetchDriveLinks();
  }, []);

  // Fetch current drive links from database
  const fetchDriveLinks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/drive-links', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const links = {};
      response.data.forEach(link => {
        links[link.type] = link.drive_url;
      });
      setDriveLinks(links);
    } catch (error) {
      console.error('Error fetching drive links:', error);
    }
  };

  // Load created folders from localStorage
  const loadCreatedFolders = () => {
    const saved = localStorage.getItem('createdDriveFolders');
    if (saved) {
      setCreatedFolders(JSON.parse(saved));
    }
  };

  // Save created folders to localStorage
  const saveCreatedFolders = (folders) => {
    localStorage.setItem('createdDriveFolders', JSON.stringify(folders));
    setCreatedFolders(folders);
  };

  const checkStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/drive-auth/status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus({ ...response.data, loading: false });
    } catch (error) {
      setStatus({ 
        initialized: false, 
        authenticated: false, 
        loading: false,
        error: error.response?.data?.message || 'Error checking status'
      });
    }
  };

  const handleAuthorize = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/drive-auth/authorize', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const authUrl = response.data.authUrl;
      
      // Open authorization in popup
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        authUrl,
        'GoogleDriveAuth',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Check if popup closed
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          checkStatus(); // Refresh status
        }
      }, 1000);

    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  // Check if folder already created (prevent duplicates)
  const isFolderCreated = (type) => {
    return createdFolders.some(f => f.type === type);
  };

  // Get folder info if created
  const getFolderInfo = (type) => {
    return createdFolders.find(f => f.type === type);
  };

  const createFolder = async (type, folderName) => {
    // Prevent duplicate creation
    if (isFolderCreated(type)) {
      setMessage(`Folder ${folderName} sudah pernah dibuat!`);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setCreatingFolder(prev => ({ ...prev, [type]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/drive-auth/setup-folder', {
        type,
        folderName
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Save to created folders list
      const newFolder = {
        type: type,
        name: folderName,
        folderId: response.data.folderId,
        folderUrl: response.data.folderUrl,
        createdAt: new Date().toISOString()
      };
      const updatedFolders = [...createdFolders, newFolder];
      saveCreatedFolders(updatedFolders);
      
      // Refresh drive links to show updated link
      fetchDriveLinks();
      
      setMessage(`Folder ${folderName} berhasil dibuat di Google Drive!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setCreatingFolder(prev => ({ ...prev, [type]: false }));
    }
  };

  // Handle search student photo in Drive
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setMessage('Masukkan NIS atau nama siswa');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Try to get folder URL from driveLinks (database) first
    let driveUrl = driveLinks[searchType];
    
    // If not in database, try from createdFolders (localStorage)
    if (!driveUrl) {
      const folderInfo = getFolderInfo(searchType);
      if (folderInfo) {
        driveUrl = folderInfo.folderUrl;
      }
    }
    
    if (!driveUrl) {
      setMessage(`Link Drive untuk ${searchType} belum diatur. Buat folder atau atur link terlebih dahulu!`);
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    console.log('Opening Drive URL:', driveUrl, 'with search:', searchQuery);
    
    // Extract folder ID from drive URL
    let folderId = null;
    if (driveUrl.includes('/folders/')) {
      folderId = driveUrl.split('/folders/')[1]?.split('?')[0]?.split('/')[0];
    }
    
    if (!folderId) {
      setMessage('URL Drive tidak valid. Silakan periksa link Drive.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    // Build proper Drive search URL
    const searchUrl = `https://drive.google.com/drive/folders/${folderId}?q=${encodeURIComponent(searchQuery)}`;
    console.log('Final search URL:', searchUrl);
    
    // Open Drive folder with search
    const newWindow = window.open(searchUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      setMessage('Popup diblokir! Izinkan popup untuk membuka Google Drive.');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  if (status.loading) {
    return <div className="card"><div className="loading"><div className="spinner"></div></div></div>;
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>🔗 Google Drive OAuth Setup</h2>
      
      {message && (
        <div style={{
          padding: '12px 20px',
          marginBottom: '20px',
          backgroundColor: message.includes('berhasil') ? '#d4edda' : '#f8d7da',
          color: message.includes('berhasil') ? '#155724' : '#721c24',
          borderRadius: '8px'
        }}>
          {message}
        </div>
      )}

      {/* OAuth Status */}
      <div style={{
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: status.authenticated ? '#d4edda' : status.initialized ? '#fff3cd' : '#f8d7da',
        borderRadius: '8px',
        border: `1px solid ${status.authenticated ? '#28a745' : status.initialized ? '#ffc107' : '#dc3545'}`
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>
          {status.authenticated ? '✅ Sudah Terhubung' : status.initialized ? '⚠️ Belum Authorized' : '❌ Belum Setup'}
        </h3>
        
        <div style={{ marginBottom: '15px' }}>
          <p><strong>Status OAuth:</strong> {status.initialized ? '✅ Credentials ditemukan' : '❌ Credentials tidak ditemukan'}</p>
          <p><strong>Status Autentikasi:</strong> {status.authenticated ? '✅ Sudah login' : '❌ Belum login'}</p>
        </div>

        {!status.authenticated && status.initialized && (
          <button
            onClick={handleAuthorize}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔐 Authorize Google Drive
          </button>
        )}

        {!status.initialized && (
          <div style={{ marginTop: '15px' }}>
            <p style={{ color: '#856404' }}>
              File <code>oauth-credentials.json</code> tidak ditemukan.
              <br />
              Silakan ikuti panduan setup di <code>backend/GOOGLE_DRIVE_PERSONAL_SETUP.md</code>
            </p>
          </div>
        )}
      </div>

      {/* Current Drive Links from Database */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #2196f3' }}>
        <h3 style={{ marginBottom: '15px' }}>🔗 Link Drive Saat Ini (di Database)</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          {driveTypes.map(type => {
            const link = driveLinks[type.value];
            return (
              <div key={type.value} style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <strong style={{ fontSize: '14px' }}>{type.label}</strong>
                  <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>
                    {link ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#2196f3' }}>
                        {link}
                      </a>
                    ) : (
                      <span style={{ color: '#999' }}>Belum diatur</span>
                    )}
                  </p>
                </div>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#2196f3',
                      color: 'white',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      marginLeft: '10px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    📁 Buka
                  </a>
                )}
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: '15px', fontSize: '13px', color: '#666' }}>
          💡 <strong>Catatan:</strong> Link akan otomatis terupdate saat Anda membuat folder baru.
        </p>
      </div>

      {/* Folder Setup - Create Only */}
      {status.authenticated && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>📁 Buat Folder di Drive (Cukup 1x)</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {driveTypes.map(type => {
              const created = isFolderCreated(type);
              const folderInfo = getFolderInfo(type);
              
              return (
                <div key={type.value} style={{
                  padding: '15px',
                  backgroundColor: created ? '#d4edda' : 'white',
                  borderRadius: '8px',
                  border: `1px solid ${created ? '#28a745' : '#e0e0e0'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{type.label}</strong>
                    {created ? (
                      <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#28a745' }}>
                        ✅ Sudah dibuat: <a href={folderInfo?.folderUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>{folderInfo?.name}</a>
                      </p>
                    ) : (
                      <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#666' }}>
                        Belum dibuat
                      </p>
                    )}
                  </div>
                  {created ? (
                    <span style={{
                      padding: '8px 16px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}>
                      ✅ Sudah Ada
                    </span>
                  ) : (
                    <button
                      onClick={() => createFolder(type.value, type.defaultName)}
                      disabled={creatingFolder[type.value]}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: creatingFolder[type.value] ? '#6c757d' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: creatingFolder[type.value] ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {creatingFolder[type.value] ? '⏳ Membuat...' : '➕ Buat Folder'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Created Folders List */}
          {createdFolders.length > 0 && (
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '15px' }}>📂 Folder yang Sudah Dibuat</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {createdFolders.map(folder => (
                  <div key={folder.type} style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong>{folder.name}</strong>
                      <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#666' }}>
                        {driveTypes.find(t => t.value === folder.type)?.label}
                      </p>
                    </div>
                    <a
                      href={folder.folderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '13px'
                      }}
                    >
                      📁 Buka
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Student Photo in Drive */}
      {status.authenticated && createdFolders.length > 0 && (
        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
          <h3 style={{ marginBottom: '15px' }}>🔍 Cari Foto Siswa di Drive</h3>
          
          <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Pilih Kategori:
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                {driveTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                NIS atau Nama Siswa:
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan NIS atau nama"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <button
              onClick={handleSearch}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ffc107',
                color: '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🔍 Cari di Google Drive
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h4>📖 Panduan Setup Google Drive Pribadi:</h4>
        <ol style={{ lineHeight: '1.8' }}>
          <li>Buat OAuth2 credentials di <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
          <li>Enable Google Drive API</li>
          <li>Download JSON dan simpan sebagai <code>oauth-credentials.json</code> di folder <code>backend/</code></li>
          <li>Restart server backend</li>
          <li>Klik "Authorize Google Drive" di atas</li>
          <li>Login dengan akun Google Anda dan Allow</li>
          <li>Buat folder untuk setiap kategori atau set manual di "Drive Links"</li>
        </ol>
        <p style={{ marginTop: '10px' }}>
          Detail lengkap: <code>backend/GOOGLE_DRIVE_PERSONAL_SETUP.md</code>
        </p>
      </div>
    </div>
  );
}

export default DriveOAuth;
