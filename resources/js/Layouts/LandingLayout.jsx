import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function LandingLayout({ children }) {
    const { auth, settings } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-linear-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                                {settings?.site_logo ? (
                                    <img src={settings.site_logo} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white font-extrabold text-sm">{settings?.site_name?.charAt(0) || 'H'}T</span>
                                )}
                            </div>
                            <div className="hidden sm:block overflow-hidden max-w-[200px]">
                                <h1 className="text-sm font-bold text-gray-900 leading-tight truncate">{settings?.site_name || 'SPMI'}</h1>
                                <p className="text-[10px] text-gray-500 leading-tight truncate">{settings?.site_description || 'STIKES Hang Tuah'}</p>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1">
                            <a href="#beranda" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all">Beranda</a>
                            <a href="#visi-misi" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all">Visi & Misi</a>
                            <a href="#standar-mutu" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all">Standar Mutu</a>
                            <a href="#dokumen" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all">Dokumen</a>
                            <a href="#berita" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all">Berita</a>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={auth.user.roles.includes('auditee') ? '/auditee' : '/dashboard'}
                                    className="px-5 py-2 bg-linear-to-br from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-5 py-2 bg-linear-to-br from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25"
                                >
                                    Login
                                </Link>
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 space-y-1">
                            <a href="#beranda" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg">Beranda</a>
                            <a href="#visi-misi" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg">Visi & Misi</a>
                            <a href="#standar-mutu" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg">Standar Mutu</a>
                            <a href="#dokumen" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg">Dokumen</a>
                            <a href="#berita" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg">Berita</a>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md overflow-hidden shrink-0">
                                    {settings?.site_logo ? (
                                        <img src={settings.site_logo} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-white font-extrabold text-sm">{settings?.site_name?.charAt(0) || 'H'}T</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold truncate max-w-[200px]">{settings?.site_name || 'SPMI STIKES Hang Tuah'}</h3>
                                    <p className="text-[10px] text-gray-400 tracking-wider">Tanjungpinang</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed italic">
                                {settings?.site_description || 'Sistem Penjaminan Mutu Internal untuk menjamin dan meningkatkan mutu pendidikan tinggi.'}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#beranda" className="hover:text-primary-400 transition">Beranda</a></li>
                                <li><a href="#visi-misi" className="hover:text-primary-400 transition">Visi & Misi</a></li>
                                <li><a href="#standar-mutu" className="hover:text-primary-400 transition">Standar Mutu</a></li>
                                <li><a href="#dokumen" className="hover:text-primary-400 transition">Dokumen</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Kontak</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    Tanjungpinang, Kepulauan Riau
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    spmi@stikeshangtuah-tpi.ac.id
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} {settings?.site_name || 'STIKES Hang Tuah Tanjungpinang'}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

