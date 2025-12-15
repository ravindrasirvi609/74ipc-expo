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

export default function PosterFeedbackPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        // Personal
        email: "",
        fullName: "",
        designation: "",
        affiliation: "",
        mobileNumber: "",
        participationLevel: "", // Used to toggle sections
        participationLevelOther: "",

        // General (Delegate/Volunteer/Evaluator)
        visualAppeal: "",
        contentClear: "",
        conveyResearch: "",
        visualsInformative: "",
        citationsAdequate: "",
        noveltyHighlight: "",
        strengthsSuggestions: "",
        overallRating: "",

        // Presenter Feedback
        spaceAllotted: "",
        volunteersAssigned: "",
        satisfiedEvaluation: "",
        evaluatorRelevance: "",
        evaluatorTime: "",

        // Overall
        recommendation: "",
        additionalComments: "",
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
            const response = await fetch("/api/feedback/poster", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thank you for your Poster Presentation feedback!");
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

    const scale1to5 = ["1", "2", "3", "4", "5"];
    const optionsYesNo = ["Yes", "No"];

    const role = formData.participationLevel;
    const isPresenter = role === "Presenter";

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-t-2xl shadow-lg p-8 mb-6 border-t-4 border-[var(--primary-orange)]">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        74th IPC 2025
                    </h1>
                    <h2 className="text-xl font-semibold text-[var(--primary-green)] mb-6 text-center">
                        Poster Presentation Feedback
                    </h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        Please provide your feedback.
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
                                    {["Delegate", "Volunteer", "Evaluator", "Presenter", "Organiser", "Exhibitor", "Other"].map((level) => (
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

                    {/* General / Evaluator View (Not Presenter) */}
                    {!isPresenter && role && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <SectionHeader title="Poster Feedback" />
                            <RadioField label="How visually appealing was the poster design? (1-5)" name="visualAppeal" value={formData.visualAppeal} onChange={handleValueChange} options={scale1to5} />
                            <RadioField label="Was the content clear and well-organized? (1-5)" name="contentClear" value={formData.contentClear} onChange={handleValueChange} options={scale1to5} />
                            <RadioField label="Did the poster effectively convey the research? (Yes/No)" name="conveyResearch" value={formData.conveyResearch} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="How informative were the visuals? (1-5)" name="visualsInformative" value={formData.visualsInformative} onChange={handleValueChange} options={scale1to5} />
                            <RadioField label="Were citations adequate? (Yes/No)" name="citationsAdequate" value={formData.citationsAdequate} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="How well did it highlight novelty? (1-5)" name="noveltyHighlight" value={formData.noveltyHighlight} onChange={handleValueChange} options={scale1to5} />
                            <TextAreaField label="Strengths and suggestions" name="strengthsSuggestions" value={formData.strengthsSuggestions} onChange={handleInputChange} />
                            <RadioField label="Overall rating (1-5)" name="overallRating" value={formData.overallRating} onChange={handleValueChange} options={scale1to5} />
                        </div>
                    )}

                    {/* Presenter View */}
                    {isPresenter && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <SectionHeader title="Presenter Feedback" />
                            <RadioField label="Adequate space allotted for the poster?" name="spaceAllotted" value={formData.spaceAllotted} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="Sufficient volunteers assigned?" name="volunteersAssigned" value={formData.volunteersAssigned} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="Satisfied with evaluation process?" name="satisfiedEvaluation" value={formData.satisfiedEvaluation} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="Question asked relevant to topic?" name="evaluatorRelevance" value={formData.evaluatorRelevance} onChange={handleValueChange} options={optionsYesNo} />
                            <RadioField label="Evaluators present on time?" name="evaluatorTime" value={formData.evaluatorTime} onChange={handleValueChange} options={optionsYesNo} />
                        </div>
                    )}

                    {/* Overall Section (Always visible if role selected) */}
                    {role && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <SectionHeader title="Overall" />
                            <TextAreaField label="Would you recommend this presentation for future conferences? (Yes/No/Why?)" name="recommendation" value={formData.recommendation} onChange={handleInputChange} />
                            <TextAreaField label="Any additional comments" name="additionalComments" value={formData.additionalComments} onChange={handleInputChange} />
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
