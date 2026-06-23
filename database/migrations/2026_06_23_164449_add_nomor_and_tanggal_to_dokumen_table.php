<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('dokumen', function (Blueprint $table) {
            $table->string('nomor_dokumen')->nullable()->after('kategori');
            $table->date('tanggal_dokumen')->nullable()->after('nomor_dokumen');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dokumen', function (Blueprint $table) {
            $table->dropColumn(['nomor_dokumen', 'tanggal_dokumen']);
        });
    }
};
