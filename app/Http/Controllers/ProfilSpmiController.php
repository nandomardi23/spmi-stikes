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
            'spmi_visi' => Setting::getValue('spmi_visi', ''),
            'spmi_misi' => Setting::getValue('spmi_misi', ''),
            'spmi_tujuan' => Setting::getValue('spmi_tujuan', ''),
            'spmi_struktur' => Setting::getValue('spmi_struktur', ''),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'spmi_visi' => 'nullable|string',
            'spmi_misi' => 'nullable|string',
            'spmi_tujuan' => 'nullable|string',
            'spmi_struktur' => 'nullable|string',
        ]);

        $keys = ['spmi_visi', 'spmi_misi', 'spmi_tujuan', 'spmi_struktur'];
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
