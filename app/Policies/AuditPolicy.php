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
        return $user->hasPermissionTo('audit.view');
    }

    public function view(User $user, Audit $audit): bool
    {
        if ($user->hasPermissionTo('audit.view')) {
            if ($user->hasRole('admin-mutu')) {
                return true;
            }
            return $audit->auditor_id === $user->id;
        }
        return false;
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('audit.create');
    }

    public function update(User $user, Audit $audit): bool
    {
        if ($user->hasPermissionTo('audit.edit')) {
            if ($user->hasRole('admin-mutu')) {
                return true;
            }
            return $audit->auditor_id === $user->id;
        }
        return false;
    }

    public function delete(User $user, Audit $audit): bool
    {
        return $user->hasPermissionTo('audit.delete');
    }
}
