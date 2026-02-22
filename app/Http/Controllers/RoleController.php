<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $query = Role::with('permissions');

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        return Inertia::render('Dashboard/Roles/Index', [
            'roles' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'permissions' => Permission::all(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role = Role::create(['name' => $validated['name']]);

        if (!empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return redirect()->back()->with('success', 'Role berhasil ditambahkan.');
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role->name = $validated['name'];
        $role->save();

        $role->syncPermissions($validated['permissions'] ?? []);

        return redirect()->back()->with('success', 'Role berhasil diperbarui.');
    }

    public function destroy(Role $role)
    {
        if ($role->name === 'super-admin') {
            return redirect()->back()->with('error', 'Role super-admin tidak dapat dihapus.');
        }

        $role->delete();

        return redirect()->back()->with('success', 'Role berhasil dihapus.');
    }
}
