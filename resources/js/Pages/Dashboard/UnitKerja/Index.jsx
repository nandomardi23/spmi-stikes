import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Index({ unitKerjas }) {
    return (
        <DashboardLayout title="Unit Kerja">
            <Head title="Unit Kerja" />
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm text-gray-500">Kelola master data unit kerja auditee</h3>
                <Link href="/dashboard/unit-kerja/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">+ Tambah Unit</Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Nama Unit</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kepala Unit (Ketua)</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kategori</th>
                            <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {unitKerjas.data.length > 0 ? unitKerjas.data.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{u.nama}</td>
                                <td className="px-6 py-4 text-gray-600">{u.kepala_unit?.name || '-'}</td>
                                <td className="px-6 py-4 text-gray-600 capitalize">{u.kategori?.replace('_', ' ')}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/dashboard/unit-kerja/${u.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Hapus unit kerja ini?')) router.delete(`/dashboard/unit-kerja/${u.id}`) }} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Tidak ada data unit kerja.</td></tr>}
                    </tbody>
                </table>
                {unitKerjas.links && unitKerjas.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1">
                        {unitKerjas.links.map((link, i) => <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />)}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

