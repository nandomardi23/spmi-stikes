<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnitKerja;

class UnitKerjaSeeder extends Seeder
{
    public function run(): void
    {
        $units = [
            ['nama' => 'Perpustakaan', 'kode' => 'PERPUS', 'jenis' => 'unit', 'deskripsi' => 'Unit Perpustakaan STIKES Hang Tuah Tanjungpinang'],
            ['nama' => 'Program Studi S1 Keperawatan', 'kode' => 'PRODI-KEP', 'jenis' => 'prodi', 'deskripsi' => 'Program Studi Sarjana Keperawatan'],
            ['nama' => 'Program Studi D3 Kebidanan', 'kode' => 'PRODI-KEB', 'jenis' => 'prodi', 'deskripsi' => 'Program Studi Diploma III Kebidanan'],
            ['nama' => 'Program Studi Profesi Ners', 'kode' => 'PRODI-NERS', 'jenis' => 'prodi', 'deskripsi' => 'Program Studi Profesi Ners'],
            ['nama' => 'Laboratorium', 'kode' => 'LAB', 'jenis' => 'unit', 'deskripsi' => 'Laboratorium Keperawatan dan Kebidanan'],
            ['nama' => 'Lembaga Penelitian dan Pengabdian Masyarakat', 'kode' => 'LPPM', 'jenis' => 'lembaga', 'deskripsi' => 'LPPM STIKES Hang Tuah Tanjungpinang'],
            ['nama' => 'Bagian Akademik', 'kode' => 'AKAD', 'jenis' => 'bagian', 'deskripsi' => 'Bagian Akademik dan Kemahasiswaan'],
            ['nama' => 'Bagian Keuangan', 'kode' => 'KEU', 'jenis' => 'bagian', 'deskripsi' => 'Bagian Keuangan dan Umum'],
            ['nama' => 'Bagian SDM', 'kode' => 'SDM', 'jenis' => 'bagian', 'deskripsi' => 'Bagian Sumber Daya Manusia'],
            ['nama' => 'Unit Teknologi Informasi', 'kode' => 'TI', 'jenis' => 'unit', 'deskripsi' => 'Unit Teknologi Informasi dan Komunikasi'],
        ];

        foreach ($units as $unit) {
            UnitKerja::create($unit);
        }
    }
}
