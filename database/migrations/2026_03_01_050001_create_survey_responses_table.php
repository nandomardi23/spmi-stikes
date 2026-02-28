<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            $table->string('responden_type'); // Mahasiswa, Dosen, Tenaga Kependidikan, Alumni, Pengguna Lulusan
            $table->string('responden_name')->nullable();
            $table->string('responden_email')->nullable();
            $table->string('tahun_akademik');
            $table->json('answers'); // {"1": 4, "2": 5, "3": 3} => question_id: rating (1-5)
            $table->text('komentar')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
    }
};
