import { Link } from '@inertiajs/react';

export default function Pagination({ links, className = "", preserveScroll = false }) {
    if (!links || links.length <= 3) return null;

    // Helper to clean up labels from Laravel
    const renderLabel = (label, isPrevious, isNext) => {
        if (isPrevious) {
            return (
                <div className="flex items-center px-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-1 hidden sm:inline">Prev</span>
                </div>
            );
        }
        if (isNext) {
            return (
                <div className="flex items-center px-1">
                    <span className="mr-1 hidden sm:inline">Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            );
        }
        
        // Remove entities like &laquo; or &raquo; if they leak through for page numbers
        return label.replace(/&laquo;|&raquo;|«|»/g, '').trim();
    };

    return (
        <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
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
                            inline-flex items-center justify-center h-[38px] text-xs font-bold rounded-xl transition-all duration-200 border
                            ${link.active 
                                ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20' 
                                : link.url 
                                    ? 'bg-white text-gray-600 border-gray-100 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600' 
                                    : 'bg-gray-50 text-gray-300 border-gray-50 cursor-not-allowed opacity-60'
                            }
                            ${isPage ? 'min-w-[38px] px-3' : 'px-4'}
                        `}
                    >
                        {renderLabel(link.label, isPrevious, isNext)}
                    </Link>
                );
            })}
        </div>
    );
}
