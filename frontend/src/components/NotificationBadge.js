import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotificationBadge() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [audio] = useState(new Audio('/notification-sound.mp3'));

  useEffect(() => {
    fetchNotificationCount();
    const interval = setInterval(fetchNotificationCount, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/approvals-v2/notifications/count', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const newCount = response.data.count;
      if (newCount > count && count > 0) {
        // Play sound for new notifications
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      setCount(newCount);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/approvals-v2/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
      setCount(0); // Reset count when viewing
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleClick = () => {
    if (!showDropdown) {
      fetchNotifications();
    }
    setShowDropdown(!showDropdown);
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

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={handleClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          position: 'relative'
        }}
      >
        <span style={{ fontSize: '24px' }}>🔔</span>
        {count > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            backgroundColor: '#e74c3c',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          width: '400px',
          maxHeight: '500px',
          overflowY: 'auto',
          backgroundColor: 'white',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          borderRadius: '12px',
          zIndex: 1000,
          padding: '0',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            padding: '15px 20px',
            borderBottom: '2px solid #007bff',
            backgroundColor: '#f8f9fa',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
          }}>
            <h4 style={{ margin: 0, color: '#333', fontSize: '16px', fontWeight: '600' }}>
              📢 Notifikasi
              {count > 0 && (
                <span style={{
                  marginLeft: '10px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {count} baru
                </span>
              )}
            </h4>
          </div>
          
          {notifications.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
              <span style={{ fontSize: '48px' }}>📭</span>
              <p style={{ marginTop: '10px', margin: 0 }}>Tidak ada notifikasi</p>
            </div>
          ) : (
            <div>
              {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: notif.is_read ? 'white' : getNotificationColor(notif.type),
                    transition: 'background-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!notif.is_read) {
                      e.target.style.backgroundColor = getNotificationColor(notif.type);
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = notif.is_read ? 'white' : getNotificationColor(notif.type);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '20px', marginTop: '2px' }}>{getNotificationIcon(notif.type)}</span>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '14px', color: '#333', display: 'block', marginBottom: '4px' }}>
                        {notif.title}
                      </strong>
                      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#555', lineHeight: '1.4' }}>
                        {notif.message}
                      </p>
                      <small style={{ color: '#999', fontSize: '11px', display: 'block' }}>
                        {new Date(notif.created_at).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div style={{
            padding: '10px 20px',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: '#f8f9fa',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            textAlign: 'center'
          }}>
            <small style={{ color: '#666' }}>Klik di luar untuk menutup</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBadge;
