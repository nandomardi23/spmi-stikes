import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
const jenisColors = { observasi: 'bg-blue-100 text-blue-700', minor: 'bg-amber-100 text-amber-700', mayor: 'bg-red-100 text-red-700' };
const statusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-amber-100 text-amber-700', closed: 'bg-green-100 text-green-700', verified: 'bg-blue-100 text-blue-700' };
export default function Index({ temuans, filters }) {
    return (
        <DashboardLayout title="Temuan"><Head title="Temuan" />
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">{['', 'open', 'in_progress', 'closed'].map(s => <button key={s} onClick={() => router.get('/dashboard/temuan', { status: s }, { preserveState: true })} className={`px-4 py-2 text-sm rounded-xl transition ${(filters.status || '') === s ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{s || 'Semua'}</button>)}</div>
                <Link href="/dashboard/temuan/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25">+ Tambah Temuan</Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm"><thead><tr className="border-b border-gray-100 bg-gray-50/50"><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Unit Kerja</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Jenis</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Deskripsi</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Status</th><th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th></tr></thead>
                <tbody className="divide-y divide-gray-50">{temuans.data.length > 0 ? temuans.data.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900 text-xs">{t.audit?.unit_kerja?.nama}</td>
                        <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${jenisColors[t.jenis]}`}>{t.jenis}</span></td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{t.deskripsi}</td>
                        <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[t.status]}`}>{t.status}</span></td>
                        <td className="px-6 py-4 text-right space-x-2"><Link href={`/dashboard/temuan/${t.id}/edit`} className="text-primary-600 font-medium">Edit</Link><button onClick={() => { if(confirm('Hapus?')) router.delete(`/dashboard/temuan/${t.id}`) }} className="text-danger-500 font-medium">Hapus</button></td>
                    </tr>)) : <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada temuan.</td></tr>}</tbody></table>
            </div>
        </DashboardLayout>
    );
}

