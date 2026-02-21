import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Index({ siklusAudit }) {
    const statusColors = { perencanaan: 'bg-blue-100 text-blue-700', pelaksanaan: 'bg-amber-100 text-amber-700', pelaporan: 'bg-purple-100 text-purple-700', selesai: 'bg-green-100 text-green-700' };
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '', tahun: new Date().getFullYear(), semester: 1,
        tanggal_mulai: '', tanggal_selesai: '', status: 'perencanaan', deskripsi: '',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/siklus-audit', {
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
        <DashboardLayout title="Siklus Audit">
            <Head title="Siklus Audit" />
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm text-gray-500">Kelola siklus/periode audit</h3>
                <button onClick={openCreateModal} className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">+ Tambah Siklus</button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50/50"><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Nama</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Tahun</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Periode</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Status</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Audit</th><th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">
                        {siklusAudit.data.length > 0 ? siklusAudit.data.map(s => (
                            <tr key={s.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{s.nama}</td>
                                <td className="px-6 py-4 text-gray-600">{s.tahun}</td>
                                <td className="px-6 py-4 text-gray-500 text-xs">{s.tanggal_mulai} - {s.tanggal_selesai}</td>
                                <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[s.status]}`}>{s.status}</span></td>
                                <td className="px-6 py-4 text-gray-600">{s.audits_count}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/dashboard/siklus-audit/${s.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Hapus siklus ini?')) router.delete(`/dashboard/siklus-audit/${s.id}`) }} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Belum ada siklus audit.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Tambah Siklus Audit</h2>
                    <form onSubmit={handleCreateSubmit} className="space-y-5">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Siklus *</label><input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="AMI Tahun 2026" />{errors.nama && <p className="mt-1 text-xs text-danger-500">{errors.nama}</p>}</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tahun *</label><input type="number" value={data.tahun} onChange={e => setData('tahun', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Semester *</label><select value={data.semester} onChange={e => setData('semester', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"><option value={1}>Semester 1</option><option value={2}>Semester 2</option></select></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Mulai *</label><input type="date" value={data.tanggal_mulai} onChange={e => setData('tanggal_mulai', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />{errors.tanggal_mulai && <p className="mt-1 text-xs text-danger-500">{errors.tanggal_mulai}</p>}</div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Selesai *</label><input type="date" value={data.tanggal_selesai} onChange={e => setData('tanggal_selesai', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />{errors.tanggal_selesai && <p className="mt-1 text-xs text-danger-500">{errors.tanggal_selesai}</p>}</div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label><select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"><option value="perencanaan">Perencanaan</option><option value="pelaksanaan">Pelaksanaan</option><option value="pelaporan">Pelaporan</option><option value="selesai">Selesai</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label><textarea rows={3} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" /></div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={closeCreateModal} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</button>
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition shadow-lg shadow-primary-500/25">{processing ? 'Menyimpan...' : 'Simpan'}</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

