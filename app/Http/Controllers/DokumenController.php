<?php

namespace App\Http\Controllers;

use App\Models\Dokumen;
use App\Models\UnitKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        $query = Dokumen::with(['unitKerja', 'uploader']);

        if ($request->filled('search')) {
            $query->where('judul', 'like', "%{$request->search}%");
        }
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        return Inertia::render('Dashboard/Dokumen/Index', [
            'dokumens' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'kategori']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Dokumen/Create', [
            'unitKerja' => UnitKerja::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:kebijakan,manual,standar,formulir,sop,laporan,bukti,lainnya',
            'file' => 'required|file|max:10240',
            'unit_kerja_id' => 'nullable|exists:unit_kerja,id',
            'is_public' => 'boolean',
        ]);

        $file = $request->file('file');
        $path = $file->store('dokumen', 'public');

        Dokumen::create([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'kategori' => $validated['kategori'],
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'unit_kerja_id' => $validated['unit_kerja_id'] ?? null,
            'uploaded_by' => auth()->id(),
            'is_public' => $validated['is_public'] ?? false,
        ]);

        return redirect()->route('dashboard.dokumen.index')
            ->with('success', 'Dokumen berhasil diupload.');
    }

    public function edit(Dokumen $dokumen)
    {
        return Inertia::render('Dashboard/Dokumen/Edit', [
            'dokumen' => $dokumen,
            'unitKerja' => UnitKerja::where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, Dokumen $dokumen)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:kebijakan,manual,standar,formulir,sop,laporan,bukti,lainnya',
            'file' => 'nullable|file|max:10240',
            'unit_kerja_id' => 'nullable|exists:unit_kerja,id',
            'is_public' => 'boolean',
        ]);

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($dokumen->file_path);
            $file = $request->file('file');
            $dokumen->file_path = $file->store('dokumen', 'public');
            $dokumen->file_name = $file->getClientOriginalName();
            $dokumen->file_size = $file->getSize();
        }

        $dokumen->update([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'kategori' => $validated['kategori'],
            'unit_kerja_id' => $validated['unit_kerja_id'] ?? null,
            'is_public' => $validated['is_public'] ?? false,
        ]);

        return redirect()->route('dashboard.dokumen.index')
            ->with('success', 'Dokumen berhasil diperbarui.');
    }

    public function destroy(Dokumen $dokumen)
    {
        Storage::disk('public')->delete($dokumen->file_path);
        $dokumen->delete();

        return redirect()->route('dashboard.dokumen.index')
            ->with('success', 'Dokumen berhasil dihapus.');
    }

    public function download(Dokumen $dokumen)
    {
        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('public');

        return $disk->download($dokumen->file_path, $dokumen->file_name);
    }
}
