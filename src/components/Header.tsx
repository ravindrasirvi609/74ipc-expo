"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-[var(--primary-orange)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-orange-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                74
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--primary-green)]">
                  IPC 2025
                </h1>
                <p className="text-sm text-[var(--primary-orange)]">
                  Indian Pharmaceutical Congress
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[var(--primary-orange)] font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[var(--primary-orange)] font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/exhibitors"
              className="text-gray-700 hover:text-[var(--primary-orange)] font-medium transition-colors"
            >
              Exhibitors
            </Link>
            <Link
              href="/floor-plan"
              className="text-gray-700 hover:text-[var(--primary-orange)] font-medium transition-colors"
            >
              Floor Plan
            </Link>
            <Link
              href="/schedule"
              className="text-gray-700 hover:text-[var(--primary-orange)] font-medium transition-colors"
            >
              Schedule
            </Link>
            <Link
              href="/speakers"
              className="text-gray-700 hover:text-[var(--primary-orange)] font-medium transition-colors"
            >
              Speakers
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[var(--primary-orange)] font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/register"
              className="bg-[var(--primary-orange)] text-white px-6 py-2 rounded-full font-semibold hover:bg-[var(--accent-orange)] transition-colors hover-scale"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[var(--primary-orange)] focus:outline-none focus:text-[var(--primary-orange)]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mb-4">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-[var(--primary-orange)] font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-[var(--primary-orange)] font-medium"
              >
                About
              </Link>
              <Link
                href="/exhibitors"
                className="block px-3 py-2 text-gray-700 hover:text-[var(--primary-orange)] font-medium"
              >
                Exhibitors
              </Link>
              <Link
                href="/floor-plan"
                className="block px-3 py-2 text-gray-700 hover:text-[var(--primary-orange)] font-medium"
              >
                Floor Plan
              </Link>
              <Link
                href="/schedule"
                className="block px-3 py-2 text-gray-700 hover:text-[var(--primary-orange)] font-medium"
              >
                Schedule
              </Link>
              <Link
                href="/speakers"
                className="block px-3 py-2 text-gray-700 hover:text-[var(--primary-orange)] font-medium"
              >
                Speakers
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-[var(--primary-orange)] font-medium"
              >
                Contact
              </Link>
              <Link
                href="/register"
                className="block mx-3 mt-4 bg-[var(--primary-orange)] text-white px-4 py-2 rounded-full font-semibold text-center hover:bg-[var(--accent-orange)] transition-colors"
              >
                Register Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
