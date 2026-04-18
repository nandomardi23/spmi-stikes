<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tambah kolom soft deletes pada tabel-tabel kritis
     * agar data yang terhapus dapat dipulihkan.
     */
    public function up(): void
    {
        $tables = ['audit', 'temuan', 'tindak_lanjut', 'dokumen', 'standar_mutu'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->softDeletes();
            });
        }
    }

    public function down(): void
    {
        $tables = ['audit', 'temuan', 'tindak_lanjut', 'dokumen', 'standar_mutu'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropSoftDeletes();
            });
        }
    }
};
