import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

function Index({ roles, permissions = [], filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        permissions: []
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/dashboard/roles', { search }, { preserveState: true });
    };

    const handleDelete = (role) => {
        if (role.name === 'super-admin') {
            Swal.fire('Gagal!', 'Role super-admin tidak dapat dihapus.', 'error');
            return;
        }

        Swal.fire({
            title: 'Hapus Role?',
            text: `Hapus role ${role.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/roles/${role.id}`, {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Role telah berhasil dihapus.', 'success');
                    }
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/roles/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Role telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/roles', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Role baru telah ditambahkan.', 'success');
                }
            });
        }
    };

    const handlePermissionChange = (permName) => {
        const currentPerms = [...data.permissions];
        if (currentPerms.includes(permName)) {
            setData('permissions', currentPerms.filter(p => p !== permName));
        } else {
            setData('permissions', [...currentPerms, permName]);
        }
    };

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditingData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (role) => {
        clearErrors();
        setEditingData(role);
        setData({
            name: role.name,
            permissions: role.permissions.map(p => p.name)
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

    // Group permissions by prefix for better UI
    const groupedPermissions = permissions.reduce((acc, perm) => {
        const prefix = perm.name.split('.')[0] || 'Lainnya';
        if (!acc[prefix]) acc[prefix] = [];
        acc[prefix].push(perm);
        return acc;
    }, {});

    return (
        <DashboardLayout title="Manajemen Role">
            <Head title="Manajemen Role" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleFilter} className="flex flex-wrap gap-2">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Cari role..." 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 w-64 transition-all" 
                    />
                    <button type="submit" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Filter</button>
                    {filters.search ? (
                        <Link href="/dashboard/roles" className="px-5 py-2.5 text-danger-600 text-sm font-medium hover:underline">Reset</Link>
                    ) : null}
                </form>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 transition"
                >
                    + Tambah Role
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Nama Role</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Permission</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {roles.data.length > 0 ? roles.data.map(r => (
                                <tr key={r.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                <UserGroupIcon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-900 uppercase tracking-tight">{r.name.replace('-', ' ')}</span>
                                                <p className="text-[10px] text-gray-400 font-medium">Identifier: {r.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1 max-w-md">
                                            {r.name === 'super-admin' ? (
                                                <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-md border border-green-100">
                                                    ALL PERMISSIONS
                                                </span>
                                            ) : r.permissions.length > 0 ? (
                                                r.permissions.slice(0, 5).map(p => (
                                                    <span key={p.id} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-medium rounded-md border border-gray-100">
                                                        {p.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic text-[10px]">Tidak ada permission</span>
                                            )}
                                            {r.permissions.length > 5 && (
                                                <span className="text-[10px] text-primary-600 font-bold">+{r.permissions.length - 5} lainnya</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(r)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200"
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(r)} 
                                                disabled={r.name === 'super-admin'}
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
                                        <EmptyState title="Role Tidak Ditemukan" message="Coba sesuaikan filter atau tambahkan role baru." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={roles.links} 
                        meta={{
                            from: roles.from,
                            to: roles.to,
                            total: roles.total,
                            per_page: roles.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/roles', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="4xl">
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Role' : 'Tambah Role Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Role <span className="text-danger-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value.toLowerCase().replace(/\s+/g, '-'))} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium uppercase tracking-wider" 
                                placeholder="e.g. admin-mutu"
                                disabled={editingData?.name === 'super-admin'}
                            />
                            {errors.name && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.name}</p>}
                        </div>

                        <div className="border border-gray-100 rounded-2xl overflow-hidden">
                            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                                <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
                                <span className="text-sm font-extrabold text-gray-800">Daftar Permission</span>
                            </div>
                            <div className="p-5 max-h-[400px] overflow-y-auto bg-white custom-scrollbar group">
                                {Object.keys(groupedPermissions).map(group => (
                                    <div key={group} className="mb-6 last:mb-0">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            {group.replace('-', ' ')}
                                            <div className="h-px bg-gray-100 flex-1"></div>
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                            {groupedPermissions[group].map(perm => (
                                                <label key={perm.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group/item ${data.permissions.includes(perm.name) ? 'bg-primary-50/50 border-primary-200' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={data.permissions.includes(perm.name)} 
                                                        onChange={() => handlePermissionChange(perm.name)}
                                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                        disabled={editingData?.name === 'super-admin'}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs font-bold leading-none ${data.permissions.includes(perm.name) ? 'text-primary-700' : 'text-gray-600 group-hover/item:text-gray-900'}`}>
                                                            {perm.name.split('.').slice(1).join('.') || perm.name}
                                                        </span>
                                                        <span className="text-[9px] text-gray-400 mt-1 uppercase font-medium">{perm.name}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                                disabled={processing || editingData?.name === 'super-admin' && Object.keys(data).every(k => data[k] === editingData[k])} 
                                className="px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition duration-200 shadow-xl shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 text-sm"
                            >
                                {processing ? 'Menyimpan...' : editingData ? 'Perbarui Role' : 'Tambah Role'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default memo(Index);
