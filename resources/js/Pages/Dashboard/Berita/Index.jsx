import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Index({ berita, filters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        judul: '', ringkasan: '', konten: '', gambar: null, status: 'draft'
    });

    const handleSearch = e => { 
        e.preventDefault(); 
        router.get('/dashboard/berita', { search }, { preserveState: true }); 
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Berita?',
            text: "Berita yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/berita/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Berita telah berhasil dihapus.', 'success');
                    }
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            // Use POST with _method PUT for file uploads in Laravel/Inertia
            router.post(`/dashboard/berita/${editingData.id}`, {
                _method: 'put',
                ...data,
                forceFormData: true,
            }, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Berita telah diperbarui.', 'success');
                }
            });
        } else {
            post('/dashboard/berita', {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Berita telah diterbitkan.', 'success');
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
            judul: item.judul,
            ringkasan: item.ringkasan || '',
            konten: item.konten,
            gambar: null, // Reset gambar to null so we don't accidentally re-upload old one unless changed
            status: item.status,
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
        <DashboardLayout title="Berita & Pengumuman">
            <Head title="Berita & Pengumuman" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Cari berita..." 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none w-64 transition-all" 
                    />
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                </form>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 transition"
                >
                    + Tulis Berita
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Judul & Ringkasan</th>
                                <th className="px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Tanggal Publish</th>
                                <th className="px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {berita.data.length > 0 ? berita.data.map(b => (
                                <tr key={b.id} className="hover:bg-gray-50/50 transition duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {b.gambar ? (
                                                <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                                                    <img src={`/storage/${b.gambar}`} className="w-full h-full object-cover" alt={b.judul} />
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-dashed border-gray-300">
                                                    <span className="text-[10px] text-gray-400 font-medium">No Image</span>
                                                </div>
                                            )}
                                            <div className="max-w-md">
                                                <p className="font-semibold text-gray-900 line-clamp-1">{b.judul}</p>
                                                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{b.ringkasan || 'Tidak ada ringkasan'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-lg ${b.status === 'published' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-600 border border-gray-100'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${b.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                            {b.status === 'published' ? 'Terpublikasi' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-gray-600 text-[11px] font-medium">
                                            {b.published_at ? new Date(b.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                        </div>
                                        <div className="text-[10px] text-gray-400">
                                            {b.author?.name || 'Administrator'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(b)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200"
                                                title="Edit Berita"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(b.id)} 
                                                className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200"
                                                title="Hapus Berita"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4}>
                                        <EmptyState title="Belum Ada Berita" message="Mulai bagikan informasi terbaru untuk civitas STIKES." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={berita.links} 
                        meta={{
                            from: berita.from,
                            to: berita.to,
                            total: berita.total,
                            per_page: berita.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/berita', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                            {editingData ? 'Edit Berita' : 'Tulis Berita Baru'}
                        </h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Berita <span className="text-danger-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={data.judul} 
                                    onChange={e => setData('judul', e.target.value)} 
                                    placeholder="Masukkan judul yang menarik..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                                />
                                {errors.judul && <p className="mt-1.5 text-[11px] font-medium text-danger-500 ml-1">{errors.judul}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gambar Utama {editingData && <span className="text-[10px] text-gray-400 font-normal">(Kosongkan jika tidak ingin mengubah)</span>}</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer relative overflow-hidden">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <p className="pl-1">Upload gambar berita (Max 2MB)</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 2MB</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={e => setData('gambar', e.target.files[0])} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    />
                                </div>
                                {data.gambar && <p className="mt-2 text-[11px] text-primary-600 font-bold ml-1">✓ Berkas terpilih: {data.gambar.name}</p>}
                                {errors.gambar && <p className="mt-1.5 text-[11px] font-medium text-danger-500 ml-1">{errors.gambar}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ringkasan Berita</label>
                                <textarea 
                                    rows={2} 
                                    value={data.ringkasan} 
                                    onChange={e => setData('ringkasan', e.target.value)} 
                                    placeholder="Penjelasan singkat konten berita..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Konten Utama <span className="text-danger-500">*</span></label>
                                <div className="prose-sm ck-editor-container">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.konten}
                                        onReady={editor => {
                                            editor.editing.view.change(writer => {
                                                writer.setStyle('min-height', '300px', editor.editing.view.document.getRoot());
                                            });
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setData('konten', data);
                                        }}
                                        config={{
                                            placeholder: 'Tuliskan berita lengkap di sini...',
                                            toolbar: [
                                                'heading', '|',
                                                'bold', 'italic', 'underline', 'strikethrough', '|',
                                                'bulletedList', 'numberedList', '|',
                                                'link', 'blockQuote', 'insertTable', '|',
                                                'undo', 'redo'
                                            ]
                                        }}
                                    />
                                </div>
                                {errors.konten && <p className="mt-1.5 text-[11px] font-medium text-danger-500 ml-1">{errors.konten}</p>}
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Status Publikasi</p>
                                    <p className="text-xs text-gray-500">Tentukan apakah berita langsung dipublikasikan atau disimpan sebagai draft.</p>
                                </div>
                                <select 
                                    value={data.status} 
                                    onChange={(e) => setData('status', e.target.value)} 
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    <option value="draft">📁 Draft</option>
                                    <option value="published">🚀 Published</option>
                                </select>
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Berita' : 'Terbitkan Berita'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

