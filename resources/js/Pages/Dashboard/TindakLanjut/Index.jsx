import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Index({ items, temuan }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        temuan_id: temuan?.[0]?.id || "",
        deskripsi: "",
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setIsOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setData({
            temuan_id: item.temuan_id || "",
            deskripsi: item.deskripsi || "",
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            put(`/dashboard/tindak-lanjut/${editing.id}`, {
                onSuccess: () => {
                    setIsOpen(false);
                    Swal.fire(
                        "Berhasil",
                        "Tindak lanjut diperbarui",
                        "success",
                    );
                },
            });
        } else {
            post(`/dashboard/tindak-lanjut`, {
                onSuccess: () => {
                    setIsOpen(false);
                    Swal.fire("Berhasil", "Tindak lanjut dibuat", "success");
                },
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus tindak lanjut?",
            text: "Data akan dihapus permanen.",
            icon: "warning",
            showCancelButton: true,
        }).then((r) => {
            if (r.isConfirmed) {
                router.delete(`/dashboard/tindak-lanjut/${id}`);
            }
        });
    };

    return (
        <DashboardLayout title="Tindak Lanjut">
            <Head title="Tindak Lanjut" />

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Tindak Lanjut</h3>
                <button
                    onClick={openCreate}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg"
                >
                    + Tambah
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-600">
                    Daftar tindak lanjut yang terkait dengan temuan audit.
                </p>
                <div className="mt-4">
                    {items && items.data && items.data.length > 0 ? (
                        <ul className="space-y-3">
                            {items.data.map((i) => (
                                <li
                                    key={i.id}
                                    className="p-3 border rounded-lg flex justify-between items-start"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {i.temuan?.deskripsi
                                                ? i.temuan.deskripsi.length > 60
                                                    ? i.temuan.deskripsi.slice(
                                                          0,
                                                          60,
                                                      ) + "..."
                                                    : i.temuan.deskripsi
                                                : "-"}
                                        </p>
                                        <p className="text-gray-700">
                                            {i.deskripsi}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(i)}
                                            className="px-3 py-1 text-sm bg-gray-100 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(i.id)}
                                            className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">
                            Belum ada tindak lanjut.
                        </p>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h4 className="font-semibold mb-3">
                            {editing ? "Edit" : "Tambah"} Tindak Lanjut
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm mb-1">
                                    Temuan
                                </label>
                                <select
                                    value={data.temuan_id}
                                    onChange={(e) =>
                                        setData("temuan_id", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Pilih temuan</option>
                                    {temuan?.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.deskripsi
                                                ? t.deskripsi.length > 80
                                                    ? t.deskripsi.slice(0, 80) +
                                                      "..."
                                                    : t.deskripsi
                                                : "-"}
                                        </option>
                                    ))}
                                </select>
                                {errors.temuan_id && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.temuan_id}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.deskripsi}
                                    onChange={(e) =>
                                        setData("deskripsi", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    rows={4}
                                />
                                {errors.deskripsi && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.deskripsi}
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
