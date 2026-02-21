<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@spmi-stikes.ac.id',
            'password' => bcrypt('password'),
        ]);
        $superAdmin->assignRole('super-admin');

        // Admin Mutu
        $adminMutu = User::create([
            'name' => 'Admin Mutu',
            'email' => 'mutu@spmi-stikes.ac.id',
            'password' => bcrypt('password'),
        ]);
        $adminMutu->assignRole('admin-mutu');

        // Auditor
        $auditor = User::create([
            'name' => 'Auditor Internal',
            'email' => 'auditor@spmi-stikes.ac.id',
            'password' => bcrypt('password'),
        ]);
        $auditor->assignRole('auditor');

        // Auditee - Perpustakaan (unit_kerja_id = 1)
        $auditee = User::create([
            'name' => 'Kepala Perpustakaan',
            'email' => 'perpustakaan@spmi-stikes.ac.id',
            'password' => bcrypt('password'),
            'unit_kerja_id' => 1,
        ]);
        $auditee->assignRole('auditee');

        // Auditee - Prodi Keperawatan (unit_kerja_id = 2)
        $auditee2 = User::create([
            'name' => 'Kaprodi Keperawatan',
            'email' => 'keperawatan@spmi-stikes.ac.id',
            'password' => bcrypt('password'),
            'unit_kerja_id' => 2,
        ]);
        $auditee2->assignRole('auditee');
    }
}
