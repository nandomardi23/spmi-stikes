<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Temuan extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'temuan';

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['audit_id', 'standar_mutu_id', 'jenis', 'deskripsi', 'status', 'batas_waktu'])
            ->logOnlyDirty()
            ->setDescriptionForEvent(fn(string $eventName) => "Temuan telah di-{$eventName}");
    }

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
