<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RapatTinjauanController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Dashboard/RapatTinjauan/Index');
    }
}
