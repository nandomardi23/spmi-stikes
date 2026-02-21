<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StandarMutu>
 */
class StandarMutuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode' => 'STD-' . $this->faker->unique()->numerify('####'),
            'nama' => 'Standar ' . $this->faker->words(3, true),
            'deskripsi' => $this->faker->paragraph(),
            'indikator' => 'Indikator ' . $this->faker->sentence(),
            'target' => $this->faker->randomElement(['100%', 'Tercapai', 'Minimal ' . $this->faker->numberBetween(10, 50)]),
            'is_active' => $this->faker->boolean(90), // 90% true
        ];
    }
}
