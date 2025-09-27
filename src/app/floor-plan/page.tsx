"use client";

import { useState } from "react";

interface ExhibitorBooth {
  id: string;
  number: string;
  company: string;
  category: string;
  size: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isBooked: boolean;
}

export default function FloorPlan() {
  const [selectedBooth, setSelectedBooth] = useState<ExhibitorBooth | null>(
    null
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Sample booth data - this would come from a database in a real application
  const booths: ExhibitorBooth[] = [
    {
      id: "1",
      number: "A01",
      company: "PharmaTech Solutions",
      category: "AI & Technology",
      size: "3x3m",
      x: 50,
      y: 100,
      width: 80,
      height: 60,
      isBooked: true,
    },
    {
      id: "2",
      number: "A02",
      company: "BioInnovate Labs",
      category: "Research & Development",
      size: "3x3m",
      x: 150,
      y: 100,
      width: 80,
      height: 60,
      isBooked: true,
    },
    {
      id: "3",
      number: "A03",
      company: "MediCorp International",
      category: "Manufacturing",
      size: "6x3m",
      x: 250,
      y: 100,
      width: 120,
      height: 60,
      isBooked: true,
    },
    {
      id: "4",
      number: "A04",
      company: "",
      category: "AI & Technology",
      size: "3x3m",
      x: 390,
      y: 100,
      width: 80,
      height: 60,
      isBooked: false,
    },
    {
      id: "5",
      number: "A05",
      company: "Digital Health Inc.",
      category: "Digital Health",
      size: "3x3m",
      x: 490,
      y: 100,
      width: 80,
      height: 60,
      isBooked: true,
    },

    {
      id: "6",
      number: "B01",
      company: "NextGen Pharma",
      category: "AI & Technology",
      size: "3x3m",
      x: 50,
      y: 200,
      width: 80,
      height: 60,
      isBooked: true,
    },
    {
      id: "7",
      number: "B02",
      company: "BioTech Innovations",
      category: "Biotechnology",
      size: "3x3m",
      x: 150,
      y: 200,
      width: 80,
      height: 60,
      isBooked: true,
    },
    {
      id: "8",
      number: "B03",
      company: "",
      category: "Manufacturing",
      size: "3x3m",
      x: 250,
      y: 200,
      width: 80,
      height: 60,
      isBooked: false,
    },
    {
      id: "9",
      number: "B04",
      company: "HealthTech Systems",
      category: "Digital Health",
      size: "6x3m",
      x: 350,
      y: 200,
      width: 120,
      height: 60,
      isBooked: true,
    },
    {
      id: "10",
      number: "B05",
      company: "",
      category: "Research & Development",
      size: "3x3m",
      x: 490,
      y: 200,
      width: 80,
      height: 60,
      isBooked: false,
    },

    {
      id: "11",
      number: "C01",
      company: "AI Pharma Solutions",
      category: "AI & Technology",
      size: "9x3m",
      x: 50,
      y: 300,
      width: 180,
      height: 60,
      isBooked: true,
    },
    {
      id: "12",
      number: "C02",
      company: "Global Medicines",
      category: "Manufacturing",
      size: "3x3m",
      x: 250,
      y: 300,
      width: 80,
      height: 60,
      isBooked: true,
    },
    {
      id: "13",
      number: "C03",
      company: "",
      category: "Biotechnology",
      size: "3x3m",
      x: 350,
      y: 300,
      width: 80,
      height: 60,
      isBooked: false,
    },
    {
      id: "14",
      number: "C04",
      company: "Smart Health Analytics",
      category: "Digital Health",
      size: "6x3m",
      x: 450,
      y: 300,
      width: 120,
      height: 60,
      isBooked: true,
    },
  ];

  const categories = [
    "all",
    "AI & Technology",
    "Research & Development",
    "Manufacturing",
    "Digital Health",
    "Biotechnology",
  ];

  const filteredBooths =
    filterCategory === "all"
      ? booths
      : booths.filter((booth) => booth.category === filterCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI & Technology": "var(--primary-orange)",
      "Research & Development": "var(--primary-green)",
      Manufacturing: "#3b82f6",
      "Digital Health": "#8b5cf6",
      Biotechnology: "#f59e0b",
    };
    return colors[category as keyof typeof colors] || "#6b7280";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--primary-green)] mb-4">
            Interactive Floor Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore the exhibition layout and discover participating exhibitors
          </p>
          <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto"></div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-[var(--primary-green)] mb-4">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  filterCategory === category
                    ? "bg-[var(--primary-orange)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Floor Plan Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--primary-green)] mb-6">
                Exhibition Hall Layout
              </h3>

              {/* SVG Floor Plan */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <svg
                  viewBox="0 0 600 450"
                  className="w-full h-auto"
                  style={{ minHeight: "400px" }}
                >
                  {/* Background grid */}
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Main entrance */}
                  <rect
                    x="250"
                    y="10"
                    width="100"
                    height="20"
                    fill="var(--primary-green)"
                  />
                  <text
                    x="300"
                    y="25"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    MAIN ENTRANCE
                  </text>

                  {/* Hall sections */}
                  <text
                    x="50"
                    y="80"
                    fill="var(--primary-orange)"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    HALL A
                  </text>
                  <text
                    x="50"
                    y="180"
                    fill="var(--primary-orange)"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    HALL B
                  </text>
                  <text
                    x="50"
                    y="280"
                    fill="var(--primary-orange)"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    HALL C
                  </text>

                  {/* Booths */}
                  {filteredBooths.map((booth) => (
                    <g key={booth.id}>
                      <rect
                        x={booth.x}
                        y={booth.y}
                        width={booth.width}
                        height={booth.height}
                        fill={
                          booth.isBooked
                            ? getCategoryColor(booth.category)
                            : "#f3f4f6"
                        }
                        stroke={
                          selectedBooth?.id === booth.id ? "#000" : "#d1d5db"
                        }
                        strokeWidth={selectedBooth?.id === booth.id ? 2 : 1}
                        className="cursor-pointer transition-all hover:stroke-black hover:stroke-2"
                        onClick={() => setSelectedBooth(booth)}
                      />
                      <text
                        x={booth.x + booth.width / 2}
                        y={booth.y + booth.height / 2 - 8}
                        textAnchor="middle"
                        fill={booth.isBooked ? "white" : "#6b7280"}
                        fontSize="10"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {booth.number}
                      </text>
                      <text
                        x={booth.x + booth.width / 2}
                        y={booth.y + booth.height / 2 + 5}
                        textAnchor="middle"
                        fill={booth.isBooked ? "white" : "#6b7280"}
                        fontSize="8"
                        className="pointer-events-none"
                      >
                        {booth.isBooked
                          ? booth.company.substring(0, 12) +
                            (booth.company.length > 12 ? "..." : "")
                          : "Available"}
                      </text>
                    </g>
                  ))}

                  {/* Emergency exits */}
                  <rect x="10" y="200" width="15" height="50" fill="#ef4444" />
                  <text
                    x="25"
                    y="220"
                    fill="#ef4444"
                    fontSize="8"
                    transform="rotate(90 25 220)"
                  >
                    EXIT
                  </text>

                  <rect x="575" y="200" width="15" height="50" fill="#ef4444" />
                  <text
                    x="575"
                    y="220"
                    fill="#ef4444"
                    fontSize="8"
                    transform="rotate(-90 575 220)"
                  >
                    EXIT
                  </text>

                  {/* Food court */}
                  <rect
                    x="450"
                    y="380"
                    width="120"
                    height="50"
                    fill="#10b981"
                    rx="5"
                  />
                  <text
                    x="510"
                    y="405"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    FOOD COURT
                  </text>
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  {categories.slice(1).map((category) => (
                    <div key={category} className="flex items-center">
                      <div
                        className="w-4 h-4 rounded mr-2"
                        style={{ backgroundColor: getCategoryColor(category) }}
                      ></div>
                      <span>{category}</span>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booth Information Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              {selectedBooth ? (
                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary-green)] mb-4">
                    Booth {selectedBooth.number}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-700">
                        Company:
                      </span>
                      <p className="text-lg font-semibold text-[var(--primary-orange)]">
                        {selectedBooth.company || "Available for Booking"}
                      </p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>
                      <p className="text-gray-600">{selectedBooth.category}</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">Size:</span>
                      <p className="text-gray-600">{selectedBooth.size}</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedBooth.isBooked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedBooth.isBooked ? "Booked" : "Available"}
                      </span>
                    </div>

                    {!selectedBooth.isBooked && (
                      <div className="pt-4">
                        <button className="w-full bg-[var(--primary-orange)] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[var(--accent-orange)] transition-colors">
                          Book This Booth
                        </button>
                      </div>
                    )}

                    {selectedBooth.isBooked && selectedBooth.company && (
                      <div className="pt-4">
                        <button className="w-full bg-[var(--primary-green)] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[var(--accent-green)] transition-colors">
                          View Company Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-300"
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
                  <p>Click on any booth to view details</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h4 className="font-semibold text-[var(--primary-green)] mb-4">
                Exhibition Statistics
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Booths:</span>
                  <span className="font-semibold">{booths.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booked:</span>
                  <span className="font-semibold text-red-600">
                    {booths.filter((b) => b.isBooked).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-semibold text-green-600">
                    {booths.filter((b) => !b.isBooked).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[var(--primary-green)] mb-4">
              Interested in Exhibiting?
            </h3>
            <p className="text-gray-600 mb-6">
              Secure your space at India&apos;s premier pharmaceutical congress
              and showcase your innovations to 12,000+ industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[var(--primary-orange)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--accent-orange)] transition-colors">
                Download Exhibitor Package
              </button>
              <button className="border-2 border-[var(--primary-green)] text-[var(--primary-green)] px-8 py-3 rounded-full font-semibold hover:bg-[var(--primary-green)] hover:text-white transition-colors">
                Contact Exhibition Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
