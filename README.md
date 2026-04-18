<p align="center">
  <img src="public/images/logo.gif" alt="SPMI STIKES Logo" width="120">
</p>

<h1 align="center">SPMI — Sistem Penjaminan Mutu Internal</h1>
<h3 align="center">STIKES Hang Tuah Tanjungpinang</h3>

<p align="center">
  Aplikasi web untuk mengelola siklus penjaminan mutu internal, audit, temuan, tindak lanjut, dan pelaporan secara terintegrasi.
</p>

---

## 🚀 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Backend** | Laravel 12, PHP 8.2+ |
| **Frontend** | React 19 (Inertia.js), Tailwind CSS 4 |
| **Database** | MySQL / MariaDB |
| **Auth & Roles** | Spatie Laravel Permission |
| **Charts** | Recharts |
| **PDF Export** | Barryvdh DomPDF |
| **Activity Log** | Spatie Laravel Activitylog |
| **Build Tool** | Vite 7 |

## 📋 Fitur Utama

### 🏛️ Manajemen Penjaminan Mutu
- **Standar Mutu** — CRUD standar mutu dengan kategori (pendidikan, penelitian, pengabdian, dll)
- **Siklus PPEPP** — Penetapan, Pelaksanaan, Evaluasi, Pengendalian, Peningkatan
- **Dokumen SPMI** — Upload & pengelolaan dokumen kebijakan, manual, SOP, formulir
- **Profil SPMI** — Informasi profil lembaga penjaminan mutu

### 🔍 Audit Mutu Internal (AMI)
- **Siklus Audit** — Perencanaan siklus audit per tahun/semester
- **Instrumen Audit** — Daftar pertanyaan audit dengan bobot & standar mutu
- **Pelaksanaan Audit** — Penjadwalan, penugasan auditor, pelaksanaan, dan penilaian
- **Temuan Audit** — Pencatatan temuan (mayor, minor, observasi) dengan batas waktu
- **Tindak Lanjut** — Penyelesaian temuan oleh auditee dengan bukti upload
- **Rapat Tinjauan Manajemen** — Notulen & keputusan rapat tinjauan

### 📊 Evaluasi & Monitoring
- **Dashboard Analytics** — Grafik temuan per siklus, distribusi jenis/status, progress tindak lanjut
- **Umpan Balik Kuesioner** — Kuesioner publik untuk pengukuran kepuasan
- **Diagram Kepuasan** — Visualisasi data kepuasan stakeholder
- **Activity Log** — Audit trail untuk semua perubahan data

### 📄 Pelaporan & Export PDF
- Laporan AMI per siklus audit
- Berita Acara Audit per unit kerja
- Surat Tugas Auditor
- Laporan Rapat Tinjauan Manajemen
- Laporan Kinerja SPMI

### 🌐 Landing Page Publik
- Informasi umum SPMI
- Berita & galeri
- Dokumen publik
- Kuesioner kepuasan online

### 🔐 Portal Auditee
- Dashboard khusus auditee per unit kerja
- Lihat temuan & upload tindak lanjut
- Upload dokumen unit

## 👥 Roles & Permissions

| Role | Akses |
|------|-------|
| **Super Admin** | Akses penuh ke seluruh sistem |
| **Admin Mutu** | Kelola standar, audit, temuan, dokumen, user, berita |
| **Auditor** | Lihat & edit audit yang ditugaskan, buat temuan |
| **Auditee** | Portal khusus — lihat temuan, upload tindak lanjut & dokumen |

## ⚡ Instalasi

### Prasyarat
- PHP 8.2+
- Composer
- Node.js 18+ & npm
- MySQL / MariaDB

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/your-repo/spmi-stikes.git
cd spmi-stikes

# 2. Install PHP dependencies
composer install

# 3. Setup environment
cp .env.example .env
php artisan key:generate

# 4. Konfigurasi database di .env
# DB_DATABASE=spmi_stikes
# DB_USERNAME=root
# DB_PASSWORD=

# 5. Jalankan migrasi & seeder
php artisan migrate
php artisan db:seed

# 6. Buat storage link
php artisan storage:link

# 7. Install JS dependencies & build
npm install
npm run dev

# 8. Jalankan server
php artisan serve
```

Atau gunakan shortcut:
```bash
composer dev
```
Perintah ini menjalankan Laravel server, queue worker, dan Vite secara bersamaan.

### 🔑 Default Login

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@spmi.test | password |

> ⚠️ Ubah password default setelah instalasi pertama!

## 📁 Struktur Folder Penting

```
app/
├── Http/
│   ├── Controllers/     # Business logic
│   ├── Middleware/       # Inertia handling
│   ├── Requests/        # Form Request validation
│   └── ...
├── Models/              # Eloquent models
├── Policies/            # Authorization policies
resources/
├── js/
│   ├── Layouts/         # DashboardLayout, LandingLayout
│   └── Pages/
│       ├── Auth/        # Login page
│       ├── Auditee/     # Portal auditee
│       ├── Dashboard/   # Admin dashboard pages
│       └── Landing/     # Public pages
├── views/
│   └── pdf/             # Blade templates untuk PDF export
database/
├── migrations/          # Schema database
└── seeders/             # Data awal (roles, permissions, unit kerja)
```

## 📝 Lisensi

Project ini dikembangkan untuk keperluan internal STIKES Hang Tuah Tanjungpinang.

---

<p align="center">
  Developed by <a href="https://www.linkedin.com/in/fernandomardinurzaman/">Fernando Mardi Nurzaman</a>
</p>
