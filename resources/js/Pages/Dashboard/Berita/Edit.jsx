import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Edit({ berita }) {
    const { data, setData, post, processing, errors } = useForm({ _method: 'PUT', judul: berita.judul, ringkasan: berita.ringkasan || '', konten: berita.konten, gambar: null, is_published: berita.is_published });
    const handleSubmit = (e) => { e.preventDefault(); post(`/dashboard/berita/${berita.id}`, { forceFormData: true }); };

    return (
        <DashboardLayout title="Edit Berita"><Head title="Edit Berita" />
            <div className="max-w-3xl">
                <div className="mb-6"><Link href="/dashboard/berita" className="text-sm text-primary-600">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {berita.gambar && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gambar Saat Ini:</label>
                                <img src={`/storage/${berita.gambar}`} alt="Current" className="w-32 h-auto rounded-lg border border-gray-200" />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Berita *</label>
                            <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />
                            {errors.judul && <p className="mt-1 text-xs text-danger-500">{errors.judul}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ganti Gambar (Opsional)</label>
                            <input type="file" accept="image/*" onChange={e => setData('gambar', e.target.files[0])} className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700" />
                            {errors.gambar && <p className="mt-1 text-xs text-danger-500">{errors.gambar}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ringkasan</label>
                            <textarea rows={2} value={data.ringkasan} onChange={e => setData('ringkasan', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Konten (HTML)</label>
                            <textarea rows={10} value={data.konten} onChange={e => setData('konten', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none font-mono" />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="is_published" checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary-600" />
                            <label htmlFor="is_published" className="text-sm text-gray-700">Publikasikan Berita</label>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50">Perbarui Berita</button>
                            <Link href="/dashboard/berita" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

