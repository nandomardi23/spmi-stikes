import { memo } from 'react';
import { ChartBarSquareIcon, ClipboardDocumentCheckIcon, DocumentIcon, MagnifyingGlassIcon, UsersIcon, ExclamationTriangleIcon, ArrowPathIcon, BuildingOfficeIcon, ClockIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

const PIE_COLORS_JENIS = ['#ef4444', '#f59e0b', '#3b82f6'];
const PIE_COLORS_STATUS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6'];

function Index({ stats, recentAudits, recentTemuan, temuanByJenis, temuanByStatus, temuanPerSiklus, tindakLanjutProgress, overdueTemuan, skorPerUnit }) {
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
        <>
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

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-10">
                {/* Temuan per Siklus Audit - Bar Chart */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Temuan per Siklus Audit</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Distribusi temuan berdasarkan siklus</p>
                    </div>
                    <div className="p-6">
                        {temuanPerSiklus?.length > 0 ? (
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={temuanPerSiklus} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600 }} />
                                    <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                                    <Bar dataKey="mayor" name="Mayor" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="minor" name="Minor" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="observasi" name="Observasi" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-[280px] text-gray-400 text-sm">Belum ada data</div>
                        )}
                    </div>
                </div>

                {/* Temuan by Jenis & Status - Pie Charts */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Distribusi Temuan</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Berdasarkan jenis dan status</p>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-bold text-gray-500 mb-2 text-center uppercase tracking-wider">Per Jenis</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={temuanByJenis} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''} labelLine={false}>
                                        {temuanByJenis?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS_JENIS[index % PIE_COLORS_JENIS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 mb-2 text-center uppercase tracking-wider">Per Status</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={temuanByStatus} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''} labelLine={false}>
                                        {temuanByStatus?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS_STATUS[index % PIE_COLORS_STATUS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress & Overdue Row */}
            <div className="grid lg:grid-cols-3 gap-8 mb-10">
                {/* Tindak Lanjut Progress */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-1">Tindak Lanjut</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Progress penyelesaian</p>
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                                <circle cx="60" cy="60" r="50" fill="none" stroke="url(#progressGradient)" strokeWidth="10" strokeLinecap="round"
                                    strokeDasharray={`${(tindakLanjutProgress / 100) * 314} 314`}
                                />
                                <defs>
                                    <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#22c55e" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-black text-gray-900">{tindakLanjutProgress}%</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center font-medium">Dari seluruh tindak lanjut yang diajukan</p>
                </div>

                {/* Overdue Temuan */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 bg-red-50/30 flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-xl">
                            <ClockIcon className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Temuan Overdue</h3>
                            <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-0.5">Melewati batas waktu penyelesaian</p>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {overdueTemuan?.length > 0 ? overdueTemuan.map((temuan) => (
                            <div key={temuan.id} className="px-8 py-4 hover:bg-red-50/30 transition">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter border ${jenisColors[temuan.jenis]?.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} ${jenisColors[temuan.jenis]}`}>{temuan.jenis}</span>
                                    <span className="text-[10px] text-red-500 font-bold">
                                        ⚠ {new Date(temuan.batas_waktu).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{temuan.deskripsi}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5 italic">{temuan.audit?.unit_kerja?.nama}</p>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                <p className="text-sm font-medium">🎉 Tidak ada temuan overdue!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Skor Per Unit Kerja */}
            {skorPerUnit?.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Skor Audit per Unit Kerja</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Rata-rata skor audit</p>
                    </div>
                    <div className="p-6">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={skorPerUnit} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10, fontWeight: 600 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                                <Bar dataKey="skor" name="Skor" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

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
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Dashboard Overview">{page}</DashboardLayout>;
export default PersistedIndex;
