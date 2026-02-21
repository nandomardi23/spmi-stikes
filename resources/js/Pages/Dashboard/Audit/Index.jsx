import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';

const statusColors = { dijadwalkan: 'bg-blue-100 text-blue-700', berlangsung: 'bg-amber-100 text-amber-700', selesai: 'bg-green-100 text-green-700', dibatalkan: 'bg-red-100 text-red-700' };

export default function Index({ audits, siklus, filters }) {
    const [status, setStatus] = useState(filters.status || '');
    const handleFilter = (val) => { setStatus(val); router.get('/dashboard/audit', { status: val, siklus: filters.siklus }, { preserveState: true }); };
    return (
        <DashboardLayout title="Audit">
            <Head title="Audit" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex gap-2">
                    {['', 'dijadwalkan', 'berlangsung', 'selesai'].map(s => (
                        <button key={s} onClick={() => handleFilter(s)} className={`px-4 py-2 text-sm rounded-xl transition ${status === s ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{s || 'Semua'}</button>
                    ))}
                </div>
                <Link href="/dashboard/audit/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">+ Tambah Audit</Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50/50"><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Unit Kerja</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Siklus</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Auditor</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Tanggal</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Status</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Skor</th><th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">
                        {audits.data.length > 0 ? audits.data.map(a => (
                            <tr key={a.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{a.unit_kerja?.nama}</td>
                                <td className="px-6 py-4 text-gray-600 text-xs">{a.siklus_audit?.nama}</td>
                                <td className="px-6 py-4 text-gray-600">{a.auditor?.name || '-'}</td>
                                <td className="px-6 py-4 text-gray-500 text-xs">{a.tanggal_audit || '-'}</td>
                                <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[a.status]}`}>{a.status}</span></td>
                                <td className="px-6 py-4 font-semibold text-gray-700">{a.skor || '-'}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/dashboard/audit/${a.id}`} className="text-gray-500 hover:text-gray-700 font-medium">Detail</Link>
                                    <Link href={`/dashboard/audit/${a.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Hapus?')) router.delete(`/dashboard/audit/${a.id}`) }} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Belum ada data audit.</td></tr>}
                    </tbody>
                </table>
                {audits.links && audits.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1">
                        {audits.links.map((link, i) => <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />)}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

