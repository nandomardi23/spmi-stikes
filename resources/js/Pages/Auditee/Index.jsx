import { memo } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const statusColors = { dijadwalkan: 'bg-blue-100 text-blue-700', berlangsung: 'bg-amber-100 text-amber-700', selesai: 'bg-green-100 text-green-700', dibatalkan: 'bg-red-100 text-red-700' };

function Index({ user, unitKerja, recentAudits, totalTemuanOpen, totalDokumen }) {
    if (!unitKerja) {
        return (
            <DashboardLayout title="Portal Auditee">
                <div className="bg-red-50 text-red-800 p-6 rounded-2xl border border-red-200">Akun Anda belum dipetakan ke Unit Kerja manapun. Hubungi Admin.</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title={`Portal Auditee: ${unitKerja.nama}`}>
            <Head title="Portal Auditee" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-linear-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white shadow-lg">
                    <p className="text-primary-200 text-sm mb-1">Unit Kerja</p>
                    <h3 className="text-xl font-bold mb-4">{unitKerja.nama}</h3>
                    <div className="flex items-center gap-2 text-sm text-primary-100"><span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">👤</span>{unitKerja.kepala_unit?.name || 'Belum di set'}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl">⚠️</div>
                    <div><p className="text-3xl font-bold text-gray-900">{totalTemuanOpen}</p><p className="text-sm text-gray-500">Temuan Aktif (Open/In Progress)</p></div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl">📄</div>
                    <div><p className="text-3xl font-bold text-gray-900">{totalDokumen}</p><p className="text-sm text-gray-500">Dokumen Unit</p></div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Jadwal Audit</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {recentAudits.length > 0 ? recentAudits.map(a => (
                        <div key={a.id} className="px-6 py-4 hover:bg-gray-50 transition">
                            <div className="flex justify-between mb-1">
                                <p className="font-medium text-gray-900">{a.siklus_audit?.nama}</p>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[a.status]}`}>{a.status}</span>
                            </div>
                            <p className="text-sm text-gray-500">Jadwal: {a.tanggal_audit || 'Belum dijadwalkan'} • Auditor: {a.auditor?.name || 'Belum ada'}</p>
                        </div>
                    )) : <p className="px-6 py-8 text-center text-gray-400">Tidak ada jadwal audit untuk unit ini.</p>}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default memo(Index);
