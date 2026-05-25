# Setup Google Drive Upload

## Langkah 1: Install Package
```bash
cd backend
npm install googleapis
```

## Langkah 2: Buat Google Cloud Project
1. Buka https://console.cloud.google.com/
2. Klik "Select a project" → "New Project"
3. Beri nama project (contoh: "IPC-System")
4. Klik "Create"

## Langkah 3: Enable Google Drive API
1. Di project Anda, klik menu ☰ → "APIs & Services" → "Enabled APIs & services"
2. Klik "+ ENABLE APIS AND SERVICES"
3. Cari "Google Drive API"
4. Klik "Enable"

## Langkah 4: Buat Service Account
1. Klik menu ☰ → "IAM & Admin" → "Service Accounts"
2. Klik "+ CREATE SERVICE ACCOUNT"
3. Isi:
   - Service account name: `ipc-upload`
   - Service account ID: (otomatis terisi)
   - Description: `Upload service for IPC system`
4. Klik "CREATE AND CONTINUE"
5. Role: pilih "Basic" → "Editor"
6. Klik "CONTINUE" → "DONE"

## Langkah 5: Download Credentials
1. Di Service Accounts, klik email service account yang baru dibuat (contoh: `ipc-upload@your-project.iam.gserviceaccount.com`)
2. Tab "KEYS" → "ADD KEY" → "Create new key"
3. Pilih "JSON" → "CREATE"
4. File JSON akan otomatis download
5. **Rename file menjadi `service-account.json`**
6. **Pindahkan file ke folder `backend/`** (sejajar dengan server.js)

## Langkah 6: Setup Google Drive Folder
1. Buka https://drive.google.com
2. Buat folder baru untuk setiap kategori:
   - Prestasi
   - Event
   - Organisasi
   - Pelanggaran
   - Perilaku
3. Untuk setiap folder:
   - Klik kanan folder → "Share"
   - Tambahkan email service account (contoh: `ipc-upload@your-project.iam.gserviceaccount.com`)
   - Beri akses "Editor"
   - Klik "Share"
4. Copy link folder (klik kanan → "Get link")

## Langkah 7: Update Drive Links di Database
1. Login sebagai SuperAdmin di aplikasi
2. Masuk ke menu "Drive Links"
3. Paste link folder Google Drive untuk masing-masing kategori
4. Save

## Langkah 8: Test Upload
1. Login sebagai siswa
2. Submit prestasi/event dengan foto
3. Cek di Google Drive folder - foto harus muncul

## Troubleshooting

### Error: "Service account credentials not found"
- Pastikan file `service-account.json` ada di folder `backend/`
- Restart server setelah menambahkan file

### Error: "Failed to extract folder ID"
- Pastikan link Drive yang dimasukkan formatnya benar
- Link harus berupa folder, bukan file
- Format yang didukung:
  - `https://drive.google.com/drive/folders/FOLDER_ID`
  - `https://drive.google.com/drive/u/0/folders/FOLDER_ID`

### Error: "Insufficient permissions"
- Pastikan service account sudah di-share ke folder dengan akses "Editor"
- Tunggu beberapa menit setelah share untuk propagasi permission

### File tidak muncul di Drive
- Cek log di backend console
- Pastikan Google Drive API sudah enabled
- Pastikan billing sudah di-setup (Google Cloud membutuhkan billing untuk Drive API)

## Catatan Keamanan
- **JANGAN** commit file `service-account.json` ke GitHub
- Tambahkan `service-account.json` ke `.gitignore`
- Backup file credentials di tempat aman
