"use client";

import { useEffect, useState } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";
import {
    Loader2,
    Users,
    TrendingUp,
    Star,
    RefreshCcw,
    Activity,
    Calendar,
    ThumbsUp,
} from "lucide-react";

type DashboardData = {
    totalFeedback: number;
    averageRatings: { name: string; value: number; fullMark: number }[];
    participationConfig: { name: string; value: number }[];
    feedbackOverTime: { date: string; count: number }[];
    recommendationStats: { name: string; value: number }[];
    recentFeedback: { name: string; role: string; comment: string; rating: string }[];
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function FeedbackDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/feedback/dashboard");
                const json = await res.json();
                if (res.ok) {
                    setData(json);
                } else {
                    console.error("Failed to fetch dashboard data:", json.error);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, [refreshKey]);

    if (loading && !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-orange)]" />
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center text-gray-500">No data available</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <div className="max-w-[1600px] mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-[var(--primary-orange)] to-orange-600 rounded-2xl shadow-lg">
                            <Activity className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Executive Insight Dashboard</h1>
                            <p className="text-gray-500 text-sm">Real-time feedback intelligence from IPC 2025</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setRefreshKey((prev) => prev + 1)}
                        className="group flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
                    >
                        <RefreshCcw className="mr-2 h-4 w-4 text-gray-500 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-gray-700 font-medium text-sm">Refresh Payload</span>
                    </button>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KpiCard
                        title="Total Respondants"
                        value={data.totalFeedback}
                        icon={<Users className="h-6 w-6 text-blue-600" />}
                        color="bg-blue-50"
                        trend="+12% vs last hour"
                    />
                    <KpiCard
                        title="Avg. Satisfaction"
                        value={data.averageRatings.reduce((acc, curr) => acc + curr.value, 0) / data.averageRatings.length || 0}
                        suffix="/ 5.0"
                        icon={<Star className="h-6 w-6 text-yellow-600" />}
                        color="bg-yellow-50"
                        isDecimal
                    />
                    <KpiCard
                        title="Feedback Volume"
                        value={data.feedbackOverTime.length}
                        suffix=" Active Days"
                        icon={<Calendar className="h-6 w-6 text-purple-600" />}
                        color="bg-purple-50"
                    />
                    <KpiCard
                        title="Promoters (Yes)"
                        value={data.recommendationStats.find(r => r.name === 'Yes')?.value || 0}
                        icon={<ThumbsUp className="h-6 w-6 text-green-600" />}
                        color="bg-green-50"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Trend Chart */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Response Trajectory</h3>
                                <p className="text-sm text-gray-400">Feedback submissions over time</p>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.feedbackOverTime}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: '#374151', fontWeight: 600 }}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Radar Chart for Categories */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Category Performance</h3>
                        <p className="text-sm text-gray-400 mb-6">Holistic view of event metrics</p>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.averageRatings}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#9ca3af" />
                                    <Radar name="Rating" dataKey="value" stroke="#f59e0b" strokeWidth={2} fill="#f59e0b" fillOpacity={0.4} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Demographics Pie */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Participant Demographics</h3>
                        <div className="h-[300px] flex items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.participationConfig}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.participationConfig.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                    <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-800">Live Feed</h3>
                            <div className="flex -space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                                <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-400">+</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {data.recentFeedback.map((activity, idx) => (
                                <div key={idx} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center text-white shadow-md font-bold text-sm ${idx % 2 === 0 ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-pink-500 to-rose-500'
                                        }`}>
                                        {activity.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-bold text-gray-900 truncate">{activity.name}</h4>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                Rating: {activity.rating}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">{activity.role}</p>
                                        <p className="text-sm text-gray-600 line-clamp-2 italic">&quot;{activity.comment}&quot;</p>
                                    </div>
                                </div>
                            ))}
                            {data.recentFeedback.length === 0 && (
                                <div className="text-center py-8 text-gray-400">Waiting for data...</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Stats Card Component
interface KpiCardProps {
    title: string;
    value: number;
    suffix?: string;
    icon: React.ReactNode;
    color: string;
    isDecimal?: boolean;
    trend?: string;
}

function KpiCard({ title, value, suffix = "", icon, color, isDecimal = false, trend }: KpiCardProps) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${color}`}>
                    {icon}
                </div>
                {trend && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-gray-500 text-sm font-medium tracking-wide">{title}</h3>
                <div className="mt-1 flex items-baseline">
                    <span className="text-3xl font-bold text-gray-800 tracking-tight">
                        {isDecimal && typeof value === 'number' ? value.toFixed(1) : value}
                    </span>
                    {suffix && <span className="ml-2 text-sm text-gray-400 font-medium">{suffix}</span>}
                </div>
            </div>
        </div>
    )
}
