import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Index({ items, siklus = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset, clearErrors, errors } = useForm({
        judul: "",
        tanggal: "",
        notulen: "",
        keputusan: "",
        siklus_audit_id: "",
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
            judul: item.judul || "",
            tanggal: item.tanggal ? item.tanggal.split("T")[0] : "",
            notulen: item.notulen || "",
            keputusan: item.keputusan || "",
            siklus_audit_id: item.siklus_audit_id || "",
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
            put(`/dashboard/rapat-tinjauan/${editing.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Rapat tinjauan diperbarui", "success");
                },
            });
        } else {
            post(`/dashboard/rapat-tinjauan`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Rapat tinjauan ditambahkan", "success");
                },
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus rapat ini?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/rapat-tinjauan/${id}`, {
                    onSuccess: () => Swal.fire("Dihapus!", "Rapat tinjauan telah dihapus.", "success"),
                });
            }
        });
    };

    return (
        <DashboardLayout title="Rapat Tinjauan Manajemen">
            <Head title="Rapat Tinjauan Manajemen" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Rapat Tinjauan Manajemen</h3>
                    <p className="text-sm text-gray-500 mt-1">Kelola notulen, keputusan, dan hasil rapat tinjauan mutu.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 shrink-0"
                >
                    + Tambah Rapat
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Judul Rapat</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Tanggal</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Siklus Audit</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Keputusan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {items && items.data && items.data.length > 0 ? (
                                items.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{item.judul}</p>
                                            {item.user && (
                                                <p className="text-[10px] text-gray-400 font-medium mt-0.5">oleh {item.user.name}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center text-xs text-gray-600 font-medium">
                                            {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.siklus_audit ? (
                                                <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-primary-50 text-primary-700 border border-primary-100 uppercase tracking-tight">
                                                    {item.siklus_audit.nama}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="text-gray-700 font-medium line-clamp-2">{item.keputusan || "-"}</p>
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
                                        <EmptyState title="Belum Ada Rapat" message="Buat rapat tinjauan manajemen untuk mendokumentasikan hasil evaluasi mutu." />
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
                        {editing ? "Edit Rapat Tinjauan" : "Tambah Rapat Tinjauan"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Rapat <span className="text-danger-500">*</span></label>
                            <input
                                type="text"
                                value={data.judul}
                                onChange={(e) => setData("judul", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="e.g. RTM Semester Ganjil 2024/2025"
                            />
                            {errors.judul && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.judul}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal</label>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) => setData("tanggal", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                />
                                {errors.tanggal && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.tanggal}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Siklus Audit</label>
                                <select
                                    value={data.siklus_audit_id}
                                    onChange={(e) => setData("siklus_audit_id", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold text-gray-700"
                                >
                                    <option value="">Pilih Siklus (opsional)</option>
                                    {siklus.map((s) => (
                                        <option key={s.id} value={s.id}>{s.nama} ({s.tahun})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Notulen Rapat</label>
                            <textarea
                                rows={4}
                                value={data.notulen}
                                onChange={(e) => setData("notulen", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Catatan pembahasan dan notulen rapat..."
                            />
                            {errors.notulen && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.notulen}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Keputusan Rapat</label>
                            <textarea
                                rows={3}
                                value={data.keputusan}
                                onChange={(e) => setData("keputusan", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Hasil keputusan dan resolusi dari rapat..."
                            />
                            {errors.keputusan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.keputusan}</p>}
                        </div>

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
