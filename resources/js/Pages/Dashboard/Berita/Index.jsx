import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';

export default function Index({ berita, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const handleSearch = e => { e.preventDefault(); router.get('/dashboard/berita', { search }, { preserveState: true }); };

    return (
        <DashboardLayout title="Berita & Pengumuman">
            <Head title="Berita & Pengumuman" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita..." className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none w-64" />
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                </form>
                <Link href="/dashboard/berita/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25">
                    + Tulis Berita
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50/50"><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Judul</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Status</th><th className="text-left px-6 py-3.5 font-semibold text-gray-600">Tanggal Upload</th><th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">
                        {berita.data.length > 0 ? berita.data.map(b => (
                            <tr key={b.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {b.gambar && <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0"><img src={`/storage/${b.gambar}`} className="w-full h-full object-cover" /></div>}
                                        <div><p className="font-medium text-gray-900">{b.judul}</p><p className="text-xs text-gray-500 max-w-sm truncate">{b.ringkasan}</p></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${b.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{b.is_published ? 'Terpublikasi' : 'Draft'}</span></td>
                                <td className="px-6 py-4 text-gray-500 text-xs">{b.published_at ? new Date(b.published_at).toLocaleDateString('id-ID') : '-'}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/dashboard/berita/${b.id}/edit`} className="text-primary-600 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Hapus berita?')) router.delete(`/dashboard/berita/${b.id}`) }} className="text-danger-500 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Tidak ada berita.</td></tr>}
                    </tbody>
                </table>
                {berita.links && berita.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1">
                        {berita.links.map((link, i) => <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />)}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

