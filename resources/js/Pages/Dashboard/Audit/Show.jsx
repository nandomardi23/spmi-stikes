import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const statusColors = { dijadwalkan: 'bg-blue-100 text-blue-700', berlangsung: 'bg-amber-100 text-amber-700', selesai: 'bg-green-100 text-green-700', dibatalkan: 'bg-red-100 text-red-700' };
const jenisColors = { observasi: 'bg-blue-100 text-blue-700', minor: 'bg-amber-100 text-amber-700', mayor: 'bg-red-100 text-red-700' };
const temuanStatusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-amber-100 text-amber-700', closed: 'bg-green-100 text-green-700', verified: 'bg-blue-100 text-blue-700' };

export default function Show({ audit }) {
    return (
        <DashboardLayout title="Detail Audit">
            <Head title="Detail Audit" />
            <div className="mb-6"><Link href="/dashboard/audit" className="text-sm text-primary-600 hover:text-primary-700">← Kembali</Link></div>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{audit.unit_kerja?.nama}</h3>
                            <span className={`px-3 py-1 text-sm font-medium rounded-lg ${statusColors[audit.status]}`}>{audit.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-500">Siklus:</span><p className="font-medium text-gray-900">{audit.siklus_audit?.nama}</p></div>
                            <div><span className="text-gray-500">Auditor:</span><p className="font-medium text-gray-900">{audit.auditor?.name || 'Belum ditugaskan'}</p></div>
                            <div><span className="text-gray-500">Tanggal:</span><p className="font-medium text-gray-900">{audit.tanggal_audit || '-'}</p></div>
                            <div><span className="text-gray-500">Skor:</span><p className="font-medium text-gray-900 text-lg">{audit.skor || '-'}</p></div>
                        </div>
                        {audit.catatan && <div className="mt-4 pt-4 border-t border-gray-100"><span className="text-sm text-gray-500">Catatan:</span><p className="text-sm text-gray-700 mt-1">{audit.catatan}</p></div>}
                    </div>

                    {/* Temuan */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Temuan ({audit.temuans?.length || 0})</h3>
                            <Link href={`/dashboard/temuan/create?audit_id=${audit.id}`} className="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Tambah</Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {audit.temuans?.length > 0 ? audit.temuans.map(t => (
                                <div key={t.id} className="px-6 py-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${jenisColors[t.jenis]}`}>{t.jenis}</span>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${temuanStatusColors[t.status]}`}>{t.status}</span>
                                        {t.standar_mutu && <span className="text-xs text-gray-400">{t.standar_mutu.kode}</span>}
                                    </div>
                                    <p className="text-sm text-gray-900">{t.deskripsi}</p>
                                    {t.rekomendasi && <p className="text-xs text-gray-500 mt-1">Rekomendasi: {t.rekomendasi}</p>}
                                </div>
                            )) : <p className="px-6 py-8 text-sm text-gray-400 text-center">Belum ada temuan.</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Aksi</h3>
                        <div className="space-y-2">
                            <Link href={`/dashboard/audit/${audit.id}/edit`} className="block w-full text-center px-4 py-2.5 bg-primary-50 text-primary-700 font-medium rounded-xl hover:bg-primary-100 transition text-sm">Edit Audit</Link>
                            <Link href={`/dashboard/temuan/create?audit_id=${audit.id}`} className="block w-full text-center px-4 py-2.5 bg-amber-50 text-amber-700 font-medium rounded-xl hover:bg-amber-100 transition text-sm">Tambah Temuan</Link>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

