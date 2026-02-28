<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;

class ProfilSpmiController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Dashboard/ProfilSPMI/Index', [
            'visi' => Setting::getValue('visi', ''),
            'misi' => Setting::getValue('misi', ''),
            'spmi_tujuan' => Setting::getValue('spmi_tujuan', ''),
            'spmi_struktur' => Setting::getValue('spmi_struktur', ''),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'spmi_tujuan' => 'nullable|string',
            'spmi_struktur' => 'nullable|string',
        ]);

        $keys = ['visi', 'misi', 'spmi_tujuan', 'spmi_struktur'];
        foreach ($keys as $key) {
            if ($request->has($key)) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $request->get($key)]
                );
            }
        }

        return redirect()->back()->with('success', 'Profil SPMI berhasil diperbarui.');
    }
}
