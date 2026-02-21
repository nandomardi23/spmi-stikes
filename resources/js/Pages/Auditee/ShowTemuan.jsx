import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const jenisColors = { observasi: 'bg-blue-100 text-blue-700', minor: 'bg-amber-100 text-amber-700', mayor: 'bg-red-100 text-red-700' };
const statusColors = { open: 'bg-red-100 text-red-700', in_progress: 'bg-amber-100 text-amber-700', closed: 'bg-green-100 text-green-700', verified: 'bg-blue-100 text-blue-700' };

export default function Show({ temuan, tindakLanjuts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        temuan_id: temuan.id, deskripsi: '', bukti_file: null, status: 'in_progress',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/auditee/tindak-lanjut', {
            forceFormData: true,
            onSuccess: () => reset('deskripsi', 'bukti_file')
        });
    };

    return (
        <DashboardLayout title="Detail Temuan & Tindak Lanjut">
            <Head title="Detail Temuan & Tindak Lanjut" />
            <div className="mb-6"><Link href="/auditee/temuan" className="text-sm text-primary-600">← Kembali ke Daftar Temuan</Link></div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Detail Temuan */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Deskripsi Temuan</h3>
                            <div className="flex gap-2">
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${jenisColors[temuan.jenis]}`}>{temuan.jenis}</span>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[temuan.status]}`}>{temuan.status}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">{temuan.deskripsi}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div><span className="text-gray-500 block">Jadwal Audit:</span><span className="font-medium text-gray-900">{temuan.audit?.siklus_audit?.nama}</span></div>
                            <div><span className="text-gray-500 block">Batas Waktu:</span><span className="font-medium text-danger-600">{temuan.batas_waktu || 'Tidak ditentukan'}</span></div>
                            <div className="md:col-span-2"><span className="text-gray-500 block">Rekomendasi Auditor:</span><span className="font-medium text-gray-900">{temuan.rekomendasi || '-'}</span></div>
                        </div>
                    </div>

                    {/* Timeline Tindak Lanjut */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-6">Riwayat Tindak Lanjut</h3>
                        <div className="space-y-6">
                            {tindakLanjuts.length > 0 ? tindakLanjuts.map((tl, index) => (
                                <div key={tl.id} className="relative pl-6 border-l-2 border-primary-200">
                                    <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1 border-2 border-white"></div>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">{tl.user?.name || 'User'}</p>
                                                <p className="text-xs text-gray-500">{new Date(tl.created_at).toLocaleString('id-ID')}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${statusColors[tl.status]}`}>{tl.status}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-2">{tl.deskripsi}</p>
                                        {tl.bukti_file && (
                                            <div className="mt-3">
                                                <a href={`/storage/${tl.bukti_file}`} target="_blank" rel="noreferrer" className="text-xs text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 inline-flex items-center gap-1">
                                                    📄 Lihat Bukti Lampiran
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : <p className="text-sm text-gray-400 italic">Belum ada riwayat tindak lanjut.</p>}
                        </div>
                    </div>
                </div>

                {/* Form Update Progress */}
                <div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4">Update Progress</h3>
                        {(temuan.status === 'closed' || temuan.status === 'verified') ? (
                            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-sm border border-green-200">Temuan ini sudah berstatus {temuan.status} dan tidak bisa diupdate lagi.</div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Tindakan *</label><textarea rows={3} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm outline-none" placeholder="Jelaskan tindakan yang telah dilakukan..." />{errors.deskripsi && <p className="mt-1 text-xs text-danger-500">{errors.deskripsi}</p>}</div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">File Bukti (Opsional)</label><input type="file" onChange={e => setData('bukti_file', e.target.files[0])} className="w-full px-4 py-1.5 border rounded-xl text-sm outline-none" />{errors.bukti_file && <p className="mt-1 text-xs text-danger-500">{errors.bukti_file}</p>}</div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Update Status ke</label><select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm outline-none"><option value="in_progress">In Progress (Sedang dikerjakan)</option><option value="closed">Closed (Selesai)</option></select></div>
                                <button type="submit" disabled={processing} className="w-full py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">Kirim Update</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

