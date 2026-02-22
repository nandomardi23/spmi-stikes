import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

export default function Index({ unitKerjas, users }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nama: '', kepala_unit: '', jenis: 'prodi', deskripsi: '', kode: ''
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Unit Kerja?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/unit-kerja/${id}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/unit-kerja/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Data unit kerja telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/unit-kerja', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Unit kerja baru telah ditambahkan.', 'success');
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
            nama: item.nama, kepala_unit: item.kepala_unit || '', 
            jenis: item.jenis, deskripsi: item.deskripsi || '', kode: item.kode || ''
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
        <DashboardLayout title="Unit Kerja">
            <Head title="Unit Kerja" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">Master Data</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Kelola unit kerja auditee dan pimpinan unit</p>
                </div>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
                >
                    + Tambah Unit
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Informasi Unit</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Ketua / Kepala</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Kategori</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {unitKerjas.data.length > 0 ? unitKerjas.data.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-100 rounded-xl flex items-center justify-center text-primary-600 font-extrabold text-xs">
                                                {u.kode || 'UK'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{u.nama}</p>
                                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">KODE: {u.kode || '-'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-left font-medium text-gray-700">{u.kepala_unit || '-'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold rounded-lg border border-primary-100 uppercase tracking-tight">
                                            {u.jenis?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(u)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" 
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(u.id)} 
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
                                    <td colSpan={4}>
                                        <EmptyState title="Unit Kerja Belum Tersedia" message="Silakan tambahkan unit kerja baru untuk mengawali data." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={unitKerjas.links} 
                        meta={{
                            from: unitKerjas.from,
                            to: unitKerjas.to,
                            total: unitKerjas.total,
                            per_page: unitKerjas.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/unit-kerja', { per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Unit Kerja' : 'Tambah Unit Kerja Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Unit Kerja <span className="text-danger-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={data.nama} 
                                    onChange={e => setData('nama', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 font-medium" 
                                    placeholder="e.g. Prodi S1 Keperawatan" 
                                />
                                {errors.nama && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.nama}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kode Unit <span className="text-danger-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={data.kode} 
                                    onChange={e => setData('kode', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 font-bold" 
                                    placeholder="e.g. UK-01" 
                                />
                                {errors.kode && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.kode}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori Unit <span className="text-danger-500">*</span></label>
                            <select 
                                value={data.jenis} 
                                onChange={e => setData('jenis', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 font-bold"
                            >
                                <option value="prodi">Program Studi (Prodi)</option>
                                <option value="unit">Fakultas / Pimpinan</option>
                                <option value="bagian">Biro / Bagian</option>
                                <option value="lembaga">Lembaga / Pusat</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Ketua / Kepala Unit</label>
                            <input 
                                type="text" 
                                value={data.kepala_unit} 
                                onChange={e => setData('kepala_unit', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 font-medium" 
                                placeholder="e.g. Dr. Jane Doe, M.Kep"
                            />
                            {errors.kepala_unit && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.kepala_unit}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Singkat</label>
                            <textarea 
                                rows={3} 
                                value={data.deskripsi} 
                                onChange={e => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 font-medium" 
                                placeholder="Berikan deskripsi singkat tentang unit kerja ini..."
                            />
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Unit' : 'Simpan Unit'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

