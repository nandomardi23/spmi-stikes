import { Head, Link, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';

const statusColors = { dijadwalkan: 'bg-blue-100 text-blue-700', berlangsung: 'bg-amber-100 text-amber-700', selesai: 'bg-green-100 text-green-700', dibatalkan: 'bg-red-100 text-red-700' };
const jenisColors = { observasi: 'bg-blue-100 text-blue-700', minor: 'bg-amber-100 text-amber-700', mayor: 'bg-red-100 text-red-700' };
const temuanStatusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-amber-100 text-amber-700', closed: 'bg-green-100 text-green-700', verified: 'bg-blue-100 text-blue-700' };

function Show({ audit, siklusAudit = [], unitKerja = [], auditors = [] }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        siklus_audit_id: audit.siklus_audit_id || '', 
        unit_kerja_id: audit.unit_kerja_id || '', 
        auditor_id: audit.auditor_id || '',
        tanggal_audit: audit.tanggal_audit || '', 
        status: audit.status || 'dijadwalkan', 
        catatan: audit.catatan || '',
        skor: audit.skor || ''
    });

    const openEditModal = () => {
        clearErrors();
        setData({
            siklus_audit_id: audit.siklus_audit_id || '', 
            unit_kerja_id: audit.unit_kerja_id || '', 
            auditor_id: audit.auditor_id || '',
            tanggal_audit: audit.tanggal_audit || '', 
            status: audit.status || 'dijadwalkan', 
            catatan: audit.catatan || '',
            skor: audit.skor || ''
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setTimeout(() => {
            reset();
            clearErrors();
        }, 150);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(`/dashboard/audit/${audit.id}`, {
            onSuccess: () => {
                closeEditModal();
                Swal.fire('Berhasil!', 'Data audit telah diperbarui.', 'success');
            },
        });
    };

    return (
        <>
            <Head title="Detail Audit" />
            <div className="mb-6"><Link href="/dashboard/audit" className="text-sm text-primary-600 hover:text-primary-700">← Kembali</Link></div>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{audit.unit_kerja?.nama}</h3>
                            <span className={`px-3 py-1 text-sm font-medium rounded-lg ${statusColors[audit.status]}`}>{audit.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-500">Siklus:</span><p className="font-medium text-gray-900">{audit.siklus_audit?.nama}</p></div>
                            <div><span className="text-gray-500">Auditor:</span><p className="font-medium text-gray-900">{audit.auditor?.name || 'Belum ditugaskan'}</p></div>
                            <div><span className="text-gray-500">Tanggal:</span><p className="font-medium text-gray-900">{audit.tanggal_audit ? new Date(audit.tanggal_audit).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</p></div>
                            <div><span className="text-gray-500">Skor:</span><p className="font-medium text-gray-900 text-lg">{audit.skor || '-'}</p></div>
                        </div>
                        {audit.catatan && <div className="mt-4 pt-4 border-t border-gray-100"><span className="text-sm text-gray-500">Catatan:</span><p className="text-sm text-gray-700 mt-1">{audit.catatan}</p></div>}
                    </div>

                    {/* Temuan */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-extrabold text-gray-900">Daftar Temuan <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{audit.temuans?.length || 0}</span></h3>
                            <Link href={`/dashboard/temuan/create?audit_id=${audit.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg hover:bg-primary-100 transition border border-primary-100/50">
                                <span>+ Tambah</span>
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {audit.temuans?.length > 0 ? audit.temuans.map(t => (
                                <div key={t.id} className="px-6 py-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${jenisColors[t.jenis]}`}>{t.jenis}</span>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${temuanStatusColors[t.status]}`}>{t.status}</span>
                                        {t.standar_mutu && <span className="text-xs text-gray-400">{t.standar_mutu.kode}</span>}
                                    </div>
                                    <p className="text-sm text-gray-900">{t.deskripsi}</p>
                                    {t.rekomendasi && <p className="text-xs text-gray-500 mt-1">Rekomendasi: {t.rekomendasi}</p>}
                                </div>
                            )) : <p className="px-6 py-8 text-sm text-gray-400 text-center">Belum ada temuan.</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-extrabold text-gray-900 mb-4 uppercase tracking-wider">Aksi Audit</h3>
                        <div className="space-y-3">
                            <button onClick={openEditModal} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition duration-200 text-sm border border-indigo-100/50">
                                <span>Edit Audit</span>
                            </button>
                            <Link href={`/dashboard/temuan/create?audit_id=${audit.id}`} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-50 text-amber-700 font-bold rounded-xl hover:bg-amber-100 transition duration-200 text-sm border border-amber-100/50">
                                <span>+ Tambah Temuan</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={closeEditModal} maxWidth="2xl">
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">Edit Detail Audit</h2>
                    
                    <form onSubmit={handleEditSubmit} className="space-y-5">
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
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
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
                                    <option value="dibatalkan">Dibatalkan</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-indigo-900 mb-1.5">Catatan Perencanaan</label>
                                <textarea 
                                    rows={2} 
                                    value={data.catatan} 
                                    onChange={e => setData('catatan', e.target.value)} 
                                    className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium" 
                                    placeholder="Opsional: Tambahkan informasi awal atau instruksi untuk auditor..."
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-indigo-900 mb-1.5">Nilai / Skor Akhir (0-100)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    value={data.skor} 
                                    onChange={e => setData('skor', e.target.value)} 
                                    className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-xl text-lg focus:ring-2 focus:ring-indigo-500 outline-none font-extrabold text-indigo-700 placeholder:text-indigo-300 placeholder:font-normal placeholder:text-sm" 
                                    placeholder="Masukkan skor jika sudah selesai"
                                />
                                {errors.skor && <p className="mt-1.5 text-xs font-bold text-danger-500">{errors.skor}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button 
                                type="button" 
                                onClick={closeEditModal} 
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition duration-200 text-sm"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="px-8 py-3 bg-linear-to-br from-indigo-600 to-indigo-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition duration-200 shadow-xl shadow-indigo-500/25 hover:from-indigo-700 hover:to-indigo-800 text-sm"
                            >
                                {processing ? 'Menyimpan...' : 'Perbarui Detail Audit'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}


const PersistedShow = memo(Show);
PersistedShow.layout = page => <DashboardLayout title="Detail Audit">{page}</DashboardLayout>;
export default PersistedShow;

