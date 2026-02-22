<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('galeri_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('galeri_id')->constrained('galeris')->onDelete('cascade');
            $table->string('file_path');
            $table->string('file_name');
            $table->integer('file_size');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('galeri_images');
    }
};
