import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
export default function Edit({ temuan, audits, standarMutu }) {
    const { data, setData, put, processing, errors } = useForm({ audit_id: temuan.audit_id, standar_mutu_id: temuan.standar_mutu_id || '', jenis: temuan.jenis, deskripsi: temuan.deskripsi, rekomendasi: temuan.rekomendasi || '', status: temuan.status, batas_waktu: temuan.batas_waktu?.split('T')[0] || '' });
    const handleSubmit = (e) => { e.preventDefault(); put(`/dashboard/temuan/${temuan.id}`); };
    return (
        <DashboardLayout title="Edit Temuan"><Head title="Edit Temuan" />
            <div className="max-w-2xl">
                <div className="mb-6"><Link href="/dashboard/temuan" className="text-sm text-primary-600">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Audit *</label><select value={data.audit_id} onChange={e => setData('audit_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="">Pilih</option>{audits.map(a => <option key={a.id} value={a.id}>{a.unit_kerja?.nama}</option>)}</select></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Standar Mutu</label><select value={data.standar_mutu_id} onChange={e => setData('standar_mutu_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="">Pilih</option>{standarMutu.map(s => <option key={s.id} value={s.id}>{s.kode} - {s.nama}</option>)}</select></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Jenis</label><select value={data.jenis} onChange={e => setData('jenis', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="observasi">Observasi</option><option value="minor">Minor</option><option value="mayor">Mayor</option></select></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi *</label><textarea rows={4} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Rekomendasi</label><textarea rows={3} value={data.rekomendasi} onChange={e => setData('rekomendasi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label><select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="open">Open</option><option value="in_progress">In Progress</option><option value="closed">Closed</option><option value="verified">Verified</option></select></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Batas Waktu</label><input type="date" value={data.batas_waktu} onChange={e => setData('batas_waktu', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" /></div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50 shadow-lg shadow-primary-500/25">{processing ? 'Menyimpan...' : 'Perbarui'}</button>
                            <Link href="/dashboard/temuan" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

