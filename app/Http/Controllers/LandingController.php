<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Dokumen;
use App\Models\StandarMutu;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('Landing/Index', [
            'standarMutu' => StandarMutu::where('is_active', true)->get(),
            'dokumenPublik' => Dokumen::where('is_public', true)->latest()->take(6)->get(),
            'berita' => Berita::published()->latest()->take(4)->get(),
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
