import { Head, Link, router, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import Pagination from '@/Components/Pagination';
import PageHeader from '@/Components/PageHeader';
import TableActions from '@/Components/TableActions';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';

function Index({ unitKerjas, users }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [viewingData, setViewingData] = useState(null);

    const initialData = {
        nama: '', kepala_unit: '', jenis: 'prodi', deskripsi: '', kode: ''
    };
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(initialData);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Unit Kerja?',
            html: "Data yang dihapus tidak dapat dikembalikan!<br><br><span class='text-sm text-red-500 font-bold'>Peringatan: Menghapus Unit Kerja ini akan memengaruhi Data Audit, User, dan Dokumen terkait (jika ada).</span>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/unit-kerja/${id}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/unit-kerja/${editingData.id}`, {
                onSuccess: () => {
                    closeModal();
                },
            });
        } else {
            post('/dashboard/unit-kerja', {
                onSuccess: () => {
                    closeModal();
                },
            });
        }
    };

    const openCreateModal = () => {
        reset();
        setData(initialData);
        clearErrors();
        setEditingData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        clearErrors();
        setEditingData(item);
        setData({
            nama: item.nama, kepala_unit: item.kepala_unit || '', 
            jenis: item.jenis, deskripsi: item.deskripsi || '', kode: item.kode || ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            reset();
        setData(initialData);
            clearErrors();
            setEditingData(null);
        }, 150);
    };

    const openDetailModal = (item) => {
        setViewingData(item);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setTimeout(() => setViewingData(null), 150);
    };

    return (
        <>
            <Head title="Unit Kerja" />
            
            <PageHeader 
                title="Master Data"
                description="Kelola unit kerja auditee dan pimpinan unit"
                onAdd={openCreateModal}
                addText="+ Tambah Unit"
            />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Informasi Unit</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Ketua / Kepala</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Kategori</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {unitKerjas.data.length > 0 ? unitKerjas.data.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-100 rounded-xl flex items-center justify-center text-primary-600 font-extrabold text-xs">
                                                {u.kode || 'UK'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{u.nama}</p>
                                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">KODE: {u.kode || '-'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-left font-medium text-gray-700">{u.kepala_unit || '-'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold rounded-lg border border-primary-100 uppercase tracking-tight">
                                            {u.jenis?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <TableActions 
                                            onView={() => openDetailModal(u)}
                                            onEdit={() => openEditModal(u)}
                                            onDelete={() => handleDelete(u.id)}
                                        />
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4}>
                                        <EmptyState title="Unit Kerja Belum Tersedia" message="Silakan tambahkan unit kerja baru untuk mengawali data." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        links={unitKerjas.links} 
                        meta={{
                            from: unitKerjas.from,
                            to: unitKerjas.to,
                            total: unitKerjas.total,
                            per_page: unitKerjas.per_page
                        }}
                        onPerPageChange={(per_page) => {
                            router.get('/dashboard/unit-kerja', { per_page }, { preserveState: true });
                        }}
                    />
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Unit Kerja' : 'Tambah Unit Kerja Baru'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <InputLabel value="Nama Unit Kerja" required />
                                <TextInput 
                                    value={data.nama} 
                                    onChange={e => setData('nama', e.target.value)} 
                                    placeholder="e.g. Prodi S1 Keperawatan" 
                                />
                                <InputError message={errors.nama} />
                            </div>
                            <div>
                                <InputLabel value="Kode Unit" required />
                                <TextInput 
                                    value={data.kode} 
                                    onChange={e => setData('kode', e.target.value)} 
                                    placeholder="e.g. UK-01" 
                                    className="font-bold"
                                />
                                <InputError message={errors.kode} />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Kategori Unit" required />
                            <select 
                                value={data.jenis} 
                                onChange={e => setData('jenis', e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 font-bold text-gray-700"
                            >
                                <option value="prodi">Program Studi (Prodi)</option>
                                <option value="unit">Fakultas / Pimpinan</option>
                                <option value="bagian">Biro / Bagian</option>
                                <option value="lembaga">Lembaga / Pusat</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel value="Nama Ketua / Kepala Unit" />
                            <TextInput 
                                value={data.kepala_unit} 
                                onChange={e => setData('kepala_unit', e.target.value)} 
                                placeholder="e.g. Dr. Jane Doe, M.Kep"
                            />
                            <InputError message={errors.kepala_unit} />
                        </div>

                        <div>
                            <InputLabel value="Deskripsi Singkat" />
                            <TextArea 
                                rows={3} 
                                value={data.deskripsi} 
                                onChange={e => setData('deskripsi', e.target.value)} 
                                placeholder="Berikan deskripsi singkat tentang unit kerja ini..."
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
                                {processing ? 'Sedang Memproses...' : editingData ? 'Perbarui Unit' : 'Simpan Unit'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Detail Modal */}
            <Modal show={isDetailModalOpen} onClose={closeDetailModal} maxWidth="xl">
                {viewingData && (
                    <div className="p-7">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">Detail Unit Kerja</h2>
                                <p className="text-sm text-gray-500">Informasi profil unit kerja auditee</p>
                            </div>
                            <span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-[11px] font-bold rounded-lg border border-primary-100 uppercase tracking-tight mt-1">
                                {viewingData.jenis?.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-5 shadow-sm">
                            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Unit Kerja</h3>
                                <p className="text-base font-bold text-gray-900">{viewingData.nama}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Kode Unit</h3>
                                    <div className="inline-flex px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                                        {viewingData.kode || 'Belum diatur'}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Kepala/Ketua Unit</h3>
                                    <p className="text-sm font-semibold text-gray-900">{viewingData.kepala_unit || 'Belum diatur'}</p>
                                </div>
                            </div>

                            {viewingData.deskripsi && (
                                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deskripsi / Catatan</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{viewingData.deskripsi}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={closeDetailModal} 
                                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition duration-200 text-sm shadow-sm"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Unit Kerja">{page}</DashboardLayout>;
export default PersistedIndex;

