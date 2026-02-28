<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StandarMutu extends Model
{
    use HasFactory;

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

    public function ppepps(): HasMany
    {
        return $this->hasMany(Ppepp::class);
    }
}
