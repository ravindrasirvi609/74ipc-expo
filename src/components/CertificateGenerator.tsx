"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Download, Image as ImageIcon, User, Move, Type, RotateCcw, Award, FileText } from "lucide-react";

type CertificateType = "delegate" | "poster";

interface TextPosition {
  x: number;
  y: number;
}

interface TextConfig {
  namePosition: TextPosition;
  textPosition: TextPosition;
  nameFontSize: number;
  textFontSize: number;
  fontColor: string;
}

const DEFAULT_TEXT_CONFIG: TextConfig = {
  namePosition: { x: 50, y: 50 },
  textPosition: { x: 50, y: 58 },
  nameFontSize: 36,
  textFontSize: 20,
  fontColor: "#1a1a1a",
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
  const [participantName, setParticipantName] = useState("");
  const [textConfig, setTextConfig] = useState<TextConfig>(DEFAULT_TEXT_CONFIG);
  const [isGenerating, setIsGenerating] = useState(false);
  const [templateLoaded, setTemplateLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentTemplate = CERTIFICATE_TEMPLATES[certificateType];

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
        const centerX = (textConfig.namePosition.x / 100) * canvas.width;
        const nameY = (textConfig.namePosition.y / 100) * canvas.height;
        const textY = (textConfig.textPosition.y / 100) * canvas.height;

        // Draw participant name (bold, larger)
        ctx.font = `bold ${textConfig.nameFontSize}px "Times New Roman", Georgia, serif`;
        ctx.fillStyle = textConfig.fontColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(participantName.trim(), centerX, nameY);

        // Draw certificate text (wrapped)
        const fullText = currentTemplate.textBefore + participantName.trim() + currentTemplate.textAfter;
        ctx.font = `${textConfig.textFontSize}px "Times New Roman", Georgia, serif`;

        // Text wrapping
        const maxWidth = canvas.width * 0.75;
        const words = fullText.split(" ");
        let line = "";
        let lineY = textY;
        const lineHeight = textConfig.textFontSize * 1.5;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " ";
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line.trim(), centerX, lineY);
            line = words[i] + " ";
            lineY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), centerX, lineY);
      }

      setTemplateLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load template image");
      setTemplateLoaded(false);
    };
    img.src = currentTemplate.templateUrl;
  }, [certificateType, participantName, textConfig, currentTemplate]);

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
      link.download = `certificate-${certificateType}-${safeName}.png`;
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
    setParticipantName("");
    setTextConfig(DEFAULT_TEXT_CONFIG);
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
            Generate personalized certificates for 74th IPC participants. Select certificate type, enter the name, and download instantly.
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
                  onClick={() => setCertificateType("delegate")}
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
                  onClick={() => setCertificateType("poster")}
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

            {/* Participant Name */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--primary-green)]" />
                Participant Details
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Participant Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  className={baseInputClasses}
                  placeholder="Enter participant's full name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This name will appear on the certificate
                </p>
              </div>

              {/* Preview of certificate text */}
              {participantName.trim() && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-700 italic">
                    {currentTemplate.textBefore}
                    <span className="font-bold text-[var(--primary-green)]">{participantName.trim()}</span>
                    {currentTemplate.textAfter}
                  </p>
                </div>
              )}
            </div>

            {/* Text Positioning */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Move className="w-5 h-5 text-[var(--primary-green)]" />
                Text Positioning
              </h2>

              <div className="space-y-6">
                {/* Name Position */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700">Name Position</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Horizontal: {textConfig.namePosition.x}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.namePosition.x}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            namePosition: { ...prev.namePosition, x: Number(e.target.value) },
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Vertical: {textConfig.namePosition.y}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.namePosition.y}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            namePosition: { ...prev.namePosition, y: Number(e.target.value) },
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Position */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700">Certificate Text Position</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Horizontal: {textConfig.textPosition.x}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.textPosition.x}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            textPosition: { ...prev.textPosition, x: Number(e.target.value) },
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Vertical: {textConfig.textPosition.y}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.textPosition.y}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            textPosition: { ...prev.textPosition, y: Number(e.target.value) },
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Font Settings */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Font Settings
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Name Size: {textConfig.nameFontSize}px</label>
                      <input
                        type="range"
                        min="16"
                        max="72"
                        value={textConfig.nameFontSize}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            nameFontSize: Number(e.target.value),
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Text Size: {textConfig.textFontSize}px</label>
                      <input
                        type="range"
                        min="12"
                        max="36"
                        value={textConfig.textFontSize}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            textFontSize: Number(e.target.value),
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Text Color</label>
                      <input
                        type="color"
                        value={textConfig.fontColor}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            fontColor: e.target.value,
                          }))
                        }
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
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

          {/* Right Column - Preview */}
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
                  <p><span className="font-medium">Name:</span> {participantName.trim() || "(Enter name above)"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
