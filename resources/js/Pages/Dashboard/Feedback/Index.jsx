import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <DashboardLayout title="Umpan Balik & Kuesioner">
            <Head title="Umpan Balik & Kuesioner" />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                    Umpan Balik & Kuesioner
                </h3>
                <p className="text-sm text-gray-600">
                    Halaman untuk mengelola form kuesioner dan melihat hasil
                    feedback.
                </p>
            </div>
        </DashboardLayout>
    );
}
