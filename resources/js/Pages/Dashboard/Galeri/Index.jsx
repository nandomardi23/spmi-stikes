import EmptyState from '@/Components/EmptyState';
import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';

export default function Index({ galeris, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        judul: '', deskripsi: '', file: null, is_active: true,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/galeri', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Dokumentasi?',
            text: "Foto dan data dokumentasi akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/galeri/${id}`, {
                    onSuccess: () => Swal.fire('Terhapus!', 'Dokumentasi telah dihapus.', 'success')
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            post(`/dashboard/galeri/${editingData.id}`, {
                _method: 'put',
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Dokumentasi telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/galeri', {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Dokumentasi baru telah ditambahkan.', 'success');
                },
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
            judul: item.judul, 
            deskripsi: item.deskripsi || '', 
            file: null, 
            is_active: item.is_active,
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

    return (
        <DashboardLayout title="Galeri Dokumentasi">
            <Head title="Galeri Dokumentasi" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm sm:w-80">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder="Cari dokumentasi..." 
                            className="w-full pl-9 pr-4 py-2 text-sm bg-transparent border-none focus:ring-0 placeholder:text-gray-400 font-medium" 
                        />
                    </div>
                </form>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 flex items-center gap-2"
                >
                    <PhotoIcon className="w-4 h-4" />
                    + Tambah Dokumentasi
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Gambar</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Informasi Dokumentasi</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left hidden md:table-cell">Deskripsi</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {galeris.data.length > 0 ? galeris.data.map((g) => (
                                <tr key={g.id} className="hover:bg-gray-50/50 transition duration-200">
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${g.is_active ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                            {g.is_active ? 'Publik' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative group flex justify-center">
                                            <img 
                                                src={`/storage/${g.file_path}`} 
                                                alt={g.judul} 
                                                className="w-20 h-14 rounded-xl bg-gray-100 object-cover border border-gray-100 shadow-xs group-hover:shadow-md transition duration-300"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900 group-hover:text-primary-600 transition">{g.judul}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{(g.file_size / 1024).toFixed(0)} KB</span>
                                            <span className="text-[10px] text-gray-300">•</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{new Date(g.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate hidden md:table-cell font-medium italic">
                                        {g.deskripsi || 'Tidak ada deskripsi'}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(g)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" 
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(g.id)} 
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
                                        <EmptyState title="Galeri Masih Kosong" message="Belum ada foto dokumentasi kegiatan yang diunggah." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={galeris.links} 
                        meta={{
                            from: galeris.from,
                            to: galeris.to,
                            total: galeris.total,
                            per_page: galeris.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/galeri', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Dokumentasi' : 'Tambah Dokumentasi Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Kegiatan <span className="text-danger-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.judul} 
                                onChange={(e) => setData('judul', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="e.g. Workshop SPMI Tahun 2026"
                                required
                            />
                            {errors.judul && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.judul}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi / Keterangan</label>
                            <textarea 
                                rows={4} 
                                value={data.deskripsi} 
                                onChange={(e) => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="Berikan deskripsi singkat tentang dokumentasi ini..."
                            />
                            {errors.deskripsi && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.deskripsi}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                {editingData ? 'Ganti Foto Dokumentasi (Opsional)' : 'Foto Dokumentasi (JPG/PNG/WEBP) *'}
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${errors.file ? 'border-danger-300 bg-danger-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-primary-300'}`}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <PhotoIcon className={`w-8 h-8 mb-3 ${errors.file ? 'text-danger-400' : 'text-gray-400'}`} />
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">
                                            {data.file ? data.file.name : 'Klik atau seret foto ke sini'}
                                        </p>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => setData('file', e.target.files[0])} 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                            {errors.file && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.file}</p>}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    id="is_active" 
                                    checked={data.is_active} 
                                    onChange={(e) => setData('is_active', e.target.checked)} 
                                    className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                                />
                                <label htmlFor="is_active" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan di Halaman Galeri Publik</label>
                            </div>
                            <p className="ml-8 mt-1 text-[10px] text-gray-400 font-medium">Jika dicentang, dokumentasi akan langsung dapat dilihat oleh pengunjung umum.</p>
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Dokumentasi' : 'Simpan Dokumentasi'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
