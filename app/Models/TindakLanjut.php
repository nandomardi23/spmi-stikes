<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TindakLanjut extends Model
{
    protected $table = 'tindak_lanjut';

    protected $fillable = [
        'temuan_id',
        'user_id',
        'deskripsi',
        'bukti_file',
        'status',
        'catatan_reviewer',
    ];

    public function temuan(): BelongsTo
    {
        return $this->belongsTo(Temuan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
