import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

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

export default function Index({ dokumens, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors, transform } = useForm({
        judul: '', deskripsi: '', kategori: 'kebijakan', nomor_dokumen: '',
        tanggal_dokumen: '', file: null, is_public: false,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/dokumen', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Dokumen?',
            text: "File dokumen juga akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/dokumen/${id}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            transform((data) => ({ ...data, _method: 'put' }));
            post(`/dashboard/dokumen/${editingData.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Dokumen telah diperbarui.', 'success');
                },
                onFinish: () => transform((data) => data), // reset transform
            });
        } else {
            post('/dashboard/dokumen', {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Dokumen telah diupload.', 'success');
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
            judul: item.judul, deskripsi: item.deskripsi || '', kategori: item.kategori,
            nomor_dokumen: item.nomor_dokumen || '', tanggal_dokumen: item.tanggal_dokumen || '',
            file: null, is_public: item.is_public,
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
        <DashboardLayout title="Dokumen Mutu">
            <Head title="Dokumen Mutu" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Cari dokumen..." 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64 transition-all" 
                    />
                    <button type="submit" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                    {filters.search && (
                        <Link href="/dashboard/dokumen" className="px-4 py-2.5 text-danger-600 text-sm font-medium hover:underline">Reset</Link>
                    )}
                </form>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
                >
                    + Upload Dokumen
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Judul & Informasi</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Kategori</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Publikasi</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Uploader</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {dokumens.data.length > 0 ? dokumens.data.map((d) => (
                                <tr key={d.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{d.judul}</p>
                                        <p className="text-[10px] text-gray-500 font-medium mt-0.5 tracking-tight uppercase">
                                            {d.nomor_dokumen || 'Tanpa Nomor'} • {d.tanggal_dokumen || '-'} • {(d.file_size / 1024).toFixed(0)} KB
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md border border-indigo-100 uppercase tracking-tight">
                                            {kategoriLabels[d.kategori] || d.kategori}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${d.is_public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {d.is_public ? 'PUBLIK' : 'INTERNAL'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600 font-medium text-xs tracking-tight">{d.uploader?.name || '-'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <a 
                                                href={`/dashboard/dokumen/${d.id}/download`} 
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition duration-200" 
                                                title="Download"
                                            >
                                                <ArrowDownTrayIcon className="w-5 h-5" />
                                            </a>
                                            <button 
                                                onClick={() => openEditModal(d)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" 
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(d.id)} 
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
                                        <EmptyState title="Dokumen Tidak Ditemukan" message="Belum ada dokumen yang diupload atau sesuaikan filter pencarian." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={dokumens.links} 
                        meta={{
                            from: dokumens.from,
                            to: dokumens.to,
                            total: dokumens.total,
                            per_page: dokumens.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/dokumen', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Dokumen' : 'Upload Dokumen Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori Dokumen <span className="text-danger-500">*</span></label>
                                <select 
                                    value={data.kategori} 
                                    onChange={(e) => setData('kategori', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                >
                                    {kategoriOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nomor Dokumen</label>
                                <input 
                                    type="text" 
                                    value={data.nomor_dokumen} 
                                    onChange={(e) => setData('nomor_dokumen', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                    placeholder="e.g. 001/SK/LPM/2026"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Dokumen <span className="text-danger-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.judul} 
                                onChange={(e) => setData('judul', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="e.g. Kebijakan Mutu STIKES Surabaya"
                            />
                            {errors.judul && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.judul}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Ringkasan / Deskripsi</label>
                            <textarea 
                                rows={3} 
                                value={data.deskripsi} 
                                onChange={(e) => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="Jelaskan isi singkat dokumen ini..."
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Terbit</label>
                                <input 
                                    type="date" 
                                    value={data.tanggal_dokumen} 
                                    onChange={(e) => setData('tanggal_dokumen', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    File Dokumen (PDF/DOCX) {editingData && <span className="text-[10px] font-normal text-gray-400 ml-1">(Kosongkan jika tidak ubah)</span>}
                                </label>
                                <input 
                                    type="file" 
                                    onChange={(e) => setData('file', e.target.files[0])} 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-extrabold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" 
                                />
                                {errors.file && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.file}</p>}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    id="is_public" 
                                    checked={data.is_public} 
                                    onChange={(e) => setData('is_public', e.target.checked)} 
                                    className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500" 
                                />
                                <label htmlFor="is_public" className="text-sm font-bold text-gray-800 cursor-pointer">
                                    Publikasikan Dokumen
                                    <span className="block text-[10px] font-normal text-gray-400 uppercase tracking-tighter">Dapat diakses oleh pengunjung umum (Public Access)</span>
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Dokumen' : 'Upload Dokumen'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

