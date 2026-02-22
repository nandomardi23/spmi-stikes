<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames(),
                    'permissions' => $request->user()->getAllPermissions()->pluck('name'),
                    'unit_kerja' => $request->user()->unitKerja,
                ] : null,
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
                'warning' => fn() => $request->session()->get('warning'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'settings' => [
                'site_name' => \App\Models\Setting::getValue('site_name', 'SPMI STIKES Hang Tuah'),
                'site_description' => \App\Models\Setting::getValue('site_description', 'Sistem Penjaminan Mutu Internal'),
                'site_logo' => \App\Models\Setting::getValue('site_logo') ? asset('storage/' . \App\Models\Setting::getValue('site_logo')) : null,
            ],
        ];
    }
}
