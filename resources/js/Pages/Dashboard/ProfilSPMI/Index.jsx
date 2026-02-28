import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({ spmi_visi, spmi_misi, spmi_tujuan, spmi_struktur }) {
    const { data, setData, post, processing, errors } = useForm({
        spmi_visi: spmi_visi || "",
        spmi_misi: spmi_misi || "",
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
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Pengaturan Profil SPMI</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Kelola informasi dasar mengenai Sistem Penjaminan Mutu Internal (SPMI) STIKES.
                    </p>
                </div>

                <div className="p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Visi SPMI</label>
                                <textarea
                                    value={data.spmi_visi}
                                    onChange={(e) => setData("spmi_visi", e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                                    placeholder="Tuliskan Visi SPMI..."
                                />
                                {errors.spmi_visi && <p className="mt-1 text-sm text-red-500 font-medium">{errors.spmi_visi}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Misi SPMI</label>
                                <textarea
                                    value={data.spmi_misi}
                                    onChange={(e) => setData("spmi_misi", e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                                    placeholder="Tuliskan Misi SPMI..."
                                />
                                {errors.spmi_misi && <p className="mt-1 text-sm text-red-500 font-medium">{errors.spmi_misi}</p>}
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tujuan & Sasaran Mutu</label>
                                <textarea
                                    value={data.spmi_tujuan}
                                    onChange={(e) => setData("spmi_tujuan", e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                                    placeholder="Jabarkan tujuan dan sasaran penerapan SPMI..."
                                />
                                {errors.spmi_tujuan && <p className="mt-1 text-sm text-red-500 font-medium">{errors.spmi_tujuan}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Struktur Organisasi (Opsional)</label>
                                <textarea
                                    value={data.spmi_struktur}
                                    onChange={(e) => setData("spmi_struktur", e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                                    placeholder="Informasi seputar unit kerja LPM atau struktur penjaminan mutu..."
                                />
                                {errors.spmi_struktur && <p className="mt-1 text-sm text-red-500 font-medium">{errors.spmi_struktur}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-extrabold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Simpan Profil SPMI"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
