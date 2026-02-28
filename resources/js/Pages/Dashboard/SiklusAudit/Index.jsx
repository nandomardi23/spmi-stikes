import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

function Index({ siklusAudit }) {
    const statusColors = { perencanaan: 'bg-blue-100 text-blue-700', pelaksanaan: 'bg-amber-100 text-amber-700', pelaporan: 'bg-purple-100 text-purple-700', selesai: 'bg-green-100 text-green-700' };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [viewingData, setViewingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nama: '', tahun: new Date().getFullYear(), semester: 1,
        tanggal_mulai: '', tanggal_selesai: '', status: 'perencanaan', deskripsi: '',
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Siklus Audit?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/siklus-audit/${id}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/siklus-audit/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Siklus audit telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/siklus-audit', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Siklus audit baru telah ditambahkan.', 'success');
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
            nama: item.nama, tahun: item.tahun, semester: item.semester,
            tanggal_mulai: item.tanggal_mulai, tanggal_selesai: item.tanggal_selesai,
            status: item.status, deskripsi: item.deskripsi || '',
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
        <DashboardLayout title="Siklus Audit">
            <Head title="Siklus Audit" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">Master Data</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Kelola siklus dan periode pelaksanaan audit mutul internal</p>
                </div>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
                >
                    + Tambah Siklus
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Periode & Nama Siklus</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Tahun / Semester</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Total Audit</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {siklusAudit.data.length > 0 ? siklusAudit.data.map(s => (
                                <tr key={s.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-linear-to-br from-indigo-50 to-indigo-100 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-extrabold text-xs">
                                                {s.tahun}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{s.nama}</p>
                                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5">
                                                    {s.tanggal_mulai ? new Date(s.tanggal_mulai).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'} - {s.tanggal_selesai ? new Date(s.tanggal_selesai).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <p className="font-bold text-gray-700 text-xs">TA {s.tahun}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Semester {s.semester}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[s.status]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${statusColors[s.status]}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-gray-900 text-xs">{s.audits_count}</span>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Unit</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
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
                                        <EmptyState title="Siklus Audit Belum Tersedia" message="Belum ada periode audit yang dibuat. Silakan tambahkan siklus baru." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={siklusAudit.links} 
                        meta={{
                            from: siklusAudit.from,
                            to: siklusAudit.to,
                            total: siklusAudit.total,
                            per_page: siklusAudit.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/siklus-audit', { per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Siklus Audit' : 'Tambah Siklus Audit Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Siklus Audit <span className="text-danger-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.nama} 
                                onChange={e => setData('nama', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="e.g. AMI Tahun Akademik 2025/2026" 
                            />
                            {errors.nama && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.nama}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tahun <span className="text-danger-500">*</span></label>
                                <input 
                                    type="number" 
                                    value={data.tahun} 
                                    onChange={e => setData('tahun', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold" 
                                />
                                {errors.tahun && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.tahun}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Semester <span className="text-danger-500">*</span></label>
                                <select 
                                    value={data.semester} 
                                    onChange={e => setData('semester', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                >
                                    <option value={1}>Semester Ganjil (1)</option>
                                    <option value={2}>Semester Genap (2)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Mulai <span className="text-danger-500">*</span></label>
                                <input 
                                    type="date" 
                                    value={data.tanggal_mulai} 
                                    onChange={e => setData('tanggal_mulai', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600" 
                                />
                                {errors.tanggal_mulai && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.tanggal_mulai}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Selesai <span className="text-danger-500">*</span></label>
                                <input 
                                    type="date" 
                                    value={data.tanggal_selesai} 
                                    onChange={e => setData('tanggal_selesai', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600" 
                                />
                                {errors.tanggal_selesai && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.tanggal_selesai}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Status Pelaksanaan</label>
                            <select 
                                value={data.status} 
                                onChange={e => setData('status', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize"
                            >
                                <option value="perencanaan">Perencanaan</option>
                                <option value="pelaksanaan">Pelaksanaan</option>
                                <option value="pelaporan">Pelaporan</option>
                                <option value="selesai">Selesai</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Catatan / Deskripsi</label>
                            <textarea 
                                rows={3} 
                                value={data.deskripsi} 
                                onChange={e => setData('deskripsi', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="Opsional: Tambahkan informasi tambahan tentang siklus ini..."
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Siklus' : 'Simpan Siklus'}
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
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Detail Siklus Audit</h2>
                                <p className="text-sm text-gray-500">Informasi lengkap terkait siklus audit ini</p>
                            </div>
                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase tracking-tight border mt-1 ${statusColors[viewingData.status]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${statusColors[viewingData.status]}`}>
                                {viewingData.status}
                            </span>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-5 shadow-sm">
                            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Siklus</h3>
                                <p className="text-base font-bold text-gray-900">{viewingData.nama}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tahun Akademik</h3>
                                    <div className="inline-flex px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                                        {viewingData.tahun}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Semester</h3>
                                    <p className="text-sm font-semibold text-gray-900">Semester {viewingData.semester}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tanggal Mulai</h3>
                                    <p className="text-sm font-semibold text-gray-900">{viewingData.tanggal_mulai ? new Date(viewingData.tanggal_mulai).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tanggal Selesai</h3>
                                    <p className="text-sm font-semibold text-gray-900">{viewingData.tanggal_selesai ? new Date(viewingData.tanggal_selesai).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</p>
                                </div>
                            </div>

                            {viewingData.deskripsi && (
                                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deskripsi / Catatan</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{viewingData.deskripsi}</p>
                                </div>
                            )}
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
        </DashboardLayout>
    );
}

export default memo(Index);
