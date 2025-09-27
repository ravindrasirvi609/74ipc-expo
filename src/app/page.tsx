"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "12,000+", label: "Expected Attendees", icon: "👥" },
    { number: "500+", label: "Exhibitors", icon: "🏢" },
    { number: "3", label: "Days of Innovation", icon: "📅" },
    { number: "50+", label: "Countries", icon: "🌍" },
  ];

  const features = [
    {
      title: "AI-Powered Exhibition",
      description:
        "Explore cutting-edge AI solutions transforming pharmaceutical research and development",
      icon: "🤖",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Technology Showcase",
      description:
        "Discover the latest pharmaceutical technologies and innovations from global leaders",
      icon: "⚡",
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Networking Hub",
      description:
        "Connect with industry professionals, researchers, and decision-makers worldwide",
      icon: "🤝",
      gradient: "from-green-500 to-blue-500",
    },
    {
      title: "Interactive Floor Plan",
      description:
        "Navigate through our smart exhibition floor with real-time booth availability",
      icon: "🗺️",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-orange-green text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full floating"></div>
          <div
            className="absolute top-1/4 right-20 w-16 h-16 bg-white/20 rounded-full floating"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/15 rounded-full floating"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/4 w-24 h-24 bg-white/10 rounded-full floating"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Event Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/30">
              <div className="w-2 h-2 bg-white rounded-full mr-3 pulse-glow"></div>
              <span className="text-sm font-semibold tracking-wide">
                DECEMBER 19-21, 2025 • BENGALURU, INDIA
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow leading-tight">
              <span className="block animate-fade-in">74th Indian</span>
              <span
                className="block text-yellow-300 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Pharmaceutical
              </span>
              <span
                className="block animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                Congress
              </span>
            </h1>

            {/* Theme */}
            <div
              className="mb-8 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-xl md:text-2xl mb-4 font-semibold text-shadow">
                AI & TECHNOLOGY IN PHARMA:
              </p>
              <p className="text-2xl md:text-3xl font-bold text-yellow-300 text-shadow">
                EDUCATE • INNOVATE • EMPOWER
              </p>
            </div>

            {/* Description */}
            <p
              className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90 text-shadow-light animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              Join India&apos;s premier pharmaceutical event at Bangalore
              International Exhibition Centre. Connect with global innovators
              and explore the future of healthcare technology.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in"
              style={{ animationDelay: "1s" }}
            >
              <Link
                href="/register"
                className="group bg-white text-[var(--primary-green)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-xl flex items-center"
              >
                Register Now
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/exhibitors"
                className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--primary-green)] transition-all duration-300 hover:scale-105 flex items-center"
              >
                View Exhibitors
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover-lift bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--primary-orange)] mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-4 animate-fade-in">
              Why Attend IPC 2025?
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8 rounded-full animate-scale-in"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
              Experience the future of pharmaceutical innovation at India&apos;s
              most comprehensive healthcare technology event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group hover-lift bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-[var(--primary-orange)]/30 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4 group-hover:text-[var(--primary-orange)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-green)] rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-20 gradient-green-orange text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">
                Event Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Dates</h3>
                    <p className="opacity-90">December 19-21, 2025</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
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
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Venue</h3>
                    <p className="opacity-90">
                      Bangalore International Exhibition Centre (BIEC)
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Timing</h3>
                    <p className="opacity-90">9:00 AM - 6:00 PM (All days)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center animate-scale-in">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Ready to Join?</h3>
                <p className="mb-8 opacity-90">
                  Secure your spot at India&apos;s premier pharmaceutical
                  congress and be part of the AI revolution in pharma.
                </p>
                <div className="space-y-4">
                  <Link
                    href="/register"
                    className="block w-full bg-white text-[var(--primary-green)] py-4 px-6 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Register as Delegate
                  </Link>
                  <Link
                    href="/exhibitors"
                    className="block w-full border-2 border-white text-white py-4 px-6 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--primary-green)] transition-all duration-300 hover:scale-105"
                  >
                    Become an Exhibitor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Explore the Event
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/floor-plan"
              className="group bg-white rounded-2xl p-8 text-center hover-lift shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4 group-hover:text-[var(--primary-orange)] transition-colors">
                Interactive Floor Plan
              </h3>
              <p className="text-gray-600 mb-4">
                Explore our smart exhibition floor with real-time booth
                information and navigation
              </p>
              <div className="inline-flex items-center text-[var(--primary-orange)] font-semibold group-hover:translate-x-2 transition-transform">
                View Floor Plan
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/exhibitors"
              className="group bg-white rounded-2xl p-8 text-center hover-lift shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4 group-hover:text-[var(--primary-orange)] transition-colors">
                Exhibitor Directory
              </h3>
              <p className="text-gray-600 mb-4">
                Discover 500+ exhibitors showcasing the latest pharmaceutical
                innovations and technologies
              </p>
              <div className="inline-flex items-center text-[var(--primary-orange)] font-semibold group-hover:translate-x-2 transition-transform">
                Browse Exhibitors
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group bg-white rounded-2xl p-8 text-center hover-lift shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                📞
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4 group-hover:text-[var(--primary-orange)] transition-colors">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-4">
                Have questions? Our team is ready to help you make the most of
                IPC 2025
              </p>
              <div className="inline-flex items-center text-[var(--primary-orange)] font-semibold group-hover:translate-x-2 transition-transform">
                Contact Us
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
