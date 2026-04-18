<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class StandarMutu extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'standar_mutu';

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['kode', 'nama', 'kategori', 'is_active'])
            ->logOnlyDirty()
            ->setDescriptionForEvent(fn(string $eventName) => "Standar Mutu telah di-{$eventName}");
    }

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
