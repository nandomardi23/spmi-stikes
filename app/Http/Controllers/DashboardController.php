<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\Berita;
use App\Models\Dokumen;
use App\Models\SiklusAudit;
use App\Models\StandarMutu;
use App\Models\Temuan;
use App\Models\TindakLanjut;
use App\Models\UnitKerja;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Basic stats
        $stats = [
            'total_unit_kerja' => UnitKerja::count(),
            'total_standar' => StandarMutu::where('is_active', true)->count(),
            'total_audit' => Audit::count(),
            'audit_berlangsung' => Audit::where('status', 'berlangsung')->count(),
            'temuan_open' => Temuan::where('status', 'open')->count(),
            'temuan_in_progress' => Temuan::where('status', 'in_progress')->count(),
            'total_dokumen' => Dokumen::count(),
            'total_berita' => Berita::count(),
            'total_users' => User::count(),
        ];

        // Temuan per jenis (pie chart)
        $temuanByJenis = [
            ['name' => 'Mayor', 'value' => Temuan::where('jenis', 'mayor')->count()],
            ['name' => 'Minor', 'value' => Temuan::where('jenis', 'minor')->count()],
            ['name' => 'Observasi', 'value' => Temuan::where('jenis', 'observasi')->count()],
        ];

        // Temuan per status (pie chart)
        $temuanByStatus = [
            ['name' => 'Open', 'value' => Temuan::where('status', 'open')->count()],
            ['name' => 'In Progress', 'value' => Temuan::where('status', 'in_progress')->count()],
            ['name' => 'Closed', 'value' => Temuan::where('status', 'closed')->count()],
            ['name' => 'Verified', 'value' => Temuan::where('status', 'verified')->count()],
        ];

        // Temuan per siklus audit (bar chart)
        $siklusList = SiklusAudit::latest()->take(6)->get();
        $temuanPerSiklus = $siklusList->map(function (SiklusAudit $siklus) {
            $auditIds = $siklus->audits()->pluck('id');
            return [
                'name' => $siklus->nama,
                'mayor' => Temuan::whereIn('audit_id', $auditIds)->where('jenis', 'mayor')->count(),
                'minor' => Temuan::whereIn('audit_id', $auditIds)->where('jenis', 'minor')->count(),
                'observasi' => Temuan::whereIn('audit_id', $auditIds)->where('jenis', 'observasi')->count(),
            ];
        })->reverse()->values();

        // Tindak lanjut progress
        $totalTindakLanjut = TindakLanjut::count();
        $tindakLanjutSelesai = TindakLanjut::where('status', 'diterima')->count();
        $tindakLanjutProgress = $totalTindakLanjut > 0
            ? round(($tindakLanjutSelesai / $totalTindakLanjut) * 100)
            : 0;

        // Overdue temuan (past batas_waktu but not closed/verified)
        $overdueTemuan = Temuan::with(['audit.unitKerja'])
            ->whereNotNull('batas_waktu')
            ->where('batas_waktu', '<', now())
            ->whereNotIn('status', ['closed', 'verified'])
            ->latest('batas_waktu')
            ->take(5)
            ->get();

        // Skor per unit kerja (bar chart)
        $skorPerUnit = UnitKerja::where('is_active', true)
            ->withAvg('audits', 'skor')
            ->having('audits_avg_skor', '>', 0)
            ->take(10)
            ->get()
            ->map(fn($unit) => [
                'name' => $unit->nama,
                'skor' => round($unit->audits_avg_skor, 1),
            ]);

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentAudits' => Audit::with(['unitKerja', 'siklusAudit', 'auditor'])
                ->latest()->take(5)->get(),
            'recentTemuan' => Temuan::with(['audit.unitKerja'])
                ->where('status', '!=', 'closed')
                ->latest()->take(5)->get(),
            'temuanByJenis' => $temuanByJenis,
            'temuanByStatus' => $temuanByStatus,
            'temuanPerSiklus' => $temuanPerSiklus,
            'tindakLanjutProgress' => $tindakLanjutProgress,
            'overdueTemuan' => $overdueTemuan,
            'skorPerUnit' => $skorPerUnit,
        ]);
    }
}
