<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengelola extends Model
{
    protected $fillable = [
        'nama',
        'jabatan',
        'tingkat',
        'foto',
        'urutan',
    ];
}
