import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [activeTab, setActiveTab] = useState('akademik'); // 'akademik' or 'nonakademik'
  const [akademikData, setAkademikData] = useState([]);
  const [nonAkademikData, setNonAkademikData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch both rankings in parallel
      const [akademikRes, nonAkademikRes] = await Promise.all([
        axios.get('/search/leaderboard/akademik', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/search/leaderboard/nonakademik', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setAkademikData(akademikRes.data);
      setNonAkademikData(nonAkademikRes.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Gagal memuat data peringkat');
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return { bg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', text: '#000', icon: '🥇', shadow: '0 8px 25px rgba(255, 215, 0, 0.4)' };
    if (rank === 2) return { bg: 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)', text: '#000', icon: '🥈', shadow: '0 8px 25px rgba(192, 192, 192, 0.4)' };
    if (rank === 3) return { bg: 'linear-gradient(135deg, #CD7F32 0%, #B87333 100%)', text: '#fff', icon: '🥉', shadow: '0 8px 25px rgba(205, 127, 50, 0.4)' };
    return { bg: 'var(--bg-tertiary)', text: 'var(--text-primary)', icon: rank, shadow: 'none' };
  };

  const currentData = activeTab === 'akademik' ? akademikData : nonAkademikData;

  if (loading) {
    return (
      <div data-aos="fade-up">
        <h2>🏆 Peringkat</h2>
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div className="spinner" style={{ marginBottom: '20px' }}></div>
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div data-aos="fade-up">
        <h2>🏆 Peringkat</h2>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--danger-color)', marginBottom: '20px', fontSize: '1.1rem' }}>{error}</p>
          <button className="btn btn-primary" onClick={fetchLeaderboardData}>
            🔄 Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-aos="fade-up">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2rem' }}>🏆</span>
          Peringkat Top 20
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Lihat peringkat siswa berdasarkan prestasi akademik dan non-akademik
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }} data-aos="fade-down" data-aos-delay="100">
        <button
          onClick={() => setActiveTab('akademik')}
          style={{
            flex: 1,
            padding: '16px',
            border: '2px solid',
            borderColor: activeTab === 'akademik' ? 'var(--primary-color)' : 'var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            background: activeTab === 'akademik' ? 'var(--primary-color)' : 'var(--bg-primary)',
            color: activeTab === 'akademik' ? 'white' : 'var(--text-primary)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📚</div>
          <div style={{ fontSize: '1rem', fontWeight: '700' }}>Akademik</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '2px' }}>{akademikData.length} siswa</div>
        </button>
        <button
          onClick={() => setActiveTab('nonakademik')}
          style={{
            flex: 1,
            padding: '16px',
            border: '2px solid',
            borderColor: activeTab === 'nonakademik' ? 'var(--success-color)' : 'var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            background: activeTab === 'nonakademik' ? 'var(--success-color)' : 'var(--bg-primary)',
            color: activeTab === 'nonakademik' ? 'white' : 'var(--text-primary)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🎨</div>
          <div style={{ fontSize: '1rem', fontWeight: '700' }}>Non-Akademik</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '2px' }}>{nonAkademikData.length} siswa</div>
        </button>
      </div>

      {/* Refresh Button */}
      <div style={{ marginBottom: '24px', textAlign: 'right' }} data-aos="fade-down" data-aos-delay="200">
        <button 
          className="btn btn-info" 
          onClick={fetchLeaderboardData}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="card" data-aos="fade-up" data-aos-delay="300">
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeTab === 'akademik' ? '📚' : '🎨'}
            Peringkat {activeTab === 'akademik' ? 'Akademik' : 'Non-Akademik'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
            {activeTab === 'akademik' 
              ? 'Peringkat berdasarkan jumlah prestasi akademik yang telah disetujui.'
              : 'Peringkat berdasarkan jumlah prestasi non-akademik yang telah disetujui.'}
          </p>
        </div>

        {currentData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '1.1rem' }}>Belum ada data prestasi {activeTab === 'akademik' ? 'akademik' : 'non-akademik'}.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: 'var(--border-radius-sm)' }}>
            <table className="table" style={{ minWidth: '800px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: '60px', padding: '16px' }}>Posisi</th>
                  <th style={{ width: '180px', padding: '16px' }}>Nama</th>
                  <th style={{ textAlign: 'center', width: '100px', padding: '16px' }}>Kelas</th>
                  <th style={{ textAlign: 'center', width: '100px', padding: '16px' }}>Total</th>
                  <th style={{ width: '450px', padding: '16px' }}>Detail Prestasi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((student, index) => {
                  const badge = getRankBadge(student.rank);
                  return (
                    <tr 
                      key={student.id} 
                      style={{ 
                        background: badge.bg,
                        color: badge.text,
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'scale(1.01)';
                        e.target.style.boxShadow = badge.shadow;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <td style={{ textAlign: 'center', padding: '16px', fontSize: '1.5rem' }}>
                        {badge.icon}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '2px solid var(--primary-color)',
                            flexShrink: 0
                          }}>
                            {student.foto ? (
                              <img 
                                src={`http://localhost:5000${student.foto}`} 
                                alt={student.nama} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                            ) : (
                              <span style={{ fontSize: '1.2rem' }}>👤</span>
                            )}
                          </div>
                          <div>
                            <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '2px' }}>{student.nama}</strong>
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>NIS: {student.nis}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', padding: '16px' }}>
                        <strong style={{ display: 'block', fontSize: '1rem' }}>{student.kelas}</strong>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{student.jurusan}</span>
                      </td>
                      <td style={{ textAlign: 'center', padding: '16px', fontWeight: '700', fontSize: '1.5rem' }}>
                        {student.total_prestasi}
                      </td>
                      <td style={{ padding: '16px', fontSize: '0.85rem', lineHeight: '1.8' }}>
                        {student.detail_prestasi && student.detail_prestasi.length > 0 ? (
                          <div style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '8px' }}>
                            {student.detail_prestasi.map((comp, idx) => (
                              <div 
                                key={idx} 
                                style={{ 
                                  marginBottom: '8px', 
                                  padding: '8px', 
                                  background: 'rgba(255,255,255,0.3)', 
                                  borderRadius: 'var(--border-radius-sm)',
                                  transition: 'all var(--transition-fast)'
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.background = 'rgba(255,255,255,0.5)';
                                  e.target.style.transform = 'translateX(4px)';
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.background = 'rgba(255,255,255,0.3)';
                                  e.target.style.transform = 'translateX(0)';
                                }}
                              >
                                <strong style={{ display: 'block', marginBottom: '2px', fontSize: '0.85rem' }}>
                                  🏆 {comp.nama_lomba}
                                </strong>
                                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                  Juara {comp.juara}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span style={{ opacity: 0.6, fontStyle: 'italic' }}>Tidak ada detail</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Legend */}
        <div style={{ 
          marginTop: '24px', 
          padding: '20px', 
          background: 'var(--bg-tertiary)', 
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--border-color)'
        }} data-aos="fade-up" data-aos-delay="400">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            📋 Keterangan
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '12px' }}>
            <div style={{ padding: '10px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-sm)' }}>
              <strong style={{ color: 'var(--primary-color)' }}>👤 Nama</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Nama siswa</div>
            </div>
            <div style={{ padding: '10px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-sm)' }}>
              <strong style={{ color: 'var(--primary-color)' }}>🏫 Kelas</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Kelas & jurusan</div>
            </div>
            <div style={{ padding: '10px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-sm)' }}>
              <strong style={{ color: 'var(--primary-color)' }}>📊 Total</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Jumlah prestasi</div>
            </div>
            <div style={{ padding: '10px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-sm)' }}>
              <strong style={{ color: 'var(--primary-color)' }}>📝 Detail</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Info lomba & juara</div>
            </div>
          </div>
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            background: 'var(--bg-primary)', 
            borderRadius: 'var(--border-radius-sm)',
            borderLeft: '3px solid var(--warning-color)'
          }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
              <strong>💡 Info:</strong> 🥇🥈🥉 = Peringkat 1-3 (Emas, Perak, Perunggu) | Data diupdate otomatis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
