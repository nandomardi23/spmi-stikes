<?php

namespace App\Http\Controllers;

use App\Models\InstrumenAudit;
use App\Models\StandarMutu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstrumenAuditController extends Controller
{
    public function index()
    {
        $instrumens = InstrumenAudit::with('standarMutu')
            ->orderBy('urutan')
            ->paginate(15);
        $standars = StandarMutu::where('is_active', true)->get();

        return Inertia::render('Dashboard/InstrumenAudit/Index', [
            'instrumens' => $instrumens,
            'standars' => $standars,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'standar_mutu_id' => 'required|exists:standar_mutu,id',
            'pertanyaan' => 'required|string',
            'deskripsi' => 'nullable|string',
            'bobot' => 'required|integer|min:1|max:100',
            'urutan' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        InstrumenAudit::create($validated);

        return redirect()->back()->with('success', 'Instrumen audit berhasil ditambahkan.');
    }

    public function update(Request $request, InstrumenAudit $instrumen)
    {
        $validated = $request->validate([
            'standar_mutu_id' => 'required|exists:standar_mutu,id',
            'pertanyaan' => 'required|string',
            'deskripsi' => 'nullable|string',
            'bobot' => 'required|integer|min:1|max:100',
            'urutan' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        $instrumen->update($validated);

        return redirect()->back()->with('success', 'Instrumen audit berhasil diperbarui.');
    }

    public function destroy(InstrumenAudit $instrumen)
    {
        $instrumen->delete();
        return redirect()->back()->with('success', 'Instrumen audit berhasil dihapus.');
    }
}
