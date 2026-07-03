<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan RTL - {{ $siklus->nama }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; font-size: 11px; color: #1a1a1a; line-height: 1.4; }

        .kop { text-align: center; border-bottom: 3px double #1a1a1a; padding-bottom: 10px; margin-bottom: 15px; }
        .kop-logo { width: 55px; height: 55px; margin-bottom: 4px; }
        .kop h1 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
        .kop p { font-size: 9px; color: #444; }

        .doc-title { text-align: center; margin: 15px 0 15px; }
        .doc-title h2 { font-size: 13px; text-transform: uppercase; text-decoration: underline; letter-spacing: 1px; margin-bottom: 4px; }
        .doc-title p { font-size: 10px; color: #555; }

        .section-title { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 3px; margin: 15px 0 8px; }

        .info-box { border: 1px solid #dee2e6; padding: 10px 14px; margin-bottom: 15px; background: #f8f9fa; border-radius: 3px; }
        .info-box table { width: 100%; }
        .info-box td { padding: 2px 8px 2px 0; font-size: 10px; vertical-align: top; }
        .info-box td.label { font-weight: bold; width: 140px; }

        table.data-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        table.data-table th { background: #2c3e50; color: #fff; padding: 6px 8px; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; border: 1px solid #2c3e50; }
        table.data-table td { padding: 5px 8px; border: 1px solid #dee2e6; font-size: 10px; vertical-align: top; }
        table.data-table tr:nth-child(even) { background: #f8f9fa; }
        .text-center { text-align: center; }

        .badge { padding: 2px 6px; border-radius: 3px; font-size: 8px; font-weight: bold; text-transform: uppercase; border: 1px solid; }
        .badge-diajukan { background: #fffbeb; color: #b45309; border-color: #fde68a; }
        .badge-diterima { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
        .badge-ditolak { background: #fdf2f2; color: #9b1c1c; border-color: #fde8e8; }

        .ttd-section { margin-top: 30px; page-break-inside: avoid; }
        .ttd-section table { width: 100%; }
        .ttd-section td { text-align: center; vertical-align: top; padding: 0 15px; }
        .ttd-line { border-bottom: 1px solid #1a1a1a; width: 160px; margin: 55px auto 4px; }
        .ttd-name { font-weight: bold; font-size: 10px; }
        .ttd-role { font-size: 9px; color: #555; }

        .footer { margin-top: 25px; font-size: 9px; color: #888; text-align: center; border-top: 1px solid #dee2e6; padding-top: 6px; }
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
        <p>Telp: {{ $institusi['telepon'] }} | Email: {{ $institusi['email'] }} | Website: {{ $institusi['website'] }}</p>
    </div>

    {{-- Judul --}}
    <div class="doc-title">
        <h2>Laporan Rencana Tindak Lanjut (RTL) AMI</h2>
        <p>{{ $siklus->nama }} — Tahun {{ $siklus->tahun }} Semester {{ $siklus->semester }}</p>
    </div>

    {{-- Info Siklus --}}
    <div class="info-box">
        <table>
            <tr>
                <td class="label">Nama Siklus</td>
                <td>: {{ $siklus->nama }}</td>
                <td class="label">Status Siklus</td>
                <td>: {{ ucfirst($siklus->status) }}</td>
            </tr>
            <tr>
                <td class="label">Periode Siklus</td>
                <td>: {{ $siklus->tanggal_mulai?->translatedFormat('d F Y') }} s.d. {{ $siklus->tanggal_selesai?->translatedFormat('d F Y') }}</td>
                <td class="label">Total RTL</td>
                <td>: {{ $tindakLanjuts->count() }} RTL</td>
            </tr>
        </table>
    </div>

    {{-- Daftar Tindak Lanjut --}}
    <div class="section-title">Daftar Rencana Tindak Lanjut (RTL)</div>
    @if($tindakLanjuts->count() > 0)
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 30px;" class="text-center">No</th>
                    <th style="width: 130px;">Unit Kerja (Auditee)</th>
                    <th style="width: 140px;">Standar Mutu & Temuan</th>
                    <th>Rencana Tindak Lanjut (RTL)</th>
                    <th style="width: 80px;" class="text-center">Status</th>
                    <th style="width: 100px;">Penanggung Jawab</th>
                    <th style="width: 80px;" class="text-center">Tanggal Input</th>
                </tr>
            </thead>
            <tbody>
                @foreach($tindakLanjuts as $i => $rtl)
                    <tr>
                        <td class="text-center">{{ $i + 1 }}</td>
                        <td>
                            <strong>{{ $rtl->temuan->audit->unitKerja->nama ?? '-' }}</strong><br>
                            <span style="font-size: 8px; color: #555;">Kepala: {{ $rtl->temuan->audit->unitKerja->kepala_unit ?? '-' }}</span>
                        </td>
                        <td>
                            <strong style="color: #2c3e50;">{{ $rtl->temuan->standarMutu->kode ?? '-' }}</strong> - {{ $rtl->temuan->standarMutu->nama ?? '' }}<br>
                            <span style="color: #666; font-style: italic;">Temuan: {{ $rtl->temuan->deskripsi }}</span>
                        </td>
                        <td>{{ $rtl->deskripsi }}</td>
                        <td class="text-center">
                            <span class="badge badge-{{ $rtl->status }}">{{ $rtl->status }}</span>
                        </td>
                        <td>
                            {{ $rtl->user->name ?? '-' }}
                        </td>
                        <td class="text-center">
                            {{ $rtl->created_at?->translatedFormat('d/m/Y') ?? '-' }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p style="font-size: 10px; color: #666; font-style: italic; margin-bottom: 20px;">Tidak ditemukan data Rencana Tindak Lanjut (RTL) untuk siklus audit ini.</p>
    @endif

    {{-- Tanda Tangan --}}
    <div class="ttd-section">
        <table style="width: 100%;">
            <tr>
                <td>
                    <p>Mengetahui,</p>
                    <p style="font-weight: bold;">Lembaga Penjaminan Mutu (LPM)</p>
                    <div class="ttd-line"></div>
                    <p class="ttd-name">(...................................................)</p>
                    <p class="ttd-role">Kepala LPM STIKES Hang Tuah</p>
                </td>
                <td>
                    <p>Tanjungpinang, {{ now()->translatedFormat('d F Y') }}</p>
                    <p style="font-weight: bold;">Ketua STIKES Hang Tuah</p>
                    <div class="ttd-line"></div>
                    <p class="ttd-name">(...................................................)</p>
                    <p class="ttd-role">Ketua STIKES Hang Tuah Tanjungpinang</p>
                </td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Dokumen ini digenerate otomatis oleh Sistem SPMI {{ $institusi['nama'] }} pada {{ now()->translatedFormat('d F Y H:i') }} WIB
    </div>
</body>
</html>
