import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Edit({ audit, siklusAudit, unitKerja, auditors }) {
    const { data, setData, put, processing, errors } = useForm({
        siklus_audit_id: audit.siklus_audit_id, unit_kerja_id: audit.unit_kerja_id, auditor_id: audit.auditor_id || '',
        tanggal_audit: audit.tanggal_audit?.split('T')[0] || '', status: audit.status, catatan: audit.catatan || '', skor: audit.skor || '',
    });
    const handleSubmit = (e) => { e.preventDefault(); put(`/dashboard/audit/${audit.id}`); };
    return (
        <DashboardLayout title="Edit Audit">
            <Head title="Edit Audit" />
            <div className="max-w-2xl">
                <div className="mb-6"><Link href="/dashboard/audit" className="text-sm text-primary-600 hover:text-primary-700">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Siklus Audit *</label><select value={data.siklus_audit_id} onChange={e => setData('siklus_audit_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="">Pilih Siklus</option>{siklusAudit.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}</select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Unit Kerja *</label><select value={data.unit_kerja_id} onChange={e => setData('unit_kerja_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="">Pilih Unit</option>{unitKerja.map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}</select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Auditor</label><select value={data.auditor_id} onChange={e => setData('auditor_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="">Pilih Auditor</option>{auditors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label><input type="date" value={data.tanggal_audit} onChange={e => setData('tanggal_audit', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label><select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none"><option value="dijadwalkan">Dijadwalkan</option><option value="berlangsung">Berlangsung</option><option value="selesai">Selesai</option><option value="dibatalkan">Dibatalkan</option></select></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Skor</label><input type="number" step="0.01" min="0" max="100" value={data.skor} onChange={e => setData('skor', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" /></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Catatan</label><textarea rows={3} value={data.catatan} onChange={e => setData('catatan', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" /></div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50 transition shadow-lg shadow-primary-500/25">{processing ? 'Menyimpan...' : 'Perbarui'}</button>
                            <Link href="/dashboard/audit" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

