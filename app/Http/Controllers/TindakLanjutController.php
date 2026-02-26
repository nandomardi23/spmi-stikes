<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TindakLanjut;
use App\Models\Temuan;

class TindakLanjutController extends Controller
{
    public function index(Request $request)
    {
        $items = TindakLanjut::with('temuan')->latest()->paginate(15);
        $temuan = Temuan::latest()->take(50)->get(['id','deskripsi']);
        return Inertia::render('Dashboard/TindakLanjut/Index', [
            'items' => $items,
            'temuan' => $temuan,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'temuan_id' => 'required|integer',
            'deskripsi' => 'required|string',
        ]);
        TindakLanjut::create($data + ['user_id' => $request->user()->id]);
        return redirect()->back()->with('success', 'Tindak lanjut dibuat');
    }

    public function update(Request $request, TindakLanjut $tindak_lanjut)
    {
        $data = $request->validate([
            'deskripsi' => 'sometimes|string',
            'status' => 'sometimes|string',
        ]);
        $tindak_lanjut->update($data);
        return redirect()->back()->with('success', 'Tindak lanjut diperbarui');
    }

    public function destroy(TindakLanjut $tindak_lanjut)
    {
        $tindak_lanjut->delete();
        return redirect()->back()->with('success', 'Tindak lanjut dihapus');
    }
}
