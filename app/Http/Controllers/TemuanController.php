<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTemuanRequest;
use App\Http\Requests\UpdateTemuanRequest;
use App\Models\Audit;
use App\Models\StandarMutu;
use App\Models\Temuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemuanController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Temuan::class);

        $query = Temuan::with(['audit.unitKerja', 'standarMutu']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }
        if ($request->filled('audit_id')) {
            $query->where('audit_id', $request->audit_id);
        }
        if ($request->filled('search')) {
            $query->where('deskripsi', 'like', "%{$request->search}%");
        }

        return Inertia::render('Dashboard/Temuan/Index', [
            'temuans' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'filters' => $request->only(['status', 'jenis', 'search']),
            'audits' => Audit::with('unitKerja')->get(),
            'standarMutu' => StandarMutu::where('is_active', true)->get(),
            'audit_id' => $request->input('audit_id'),
        ]);
    }


    public function store(StoreTemuanRequest $request)
    {
        Temuan::create($request->validated());

        return redirect()->route('dashboard.temuan.index')
            ->with('success', 'Temuan berhasil ditambahkan.');
    }


    public function update(UpdateTemuanRequest $request, Temuan $temuan)
    {
        $temuan->update($request->validated());

        return redirect()->route('dashboard.temuan.index')
            ->with('success', 'Temuan berhasil diperbarui.');
    }

    public function destroy(Temuan $temuan)
    {
        $this->authorize('delete', $temuan);

        $temuan->delete();

        return redirect()->route('dashboard.temuan.index')
            ->with('success', 'Temuan berhasil dihapus.');
    }
}
