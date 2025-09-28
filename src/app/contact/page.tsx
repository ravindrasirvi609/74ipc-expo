"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          "Thank you for your inquiry! We will get back to you within 24 hours."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      title: "General Inquiries",
      email: "expo@74ipc.com",
      phone: "+91 94609 71652",
      description: "For general questions about the congress",
    },
    {
      title: "Exhibition & Sponsorship",
      email: "expo@74ipc.com",
      phone: "+91 81071 99052",
      description: "Information about booths and sponsorship opportunities",
    },
    {
      title: "Speaker Relations",
      email: "expo@74ipc.com",
      phone: "+91 94609 71652",
      description: "Speaker applications and coordination",
    },
  ];

  const officeLocations = [
    {
      name: "Congress Secretariat",
      address:
        "74th Indian Pharmaceutical Congress\nAssociation of Pharmaceutical Teachers of India\nBengaluru Chapter",
      city: "Bengaluru, Karnataka",
      phone: "+91 94609 71652",
      email: "expo@74ipc.com",
    },
    {
      name: "APTI Head Office",
      address:
        "Association of Pharmaceutical Teachers of India\nNational Headquarters",
      city: "Bengaluru, Karnataka",
      phone: "+91 81071 99052",
      email: "expo@74ipc.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl mb-8">
            Get in touch with our team for any questions or assistance
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <p className="text-lg font-semibold">
              We&apos;re here to help you make the most of 74th IPC Pharma Expo
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[var(--primary-green)] mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="exhibition">Exhibition & Sponsorship</option>
                  <option value="speaker">Speaker Application</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="program">Program Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="media">Media & Press</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide detailed information about your inquiry..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary-orange)] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[var(--accent-orange)] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-6">
                Quick Contact
              </h3>

              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-semibold text-[var(--primary-orange)] mb-2">
                      {contact.title}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
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
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-[var(--primary-orange)]"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center">
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
                        <a
                          href={`tel:${contact.phone}`}
                          className="hover:text-[var(--primary-orange)]"
                        >
                          {contact.phone}
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-6">
                Office Locations
              </h3>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-semibold text-[var(--primary-orange)] mb-3">
                      {office.name}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <svg
                          className="w-4 h-4 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
                        <div>
                          <div className="whitespace-pre-line">
                            {office.address}
                          </div>
                          <div className="font-medium">{office.city}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
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
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-[var(--primary-orange)]"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
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
                        <a
                          href={`mailto:${office.email}`}
                          className="hover:text-[var(--primary-orange)]"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-6">
                Follow Us
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Twitter</div>
                    <div className="text-gray-600">@IPC2025</div>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">LinkedIn</div>
                    <div className="text-gray-600">74th IPC Pharma Expo</div>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017-.017z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Instagram</div>
                    <div className="text-gray-600">@IPC2025</div>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Facebook</div>
                    <div className="text-gray-600">IPC2025</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Venue Information
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[var(--primary-orange)] mb-4">
                Bangalore International Exhibition Centre (BIEC)
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[var(--primary-green)] mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p>
                      10th Mile, Tumkur Road, Madavara Post
                      <br />
                      Bengaluru, Karnataka 562123, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[var(--primary-green)] mr-3"
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
                  <div>
                    <span className="font-semibold">Phone:</span> +91 94609
                    71652
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold text-[var(--primary-green)] mb-2">
                    Getting There:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 45 minutes from Kempegowda International Airport</li>
                    <li>• 30 minutes from Bengaluru City Railway Station</li>
                    <li>
                      • Direct metro connectivity (Purple Line - Dasarahalli)
                    </li>
                    <li>• Ample parking available (5000+ vehicles)</li>
                    <li>• Shuttle services from major hotels</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold text-[var(--primary-green)] mb-2">
                    Facilities:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 50,000+ sqm exhibition space</li>
                    <li>• Multiple conference halls and meeting rooms</li>
                    <li>• High-speed Wi-Fi throughout the venue</li>
                    <li>• Food courts and restaurants</li>
                    <li>• Business center and ATM facilities</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🏢</div>
              <h4 className="text-xl font-bold text-[var(--primary-green)] mb-4">
                World-Class Venue
              </h4>
              <p className="text-gray-600 mb-6">
                BIEC is South India&apos;s largest exhibition center, featuring
                state-of-the-art facilities and modern infrastructure perfect
                for hosting international conferences.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-[var(--primary-orange)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[var(--accent-orange)] transition-colors">
                  View Venue Map
                </button>
                <button className="w-full border-2 border-[var(--primary-green)] text-[var(--primary-green)] py-3 px-6 rounded-lg font-semibold hover:bg-[var(--primary-green)] hover:text-white transition-colors">
                  Accommodation Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
