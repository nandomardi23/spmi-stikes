<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RapatTinjauan extends Model
{
    protected $table = 'rapat_tinjauan';

    protected $fillable = [
        'judul',
        'tanggal',
        'notulen',
        'keputusan',
        'user_id',
        'siklus_audit_id',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function siklusAudit()
    {
        return $this->belongsTo(SiklusAudit::class);
    }
}
