import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

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

function Index({ standarMutu, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [viewingData, setViewingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        kode: '', nama: '', deskripsi: '', kategori: 'pendidikan',
        indikator: '', target: '', is_active: true,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/standar-mutu', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Standar Mutu?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/standar-mutu/${id}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/standar-mutu/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Standar mutu telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/standar-mutu', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Standar mutu baru telah ditambahkan.', 'success');
                }
            });
        }
    };

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditingData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        clearErrors();
        setEditingData(item);
        setData({
            kode: item.kode, nama: item.nama, deskripsi: item.deskripsi || '',
            kategori: item.kategori, indikator: item.indikator || '',
            target: item.target || '', is_active: item.is_active,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            reset();
            clearErrors();
            setEditingData(null);
        }, 150);
    };

    const openDetailModal = (item) => {
        setViewingData(item);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setTimeout(() => setViewingData(null), 150);
    };

    return (
        <>
            <Head title="Standar Mutu" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Cari standar mutu..." 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64 transition-all" 
                    />
                    <button type="submit" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                    {filters.search && (
                        <Link href="/dashboard/standar-mutu" className="px-4 py-2.5 text-danger-600 text-sm font-medium hover:underline">Reset</Link>
                    )}
                </form>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
                >
                    + Tambah Standar
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Kode</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Nama Standar</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Kategori</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {standarMutu.data.length > 0 ? standarMutu.data.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-100 uppercase tracking-tight">
                                            {s.kode}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{s.nama}</p>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5 truncate max-w-xs">{s.target || 'Tanpa Target'}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium text-gray-600">{kategoriLabels[s.kategori] || s.kategori}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {s.is_active ? 'AKTIF' : 'NON-AKTIF'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button 
                                                onClick={() => openDetailModal(s)} 
                                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition duration-200" 
                                                title="Detail"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => openEditModal(s)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" 
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(s.id)} 
                                                className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200" 
                                                title="Hapus"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5}>
                                        <EmptyState title="Standar Mutu Kosong" message="Belum ada data standar mutu atau sesuaikan kata kunci pencarian Anda." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={standarMutu.links} 
                        meta={{
                            from: standarMutu.from,
                            to: standarMutu.to,
                            total: standarMutu.total,
                            per_page: standarMutu.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/standar-mutu', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">{editingData ? 'Edit Standar Mutu' : 'Tambah Standar Mutu Baru'}</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kode Standar <span className="text-danger-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={data.kode} 
                                    onChange={(e) => setData('kode', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold" 
                                    placeholder="SM-01" 
                                />
                                {errors.kode && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.kode}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori Standar <span className="text-danger-500">*</span></label>
                                <select 
                                    value={data.kategori} 
                                    onChange={(e) => setData('kategori', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                >
                                    {kategoriOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Standar <span className="text-danger-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.nama} 
                                onChange={(e) => setData('nama', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                            />
                            {errors.nama && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.nama}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Singkat</label>
                            <textarea 
                                rows={2} 
                                value={data.deskripsi} 
                                onChange={(e) => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Indikator Kinerja</label>
                            <textarea 
                                rows={2} 
                                value={data.indikator} 
                                onChange={(e) => setData('indikator', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Target Capaian</label>
                            <input 
                                type="text" 
                                value={data.target} 
                                onChange={(e) => setData('target', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                            />
                        </div>

                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    id="is_active" 
                                    checked={data.is_active} 
                                    onChange={(e) => setData('is_active', e.target.checked)} 
                                    className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500" 
                                />
                                <label htmlFor="is_active" className="text-sm font-bold text-gray-800 cursor-pointer">
                                    Aktifkan Standar Mutu
                                    <span className="block text-[10px] font-normal text-gray-400 uppercase tracking-tighter">Standar ini akan muncul dalam instrumen audit</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button 
                                type="button" 
                                onClick={closeModal} 
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition duration-200 text-sm"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition duration-200 shadow-xl shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 text-sm"
                            >
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Standar' : 'Simpan Standar'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Detail Modal */}
            <Modal show={isDetailModalOpen} onClose={closeDetailModal} maxWidth="xl">
                {viewingData && (
                    <div className="p-7">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Detail Standar Mutu</h2>
                                <p className="text-sm text-gray-500">Informasi lengkap terkait standar mutu yang dipilih</p>
                            </div>
                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg mt-1 ${viewingData.is_active ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                {viewingData.is_active ? 'AKTIF' : 'NON-AKTIF'}
                            </span>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-5 shadow-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Kode Standar</h3>
                                    <div className="inline-flex px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100 uppercase tracking-tight">
                                        {viewingData.kode}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Kategori</h3>
                                    <p className="text-sm font-semibold text-gray-900">{kategoriLabels[viewingData.kategori] || viewingData.kategori}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Standar</h3>
                                <p className="text-base font-bold text-gray-900">{viewingData.nama}</p>
                            </div>

                            {viewingData.deskripsi && (
                                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deskripsi Singkat</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{viewingData.deskripsi}</p>
                                </div>
                            )}

                            {viewingData.indikator && (
                                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Indikator Kinerja</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{viewingData.indikator}</p>
                                </div>
                            )}

                            <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                                <h3 className="text-[10px] font-bold text-primary-400 uppercase tracking-wider mb-1.5">Target Capaian</h3>
                                <p className="text-sm font-extrabold text-primary-900">{viewingData.target || 'Tidak ada target khusus'}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={closeDetailModal} 
                                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition duration-200 text-sm shadow-sm"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Standar Mutu">{page}</DashboardLayout>;
export default PersistedIndex;

