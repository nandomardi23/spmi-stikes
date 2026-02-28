import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Index({ instrumens, standars }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset, clearErrors, errors } = useForm({
        standar_mutu_id: "",
        pertanyaan: "",
        deskripsi: "",
        bobot: "",
        urutan: "",
        is_active: true,
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
            standar_mutu_id: item.standar_mutu_id || "",
            pertanyaan: item.pertanyaan || "",
            deskripsi: item.deskripsi || "",
            bobot: item.bobot || "",
            urutan: item.urutan || "",
            is_active: item.is_active ?? true,
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
            put(`/dashboard/instrumen-audit/${editing.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Instrumen audit diperbarui", "success");
                },
            });
        } else {
            post(`/dashboard/instrumen-audit`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Instrumen audit ditambahkan", "success");
                },
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus instrumen ini?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/instrumen-audit/${id}`, {
                    onSuccess: () => Swal.fire("Dihapus!", "Instrumen audit telah dihapus.", "success"),
                });
            }
        });
    };

    return (
        <DashboardLayout title="Instrumen Audit">
            <Head title="Instrumen Audit" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Instrumen Audit</h3>
                    <p className="text-sm text-gray-500 mt-1">Kelola daftar pertanyaan/checklist untuk pelaksanaan Audit Mutu Internal.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 shrink-0"
                >
                    + Tambah Instrumen
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center w-14">#</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Standar Mutu</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Pertanyaan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Bobot</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {instrumens.data.length > 0 ? (
                                instrumens.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 text-center text-gray-500 font-bold">{item.urutan}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2 py-1 rounded-lg border border-primary-100">
                                                {item.standar_mutu?.kode || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium max-w-md">
                                            <div className="line-clamp-2" title={item.pertanyaan}>{item.pertanyaan}</div>
                                            {item.deskripsi && (
                                                <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{item.deskripsi}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-gray-900">{item.bobot}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-tight ${item.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                                {item.is_active ? "Aktif" : "Nonaktif"}
                                            </span>
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
                                    <td colSpan={6}>
                                        <EmptyState title="Belum Ada Instrumen" message="Buat instrumen audit untuk digunakan dalam pelaksanaan AMI." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {instrumens.data.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                        <Pagination links={instrumens.links} meta={{ from: instrumens.from, to: instrumens.to, total: instrumens.total, per_page: instrumens.per_page }} />
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editing ? "Edit Instrumen Audit" : "Tambah Instrumen Audit"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Standar Mutu <span className="text-danger-500">*</span></label>
                            <select value={data.standar_mutu_id} onChange={(e) => setData("standar_mutu_id", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold text-gray-700">
                                <option value="">Pilih Standar</option>
                                {standars.map((std) => (
                                    <option key={std.id} value={std.id}>{std.kode} - {std.nama}</option>
                                ))}
                            </select>
                            {errors.standar_mutu_id && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.standar_mutu_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Pertanyaan / Checklist <span className="text-danger-500">*</span></label>
                            <textarea rows={3} value={data.pertanyaan} onChange={(e) => setData("pertanyaan", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700" placeholder="e.g. Apakah dokumen kurikulum tersedia dan terdokumentasi?" />
                            {errors.pertanyaan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.pertanyaan}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi / Panduan</label>
                            <textarea rows={2} value={data.deskripsi} onChange={(e) => setData("deskripsi", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700" placeholder="Opsional: panduan penilaian untuk auditor..." />
                            {errors.deskripsi && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.deskripsi}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Bobot <span className="text-danger-500">*</span></label>
                                <input type="number" min="1" max="100" value={data.bobot} onChange={(e) => setData("bobot", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700" placeholder="e.g. 10" />
                                {errors.bobot && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.bobot}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Urutan <span className="text-danger-500">*</span></label>
                                <input type="number" min="1" value={data.urutan} onChange={(e) => setData("urutan", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700" placeholder="e.g. 1" />
                                {errors.urutan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.urutan}</p>}
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="checkbox" checked={data.is_active} onChange={(e) => setData("is_active", e.target.checked)} className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="text-sm font-bold text-gray-700">Aktif</span>
                                </label>
                            </div>
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
