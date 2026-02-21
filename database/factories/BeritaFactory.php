<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Berita>
 */
class BeritaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();
        return [
            'judul' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'ringkasan' => $this->faker->optional(0.7)->text(150),
            'konten' => '<p>' . implode('</p><p>', $this->faker->paragraphs(5)) . '</p>',
            'gambar' => $this->faker->optional(0.7)->imageUrl(800, 600, 'news'),
            'status' => $this->faker->randomElement(['draft', 'published']),
            'published_at' => $this->faker->optional(0.8)->dateTimeBetween('-1 year', 'now'),
            'author_id' => \App\Models\User::inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
        ];
    }
}
