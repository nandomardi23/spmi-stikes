import { useState, memo } from 'react';
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';

function GallerySection({ galeri }) {
    const [selectedGaleri, setSelectedGaleri] = useState(null);

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
                                onClick={() => setSelectedGaleri(g)}
                            >
                                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 shadow-sm">
                                    <img 
                                        src={`/storage/${g.file_path}`} 
                                        alt={g.judul} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = `https://picsum.photos/seed/${g.id}/800/600`;
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
            <Modal show={!!selectedGaleri} onClose={() => setSelectedGaleri(null)} maxWidth="5xl">
                {selectedGaleri && (
                    <div className="relative bg-white overflow-hidden">
                        <button 
                            onClick={() => setSelectedGaleri(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm shadow-lg"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/3 bg-black flex flex-col items-center overflow-y-auto max-h-[85vh] scrollbar-hide">
                                {selectedGaleri.images && selectedGaleri.images.length > 0 ? (
                                    selectedGaleri.images.map((img) => (
                                        <img 
                                            key={img.id}
                                            src={`/storage/${img.file_path}`} 
                                            className="w-full h-auto object-contain max-h-[80vh] border-b border-gray-800"
                                            alt={selectedGaleri.judul}
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = `https://picsum.photos/seed/${selectedGaleri.id}/1200/900`;
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="w-full h-[300px] flex items-center justify-center text-gray-400">
                                        Tidak ada foto
                                    </div>
                                )}
                            </div>
                            <div className="md:w-1/3 p-6 md:p-8 bg-white overflow-y-auto max-h-[85vh]">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedGaleri.judul}</h3>
                                {selectedGaleri.deskripsi && (
                                    <p className="text-gray-600 leading-relaxed text-sm mb-6 whitespace-pre-wrap">
                                        {selectedGaleri.deskripsi}
                                    </p>
                                )}
                                <div className="pt-6 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 font-medium flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        Diunggah pada {new Date(selectedGaleri.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}

export default memo(GallerySection);
