import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';

const kategoriLabels = {
    pendidikan: 'Pendidikan', penelitian: 'Penelitian', pengabdian: 'Pengabdian',
    tata_kelola: 'Tata Kelola', kemahasiswaan: 'Kemahasiswaan', sdm: 'SDM',
    keuangan: 'Keuangan', sarana_prasarana: 'Sarana & Prasarana',
};

const kategoriOptions = [
    { value: 'pendidikan', label: 'Pendidikan' }, { value: 'penelitian', label: 'Penelitian' },
    { value: 'pengabdian', label: 'Pengabdian' }, { value: 'tata_kelola', label: 'Tata Kelola' },
    { value: 'kemahasiswaan', label: 'Kemahasiswaan' }, { value: 'sdm', label: 'SDM' },
    { value: 'keuangan', label: 'Keuangan' }, { value: 'sarana_prasarana', label: 'Sarana & Prasarana' },
];

export default function Index({ standarMutu, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        kode: '', nama: '', deskripsi: '', kategori: 'pendidikan',
        indikator: '', target: '', is_active: true,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/standar-mutu', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus standar mutu ini?')) {
            router.delete(`/dashboard/standar-mutu/${id}`);
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/standar-mutu', {
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
        <DashboardLayout title="Standar Mutu">
            <Head title="Standar Mutu" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari standar mutu..." className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64" />
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                </form>
                <button onClick={openCreateModal} className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">
                    + Tambah Standar
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kode</th>
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Nama</th>
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kategori</th>
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Status</th>
                                <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {standarMutu.data.length > 0 ? standarMutu.data.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg">{s.kode}</span></td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{s.nama}</td>
                                    <td className="px-6 py-4 text-gray-600">{kategoriLabels[s.kategori] || s.kategori}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {s.is_active ? 'Aktif' : 'Non-aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={`/dashboard/standar-mutu/${s.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                        <button onClick={() => handleDelete(s.id)} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada data standar mutu.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {standarMutu.links && standarMutu.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Menampilkan {standarMutu.from}-{standarMutu.to} dari {standarMutu.total} data</p>
                        <div className="flex gap-1">
                            {standarMutu.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg transition ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Tambah Standar Mutu</h2>
                    <form onSubmit={handleCreateSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kode *</label>
                                <input type="text" value={data.kode} onChange={(e) => setData('kode', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="SM-01" />
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
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={closeCreateModal} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</button>
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition shadow-lg shadow-primary-500/25">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

