<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::with('author');

        if ($request->filled('search')) {
            $query->where('judul', 'like', "%{$request->search}%");
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Dashboard/Berita/Index', [
            'berita' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'ringkasan' => 'nullable|string',
            'konten' => 'required|string',
            'gambar' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published',
        ]);

        $data = [
            'judul' => $validated['judul'],
            'slug' => Str::slug($validated['judul']),
            'ringkasan' => $validated['ringkasan'] ?? null,
            'konten' => $validated['konten'],
            'author_id' => auth()->id(),
            'status' => $validated['status'],
            'published_at' => $validated['status'] === 'published' ? now() : null,
        ];

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        Berita::create($data);

        return redirect()->route('dashboard.berita.index')
            ->with('success', 'Berita berhasil dibuat.');
    }

    // Method 'edit' is not needed when using modals in the Index page

    public function update(Request $request, Berita $berita)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'ringkasan' => 'nullable|string',
            'konten' => 'required|string',
            'gambar' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published',
        ]);

        $berita->judul = $validated['judul'];
        $berita->slug = Str::slug($validated['judul']);
        $berita->ringkasan = $validated['ringkasan'] ?? null;
        $berita->konten = $validated['konten'];
        $berita->status = $validated['status'];

        if ($validated['status'] === 'published' && !$berita->published_at) {
            $berita->published_at = \Illuminate\Support\Carbon::now();
        }

        if ($request->hasFile('gambar')) {
            if ($berita->gambar) {
                Storage::disk('public')->delete($berita->gambar);
            }
            $berita->gambar = $request->file('gambar')->store('berita', 'public');
        }

        $berita->save();

        return redirect()->route('dashboard.berita.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(Berita $berita)
    {
        if ($berita->gambar) {
            Storage::disk('public')->delete($berita->gambar);
        }
        $berita->delete();

        return redirect()->route('dashboard.berita.index')
            ->with('success', 'Berita berhasil dihapus.');
    }
}
