import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const kategoriOptions = [
    { value: 'pendidikan', label: 'Pendidikan' }, { value: 'penelitian', label: 'Penelitian' },
    { value: 'pengabdian', label: 'Pengabdian' }, { value: 'tata_kelola', label: 'Tata Kelola' },
    { value: 'kemahasiswaan', label: 'Kemahasiswaan' }, { value: 'sdm', label: 'SDM' },
    { value: 'keuangan', label: 'Keuangan' }, { value: 'sarana_prasarana', label: 'Sarana & Prasarana' },
];

export default function Edit({ standarMutu }) {
    const { data, setData, put, processing, errors } = useForm({
        kode: standarMutu.kode, nama: standarMutu.nama, deskripsi: standarMutu.deskripsi || '',
        kategori: standarMutu.kategori, indikator: standarMutu.indikator || '',
        target: standarMutu.target || '', is_active: standarMutu.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/dashboard/standar-mutu/${standarMutu.id}`);
    };

    return (
        <DashboardLayout title="Edit Standar Mutu">
            <Head title="Edit Standar Mutu" />
            <div className="max-w-2xl">
                <div className="mb-6"><Link href="/dashboard/standar-mutu" className="text-sm text-primary-600 hover:text-primary-700">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kode *</label>
                                <input type="text" value={data.kode} onChange={(e) => setData('kode', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                                {errors.kode && <p className="mt-1 text-xs text-danger-500">{errors.kode}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                                <select value={data.kategori} onChange={(e) => setData('kategori', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none">
                                    {kategoriOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Standar *</label>
                            <input type="text" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                            {errors.nama && <p className="mt-1 text-xs text-danger-500">{errors.nama}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                            <textarea rows={3} value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Indikator</label>
                            <textarea rows={3} value={data.indikator} onChange={(e) => setData('indikator', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Target</label>
                            <input type="text" value={data.target} onChange={(e) => setData('target', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <label htmlFor="is_active" className="text-sm text-gray-700">Standar Aktif</label>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition shadow-lg shadow-primary-500/25">
                                {processing ? 'Menyimpan...' : 'Perbarui'}
                            </button>
                            <Link href="/dashboard/standar-mutu" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

