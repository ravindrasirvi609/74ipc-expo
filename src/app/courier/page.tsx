import type { Metadata } from "next";
import CertificateForm from "@/components/CertificateForm";

export const metadata: Metadata = {
    title: "Request Courier - 74th IPC Pharma Expo",
    description:
        "Request your registration to be couriered to your home address. Please provide your registration details and delivery address.",
};

export default function CertificatesPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Courier Request
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        For attendees of the 74th Indian Pharmaceutical Congress.
                    </p>
                </div>

                <div className="space-y-8">
                    <CertificateForm />

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-800">
                        <h3 className="font-semibold mb-2">Important Information</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Please ensure your registration details match our records for faster processing.</li>
                            <li>Registration will be couriered to your home address.</li>
                            <li>Delivery may take 10-15 business days after the event concludes.</li>
                            <li>Make sure to provide a valid pincode and reachable mobile number.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
