"use client";

import Link from "next/link";

import Image from "next/image";

export default function Footer() {



  const footerLinks = {
    event: [
      { name: "About 74th IPC Pharma Expo", href: "/" },
      { name: "Floor Plan", href: "/floor-plan" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
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

            {/* Powered By Section */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-[var(--primary-orange)]">
                Partners
              </h4>
              <div className="space-y-4">
                {/* Powered By */}
                <div className="bg-white rounded-2xl p-5 border border-gray-300 hover:border-[var(--primary-orange)] transition-all duration-300 group shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-black mb-1 group-hover:text-[var(--primary-orange)] transition-colors">
                        Powered By
                      </h5>
                      <p className="text-xs font-semibold text-gray-700">
                        Operant Pharmacy Federation
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <Image
                        src="/opf_logo.png"
                        alt="Operant Pharmacy Federation"
                        width={45}
                        height={34}
                        className="rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                </div>

                {/* Managed By */}
                <div className="bg-white rounded-2xl p-5 border border-gray-300 hover:border-[var(--primary-green)] transition-all duration-300 group shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-black mb-1 group-hover:text-[var(--primary-green)] transition-colors">
                        Managed By
                      </h5>
                      <p className="text-xs font-semibold text-gray-700">
                        Operant Scientific Pvt. Ltd.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <Image
                        src="/operant_osl.png"
                        alt="Operant Scientific Private Limited"
                        width={45}
                        height={34}
                        className="rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
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

                <span className="text-gray-400">
                  Made with ❤️ by{" "}
                  <a
                    href="https://ravindrachoudhary.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary-orange)] hover:text-white font-bold transition-colors"
                  >
                    Ravindra Choudhary
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
