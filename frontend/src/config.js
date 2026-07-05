// API Configuration
// Change this to your server's IP address when accessing from other devices
// Current IP: 192.168.21.27
// For local development: const API_BASE_URL = 'http://localhost:5000/api';
// For cross-device access: const API_BASE_URL = 'http://192.168.21.27:5000/api';
// For production: const API_BASE_URL = '/api';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api';

export default API_BASE_URL;
