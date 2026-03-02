<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan AMI - {{ $siklus->nama }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            color: #1a1a1a;
            line-height: 1.5;
        }

        /* Kop Surat */
        .kop {
            text-align: center;
            border-bottom: 3px double #1a1a1a;
            padding-bottom: 12px;
            margin-bottom: 20px;
        }

        .kop-logo {
            width: 60px;
            height: 60px;
            margin-bottom: 4px;
        }

        .kop h1 {
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 2px;
        }

        .kop h2 {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
        }

        .kop p {
            font-size: 10px;
            color: #444;
        }

        /* Judul Dokumen */
        .doc-title {
            text-align: center;
            margin: 24px 0 20px;
        }

        .doc-title h2 {
            font-size: 14px;
            text-transform: uppercase;
            text-decoration: underline;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }

        .doc-title p {
            font-size: 11px;
            color: #555;
        }

        /* Info Box */
        .info-box {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 10px 14px;
            margin-bottom: 16px;
            border-radius: 3px;
        }

        .info-box table {
            width: 100%;
        }

        .info-box td {
            padding: 2px 8px 2px 0;
            font-size: 11px;
            vertical-align: top;
        }

        .info-box td.label {
            font-weight: bold;
            width: 150px;
            color: #333;
        }

        /* Tables */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
        }

        table.data-table th {
            background: #2c3e50;
            color: #fff;
            padding: 7px 10px;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: left;
        }

        table.data-table td {
            padding: 6px 10px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 11px;
        }

        table.data-table tr:nth-child(even) {
            background: #f8f9fa;
        }

        table.data-table .text-center {
            text-align: center;
        }

        table.data-table .text-right {
            text-align: right;
        }

        /* Statistik */
        .stats-row {
            margin-bottom: 16px;
        }

        .stats-row table {
            width: 100%;
            border-collapse: collapse;
        }

        .stats-row td {
            text-align: center;
            padding: 10px;
            border: 1px solid #dee2e6;
        }

        .stats-row .stat-number {
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            display: block;
        }

        .stats-row .stat-label {
            font-size: 9px;
            text-transform: uppercase;
            color: #777;
            letter-spacing: 0.5px;
        }

        /* Section */
        .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            color: #2c3e50;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 4px;
            margin: 20px 0 10px;
        }

        /* Badge */
        .badge {
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .badge-mayor {
            background: #fde8e8;
            color: #c53030;
        }

        .badge-minor {
            background: #fefcbf;
            color: #975a16;
        }

        .badge-observasi {
            background: #ebf8ff;
            color: #2b6cb0;
        }

        .badge-selesai {
            background: #c6f6d5;
            color: #276749;
        }

        .badge-berlangsung {
            background: #fefcbf;
            color: #975a16;
        }

        .badge-dijadwalkan {
            background: #ebf8ff;
            color: #2b6cb0;
        }

        /* Footer */
        .footer {
            margin-top: 30px;
            font-size: 10px;
            color: #888;
            text-align: center;
            border-top: 1px solid #dee2e6;
            padding-top: 8px;
        }

        /* TTD */
        .ttd-section {
            margin-top: 40px;
        }

        .ttd-section table {
            width: 100%;
        }

        .ttd-section td {
            text-align: center;
            vertical-align: top;
            padding: 0 20px;
        }

        .ttd-line {
            border-bottom: 1px solid #1a1a1a;
            width: 180px;
            margin: 60px auto 4px;
        }

        .ttd-name {
            font-weight: bold;
            font-size: 11px;
        }

        .ttd-role {
            font-size: 10px;
            color: #555;
        }

        .page-break {
            page-break-after: always;
        }
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
        <h2>Laporan Audit Mutu Internal (AMI)</h2>
        <p>{{ $siklus->nama }} — Tahun {{ $siklus->tahun }} Semester {{ $siklus->semester }}</p>
    </div>

    {{-- Info Siklus --}}
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
                <td>: {{ $siklus->tanggal_mulai?->format('d/m/Y') }} s.d.
                    {{ $siklus->tanggal_selesai?->format('d/m/Y') }}</td>
                <td class="label">Jumlah Audit</td>
                <td>: {{ $siklus->audits->count() }} unit</td>
            </tr>
            @if($siklus->deskripsi)
                <tr>
                    <td class="label">Deskripsi</td>
                    <td colspan="3">: {{ $siklus->deskripsi }}</td>
                </tr>
            @endif
        </table>
    </div>

    {{-- Statistik Ringkas --}}
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
                    <span class="stat-number">{{ $temuanByJenis['mayor'] }}</span>
                    <span class="stat-label">Temuan Mayor</span>
                </td>
                <td>
                    <span class="stat-number">{{ $temuanByJenis['minor'] }}</span>
                    <span class="stat-label">Temuan Minor</span>
                </td>
                <td>
                    <span class="stat-number">{{ $rataSkor ? number_format($rataSkor, 1) : '-' }}</span>
                    <span class="stat-label">Rata-rata Skor</span>
                </td>
            </tr>
        </table>
    </div>

    {{-- Rekap per Unit --}}
    <div class="section-title">A. Rekapitulasi Audit per Unit Kerja</div>
    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 30px;">No</th>
                <th>Unit Kerja</th>
                <th>Auditor</th>
                <th class="text-center">Tanggal</th>
                <th class="text-center">Status</th>
                <th class="text-center">Skor</th>
                <th class="text-center">Temuan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($siklus->audits as $i => $audit)
                <tr>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td>{{ $audit->unitKerja->nama ?? '-' }}</td>
                    <td>{{ $audit->auditor->name ?? '-' }}</td>
                    <td class="text-center">{{ $audit->tanggal_audit?->format('d/m/Y') ?? '-' }}</td>
                    <td class="text-center">
                        <span class="badge badge-{{ $audit->status }}">{{ $audit->status }}</span>
                    </td>
                    <td class="text-center" style="font-weight: bold;">{{ $audit->skor ?? '-' }}</td>
                    <td class="text-center">{{ $audit->temuans->count() }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{-- Detail Temuan --}}
    <div class="section-title">B. Rincian Temuan Audit</div>
    @foreach($siklus->audits as $audit)
        @if($audit->temuans->count() > 0)
            <p style="font-weight: bold; margin: 10px 0 6px; font-size: 11px;">
                {{ $audit->unitKerja->nama ?? 'Unit' }}
                @if($audit->auditor) — Auditor: {{ $audit->auditor->name }} @endif
            </p>
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width: 25px;">No</th>
                        <th>Standar</th>
                        <th class="text-center">Jenis</th>
                        <th>Deskripsi</th>
                        <th>Rekomendasi</th>
                        <th class="text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($audit->temuans as $j => $temuan)
                        <tr>
                            <td class="text-center">{{ $j + 1 }}</td>
                            <td>{{ $temuan->standarMutu->kode ?? '-' }}</td>
                            <td class="text-center">
                                <span class="badge badge-{{ $temuan->jenis }}">{{ $temuan->jenis }}</span>
                            </td>
                            <td>{{ $temuan->deskripsi }}</td>
                            <td>{{ $temuan->rekomendasi ?? '-' }}</td>
                            <td class="text-center">{{ $temuan->status }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    @endforeach

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
        Dokumen ini digenerate oleh Sistem SPMI {{ $institusi['nama'] }} pada {{ now()->translatedFormat('d F Y H:i') }}
        WIB
    </div>
</body>

</html>