<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\Dokumen;
use App\Models\Temuan;
use App\Models\TindakLanjut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AuditeeController extends Controller
{
    public function index(Request $request)
    {
        $unitKerjaId = $request->user()->unit_kerja_id;

        $audits = Audit::with(['siklusAudit', 'auditor'])
            ->where('unit_kerja_id', $unitKerjaId)
            ->latest()
            ->get();

        $temuanOpen = Temuan::whereHas('audit', fn($q) => $q->where('unit_kerja_id', $unitKerjaId))
            ->whereIn('status', ['open', 'in_progress'])
            ->count();

        $dokumenCount = Dokumen::where('unit_kerja_id', $unitKerjaId)->count();

        return Inertia::render('Auditee/Index', [
            'unitKerja' => $request->user()->unitKerja,
            'audits' => $audits,
            'stats' => [
                'total_audit' => $audits->count(),
                'temuan_open' => $temuanOpen,
                'total_dokumen' => $dokumenCount,
            ],
        ]);
    }

    public function dokumen(Request $request)
    {
        $unitKerjaId = $request->user()->unit_kerja_id;

        return Inertia::render('Auditee/Dokumen/Index', [
            'dokumens' => Dokumen::where('unit_kerja_id', $unitKerjaId)
                ->latest()->paginate($request->input('per_page', 10))->withQueryString(),
        ]);
    }

    public function uploadDokumen(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:kebijakan,manual,standar,formulir,sop,laporan,bukti,lainnya',
            'file' => 'required|file|max:10240',
        ]);

        $file = $request->file('file');

        Dokumen::create([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'kategori' => $validated['kategori'],
            'file_path' => $file->store('dokumen', 'public'),
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'unit_kerja_id' => $request->user()->unit_kerja_id,
            'uploaded_by' => auth()->id(),
            'is_public' => false,
        ]);

        return back()->with('success', 'Dokumen berhasil diupload.');
    }

    public function temuan(Request $request)
    {
        $unitKerjaId = $request->user()->unit_kerja_id;

        $temuans = Temuan::with(['audit.siklusAudit', 'standarMutu', 'tindakLanjuts'])
            ->whereHas('audit', fn($q) => $q->where('unit_kerja_id', $unitKerjaId))
            ->latest()
            ->paginate($request->input('per_page', 10))->withQueryString();

        return Inertia::render('Auditee/Temuan/Index', [
            'temuans' => $temuans,
        ]);
    }

    public function showTemuan(Temuan $temuan, Request $request)
    {
        $unitKerjaId = $request->user()->unit_kerja_id;

        // Ensure the temuan belongs to the auditee's unit
        abort_unless($temuan->audit->unit_kerja_id === $unitKerjaId, 403);

        return Inertia::render('Auditee/Temuan/Show', [
            'temuan' => $temuan->load(['audit.siklusAudit', 'standarMutu', 'tindakLanjuts.user']),
        ]);
    }

    public function storeTindakLanjut(Request $request, Temuan $temuan)
    {
        $unitKerjaId = $request->user()->unit_kerja_id;
        abort_unless($temuan->audit->unit_kerja_id === $unitKerjaId, 403);

        $validated = $request->validate([
            'deskripsi' => 'required|string',
            'bukti_file' => 'nullable|file|max:10240',
        ]);

        $data = [
            'temuan_id' => $temuan->id,
            'user_id' => auth()->id(),
            'deskripsi' => $validated['deskripsi'],
        ];

        if ($request->hasFile('bukti_file')) {
            $data['bukti_file'] = $request->file('bukti_file')->store('tindak-lanjut', 'public');
        }

        TindakLanjut::create($data);

        // Update temuan status to in_progress
        if ($temuan->status === 'open') {
            $temuan->update(['status' => 'in_progress']);
        }

        return back()->with('success', 'Tindak lanjut berhasil diajukan.');
    }
}
