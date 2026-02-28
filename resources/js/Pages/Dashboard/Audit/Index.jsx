import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

const statusColors = { dijadwalkan: 'bg-blue-100 text-blue-700', berlangsung: 'bg-amber-100 text-amber-700', selesai: 'bg-green-100 text-green-700', dibatalkan: 'bg-red-100 text-red-700' };

function Index({ audits, siklusAudit = [], unitKerja = [], auditors = [], filters }) {
    const [status, setStatus] = useState(filters.status || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        siklus_audit_id: '', unit_kerja_id: '', auditor_id: '', tanggal_audit: '', status: 'dijadwalkan', catatan: '',
    });

    const handleFilter = (val) => { setStatus(val); router.get('/dashboard/audit', { status: val, siklus: filters.siklus }, { preserveState: true }); };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Audit?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/audit/${id}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/audit/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Data audit telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/audit', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Audit baru telah dijadwalkan.', 'success');
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
            siklus_audit_id: item.siklus_audit_id, unit_kerja_id: item.unit_kerja_id, auditor_id: item.auditor_id || '',
            tanggal_audit: item.tanggal_audit || '', status: item.status, catatan: item.catatan || '',
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
        <>
            <Head title="Audit" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit">
                    {['', 'dijadwalkan', 'berlangsung', 'selesai'].map(s => (
                        <button 
                            key={s} 
                            onClick={() => handleFilter(s)} 
                            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all uppercase tracking-tight ${status === s ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {s || 'Semua'}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
                >
                    + Jadwalkan Audit
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Unit Kerja & Siklus</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Auditor</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Jadwal</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Hasil</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {audits.data.length > 0 ? audits.data.map(a => (
                                <tr key={a.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{a.unit_kerja?.nama}</p>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5">{a.siklus_audit?.nama}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-[10px] font-bold text-primary-600 border border-primary-100 italic">
                                                {a.auditor?.name?.charAt(0) || '-'}
                                            </div>
                                            <span className="font-medium text-gray-700">{a.auditor?.name || 'Belum Ditunjuk'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="whitespace-nowrap">{a.tanggal_audit ? new Date(a.tanggal_audit).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Belum Diatur'}</span>
                                            {a.tanggal_audit && <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Kalender</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[a.status]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${statusColors[a.status]}`}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {a.skor ? (
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-xs font-bold text-green-700 border border-green-100">
                                                    {a.skor}
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Point</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Belum Dinilai</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Link 
                                                href={`/dashboard/audit/${a.id}`} 
                                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition duration-200" 
                                                title="Detail Audit"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </Link>
                                            <button 
                                                onClick={() => openEditModal(a)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" 
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(a.id)} 
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
                                    <td colSpan={6}>
                                        <EmptyState title="Audit Tidak Ditemukan" message="Belum ada jadwal audit atau sesuaikan filter status Anda." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={audits.links} 
                        meta={{
                            from: audits.from,
                            to: audits.to,
                            total: audits.total,
                            per_page: audits.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/audit', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Jadwal Audit' : 'Jadwalkan Audit Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Siklus Audit <span className="text-danger-500">*</span></label>
                                <select 
                                    value={data.siklus_audit_id} 
                                    onChange={e => setData('siklus_audit_id', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                >
                                    <option value="">Pilih Siklus</option>
                                    {siklusAudit.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
                                </select>
                                {errors.siklus_audit_id && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.siklus_audit_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Unit Kerja Auditee <span className="text-danger-500">*</span></label>
                                <select 
                                    value={data.unit_kerja_id} 
                                    onChange={e => setData('unit_kerja_id', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                >
                                    <option value="">Pilih Unit</option>
                                    {unitKerja.map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}
                                </select>
                                {errors.unit_kerja_id && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.unit_kerja_id}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Pilih Auditor</label>
                            <select 
                                value={data.auditor_id} 
                                onChange={e => setData('auditor_id', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium"
                            >
                                <option value="">Pilih Auditor (Boleh menyusul)</option>
                                {auditors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Pelaksanaan</label>
                                <input 
                                    type="date" 
                                    value={data.tanggal_audit} 
                                    onChange={e => setData('tanggal_audit', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Status Audit</label>
                                <select 
                                    value={data.status} 
                                    onChange={e => setData('status', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize"
                                >
                                    <option value="dijadwalkan">Dijadwalkan</option>
                                    <option value="berlangsung">Berlangsung</option>
                                    <option value="selesai">Selesai</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Catatan Perencanaan</label>
                            <textarea 
                                rows={3} 
                                value={data.catatan} 
                                onChange={e => setData('catatan', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium" 
                                placeholder="Opsional: Tambahkan informasi awal atau instruksi untuk auditor..."
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Jadwal' : 'Simpan Jadwal'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Audit">{page}</DashboardLayout>;
export default PersistedIndex;

