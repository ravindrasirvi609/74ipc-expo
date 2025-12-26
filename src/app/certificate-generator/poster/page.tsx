import PosterCertificateGenerator from "@/components/PosterCertificateGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Poster Certificate Generator | 74th IPC Expo",
    description:
        "Generate personalized poster presentation certificates for 74th IPC Expo participants. Enter your poster code to download your certificate instantly.",
};

export default function PosterCertificatePage() {
    return <PosterCertificateGenerator />;
}
