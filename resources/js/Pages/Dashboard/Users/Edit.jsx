import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Edit({ user, roles, unitKerja }) {
    const { data, setData, put, processing, errors } = useForm({ name: user.name, email: user.email, password: '', password_confirmation: '', roles: user.roles.map(r => r.name), unit_kerja_id: user.unit_kerja_id || '' });
    const handleSubmit = (e) => { e.preventDefault(); put(`/dashboard/users/${user.id}`); };

    const handleRoleChange = (roleName) => {
        const currentRoles = [...data.roles];
        if (currentRoles.includes(roleName)) { setData('roles', currentRoles.filter(r => r !== roleName)); }
        else { setData('roles', [...currentRoles, roleName]); }
    };

    return (
        <DashboardLayout title="Edit Pengguna"><Head title="Edit Pengguna" />
            <div className="max-w-2xl">
                <div className="mb-6"><Link href="/dashboard/users" className="text-sm text-primary-600">← Kembali</Link></div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label><input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />{errors.name && <p className="mt-1 text-xs text-danger-500">{errors.name}</p>}</div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label><input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />{errors.email && <p className="mt-1 text-xs text-danger-500">{errors.email}</p>}</div>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800 border border-amber-200">Biarkan password kosong jika tidak ingin mengubahnya.</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Password Baru</label><input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />{errors.password && <p className="mt-1 text-xs text-danger-500">{errors.password}</p>}</div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password</label><input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" /></div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Peran (Role) *</label>
                            <div className="flex gap-4 flex-wrap">
                                {roles.map(r => (
                                    <label key={r.id} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={data.roles.includes(r.name)} onChange={() => handleRoleChange(r.name)} className="w-4 h-4 rounded border-gray-300 text-primary-600" />
                                        <span className="text-sm text-gray-700 capitalize">{r.name.replace('-', ' ')}</span>
                                    </label>
                                ))}
                            </div>{errors.roles && <p className="mt-1 text-xs text-danger-500">{errors.roles}</p>}
                        </div>
                        {data.roles.includes('auditee') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit Kerja (Wajib untuk Auditee) *</label>
                                <select value={data.unit_kerja_id} onChange={e => setData('unit_kerja_id', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                                    <option value="">Pilih Unit</option>{unitKerja.map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}
                                </select>{errors.unit_kerja_id && <p className="mt-1 text-xs text-danger-500">{errors.unit_kerja_id}</p>}
                            </div>
                        )}
                        <div className="flex gap-3 pt-4"><button type="submit" disabled={processing} className="px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl disabled:opacity-50">Perbarui</button><Link href="/dashboard/users" className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl">Batal</Link></div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

