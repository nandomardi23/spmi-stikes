<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Galeri>
 */
class GaleriFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fileName = $this->faker->word() . '.jpg';
        return [
            'judul' => 'Kegiatan ' . $this->faker->words(3, true),
            'deskripsi' => $this->faker->paragraph(),
            'file_path' => 'galeri/' . $fileName,
            'file_name' => $fileName,
            'file_size' => $this->faker->numberBetween(51200, 5120000), // 50KB to 5MB
            'is_active' => $this->faker->boolean(80), // 80% active
            'uploaded_by' => \App\Models\User::inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
        ];
    }
}
