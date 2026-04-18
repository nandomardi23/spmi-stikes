import { memo, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { UserCircleIcon, KeyIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function ProfileIndex({ user }) {
    const [activeTab, setActiveTab] = useState('profile');

    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.put('/dashboard/profil', {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/dashboard/profil/password', {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    const tabs = [
        { id: 'profile', label: 'Informasi Profil', icon: UserCircleIcon },
        { id: 'password', label: 'Ubah Password', icon: KeyIcon },
    ];

    return (
        <>
            <Head title="Profil Saya" />

            <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Profil Saya</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">Kelola informasi akun dan keamanan Anda.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-3 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* User Info Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mt-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <h3 className="mt-4 font-extrabold text-gray-900 text-sm">{user.name}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                            {user.unit_kerja && (
                                <span className="mt-3 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                    {user.unit_kerja.nama}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Informasi Profil</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Perbarui nama dan email Anda</p>
                            </div>
                            <form onSubmit={handleProfileSubmit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={profileForm.data.name}
                                        onChange={e => profileForm.setData('name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm font-medium"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {profileForm.errors.name && (
                                        <p className="mt-1.5 text-xs text-red-500 font-medium">{profileForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={profileForm.data.email}
                                        onChange={e => profileForm.setData('email', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm font-medium"
                                        placeholder="Masukkan email"
                                    />
                                    {profileForm.errors.email && (
                                        <p className="mt-1.5 text-xs text-red-500 font-medium">{profileForm.errors.email}</p>
                                    )}
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {profileForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Ubah Password</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Pastikan gunakan password yang kuat</p>
                            </div>
                            <form onSubmit={handlePasswordSubmit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Password Saat Ini</label>
                                    <input
                                        type="password"
                                        value={passwordForm.data.current_password}
                                        onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm font-medium"
                                        placeholder="Masukkan password saat ini"
                                    />
                                    {passwordForm.errors.current_password && (
                                        <p className="mt-1.5 text-xs text-red-500 font-medium">{passwordForm.errors.current_password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Password Baru</label>
                                    <input
                                        type="password"
                                        value={passwordForm.data.password}
                                        onChange={e => passwordForm.setData('password', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm font-medium"
                                        placeholder="Masukkan password baru"
                                    />
                                    {passwordForm.errors.password && (
                                        <p className="mt-1.5 text-xs text-red-500 font-medium">{passwordForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Konfirmasi Password Baru</label>
                                    <input
                                        type="password"
                                        value={passwordForm.data.password_confirmation}
                                        onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm font-medium"
                                        placeholder="Ulangi password baru"
                                    />
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {passwordForm.processing ? 'Menyimpan...' : 'Ubah Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

const PersistedProfileIndex = memo(ProfileIndex);
PersistedProfileIndex.layout = page => <DashboardLayout title="Profil Saya">{page}</DashboardLayout>;
export default PersistedProfileIndex;
