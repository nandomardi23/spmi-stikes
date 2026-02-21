<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('instrumen_audit', function (Blueprint $table) {
            $table->id();
            $table->foreignId('standar_mutu_id')->constrained('standar_mutu')->cascadeOnDelete();
            $table->string('pertanyaan');
            $table->text('deskripsi')->nullable();
            $table->integer('bobot')->default(1);
            $table->integer('urutan')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Pivot table for audit - instrumen scoring
        Schema::create('audit_instrumen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('audit_id')->constrained('audit')->cascadeOnDelete();
            $table->foreignId('instrumen_audit_id')->constrained('instrumen_audit')->cascadeOnDelete();
            $table->integer('skor')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_instrumen');
        Schema::dropIfExists('instrumen_audit');
    }
};
