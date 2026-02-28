import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon, KeyIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

function Index({ permissions, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: ''
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/dashboard/permissions', { search }, { preserveState: true });
    };

    const handleDelete = (permission) => {
        Swal.fire({
            title: 'Hapus Permission?',
            text: `Hapus permission ${permission.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/permissions/${permission.id}`, {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Permission telah berhasil dihapus.', 'success');
                    }
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/permissions/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Permission telah diperbarui.', 'success');
                },
            });
        } else {
            post('/dashboard/permissions', {
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', 'Permission baru telah ditambahkan.', 'success');
                }
            });
        }
    };

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditingData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (permission) => {
        clearErrors();
        setEditingData(permission);
        setData({
            name: permission.name
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
            <Head title="Manajemen Permission" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleFilter} className="flex flex-wrap gap-2">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Cari permission..." 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 w-64 transition-all" 
                    />
                    <button type="submit" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Filter</button>
                    {filters.search ? (
                        <Link href="/dashboard/permissions" className="px-5 py-2.5 text-danger-600 text-sm font-medium hover:underline">Reset</Link>
                    ) : null}
                </form>
                <button 
                    onClick={openCreateModal} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 transition"
                >
                    + Tambah Permission
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Nama Permission</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {permissions.data.length > 0 ? permissions.data.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                                <KeyIcon className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-gray-900">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(p)} 
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200"
                                                title="Edit"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(p)} 
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
                                    <td colSpan={2}>
                                        <EmptyState title="Permission Tidak Ditemukan" message="Coba sesuaikan filter atau tambahkan permission baru." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={permissions.links} 
                        meta={{
                            from: permissions.from,
                            to: permissions.to,
                            total: permissions.total,
                            per_page: permissions.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/permissions', { ...filters, per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Permission' : 'Tambah Permission Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Permission <span className="text-danger-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value.toLowerCase().replace(/\s+/g, '.'))} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" 
                                placeholder="e.g. user.create"
                            />
                            <p className="mt-1 text-[10px] text-gray-400">Gunakan format dot notation (misal: standar-mutu.view)</p>
                            {errors.name && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.name}</p>}
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
                                {processing ? 'Menyimpan...' : editingData ? 'Perbarui Permission' : 'Tambah Permission'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Manajemen Permission">{page}</DashboardLayout>;
export default PersistedIndex;

