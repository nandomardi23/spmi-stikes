import { Link } from '@inertiajs/react';

export default function Pagination({ 
    links, 
    meta = null, 
    onPerPageChange = null,
    className = "", 
    preserveScroll = false 
}) {
    // Hide if no links or only 1 page (unless we want to show metadata)
    if (!links || links.length <= 3) {
        if (!meta) return null;
        // If we have meta, we might still want to show "Showing X of Z" even if only 1 page
    }

    const renderLabel = (label, isPrevious, isNext) => {
        if (isPrevious) {
            return (
                <div className="flex items-center px-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-1 hidden sm:inline">Sebelumnya</span>
                </div>
            );
        }
        if (isNext) {
            return (
                <div className="flex items-center px-1">
                    <span className="mr-1 hidden sm:inline">Selanjutnya</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            );
        }
        return label.replace(/&laquo;|&raquo;|«|»/g, '').trim();
    };

    return (
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 w-full ${className}`}>
            {/* Metadata (Left Side) */}
            {meta && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-gray-500 font-medium">
                    <p>
                        Menampilkan <span className="text-gray-900 font-bold">{meta.from || 0}</span> - <span className="text-gray-900 font-bold">{meta.to || 0}</span> dari <span className="text-gray-900 font-bold">{meta.total}</span> data
                    </p>
                    
                    {onPerPageChange && (
                        <div className="flex items-center gap-2">
                            <span>Per halaman:</span>
                            <select
                                value={meta.per_page}
                                onChange={(e) => onPerPageChange(e.target.value)}
                                className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-gray-700 focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer transition-all"
                            >
                                {[10, 25, 50, 100].map(val => (
                                    <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}

            {/* Pagination Links (Right Side) */}
            {links && links.length > 3 && (
                <div className="flex flex-wrap items-center gap-1.5 ml-auto">
                    {links.map((link, i) => {
                        const isPrevious = i === 0;
                        const isNext = i === links.length - 1;
                        const isPage = !isPrevious && !isNext;

                        return (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                preserveScroll={preserveScroll}
                                className={`
                                    inline-flex items-center justify-center h-[36px] text-xs font-bold rounded-xl transition-all duration-200 border
                                    ${link.active 
                                        ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20' 
                                        : link.url 
                                            ? 'bg-white text-gray-600 border-gray-100 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600' 
                                            : 'bg-gray-50 text-gray-300 border-gray-50 cursor-not-allowed opacity-60'
                                    }
                                    ${isPage ? 'min-w-[36px] px-2.5' : 'px-3.5'}
                                `}
                            >
                                {renderLabel(link.label, isPrevious, isNext)}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
