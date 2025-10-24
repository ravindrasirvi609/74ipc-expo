"use client";

import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export interface ExhibitorFormData {
  // Company Information
  companyName: string;
  companyAddress: string;
  city: string;
  state: string;
  pincode: string;
  country: string;

  // Contact Person Details
  contactPersonName: string;
  designation: string;
  phone: string;
  alternatePhone: string;
  email: string;
  website: string;

  // Stall Information
  stallType: string;
  stallSize: string;
  stallLocation: string;

  // Products/Services
  productsServices: string;
  category: string;

  // Additional Services
  electricityRequired: boolean;
  furnitureRequired: boolean;
  additionalRequirements: string;

  // Payment
  paymentMode: string;

  // Terms
  acceptedTerms: boolean;
}

const INITIAL_FORM_DATA: ExhibitorFormData = {
  companyName: "",
  companyAddress: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  contactPersonName: "",
  designation: "",
  phone: "",
  alternatePhone: "",
  email: "",
  website: "",
  stallType: "",
  stallSize: "",
  stallLocation: "",
  productsServices: "",
  category: "",
  electricityRequired: false,
  furnitureRequired: false,
  additionalRequirements: "",
  paymentMode: "",
  acceptedTerms: false,
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

export const stallTypeOptions = [
  { value: "bare", label: "Bare Space", rate: 8000 },
  { value: "shell", label: "Shell Scheme", rate: 12000 },
  { value: "custom", label: "Custom Built", rate: 15000 },
];

export const stallSizeOptions = [
  "9 sqm (3m x 3m)",
  "12 sqm (3m x 4m)",
  "18 sqm (3m x 6m)",
  "24 sqm (4m x 6m)",
  "36 sqm (6m x 6m)",
  "Custom Size",
];

export const categoryOptions = [
  "Active Pharmaceutical Ingredients (API)",
  "Pharmaceutical Machinery",
  "Packaging Solutions",
  "Laboratory Equipment",
  "Quality Control & Testing",
  "Excipients & Raw Materials",
  "Contract Manufacturing",
  "Pharmaceutical Services",
  "Biotechnology",
  "Nutraceuticals",
  "Ayurvedic & Herbal Products",
  "Medical Devices",
  "Other",
];

export const paymentModeOptions = [
  "Online Transfer (NEFT/RTGS/IMPS)",
  "Cheque/DD",
  "Credit Card",
  "UPI",
];

interface ExhibitorRegistrationFormProps {
  onSuccess?: () => void;
}

export default function ExhibitorRegistrationForm({
  onSuccess,
}: ExhibitorRegistrationFormProps = {}) {
  const [formData, setFormData] = useState<ExhibitorFormData>(() => ({
    ...INITIAL_FORM_DATA,
  }));
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ExhibitorFormData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ExhibitorFormData, boolean>>
  >({});
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Calculate costs
  const getStallRate = () => {
    const stallType = stallTypeOptions.find(
      (type) => type.value === formData.stallType
    );
    return stallType?.rate || 0;
  };

  const getStallSqm = () => {
    const sizeMatch = formData.stallSize.match(/(\d+)\s*sqm/);
    return sizeMatch ? parseInt(sizeMatch[1]) : 0;
  };

  const calculateSubtotal = () => {
    return getStallRate() * getStallSqm();
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const validateForm = (data: ExhibitorFormData) => {
    const nextErrors: Partial<Record<keyof ExhibitorFormData, string>> = {};

    // Company Information
    if (data.companyName.trim().length < 2) {
      nextErrors.companyName = "Please enter your company name.";
    }
    if (data.companyAddress.trim().length < 5) {
      nextErrors.companyAddress = "Please enter complete company address.";
    }
    if (data.city.trim().length < 2) {
      nextErrors.city = "Please enter city.";
    }
    if (!data.state) {
      nextErrors.state = "Please select state.";
    }
    if (!/^\d{6}$/.test(data.pincode)) {
      nextErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    // Contact Person
    if (data.contactPersonName.trim().length < 2) {
      nextErrors.contactPersonName = "Please enter contact person name.";
    }
    if (data.designation.trim().length < 2) {
      nextErrors.designation = "Please enter designation.";
    }
    const phoneDigits = data.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      nextErrors.phone = "Enter a valid 10-digit mobile number.";
    }
    const trimmedEmail = data.email.trim();
    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    // Stall Information
    if (!data.stallType) {
      nextErrors.stallType = "Please select stall type.";
    }
    if (!data.stallSize) {
      nextErrors.stallSize = "Please select stall size.";
    }

    // Products/Services
    if (data.productsServices.trim().length < 10) {
      nextErrors.productsServices =
        "Please provide details about products/services (minimum 10 characters).";
    }
    if (!data.category) {
      nextErrors.category = "Please select a category.";
    }

    // Payment
    if (!data.paymentMode) {
      nextErrors.paymentMode = "Please select payment mode.";
    }

    // Terms
    if (!data.acceptedTerms) {
      nextErrors.acceptedTerms = "You must accept the terms and conditions.";
    }

    return nextErrors;
  };

  const fieldHasError = (field: keyof ExhibitorFormData) =>
    Boolean(touched[field] && errors[field]);

  const baseInputClasses =
    "w-full rounded-xl border px-4 py-2.5 text-gray-900 shadow-sm transition focus:outline-none focus:ring-2";
  const inputClasses = (field: keyof ExhibitorFormData) =>
    fieldHasError(field)
      ? `${baseInputClasses} border-red-400 focus:border-red-500 focus:ring-red-100`
      : `${baseInputClasses} border-gray-200 focus:border-[var(--primary-green,#2d8a2f)] focus:ring-[var(--primary-green,#2d8a2f)]/30`;

  const handleFormInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;
    const fieldName = name as keyof ExhibitorFormData;

    let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (event.target as HTMLInputElement).checked;
    }

    const updated = { ...formData, [fieldName]: fieldValue };

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

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid file (PNG, JPG, SVG, or PDF)");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      setLogoFile(file);
    }
  };

  const handleBlur = (
    event: FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const fieldName = event.target.name as keyof ExhibitorFormData;
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
      acc[key as keyof ExhibitorFormData] = true;
      return acc;
    }, {} as Partial<Record<keyof ExhibitorFormData, boolean>>);

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

      // Prepare form data with logo
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value));
      });

      if (logoFile) {
        submitData.append("logo", logoFile);
      }

      // Add calculated costs
      submitData.append("stallRate", String(getStallRate()));
      submitData.append("stallSqm", String(getStallSqm()));
      submitData.append("subtotal", String(calculateSubtotal()));
      submitData.append("gst", String(calculateGST()));
      submitData.append("totalAmount", String(calculateTotal()));

      const response = await fetch("/api/exhibitor", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to submit registration");
      }

      setStatus("success");
      setFormData({ ...INITIAL_FORM_DATA });
      setLogoFile(null);
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

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-[var(--primary-green,#2d8a2f)]/10 bg-white/95 shadow-2xl">
        <div className="relative z-10 p-8 text-center sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary-green,#2d8a2f)]/10">
            <svg
              className="h-10 w-10 text-[var(--primary-green,#2d8a2f)]"
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
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Registration Successful!
          </h3>
          <p className="mb-6 text-gray-600">
            Thank you for registering as an exhibitor for the 74th IPC Pharma
            Expo. Our team will contact you within 24-48 hours with payment
            details and further instructions.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-full bg-[var(--primary-green,#2d8a2f)] px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-[var(--dark-green,#1b5e20)]"
          >
            Submit Another Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--primary-green,#2d8a2f)]/10 bg-white/95 shadow-2xl">
      <div
        className="pointer-events-none absolute -top-28 left-12 hidden h-56 w-56 rounded-full bg-[var(--primary-green,#2d8a2f)]/15 blur-3xl sm:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-[var(--primary-orange,#ff6b35)]/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10 p-8 sm:p-10">
        <form className="space-y-8" onSubmit={handleSubmit} noValidate>
          <div className="space-y-3 text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--primary-green,#2d8a2f)]/10 px-5 py-1.5 text-sm font-semibold text-[var(--primary-green,#2d8a2f)]">
              🏢 Exhibitor Registration
            </p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-3xl">
              Exhibit at 74th IPC Pharma Expo
            </h2>
            <p className="text-sm text-gray-500 sm:text-base">
              Showcase your products and services to 15,000+ pharma
              professionals from across India
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50/80 p-4 text-sm text-gray-600 sm:grid-cols-4">
            <div>
              <p className="font-semibold text-gray-900">Location</p>
              <p>Bengaluru Palace Grounds</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Dates</p>
              <p>19-21 Dec 2025</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Expected Visitors</p>
              <p>15,000+ professionals</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Exhibitors</p>
              <p>100+ companies</p>
            </div>
          </div>

          {status === "error" && errorMessage && (
            <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">
              {errorMessage}
            </p>
          )}

          {/* Company Information */}
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Company Information
              </h3>
              <span className="text-xs text-gray-400">
                Fields marked <span className="text-red-500">*</span> are
                required
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("companyName")}
                  placeholder="Your Company Pvt. Ltd."
                />
                {fieldHasError("companyName") && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="companyAddress"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Company Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  rows={3}
                  className={inputClasses("companyAddress")}
                  placeholder="Complete address with building/floor details"
                />
                {fieldHasError("companyAddress") && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.companyAddress}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleFormInput}
                    onBlur={handleBlur}
                    className={inputClasses("city")}
                    placeholder="e.g., Mumbai"
                  />
                  {fieldHasError("city") && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleFormInput}
                    onBlur={handleBlur}
                    className={inputClasses("state")}
                  >
                    <option value="">Select State</option>
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {fieldHasError("state") && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="pincode"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleFormInput}
                    onBlur={handleBlur}
                    maxLength={6}
                    className={inputClasses("pincode")}
                    placeholder="400001"
                  />
                  {fieldHasError("pincode") && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.pincode}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleFormInput}
                    className={inputClasses("country")}
                    placeholder="India"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleFormInput}
                  className={inputClasses("website")}
                  placeholder="https://www.yourcompany.com"
                />
              </div>
            </div>
          </section>

          {/* Contact Person Details */}
          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Contact Person Details
            </h3>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contactPersonName"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPersonName"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleFormInput}
                    onBlur={handleBlur}
                    className={inputClasses("contactPersonName")}
                    placeholder="John Doe"
                  />
                  {fieldHasError("contactPersonName") && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.contactPersonName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="designation"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleFormInput}
                    onBlur={handleBlur}
                    className={inputClasses("designation")}
                    placeholder="Marketing Manager"
                  />
                  {fieldHasError("designation") && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.designation}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormInput}
                    onBlur={handleBlur}
                    className={inputClasses("phone")}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {fieldHasError("phone") && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="alternatePhone"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Alternate Number
                  </label>
                  <input
                    type="tel"
                    id="alternatePhone"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleFormInput}
                    className={inputClasses("alternatePhone")}
                    placeholder="9876543211"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("email")}
                  placeholder="john@company.com"
                />
                {fieldHasError("email") && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
          </section>

          {/* Stall Information */}
          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Stall Requirements
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="stallType"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Stall Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="stallType"
                  name="stallType"
                  value={formData.stallType}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("stallType")}
                >
                  <option value="">Select Stall Type</option>
                  {stallTypeOptions.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - ₹{type.rate.toLocaleString("en-IN")}/sqm
                    </option>
                  ))}
                </select>
                {fieldHasError("stallType") && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.stallType}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="stallSize"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Stall Size <span className="text-red-500">*</span>
                </label>
                <select
                  id="stallSize"
                  name="stallSize"
                  value={formData.stallSize}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("stallSize")}
                >
                  <option value="">Select Stall Size</option>
                  {stallSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {fieldHasError("stallSize") && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.stallSize}
                  </p>
                )}
              </div>

              {formData.stallType && formData.stallSize && (
                <div className="rounded-2xl border border-[var(--primary-green,#2d8a2f)]/20 bg-[var(--primary-green,#2d8a2f)]/5 p-5">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    Cost Calculation
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stall Area:</span>
                      <span className="font-medium text-gray-900">
                        {getStallSqm()} sqm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate per sqm:</span>
                      <span className="font-medium text-gray-900">
                        ₹{getStallRate().toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-gray-900">
                        ₹{calculateSubtotal().toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%):</span>
                      <span className="font-medium text-gray-900">
                        ₹{calculateGST().toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between border-t-2 border-[var(--primary-green,#2d8a2f)] pt-2">
                      <span className="font-semibold text-gray-900">
                        Grand Total:
                      </span>
                      <span className="text-lg font-bold text-[var(--primary-green,#2d8a2f)]">
                        ₹{calculateTotal().toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="stallLocation"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Preferred Location (Optional)
                </label>
                <input
                  type="text"
                  id="stallLocation"
                  name="stallLocation"
                  value={formData.stallLocation}
                  onChange={handleFormInput}
                  className={inputClasses("stallLocation")}
                  placeholder="e.g., Near entrance, Corner stall"
                />
              </div>
            </div>
          </section>

          {/* Products/Services */}
          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Products & Services
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  className={inputClasses("category")}
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {fieldHasError("category") && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="productsServices"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Products/Services Description{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="productsServices"
                  name="productsServices"
                  value={formData.productsServices}
                  onChange={handleFormInput}
                  onBlur={handleBlur}
                  rows={4}
                  className={inputClasses("productsServices")}
                  placeholder="Describe the products and services you will showcase at the expo..."
                />
                {fieldHasError("productsServices") && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.productsServices}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Additional Services */}
          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Additional Requirements
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="electricityRequired"
                  name="electricityRequired"
                  checked={formData.electricityRequired}
                  onChange={handleFormInput}
                  className="h-5 w-5 rounded border-gray-300 text-[var(--primary-green,#2d8a2f)] focus:ring-[var(--primary-green,#2d8a2f)]"
                />
                <label
                  htmlFor="electricityRequired"
                  className="text-sm font-medium text-gray-700"
                >
                  Electricity Connection Required
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="furnitureRequired"
                  name="furnitureRequired"
                  checked={formData.furnitureRequired}
                  onChange={handleFormInput}
                  className="h-5 w-5 rounded border-gray-300 text-[var(--primary-green,#2d8a2f)] focus:ring-[var(--primary-green,#2d8a2f)]"
                />
                <label
                  htmlFor="furnitureRequired"
                  className="text-sm font-medium text-gray-700"
                >
                  Additional Furniture Required
                </label>
              </div>

              <div>
                <label
                  htmlFor="additionalRequirements"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Other Requirements
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleFormInput}
                  rows={3}
                  className={inputClasses("additionalRequirements")}
                  placeholder="Any special requirements or requests..."
                />
              </div>
            </div>
          </section>

          {/* Logo Upload */}
          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Company Logo for FASCIA
            </h3>

            <div>
              <label
                htmlFor="logo"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Upload Logo (PNG, JPG, SVG, or PDF - Max 5MB)
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                accept=".png,.jpg,.jpeg,.svg,.pdf"
                onChange={handleLogoUpload}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-[var(--primary-green,#2d8a2f)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-green,#2d8a2f)]/30"
              />
              {logoFile && (
                <p className="mt-2 text-xs text-gray-600">
                  Selected: {logoFile.name}
                </p>
              )}
            </div>
          </section>

          {/* Payment Mode */}
          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Payment Details
            </h3>

            <div>
              <label
                htmlFor="paymentMode"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Preferred Payment Mode <span className="text-red-500">*</span>
              </label>
              <select
                id="paymentMode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleFormInput}
                onBlur={handleBlur}
                className={inputClasses("paymentMode")}
              >
                <option value="">Select Payment Mode</option>
                {paymentModeOptions.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
              {fieldHasError("paymentMode") && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.paymentMode}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                A minimum of 25% advance payment is required to confirm your
                booking.
              </p>
            </div>
          </section>

          {/* Terms and Conditions */}
          <section className="space-y-5">
            <div className="rounded-2xl border border-[var(--primary-orange,#ff6b35)]/20 bg-[var(--primary-orange,#ff6b35)]/5 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-900">
                Terms & Conditions
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-semibold">No Refund Policy:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>
                    A minimum of 25% advance payment is required to book a
                    space.
                  </li>
                  <li>
                    The advance payment is non-refundable under any
                    circumstances.
                  </li>
                  <li>All registration fees are non-refundable.</li>
                  <li>
                    No refunds will be issued for cancellations, no-shows, or
                    withdrawals.
                  </li>
                  <li>
                    Participants are responsible for the full payment of
                    registration fees, regardless of attendance.
                  </li>
                  <li>
                    In the event of unforeseen circumstances or cancellation by
                    organizers, the refund policy may be reviewed at the
                    discretion of the organizing committee.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptedTerms"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleFormInput}
                onBlur={handleBlur}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-[var(--primary-green,#2d8a2f)] focus:ring-[var(--primary-green,#2d8a2f)]"
              />
              <label
                htmlFor="acceptedTerms"
                className="text-sm font-medium text-gray-700"
              >
                I have read and accept the terms and conditions, including the
                no refund policy <span className="text-red-500">*</span>
              </label>
            </div>
            {fieldHasError("acceptedTerms") && (
              <p className="text-xs text-red-600">{errors.acceptedTerms}</p>
            )}
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-gradient-to-r from-[var(--primary-green,#2d8a2f)] to-[var(--accent-green,#4caf50)] px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
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
                Submitting...
              </span>
            ) : (
              "Submit Registration"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
