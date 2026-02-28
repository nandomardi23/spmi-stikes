import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const statusColors = {
    diajukan: "bg-amber-50 text-amber-700 border-amber-200",
    diterima: "bg-green-50 text-green-700 border-green-200",
    ditolak: "bg-red-50 text-red-700 border-red-200",
};

function Index({ items, temuan = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset, clearErrors, errors } = useForm({
        temuan_id: "",
        deskripsi: "",
        status: "diajukan",
    });

    const openCreate = () => {
        reset();
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
            text: "Data yang dihapus tidak dapat dikembalikan!",
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
        <DashboardLayout title="Tindak Lanjut">
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
                                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                                                ID Temuan: #{item.temuan_id}
                                            </p>
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
                                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                        <Pagination links={items.links} meta={{ from: items.from, to: items.to, total: items.total, per_page: items.per_page }} />
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
                            <select
                                value={data.temuan_id}
                                onChange={(e) => setData("temuan_id", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold text-gray-700"
                            >
                                <option value="">Pilih Temuan</option>
                                {temuan.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.deskripsi && t.deskripsi.length > 80 ? t.deskripsi.slice(0, 80) + "..." : t.deskripsi || "-"}
                                    </option>
                                ))}
                            </select>
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
                                <select
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold text-gray-700 capitalize"
                                >
                                    <option value="diajukan">Diajukan</option>
                                    <option value="diterima">Diterima</option>
                                    <option value="ditolak">Ditolak</option>
                                </select>
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
        </DashboardLayout>
    );
}

export default memo(Index);
