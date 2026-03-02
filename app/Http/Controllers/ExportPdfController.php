<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\SiklusAudit;
use App\Models\RapatTinjauan;
use App\Models\Ppepp;
use App\Models\Setting;
use Barryvdh\DomPDF\Facade\Pdf;

class ExportPdfController extends Controller
{
    /**
     * Helper: ambil data institusi dari settings
     */
    private function getInstitusi(): array
    {
        return [
            'nama' => Setting::getValue('nama_institusi', 'STIKES Hang Tuah Tanjungpinang'),
            'alamat' => Setting::getValue('alamat_institusi', 'Tanjungpinang, Kepulauan Riau'),
            'logo' => Setting::getValue('logo') ? public_path('storage/' . Setting::getValue('logo')) : null,
            'telepon' => Setting::getValue('telepon_institusi', '-'),
            'email' => Setting::getValue('email_institusi', '-'),
            'website' => Setting::getValue('website_institusi', '-'),
        ];
    }

    /**
     * Laporan AMI (Audit Mutu Internal) per siklus audit
     */
    public function laporanAmi(SiklusAudit $siklus)
    {
        $siklus->load([
            'audits.unitKerja',
            'audits.auditor',
            'audits.temuans.standarMutu',
        ]);

        $totalTemuan = $siklus->audits->sum(fn($a) => $a->temuans->count());
        $temuanByJenis = [
            'mayor' => $siklus->audits->sum(fn($a) => $a->temuans->where('jenis', 'mayor')->count()),
            'minor' => $siklus->audits->sum(fn($a) => $a->temuans->where('jenis', 'minor')->count()),
            'observasi' => $siklus->audits->sum(fn($a) => $a->temuans->where('jenis', 'observasi')->count()),
        ];
        $rataSkor = $siklus->audits->where('skor', '>', 0)->avg('skor');

        $pdf = Pdf::loadView('pdf.laporan-ami', [
            'siklus' => $siklus,
            'institusi' => $this->getInstitusi(),
            'totalTemuan' => $totalTemuan,
            'temuanByJenis' => $temuanByJenis,
            'rataSkor' => $rataSkor,
        ]);

        $pdf->setPaper('A4', 'portrait');

        return $pdf->download("Laporan-AMI-{$siklus->nama}.pdf");
    }

    /**
     * Berita Acara Audit per audit (per unit kerja)
     */
    public function beritaAcara(Audit $audit)
    {
        $audit->load([
            'siklusAudit',
            'unitKerja',
            'auditor',
            'temuans.standarMutu',
            'temuans.tindakLanjuts',
        ]);

        $pdf = Pdf::loadView('pdf.berita-acara', [
            'audit' => $audit,
            'institusi' => $this->getInstitusi(),
        ]);

        $pdf->setPaper('A4', 'portrait');
        $unitName = str_replace(' ', '-', $audit->unitKerja->nama ?? 'Unit');

        return $pdf->download("Berita-Acara-{$unitName}.pdf");
    }

    /**
     * Surat Tugas Auditor
     */
    public function suratTugas(Audit $audit)
    {
        $audit->load(['siklusAudit', 'unitKerja', 'auditor']);

        $pdf = Pdf::loadView('pdf.surat-tugas', [
            'audit' => $audit,
            'institusi' => $this->getInstitusi(),
            'tanggalSurat' => now(),
        ]);

        $pdf->setPaper('A4', 'portrait');

        return $pdf->download("Surat-Tugas-Auditor-{$audit->auditor->name}.pdf");
    }

    /**
     * Laporan Rapat Tinjauan Manajemen
     */
    public function laporanRtm(RapatTinjauan $rapatTinjauan)
    {
        $rapatTinjauan->load(['user', 'siklusAudit']);

        $pdf = Pdf::loadView('pdf.laporan-rtm', [
            'rapat' => $rapatTinjauan,
            'institusi' => $this->getInstitusi(),
        ]);

        $pdf->setPaper('A4', 'portrait');
        $judul = str_replace(' ', '-', substr($rapatTinjauan->judul, 0, 40));

        return $pdf->download("Laporan-RTM-{$judul}.pdf");
    }

    /**
     * Laporan Kinerja SPMI per siklus
     */
    public function laporanKinerja(SiklusAudit $siklus)
    {
        $siklus->load([
            'audits.unitKerja',
            'audits.auditor',
            'audits.temuans.standarMutu',
        ]);

        $ppepps = Ppepp::with('standarMutu')->get()->groupBy('tahapan');

        $totalTemuan = $siklus->audits->sum(fn($a) => $a->temuans->count());
        $temuanByStatus = [
            'open' => $siklus->audits->sum(fn($a) => $a->temuans->where('status', 'open')->count()),
            'in_progress' => $siklus->audits->sum(fn($a) => $a->temuans->where('status', 'in_progress')->count()),
            'closed' => $siklus->audits->sum(fn($a) => $a->temuans->where('status', 'closed')->count()),
            'verified' => $siklus->audits->sum(fn($a) => $a->temuans->where('status', 'verified')->count()),
        ];
        $temuanByJenis = [
            'mayor' => $siklus->audits->sum(fn($a) => $a->temuans->where('jenis', 'mayor')->count()),
            'minor' => $siklus->audits->sum(fn($a) => $a->temuans->where('jenis', 'minor')->count()),
            'observasi' => $siklus->audits->sum(fn($a) => $a->temuans->where('jenis', 'observasi')->count()),
        ];
        $rataSkor = $siklus->audits->where('skor', '>', 0)->avg('skor');

        $pdf = Pdf::loadView('pdf.laporan-kinerja', [
            'siklus' => $siklus,
            'institusi' => $this->getInstitusi(),
            'ppepps' => $ppepps,
            'totalTemuan' => $totalTemuan,
            'temuanByStatus' => $temuanByStatus,
            'temuanByJenis' => $temuanByJenis,
            'rataSkor' => $rataSkor,
        ]);

        $pdf->setPaper('A4', 'portrait');

        return $pdf->download("Laporan-Kinerja-SPMI-{$siklus->nama}.pdf");
    }
}
