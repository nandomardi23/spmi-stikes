import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';

const kategoriLabels = {
    kebijakan: 'Kebijakan', manual: 'Manual', standar: 'Standar',
    formulir: 'Formulir', sop: 'SOP', laporan: 'Laporan', bukti: 'Bukti', lainnya: 'Lainnya',
};

export default function Index({ dokumens, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/dokumen', { search }, { preserveState: true });
    };

    return (
        <DashboardLayout title="Dokumen Mutu">
            <Head title="Dokumen Mutu" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari dokumen..." className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64" />
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                </form>
                <Link href="/dashboard/dokumen/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">
                    + Upload Dokumen
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Judul</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kategori</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Terbuka</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Uploader</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Ukuran</th>
                            <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {dokumens.data.length > 0 ? dokumens.data.map((d) => (
                            <tr key={d.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">{d.judul}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{d.tanggal_dokumen || '-'}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{kategoriLabels[d.kategori] || d.kategori}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${d.is_public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {d.is_public ? 'Publik' : 'Internal'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{d.uploader?.name || '-'}</td>
                                <td className="px-6 py-4 text-gray-600">{(d.file_size / 1024).toFixed(0)} KB</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <a href={`/dashboard/dokumen/${d.id}/download`} className="text-blue-600 hover:text-blue-700 font-medium">Download</a>
                                    <Link href={`/dashboard/dokumen/${d.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                    <button onClick={() => { if(confirm('Yakin ingin menghapus dokumen ini?')) router.delete(`/dashboard/dokumen/${d.id}`) }} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Tidak ada data dokumen.</td></tr>
                        )}
                    </tbody>
                </table>
                {dokumens.links && dokumens.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1">
                        {dokumens.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

