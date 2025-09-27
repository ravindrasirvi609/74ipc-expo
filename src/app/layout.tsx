import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "74th Indian Pharmaceutical Congress 2025 | AI & Technology in Pharma",
  description:
    "Join us at the 74th Indian Pharmaceutical Congress in Bengaluru, December 19-21, 2025. Theme: AI & TECHNOLOGY IN PHARMA: EDUCATE, INNOVATE, EMPOWER. 12,000+ expected attendees.",
  keywords: [
    "pharmaceutical congress",
    "pharmacy",
    "AI in pharma",
    "technology",
    "Bengaluru",
    "IPC 2025",
    "pharmaceutical exhibition",
  ],
  authors: [{ name: "74th Indian Pharmaceutical Congress" }],
  openGraph: {
    title: "74th Indian Pharmaceutical Congress 2025",
    description: "AI & TECHNOLOGY IN PHARMA: EDUCATE, INNOVATE, EMPOWER",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
