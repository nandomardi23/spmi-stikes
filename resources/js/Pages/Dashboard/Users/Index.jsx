import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';

export default function Index({ users, roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/dashboard/users', { search, role }, { preserveState: true });
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
                <Link href="/dashboard/users/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25">+ Tambah Pengguna</Link>
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
        </DashboardLayout>
    );
}

