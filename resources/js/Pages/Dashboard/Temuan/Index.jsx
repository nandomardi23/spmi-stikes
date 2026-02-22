import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

const jenisColors = { observasi: 'bg-blue-100 text-blue-700', minor: 'bg-amber-100 text-amber-700', mayor: 'bg-red-100 text-red-700' };
const statusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-amber-100 text-amber-700', closed: 'bg-green-100 text-green-700', verified: 'bg-blue-100 text-blue-700' };

export default function Index({ temuans, audits = [], standarMutu = [], filters, audit_id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        audit_id: audit_id || '', standar_mutu_id: '', jenis: 'observasi', deskripsi: '', rekomendasi: '', batas_waktu: '', status: 'open'
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Temuan?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/temuan/${id}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/temuan/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Temuan telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/temuan', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Temuan baru telah ditambahkan.', 'success');
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
            audit_id: item.audit_id, standar_mutu_id: item.standar_mutu_id || '', 
            jenis: item.jenis, deskripsi: item.deskripsi, 
            rekomendasi: item.rekomendasi || '', batas_waktu: item.batas_waktu || '',
            status: item.status
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
        <DashboardLayout title="Temuan Audit">
            <Head title="Temuan Audit" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit">
                    {['', 'open', 'in_progress', 'closed'].map(s => (
                        <button 
                            key={s} 
                            onClick={() => router.get('/dashboard/temuan', { status: s }, { preserveState: true })} 
                            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all uppercase tracking-tight ${(filters.status || '') === s ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {s || 'Semua'}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 transition hover:from-primary-700 hover:to-primary-800"
                >
                    + Tambah Temuan
                </button>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Unit Kerja & Audit</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Jenis Temuan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Deskripsi Permasalahan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {temuans.data.length > 0 ? temuans.data.map(t => (
                                <tr key={t.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{t.audit?.unit_kerja?.nama}</p>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5 italic">ID Audit: #{t.audit_id}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${jenisColors[t.jenis]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${jenisColors[t.jenis]}`}>
                                            {t.jenis}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-600 max-w-xs truncate font-medium">{t.deskripsi}</p>
                                        {t.standar_mutu && <p className="text-[10px] text-primary-600 font-bold uppercase mt-1">Standar: {t.standar_mutu.kode}</p>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[t.status]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${statusColors[t.status]}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(t)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" 
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(t.id)} 
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
                                        <EmptyState title="Temuan Belum Tersedia" message="Belum ada data temuan audit yang tercatat." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={temuans.links} 
                        meta={{
                            from: temuans.from,
                            to: temuans.to,
                            total: temuans.total,
                            per_page: temuans.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/temuan', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Temuan Audit' : 'Tambah Temuan Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Pilih Jadwal Audit <span className="text-danger-500">*</span></label>
                            <select 
                                value={data.audit_id} 
                                onChange={e => setData('audit_id', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                            >
                                <option value="">Pilih Audit</option>
                                {audits.map(a => <option key={a.id} value={a.id}>{a.unit_kerja?.nama} - {a.tanggal_audit}</option>)}
                            </select>
                            {errors.audit_id && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.audit_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Standar Terkait</label>
                                <select 
                                    value={data.standar_mutu_id} 
                                    onChange={e => setData('standar_mutu_id', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600"
                                >
                                    <option value="">Pilih Standar</option>
                                    {standarMutu.map(s => <option key={s.id} value={s.id}>{s.kode} - {s.nama}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Jenis Temuan <span className="text-danger-500">*</span></label>
                                <select 
                                    value={data.jenis} 
                                    onChange={e => setData('jenis', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize"
                                >
                                    <option value="observasi">Observasi</option>
                                    <option value="minor">Minor</option>
                                    <option value="mayor">Mayor</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Ketidaksesuaian <span className="text-danger-500">*</span></label>
                            <textarea 
                                rows={4} 
                                value={data.deskripsi} 
                                onChange={e => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="Jelaskan secara detail temuan atau ketidaksesuaian yang ditemukan..."
                            />
                            {errors.deskripsi && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.deskripsi}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Rekomendasi Perbaikan</label>
                            <textarea 
                                rows={3} 
                                value={data.rekomendasi} 
                                onChange={e => setData('rekomendasi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-primary-700" 
                                placeholder="Masukan saran atau tindakan perbaikan yang direkomendasikan..."
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Batas Waktu Perbaikan</label>
                                <input 
                                    type="date" 
                                    value={data.batas_waktu} 
                                    onChange={e => setData('batas_waktu', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600" 
                                />
                            </div>
                            {editingData && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Status Penyelesaian</label>
                                    <select 
                                        value={data.status || ''} 
                                        onChange={e => setData('status', e.target.value)} 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize"
                                    >
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="verified">Verified</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            )}
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Temuan' : 'Simpan Temuan'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

