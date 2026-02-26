# Perubahan Menu dan Fitur Baru

Dokumentasi singkat perubahan fitur dan langkah verifikasi.

Tambahan fitur:

- Sidebar: Profil SPMI, Rapat Tinjauan, Tindak Lanjut, Umpan Balik, Diagram Kepuasan, Dokumen Publik
- CRUD untuk `tindak-lanjut` (admin) dan `rapat-tinjauan` (admin)
- Halaman publik: `/profil-spmi` dan `/dokumen-spmi`

File penting:

- `resources/js/Layouts/DashboardLayout.jsx` — sidebar menu
- `routes/web.php` — routes baru dan resource
- `app/Http/Controllers/*` — controller skeletons dan CRUD
- `resources/js/Pages/*` — pages Inertia untuk dashboard dan landing

Langkah verifikasi lokal:

1. Jalankan server Laravel:

```bash
php artisan serve
```

2. Jalankan Vite (frontend):

```bash
npm run dev
```

3. Login sebagai user dengan role `super-admin` atau `admin-mutu` dan buka:

- `http://localhost:8000/dashboard/rapat-tinjauan`
- `http://localhost:8000/dashboard/tindak-lanjut`
- `http://localhost:8000/dashboard/dokumen-publik`

4. Uji pembuatan, edit, dan hapus; periksa toast notifikasi dan error console.

Catatan:

- Migration `2026_02_26_000001_create_rapat_tinjauan_table.php` ditambahkan — jalankan `php artisan migrate`.
- Implementasi file upload belum ditambahkan; bisa ditambahkan nanti jika diperlukan.

Automated tests added:

- `tests/Feature/RapatTinjauanTest.php` — basic CRUD flow
- `tests/Feature/TindakLanjutTest.php` — basic CRUD flow

Jalankan test lokal dengan:

```bash
php artisan test
```
