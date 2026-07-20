import { Head, useForm } from '@inertiajs/react';
import { useState, useRef, memo } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Swal from 'sweetalert2';
import { Tab } from '@headlessui/react';

function Index({ site_name, site_description, site_logo, visi, misi, spmi_tujuan, spmi_struktur }) {
    const fileInputRef = useRef();
    const [logoPreview, setLogoPreview] = useState(site_logo);

    const { data, setData, post, processing, errors } = useForm({
        site_name: site_name || '',
        site_description: site_description || '',
        site_logo: null,
        visi: visi || '',
        misi: misi || '',
        spmi_tujuan: spmi_tujuan || '',
        spmi_struktur: spmi_struktur || '',
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
                    title: 'Tersimpan!',
                    text: 'Pengaturan berhasil diperbarui.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true
                });
            }
        });
    };

    const tabClass = (selected) =>
        [
            'pb-3 text-sm font-medium border-b-2 outline-none transition-colors cursor-pointer',
            selected
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
        ].join(' ');

    const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition';

    return (
        <>
            <Head title="Pengaturan" />

            <div className="max-w-4xl">
                <form onSubmit={handleSubmit}>
                    {/* Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                        {/* Tabs */}
                        <Tab.Group>
                            <div className="px-6 pt-5 border-b border-gray-200">
                                <Tab.List className="flex gap-6">
                                    <Tab className={({ selected }) => tabClass(selected)}>
                                        Profil Website
                                    </Tab>
                                    <Tab className={({ selected }) => tabClass(selected)}>
                                        Profil SPMI
                                    </Tab>
                                </Tab.List>
                            </div>

                            <Tab.Panels>
                                {/* === Tab 1: Profil Website === */}
                                <Tab.Panel className="p-6 outline-none">
                                    <div className="mb-6">
                                        <h3 className="text-base font-semibold text-gray-900">Identitas Website</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Atur nama, logo, dan deskripsi website yang tampil di halaman publik.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Logo */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="h-14 w-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-50 transition shrink-0"
                                                >
                                                    {logoPreview ? (
                                                        <img src={logoPreview} alt="Logo" className="h-full w-full object-contain p-1.5" />
                                                    ) : (
                                                        <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition"
                                                    >
                                                        Ubah logo
                                                    </button>
                                                    <p className="text-xs text-gray-400 mt-0.5">JPG, PNG atau GIF. Maks 2MB.</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleLogoChange}
                                                    className="hidden"
                                                    accept="image/*"
                                                />
                                            </div>
                                            {errors.site_logo && <p className="mt-1.5 text-xs text-red-500">{errors.site_logo}</p>}
                                        </div>

                                        {/* Nama */}
                                        <div>
                                            <label htmlFor="site_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Nama Website <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="site_name"
                                                value={data.site_name}
                                                onChange={e => setData('site_name', e.target.value)}
                                                className={inputClass}
                                                placeholder="e.g. SPMI STIKES Hang Tuah"
                                                required
                                            />
                                            {errors.site_name && <p className="mt-1.5 text-xs text-red-500">{errors.site_name}</p>}
                                        </div>

                                        {/* Deskripsi */}
                                        <div>
                                            <label htmlFor="site_description" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Deskripsi
                                            </label>
                                            <textarea
                                                id="site_description"
                                                rows={3}
                                                value={data.site_description}
                                                onChange={e => setData('site_description', e.target.value)}
                                                className={inputClass + ' resize-none'}
                                                placeholder="Deskripsi singkat tentang instansi Anda..."
                                            />
                                            {errors.site_description && <p className="mt-1.5 text-xs text-red-500">{errors.site_description}</p>}
                                        </div>
                                    </div>
                                </Tab.Panel>

                                {/* === Tab 2: Profil SPMI === */}
                                <Tab.Panel className="p-6 outline-none">
                                    {/* Section: Visi & Misi */}
                                    <div className="mb-6">
                                        <h3 className="text-base font-semibold text-gray-900">Visi & Misi</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Landasan filosofis dan tujuan utama institusi terkait penjaminan mutu.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="visi" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Visi
                                            </label>
                                            <textarea
                                                id="visi"
                                                rows={3}
                                                value={data.visi}
                                                onChange={e => setData('visi', e.target.value)}
                                                className={inputClass + ' resize-none'}
                                                placeholder="Masukkan visi institusi..."
                                            />
                                            {errors.visi && <p className="mt-1.5 text-xs text-red-500">{errors.visi}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="misi" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Misi
                                            </label>
                                            <textarea
                                                id="misi"
                                                rows={4}
                                                value={data.misi}
                                                onChange={e => setData('misi', e.target.value)}
                                                className={inputClass + ' resize-none'}
                                                placeholder={"1. Menyelenggarakan...\n2. Mengembangkan..."}
                                            />
                                            {errors.misi && <p className="mt-1.5 text-xs text-red-500">{errors.misi}</p>}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <hr className="my-8 border-gray-200" />

                                    {/* Section: Tujuan & Struktur */}
                                    <div className="mb-6">
                                        <h3 className="text-base font-semibold text-gray-900">Tujuan & Struktur SPMI</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Detail pelaksanaan Sistem Penjaminan Mutu Internal di lingkungan institusi.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="spmi_tujuan" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Tujuan & Sasaran Mutu
                                            </label>
                                            <textarea
                                                id="spmi_tujuan"
                                                rows={3}
                                                value={data.spmi_tujuan}
                                                onChange={e => setData('spmi_tujuan', e.target.value)}
                                                className={inputClass + ' resize-none'}
                                                placeholder="Jabarkan tujuan dan sasaran mutu..."
                                            />
                                            {errors.spmi_tujuan && <p className="mt-1.5 text-xs text-red-500">{errors.spmi_tujuan}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="spmi_struktur" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Struktur Organisasi SPMI
                                            </label>
                                            <textarea
                                                id="spmi_struktur"
                                                rows={3}
                                                value={data.spmi_struktur}
                                                onChange={e => setData('spmi_struktur', e.target.value)}
                                                className={inputClass + ' resize-none'}
                                                placeholder="Struktur unit penjaminan mutu..."
                                            />
                                            {errors.spmi_struktur && <p className="mt-1.5 text-xs text-red-500">{errors.spmi_struktur}</p>}
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>

                        {/* Footer */}
                        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50/50 rounded-b-2xl">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

const PersistedIndex = memo(Index);
PersistedIndex.layout = page => <DashboardLayout title="Pengaturan">{page}</DashboardLayout>;
export default PersistedIndex;
