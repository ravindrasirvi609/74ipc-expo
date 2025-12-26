"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Download, Image as ImageIcon, User, RotateCcw, FileText, Search, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface PosterEntry {
    "Sr. No.": number;
    "Name of Presenting Author": string;
    "Title": string;
    "Poster Code": string;
    "Date": string;
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

const POSTER_TEXT_CONFIG: TextConfig = {
    textPosition: { x: 51, y: 58 },
    textFontSize: 39,
    fontColor: "#1a365d",
};

const POSTER_TEMPLATE = {
    templateUrl: "/74th IPC Poster Presentation Certificate.png",
    title: "Poster Presentation Certificate",
    textBefore: "This is to certify that ",
    textMiddle: " has successfully delivered a poster presentation entitled ",
    textAfter: " in the 74th Indian Pharmaceutical Congress held at Bengaluru International Exhibition Centre, Bengaluru during December 19-21, 2025",
};

export default function PosterCertificateGenerator() {
    const [posterCode, setPosterCode] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [posterTitle, setPosterTitle] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [posters, setPosters] = useState<PosterEntry[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [lookupStatus, setLookupStatus] = useState<"idle" | "found" | "not-found">("idle");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Load poster data
    useEffect(() => {
        const loadData = async () => {
            setLoadingData(true);
            try {
                const response = await fetch("/final.json");
                if (response.ok) {
                    const data = await response.json();
                    setPosters(data);
                }
            } catch (error) {
                console.error("Failed to load data:", error);
            }
            setLoadingData(false);
        };
        loadData();
    }, []);

    // Look up by poster code
    const lookupEntry = useCallback(() => {
        if (!posterCode.trim()) {
            setLookupStatus("idle");
            setParticipantName("");
            setPosterTitle("");
            return;
        }

        const searchTerm = posterCode.trim().toUpperCase();
        if (posters.length === 0) return;

        const poster = posters.find(
            (p) => p["Poster Code"].toUpperCase() === searchTerm
        );

        if (poster) {
            setParticipantName(poster["Name of Presenting Author"].trim());
            setPosterTitle(poster["Title"].trim());
            setLookupStatus("found");
        } else {
            setParticipantName("");
            setPosterTitle("");
            setLookupStatus("not-found");
        }
    }, [posterCode, posters]);

    // Auto-lookup when poster code changes
    useEffect(() => {
        if (posterCode.trim()) {
            const debounce = setTimeout(lookupEntry, 300);
            return () => clearTimeout(debounce);
        } else {
            setParticipantName("");
            setPosterTitle("");
            setLookupStatus("idle");
        }
    }, [posterCode, lookupEntry]);

    // Generate certificate on canvas
    const generateCertificate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            if (participantName.trim()) {
                const centerX = (POSTER_TEXT_CONFIG.textPosition.x / 100) * canvas.width;
                const textY = (POSTER_TEXT_CONFIG.textPosition.y / 100) * canvas.height;
                const maxWidth = canvas.width * 0.75;
                const lineHeight = POSTER_TEXT_CONFIG.textFontSize * 1.6;

                const allWords: { text: string; isBold: boolean }[] = [];
                const beforeWords = POSTER_TEMPLATE.textBefore.split(" ").filter(w => w);
                const nameWords = participantName.trim().split(" ").filter(w => w);
                const middleWords = POSTER_TEMPLATE.textMiddle.split(" ").filter(w => w);
                const titleWords = posterTitle.trim().split(" ").filter(w => w);
                const afterWords = POSTER_TEMPLATE.textAfter.split(" ").filter(w => w);

                beforeWords.forEach(w => allWords.push({ text: w, isBold: false }));
                nameWords.forEach(w => allWords.push({ text: w, isBold: true }));
                middleWords.forEach(w => allWords.push({ text: w, isBold: false }));
                titleWords.forEach(w => allWords.push({ text: w, isBold: true }));
                afterWords.forEach(w => allWords.push({ text: w, isBold: false }));

                const lines: { text: string; isBold: boolean }[][] = [];
                let currentLine: { text: string; isBold: boolean }[] = [];
                let currentLineWidth = 0;

                allWords.forEach((wordObj) => {
                    ctx.font = `${wordObj.isBold ? "bold " : ""}${POSTER_TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
                    const wordWidth = ctx.measureText(wordObj.text + " ").width;

                    if (currentLineWidth + wordWidth > maxWidth && currentLine.length > 0) {
                        lines.push(currentLine);
                        currentLine = [];
                        currentLineWidth = 0;
                    }

                    currentLine.push(wordObj);
                    currentLineWidth += wordWidth;
                });

                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }

                const totalHeight = lines.length * lineHeight;
                const startY = textY - totalHeight / 2 + lineHeight / 2;

                lines.forEach((line, lineIndex) => {
                    let lineWidth = 0;
                    line.forEach((segment) => {
                        ctx.font = `${segment.isBold ? "bold " : ""}${POSTER_TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
                        lineWidth += ctx.measureText(segment.text + " ").width;
                    });

                    let x = centerX - lineWidth / 2;
                    const y = startY + lineIndex * lineHeight;

                    line.forEach((segment) => {
                        ctx.font = `${segment.isBold ? "bold " : ""}${POSTER_TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
                        ctx.fillStyle = POSTER_TEXT_CONFIG.fontColor;
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
        img.src = POSTER_TEMPLATE.templateUrl;
    }, [participantName, posterTitle]);

    useEffect(() => {
        generateCertificate();
    }, [generateCertificate]);

    const downloadCertificate = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !participantName.trim()) return;

        setIsGenerating(true);
        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
            const link = document.createElement("a");
            const safeName = participantName.trim().replace(/[^a-zA-Z0-9]/g, "_");
            const safeCode = posterCode.trim().replace(/[^a-zA-Z0-9-]/g, "_");
            link.download = `certificate-poster-${safeCode || safeName}.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
        } catch (error) {
            console.error("Error downloading certificate:", error);
            alert("Failed to download certificate. Please try again.");
        }

        setIsGenerating(false);
    };

    const resetAll = () => {
        setPosterCode("");
        setParticipantName("");
        setPosterTitle("");
        setLookupStatus("idle");
    };

    const baseInputClasses =
        "w-full rounded-xl border px-4 py-2.5 text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 border-gray-200 focus:border-[var(--primary-green)] focus:ring-[var(--primary-green)]/30";

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Poster Certificate Generator
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
                        Generate your personalized poster presentation certificate for 74th IPC. Enter your poster code to download.
                    </p>
                    <Link
                        href="/certificate-generator/registration"
                        className="inline-flex items-center gap-2 text-[var(--primary-orange)] hover:underline font-medium"
                    >
                        <FileText className="w-4 h-4" />
                        Looking for Delegate Certificate? Click here
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Controls */}
                    <div className="space-y-6 animate-slide-up">
                        {/* Certificate Type Indicator */}
                        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-[var(--primary-orange)]/10">
                                    <ImageIcon className="w-10 h-10 text-[var(--primary-orange)]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Poster Certificate</h2>
                                    <p className="text-gray-500">Presentation Certificate for 74th IPC</p>
                                </div>
                            </div>
                        </div>

                        {/* Participant Details */}
                        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-[var(--primary-orange)]" />
                                Participant Details
                            </h2>

                            <div className="space-y-4">
                                {/* Poster Code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Search className="w-4 h-4" />
                                        Poster Code <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={posterCode}
                                            onChange={(e) => {
                                                setPosterCode(e.target.value.toUpperCase());
                                                setLookupStatus("idle");
                                            }}
                                            className={baseInputClasses}
                                            placeholder="e.g., PC-01"
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
                                        {loadingData
                                            ? "Loading database..."
                                            : lookupStatus === "found"
                                                ? "✓ Details auto-filled from records"
                                                : lookupStatus === "not-found"
                                                    ? "Poster code not found. Please check and try again."
                                                    : `Enter poster code to generate certificate (${posters.length} entries loaded)`
                                        }
                                    </p>
                                </div>

                                {/* Participant Name (Read-only) */}
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
                                        placeholder="Auto-generated from poster code"
                                    />
                                </div>

                                {/* Poster Title (Read-only) */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Presentation Title
                                    </label>
                                    <textarea
                                        value={posterTitle}
                                        readOnly
                                        disabled
                                        rows={3}
                                        className={`${baseInputClasses} bg-gray-100 cursor-not-allowed resize-none ${lookupStatus === "found" ? "bg-emerald-50 text-emerald-800 font-medium" : ""}`}
                                        placeholder="Auto-generated from poster code"
                                    />
                                </div>
                            </div>

                            {/* Preview of certificate text */}
                            {participantName.trim() && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <p className="text-sm text-gray-700">
                                        {POSTER_TEMPLATE.textBefore}
                                        <span className="font-bold text-[var(--primary-green)]">{participantName.trim()}</span>
                                        {POSTER_TEMPLATE.textMiddle}
                                        <span className="font-bold text-[var(--primary-orange)]">{posterTitle.trim()}</span>
                                        {POSTER_TEMPLATE.textAfter}
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
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                            >
                                <Download className="w-5 h-5" />
                                {isGenerating ? "Generating..." : "Download Certificate"}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Preview */}
                    {lookupStatus === "found" && (
                        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-[var(--primary-orange)]" />
                                    Live Preview - {POSTER_TEMPLATE.title}
                                </h2>

                                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner">
                                    <canvas
                                        ref={canvasRef}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <h3 className="font-semibold text-orange-800 mb-2">Certificate Info</h3>
                                    <div className="text-sm text-orange-700 space-y-1">
                                        <p><span className="font-medium">Type:</span> {POSTER_TEMPLATE.title}</p>
                                        <p><span className="font-medium">Poster Code:</span> {posterCode}</p>
                                        <p><span className="font-medium">Name:</span> {participantName.trim()}</p>
                                        {posterTitle && (
                                            <p><span className="font-medium">Title:</span> {posterTitle.length > 50 ? posterTitle.substring(0, 50) + "..." : posterTitle}</p>
                                        )}
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
