<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Dokumen;
use App\Models\StandarMutu;
use App\Models\Setting;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $visi = Setting::getValue('visi', 'Menjadi Sekolah Tinggi Ilmu Kesehatan yang unggul, berkarakter, dan berdaya saing di tingkat nasional dalam menghasilkan tenaga kesehatan profesional yang beretika dan bermutu.');
        $misiText = Setting::getValue('misi', '');
        $misi = array_filter(array_map('trim', explode("\n", $misiText)));

        return Inertia::render('Landing/Index', [
            'visi' => $visi,
            'misi' => empty($misi) ? [
                'Menyelenggarakan pendidikan tinggi kesehatan yang bermutu',
                'Melaksanakan penelitian untuk pengembangan ilmu kesehatan',
                'Melaksanakan pengabdian kepada masyarakat bidang kesehatan',
                'Mengembangkan tata kelola institusi yang transparan dan akuntabel',
                'Menjalin kerjasama strategis dengan stakeholder',
            ] : array_values($misi),
            'standarMutu' => StandarMutu::where('is_active', true)->get(),
            'dokumenPublik' => Dokumen::where('is_public', true)->latest()->take(6)->get(),
            'berita' => Berita::published()->latest()->paginate(6)->withQueryString(),
            'galeri' => \App\Models\Galeri::where('is_active', true)->latest()->take(8)->get(),
        ]);
    }

    public function beritaDetail($slug)
    {
        $berita = Berita::where('slug', $slug)->published()->firstOrFail();
        return Inertia::render('Landing/BeritaDetail', [
            'berita' => $berita->load('author'),
        ]);
    }
}
