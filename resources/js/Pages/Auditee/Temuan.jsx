import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Pagination from '@/Components/Pagination';

const jenisColors = { observasi: 'bg-blue-100 text-blue-700', minor: 'bg-amber-100 text-amber-700', mayor: 'bg-red-100 text-red-700' };
const statusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-amber-100 text-amber-700', closed: 'bg-green-100 text-green-700', verified: 'bg-blue-100 text-blue-700' };

export default function Temuan({ temuans }) {
    return (
        <DashboardLayout title="Temuan Audit">
            <Head title="Temuan Audit" />
            <p className="text-sm text-gray-500 mb-6">Daftar temuan audit yang perlu ditindaklanjuti oleh unit kerja Anda.</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Pelaksanaan Audit</th>
                        <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Jenis</th>
                        <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Deskripsi</th>
                        <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Batas Waktu</th>
                        <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Status</th>
                        <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                    </tr></thead>
                    <tbody className="divide-y divide-gray-50">
                        {temuans.data.length > 0 ? temuans.data.map(t => (
                            <tr key={t.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900 text-xs">{t.audit?.siklus_audit?.nama}<br/><span className="text-gray-500">{t.audit?.tanggal_audit ? new Date(t.audit.tanggal_audit).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</span></td>
                                <td className="px-6 py-4 text-center"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${jenisColors[t.jenis]}`}>{t.jenis}</span></td>
                                <td className="px-6 py-4 text-left text-gray-600 max-w-xs truncate">{t.deskripsi}</td>
                                <td className="px-6 py-4 text-center text-gray-500 text-xs">{t.batas_waktu || '-'}</td>
                                <td className="px-6 py-4 text-center"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[t.status]}`}>{t.status}</span></td>
                                <td className="px-6 py-4 text-right"><Link href={`/auditee/temuan/${t.id}`} className="text-primary-600 font-medium">Lihat Detail & Tindak Lanjut</Link></td>
                            </tr>
                        )) : <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Tidak ada temuan.</td></tr>}
                    </tbody>
                </table>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination links={temuans.links} />
                </div>
            </div>
        </DashboardLayout>
    );
}

