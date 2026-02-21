<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SiklusAudit extends Model
{
    use HasFactory;

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
