<?php

namespace App\Http\Controllers;

use App\Models\Pengelola;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PengelolaController extends Controller
{
    public function index()
    {
        $pengelolas = Pengelola::orderBy('tingkat')->orderBy('urutan')->paginate(10);
        return Inertia::render('Dashboard/Pengelola/Index', [
            'pengelolas' => $pengelolas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'tingkat' => 'required|integer|in:1,2,3',
            'urutan' => 'nullable|integer',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('pengelola', 'public');
        }

        $validated['urutan'] = $validated['urutan'] ?? 0;

        Pengelola::create($validated);

        return redirect()->back()->with('success', 'Anggota tim pengelola berhasil ditambahkan.');
    }

    public function update(Request $request, Pengelola $pengelola)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'tingkat' => 'required|integer|in:1,2,3',
            'urutan' => 'nullable|integer',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            if ($pengelola->foto && Storage::disk('public')->exists($pengelola->foto)) {
                Storage::disk('public')->delete($pengelola->foto);
            }
            $validated['foto'] = $request->file('foto')->store('pengelola', 'public');
        }

        $validated['urutan'] = $validated['urutan'] ?? 0;

        $pengelola->update($validated);

        return redirect()->back()->with('success', 'Data tim pengelola berhasil diperbarui.');
    }

    public function destroy(Pengelola $pengelola)
    {
        if ($pengelola->foto && Storage::disk('public')->exists($pengelola->foto)) {
            Storage::disk('public')->delete($pengelola->foto);
        }
        
        $pengelola->delete();

        return redirect()->back()->with('success', 'Anggota tim pengelola berhasil dihapus.');
    }
}
