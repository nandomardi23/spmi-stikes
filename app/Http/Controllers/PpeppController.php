<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Ppepp;
use App\Models\StandarMutu;
use Inertia\Inertia;

class PpeppController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:ppepp.view')->only(['index', 'edit']);
        $this->middleware('permission:ppepp.create')->only(['store']);
        $this->middleware('permission:ppepp.edit')->only(['update']);
        $this->middleware('permission:ppepp.delete')->only(['destroy']);
    }

    public function index(Request $request)
    {
        $query = Ppepp::with('standarMutu');

        if ($request->has('tahapan') && $request->tahapan !== 'Semua') {
            $query->where('tahapan', $request->tahapan);
        }

        $ppepps = $query->latest('tanggal_pelaksanaan')->paginate(10)->withQueryString();
        $standars = StandarMutu::all();

        return Inertia::render('Dashboard/Ppepp/Index', [
            'ppepps' => $ppepps,
            'standars' => $standars,
            'filters' => $request->only(['tahapan']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'standar_mutu_id' => 'required|exists:standar_mutu,id',
            'tahapan' => 'required|in:Penetapan,Pelaksanaan,Evaluasi,Pengendalian,Peningkatan',
            'deskripsi' => 'required|string',
            'dokumen_link' => 'nullable|url',
            'tanggal_pelaksanaan' => 'required|date',
        ]);

        Ppepp::create($validated);

        return redirect()->back()->with('success', 'Data PPEPP berhasil ditambahkan.');
    }

    public function update(Request $request, Ppepp $ppepp)
    {
        $validated = $request->validate([
            'standar_mutu_id' => 'required|exists:standar_mutu,id',
            'tahapan' => 'required|in:Penetapan,Pelaksanaan,Evaluasi,Pengendalian,Peningkatan',
            'deskripsi' => 'required|string',
            'dokumen_link' => 'nullable|url',
            'tanggal_pelaksanaan' => 'required|date',
        ]);

        $ppepp->update($validated);

        return redirect()->back()->with('success', 'Data PPEPP berhasil diperbarui.');
    }

    public function destroy(Ppepp $ppepp)
    {
        $ppepp->delete();
        return redirect()->back()->with('success', 'Data PPEPP berhasil dihapus.');
    }
}
