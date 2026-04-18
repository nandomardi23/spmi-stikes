<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = Activity::with('causer')->latest();

        if ($request->filled('search')) {
            $query->where('description', 'like', "%{$request->search}%");
        }

        if ($request->filled('log_name')) {
            $query->where('log_name', $request->log_name);
        }

        if ($request->filled('event')) {
            $query->where('event', $request->event);
        }

        return Inertia::render('Dashboard/ActivityLog/Index', [
            'activities' => $query->paginate($request->input('per_page', 20))->withQueryString(),
            'filters' => $request->only(['search', 'log_name', 'event']),
        ]);
    }
}
