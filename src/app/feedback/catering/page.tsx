"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Reuse components where possible
const SectionHeader = ({ title, index }: { title: string; index: number }) => (
    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
        {index}. {title}
    </h3>
);

const RatingField = ({
    label,
    name,
    value,
    onChange,
    scale = ["1", "2", "3", "4", "5"],
    labels,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (name: string, value: string) => void;
    scale?: string[];
    labels?: { [key: string]: string };
}) => (
    <div className="mb-6">
        <label className="block text-base font-medium text-gray-800 mb-3">
            {label} <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-3">
            {scale.map((rating) => (
                <button
                    key={rating}
                    type="button"
                    onClick={() => onChange(name, rating)}
                    className={`flex-1 min-w-[3rem] h-10 px-3 rounded-full flex items-center justify-center font-bold transition-all border ${value === rating
                        ? "bg-[var(--primary-orange)] text-white ring-2 ring-orange-200 border-transparent shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                    title={labels ? labels[rating] : undefined}
                >
                    {rating}
                </button>
            ))}
        </div>
        {labels && (
            <div className="flex justify-between mt-2 text-xs text-gray-500 px-1">
                <span>{labels[scale[0]]}</span>
                <span>{labels[scale[scale.length - 1]]}</span>
            </div>
        )}
    </div>
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
            {label} <span className="text-red-500">*</span>
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

const CheckboxGroup = ({
    label,
    options,
    selectedValues,
    onChange,
}: {
    label: string;
    options: string[];
    selectedValues: string[];
    onChange: (newValues: string[]) => void;
}) => {
    const toggleValue = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-base font-medium text-gray-800 mb-3">
                {label}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {options.map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(option)}
                            onChange={() => toggleValue(option)}
                            className="w-5 h-5 text-[var(--primary-orange)] rounded focus:ring-[var(--primary-orange)]"
                        />
                        <span className="text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};


export default function CateringFeedbackPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        // 1. Personal Details
        email: "",
        fullName: "",
        designation: "",
        affiliation: "",
        mobileNumber: "",
        participationLevel: "",
        participationLevelOther: "",

        // Check boxes (Meals Attended)
        mealsAttended: [] as string[],

        // 7. Overall quality of food
        foodQuality: "",
        // 8. Taste of food items
        foodTaste: "",
        // 9. Freshness of food items
        foodFreshness: "",
        // 10. Variety in food menu
        foodVariety: "",
        // 11. Serving temperature of food
        servingTemperature: "",
        // 12. Portion size in food items
        portionSize: "",

        // Hygiene & Service
        // 31. Cleanliness of dining & service areas
        cleanliness: "",
        // 32. Professionalism & behaviour of catering staff
        professionalism: "",

        // Section 8: Overall Experience
        // 33. How do you rate comfort and smooth functioning in dining
        diningComfort: "", // 0 to 5
        // 34. Overall satisfaction
        overallSatisfaction: "",
        // 35. What did you like the most?
        likedMost: "",
        // 36. Suggestions for improvement
        suggestions: "",
        // 37. Any additional comments
        comments: "",
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

    const handleMealsChange = (newValues: string[]) => {
        setFormData(prev => ({ ...prev, mealsAttended: newValues }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            mealsAttended: formData.mealsAttended.join(", "),
        };

        try {
            const response = await fetch("/api/feedback/catering", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thank you for your catering feedback!");
                router.push("/feedback");
            } else {
                alert(result.error || "Failed to submit feedback. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An unexpected error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const scaleFreshness = ["Very Fresh", "Fresh", "Acceptable", "Not Fresh"];
    const scaleVariety = ["Very Good", "Good", "Limited", "Very Limited"];
    const scaleTemperature = ["Perfect", "Acceptable", "Needs Improvement"];
    const scalePortion = ["More than sufficient", "Sufficient", "Adequate", "Insufficient"];
    const scaleQuality = ["Excellent", "Good", "Average", "Poor"]; // Matches PDF Q31
    const scaleProfessionalism = ["Excellent", "Good", "Satisfactory", "Needs Improvement"]; // Matches PDF Q32
    const scaleComfort = ["0", "1", "2", "3", "4", "5"]; // Matches PDF Q33
    const scaleSatisfaction = ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"];

    const mealOptions = [
        "19th Dec Breakfast", "19th Dec Lunch", "19th Dec Dinner",
        "20th Dec Breakfast", "20th Dec Lunch", "20th Dec Dinner",
        "21st Dec Breakfast", "21st Dec Lunch", "21st Dec High Tea"
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-t-2xl shadow-lg p-8 mb-6 border-t-4 border-[var(--primary-orange)]">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        74th Indian Pharmaceutical Congress
                    </h1>
                    <h2 className="text-xl font-semibold text-[var(--primary-green)] mb-6 text-center">
                        Catering Committee – Feedback Form
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base text-center max-w-2xl mx-auto">
                        Thank you for participating in the 74th Indian Pharmaceutical Congress (IPC 2025). Your feedback is valuable in helping us enhance the quality of food, beverages, snacks, and overall catering services for future IPC events. Kindly spare 2 minutes to provide your feedback.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Personal Details */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Personal Details</h3>
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
                                    {["Delegate", "Speaker", "Organiser", "Volunteer", "Exhibitor", "Other"].map((level) => (
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

                    {/* Meals Attended */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Meals Attended</h3>
                        <CheckboxGroup
                            label="Please select the meals you utilized:"
                            options={mealOptions}
                            selectedValues={formData.mealsAttended}
                            onChange={handleMealsChange}
                        />
                    </div>

                    {/* Food Quality */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Food Quality & Variety" index={7} />

                        <div className="mb-6">
                            <label className="block text-base font-medium text-gray-800 mb-3">
                                7. Overall quality of food <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {["Excellent", "Good", "Average", "Poor", "Very Poor"].map(opt => (
                                    <button
                                        key={opt} type="button" onClick={() => handleValueChange("foodQuality", opt)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all border ${formData.foodQuality === opt ? "bg-[var(--primary-green)] text-white shadow-md border-transparent" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
                                    >{opt}</button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-base font-medium text-gray-800 mb-3">
                                8. Taste of food items <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {["Excellent", "Good", "Average", "Poor"].map(opt => (
                                    <button
                                        key={opt} type="button" onClick={() => handleValueChange("foodTaste", opt)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all border ${formData.foodTaste === opt ? "bg-[var(--primary-green)] text-white shadow-md border-transparent" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
                                    >{opt}</button>
                                ))}
                            </div>
                        </div>

                        <RadioField label="9. Freshness of food items" name="foodFreshness" value={formData.foodFreshness} onChange={handleValueChange} options={scaleFreshness} />
                        <RadioField label="10. Variety in food menu" name="foodVariety" value={formData.foodVariety} onChange={handleValueChange} options={scaleVariety} />
                        <RadioField label="11. Serving temperature of food" name="servingTemperature" value={formData.servingTemperature} onChange={handleValueChange} options={scaleTemperature} />
                        <RadioField label="12. Portion size in food items" name="portionSize" value={formData.portionSize} onChange={handleValueChange} options={scalePortion} />
                    </div>

                    {/* Hygiene & Service */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Hygiene & Service</h3>
                        <RadioField label="31. Cleanliness of dining & service areas" name="cleanliness" value={formData.cleanliness} onChange={handleValueChange} options={scaleQuality} />
                        <RadioField label="32. Professionalism & behaviour of catering staff" name="professionalism" value={formData.professionalism} onChange={handleValueChange} options={scaleProfessionalism} />
                    </div>

                    {/* Overall Experience */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Overall Experience" index={8} />
                        <RatingField
                            label="33. How do you rate comfort and smooth functioning in dining?"
                            name="diningComfort"
                            value={formData.diningComfort}
                            onChange={handleValueChange}
                            scale={scaleComfort}
                        />
                        <RadioField label="34. Overall satisfaction with catering arrangements at IPC 2025" name="overallSatisfaction" value={formData.overallSatisfaction} onChange={handleValueChange} options={scaleSatisfaction} />
                        <TextAreaField label="35. What did you like the most?" name="likedMost" value={formData.likedMost} onChange={handleInputChange} />
                        <TextAreaField label="36. Suggestions for improvement" name="suggestions" value={formData.suggestions} onChange={handleInputChange} />
                        <TextAreaField label="37. Any additional comments" name="comments" value={formData.comments} onChange={handleInputChange} placeholder="Paragraph" />
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

                </form>
            </div>
        </div>
    );
}
