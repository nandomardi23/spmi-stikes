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
        return $user->hasAnyRole(['admin-mutu', 'auditor']);
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin-mutu', 'auditor']);
    }

    public function update(User $user, Dokumen $dokumen): bool
    {
        if ($user->hasRole('admin-mutu')) {
            return true;
        }
        // Uploader bisa edit dokumennya sendiri
        return $dokumen->uploaded_by === $user->id;
    }

    public function delete(User $user, Dokumen $dokumen): bool
    {
        if ($user->hasRole('admin-mutu')) {
            return true;
        }
        return $dokumen->uploaded_by === $user->id;
    }
}
