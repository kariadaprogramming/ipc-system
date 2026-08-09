// API Configuration
// Automatically detects environment based on hostname
// Uses localhost for local development, production IP for remote access

const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  
  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  // Production server
  return 'http://202.162.215.133:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;
