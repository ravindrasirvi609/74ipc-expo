"use client";

import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

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
  state: "",
  address: "",
  interest: "",
  hearAbout: "",
};

export const stateOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
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
  const [errors, setErrors] = useState<
    Partial<Record<keyof LeadFormData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof LeadFormData, boolean>>
  >({});

  const validateForm = (data: LeadFormData) => {
    const nextErrors: Partial<Record<keyof LeadFormData, string>> = {};

    const trimmedName = data.name.trim();
    if (trimmedName.length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    const trimmedCompany = data.company.trim();
    if (trimmedCompany && trimmedCompany.length < 2) {
      nextErrors.company = "Company name looks too short.";
    }

    const trimmedJobTitle = data.jobTitle.trim();
    if (trimmedJobTitle && trimmedJobTitle.length < 2) {
      nextErrors.jobTitle = "Job title looks too short.";
    }

    const trimmedEmail = data.email.trim();
    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    const phoneDigits = data.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      nextErrors.phone = "Enter a 10-digit mobile number.";
    }

    const trimmedCity = data.city.trim();
    if (trimmedCity && trimmedCity.length < 2) {
      nextErrors.city = "City name looks too short.";
    }

    const trimmedAddress = data.address.trim();
    if (trimmedAddress && trimmedAddress.length < 5) {
      nextErrors.address = "Add a few more details to the address.";
    }

    if (!data.interest) {
      nextErrors.interest = "Select the option that fits best.";
    }

    const trimmedHearAbout = data.hearAbout.trim();
    if (trimmedHearAbout && trimmedHearAbout.length < 2) {
      nextErrors.hearAbout = "Let us know how you heard about us.";
    }

    return nextErrors;
  };

  const fieldHasError = (field: keyof LeadFormData) =>
    Boolean(touched[field] && errors[field]);

  const baseInputClasses =
    "w-full rounded-xl border px-4 py-2.5 text-gray-900 shadow-sm transition focus:outline-none focus:ring-2";
  const inputClasses = (field: keyof LeadFormData) =>
    fieldHasError(field)
      ? `${baseInputClasses} border-red-400 focus:border-red-500 focus:ring-red-100`
      : `${baseInputClasses} border-gray-200 focus:border-[var(--primary-green,#008080)] focus:ring-[var(--primary-green,#008080)]/30`;

  const handleFormInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof LeadFormData;
    const updated = { ...formData, [fieldName]: value };

    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }

    setFormData(updated);

    if (touched[fieldName]) {
      setErrors(validateForm(updated));
    } else if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleBlur = (
    event: FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const fieldName = event.target.name as keyof LeadFormData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors(validateForm(formData));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    const validationErrors = validateForm(formData);
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof LeadFormData] = true;
      return acc;
    }, {} as Partial<Record<keyof LeadFormData, boolean>>);

    setTouched(allTouched);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields before submitting.");
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
      setTouched({});
      setErrors({});

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
    <div className="relative overflow-hidden rounded-3xl border border-[var(--primary-green,#008080)]/10 bg-white/95 shadow-[0_25px_60px_-35px_rgba(0,80,103,0.5)]">
      <div
        className="pointer-events-none absolute -top-28 left-12 hidden h-56 w-56 rounded-full bg-[var(--primary-green,#008080)]/15 blur-3xl sm:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-[var(--primary-orange,#ff6b35)]/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10 p-8 sm:p-10">
        <form className="space-y-8" onSubmit={handleSubmit} noValidate>
          <div className="space-y-3 text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--primary-green,#008080)]/10 px-5 py-1.5 text-sm font-semibold text-[var(--primary-green,#008080)]">
              Expo Registration
              <span className="hidden text-xs font-medium uppercase tracking-widest text-[var(--primary-green,#008080)] sm:inline">
                2-min completion
              </span>
            </p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-3xl">
              Reserve your spot at the 74th IPC Pharma Expo
            </h2>
            <p className="text-sm text-gray-500 sm:text-base">
              Share your details to receive your QR badge, curated session
              picks, and VIP lounge access updates within one business day.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50/80 p-4 text-sm text-gray-600 sm:grid-cols-4">
            <div>
              <p className="font-semibold text-gray-900">Location</p>
              <p>Bangalore International Exhibition Centre, Bangalore</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Dates</p>
              <p>19-21 Dec 2025</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Attendees</p>
              <p>15k+ professionals</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Entry</p>
              <p>Complimentary pass</p>
            </div>
          </div>

          {status === "error" && errorMessage && (
            <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">
              {errorMessage}
            </p>
          )}

          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Your details
              </h3>
              <span className="text-xs text-gray-400">
                Fields marked <span className="text-red-500">*</span> are
                required
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2" htmlFor="name">
                <span className="text-sm font-semibold text-gray-700">
                  Full name <span className="text-red-500">*</span>
                </span>
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("name")}
                  placeholder="e.g. Dr. Asha Raman"
                  aria-invalid={fieldHasError("name")}
                  aria-describedby={
                    fieldHasError("name") ? "name-error" : undefined
                  }
                  autoComplete="name"
                />
                {fieldHasError("name") ? (
                  <p id="name-error" className="text-xs text-red-500">
                    {errors.name}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    We&apos;ll print this on your badge.
                  </p>
                )}
              </label>

              <label className="space-y-2" htmlFor="company">
                <span className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  Company
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Optional
                  </span>
                </span>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("company")}
                  placeholder="Your organisation"
                  aria-invalid={fieldHasError("company")}
                  aria-describedby={
                    fieldHasError("company") ? "company-error" : undefined
                  }
                  autoComplete="organization"
                />
                {fieldHasError("company") ? (
                  <p id="company-error" className="text-xs text-red-500">
                    {errors.company}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Help exhibitors tailor conversations to your goals.
                  </p>
                )}
              </label>

              <label className="space-y-2" htmlFor="jobTitle">
                <span className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  Job title
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Optional
                  </span>
                </span>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("jobTitle")}
                  placeholder="e.g. Head of R&D"
                  aria-invalid={fieldHasError("jobTitle")}
                  aria-describedby={
                    fieldHasError("jobTitle") ? "jobTitle-error" : undefined
                  }
                  autoComplete="organization-title"
                />
                {fieldHasError("jobTitle") ? (
                  <p id="jobTitle-error" className="text-xs text-red-500">
                    {errors.jobTitle}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Optional, but helps us personalise recommendations.
                  </p>
                )}
              </label>

              <label className="space-y-2" htmlFor="email">
                <span className="text-sm font-semibold text-gray-700">
                  Email address <span className="text-red-500">*</span>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("email")}
                  placeholder="you@example.com"
                  aria-invalid={fieldHasError("email")}
                  aria-describedby={
                    fieldHasError("email") ? "email-error" : undefined
                  }
                  autoComplete="email"
                />
                {fieldHasError("email") ? (
                  <p id="email-error" className="text-xs text-red-500">
                    {errors.email}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Confirmation + QR badge arrives here.
                  </p>
                )}
              </label>

              <label className="space-y-2" htmlFor="phone">
                <span className="text-sm font-semibold text-gray-700">
                  Mobile number <span className="text-red-500">*</span>
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  pattern="\d{10}"
                  inputMode="numeric"
                  maxLength={10}
                  className={inputClasses("phone")}
                  placeholder="10-digit mobile"
                  aria-invalid={fieldHasError("phone")}
                  aria-describedby={
                    fieldHasError("phone") ? "phone-error" : undefined
                  }
                  autoComplete="tel"
                />
                {fieldHasError("phone") ? (
                  <p id="phone-error" className="text-xs text-red-500">
                    {errors.phone}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Used for urgent on-site updates only.
                  </p>
                )}
              </label>

              <label className="space-y-2" htmlFor="city">
                <span className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  City
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Optional
                  </span>
                </span>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("city")}
                  placeholder="Where will you be travelling from?"
                  aria-invalid={fieldHasError("city")}
                  aria-describedby={
                    fieldHasError("city") ? "city-error" : undefined
                  }
                  autoComplete="address-level2"
                />
                {fieldHasError("city") ? (
                  <p id="city-error" className="text-xs text-red-500">
                    {errors.city}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Helps us plan shuttle routes and local tips.
                  </p>
                )}
              </label>

              <label className="space-y-2" htmlFor="state">
                <span className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  State
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Optional
                  </span>
                </span>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("state")}
                  aria-invalid={fieldHasError("state")}
                  aria-describedby={
                    fieldHasError("state") ? "state-error" : undefined
                  }
                >
                  <option value="">Select state (if in India)</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {fieldHasError("state") ? (
                  <p id="state-error" className="text-xs text-red-500">
                    {errors.state}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Optional, but helps us understand regional interest.
                  </p>
                )}
              </label>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Participation preferences
              </h3>
              <span className="text-xs text-gray-400">
                Choose what you&apos;re most excited about
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2" htmlFor="interest">
                <span className="text-sm font-semibold text-gray-700">
                  Interested in <span className="text-red-500">*</span>
                </span>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("interest")}
                  aria-invalid={fieldHasError("interest")}
                  aria-describedby={
                    fieldHasError("interest") ? "interest-error" : undefined
                  }
                >
                  <option value="">Select an option</option>
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {fieldHasError("interest") ? (
                  <p id="interest-error" className="text-xs text-red-500">
                    {errors.interest}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    We&apos;ll tailor your welcome kit based on this.
                  </p>
                )}
              </label>

              <label className="space-y-2" htmlFor="hearAbout">
                <span className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  How did you hear about us?
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Optional
                  </span>
                </span>
                <select
                  id="hearAbout"
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("hearAbout")}
                  aria-invalid={fieldHasError("hearAbout")}
                  aria-describedby={
                    fieldHasError("hearAbout") ? "hearAbout-error" : undefined
                  }
                >
                  <option value="">Select an option</option>
                  {hearAboutOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {fieldHasError("hearAbout") ? (
                  <p id="hearAbout-error" className="text-xs text-red-500">
                    {errors.hearAbout}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Optional insight that helps us support attendees better.
                  </p>
                )}
              </label>
            </div>

            <label className="space-y-2" htmlFor="address">
              <span className="flex items-center justify-between text-sm font-semibold text-gray-700">
                Address for correspondence
                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Optional
                </span>
              </span>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFormInput}
                onBlur={handleBlur}
                rows={3}
                className={`${inputClasses("address")} min-h-[96px] resize-y`}
                placeholder="Share any mailing address or on-site meet point preferences."
                aria-invalid={fieldHasError("address")}
                aria-describedby={
                  fieldHasError("address") ? "address-error" : undefined
                }
              />
              {fieldHasError("address") ? (
                <p id="address-error" className="text-xs text-red-500">
                  {errors.address}
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  Optional: helps us coordinate logistics or invite-only
                  sessions.
                </p>
              )}
            </label>
          </section>

          {status === "success" && (
            <p className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-[var(--primary-green,#008080)] shadow-sm">
              Thanks! We&apos;ve received your registration details. Look out
              for a confirmation email shortly.
            </p>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-[var(--primary-green,#008080)] px-6 py-3.5 text-lg font-semibold text-white shadow-lg transition hover:bg-[var(--primary-green,#006b6b)] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {status === "submitting"
                ? "Submitting..."
                : "Submit registration"}
            </button>
            <p className="text-center text-xs text-gray-400">
              We respect your inbox—no spam, just expo essentials and key
              updates.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
