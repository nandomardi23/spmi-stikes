import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Index({ dokumen }) {
    return (
        <DashboardLayout title="Dokumen Publik">
            <Head title="Dokumen Publik" />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Dokumen Publik</h3>
                <p className="text-sm text-gray-600">
                    Daftar dokumen yang ditandai publik.
                </p>
                <div className="mt-4">
                    {dokumen && dokumen.data && dokumen.data.length > 0 ? (
                        <ul className="space-y-2">
                            {dokumen.data.map((d) => (
                                <li
                                    key={d.id}
                                    className="p-3 border rounded-lg"
                                >
                                    {d.judul}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">
                            Belum ada dokumen publik.
                        </p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
