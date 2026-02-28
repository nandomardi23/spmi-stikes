<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'unit_kerja_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function unitKerja()
    {
        return $this->belongsTo(UnitKerja::class);
    }

    public function audits()
    {
        return $this->hasMany(Audit::class, 'auditor_id');
    }

    public function tindakLanjuts()
    {
        return $this->hasMany(TindakLanjut::class);
    }

    public function rapatTinjauans()
    {
        return $this->hasMany(RapatTinjauan::class);
    }
}
