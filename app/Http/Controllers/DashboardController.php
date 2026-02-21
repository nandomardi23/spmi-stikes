<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\Berita;
use App\Models\Dokumen;
use App\Models\StandarMutu;
use App\Models\Temuan;
use App\Models\UnitKerja;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'total_unit_kerja' => UnitKerja::count(),
                'total_standar' => StandarMutu::where('is_active', true)->count(),
                'total_audit' => Audit::count(),
                'audit_berlangsung' => Audit::where('status', 'berlangsung')->count(),
                'temuan_open' => Temuan::where('status', 'open')->count(),
                'temuan_in_progress' => Temuan::where('status', 'in_progress')->count(),
                'total_dokumen' => Dokumen::count(),
                'total_berita' => Berita::count(),
                'total_users' => User::count(),
            ],
            'recentAudits' => Audit::with(['unitKerja', 'siklusAudit', 'auditor'])
                ->latest()->take(5)->get(),
            'recentTemuan' => Temuan::with(['audit.unitKerja'])
                ->where('status', '!=', 'closed')
                ->latest()->take(5)->get(),
        ]);
    }
}
