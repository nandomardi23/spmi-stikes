import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const kategoriOptions = [
    { value: 'kebijakan', label: 'Kebijakan' }, { value: 'manual', label: 'Manual' },
    { value: 'standar', label: 'Standar' }, { value: 'formulir', label: 'Formulir' },
    { value: 'sop', label: 'SOP' }, { value: 'laporan', label: 'Laporan' },
    { value: 'bukti', label: 'Bukti' }, { value: 'lainnya', label: 'Lainnya' },
];

export default function Create({ audit_id }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: '', deskripsi: '', kategori: 'kebijakan', nomor_dokumen: '',
        tanggal_dokumen: '', file: null, is_public: false, audit_id: audit_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/dokumen', {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout title="Upload Dokumen">
            <Head title="Upload Dokumen" />
            <div className="max-w-2xl">
                <div className="mb-6"><Link href="/dashboard/dokumen" className="text-sm text-primary-600 hover:text-primary-700">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                                <select value={data.kategori} onChange={(e) => setData('kategori', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                                    {kategoriOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor Dokumen</label>
                                <input type="text" value={data.nomor_dokumen} onChange={(e) => setData('nomor_dokumen', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Dokumen *</label>
                            <input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                            {errors.judul && <p className="mt-1 text-xs text-danger-500">{errors.judul}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                            <textarea rows={3} value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Dokumen</label>
                                <input type="date" value={data.tanggal_dokumen} onChange={(e) => setData('tanggal_dokumen', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">File Dokumen (PDF/DOC/DOCX/JPG/PNG) *</label>
                                <input type="file" onChange={(e) => setData('file', e.target.files[0])} className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                {errors.file && <p className="mt-1 text-xs text-danger-500">{errors.file}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="is_public" checked={data.is_public} onChange={(e) => setData('is_public', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <label htmlFor="is_public" className="text-sm text-gray-700">Publikasikan Dokumen (Dapat dilihat oleh umum di halaman Landing)</label>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition shadow-lg shadow-primary-500/25">
                                {processing ? 'Mengupload...' : 'Upload'}
                            </button>
                            <Link href="/dashboard/dokumen" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

