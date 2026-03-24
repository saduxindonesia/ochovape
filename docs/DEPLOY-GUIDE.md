# 🚀 Panduan Deploy Lengkap — Roma Motor

> Panduan ini ditulis untuk pemula. Ikuti setiap langkah dengan teliti.

## Daftar Isi
1. [Persiapan](#1-persiapan)
2. [Buat Google Spreadsheet (Database)](#2-buat-google-spreadsheet-database)
3. [Deploy Google Apps Script (API)](#3-deploy-google-apps-script-api)
4. [Setting Vercel (Hosting)](#4-setting-vercel-hosting)
5. [Verifikasi](#5-verifikasi)

---

## 1. Persiapan

Pastikan Anda sudah memiliki:
- ✅ Akun **Google** (untuk Google Sheets & Apps Script)
- ✅ Akun **Vercel** (untuk hosting website)
- ✅ Akun **GitHub** (repository project sudah ada)
- ✅ Browser **Google Chrome** (direkomendasikan)

---

## 2. Buat Google Spreadsheet (Database)

### Langkah 2.1 — Buka Google Sheets
1. Buka browser, ketik di address bar: **sheets.google.com**
2. Login dengan akun Google Anda
3. Klik tombol **+ Blank** (Spreadsheet kosong) untuk membuat spreadsheet baru

### Langkah 2.2 — Beri Nama Spreadsheet
1. Klik tulisan **"Untitled spreadsheet"** di pojok kiri atas
2. Ketik: **Roma Motor Database**
3. Tekan **Enter**

### Langkah 2.3 — Buat 8 Tab
Di bagian **bawah** spreadsheet, Anda akan melihat satu tab bernama "Sheet1".

1. **Klik kanan** pada tab "Sheet1" → pilih **Rename** → ketik: **services** → tekan Enter
2. Klik tanda **+** (di sebelah kiri tab) untuk membuat tab baru → beri nama: **testimonials**
3. Ulangi untuk membuat tab: **faqs**
4. Ulangi untuk membuat tab: **running_texts**
5. Ulangi untuk membuat tab: **blog_posts**
6. Ulangi untuk membuat tab: **gallery**
7. Ulangi untuk membuat tab: **settings**
8. Ulangi untuk membuat tab: **messages**

> ⚠️ **PENTING:** Nama tab harus **persis sama** seperti di atas (huruf kecil semua, pakai underscore). Jika salah, website tidak bisa membaca data.

### Langkah 2.4 — Isi Data
Untuk setiap tab, Anda perlu mengisi **header** (baris pertama) dan **data contoh**. File contoh sudah tersedia di folder project: `docs/spreadsheet-data/`

**Cara copy-paste data:**
1. Buka file `.csv` dari folder `docs/spreadsheet-data/` di VS Code atau Notepad
2. Tekan **Ctrl+A** (pilih semua teks)
3. Tekan **Ctrl+C** (copy)
4. Pindah ke Google Sheets → klik tab yang sesuai → klik **cell A1**
5. Tekan **Ctrl+V** (paste)
6. Data akan otomatis masuk ke kolom yang benar

Lakukan untuk semua 8 tab:
| Tab di Sheets | File yang di-copy |
|---|---|
| `services` | `docs/spreadsheet-data/services.csv` |
| `testimonials` | `docs/spreadsheet-data/testimonials.csv` |
| `faqs` | `docs/spreadsheet-data/faqs.csv` |
| `running_texts` | `docs/spreadsheet-data/running_texts.csv` |
| `blog_posts` | `docs/spreadsheet-data/blog_posts.csv` |
| `gallery` | `docs/spreadsheet-data/gallery.csv` |
| `settings` | `docs/spreadsheet-data/settings.csv` |
| `messages` | `docs/spreadsheet-data/messages.csv` |

### Langkah 2.5 — Catat Spreadsheet ID
1. Lihat **address bar** browser Anda. URL-nya terlihat seperti ini:
   ```
   https://docs.google.com/spreadsheets/d/1CAr1qJyK9HwUznGlIsjQubJ0GaH6arAZRCoKVVBNEd8/edit
   ```
2. Bagian yang ada di antara `/d/` dan `/edit` adalah **Spreadsheet ID**
3. Contoh: `1CAr1qJyK9HwUznGlIsjQubJ0GaH6arAZRCoKVVBNEd8`
4. **Catat/copy** ID ini — akan dipakai nanti

✅ **Selesai!** Spreadsheet (database) Anda sudah siap.

---

## 3. Deploy Google Apps Script (API)

Apps Script berfungsi sebagai **jembatan** antara website dan Google Sheets. Tanpa ini, website tidak bisa membaca/menulis data ke Sheets.

### Langkah 3.1 — Buka Google Apps Script
1. Buka browser, ketik di address bar: **script.google.com**
2. Login dengan **akun Google yang sama** dengan yang membuat Spreadsheet
3. Klik tombol **+ New project** (Proyek baru)

### Langkah 3.2 — Beri Nama Project
1. Klik tulisan **"Untitled project"** di pojok kiri atas
2. Ketik: **Roma Motor API**
3. Tekan **Enter**

### Langkah 3.3 — Hapus Code Default
1. Anda akan melihat editor code dengan isi default:
   ```javascript
   function myFunction() {

   }
   ```
2. **Pilih semua** teks ini → tekan **Ctrl+A**
3. **Hapus** → tekan **Delete** atau **Backspace**
4. Editor sekarang **kosong**

### Langkah 3.4 — Copy-Paste Code Apps Script
1. Buka file **`docs/apps-script.js`** dari folder project di VS Code
2. Tekan **Ctrl+A** (pilih semua)
3. Tekan **Ctrl+C** (copy)
4. Kembali ke browser (Google Apps Script editor)
5. Klik di area editor yang kosong
6. Tekan **Ctrl+V** (paste)
7. Code akan muncul di editor

### Langkah 3.5 — Verifikasi Spreadsheet ID
1. Cari baris ke-21 di code yang baru di-paste:
   ```javascript
   const SPREADSHEET_ID = '1CAr1qJyK9HwUznGlIsjQubJ0GaH6arAZRCoKVVBNEd8';
   ```
2. Pastikan ID di sini **sama** dengan Spreadsheet ID Anda (dari Langkah 2.5)
3. Jika berbeda, ganti dengan ID yang benar
4. Klik **Ctrl+S** untuk menyimpan

### Langkah 3.6 — Deploy sebagai Web App
1. Klik menu **Deploy** (di toolbar atas) → pilih **New deployment**
2. Di popup yang muncul, klik ikon **⚙️ (gear/roda gigi)** di sebelah "Select type"
3. Pilih **Web app**
4. Isi form yang muncul:
   - **Description**: ketik `Roma Motor API v1`
   - **Execute as**: pilih **Me** (ini artinya script berjalan atas nama Anda)
   - **Who has access**: pilih **Anyone** (agar website bisa mengakses API)
5. Klik tombol **Deploy** (biru)

### Langkah 3.7 — Authorize (Izinkan Akses)
Setelah klik Deploy, akan muncul popup meminta izin:

1. Klik **Authorize access**
2. Pilih **akun Google Anda**
3. ⚠️ Mungkin muncul peringatan: **"Google hasn't verified this app"**
   - Ini normal! Karena ini script buatan sendiri
   - Klik tulisan **Advanced** (di pojok kiri bawah)
   - Klik **Go to Roma Motor API (unsafe)** (di bawah)
4. Klik **Allow** (Izinkan)

### Langkah 3.8 — Copy URL Web App
1. Setelah authorize berhasil, akan muncul popup **"Deployment successfully updated"**
2. Anda akan melihat **Web app URL** seperti ini:
   ```
   https://script.google.com/macros/s/AKfycbyI4CzroYwR0Y.../exec
   ```
3. Klik tombol **Copy** di sebelah URL
4. **Simpan URL ini** — ini adalah alamat API Anda!

> 💡 **Tips:** Paste URL ini ke Notepad sementara agar tidak hilang.

✅ **Selesai!** Apps Script (API) Anda sudah aktif.

---

## 4. Setting Vercel (Hosting)

Website Roma Motor di-host di Vercel. Kita perlu memberitahu Vercel alamat API dan database kita.

### Langkah 4.1 — Login ke Vercel
1. Buka browser, ketik: **vercel.com**
2. Klik **Log In** (pojok kanan atas)
3. Login dengan akun yang terhubung ke GitHub Anda

### Langkah 4.2 — Pilih Project
1. Setelah login, Anda akan melihat daftar project
2. Cari dan klik project **romamotor** (atau nama project Anda)

### Langkah 4.3 — Buka Environment Variables
1. Klik tab **Settings** (di menu atas)
2. Di menu sidebar kiri, klik **Environment Variables**

### Langkah 4.4 — Tambahkan Variable Pertama
1. Di field **Key**, ketik: `VITE_APPS_SCRIPT_URL`
2. Di field **Value**, paste **URL Web App** dari Langkah 3.8
   - Contoh: `https://script.google.com/macros/s/AKfycbyI4CzroYwR0YJdyiuSSxKZAi70srce_RYkAv-z_EpIRvMBD3MfUY6h5JN4OLksYYJy/exec`
3. Di bagian **Environment**, pastikan **ketiga checkbox tercentang**:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
4. Klik **Save**

### Langkah 4.5 — Tambahkan Variable Kedua
1. Di field **Key**, ketik: `VITE_GOOGLE_SHEETS_ID`
2. Di field **Value**, paste **Spreadsheet ID** dari Langkah 2.5
   - Contoh: `1CAr1qJyK9HwUznGlIsjQubJ0GaH6arAZRCoKVVBNEd8`
3. Pastikan **ketiga checkbox** tercentang (Production, Preview, Development)
4. Klik **Save**

### Langkah 4.6 — Redeploy
Environment variables baru **tidak akan aktif** sampai project di-deploy ulang.

1. Klik tab **Deployments** (di menu atas)
2. Cari deployment paling atas (terbaru)
3. Klik tombol **⋮** (tiga titik) di sebelah kanan deployment tersebut
4. Pilih **Redeploy**
5. Pada popup konfirmasi, klik **Redeploy** lagi
6. Tunggu proses deploy selesai (~1-2 menit)
7. Status akan berubah menjadi **Ready** ✅

✅ **Selesai!** Website Anda sekarang terhubung ke Google Sheets.

---

## 5. Verifikasi

### Cek 1: Website Tampil Data dari Sheets
1. Buka **bengkelroma.sadux.my.id** di browser
2. Scroll ke bagian **Services** — harus menampilkan 8 layanan
3. Scroll ke **Testimonials** — harus menampilkan testimoni
4. Scroll ke **FAQ** — harus menampilkan pertanyaan & jawaban

### Cek 2: Admin Dashboard CRUD
1. Buka **bengkelroma.sadux.my.id/sadux/login**
2. Login dengan username dan password admin
3. Coba **tambah** layanan baru → cek di Google Sheets apakah data bertambah
4. Coba **edit** layanan → cek di Google Sheets apakah data berubah
5. Coba **hapus** layanan → cek di Google Sheets apakah data terhapus

### Cek 3: Contact Form
1. Buka halaman utama → scroll ke bagian **Contact**
2. Isi form dan kirim
3. Buka Google Sheets → tab **messages** → pesan harus muncul di sini

### Cek 4: Edit via Google Sheets
1. Buka Google Sheets
2. Tab **services** → ubah harga salah satu layanan
3. Refresh website → harga harus berubah

---

## ⚠️ Hal Penting yang Perlu Diingat

### Jika Edit Code Apps Script
Setiap kali Anda mengubah code di Apps Script, Anda **harus deploy ulang**:
1. Buka **script.google.com** → buka project Roma Motor API
2. Klik **Deploy** → **Manage deployments**
3. Klik ikon **✏️ (pensil)** di deployment yang ada
4. Di dropdown **Version**, pilih **New version**
5. Klik **Deploy**

> ⚠️ URL Web App **tidak berubah** saat update deployment, jadi Anda tidak perlu mengubah setting di Vercel.

### Jika Menambahkan Environment Variable Baru
Setiap kali menambah/mengubah env vars di Vercel, Anda **harus Redeploy** agar perubahan aktif.

### Backup Data
Google Sheets otomatis menyimpan history perubahan. Untuk melihat:
- Klik **File** → **Version history** → **See version history**

### Batasan
- Google Sheets memiliki batas **500 request per 100 detik** — cukup untuk landing page
- Ukuran maksimal spreadsheet: **10 juta cell**
- Data di-cache oleh browser, refresh halaman untuk melihat data terbaru
