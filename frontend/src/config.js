// API Configuration
// Change this to your server's IP address when accessing from other devices
// Current IP: 192.168.21.27
// For local development: const API_BASE_URL = 'http://localhost:5000/api';
// For cross-device access: const API_BASE_URL = 'http://192.168.21.27:5000/api';

const API_BASE_URL = 'http://localhost:5000/api';

// PWA Configuration
const PWA_CONFIG = {
  name: 'IPC School System',
  shortName: 'IPC School',
  description: 'Sistem Informasi Sekolah IPC',
  logoUrl: '/icon-192.png', // Path to logo image
  themeColor: '#3B82F6'
};

export { PWA_CONFIG };
export default API_BASE_URL;
