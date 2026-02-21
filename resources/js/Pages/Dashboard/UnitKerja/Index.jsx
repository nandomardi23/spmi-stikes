import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Index({ unitKerjas, users }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '', kepala_unit: '', jenis: 'prodi', deskripsi: '', kode: ''
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/unit-kerja', {
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
        <DashboardLayout title="Unit Kerja">
            <Head title="Unit Kerja" />
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm text-gray-500">Kelola master data unit kerja auditee</h3>
                <button onClick={openCreateModal} className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">+ Tambah Unit</button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Nama Unit</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kepala Unit (Ketua)</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kategori</th>
                            <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {unitKerjas.data.length > 0 ? unitKerjas.data.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{u.nama}</td>
                                <td className="px-6 py-4 text-gray-600">{u.kepala_unit || '-'}</td>
                                <td className="px-6 py-4 text-gray-600 capitalize">{u.jenis?.replace('_', ' ')}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/dashboard/unit-kerja/${u.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Hapus unit kerja ini?')) router.delete(`/dashboard/unit-kerja/${u.id}`) }} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Tidak ada data unit kerja.</td></tr>}
                    </tbody>
                </table>
                {unitKerjas.links && unitKerjas.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1">
                        {unitKerjas.links.map((link, i) => <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />)}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Tambah Unit Kerja</h2>
                    <form onSubmit={handleCreateSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Unit *</label>
                                <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" placeholder="Prodi S1 Keperawatan" />
                                {errors.nama && <p className="mt-1 text-xs text-danger-500">{errors.nama}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kode *</label>
                                <input type="text" value={data.kode} onChange={e => setData('kode', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" placeholder="UK-01" />
                                {errors.kode && <p className="mt-1 text-xs text-danger-500">{errors.kode}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                            <select value={data.jenis} onChange={e => setData('jenis', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500">
                                <option value="prodi">Program Studi (Prodi)</option><option value="unit">Fakultas / Pimpinan</option><option value="bagian">Biro / Bagian</option><option value="lembaga">Lembaga / Pusat</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kepala Unit (Opsional)</label>
                            <input type="text" value={data.kepala_unit} onChange={e => setData('kepala_unit', e.target.value)} placeholder="Nama Kepala Unit" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                            {errors.kepala_unit && <p className="mt-1 text-xs text-danger-500">{errors.kepala_unit}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                            <textarea rows={3} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={closeCreateModal} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</button>
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50">Simpan</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

