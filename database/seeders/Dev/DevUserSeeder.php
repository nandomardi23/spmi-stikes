<?php

namespace Database\Seeders\Dev;

use Illuminate\Database\Seeder;
use App\Models\User;

class DevUserSeeder extends Seeder
{
    /**
     * Seeder khusus dev: membuat user test untuk setiap role.
     * Tanpa data unit_kerja (kosong/null) agar bisa diuji coba secara independen.
     */
    public function run(): void
    {
        // Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'dev-superadmin@spmi-stikes.test'],
            [
                'name' => 'Dev Super Admin',
                'password' => bcrypt('password'),
            ]
        );
        $superAdmin->syncRoles('super-admin');

        // Admin Mutu
        $adminMutu = User::firstOrCreate(
            ['email' => 'dev-mutu@spmi-stikes.test'],
            [
                'name' => 'Dev Admin Mutu',
                'password' => bcrypt('password'),
            ]
        );
        $adminMutu->syncRoles('admin-mutu');

        // Auditor
        $auditor = User::firstOrCreate(
            ['email' => 'dev-auditor@spmi-stikes.test'],
            [
                'name' => 'Dev Auditor',
                'password' => bcrypt('password'),
            ]
        );
        $auditor->syncRoles('auditor');

        // Auditee (tanpa unit kerja)
        $auditee = User::firstOrCreate(
            ['email' => 'dev-auditee@spmi-stikes.test'],
            [
                'name' => 'Dev Auditee',
                'password' => bcrypt('password'),
            ]
        );
        $auditee->syncRoles('auditee');
    }
}
