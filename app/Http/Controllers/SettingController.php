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
            'site_name' => Setting::getValue('site_name', 'SPMI STIKES Hang Tuah'),
            'site_description' => Setting::getValue('site_description', 'Sistem Penjaminan Mutu Internal'),
            'site_logo' => Setting::getValue('site_logo') ? asset('storage/' . Setting::getValue('site_logo')) : null,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'site_description' => 'nullable|string|max:255',
            'site_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('site_logo')) {
            $path = $request->file('site_logo')->store('settings', 'public');
            Setting::updateOrCreate(
                ['key' => 'site_logo'],
                ['value' => $path]
            );
        }

        $keys = ['site_name', 'site_description'];
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
