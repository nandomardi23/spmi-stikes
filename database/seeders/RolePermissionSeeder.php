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
            // PPEPP
            'ppepp.view',
            'ppepp.create',
            'ppepp.edit',
            'ppepp.delete',
            // Profil SPMI
            'profil-spmi.view',
            'profil-spmi.edit',
            // Pengelola
            'pengelola.view',
            'pengelola.create',
            'pengelola.edit',
            'pengelola.delete',
            // Rapat Tinjauan
            'rapat-tinjauan.view',
            'rapat-tinjauan.create',
            'rapat-tinjauan.edit',
            'rapat-tinjauan.delete',
            // Feedback
            'feedback.view',
            'feedback.create',
            'feedback.edit',
            'feedback.delete',
            // Kepuasan
            'kepuasan.view',
            // Survey Questions
            'survey-questions.view',
            'survey-questions.create',
            'survey-questions.edit',
            'survey-questions.delete',
            // Survey Responses
            'survey-responses.view',
            'survey-responses.delete',
            // Galeri
            'galeri.view',
            'galeri.create',
            'galeri.edit',
            'galeri.delete',
            // Roles
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            // Permissions
            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',
            // Activity Log
            'activity-log.view',
            // Settings
            'settings.view',
            'settings.edit',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Super Admin - gets all permissions
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdmin->syncPermissions(Permission::all());

        // Admin Mutu
        $adminMutu = Role::firstOrCreate(['name' => 'admin-mutu']);
        $adminMutu->syncPermissions([
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
            'tindak-lanjut.create',
            'tindak-lanjut.edit',
            'tindak-lanjut.delete',
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
            'users.create',
            'users.edit',
            'users.delete',
            'ppepp.view',
            'ppepp.create',
            'ppepp.edit',
            'ppepp.delete',
            'profil-spmi.view',
            'profil-spmi.edit',
            'pengelola.view',
            'pengelola.create',
            'pengelola.edit',
            'pengelola.delete',
            'rapat-tinjauan.view',
            'rapat-tinjauan.create',
            'rapat-tinjauan.edit',
            'rapat-tinjauan.delete',
            'feedback.view',
            'feedback.create',
            'feedback.edit',
            'feedback.delete',
            'kepuasan.view',
            'survey-questions.view',
            'survey-questions.create',
            'survey-questions.edit',
            'survey-questions.delete',
            'survey-responses.view',
            'survey-responses.delete',
            'galeri.view',
            'galeri.create',
            'galeri.edit',
            'galeri.delete',
            'activity-log.view',
            'settings.view',
            'settings.edit',
        ]);

        // Auditor
        $auditor = Role::firstOrCreate(['name' => 'auditor']);
        $auditor->syncPermissions([
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
            'rapat-tinjauan.view',
            'ppepp.view',
            'profil-spmi.view',
            'pengelola.view',
            'berita.view',
            'galeri.view',
            'feedback.view',
            'kepuasan.view',
        ]);

        // Auditee
        $auditee = Role::firstOrCreate(['name' => 'auditee']);
        $auditee->syncPermissions([
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
