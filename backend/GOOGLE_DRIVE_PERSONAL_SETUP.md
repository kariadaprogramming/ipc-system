# Setup Google Drive Pribadi (Personal) - OAuth2

## Ringkasan
Panduan ini untuk menggunakan Google Drive pribadi Anda, bukan Service Account.

## Langkah 1: Install Package
```bash
cd backend
npm install googleapis
```

## Langkah 2: Buat OAuth2 Credentials di Google Cloud

1. **Buka Google Cloud Console**: https://console.cloud.google.com/

2. **Buat Project Baru** atau gunakan project yang sudah ada

3. **Enable Google Drive API**:
   - Kiri menu ☰ → "APIs & Services" → "Enabled APIs & services"
   - Klik "+ ENABLE APIS AND SERVICES"
   - Cari "Google Drive API"
   - Klik "Enable"

4. **Buat OAuth2 Credentials**:
   - Klik menu ☰ → "APIs & Services" → "Credentials"
   - Klik "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Pilih "Application type": **Web application**
   - Isi "Name": `IPC-System`
   - Isi "Authorized redirect URIs":
     - `http://localhost:5000/api/drive-auth/callback`
     - Tambahkan juga IP Anda jika akses dari LAN: `http://192.168.x.x:5000/api/drive-auth/callback`
   - Klik "CREATE"

5. **Download Credentials**:
   - Setelah create, klik "DOWNLOAD JSON"
   - **Rename file menjadi `oauth-credentials.json`**
   - **Pindahkan ke folder `backend/`** (sejajar dengan server.js)

## Langkah 3: Konfigurasi Consent Screen (Wajib!)

1. Di sidebar, klik "OAuth consent screen"
2. Pilih "External" (untuk testing) atau "Internal" (jika pakai Google Workspace)
3. Isi informasi aplikasi:
   - App name: `IPC System`
   - User support email: (email Anda)
   - Developer contact information: (email Anda)
4. Klik "SAVE AND CONTINUE"
5. Di bagian "Scopes", klik "ADD OR REMOVE SCOPES"
6. Cari dan pilih:
   - `.../auth/drive`
   - `.../auth/drive.file`
7. Klik "UPDATE" → "SAVE AND CONTINUE"
8. Di bagian "Test users", klik "+ ADD USERS"
9. Masukkan email Google Anda → "ADD" → "SAVE AND CONTINUE"
10. Klik "BACK TO DASHBOARD"

## Langkah 4: Publish App (Agar Tidak Expired)

1. Di OAuth consent screen, klik "PUBLISH APP"
2. Konfirmasi publish

## Langkah 5: Jalankan Server & Authorize

1. **Start server backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Login sebagai SuperAdmin** di frontend

3. **Buka menu "Drive Viewer"** → Tab "Status Drive" (atau buka: http://localhost:3000/drive-viewer)

4. **Klik tombol "Authorize Google Drive"** - akan buka popup/jendela baru

5. **Login dengan akun Google Anda** dan "Allow" akses

6. **Kembali ke aplikasi** - status akan menunjukkan "Authenticated: true"

## Langkah 6: Buat Folder di Drive

Ada 2 cara:

### Cara A: Otomatis (Dari Aplikasi)
1. Di tab "Status Drive", klik "Create Folder" untuk setiap kategori
2. Folder akan otomatis dibuat di Google Drive pribadi Anda
3. Link akan tersimpan otomatis

### Cara B: Manual
1. Buka https://drive.google.com
2. Buat folder baru: `IPC-Prestasi`, `IPC-Event`, `IPC-Organisasi`, dll
3. Copy link folder (klik kanan → "Get link")
4. Paste link di menu "Drive Links"

## Langkah 7: Test Upload

1. Login sebagai siswa
2. Submit prestasi/event dengan foto
3. Cek Google Drive pribadi Anda - foto harus muncul!

## Troubleshooting

### Error: "access_denied" atau "unauthorized_client"
- Pastikan email Anda sudah ditambahkan sebagai "Test user" di OAuth consent screen
- Atau pastikan app sudah "Published" (bukan Testing)

### Error: "redirect_uri_mismatch"
- Pastikan redirect URI di Google Cloud sama persis dengan:
  - `http://localhost:5000/api/drive-auth/callback`
  - Atau IP Anda: `http://192.168.x.x:5000/api/drive-auth/callback`

### Error: "invalid_client" atau "invalid_request"
- Pastikan file `oauth-credentials.json` valid dan lengkap
- Pastikan file ada di folder `backend/`

### Token expired
- Token akan refresh otomatis
- Jika masalah, hapus file `oauth-token.json` dan authorize ulang

### File tidak muncul di Drive
- Cek log backend console
- Pastikan folder ID benar (bisa cek di URL folder)
- Pastikan OAuth sudah authenticated

## Keunggulan OAuth vs Service Account

**OAuth (Personal Drive):**
- ✅ File muncul langsung di Drive pribadi Anda
- ✅ Mudah diakses dan dikelola
- ✅ Bisa lihat siapa yang upload
- ✅ Tidak perlu share folder ke service account

**Service Account:**
- ✅ Tidak perlu login/authorize
- ❌ File tersembunyi (perlu share folder)
- ❌ Setup lebih kompleks

## File Penting (Jangan Di-Commit!)

Tambahkan ke `.gitignore`:
```
oauth-credentials.json
oauth-token.json
```

## Restart Server
Setelah semua setup selesai:
```bash
cd backend
npm start
```

## Catatan Keamanan
- **JANGAN** share file `oauth-credentials.json`
- **JANGAN** commit ke GitHub
- Backup file dengan aman
- Token tersimpan di `oauth-token.json` (juga jangan di-commit)
