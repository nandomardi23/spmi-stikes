<?php

namespace Database\Seeders\Dev;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class DevVisiMisiSeeder extends Seeder
{
    /**
     * Seeder khusus dev: membuat data visi dan misi untuk uji coba.
     */
    public function run(): void
    {
        Setting::updateOrCreate(
            ['key' => 'visi'],
            ['value' => 'Menjadi Sekolah Tinggi Ilmu Kesehatan yang unggul, berkarakter, dan berdaya saing di tingkat nasional dalam menghasilkan tenaga kesehatan profesional yang beretika dan bermutu.']
        );

        $misiText = implode("\n", [
            'Menyelenggarakan pendidikan tinggi kesehatan yang bermutu',
            'Melaksanakan penelitian untuk pengembangan ilmu kesehatan',
            'Melaksanakan pengabdian kepada masyarakat bidang kesehatan',
            'Mengembangkan tata kelola institusi yang transparan dan akuntabel',
            'Menjalin kerjasama strategis dengan stakeholder',
        ]);

        Setting::updateOrCreate(
            ['key' => 'misi'],
            ['value' => $misiText]
        );
    }
}
