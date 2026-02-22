<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Galeri extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'deskripsi',
        'is_active',
        'uploaded_by',
    ];

    public function images()
    {
        return $this->hasMany(GaleriImage::class, 'galeri_id');
    }

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
