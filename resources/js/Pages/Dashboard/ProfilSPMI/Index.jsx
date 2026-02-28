import { memo } from 'react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { AcademicCapIcon, DocumentTextIcon, CheckCircleIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

function Index({ visi, misi, spmi_tujuan, spmi_struktur }) {
    const { data, setData, post, processing, errors } = useForm({
        visi: visi || "",
        misi: misi || "",
        spmi_tujuan: spmi_tujuan || "",
        spmi_struktur: spmi_struktur || "",
    });

    const submit = (e) => {
        e.preventDefault();
        post('/dashboard/profil-spmi', {
            onSuccess: () => {
                Swal.fire('Berhasil!', 'Profil SPMI berhasil diperbarui.', 'success');
            },
        });
    };

    return (
        <DashboardLayout title="Profil SPMI">
            <Head title="Profil SPMI" />
            
            <div className="max-w-5xl">
                <form onSubmit={submit} className="space-y-8">
                    {/* Visi & Misi Institusi */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-primary-50 rounded-2xl">
                                    <AcademicCapIcon className="w-8 h-8 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Visi & Misi Institusi</h2>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Landasan filosofis dan tujuan utama STIKES Hang Tuah Tanjungpinang.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Visi */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <DocumentTextIcon className="w-5 h-5 text-primary-500" />
                                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                            Visi <span className="text-danger-500">*</span>
                                        </label>
                                    </div>
                                    <textarea
                                        value={data.visi}
                                        onChange={(e) => setData("visi", e.target.value)}
                                        rows={4}
                                        className="w-full rounded-2xl border-gray-200 bg-gray-50/50 px-5 py-4 text-sm focus:border-primary-500 focus:ring-primary-500 font-medium transition duration-200 leading-relaxed"
                                        placeholder="Masukkan Visi institusi..."
                                    />
                                    {errors.visi && <p className="mt-1 text-sm text-red-500 font-medium">{errors.visi}</p>}
                                </div>

                                {/* Misi */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <CheckCircleIcon className="w-5 h-5 text-success-500" />
                                            <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                                Misi <span className="text-danger-500">*</span>
                                            </label>
                                        </div>
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-lg font-bold uppercase">Tips: Tekan Enter untuk poin baru</span>
                                    </div>
                                    <textarea
                                        value={data.misi}
                                        onChange={(e) => setData("misi", e.target.value)}
                                        rows={6}
                                        className="w-full rounded-2xl border-gray-200 bg-gray-50/50 px-5 py-4 text-sm focus:border-primary-500 focus:ring-primary-500 font-medium transition duration-200 leading-relaxed"
                                        placeholder={"1. Meningkatkan kualitas...\n2. Menyelenggarakan..."}
                                    />
                                    {errors.misi && <p className="mt-1 text-sm text-red-500 font-medium">{errors.misi}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tujuan & Struktur SPMI */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-amber-50 rounded-2xl">
                                    <BuildingOffice2Icon className="w-8 h-8 text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Tujuan & Struktur SPMI</h2>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Informasi khusus terkait Sistem Penjaminan Mutu Internal.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Tujuan & Sasaran Mutu</label>
                                    <textarea
                                        value={data.spmi_tujuan}
                                        onChange={(e) => setData("spmi_tujuan", e.target.value)}
                                        rows={4}
                                        className="w-full rounded-2xl border-gray-200 bg-gray-50/50 px-5 py-4 text-sm focus:border-primary-500 focus:ring-primary-500 font-medium transition duration-200 leading-relaxed"
                                        placeholder="Jabarkan tujuan dan sasaran penerapan SPMI..."
                                    />
                                    {errors.spmi_tujuan && <p className="mt-1 text-sm text-red-500 font-medium">{errors.spmi_tujuan}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Struktur Organisasi SPMI</label>
                                    <textarea
                                        value={data.spmi_struktur}
                                        onChange={(e) => setData("spmi_struktur", e.target.value)}
                                        rows={3}
                                        className="w-full rounded-2xl border-gray-200 bg-gray-50/50 px-5 py-4 text-sm focus:border-primary-500 focus:ring-primary-500 font-medium transition duration-200 leading-relaxed"
                                        placeholder="Informasi seputar unit kerja LPM atau struktur penjaminan mutu..."
                                    />
                                    {errors.spmi_struktur && <p className="mt-1 text-sm text-red-500 font-medium">{errors.spmi_struktur}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end sticky bottom-8 z-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-10 py-4 bg-linear-to-br from-primary-600 to-primary-700 text-white text-base font-extrabold rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-2xl shadow-primary-500/40 active:scale-95"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <CheckCircleIcon className="w-6 h-6" />
                                    Simpan Profil SPMI
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default memo(Index);
