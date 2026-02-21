<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SiklusAudit extends Model
{
    protected $table = 'siklus_audit';

    protected $fillable = [
        'nama',
        'tahun',
        'semester',
        'tanggal_mulai',
        'tanggal_selesai',
        'status',
        'deskripsi',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
    ];

    public function audits(): HasMany
    {
        return $this->hasMany(Audit::class);
    }
}
