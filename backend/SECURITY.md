# IPC School System - Security Documentation

## Implemented Security Measures

### 1. Authentication & Authorization
- **JWT Token-based Authentication**: Secure token generation and validation
- **Role-based Access Control (RBAC)**: Superadmin, Guru, and Siswa roles with different permissions
- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **Token Expiration**: JWT tokens expire after 24 hours

### 2. Rate Limiting & DDoS Protection
- **General API Rate Limiting**: 100 requests per minute per IP
- **Login Rate Limiting**: 5 attempts per 15 minutes per IP
- **Speed Limiting**: Progressive delays after 50 requests per minute
- **Automatic IP-based blocking** for excessive requests

### 3. SQL Injection Prevention
- **Parameterized Queries**: All database queries use parameterized statements (mysql2/promise)
- **Input Validation**: Automatic SQL injection pattern detection
- **Blocked Patterns**: SELECT, INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, EXEC, UNION, etc.
- **Escape Character Detection**: Automatic blocking of suspicious characters

### 4. XSS (Cross-Site Scripting) Prevention
- **Helmet.js Security Headers**: Comprehensive security headers
- **Content Security Policy (CSP)**: Restricts resource loading
- **XSS Pattern Detection**: Automatic removal of script tags
- **Input Sanitization**: HTML entity encoding for all user inputs
- **X-Frame-Options**: Prevents clickjacking attacks

### 5. Input Validation & Sanitization
- **Trimming**: All string inputs automatically trimmed
- **HTML Escaping**: <, >, ", ', & converted to entities
- **Size Limits**: Request body limited to 10MB
- **Type Validation**: Strict type checking for all inputs

### 6. CORS Configuration
- **Origin Whitelist**: Configurable allowed origins
- **Method Restrictions**: Only GET, POST, PUT, DELETE, OPTIONS
- **Header Restrictions**: Only Content-Type and Authorization
- **Production Mode**: CORS restricted in production environment

### 7. Security Headers (Helmet)
- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **Strict-Transport-Security**: HSTS with 1 year max-age
- **Content-Security-Policy**: Restricts script execution
- **Referrer-Policy**: Controls referrer information

### 8. Error Handling
- **No Internal Details**: Error messages don't expose stack traces in production
- **Generic Messages**: Users see generic error messages
- **Logging**: Detailed errors logged server-side only
- **Graceful Degradation**: System remains stable during errors

### 9. File Upload Security
- **Multer Configuration**: Secure file upload handling
- **File Type Validation**: Only images allowed for avatars
- **File Size Limit**: 5MB max for avatar uploads
- **Unique Filenames**: Prevents filename collision attacks
- **Safe Directory**: Uploads stored outside web root

### 10. Database Security
- **Connection Pooling**: Limited connections (max 10)
- **Parameterized Queries**: Prevents SQL injection
- **Input Validation**: All user inputs validated before queries
- **Error Logging**: Database errors logged but not exposed

### 11. Logging & Monitoring
- **Security Audit Logs**: All suspicious requests logged
- **Access Logging**: All API requests logged with IP and timestamp
- **Pattern Detection**: Automatic detection of:
  - SQL injection attempts
  - XSS attempts
  - Brute force attacks
  - Suspicious user agents

### 12. HTTPS & Production Security
- **HSTS Headers**: Forces HTTPS connections
- **Secure Cookies**: Cookie security flags (when implemented)
- **No Sensitive Data in URL**: All tokens in headers only
- **Environment-based Config**: Different configs for dev/prod

## Security Configuration

### Environment Variables (Required)
```env
NODE_ENV=production
JWT_SECRET=your_strong_random_secret_64_chars_or_more
ALLOWED_ORIGINS=https://yourdomain.com
DB_PASSWORD=strong_database_password
```

### Important Security Checklist
- [ ] Change default JWT_SECRET (use 64+ random characters)
- [ ] Change database passwords
- [ ] Set NODE_ENV=production in production
- [ ] Configure ALLOWED_ORIGINS properly
- [ ] Enable HTTPS on server
- [ ] Regularly update dependencies: `npm audit fix`
- [ ] Monitor logs for suspicious activity
- [ ] Rotate JWT_SECRET periodically
- [ ] Keep backups secure
- [ ] Regular security audits

## Common Threats Mitigated

| Threat | Protection |
|--------|------------|
| SQL Injection | Parameterized queries + Pattern detection |
| XSS | CSP + Input sanitization + HTML escaping |
| CSRF | CORS restrictions + Token validation |
| DDoS | Rate limiting + Speed limiting |
| Brute Force | Login rate limiting (5 attempts/15min) |
| Clickjacking | X-Frame-Options: DENY |
| MIME Sniffing | X-Content-Type-Options: nosniff |
| Information Disclosure | Generic error messages |
| MITM | HSTS + HTTPS enforcement |

## Incident Response

If you suspect a security breach:
1. Check logs in `/logs` endpoint (Superadmin only)
2. Review suspicious IP addresses
3. Rotate JWT_SECRET immediately
4. Force all users to re-login
5. Check database for unauthorized changes
6. Contact security team

## Contact
For security concerns, contact the system administrator.

---
**Last Updated**: Security features active and monitored.
