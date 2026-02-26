<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RapatTinjauan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\QueryException;

class RapatTinjauanController extends Controller
{
    public function index(Request $request)
    {
        try {
            if (!Schema::hasTable('rapat_tinjauan')) {
                // table not migrated yet — return empty dataset to avoid crash
                return Inertia::render('Dashboard/RapatTinjauan/Index', [
                    'items' => (object) ['data' => []],
                ]);
            }

            $items = RapatTinjauan::latest()->paginate(12);
            return Inertia::render('Dashboard/RapatTinjauan/Index', [
                'items' => $items,
            ]);
        } catch (QueryException $e) {
            // fallback: return empty items and flash an error message
            return Inertia::render('Dashboard/RapatTinjauan/Index', [
                'items' => (object) ['data' => []],
                'error' => 'Database error: ' . $e->getMessage(),
            ]);
        }
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal' => 'nullable|date',
            'notulen' => 'nullable|string',
            'keputusan' => 'nullable|string',
        ]);
        $data['user_id'] = Auth::id();
        RapatTinjauan::create($data);
        return redirect()->back()->with('success', 'Rapat ditambahkan');
    }

    public function update(Request $request, RapatTinjauan $rapat_tinjauan)
    {
        $data = $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal' => 'nullable|date',
            'notulen' => 'nullable|string',
            'keputusan' => 'nullable|string',
        ]);
        $rapat_tinjauan->update($data);
        return redirect()->back()->with('success', 'Rapat diperbarui');
    }

    public function destroy(RapatTinjauan $rapat_tinjauan)
    {
        $rapat_tinjauan->delete();
        return redirect()->back()->with('success', 'Rapat dihapus');
    }
}
