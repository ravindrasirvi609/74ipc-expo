export default function Exhibitors() {
  const exhibitorCategories = [
    "AI & Technology",
    "Research & Development",
    "Manufacturing",
    "Digital Health",
    "Biotechnology",
    "Pharmaceutical Equipment",
    "Laboratory Services",
    "Regulatory Affairs",
  ];

  const featuredExhibitors = [
    {
      id: 1,
      name: "PharmaTech Solutions",
      category: "AI & Technology",
      booth: "A01",
      logo: "/api/placeholder/120/80",
      description:
        "Leading provider of AI-powered drug discovery platforms and pharmaceutical automation solutions.",
      website: "https://pharmatech-solutions.com",
      products: ["AI Drug Discovery", "Process Automation", "Data Analytics"],
      contact: {
        email: "info@pharmatech-solutions.com",
        phone: "+91 98765 43210",
      },
    },
    {
      id: 2,
      name: "BioInnovate Labs",
      category: "Research & Development",
      booth: "A02",
      logo: "/api/placeholder/120/80",
      description:
        "Cutting-edge biotechnology research and development company specializing in personalized medicine.",
      website: "https://bioinnovate-labs.com",
      products: [
        "Biomarker Discovery",
        "Personalized Medicine",
        "Clinical Research",
      ],
      contact: {
        email: "contact@bioinnovate-labs.com",
        phone: "+91 98765 43211",
      },
    },
    {
      id: 3,
      name: "MediCorp International",
      category: "Manufacturing",
      booth: "A03",
      logo: "/api/placeholder/120/80",
      description:
        "Global pharmaceutical manufacturing company with state-of-the-art production facilities.",
      website: "https://medicorp-intl.com",
      products: [
        "Generic Pharmaceuticals",
        "API Manufacturing",
        "Quality Control",
      ],
      contact: {
        email: "sales@medicorp-intl.com",
        phone: "+91 98765 43212",
      },
    },
    {
      id: 4,
      name: "Digital Health Inc.",
      category: "Digital Health",
      booth: "A05",
      logo: "/api/placeholder/120/80",
      description:
        "Revolutionary digital health platform connecting patients, providers, and pharmaceutical companies.",
      website: "https://digitalhealth-inc.com",
      products: [
        "Telemedicine Platform",
        "Health Analytics",
        "Patient Engagement",
      ],
      contact: {
        email: "hello@digitalhealth-inc.com",
        phone: "+91 98765 43213",
      },
    },
    {
      id: 5,
      name: "NextGen Pharma",
      category: "AI & Technology",
      booth: "B01",
      logo: "/api/placeholder/120/80",
      description:
        "Next-generation pharmaceutical company leveraging AI for faster drug development cycles.",
      website: "https://nextgen-pharma.com",
      products: [
        "AI-Powered R&D",
        "Smart Manufacturing",
        "Predictive Analytics",
      ],
      contact: {
        email: "info@nextgen-pharma.com",
        phone: "+91 98765 43214",
      },
    },
    {
      id: 6,
      name: "BioTech Innovations",
      category: "Biotechnology",
      booth: "B02",
      logo: "/api/placeholder/120/80",
      description:
        "Pioneering biotechnology solutions for rare diseases and innovative therapeutic approaches.",
      website: "https://biotech-innovations.com",
      products: ["Gene Therapy", "Rare Disease Solutions", "Bioprocessing"],
      contact: {
        email: "contact@biotech-innovations.com",
        phone: "+91 98765 43215",
      },
    },
  ];

  const sponsorshipTiers = [
    {
      tier: "Platinum",
      price: "₹15,00,000",
      benefits: [
        "Premium booth location (9x3m)",
        "Opening ceremony recognition",
        "Logo on all marketing materials",
        "Dedicated session sponsorship",
        "VIP networking access",
        "Post-event attendee list",
      ],
      color: "bg-gradient-to-r from-gray-400 to-gray-600",
    },
    {
      tier: "Gold",
      price: "₹10,00,000",
      benefits: [
        "Prime booth location (6x3m)",
        "Welcome reception branding",
        "Logo on conference materials",
        "Workshop sponsorship opportunity",
        "Priority networking access",
        "Lead retrieval system",
      ],
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
    {
      tier: "Silver",
      price: "₹6,00,000",
      benefits: [
        "Standard booth location (3x3m)",
        "Logo on event website",
        "Inclusion in mobile app",
        "Coffee break sponsorship",
        "Networking reception access",
        "Digital exhibitor directory",
      ],
      color: "bg-gradient-to-r from-gray-300 to-gray-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Exhibitors
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover 150+ leading companies showcasing the future of
              pharmaceutical innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[var(--primary-green)] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Become an Exhibitor
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--primary-green)] transition-colors">
                Download Exhibitor Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Exhibitor Categories
            </h2>
            <p className="text-lg text-gray-600">
              Explore exhibitors by their areas of expertise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exhibitorCategories.map((category, index) => (
              <div
                key={category}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold ${
                    index % 2 === 0
                      ? "bg-[var(--primary-orange)]"
                      : "bg-[var(--primary-green)]"
                  }`}
                >
                  {category
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-[var(--primary-orange)] transition-colors">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Exhibitors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Featured Exhibitors
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Meet some of our prestigious exhibitors leading pharmaceutical
              innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExhibitors.map((exhibitor) => (
              <div
                key={exhibitor.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Company Logo Placeholder */}
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-400">
                    {exhibitor.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[var(--primary-green)]">
                      {exhibitor.name}
                    </h3>
                    <span className="bg-[var(--primary-orange)] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {exhibitor.booth}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--primary-orange)] font-medium mb-3">
                    {exhibitor.category}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {exhibitor.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Key Products:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exhibitor.products.map((product, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>{exhibitor.contact.email}</p>
                      <p>{exhibitor.contact.phone}</p>
                    </div>
                    <button className="bg-[var(--primary-green)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--accent-green)] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[var(--primary-orange)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--accent-orange)] transition-colors">
              View All Exhibitors
            </button>
          </div>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Sponsorship Packages
            </h2>
            <p className="text-lg text-gray-600">
              Choose the perfect sponsorship tier to maximize your brand
              exposure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <div
                key={tier.tier}
                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
                  index === 1
                    ? "transform scale-105 border-4 border-[var(--primary-orange)]"
                    : ""
                }`}
              >
                <div
                  className={`${tier.color} text-white py-6 px-6 text-center`}
                >
                  <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                  <p className="text-3xl font-bold">{tier.price}</p>
                  {index === 1 && (
                    <div className="bg-[var(--primary-orange)] text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                      Most Popular
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[var(--primary-green)] mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      index === 1
                        ? "bg-[var(--primary-orange)] text-white hover:bg-[var(--accent-orange)]"
                        : "bg-[var(--primary-green)] text-white hover:bg-[var(--accent-green)]"
                    }`}
                  >
                    Select {tier.tier}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Exhibit Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Why Exhibit at IPC 2025?
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zm-9 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                12,000+ Attendees
              </h3>
              <p className="text-gray-600">
                Connect with pharmaceutical professionals, researchers, and
                decision-makers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Quality Leads
              </h3>
              <p className="text-gray-600">
                Generate high-quality leads from verified industry professionals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Brand Exposure
              </h3>
              <p className="text-gray-600">
                Maximize your brand visibility across multiple marketing
                channels
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Market Insights
              </h3>
              <p className="text-gray-600">
                Gain valuable market intelligence and industry trends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 gradient-orange-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Showcase Your Innovation?
          </h2>
          <p className="text-xl mb-8">
            Join 150+ exhibitors at India&apos;s premier pharmaceutical congress
            and connect with 12,000+ industry professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-[var(--primary-green)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Book Your Booth Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--primary-green)] transition-colors">
              Contact Exhibition Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
