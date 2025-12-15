"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// --- Data Source ---
const sessionsData = [
    {
        "id": "session_01",
        "date": "2025-12-19",
        "hall": "Parijatha Hall",
        "title": "Symposium - 7: Nanoengineered Drug Delivery system and recent trends in Pharm. Technology",
        "speakers": [
            "Dr. Pardeep Gupta",
            "Dr. Rakesh Tekade",
            "Dr. Narasimha Murthy"
        ]
    },
    {
        "id": "session_02",
        "date": "2025-12-19",
        "hall": "Parijatha Hall",
        "title": "Symposium 8: AI-Powered Phytochemical Screening and Lead Identification",
        "speakers": [
            "Dr. Sanjay Jachak",
            "Dr. D.B. Ananthanarayana",
            "Dr. Raghavendra P Rao"
        ]
    },
    {
        "id": "session_03",
        "date": "2025-12-19",
        "hall": "Parijatha Hall",
        "title": "Plenary lecture Series –02",
        "speakers": [
            "Mr. Hemanth Kumar Nambari",
            "Dr. Basavaraj Nanjwade",
            "Dr. Sneha Ambwani"
        ]
    },
    {
        "id": "session_04",
        "date": "2025-12-20",
        "hall": "Gulmohar Hall",
        "title": "Patlex Business Solutions sponsored Plenary Lecture Series – 5",
        "speakers": [
            "Dr. Pranjal Chandra",
            "Dr. Pooja Goswami",
            "Mr. Vijaykumar Shivpuje"
        ]
    },
    {
        "id": "session_05",
        "date": "2025-12-20",
        "hall": "Gulmohar Hall",
        "title": "Plenary Lecture Series – 06 Synergy of AI in Pharmacy: Smart Classrooms, Smart Simulations, Smart Discovery",
        "speakers": [
            "Dr. Mirza Baig",
            "Dr. Neelima Gupta",
            "Dr. Karthik Raman"
        ]
    },
    {
        "id": "session_06",
        "date": "2025-12-20",
        "hall": "Gulmohar Hall",
        "title": "Symposium – 10 : Biomaterials, Bioengineering, and Microfluidics",
        "speakers": [
            "Dr. Debjani Paul",
            "Dr. Saikat Chakrabarti",
            "Mr. Santosh Dixit",
            "Dr. H.B. Pushpalatha"
        ]
    },
    {
        "id": "session_07",
        "date": "2025-12-20",
        "hall": "Cassia Hall",
        "title": "Panel discussion on National Education Policy",
        "speakers": [
            "Dr. Sohan Chithlange",
            "Dr. Deependra Singh",
            "Dr. Atmaram Pawar"
        ]
    },
    {
        "id": "session_08",
        "date": "2025-12-20",
        "hall": "Cassia Hall",
        "title": "Symposium - 10: Digital Therapeutics: Regulation and Integration into Pharma",
        "speakers": [
            "Dr. Muthu Dhandapani",
            "Dr. Prakash NS",
            "Dr. Rafiq Mohamad"
        ]
    },
    {
        "id": "session_09",
        "date": "2025-12-20",
        "hall": "Cassia Hall",
        "title": "Symposium – 11: Advancement in Neurotherapeutics drug discovery",
        "speakers": [
            "Dr. Samba Reddy",
            "Dr. BS Shankarnarayanrao",
            "Dr. Arnab Barik"
        ]
    },
    {
        "id": "session_10",
        "date": "2025-12-21",
        "hall": "Jacaranda Hall",
        "title": "Plenary lecture series – 08",
        "speakers": [
            "Dr. Md Azeemuddin",
            "Dr. Chandrika Mahendra"
        ]
    },
    {
        "id": "session_11",
        "date": "2025-12-19",
        "hall": "Cassia Hall",
        "title": "Shri. K. C. Chatterjee Memorial Lecture (IPGA sponsored), B.D. Miglani Memorial Lecture (IHPA sponsored), Prof. M. L. Khorana Memorial Lecture (IPA sponsored)",
        "speakers": [
            "Dr. P.K. Dutta",
            "Dr. V. Kalaiselvan",
            "Dr. Pulok Mukherjee"
        ]
    },
    {
        "id": "session_12",
        "date": "2025-12-19",
        "hall": "Cassia Hall",
        "title": "Symposium - 6: Pharmacogenomics and Precision Medicine",
        "speakers": [
            "Dr. Chakradhara Rao S Uppugunduri",
            "Dr. Murali .M",
            "Dr. Chung"
        ]
    },
    {
        "id": "session_13",
        "date": "2025-12-21",
        "hall": "Cassia Hall",
        "title": "Symposium – 14: Pharmaceutical Frontiers: Integrating AI, Innovation, and Sustainability for Future Therapies",
        "speakers": [
            "Dr. Siddhesh Kamat",
            "Mr. Rachit Agarwal",
            "Dr. Sahadev A. Shankarappa"
        ]
    },
    {
        "id": "session_14",
        "date": "2025-12-19",
        "hall": "Gulmohar Hall",
        "title": "Symposium - 3 Writing Research Proposals and Funding Opportunities",
        "speakers": [
            "Dr. Manish Diwan",
            "Dr. Kailash Petkar",
            "Dr. Ravleen Kaur Bakshi"
        ]
    },
    {
        "id": "session_15",
        "date": "2025-12-19",
        "hall": "Gulmohar Hall",
        "title": "Symposium - 4 : Start-ups in Pharmaceutical industry: Some Success Stories",
        "speakers": [
            "Dr. Rahul Purwar",
            "Dr. Sandip Kulkarni",
            "Dr. Jyothi Teigginamath"
        ]
    },
    {
        "id": "session_16",
        "date": "2025-12-19",
        "hall": "Gulmohar Hall",
        "title": "Symposium - 5: AI-Based ADMET Prediction in Pre-clinical Drug Development",
        "speakers": [
            "Dr. Anant Ketkar",
            "Mr. Amol Kulkarni",
            "Dr. Rajesh Kumawat"
        ]
    },
    {
        "id": "session_17",
        "date": "2025-12-21",
        "hall": "Gulmohar Hall",
        "title": "Plenary lecture series – 09",
        "speakers": [
            "Dr. Vasundhra Bhandari",
            "Dr. Jubie Selvaraj"
        ]
    },
    {
        "id": "session_18",
        "date": "2025-12-19",
        "hall": "Jacaranda Hall",
        "title": "Symposium 1: AI in Drug Discovery & Development",
        "speakers": [
            "Dr. Sukuru Karunakar",
            "Dr. Twan Lammers",
            "Dr. Joanne Chun"
        ]
    },
    {
        "id": "session_19",
        "date": "2025-12-19",
        "hall": "Jacaranda Hall",
        "title": "Plenary Lecture Series – 1",
        "speakers": [
            "Dr. Mahendra Patel",
            "Dr. M. Raj Rajasekaran",
            "Mr. Ranjit Barshikar"
        ]
    },
    {
        "id": "session_20",
        "date": "2025-12-19",
        "hall": "Jacaranda Hall",
        "title": "Micro Lab sponsored Symposium - 2",
        "speakers": [
            "Dr. Shrenik Kole",
            "Dr. Hari Krishna Maram",
            "Dr. G. Jagadeesh"
        ]
    },
    {
        "id": "session_21",
        "date": "2025-12-20",
        "hall": "Parijatha Hall",
        "title": "Plenary Session 07: APTI Women Researchers and Investigators Forum",
        "speakers": [
            "Prof. Indu Pal Kaur",
            "Dr. Vishakha Oza",
            "Dr. Geetha Manjunath"
        ]
    },
    {
        "id": "session_22",
        "date": "2025-12-20",
        "hall": "Parijatha Hall",
        "title": "Symposium – 13 by IPEC India on Excipients as Enablers: Compliance, Safety and Innovation in Drug Development",
        "speakers": [
            "Mr. Ajit Singh",
            "Dr. Ravleen Singh Khurana",
            "Mr. Vishakha Metkar",
            "Dr. Jitendra Amrutkar",
            "Mr. Pankaj Deore",
            "Mr. Shrikant Pawar",
            "Mr. Kaushik Desai"
        ]
    },
    {
        "id": "session_23",
        "date": "2025-12-20",
        "hall": "Jacaranda Hall",
        "title": "Plenary Lecture Series – 04",
        "speakers": [
            "Dr. B. Suresh",
            "Dr. Indiran Pather",
            "Dr. Muralikrishnan Dhanasekaran",
            "Dr. Zeenat Iqbal"
        ]
    },
    {
        "id": "session_24",
        "date": "2025-12-20",
        "hall": "Jacaranda Hall",
        "title": "Plenary Lecture series -3 ChemoNumerics :Decoding Molecules with AI , Algorithms and Predicative intelligence)",
        "speakers": [
            "DR. G. Narahari Sastry",
            "Mr. Aarshit Mittal",
            "Dr. Praful R Naik"
        ]
    },
    {
        "id": "session_25",
        "date": "2025-12-21",
        "hall": "Parijatha Hall",
        "title": "Plenary lecture series – 10",
        "speakers": [
            "Dr. Sanjay Garg Australia",
            "Dr. Matam Vijay-Kumar"
        ]
    },
    {
        "id": "session_26",
        "date": "2025-12-20",
        "hall": "Main Hall 2",
        "title": "NextGen Pharmacy Leaders: IPA-Students’ Forum”,Scientific Session, Pharmacothon , Elocution Competition",
        "speakers": [
            "Medam Venkata Komali"
        ]
    },
    {
        "id": "session_27",
        "date": "2025-12-20",
        "hall": "Jacaranda Hall",
        "title": "Himalaya led Panel discussion on From Tradition to Technology: Advancing Drug Discovery through Phytopharmaceuticals in India",
        "speakers": [
            "Phytopharmaceuticals members"
        ]
    },
    {
        "id": "session_28",
        "date": "2025-12-20",
        "hall": "Parijatha Hall",
        "title": "Symposium – 12: 3D Printing of Pharmaceuticals: Challenges & Future Directions",
        "speakers": [
            "Dr. Subham Banerjee",
            "Dr. Subhadeep Roy",
            "Dr. Kaushik Chatterjee"
        ]
    }
];

// --- Reusable UI Components ---
const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
        {title}
    </h3>
);

const RadioField = ({
    label,
    name,
    value,
    onChange,
    options,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (name: string, value: string) => void;
    options: string[];
}) => (
    <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-3">
            {label}
        </label>
        <div className="flex flex-wrap gap-3">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(name, option)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all border ${value === option
                        ? "bg-[var(--primary-green)] text-white shadow-md border-transparent"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

const StarRating = ({
    label,
    name,
    value,
    onChange,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (name: string, value: string) => void;
}) => (
    <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">
            {label}
        </label>
        <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(name, star.toString())}
                    className={`text-3xl transition-colors ${parseInt(value) >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                >
                    ★
                </button>
            ))}
        </div>
    </div>
);

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    placeholder = "Your answer",
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}) => (
    <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-2">
            {label}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent outline-none transition-all resize-none"
            placeholder={placeholder}
        />
    </div>
);


function ScientificFeedbackForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // --- State ---
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedHall, setSelectedHall] = useState("");
    const [selectedSessionId, setSelectedSessionId] = useState("");

    const [formData, setFormData] = useState({
        // Personal Details
        email: "",
        fullName: "",
        designation: "",
        affiliation: "",
        mobileNumber: "",
        participationLevel: "",

        // Dynamic Section
        selectedSpeakers: [] as string[],

        // Section A
        rateTopicInterest: "", // 1-5
        objectivesDefined: "",
        rateScientificQuality: "", // 1-5
        contentSupported: "",

        // Section B
        rateSpeakerSkills: "", // 1-5
        encourageInteraction: "",
        visualsClear: "",

        // Section C
        durationAppropriate: "",
        organizationSatisfied: "",

        // Section D
        overallRating: "", // 1-5
        likedMost: "",
        improvements: "",
        recommendation: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Derived Data & Cascading Logic ---
    const availableDates = useMemo(() => Array.from(new Set(sessionsData.map((s) => s.date))), []);

    const availableHalls = useMemo(() => {
        if (!selectedDate) return [];
        return Array.from(new Set(sessionsData.filter((s) => s.date === selectedDate).map((s) => s.hall)));
    }, [selectedDate]);

    const availableSessions = useMemo(() => {
        if (!selectedDate || !selectedHall) return [];
        return sessionsData.filter((s) => s.date === selectedDate && s.hall === selectedHall);
    }, [selectedDate, selectedHall]);

    const currentSession = useMemo(() => {
        return sessionsData.find(s => s.id === selectedSessionId);
    }, [selectedSessionId]);

    // --- URL Params Pre-fill ---
    useEffect(() => {
        const sessionIdParam = searchParams.get("sessionId");
        if (sessionIdParam) {
            const session = sessionsData.find((s) => s.id === sessionIdParam);
            if (session) {
                // Ensure we set all dependent states so cascading dropdowns work
                setSelectedDate(session.date);
                setSelectedHall(session.hall);
                setSelectedSessionId(session.id);
            }
        }
    }, [searchParams]);

    // --- Handlers ---
    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(e.target.value);
        setSelectedHall("");
        setSelectedSessionId("");
        setFormData(prev => ({ ...prev, selectedSpeakers: [] }));
    };

    const handleHallChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedHall(e.target.value);
        setSelectedSessionId("");
        setFormData(prev => ({ ...prev, selectedSpeakers: [] }));
    };

    const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSessionId(e.target.value);
        setFormData(prev => ({ ...prev, selectedSpeakers: [] }));
    };

    const handleSpeakerToggle = (speaker: string) => {
        setFormData(prev => {
            const exists = prev.selectedSpeakers.includes(speaker);
            if (exists) {
                return { ...prev, selectedSpeakers: prev.selectedSpeakers.filter(s => s !== speaker) };
            } else {
                return { ...prev, selectedSpeakers: [...prev.selectedSpeakers, speaker] };
            }
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleValueChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            sessionId: selectedSessionId,
            sessionDate: selectedDate,
            sessionHall: selectedHall,
            sessionTitle: currentSession?.title || "",
            selectedSpeakers: formData.selectedSpeakers.join(", "),
        };

        try {
            const response = await fetch("/api/feedback/scientific", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thank you for your feedback!");
                router.push("/feedback");
            } else {
                alert(result.error || "Failed to submit feedback.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Options ---
    const participationOptions = ["Delegate", "Speaker", "Organiser", "Volunteer", "Exhibitor", "Other"];
    const agreementOptions = ["Neutral", "Agree", "Strongly Agree", "Disagree", "Strongly Disagree"];
    const yesNoMaybe = ["Yes", "No", "Maybe"];
    const durationOptions = ["Too Long", "Appropriate", "Too Short"];
    const satisfactionOptions = ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-t-2xl shadow-lg p-8 mb-6 border-t-4 border-[var(--primary-orange)]">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        74th IPC 2025
                    </h1>
                    <h2 className="text-xl font-semibold text-[var(--primary-green)] mb-6 text-center">
                        Scientific Session Feedback Form
                    </h2>
                    <p className="text-center text-gray-600">Please select your session below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Session Selection (Dynamic) */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Session Selection" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)]"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    required
                                >
                                    <option value="">-- Select Date --</option>
                                    {availableDates.map(date => <option key={date} value={date}>{date}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Hall</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)]"
                                    value={selectedHall}
                                    onChange={handleHallChange}
                                    disabled={!selectedDate}
                                    required
                                >
                                    <option value="">-- Select Hall --</option>
                                    {availableHalls.map(hall => <option key={hall} value={hall}>{hall}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Session</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)]"
                                value={selectedSessionId}
                                onChange={handleSessionChange}
                                disabled={!selectedHall}
                                required
                            >
                                <option value="">-- Select Session --</option>
                                {availableSessions.map(session => <option key={session.id} value={session.id}>{session.title}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Only show rest of form if session is selected */}
                    {selectedSessionId && (
                        <>
                            {/* Personal Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <SectionHeader title="I. Personal Details" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: "Email Id", name: "email", type: "email" },
                                        { label: "Full Name", name: "fullName", type: "text" },
                                        { label: "Designation", name: "designation", type: "text" },
                                        { label: "Affiliation", name: "affiliation", type: "text" },
                                        { label: "Mobile Number", name: "mobileNumber", type: "tel" },
                                    ].map((field) => (
                                        <div key={field.name}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {field.label} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required
                                                value={formData[field.name as keyof typeof formData] as string}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    ))}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Level of Participation</label>
                                        <div className="flex flex-wrap gap-4">
                                            {participationOptions.map((level) => (
                                                <label key={level} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="participationLevel"
                                                        value={level}
                                                        checked={formData.participationLevel === level}
                                                        onChange={handleInputChange}
                                                        className="w-4 h-4 text-[var(--primary-orange)] focus:ring-[var(--primary-orange)]"
                                                    />
                                                    <span className="text-gray-700">{level}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* II. Dynamic Speakers */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <SectionHeader title="II. Name of the Speakers" />
                                <p className="mb-4 text-sm text-gray-600">Select the speakers you listened to:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {currentSession?.speakers.map((speaker, idx) => (
                                        <label key={idx} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={formData.selectedSpeakers.includes(speaker)}
                                                onChange={() => handleSpeakerToggle(speaker)}
                                                className="w-5 h-5 text-[var(--primary-orange)] rounded"
                                            />
                                            <span className="text-gray-700 font-medium">{speaker}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* III. Section A: Session Content and Quality */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <SectionHeader title="III. Section A: Session Content and Quality" />
                                <StarRating label="8. Rate the session topic to your field of interest" name="rateTopicInterest" value={formData.rateTopicInterest} onChange={handleValueChange} />
                                <RadioField label="9. Were the session objectives clearly defined and achieved?" name="objectivesDefined" value={formData.objectivesDefined} onChange={handleValueChange} options={agreementOptions} />
                                <StarRating label="10. How would you rate the scientific quality of the presentations?" name="rateScientificQuality" value={formData.rateScientificQuality} onChange={handleValueChange} />
                                <RadioField label="11. Was the content supported by adequate data, references, and recent findings?" name="contentSupported" value={formData.contentSupported} onChange={handleValueChange} options={agreementOptions} />
                            </div>

                            {/* IV. Section B: Speaker and Presentation */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <SectionHeader title="IV. Section B: Speaker and Presentation" />
                                <StarRating label="12. How would you rate the speaker’s communication and presentation skills?" name="rateSpeakerSkills" value={formData.rateSpeakerSkills} onChange={handleValueChange} />
                                <RadioField label="13. Did the session encourage audience interaction and discussion?" name="encourageInteraction" value={formData.encourageInteraction} onChange={handleValueChange} options={yesNoMaybe} />
                                <RadioField label="14. Were the visuals (slides) clear and informative?" name="visualsClear" value={formData.visualsClear} onChange={handleValueChange} options={agreementOptions} />
                            </div>

                            {/* V. Section C: Organisation and Logistics */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <SectionHeader title="V. Section C: Organisation and Logistics" />
                                <RadioField label="15. Was the session duration appropriate?" name="durationAppropriate" value={formData.durationAppropriate} onChange={handleValueChange} options={durationOptions} />
                                <RadioField label="16. How satisfied are you with the overall organization of the session?" name="organizationSatisfied" value={formData.organizationSatisfied} onChange={handleValueChange} options={satisfactionOptions} />
                            </div>

                            {/* VI. Section D: Overall Experience */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <SectionHeader title="VI. Section D: Overall Experience" />
                                <StarRating label="17. Overall rating for this scientific session" name="overallRating" value={formData.overallRating} onChange={handleValueChange} />
                                <TextAreaField label="18. What did you like most about this session?" name="likedMost" value={formData.likedMost} onChange={handleInputChange} />
                                <TextAreaField label="19. What areas can be improved in future IPC scientific sessions?" name="improvements" value={formData.improvements} onChange={handleInputChange} />
                                <RadioField label="20. Would you recommend attending similar sessions in future IPC events?" name="recommendation" value={formData.recommendation} onChange={handleValueChange} options={yesNoMaybe} />
                            </div>

                            <div className="flex justify-center pt-8 pb-12">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`transform hover:-translate-y-1 transition-all duration-300 px-16 py-4 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                                </button>
                            </div>
                        </>
                    )}

                </form>
            </div>
        </div>
    );
}

export default function ScientificFeedbackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ScientificFeedbackForm />
        </Suspense>
    );
}
