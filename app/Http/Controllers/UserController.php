<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $query = User::with(['roles', 'unitKerja']);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('role')) {
            $query->role($request->role);
        }

        return Inertia::render('Dashboard/Users/Index', [
            'users' => $query->latest()->paginate($request->input('per_page', 10))->withQueryString(),
            'roles' => Role::all(),
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'unit_kerja_id' => $validated['unit_kerja_id'] ?? null,
            ]);

            $user->assignRole($validated['roles']);
        });

        return redirect()->route('dashboard.users.index')
            ->with('success', 'User berhasil ditambahkan.');
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $user) {
            $user->name = $validated['name'];
            $user->email = $validated['email'];
            $user->unit_kerja_id = $validated['unit_kerja_id'] ?? null;

            if (!empty($validated['password'])) {
                $user->password = Hash::make($validated['password']);
            }

            $user->save();
            $user->syncRoles($validated['roles']);
        });

        return redirect()->route('dashboard.users.index')
            ->with('success', 'User berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return redirect()->route('dashboard.users.index')
            ->with('success', 'User berhasil dihapus.');
    }
}
