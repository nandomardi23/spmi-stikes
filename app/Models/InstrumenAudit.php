<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class InstrumenAudit extends Model
{
    protected $table = 'instrumen_audit';

    protected $fillable = [
        'standar_mutu_id',
        'pertanyaan',
        'deskripsi',
        'bobot',
        'urutan',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function standarMutu(): BelongsTo
    {
        return $this->belongsTo(StandarMutu::class);
    }

    public function audits(): BelongsToMany
    {
        return $this->belongsToMany(Audit::class, 'audit_instrumen')
            ->withPivot('skor', 'catatan')
            ->withTimestamps();
    }
}
