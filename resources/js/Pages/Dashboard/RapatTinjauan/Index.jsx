import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Index({ items }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, processing, reset, errors } = useForm({
        judul: "",
        tanggal: "",
        notulen: "",
        keputusan: "",
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setIsOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setData({
            judul: item.judul || "",
            tanggal: item.tanggal || "",
            notulen: item.notulen || "",
            keputusan: item.keputusan || "",
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            put(`/dashboard/rapat-tinjauan/${editing.id}`, {
                onSuccess: () => {
                    setIsOpen(false);
                    Swal.fire("Berhasil", "Rapat diperbarui", "success");
                },
            });
        } else {
            post(`/dashboard/rapat-tinjauan`, {
                onSuccess: () => {
                    setIsOpen(false);
                    Swal.fire("Berhasil", "Rapat dibuat", "success");
                },
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus rapat?",
            text: "Data akan dihapus permanen.",
            icon: "warning",
            showCancelButton: true,
        }).then((r) => {
            if (r.isConfirmed) {
                window.axios
                    .delete(`/dashboard/rapat-tinjauan/${id}`)
                    .then(() => {
                        Swal.fire("Dihapus", "Rapat dihapus", "success");
                        window.location.reload();
                    });
            }
        });
    };

    return (
        <DashboardLayout title="Rapat Tinjauan Manajemen">
            <Head title="Rapat Tinjauan Manajemen" />

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    Rapat Tinjauan Manajemen
                </h3>
                <button
                    onClick={openCreate}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg"
                >
                    + Tambah Rapat
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-600">
                    Kelola notulen, keputusan, dan tindak lanjut rapat manajemen
                    di halaman ini.
                </p>
                <div className="mt-4">
                    {items && items.data && items.data.length > 0 ? (
                        <ul className="space-y-3">
                            {items.data.map((r) => (
                                <li
                                    key={r.id}
                                    className="p-3 border rounded-lg flex justify-between"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {r.judul}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {r.tanggal}
                                        </p>
                                        <p className="mt-2 text-gray-700">
                                            {r.notulen}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(r)}
                                            className="px-3 py-1 bg-gray-100 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">Belum ada rapat.</p>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h4 className="font-semibold mb-3">
                            {editing ? "Edit" : "Tambah"} Rapat
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm mb-1">
                                    Judul
                                </label>
                                <input
                                    value={data.judul}
                                    onChange={(e) =>
                                        setData("judul", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.judul && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.judul}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) =>
                                        setData("tanggal", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.tanggal && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.tanggal}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Notulen
                                </label>
                                <textarea
                                    value={data.notulen}
                                    onChange={(e) =>
                                        setData("notulen", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    rows={4}
                                />
                                {errors.notulen && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.notulen}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Keputusan
                                </label>
                                <textarea
                                    value={data.keputusan}
                                    onChange={(e) =>
                                        setData("keputusan", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    rows={3}
                                />
                                {errors.keputusan && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.keputusan}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 rounded border"
                                >
                                    Batal
                                </button>
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="px-4 py-2 bg-primary-600 text-white rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
