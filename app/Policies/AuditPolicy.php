<?php

namespace App\Policies;

use App\Models\Audit;
use App\Models\User;

class AuditPolicy
{
    /**
     * Super-admin dapat melakukan apapun
     */
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

    public function view(User $user, Audit $audit): bool
    {
        if ($user->hasRole('admin-mutu')) {
            return true;
        }
        // Auditor hanya bisa lihat audit yang ditugaskan
        return $user->hasRole('auditor') && $audit->auditor_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin-mutu');
    }

    public function update(User $user, Audit $audit): bool
    {
        if ($user->hasRole('admin-mutu')) {
            return true;
        }
        // Auditor hanya bisa update audit yang ditugaskan
        return $user->hasRole('auditor') && $audit->auditor_id === $user->id;
    }

    public function delete(User $user, Audit $audit): bool
    {
        return $user->hasRole('admin-mutu');
    }
}
