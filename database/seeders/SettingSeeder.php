<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $misiText = implode("\n", [
            'Menyelenggarakan pendidikan tinggi kesehatan yang bermutu',
            'Melaksanakan penelitian untuk pengembangan ilmu kesehatan',
            'Melaksanakan pengabdian kepada masyarakat bidang kesehatan',
            'Mengembangkan tata kelola institusi yang transparan dan akuntabel',
            'Menjalin kerjasama strategis dengan stakeholder',
        ]);

        \App\Models\Setting::updateOrCreate(
            ['key' => 'visi'],
            ['value' => 'Menjadi Sekolah Tinggi Ilmu Kesehatan yang unggul, berkarakter, dan berdaya saing di tingkat nasional dalam menghasilkan tenaga kesehatan profesional yang beretika dan bermutu.']
        );

        \App\Models\Setting::updateOrCreate(
            ['key' => 'misi'],
            ['value' => $misiText]
        );
    }
}
