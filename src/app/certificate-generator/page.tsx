import { Metadata } from "next";
import Link from "next/link";
import { Award, ImageIcon, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Certificate Generator | 74th IPC Expo",
    description:
        "Generate personalized certificates for 74th IPC Expo participants. Choose between delegate or poster presentation certificates.",
};

export default function CertificateGeneratorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Certificate Generator
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Generate your personalized certificates for the 74th Indian Pharmaceutical Congress.
                        Choose the certificate type below.
                    </p>
                </div>

                {/* Certificate Type Cards */}
                <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
                    {/* Delegate Certificate Card */}
                    <Link
                        href="/certificate-generator/registration"
                        className="group bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="p-5 rounded-2xl bg-[var(--primary-green)]/10 mb-6 group-hover:bg-[var(--primary-green)]/20 transition">
                                <Award className="w-16 h-16 text-[var(--primary-green)]" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Delegate Certificate
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Participation certificate for all registered delegates of the 74th IPC.
                                Enter your registration number to download.
                            </p>
                            <div className="flex items-center gap-2 text-[var(--primary-green)] font-semibold group-hover:gap-3 transition-all">
                                Generate Certificate
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>

                    {/* Poster Certificate Card */}
                    <Link
                        href="/certificate-generator/poster"
                        className="group bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="p-5 rounded-2xl bg-[var(--primary-orange)]/10 mb-6 group-hover:bg-[var(--primary-orange)]/20 transition">
                                <ImageIcon className="w-16 h-16 text-[var(--primary-orange)]" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Poster Certificate
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Presentation certificate for poster presenters at the 74th IPC.
                                Enter your poster code to download.
                            </p>
                            <div className="flex items-center gap-2 text-[var(--primary-orange)] font-semibold group-hover:gap-3 transition-all">
                                Generate Certificate
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Info Section */}
                <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                        <p className="text-gray-600 text-sm">
                            For delegate certificates, use your registration number (e.g., IPC-TM-1001).
                            For poster certificates, use your poster code (e.g., PC-01).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
