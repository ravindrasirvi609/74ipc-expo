import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-orange-green text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <span className="text-sm font-semibold">
                December 19-21, 2025 • Bengaluru
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow">
              74th Indian
              <br />
              <span className="text-[var(--light-orange)]">Pharmaceutical</span>
              <br />
              Congress
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow">
              AI & TECHNOLOGY IN PHARMA:
              <br />
              <span className="font-bold">EDUCATE, INNOVATE, EMPOWER</span>
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
              Join 12,000+ pharmaceutical professionals at India&apos;s premier
              pharmaceutical congress at Bangalore International Exhibition
              Centre
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-[var(--primary-green)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover-scale inline-flex items-center justify-center"
              >
                Register Now
                <svg
                  className="w-5 h-5 ml-2"
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
                href="/floor-plan"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--primary-green)] transition-all hover-scale inline-flex items-center justify-center"
              >
                View Floor Plan
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/30 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/30 rounded-full"></div>
        <div className="absolute top-1/2 left-5 w-16 h-16 border-2 border-white/20 rounded-full"></div>
      </section>

      {/* Key Information Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover-scale">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Venue
              </h3>
              <p className="text-gray-600">
                Bangalore International Exhibition Centre (BIEC)
              </p>
              <p className="text-sm text-gray-500 mt-2">
                World-class facilities in the heart of Bengaluru
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover-scale">
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
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-2 9a2 2 0 11-4 0 2 2 0 014 0zm-4-4h4m-4 0a1 1 0 000 2h4a1 1 0 100-2m-4 0V9a1 1 0 011-1h2a1 1 0 011 1v4m-4 0H4a1 1 0 000 2h12a1 1 0 100-2H8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Attendees
              </h3>
              <p className="text-gray-600">12,000+ Expected Participants</p>
              <p className="text-sm text-gray-500 mt-2">
                Industry leaders, researchers, and innovators
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover-scale">
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
                Innovation Focus
              </h3>
              <p className="text-gray-600">AI & Technology in Pharma</p>
              <p className="text-sm text-gray-500 mt-2">
                Cutting-edge solutions for tomorrow&apos;s healthcare
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--primary-green)] mb-4">
              Congress Theme
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--primary-orange)] mb-6">
                AI & TECHNOLOGY IN PHARMA:
              </h3>
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-8">
                EDUCATE, INNOVATE, EMPOWER
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Exploring the intersection of pharmaceutical research,
                technology, and healthcare for a healthier tomorrow. Join us as
                we delve into the transformative power of artificial
                intelligence and emerging technologies in pharmaceutical
                sciences.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[var(--primary-orange)] rounded-full mr-4"></div>
                  <span className="text-gray-700">
                    Advanced AI applications in drug discovery
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[var(--primary-green)] rounded-full mr-4"></div>
                  <span className="text-gray-700">
                    Digital transformation in pharmaceutical manufacturing
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[var(--primary-orange)] rounded-full mr-4"></div>
                  <span className="text-gray-700">
                    Innovative healthcare delivery systems
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[var(--primary-orange)]/10 to-[var(--primary-green)]/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                      200+
                    </div>
                    <div className="text-sm text-gray-600">Expert Speakers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--primary-green)] mb-2">
                      150+
                    </div>
                    <div className="text-sm text-gray-600">Exhibitors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                      50+
                    </div>
                    <div className="text-sm text-gray-600">
                      Technical Sessions
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--primary-green)] mb-2">
                      3
                    </div>
                    <div className="text-sm text-gray-600">Full Days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Important Dates
            </h2>
            <p className="text-xl text-white/90">
              Mark your calendar for these key milestones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="text-2xl font-bold mb-2">30 SEP</div>
              <div className="text-lg font-semibold mb-1">2025</div>
              <div className="text-sm opacity-90">Abstract Submissions</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="text-2xl font-bold mb-2">30 SEP</div>
              <div className="text-lg font-semibold mb-1">2025</div>
              <div className="text-sm opacity-90">Acceptance Communication</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="text-2xl font-bold mb-2">13 AUG</div>
              <div className="text-lg font-semibold mb-1">2025</div>
              <div className="text-sm opacity-90">Regular Registration</div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center text-white border-2 border-white/30">
              <div className="text-2xl font-bold mb-2">19-21 DEC</div>
              <div className="text-lg font-semibold mb-1">2025</div>
              <div className="text-sm opacity-90">Main Conference</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[var(--primary-green)] mb-6">
            Ready to Join the Future of Pharma?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Don&apos;t miss this opportunity to be part of India&apos;s most
            prestigious pharmaceutical congress. Register now and secure your
            place at the forefront of pharmaceutical innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/register"
              className="bg-[var(--primary-orange)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--accent-orange)] transition-all hover-scale inline-flex items-center justify-center"
            >
              Register as Delegate
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <Link
              href="/exhibitors"
              className="bg-[var(--primary-green)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--accent-green)] transition-all hover-scale inline-flex items-center justify-center"
            >
              Become an Exhibitor
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
