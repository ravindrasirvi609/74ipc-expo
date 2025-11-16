"use client";

import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export interface RegistrationFormData {
  salutation: string;
  name: string;
  designation: string;
  affiliation: string;
  email: string;
  whatsapp: string;
  address: string;
  country: string;
  registrationCategory: string;
}

const INITIAL_FORM_DATA: RegistrationFormData = {
  salutation: "",
  name: "",
  designation: "",
  affiliation: "",
  email: "",
  whatsapp: "",
  address: "",
  country: "",
  registrationCategory: "",
};

export const salutationOptions = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];

export const registrationCategoryOptions = [
  "Speaker",
  "Sponsor",
  "Exhibitor",
  "Guest",
];

export const countryOptions = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export default function RegistrationForm({
  onSuccess,
}: RegistrationFormProps = {}) {
  const [formData, setFormData] = useState<RegistrationFormData>(() => ({
    ...INITIAL_FORM_DATA,
  }));
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationFormData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof RegistrationFormData, boolean>>
  >({});

  const validateForm = (data: RegistrationFormData) => {
    const nextErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

    if (!data.salutation) {
      nextErrors.salutation = "Please select a salutation.";
    }

    const trimmedName = data.name.trim();
    if (trimmedName.length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    const trimmedDesignation = data.designation.trim();
    if (trimmedDesignation.length < 2) {
      nextErrors.designation = "Please enter your designation.";
    }

    const trimmedAffiliation = data.affiliation.trim();
    if (trimmedAffiliation.length < 2) {
      nextErrors.affiliation = "Please enter your affiliation/organization.";
    }

    const trimmedEmail = data.email.trim();
    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    const whatsappDigits = data.whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 10 || whatsappDigits.length > 15) {
      nextErrors.whatsapp = "Enter a valid WhatsApp number (10-15 digits).";
    }

    const trimmedAddress = data.address.trim();
    if (trimmedAddress.length < 5) {
      nextErrors.address = "Please enter your complete address.";
    }

    if (!data.country) {
      nextErrors.country = "Please select a country.";
    }

    if (!data.registrationCategory) {
      nextErrors.registrationCategory =
        "Please select a registration category.";
    }

    return nextErrors;
  };

  const fieldHasError = (field: keyof RegistrationFormData) =>
    Boolean(touched[field] && errors[field]);

  const baseInputClasses =
    "w-full rounded-xl border-2 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-4";
  const inputClasses = (field: keyof RegistrationFormData) =>
    fieldHasError(field)
      ? `${baseInputClasses} border-red-300 bg-red-50/50 focus:border-red-500 focus:bg-white focus:ring-red-100`
      : `${baseInputClasses} border-gray-200 bg-white hover:border-gray-300 focus:border-[var(--primary-green,#008080)] focus:bg-white focus:ring-[var(--primary-green,#008080)]/20 disabled:bg-gray-50 disabled:cursor-not-allowed`;

  const handleFormInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof RegistrationFormData;
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
    const fieldName = event.target.name as keyof RegistrationFormData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors(validateForm(formData));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allTouched: Partial<Record<keyof RegistrationFormData, boolean>> = {};
    (Object.keys(formData) as Array<keyof RegistrationFormData>).forEach(
      (k) => {
        allTouched[k] = true;
      }
    );
    setTouched(allTouched);

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setErrorMessage("Please correct the errors before submitting.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`
        );
      }

      setStatus("success");
      setFormData({ ...INITIAL_FORM_DATA });
      setTouched({});
      setErrors({});

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Registration submission failed:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again later."
      );
    }
  };

  const isDisabled = status === "submitting" || status === "success";

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-2xl ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-10 lg:p-12">
      <div className="mb-8 space-y-3 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary-green,#008080)] to-teal-600 shadow-lg">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Event Registration
        </h2>
        <p className="text-base text-gray-600 sm:text-lg">
          Join us at the 74th IPC Pharma Expo. Complete your registration below.
        </p>
      </div>

      {status === "success" && (
        <div
          className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500 rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-5 shadow-md"
          role="alert"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-emerald-900">
                Registration Successful!
              </p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-700">
                Thank you for registering. You&apos;ll receive a confirmation
                email with your registration details shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {status === "error" && errorMessage && (
        <div
          className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-5 shadow-md"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-500 shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-red-900">Unable to submit</p>
              <p className="mt-2 text-sm leading-relaxed text-red-700">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
        {/* Salutation */}
        <div className="group">
          <label
            htmlFor="salutation"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Salutation <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="salutation"
            name="salutation"
            value={formData.salutation}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            className={inputClasses("salutation")}
            aria-invalid={fieldHasError("salutation")}
            aria-describedby={
              fieldHasError("salutation") ? "salutation-error" : undefined
            }
          >
            <option value="">Select salutation</option>
            {salutationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldHasError("salutation") && (
            <p
              id="salutation-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.salutation}
            </p>
          )}
        </div>

        {/* Name */}
        <div className="group">
          <label
            htmlFor="name"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Full Name <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder="Enter your full name"
            className={inputClasses("name")}
            aria-invalid={fieldHasError("name")}
            aria-describedby={fieldHasError("name") ? "name-error" : undefined}
          />
          {fieldHasError("name") && (
            <p
              id="name-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Designation */}
        <div className="group">
          <label
            htmlFor="designation"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Designation <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder="e.g., Senior Manager, Research Scientist"
            className={inputClasses("designation")}
            aria-invalid={fieldHasError("designation")}
            aria-describedby={
              fieldHasError("designation") ? "designation-error" : undefined
            }
          />
          {fieldHasError("designation") && (
            <p
              id="designation-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.designation}
            </p>
          )}
        </div>

        {/* Affiliation */}
        <div className="group">
          <label
            htmlFor="affiliation"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Affiliation <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder="Organization or institution name"
            className={inputClasses("affiliation")}
            aria-invalid={fieldHasError("affiliation")}
            aria-describedby={
              fieldHasError("affiliation") ? "affiliation-error" : undefined
            }
          />
          {fieldHasError("affiliation") && (
            <p
              id="affiliation-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.affiliation}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="group">
          <label
            htmlFor="email"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Email ID <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder="your.email@example.com"
            className={inputClasses("email")}
            aria-invalid={fieldHasError("email")}
            aria-describedby={
              fieldHasError("email") ? "email-error" : undefined
            }
          />
          {fieldHasError("email") && (
            <p
              id="email-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div className="group">
          <label
            htmlFor="whatsapp"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            WhatsApp Number <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder="+91 9876543210"
            className={inputClasses("whatsapp")}
            aria-invalid={fieldHasError("whatsapp")}
            aria-describedby={
              fieldHasError("whatsapp") ? "whatsapp-error" : undefined
            }
          />
          {fieldHasError("whatsapp") && (
            <p
              id="whatsapp-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.whatsapp}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="group">
          <label
            htmlFor="address"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Address <span className="ml-1 text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder="Enter your complete address"
            rows={3}
            className={inputClasses("address")}
            aria-invalid={fieldHasError("address")}
            aria-describedby={
              fieldHasError("address") ? "address-error" : undefined
            }
          />
          {fieldHasError("address") && (
            <p
              id="address-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.address}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="group">
          <label
            htmlFor="country"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Country <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            className={inputClasses("country")}
            aria-invalid={fieldHasError("country")}
            aria-describedby={
              fieldHasError("country") ? "country-error" : undefined
            }
          >
            <option value="">Select country</option>
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldHasError("country") && (
            <p
              id="country-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.country}
            </p>
          )}
        </div>

        {/* Registration Category */}
        <div className="group">
          <label
            htmlFor="registrationCategory"
            className="mb-2 flex items-center text-sm font-semibold text-gray-700"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Registration Category <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="registrationCategory"
            name="registrationCategory"
            value={formData.registrationCategory}
            onChange={handleFormInput}
            onBlur={handleBlur}
            disabled={isDisabled}
            className={inputClasses("registrationCategory")}
            aria-invalid={fieldHasError("registrationCategory")}
            aria-describedby={
              fieldHasError("registrationCategory")
                ? "registrationCategory-error"
                : undefined
            }
          >
            <option value="">Select category</option>
            {registrationCategoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldHasError("registrationCategory") && (
            <p
              id="registrationCategory-error"
              className="mt-2 flex items-center text-sm font-medium text-red-600"
              role="alert"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.registrationCategory}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isDisabled}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary-green,#008080)] to-teal-600 px-6 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[var(--primary-green,#008080)]/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-base">
              {status === "submitting" ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting Registration...
                </>
              ) : status === "success" ? (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Registration Complete
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Complete Registration
                </>
              )}
            </span>
            {status !== "submitting" && status !== "success" && (
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-teal-600 to-[var(--primary-green,#008080)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-center">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xs text-gray-600">
          All fields marked with{" "}
          <span className="font-bold text-red-500">*</span> are required
        </p>
      </div>
    </div>
  );
}
