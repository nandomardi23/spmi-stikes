<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('dokumen', function (Blueprint $table) {
            $table->foreignId('standar_mutu_id')->nullable()->after('uploaded_by')->constrained('standar_mutu')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('dokumen', function (Blueprint $table) {
            $table->dropForeign(['standar_mutu_id']);
            $table->dropColumn('standar_mutu_id');
        });
    }
};
