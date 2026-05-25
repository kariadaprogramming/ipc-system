import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DriveStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkDriveStatus();
  }, []);

  const checkDriveStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/drive-status/config', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus(response.data);
    } catch (err) {
      setError('Gagal memuat status Drive: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h2>Status Google Drive</h2>
        <div className="loading"><div className="spinner"></div></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2>Status Google Drive</h2>
        <div style={{ color: 'red', padding: '20px' }}>{error}</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>Status Google Drive Integration</h2>
      
      {status && (
        <div>
          {/* Service Account Status */}
          <div style={{ 
            padding: '15px', 
            marginBottom: '20px',
            backgroundColor: status.serviceAccount ? '#d4edda' : '#f8d7da',
            borderRadius: '8px',
            border: `1px solid ${status.serviceAccount ? '#28a745' : '#dc3545'}`
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>
              {status.serviceAccount ? '✅' : '❌'} Service Account
            </h3>
            <p style={{ margin: 0 }}>
              {status.serviceAccount 
                ? 'File service-account.json ditemukan' 
                : 'File service-account.json TIDAK ditemukan. Silakan upload file credentials dari Google Cloud Console.'}
            </p>
            {status.driveApiReady !== undefined && (
              <p style={{ margin: '10px 0 0 0' }}>
                <strong>Drive API:</strong> {status.driveApiReady ? '✅ Ready' : '❌ Error'}
                {status.driveApiError && (
                  <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                    Error: {status.driveApiError}
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Drive Links Status */}
          <h3 style={{ marginBottom: '15px' }}>Drive Folder Links</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {Object.entries(status.driveLinks).map(([type, config]) => (
              <div key={type} style={{
                padding: '15px',
                backgroundColor: config.valid ? '#d4edda' : config.configured ? '#fff3cd' : '#f8d7da',
                borderRadius: '8px',
                border: `1px solid ${config.valid ? '#28a745' : config.configured ? '#ffc107' : '#dc3545'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ textTransform: 'capitalize' }}>{type}</strong>
                  <span style={{ 
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: config.valid ? '#28a745' : config.configured ? '#ffc107' : '#dc3545',
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    {config.valid ? '✅ Valid' : config.configured ? '⚠️ Invalid URL' : '❌ Not Set'}
                  </span>
                </div>
                {config.url && (
                  <p style={{ margin: '8px 0 0 0', fontSize: '13px', wordBreak: 'break-all' }}>
                    URL: {config.url}
                  </p>
                )}
                {config.folderId && (
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#28a745' }}>
                    Folder ID: {config.folderId}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Overall Status */}
          <div style={{
            marginTop: '20px',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: status.overall ? '#d4edda' : '#f8d7da',
            borderRadius: '8px',
            border: `2px solid ${status.overall ? '#28a745' : '#dc3545'}`
          }}>
            <h2 style={{ margin: 0 }}>
              {status.overall ? '✅' : '❌'} {status.overall ? 'Sistem Siap' : 'Setup Belum Lengkap'}
            </h2>
            <p style={{ margin: '10px 0 0 0' }}>
              {status.overall 
                ? 'Google Drive integration sudah siap digunakan. Foto akan otomatis diupload ke Drive.' 
                : 'Silakan lengkapi setup di atas sebelum menggunakan fitur upload foto.'}
            </p>
          </div>

          {/* Instructions */}
          {!status.overall && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
              <h4>Cara Setup:</h4>
              <ol style={{ lineHeight: '1.8' }}>
                <li>Install package: <code>npm install googleapis</code></li>
                <li>Buat project di <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                <li>Enable Google Drive API</li>
                <li>Buat Service Account dan download JSON credentials</li>
                <li>Rename file menjadi <code>service-account.json</code> dan simpan di folder <code>backend/</code></li>
                <li>Buat folder di Google Drive dan share dengan email Service Account</li>
                <li>Copy link folder dan paste di menu "Drive Links"</li>
                <li>Restart server backend</li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DriveStatus;
