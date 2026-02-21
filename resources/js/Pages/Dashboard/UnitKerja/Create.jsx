import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Create({ users }) {
    const { data, setData, post, processing, errors } = useForm({ nama: '', kepala_unit_id: '', kategori: 'prodi', deskripsi: '' });
    const handleSubmit = (e) => { e.preventDefault(); post('/dashboard/unit-kerja'); };

    return (
        <DashboardLayout title="Tambah Unit Kerja">
            <Head title="Tambah Unit Kerja" />
            <div className="max-w-xl">
                <div className="mb-6"><Link href="/dashboard/unit-kerja" className="text-sm text-primary-600">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Unit *</label>
                            <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" placeholder="Prodi S1 Keperawatan" />
                            {errors.nama && <p className="mt-1 text-xs text-danger-500">{errors.nama}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                            <select value={data.kategori} onChange={e => setData('kategori', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                                <option value="prodi">Program Studi (Prodi)</option><option value="fakultas">Fakultas / Pimpinan</option><option value="biro">Biro</option><option value="lembaga">Lembaga / Pusat</option><option value="upt">UPT</option><option value="lainnya">Lainnya</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kepala Unit (Opsional)</label>
                            <select value={data.kepala_unit_id} onChange={e => setData('kepala_unit_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                                <option value="">Belum Ditentukan</option>
                                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                            {errors.kepala_unit_id && <p className="mt-1 text-xs text-danger-500">{errors.kepala_unit_id}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                            <textarea rows={3} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50">Simpan</button>
                            <Link href="/dashboard/unit-kerja" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

