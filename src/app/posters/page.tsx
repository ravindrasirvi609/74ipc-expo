"use client";

import { useState, useEffect } from "react";

interface Poster {
  "Sr. No.": number;
  "Name of Presenting Author": string;
  Title: string;
  "Poster Code": string;
  Date: string;
}

export default function PostersPage() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/final.json")
      .then((response) => response.json())
      .then((data) => {
        setPosters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading posters:", error);
        setLoading(false);
      });
  }, []);

  const filteredPosters = posters.filter(
    (poster) =>
      poster.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poster["Name of Presenting Author"]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      poster["Poster Code"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Poster Presentations
          </h1>
          <p className="text-lg text-gray-600">
            Explore the latest research posters from the 74th IPC Expo
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by title, author, or poster code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosters.map((poster) => (
            <div
              key={poster["Sr. No."]}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {poster["Poster Code"]}
                </span>
                <span className="text-sm text-gray-500">{poster.Date}</span>
              </div>

              <h3
                className="text-lg font-semibold text-gray-900 mb-3 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {poster.Title}
              </h3>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {poster["Name of Presenting Author"].charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {poster["Name of Presenting Author"]}
                  </p>
                  <p className="text-sm text-gray-500">Presenting Author</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posters found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
