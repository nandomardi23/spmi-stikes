<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\GaleriImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GaleriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Galeri::with(['uploader', 'images']);

        if ($request->filled('search')) {
            $query->where('judul', 'like', "%{$request->search}%");
        }

        return Inertia::render('Dashboard/Galeri/Index', [
            'galeris' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'files' => 'required|array',
            'files.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        $galeri = Galeri::create([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'is_active' => $request->has('is_active') ? $validated['is_active'] : true,
            'uploaded_by' => auth()->id(),
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('galeri', 'public');
                $galeri->images()->create([
                    'file_path' => $path,
                    'file_name' => $file->getClientOriginalName(),
                    'file_size' => $file->getSize(),
                ]);
            }
        }

        return redirect()->route('dashboard.galeri.index')
            ->with('success', 'Galeri berhasil ditambahkan.');
    }

    public function show($id)
    {
        //
    }

    public function edit(Galeri $galeri)
    {
        return Inertia::render('Dashboard/Galeri/Edit', [
            'galeri' => $galeri->load('images'),
        ]);
    }

    public function update(Request $request, Galeri $galeri)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'files' => 'nullable|array',
            'files.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        $galeri->update([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'is_active' => $request->has('is_active') ? $validated['is_active'] : true,
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('galeri', 'public');
                $galeri->images()->create([
                    'file_path' => $path,
                    'file_name' => $file->getClientOriginalName(),
                    'file_size' => $file->getSize(),
                ]);
            }
        }

        return redirect()->route('dashboard.galeri.index')
            ->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(Galeri $galeri)
    {
        // Delete all associated image files from storage
        foreach ($galeri->images as $image) {
            if ($image->file_path) {
                Storage::disk('public')->delete($image->file_path);
            }
        }

        $galeri->delete();

        return redirect()->route('dashboard.galeri.index')
            ->with('success', 'Galeri berhasil dihapus.');
    }

    public function destroyImage(GaleriImage $image)
    {
        if ($image->file_path) {
            Storage::disk('public')->delete($image->file_path);
        }

        $image->delete();

        return back()->with('success', 'Foto berhasil dihapus dari galeri.');
    }
}
