"use client";

import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface CertificateFormData {
    name: string;
    email: string;
    phone: string;
    regNumber: string;
    address: string;
    pincode: string;
}

const INITIAL_FORM_DATA: CertificateFormData = {
    name: "",
    email: "",
    phone: "",
    regNumber: "",
    address: "",
    pincode: "",
};

export default function CertificateForm() {
    const [formData, setFormData] = useState<CertificateFormData>(() => ({
        ...INITIAL_FORM_DATA,
    }));
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<
        Partial<Record<keyof CertificateFormData, string>>
    >({});
    const [touched, setTouched] = useState<
        Partial<Record<keyof CertificateFormData, boolean>>
    >({});

    const validateForm = (data: CertificateFormData) => {
        const nextErrors: Partial<Record<keyof CertificateFormData, string>> = {};

        if (!data.name.trim() || data.name.trim().length < 2) {
            nextErrors.name = "Please enter your registered full name.";
        }

        if (!data.email.trim()) {
            nextErrors.email = "Registered Email ID is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
            nextErrors.email = "Enter a valid email address.";
        }

        const phoneDigits = data.phone.replace(/\D/g, "");
        if (phoneDigits.length !== 10) {
            nextErrors.phone = "Enter a 10-digit mobile number.";
        }

        if (!data.regNumber.trim()) {
            nextErrors.regNumber = "Registration Number is required.";
        }

        if (!data.address.trim() || data.address.trim().length < 10) {
            nextErrors.address = "Please provide complete delivery address.";
        }

        const pincodeDigits = data.pincode.replace(/\D/g, "");
        if (pincodeDigits.length !== 6) {
            nextErrors.pincode = "Enter a valid 6-digit pincode.";
        }

        return nextErrors;
    };

    const fieldHasError = (field: keyof CertificateFormData) =>
        Boolean(touched[field] && errors[field]);

    const baseInputClasses =
        "w-full rounded-xl border px-4 py-2.5 text-gray-900 shadow-sm transition focus:outline-none focus:ring-2";
    const inputClasses = (field: keyof CertificateFormData) =>
        fieldHasError(field)
            ? `${baseInputClasses} border-red-400 focus:border-red-500 focus:ring-red-100`
            : `${baseInputClasses} border-gray-200 focus:border-[var(--primary-green,#008080)] focus:ring-[var(--primary-green,#008080)]/30`;

    const handleFormInput = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        const fieldName = name as keyof CertificateFormData;
        const updated = { ...formData, [fieldName]: value };

        if (status === "error") {
            setStatus("idle");
            setErrorMessage(null);
        }

        setFormData(updated);

        if (touched[fieldName]) {
            setErrors(validateForm(updated));
        }
    };

    const handleBlur = (
        event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const fieldName = event.target.name as keyof CertificateFormData;
        setTouched((prev) => ({ ...prev, [fieldName]: true }));
        setErrors(validateForm(formData));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === "submitting") return;

        const validationErrors = validateForm(formData);
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key as keyof CertificateFormData] = true;
            return acc;
        }, {} as Partial<Record<keyof CertificateFormData, boolean>>);

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

            const response = await fetch("/api/certificates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.error || "Unable to submit request");
            }

            setStatus("success");
            setFormData({ ...INITIAL_FORM_DATA });
            setTouched({});
            setErrors({});
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
            <div className="relative z-10 p-8 sm:p-10">
                <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-3 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Certificate Delivery Form</h2>
                        <p className="text-gray-600">
                            Please provide your details below. Note that certificates will be delivered to the home address provided.
                        </p>
                    </div>

                    {status === "error" && errorMessage && (
                        <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">
                            {errorMessage}
                        </p>
                    )}

                    <section className="space-y-5">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="name">
                                    Registered Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("name")}
                                    placeholder="As per registration"
                                />
                                {fieldHasError("name") && (
                                    <p className="text-xs text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="email">
                                    Registered Email ID <span className="text-red-500">*</span>
                                </label>
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
                                />
                                {fieldHasError("email") && (
                                    <p className="text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="phone">
                                    Registered Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("phone")}
                                    placeholder="10-digit number"
                                />
                                {fieldHasError("phone") && (
                                    <p className="text-xs text-red-500">{errors.phone}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="regNumber">
                                    Registration Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="regNumber"
                                    name="regNumber"
                                    required
                                    value={formData.regNumber}
                                    onChange={handleFormInput}
                                    onBlur={handleBlur}
                                    className={inputClasses("regNumber")}
                                    placeholder="e.g. REG-123456"
                                />
                                {fieldHasError("regNumber") && (
                                    <p className="text-xs text-red-500">{errors.regNumber}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700" htmlFor="address">
                                Full Delivery Address (Home Address) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                required
                                rows={3}
                                value={formData.address}
                                onChange={handleFormInput}
                                onBlur={handleBlur}
                                className={`${inputClasses("address")} min-h-[100px] resize-none`}
                                placeholder="Door No, Street, Locality, Landmark..."
                            />
                            {fieldHasError("address") && (
                                <p className="text-xs text-red-500">{errors.address}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700" htmlFor="pincode">
                                Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="pincode"
                                name="pincode"
                                required
                                value={formData.pincode}
                                onChange={handleFormInput}
                                onBlur={handleBlur}
                                className={inputClasses("pincode")}
                                placeholder="6-digit ZIP code"
                            />
                            {fieldHasError("pincode") && (
                                <p className="text-xs text-red-500">{errors.pincode}</p>
                            )}
                        </div>
                    </section>

                    {status === "success" && (
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-[var(--primary-green,#008080)] shadow-sm">
                            <p className="font-semibold">Success!</p>
                            <p>Your courier request has been submitted. We will process it shortly.</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full rounded-full bg-[var(--primary-green,#008080)] px-6 py-3.5 text-lg font-semibold text-white shadow-lg transition hover:bg-[var(--primary-green,#006b6b)] disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            {status === "submitting" ? "Submitting..." : "Request Certificate Delivery"}
                        </button>
                        <p className="text-center text-xs text-gray-500 italic">
                            Note: Courier will be delivered to the home address provided above.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
