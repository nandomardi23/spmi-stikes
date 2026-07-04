import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import { useState , memo} from "react";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import EmptyState from "@/Components/EmptyState";
import Select from "react-select";
import useCrudForm from '@/Hooks/useCrudForm';
import { createCrudService } from '@/Services/crudService';

const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#f9fafb',
        borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
        padding: '0.25rem 0',
        borderRadius: '0.75rem',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.25)' : 'none',
        fontSize: '0.875rem',
        fontWeight: '700',
        color: '#374151',
        '&:hover': {
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '0.875rem',
        backgroundColor: state.isSelected ? '#eff6ff' : state.isFocused ? '#f3f4f6' : 'white',
        color: state.isSelected ? '#1d4ed8' : '#374151',
        fontWeight: state.isSelected ? '700' : '500',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#374151',
    }),
    input: (provided) => ({
        ...provided,
        color: '#374151',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#9ca3af',
        fontWeight: '500',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        zIndex: 50,
    })
};
import PageHeader from "@/Components/PageHeader";
import TableActions from "@/Components/TableActions";
import StatusBadge from "@/Components/StatusBadge";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import InputError from "@/Components/InputError";

function Index({ instrumens, standars }) {
    const instrumenService = createCrudService({
        routePrefix: '/dashboard/instrumen-audit',
        entityName: 'Instrumen',
        warningMessage: 'Data Instrumen ini akan terhapus secara permanen.',
    });

    const {
        data, setData, processing, errors,
        isModalOpen: isOpen, editingData: editing,
        openCreateModal: openCreate, openEditModal: openEdit, closeModal, handleSubmit,
    } = useCrudForm({
        routePrefix: '/dashboard/instrumen-audit',
        initialData: {
            standar_mutu_id: "",
            pertanyaan: "",
            deskripsi: "",
            bobot: "",
            urutan: "",
            is_active: true,
        },
        mapEditData: (item) => ({
            standar_mutu_id: item.standar_mutu_id || "",
            pertanyaan: item.pertanyaan || "",
            deskripsi: item.deskripsi || "",
            bobot: item.bobot || "",
            urutan: item.urutan || "",
            is_active: item.is_active ?? true,
        }),
        successCreateMessage: 'Data Instrumen berhasil ditambahkan.',
        successUpdateMessage: 'Data Instrumen berhasil diperbarui.',
    });
    
    const standarOptions = standars.map(std => ({
        value: std.id,
        label: `${std.kode} - ${std.nama}`
    }));

    return (
        <>
            <Head title="Instrumen Audit" />

            <PageHeader 
                title="Instrumen Audit"
                description="Kelola daftar pertanyaan/checklist untuk pelaksanaan Audit Mutu Internal."
                onAdd={openCreate}
                addText="+ Tambah Instrumen"
            />

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
                                            <StatusBadge active={item.is_active} activeText="Aktif" inactiveText="Nonaktif" />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <TableActions 
                                                onEdit={() => openEdit(item)}
                                                onDelete={() => instrumenService.delete(item.id)}
                                            />
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
                            <InputLabel value="Standar Mutu" required />
                            <Select 
                                options={standarOptions}
                                value={standarOptions.find(option => option.value === data.standar_mutu_id) || null}
                                onChange={(selectedOption) => setData("standar_mutu_id", selectedOption ? selectedOption.value : "")}
                                styles={customSelectStyles}
                                placeholder="Pilih atau cari standar mutu..."
                                isClearable
                                noOptionsMessage={() => "Standar mutu tidak ditemukan"}
                            />
                            <InputError message={errors.standar_mutu_id} />
                        </div>

                        <div>
                            <InputLabel value="Pertanyaan / Checklist" required />
                            <TextArea 
                                rows={3} 
                                value={data.pertanyaan} 
                                onChange={(e) => setData("pertanyaan", e.target.value)} 
                                placeholder="e.g. Apakah dokumen kurikulum tersedia dan terdokumentasi?" 
                            />
                            <InputError message={errors.pertanyaan} />
                        </div>

                        <div>
                            <InputLabel value="Deskripsi / Panduan" />
                            <TextArea 
                                rows={2} 
                                value={data.deskripsi} 
                                onChange={(e) => setData("deskripsi", e.target.value)} 
                                placeholder="Opsional: panduan penilaian untuk auditor..." 
                            />
                            <InputError message={errors.deskripsi} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div>
                                <InputLabel value="Bobot" required />
                                <TextInput 
                                    type="number" min="1" max="100" 
                                    value={data.bobot} 
                                    onChange={(e) => setData("bobot", e.target.value)} 
                                    placeholder="e.g. 10" 
                                />
                                <InputError message={errors.bobot} />
                            </div>
                            <div>
                                <InputLabel value="Urutan" required />
                                <TextInput 
                                    type="number" min="1" 
                                    value={data.urutan} 
                                    onChange={(e) => setData("urutan", e.target.value)} 
                                    placeholder="e.g. 1" 
                                />
                                <InputError message={errors.urutan} />
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
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Instrumen Audit">{page}</DashboardLayout>;
export default PersistedIndex;

