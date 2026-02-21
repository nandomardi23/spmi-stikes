<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SiklusAudit>
 */
class SiklusAuditFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startYear = $this->faker->unique()->numberBetween(2020, 2026);
        $semester = $this->faker->randomElement([1, 2]); // Ganjil = 1, Genap = 2
        return [
            'nama' => "Tahun Akademik {$startYear}/" . ($startYear + 1) . " " . ($semester == 1 ? 'Ganjil' : 'Genap'),
            'tahun' => $startYear,
            'semester' => $semester,
            'tanggal_mulai' => $this->faker->date(),
            'tanggal_selesai' => $this->faker->date(),
            'status' => $this->faker->randomElement(['perencanaan', 'pelaksanaan', 'pelaporan', 'selesai']),
            'deskripsi' => $this->faker->optional()->paragraph(),
        ];
    }
}
