<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rapat_tinjauan', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->date('tanggal')->nullable();
            $table->text('notulen')->nullable();
            $table->text('keputusan')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rapat_tinjauan');
    }
};
