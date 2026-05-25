import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [activeTab, setActiveTab] = useState('siswa');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/auth/login', formData);
      console.log('Login response:', response.data);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      console.log('User data stored:', localStorage.getItem('user'));
      console.log('Token stored:', localStorage.getItem('token'));
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <iframe
        className="login-video-bg"
        src="https://www.youtube.com/embed/0jTRCku-hSo?autoplay=1&mute=1&loop=1&playlist=0jTRCku-hSo&controls=0&showinfo=0&rel=0&modestbranding=1&start=0&playsinline=1&vq=hd1080"
        title="YouTube video background"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="login-overlay"></div>
      <div className="login-content">
        <div className="login-card">
          <div className="login-logo" style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>IPC</div>
          <h2 style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>School System</h2>
          <p className="login-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>Indeks Prestasi dan Karakter</p>
          <div className="login-divider" style={{ color: 'rgba(255,255,255,0.8)' }}><span style={{ background: 'transparent', color: 'white' }}>Pilih Tipe Akun</span></div>

        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
          <button
            onClick={() => { setActiveTab('siswa'); setFormData({ username: '', password: '' }); setError(''); }}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'siswa' ? '#3B82F6' : 'transparent',
              color: activeTab === 'siswa' ? 'white' : 'rgba(255,255,255,0.7)',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '6px 6px 0 0',
              transition: 'all 0.2s'
            }}
          >
            Siswa
          </button>
          <button
            onClick={() => { setActiveTab('guru'); setFormData({ username: '', password: '' }); setError(''); }}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'guru' ? '#3B82F6' : 'transparent',
              color: activeTab === 'guru' ? 'white' : 'rgba(255,255,255,0.7)',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '6px 6px 0 0',
              transition: 'all 0.2s'
            }}
          >
            Guru
          </button>
          <button
            onClick={() => { setActiveTab('superadmin'); setFormData({ username: '', password: '' }); setError(''); }}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'superadmin' ? '#3B82F6' : 'transparent',
              color: activeTab === 'superadmin' ? 'white' : 'rgba(255,255,255,0.7)',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '6px 6px 0 0',
              transition: 'all 0.2s'
            }}
          >
            SuperAdmin
          </button>
        </div>
        
        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '16px' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {activeTab === 'siswa' && (
            <>
              <div className="form-group">
                <label>NIS / NISN</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan NIS atau NISN"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </>
          )}

          {activeTab === 'guru' && (
            <>
              <div className="form-group">
                <label>NIP</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan NIP"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </>
          )}

          {activeTab === 'superadmin' && (
            <>
              <div className="form-group">
                <label>NIS (ADMIN001)</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan NIS"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
          <p>SuperAdmin: ADMIN001 / admin123</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
