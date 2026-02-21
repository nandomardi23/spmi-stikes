<?php

namespace App\Http\Controllers;

use App\Models\StandarMutu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandarMutuController extends Controller
{
    public function index(Request $request)
    {
        $query = StandarMutu::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', "%{$request->search}%")
                    ->orWhere('kode', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        return Inertia::render('Dashboard/StandarMutu/Index', [
            'standarMutu' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'kategori']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:20|unique:standar_mutu',
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:pendidikan,penelitian,pengabdian,tata_kelola,kemahasiswaan,sdm,keuangan,sarana_prasarana',
            'indikator' => 'nullable|string',
            'target' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        StandarMutu::create($validated);

        return redirect()->route('dashboard.standar-mutu.index')
            ->with('success', 'Standar mutu berhasil ditambahkan.');
    }

    public function edit(StandarMutu $standarMutu)
    {
        return Inertia::render('Dashboard/StandarMutu/Edit', [
            'standarMutu' => $standarMutu,
        ]);
    }

    public function update(Request $request, StandarMutu $standarMutu)
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:20|unique:standar_mutu,kode,' . $standarMutu->id,
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:pendidikan,penelitian,pengabdian,tata_kelola,kemahasiswaan,sdm,keuangan,sarana_prasarana',
            'indikator' => 'nullable|string',
            'target' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $standarMutu->update($validated);

        return redirect()->route('dashboard.standar-mutu.index')
            ->with('success', 'Standar mutu berhasil diperbarui.');
    }

    public function destroy(StandarMutu $standarMutu)
    {
        $standarMutu->delete();

        return redirect()->route('dashboard.standar-mutu.index')
            ->with('success', 'Standar mutu berhasil dihapus.');
    }
}
