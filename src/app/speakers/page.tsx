export default function Speakers() {
  const keynoteSpeakers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "AI Research Director",
      organization: "Global Pharma Labs",
      image: "/api/placeholder/200/200",
      bio: "Dr. Sarah Johnson is a pioneering researcher in artificial intelligence applications for pharmaceutical research. With over 15 years of experience, she has led groundbreaking research in machine learning algorithms for drug discovery and development.",
      expertise: [
        "Artificial Intelligence",
        "Drug Discovery",
        "Machine Learning",
        "Computational Biology",
      ],
      achievements: [
        "Published 80+ peer-reviewed papers",
        "Holds 15+ patents in AI-driven drug discovery",
        "Keynote speaker at 50+ international conferences",
        "Winner of AI Innovation Award 2024",
      ],
      social: {
        linkedin: "https://linkedin.com/in/sarah-johnson",
        twitter: "https://twitter.com/drsarahjohnson",
      },
      session: "AI Revolution in Drug Discovery",
      day: "Day 1",
      time: "09:30 - 10:30",
    },
    {
      id: 2,
      name: "Prof. Michael Brown",
      title: "Director",
      organization: "Manufacturing Innovation Institute",
      image: "/api/placeholder/200/200",
      bio: "Professor Michael Brown is a globally recognized expert in pharmaceutical manufacturing and Industry 4.0 technologies. His research focuses on smart manufacturing, automation, and sustainable production practices.",
      expertise: [
        "Smart Manufacturing",
        "Industry 4.0",
        "Process Automation",
        "Sustainability",
      ],
      achievements: [
        "Leading expert in pharmaceutical manufacturing",
        "Consultant to 20+ major pharmaceutical companies",
        "Author of 3 bestselling books on smart manufacturing",
        "Manufacturing Excellence Award recipient",
      ],
      social: {
        linkedin: "https://linkedin.com/in/prof-michael-brown",
        twitter: "https://twitter.com/profmichaelbrown",
      },
      session: "The Future of Pharmaceutical Manufacturing",
      day: "Day 2",
      time: "09:00 - 10:00",
    },
    {
      id: 3,
      name: "Dr. Rachel Green",
      title: "Digital Health Innovator",
      organization: "HealthTech Innovations",
      image: "/api/placeholder/200/200",
      bio: "Dr. Rachel Green is at the forefront of digital health transformation, specializing in telemedicine, remote patient monitoring, and digital therapeutics. She has been instrumental in developing innovative healthcare delivery models.",
      expertise: [
        "Digital Health",
        "Telemedicine",
        "Remote Monitoring",
        "Digital Therapeutics",
      ],
      achievements: [
        "Founded 3 successful healthtech startups",
        "Digital Health Pioneer Award 2023",
        "Featured in Top 40 Under 40 Healthcare Leaders",
        "TEDx speaker on digital health transformation",
      ],
      social: {
        linkedin: "https://linkedin.com/in/dr-rachel-green",
        twitter: "https://twitter.com/drrachelgreen",
      },
      session: "Digital Health Revolution",
      day: "Day 3",
      time: "09:00 - 10:00",
    },
  ];

  const featuredSpeakers = [
    {
      id: 4,
      name: "Dr. Amit Patel",
      title: "Head of Clinical Research",
      organization: "BioPharma Solutions",
      image: "/api/placeholder/150/150",
      expertise: ["Clinical Trials", "Regulatory Affairs", "Biostatistics"],
      session: "Machine Learning in Clinical Trials",
    },
    {
      id: 5,
      name: "Prof. Lisa Chen",
      title: "Professor of Pharmaceutical Sciences",
      organization: "University of California",
      image: "/api/placeholder/150/150",
      expertise: [
        "Pharmaceutical Sciences",
        "Drug Development",
        "Research Methodology",
      ],
      session: "Machine Learning in Clinical Trials",
    },
    {
      id: 6,
      name: "Dr. Maria Rodriguez",
      title: "Chief Medical Officer",
      organization: "Precision Medicine Corp",
      image: "/api/placeholder/150/150",
      expertise: ["Precision Medicine", "Biomarkers", "Personalized Therapy"],
      session: "Digital Biomarkers & Precision Medicine",
    },
    {
      id: 7,
      name: "Prof. David Kim",
      title: "Director of Biomarker Research",
      organization: "Advanced Diagnostics Institute",
      image: "/api/placeholder/150/150",
      expertise: [
        "Biomarker Discovery",
        "Diagnostic Innovation",
        "Molecular Biology",
      ],
      session: "Digital Biomarkers & Precision Medicine",
    },
    {
      id: 8,
      name: "Dr. Elena Vasquez",
      title: "VP of Manufacturing",
      organization: "Global Pharma Manufacturing",
      image: "/api/placeholder/150/150",
      expertise: [
        "Manufacturing Excellence",
        "Process Optimization",
        "Quality Systems",
      ],
      session: "Smart Manufacturing & Automation",
    },
    {
      id: 9,
      name: "Dr. Patricia Lee",
      title: "Director of Pharmacogenomics",
      organization: "Genomic Medicine Institute",
      image: "/api/placeholder/150/150",
      expertise: [
        "Pharmacogenomics",
        "Genetic Testing",
        "Personalized Medicine",
      ],
      session: "Personalized Medicine & Pharmacogenomics",
    },
  ];

  const internationalSpeakers = [
    {
      name: "Prof. Giuseppe Rossi",
      country: "Italy",
      organization: "European Medicines Agency",
      expertise: "Regulatory Affairs",
    },
    {
      name: "Dr. Hans Mueller",
      country: "Germany",
      organization: "Berlin Institute of Technology",
      expertise: "Blockchain Technology",
    },
    {
      name: "Prof. Yuki Tanaka",
      country: "Japan",
      organization: "Tokyo Institute of Nanotechnology",
      expertise: "Nanotechnology",
    },
    {
      name: "Dr. Ahmed Hassan",
      country: "UAE",
      organization: "Dubai Health Authority",
      expertise: "Digital Health",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Distinguished Speakers
          </h1>
          <p className="text-xl mb-8">
            Learn from 200+ world-renowned experts and thought leaders in
            pharmaceutical sciences
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <p className="text-lg font-semibold">
              Keynotes • Technical Sessions • Panel Discussions
            </p>
          </div>
        </div>
      </section>

      {/* Speaker Statistics */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                200+
              </div>
              <div className="text-gray-600">Expert Speakers</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[var(--primary-green)] mb-2">
                25+
              </div>
              <div className="text-gray-600">Countries Represented</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                50+
              </div>
              <div className="text-gray-600">Industry Leaders</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[var(--primary-green)] mb-2">
                100+
              </div>
              <div className="text-gray-600">Academic Experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Keynote Speakers
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Opening each day with visionary insights from industry pioneers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {keynoteSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Speaker Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[var(--primary-orange)] to-[var(--primary-green)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {speaker.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                    {speaker.name}
                  </h3>
                  <p className="text-[var(--primary-orange)] font-semibold mb-1">
                    {speaker.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {speaker.organization}
                  </p>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {speaker.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {speaker.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Session:</strong> {speaker.session}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[var(--primary-green)] font-semibold">
                        {speaker.day}
                      </span>
                      <span className="text-gray-600">{speaker.time}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-[var(--primary-green)] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[var(--accent-green)] transition-colors">
                      View Full Bio
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Featured Speakers
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Technical session leaders and industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                {/* Speaker Image Placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary-orange)] to-[var(--primary-green)] rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold text-[var(--primary-green)] mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-[var(--primary-orange)] font-semibold text-sm mb-1">
                    {speaker.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {speaker.organization}
                  </p>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {speaker.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-600">
                    <strong>Session:</strong> {speaker.session}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[var(--primary-orange)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--accent-orange)] transition-colors">
              View All Speakers
            </button>
          </div>
        </div>
      </section>

      {/* International Representation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Global Perspectives
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              International experts bringing diverse insights from around the
              world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalSpeakers.map((speaker, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-green)] to-[var(--primary-orange)] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-bold text-[var(--primary-green)] mb-2">
                  {speaker.name}
                </h3>
                <div className="text-sm text-[var(--primary-orange)] font-semibold mb-1">
                  {speaker.country} 🌍
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {speaker.organization}
                </p>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                  {speaker.expertise}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Speaker Categories
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-[var(--primary-orange)]/10 to-[var(--primary-green)]/10 rounded-xl">
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Industry Leaders
              </h3>
              <p className="text-gray-600 mb-4">
                CEOs, CTOs, and senior executives from leading pharmaceutical
                companies
              </p>
              <div className="text-2xl font-bold text-[var(--primary-orange)]">
                50+
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-[var(--primary-green)]/10 to-[var(--primary-orange)]/10 rounded-xl">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Academic Experts
              </h3>
              <p className="text-gray-600 mb-4">
                Professors and researchers from top universities and research
                institutions
              </p>
              <div className="text-2xl font-bold text-[var(--primary-orange)]">
                100+
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-[var(--primary-orange)]/10 to-[var(--primary-green)]/10 rounded-xl">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                Innovation Pioneers
              </h3>
              <p className="text-gray-600 mb-4">
                Startup founders, tech innovators, and disruptive technology
                leaders
              </p>
              <div className="text-2xl font-bold text-[var(--primary-orange)]">
                50+
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 gradient-orange-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Connect with Industry Leaders
          </h2>
          <p className="text-xl mb-8">
            Network with 200+ distinguished speakers and gain insights from the
            brightest minds in pharmaceutical sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-[var(--primary-green)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Register to Attend
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--primary-green)] transition-colors">
              Apply to Speak
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
