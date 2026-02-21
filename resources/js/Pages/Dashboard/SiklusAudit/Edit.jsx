import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Edit({ siklusAudit }) {
    const { data, setData, put, processing, errors } = useForm({
        nama: siklusAudit.nama, tahun: siklusAudit.tahun, semester: siklusAudit.semester,
        tanggal_mulai: siklusAudit.tanggal_mulai?.split('T')[0] || '', tanggal_selesai: siklusAudit.tanggal_selesai?.split('T')[0] || '',
        status: siklusAudit.status, deskripsi: siklusAudit.deskripsi || '',
    });
    const handleSubmit = (e) => { e.preventDefault(); put(`/dashboard/siklus-audit/${siklusAudit.id}`); };
    return (
        <DashboardLayout title="Edit Siklus Audit">
            <Head title="Edit Siklus Audit" />
            <div className="max-w-2xl">
                <div className="mb-6"><Link href="/dashboard/siklus-audit" className="text-sm text-primary-600 hover:text-primary-700">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Siklus *</label><input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" />{errors.nama && <p className="mt-1 text-xs text-danger-500">{errors.nama}</p>}</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tahun</label><input type="number" value={data.tahun} onChange={e => setData('tahun', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Semester</label><select value={data.semester} onChange={e => setData('semester', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"><option value={1}>Semester 1</option><option value={2}>Semester 2</option></select></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Mulai</label><input type="date" value={data.tanggal_mulai} onChange={e => setData('tanggal_mulai', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Selesai</label><input type="date" value={data.tanggal_selesai} onChange={e => setData('tanggal_selesai', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" /></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label><select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"><option value="perencanaan">Perencanaan</option><option value="pelaksanaan">Pelaksanaan</option><option value="pelaporan">Pelaporan</option><option value="selesai">Selesai</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label><textarea rows={3} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" /></div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50 transition shadow-lg shadow-primary-500/25">{processing ? 'Menyimpan...' : 'Perbarui'}</button>
                            <Link href="/dashboard/siklus-audit" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

