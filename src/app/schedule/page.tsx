interface SessionBase {
  time: string;
  title: string;
  type: string;
  location: string;
  description: string;
}

interface SessionWithSpeaker extends SessionBase {
  speaker?: string;
}

interface SessionWithSpeakers extends SessionBase {
  speakers?: string[];
}

interface SessionWithModerator extends SessionBase {
  moderator?: string;
  panelists?: string[];
}

interface SessionWithInstructor extends SessionBase {
  instructor?: string;
}

interface SessionWithChairperson extends SessionBase {
  chairperson?: string;
}

interface SessionWithJudges extends SessionBase {
  judges?: string[];
}

type Session = SessionBase &
  Partial<
    SessionWithSpeaker &
      SessionWithSpeakers &
      SessionWithModerator &
      SessionWithInstructor &
      SessionWithChairperson &
      SessionWithJudges
  >;

export default function Schedule() {
  const scheduleData: Record<string, Session[]> = {
    "Day 1 - December 19, 2025": [
      {
        time: "08:00 - 09:00",
        title: "Registration & Welcome Coffee",
        type: "registration",
        location: "Main Lobby",
        description: "Check-in, badge collection, and networking coffee",
      },
      {
        time: "09:00 - 09:30",
        title: "Opening Ceremony",
        type: "ceremony",
        location: "Main Auditorium",
        description:
          "Welcome address by Dr. Milind Janrao Umekar, President, 74th IPC",
        speaker: "Dr. Milind Janrao Umekar",
      },
      {
        time: "09:30 - 10:30",
        title: "Keynote: AI Revolution in Drug Discovery",
        type: "keynote",
        location: "Main Auditorium",
        description:
          "How artificial intelligence is transforming pharmaceutical research and development",
        speaker: "Dr. Sarah Johnson, AI Research Director, Global Pharma Labs",
      },
      {
        time: "10:30 - 11:00",
        title: "Coffee Break & Exhibition Visit",
        type: "break",
        location: "Exhibition Hall",
        description: "Networking opportunity with exhibitors",
      },
      {
        time: "11:00 - 12:30",
        title: "Technical Session 1A: Machine Learning in Clinical Trials",
        type: "technical",
        location: "Hall A",
        description:
          "Advanced ML applications for optimizing clinical trial design and patient recruitment",
        speakers: ["Dr. Amit Patel", "Prof. Lisa Chen", "Dr. Rajesh Kumar"],
      },
      {
        time: "11:00 - 12:30",
        title: "Technical Session 1B: Digital Biomarkers & Precision Medicine",
        type: "technical",
        location: "Hall B",
        description:
          "Leveraging digital biomarkers for personalized treatment approaches",
        speakers: [
          "Dr. Maria Rodriguez",
          "Prof. David Kim",
          "Dr. Priya Sharma",
        ],
      },
      {
        time: "12:30 - 13:30",
        title: "Lunch & Networking",
        type: "break",
        location: "Food Court",
        description: "Sponsored lunch with networking opportunities",
      },
      {
        time: "13:30 - 15:00",
        title: "Panel Discussion: Regulatory Challenges in AI-Driven Pharma",
        type: "panel",
        location: "Main Auditorium",
        description:
          "Industry experts discuss regulatory frameworks for AI in pharmaceuticals",
        moderator: "Dr. Jennifer Williams",
        panelists: [
          "Dr. Robert Smith",
          "Ms. Kavita Mehta",
          "Prof. Thomas Anderson",
        ],
      },
      {
        time: "15:00 - 15:30",
        title: "Tea Break & Exhibition Visit",
        type: "break",
        location: "Exhibition Hall",
        description: "Afternoon refreshments and exhibitor interactions",
      },
      {
        time: "15:30 - 17:00",
        title: "Workshop: Hands-on AI Tools for Drug Development",
        type: "workshop",
        location: "Workshop Room 1",
        description:
          "Interactive session on using AI platforms for pharmaceutical research",
        instructor: "Dr. Alex Chen, PharmaTech Solutions",
      },
      {
        time: "17:00 - 18:30",
        title: "Welcome Reception",
        type: "social",
        location: "Terrace Garden",
        description: "Cocktail reception with live music and networking",
      },
    ],
    "Day 2 - December 20, 2025": [
      {
        time: "09:00 - 10:00",
        title: "Keynote: The Future of Pharmaceutical Manufacturing",
        type: "keynote",
        location: "Main Auditorium",
        description:
          "Industry 4.0 technologies transforming pharmaceutical production",
        speaker: "Prof. Michael Brown, Manufacturing Innovation Institute",
      },
      {
        time: "10:00 - 10:30",
        title: "Coffee Break & Exhibition Visit",
        type: "break",
        location: "Exhibition Hall",
        description: "Morning coffee and exhibitor meetings",
      },
      {
        time: "10:30 - 12:00",
        title: "Technical Session 2A: Smart Manufacturing & Automation",
        type: "technical",
        location: "Hall A",
        description:
          "IoT, robotics, and automation in pharmaceutical manufacturing",
        speakers: ["Dr. Elena Vasquez", "Mr. James Wilson", "Dr. Anita Singh"],
      },
      {
        time: "10:30 - 12:00",
        title: "Technical Session 2B: Blockchain in Supply Chain",
        type: "technical",
        location: "Hall B",
        description:
          "Ensuring drug authenticity and supply chain transparency using blockchain",
        speakers: ["Dr. Mark Thompson", "Ms. Ritu Gupta", "Prof. Hans Mueller"],
      },
      {
        time: "12:00 - 13:00",
        title: "Young Scientist Forum",
        type: "forum",
        location: "Hall C",
        description:
          "Presentations by emerging researchers in pharmaceutical sciences",
        chairperson: "Dr. Neha Agarwal",
      },
      {
        time: "13:00 - 14:00",
        title: "Lunch & Industry Showcase",
        type: "break",
        location: "Food Court",
        description: "Lunch with special industry product demonstrations",
      },
      {
        time: "14:00 - 15:30",
        title: "Symposium: Personalized Medicine & Pharmacogenomics",
        type: "symposium",
        location: "Main Auditorium",
        description: "Latest advances in personalized treatment approaches",
        speakers: [
          "Dr. Patricia Lee",
          "Prof. Giuseppe Rossi",
          "Dr. Vikram Malhotra",
        ],
      },
      {
        time: "15:30 - 16:00",
        title: "Tea Break & Poster Session",
        type: "break",
        location: "Poster Area",
        description: "Refreshments and poster presentations by researchers",
      },
      {
        time: "16:00 - 17:30",
        title: "Industry Panel: Sustainable Pharmaceutical Practices",
        type: "panel",
        location: "Hall A",
        description:
          "Environmental sustainability and green chemistry in pharma",
        moderator: "Prof. Susan Davis",
        panelists: [
          "Dr. Carlos Mendez",
          "Ms. Fatima Al-Zahra",
          "Mr. John Peterson",
        ],
      },
      {
        time: "19:00 - 22:00",
        title: "Gala Dinner & Awards Ceremony",
        type: "social",
        location: "Grand Ballroom",
        description:
          "Awards ceremony recognizing excellence in pharmaceutical sciences",
      },
    ],
    "Day 3 - December 21, 2025": [
      {
        time: "09:00 - 10:00",
        title: "Keynote: Digital Health Revolution",
        type: "keynote",
        location: "Main Auditorium",
        description:
          "How digital technologies are reshaping healthcare delivery",
        speaker: "Dr. Rachel Green, Digital Health Innovator",
      },
      {
        time: "10:00 - 10:30",
        title: "Coffee Break & Final Exhibition Visit",
        type: "break",
        location: "Exhibition Hall",
        description: "Last opportunity to connect with exhibitors",
      },
      {
        time: "10:30 - 12:00",
        title: "Technical Session 3A: Telemedicine & Remote Patient Monitoring",
        type: "technical",
        location: "Hall A",
        description:
          "Technologies enabling remote healthcare delivery and monitoring",
        speakers: [
          "Dr. Ahmed Hassan",
          "Prof. Claire Foster",
          "Dr. Sanjay Reddy",
        ],
      },
      {
        time: "10:30 - 12:00",
        title: "Technical Session 3B: Nanotechnology in Drug Delivery",
        type: "technical",
        location: "Hall B",
        description:
          "Advanced nanotechnology applications for targeted drug delivery",
        speakers: [
          "Prof. Yuki Tanaka",
          "Dr. Isabella Martinez",
          "Prof. Ravi Krishnan",
        ],
      },
      {
        time: "12:00 - 13:00",
        title: "Startup Pitch Session",
        type: "pitch",
        location: "Innovation Hub",
        description:
          "Emerging pharmaceutical startups present their innovations",
        judges: [
          "Mr. Venture Capitalist",
          "Dr. Industry Expert",
          "Prof. Academic Leader",
        ],
      },
      {
        time: "13:00 - 14:00",
        title: "Lunch & Networking",
        type: "break",
        location: "Food Court",
        description: "Final networking lunch of the congress",
      },
      {
        time: "14:00 - 15:30",
        title: "Future Trends Panel: Pharma 2030",
        type: "panel",
        location: "Main Auditorium",
        description:
          "Visionary discussion on the future of pharmaceutical industry",
        moderator: "Dr. Visionary Leader",
        panelists: [
          "Prof. Future Tech",
          "Dr. Innovation Expert",
          "Ms. Trend Analyst",
        ],
      },
      {
        time: "15:30 - 16:00",
        title: "Closing Ceremony",
        type: "ceremony",
        location: "Main Auditorium",
        description: "Thank you address and announcement of IPC 2026",
        speaker: "Dr. Milind Janrao Umekar",
      },
      {
        time: "16:00 - 17:00",
        title: "Farewell Tea & Networking",
        type: "social",
        location: "Main Lobby",
        description: "Final networking opportunity and goodbyes",
      },
    ],
  };

  const getSessionTypeColor = (type: string) => {
    const colors = {
      keynote: "bg-[var(--primary-orange)]",
      technical: "bg-[var(--primary-green)]",
      panel: "bg-blue-500",
      workshop: "bg-purple-500",
      symposium: "bg-indigo-500",
      ceremony: "bg-yellow-500",
      break: "bg-gray-400",
      social: "bg-pink-500",
      registration: "bg-gray-500",
      forum: "bg-teal-500",
      pitch: "bg-red-500",
    };
    return colors[type as keyof typeof colors] || "bg-gray-400";
  };

  const getSessionTypeIcon = (type: string) => {
    const icons = {
      keynote: "🎤",
      technical: "🔬",
      panel: "💬",
      workshop: "🛠️",
      symposium: "📚",
      ceremony: "🎉",
      break: "☕",
      social: "🥂",
      registration: "📝",
      forum: "👥",
      pitch: "🚀",
    };
    return icons[type as keyof typeof icons] || "📅";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Conference Schedule
          </h1>
          <p className="text-xl mb-8">
            Three days packed with insights, innovation, and networking
            opportunities
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <p className="text-lg font-semibold">
              December 19-21, 2025 • BIEC, Bengaluru
            </p>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              At a Glance
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                50+
              </div>
              <div className="text-gray-600">Technical Sessions</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-[var(--primary-green)] mb-2">
                200+
              </div>
              <div className="text-gray-600">Expert Speakers</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                15+
              </div>
              <div className="text-gray-600">Workshops</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-[var(--primary-green)] mb-2">
                3
              </div>
              <div className="text-gray-600">Networking Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Schedule */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(scheduleData).map(([day, sessions]) => (
            <div key={day} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--primary-green)] mb-2">
                  {day}
                </h2>
                <div className="w-16 h-1 bg-[var(--primary-orange)] mx-auto"></div>
              </div>

              <div className="space-y-4">
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        {/* Time and Type */}
                        <div className="flex-shrink-0 lg:w-48">
                          <div className="text-lg font-bold text-gray-800 mb-2">
                            {session.time}
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getSessionTypeColor(
                                session.type
                              )}`}
                            >
                              <span className="mr-1">
                                {getSessionTypeIcon(session.type)}
                              </span>
                              {session.type.charAt(0).toUpperCase() +
                                session.type.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-[var(--primary-green)] mb-2">
                            {session.title}
                          </h3>

                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <svg
                              className="w-4 h-4 mr-1"
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
                            {session.location}
                          </div>

                          <p className="text-gray-700 mb-4">
                            {session.description}
                          </p>

                          {/* Speaker/Moderator/Instructor */}
                          {session.speaker && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-[var(--primary-orange)]">
                                Speaker: {session.speaker}
                              </span>
                            </div>
                          )}

                          {session.speakers && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-[var(--primary-orange)]">
                                Speakers: {session.speakers.join(", ")}
                              </span>
                            </div>
                          )}

                          {session.moderator && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-[var(--primary-orange)]">
                                Moderator: {session.moderator}
                              </span>
                            </div>
                          )}

                          {session.panelists && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-[var(--primary-orange)]">
                                Panelists: {session.panelists.join(", ")}
                              </span>
                            </div>
                          )}

                          {session.instructor && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-[var(--primary-orange)]">
                                Instructor: {session.instructor}
                              </span>
                            </div>
                          )}

                          {session.chairperson && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-[var(--primary-orange)]">
                                Chairperson: {session.chairperson}
                              </span>
                            </div>
                          )}

                          {session.judges && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-[var(--primary-orange)]">
                                Judges: {session.judges.join(", ")}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        {(session.type === "technical" ||
                          session.type === "workshop" ||
                          session.type === "symposium") && (
                          <div className="flex-shrink-0">
                            <button className="bg-[var(--primary-green)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--accent-green)] transition-colors">
                              Add to Calendar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Schedule */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-6">
            Take the Schedule with You
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Download the complete conference schedule and never miss a session
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--primary-orange)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--accent-orange)] transition-colors inline-flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF Schedule
            </button>
            <button className="border-2 border-[var(--primary-green)] text-[var(--primary-green)] px-8 py-3 rounded-full font-semibold hover:bg-[var(--primary-green)] hover:text-white transition-colors inline-flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m0 0H8m8 0v6a1 1 0 01-1 1h-1m0 0H9m10 0v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6z"
                />
              </svg>
              Add to Google Calendar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
