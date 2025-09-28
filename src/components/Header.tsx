"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/floor-plan", label: "Floor Plan" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`bg-white/95 backdrop-blur-md shadow-lg border-b-4 border-[var(--primary-orange)] sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 gradient-orange-green rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-200">
                74
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--primary-green)] group-hover:text-[var(--primary-orange)] transition-colors">
                  IPC 2025
                </h1>
                <p className="text-sm text-[var(--primary-orange)] font-medium">
                  Indian Pharmaceutical Congress
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-medium transition-all duration-200 hover:scale-105 ${
                  isActive(item.href)
                    ? "text-[var(--primary-orange)]"
                    : "text-gray-700 hover:text-[var(--primary-orange)]"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--primary-orange)] rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4"></div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative w-8 h-8 text-gray-700 hover:text-[var(--primary-orange)] focus:outline-none focus:text-[var(--primary-orange)] transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className={`w-6 h-6 transition-opacity duration-200 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`w-6 h-6 absolute transition-opacity duration-200 ${
                    isMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 hover:pl-5 ${
                  isActive(item.href)
                    ? "text-[var(--primary-orange)] bg-orange-50 border-l-4 border-[var(--primary-orange)]"
                    : "text-gray-700 hover:text-[var(--primary-orange)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
