<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Permission::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        return Inertia::render('Dashboard/Permissions/Index', [
            'permissions' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        Permission::create($validated);

        return redirect()->back()->with('success', 'Permission berhasil ditambahkan.');
    }

    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update($validated);

        return redirect()->back()->with('success', 'Permission berhasil diperbarui.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->back()->with('success', 'Permission berhasil dihapus.');
    }
}
