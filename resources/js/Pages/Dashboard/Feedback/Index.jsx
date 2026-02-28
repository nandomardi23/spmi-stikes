import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState , memo} from "react";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

function Index({ feedbacks }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset, clearErrors, errors } = useForm({
        tahun_akademik: "",
        responden: "",
        nilai_kepuasan: "",
        jumlah_responden: "",
        keterangan: "",
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
            tahun_akademik: item.tahun_akademik || "",
            responden: item.responden || "",
            nilai_kepuasan: item.nilai_kepuasan || "",
            jumlah_responden: item.jumlah_responden || "",
            keterangan: item.keterangan || "",
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
            put(`/dashboard/umpan-balik/${editing.id}`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Data umpan balik diperbarui", "success");
                },
            });
        } else {
            post(`/dashboard/umpan-balik`, {
                onSuccess: () => {
                    closeModal();
                    Swal.fire("Berhasil", "Data umpan balik ditambahkan", "success");
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
                router.delete(`/dashboard/umpan-balik/${id}`, {
                    onSuccess: () => {
                        Swal.fire("Dihapus!", "Data umpan balik telah dihapus.", "success");
                    }
                });
            }
        });
    };

    return (
        <>
            <Head title="Umpan Balik & Kuesioner" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Kuesioner Kepuasan</h3>
                    <p className="text-sm text-gray-500 mt-1">Kelola data hasil survei / kuesioner dari berbagai stakeholder.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 shrink-0"
                >
                    + Tambah Data
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Tahun Akademik</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Responden</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Nilai Kepuasan</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Jumlah Responden</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {feedbacks.data.length > 0 ? (
                                feedbacks.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 font-bold text-gray-900">{item.tahun_akademik}</td>
                                        <td className="px-6 py-4 text-gray-700 font-medium">
                                            <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-tight">
                                                {item.responden}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-sm font-bold text-gray-900">{item.nilai_kepuasan}%</span>
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${item.nilai_kepuasan >= 80 ? 'bg-green-500' : item.nilai_kepuasan >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                                        style={{ width: `${item.nilai_kepuasan}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-600 font-medium">{item.jumlah_responden} Orang</td>
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
                                        <EmptyState title="Belum Ada Data" message="Data kuesioner dan umpan balik masih kosong." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {feedbacks.data.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                        <Pagination 
                            links={feedbacks.links} 
                            meta={{
                                from: feedbacks.from,
                                to: feedbacks.to,
                                total: feedbacks.total,
                                per_page: feedbacks.per_page
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isOpen} onClose={closeModal}>
                <div className="p-7">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {editing ? "Edit Data Umpan Balik" : "Tambah Data Umpan Balik"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tahun Akademik <span className="text-danger-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.tahun_akademik}
                                    onChange={(e) => setData("tahun_akademik", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                    placeholder="e.g. 2024/2025"
                                />
                                {errors.tahun_akademik && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.tahun_akademik}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Responden <span className="text-danger-500">*</span></label>
                                <select
                                    value={data.responden}
                                    onChange={(e) => setData("responden", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold text-gray-700"
                                >
                                    <option value="">Pilih Responden</option>
                                    <option value="Mahasiswa">Mahasiswa</option>
                                    <option value="Dosen">Dosen</option>
                                    <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
                                    <option value="Alumni">Alumni</option>
                                    <option value="Pengguna Lulusan / Mitra">Pengguna Lulusan / Mitra</option>
                                </select>
                                {errors.responden && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.responden}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nilai Kepuasan (0-100) <span className="text-danger-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        value={data.nilai_kepuasan}
                                        onChange={(e) => setData("nilai_kepuasan", e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700 pr-10"
                                        placeholder="e.g. 85.50"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                                </div>
                                {errors.nilai_kepuasan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.nilai_kepuasan}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Jumlah Responden <span className="text-danger-500">*</span></label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.jumlah_responden}
                                    onChange={(e) => setData("jumlah_responden", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                    placeholder="e.g. 150"
                                />
                                {errors.jumlah_responden && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.jumlah_responden}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Keterangan / Kesimpulan</label>
                            <textarea
                                rows={3}
                                value={data.keterangan}
                                onChange={(e) => setData("keterangan", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Opsional: Tambahkan catatan atau kesimpulan hasil kuesioner..."
                            />
                            {errors.keterangan && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.keterangan}</p>}
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
PersistedIndex.layout = page => <DashboardLayout title="Umpan Balik & Kuesioner">{page}</DashboardLayout>;
export default PersistedIndex;

