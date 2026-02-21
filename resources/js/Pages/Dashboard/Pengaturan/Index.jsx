import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Index({ visi, misi }) {
    const { data, setData, post, processing, errors } = useForm({
        visi: visi || '',
        misi: misi || ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        post('/dashboard/pengaturan', {
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <DashboardLayout title="Pengaturan Institusi">
            <Head title="Pengaturan Institusi" />
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Visi & Misi</h2>
                        <p className="text-sm text-gray-500 mt-1">Ubah identitas Visi dan Misi institusi yang akan ditampilkan pada halaman beranda publik.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Visi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Visi Institusi <span className="text-danger-500">*</span>
                            </label>
                            <textarea
                                value={data.visi}
                                onChange={(e) => setData('visi', e.target.value)}
                                className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary-500 focus:ring-primary-500 min-h-[100px]"
                                placeholder="Masukkan Visi institusi..."
                                required
                            />
                            {errors.visi && <p className="mt-1.5 text-xs text-danger-500">{errors.visi}</p>}
                        </div>

                        {/* Misi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">
                                Misi Institusi <span className="text-danger-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mb-3">Pisahkan setiap poin misi dengan Enter (baris baru). Di halaman depan akan otomatis dibuatkan nomor urut.</p>
                            <textarea
                                value={data.misi}
                                onChange={(e) => setData('misi', e.target.value)}
                                className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary-500 focus:ring-primary-500 min-h-[200px]"
                                placeholder="1. Misi pertama&#10;2. Misi kedua&#10;3. Misi ketiga..."
                                required
                            />
                            {errors.misi && <p className="mt-1.5 text-xs text-danger-500">{errors.misi}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing || isSubmitting}
                                className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                            >
                                {(processing || isSubmitting) ? (
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Simpan Perubahan
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
