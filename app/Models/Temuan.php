<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Temuan extends Model
{
    use HasFactory;

    protected $table = 'temuan';

    protected $fillable = [
        'audit_id',
        'standar_mutu_id',
        'jenis',
        'deskripsi',
        'rekomendasi',
        'status',
        'batas_waktu',
    ];

    protected $casts = [
        'batas_waktu' => 'date',
    ];

    public function audit(): BelongsTo
    {
        return $this->belongsTo(Audit::class);
    }

    public function standarMutu(): BelongsTo
    {
        return $this->belongsTo(StandarMutu::class);
    }

    public function tindakLanjuts(): HasMany
    {
        return $this->hasMany(TindakLanjut::class);
    }
}
