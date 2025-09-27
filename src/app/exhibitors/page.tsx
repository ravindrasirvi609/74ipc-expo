"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const exhibitorCategories = [
  "All",
  "AI & Technology",
  "Research & Development",
  "Manufacturing",
  "Digital Health",
  "Biotechnology",
  "Equipment & Machinery",
  "Laboratory Services",
  "Regulatory Affairs",
];

const featuredExhibitors = [
  {
    id: 1,
    name: "PharmaTech AI Solutions",
    category: "AI & Technology",
    booth: "A01",
    description:
      "Leading provider of AI-powered drug discovery platforms and pharmaceutical automation solutions.",
    website: "https://pharmatech-ai.com",
    products: ["AI Drug Discovery", "Process Automation", "Data Analytics"],
    tier: "Platinum",
    logo: "🤖",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    name: "BioInnovate Labs",
    category: "Research & Development",
    booth: "A02",
    description:
      "Cutting-edge biotechnology research and development company specializing in personalized medicine.",
    website: "https://bioinnovate-labs.com",
    products: [
      "Biomarker Discovery",
      "Personalized Medicine",
      "Clinical Research",
    ],
    tier: "Gold",
    logo: "🧬",
    color: "from-green-500 to-blue-500",
  },
  {
    id: 3,
    name: "MediCorp International",
    category: "Manufacturing",
    booth: "B01",
    description:
      "Global pharmaceutical manufacturing leader with state-of-the-art production facilities.",
    website: "https://medicorp-intl.com",
    products: ["Generic Manufacturing", "Quality Control", "Supply Chain"],
    tier: "Platinum",
    logo: "🏭",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    name: "DigitalHealth Pro",
    category: "Digital Health",
    booth: "C01",
    description:
      "Revolutionary digital health solutions for improved patient outcomes and healthcare efficiency.",
    website: "https://digitalhealth-pro.com",
    products: ["Telemedicine", "Health Apps", "IoT Devices"],
    tier: "Gold",
    logo: "📱",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 5,
    name: "BioTech Innovations",
    category: "Biotechnology",
    booth: "D01",
    description:
      "Pioneer in biotechnology solutions for next-generation therapeutic development.",
    website: "https://biotech-innovations.com",
    products: ["Gene Therapy", "Stem Cell Research", "Immunotherapy"],
    tier: "Silver",
    logo: "🔬",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: 6,
    name: "PharmaEquip Solutions",
    category: "Equipment & Machinery",
    booth: "E01",
    description:
      "Advanced pharmaceutical equipment and machinery for modern production facilities.",
    website: "https://pharmaequip.com",
    products: ["Production Lines", "Quality Systems", "Automation"],
    tier: "Gold",
    logo: "⚙️",
    color: "from-gray-500 to-slate-600",
  },
];

const sponsorshipTiers = [
  {
    name: "Platinum Sponsors",
    tier: "Platinum",
    color: "from-purple-600 to-blue-600",
    benefits: [
      "Prime booth location",
      "Speaking opportunities",
      "Premium branding",
      "VIP networking",
    ],
    price: "₹25,00,000",
  },
  {
    name: "Gold Sponsors",
    tier: "Gold",
    color: "from-yellow-500 to-orange-600",
    benefits: [
      "Preferred booth location",
      "Workshop sessions",
      "Enhanced branding",
      "Executive networking",
    ],
    price: "₹15,00,000",
  },
  {
    name: "Silver Sponsors",
    tier: "Silver",
    color: "from-gray-400 to-gray-600",
    benefits: [
      "Standard booth space",
      "Poster presentations",
      "Basic branding",
      "General networking",
    ],
    price: "₹8,00,000",
  },
];

export default function Exhibitors() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExhibitors = useMemo(() => {
    return featuredExhibitors.filter((exhibitor) => {
      const matchesCategory =
        selectedCategory === "All" || exhibitor.category === selectedCategory;
      const matchesSearch =
        exhibitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exhibitor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exhibitor.products.some((product) =>
          product.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-gradient-to-r from-purple-600 to-blue-600";
      case "Gold":
        return "bg-gradient-to-r from-yellow-500 to-orange-600";
      case "Silver":
        return "bg-gradient-to-r from-gray-400 to-gray-600";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow">
              Exhibitors & Sponsors
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover 500+ innovative companies showcasing the future of
              pharmaceutical technology
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover-lift">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">Global Exhibitors</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover-lift">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-90">Countries</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover-lift">
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-sm opacity-90">Exhibition Halls</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search exhibitors..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1 max-w-2xl">
              <div className="flex flex-wrap gap-2">
                {exhibitorCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-[var(--primary-orange)] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exhibitors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Featured Exhibitors
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              Showing {filteredExhibitors.length} exhibitor
              {filteredExhibitors.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExhibitors.map((exhibitor) => (
              <div
                key={exhibitor.id}
                className="bg-white rounded-2xl shadow-lg hover-lift p-6 border border-gray-100 hover:border-[var(--primary-orange)]/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${exhibitor.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                  >
                    {exhibitor.logo}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTierBadgeColor(
                      exhibitor.tier
                    )}`}
                  >
                    {exhibitor.tier}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2 group-hover:text-[var(--primary-orange)] transition-colors">
                  {exhibitor.name}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs mr-2">
                    {exhibitor.category}
                  </span>
                  <span className="bg-[var(--primary-orange)] text-white px-2 py-1 rounded-full text-xs">
                    Booth {exhibitor.booth}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {exhibitor.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[var(--primary-green)] mb-2">
                    Key Products:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {exhibitor.products.map((product, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 text-gray-700 px-2 py-1 rounded-md text-xs"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[var(--primary-orange)] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[var(--accent-orange)] transition-colors">
                    Visit Booth
                  </button>
                  <button className="flex-1 border border-[var(--primary-green)] text-[var(--primary-green)] py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[var(--primary-green)] hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredExhibitors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No exhibitors found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Sponsorship Opportunities
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partner with IPC 2025 and showcase your brand to 12,000+
              pharmaceutical professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover-lift p-8 border border-gray-100 hover:border-[var(--primary-orange)]/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${tier.color}`}
                ></div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[var(--primary-green)] mb-2 group-hover:text-[var(--primary-orange)] transition-colors">
                    {tier.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {tier.price}
                  </div>
                  <div className="text-gray-600 text-sm">per package</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-[var(--primary-orange)] mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-[var(--primary-orange)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[var(--accent-orange)] transition-all duration-300 hover:scale-105 shadow-lg">
                  Choose {tier.tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-orange-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">
            Ready to Exhibit at IPC 2025?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ exhibitors and connect with India&apos;s pharmaceutical
            industry leaders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-[var(--primary-green)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book Your Booth
            </Link>
            <Link
              href="/floor-plan"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--primary-green)] transition-all duration-300 hover:scale-105"
            >
              View Floor Plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
