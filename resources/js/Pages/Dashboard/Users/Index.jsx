import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

export default function Index({ users, roles = [], unitKerja = [], filters, auth }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '', email: '', password: '', password_confirmation: '', roles: [], unit_kerja_id: ''
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/dashboard/users', { search, role }, { preserveState: true });
    };

    const handleDelete = (user) => {
        if (user.id === auth.user.id) {
            Swal.fire({
                title: 'Gagal!',
                text: 'Anda tidak dapat menghapus akun Anda sendiri.',
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        Swal.fire({
            title: 'Hapus Pengguna?',
            text: `Hapus pengguna ${user.name}? Data yang dihapus tidak dapat dikembalikan!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/users/${user.id}`, {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Pengguna telah berhasil dihapus.', 'success');
                    }
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/users/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Data pengguna telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/users', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Pengguna baru telah ditambahkan.', 'success');
                }
            });
        }
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
        clearErrors();
        setEditingData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        clearErrors();
        setEditingData(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            roles: user.roles.map(r => r.name),
            unit_kerja_id: user.unit_kerja_id || ''
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
        <DashboardLayout title="Manajemen Pengguna">
            <Head title="Manajemen Pengguna" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleFilter} className="flex flex-wrap gap-2">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Cari nama/email..." 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 w-48 transition-all" 
                    />
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 w-48"
                    >
                        <option value="">Semua Role</option>
                        {roles.map(r => <option key={r.id} value={r.name}>{r.name.replace('-', ' ').toUpperCase()}</option>)}
                    </select>
                    <button type="submit" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Filter</button>
                    {filters.search || filters.role ? (
                        <Link href="/dashboard/users" className="px-5 py-2.5 text-danger-600 text-sm font-medium hover:underline">Reset</Link>
                    ) : null}
                </form>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 transition"
                >
                    + Tambah Pengguna
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Informasi Pengguna</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Peran & Unit</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.data.length > 0 ? users.data.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                                                <UserCircleIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{u.name}</p>
                                                <p className="text-xs text-gray-500 font-medium">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1 flex-wrap mb-1.5">
                                            {u.roles.map(r => (
                                                <span key={r.id} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md border border-indigo-100 uppercase">
                                                    {r.name.replace('-', ' ')}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-[11px] text-gray-500">
                                            <span className="font-semibold text-gray-400">Unit:</span> {u.unit_kerja?.nama || '-'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(u)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200"
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(u)} 
                                                disabled={u.id === auth.user.id}
                                                className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200 disabled:opacity-30"
                                                title="Hapus"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3}>
                                        <EmptyState title="Pengguna Tidak Ditemukan" message="Coba sesuaikan filter atau tambahkan pengguna baru." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination links={users.links} />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap <span className="text-danger-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" 
                                    placeholder="e.g. Dr. Budi Santoso"
                                />
                                {errors.name && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Alamat Email <span className="text-danger-500">*</span></label>
                                <input 
                                    type="email" 
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" 
                                    placeholder="budi@stikessurabaya.ac.id"
                                />
                                {errors.email && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Password {editingData && <span className="text-[10px] font-normal text-gray-400 ml-1">(Kosongkan jika tidak ubah)</span>}
                                </label>
                                <input 
                                    type="password" 
                                    value={data.password} 
                                    onChange={e => setData('password', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" 
                                />
                                {errors.password && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Konfirmasi Password</label>
                                <input 
                                    type="password" 
                                    value={data.password_confirmation} 
                                    onChange={e => setData('password_confirmation', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" 
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                            <label className="block text-sm font-extrabold text-gray-800 mb-3">Hak Akses (Role) <span className="text-danger-500">*</span></label>
                            <div className="flex gap-4 flex-wrap">
                                {roles.map(r => (
                                    <label key={r.id} className="flex items-center gap-2.5 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input 
                                                type="checkbox" 
                                                checked={data.roles.includes(r.name)} 
                                                onChange={() => handleRoleChange(r.name)} 
                                                className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer transition-all" 
                                            />
                                        </div>
                                        <span className={`text-[13px] font-bold transition-colors ${data.roles.includes(r.name) ? 'text-primary-700' : 'text-gray-500 group-hover:text-gray-700'} uppercase tracking-tighter`}>
                                            {r.name.replace('-', ' ')}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.roles && <p className="mt-2 text-[10px] font-bold text-danger-500">{errors.roles}</p>}
                        </div>

                        {data.roles.includes('auditee') && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Penempatan Unit Kerja <span className="text-danger-500">*</span></label>
                                <select 
                                    value={data.unit_kerja_id} 
                                    onChange={e => setData('unit_kerja_id', e.target.value)} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold"
                                >
                                    <option value="">Pilih Unit Kerja</option>
                                    {unitKerja.map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}
                                </select>
                                {errors.unit_kerja_id && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.unit_kerja_id}</p>}
                            </div>
                        )}

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
                                {processing ? 'Menyimpan...' : editingData ? 'Perbarui Data' : 'Tambah Pengguna'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

