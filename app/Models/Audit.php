<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Audit extends Model
{
    protected $table = 'audit';

    protected $fillable = [
        'siklus_audit_id',
        'unit_kerja_id',
        'auditor_id',
        'tanggal_audit',
        'status',
        'catatan',
        'skor',
    ];

    protected $casts = [
        'tanggal_audit' => 'date',
        'skor' => 'decimal:2',
    ];

    public function siklusAudit(): BelongsTo
    {
        return $this->belongsTo(SiklusAudit::class);
    }

    public function unitKerja(): BelongsTo
    {
        return $this->belongsTo(UnitKerja::class);
    }

    public function auditor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'auditor_id');
    }

    public function temuans(): HasMany
    {
        return $this->hasMany(Temuan::class);
    }

    public function instrumenAudits(): BelongsToMany
    {
        return $this->belongsToMany(InstrumenAudit::class, 'audit_instrumen')
            ->withPivot('skor', 'catatan')
            ->withTimestamps();
    }
}
