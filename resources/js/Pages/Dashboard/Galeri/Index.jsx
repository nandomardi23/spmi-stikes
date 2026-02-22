import EmptyState from '@/Components/EmptyState';
import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';
import Swal from 'sweetalert2';
import { MagnifyingGlassIcon, PhotoIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Index({ galeris, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        judul: '', deskripsi: '', files: [], is_active: true,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/galeri', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Galeri?',
            text: "Seluruh foto dan data kegiatan ini akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/galeri/${id}`, {
                    onSuccess: () => Swal.fire('Terhapus!', 'Galeri telah dihapus.', 'success')
                });
            }
        });
    };

    const handleDeleteImage = (imageId) => {
        Swal.fire({
            title: 'Hapus Foto?',
            text: "Foto ini akan dihapus permanen dari galeri!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/galeri/image/${imageId}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        // Update local state without closing modal
                        if (editingData) {
                            setEditingData({
                                ...editingData,
                                images: editingData.images.filter(img => img.id !== imageId)
                            });
                        }
                    }
                });
            }
        });
    };

    const removeNewFile = (indexToRemove) => {
        setData('files', data.files.filter((_, index) => index !== indexToRemove));
    };

    const handleFileChange = (e) => {
        setData('files', [...data.files, ...Array.from(e.target.files)]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            post(`/dashboard/galeri/${editingData.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Galeri telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/galeri', {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Kegiatan galeri baru telah ditambahkan.', 'success');
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
            files: [], 
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
                    + Tambah Galeri
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Sampul</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Informasi Galeri</th>
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
                                    <td className="px-6 py-4 text-center cursor-pointer" onClick={() => openEditModal(g)}>
                                        <div className="relative group mx-auto w-24 h-16">
                                            {g.images && g.images.length > 0 ? (
                                                <>
                                                    <img 
                                                        src={`/storage/${g.images[0].file_path}`} 
                                                        alt={g.judul} 
                                                        className="w-full h-full rounded-xl bg-gray-100 object-cover border border-gray-100 shadow-xs group-hover:shadow-md transition duration-300"
                                                    />
                                                    {g.images.length > 1 && (
                                                        <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border-2 border-white shadow-sm">
                                                            +{g.images.length - 1} foto
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                                                    <PhotoIcon className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900 group-hover:text-primary-600 transition">{g.judul}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{g.images?.length || 0} Foto</span>
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
                                        <EmptyState title="Galeri Masih Kosong" message="Belum ada kegiatan/dokumentasi yang diunggah." />
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
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="p-7 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Galeri Kegiatan' : 'Tambah Galeri Baru'}
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
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Singkat</label>
                            <textarea 
                                rows={3} 
                                value={data.deskripsi} 
                                onChange={(e) => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="Berikan deskripsi singkat tentang kegiatan ini..."
                            />
                            {errors.deskripsi && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.deskripsi}</p>}
                        </div>

                        {/* Existing Photos Grid (Edit Mode Only) */}
                        {editingData && editingData.images?.length > 0 && (
                            <div className="pt-4 border-t border-gray-100">
                                <label className="block text-sm font-bold text-gray-700 mb-3">Foto Tersimpan ({editingData.images.length})</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {editingData.images.map(img => (
                                        <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
                                            <img src={`/storage/${img.file_path}`} alt={img.file_name} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleDeleteImage(img.id)}
                                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transform scale-75 group-hover:scale-100 transition"
                                                    title="Hapus Foto"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add New Photos */}
                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                {editingData ? 'Tambah Foto Lagi (Opsional)' : 'Unggah Foto (Bisa Lebih dari Satu) *'}
                            </label>
                            <div className="flex flex-col items-center justify-center w-full">
                                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${errors.files ? 'border-danger-300 bg-danger-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-primary-300'}`}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <PhotoIcon className={`w-8 h-8 mb-3 ${errors.files ? 'text-danger-400' : 'text-gray-400'}`} />
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">Klik atau seret foto ke mari</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*"
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                            {errors.files && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.files}</p>}
                            
                            {/* Preview Queue */}
                            {data.files.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Akan Diupload ({data.files.length} foto):</p>
                                    <div className="space-y-2">
                                        {data.files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2.5 bg-indigo-50/50 border border-indigo-100/50 rounded-lg">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 rounded bg-indigo-100 shrink-0 flex items-center justify-center text-indigo-500">
                                                        <PhotoIcon className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-xs font-semibold text-gray-700 truncate">{file.name}</p>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeNewFile(index)}
                                                    className="p-1 text-gray-400 hover:text-danger-500 hover:bg-danger-50 rounded-md transition"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                            <p className="ml-8 mt-1 text-[10px] text-gray-400 font-medium">Jika dicentang, seluruh foto di kegiatan ini akan langsung terbit.</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button 
                                type="button" 
                                onClick={closeModal} 
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition duration-200 text-sm"
                            >
                                Tutup
                            </button>
                            <button 
                                type="submit" 
                                disabled={processing || (!editingData && data.files.length === 0)} 
                                className="px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition duration-200 shadow-xl shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 text-sm"
                            >
                                {processing ? 'Menyimpan...' : editingData ? 'Perbarui Galeri' : 'Simpan Galeri Baru'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
