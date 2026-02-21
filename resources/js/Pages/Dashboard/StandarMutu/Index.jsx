import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState } from 'react';

const kategoriLabels = {
    pendidikan: 'Pendidikan', penelitian: 'Penelitian', pengabdian: 'Pengabdian',
    tata_kelola: 'Tata Kelola', kemahasiswaan: 'Kemahasiswaan', sdm: 'SDM',
    keuangan: 'Keuangan', sarana_prasarana: 'Sarana & Prasarana',
};

export default function Index({ standarMutu, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/standar-mutu', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus standar mutu ini?')) {
            router.delete(`/dashboard/standar-mutu/${id}`);
        }
    };

    return (
        <DashboardLayout title="Standar Mutu">
            <Head title="Standar Mutu" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari standar mutu..." className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64" />
                    <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Cari</button>
                </form>
                <Link href="/dashboard/standar-mutu/create" className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25">
                    + Tambah Standar
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kode</th>
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Nama</th>
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Kategori</th>
                                <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Status</th>
                                <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {standarMutu.data.length > 0 ? standarMutu.data.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg">{s.kode}</span></td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{s.nama}</td>
                                    <td className="px-6 py-4 text-gray-600">{kategoriLabels[s.kategori] || s.kategori}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {s.is_active ? 'Aktif' : 'Non-aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={`/dashboard/standar-mutu/${s.id}/edit`} className="text-primary-600 hover:text-primary-700 font-medium">Edit</Link>
                                        <button onClick={() => handleDelete(s.id)} className="text-danger-500 hover:text-danger-600 font-medium">Hapus</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada data standar mutu.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {standarMutu.links && standarMutu.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Menampilkan {standarMutu.from}-{standarMutu.to} dari {standarMutu.total} data</p>
                        <div className="flex gap-1">
                            {standarMutu.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg transition ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

