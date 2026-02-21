<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('standar_mutu', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 20)->unique();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->enum('kategori', ['pendidikan', 'penelitian', 'pengabdian', 'tata_kelola', 'kemahasiswaan', 'sdm', 'keuangan', 'sarana_prasarana'])->default('pendidikan');
            $table->text('indikator')->nullable();
            $table->string('target')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('standar_mutu');
    }
};
