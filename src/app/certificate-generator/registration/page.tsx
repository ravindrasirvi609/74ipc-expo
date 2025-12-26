import DelegateCertificateGenerator from "@/components/DelegateCertificateGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Delegate Certificate Generator | 74th IPC Expo",
    description:
        "Generate personalized delegate certificates for 74th IPC Expo participants. Enter your registration number to download your certificate instantly.",
};

export default function RegistrationCertificatePage() {
    return <DelegateCertificateGenerator />;
}
