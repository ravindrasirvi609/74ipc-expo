import CertificateGenerator from "@/components/CertificateGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certificate Generator | 74th IPC Expo",
    description:
        "Generate personalized certificates for 74th IPC Expo participants. Upload your template, enter registration details, and download instantly.",
};

export default function CertificateGeneratorPage() {
    return <CertificateGenerator />;
}
