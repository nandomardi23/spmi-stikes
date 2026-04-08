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
        switch(Number(tingkat)) {
            case 1: return <span className="px-2 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-bold border border-red-100">Level 1 (Ketua)</span>;
            case 2: return <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">Level 2 (Sekretaris)</span>;
            case 3: return <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">Level 3 (Kepala Pusat/Koordinator)</span>;
            default: return tingkat;
        }
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
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">
                        {editingId ? 'Edit Anggota Tim' : 'Tambah Anggota Tim'}
                    </h2>
                    
                    <div className="space-y-5">
                        {/* Nama */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Beserta Gelar</label>
                            <input
                                type="text"
                                className="w-full rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 text-sm"
                                value={data.nama}
                                onChange={e => setData('nama', e.target.value)}
                                placeholder="Cth: Dr. Jhon Doe, M.Kom"
                            />
                            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                        </div>

                        {/* Jabatan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jabatan</label>
                            <input
                                type="text"
                                className="w-full rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 text-sm"
                                value={data.jabatan}
                                onChange={e => setData('jabatan', e.target.value)}
                                placeholder="Cth: Kepala Pusat SPMI"
                            />
                            {errors.jabatan && <p className="text-red-500 text-xs mt-1">{errors.jabatan}</p>}
                        </div>

                        {/* Tingkat */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tingkatan / Level Hierarki</label>
                            <select
                                className="w-full rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 text-sm"
                                value={data.tingkat}
                                onChange={e => setData('tingkat', e.target.value)}
                            >
                                <option value="1">Level 1 (Ketua / Kepala Tertinggi)</option>
                                <option value="2">Level 2 (Wakil / Sekretaris)</option>
                                <option value="3">Level 3 (Kepala Pusat / Koordinator)</option>
                            </select>
                            {errors.tingkat && <p className="text-red-500 text-xs mt-1">{errors.tingkat}</p>}
                        </div>

                        {/* Urutan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Urut Tampil (Opsional)</label>
                            <input
                                type="number"
                                className="w-full rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 text-sm"
                                value={data.urutan}
                                onChange={e => setData('urutan', e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Menentukan siapa yg tampil duluan dari kiri ke kanan jika level sama.</p>
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
