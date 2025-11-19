"use client";

import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export interface AccommodationFormData {
    ipcRegistrationNumber: string;
    checkInDate: string;
    checkOutDate: string;
    checkInTime: string;
    checkOutTime: string;
    name: string;
    phone: string;
    address: string;
}

const INITIAL_FORM_DATA: AccommodationFormData = {
    ipcRegistrationNumber: "",
    checkInDate: "",
    checkOutDate: "",
    checkInTime: "",
    checkOutTime: "",
    name: "",
    phone: "",
    address: "",
};

interface AccommodationFormProps {
    onSuccess?: () => void;
}

export default function AccommodationForm({
    onSuccess,
}: AccommodationFormProps = {}) {
    const [formData, setFormData] = useState<AccommodationFormData>(() => ({
        ...INITIAL_FORM_DATA,
    }));
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<
        Partial<Record<keyof AccommodationFormData, string>>
    >({});
    const [touched, setTouched] = useState<
        Partial<Record<keyof AccommodationFormData, boolean>>
    >({});

    const validateForm = (data: AccommodationFormData) => {
        const nextErrors: Partial<Record<keyof AccommodationFormData, string>> = {};

        if (!data.ipcRegistrationNumber.trim()) {
            nextErrors.ipcRegistrationNumber = "IPC Registration Number is required.";
        }

        if (!data.checkInDate) {
            nextErrors.checkInDate = "Check-in date is required.";
        }

        if (!data.checkOutDate) {
            nextErrors.checkOutDate = "Check-out date is required.";
        } else if (data.checkInDate && data.checkOutDate < data.checkInDate) {
            nextErrors.checkOutDate = "Check-out date cannot be before check-in date.";
        }

        if (!data.checkInTime) {
            nextErrors.checkInTime = "Check-in time is required.";
        }

        if (!data.checkOutTime) {
            nextErrors.checkOutTime = "Check-out time is required.";
        }

        const trimmedName = data.name.trim();
        if (trimmedName.length < 2) {
            nextErrors.name = "Please enter your full name.";
        }

        const phoneDigits = data.phone.replace(/\D/g, "");
        if (phoneDigits.length !== 10) {
            nextErrors.phone = "Enter a 10-digit mobile number.";
        }

        const trimmedAddress = data.address.trim();
        if (trimmedAddress.length < 5) {
            nextErrors.address = "Please enter a valid address.";
        }

        return nextErrors;
    };

    const fieldHasError = (field: keyof AccommodationFormData) =>
        Boolean(touched[field] && errors[field]);

    const baseInputClasses =
        "w-full rounded-xl border px-4 py-2.5 text-gray-900 shadow-sm transition focus:outline-none focus:ring-2";
    const inputClasses = (field: keyof AccommodationFormData) =>
        fieldHasError(field)
            ? `${baseInputClasses} border-red-400 focus:border-red-500 focus:ring-red-100`
            : `${baseInputClasses} border-gray-200 focus:border-[var(--primary-green,#008080)] focus:ring-[var(--primary-green,#008080)]/30`;

    const handleFormInput = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target;
        const fieldName = name as keyof AccommodationFormData;
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
        const fieldName = event.target.name as keyof AccommodationFormData;
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
            acc[key as keyof AccommodationFormData] = true;
            return acc;
        }, {} as Partial<Record<keyof AccommodationFormData, boolean>>);

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

            const response = await fetch("/api/accommodation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.error || "Unable to submit accommodation request");
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
                            🏨 Accommodation Request
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                            Book Your Stay
                        </h2>
                        <p className="text-sm text-gray-500 sm:text-base">
                            Please provide your details to request accommodation for the event.
                        </p>
                    </div>

                    {status === "error" && errorMessage && (
                        <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">
                            {errorMessage}
                        </p>
                    )}

                    <section className="space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                                Stay Details
                            </h3>
                            <span className="text-xs text-gray-400">
                                All fields are required
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <label className="space-y-2 md:col-span-2" htmlFor="ipcRegistrationNumber">
                                <span className="text-sm font-semibold text-gray-700">
                                    IPC Registration Number <span className="text-red-500">*</span>
                                </span>
                                <input
                                    id="ipcRegistrationNumber"
                                    name="ipcRegistrationNumber"
                                    required
                                    value={formData.ipcRegistrationNumber}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("ipcRegistrationNumber")}
                                    placeholder="Enter your IPC Registration Number"
                                    aria-invalid={fieldHasError("ipcRegistrationNumber")}
                                    aria-describedby={
                                        fieldHasError("ipcRegistrationNumber") ? "ipcRegistrationNumber-error" : undefined
                                    }
                                />
                                {fieldHasError("ipcRegistrationNumber") && (
                                    <p id="ipcRegistrationNumber-error" className="text-xs text-red-500">
                                        {errors.ipcRegistrationNumber}
                                    </p>
                                )}
                            </label>

                            <label className="space-y-2" htmlFor="checkInDate">
                                <span className="text-sm font-semibold text-gray-700">
                                    Check-in Date <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="date"
                                    id="checkInDate"
                                    name="checkInDate"
                                    required
                                    value={formData.checkInDate}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("checkInDate")}
                                    aria-invalid={fieldHasError("checkInDate")}
                                    aria-describedby={
                                        fieldHasError("checkInDate") ? "checkInDate-error" : undefined
                                    }
                                />
                                {fieldHasError("checkInDate") && (
                                    <p id="checkInDate-error" className="text-xs text-red-500">
                                        {errors.checkInDate}
                                    </p>
                                )}
                            </label>

                            <label className="space-y-2" htmlFor="checkOutDate">
                                <span className="text-sm font-semibold text-gray-700">
                                    Check-out Date <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="date"
                                    id="checkOutDate"
                                    name="checkOutDate"
                                    required
                                    value={formData.checkOutDate}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("checkOutDate")}
                                    aria-invalid={fieldHasError("checkOutDate")}
                                    aria-describedby={
                                        fieldHasError("checkOutDate") ? "checkOutDate-error" : undefined
                                    }
                                />
                                {fieldHasError("checkOutDate") && (
                                    <p id="checkOutDate-error" className="text-xs text-red-500">
                                        {errors.checkOutDate}
                                    </p>
                                )}
                            </label>

                            <label className="space-y-2" htmlFor="checkInTime">
                                <span className="text-sm font-semibold text-gray-700">
                                    Check-in Time <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="time"
                                    id="checkInTime"
                                    name="checkInTime"
                                    required
                                    value={formData.checkInTime}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("checkInTime")}
                                    aria-invalid={fieldHasError("checkInTime")}
                                    aria-describedby={
                                        fieldHasError("checkInTime") ? "checkInTime-error" : undefined
                                    }
                                />
                                {fieldHasError("checkInTime") && (
                                    <p id="checkInTime-error" className="text-xs text-red-500">
                                        {errors.checkInTime}
                                    </p>
                                )}
                            </label>

                            <label className="space-y-2" htmlFor="checkOutTime">
                                <span className="text-sm font-semibold text-gray-700">
                                    Check-out Time <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="time"
                                    id="checkOutTime"
                                    name="checkOutTime"
                                    required
                                    value={formData.checkOutTime}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("checkOutTime")}
                                    aria-invalid={fieldHasError("checkOutTime")}
                                    aria-describedby={
                                        fieldHasError("checkOutTime") ? "checkOutTime-error" : undefined
                                    }
                                />
                                {fieldHasError("checkOutTime") && (
                                    <p id="checkOutTime-error" className="text-xs text-red-500">
                                        {errors.checkOutTime}
                                    </p>
                                )}
                            </label>
                        </div>
                    </section>

                    <section className="space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                                Personal Details
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <label className="space-y-2" htmlFor="name">
                                <span className="text-sm font-semibold text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </span>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("name")}
                                    placeholder="e.g. John Doe"
                                    aria-invalid={fieldHasError("name")}
                                    aria-describedby={
                                        fieldHasError("name") ? "name-error" : undefined
                                    }
                                    autoComplete="name"
                                />
                                {fieldHasError("name") && (
                                    <p id="name-error" className="text-xs text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </label>

                            <label className="space-y-2" htmlFor="phone">
                                <span className="text-sm font-semibold text-gray-700">
                                    Mobile Number <span className="text-red-500">*</span>
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
                                {fieldHasError("phone") && (
                                    <p id="phone-error" className="text-xs text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </label>
                        </div>

                        <label className="space-y-2 block" htmlFor="address">
                            <span className="text-sm font-semibold text-gray-700">
                                Address <span className="text-red-500">*</span>
                            </span>
                            <textarea
                                id="address"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleFormInput}
                                onBlur={handleBlur}
                                rows={3}
                                className={`${inputClasses("address")} min-h-[96px] resize-y`}
                                placeholder="Your full address"
                                aria-invalid={fieldHasError("address")}
                                aria-describedby={
                                    fieldHasError("address") ? "address-error" : undefined
                                }
                            />
                            {fieldHasError("address") && (
                                <p id="address-error" className="text-xs text-red-500">
                                    {errors.address}
                                </p>
                            )}
                        </label>
                    </section>

                    {status === "success" && (
                        <p className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-[var(--primary-green,#008080)] shadow-sm">
                            Thanks! We&apos;ve received your accommodation request. We will get back to you shortly.
                        </p>
                    )}

                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full rounded-full bg-[var(--primary-green,#008080)] px-6 py-3.5 text-lg font-semibold text-white shadow-lg transition hover:bg-[var(--primary-green,#006b6b)] disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            {status === "submitting" ? "Submitting..." : "Submit Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
