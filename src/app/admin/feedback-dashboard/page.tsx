"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";

type DashboardData = {
    totalFeedback: number;
    averageRatings: { name: string; value: number }[];
    participationConfig: { name: string; value: number }[];
    recentFeedback: { name: string; role: string; comment: string }[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

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
        // Poll every 60 seconds
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, [refreshKey]);

    if (loading && !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary-orange)]"></div>
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center">No data available</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Feedback Analytics
                        </h1>
                        <p className="text-gray-500">Real-time insights from IPC 2025</p>
                    </div>
                    <button
                        onClick={() => setRefreshKey((prev) => prev + 1)}
                        className="mt-4 md:mt-0 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center text-gray-700 font-medium"
                    >
                        <span className="mr-2">🔄</span> Refresh
                    </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                            Total Responses
                        </h3>
                        <div className="mt-2 text-4xl font-bold text-[var(--primary-orange)]">
                            {data.totalFeedback}
                        </div>
                        <div className="mt-1 text-sm text-green-600 flex items-center">
                            <span className="mr-1">↑</span> Updated just now
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                            Overall Satisfaction (Avg)
                        </h3>
                        <div className="mt-2 text-4xl font-bold text-[var(--primary-green)]">
                            {data.averageRatings.find(r => r.name === "Inauguration")?.value || "N/A"}
                        </div>
                        <div className="mt-1 text-sm text-gray-400">Inauguration Grandeur</div>
                    </div>
                    {/* Add more KPI cards if needed */}
                </div>

                {/* Charts Section 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* Satisfaction Bar Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Average Satisfaction by Category (1-5)</h3>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={data.averageRatings}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Bar dataKey="value" fill="#ff6b35" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Demographics Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Participant Breakdown</h3>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={data.participationConfig}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.participationConfig.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Feedback Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Recent Feedback Comments</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">Role</th>
                                    <th className="px-6 py-4 font-medium w-1/2">Highlights (Most Enjoyed)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.recentFeedback.map((feedback, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{feedback.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${feedback.role === 'Speaker' ? 'bg-purple-100 text-purple-800' :
                                                    feedback.role === 'Delegate' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {feedback.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 line-clamp-2">{feedback.comment || "—"}</td>
                                    </tr>
                                ))}
                                {data.recentFeedback.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                            No feedback submissions yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
