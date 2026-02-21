<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('temuan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('audit_id')->constrained('audit')->cascadeOnDelete();
            $table->foreignId('standar_mutu_id')->nullable()->constrained('standar_mutu')->nullOnDelete();
            $table->enum('jenis', ['observasi', 'minor', 'mayor'])->default('observasi');
            $table->text('deskripsi');
            $table->text('rekomendasi')->nullable();
            $table->enum('status', ['open', 'in_progress', 'closed', 'verified'])->default('open');
            $table->date('batas_waktu')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('temuan');
    }
};
