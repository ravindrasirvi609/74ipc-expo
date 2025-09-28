"use client";

import { useState } from "react";
import Link from "next/link";

export default function FloorPlan() {
  const [selectedView, setSelectedView] = useState<"interactive" | "info">(
    "interactive"
  );

  const hallFeatures = [
    {
      icon: "🏢",
      title: "2 Exhibition Halls",
      description: "Over 50,000 sq. meters of exhibition space",
    },
    {
      icon: "🏪",
      title: "500+ Exhibitor Booths",
      description: "Premium booths ranging from 9-100 sq. meters",
    },
    {
      icon: "🎯",
      title: "Zone-wise Categories",
      description: "AI & Tech, Manufacturing, R&D, and Equipment zones",
    },
    {
      icon: "🚶‍♂️",
      title: "Easy Navigation",
      description: "Clear pathways and digital wayfinding systems",
    },
  ];

  const exhibitionZones = [
    {
      zone: "Zone A - Hall 1-3",
      title: "AI & Technology Pavilion",
      description:
        "Latest pharmaceutical AI solutions, digital health platforms, and automation technologies",
      booths: "A01-A120",
      color: "from-blue-500 to-purple-600",
    },
    {
      zone: "Zone B - Hall 4-6",
      title: "Manufacturing & Equipment",
      description:
        "Pharmaceutical machinery, manufacturing equipment, and quality control systems",
      booths: "B01-B150",
      color: "from-green-500 to-teal-600",
    },
    {
      zone: "Zone C - Hall 7-9",
      title: "Research & Development",
      description:
        "Drug discovery, clinical research, biotechnology, and innovation showcases",
      booths: "C01-C100",
      color: "from-orange-500 to-red-600",
    },
    {
      zone: "Zone D - Hall 10-12",
      title: "Services & Solutions",
      description:
        "Regulatory services, logistics, packaging, and pharmaceutical consultancy",
      booths: "D01-D80",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Interactive Floor Plan
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto animate-slide-up">
              Explore the comprehensive layout of the 74th Indian Pharmaceutical
              Congress at BIEC Bengaluru
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setSelectedView("interactive")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedView === "interactive"
                    ? "bg-white text-[var(--primary-green)] shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Interactive Map
              </button>
              <button
                onClick={() => setSelectedView("info")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedView === "info"
                    ? "bg-white text-[var(--primary-green)] shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Zone Information
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedView === "interactive" ? (
          <>
            {/* Interactive Floor Plan */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-green)] p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Live Interactive Floor Plan
                </h2>
                <p className="text-white/90">
                  Navigate through the exhibition halls and discover exhibitor
                  locations
                </p>
              </div>

              {/* Iframe Container */}
              <div className="relative w-full bg-gray-100">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://boostexpo.com/event/74th-ipc-pharma-expo-bengaluru/floor/preview"
                    className="w-full h-full border-0"
                    title="74th IPC Pharma Expo Floor Plan"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Floor Plan Controls */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <strong>Navigation Tips:</strong> Use mouse to zoom and pan
                    • Click on booths for details
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://boostexpo.com/event/74th-ipc-pharma-expo-bengaluru/floor/preview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[var(--primary-orange)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[var(--accent-orange)] transition-colors"
                    >
                      Open Full Screen
                    </a>
                    <Link
                      href="/exhibitors"
                      className="border-2 border-[var(--primary-green)] text-[var(--primary-green)] px-4 py-2 rounded-lg font-semibold hover:bg-[var(--primary-green)] hover:text-white transition-colors"
                    >
                      View Exhibitors
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Hall Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {hallFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-[var(--primary-green)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Zone Information View */}
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-4">
                  Exhibition Zones
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  The exhibition is organized into specialized zones, each
                  focusing on different aspects of the pharmaceutical industry
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {exhibitionZones.map((zone, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift"
                  >
                    <div
                      className={`bg-gradient-to-r ${zone.color} p-6 text-white`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                          {zone.zone}
                        </span>
                        <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                          {zone.booths}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{zone.title}</h3>
                      <p className="text-white/90">{zone.description}</p>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <strong>Location:</strong> {zone.zone}
                        </div>
                        <Link
                          href="/exhibitors"
                          className="text-[var(--primary-orange)] hover:text-[var(--accent-orange)] font-semibold text-sm"
                        >
                          View Exhibitors →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Venue Information */}
        <section className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Venue Information</h2>
            <p className="text-xl text-white/90">
              Bangalore International Exhibition Centre (BIEC)
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[var(--primary-orange)] rounded-full flex items-center justify-center text-white font-bold">
                      📍
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--primary-green)] mb-2">
                        Address
                      </h3>
                      <p className="text-gray-600">
                        10th Mile, Tumkur Road, Madavara Post
                        <br />
                        Bengaluru, Karnataka 562123, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[var(--primary-green)] rounded-full flex items-center justify-center text-white font-bold">
                      🚗
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--primary-green)] mb-2">
                        Getting There
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>
                          • 45 minutes from Kempegowda International Airport
                        </li>
                        <li>
                          • 30 minutes from Bengaluru City Railway Station
                        </li>
                        <li>• Direct metro connectivity (Purple Line)</li>
                        <li>• Ample parking available (5000+ vehicles)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4">
                  Exhibition Timings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold">December 19, 2025</span>
                    <span className="text-gray-600">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold">December 20, 2025</span>
                    <span className="text-gray-600">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">December 21, 2025</span>
                    <span className="text-gray-600">10:00 AM - 5:00 PM</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/contact"
                    className="block w-full bg-[var(--primary-orange)] text-white text-center py-3 rounded-lg font-semibold hover:bg-[var(--accent-orange)] transition-colors"
                  >
                    Contact for Booth Booking
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Need Help Navigating?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our floor plan is designed to help you make the most of your
              visit. If you need assistance finding specific exhibitors or
              navigating the venue, our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/exhibitors"
                className="bg-[var(--primary-orange)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--accent-orange)] transition-colors hover-scale"
              >
                Browse All Exhibitors
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[var(--primary-green)] text-[var(--primary-green)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--primary-green)] hover:text-white transition-colors hover-scale"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
