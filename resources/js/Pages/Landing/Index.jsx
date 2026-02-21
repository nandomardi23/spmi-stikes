import { Head } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';

const kategoriLabels = {
    pendidikan: 'Pendidikan',
    penelitian: 'Penelitian',
    pengabdian: 'Pengabdian',
    tata_kelola: 'Tata Kelola',
    kemahasiswaan: 'Kemahasiswaan',
    sdm: 'SDM',
    keuangan: 'Keuangan',
    sarana_prasarana: 'Sarana & Prasarana',
};

const kategoriColors = {
    pendidikan: 'bg-blue-100 text-blue-700',
    penelitian: 'bg-purple-100 text-purple-700',
    pengabdian: 'bg-green-100 text-green-700',
    tata_kelola: 'bg-amber-100 text-amber-700',
    kemahasiswaan: 'bg-pink-100 text-pink-700',
    sdm: 'bg-indigo-100 text-indigo-700',
    keuangan: 'bg-emerald-100 text-emerald-700',
    sarana_prasarana: 'bg-orange-100 text-orange-700',
};

const dokumenKategoriLabels = {
    kebijakan: 'Kebijakan', manual: 'Manual', standar: 'Standar',
    formulir: 'Formulir', sop: 'SOP', laporan: 'Laporan', bukti: 'Bukti', lainnya: 'Lainnya',
};

export default function Index({ standarMutu, dokumenPublik, berita, galeri, visi, misi }) {
    return (
        <LandingLayout>
            <Head title="Beranda" />

            {/* Hero Section */}
            <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-linear-to-br from-primary-900 via-primary-800 to-primary-950">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-br from-white" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-primary-200 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Sistem Penjaminan Mutu Internal
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                            STIKES Hang Tuah
                            <span className="block text-primary-300">Tanjungpinang</span>
                        </h1>
                        <p className="text-lg text-primary-100/80 leading-relaxed mb-10 max-w-2xl">
                            Menjamin dan meningkatkan mutu pendidikan tinggi melalui siklus
                            <strong className="text-white"> PPPEP</strong> — Penetapan, Pelaksanaan, Pengendalian, Evaluasi, dan Peningkatan standar mutu secara berkelanjutan.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#standar-mutu" className="px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-xl shadow-black/10">
                                Lihat Standar Mutu
                            </a>
                            <a href="#dokumen" className="px-8 py-3.5 bg-white/10 backdrop-blur text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                Dokumen Publik
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                        {[
                            { label: 'Standar Mutu', value: standarMutu.length },
                            { label: 'Dokumen Publik', value: dokumenPublik.length },
                            { label: 'Galeri', value: galeri?.length || 0 },
                            { label: 'Berita', value: berita.length },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10">
                                <p className="text-3xl font-bold text-white">{stat.value}{stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}</p>
                                <p className="text-sm text-primary-200 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visi & Misi */}
            <section id="visi-misi" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Identitas Institusi</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Visi & Misi</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-linear-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-xl">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">VISI</h3>
                            <p className="text-primary-100 leading-relaxed whitespace-pre-wrap">
                                {visi}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">MISI</h3>
                            <ul className="space-y-3">
                                {misi.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                                        <span className="text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PPPEP Cycle */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Siklus Mutu</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Siklus PPPEP</h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Lima tahap penjaminan mutu internal yang diterapkan secara berkelanjutan</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { step: 'P', title: 'Penetapan', desc: 'Menetapkan standar mutu yang harus dicapai', color: 'from-blue-500 to-blue-600', icon: '📋' },
                            { step: 'P', title: 'Pelaksanaan', desc: 'Melaksanakan standar mutu yang telah ditetapkan', color: 'from-green-500 to-green-600', icon: '⚙️' },
                            { step: 'E', title: 'Evaluasi', desc: 'Mengevaluasi pelaksanaan standar mutu', color: 'from-amber-500 to-amber-600', icon: '📊' },
                            { step: 'P', title: 'Pengendalian', desc: 'Mengendalikan pelaksanaan agar sesuai standar', color: 'from-purple-500 to-purple-600', icon: '🔍' },
                            { step: 'P', title: 'Peningkatan', desc: 'Meningkatkan standar mutu secara berkelanjutan', color: 'from-rose-500 to-rose-600', icon: '🚀' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className={`w-16 h-16 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standar Mutu */}
            <section id="standar-mutu" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Jaminan Kualitas</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Standar Mutu</h2>
                        <p className="text-gray-500 mt-3">Standar mutu yang ditetapkan untuk menjamin kualitas pendidikan</p>
                    </div>

                    {standarMutu.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {standarMutu.map((standar) => (
                                <div key={standar.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg">{standar.kode}</span>
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${kategoriColors[standar.kategori] || 'bg-gray-100 text-gray-600'}`}>
                                            {kategoriLabels[standar.kategori] || standar.kategori}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition">{standar.nama}</h3>
                                    {standar.deskripsi && (
                                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{standar.deskripsi}</p>
                                    )}
                                    {standar.target && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <span className="text-xs text-gray-400">Target:</span>
                                            <p className="text-sm font-medium text-gray-700">{standar.target}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <p className="text-gray-400">Belum ada standar mutu yang dipublikasikan.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Dokumen Publik */}
            <section id="dokumen" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Transparansi</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Dokumen Publik</h2>
                        <p className="text-gray-500 mt-3">Dokumen mutu yang dapat diakses oleh publik</p>
                    </div>

                    {dokumenPublik.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dokumenPublik.map((doc) => (
                                <div key={doc.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                                        {dokumenKategoriLabels[doc.kategori] || doc.kategori}
                                    </span>
                                    <h3 className="font-semibold text-gray-900 mt-3 mb-2 group-hover:text-primary-600 transition">{doc.judul}</h3>
                                    {doc.deskripsi && <p className="text-sm text-gray-500 line-clamp-2">{doc.deskripsi}</p>}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-xs text-gray-400">{(doc.file_size / 1024).toFixed(0)} KB</span>
                                        <a
                                            href={`/dashboard/dokumen/${doc.id}/download`}
                                            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                                        >
                                            Download
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl">
                            <p className="text-gray-400">Belum ada dokumen publik yang tersedia.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Galeri */}
            <section id="galeri" className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Dokumentasi</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Galeri Kegiatan</h2>
                        <p className="text-gray-500 mt-3">Dokumentasi kegiatan terkait penjaminan mutu</p>
                    </div>

                    {galeri && galeri.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {galeri.map((g) => (
                                <div key={g.id} className="group cursor-pointer">
                                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 shadow-sm">
                                        <img 
                                            src={`/storage/${g.file_path}`} 
                                            alt={g.judul} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight">{g.judul}</h3>
                                            {g.deskripsi && <p className="text-white/80 text-xs mt-1 line-clamp-1">{g.deskripsi}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl">
                            <p className="text-gray-400">Belum ada dokumentasi kegiatan.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Berita */}
            <section id="berita" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Informasi Terbaru</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Berita & Pengumuman</h2>
                    </div>

                    {berita.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {berita.map((item, i) => (
                                <a key={item.id} href={`/berita/${item.slug}`} className="group block">
                                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                                        {item.gambar && (
                                            <div className="aspect-video bg-gray-200 overflow-hidden">
                                                <img src={`/storage/${item.gambar}`} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <p className="text-xs text-gray-400 mb-2">
                                                {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                                            </p>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition mb-2">{item.judul}</h3>
                                            {item.ringkasan && <p className="text-sm text-gray-500 line-clamp-2">{item.ringkasan}</p>}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <p className="text-gray-400">Belum ada berita atau pengumuman.</p>
                        </div>
                    )}
                </div>
            </section>
        </LandingLayout>
    );
}

