import { useState, useCallback, memo } from 'react';
import { Head, router } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import Pagination from '@/Components/Pagination';

const dokumenKategoriLabels = {
    kebijakan: 'Kebijakan', manual: 'Manual', standar: 'Standar',
    formulir: 'Formulir', sop: 'SOP', laporan: 'Laporan', bukti: 'Bukti', lainnya: 'Lainnya',
};

function DokumenSPMI({ dokumen, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        router.get('/dokumen-spmi', { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [search]);

    const handleClearSearch = useCallback(() => {
        setSearch('');
        router.get('/dokumen-spmi', { search: '' }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    return (
        <>
            <Head>
                <title>Dokumen SPMI - STIKES Hang Tuah Tanjungpinang</title>
                <meta name="description" content="Dokumen Sistem Penjaminan Mutu Internal (SPMI) STIKES Hang Tuah Tanjungpinang yang dapat diakses oleh publik." />
            </Head>

            {/* Hero */}
            <section className="relative bg-linear-to-br from-primary-900 via-primary-800 to-primary-950 py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-primary-300 font-semibold text-sm uppercase tracking-wider">Transparansi</span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">Dokumen SPMI</h1>
                    <p className="text-primary-100/80 mt-4 max-w-2xl mx-auto">
                        Dokumen mutu yang dapat diakses oleh publik untuk transparansi penjaminan mutu internal
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                        {/* Search Bar */}
                        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 bg-gray-50/30">
                            <form onSubmit={handleSearch} className="flex items-center gap-3">
                                <div className="relative flex-1 max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari dokumen berdasarkan judul, kategori, atau nomor..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                                >
                                    Cari
                                </button>
                                {filters.search && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Reset
                                    </button>
                                )}
                            </form>
                            {filters.search && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Menampilkan hasil pencarian untuk: <span className="font-semibold text-gray-700">"{filters.search}"</span>
                                    <span className="ml-1">({dokumen.total} dokumen ditemukan)</span>
                                </p>
                            )}
                        </div>

                        {/* Table */}
                        {(dokumen.data || []).length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                <th className="px-6 sm:px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Judul & Informasi</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center hidden sm:table-cell">Kategori</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center hidden md:table-cell">Ukuran</th>
                                                <th className="px-6 sm:px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {dokumen.data.map((doc) => (
                                                <tr key={doc.id} className="hover:bg-primary-50/30 transition-colors group">
                                                    <td className="px-6 sm:px-8 py-5">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100 group-hover:bg-white transition-colors">
                                                                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{doc.judul}</p>
                                                                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                                                                    <span className="uppercase tracking-wide">{doc.nomor_dokumen || 'Tanpa Nomor'}</span>
                                                                    <span>·</span>
                                                                    <span>{(doc.file_size / 1024).toFixed(0)} KB</span>
                                                                </div>
                                                                {/* Mobile metadata */}
                                                                <div className="flex items-center gap-2 mt-2 sm:hidden">
                                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md uppercase">
                                                                        {dokumenKategoriLabels[doc.kategori] || doc.kategori}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-center hidden sm:table-cell align-middle">
                                                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-xl uppercase tracking-tight bg-gray-100 text-gray-600">
                                                            {dokumenKategoriLabels[doc.kategori] || doc.kategori}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 hidden md:table-cell align-middle text-center">
                                                        <span className="text-sm font-medium text-gray-500">{(doc.file_size / 1024).toFixed(0)} KB</span>
                                                    </td>
                                                    <td className="px-6 sm:px-8 py-5 text-right align-middle">
                                                        <a
                                                            href={`/dashboard/dokumen/${doc.id}/download`}
                                                            className="inline-flex items-center justify-center w-9 h-9 text-primary-600 hover:text-white hover:bg-primary-600 rounded-xl border border-gray-100 hover:border-primary-600 transition-all duration-200 shadow-sm"
                                                            title="Download Dokumen"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {dokumen.links && (
                                    <div className="px-6 sm:px-8 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-end">
                                        <Pagination
                                            links={dokumen.links}
                                            meta={{
                                                from: dokumen.from,
                                                to: dokumen.to,
                                                total: dokumen.total,
                                                per_page: dokumen.per_page
                                            }}
                                            preserveScroll={true}
                                            onPerPageChange={(per_page) => {
                                                router.get('/dokumen-spmi', { per_page, search: filters.search }, { preserveState: true, preserveScroll: true });
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-400 font-medium">
                                    {filters.search
                                        ? `Tidak ada dokumen yang cocok dengan "${filters.search}"`
                                        : 'Belum ada dokumen publik yang tersedia.'
                                    }
                                </p>
                                {filters.search && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        Hapus pencarian
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

const PersistedDokumenSPMI = memo(DokumenSPMI);
PersistedDokumenSPMI.layout = page => <LandingLayout>{page}</LandingLayout>;
export default PersistedDokumenSPMI;
