import { Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Swal from "sweetalert2";

// Grouped menu structure with section headers
const menuSections = [
    {
        label: "Utama",
        items: [
            {
                name: "Dashboard",
                href: "/dashboard",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            },
            {
                name: "Profil SPMI",
                href: "/dashboard/profil-spmi",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
            },
        ],
    },
    {
        label: "Penjaminan Mutu",
        items: [
            {
                name: "Standar Mutu",
                href: "/dashboard/standar-mutu",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            },
            {
                name: "Siklus PPEPP",
                href: "/dashboard/ppepp",
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
            },
            {
                name: "Dokumen SPMI",
                href: "/dashboard/dokumen",
                icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
            },
        ],
    },
    {
        label: "Audit Mutu Internal",
        items: [
            {
                name: "Siklus Audit",
                href: "/dashboard/siklus-audit",
                icon: "M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
            },
            {
                name: "Instrumen Audit",
                href: "/dashboard/instrumen-audit",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
            },
            {
                name: "Pelaksanaan Audit",
                href: "/dashboard/audit",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
            },
            {
                name: "Temuan Audit",
                href: "/dashboard/temuan",
                icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
            },
            {
                name: "Tindak Lanjut",
                href: "/dashboard/tindak-lanjut",
                icon: "M4 6h16M4 10h10M4 14h16M4 18h10",
            },
            {
                name: "Rapat Tinjauan",
                href: "/dashboard/rapat-tinjauan",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
            },
        ],
    },
    {
        label: "Evaluasi & Monitoring",
        items: [
            {
                name: "Umpan Balik",
                href: "/dashboard/umpan-balik",
                icon: "M7 8h10M7 12h6M21 12v6a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2h12a2 2 0 012 2v6z",
            },
            {
                name: "Diagram Kepuasan",
                href: "/dashboard/diagram-kepuasan",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            },
        ],
    },
    {
        label: "Konten & Media",
        items: [
            {
                name: "Galeri",
                href: "/dashboard/galeri",
                icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
            },
        ],
    },
    {
        label: "Administrasi",
        items: [
            {
                name: "Users",
                href: "/dashboard/users",
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                roles: ["super-admin", "admin-mutu"],
            },
            {
                name: "Roles",
                href: "/dashboard/roles",
                icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
                roles: ["super-admin"],
            },
            {
                name: "Permissions",
                href: "/dashboard/permissions",
                icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
                roles: ["super-admin"],
            },
            {
                name: "Pengaturan",
                href: "/dashboard/pengaturan",
                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
            },
        ],
    },
];

export default function DashboardLayout({ children, title }) {
    const { auth, flash, settings } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentUrl = usePage().url;

    const userRoles = auth.user?.roles || [];

    // Filter items per section based on roles
    const filteredSections = menuSections
        .map((section) => ({
            ...section,
            items: section.items.filter((item) => {
                if (!item.roles) return true;
                return item.roles.some((role) => userRoles.includes(role));
            }),
        }))
        .filter((section) => section.items.length > 0);

    useEffect(() => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        if (flash.success) {
            Toast.fire({
                icon: "success",
                title: flash.success,
            });
        }
        if (flash.error) {
            Toast.fire({
                icon: "error",
                title: flash.error,
            });
        }
    }, [flash.success, flash.error]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-100">
                    <div className="w-9 h-9 bg-linear-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-md overflow-hidden shrink-0">
                        {settings?.site_logo ? (
                            <img
                                src={settings.site_logo}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-white font-extrabold text-xs">
                                {settings?.site_name?.charAt(0) || "H"}T
                            </span>
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="text-sm font-bold text-gray-900 truncate tracking-tight">
                            {settings?.site_name || "SPMI"}
                        </h1>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest truncate">
                            Dashboard Admin
                        </p>
                    </div>
                </div>

                <nav className="px-3 py-4 overflow-y-auto h-[calc(100%-4rem)] space-y-5">
                    {filteredSections.map((section) => (
                        <div key={section.label}>
                            <p className="px-3 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                {section.label}
                            </p>
                            <div className="space-y-0.5">
                                {section.items.map((item) => {
                                    const isActive =
                                        item.href === "/dashboard"
                                            ? currentUrl === "/dashboard"
                                            : currentUrl === item.href ||
                                              currentUrl.startsWith(item.href + "/");
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={clsx(
                                                "flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all",
                                                isActive
                                                    ? "bg-primary-50 text-primary-700 shadow-sm"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                            )}
                                        >
                                            <svg
                                                className={clsx(
                                                    "w-[18px] h-[18px] shrink-0",
                                                    isActive
                                                        ? "text-primary-600"
                                                        : "text-gray-400",
                                                )}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d={item.icon}
                                                />
                                            </svg>
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
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
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            {title && (
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {title}
                                </h2>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right mr-2 hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">
                                    {auth.user?.name}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {userRoles[0]?.replace("-", " ")}
                                </p>
                            </div>
                            <div className="w-9 h-9 bg-linear-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {auth.user?.name?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                            <button
                                onClick={() => router.post("/logout")}
                                className="p-2 text-gray-400 hover:text-danger-500 rounded-lg hover:bg-danger-50 transition"
                                title="Logout"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
