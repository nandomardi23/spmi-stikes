import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const statusColors = {
    dijadwalkan: 'bg-blue-100 text-blue-700',
    berlangsung: 'bg-amber-100 text-amber-700',
    selesai: 'bg-green-100 text-green-700',
    dibatalkan: 'bg-red-100 text-red-700',
    open: 'bg-red-100 text-red-700',
    in_progress: 'bg-amber-100 text-amber-700',
    closed: 'bg-green-100 text-green-700',
    verified: 'bg-blue-100 text-blue-700',
};

const jenisColors = {
    observasi: 'bg-blue-100 text-blue-700',
    minor: 'bg-amber-100 text-amber-700',
    mayor: 'bg-red-100 text-red-700',
};

export default function Index({ stats, recentAudits, recentTemuan }) {
    const statCards = [
        { label: 'Unit Kerja', value: stats.total_unit_kerja, icon: '🏢', color: 'from-blue-500 to-blue-600' },
        { label: 'Standar Mutu', value: stats.total_standar, icon: '📋', color: 'from-purple-500 to-purple-600' },
        { label: 'Total Audit', value: stats.total_audit, icon: '🔍', color: 'from-amber-500 to-amber-600' },
        { label: 'Audit Berlangsung', value: stats.audit_berlangsung, icon: '⚙️', color: 'from-green-500 to-green-600' },
        { label: 'Temuan Open', value: stats.temuan_open, icon: '⚠️', color: 'from-red-500 to-red-600' },
        { label: 'Temuan In-Progress', value: stats.temuan_in_progress, icon: '🔄', color: 'from-orange-500 to-orange-600' },
        { label: 'Total Dokumen', value: stats.total_dokumen, icon: '📄', color: 'from-teal-500 to-teal-600' },
        { label: 'Total Users', value: stats.total_users, icon: '👥', color: 'from-indigo-500 to-indigo-600' },
    ];

    return (
        <DashboardLayout title="Dashboard">
            <Head title="Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">{card.icon}</span>
                            <div className={`w-8 h-8 bg-linear-to-br ${card.color} rounded-lg opacity-20`} />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Audits */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Audit Terbaru</h3>
                        <Link href="/dashboard/audit" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Lihat Semua</Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentAudits.length > 0 ? recentAudits.map((audit) => (
                            <div key={audit.id} className="px-6 py-4 hover:bg-gray-50 transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{audit.unit_kerja?.nama}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{audit.siklus_audit?.nama} • {audit.auditor?.name || 'Belum ditugaskan'}</p>
                                    </div>
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[audit.status]}`}>{audit.status}</span>
                                </div>
                            </div>
                        )) : (
                            <p className="px-6 py-8 text-gray-400 text-sm text-center">Belum ada data audit.</p>
                        )}
                    </div>
                </div>

                {/* Recent Temuan */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Temuan Aktif</h3>
                        <Link href="/dashboard/temuan" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Lihat Semua</Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentTemuan.length > 0 ? recentTemuan.map((temuan) => (
                            <div key={temuan.id} className="px-6 py-4 hover:bg-gray-50 transition">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${jenisColors[temuan.jenis]}`}>{temuan.jenis}</span>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${statusColors[temuan.status]}`}>{temuan.status}</span>
                                </div>
                                <p className="text-sm text-gray-900 line-clamp-1">{temuan.deskripsi}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{temuan.audit?.unit_kerja?.nama}</p>
                            </div>
                        )) : (
                            <p className="px-6 py-8 text-gray-400 text-sm text-center">Tidak ada temuan aktif.</p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

