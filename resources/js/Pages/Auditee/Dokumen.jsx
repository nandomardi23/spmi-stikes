import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Pagination from '@/Components/Pagination';
import { useState } from 'react';

const kategoriOptions = [{ value: 'laporan', label: 'Laporan' }, { value: 'bukti', label: 'Bukti Pelaksanaan' }, { value: 'sop', label: 'SOP Unit' }, { value: 'lainnya', label: 'Lainnya' }];

export default function Dokumen({ dokumens, unitKerja }) {
    const [showUpload, setShowUpload] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({ judul: '', kategori: 'bukti', file: null, deskripsi: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/auditee/dokumen', { forceFormData: true, onSuccess: () => { setShowUpload(false); reset(); } });
    };

    return (
        <DashboardLayout title="Dokumen Unit"><Head title="Dokumen Unit" />
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm text-gray-500">Dokumen khusus untuk {unitKerja.nama}</h3>
                <button onClick={() => setShowUpload(!showUpload)} className="px-5 py-2.5 bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg">
                    {showUpload ? 'Batal' : '+ Upload Dokumen Unit'}
                </button>
            </div>

            {showUpload && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 animate-in slide-in-from-top-4">
                    <h4 className="font-bold text-gray-900 mb-4">Upload Dokumen Baru</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Dokumen *</label><input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm outline-none" />{errors.judul && <p className="mt-1 text-xs text-danger-500">{errors.judul}</p>}</div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label><select value={data.kategori} onChange={e => setData('kategori', e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm outline-none">{kategoriOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">File Dokumen (PDF/DOCX/JPG) *</label><input type="file" onChange={e => setData('file', e.target.files[0])} className="w-full px-4 py-1.5 border rounded-xl text-sm outline-none" />{errors.file && <p className="mt-1 text-xs text-danger-500">{errors.file}</p>}</div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label><textarea rows={2} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm outline-none" /></div>
                        <button type="submit" disabled={processing} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">Upload</button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Judul</th>
                        <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Kategori</th>
                        <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Terbuka</th>
                        <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Ukuran</th>
                        <th className="text-right px-6 py-3.5 font-semibold text-gray-600">Aksi</th>
                    </tr></thead>
                    <tbody className="divide-y divide-gray-50">
                        {dokumens.data.length > 0 ? dokumens.data.map(d => (
                            <tr key={d.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{d.judul}</td>
                                <td className="px-6 py-4 text-center text-gray-600 capitalize">{d.kategori}</td>
                                <td className="px-6 py-4 text-center"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${d.is_public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{d.is_public ? 'Publik' : 'Internal'}</span></td>
                                <td className="px-6 py-4 text-center text-gray-600">{(d.file_size / 1024).toFixed(0)} KB</td>
                                <td className="px-6 py-4 text-right"><a href={`/dashboard/dokumen/${d.id}/download`} className="text-primary-600 font-medium">Download</a></td>
                            </tr>
                        )) : <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Tidak ada dokumen unit yang diupload.</td></tr>}
                    </tbody>
                </table>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination links={dokumens.links} />
                </div>
            </div>
        </DashboardLayout>
    );
}

