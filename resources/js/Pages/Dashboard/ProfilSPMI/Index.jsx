import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <DashboardLayout title="Profil SPMI">
            <Head title="Profil SPMI" />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Profil SPMI</h3>
                <p className="text-sm text-gray-600">
                    Halaman profil SPMI. Tambahkan visi, misi, struktur
                    organisasi, dan informasi lain di sini.
                </p>
            </div>
        </DashboardLayout>
    );
}
