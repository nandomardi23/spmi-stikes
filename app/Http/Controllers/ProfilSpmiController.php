<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilSpmiController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Dashboard/ProfilSPMI/Index');
    }
}
