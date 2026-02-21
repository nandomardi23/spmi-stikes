<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Temuan>
 */
class TemuanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'audit_id' => \App\Models\Audit::inRandomOrder()->first()?->id ?? \App\Models\Audit::factory(),
            'standar_mutu_id' => $this->faker->optional(0.8)->randomElement(\App\Models\StandarMutu::pluck('id')->toArray()),
            'jenis' => $this->faker->randomElement(['observasi', 'minor', 'mayor']),
            'deskripsi' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['open', 'in_progress', 'closed', 'verified']),
            'rekomendasi' => $this->faker->optional()->paragraph(),
            'batas_waktu' => $this->faker->optional()->date(),
        ];
    }
}
