<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Galeri::factory(10)->create()->each(function ($galeri) {
            $faker = \Faker\Factory::create();
            // Create 1-3 images for each galeri
            for ($i = 0; $i < rand(1, 3); $i++) {
                $fileName = $faker->word() . '.jpg';
                \App\Models\GaleriImage::create([
                    'galeri_id' => $galeri->id,
                    'file_path' => 'galeri/' . $fileName,
                    'file_name' => $fileName,
                    'file_size' => $faker->numberBetween(51200, 5120000), // 50KB to 5MB
                ]);
            }
        });
    }
}
