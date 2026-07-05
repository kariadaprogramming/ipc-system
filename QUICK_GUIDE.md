# 🎓 IPC School System - Quick Reference Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [User Roles & Access](#user-roles--access)
4. [Feature Matrix](#feature-matrix)
5. [Workflow Diagrams](#workflow-diagrams)
6. [Troubleshooting](#troubleshooting)

---

## 🖥️ System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| OS | Windows 10 / Linux / macOS | Windows 11 / Ubuntu 22.04 |
| RAM | 4GB | 8GB+ |
| Storage | 10GB | 50GB SSD |
| Node.js | 16.x | 18.x LTS |
| MySQL | 8.0 | 8.0.32+ |
| Browser | Chrome 100+ | Latest Chrome/Firefox |

---

## 📦 Installation Steps

### 1. Install Prerequisites
```bash
# 1. Install Node.js (https://nodejs.org)
node -v  # Should show v16.x or higher

# 2. Install MySQL or XAMPP
# XAMPP: https://www.apachefriends.org

# 3. Verify npm
npm -v  # Should show 8.x or higher
```

### 2. Database Setup
```sql
-- Open phpMyAdmin (http://localhost/phpmyadmin)
CREATE DATABASE ipc_school;
-- Import: backend/database/skema.sql
```

### 3. Backend Setup
```bash
cd backend
npm install
copy .env.example .env
# Edit .env: Set DB_PASSWORD and JWT_SECRET
npm start
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 5. Access Application
- URL: http://localhost:3000
- Login: ADMIN001 / admin123

---

## 👤 User Roles & Access

### 🔴 Superadmin (Full Access)
```
Login: ADMIN001 / admin123
├── Kelola Akun (CRUD all users)
├── Wali Kelas Management
├── Approvals V2 (All approvals)
├── Input Access Control
├── Laporan & Cetak (Reports)
├── System Logs
└── Profile Settings
```

### 🔵 Guru/Pembina (Input & Approval)
```
Login: NIP / (set by superadmin)
├── Kelola Siswa (Manage students)
├── Input Prestasi (Achievements)
├── Input Organisasi (Organizations)
├── Input Event (Events)
├── Input Pelanggaran (Violations)
├── Input Perilaku (Behavior)
├── Pembina Approvals
├── Wali Kelas Panel
└── Reports
```

### 🟢 Siswa (View Only)
```
Login: NIS/NISN / (set by guru)
├── View IPC Score
├── Leaderboard
├── History
├── Notifications
└── Profile (request updates)
```

---

## 📊 Feature Matrix

| Feature | Superadmin | Guru | Siswa |
|---------|:----------:|:----:|:-----:|
| Create Users | ✅ | ❌ | ❌ |
| Delete Users | ✅ | ❌ | ❌ |
| Manage Permissions | ✅ | ❌ | ❌ |
| Input Prestasi | ✅ | ✅ | ❌ |
| Input Organisasi | ✅ | ✅ | ❌ |
| Input Event | ✅ | ✅ | ❌ |
| Input Pelanggaran | ✅ | ✅ | ❌ |
| Input Perilaku | ✅ | ✅ | ❌ |
| Approve Data | ✅ | ✅* | ❌ |
| View All IPC | ✅ | ✅** | ❌ |
| View Own IPC | ✅ | ✅ | ✅ |
| Request Update | ✅ | ✅ | ✅ |
| Export Reports | ✅ | ✅ | ❌ |
| View Logs | ✅ | ❌ | ❌ |

\* Guru: Pembina level only
\*\* Guru: Own students only

---

## 🔄 Workflow Diagrams

### A. Login Flow
```
┌─────────────┐
│  User Login │
└──────┬──────┘
       │
       ▼
┌──────────────┐
│  Enter       │
│  Credentials │
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│  Validate    │────▶│  JWT Token   │
│  JWT Secret  │     │  Generated   │
└──────┬───────┘     └──────┬───────┘
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────┐
│  Invalid     │     │  Store in    │
│  Error       │     │  localStorage│
└──────────────┘     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Redirect to │
                     │  Dashboard   │
                     └──────────────┘
```

### B. Data Input Flow
```
┌─────────────┐
│  Select     │
│  Input Type │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Select     │
│  Student    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Fill Form  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Upload     │
│  Bukti      │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│   Submit    │────▶│   Pending   │
└─────────────┘     └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Approved │ │ Rejected │ │ Need     │
        │          │ │          │ │ Review   │
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             │            │            │
             ▼            ▼            └────────┐
        ┌──────────┐ ┌──────────┐               │
        │ IPC      │ │ Notify   │               │
        │ Updated  │ │ Reason   │               │
        └──────────┘ └──────────┘               │
                                                ▼
                                          ┌──────────┐
                                          │ Back to  │
                                          │ Input    │
                                          └──────────┘
```

### C. IPC Calculation
```
         ┌──────────┐
         │  Start   │
         │  IPC=80  │
         └────┬─────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│+Points│ │-Points│ │  No   │
│Inputs │ │Inputs │ │Change │
└───┬───┘ └───┬───┘ └───┬───┘
    │         │         │
    └────┬────┴────┬────┘
         │         │
         ▼         ▼
    ┌─────────────────┐
    │   Calculate     │
    │   Total IPC     │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Range Check   │
    │   0 <= IPC <= 100│
    └────────┬────────┘
             │
    ┌────────┴────────┐
    ▼                 ▼
┌─────────┐     ┌─────────┐
│ IPC < 0 │     │ IPC > 100│
│ Set = 0 │     │ Set = 100│
└────┬────┘     └────┬────┘
     │               │
     └───────┬───────┘
             │
             ▼
    ┌─────────────────┐
    │  Save & Log     │
    └─────────────────┘
```

### D. Approval System (2-Level)
```
                    ┌──────────────┐
                    │  Data Input  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   PENDING    │
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
    ┌──────────────────┐    ┌──────────────────┐
    │  Level 1:        │    │  Level 2:        │
    │  Pembina/Guru    │    │  Superadmin      │
    │  Review          │    │  Final Review    │
    └────────┬─────────┘    └────────┬─────────┘
             │                     │
    ┌────────┴────────┐   ┌──────┴──────┐
    ▼        ▼          ▼   ▼             ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ Approve│ │Reject│ │Review│ │Approve│ │Reject│
└───┬───┘ └───┬──┘ └───┬──┘ └───┬──┘ └───┬──┘
    │         │        │        │        │
    ▼         ▼        │        ▼        ▼
┌──────┐ ┌──────┐     │   ┌──────┐ ┌──────┐
│Pembina│ │Notify│     │   │Apply │ │Notify│
│Approved│ │User  │     │   │Change│ │User  │
└───┬───┘ └──────┘     │   └───┬──┘ └──────┘
    │                  │       │
    │                  └───────┘
    │                          │
    └──────────────┬───────────┘
                   │
                   ▼
            ┌──────────────┐
            │   APPROVED   │
            │   or         │
            │   REJECTED   │
            └──────────────┘
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Error
```
Error: Access denied for user 'root'@'localhost'
```
**Solution:**
- Check MySQL is running
- Verify .env DB_PASSWORD matches MySQL root password
- Try: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';`

#### 2. Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port
PORT=5001 npm start
```

#### 3. CORS Error
```
Error: No 'Access-Control-Allow-Origin' header
```
**Solution:**
- Check backend server.js CORS configuration
- Verify ALLOWED_ORIGINS in .env matches frontend URL

#### 4. Module Not Found
```
Error: Cannot find module 'xyz'
```
**Solution:**
```bash
cd backend  # or frontend
rm -rf node_modules
npm install
```

#### 5. Avatar Not Loading
```
Error: ERR_BLOCKED_BY_RESPONSE
```
**Solution:**
- Check backend/uploads folder exists
- Verify CORS headers in server.js
- Check file permissions

---

## 📞 Support

### Documentation Files
- **DOCUMENTATION.md** - Full system documentation
- **REQUIREMENTS.md** - Installation requirements
- **FLOWCHART.html** - Visual diagrams (open in browser, print to PDF)
- **SECURITY.md** - Security features & best practices

### Default Credentials
| Role | Username | Password |
|------|----------|----------|
| Superadmin | ADMIN001 | admin123 |
| Guru | (NIP) | (set by superadmin) |
| Siswa | (NIS) | (set by guru) |

---

## 🎯 Quick Commands

### Development
```bash
# Start backend
cd backend && npm start

# Start frontend  
cd frontend && npm start

# Install packages
cd backend && npm install
cd frontend && npm install
```

### Database
```bash
# Backup
mysqldump -u root -p ipc_school > backup.sql

# Restore
mysql -u root -p ipc_school < backup.sql
```

### Logs
```bash
# View logs
tail -f logs/activity.log

# Clear logs
> logs/activity.log
```

---

**Version**: 1.0  
**Last Updated**: May 8, 2026  
**System**: IPC School System v1.0

---

*Untuk dokumentasi lengkap, lihat file DOCUMENTATION.md*
