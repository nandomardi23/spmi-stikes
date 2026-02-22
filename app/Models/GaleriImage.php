<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriImage extends Model
{
    protected $fillable = ['galeri_id', 'file_path', 'file_name', 'file_size'];

    public function galeri()
    {
        return $this->belongsTo(Galeri::class, 'galeri_id');
    }
}
