<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Surat Tugas Auditor - {{ $audit->auditor->name ?? '' }}</title>
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
            line-height: 1.7;
        }

        .kop {
            text-align: center;
            border-bottom: 3px double #1a1a1a;
            padding-bottom: 12px;
            margin-bottom: 24px;
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
            margin: 28px 0 24px;
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

        .content {
            padding: 0 20px;
        }

        .content p {
            margin-bottom: 10px;
            text-align: justify;
            font-size: 12px;
        }

        .info-table {
            margin: 12px 0 12px 40px;
        }

        .info-table td {
            padding: 2px 8px 2px 0;
            font-size: 12px;
            vertical-align: top;
        }

        .info-table td.label {
            font-weight: normal;
            width: 160px;
        }

        .ttd-section {
            margin-top: 50px;
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
            width: 200px;
            margin: 70px auto 4px;
        }

        .ttd-name {
            font-weight: bold;
            font-size: 11px;
            text-decoration: underline;
        }

        .ttd-role {
            font-size: 10px;
            color: #555;
        }

        .footer {
            margin-top: 40px;
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
        <h2>Surat Tugas</h2>
        <p>Nomor: ......../SPMI/{{ $audit->siklusAudit->tahun ?? now()->year }}/{{ now()->format('m') }}</p>
    </div>

    {{-- Isi Surat --}}
    <div class="content">
        <p>Yang bertanda tangan di bawah ini, Ketua Lembaga Penjaminan Mutu <strong>{{ $institusi['nama'] }}</strong>,
            dengan ini memberikan tugas kepada:</p>

        <table class="info-table">
            <tr>
                <td class="label">Nama</td>
                <td>: <strong>{{ $audit->auditor->name ?? '.....................................' }}</strong></td>
            </tr>
            <tr>
                <td class="label">Jabatan</td>
                <td>: Auditor Mutu Internal</td>
            </tr>
        </table>

        <p>Untuk melaksanakan <strong>Audit Mutu Internal (AMI)</strong> pada:</p>

        <table class="info-table">
            <tr>
                <td class="label">Unit Kerja</td>
                <td>: <strong>{{ $audit->unitKerja->nama ?? '.....................................' }}</strong></td>
            </tr>
            <tr>
                <td class="label">Kepala Unit</td>
                <td>: {{ $audit->unitKerja->kepala_unit ?? '.....................................' }}</td>
            </tr>
            <tr>
                <td class="label">Siklus Audit</td>
                <td>: {{ $audit->siklusAudit->nama ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Pelaksanaan</td>
                <td>: {{ $audit->tanggal_audit?->translatedFormat('d F Y') ?? '.....................................' }}
                </td>
            </tr>
        </table>

        <p>Demikian surat tugas ini diberikan untuk dilaksanakan dengan sebaik-baiknya dan penuh tanggung jawab sesuai
            dengan prosedur Sistem Penjaminan Mutu Internal (SPMI) yang berlaku.</p>
    </div>

    {{-- Tanda Tangan --}}
    <div class="ttd-section">
        <table>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <p style="font-size: 10px; margin-bottom: 2px;">{{ $institusi['alamat'] }},
                        {{ $tanggalSurat->translatedFormat('d F Y') }}</p>
                    <p style="font-size: 10px;">Ketua Lembaga Penjaminan Mutu</p>
                    <div class="ttd-line"></div>
                    <p class="ttd-name">(.......................................)</p>
                    <p class="ttd-role">NIP. ................................</p>
                </td>
            </tr>
        </table>
    </div>

    <p style="font-size: 10px; margin-top: 30px; color: #555;">Tembusan:</p>
    <ol style="font-size: 10px; margin-left: 40px; color: #555;">
        <li>Ketua {{ $institusi['nama'] }}</li>
        <li>Kepala {{ $audit->unitKerja->nama ?? 'Unit Kerja' }}</li>
        <li>Arsip</li>
    </ol>

    <div class="footer">
        Dokumen ini digenerate oleh Sistem SPMI {{ $institusi['nama'] }} pada {{ now()->translatedFormat('d F Y H:i') }}
        WIB
    </div>
</body>

</html>