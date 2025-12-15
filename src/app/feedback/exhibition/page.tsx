"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Reuse components where possible
const SectionHeader = ({ title, index }: { title: string; index?: number }) => (
    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
        {index ? `${index}. ` : ""}{title}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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


export default function ExhibitionFeedbackPage() {
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

        // Section 1: Days of Visit
        daysOfVisit: "",

        // Section 2: Zones Visited
        zonesVisited: [] as string[],

        // Section 3: Exhibition Layout and Logistics
        layoutOrganization: "",
        stallVisibility: "",
        spaceAdequacy: "",
        signageQuality: "",

        // Section 4: Exhibitor Quality and Interaction
        diversityRelevance: "",
        infoQuality: "",
        professionalism: "",

        // Section 5: Infrastructure and Facilities
        ambience: "",
        cleanliness: "",
        seatingAvailability: "",

        // Section 6: Overall Satisfaction
        overallSatisfaction: "",
        innovativeProducts: "",
        satisfiedAspects: "",
        improvementAspects: "",
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

    const handleZonesChange = (newValues: string[]) => {
        setFormData(prev => ({ ...prev, zonesVisited: newValues }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            zonesVisited: formData.zonesVisited.join(", "),
        };

        try {
            const response = await fetch("/api/feedback/exhibition", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thank you for your feedback on the Exhibition!");
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

    const scaleRating = ["Excellent", "Good", "Average", "Poor"];
    const scaleDays = ["1 Day", "2 Days", "All 3 Days"];
    const scaleSeating = ["Adequate", "Limited", "Not Available"];
    const optionsInnovation = ["Yes", "Partly", "No"];

    const zoneOptions = [
        "Pharmaceutical Manufacturing Machineries",
        "R&D Equipment",
        "Pharmaceutical products",
        "Herbal Drug Products",
        "Education stalls Universities, Colleges, Skill Development",
        "Startups",
        "Publishers"
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-t-2xl shadow-lg p-8 mb-6 border-t-4 border-[var(--primary-orange)]">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        74th Indian Pharmaceutical Congress
                    </h1>
                    <h2 className="text-xl font-semibold text-[var(--primary-green)] mb-6 text-center">
                        Exhibition Feedback Form
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base text-center max-w-2xl mx-auto">
                        Thank you for participating in the 74th Indian Pharmaceutical Congress (IPC 2025). Your feedback is valuable in helping us improve future exhibitions. Kindly spare 2 minutes of your valuable time to provide feedback.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Personal Details */}
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

                    {/* Section 1 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Days of Visits" index={1} />
                        <RadioField
                            label="How many days did you visit the exhibition?"
                            name="daysOfVisit"
                            value={formData.daysOfVisit}
                            onChange={handleValueChange}
                            options={scaleDays}
                        />
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Exhibition Zones & Stalls" index={2} />
                        <CheckboxGroup
                            label="Which exhibition zones did you visit?"
                            options={zoneOptions}
                            selectedValues={formData.zonesVisited}
                            onChange={handleZonesChange}
                        />
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Exhibition Layout and Logistics" index={3} />
                        <RadioField label="How would you rate the overall layout and organization of the exhibition area?" name="layoutOrganization" value={formData.layoutOrganization} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Visibility and accessibility of stalls/booths:" name="stallVisibility" value={formData.stallVisibility} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Adequacy of space for movement and crowd management:" name="spaceAdequacy" value={formData.spaceAdequacy} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Quality of signage and directions within the exhibition hall:" name="signageQuality" value={formData.signageQuality} onChange={handleValueChange} options={scaleRating} />
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Exhibitor Quality and Interaction" index={4} />
                        <RadioField label="Diversity and relevance of pharmaceutical companies/products on display:" name="diversityRelevance" value={formData.diversityRelevance} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Quality of scientific/technical information provided at booths:" name="infoQuality" value={formData.infoQuality} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Professionalism and knowledge of company representatives:" name="professionalism" value={formData.professionalism} onChange={handleValueChange} options={scaleRating} />
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Infrastructure and Facilities" index={5} />
                        <RadioField label="Lighting, ventilation, and overall ambience of the exhibition area:" name="ambience" value={formData.ambience} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Cleanliness and maintenance of the exhibition hall:" name="cleanliness" value={formData.cleanliness} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Availability of seating/rest zones for participants:" name="seatingAvailability" value={formData.seatingAvailability} onChange={handleValueChange} options={scaleSeating} />
                    </div>

                    {/* Section 6 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Overall Satisfaction" index={6} />
                        <RadioField label="Overall satisfaction with the pharmaceutical exhibition:" name="overallSatisfaction" value={formData.overallSatisfaction} onChange={handleValueChange} options={scaleRating} />
                        <RadioField label="Did the exhibition introduce innovative products/technologies relevant to your field?" name="innovativeProducts" value={formData.innovativeProducts} onChange={handleValueChange} options={optionsInnovation} />
                        <TextAreaField label="What aspects of the exhibition were most satisfactory?" name="satisfiedAspects" value={formData.satisfiedAspects} onChange={handleInputChange} />
                        <TextAreaField label="What aspects require improvement?" name="improvementAspects" value={formData.improvementAspects} onChange={handleInputChange} />
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
