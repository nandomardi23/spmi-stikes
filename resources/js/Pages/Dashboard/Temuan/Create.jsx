import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Swal from 'sweetalert2';

export default function Create({ audits, standarMutu, audit_id }) {
    const { data, setData, post, processing, errors } = useForm({
        audit_id: audit_id || '', 
        standar_mutu_id: '', 
        jenis: 'observasi', 
        deskripsi: '', 
        rekomendasi: '', 
        batas_waktu: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/temuan', {
            onSuccess: () => {
                Swal.fire('Berhasil!', 'Temuan telah ditambahkan.', 'success');
            },
        });
    };

    return (
        <DashboardLayout title="Tambah Temuan Baru">
            <Head title="Tambah Temuan Baru" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Tambah Temuan Baru</h2>
                    <p className="text-sm text-gray-500 mt-1">Catat ketidaksesuaian atau observasi dari proses audit</p>
                </div>
                <Link 
                    href={audit_id ? `/dashboard/audit/${audit_id}` : '/dashboard/temuan'} 
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
                >
                    Kembali
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Jadwal Audit <span className="text-danger-500">*</span></label>
                            <select 
                                value={data.audit_id} 
                                onChange={e => setData('audit_id', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                            >
                                <option value="">-- Pilih Pelaksanaan Audit --</option>
                                {audits.map(a => <option key={a.id} value={a.id}>{a.unit_kerja?.nama} - {a.tanggal_audit}</option>)}
                            </select>
                            {errors.audit_id && <p className="mt-1.5 text-xs font-bold text-danger-500">{errors.audit_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Temuan <span className="text-danger-500">*</span></label>
                            <select 
                                value={data.jenis} 
                                onChange={e => setData('jenis', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize"
                            >
                                <option value="observasi">Observasi (Saran/Insight)</option>
                                <option value="minor">Minor (Ketidaksesuaian Kecil)</option>
                                <option value="mayor">Mayor (Ketidaksesuaian Besar)</option>
                            </select>
                            {errors.jenis && <p className="mt-1.5 text-xs font-bold text-danger-500">{errors.jenis}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Standar Terkait (Opsional)</label>
                        <select 
                            value={data.standar_mutu_id} 
                            onChange={e => setData('standar_mutu_id', e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                        >
                            <option value="">-- Pilih Standar Mutu Acuan --</option>
                            {standarMutu.map(s => <option key={s.id} value={s.id}>{s.kode} - {s.nama}</option>)}
                        </select>
                        {errors.standar_mutu_id && <p className="mt-1.5 text-xs font-bold text-danger-500">{errors.standar_mutu_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Ketidaksesuaian / Temuan <span className="text-danger-500">*</span></label>
                        <textarea 
                            rows={4} 
                            value={data.deskripsi} 
                            onChange={e => setData('deskripsi', e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                            placeholder="Jelaskan secara spesifik apa yang ditemukan saat audit..."
                        />
                        {errors.deskripsi && <p className="mt-1.5 text-xs font-bold text-danger-500">{errors.deskripsi}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Rekomendasi Perbaikan (Opsional)</label>
                        <textarea 
                            rows={3} 
                            value={data.rekomendasi} 
                            onChange={e => setData('rekomendasi', e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-primary-700 placeholder:text-gray-400" 
                            placeholder="Tuliskan saran perbaikan atas temuan ini..."
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Batas Waktu Perbaikan / Tenggat Waktu</label>
                        <input 
                            type="date" 
                            value={data.batas_waktu} 
                            onChange={e => setData('batas_waktu', e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700" 
                        />
                        {errors.batas_waktu && <p className="mt-1.5 text-xs font-bold text-danger-500">{errors.batas_waktu}</p>}
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition duration-200 shadow-xl shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 text-sm"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Temuan Baru'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
