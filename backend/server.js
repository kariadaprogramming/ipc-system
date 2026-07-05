const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { 
  securityHeaders, 
  apiLimiter, 
  speedLimiter, 
  sqlInjectionPrevention, 
  xssPrevention, 
  sanitizeInput, 
  errorHandler,
  securityLogger,
  loginLimiter 
} = require('./middleware/security');

dotenv.config();

const app = express();

// Security Middleware - Security headers (Helmet)
app.use(securityHeaders);

// Security Middleware - Rate limiting
app.use(apiLimiter);

// Security Middleware - Speed limiting
app.use(speedLimiter);

// Security Middleware - Request logging for security audit
app.use(securityLogger);

// Security Middleware - SQL Injection prevention
app.use(sqlInjectionPrevention);

// Security Middleware - XSS prevention
app.use(xssPrevention);

// Security Middleware - Input sanitization
app.use(sanitizeInput);

// CORS - Restricted for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static folder for uploads - with CORS headers for images
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Serve frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle client-side routing - return index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Routes - Auth with login rate limiting
app.use('/api/auth', loginLimiter, require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/prestasi', require('./routes/prestasi'));
app.use('/api/organisasi', require('./routes/organisasi'));
app.use('/api/event', require('./routes/event'));
app.use('/api/pelanggaran', require('./routes/pelanggaran'));
app.use('/api/perilaku', require('./routes/perilaku'));
app.use('/api/approvals', require('./routes/approvals'));
app.use('/api/approvals-v2', require('./routes/approvals-v2'));
app.use('/api/permissions', require('./routes/permissions'));
app.use('/api/input-access', require('./routes/input-access'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/wali-kelas', require('./routes/waliKelas'));
app.use('/api/search', require('./routes/search'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/file-viewer', require('./routes/file-viewer'));

// Global error handler - Security: Don't expose internal details
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Listen on all interfaces for cross-device access

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
    console.log(`Access from other devices using your computer's IP address`);
    console.log(`Security middleware active: Helmet, Rate Limiting, SQL Injection Prevention, XSS Prevention`);
});
