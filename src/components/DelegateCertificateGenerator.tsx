"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Download, Image as ImageIcon, User, RotateCcw, Award, Search, CheckCircle, AlertCircle, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

interface Attendee {
    "SR NO.": number;
    "REG NUM.": string;
    "ATTENDEE NAME": string;
    "ATTENDEE EMAIL": string;
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

const DELEGATE_TEXT_CONFIG: TextConfig = {
    textPosition: { x: 55, y: 52 },
    textFontSize: 48,
    fontColor: "#1a365d",
};

const DELEGATE_TEMPLATE = {
    templateUrl: "/74th IPC Certificate.png",
    title: "Delegate Certificate",
    textBefore: "This is to certify that ",
    textAfter: " has participated as a Delegate in the 74th IPC held at Bengaluru International Exhibition Center, Bengaluru during December 19-21, 2025",
};

export default function DelegateCertificateGenerator() {
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [participantEmail, setParticipantEmail] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [lookupStatus, setLookupStatus] = useState<"idle" | "found" | "not-found">("idle");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Load attendees data
    useEffect(() => {
        const loadData = async () => {
            setLoadingData(true);
            try {
                const response = await fetch("/attendees-all.json");
                if (response.ok) {
                    const data = await response.json();
                    setAttendees(data);
                }
            } catch (error) {
                console.error("Failed to load data:", error);
            }
            setLoadingData(false);
        };
        loadData();
    }, []);

    // Look up by registration number
    const lookupEntry = useCallback(() => {
        if (!registrationNumber.trim()) {
            setLookupStatus("idle");
            setParticipantName("");
            return;
        }

        const searchTerm = registrationNumber.trim().toUpperCase();
        if (attendees.length === 0) return;

        const attendee = attendees.find(
            (a) => a["REG NUM."] && String(a["REG NUM."]).toUpperCase() === searchTerm
        );

        if (attendee) {
            setParticipantName(attendee["ATTENDEE NAME"].trim());
            setParticipantEmail(attendee["ATTENDEE EMAIL"]?.trim() || "");
            setLookupStatus("found");
        } else {
            setParticipantName("");
            setParticipantEmail("");
            setLookupStatus("not-found");
        }
    }, [registrationNumber, attendees]);

    // Auto-lookup when registration number changes
    useEffect(() => {
        if (registrationNumber.trim()) {
            const debounce = setTimeout(lookupEntry, 300);
            return () => clearTimeout(debounce);
        } else {
            setParticipantName("");
            setParticipantEmail("");
            setLookupStatus("idle");
        }
    }, [registrationNumber, lookupEntry]);

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
                const centerX = (DELEGATE_TEXT_CONFIG.textPosition.x / 100) * canvas.width;
                const textY = (DELEGATE_TEXT_CONFIG.textPosition.y / 100) * canvas.height;
                const maxWidth = canvas.width * 0.75;
                const lineHeight = DELEGATE_TEXT_CONFIG.textFontSize * 1.6;

                const allWords: { text: string; isBold: boolean }[] = [];
                const beforeWords = DELEGATE_TEMPLATE.textBefore.split(" ").filter(w => w);
                const nameWords = participantName.trim().split(" ").filter(w => w);
                const afterWords = DELEGATE_TEMPLATE.textAfter.split(" ").filter(w => w);

                beforeWords.forEach(w => allWords.push({ text: w, isBold: false }));
                nameWords.forEach(w => allWords.push({ text: w, isBold: true }));
                afterWords.forEach(w => allWords.push({ text: w, isBold: false }));

                const lines: { text: string; isBold: boolean }[][] = [];
                let currentLine: { text: string; isBold: boolean }[] = [];
                let currentLineWidth = 0;

                allWords.forEach((wordObj) => {
                    ctx.font = `${wordObj.isBold ? "bold " : ""}${DELEGATE_TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
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
                        ctx.font = `${segment.isBold ? "bold " : ""}${DELEGATE_TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
                        lineWidth += ctx.measureText(segment.text + " ").width;
                    });

                    let x = centerX - lineWidth / 2;
                    const y = startY + lineIndex * lineHeight;

                    line.forEach((segment) => {
                        ctx.font = `${segment.isBold ? "bold " : ""}${DELEGATE_TEXT_CONFIG.textFontSize}px "Times New Roman", Georgia, serif`;
                        ctx.fillStyle = DELEGATE_TEXT_CONFIG.fontColor;
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
        img.src = DELEGATE_TEMPLATE.templateUrl;
    }, [participantName]);

    useEffect(() => {
        generateCertificate();
    }, [generateCertificate]);

    const downloadCertificate = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !participantName.trim()) return;

        setIsGenerating(true);
        setEmailStatus("idle");
        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
            const link = document.createElement("a");
            const safeName = participantName.trim().replace(/[^a-zA-Z0-9]/g, "_");
            const safeCode = registrationNumber.trim().replace(/[^a-zA-Z0-9-]/g, "_");
            link.download = `certificate-delegate-${safeCode || safeName}.png`;
            const certificateBase64 = canvas.toDataURL("image/png", 1.0);
            link.href = certificateBase64;
            link.click();

            // Send email if participant has an email
            if (participantEmail) {
                setIsSendingEmail(true);
                try {
                    const response = await fetch("/api/send-certificate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: participantEmail,
                            name: participantName.trim(),
                            registrationNumber: registrationNumber.trim(),
                            certificateBase64,
                        }),
                    });

                    if (response.ok) {
                        setEmailStatus("success");
                    } else {
                        console.error("Email send failed");
                        setEmailStatus("error");
                    }
                } catch (emailError) {
                    console.error("Email error:", emailError);
                    setEmailStatus("error");
                }
                setIsSendingEmail(false);
            }
        } catch (error) {
            console.error("Error downloading certificate:", error);
            alert("Failed to download certificate. Please try again.");
        }

        setIsGenerating(false);
    };

    const resetAll = () => {
        setRegistrationNumber("");
        setParticipantName("");
        setParticipantEmail("");
        setLookupStatus("idle");
        setEmailStatus("idle");
    };

    const baseInputClasses =
        "w-full rounded-xl border px-4 py-2.5 text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 border-gray-200 focus:border-[var(--primary-green)] focus:ring-[var(--primary-green)]/30";

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Delegate Certificate Generator
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
                        Generate your personalized participation certificate for 74th IPC. Enter your registration number to download.
                    </p>
                    <Link
                        href="/certificate-generator/poster"
                        className="inline-flex items-center gap-2 text-[var(--primary-green)] hover:underline font-medium"
                    >
                        <ImageIcon className="w-4 h-4" />
                        Looking for Poster Certificate? Click here
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Controls */}
                    <div className="space-y-6 animate-slide-up">
                        {/* Certificate Type Indicator */}
                        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-[var(--primary-green)]/10">
                                    <Award className="w-10 h-10 text-[var(--primary-green)]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Delegate Certificate</h2>
                                    <p className="text-gray-500">Participation Certificate for 74th IPC</p>
                                </div>
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
                                        {loadingData
                                            ? "Loading database..."
                                            : lookupStatus === "found"
                                                ? "✓ Details auto-filled from records"
                                                : lookupStatus === "not-found"
                                                    ? "Registration number not found. Please check and try again."
                                                    : `Enter registration number to generate certificate (${attendees.length} entries loaded)`
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
                                        placeholder="Auto-generated from registration number"
                                    />
                                </div>
                            </div>

                            {/* Preview of certificate text */}
                            {participantName.trim() && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <p className="text-sm text-gray-700">
                                        {DELEGATE_TEMPLATE.textBefore}
                                        <span className="font-bold text-[var(--primary-green)]">{participantName.trim()}</span>
                                        {DELEGATE_TEMPLATE.textAfter}
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
                                disabled={!participantName.trim() || isGenerating || isSendingEmail}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-green)] text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                            >
                                {isSendingEmail ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending Email...</>
                                ) : isGenerating ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                                ) : (
                                    <><Download className="w-5 h-5" /> Download & Email Certificate</>
                                )}
                            </button>
                        </div>

                        {/* Email Status Notification */}
                        {emailStatus !== "idle" && (
                            <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${emailStatus === "success" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                                {emailStatus === "success" ? (
                                    <>
                                        <Mail className="w-5 h-5 text-emerald-600" />
                                        <p className="text-emerald-700 text-sm">
                                            Certificate has been emailed to <strong>{participantEmail}</strong>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        <p className="text-red-700 text-sm">
                                            Failed to send email. Certificate downloaded successfully, please share manually.
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Preview */}
                    {lookupStatus === "found" && (
                        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-[var(--primary-green)]" />
                                    Live Preview - {DELEGATE_TEMPLATE.title}
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
                                        <p><span className="font-medium">Type:</span> {DELEGATE_TEMPLATE.title}</p>
                                        <p><span className="font-medium">Registration Number:</span> {registrationNumber}</p>
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
