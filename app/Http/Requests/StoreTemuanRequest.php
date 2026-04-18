<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTemuanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Temuan::class);
    }

    public function rules(): array
    {
        return [
            'audit_id' => 'required|exists:audit,id',
            'standar_mutu_id' => 'nullable|exists:standar_mutu,id',
            'jenis' => 'required|in:observasi,minor,mayor',
            'deskripsi' => 'required|string',
            'rekomendasi' => 'nullable|string',
            'batas_waktu' => 'nullable|date',
        ];
    }
}
