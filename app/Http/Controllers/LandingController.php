<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Dokumen;
use App\Models\Feedback;
use App\Models\StandarMutu;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index(Request $request)
    {
        $visi = Setting::getValue('visi', 'Menjadi Sekolah Tinggi Ilmu Kesehatan yang unggul, berkarakter, dan berdaya saing di tingkat nasional dalam menghasilkan tenaga kesehatan profesional yang beretika dan bermutu.');
        $misiText = Setting::getValue('misi', '');
        $misi = array_filter(array_map('trim', explode("\n", $misiText)));

        // Kepuasan data for public chart
        $kepuasanData = Feedback::select('responden', DB::raw('AVG(nilai_kepuasan) as rata_rata'))
            ->groupBy('responden')
            ->get();

        return Inertia::render('Landing/Index', [
            'visi' => $visi,
            'misi' => empty($misi) ? [
                'Menyelenggarakan pendidikan tinggi kesehatan yang bermutu',
                'Melaksanakan penelitian untuk pengembangan ilmu kesehatan',
                'Melaksanakan pengabdian kepada masyarakat bidang kesehatan',
                'Mengembangkan tata kelola institusi yang transparan dan akuntabel',
                'Menjalin kerjasama strategis dengan stakeholder',
            ] : array_values($misi),
            'standarMutu' => StandarMutu::where('is_active', true)->paginate($request->input('per_page_standar', 10), ['*'], 'page_standar')->withQueryString(),
            'dokumenPublik' => Dokumen::where('is_public', true)->latest()->take(6)->get(),
            'berita' => Berita::published()->latest()->paginate($request->input('per_page', 6))->withQueryString(),
            'galeri' => \App\Models\Galeri::with('images')->where('is_active', true)->latest()->take(8)->get(),
            'kepuasanData' => $kepuasanData,
        ]);
    }

    public function beritaDetail($slug)
    {
        $berita = Berita::where('slug', $slug)->published()->firstOrFail();
        return Inertia::render('Landing/BeritaDetail', [
            'berita' => $berita->load('author'),
        ]);
    }

    public function profil()
    {
        $profil = [
            'visi' => Setting::getValue('visi'),
            'misi' => Setting::getValue('misi'),
            'sejarah' => Setting::getValue('sejarah'),
        ];
        return Inertia::render('Landing/ProfilSPMI', [
            'profil' => $profil,
        ]);
    }

    public function dokumenPublik(Request $request)
    {
        $dokumen = Dokumen::where('is_public', true)->latest()->paginate(12);
        return Inertia::render('Landing/DokumenSPMI', [
            'dokumen' => $dokumen,
        ]);
    }
}
