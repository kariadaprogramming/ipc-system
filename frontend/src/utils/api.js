import axios from 'axios';
import API_BASE_URL from '../config';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: Include cookies for HTTP-only auth
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token from localStorage as fallback during transition
api.interceptors.request.use(
  (config) => {
    // During transition, try to get token from localStorage as fallback
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // When sending FormData, let the browser auto-set Content-Type to
    // multipart/form-data with the correct boundary (don't force application/json)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage on auth error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;