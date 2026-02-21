<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dokumen>
 */
class DokumenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fileName = $this->faker->word() . '.pdf';
        return [
            'judul' => 'Dokumen ' . $this->faker->words(3, true),
            'deskripsi' => $this->faker->optional()->paragraph(),
            'kategori' => $this->faker->randomElement(['kebijakan', 'manual', 'standar', 'formulir', 'sop', 'laporan', 'bukti', 'lainnya']),
            'file_path' => 'dokumen/' . $fileName,
            'file_name' => $fileName,
            'file_size' => $this->faker->numberBetween(1024, 1024000), // Size in bytes
            'is_public' => $this->faker->boolean(70), // 70% public
            'unit_kerja_id' => $this->faker->optional(0.5)->randomElement(\App\Models\UnitKerja::pluck('id')->toArray()),
            'uploaded_by' => \App\Models\User::inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
        ];
    }
}
