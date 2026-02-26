import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <DashboardLayout title="Rapat Tinjauan Manajemen">
            <Head title="Rapat Tinjauan Manajemen" />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                    Rapat Tinjauan Manajemen
                </h3>
                <p className="text-sm text-gray-600">
                    Kelola notulen, keputusan, dan tindak lanjut rapat manajemen
                    di halaman ini.
                </p>
            </div>
        </DashboardLayout>
    );
}
