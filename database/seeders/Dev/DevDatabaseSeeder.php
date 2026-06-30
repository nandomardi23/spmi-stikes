<?php

namespace Database\Seeders\Dev;

use Illuminate\Database\Seeder;

class DevDatabaseSeeder extends Seeder
{
    /**
     * Seeder utama untuk development.
     *
     * Hanya menjalankan seeder yang diperlukan untuk uji coba akses:
     * 1. Role & Permission
     * 2. User (1 per role)
     * 3. Visi & Misi
     *
     * TIDAK men-seed data lain (unit kerja, standar mutu, audit, dsb.)
     *
     * Cara menjalankan:
     *   php artisan db:seed --class=Database\\Seeders\\Dev\\DevDatabaseSeeder
     *
     * Atau dengan fresh migrate:
     *   php artisan migrate:fresh --seed --seeder=Database\\Seeders\\Dev\\DevDatabaseSeeder
     */
    public function run(): void
    {
        $this->call([
            DevRolePermissionSeeder::class,
            DevUnitKerjaSeeder::class,
            DevUserSeeder::class,
            DevVisiMisiSeeder::class,
        ]);
    }
}
