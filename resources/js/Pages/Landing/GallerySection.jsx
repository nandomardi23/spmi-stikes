import { useState, memo } from 'react';
import { EyeIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';

function GallerySection({ galeri }) {
    const [selectedGaleri, setSelectedGaleri] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <section id="galeri" className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Dokumentasi</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Galeri Kegiatan</h2>
                    <p className="text-gray-500 mt-3 font-medium">Dokumentasi kegiatan terkait penjaminan mutu</p>
                </div>

                {galeri && galeri.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {galeri.map((g) => (
                            <div 
                                key={g.id} 
                                className="group cursor-pointer"
                                onClick={() => {
                                    setSelectedGaleri(g);
                                    setCurrentImageIndex(0);
                                }}
                            >
                                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 shadow-sm">
                                    <img 
                                        src={g.images?.[0]?.file_path ? `/storage/${g.images[0].file_path.replace('galeri/', 'galeri/thumbnails/')}` : ''} 
                                        alt={g.judul} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        onError={(e) => {
                                            if (!e.target.dataset.retried) {
                                                e.target.dataset.retried = 'true';
                                                e.target.src = `/storage/${g.images?.[0]?.file_path}`;
                                            } else {
                                                e.target.onerror = null; 
                                                e.target.src = `https://picsum.photos/seed/${g.id}/800/600`;
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                <EyeIcon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight">{g.judul}</h3>
                                            {g.deskripsi && <p className="text-white/70 text-xs mt-1.5 line-clamp-1 font-medium">{g.deskripsi}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl">
                        <p className="text-gray-400 font-medium">Belum ada dokumentasi kegiatan.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <Modal show={!!selectedGaleri} onClose={() => setSelectedGaleri(null)} maxWidth="6xl">
                {selectedGaleri && (
                    <div className="relative bg-white overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh]">
                        {/* Close button optimized for mobile and desktop */}
                        <button 
                            onClick={() => setSelectedGaleri(null)}
                            className="absolute top-4 right-4 z-50 p-2.5 bg-black/20 hover:bg-black/40 md:bg-gray-100 md:hover:bg-gray-200 text-white md:text-gray-600 rounded-full transition-all backdrop-blur-md"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        
                        {/* Left Side: Media Viewer */}
                        <div className="w-full md:w-2/3 relative flex items-center justify-center bg-gray-950 overflow-hidden shrink-0 h-1/2 md:h-full">
                            {selectedGaleri.images && selectedGaleri.images.length > 0 ? (
                                <>
                                    {/* Blurred Background effect for a premium look */}
                                    <div 
                                        className="absolute inset-0 opacity-40 scale-110 blur-3xl transition-all duration-700"
                                        style={{ 
                                            backgroundImage: `url(/storage/${selectedGaleri.images[currentImageIndex]?.file_path})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                    
                                    {/* Main Image */}
                                    <img 
                                        key={selectedGaleri.images[currentImageIndex]?.id}
                                        src={`/storage/${selectedGaleri.images[currentImageIndex]?.file_path}`} 
                                        className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-300 animate-in fade-in"
                                        alt={selectedGaleri.judul}
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = `https://picsum.photos/seed/${selectedGaleri.id}/1200/900`;
                                        }}
                                    />
                                    
                                    {/* Carousel Controls */}
                                    {selectedGaleri.images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedGaleri.images.length - 1 : prev - 1)}
                                                className="absolute left-4 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all shadow-lg"
                                            >
                                                <ChevronLeftIcon className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={() => setCurrentImageIndex(prev => prev === selectedGaleri.images.length - 1 ? 0 : prev + 1)}
                                                className="absolute right-4 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all shadow-lg"
                                            >
                                                <ChevronRightIcon className="w-6 h-6" />
                                            </button>
                                            
                                            {/* Indicators */}
                                            <div className="absolute bottom-4 z-20 flex gap-1.5 p-2 bg-black/20 backdrop-blur-md rounded-full">
                                                {selectedGaleri.images.map((_, idx) => (
                                                    <button 
                                                        key={idx}
                                                        onClick={() => setCurrentImageIndex(idx)}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/90'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="relative z-10 w-full h-full flex items-center justify-center text-gray-500">
                                    Tidak ada foto yang tersedia
                                </div>
                            )}
                        </div>

                        {/* Right Side: Details & Thumbnails */}
                        <div className="w-full md:w-1/3 flex flex-col bg-white h-1/2 md:h-full relative z-30 shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.1)]">
                            <div className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-hide">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary-50 to-primary-100 flex items-center justify-center shrink-0 border border-primary-100/50 shadow-sm">
                                        <span className="text-primary-700 font-black text-xl uppercase">
                                            {selectedGaleri.judul.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{selectedGaleri.judul}</h3>
                                        <p className="text-xs text-gray-500 font-semibold flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {new Date(selectedGaleri.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                
                                {selectedGaleri.deskripsi && (
                                    <div className="prose prose-sm prose-gray max-w-none">
                                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">
                                            {selectedGaleri.deskripsi}
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Thumbnails at the bottom of the sidebar */}
                            {selectedGaleri.images && selectedGaleri.images.length > 1 && (
                                <div className="p-5 border-t border-gray-100 bg-gray-50/80 shrink-0">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Foto Lainnya ({selectedGaleri.images.length})</p>
                                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                                        {selectedGaleri.images.map((img, idx) => (
                                            <button
                                                key={img.id}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 border-2 ${idx === currentImageIndex ? 'border-primary-500 shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-95'}`}
                                            >
                                                <img 
                                                    src={`/storage/${img.file_path}`} 
                                                    className="w-full h-full object-cover bg-gray-200"
                                                    alt="thumbnail" 
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}

export default memo(GallerySection);
