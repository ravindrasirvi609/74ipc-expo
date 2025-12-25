"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, User, Hash, Move, Type, RotateCcw } from "lucide-react";

interface TextPosition {
  x: number;
  y: number;
}

interface TextConfig {
  name: TextPosition;
  regId: TextPosition;
  fontSize: number;
  fontColor: string;
}

const DEFAULT_TEXT_CONFIG: TextConfig = {
  name: { x: 50, y: 45 },
  regId: { x: 50, y: 55 },
  fontSize: 32,
  fontColor: "#1a1a1a",
};

export default function CertificateGenerator() {
  const [templateImage, setTemplateImage] = useState<string | null>(null);
  const [registrationName, setRegistrationName] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [textConfig, setTextConfig] = useState<TextConfig>(DEFAULT_TEXT_CONFIG);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate certificate on canvas
  const generateCertificate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) return;

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

      // Configure text style
      ctx.font = `bold ${textConfig.fontSize}px Inter, Arial, sans-serif`;
      ctx.fillStyle = textConfig.fontColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw registration name
      if (registrationName) {
        const nameX = (textConfig.name.x / 100) * canvas.width;
        const nameY = (textConfig.name.y / 100) * canvas.height;
        ctx.fillText(registrationName, nameX, nameY);
      }

      // Draw registration ID
      if (registrationId) {
        const idX = (textConfig.regId.x / 100) * canvas.width;
        const idY = (textConfig.regId.y / 100) * canvas.height;
        ctx.font = `${textConfig.fontSize * 0.7}px Inter, Arial, sans-serif`;
        ctx.fillText(`Registration ID: ${registrationId}`, idX, idY);
      }
    };
    img.src = templateImage;
  }, [templateImage, registrationName, registrationId, textConfig]);

  // Update canvas whenever inputs change
  useEffect(() => {
    generateCertificate();
  }, [generateCertificate]);

  // Handle file upload
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setTemplateImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  // Download certificate
  const downloadCertificate = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) return;

    setIsGenerating(true);
    
    // Wait for canvas to be ready
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const link = document.createElement("a");
      link.download = `certificate-${registrationId || "generated"}.png`;
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
    setTemplateImage(null);
    setRegistrationName("");
    setRegistrationId("");
    setTextConfig(DEFAULT_TEXT_CONFIG);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            Upload your certificate template, enter registration details, and download your personalized certificate instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6 animate-slide-up">
            {/* Upload Section */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[var(--primary-green)]" />
                Upload Certificate Template
              </h2>
              
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-[var(--primary-green)] bg-[var(--primary-green)]/5 scale-[1.02]"
                    : templateImage
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-gray-300 hover:border-[var(--primary-green)] hover:bg-gray-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
                
                {templateImage ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="text-emerald-700 font-medium">Template uploaded!</p>
                    <p className="text-sm text-gray-500">Click or drag to replace</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-700 font-medium">Drop your certificate template here</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                    <p className="text-xs text-gray-400">Supports PNG, JPG, JPEG</p>
                  </div>
                )}
              </div>
            </div>

            {/* Registration Details */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--primary-green)]" />
                Registration Details
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Registration Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={registrationName}
                    onChange={(e) => setRegistrationName(e.target.value)}
                    className={baseInputClasses}
                    placeholder="Enter participant name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Registration ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                    className={baseInputClasses}
                    placeholder="e.g., REG-2024-001"
                  />
                </div>
              </div>
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
                      <label className="text-xs text-gray-500 mb-1 block">Horizontal (X): {textConfig.name.x}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.name.x}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            name: { ...prev.name, x: Number(e.target.value) },
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Vertical (Y): {textConfig.name.y}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.name.y}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            name: { ...prev.name, y: Number(e.target.value) },
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Registration ID Position */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700">Registration ID Position</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Horizontal (X): {textConfig.regId.x}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.regId.x}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            regId: { ...prev.regId, x: Number(e.target.value) },
                          }))
                        }
                        className="w-full accent-[var(--primary-green)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Vertical (Y): {textConfig.regId.y}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={textConfig.regId.y}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            regId: { ...prev.regId, y: Number(e.target.value) },
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Font Size: {textConfig.fontSize}px</label>
                      <input
                        type="range"
                        min="12"
                        max="72"
                        value={textConfig.fontSize}
                        onChange={(e) =>
                          setTextConfig((prev) => ({
                            ...prev,
                            fontSize: Number(e.target.value),
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
                Reset All
              </button>
              <button
                onClick={downloadCertificate}
                disabled={!templateImage || !registrationName || !registrationId || isGenerating}
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
                Live Preview
              </h2>

              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner">
                {templateImage ? (
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg font-medium">No template uploaded</p>
                    <p className="text-sm">Upload a certificate template to see preview</p>
                  </div>
                )}
              </div>

              {templateImage && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h3 className="font-semibold text-emerald-800 mb-2">Preview Info</h3>
                  <div className="text-sm text-emerald-700 space-y-1">
                    <p><span className="font-medium">Name:</span> {registrationName || "(Not entered)"}</p>
                    <p><span className="font-medium">Registration ID:</span> {registrationId || "(Not entered)"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
