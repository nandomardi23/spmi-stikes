import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';

const kategoriLabels = {
    kebijakan: 'Kebijakan', manual: 'Manual', standar: 'Standar',
    formulir: 'Formulir', sop: 'SOP', laporan: 'Laporan', bukti: 'Bukti', lainnya: 'Lainnya',
};

const kategoriOptions = [
    { value: 'kebijakan', label: 'Kebijakan' }, { value: 'manual', label: 'Manual' },
    { value: 'standar', label: 'Standar' }, { value: 'formulir', label: 'Formulir' },
    { value: 'sop', label: 'SOP' }, { value: 'laporan', label: 'Laporan' },
    { value: 'bukti', label: 'Bukti' }, { value: 'lainnya', label: 'Lainnya' },
];

export default function Index({ dokumens, filters }) { // wait, I didn't see unitKerja in props
    const [search, setSearch] = useState(filters.search || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '', deskripsi: '', kategori: 'kebijakan', nomor_dokumen: '',
        tanggal_dokumen: '', file: null, is_public: false, 
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/dokumen', { search }, { preserveState: true });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/dokumen', {
            forceFormData: true,
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            }
        });
    };

    const openCreateModal = () => {
        reset();
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        reset();
    };

    return (
        <DashboardLayout title="Dokumen Mutu">
            <Head title="Dokumen Mutu" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari dokumen..." className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64" />
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                </form>
                <button onClick={openCreateModal} className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">
                    + Upload Dokumen
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Judul</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kategori</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Terbuka</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Uploader</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Ukuran</th>
                            <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {dokumens.data.length > 0 ? dokumens.data.map((d) => (
                            <tr key={d.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">{d.judul}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{d.tanggal_dokumen || '-'}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{kategoriLabels[d.kategori] || d.kategori}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${d.is_public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {d.is_public ? 'Publik' : 'Internal'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{d.uploader?.name || '-'}</td>
                                <td className="px-6 py-4 text-gray-600">{(d.file_size / 1024).toFixed(0)} KB</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <a href={`/dashboard/dokumen/${d.id}/download`} className="text-blue-600 hover:text-blue-700 font-medium">Download</a>
                                    <Link href={`/dashboard/dokumen/${d.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Yakin ingin menghapus dokumen ini?')) router.delete(`/dashboard/dokumen/${d.id}`) }} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Tidak ada data dokumen.</td></tr>
                        )}
                    </tbody>
                </table>
                {dokumens.links && dokumens.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1">
                        {dokumens.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Upload Dokumen</h2>
                    <form onSubmit={handleCreateSubmit} className="space-y-5">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">File Dokumen *</label>
                                <input type="file" onChange={(e) => setData('file', e.target.files[0])} className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                {errors.file && <p className="mt-1 text-xs text-danger-500">{errors.file}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="is_public" checked={data.is_public} onChange={(e) => setData('is_public', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <label htmlFor="is_public" className="text-sm text-gray-700">Publikasikan (Umum)</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={closeCreateModal} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</button>
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition shadow-lg shadow-primary-500/25">
                                {processing ? 'Mengupload...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

