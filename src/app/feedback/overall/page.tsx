"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Helper components for reusability
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

export default function OverallFeedbackPage() {
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

        // 2. Inauguration
        inaugurationGrandeur: "",
        inaugurationTimelines: "",
        venueArrangement: "",
        inaugurationSpirit: "",
        inaugurationOrganization: "",
        inaugurationSuggestions: "",

        // 3. Transport
        transportCommunication: "",
        transportPunctuality: "",
        transportComfort: "",
        transportScheduleClear: "",
        transportSuggestions: "",

        // 4. Accommodation
        accommodationQuality: "",
        accommodationLocation: "",
        accommodationSuggestions: "",

        // 5. Scientific Sessions
        scientificQuality: "",
        scientificExpertise: "",
        scientificRelevant: "",
        scientificEffective: "",
        scientificSuggestions: "",

        // 6. Catering
        cateringQuality: "",
        cateringVariety: "",
        cateringHygiene: "",
        cateringTimings: "",
        cateringComfort: "",
        cateringSuggestions: "",

        // 7. Cultural Program
        culturalOrganization: "",
        culturalQuality: "",
        culturalDuration: "",
        culturalVenue: "",
        culturalSuggestions: "",

        // 8. Venue
        venueAccessibility: "",
        venueAdequacy: "",
        venueCleanliness: "",
        venueRestroom: "",
        venueWater: "",
        venueWifi: "",
        venueCrowd: "",
        venueOverall: "",

        // 9. Hospitality
        hospitalityCourtesy: "",
        hospitalityEfficiency: "",
        hospitalityVolunteers: "",
        hospitalityResponsiveness: "",
        hospitalityOverall: "",
        hospitalitySatisfactory: "",
        hospitalityImprovement: "",

        // 10. Exhibition
        exhibitionSatisfaction: "",
        exhibitionInnovative: "",
        exhibitionSatisfactory: "",
        exhibitionImprovement: "",

        // 11. General
        generalEnjoyed: "",
        generalImprove: "",
        generalRecommend: "",
        generalComments: "",
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
            const response = await fetch("/api/feedback/overall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Thank you for your extensive feedback!");
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


    const scalePoorExcellent = { "1": "Poor", "5": "Excellent" };
    const scaleUnsatisfiedSatisfied = { "1": "Very Unsatisfied", "5": "Very Satisfied" };
    const scaleIneffectiveEffective = { "1": "Very Ineffective", "5": "Very Effective" };
    const scaleVenue = ["Excellent", "Good", "Average", "Poor"];
    const scaleWifi = [...scaleVenue, "Not Available"];
    const optionsYesNoSomewhat = ["Yes", "No", "Somewhat"];
    const optionsAgreement = ["Strongly Agree", "Agree", "Neutral", "Disagree"];
    const optionsInnovation = ["Yes", "Partly", "No"];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-t-2xl shadow-lg p-8 mb-6 border-t-4 border-[var(--primary-orange)]">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        74th Indian Pharmaceutical Congress
                    </h1>
                    <h2 className="text-xl font-semibold text-[var(--primary-green)] mb-6 text-center">
                        IPC 2025 – Overall Feedback Form
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base text-center max-w-2xl mx-auto">
                        Thank you for participating in the 74th Indian Pharmaceutical Congress (IPC 2025). Your feedback is valuable in helping us improve future IPCs.
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
                                        value={formData[field.name as keyof typeof formData]}
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
                                    {["Delegate", "Speaker", "Organizer", "Volunteer", "Exhibitor", "Other"].map((level) => (
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

                    {/* 2. Feedback on Inauguration Ceremony */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Feedback on Inauguration Ceremony" index={1} />
                        <RatingField label="How would you rate the grandeur of the inauguration program?" name="inaugurationGrandeur" value={formData.inaugurationGrandeur} onChange={handleValueChange} labels={scalePoorExcellent} />
                        <RatingField label="How would rate the timelines duration of the program?" name="inaugurationTimelines" value={formData.inaugurationTimelines} onChange={handleValueChange} labels={scalePoorExcellent} />
                        <RadioField label="Was the venue arrangement (seating, sound system, lighting) comfortable and effective?" name="venueArrangement" value={formData.venueArrangement} onChange={handleValueChange} options={optionsYesNoSomewhat} />
                        <RadioField label="Do you feel the inauguration ceremony reflected the spirit and importance of the conference?" name="inaugurationSpirit" value={formData.inaugurationSpirit} onChange={handleValueChange} options={optionsAgreement} />
                        <RatingField label="How satisfied were you with the overall organization of the inauguration ceremony?" name="inaugurationOrganization" value={formData.inaugurationOrganization} onChange={handleValueChange} labels={scaleUnsatisfiedSatisfied} />
                        <TextAreaField label="Please share any suggestions to improve future inauguration ceremonies." name="inaugurationSuggestions" value={formData.inaugurationSuggestions} onChange={handleInputChange} />
                    </div>

                    {/* 3. Feedback on Transport */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Feedback on Transport" index={2} />
                        <RatingField label="Whether the communication regarding transport was clear and timely?" name="transportCommunication" value={formData.transportCommunication} onChange={handleValueChange} labels={scaleUnsatisfiedSatisfied} />
                        <RatingField label="How satisfied were you with the punctuality of the transport services?" name="transportPunctuality" value={formData.transportPunctuality} onChange={handleValueChange} labels={scaleUnsatisfiedSatisfied} />
                        <RatingField label="How would you rate the comfort and cleanliness of the vehicles provided?" name="transportComfort" value={formData.transportComfort} onChange={handleValueChange} labels={scalePoorExcellent} />
                        <RadioField label="Was the communication regarding transport schedules clear and timely?" name="transportScheduleClear" value={formData.transportScheduleClear} onChange={handleValueChange} options={optionsYesNoSomewhat} />
                        <TextAreaField label="Do you have any suggestions to improve transport arrangements for future conferences?" name="transportSuggestions" value={formData.transportSuggestions} onChange={handleInputChange} />
                    </div>

                    {/* 4. Feedback on Accommodation */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Feedback on Accommodation" index={3} />
                        <RatingField label="How satisfied were you with the quality of your accommodation (cleanliness, comfort, facilities)?" name="accommodationQuality" value={formData.accommodationQuality} onChange={handleValueChange} labels={scaleUnsatisfiedSatisfied} />
                        <RadioField label="Was your accommodation conveniently located in relation to the conference venue?" name="accommodationLocation" value={formData.accommodationLocation} onChange={handleValueChange} options={optionsYesNoSomewhat} />
                        <TextAreaField label="Please share suggestions to improve accommodation arrangements for future conferences." name="accommodationSuggestions" value={formData.accommodationSuggestions} onChange={handleInputChange} />
                    </div>

                    {/* 5. Feedback on Scientific Sessions */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Feedback on Scientific Sessions" index={4} />
                        <RatingField label="How satisfied were you with the quality of the scientific presentations (content, relevance, clarity)?" name="scientificQuality" value={formData.scientificQuality} onChange={handleValueChange} labels={scaleUnsatisfiedSatisfied} />
                        <RatingField label="How would you rate the expertise and delivery of the speakers?" name="scientificExpertise" value={formData.scientificExpertise} onChange={handleValueChange} labels={scalePoorExcellent} />
                        <RadioField label="Were the topics covered in the scientific sessions relevant and useful to your professional interests?" name="scientificRelevant" value={formData.scientificRelevant} onChange={handleValueChange} options={optionsYesNoSomewhat} />
                        <RatingField label="How effective were the session arrangements (time management, Q&A opportunities, and technical support)?" name="scientificEffective" value={formData.scientificEffective} onChange={handleValueChange} labels={scaleIneffectiveEffective} />
                        <TextAreaField label="Please share any suggestions to improve future scientific sessions." name="scientificSuggestions" value={formData.scientificSuggestions} onChange={handleInputChange} />
                    </div>

                    {/* 6. Catering Feedback */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Catering Feedback" index={5} />
                        <RatingField label="How satisfied were you with the quality and taste of the food served during the conference?" name="cateringQuality" value={formData.cateringQuality} onChange={handleValueChange} labels={scaleUnsatisfiedSatisfied} />
                        <RadioField label="Was the variety of food options (vegetarian, non-vegetarian, regional, dietary needs) adequate?" name="cateringVariety" value={formData.cateringVariety} onChange={handleValueChange} options={optionsYesNoSomewhat} />
                        <RatingField label="How would you rate the hygiene and cleanliness of the catering arrangements?" name="cateringHygiene" value={formData.cateringHygiene} onChange={handleValueChange} labels={scalePoorExcellent} />
                        <RadioField label="Were the meal timings convenient and well-coordinated with the conference schedule?" name="cateringTimings" value={formData.cateringTimings} onChange={handleValueChange} options={optionsYesNoSomewhat} />
                        <RatingField label="How would rate the comfort and smooth functioning in dining?" name="cateringComfort" value={formData.cateringComfort} onChange={handleValueChange} labels={scalePoorExcellent} />
                        <TextAreaField label="Please share any suggestions to improve catering arrangements for future conferences." name="cateringSuggestions" value={formData.cateringSuggestions} onChange={handleInputChange} />
                    </div>

                    {/* 7. Cultural Program Feedback */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Cultural Program Feedback" index={6} />
                        <RatingField label="How satisfied were you with the overall organization and flow of the cultural program?" name="culturalOrganization" value={formData.culturalOrganization} onChange={handleValueChange} labels={scaleUnsatisfiedSatisfied} />
                        <RatingField label="How would you rate the quality and diversity of performances?" name="culturalQuality" value={formData.culturalQuality} onChange={handleValueChange} labels={scalePoorExcellent} />
                        <RadioField label="Was the duration of the cultural program appropriate and engaging?" name="culturalDuration" value={formData.culturalDuration} onChange={handleValueChange} options={optionsYesNoSomewhat} />
                        <RatingField label="How effective were the venue arrangements during the cultural program?" name="culturalVenue" value={formData.culturalVenue} onChange={handleValueChange} labels={scaleIneffectiveEffective} />
                        <TextAreaField label="Please share any suggestions to improve future cultural programs." name="culturalSuggestions" value={formData.culturalSuggestions} onChange={handleInputChange} />
                    </div>

                    {/* 8. Feedback on Venue */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Feedback on Venue" index={7} />
                        <RadioField label="How would you rate the accessibility of the venue from major transportation hubs?" name="venueAccessibility" value={formData.venueAccessibility} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Rate the adequacy of conference halls (size, layout, seating, AV arrangement)." name="venueAdequacy" value={formData.venueAdequacy} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Cleanliness and maintenance of the venue" name="venueCleanliness" value={formData.venueCleanliness} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Restroom cleanliness and availability" name="venueRestroom" value={formData.venueRestroom} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Availability of drinking water and refreshments" name="venueWater" value={formData.venueWater} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Internet/Wi-Fi connectivity at the venue" name="venueWifi" value={formData.venueWifi} onChange={handleValueChange} options={scaleWifi} />
                        <RadioField label="How would you rate crowd management during sessions, breaks, and registration?" name="venueCrowd" value={formData.venueCrowd} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Your overall satisfaction with the conference venue" name="venueOverall" value={formData.venueOverall} onChange={handleValueChange} options={scaleVenue} />
                    </div>

                    {/* 9. Feedback on Hospitality */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Feedback on Hospitality" index={8} />
                        <RadioField label="Courtesy and professionalism of the registration desk staff:" name="hospitalityCourtesy" value={formData.hospitalityCourtesy} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Efficiency and speed of the registration process:" name="hospitalityEfficiency" value={formData.hospitalityEfficiency} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Availability of volunteers and staff to guide or support participants:" name="hospitalityVolunteers" value={formData.hospitalityVolunteers} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="How would you rate the responsiveness of the hospitality team to queries or concerns?" name="hospitalityResponsiveness" value={formData.hospitalityResponsiveness} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Overall satisfaction with hospitality during the congress:" name="hospitalityOverall" value={formData.hospitalityOverall} onChange={handleValueChange} options={scaleVenue} />
                        <TextAreaField label="What aspects of hospitality were most satisfactory?" name="hospitalitySatisfactory" value={formData.hospitalitySatisfactory} onChange={handleInputChange} />
                        <TextAreaField label="What aspects need improvement?" name="hospitalityImprovement" value={formData.hospitalityImprovement} onChange={handleInputChange} />
                    </div>

                    {/* 10. Feedback on Exhibition */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="Feedback on Exhibition" index={9} />
                        <RadioField label="Overall satisfaction with the pharmaceutical exhibition:" name="exhibitionSatisfaction" value={formData.exhibitionSatisfaction} onChange={handleValueChange} options={scaleVenue} />
                        <RadioField label="Did the exhibition introduce innovative products/technologies relevant to your field?" name="exhibitionInnovative" value={formData.exhibitionInnovative} onChange={handleValueChange} options={optionsInnovation} />
                        <TextAreaField label="What aspects of the exhibition were most satisfactory?" name="exhibitionSatisfactory" value={formData.exhibitionSatisfactory} onChange={handleInputChange} />
                        <TextAreaField label="What aspects require improvement?" name="exhibitionImprovement" value={formData.exhibitionImprovement} onChange={handleInputChange} />
                    </div>

                    {/* 11. General Feedback */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <SectionHeader title="General Feedback on 74th IPC" index={10} />
                        <TextAreaField label="What did you enjoy most about IPC 2025?" name="generalEnjoyed" value={formData.generalEnjoyed} onChange={handleInputChange} />
                        <TextAreaField label="What could be improved in future IPCs?" name="generalImprove" value={formData.generalImprove} onChange={handleInputChange} />
                        <TextAreaField label="Would you recommend IPC to others in your field?" name="generalRecommend" value={formData.generalRecommend} onChange={handleInputChange} />
                        <TextAreaField label="Any additional comments or reflections?" name="generalComments" value={formData.generalComments} onChange={handleInputChange} />
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
