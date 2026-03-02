<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Kinerja SPMI - {{ $siklus->nama }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; font-size: 12px; color: #1a1a1a; line-height: 1.5; }

        .kop { text-align: center; border-bottom: 3px double #1a1a1a; padding-bottom: 12px; margin-bottom: 20px; }
        .kop-logo { width: 60px; height: 60px; margin-bottom: 4px; }
        .kop h1 { font-size: 15px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
        .kop p { font-size: 10px; color: #444; }

        .doc-title { text-align: center; margin: 24px 0 20px; }
        .doc-title h2 { font-size: 14px; text-transform: uppercase; text-decoration: underline; letter-spacing: 1px; margin-bottom: 4px; }
        .doc-title p { font-size: 11px; color: #555; }

        .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 4px; margin: 20px 0 10px; }

        .info-box { border: 1px solid #dee2e6; padding: 12px 16px; margin-bottom: 18px; background: #f8f9fa; border-radius: 3px; }
        .info-box table { width: 100%; }
        .info-box td { padding: 3px 8px 3px 0; font-size: 11px; vertical-align: top; }
        .info-box td.label { font-weight: bold; width: 160px; }

        table.data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        table.data-table th { background: #2c3e50; color: #fff; padding: 7px 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; }
        table.data-table td { padding: 6px 10px; border-bottom: 1px solid #e0e0e0; font-size: 11px; vertical-align: top; }
        table.data-table tr:nth-child(even) { background: #f8f9fa; }
        .text-center { text-align: center; }

        .stats-row { margin-bottom: 16px; }
        .stats-row table { width: 100%; border-collapse: collapse; }
        .stats-row td { text-align: center; padding: 10px; border: 1px solid #dee2e6; }
        .stats-row .stat-number { font-size: 18px; font-weight: bold; color: #2c3e50; display: block; }
        .stats-row .stat-label { font-size: 9px; text-transform: uppercase; color: #777; letter-spacing: 0.5px; }

        .badge { padding: 2px 8px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase; }
        .badge-mayor { background: #fde8e8; color: #c53030; }
        .badge-minor { background: #fefcbf; color: #975a16; }
        .badge-observasi { background: #ebf8ff; color: #2b6cb0; }

        .ppepp-table td.tahapan { font-weight: bold; text-transform: uppercase; font-size: 10px; }
        .ppepp-penetapan { color: #1e40af; }
        .ppepp-pelaksanaan { color: #7c3aed; }
        .ppepp-evaluasi { color: #b45309; }
        .ppepp-pengendalian { color: #c2410c; }
        .ppepp-peningkatan { color: #15803d; }

        .ttd-section { margin-top: 40px; }
        .ttd-section table { width: 100%; }
        .ttd-section td { text-align: center; vertical-align: top; padding: 0 20px; }
        .ttd-line { border-bottom: 1px solid #1a1a1a; width: 180px; margin: 60px auto 4px; }
        .ttd-name { font-weight: bold; font-size: 11px; }
        .ttd-role { font-size: 10px; color: #555; }

        .footer { margin-top: 30px; font-size: 10px; color: #888; text-align: center; border-top: 1px solid #dee2e6; padding-top: 8px; }

        .page-break { page-break-after: always; }
    </style>
</head>
<body>
    {{-- Kop Surat --}}
    <div class="kop">
        @if($institusi['logo'] && file_exists($institusi['logo']))
            <img src="{{ $institusi['logo'] }}" class="kop-logo" alt="Logo">
        @endif
        <h1>{{ $institusi['nama'] }}</h1>
        <p>{{ $institusi['alamat'] }}</p>
        <p>Telp: {{ $institusi['telepon'] }} | Email: {{ $institusi['email'] }}</p>
    </div>

    {{-- Judul --}}
    <div class="doc-title">
        <h2>Laporan Kinerja SPMI</h2>
        <p>{{ $siklus->nama }} — Tahun {{ $siklus->tahun }} Semester {{ $siklus->semester }}</p>
    </div>

    {{-- Info Siklus --}}
    <div class="section-title">I. Informasi Siklus Audit</div>
    <div class="info-box">
        <table>
            <tr>
                <td class="label">Nama Siklus</td>
                <td>: {{ $siklus->nama }}</td>
                <td class="label">Status</td>
                <td>: {{ ucfirst($siklus->status) }}</td>
            </tr>
            <tr>
                <td class="label">Periode</td>
                <td>: {{ $siklus->tanggal_mulai?->format('d/m/Y') }} s.d. {{ $siklus->tanggal_selesai?->format('d/m/Y') }}</td>
                <td class="label">Jumlah Audit</td>
                <td>: {{ $siklus->audits->count() }} unit</td>
            </tr>
        </table>
    </div>

    {{-- Statistik --}}
    <div class="section-title">II. Ringkasan Kinerja</div>
    <div class="stats-row">
        <table>
            <tr>
                <td>
                    <span class="stat-number">{{ $siklus->audits->count() }}</span>
                    <span class="stat-label">Unit Diaudit</span>
                </td>
                <td>
                    <span class="stat-number">{{ $totalTemuan }}</span>
                    <span class="stat-label">Total Temuan</span>
                </td>
                <td>
                    <span class="stat-number">{{ $rataSkor ? number_format($rataSkor, 1) : '-' }}</span>
                    <span class="stat-label">Rata-rata Skor</span>
                </td>
            </tr>
        </table>
    </div>

    {{-- Distribusi Temuan --}}
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
            <td style="width: 50%; vertical-align: top; padding-right: 8px;">
                <p style="font-weight: bold; font-size: 10px; text-transform: uppercase; margin-bottom: 6px; color: #2c3e50;">Berdasarkan Jenis:</p>
                <table class="data-table">
                    <tr><td>Mayor</td><td class="text-center" style="font-weight: bold; color: #c53030;">{{ $temuanByJenis['mayor'] }}</td></tr>
                    <tr><td>Minor</td><td class="text-center" style="font-weight: bold; color: #975a16;">{{ $temuanByJenis['minor'] }}</td></tr>
                    <tr><td>Observasi</td><td class="text-center" style="font-weight: bold; color: #2b6cb0;">{{ $temuanByJenis['observasi'] }}</td></tr>
                </table>
            </td>
            <td style="width: 50%; vertical-align: top; padding-left: 8px;">
                <p style="font-weight: bold; font-size: 10px; text-transform: uppercase; margin-bottom: 6px; color: #2c3e50;">Berdasarkan Status:</p>
                <table class="data-table">
                    <tr><td>Open</td><td class="text-center" style="font-weight: bold;">{{ $temuanByStatus['open'] }}</td></tr>
                    <tr><td>In Progress</td><td class="text-center" style="font-weight: bold;">{{ $temuanByStatus['in_progress'] }}</td></tr>
                    <tr><td>Closed</td><td class="text-center" style="font-weight: bold;">{{ $temuanByStatus['closed'] }}</td></tr>
                    <tr><td>Verified</td><td class="text-center" style="font-weight: bold;">{{ $temuanByStatus['verified'] }}</td></tr>
                </table>
            </td>
        </tr>
    </table>

    {{-- Skor per Unit --}}
    <div class="section-title">III. Skor Audit per Unit Kerja</div>
    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 25px;">No</th>
                <th>Unit Kerja</th>
                <th>Auditor</th>
                <th class="text-center">Tanggal</th>
                <th class="text-center">Skor</th>
                <th class="text-center">Temuan</th>
                <th class="text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($siklus->audits->sortByDesc('skor') as $i => $audit)
            <tr>
                <td class="text-center">{{ $i + 1 }}</td>
                <td>{{ $audit->unitKerja->nama ?? '-' }}</td>
                <td>{{ $audit->auditor->name ?? '-' }}</td>
                <td class="text-center">{{ $audit->tanggal_audit?->format('d/m/Y') ?? '-' }}</td>
                <td class="text-center" style="font-weight: bold; font-size: 13px;">{{ $audit->skor ?? '-' }}</td>
                <td class="text-center">{{ $audit->temuans->count() }}</td>
                <td class="text-center">{{ ucfirst($audit->status) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{-- PPEPP --}}
    @if($ppepps->count() > 0)
    <div class="page-break"></div>
    <div class="section-title">IV. Rekaman Siklus PPEPP</div>
    @foreach(['Penetapan', 'Pelaksanaan', 'Evaluasi', 'Pengendalian', 'Peningkatan'] as $tahap)
        @if(isset($ppepps[$tahap]) && $ppepps[$tahap]->count() > 0)
        <p style="font-weight: bold; margin: 10px 0 6px; font-size: 11px;" class="ppepp-{{ strtolower($tahap) }}">
            {{ $tahap }}
        </p>
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 25px;">No</th>
                    <th>Standar Mutu</th>
                    <th>Deskripsi Kegiatan</th>
                    <th class="text-center">Tanggal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($ppepps[$tahap] as $j => $ppepp)
                <tr>
                    <td class="text-center">{{ $j + 1 }}</td>
                    <td>{{ $ppepp->standarMutu->kode ?? '-' }} - {{ $ppepp->standarMutu->nama ?? '' }}</td>
                    <td>{{ $ppepp->deskripsi }}</td>
                    <td class="text-center">{{ $ppepp->tanggal_pelaksanaan ? \Carbon\Carbon::parse($ppepp->tanggal_pelaksanaan)->format('d/m/Y') : '-' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @endif
    @endforeach
    @endif

    {{-- Kesimpulan --}}
    <div class="section-title">{{ $ppepps->count() > 0 ? 'V' : 'IV' }}. Kesimpulan</div>
    <div style="border: 1px solid #dee2e6; padding: 14px 16px; border-radius: 3px; margin-bottom: 16px;">
        <p style="font-size: 11px; text-align: justify;">
            Berdasarkan pelaksanaan Audit Mutu Internal pada siklus <strong>{{ $siklus->nama }}</strong>,
            telah dilakukan audit terhadap <strong>{{ $siklus->audits->count() }}</strong> unit kerja
            dengan rata-rata skor <strong>{{ $rataSkor ? number_format($rataSkor, 1) : '-' }}</strong>.
            Ditemukan total <strong>{{ $totalTemuan }}</strong> temuan yang terdiri dari
            {{ $temuanByJenis['mayor'] }} temuan mayor, {{ $temuanByJenis['minor'] }} temuan minor,
            dan {{ $temuanByJenis['observasi'] }} observasi.
            @if($temuanByStatus['closed'] + $temuanByStatus['verified'] > 0)
            Sebanyak <strong>{{ $temuanByStatus['closed'] + $temuanByStatus['verified'] }}</strong> temuan telah ditutup/diverifikasi.
            @endif
        </p>
    </div>

    {{-- TTD --}}
    <div class="ttd-section">
        <table>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <p style="font-size: 10px;">{{ $institusi['alamat'] }}, {{ now()->translatedFormat('d F Y') }}</p>
                    <p style="font-size: 10px; margin-bottom: 2px;">Ketua SPMI</p>
                    <div class="ttd-line"></div>
                    <p class="ttd-name">(.......................................)</p>
                    <p class="ttd-role">NIP. ................................</p>
                </td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Dokumen ini digenerate oleh Sistem SPMI {{ $institusi['nama'] }} pada {{ now()->translatedFormat('d F Y H:i') }} WIB
    </div>
</body>
</html>
