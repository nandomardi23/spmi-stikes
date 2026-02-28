<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ppepp extends Model
{
    protected $fillable = [
        'standar_mutu_id',
        'tahapan',
        'deskripsi',
        'dokumen_link',
        'tanggal_pelaksanaan',
    ];

    public function standarMutu()
    {
        return $this->belongsTo(StandarMutu::class);
    }
}
