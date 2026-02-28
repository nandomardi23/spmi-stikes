<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Feedback;
use Illuminate\Support\Facades\DB;

class KepuasanController extends Controller
{
    public function index(Request $request)
    {
        // Get average satisfaction per responden
        $chartData = Feedback::select('responden', DB::raw('AVG(nilai_kepuasan) as rata_rata'))
            ->groupBy('responden')
            ->get();

        // Get average grouped by academic year and responden for line chart trend
        $trendData = Feedback::select('tahun_akademik', 'responden', DB::raw('AVG(nilai_kepuasan) as rata_rata'))
            ->groupBy('tahun_akademik', 'responden')
            ->orderBy('tahun_akademik')
            ->get();

        return Inertia::render('Dashboard/Kepuasan/Index', [
            'chartData' => $chartData,
            'trendData' => $trendData
        ]);
    }
}
