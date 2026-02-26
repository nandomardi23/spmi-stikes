<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Dokumen;

class DokumenPublikController extends Controller
{
    public function index(Request $request)
    {
        $dokumen = Dokumen::where('is_public', true)->latest()->paginate(12);
        return Inertia::render('Dashboard/DokumenPublik/Index', [
            'dokumen' => $dokumen,
        ]);
    }
}
