import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState , memo} from "react";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import SelectInput from "@/Components/SelectInput";
import { formatDate } from "@/Utils/dateFormatter";

const statusColors = {
    diajukan: "bg-amber-50 text-amber-700 border-amber-200",
    diterima: "bg-green-50 text-green-700 border-green-200",
    ditolak: "bg-red-50 text-red-700 border-red-200",
};

function Index({ items, temuan = [], siklusAudit = [], filters = {} }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState(filters.search || "");
    const [selectedSiklus, setSelectedSiklus] = useState(filters.siklus || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/tindak-lanjut', { search, siklus: selectedSiklus }, { preserveState: true });
    };

    const handleSiklusChange = (val) => {
        setSelectedSiklus(val);
        router.get('/dashboard/tindak-lanjut', { search, siklus: val }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch("");
        setSelectedSiklus("");
        router.get('/dashboard/tindak-lanjut', {}, { preserveState: true });
    };

    const initialData = {
        temuan_id: "",
        deskripsi: "",
        status: "diajukan",
    };
    const { data, setData, post, put, processing, reset, clearErrors, errors } = useForm(initialData);

    const openCreate = () => {
        reset();
        setData(initialData);
        clearErrors();
        setEditing(null);
        setIsOpen(true);
    };

    const openEdit = (item) => {
        clearErrors();
        setEditing(item);
        setData({
            temuan_id: item.temuan_id || "",
            deskripsi: item.deskripsi || "",
            status: item.status || "diajukan",
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            reset();
        setData(initialData);
            clearErrors();
            setEditing(null);
        }, 150);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            put(`/dashboard/tindak-lanjut/${editing.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Tindak lanjut diperbarui", "success");
                },
            });
        } else {
            post(`/dashboard/tindak-lanjut`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Tindak lanjut ditambahkan", "success");
                },
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus tindak lanjut?",
            html: "Data yang dihapus tidak dapat dikembalikan!<br><br><span class='text-sm text-red-500 font-bold'>Peringatan: Berkas bukti dokumen yang dilampirkan juga akan ikut terhapus permanen dari server.</span>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/tindak-lanjut/${id}`, {
                    onSuccess: () => Swal.fire("Dihapus!", "Tindak lanjut telah dihapus.", "success"),
                });
            }
        });
    };

    return (
        <>
            <Head title="Tindak Lanjut" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Tindak Lanjut Temuan</h3>
                    <p className="text-sm text-gray-500 mt-1">Kelola tindak lanjut atas temuan audit yang perlu diperbaiki.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 shrink-0"
                >
                    + Tambah Tindak Lanjut
                </button>
            </div>

            {/* Filter & Export Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari tindak lanjut..."
                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-full sm:w-64 transition-all"
                        />
                        <button type="submit" className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition shrink-0">
                            Cari
                        </button>
                    </form>

                    <div className="w-full sm:w-56 shrink-0">
                        <SelectInput
                            value={selectedSiklus}
                            onChange={handleSiklusChange}
                            options={siklusAudit.map((s) => ({ value: s.id, label: s.nama }))}
                            placeholder="Semua Periode/Siklus"
                        />
                    </div>

                    {(filters.search || filters.siklus) && (
                        <button
                            onClick={handleReset}
                            className="text-danger-600 text-sm font-medium hover:underline shrink-0 px-2"
                        >
                            Reset Filter
                        </button>
                    )}
                </div>

                {selectedSiklus && (
                    <a
                        href={`/dashboard/export/laporan-rtl/${selectedSiklus}`}
                        className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 w-full md:w-auto"
                        title="Ekspor PDF Rencana Tindak Lanjut"
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export PDF
                    </a>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Temuan Terkait</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Deskripsi Tindak Lanjut</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Tanggal</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {items && items.data && items.data.length > 0 ? (
                                items.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="font-bold text-gray-900 line-clamp-2">
                                                {item.temuan?.deskripsi || "-"}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                {item.temuan?.audit?.unit_kerja?.nama && (
                                                    <span className="px-1.5 py-0.5 text-[9px] font-bold text-primary-700 bg-primary-50 border border-primary-100 rounded-md">
                                                        {item.temuan.audit.unit_kerja.nama}
                                                    </span>
                                                )}
                                                {item.temuan?.audit?.siklus_audit?.nama && (
                                                    <span className="px-1.5 py-0.5 text-[9px] font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-md">
                                                        {item.temuan.audit.siklus_audit.nama}
                                                    </span>
                                                )}
                                                <span className="text-[9px] text-gray-400 font-medium">
                                                    ID: #{item.temuan_id}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-sm">
                                            <p className="text-gray-700 font-medium line-clamp-2">{item.deskripsi}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-tight ${statusColors[item.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-xs text-gray-500 font-medium">
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button onClick={() => openEdit(item)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition" title="Edit">
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition" title="Hapus">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <EmptyState title="Belum Ada Tindak Lanjut" message="Buat tindak lanjut untuk menanggapi temuan audit." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {items && items.data && items.data.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                        <Pagination 
                            links={items.links} 
                            meta={{ from: items.from, to: items.to, total: items.total, per_page: items.per_page }} 
                            onPerPageChange={(per_page) => {
                                router.get('/dashboard/tindak-lanjut', { ...filters, per_page }, { preserveState: true });
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editing ? "Edit Tindak Lanjut" : "Tambah Tindak Lanjut"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Temuan Terkait <span className="text-danger-500">*</span></label>
                            <SelectInput
                                value={data.temuan_id}
                                onChange={(value) => setData("temuan_id", value)}
                                options={temuan.map((t) => ({
                                    value: t.id,
                                    label: t.deskripsi && t.deskripsi.length > 80 ? t.deskripsi.slice(0, 80) + "..." : t.deskripsi || "-"
                                }))}
                                placeholder="Pilih Temuan"
                            />
                            {errors.temuan_id && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.temuan_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Tindak Lanjut <span className="text-danger-500">*</span></label>
                            <textarea
                                rows={4}
                                value={data.deskripsi}
                                onChange={(e) => setData("deskripsi", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Jelaskan langkah-langkah perbaikan yang dilakukan..."
                            />
                            {errors.deskripsi && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.deskripsi}</p>}
                        </div>

                        {editing && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
                                <SelectInput
                                    value={data.status}
                                    onChange={(value) => setData("status", value)}
                                    options={[
                                        { value: 'diajukan', label: 'Diajukan' },
                                        { value: 'diterima', label: 'Diterima' },
                                        { value: 'ditolak', label: 'Ditolak' }
                                    ]}
                                    placeholder="Pilih Status"
                                />
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button type="button" onClick={closeModal} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition text-sm">
                                Batal
                            </button>
                            <button type="submit" disabled={processing} className="px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition shadow-xl shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 text-sm">
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Tindak Lanjut">{page}</DashboardLayout>;
export default PersistedIndex;

