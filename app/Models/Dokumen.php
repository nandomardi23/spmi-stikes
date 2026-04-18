<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Dokumen extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'dokumen';

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['judul', 'kategori', 'unit_kerja_id', 'is_public'])
            ->logOnlyDirty()
            ->setDescriptionForEvent(fn(string $eventName) => "Dokumen telah di-{$eventName}");
    }

    protected $fillable = [
        'judul',
        'deskripsi',
        'kategori',
        'file_path',
        'file_name',
        'file_size',
        'unit_kerja_id',
        'uploaded_by',
        'standar_mutu_id',
        'is_public',
    ];

    protected $casts = [
        'is_public' => 'boolean',
    ];

    public function unitKerja(): BelongsTo
    {
        return $this->belongsTo(UnitKerja::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function standarMutu(): BelongsTo
    {
        return $this->belongsTo(StandarMutu::class);
    }
}
