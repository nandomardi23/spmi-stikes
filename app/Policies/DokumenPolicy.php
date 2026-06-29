<?php

namespace App\Policies;

use App\Models\Dokumen;
use App\Models\User;

class DokumenPolicy
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
        return $user->hasPermissionTo('dokumen.view');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('dokumen.create');
    }

    public function update(User $user, Dokumen $dokumen): bool
    {
        if ($user->hasPermissionTo('dokumen.edit')) {
            if ($user->hasRole('admin-mutu')) {
                return true;
            }
            return $dokumen->uploaded_by === $user->id;
        }
        return false;
    }

    public function delete(User $user, Dokumen $dokumen): bool
    {
        if ($user->hasPermissionTo('dokumen.delete')) {
            if ($user->hasRole('admin-mutu')) {
                return true;
            }
            return $dokumen->uploaded_by === $user->id;
        }
        return false;
    }
}
