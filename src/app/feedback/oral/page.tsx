"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Reuse components
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

export default function OralFeedbackPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        // Personal
        email: "",
        fullName: "",
        designation: "",
        affiliation: "",
        mobileNumber: "",
        participationLevel: "",
        participationLevelOther: "",

        // Delegate / Standard role questions
        presenterDelivery: "",
        pacingAppropriate: "",
        contentMatch: "",
        qaInteraction: "",
        valuableComment: "",
        attendSimilar: "",

        // Volunteer questions
        organizerCommunication: "",
        volunteerEnjoyable: "",
        volunteerImprovements: "",
        volunteerAgain: "",

        // Presenter questions
        organizationStructure: "",
        evaluatorQuestions: "",
        avFacilities: "",
        audienceEngagement: "",
        timeAllotted: "",
        presenterOverall: "",
        presenterImprovements: "",

        // Evaluator questions
        presenterArticulation: "",
        presenterPace: "",
        presenterEngaged: "",
        slidesClear: "",
        presenterResponse: "",
        presentationCount: "",
        presentationRelevant: "",
        evaluatorAV: "",
        evaluatorChallenges: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleValueChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/feedback/oral", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thank you for your feedback on Oral Presentations!");
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

    const scalePoorExcellent = ["Poor", "Average", "Good", "Excellent"];
    const optionsYesNo = ["Yes", "No"];
    const optionsYesNoMaybe = ["Yes", "No", "Maybe"];

    // Determine which section to show based on role
    const role = formData.participationLevel;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-t-2xl shadow-lg p-8 mb-6 border-t-4 border-[var(--primary-orange)]">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        74th IPC 2025
                    </h1>
                    <h2 className="text-xl font-semibold text-[var(--primary-green)] mb-6 text-center">
                        Oral Presentation Feedback
                    </h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        Please provide your feedback based on your role.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Personal Details */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Personal Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "1. Email Id", name: "email", type: "email" },
                                { label: "2. Full Name", name: "fullName", type: "text" },
                                { label: "3. Designation", name: "designation", type: "text" },
                                { label: "4. Affiliation", name: "affiliation", type: "text" },
                                { label: "5. Mobile number", name: "mobileNumber", type: "tel" },
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    6. Level of participation <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {["Delegate", "Speaker", "Organiser", "Volunteer", "Exhibitor", "Evaluator", "Presenter", "Other"].map((level) => (
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
                                {formData.participationLevel === "Other" && (
                                    <input
                                        type="text"
                                        name="participationLevelOther"
                                        value={formData.participationLevelOther}
                                        onChange={handleInputChange}
                                        placeholder="Please specify"
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)]"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Conditional Sections based on Role */}

                    {/* Role: Delegate / Speaker / Organiser / Exhibitor / Other / (Default view) */}
                    {(["Delegate", "Speaker", "Organiser", "Exhibitor", "Other"].includes(role) || !role) && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <SectionHeader title="Feedback Questions" />
                            <RadioField label="1. How engaging was the presenter's delivery?" name="presenterDelivery" value={formData.presenterDelivery} onChange={handleValueChange} options={scalePoorExcellent} />
                            <RadioField label="2. Was the pacing appropriate?" name="pacingAppropriate" value={formData.pacingAppropriate} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="3. Did the content match the session description?" name="contentMatch" value={formData.contentMatch} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="4. How effective was the Q&A interaction?" name="qaInteraction" value={formData.qaInteraction} onChange={handleValueChange} options={scalePoorExcellent} />
                            <TextAreaField label="5. What was most/least valuable?" name="valuableComment" value={formData.valuableComment} onChange={handleInputChange} />
                            <RadioField label="6. Would you attend similar sessions?" name="attendSimilar" value={formData.attendSimilar} onChange={handleValueChange} options={optionsYesNoMaybe} />
                        </div>
                    )}

                    {/* Role: Volunteer */}
                    {role === "Volunteer" && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <SectionHeader title="Volunteer Feedback" />
                            <RadioField label="7. Was communication from organizers effective?" name="organizerCommunication" value={formData.organizerCommunication} onChange={handleValueChange} options={scalePoorExcellent} />
                            <RadioField label="8. How enjoyable was the volunteer experience?" name="volunteerEnjoyable" value={formData.volunteerEnjoyable} onChange={handleValueChange} options={scalePoorExcellent} />
                            <TextAreaField label="9. What improvements for future roles?" name="volunteerImprovements" value={formData.volunteerImprovements} onChange={handleInputChange} />
                            <RadioField label="10. Would you volunteer again?" name="volunteerAgain" value={formData.volunteerAgain} onChange={handleValueChange} options={optionsYesNo} />
                        </div>
                    )}

                    {/* Role: Presenter */}
                    {role === "Presenter" && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <SectionHeader title="Presenter Feedback" />
                            <RadioField label="1. Organization and Structure" name="organizationStructure" value={formData.organizationStructure} onChange={handleValueChange} options={scalePoorExcellent} />
                            <RadioField
                                label="2. Core Content questions by evaluators"
                                name="evaluatorQuestions"
                                value={formData.evaluatorQuestions}
                                onChange={handleValueChange}
                                options={["Appropriate", "Very relevant", "Not relevant"]}
                            />
                            <RadioField label="3. Audio visual facilities provided" name="avFacilities" value={formData.avFacilities} onChange={handleValueChange} options={scalePoorExcellent} />
                            <RadioField label="4. How effective was audience engagement?" name="audienceEngagement" value={formData.audienceEngagement} onChange={handleValueChange} options={scalePoorExcellent} />
                            <RadioField label="5. The allotted time for the presentation" name="timeAllotted" value={formData.timeAllotted} onChange={handleValueChange} options={["Less", "Sufficient"]} />
                            <TextAreaField label="6. Overall experience comment" name="presenterOverall" value={formData.presenterOverall} onChange={handleInputChange} />
                            <TextAreaField label="7. Any other comments for improvements" name="presenterImprovements" value={formData.presenterImprovements} onChange={handleInputChange} />
                        </div>
                    )}

                    {/* Role: Evaluator */}
                    {role === "Evaluator" && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <SectionHeader title="Evaluator Feedback" />
                            <RadioField label="1. The presenter articulated the content clearly and audibly." name="presenterArticulation" value={formData.presenterArticulation} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="2. The presenter maintained appropriate pace and avoided excessive reading." name="presenterPace" value={formData.presenterPace} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="3. The presenter engaged the audience effectively." name="presenterEngaged" value={formData.presenterEngaged} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="4. Slides/visual aids were clear and accurate." name="slidesClear" value={formData.slidesClear} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="5. The presenters responded to questions accurately." name="presenterResponse" value={formData.presenterResponse} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="6. Number of presentations allotted for me is" name="presentationCount" value={formData.presentationCount} onChange={handleValueChange} options={["Appropriate", "More", "Less"]} />
                            <RadioField label="7. Presentation allotted to me relevant to my trust area" name="presentationRelevant" value={formData.presentationRelevant} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="8. Audio visual facilities and sitting arrangements" name="evaluatorAV" value={formData.evaluatorAV} onChange={handleValueChange} options={scalePoorExcellent} />
                            <TextAreaField label="9. Challenges faced / Suggestions" name="evaluatorChallenges" value={formData.evaluatorChallenges} onChange={handleInputChange} />
                        </div>
                    )}


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

                </form>
            </div>
        </div>
    );
}
