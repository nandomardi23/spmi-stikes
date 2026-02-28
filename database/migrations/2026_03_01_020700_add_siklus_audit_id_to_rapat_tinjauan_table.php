<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('rapat_tinjauan', function (Blueprint $table) {
            $table->foreignId('siklus_audit_id')->nullable()->after('user_id')->constrained('siklus_audit')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('rapat_tinjauan', function (Blueprint $table) {
            $table->dropForeign(['siklus_audit_id']);
            $table->dropColumn('siklus_audit_id');
        });
    }
};
