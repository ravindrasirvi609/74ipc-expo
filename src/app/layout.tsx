import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://expo.74ipc.com"),
  title: {
    default:
      "74th Indian Pharmaceutical Congress 2025 | AI & Technology in Pharma Expo",
    template: "%s | 74th IPC 2025 - expo.74ipc.com",
  },
  description:
    "Join India's premier pharmaceutical event - 74th Indian Pharmaceutical Congress at BIEC Bengaluru, Dec 19-21, 2025. AI & Technology in Pharma: Educate, Innovate, Empower. 12,000+ attendees, 500+ exhibitors.",
  keywords: [
    "74th Indian Pharmaceutical Congress",
    "IPC 2025",
    "pharmaceutical exhibition",
    "pharma expo Bengaluru",
    "AI in pharmaceutical industry",
    "technology in pharmacy",
    "pharmaceutical innovation",
    "BIEC exhibition",
    "pharma congress India",
    "pharmaceutical research",
    "drug development",
    "pharmaceutical manufacturing",
    "healthcare technology",
    "pharma networking",
    "pharmaceutical professionals",
    "medicine exhibition",
    "pharma trade show",
    "pharmaceutical equipment",
    "pharma machinery",
    "drug discovery",
  ],
  authors: [
    {
      name: "74th Indian Pharmaceutical Congress",
      url: "https://expo.74ipc.com",
    },
  ],
  creator: "74th Indian Pharmaceutical Congress Organizing Committee",
  publisher: "Association of Pharmaceutical Teachers of India (APTI)",
  category: "Healthcare & Pharmaceutical Exhibition",
  classification: "Business Event",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://expo.74ipc.com",
    siteName: "74th Indian Pharmaceutical Congress 2025",
    title:
      "74th Indian Pharmaceutical Congress 2025 | AI & Technology in Pharma",
    description:
      "India's premier pharmaceutical exhibition featuring AI & Technology in Pharma. Join 12,000+ professionals at BIEC Bengaluru, December 19-21, 2025.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "74th Indian Pharmaceutical Congress 2025 - AI & Technology in Pharma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@IPC2025",
    creator: "@IPC2025",
    title: "74th Indian Pharmaceutical Congress 2025",
    description:
      "AI & Technology in Pharma: Educate, Innovate, Empower. Join us in Bengaluru, Dec 19-21, 2025.",
    images: ["/images/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://expo.74ipc.com",
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
    "geo.position": "12.9716;77.5946",
    ICBM: "12.9716, 77.5946",
    "theme-color": "#ff6b35",
    "msapplication-TileColor": "#ff6b35",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://expo.74ipc.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "74th Indian Pharmaceutical Congress 2025",
              description:
                "AI & Technology in Pharma: Educate, Innovate, Empower",
              startDate: "2025-12-19",
              endDate: "2025-12-21",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Bangalore International Exhibition Centre (BIEC)",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "10th Mile, Tumkur Road, Madavara Post",
                  addressLocality: "Bengaluru",
                  addressRegion: "Karnataka",
                  postalCode: "562123",
                  addressCountry: "IN",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Association of Pharmaceutical Teachers of India (APTI)",
                url: "https://expo.74ipc.com",
              },
              url: "https://expo.74ipc.com",
              image: "https://expo.74ipc.com/images/og-image.jpg",
              offers: {
                "@type": "Offer",
                url: "https://expo.74ipc.com/register",
                price: "5000",
                priceCurrency: "INR",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
