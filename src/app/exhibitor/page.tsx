import type { Metadata } from "next";
import Link from "next/link";
import ExhibitorRegistrationForm from "@/components/ExhibitorRegistrationForm";

export const metadata: Metadata = {
  title: "Exhibitor Registration - 74th IPC Pharma Expo",
  description:
    "Register as an exhibitor for the 74th Indian Pharmaceutical Congress Expo and showcase your products to 15,000+ pharma professionals.",
};

const benefits = [
  "Direct access to 15,000+ qualified pharma professionals and decision-makers",
  "Showcase your latest products, innovations, and services on a premier platform",
  "Network with industry leaders, manufacturers, and potential business partners",
  "Participate in exclusive exhibitor-only sessions and matchmaking events",
  "Gain visibility through event promotions, catalogs, and digital marketing",
  "Build brand recognition and generate quality leads",
];

const exhibitorCategories = [
  "Active Pharmaceutical Ingredients (API)",
  "Pharmaceutical Machinery & Equipment",
  "Packaging Solutions",
  "Laboratory Equipment & Testing",
  "Contract Manufacturing (CDMO/CMO)",
  "Excipients & Raw Materials",
  "Biotechnology & Biologics",
  "Medical Devices",
];

const quickFacts = [
  { label: "Event Dates", value: "19-21 December 2025" },
  { label: "Venue", value: "Bengaluru Palace Grounds" },
  { label: "Expected Visitors", value: "15,000+ professionals" },
  { label: "Exhibition Area", value: "25,000+ sq ft" },
];

export default function ExhibitorPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-start lg:px-8">
        <section className="flex-1 space-y-10">
          {/* Hero Section */}
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full bg-[var(--primary-green,#2d8a2f)]/10 px-4 py-1 text-sm font-semibold text-[var(--primary-green,#2d8a2f)]">
              🏢 Exhibitor Registration Now Open
            </p>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Exhibit at the 74th IPC Pharma Expo
            </h1>
            <p className="text-lg text-gray-600">
              Join 100+ leading pharmaceutical companies showcasing their
              innovations at South Asia&apos;s most influential pharmaceutical
              congress. Reserve your exhibition space and connect with thousands
              of qualified buyers, distributors, and industry stakeholders from
              19-21 December 2025 in Bengaluru.
            </p>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-[var(--primary-green,#2d8a2f)]/15 bg-white p-5 shadow-sm"
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

          {/* Why Exhibit */}
          <div className="rounded-3xl border border-[var(--primary-green,#2d8a2f)]/15 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h2 className="text-xl font-semibold text-gray-900">
              Why Exhibit at 74th IPC Pharma Expo?
            </h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 text-lg text-[var(--primary-green,#2d8a2f)]">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exhibitor Categories */}
          <div className="rounded-3xl border border-[var(--primary-orange,#ff6b35)]/15 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h2 className="text-xl font-semibold text-gray-900">
              Exhibitor Categories
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We welcome exhibitors from various pharmaceutical sectors:
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {exhibitorCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm text-gray-700"
                >
                  <span className="text-[var(--primary-orange,#ff6b35)]">
                    •
                  </span>
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Stall Options */}
          <div className="rounded-3xl border border-[var(--primary-green,#2d8a2f)]/15 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h2 className="text-xl font-semibold text-gray-900">
              Stall Options & Pricing
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-gray-900">
                  Bare Space - ₹8,000/sqm
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Open space without any construction. Ideal for custom-built
                  stands.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-gray-900">
                  Shell Scheme - ₹12,000/sqm
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Ready-to-use stall with basic infrastructure including walls,
                  flooring, and lighting.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-gray-900">
                  Custom Built - ₹15,000/sqm
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Fully customized exhibition space designed according to your
                  specifications.
                </p>
              </div>
              <p className="text-xs text-gray-500">
                * All prices are exclusive of 18% GST. Minimum stall size: 9 sqm
                (3m x 3m)
              </p>
            </div>
          </div>

          {/* Important Information */}
          <div className="rounded-3xl border border-[var(--primary-orange,#ff6b35)]/15 bg-[var(--primary-orange,#ff6b35)]/5 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Important Information
            </h2>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>
                <strong>Booking Process:</strong> Submit the registration form
                below with all required details. Our team will contact you
                within 24-48 hours with booking confirmation and payment
                instructions.
              </p>
              <p>
                <strong>Payment Terms:</strong> A minimum of 25% advance payment
                is required to confirm your stall booking. The advance is
                non-refundable.
              </p>
              <p>
                <strong>Early Bird Offer:</strong> Register before 30 November
                2025 to avail special early bird discounts and premium stall
                locations.
              </p>
            </div>
          </div>

          {/* Additional Links */}
          <div className="space-y-2 text-sm text-gray-500">
            <p>
              Need more information about the event or have questions? Visit our{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--primary-orange,#ff6b35)] underline-offset-4 hover:underline"
              >
                contact page
              </Link>{" "}
              or call us directly.
            </p>
            <p>
              Want to explore the venue layout? Check out our{" "}
              <Link
                href="/floor-plan"
                className="font-semibold text-[var(--primary-green,#2d8a2f)] underline-offset-4 hover:underline"
              >
                floor plan
              </Link>{" "}
              to identify the best location for your stall.
            </p>
            <p>
              Interested in visiting the expo?{" "}
              <Link
                href="/registration"
                className="font-semibold text-[var(--primary-green,#2d8a2f)] underline-offset-4 hover:underline"
              >
                Register as a visitor
              </Link>{" "}
              with a complimentary pass.
            </p>
          </div>
        </section>

        {/* Registration Form Sidebar */}
        <aside className="w-full lg:sticky lg:top-28 lg:max-w-2xl">
          <ExhibitorRegistrationForm />
          <p className="mt-4 text-center text-xs text-gray-500">
            Our team will review your application and contact you within 24-48
            hours with booking confirmation and payment details.
          </p>
        </aside>
      </div>
    </main>
  );
}
