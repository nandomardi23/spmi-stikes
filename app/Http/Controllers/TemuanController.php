<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\StandarMutu;
use App\Models\Temuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemuanController extends Controller
{
    public function index(Request $request)
    {
        $query = Temuan::with(['audit.unitKerja', 'standarMutu']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        return Inertia::render('Dashboard/Temuan/Index', [
            'temuans' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'filters' => $request->only(['status', 'jenis']),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Temuan/Create', [
            'audits' => Audit::with('unitKerja')->get(),
            'standarMutu' => StandarMutu::where('is_active', true)->get(),
            'audit_id' => $request->audit_id,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'audit_id' => 'required|exists:audit,id',
            'standar_mutu_id' => 'nullable|exists:standar_mutu,id',
            'jenis' => 'required|in:observasi,minor,mayor',
            'deskripsi' => 'required|string',
            'rekomendasi' => 'nullable|string',
            'batas_waktu' => 'nullable|date',
        ]);

        Temuan::create($validated);

        return redirect()->route('dashboard.temuan.index')
            ->with('success', 'Temuan berhasil ditambahkan.');
    }

    public function edit(Temuan $temuan)
    {
        return Inertia::render('Dashboard/Temuan/Edit', [
            'temuan' => $temuan->load(['audit.unitKerja', 'standarMutu', 'tindakLanjuts']),
            'audits' => Audit::with('unitKerja')->get(),
            'standarMutu' => StandarMutu::where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, Temuan $temuan)
    {
        $validated = $request->validate([
            'audit_id' => 'required|exists:audit,id',
            'standar_mutu_id' => 'nullable|exists:standar_mutu,id',
            'jenis' => 'required|in:observasi,minor,mayor',
            'deskripsi' => 'required|string',
            'rekomendasi' => 'nullable|string',
            'status' => 'required|in:open,in_progress,closed,verified',
            'batas_waktu' => 'nullable|date',
        ]);

        $temuan->update($validated);

        return redirect()->route('dashboard.temuan.index')
            ->with('success', 'Temuan berhasil diperbarui.');
    }

    public function destroy(Temuan $temuan)
    {
        $temuan->delete();

        return redirect()->route('dashboard.temuan.index')
            ->with('success', 'Temuan berhasil dihapus.');
    }
}
