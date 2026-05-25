import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/search/students?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (student) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/search/student/${student.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedStudent(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  return (
    <div>
      <h2>Search Siswa</h2>
      <div className="card">
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berdasarkan nama atau NIS..."
            style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
            {loading ? 'Mencari...' : 'Cari'}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="card">
          <h3>Hasil Pencarian</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>NIS</th>
                <th>Kelas</th>
                <th>Jurusan</th>
                <th>Grha</th>
                <th>IPC</th>
                <th>Prestasi Akademik</th>
                <th>Prestasi Non-Akademik</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {results.map(student => (
                <tr key={student.id}>
                  <td>{student.nama}</td>
                  <td>{student.nis}</td>
                  <td>{student.kelas}</td>
                  <td>{student.jurusan}</td>
                  <td>{student.grha}</td>
                  <td>{student.ipc_total}</td>
                  <td>{student.total_prestasi_akademik}</td>
                  <td>{student.total_prestasi_nonakademik}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => handleViewDetails(student)} style={{ padding: '5px 10px' }}>
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedStudent && (
        <div className="card">
          <h3>Detail Siswa: {selectedStudent.student.nama}</h3>
          <button className="btn btn-danger" onClick={() => setSelectedStudent(null)} style={{ marginBottom: '20px' }}>Tutup</button>
          
          <div style={{ marginBottom: '20px' }}>
            <p><strong>NIS:</strong> {selectedStudent.student.nis}</p>
            <p><strong>Kelas:</strong> {selectedStudent.student.kelas}</p>
            <p><strong>Jurusan:</strong> {selectedStudent.student.jurusan}</p>
            <p><strong>Grha:</strong> {selectedStudent.student.grha}</p>
            <p><strong>IPC Total:</strong> {selectedStudent.student.ipc_total}</p>
          </div>

          <h4>Prestasi Akademik: {selectedStudent.total_prestasi_akademik}</h4>
          {selectedStudent.prestasi.filter(p => p.jenis === 'akademik').length > 0 ? (
            <table className="table" style={{ marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th>Nama Lomba</th>
                  <th>Juara</th>
                  <th>Kategori</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.prestasi.filter(p => p.jenis === 'akademik').map(p => (
                  <tr key={p.id}>
                    <td>{p.nama_lomba}</td>
                    <td>{p.juara}</td>
                    <td>{p.kategori}</td>
                    <td>{p.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ marginBottom: '20px' }}>Tidak ada prestasi akademik</p>
          )}

          <h4>Prestasi Non-Akademik: {selectedStudent.total_prestasi_nonakademik}</h4>
          {selectedStudent.prestasi.filter(p => p.jenis === 'nonakademik').length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nama Lomba</th>
                  <th>Juara</th>
                  <th>Kategori</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.prestasi.filter(p => p.jenis === 'nonakademik').map(p => (
                  <tr key={p.id}>
                    <td>{p.nama_lomba}</td>
                    <td>{p.juara}</td>
                    <td>{p.kategori}</td>
                    <td>{p.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Tidak ada prestasi non-akademik</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
