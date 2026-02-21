<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Audit>
 */
class AuditFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Note: unit_kerja_id, siklus_audit_id, auditor_id should be provided when seeding or dynamically generated here.
            'unit_kerja_id' => \App\Models\UnitKerja::inRandomOrder()->first()?->id ?? \App\Models\UnitKerja::factory(),
            'siklus_audit_id' => \App\Models\SiklusAudit::inRandomOrder()->first()?->id ?? \App\Models\SiklusAudit::factory(),
            'auditor_id' => \App\Models\User::role('auditor')->inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
            'tanggal_audit' => $this->faker->date(),
            'status' => $this->faker->randomElement(['dijadwalkan', 'berlangsung', 'selesai', 'dibatalkan']),
            'skor' => $this->faker->optional(0.7)->randomFloat(2, 0, 100), // 70% chance to have a score
            'catatan' => $this->faker->optional()->paragraph(),
        ];
    }
}
