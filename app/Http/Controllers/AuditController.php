<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuditRequest;
use App\Http\Requests\UpdateAuditRequest;
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
        $this->authorize('viewAny', Audit::class);

        $query = Audit::with(['siklusAudit', 'unitKerja', 'auditor']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('siklus')) {
            $query->where('siklus_audit_id', $request->siklus);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('unitKerja', fn($q) => $q->where('nama', 'like', "%{$search}%"))
                  ->orWhereHas('auditor', fn($q) => $q->where('name', 'like', "%{$search}%"));
            });
        }

        return Inertia::render('Dashboard/Audit/Index', [
            'audits' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'siklusAudit' => SiklusAudit::latest()->get(),
            'unitKerja' => UnitKerja::where('is_active', true)->latest()->get(),
            'auditors' => User::role('auditor')->latest()->get(),
            'filters' => $request->only(['status', 'siklus', 'search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Audit/Create', [
            'siklusAudit' => SiklusAudit::latest()->get(),
            'unitKerja' => UnitKerja::where('is_active', true)->latest()->get(),
            'auditors' => User::role('auditor')->latest()->get(),
        ]);
    }

    public function store(StoreAuditRequest $request)
    {
        Audit::create($request->validated());

        return redirect()->route('dashboard.audit.index')
            ->with('success', 'Audit berhasil dijadwalkan.');
    }

    public function show(Audit $audit)
    {
        $this->authorize('view', $audit);

        return Inertia::render('Dashboard/Audit/Show', [
            'audit' => $audit->load(['siklusAudit', 'unitKerja', 'auditor', 'temuans.standarMutu']),
            'siklusAudit' => SiklusAudit::latest()->get(),
            'unitKerja' => UnitKerja::where('is_active', true)->latest()->get(),
            'auditors' => User::role('auditor')->latest()->get(),
        ]);
    }

    public function edit(Audit $audit)
    {
        $this->authorize('update', $audit);

        return Inertia::render('Dashboard/Audit/Edit', [
            'audit' => $audit,
            'siklusAudit' => SiklusAudit::latest()->get(),
            'unitKerja' => UnitKerja::where('is_active', true)->latest()->get(),
            'auditors' => User::role('auditor')->latest()->get(),
        ]);
    }

    public function update(UpdateAuditRequest $request, Audit $audit)
    {
        $audit->update($request->validated());

        return redirect()->route('dashboard.audit.index')
            ->with('success', 'Audit berhasil diperbarui.');
    }

    public function destroy(Audit $audit)
    {
        $this->authorize('delete', $audit);

        $audit->delete();

        return redirect()->route('dashboard.audit.index')
            ->with('success', 'Audit berhasil dihapus.');
    }
}
