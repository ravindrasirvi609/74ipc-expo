"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Download, Image as ImageIcon, User, RotateCcw, Award, FileText, Search, CheckCircle, AlertCircle } from "lucide-react";

type CertificateType = "delegate" | "poster";

interface Attendee {
  "SR NO.": number;
  "REG NUM.": string;
  "ATTENDEE NAME": string;
}

interface TextPosition {
  x: number;
  y: number;
}

interface TextConfig {
  textPosition: TextPosition;
  textFontSize: number;
  fontColor: string;
}

// Fixed text config - no UI to change these
const TEXT_CONFIG: TextConfig = {
  textPosition: { x: 55, y: 52 },
  textFontSize: 48,
  fontColor: "#1a365d",
};

const CERTIFICATE_TEMPLATES = {
  delegate: {
    templateUrl: "/74th IPC Certificate.png",
    title: "Delegate Certificate",
    textBefore: "This is to certify that ",
    textAfter: " has participated as a Delegate in the 74th IPC held at Bengaluru International Exhibition Center, Bengaluru during December 19-21, 2025",
  },
  poster: {
    templateUrl: "/74th IPC Poster Presentation Certificate.png",
    title: "Poster Presentation Certificate",
    textBefore: "This is to certify that ",
    textAfter: " has successfully delivered a poster presentation in the 74th Indian Pharmaceutical Congress held at Bengaluru International Exhibition Centre, Bengaluru during December 19-21, 2025",
  },
};

export default function CertificateGenerator() {
  const [certificateType, setCertificateType] = useState<CertificateType>("delegate");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loadingAttendees, setLoadingAttendees] = useState(false);
  const [lookupStatus, setLookupStatus] = useState<"idle" | "found" | "not-found">("idle");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentTemplate = CERTIFICATE_TEMPLATES[certificateType];

  // Load attendees JSON
  useEffect(() => {
    const loadAttendees = async () => {
      setLoadingAttendees(true);
      try {
        const response = await fetch("/attendees-all.json");
        if (response.ok) {
          const data = await response.json();
          setAttendees(data);
        }
      } catch (error) {
        console.error("Failed to load attendees:", error);
      }
      setLoadingAttendees(false);
    };
    loadAttendees();
  }, []);

  // Look up attendee by registration number
  const lookupAttendee = useCallback(() => {
    if (!registrationNumber.trim() || attendees.length === 0) {
      setLookupStatus("idle");
      setParticipantName("");
      return;
    }

    const searchTerm = registrationNumber.trim().toUpperCase();
    const attendee = attendees.find(
      (a) => a["REG NUM."].toUpperCase() === searchTerm
    );

    if (attendee) {
      setParticipantName(attendee["ATTENDEE NAME"].trim());
      setLookupStatus("found");
    } else {
      setParticipantName("");
      setLookupStatus("not-found");
    }
  }, [registrationNumber, attendees]);

  // Auto-lookup when registration number changes
  useEffect(() => {
    if (registrationNumber.trim()) {
      const debounce = setTimeout(lookupAttendee, 300);
      return () => clearTimeout(debounce);
    } else {
      setParticipantName("");
      setLookupStatus("idle");
    }
  }, [registrationNumber, lookupAttendee]);

  // Generate certificate on canvas
  const generateCertificate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw template image
      ctx.drawImage(img, 0, 0);

      // Only draw text if participant name is provided
      if (participantName.trim()) {
        const centerX = (TEXT_CONFIG.textPosition.x / 100) * canvas.width;
        const textY = (TEXT_CONFIG.textPosition.y / 100) * canvas.height;

        // Text wrapping with bold name
        const maxWidth = canvas.width * 0.75;
        const lineHeight = TEXT_CONFIG.textFontSize * 1.6;

        // Calculate lines for the full text
        const beforeText = currentTemplate.textBefore;
        const afterText = currentTemplate.textAfter;

        // Split into words and track which words are the name
        const beforeWords = beforeText.split(" ").filter(w => w);
        const nameWords = participantName.trim().split(" ").filter(w => w);
        const afterWords = afterText.split(" ").filter(w => w);
        const allWords = [...beforeWords, ...nameWords, ...afterWords];

        // Track where name starts and ends
        const nameStartIndex = beforeWords.length;
        const nameEndIndex = nameStartIndex + nameWords.length;

        // Measure and wrap text
        const lines: { text: string; isBold: boolean }[][] = [];
        let currentLine: { text: string; isBold: boolean }[] = [];
        let currentLineWidth = 0;

        allWords.forEach((word, index) => {
          const isBold = index >= nameStartIndex && index < nameEndIndex;
          ctx.font = `${isBold ? "bold " : ""}${TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
          const wordWidth = ctx.measureText(word + " ").width;

          if (currentLineWidth + wordWidth > maxWidth && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = [];
            currentLineWidth = 0;
          }

          currentLine.push({ text: word, isBold });
          currentLineWidth += wordWidth;
        });

        if (currentLine.length > 0) {
          lines.push(currentLine);
        }

        // Draw each line
        const totalHeight = lines.length * lineHeight;
        const startY = textY - totalHeight / 2 + lineHeight / 2;

        lines.forEach((line, lineIndex) => {
          // Calculate line width to center it
          let lineWidth = 0;
          line.forEach((segment) => {
            ctx.font = `${segment.isBold ? "bold " : ""}${TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
            lineWidth += ctx.measureText(segment.text + " ").width;
          });

          // Start position for centered text
          let x = centerX - lineWidth / 2;
          const y = startY + lineIndex * lineHeight;

          // Draw each word segment
          line.forEach((segment) => {
            ctx.font = `${segment.isBold ? "bold " : ""}${TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
            ctx.fillStyle = TEXT_CONFIG.fontColor;
            ctx.textBaseline = "middle";
            ctx.fillText(segment.text + " ", x, y);
            x += ctx.measureText(segment.text + " ").width;
          });
        });
      }
    };
    img.onerror = () => {
      console.error("Failed to load template image");
    };
    img.src = currentTemplate.templateUrl;
  }, [certificateType, participantName, currentTemplate]);

  // Update canvas whenever inputs change
  useEffect(() => {
    generateCertificate();
  }, [generateCertificate]);

  // Download certificate
  const downloadCertificate = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !participantName.trim()) return;

    setIsGenerating(true);

    // Wait for canvas to be ready
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const link = document.createElement("a");
      const safeName = participantName.trim().replace(/[^a-zA-Z0-9]/g, "_");
      const safeRegNum = registrationNumber.trim().replace(/[^a-zA-Z0-9-]/g, "_");
      link.download = `certificate-${certificateType}-${safeRegNum || safeName}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate. Please try again.");
    }

    setIsGenerating(false);
  };

  // Reset all
  const resetAll = () => {
    setRegistrationNumber("");
    setParticipantName("");
    setLookupStatus("idle");
  };

  // Handle certificate type change
  const handleCertificateTypeChange = (type: CertificateType) => {
    setCertificateType(type);
    setRegistrationNumber("");
    setParticipantName("");
    setLookupStatus("idle");
  };

  const baseInputClasses =
    "w-full rounded-xl border px-4 py-2.5 text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 border-gray-200 focus:border-[var(--primary-green)] focus:ring-[var(--primary-green)]/30";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Certificate Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Generate personalized certificates for 74th IPC participants. Enter your registration number to generate certificate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6 animate-slide-up">
            {/* Certificate Type Selection */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--primary-green)]" />
                Select Certificate Type
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleCertificateTypeChange("delegate")}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${certificateType === "delegate"
                    ? "border-[var(--primary-green)] bg-[var(--primary-green)]/5 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <FileText className={`w-8 h-8 ${certificateType === "delegate" ? "text-[var(--primary-green)]" : "text-gray-400"}`} />
                  <span className={`font-semibold ${certificateType === "delegate" ? "text-[var(--primary-green)]" : "text-gray-600"}`}>
                    Delegate
                  </span>
                  <span className="text-xs text-gray-500 text-center">Participation Certificate</span>
                </button>

                <button
                  onClick={() => handleCertificateTypeChange("poster")}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${certificateType === "poster"
                    ? "border-[var(--primary-green)] bg-[var(--primary-green)]/5 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <ImageIcon className={`w-8 h-8 ${certificateType === "poster" ? "text-[var(--primary-green)]" : "text-gray-400"}`} />
                  <span className={`font-semibold ${certificateType === "poster" ? "text-[var(--primary-green)]" : "text-gray-600"}`}>
                    Poster
                  </span>
                  <span className="text-xs text-gray-500 text-center">Presentation Certificate</span>
                </button>
              </div>
            </div>

            {/* Participant Details */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--primary-green)]" />
                Participant Details
              </h2>

              <div className="space-y-4">
                {/* Registration Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={registrationNumber}
                      onChange={(e) => {
                        setRegistrationNumber(e.target.value.toUpperCase());
                        setLookupStatus("idle");
                      }}
                      className={baseInputClasses}
                      placeholder="e.g., IPC-TM-1001"
                    />
                    {lookupStatus !== "idle" && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {lookupStatus === "found" ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {loadingAttendees
                      ? "Loading attendees database..."
                      : lookupStatus === "found"
                        ? "✓ Name auto-filled from registration records"
                        : lookupStatus === "not-found"
                          ? "Registration number not found. Please check and try again."
                          : `Enter registration number to generate certificate (${attendees.length} attendees loaded)`
                    }
                  </p>
                </div>

                {/* Participant Name (Read-only, auto-generated) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Participant Name
                  </label>
                  <input
                    type="text"
                    value={participantName}
                    readOnly
                    disabled
                    className={`${baseInputClasses} bg-gray-100 cursor-not-allowed ${lookupStatus === "found" ? "bg-emerald-50 text-emerald-800 font-medium" : ""}`}
                    placeholder="Auto-generated from registration number"
                  />
                </div>
              </div>

              {/* Preview of certificate text */}
              {participantName.trim() && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-700">
                    {currentTemplate.textBefore}
                    <span className="font-bold text-[var(--primary-green)]">{participantName.trim()}</span>
                    {currentTemplate.textAfter}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={resetAll}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={downloadCertificate}
                disabled={!participantName.trim() || isGenerating}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-green)] text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                {isGenerating ? "Generating..." : "Download Certificate"}
              </button>
            </div>
          </div>

          {/* Right Column - Preview (only show when valid registration found) */}
          {lookupStatus === "found" && (
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[var(--primary-green)]" />
                  Live Preview - {currentTemplate.title}
                </h2>

                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h3 className="font-semibold text-emerald-800 mb-2">Certificate Info</h3>
                  <div className="text-sm text-emerald-700 space-y-1">
                    <p><span className="font-medium">Type:</span> {currentTemplate.title}</p>
                    <p><span className="font-medium">Reg. No:</span> {registrationNumber}</p>
                    <p><span className="font-medium">Name:</span> {participantName.trim()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
