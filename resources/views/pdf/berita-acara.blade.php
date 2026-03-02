<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Berita Acara Audit - {{ $audit->unitKerja->nama ?? '' }}</title>
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
            line-height: 1.6;
        }

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
            margin-bottom: 2px;
        }

        .kop p {
            font-size: 10px;
            color: #444;
        }

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

        .info-box {
            border: 1px solid #dee2e6;
            padding: 12px 16px;
            margin-bottom: 18px;
            background: #f8f9fa;
            border-radius: 3px;
        }

        .info-box table {
            width: 100%;
        }

        .info-box td {
            padding: 3px 8px 3px 0;
            font-size: 11px;
            vertical-align: top;
        }

        .info-box td.label {
            font-weight: bold;
            width: 160px;
        }

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
            vertical-align: top;
        }

        table.data-table tr:nth-child(even) {
            background: #f8f9fa;
        }

        .text-center {
            text-align: center;
        }

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

        .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            color: #2c3e50;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 4px;
            margin: 20px 0 10px;
        }

        .catatan-box {
            background: #fffbeb;
            border: 1px solid #fbbf24;
            padding: 10px 14px;
            border-radius: 3px;
            margin: 16px 0;
        }

        .catatan-box p.label {
            font-weight: bold;
            font-size: 10px;
            text-transform: uppercase;
            color: #92400e;
            margin-bottom: 4px;
        }

        .ttd-section {
            margin-top: 40px;
        }

        .ttd-section table {
            width: 100%;
        }

        .ttd-section td {
            text-align: center;
            vertical-align: top;
            width: 50%;
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

        .footer {
            margin-top: 30px;
            font-size: 10px;
            color: #888;
            text-align: center;
            border-top: 1px solid #dee2e6;
            padding-top: 8px;
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
        <h2>Berita Acara Audit Mutu Internal</h2>
        <p>{{ $audit->siklusAudit->nama ?? '' }} — Tahun {{ $audit->siklusAudit->tahun ?? '' }}</p>
    </div>

    {{-- Informasi Audit --}}
    <div class="section-title">I. Informasi Pelaksanaan</div>
    <div class="info-box">
        <table>
            <tr>
                <td class="label">Unit Kerja (Auditee)</td>
                <td>: {{ $audit->unitKerja->nama ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Kepala Unit</td>
                <td>: {{ $audit->unitKerja->kepala_unit ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Auditor</td>
                <td>: {{ $audit->auditor->name ?? 'Belum ditugaskan' }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Pelaksanaan</td>
                <td>: {{ $audit->tanggal_audit?->translatedFormat('d F Y') ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Status Audit</td>
                <td>: {{ ucfirst($audit->status) }}</td>
            </tr>
            <tr>
                <td class="label">Skor / Nilai Akhir</td>
                <td>: <strong>{{ $audit->skor ?? 'Belum dinilai' }}</strong></td>
            </tr>
        </table>
    </div>

    {{-- Daftar Temuan --}}
    <div class="section-title">II. Daftar Temuan Audit</div>
    @if($audit->temuans->count() > 0)
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 25px;">No</th>
                    <th>Standar Mutu</th>
                    <th class="text-center">Jenis</th>
                    <th>Deskripsi Temuan</th>
                    <th>Rekomendasi</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Batas Waktu</th>
                </tr>
            </thead>
            <tbody>
                @foreach($audit->temuans as $i => $temuan)
                    <tr>
                        <td class="text-center">{{ $i + 1 }}</td>
                        <td>{{ $temuan->standarMutu->kode ?? '-' }}<br><small
                                style="color:#666;">{{ $temuan->standarMutu->nama ?? '' }}</small></td>
                        <td class="text-center">
                            <span class="badge badge-{{ $temuan->jenis }}">{{ $temuan->jenis }}</span>
                        </td>
                        <td>{{ $temuan->deskripsi }}</td>
                        <td>{{ $temuan->rekomendasi ?? '-' }}</td>
                        <td class="text-center">{{ ucfirst(str_replace('_', ' ', $temuan->status)) }}</td>
                        <td class="text-center">{{ $temuan->batas_waktu?->format('d/m/Y') ?? '-' }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- Ringkasan Temuan --}}
        <p style="font-size: 11px; margin-top: 8px;">
            <strong>Ringkasan:</strong>
            Total {{ $audit->temuans->count() }} temuan —
            Mayor: {{ $audit->temuans->where('jenis', 'mayor')->count() }},
            Minor: {{ $audit->temuans->where('jenis', 'minor')->count() }},
            Observasi: {{ $audit->temuans->where('jenis', 'observasi')->count() }}
        </p>
    @else
        <p style="font-size: 11px; color: #888; font-style: italic;">Tidak ditemukan temuan audit pada unit kerja ini.</p>
    @endif

    {{-- Catatan Auditor --}}
    @if($audit->catatan)
        <div class="section-title">III. Catatan Auditor</div>
        <div class="catatan-box">
            <p class="label">Catatan:</p>
            <p style="font-size: 11px;">{{ $audit->catatan }}</p>
        </div>
    @endif

    {{-- Tanda Tangan --}}
    <div class="ttd-section">
        <p style="text-align: right; font-size: 10px; margin-bottom: 8px;">
            {{ $institusi['alamat'] }},
            {{ $audit->tanggal_audit?->translatedFormat('d F Y') ?? now()->translatedFormat('d F Y') }}
        </p>
        <table>
            <tr>
                <td>
                    <p style="font-size: 10px;">Auditee (Kepala Unit)</p>
                    <div class="ttd-line"></div>
                    <p class="ttd-name">{{ $audit->unitKerja->kepala_unit ?? '(.................................)' }}
                    </p>
                    <p class="ttd-role">{{ $audit->unitKerja->nama ?? '' }}</p>
                </td>
                <td>
                    <p style="font-size: 10px;">Auditor</p>
                    <div class="ttd-line"></div>
                    <p class="ttd-name">{{ $audit->auditor->name ?? '(.................................)' }}</p>
                    <p class="ttd-role">Auditor Mutu Internal</p>
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