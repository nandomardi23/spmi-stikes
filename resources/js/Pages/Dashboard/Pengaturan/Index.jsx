import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { AcademicCapIcon, CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

export default function Index({ visi, misi }) {
    const { data, setData, post, processing, errors } = useForm({
        visi: visi || '',
        misi: misi || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/pengaturan', {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Pengaturan visi dan misi telah diperbarui.',
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
        <DashboardLayout title="Pengaturan Institusi">
            <Head title="Pengaturan Institusi" />
            
            <div className="max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary-50 rounded-2xl">
                                <AcademicCapIcon className="w-8 h-8 text-primary-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Visi & Misi Institusi</h2>
                                <p className="text-sm text-gray-500 font-medium mt-1">Kelola landasan filosofis dan tujuan utama institusi Anda.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Visi */}
                            <div className="relative group">
                                <div className="flex items-center gap-2 mb-3">
                                    <DocumentTextIcon className="w-5 h-5 text-primary-500" />
                                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                        Visi Utama <span className="text-danger-500">*</span>
                                    </label>
                                </div>
                                <textarea
                                    value={data.visi}
                                    onChange={(e) => setData('visi', e.target.value)}
                                    className="w-full rounded-2xl border-gray-200 bg-gray-50/50 px-5 py-4 text-sm focus:border-primary-500 focus:ring-primary-500 min-h-[120px] font-medium transition duration-200"
                                    placeholder="Masukkan Visi institusi secara jelas dan menginspirasi..."
                                    required
                                />
                                {errors.visi && <p className="mt-2 text-[10px] font-bold text-danger-500 uppercase tracking-tight">{errors.visi}</p>}
                            </div>

                            {/* Misi */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-success-500" />
                                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                            Misi Strategis <span className="text-danger-500">*</span>
                                        </label>
                                    </div>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-lg font-bold uppercase">Tips: Tekan Enter untuk poin baru</span>
                                </div>
                                <textarea
                                    value={data.misi}
                                    onChange={(e) => setData('misi', e.target.value)}
                                    className="w-full rounded-2xl border-gray-200 bg-gray-50/50 px-5 py-4 text-sm focus:border-primary-500 focus:ring-primary-500 min-h-[250px] font-medium transition duration-200 leading-relaxed"
                                    placeholder="1. Meningkatkan kualitas pendidikan...&#10;2. Menyelenggarakan penelitian inovatif...&#10;3. Mengabdi kepada masyarakat..."
                                    required
                                />
                                {errors.misi && <p className="mt-2 text-[10px] font-bold text-danger-500 uppercase tracking-tight">{errors.misi}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3.5 bg-linear-to-br from-primary-600 to-primary-700 text-white text-sm font-extrabold rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-xl shadow-primary-500/25 active:scale-95"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Simpan Perubahan
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
