import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import clsx from 'clsx';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Standar Mutu', href: '/dashboard/standar-mutu', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Siklus Audit', href: '/dashboard/siklus-audit', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { name: 'Audit', href: '/dashboard/audit', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Temuan', href: '/dashboard/temuan', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
    { name: 'Dokumen', href: '/dashboard/dokumen', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { name: 'Unit Kerja', href: '/dashboard/unit-kerja', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Berita', href: '/dashboard/berita', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: 'Users', href: '/dashboard/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', roles: ['super-admin', 'admin-mutu'] },
];

export default function DashboardLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentUrl = usePage().url;

    const userRoles = auth.user?.roles || [];

    const filteredMenu = menuItems.filter(item => {
        if (!item.roles) return true;
        return item.roles.some(role => userRoles.includes(role));
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}>
                <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-100">
                    <div className="w-9 h-9 bg-linear-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-extrabold text-xs">HT</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-gray-900">SPMI</h1>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Dashboard</p>
                    </div>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
                    <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Menu Utama</p>
                    {filteredMenu.map((item) => {
                        const isActive = currentUrl === item.href || currentUrl.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                                    isActive
                                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                <svg className={clsx('w-5 h-5 shrink-0', isActive ? 'text-primary-600' : 'text-gray-400')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right mr-2 hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">{auth.user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{userRoles[0]?.replace('-', ' ')}</p>
                            </div>
                            <div className="w-9 h-9 bg-linear-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {auth.user?.name?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                            <button
                                onClick={() => router.post('/logout')}
                                className="p-2 text-gray-400 hover:text-danger-500 rounded-lg hover:bg-danger-50 transition"
                                title="Logout"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="mx-4 sm:mx-6 lg:mx-8 mt-4">
                        <div className="px-4 py-3 bg-success-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium flex items-center gap-2">
                            <svg className="w-5 h-5 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {flash.success}
                        </div>
                    </div>
                )}
                {flash.error && (
                    <div className="mx-4 sm:mx-6 lg:mx-8 mt-4">
                        <div className="px-4 py-3 bg-danger-50 border border-red-200 text-red-800 rounded-xl text-sm font-medium flex items-center gap-2">
                            <svg className="w-5 h-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {flash.error}
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

