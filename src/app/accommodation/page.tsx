import type { Metadata } from "next";
import AccommodationForm from "@/components/AccommodationForm";

export const metadata: Metadata = {
  title: "Accommodation Request - 74th IPC Pharma Expo",
  description:
    "Request accommodation for the 74th Indian Pharmaceutical Congress Expo.",
};

export default function AccommodationPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Accommodation Request
          </h1>
          <p className="text-lg text-gray-600">
            Planning your stay for the 74th IPC 2025, Bengaluru ? Fill out the
            form below to request accommodation.
          </p>
        </div>

        <AccommodationForm />
      </div>
    </main>
  );
}
