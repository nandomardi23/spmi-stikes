import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';

const jenisColors = { observasi: 'bg-blue-100 text-blue-700', minor: 'bg-amber-100 text-amber-700', mayor: 'bg-red-100 text-red-700' };
const statusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-amber-100 text-amber-700', closed: 'bg-green-100 text-green-700', verified: 'bg-blue-100 text-blue-700' };

export default function Index({ temuans, audits = [], standarMutu = [], filters, audit_id }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        audit_id: audit_id || '', standar_mutu_id: '', jenis: 'observasi', deskripsi: '', rekomendasi: '', batas_waktu: ''
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/temuan', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            }
        });
    };

    const openCreateModal = () => {
        reset();
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        reset();
    };

    return (
        <DashboardLayout title="Temuan">
            <Head title="Temuan" />
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    {['', 'open', 'in_progress', 'closed'].map(s => (
                        <button key={s} onClick={() => router.get('/dashboard/temuan', { status: s }, { preserveState: true })} className={`px-4 py-2 text-sm rounded-xl transition ${(filters.status || '') === s ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{s || 'Semua'}</button>
                    ))}
                </div>
                <button onClick={openCreateModal} className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25">
                    + Tambah Temuan
                </button>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Unit Kerja</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Jenis</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Deskripsi</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Status</th>
                            <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {temuans.data.length > 0 ? temuans.data.map(t => (
                            <tr key={t.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900 text-xs">{t.audit?.unit_kerja?.nama}</td>
                                <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${jenisColors[t.jenis]}`}>{t.jenis}</span></td>
                                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{t.deskripsi}</td>
                                <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[t.status]}`}>{t.status}</span></td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/dashboard/temuan/${t.id}/edit`} className="text-primary-600 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Hapus?')) router.delete(`/dashboard/temuan/${t.id}`) }} className="text-danger-500 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada temuan.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Tambah Temuan</h2>
                    <form onSubmit={handleCreateSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Audit *</label>
                            <select value={data.audit_id} onChange={e => setData('audit_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500">
                                <option value="">Pilih Audit</option>{audits.map(a => <option key={a.id} value={a.id}>{a.unit_kerja?.nama}</option>)}
                            </select>
                            {errors.audit_id && <p className="mt-1 text-xs text-danger-500">{errors.audit_id}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Standar Mutu</label>
                                <select value={data.standar_mutu_id} onChange={e => setData('standar_mutu_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500">
                                    <option value="">Pilih</option>{standarMutu.map(s => <option key={s.id} value={s.id}>{s.kode} - {s.nama}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenis *</label>
                                <select value={data.jenis} onChange={e => setData('jenis', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500">
                                    <option value="observasi">Observasi</option><option value="minor">Minor</option><option value="mayor">Mayor</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi *</label>
                            <textarea rows={4} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                            {errors.deskripsi && <p className="mt-1 text-xs text-danger-500">{errors.deskripsi}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rekomendasi</label>
                            <textarea rows={3} value={data.rekomendasi} onChange={e => setData('rekomendasi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Batas Waktu</label>
                            <input type="date" value={data.batas_waktu} onChange={e => setData('batas_waktu', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={closeCreateModal} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</button>
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50 transition shadow-lg shadow-primary-500/25">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

