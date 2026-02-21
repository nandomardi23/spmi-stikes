import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '', 
        deskripsi: '', 
        file: null, 
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/galeri', {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout title="Tambah Dokumentasi Galeri">
            <Head title="Tambah Galeri" />
            <div className="max-w-2xl">
                <div className="mb-6"><Link href="/dashboard/galeri" className="text-sm text-primary-600 hover:text-primary-700">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Kegiatan *</label>
                            <input 
                                type="text" 
                                value={data.judul} 
                                onChange={(e) => setData('judul', e.target.value)} 
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" 
                                required
                            />
                            {errors.judul && <p className="mt-1 text-xs text-danger-500">{errors.judul}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                            <textarea 
                                rows={4} 
                                value={data.deskripsi} 
                                onChange={(e) => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" 
                            />
                            {errors.deskripsi && <p className="mt-1 text-xs text-danger-500">{errors.deskripsi}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Dokumentasi (JPG/PNG/WEBP) *</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setData('file', e.target.files[0])} 
                                className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" 
                                required
                            />
                            {errors.file && <p className="mt-1 text-xs text-danger-500">{errors.file}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="is_active" 
                                checked={data.is_active} 
                                onChange={(e) => setData('is_active', e.target.checked)} 
                                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                            />
                            <label htmlFor="is_active" className="text-sm text-gray-700">Tampilkan di halaman Publik (Aktif)</label>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition shadow-lg shadow-primary-500/25">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <Link href="/dashboard/galeri" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
