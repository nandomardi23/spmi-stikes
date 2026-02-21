<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Standar Mutu
            'standar-mutu.view',
            'standar-mutu.create',
            'standar-mutu.edit',
            'standar-mutu.delete',
            // Siklus Audit
            'siklus-audit.view',
            'siklus-audit.create',
            'siklus-audit.edit',
            'siklus-audit.delete',
            // Audit
            'audit.view',
            'audit.create',
            'audit.edit',
            'audit.delete',
            // Temuan
            'temuan.view',
            'temuan.create',
            'temuan.edit',
            'temuan.delete',
            // Tindak Lanjut
            'tindak-lanjut.view',
            'tindak-lanjut.create',
            'tindak-lanjut.edit',
            'tindak-lanjut.delete',
            // Dokumen
            'dokumen.view',
            'dokumen.create',
            'dokumen.edit',
            'dokumen.delete',
            // Unit Kerja
            'unit-kerja.view',
            'unit-kerja.create',
            'unit-kerja.edit',
            'unit-kerja.delete',
            // Berita
            'berita.view',
            'berita.create',
            'berita.edit',
            'berita.delete',
            // Users
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            // Instrumen
            'instrumen.view',
            'instrumen.create',
            'instrumen.edit',
            'instrumen.delete',
            // Auditee
            'auditee.dashboard',
            'auditee.upload-dokumen',
            'auditee.view-temuan',
            'auditee.tindak-lanjut',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Super Admin - gets all permissions via Gate::before
        $superAdmin = Role::create(['name' => 'super-admin']);

        // Admin Mutu
        $adminMutu = Role::create(['name' => 'admin-mutu']);
        $adminMutu->givePermissionTo([
            'standar-mutu.view',
            'standar-mutu.create',
            'standar-mutu.edit',
            'standar-mutu.delete',
            'siklus-audit.view',
            'siklus-audit.create',
            'siklus-audit.edit',
            'siklus-audit.delete',
            'audit.view',
            'audit.create',
            'audit.edit',
            'audit.delete',
            'temuan.view',
            'temuan.create',
            'temuan.edit',
            'temuan.delete',
            'tindak-lanjut.view',
            'tindak-lanjut.edit',
            'dokumen.view',
            'dokumen.create',
            'dokumen.edit',
            'dokumen.delete',
            'unit-kerja.view',
            'unit-kerja.create',
            'unit-kerja.edit',
            'unit-kerja.delete',
            'berita.view',
            'berita.create',
            'berita.edit',
            'berita.delete',
            'instrumen.view',
            'instrumen.create',
            'instrumen.edit',
            'instrumen.delete',
            'users.view',
        ]);

        // Auditor
        $auditor = Role::create(['name' => 'auditor']);
        $auditor->givePermissionTo([
            'audit.view',
            'audit.edit',
            'temuan.view',
            'temuan.create',
            'temuan.edit',
            'tindak-lanjut.view',
            'tindak-lanjut.edit',
            'standar-mutu.view',
            'instrumen.view',
            'dokumen.view',
            'unit-kerja.view',
        ]);

        // Auditee
        $auditee = Role::create(['name' => 'auditee']);
        $auditee->givePermissionTo([
            'auditee.dashboard',
            'auditee.upload-dokumen',
            'auditee.view-temuan',
            'auditee.tindak-lanjut',
            'dokumen.view',
            'dokumen.create',
            'temuan.view',
            'tindak-lanjut.view',
            'tindak-lanjut.create',
        ]);
    }
}
