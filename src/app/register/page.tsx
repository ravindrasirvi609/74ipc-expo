"use client";

import { useState } from "react";

export default function Register() {
  const [registrationType, setRegistrationType] = useState("delegate");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    category: "",
    specialRequirements: "",
    agreeToTerms: false,
  });

  const registrationCategories = {
    delegate: [
      {
        name: "Early Bird - Student",
        price: "₹2,500",
        description: "Valid student ID required",
        deadline: "Until Aug 13, 2025",
      },
      {
        name: "Early Bird - Industry Professional",
        price: "₹8,500",
        description: "Industry professionals",
        deadline: "Until Aug 13, 2025",
      },
      {
        name: "Early Bird - Academic",
        price: "₹5,500",
        description: "Academic professionals",
        deadline: "Until Aug 13, 2025",
      },
      {
        name: "Regular - Student",
        price: "₹3,500",
        description: "Valid student ID required",
        deadline: "After Aug 13, 2025",
      },
      {
        name: "Regular - Industry Professional",
        price: "₹12,000",
        description: "Industry professionals",
        deadline: "After Aug 13, 2025",
      },
      {
        name: "Regular - Academic",
        price: "₹8,000",
        description: "Academic professionals",
        deadline: "After Aug 13, 2025",
      },
    ],
    exhibitor: [
      {
        name: "Standard Booth (3x3m)",
        price: "₹85,000",
        description: "Basic booth setup included",
        deadline: "Until Oct 31, 2025",
      },
      {
        name: "Premium Booth (6x3m)",
        price: "₹1,50,000",
        description: "Enhanced booth setup",
        deadline: "Until Oct 31, 2025",
      },
      {
        name: "Platinum Booth (9x3m)",
        price: "₹2,25,000",
        description: "Premium location and setup",
        deadline: "Until Oct 31, 2025",
      },
    ],
    sponsor: [
      {
        name: "Silver Sponsorship",
        price: "₹6,00,000",
        description: "Standard booth + branding",
        deadline: "Until Sep 30, 2025",
      },
      {
        name: "Gold Sponsorship",
        price: "₹10,00,000",
        description: "Premium booth + enhanced branding",
        deadline: "Until Sep 30, 2025",
      },
      {
        name: "Platinum Sponsorship",
        price: "₹15,00,000",
        description: "Premium location + maximum exposure",
        deadline: "Until Sep 30, 2025",
      },
    ],
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { registrationType, ...formData });
    alert(
      "Registration submitted successfully! You will receive a confirmation email shortly."
    );
  };

  const currentCategories =
    registrationCategories[
      registrationType as keyof typeof registrationCategories
    ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Register for IPC 2025
          </h1>
          <p className="text-xl mb-8">
            Secure your place at India&apos;s premier pharmaceutical congress
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <p className="text-lg font-semibold">
              December 19-21, 2025 • BIEC, Bengaluru
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[var(--primary-green)] mb-6">
                Registration Form
              </h2>

              {/* Registration Type Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  I want to register as:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="registrationType"
                      value="delegate"
                      checked={registrationType === "delegate"}
                      onChange={(e) => setRegistrationType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-lg border-2 text-center transition-colors ${
                        registrationType === "delegate"
                          ? "border-[var(--primary-orange)] bg-[var(--primary-orange)]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">👩‍💼</div>
                      <div className="font-semibold">Delegate</div>
                      <div className="text-sm text-gray-600">
                        Attend sessions & networking
                      </div>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="registrationType"
                      value="exhibitor"
                      checked={registrationType === "exhibitor"}
                      onChange={(e) => setRegistrationType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-lg border-2 text-center transition-colors ${
                        registrationType === "exhibitor"
                          ? "border-[var(--primary-orange)] bg-[var(--primary-orange)]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">🏢</div>
                      <div className="font-semibold">Exhibitor</div>
                      <div className="text-sm text-gray-600">
                        Showcase your products
                      </div>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="registrationType"
                      value="sponsor"
                      checked={registrationType === "sponsor"}
                      onChange={(e) => setRegistrationType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-lg border-2 text-center transition-colors ${
                        registrationType === "sponsor"
                          ? "border-[var(--primary-orange)] bg-[var(--primary-orange)]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">⭐</div>
                      <div className="font-semibold">Sponsor</div>
                      <div className="text-sm text-gray-600">
                        Premium brand exposure
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Personal Information Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Organization *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="designation"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Designation *
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      required
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Registration Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {currentCategories.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name} - {category.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="specialRequirements"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    rows={4}
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="Please mention any dietary restrictions, accessibility needs, or other special requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[var(--primary-orange)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary-orange)] focus:ring-2"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-700">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-[var(--primary-orange)] hover:underline"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-[var(--primary-orange)] hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--primary-orange)] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[var(--accent-orange)] transition-colors"
                >
                  Complete Registration
                </button>
              </form>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-6">
                {registrationType.charAt(0).toUpperCase() +
                  registrationType.slice(1)}{" "}
                Pricing
              </h3>

              <div className="space-y-4">
                {currentCategories.map((category, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:border-[var(--primary-orange)] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {category.name}
                      </h4>
                      <span className="text-lg font-bold text-[var(--primary-orange)]">
                        {category.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {category.description}
                    </p>
                    <p className="text-xs text-[var(--primary-green)] font-medium">
                      {category.deadline}
                    </p>
                  </div>
                ))}
              </div>

              {/* Benefits Section */}
              <div className="mt-8 p-4 bg-gradient-to-br from-[var(--primary-orange)]/10 to-[var(--primary-green)]/10 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Registration Includes:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-[var(--primary-green)] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Access to all technical sessions
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-[var(--primary-green)] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Exhibition hall access
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-[var(--primary-green)] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Welcome kit & conference materials
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-[var(--primary-green)] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Coffee breaks & networking sessions
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-[var(--primary-green)] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Digital certificate
                  </li>
                </ul>
              </div>

              {/* Contact Support */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contact our registration support team
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    registration@74ipc.com
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +91 80 1234 5678
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
