import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import { useState , memo} from "react";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TableActions from "@/Components/TableActions";
import useCrudForm from '@/Hooks/useCrudForm';
import { createCrudService } from '@/Services/crudService';

function Index({ feedbacks }) {
    const feedbackService = createCrudService({
        routePrefix: '/dashboard/umpan-balik',
        entityName: 'Data Umpan Balik',
        warningMessage: 'Data Umpan Balik ini akan hilang secara permanen dari sistem.',
    });

    const {
        data, setData, processing, errors,
        isModalOpen: isOpen, editingData: editing,
        openCreateModal: openCreate, openEditModal: openEdit, closeModal, handleSubmit,
    } = useCrudForm({
        routePrefix: '/dashboard/umpan-balik',
        initialData: {
            tahun_akademik: "",
            responden: "",
            nilai_kepuasan: "",
            jumlah_responden: "",
            keterangan: "",
        },
        mapEditData: (item) => ({
            tahun_akademik: item.tahun_akademik || "",
            responden: item.responden || "",
            nilai_kepuasan: item.nilai_kepuasan || "",
            jumlah_responden: item.jumlah_responden || "",
            keterangan: item.keterangan || "",
        }),
        successCreateMessage: 'Data Umpan Balik berhasil ditambahkan.',
        successUpdateMessage: 'Data Umpan Balik berhasil diperbarui.',
    });

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
                                            <TableActions 
                                                onEdit={() => openEdit(item)}
                                                onDelete={() => feedbackService.delete(item.id)}
                                            />
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
                                <InputLabel value="Tahun Akademik" required />
                                <input
                                    type="text"
                                    value={data.tahun_akademik}
                                    onChange={(e) => setData("tahun_akademik", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                    placeholder="e.g. 2024/2025"
                                />
                                <InputError message={errors.tahun_akademik} />
                            </div>
                            
                            <div>
                                <InputLabel value="Responden" required />
                                <SelectInput
                                    value={data.responden ? { value: data.responden, label: data.responden } : null}
                                    onChange={(opt) => setData("responden", opt ? opt.value : "")}
                                    options={[
                                        { value: 'Mahasiswa', label: 'Mahasiswa' },
                                        { value: 'Dosen', label: 'Dosen' },
                                        { value: 'Tenaga Kependidikan', label: 'Tenaga Kependidikan' },
                                        { value: 'Alumni', label: 'Alumni' },
                                        { value: 'Pengguna Lulusan / Mitra', label: 'Pengguna Lulusan / Mitra' },
                                    ]}
                                    placeholder="Pilih Responden"
                                />
                                <InputError message={errors.responden} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <InputLabel value="Nilai Kepuasan (0-100)" required />
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
                                <InputError message={errors.nilai_kepuasan} />
                            </div>

                            <div>
                                <InputLabel value="Jumlah Responden" required />
                                <input
                                    type="number"
                                    min="1"
                                    value={data.jumlah_responden}
                                    onChange={(e) => setData("jumlah_responden", e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                    placeholder="e.g. 150"
                                />
                                <InputError message={errors.jumlah_responden} />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Keterangan / Kesimpulan" />
                            <textarea
                                rows={3}
                                value={data.keterangan}
                                onChange={(e) => setData("keterangan", e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-700"
                                placeholder="Opsional: Tambahkan catatan atau kesimpulan hasil kuesioner..."
                            />
                            <InputError message={errors.keterangan} />
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

