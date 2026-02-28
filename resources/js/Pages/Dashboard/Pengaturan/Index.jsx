import { Head, useForm } from '@inertiajs/react';
import React, { useState, useRef , memo} from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { CheckCircleIcon, GlobeAltIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

function Index({ site_name, site_description, site_logo }) {
    const fileInputRef = useRef();
    const [logoPreview, setLogoPreview] = useState(site_logo);

    const { data, setData, post, processing, errors } = useForm({
        site_name: site_name || '',
        site_description: site_description || '',
        site_logo: null,
        _method: 'PUT'
    });

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('site_logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/dashboard/pengaturan', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Pengaturan website telah diperbarui.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true
                });
            }
        });
    };

    return (
        <DashboardLayout title="Pengaturan Website">
            <Head title="Pengaturan Website" />
            
            <div className="max-w-5xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Profil Website Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-50 rounded-2xl">
                                    <GlobeAltIcon className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Profil Website</h2>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Atur identitas utama website Anda (nama, deskripsi, logo).</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Logo Website</label>
                                    <div 
                                        onClick={() => fileInputRef.current.click()}
                                        className="relative aspect-square rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all overflow-hidden group"
                                    >
                                        {logoPreview ? (
                                            <>
                                                <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-4" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <PhotoIcon className="w-8 h-8 text-white" />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <PhotoIcon className="w-10 h-10 text-gray-300 mb-2" />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Upload Logo</span>
                                            </>
                                        )}
                                        <input 
                                            type="file" 
                                            ref={fileInputRef}
                                            onChange={handleLogoChange}
                                            className="hidden" 
                                            accept="image/*"
                                        />
                                    </div>
                                    <p className="mt-2 text-[10px] text-gray-400 font-medium italic">Format: JPG, PNG (Max 2MB)</p>
                                    {errors.site_logo && <p className="mt-1 text-[10px] font-bold text-danger-500">{errors.site_logo}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Nama Website <span className="text-danger-500">*</span></label>
                                        <input 
                                            type="text" 
                                            value={data.site_name}
                                            onChange={e => setData('site_name', e.target.value)}
                                            className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="e.g. SPMI STIKES Hang Tuah"
                                            required
                                        />
                                        {errors.site_name && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.site_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Deskripsi Singkat</label>
                                        <textarea 
                                            value={data.site_description}
                                            onChange={e => setData('site_description', e.target.value)}
                                            className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary-500 outline-none transition-all min-h-[100px]"
                                            placeholder="Slogan atau deskripsi singkat instansi..."
                                        />
                                        {errors.site_description && <p className="mt-1.5 text-[10px] font-bold text-danger-500">{errors.site_description}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end sticky bottom-8 z-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-10 py-4 bg-linear-to-br from-primary-600 to-primary-700 text-white text-base font-extrabold rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-2xl shadow-primary-500/40 active:scale-95"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <CheckCircleIcon className="w-6 h-6" />
                                    Simpan Pengaturan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default memo(Index);
