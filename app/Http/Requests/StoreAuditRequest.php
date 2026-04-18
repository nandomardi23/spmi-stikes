<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuditRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Audit::class);
    }

    public function rules(): array
    {
        return [
            'siklus_audit_id' => 'required|exists:siklus_audit,id',
            'unit_kerja_id' => 'required|exists:unit_kerja,id',
            'auditor_id' => 'nullable|exists:users,id',
            'tanggal_audit' => 'nullable|date',
            'status' => 'required|in:dijadwalkan,berlangsung,selesai,dibatalkan',
            'catatan' => 'nullable|string',
        ];
    }
}
