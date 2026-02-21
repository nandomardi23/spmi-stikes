<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            UnitKerjaSeeder::class,
            AdminUserSeeder::class,
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
