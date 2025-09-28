"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    event: [
      { name: "About 74th IPC Pharma Expo", href: "/" },
      { name: "Floor Plan", href: "/floor-plan" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-green)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with 74th IPC Pharma Expo
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get the latest updates on sessions, speakers, and exclusive
              announcements
            </p>
            <form
              onSubmit={handleSubscribe}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-white text-[var(--primary-green)] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Event Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src="/IPC Edication.png"
                    alt="74th Indian Pharmaceutical Congress Logo"
                    width={48}
                    height={48}
                    className="rounded-xl shadow-lg object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    74th IPC Pharma Expo
                  </h3>
                  <p className="text-[var(--primary-orange)] font-medium">
                    Indian Pharmaceutical Congress
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The 74th Indian Pharmaceutical Congress is India&apos;s premier
                pharmaceutical event, bringing together innovators, researchers,
                and industry leaders to explore the future of healthcare
                technology.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3 text-[var(--primary-orange)]"
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
                  <span>December 19-21, 2025</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3 text-[var(--primary-orange)]"
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
                  <span>BIEC, Bengaluru, India</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3 text-[var(--primary-orange)]"
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
                  <span>expo@74ipc.com</span>
                </div>
              </div>
            </div>

            {/* Event Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-[var(--primary-orange)]">
                Event
              </h4>
              <ul className="space-y-3">
                {footerLinks.event.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media & Partners */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Partners */}
              <div className="text-center lg:text-right">
                <p className="text-gray-400 mb-2 font-medium">Organized by:</p>
                <p className="text-white font-semibold">
                  Indian Pharmaceutical Congress Association
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 74th Indian Pharmaceutical Congress. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a
                  href="https://expo.74ipc.com"
                  className="text-[var(--primary-orange)] hover:text-white transition-colors"
                >
                  expo.74ipc.com
                </a>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">
                  Made with ❤️ for pharmaceutical innovation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
