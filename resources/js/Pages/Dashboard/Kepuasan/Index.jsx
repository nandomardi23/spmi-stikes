import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <DashboardLayout title="Diagram Kepuasan">
            <Head title="Diagram Kepuasan" />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Diagram Kepuasan</h3>
                <p className="text-sm text-gray-600">
                    Halaman visualisasi kepuasan (grafik) — integrasikan chart
                    library nanti.
                </p>
            </div>
        </DashboardLayout>
    );
}
