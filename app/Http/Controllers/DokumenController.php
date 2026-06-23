<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDokumenRequest;
use App\Http\Requests\UpdateDokumenRequest;
use App\Models\Dokumen;
use App\Models\UnitKerja;
use App\Models\StandarMutu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Dokumen::class);

        $query = Dokumen::with(['unitKerja', 'uploader', 'standarMutu']);

        if ($request->filled('search')) {
            $query->where('judul', 'like', "%{$request->search}%");
        }
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        return Inertia::render('Dashboard/Dokumen/Index', [
            'dokumens' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'filters' => $request->only(['search', 'kategori']),
            'standars' => StandarMutu::where('is_active', true)->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Dokumen/Create', [
            'unitKerja' => UnitKerja::where('is_active', true)->latest()->get(),
        ]);
    }

    public function store(StoreDokumenRequest $request)
    {
        $validated = $request->validated();
        $file = $request->file('file');

        DB::transaction(function () use ($validated, $file) {
            $path = $file->store('dokumen', 'public');

            Dokumen::create([
                'judul' => $validated['judul'],
                'deskripsi' => $validated['deskripsi'] ?? null,
                'kategori' => $validated['kategori'],
                'nomor_dokumen' => $validated['nomor_dokumen'] ?? null,
                'tanggal_dokumen' => $validated['tanggal_dokumen'] ?? null,
                'file_path' => $path,
                'file_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'unit_kerja_id' => $validated['unit_kerja_id'] ?? null,
                'standar_mutu_id' => $validated['standar_mutu_id'] ?? null,
                'uploaded_by' => auth()->id(),
                'is_public' => filter_var($validated['is_public'] ?? false, FILTER_VALIDATE_BOOLEAN),
            ]);
        });

        return redirect()->route('dashboard.dokumen.index')
            ->with('success', 'Dokumen berhasil diupload.');
    }

    public function edit(Dokumen $dokumen)
    {
        $this->authorize('update', $dokumen);

        return Inertia::render('Dashboard/Dokumen/Edit', [
            'dokumen' => $dokumen,
            'unitKerja' => UnitKerja::where('is_active', true)->latest()->get(),
        ]);
    }

    public function update(UpdateDokumenRequest $request, Dokumen $dokumen)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($request, $validated, $dokumen) {
            \Illuminate\Support\Facades\Log::info('Editing dokumen ID: ' . $dokumen->id);
            \Illuminate\Support\Facades\Log::info('Request All: ', $request->all());
            \Illuminate\Support\Facades\Log::info('Validated: ', $validated);

            if ($request->hasFile('file')) {
                Storage::disk('public')->delete($dokumen->file_path);
                $file = $request->file('file');
                $dokumen->file_path = $file->store('dokumen', 'public');
                $dokumen->file_name = $file->getClientOriginalName();
                $dokumen->file_size = $file->getSize();
            }

            $is_public = filter_var($validated['is_public'] ?? false, FILTER_VALIDATE_BOOLEAN);
            \Illuminate\Support\Facades\Log::info('Parsed is_public to: ' . ($is_public ? 'true' : 'false'));

            $dokumen->update([
                'judul' => $validated['judul'],
                'deskripsi' => $validated['deskripsi'] ?? null,
                'kategori' => $validated['kategori'],
                'nomor_dokumen' => $validated['nomor_dokumen'] ?? null,
                'tanggal_dokumen' => $validated['tanggal_dokumen'] ?? null,
                'unit_kerja_id' => $validated['unit_kerja_id'] ?? null,
                'standar_mutu_id' => $validated['standar_mutu_id'] ?? null,
                'is_public' => $is_public,
            ]);

            \Illuminate\Support\Facades\Log::info('Dokumen updated, is_public in DB: ' . $dokumen->fresh()->is_public);
        });

        return redirect()->route('dashboard.dokumen.index')
            ->with('success', 'Dokumen berhasil diperbarui.');
    }

    public function destroy(Dokumen $dokumen)
    {
        $this->authorize('delete', $dokumen);

        DB::transaction(function () use ($dokumen) {
            Storage::disk('public')->delete($dokumen->file_path);
            $dokumen->delete();
        });

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
