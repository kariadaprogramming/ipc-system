# 📦 IPC School System - Requirements

## 🖥️ System Requirements

### Minimum Requirements
```
OS: Windows 10/11, macOS, or Linux
RAM: 4GB
Storage: 10GB free space
CPU: Dual-core processor
Network: Internet connection for CDN resources
```

### Recommended Requirements
```
RAM: 8GB+
Storage: 50GB SSD
CPU: Quad-core processor
Browser: Latest Chrome/Firefox/Edge
```

---

## 🛠️ Software Requirements

### Required Software
1. **Node.js** (v16.x or higher)
   - Download: https://nodejs.org/
   - Verify: `node -v`

2. **MySQL** (v8.0 or higher)
   - Download: https://dev.mysql.com/downloads/
   - Alternative: XAMPP (includes MySQL)

3. **npm** (v8.x or higher)
   - Included with Node.js
   - Verify: `npm -v`

4. **Git** (optional, for cloning)
   - Download: https://git-scm.com/

---

## 📋 Installation Steps

### Step 1: Install Node.js
1. Download dari https://nodejs.org/ (LTS version)
2. Install dengan default settings
3. Verify: Buka CMD, ketik:
   ```
   node -v
   npm -v
   ```

### Step 2: Install MySQL
**Option A: MySQL Standalone**
1. Download MySQL Installer
2. Install MySQL Server + MySQL Workbench
3. Set root password (ingat password ini!)

**Option B: XAMPP (Recommended untuk pemula)**
1. Download XAMPP dari https://www.apachefriends.org/
2. Install ke C:\xampp
3. Jalankan XAMPP Control Panel
4. Start Apache dan MySQL
5. Buka http://localhost/phpmyadmin

### Step 3: Setup Database
1. Buka phpMyAdmin (http://localhost/phpmyadmin)
2. Buat database baru: `ipc_school`
3. Import file: `backend/database/skema.sql`
4. Selesai!

### Step 4: Install Backend
```bash
# Buka CMD/Terminal
cd backend

# Install semua dependencies
npm install

# Copy environment file
copy .env.example .env    (Windows)
cp .env.example .env      (Linux/Mac)

# Edit .env file dengan notepad:
# - DB_PASSWORD: password MySQL Anda
# - JWT_SECRET: random string panjang

# Jalankan server
npm start
```

### Step 5: Install Frontend
```bash
# Buka CMD/Terminal baru (jangan tutup backend)
cd frontend

# Install dependencies
npm install

# Jalankan aplikasi
npm start
```

### Step 6: Akses Aplikasi
1. Buka browser: http://localhost:3000
2. Login dengan akun default:
   - Username: ADMIN001
   - Password: admin123
3. Selesai! 🎉

---

## 📦 Dependencies Detail

### Backend Packages (auto-install via npm)
```json
{
  "express": "^4.18.2"          // Web server framework
  "mysql2": "^3.6.5"            // Database connector
  "bcryptjs": "^2.4.3"          // Password encryption
  "jsonwebtoken": "^9.0.2"      // JWT authentication
  "cors": "^2.8.5"              // Cross-origin requests
  "dotenv": "^16.3.1"           // Environment variables
  "multer": "^1.4.5"            // File uploads
  "express-validator": "^7.0.1" // Input validation
  "helmet": "^7.1.0"            // Security headers
  "express-rate-limit": "^7.1.5" // Rate limiting
  "express-slow-down": "^2.0.1"  // Speed limiting
}
```

### Frontend Packages (auto-install via npm)
```json
{
  "react": "^18.2.0"            // UI framework
  "react-router-dom": "^6.x"      // Page routing
  "axios": "^1.x"                 // API requests
  "xlsx": "^0.18.x"               // Excel export
  "jspdf": "^2.x"                 // PDF export
  "jspdf-autotable": "^3.x"       // PDF tables
  "aos": "^2.x"                   // Animations
}
```

---

## ⚙️ Environment Configuration

### Backend .env File
```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ipc_school

# Security
JWT_SECRET=your_random_secret_64_chars_minimum

# CORS (production)
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend .env File (jika diperlukan)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔐 Default Login Credentials

| Role | Login ID | Password | Akses |
|------|----------|----------|-------|
| Superadmin | ADMIN001 | admin123 | Full access |
| Guru | (NIP) | (diatur superadmin) | Input data, approval |
| Siswa | (NIS/NISN) | (diatur guru) | View only |

---

## 🐛 Troubleshooting Installation

### Error: "Cannot find module"
```bash
cd backend    # atau cd frontend
npm install   # ulang installasi
```

### Error: "Access denied for user 'root'@'localhost'"
- Pastikan MySQL running
- Cek password di file .env
- Pastikan user mysql punya hak akses

### Error: "Port 5000 already in use"
```bash
# Cari proses yang pakai port 5000
netstat -ano | findstr :5000

# Kill proses (ganti PID dengan nomor dari perintah di atas)
taskkill /PID <PID> /F
```

### Error: "Port 3000 already in use"
```bash
# Kill semua node process
taskkill /F /IM node.exe

# Atau ganti port di frontend
PORT=3001 npm start
```

### Browser Error: "CORS policy"
- Cek CORS configuration di backend server.js
- Pastikan ALLOWED_ORIGINS sesuai dengan URL frontend

---

## 📚 Additional Resources

### Dokumentasi Resmi
- Node.js: https://nodejs.org/docs/
- React: https://react.dev/
- MySQL: https://dev.mysql.com/doc/
- Express: https://expressjs.com/en/api.html

### Tutorial Terkait
- Express + MySQL: https://www.npmjs.com/package/mysql2
- JWT Authentication: https://jwt.io/introduction
- React Router: https://reactrouter.com/en/main

---

## ✅ Post-Installation Checklist

- [ ] Backend running di http://localhost:5000
- [ ] Frontend running di http://localhost:3000
- [ ] Database terkoneksi dengan benar
- [ ] Login dengan ADMIN001 berhasil
- [ ] Avatar upload berfungsi
- [ ] Export Excel/PDF berfungsi
- [ ] Semua menu terlihat dengan benar
- [ ] Tidak ada error di browser console

---

**Butuh bantuan?** Lihat DOCUMENTATION.md untuk panduan lengkap.
