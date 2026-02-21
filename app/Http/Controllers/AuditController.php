<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\SiklusAudit;
use App\Models\UnitKerja;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditController extends Controller
{
    public function index(Request $request)
    {
        $query = Audit::with(['siklusAudit', 'unitKerja', 'auditor']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('siklus')) {
            $query->where('siklus_audit_id', $request->siklus);
        }

        return Inertia::render('Dashboard/Audit/Index', [
            'audits' => $query->latest()->paginate(10)->withQueryString(),
            'siklus' => SiklusAudit::latest()->get(),
            'filters' => $request->only(['status', 'siklus']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Audit/Create', [
            'siklusAudit' => SiklusAudit::latest()->get(),
            'unitKerja' => UnitKerja::where('is_active', true)->get(),
            'auditors' => User::role('auditor')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'siklus_audit_id' => 'required|exists:siklus_audit,id',
            'unit_kerja_id' => 'required|exists:unit_kerja,id',
            'auditor_id' => 'nullable|exists:users,id',
            'tanggal_audit' => 'nullable|date',
            'status' => 'required|in:dijadwalkan,berlangsung,selesai,dibatalkan',
            'catatan' => 'nullable|string',
        ]);

        Audit::create($validated);

        return redirect()->route('dashboard.audit.index')
            ->with('success', 'Audit berhasil dijadwalkan.');
    }

    public function show(Audit $audit)
    {
        return Inertia::render('Dashboard/Audit/Show', [
            'audit' => $audit->load(['siklusAudit', 'unitKerja', 'auditor', 'temuans.standarMutu']),
        ]);
    }

    public function edit(Audit $audit)
    {
        return Inertia::render('Dashboard/Audit/Edit', [
            'audit' => $audit,
            'siklusAudit' => SiklusAudit::latest()->get(),
            'unitKerja' => UnitKerja::where('is_active', true)->get(),
            'auditors' => User::role('auditor')->get(),
        ]);
    }

    public function update(Request $request, Audit $audit)
    {
        $validated = $request->validate([
            'siklus_audit_id' => 'required|exists:siklus_audit,id',
            'unit_kerja_id' => 'required|exists:unit_kerja,id',
            'auditor_id' => 'nullable|exists:users,id',
            'tanggal_audit' => 'nullable|date',
            'status' => 'required|in:dijadwalkan,berlangsung,selesai,dibatalkan',
            'catatan' => 'nullable|string',
            'skor' => 'nullable|numeric|min:0|max:100',
        ]);

        $audit->update($validated);

        return redirect()->route('dashboard.audit.index')
            ->with('success', 'Audit berhasil diperbarui.');
    }

    public function destroy(Audit $audit)
    {
        $audit->delete();

        return redirect()->route('dashboard.audit.index')
            ->with('success', 'Audit berhasil dihapus.');
    }
}
