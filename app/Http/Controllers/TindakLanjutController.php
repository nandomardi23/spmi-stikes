<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TindakLanjut;
use App\Models\Temuan;
use App\Models\SiklusAudit;

class TindakLanjutController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:tindak-lanjut.view')->only(['index']);
        $this->middleware('permission:tindak-lanjut.create')->only(['store']);
        $this->middleware('permission:tindak-lanjut.edit')->only(['update']);
        $this->middleware('permission:tindak-lanjut.delete')->only(['destroy']);
    }

    public function index(Request $request)
    {
        $query = TindakLanjut::with(['temuan.audit.siklusAudit', 'temuan.audit.unitKerja', 'temuan.standarMutu', 'user']);

        if ($request->filled('siklus')) {
            $query->whereHas('temuan.audit', function ($q) use ($request) {
                $q->where('siklus_audit_id', $request->siklus);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('deskripsi', 'like', "%{$search}%")
                  ->orWhereHas('temuan', function ($q) use ($search) {
                      $q->where('deskripsi', 'like', "%{$search}%")
                        ->orWhereHas('audit.unitKerja', function ($q) use ($search) {
                            $q->where('nama', 'like', "%{$search}%");
                        });
                  });
            });
        }

        $items = $query->latest()->paginate(15)->withQueryString();
        $temuan = Temuan::latest()->take(50)->get(['id','deskripsi']);

        return Inertia::render('Dashboard/TindakLanjut/Index', [
            'items' => $items,
            'temuan' => $temuan,
            'siklusAudit' => SiklusAudit::latest()->get(),
            'filters' => $request->only(['siklus', 'search']),
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
