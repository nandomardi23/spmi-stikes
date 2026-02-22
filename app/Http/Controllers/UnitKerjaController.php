<?php

namespace App\Http\Controllers;

use App\Models\UnitKerja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitKerjaController extends Controller
{
    public function index(Request $request)
    {
        $query = UnitKerja::withCount(['users', 'audits', 'dokumens']);

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('Dashboard/UnitKerja/Index', [
            'unitKerjas' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'users' => \App\Models\User::all(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kode' => 'required|string|max:20|unique:unit_kerja',
            'jenis' => 'required|in:prodi,unit,lembaga,bagian',
            'deskripsi' => 'nullable|string',
            'kepala_unit' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:20',
            'is_active' => 'boolean',
        ]);

        UnitKerja::create($validated);

        return redirect()->route('dashboard.unit-kerja.index')
            ->with('success', 'Unit kerja berhasil ditambahkan.');
    }

    public function edit(UnitKerja $unitKerja)
    {
        return Inertia::render('Dashboard/UnitKerja/Edit', [
            'unitKerja' => $unitKerja,
        ]);
    }

    public function update(Request $request, UnitKerja $unitKerja)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kode' => 'required|string|max:20|unique:unit_kerja,kode,' . $unitKerja->id,
            'jenis' => 'required|in:prodi,unit,lembaga,bagian',
            'deskripsi' => 'nullable|string',
            'kepala_unit' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:20',
            'is_active' => 'boolean',
        ]);

        $unitKerja->update($validated);

        return redirect()->route('dashboard.unit-kerja.index')
            ->with('success', 'Unit kerja berhasil diperbarui.');
    }

    public function destroy(UnitKerja $unitKerja)
    {
        $unitKerja->delete();

        return redirect()->route('dashboard.unit-kerja.index')
            ->with('success', 'Unit kerja berhasil dihapus.');
    }
}
