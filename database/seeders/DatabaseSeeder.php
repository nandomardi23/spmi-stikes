<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seeder Esensial (Akan dijalankan di lokal maupun server Production)
        $this->call([
            RolePermissionSeeder::class,
            UnitKerjaSeeder::class,
            AdminUserSeeder::class,
            SettingSeeder::class,
        ]);

        // Seeder Data Dummy (Hanya dijalankan di mode lokal/development)
        if (app()->environment('local')) {
            $this->call([
                StandarMutuSeeder::class,
                SiklusAuditSeeder::class,
                AuditSeeder::class,
                TemuanSeeder::class,
                DokumenSeeder::class,
                BeritaSeeder::class,
                GaleriSeeder::class,
            ]);
        }
    }
}
