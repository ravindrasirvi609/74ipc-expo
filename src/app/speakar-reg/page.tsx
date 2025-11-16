import type { Metadata } from "next";
import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "Register for the 74th IPC Pharma Expo",
  description:
    "Secure your complimentary pass to the 74th Indian Pharmaceutical Congress Expo and connect with leading pharma innovators.",
};

const benefits = [
  "Priority entry to exhibition halls and keynote sessions",
  "Meet 100+ pharmaceutical innovators, manufacturers, and solution providers",
  "Access to exclusive networking lounges and matchmaking support",
  "Real-time updates on show highlights, workshops, and partner events",
];

const quickFacts = [
  { label: "Dates", value: "19-21 December 2025" },
  {
    label: "Venue",
    value: "Bangalore International Exhibition Centre, Bangalore",
  },
  { label: "Entry", value: "Complimentary with registration" },
  { label: "Attendees", value: "15,000+ pharma professionals" },
];

export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-start lg:px-8">
        <RegistrationForm />
      </div>
    </main>
  );
}
