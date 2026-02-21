<?php

namespace App\Http\Controllers;

use App\Models\SiklusAudit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiklusAuditController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/SiklusAudit/Index', [
            'siklusAudit' => SiklusAudit::withCount('audits')->latest()->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tahun' => 'required|integer|min:2020|max:2099',
            'semester' => 'required|integer|in:1,2',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'status' => 'required|in:perencanaan,pelaksanaan,pelaporan,selesai',
            'deskripsi' => 'nullable|string',
        ]);

        SiklusAudit::create($validated);

        return redirect()->route('dashboard.siklus-audit.index')
            ->with('success', 'Siklus audit berhasil dibuat.');
    }

    public function edit(SiklusAudit $siklusAudit)
    {
        return Inertia::render('Dashboard/SiklusAudit/Edit', [
            'siklusAudit' => $siklusAudit,
        ]);
    }

    public function update(Request $request, SiklusAudit $siklusAudit)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tahun' => 'required|integer|min:2020|max:2099',
            'semester' => 'required|integer|in:1,2',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'status' => 'required|in:perencanaan,pelaksanaan,pelaporan,selesai',
            'deskripsi' => 'nullable|string',
        ]);

        $siklusAudit->update($validated);

        return redirect()->route('dashboard.siklus-audit.index')
            ->with('success', 'Siklus audit berhasil diperbarui.');
    }

    public function destroy(SiklusAudit $siklusAudit)
    {
        $siklusAudit->delete();

        return redirect()->route('dashboard.siklus-audit.index')
            ->with('success', 'Siklus audit berhasil dihapus.');
    }
}
