<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Setting;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Pengaturan/Index', [
            'visi' => Setting::getValue('visi', ''),
            'misi' => Setting::getValue('misi', ''),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'Pengaturan visi misi berhasil diperbarui.');
    }
}
