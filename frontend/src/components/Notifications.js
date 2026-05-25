import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/approvals-v2/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setMessage('Gagal memuat notifikasi');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/approvals-v2/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'approval_needed': return '⏳';
      case 'pembina_approved': return '👨‍🏫';
      case 'new_submission': return '📝';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'approved': return '#d4edda';
      case 'rejected': return '#f8d7da';
      case 'approval_needed': return '#fff3cd';
      case 'pembina_approved': return '#cce5ff';
      case 'new_submission': return '#e2e3e5';
      default: return '#f8f9fa';
    }
  };

  const getNotificationTitle = (type) => {
    switch(type) {
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      case 'approval_needed': return 'Perlu Persetujuan';
      case 'pembina_approved': return 'Pembina Menyetujui';
      case 'new_submission': return 'Pengajuan Baru';
      default: return 'Notifikasi';
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>📢 Notifikasi</h2>
      
      {message && (
        <div style={{
          padding: '12px 20px',
          marginBottom: '20px',
          backgroundColor: '#d1ecf1',
          color: '#0c5460',
          borderRadius: '8px',
          border: '1px solid #bee5eb'
        }}>
          {message}
        </div>
      )}

      {notifications.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <span style={{ fontSize: '64px' }}>📭</span>
          <p style={{ marginTop: '20px', fontSize: '18px', color: '#666', margin: 0 }}>
            Tidak ada notifikasi
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => !notif.is_read && markAsRead(notif.id)}
              style={{
                padding: '20px',
                backgroundColor: notif.is_read ? 'white' : getNotificationColor(notif.type),
                borderRadius: '12px',
                border: notif.is_read ? '1px solid #e0e0e0' : '2px solid #007bff',
                cursor: notif.is_read ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: notif.is_read ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (!notif.is_read) {
                  e.target.style.transform = 'translateX(5px)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <span style={{ fontSize: '32px' }}>{getNotificationIcon(notif.type)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                      {getNotificationTitle(notif.type)}
                      {!notif.is_read && (
                        <span style={{
                          marginLeft: '10px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'normal'
                        }}>
                          Baru
                        </span>
                      )}
                    </h3>
                    <small style={{ color: '#999', fontSize: '12px', whiteSpace: 'nowrap' }}>
                      {new Date(notif.created_at).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                    {notif.message}
                  </p>
                  
                  {!notif.is_read && (
                    <small style={{ color: '#007bff', fontSize: '12px' }}>
                      Klik untuk menandai sebagai dibaca
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
