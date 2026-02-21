import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';

export default function Index({ galeris, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/galeri', { search }, { preserveState: true });
    };

    return (
        <DashboardLayout title="Galeri Dokumentasi Kegiatan">
            <Head title="Galeri Dokumentasi Kegiatan" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Cari dokumentasi..." 
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64" 
                    />
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                </form>
                <Link href="/dashboard/galeri/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">
                    + Tambah Dokumentasi
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Terlihat</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600 w-24">Gambar</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Judul</th>
                            <th className="text-left px-6 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Deskripsi</th>
                            <th className="text-center px-6 py-3.5 font-semibold text-gray-600 w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {galeris.data.length > 0 ? galeris.data.map((g) => (
                            <tr key={g.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${g.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {g.is_active ? 'Aktif' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <img 
                                        src={`/storage/${g.file_path}`} 
                                        alt={g.judul} 
                                        className="w-16 h-12 rounded bg-gray-100 object-cover border border-gray-200"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">{g.judul}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{(g.file_size / 1024).toFixed(0)} KB &bull; {new Date(g.created_at).toLocaleDateString()}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-600 max-w-xs truncate hidden md:table-cell">
                                    {g.deskripsi || '-'}
                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <Link href={`/dashboard/galeri/${g.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium text-xs">Edit</Link>
                                    <button 
                                        onClick={() => { if(confirm('Yakin ingin menghapus dokumentasi ini?')) router.delete(`/dashboard/galeri/${g.id}`) }} 
                                        className="text-danger-500 hover:text-danger-600 font-medium text-xs"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada data galeri.</td></tr>
                        )}
                    </tbody>
                </table>
                {galeris.links && galeris.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-1 overflow-x-auto">
                        {galeris.links.map((link, i) => (
                            <Link 
                                key={i} 
                                href={link.url || '#'} 
                                className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`} 
                                dangerouslySetInnerHTML={{ __html: link.label }} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
