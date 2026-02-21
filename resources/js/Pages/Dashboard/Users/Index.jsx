import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Index({ users, roles = [], unitKerja = [], filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '', roles: [], unit_kerja_id: ''
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/dashboard/users', { search, role }, { preserveState: true });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/users', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            }
        });
    };

    const handleRoleChange = (roleName) => {
        const currentRoles = [...data.roles];
        if (currentRoles.includes(roleName)) {
            setData('roles', currentRoles.filter(r => r !== roleName));
        } else {
            setData('roles', [...currentRoles, roleName]);
        }
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
        <DashboardLayout title="Manajemen Pengguna">
            <Head title="Manajemen Pengguna" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleFilter} className="flex gap-2">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama/email..." className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none w-48" />
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none w-48">
                        <option value="">Semua Role</option>
                        {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                    </select>
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Filter</button>
                </form>
                <button onClick={openCreateModal} className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25">
                    + Tambah Pengguna
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50/50"><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Nama</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Email</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Peran (Role)</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Unit Kerja</th><th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.data.length > 0 ? users.data.map(u => (
                            <tr key={u.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1 flex-wrap">
                                        {u.roles.map(r => <span key={r.id} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg capitalize">{r.name.replace('-', ' ')}</span>)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{u.unit_kerja?.nama || '-'}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/dashboard/users/${u.id}/edit`} className="text-primary-600 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Hapus pengguna?')) router.delete(`/dashboard/users/${u.id}`) }} className="text-danger-500 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada pengguna.</td></tr>}
                    </tbody>
                </table>
                {users.links && users.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1">
                        {users.links.map((link, i) => <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />)}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Tambah Pengguna</h2>
                    <form onSubmit={handleCreateSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                                {errors.name && <p className="mt-1 text-xs text-danger-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                                {errors.email && <p className="mt-1 text-xs text-danger-500">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                                <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                                {errors.password && <p className="mt-1 text-xs text-danger-500">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password *</label>
                                <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Peran (Role) *</label>
                            <div className="flex gap-4 flex-wrap">
                                {roles.map(r => (
                                    <label key={r.id} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={data.roles.includes(r.name)} onChange={() => handleRoleChange(r.name)} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                        <span className="text-sm text-gray-700 capitalize">{r.name.replace('-', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.roles && <p className="mt-1 text-xs text-danger-500">{errors.roles}</p>}
                        </div>
                        {data.roles.includes('auditee') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit Kerja (Wajib untuk Auditee) *</label>
                                <select value={data.unit_kerja_id} onChange={e => setData('unit_kerja_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500">
                                    <option value="">Pilih Unit</option>
                                    {unitKerja.map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}
                                </select>
                                {errors.unit_kerja_id && <p className="mt-1 text-xs text-danger-500">{errors.unit_kerja_id}</p>}
                            </div>
                        )}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={closeCreateModal} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</button>
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition shadow-lg shadow-primary-500/25">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

