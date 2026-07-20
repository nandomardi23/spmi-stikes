<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Setting;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:settings.view')->only(['index']);
        $this->middleware('permission:settings.edit')->only(['update']);
    }

    public function index()
    {
        return Inertia::render('Dashboard/Pengaturan/Index', [
            'site_name' => Setting::getValue('site_name', 'SPMI STIKES Hang Tuah'),
            'site_description' => Setting::getValue('site_description', 'Sistem Penjaminan Mutu Internal'),
            'site_logo' => Setting::getValue('site_logo') ? asset('storage/' . Setting::getValue('site_logo')) : null,
            'visi' => Setting::getValue('visi', ''),
            'misi' => Setting::getValue('misi', ''),
            'spmi_tujuan' => Setting::getValue('spmi_tujuan', ''),
            'spmi_struktur' => Setting::getValue('spmi_struktur', ''),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'site_description' => 'nullable|string|max:255',
            'site_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'spmi_tujuan' => 'nullable|string',
            'spmi_struktur' => 'nullable|string',
        ]);

        if ($request->hasFile('site_logo')) {
            $path = $request->file('site_logo')->store('settings', 'public');
            Setting::updateOrCreate(
                ['key' => 'site_logo'],
                ['value' => $path]
            );
        }

        $keys = ['site_name', 'site_description', 'visi', 'misi', 'spmi_tujuan', 'spmi_struktur'];
        foreach ($keys as $key) {
            if ($request->has($key)) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $request->get($key)]
                );
            }
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
