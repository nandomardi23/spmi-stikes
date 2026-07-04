import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import { useState , memo} from "react";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { formatShortDate } from "@/Utils/dateFormatter";
import { PencilSquareIcon, TrashIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import useCrudForm from '@/Hooks/useCrudForm';
import { createCrudService } from '@/Services/crudService';

function Index({ items, siklus = [] }) {
    const rapatTinjauanService = createCrudService({
        routePrefix: '/dashboard/rapat-tinjauan',
        entityName: 'Rapat Tinjauan Manajemen',
        warningMessage: 'Data Rapat yang dihapus akan hilang secara permanen dari sistem.',
    });

    const {
        data, setData, processing, errors,
        isModalOpen: isOpen, editingData: editing,
        openCreateModal: openCreate, openEditModal: openEdit, closeModal, handleSubmit,
    } = useCrudForm({
        routePrefix: '/dashboard/rapat-tinjauan',
        initialData: {
            judul: "",
            tanggal: "",
            notulen: "",
            keputusan: "",
            siklus_audit_id: "",
        },
        mapEditData: (item) => ({
            judul: item.judul || "",
            tanggal: item.tanggal ? item.tanggal.split("T")[0] : "",
            notulen: item.notulen || "",
            keputusan: item.keputusan || "",
            siklus_audit_id: item.siklus_audit_id || "",
        }),
        successCreateMessage: 'Jadwal RTM baru berhasil ditambahkan.',
        successUpdateMessage: 'Jadwal RTM berhasil diperbarui.',
    });

    return (
        <>
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
                                            {formatShortDate(item.tanggal)}
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
                                                <a href={`/dashboard/export/laporan-rtm/${item.id}`} target="_blank" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition" title="Cetak Laporan RTM">
                                                    <DocumentArrowDownIcon className="w-5 h-5" />
                                                </a>
                                                <button onClick={() => openEdit(item)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition" title="Edit">
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => rapatTinjauanService.delete(item.id)} className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition" title="Hapus">
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
                            <InputLabel value="Judul Rapat" required />
                            <input
                                type="text"
                                value={data.judul}
                                onChange={(e) => setData("judul", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="e.g. RTM Semester Ganjil 2024/2025"
                            />
                            <InputError message={errors.judul} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <InputLabel value="Tanggal" />
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) => setData("tanggal", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                />
                                <InputError message={errors.tanggal} />
                            </div>
                            <div>
                                <InputLabel value="Siklus Audit" />
                                <SelectInput
                                    value={data.siklus_audit_id}
                                    onChange={(val) => setData("siklus_audit_id", val)}
                                    options={siklus.map(s => ({ value: s.id, label: `${s.nama} (${s.tahun})` }))}
                                    placeholder="Pilih Siklus (opsional)"
                                    isClearable
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Notulen Rapat" />
                            <textarea
                                rows={4}
                                value={data.notulen}
                                onChange={(e) => setData("notulen", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Catatan pembahasan dan notulen rapat..."
                            />
                            <InputError message={errors.notulen} />
                        </div>

                        <div>
                            <InputLabel value="Keputusan Rapat" />
                            <textarea
                                rows={3}
                                value={data.keputusan}
                                onChange={(e) => setData("keputusan", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Hasil keputusan dan resolusi dari rapat..."
                            />
                            <InputError message={errors.keputusan} />
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
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Rapat Tinjauan Manajemen">{page}</DashboardLayout>;
export default PersistedIndex;

