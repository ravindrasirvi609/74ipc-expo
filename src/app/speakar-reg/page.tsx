import type { Metadata } from "next";

import RegistrationForm from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "Register for the 74th IPC Pharma Expo",
  description:
    "Secure your complimentary pass to the 74th Indian Pharmaceutical Congress Expo and connect with leading pharma innovators.",
};



export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-start lg:px-8">
        <RegistrationForm />
      </div>
    </main>
  );
}
