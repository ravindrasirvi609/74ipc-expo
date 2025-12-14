"use client";

import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

const feedbackTypes = [
    {
        title: "Overall Feedback",
        description: "General experience of the 74th IPC Expo",
        icon: "📋",
        href: "/feedback/overall",
        color: "from-blue-500 to-indigo-600",
    },
    {
        title: "Scientific Sessions",
        description: "Invited lectures, plenary sessions, and symposia",
        icon: "🔬",
        href: "/feedback/scientific",
        color: "from-purple-500 to-pink-600",
    },
    {
        title: "Catering",
        description: "Food quality, service, and arrangements",
        icon: "🍽️",
        href: "/feedback/catering",
        color: "from-orange-500 to-red-600",
    },
    {
        title: "Exhibition",
        description: "Stalls, exhibitors, and venue arrangements",
        icon: "🏢",
        href: "/feedback/exhibition",
        color: "from-green-500 to-teal-600",
    },
    {
        title: "Oral Presentation",
        description: "Session organization and presentation quality",
        icon: "🎤",
        href: "/feedback/oral",
        color: "from-yellow-400 to-orange-500",
    },
    {
        title: "Poster Presentation",
        description: "Poster display, interaction, and evaluation",
        icon: "📊",
        href: "/feedback/poster",
        color: "from-cyan-500 to-blue-500",
    },
];

export default function FeedbackPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Feedback</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Your feedback helps us improve. Please select a category below to share your experience.
                    </p>
                </div>
            </section>

            {/* Feedback Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {feedbackTypes.map((type, index) => (
                        <Link
                            href={type.href}
                            key={index}
                            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                            <div className="p-8">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-3xl text-white drop-shadow-md">{type.icon}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[var(--primary-orange)] transition-colors">
                                    {type.title}
                                </h3>

                                <p className="text-gray-600 mb-6 line-clamp-2">
                                    {type.description}
                                </p>

                                <div className="flex items-center text-[var(--primary-green)] font-semibold group-hover:translate-x-2 transition-transform">
                                    Give Feedback
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Decorative background circle */}
                            <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r ${type.color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
