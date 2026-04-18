import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';

export default function Index({ pengelolas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nama: '',
        jabatan: '',
        tingkat: '3',
        urutan: '0',
        foto: null,
    });

    const openModal = (pengelola = null) => {
        clearErrors();
        if (pengelola) {
            setEditingId(pengelola.id);
            setData({
                nama: pengelola.nama,
                jabatan: pengelola.jabatan,
                tingkat: pengelola.tingkat.toString(),
                urutan: pengelola.urutan.toString(),
                foto: null,
            });
            setImagePreview(pengelola.foto ? `/storage/${pengelola.foto}` : null);
        } else {
            setEditingId(null);
            reset();
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        clearErrors();
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingId) {
            // Need to use POST with _method=PUT for file uploads in Laravel
            router.post(`/dashboard/pengelola/${editingId}`, {
                _method: 'PUT',
                ...data,
            }, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post('/dashboard/pengelola', {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus anggota tim pengelola ini?')) {
            destroy(`/dashboard/pengelola/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const tingkatLabel = (tingkat) => {
        return (
            <span className="px-2.5 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-bold border border-indigo-100 inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Hierarki Level {tingkat}
            </span>
        );
    };

    return (
        <DashboardLayout title="Tim Pengelola (Struktur Organisasi)">
            <Head title="Tim Pengelola - Dashboard" />

            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Daftar Tim Pengelola SPMI</h2>
                        <p className="text-sm text-gray-500 mt-1">Kelola struktur organisasi yang tampil di Landing Page</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all text-center"
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="shrink-0">Tambah Anggota</span>
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-xl border-b border-gray-100">Personil</th>
                                <th className="px-6 py-4 border-b border-gray-100">Tingkat / Urutan</th>
                                <th className="px-6 py-4 rounded-tr-xl border-b border-gray-100 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pengelolas.data.length > 0 ? (
                                pengelolas.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-primary-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm shrink-0">
                                                    {item.foto ? (
                                                        <img src={`/storage/${item.foto}`} alt={item.nama} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{item.nama}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{item.jabatan}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                {tingkatLabel(item.tingkat)}
                                                <span className="text-xs text-gray-500 font-medium">Urutan Tampil: {item.urutan}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(item)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                        Belum ada data anggota tim pengelola.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <Pagination links={pengelolas.links} />
                </div>
            </div>

            {/* Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={handleSubmit} className="p-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                        {editingId ? 'Edit Anggota Tim' : 'Tambah Anggota Tim'}
                    </h2>
                    <p className="text-sm text-gray-500 mb-8">
                        Lengkapi formulir di bawah ini dengan data yang sesuai untuk struktur tim pengelola.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nama */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap & Gelar <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-10 px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 text-sm font-medium transition-all"
                                        value={data.nama}
                                        onChange={e => setData('nama', e.target.value)}
                                        placeholder="Contoh: Dr. Jhon Doe, M.Kom"
                                    />
                                </div>
                                {errors.nama && <p className="text-red-500 text-[10px] font-bold mt-1.5 uppercase tracking-wide">{errors.nama}</p>}
                            </div>

                            {/* Jabatan */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Jabatan <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-10 px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 text-sm font-medium transition-all"
                                        value={data.jabatan}
                                        onChange={e => setData('jabatan', e.target.value)}
                                        placeholder="Contoh: Kepala Pusat SPMI"
                                    />
                                </div>
                                {errors.jabatan && <p className="text-red-500 text-[10px] font-bold mt-1.5 uppercase tracking-wide">{errors.jabatan}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tingkat */}
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Level Hierarki Organisasi</label>
                                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                                    Menentukan level posisi (Ex: 1 untuk Pimpinan tertinggi, 2 untuk Wakil/Sekretaris, dst). Semakin kecil angka, semakin tinggi posisinya.
                                </p>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 text-sm font-bold text-blue-700 transition-all font-mono"
                                        value={data.tingkat}
                                        onChange={e => setData('tingkat', e.target.value)}
                                        placeholder="1, 2, 3..."
                                    />
                                </div>
                                {errors.tingkat && <p className="text-red-500 text-[10px] font-bold mt-1.5 uppercase tracking-wide">{errors.tingkat}</p>}
                            </div>

                            {/* Urutan */}
                            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Urutan Tampil Horizontal</label>
                                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                                    Penting jika ada beberapa orang di Level Hierarki yang SAMA. Angka lebih kecil akan tampil lebih dulu (dari ujung kiri).
                                </p>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 text-sm font-bold transition-all font-mono"
                                        value={data.urutan}
                                        onChange={e => setData('urutan', e.target.value)}
                                        placeholder="0, 1, 2..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Foto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil (Opsional)</label>
                            <input
                                type="file"
                                id="foto"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-200 overflow-hidden shrink-0">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <label
                                    htmlFor="foto"
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer transition-colors cursor-pointer"
                                >
                                    Pilih Foto
                                </label>
                            </div>
                            {errors.foto && <p className="text-red-500 text-xs mt-1">{errors.foto}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition shadow-lg shadow-primary-500/30 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
