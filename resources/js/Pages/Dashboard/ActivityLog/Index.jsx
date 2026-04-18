import { memo } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ClockIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const eventColors = {
    created: 'bg-green-100 text-green-700 border-green-200',
    updated: 'bg-blue-100 text-blue-700 border-blue-200',
    deleted: 'bg-red-100 text-red-700 border-red-200',
};

function ActivityLogIndex({ activities, filters }) {
    const handleFilter = (key, value) => {
        router.get('/dashboard/activity-log', {
            ...filters,
            [key]: value || undefined,
        }, { preserveState: true, preserveScroll: true });
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            <Head title="Activity Log" />

            <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Activity Log</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">Riwayat semua perubahan data di sistem.</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-6">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari aktivitas..."
                            defaultValue={filters?.search || ''}
                            onChange={(e) => {
                                clearTimeout(window.__activitySearchTimeout);
                                window.__activitySearchTimeout = setTimeout(() => handleFilter('search', e.target.value), 300);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm"
                        />
                    </div>
                    <select
                        value={filters?.event || ''}
                        onChange={(e) => handleFilter('event', e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm bg-white"
                    >
                        <option value="">Semua Event</option>
                        <option value="created">Created</option>
                        <option value="updated">Updated</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </div>
            </div>

            {/* Activity List */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {activities.data?.length > 0 ? activities.data.map((activity) => (
                        <div key={activity.id} className="px-8 py-5 hover:bg-gray-50/50 transition duration-200 group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition shrink-0 mt-0.5">
                                    <ClockIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-tight border ${eventColors[activity.event] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                            {activity.event || 'log'}
                                        </span>
                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-tight bg-purple-50 text-purple-600 border border-purple-200">
                                            {activity.subject_type?.split('\\').pop() || '-'}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition">{activity.description}</p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                            {activity.causer?.name || 'System'}
                                        </span>
                                        <span className="text-[10px] text-gray-300">•</span>
                                        <span className="text-[10px] text-gray-400 font-medium italic">
                                            {formatDate(activity.created_at)}
                                        </span>
                                    </div>
                                    {activity.properties && Object.keys(activity.properties).length > 0 && (
                                        <details className="mt-2">
                                            <summary className="text-[10px] text-blue-500 font-bold uppercase tracking-wider cursor-pointer hover:text-blue-700">
                                                Detail Perubahan
                                            </summary>
                                            <pre className="mt-1. 5 p-3 bg-gray-50 rounded-lg text-[11px] text-gray-600 overflow-x-auto font-mono">
                                                {JSON.stringify(activity.properties, null, 2)}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <ClockIcon className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-sm font-medium tracking-tight">Belum ada aktivitas tercatat.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {activities.links && activities.last_page > 1 && (
                    <div className="px-8 py-4 border-t border-gray-50 flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-medium">
                            Menampilkan {activities.from}-{activities.to} dari {activities.total}
                        </p>
                        <div className="flex gap-1">
                            {activities.links.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    disabled={!link.url}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                                        link.active
                                            ? 'bg-blue-500 text-white shadow-sm'
                                            : link.url
                                              ? 'text-gray-600 hover:bg-gray-100'
                                              : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

const PersistedActivityLog = memo(ActivityLogIndex);
PersistedActivityLog.layout = page => <DashboardLayout title="Activity Log">{page}</DashboardLayout>;
export default PersistedActivityLog;
