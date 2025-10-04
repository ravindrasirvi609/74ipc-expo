"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export interface LeadFormData {
  name: string;
  company: string;
  jobTitle: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  interest: string;
  hearAbout: string;
}

const INITIAL_FORM_DATA: LeadFormData = {
  name: "",
  company: "",
  jobTitle: "",
  phone: "",
  email: "",
  city: "",
  state: "Maharashtra",
  address: "",
  interest: "",
  hearAbout: "",
};

export const stateOptions = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Other",
];

export const interestOptions = [
  "Exhibiting",
  "Visiting",
  "Sponsorship Opportunities",
  "Speaking",
  "Partnership/Collaboration",
  "Other",
];

export const hearAboutOptions = [
  "Email Newsletter",
  "Social Media",
  "Industry Colleague",
  "Search Engine",
  "Previous IPC Event",
  "Other",
];

interface LeadRegistrationFormProps {
  onSuccess?: () => void;
}

export default function LeadRegistrationForm({
  onSuccess,
}: LeadRegistrationFormProps = {}) {
  const [formData, setFormData] = useState<LeadFormData>(() => ({
    ...INITIAL_FORM_DATA,
  }));
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    const trimmedName = formData.name.trim();
    const trimmedCompany = formData.company.trim();
    const trimmedJobTitle = formData.jobTitle.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedCity = formData.city.trim();
    const trimmedState = formData.state.trim();
    const trimmedAddress = formData.address.trim();
    const trimmedHearAbout = formData.hearAbout.trim();
    const phoneDigits = formData.phone.replace(/\D/g, "");

    return (
      trimmedName.length > 1 &&
      trimmedCompany.length > 1 &&
      trimmedJobTitle.length > 1 &&
      /.+@.+\..+/.test(trimmedEmail) &&
      phoneDigits.length === 10 &&
      trimmedCity.length > 1 &&
      trimmedState.length > 1 &&
      trimmedAddress.length >= 5 &&
      formData.interest.length > 0 &&
      trimmedHearAbout.length > 1
    );
  }, [formData]);

  const handleFormInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid || status === "submitting") {
      return;
    }

    try {
      setStatus("submitting");
      setErrorMessage(null);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to submit registration");
      }

      setStatus("success");
      setFormData({ ...INITIAL_FORM_DATA });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 400);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-[var(--primary-green,#008080)] to-[var(--primary-orange,#ff6b35)] p-1">
      <div className="rounded-[26px] bg-white p-8 shadow-2xl">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-center space-y-2">
            <p className="inline-flex items-center rounded-full bg-[var(--primary-green,#008080)]/10 px-4 py-1 text-sm font-semibold text-[var(--primary-green,#008080)]">
              🎟️ Free Expo Registration
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Reserve your spot at the 74th IPC Pharma Expo
            </h2>
            <p className="text-sm text-gray-500">
              Tell us a bit about you so we can personalize your expo
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                Full Name
              </span>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleFormInput}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
                placeholder="Enter your full name"
              />
            </label>

            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                Company
              </span>
              <input
                required
                name="company"
                value={formData.company}
                onChange={handleFormInput}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
                placeholder="Enter company name"
              />
            </label>

            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                Job Title
              </span>
              <input
                required
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleFormInput}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
                placeholder="Enter your job title"
              />
            </label>

            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                E-mail
              </span>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleFormInput}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
                placeholder="Enter email address"
              />
            </label>

            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                Mobile No
              </span>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleFormInput}
                pattern="\d{10}"
                inputMode="numeric"
                maxLength={10}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
                placeholder="Enter 10-digit mobile number"
              />
            </label>

            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                City Name
              </span>
              <input
                required
                name="city"
                value={formData.city}
                onChange={handleFormInput}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
                placeholder="Enter city name"
              />
            </label>

            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                State Name
              </span>
              <select
                required
                name="state"
                value={formData.state}
                onChange={handleFormInput}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
              >
                <option value="">Select state</option>
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-left">
              <span className="text-sm font-semibold text-gray-700">
                Interested In
              </span>
              <select
                required
                name="interest"
                value={formData.interest}
                onChange={handleFormInput}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
              >
                <option value="">--Select--</option>
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-1 text-left">
            <span className="text-sm font-semibold text-gray-700">Address</span>
            <textarea
              required
              name="address"
              value={formData.address}
              onChange={handleFormInput}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
              placeholder="Enter full address"
            />
          </label>

          <label className="space-y-1 text-left">
            <span className="text-sm font-semibold text-gray-700">
              How did you hear about us?
            </span>
            <select
              required
              name="hearAbout"
              value={formData.hearAbout}
              onChange={handleFormInput}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm focus:border-[var(--primary-green,#008080)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#008080)]/30"
            >
              <option value="">--Select--</option>
              {hearAboutOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {status === "error" && errorMessage && (
            <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          {status === "success" && (
            <p className="rounded-xl bg-green-50 px-4 py-2 text-sm text-[var(--primary-green,#008080)]">
              Thanks! We&apos;ve received your registration details.
            </p>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={!isFormValid || status === "submitting"}
              className="w-full rounded-full bg-[var(--primary-green,#008080)] px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[var(--primary-green,#006b6b)] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {status === "submitting" ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
