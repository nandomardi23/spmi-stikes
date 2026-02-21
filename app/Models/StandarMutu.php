<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StandarMutu extends Model
{
    protected $table = 'standar_mutu';

    protected $fillable = [
        'kode',
        'nama',
        'deskripsi',
        'kategori',
        'indikator',
        'target',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function instrumenAudits(): HasMany
    {
        return $this->hasMany(InstrumenAudit::class);
    }

    public function temuans(): HasMany
    {
        return $this->hasMany(Temuan::class);
    }
}
