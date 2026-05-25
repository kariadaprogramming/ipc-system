# Panduan Setup OAuth Google Drive Pribadi

## Ringkasan Langkah
1. Buat Project di Google Cloud
2. Enable Google Drive API
3. Buat OAuth Credentials
4. Download & simpan credentials
5. Jalankan server & authorize

---

## Langkah 1: Buat Project Google Cloud

1. **Buka** https://console.cloud.google.com/

2. **Login** dengan akun Google Anda

3. **Klik tombol di pojok kanan atas** (biasanya ada nama project atau "Select a project")
   
4. **Klik "NEW PROJECT"**
   - Project name: `IPC-System`
   - Klik "CREATE"

5. **Tunggu** sampai project dibuat, lalu pilih project tersebut

---

## Langkah 2: Enable Google Drive API

1. **Klik menu ☰ (hamburger)** di pojok kiri atas

2. **Pilih "APIs & Services" → "Library"**

3. **Cari** "Google Drive API"

4. **Klik** "Google Drive API"

5. **Klik tombol "ENABLE"**

---

## Langkah 3: Konfigurasi OAuth Consent Screen

1. **Klik menu ☰ → "APIs & Services" → "OAuth consent screen"**

2. **Pilih "External"** (untuk akun Gmail biasa)
   - Kalau pakai Google Workspace, bisa pilih "Internal"

3. **Klik "CREATE"**

4. **Isi informasi aplikasi:**
   - App name: `IPC System`
   - User support email: (email Google Anda)
   - Developer contact information: (email Google Anda)
   - Klik "SAVE AND CONTINUE"

5. **Scopes (Permission):**
   - Klik "ADD OR REMOVE SCOPES"
   - Cari dan centang:
     - `.../auth/drive` (Google Drive API)
     - `.../auth/drive.file` (See, edit, create, and delete all your Google Drive files)
   - Klik "UPDATE"
   - Klik "SAVE AND CONTINUE"

6. **Test users:**
   - Klik "+ ADD USERS"
   - Masukkan **email Google Anda** (sama yang login)
   - Klik "ADD"
   - Klik "SAVE AND CONTINUE"

7. **Summary:**
   - Review informasi
   - Klik "BACK TO DASHBOARD"

8. **PUBLISH APP (WAJIB!):**
   - Di dashboard, klik "PUBLISH APP"
   - Konfirmasi "PUBLISH"
   - Status harus berubah menjadi "In production"

---

## Langkah 4: Buat OAuth Client ID

1. **Klik menu ☰ → "APIs & Services" → "Credentials"**

2. **Klik "+ CREATE CREDENTIALS" → "OAuth client ID"**

3. **Pilih Application type: "Web application"**

4. **Isi nama:** `IPC-Web-Client`

5. **Authorized redirect URIs (PENTING!):**
   - Klik "+ ADD URI"
   - Masukkan: `http://localhost:5000/api/drive-auth/callback`
   - **Tambahkan juga IP Anda** (cek dengan `ipconfig` di CMD):
     - Contoh: `http://192.168.20.14:5000/api/drive-auth/callback`

6. **Klik "CREATE"**

7. **Download credentials:**
   - Klik "DOWNLOAD JSON"
   - File akan terdownload (contoh: `client_secret_xxx.apps.googleusercontent.com.json`)

---

## Langkah 5: Simpan Credentials di Project

1. **Rename file yang didownload** menjadi:
   ```
   oauth-credentials.json
   ```

2. **Pindahkan file** ke folder:
   ```
   c:\Users\Administrator\Documents\full project ipcs\backend\oauth-credentials.json
   ```

3. **Struktur file harus seperti ini:**
   ```json
   {
     "web": {
       "client_id": "xxx.apps.googleusercontent.com",
       "project_id": "ipc-system-xxx",
       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
       "token_uri": "https://oauth2.googleapis.com/token",
       "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
       "client_secret": "xxx",
       "redirect_uris": [
         "http://localhost:5000/api/drive-auth/callback"
       ]
     }
   }
   ```

---

## Langkah 6: Restart Server & Authorize

1. **Restart server backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Buka browser** → http://localhost:3000

3. **Login sebagai SuperAdmin**

4. **Buka menu "Drive Viewer"** (biasanya di sidebar atau menu admin)

5. **Klik tab "Status Drive"** atau "OAuth Setup"

6. **Klik tombol "Authorize Google Drive"**

7. **Popup akan muncul** minta login Google → login dengan akun Anda

8. **Izinkan akses** → klik "Allow"

9. **Popup akan tutup otomatis** → status di aplikasi akan berubah menjadi "Authenticated: true"

10. **Buat folder** untuk setiap kategori:
    - Klik "Buat Folder" untuk Prestasi, Event, Organisasi, dll
    - Atau skip kalau folder sudah ada di Drive Anda

---

## Langkah 7: Test Upload

1. **Login sebagai Siswa**

2. **Submit Prestasi dengan foto**

3. **Cek Google Drive pribadi Anda** → foto harus muncul di folder IPC-Prestasi!

---

## Troubleshooting

### Error: "access_denied" atau "unauthorized_client"
- Pastikan email Anda sudah ditambahkan sebagai "Test user"
- Atau pastikan app sudah "Published" (bukan Testing)

### Error: "redirect_uri_mismatch"
- Pastikan redirect URI di Google Cloud sama persis dengan yang di server
- Contoh: `http://localhost:5000/api/drive-auth/callback`

### Error: "invalid_client" atau "invalid_request"
- Pastikan file `oauth-credentials.json` valid dan lengkap
- Pastikan file ada di folder `backend/`

### Error: "Token expired" atau "invalid_grant"
- Hapus file `oauth-token.json` di folder `backend/`
- Restart server
- Authorize ulang

---

## File Penting (Jangan Di-Commit ke Git!)

Pastikan `.gitignore` sudah include:
```
oauth-credentials.json
oauth-token.json
service-account.json
```

---

## Butuh Bantuan?

Kalau ada error, cek:
1. Console log backend (CMD/terminal)
2. Browser Developer Tools (F12 → Console)
3. Pastikan semua langkah di atas sudah dilakukan dengan benar

## Checkpoint
Setelah setup selesai, Anda akan punya:
- ✅ `oauth-credentials.json` di folder `backend/`
- ✅ OAuth consent screen "Published"
- ✅ Google Drive API enabled
- ✅ Redirect URI terdaftar
- ✅ Token tersimpan di `backend/oauth-token.json`
- ✅ Foto otomatis upload ke Drive pribadi Anda!
