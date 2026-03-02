<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan RTM - {{ $rapat->judul }}</title>
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

        .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            color: #2c3e50;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 4px;
            margin: 20px 0 10px;
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

        .content-box {
            border: 1px solid #dee2e6;
            padding: 14px 16px;
            margin-bottom: 16px;
            border-radius: 3px;
        }

        .content-box .box-title {
            font-weight: bold;
            font-size: 10px;
            text-transform: uppercase;
            color: #2c3e50;
            margin-bottom: 6px;
            letter-spacing: 0.5px;
        }

        .content-box p {
            font-size: 11px;
            text-align: justify;
            white-space: pre-line;
        }

        .keputusan-box {
            background: #f0fdf4;
            border: 1px solid #86efac;
            padding: 14px 16px;
            margin-bottom: 16px;
            border-radius: 3px;
        }

        .keputusan-box .box-title {
            font-weight: bold;
            font-size: 10px;
            text-transform: uppercase;
            color: #166534;
            margin-bottom: 6px;
            letter-spacing: 0.5px;
        }

        .keputusan-box p {
            font-size: 11px;
            text-align: justify;
            white-space: pre-line;
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
        <h2>Laporan Rapat Tinjauan Manajemen</h2>
        <p>Sistem Penjaminan Mutu Internal (SPMI)</p>
    </div>

    {{-- Informasi Rapat --}}
    <div class="section-title">I. Informasi Rapat</div>
    <div class="info-box">
        <table>
            <tr>
                <td class="label">Judul Rapat</td>
                <td>: {{ $rapat->judul }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Pelaksanaan</td>
                <td>: {{ $rapat->tanggal?->translatedFormat('l, d F Y') ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Penanggung Jawab</td>
                <td>: {{ $rapat->user->name ?? '-' }}</td>
            </tr>
            @if($rapat->siklusAudit)
                <tr>
                    <td class="label">Siklus Audit Terkait</td>
                    <td>: {{ $rapat->siklusAudit->nama }}</td>
                </tr>
            @endif
        </table>
    </div>

    {{-- Notulen --}}
    <div class="section-title">II. Notulen / Isi Rapat</div>
    <div class="content-box">
        <p>{{ $rapat->notulen ?? 'Tidak ada notulen yang dicatat.' }}</p>
    </div>

    {{-- Keputusan --}}
    <div class="section-title">III. Keputusan Rapat</div>
    <div class="keputusan-box">
        <div class="box-title">Keputusan / Rekomendasi:</div>
        <p>{{ $rapat->keputusan ?? 'Tidak ada keputusan yang dicatat.' }}</p>
    </div>

    {{-- Tanda Tangan --}}
    <div class="ttd-section">
        <p style="text-align: right; font-size: 10px; margin-bottom: 8px;">
            {{ $institusi['alamat'] }},
            {{ $rapat->tanggal?->translatedFormat('d F Y') ?? now()->translatedFormat('d F Y') }}
        </p>
        <table>
            <tr>
                <td>
                    <p style="font-size: 10px;">Notulis / PJ Rapat</p>
                    <div class="ttd-line"></div>
                    <p class="ttd-name">{{ $rapat->user->name ?? '(.................................)' }}</p>
                </td>
                <td>
                    <p style="font-size: 10px;">Ketua SPMI</p>
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