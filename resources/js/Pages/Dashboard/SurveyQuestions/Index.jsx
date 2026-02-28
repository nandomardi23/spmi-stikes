import { Head, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

const kategoriOptions = [
    { value: 'pengajaran', label: 'Pengajaran & Pembelajaran' },
    { value: 'fasilitas', label: 'Fasilitas & Sarana Prasarana' },
    { value: 'pelayanan', label: 'Pelayanan Akademik' },
    { value: 'kurikulum', label: 'Kurikulum & Kompetensi' },
    { value: 'manajemen', label: 'Manajemen & Tata Kelola' },
    { value: 'penelitian', label: 'Penelitian & Pengabdian' },
];

const kategoriColors = {
    pengajaran: 'bg-blue-100 text-blue-700',
    fasilitas: 'bg-amber-100 text-amber-700',
    pelayanan: 'bg-green-100 text-green-700',
    kurikulum: 'bg-purple-100 text-purple-700',
    manajemen: 'bg-indigo-100 text-indigo-700',
    penelitian: 'bg-rose-100 text-rose-700',
};

function Index({ questions, totalResponses }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        kategori: 'pengajaran',
        pertanyaan: '',
        urutan: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingData) {
            put(`/dashboard/survey-questions/${editingData.id}`, {
                onSuccess: () => { closeModal(); Swal.fire('Berhasil!', 'Pertanyaan berhasil diperbarui.', 'success'); },
            });
        } else {
            post('/dashboard/survey-questions', {
                onSuccess: () => { closeModal(); Swal.fire('Berhasil!', 'Pertanyaan berhasil ditambahkan.', 'success'); },
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Pertanyaan?',
            text: 'Data yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/survey-questions/${id}`);
            }
        });
    };

    const openCreateModal = () => {
        reset(); clearErrors(); setEditingData(null); setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        clearErrors(); setEditingData(item);
        setData({
            kategori: item.kategori,
            pertanyaan: item.pertanyaan,
            urutan: item.urutan,
            is_active: item.is_active,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => { reset(); clearErrors(); setEditingData(null); }, 150);
    };

    return (
        <>
            <Head title="Kelola Pertanyaan Kuesioner" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">Kuesioner Kepuasan</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Kelola pertanyaan yang ditampilkan ke publik · <span className="font-bold text-primary-600">{totalResponses}</span> respons terkumpul
                    </p>
                </div>
                <div className="flex gap-2">
                    <a
                        href="/kuesioner"
                        target="_blank"
                        className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                    >
                        Lihat Form Publik ↗
                    </a>
                    <button
                        onClick={openCreateModal}
                        className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25"
                    >
                        + Tambah Pertanyaan
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Pertanyaan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Kategori</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Urutan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {questions.data.length > 0 ? questions.data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900 text-sm">{item.pertanyaan}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight ${kategoriColors[item.kategori] || 'bg-gray-100 text-gray-700'}`}>
                                            {item.kategori}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-gray-700 text-xs">{item.urutan}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {item.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button onClick={() => openEditModal(item)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" title="Edit">
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200" title="Hapus">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5}>
                                        <EmptyState title="Belum Ada Pertanyaan" message="Tambahkan pertanyaan kuesioner yang akan ditampilkan ke publik." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination
                        links={questions.links}
                        meta={{ from: questions.from, to: questions.to, total: questions.total, per_page: questions.per_page }}
                        onPerPageChange={(per_page) => router.get('/dashboard/survey-questions', { per_page }, { preserveState: true })}
                    />
                </div>
            </div>

            {/* Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editingData ? 'Edit Pertanyaan' : 'Tambah Pertanyaan Baru'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Pertanyaan <span className="text-danger-500">*</span></label>
                            <textarea
                                rows={3}
                                value={data.pertanyaan}
                                onChange={(e) => setData('pertanyaan', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium"
                                placeholder="e.g. Bagaimana kepuasan Anda terhadap kualitas pengajaran dosen?"
                            />
                            {errors.pertanyaan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.pertanyaan}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori <span className="text-danger-500">*</span></label>
                                <select
                                    value={data.kategori}
                                    onChange={(e) => setData('kategori', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                >
                                    {kategoriOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.kategori && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.kategori}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Urutan</label>
                                <input
                                    type="number"
                                    value={data.urutan}
                                    onChange={(e) => setData('urutan', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                    min={0}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                            <span className="text-sm font-bold text-gray-700">Aktif (tampil di form publik)</span>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button type="button" onClick={closeModal} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition duration-200 text-sm">
                                Batal
                            </button>
                            <button type="submit" disabled={processing} className="px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition duration-200 shadow-xl shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 text-sm">
                                {processing ? 'Memproses...' : editingData ? 'Perbarui' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Kelola Pertanyaan Kuesioner">{page}</DashboardLayout>;
export default PersistedIndex;

