import { ChartBarSquareIcon, ClipboardDocumentCheckIcon, DocumentIcon, MagnifyingGlassIcon, UsersIcon, ExclamationTriangleIcon, ArrowPathIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

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
        { label: 'Unit Kerja', value: stats.total_unit_kerja, icon: <BuildingOfficeIcon className="w-5 h-5" />, color: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
        { label: 'Standar Mutu', value: stats.total_standar, icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />, color: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/20' },
        { label: 'Total Audit', value: stats.total_audit, icon: <MagnifyingGlassIcon className="w-5 h-5" />, color: 'from-amber-500 to-amber-600', shadow: 'shadow-amber-500/20' },
        { label: 'Audit Berjalan', value: stats.audit_berlangsung, icon: <ChartBarSquareIcon className="w-5 h-5" />, color: 'from-green-500 to-green-600', shadow: 'shadow-green-500/20' },
        { label: 'Temuan Terbuka', value: stats.temuan_open, icon: <ExclamationTriangleIcon className="w-5 h-5" />, color: 'from-red-500 to-red-600', shadow: 'shadow-red-500/20' },
        { label: 'Dalam Proses', value: stats.temuan_in_progress, icon: <ArrowPathIcon className="w-5 h-5" />, color: 'from-orange-500 to-orange-600', shadow: 'shadow-orange-500/20' },
        { label: 'Total Dokumen', value: stats.total_dokumen, icon: <DocumentIcon className="w-5 h-5" />, color: 'from-teal-500 to-teal-600', shadow: 'shadow-teal-500/20' },
        { label: 'Total Pengguna', value: stats.total_users, icon: <UsersIcon className="w-5 h-5" />, color: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-500/20' },
    ];

    return (
        <DashboardLayout title="Dashboard Overview">
            <Head title="Dashboard" />

            <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">Pantau performa dan ringkasan penjaminan mutu Anda secara real-time.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                {statCards.map((card, i) => (
                    <div key={i} className={`bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 bg-linear-to-br ${card.color} rounded-xl text-white shadow-lg ${card.shadow} group-hover:scale-110 transition duration-300`}>
                                {card.icon}
                            </div>
                        </div>
                        <p className="text-3xl font-black text-gray-900 tracking-tight">{card.value}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Audits */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <div>
                            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Audit Terbaru</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Jadwal pelaksanaan audit</p>
                        </div>
                        <Link href="/dashboard/audit" className="text-xs text-primary-600 hover:text-primary-700 font-extrabold uppercase tracking-tight bg-primary-50 px-3 py-1.5 rounded-lg transition">Lihat Semua</Link>
                    </div>
                    <div className="divide-y divide-gray-50 flex-1">
                        {recentAudits.length > 0 ? recentAudits.map((audit) => (
                            <div key={audit.id} className="px-8 py-5 hover:bg-gray-50/50 transition duration-200 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition">
                                            <BuildingOfficeIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm group-hover:text-primary-700 transition">{audit.unit_kerja?.nama}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1 italic">{audit.siklus_audit?.nama} • {audit.auditor?.name || 'Belum ditugaskan'}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[audit.status]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${statusColors[audit.status]}`}>{audit.status}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                <MagnifyingGlassIcon className="w-12 h-12 mb-3 opacity-20" />
                                <p className="text-sm font-medium tracking-tight">Belum ada data audit terbaru.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Temuan */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <div>
                            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Temuan Aktif</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Ketidaksesuaian yang ditemukan</p>
                        </div>
                        <Link href="/dashboard/temuan" className="text-xs text-primary-600 hover:text-primary-700 font-extrabold uppercase tracking-tight bg-primary-50 px-3 py-1.5 rounded-lg transition">Lihat Semua</Link>
                    </div>
                    <div className="divide-y divide-gray-50 flex-1">
                        {recentTemuan.length > 0 ? recentTemuan.map((temuan) => (
                            <div key={temuan.id} className="px-8 py-5 hover:bg-gray-50/50 transition duration-200 group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter border ${jenisColors[temuan.jenis]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${jenisColors[temuan.jenis]}`}>{temuan.jenis}</span>
                                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter border ${statusColors[temuan.status]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${statusColors[temuan.status]}`}>{temuan.status}</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition line-clamp-1">{temuan.deskripsi}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1 italic">{temuan.audit?.unit_kerja?.nama}</p>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                <ExclamationTriangleIcon className="w-12 h-12 mb-3 opacity-20" />
                                <p className="text-sm font-medium tracking-tight">Tidak ada temuan aktif saat ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

