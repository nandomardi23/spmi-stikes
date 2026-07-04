// ===== STATUS & JENIS COLOR MAPS =====

/** Warna badge status audit (dijadwalkan, berlangsung, selesai, dibatalkan) */
export const STATUS_COLORS = {
    dijadwalkan: 'bg-blue-100 text-blue-700',
    berlangsung: 'bg-amber-100 text-amber-700',
    selesai: 'bg-green-100 text-green-700',
    dibatalkan: 'bg-red-100 text-red-700',
    open: 'bg-red-100 text-red-700',
    in_progress: 'bg-amber-100 text-amber-700',
    closed: 'bg-green-100 text-green-700',
    verified: 'bg-blue-100 text-blue-700',
};

/** Warna badge jenis temuan (observasi, minor, mayor) */
export const JENIS_COLORS = {
    observasi: 'bg-blue-100 text-blue-700',
    minor: 'bg-amber-100 text-amber-700',
    mayor: 'bg-red-100 text-red-700',
};

/** Warna badge status siklus audit */
export const SIKLUS_STATUS_COLORS = {
    perencanaan: 'bg-blue-100 text-blue-700',
    pelaksanaan: 'bg-amber-100 text-amber-700',
    pelaporan: 'bg-purple-100 text-purple-700',
    selesai: 'bg-green-100 text-green-700',
};

/** Warna badge status tindak lanjut */
export const TINDAK_LANJUT_STATUS_COLORS = {
    diajukan: 'bg-amber-50 text-amber-700 border-amber-200',
    diterima: 'bg-green-50 text-green-700 border-green-200',
    ditolak: 'bg-red-50 text-red-700 border-red-200',
};

// ===== CHART COLORS =====

export const PIE_COLORS_JENIS = ['#ef4444', '#f59e0b', '#3b82f6'];
export const PIE_COLORS_STATUS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6'];

// ===== STANDAR MUTU KATEGORI =====

export const KATEGORI_LABELS = {
    pendidikan: 'Pendidikan', penelitian: 'Penelitian', pengabdian: 'Pengabdian',
    tata_kelola: 'Tata Kelola', kemahasiswaan: 'Kemahasiswaan', sdm: 'SDM',
    keuangan: 'Keuangan', sarana_prasarana: 'Sarana & Prasarana',
};

export const KATEGORI_OPTIONS = [
    { value: 'pendidikan', label: 'Pendidikan' }, { value: 'penelitian', label: 'Penelitian' },
    { value: 'pengabdian', label: 'Pengabdian' }, { value: 'tata_kelola', label: 'Tata Kelola' },
    { value: 'kemahasiswaan', label: 'Kemahasiswaan' }, { value: 'sdm', label: 'SDM' },
    { value: 'keuangan', label: 'Keuangan' }, { value: 'sarana_prasarana', label: 'Sarana & Prasarana' },
];
