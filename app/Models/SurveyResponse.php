<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    protected $fillable = [
        'responden_type',
        'responden_name',
        'responden_email',
        'tahun_akademik',
        'answers',
        'komentar',
    ];

    protected $casts = [
        'answers' => 'array',
    ];
}
