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
      title: "Exhibition Halls",
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
                    className="w-full h-full border-0 iframe-no-scroll"
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
          <></>
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
