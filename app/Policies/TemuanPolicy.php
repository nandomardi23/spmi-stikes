<?php

namespace App\Policies;

use App\Models\Temuan;
use App\Models\User;

class TemuanPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole('super-admin')) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('temuan.view');
    }

    public function view(User $user, Temuan $temuan): bool
    {
        if ($user->hasPermissionTo('temuan.view')) {
            if ($user->hasRole('admin-mutu')) {
                return true;
            }
            return $temuan->audit->auditor_id === $user->id;
        }
        return false;
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('temuan.create');
    }

    public function update(User $user, Temuan $temuan): bool
    {
        if ($user->hasPermissionTo('temuan.edit')) {
            if ($user->hasRole('admin-mutu')) {
                return true;
            }
            return $temuan->audit->auditor_id === $user->id;
        }
        return false;
    }

    public function delete(User $user, Temuan $temuan): bool
    {
        return $user->hasPermissionTo('temuan.delete');
    }
}
