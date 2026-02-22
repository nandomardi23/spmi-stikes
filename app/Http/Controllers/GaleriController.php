<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;

class GaleriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Galeri::with('uploader');

        if ($request->filled('search')) {
            $query->where('judul', 'like', "%{$request->search}%");
        }

        return \Inertia\Inertia::render('Dashboard/Galeri/Index', [
            'galeris' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'file' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        $file = $request->file('file');
        $path = $file->store('galeri', 'public');

        Galeri::create([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'is_active' => $request->has('is_active') ? $validated['is_active'] : true,
            'uploaded_by' => auth()->id(),
        ]);

        return redirect()->route('dashboard.galeri.index')
            ->with('success', 'Galeri berhasil ditambahkan.');
    }

    public function show($id)
    {
        //
    }

    public function edit(Galeri $galeri)
    {
        return \Inertia\Inertia::render('Dashboard/Galeri/Edit', [
            'galeri' => $galeri,
        ]);
    }

    public function update(Request $request, Galeri $galeri)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('file')) {
            if ($galeri->file_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($galeri->file_path);
            }
            $file = $request->file('file');
            $galeri->file_path = $file->store('galeri', 'public');
            $galeri->file_name = $file->getClientOriginalName();
            $galeri->file_size = $file->getSize();
        }

        $galeri->update([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'is_active' => $request->has('is_active') ? $validated['is_active'] : true,
        ]);

        return redirect()->route('dashboard.galeri.index')
            ->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(Galeri $galeri)
    {
        if ($galeri->file_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($galeri->file_path);
        }

        $galeri->delete();

        return redirect()->route('dashboard.galeri.index')
            ->with('success', 'Galeri berhasil dihapus.');
    }
}
