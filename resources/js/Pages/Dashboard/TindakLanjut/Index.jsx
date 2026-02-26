import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ items }) {
    return (
        <DashboardLayout title="Tindak Lanjut">
            <Head title="Tindak Lanjut" />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Tindak Lanjut</h3>
                <p className="text-sm text-gray-600">
                    Daftar tindak lanjut yang terkait dengan temuan audit.
                </p>
                <div className="mt-4">
                    {items && items.data && items.data.length > 0 ? (
                        <ul className="space-y-3">
                            {items.data.map((i) => (
                                <li
                                    key={i.id}
                                    className="p-3 border rounded-lg"
                                >
                                    {i.deskripsi}
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
        </DashboardLayout>
    );
}
