import { Head, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState , memo } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import EmptyState from '@/Components/EmptyState';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

const kategoriLabels = {
    pengajaran: 'Pengajaran', fasilitas: 'Fasilitas', pelayanan: 'Pelayanan',
    kurikulum: 'Kurikulum', manajemen: 'Manajemen', penelitian: 'Penelitian',
};

const starDisplay = (val) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={`text-sm ${i <= val ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
        );
    }
    return <span className="inline-flex gap-0.5">{stars}</span>;
};

function Index({ questions, responses, statsByType, totalResponses }) {
    const [viewingResponse, setViewingResponse] = useState(null);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Respons?',
            text: 'Data yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/survey-responses/${id}`);
            }
        });
    };

    return (
        <>
            <Head title="Hasil Kuesioner" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">Evaluasi & Monitoring</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Lihat hasil kuesioner dari <span className="font-bold text-primary-600">{totalResponses}</span> responden
                    </p>
                </div>
                <a
                    href="/kuesioner"
                    target="_blank"
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                >
                    Lihat Form Publik ↗
                </a>
            </div>

            {/* Stats Cards */}
            {Object.keys(statsByType).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                    {Object.entries(statsByType).map(([type, stats]) => {
                        const avg = stats.avg;
                        const color = avg >= 4 ? 'from-green-500 to-emerald-600' : avg >= 3 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-rose-500';
                        return (
                            <div key={type} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{type}</span>
                                    <span className="text-[10px] font-bold text-gray-400">{stats.count} respons</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className={`text-3xl font-extrabold bg-linear-to-br ${color} bg-clip-text text-transparent`}>
                                        {avg.toFixed(1)}
                                    </span>
                                    <span className="text-xs text-gray-400 mb-1">/ 5.0</span>
                                </div>
                                <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-linear-to-r ${color} rounded-full`} style={{ width: `${(avg / 5) * 100}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Per-Question Avg (if stats exist) */}
            {Object.keys(statsByType).length > 0 && questions.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 text-sm">Rata-rata Per Pertanyaan</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Skor rata-rata (1-5) untuk setiap pertanyaan per jenis responden</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Pertanyaan</th>
                                    {Object.keys(statsByType).map((type) => (
                                        <th key={type} className="px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center whitespace-nowrap">{type}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {questions.map((q) => (
                                    <tr key={q.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-3">
                                            <p className="text-xs text-gray-700">{q.pertanyaan}</p>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase">{kategoriLabels[q.kategori] || q.kategori}</span>
                                        </td>
                                        {Object.entries(statsByType).map(([type, stats]) => {
                                            const val = stats.avg_per_question?.[q.id];
                                            return (
                                                <td key={type} className="px-4 py-3 text-center">
                                                    {val ? (
                                                        <span className={`font-bold text-xs ${val >= 4 ? 'text-green-600' : val >= 3 ? 'text-amber-600' : 'text-red-600'}`}>
                                                            {val.toFixed(1)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-300 text-xs">-</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Responses Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 text-sm">Daftar Respons Individual</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-left">Responden</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Tahun Akademik</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Rata-rata</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Tanggal</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {responses.data.length > 0 ? responses.data.map((r) => {
                                const answers = r.answers || {};
                                const vals = Object.values(answers);
                                const avg = vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
                                return (
                                    <tr key={r.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-linear-to-br from-primary-100 to-primary-200 border border-primary-100 rounded-xl flex items-center justify-center text-primary-700 font-extrabold text-xs">
                                                    {r.responden_type.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-xs">{r.responden_name || 'Anonim'}</p>
                                                    <p className="text-[10px] text-gray-400">{r.responden_type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-gray-700">{r.tahun_akademik}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-0.5">
                                                {starDisplay(Math.round(avg))}
                                                <span className={`text-xs font-bold ${avg >= 4 ? 'text-green-600' : avg >= 3 ? 'text-amber-600' : 'text-red-600'}`}>
                                                    {avg.toFixed(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs text-gray-500">
                                                {new Date(r.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    onClick={() => setViewingResponse(r)}
                                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition duration-200"
                                                    title="Detail"
                                                >
                                                    <EyeIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r.id)}
                                                    className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200"
                                                    title="Hapus"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={5}>
                                        <EmptyState title="Belum Ada Respons" message="Belum ada yang mengisi kuesioner. Bagikan link ke stakeholder." />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                    <Pagination
                        links={responses.links}
                        meta={{ from: responses.from, to: responses.to, total: responses.total, per_page: responses.per_page }}
                        onPerPageChange={(per_page) => router.get('/dashboard/survey-responses', { per_page }, { preserveState: true })}
                    />
                </div>
            </div>

            {/* Detail Modal */}
            <Modal show={!!viewingResponse} onClose={() => setViewingResponse(null)} maxWidth="xl">
                {viewingResponse && (
                    <div className="p-7">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Detail Respons</h2>
                                <p className="text-sm text-gray-500 mt-1">{viewingResponse.responden_type} · {viewingResponse.tahun_akademik}</p>
                            </div>
                            <span className="text-xs text-gray-400">
                                {new Date(viewingResponse.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama</span>
                                    <p className="font-semibold text-gray-900">{viewingResponse.responden_name || 'Anonim'}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
                                    <p className="font-semibold text-gray-900">{viewingResponse.responden_email || '-'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                            {questions.map((q) => {
                                const val = viewingResponse.answers?.[q.id];
                                return (
                                    <div key={q.id} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-700">{q.pertanyaan}</p>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase">{kategoriLabels[q.kategori] || q.kategori}</span>
                                        </div>
                                        <div className="shrink-0">
                                            {val ? starDisplay(val) : <span className="text-xs text-gray-300">-</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {viewingResponse.komentar && (
                            <div className="mt-5 bg-amber-50 rounded-xl p-4 border border-amber-100">
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Komentar</span>
                                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{viewingResponse.komentar}</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setViewingResponse(null)} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition text-sm">
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}


const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Hasil Kuesioner">{page}</DashboardLayout>;
export default PersistedIndex;

