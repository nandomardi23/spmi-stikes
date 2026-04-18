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
        return $user->hasAnyRole(['admin-mutu', 'auditor']);
    }

    public function view(User $user, Temuan $temuan): bool
    {
        if ($user->hasRole('admin-mutu')) {
            return true;
        }
        // Auditor hanya bisa lihat temuan dari audit yang ditugaskan
        return $user->hasRole('auditor') && $temuan->audit->auditor_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin-mutu', 'auditor']);
    }

    public function update(User $user, Temuan $temuan): bool
    {
        if ($user->hasRole('admin-mutu')) {
            return true;
        }
        return $user->hasRole('auditor') && $temuan->audit->auditor_id === $user->id;
    }

    public function delete(User $user, Temuan $temuan): bool
    {
        return $user->hasRole('admin-mutu');
    }
}
