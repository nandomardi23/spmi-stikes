import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from 'recharts';
import EmptyState from "@/Components/EmptyState";

// Colors for the charts
const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// Custom Tooltip for Bar Chart
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100">
                <p className="font-bold text-gray-900 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm font-medium text-gray-700">Kepuasan:</span>
                        <span className="text-sm font-bold text-gray-900">{parseFloat(entry.value).toFixed(2)}%</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function Index({ chartData = [], trendData = [] }) {
    // Format numeric data correctly for Recharts
    const formattedChartData = chartData.map(item => ({
        ...item,
        rata_rata: parseFloat(item.rata_rata)
    }));

    const hasData = formattedChartData.length > 0;

    return (
        <DashboardLayout title="Diagram Kepuasan">
            <Head title="Diagram Kepuasan" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Visualisasi Data Kepuasan</h3>
                    <p className="text-sm text-gray-500 mt-1">Laporan analitik dari kuesioner umpan balik berbagai stakeholder.</p>
                </div>
                <Link
                    href="/dashboard/umpan-balik"
                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition shadow-sm shrink-0 inline-flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Input Data Kuesioner
                </Link>
            </div>

            {hasData ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar Chart Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
                        <div className="mb-6">
                            <h4 className="font-bold text-gray-900">Rata-rata Kepuasan Berdasarkan Responden</h4>
                            <p className="text-xs text-gray-500">Menampilkan tingkat kepuasan rata-rata dari seluruh tahun akademik</p>
                        </div>
                        <div className="flex-1 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={formattedChartData}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis 
                                        dataKey="responden" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#6B7280', fontSize: 12 }} 
                                        domain={[0, 100]}
                                        tickFormatter={(val) => `${val}%`}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                                    <Bar dataKey="rata_rata" radius={[6, 6, 0, 0]}>
                                        {formattedChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Donut Chart Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
                        <div className="mb-2">
                            <h4 className="font-bold text-gray-900">Distribusi Kelompok Responden</h4>
                            <p className="text-xs text-gray-500">Berdasarkan proporsi nilai kumulatif tiap segmentasi</p>
                        </div>
                        <div className="flex-1 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={formattedChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="rata_rata"
                                        nameKey="responden"
                                        stroke="none"
                                    >
                                        {formattedChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value) => [`${parseFloat(value).toFixed(2)}%`, 'Nilai Rata-rata']}
                                        contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Legend 
                                        verticalAlign="bottom" 
                                        height={36} 
                                        iconType="circle"
                                        formatter={(value) => <span className="text-sm font-medium text-gray-700 ml-1">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-10">
                    <EmptyState 
                        title="Belum Ada Data Kepuasan" 
                        message="Grafik akan muncul secara otomatis setelah Anda menginput data pada menu Umpan Balik & Kuesioner." 
                    />
                    <div className="flex justify-center mt-6">
                        <Link
                            href="/dashboard/umpan-balik"
                            className="px-6 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 transition"
                        >
                            Ke Menu Umpan Balik
                        </Link>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
