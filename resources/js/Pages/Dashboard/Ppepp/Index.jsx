import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState , memo} from "react";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import { PencilSquareIcon, TrashIcon, DocumentArrowDownIcon, LinkIcon } from "@heroicons/react/24/outline";

// Helper color for each stage
const BadgeColors = {
    Penetapan: "bg-blue-100 text-blue-700 border-blue-200",
    Pelaksanaan: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Evaluasi: "bg-amber-100 text-amber-700 border-amber-200",
    Pengendalian: "bg-orange-100 text-orange-700 border-orange-200",
    Peningkatan: "bg-green-100 text-green-700 border-green-200",
};

function Index({ ppepps, standars }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset, clearErrors, errors } = useForm({
        standar_mutu_id: "",
        tahapan: "",
        deskripsi: "",
        dokumen_link: "",
        tanggal_pelaksanaan: "",
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
            tahapan: item.tahapan || "",
            deskripsi: item.deskripsi || "",
            dokumen_link: item.dokumen_link || "",
            tanggal_pelaksanaan: item.tanggal_pelaksanaan || "",
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
            put(`/dashboard/ppepp/${editing.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Data Siklus PPEPP diperbarui", "success");
                },
            });
        } else {
            post(`/dashboard/ppepp`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Data Siklus PPEPP ditambahkan", "success");
                },
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus data ini?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/ppepp/${id}`, {
                    onSuccess: () => {
                        Swal.fire("Dihapus!", "Data PPEPP telah dihapus.", "success");
                    }
                });
            }
        });
    };

    return (
        <>
            <Head title="Siklus PPEPP" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Siklus PPEPP</h3>
                    <p className="text-sm text-gray-500 mt-1">Siklus Penetapan, Pelaksanaan, Evaluasi, Pengendalian, dan Peningkatan standar mutu.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 shrink-0"
                >
                    + Tambah Tahapan
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Standar Mutu</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Tahapan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Deskripsi & Tgl Pelaksanaan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Dokumen Bukti</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {ppepps.data.length > 0 ? (
                                ppepps.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{item.standar_mutu?.nama || "-"}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{item.standar_mutu?.kode || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border uppercase tracking-tight ${BadgeColors[item.tahapan] || 'bg-gray-100 text-gray-700'}`}>
                                                {item.tahapan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900 font-medium mb-1 line-clamp-2" title={item.deskripsi}>{item.deskripsi}</div>
                                            <div className="text-[11px] text-gray-500 font-semibold">{new Date(item.tanggal_pelaksanaan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.dokumen_link ? (
                                                <a href={item.dokumen_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition">
                                                    <LinkIcon className="w-4 h-4" /> Bukti
                                                </a>
                                            ) : (
                                                <span className="text-xs text-gray-400 font-medium">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    onClick={() => openEdit(item)}
                                                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200"
                                                    title="Hapus"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <EmptyState title="Belum Ada Siklus PPEPP" message="Data siklus per standar mutu masih kosong." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {ppepps.data.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                        <Pagination 
                            links={ppepps.links} 
                            meta={{
                                from: ppepps.from,
                                to: ppepps.to,
                                total: ppepps.total,
                                per_page: ppepps.per_page
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editing ? "Edit Tahapan PPEPP" : "Tambah Tahapan PPEPP"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Standar Mutu <span className="text-danger-500">*</span></label>
                                <select
                                    value={data.standar_mutu_id}
                                    onChange={(e) => setData("standar_mutu_id", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold text-gray-700"
                                >
                                    <option value="">Pilih Standar</option>
                                    {standars.map((std) => (
                                        <option key={std.id} value={std.id}>{std.kode} - {std.nama}</option>
                                    ))}
                                </select>
                                {errors.standar_mutu_id && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.standar_mutu_id}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Siklus / Tahapan <span className="text-danger-500">*</span></label>
                                <select
                                    value={data.tahapan}
                                    onChange={(e) => setData("tahapan", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold text-gray-700"
                                >
                                    <option value="">Pilih Tahapan</option>
                                    <option value="Penetapan">Penetapan</option>
                                    <option value="Pelaksanaan">Pelaksanaan</option>
                                    <option value="Evaluasi">Evaluasi</option>
                                    <option value="Pengendalian">Pengendalian</option>
                                    <option value="Peningkatan">Peningkatan</option>
                                </select>
                                {errors.tahapan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.tahapan}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Pelaksanaan <span className="text-danger-500">*</span></label>
                                <input
                                    type="date"
                                    value={data.tanggal_pelaksanaan}
                                    onChange={(e) => setData("tanggal_pelaksanaan", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                />
                                {errors.tanggal_pelaksanaan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.tanggal_pelaksanaan}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Tautan Bukti Dokumen (URL)</label>
                            <input
                                type="url"
                                value={data.dokumen_link}
                                onChange={(e) => setData("dokumen_link", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="https://drive.google.com/..."
                            />
                            {errors.dokumen_link && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.dokumen_link}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Kegiatan <span className="text-danger-500">*</span></label>
                            <textarea
                                rows={3}
                                value={data.deskripsi}
                                onChange={(e) => setData("deskripsi", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Jelaskan detail aktivitas tahapan ini..."
                            />
                            {errors.deskripsi && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.deskripsi}</p>}
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
                                {processing ? "Menyimpan..." : "Simpan Data"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Siklus PPEPP">{page}</DashboardLayout>;
export default PersistedIndex;

