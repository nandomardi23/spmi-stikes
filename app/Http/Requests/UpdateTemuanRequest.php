<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTemuanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('temuan'));
    }

    public function rules(): array
    {
        return [
            'audit_id' => 'required|exists:audit,id',
            'standar_mutu_id' => 'nullable|exists:standar_mutu,id',
            'jenis' => 'required|in:observasi,minor,mayor',
            'deskripsi' => 'required|string',
            'rekomendasi' => 'nullable|string',
            'status' => 'required|in:open,in_progress,closed,verified',
            'batas_waktu' => 'nullable|date',
        ];
    }
}
