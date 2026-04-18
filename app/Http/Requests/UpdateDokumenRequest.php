<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDokumenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('dokumen'));
    }

    public function rules(): array
    {
        return [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:kebijakan,manual,standar,formulir,sop,laporan,bukti,lainnya',
            'file' => 'nullable|file|max:10240',
            'unit_kerja_id' => 'nullable|exists:unit_kerja,id',
            'standar_mutu_id' => 'nullable|exists:standar_mutu,id',
            'is_public' => 'boolean',
        ];
    }
}
