import type { Metadata } from "next";
import Link from "next/link";
import LeadRegistrationForm from "@/components/LeadRegistrationForm";

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
        <section className="flex-1 space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Join the 74th IPC Pharma Expo in Bengaluru
            </h1>
            <p className="text-lg text-gray-600">
              Bengaluru transforms into South Asia&apos;s most influential
              pharmaceutical innovation hub from 19-21 December 2025. Reserve
              your badge and unlock three days of breakthrough discoveries,
              partnerships, and immersive experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-[var(--primary-green,#008080)]/15 bg-white p-5 shadow-sm"
              >
                <p className="text-sm uppercase tracking-widest text-[var(--primary-orange,#ff6b35)]">
                  {fact.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-[var(--primary-green,#008080)]/15 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h2 className="text-xl font-semibold text-gray-900">
              Why register now?
            </h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 text-lg text-[var(--primary-green,#008080)]">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p>
              Need help with exhibitor bookings, accommodation, or student group
              passes? Reach out to our team via the{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--primary-orange,#ff6b35)] underline-offset-4 hover:underline"
              >
                contact page
              </Link>
              .
            </p>
            <p>
              Prefer a quick overview first? Explore the{" "}
              <Link
                href="/floor-plan"
                className="font-semibold text-[var(--primary-green,#008080)] underline-offset-4 hover:underline"
              >
                floor plan
              </Link>{" "}
              and shortlist must-visit pavilions before you arrive.
            </p>
          </div>
        </section>

        <aside className="flex-1 max-w-xl lg:sticky lg:top-28">
          <LeadRegistrationForm />
          <p className="mt-4 text-center text-xs text-gray-500">
            We&apos;ll send a confirmation email with your QR badge and event
            updates within one business day.
          </p>
        </aside>
      </div>
    </main>
  );
}
