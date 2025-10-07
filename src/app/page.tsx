"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";
import OptimizedImage from "@/components/OptimizedImage";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1711390811937-1b061eaf28ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1752155509694-acf7b9c8bf51?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "/74ipc expo.png",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://blackpepperindia.com/images/portfolio/gallery/industry-pharmaceutical/2025/cphi-china/ipca/large/2-international-pharma-stall-ipca-cphi-china-2025.jpg",
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleContactInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactFormData),
      });

      if (response.ok) {
        alert(
          "Thank you for your inquiry! We will get back to you within 24 hours."
        );
        setContactFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    }
  };

  const stats = [
    { number: "15,000+", label: "Pharma Professionals", icon: "👥" },
    { number: "100+", label: "Industry Speakers", icon: "�" },
    { number: "3", label: "Days of Innovation", icon: "📅" },
    { number: "50+", label: "Countries", icon: "🌍" },
  ];

  const highlights = [
    {
      title: "Cutting-edge Pharma Machinery",
      description:
        "Latest trends in drug discovery, formulation, and manufacturing with advanced process technologies",
      icon: "⚙️",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Biotechnology & Diagnostics",
      description:
        "Exhibits on biotechnology innovations, diagnostics solutions, and healthcare technologies",
      icon: "🧬",
      gradient: "from-green-500 to-blue-500",
    },
    {
      title: "Industry-Academia Collaboration",
      description:
        "Opportunities for partnerships between universities, research institutes, and industry leaders",
      icon: "🎓",
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Global Networking Hub",
      description:
        "Connect with pharma leaders, researchers, policymakers, and healthcare professionals worldwide",
      icon: "🤝",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const attendeeCategories = [
    {
      title: "Pharma Industry Professionals",
      description: "Manufacturers, exporters, distributors, and suppliers",
      icon: "🏭",
    },
    {
      title: "Pharmaceutical Machinery Providers",
      description: "Equipment, automation, and packaging innovations",
      icon: "⚙️",
    },
    {
      title: "Researchers & Scientists",
      description: "Drug discovery, development, biotechnology experts",
      icon: "🔬",
    },
    {
      title: "Academicians & Students",
      description: "Pharmacy, life sciences, biotechnology programs",
      icon: "🎓",
    },
    {
      title: "Healthcare Professionals",
      description: "Hospital and clinical pharmacists",
      icon: "🏥",
    },
    {
      title: "Startups & Innovators",
      description: "Disruptive pharma and biotech solutions",
      icon: "💡",
    },
  ];

  const confirmedExhibitors = [
    {
      name: "GPAT Discussion Center",
      logo: "/GDC logo.png",
    },
    {
      name: "Mycal Pharm",
      logo: "/mycalpharm.jpg",
    },
    {
      name: "Nutrivet Life Sciences",
      logo: "/NLS_LOGO.jpeg",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <LeadCaptureDialog />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-gray-900">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url('${backgroundImages[currentBgIndex]}')`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70 z-10"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full floating"></div>
          <div
            className="absolute top-1/4 right-20 w-16 h-16 bg-white/20 rounded-full floating"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/15 rounded-full floating"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/4 w-24 h-24 bg-white/10 rounded-full floating"
            style={{ animationDelay: "0.5s" }}
          ></div>

          {/* Pharmaceutical Icons */}
          <div
            className="absolute top-1/3 left-10 text-4xl opacity-20 floating"
            style={{ animationDelay: "0.3s" }}
          >
            💊
          </div>
          <div
            className="absolute top-2/3 right-10 text-4xl opacity-20 floating"
            style={{ animationDelay: "1.5s" }}
          >
            🧬
          </div>
          <div
            className="absolute bottom-1/3 left-1/3 text-4xl opacity-20 floating"
            style={{ animationDelay: "2.2s" }}
          >
            ⚗️
          </div>
          <div
            className="absolute top-1/2 right-1/4 text-4xl opacity-20 floating"
            style={{ animationDelay: "0.8s" }}
          >
            🔬
          </div>
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Event Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/30">
              <div className="w-2 h-2 bg-white rounded-full mr-3 pulse-glow"></div>
              <span className="text-sm font-semibold tracking-wide">
                DECEMBER 19-21, 2025 • BENGALURU, INDIA
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow leading-tight">
              <span className="block animate-fade-in">74th Indian</span>
              <span
                className="block text-yellow-300 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Pharmaceutical
              </span>
              <span
                className="block animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                Congress
              </span>
            </h1>

            {/* Subtitle */}
            <div
              className="mb-8 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-2xl md:text-3xl mb-4 font-bold text-yellow-300 text-shadow">
                PHARMA EXHIBITION
              </p>
              <p className="text-xl md:text-2xl font-semibold text-shadow">
                World-Class Premier Platform
              </p>
            </div>

            {/* Description */}
            <p
              className="text-lg md:text-xl mb-12 max-w-4xl mx-auto opacity-90 text-shadow-light animate-fade-in leading-relaxed"
              style={{ animationDelay: "0.8s" }}
            >
              Join the world&apos;s most comprehensive pharmaceutical exhibition
              bringing together global leaders, innovators, and stakeholders.
              Hosted at BIEC Bengaluru, showcasing cutting-edge innovations,
              advanced technologies, and future-ready solutions shaping the
              pharmaceutical industry.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-scale-in"
              style={{ animationDelay: "1s" }}
            >
              <Link
                href="/registration"
                className="group flex items-center rounded-full bg-white px-8 py-4 text-lg font-bold text-[var(--primary-green)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-orange)] hover:text-white"
              >
                Register Free
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group flex items-center rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[var(--primary-green)]"
              >
                Contact Us
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[var(--primary-orange)]/10 to-[var(--primary-green)]/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[var(--primary-green)]/10 to-[var(--primary-orange)]/10 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <div className="w-2 h-2 bg-[var(--primary-orange)] rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 tracking-wide">
                ABOUT THE EVENT
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-green)] bg-clip-text text-transparent">
                74th IPC Pharma Expo
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              India&apos;s premier pharmaceutical congress connecting global
              innovators, researchers, and industry leaders in advancing
              healthcare excellence.
            </p>
          </div>

          {/* Compact Organization Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Main Organizations Row */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Organised By
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] rounded-full"></div>
                  </div>
                </div>
                <OptimizedImage
                  src="/ipca_logo.jpg"
                  alt="Indian Pharmaceutical Congress Association"
                  width={80}
                  height={60}
                  className="rounded-xl shadow-md"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Indian Pharmaceutical Congress Association
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Leading organization dedicated to advancing pharmaceutical
                education and research excellence across India.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Hosted By
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  </div>
                </div>
                <OptimizedImage
                  src="/apti_logo.png"
                  alt="Association of Teachers of India (APTI)"
                  width={80}
                  height={60}
                  className="rounded-xl shadow-md"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Association of Teachers of India (APTI)
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premier academic organization fostering pharmaceutical education
                and research excellence nationwide.
              </p>
            </div>
          </div>

          {/* Supporting Organizations */}
          <div className="mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🔧</span>
                </div>
                <div className="flex-1 text-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    Managed By
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-700">
                    Operant Scientific Pvt. Ltd.
                  </h4>
                </div>
                <OptimizedImage
                  src="/operant_osl.png"
                  alt="Operant Scientific Private Limited"
                  width={80}
                  height={60}
                  className="rounded-lg shadow-sm"
                />
              </div>
              <p className="text-gray-600 text-sm text-center leading-relaxed max-w-2xl mx-auto">
                Professional event management and scientific solutions provider
                delivering excellence in pharmaceutical congress organization
                and research support.
              </p>
            </div>
          </div>

          {/* Confirmed Exhibitors */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
                <div className="w-2 h-2 bg-[var(--primary-orange)] rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  CONFIRMED EXHIBITORS
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Trusted Partners Showcasing at the Expo
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-orange)] mx-auto rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We&apos;re thrilled to welcome pioneering organizations who have
                already confirmed their presence at the 74th IPC Pharma
                Exhibition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {confirmedExhibitors.map((exhibitor) => (
                <div
                  key={exhibitor.name}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="px-6 py-10 flex flex-col items-center text-center">
                    <div className="w-full max-w-[220px] aspect-square flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-sm mb-6 p-6">
                      <OptimizedImage
                        src={exhibitor.logo}
                        alt={`${exhibitor.name} logo`}
                        fill
                        sizes="(min-width: 1024px) 220px, (min-width: 640px) 180px, 160px"
                        imgClassName="object-contain"
                        className="w-full h-full"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {exhibitor.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legacy Showcase */}
          <div className="relative">
            <div className="bg-gradient-to-r from-[var(--primary-green)] via-[var(--primary-orange)] to-[var(--primary-green)] rounded-3xl p-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                  <div className="absolute top-20 right-8 w-8 h-8 border-2 border-white/20 rounded-full"></div>
                  <div className="absolute bottom-8 left-12 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/10 rounded-full"></div>
                </div>

                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <OptimizedImage
                        src="/74ipc expo.png"
                        alt="74th IPC Expo"
                        width={120}
                        height={80}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      74 Years of Excellence
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                          74+
                        </div>
                        <div className="text-sm text-gray-300">
                          Years of Heritage
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                          15K+
                        </div>
                        <div className="text-sm text-gray-300">
                          Global Participants
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                          50+
                        </div>
                        <div className="text-sm text-gray-300">Countries</div>
                      </div>
                    </div>
                    <p className="text-lg opacity-90 leading-relaxed">
                      As India&apos;s most significant pharmaceutical congress,
                      we continue to shape the future of healthcare through
                      groundbreaking innovations, strategic partnerships, and
                      excellence in pharmaceutical education and research.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80"
              alt="BIEC Bengaluru - Bangalore International Exhibition Centre"
              width={1200}
              height={300}
              className="h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-green)]/90 to-[var(--primary-orange)]/90 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-shadow">
                  Bangalore International Exhibition Centre
                </h3>
                <p className="text-lg opacity-90 text-shadow-light">
                  World-class venue hosting 15,000+ pharmaceutical professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover-lift bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--primary-orange)] mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about the 74th IPC Pharma Expo? Contact our team
              for assistance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={contactFormData.name}
                    onChange={handleContactInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={contactFormData.phone}
                    onChange={handleContactInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-organization"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    id="contact-organization"
                    name="organization"
                    value={contactFormData.organization}
                    onChange={handleContactInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={contactFormData.subject}
                  onChange={handleContactInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="exhibition">Exhibition & Sponsorship</option>
                  <option value="speaker">Speaker Application</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="program">Program Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="media">Media & Press</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  value={contactFormData.message}
                  onChange={handleContactInputChange}
                  placeholder="Please provide detailed information about your inquiry..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary-orange)] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[var(--accent-orange)] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-4 animate-fade-in">
              ✨ Key Highlights
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8 rounded-full animate-scale-in"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto animate-slide-up leading-relaxed">
              The 74th IPC Pharma Expo promises unmatched opportunities for
              knowledge exchange, networking, partnerships, and business
              development with pharmaceutical excellence meeting innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group hover-lift bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-[var(--primary-orange)]/30 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${highlight.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4 group-hover:text-[var(--primary-orange)] transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
                <div className="mt-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-green)] rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Attend Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-4">
              👥 Who Can Attend?
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The 74th IPC Pharma Exhibition is open to a wide spectrum of
              stakeholders across the pharmaceutical and healthcare ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attendeeCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 text-center">{category.icon}</div>
                <h3 className="text-lg font-bold text-[var(--primary-green)] mb-3 text-center group-hover:text-[var(--primary-orange)] transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-4">
              Plus: Regulatory Bodies, Policymakers, Investors, Consultants, and
              Universities
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-4">
              � What to Expect at 74th IPC Pharma Expo
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the most comprehensive pharmaceutical congress with
              cutting-edge innovations, world-class speakers, and unparalleled
              networking opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Keynote Presentations",
                description:
                  "World-renowned pharmaceutical leaders sharing insights",
                icon: "🎤",
              },
              {
                title: "Interactive Workshops",
                description: "Hands-on learning sessions and skill development",
                icon: "🛠️",
              },
              {
                title: "Innovation Showcases",
                description:
                  "Latest pharmaceutical technologies and breakthroughs",
                icon: "💡",
              },
              {
                title: "Networking Sessions",
                description: "Connect with industry professionals worldwide",
                icon: "🤝",
              },
              {
                title: "Scientific Posters",
                description: "Research presentations and academic excellence",
                icon: "📊",
              },
              {
                title: "Panel Discussions",
                description: "Expert debates on industry trends and challenges",
                icon: "💬",
              },
            ].map((expectation, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4 text-center">
                  {expectation.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--primary-green)] mb-3 text-center group-hover:text-[var(--primary-orange)] transition-colors">
                  {expectation.title}
                </h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  {expectation.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12"></div>
        </div>
      </section>

      {/* Why Exhibit Section */}
      <section className="py-20 gradient-green-orange text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shadow">
              🌟 Why Exhibit at the 74th IPC Pharma Exhibition?
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8 rounded-full"></div>
            <p className="text-xl max-w-4xl mx-auto opacity-90 text-shadow-light leading-relaxed">
              Position your organization at the forefront of pharmaceutical
              innovation and connect with India&apos;s largest pharma ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🎯",
                title: "Access Diverse Audience",
                desc: "Engage with 15,000+ pharma professionals, researchers, and students",
              },
              {
                icon: "🏆",
                title: "Brand Recognition",
                desc: "Enhance visibility with extensive media and digital coverage",
              },
              {
                icon: "🚀",
                title: "Product Launch Platform",
                desc: "Introduce innovations to high-impact, target-focused audience",
              },
              {
                icon: "🤝",
                title: "Industry-Academia Partnerships",
                desc: "Collaborate with leading universities and research institutes",
              },
              {
                icon: "🏛️",
                title: "Government Access",
                desc: "Interact with policymakers and regulatory authorities",
              },
              {
                icon: "💡",
                title: "Knowledge Exchange",
                desc: "Stay updated on AI/ML, biotechnology, and digital health trends",
              },
              {
                icon: "⚡",
                title: "Competitive Edge",
                desc: "Showcase innovation against leading pharma players",
              },
              {
                icon: "👨‍💼",
                title: "Talent Recruitment",
                desc: "Attract young talent from thousands of student visitors",
              },
              {
                icon: "🌍",
                title: "Global Outreach",
                desc: "Connect with international delegates and collaborators",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-4 text-center">{benefit.icon}</div>
                <h3 className="font-bold text-lg mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-sm opacity-90 text-center leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-shadow">
                Event Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Dates</h4>
                    <p className="opacity-90">December 19-21, 2025</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Venue</h4>
                    <p className="opacity-90">
                      Bangalore International Exhibition Centre (BIEC),
                      Bengaluru
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Co-located Expo</h4>
                    <p className="opacity-90">
                      Educational Expo connecting universities with industry
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center animate-scale-in">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">
                  Ready to Participate?
                </h3>
                <p className="mb-8 opacity-90">
                  Be part of this landmark exhibition where pharmaceutical
                  excellence meets innovation. Join the largest pharma gathering
                  in India.
                </p>
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full bg-white text-[var(--primary-green)] py-4 px-6 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video & Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-green)] mb-4">
              Experience the Exhibition
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a glimpse of what awaits you at the world&apos;s premier
              pharmaceutical exhibition
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Video Section */}
            <div className="relative">
              <YouTubeEmbed
                videoId="_JZ573wDQGo"
                title="74th IPC Pharma Exhibition Overview"
                description="Experience the world's largest pharmaceutical congress showcasing cutting-edge innovations, global networking, and industry excellence at BIEC Bengaluru"
                className="h-80 lg:h-96"
              />
            </div>

            {/* Image Gallery Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <OptimizedImage
                  src="https://getaltd.co.uk/uploads/cache/original/public/uploads/media-manager/app-modules-venues-models-venue/halls/439/204857/3.jpg"
                  alt="Exhibition Hall - 74th IPC"
                  width={300}
                  height={200}
                  className="rounded-2xl h-32 object-cover"
                />
                <OptimizedImage
                  src="https://www.biec.in/enewsletter/june2k17/images/new_hall_2.jpg"
                  alt="BIEC Venue - Bangalore International Exhibition Centre"
                  width={300}
                  height={250}
                  className="rounded-2xl h-40 object-cover"
                />
              </div>
              <div className="space-y-4">
                <OptimizedImage
                  src="https://www.indiawood.com/images/AboutIndiaWood-min.jpg"
                  alt="Networking Events at IPC"
                  width={300}
                  height={250}
                  className="rounded-2xl h-40 object-cover"
                />
                <OptimizedImage
                  src="https://files.prokerala.com/news/photos/imgs/1024/bengaluru-international-exhibition-centre-biec-1032151.jpg"
                  alt="Innovation Showcase - Pharmaceutical Technology"
                  width={300}
                  height={200}
                  className="rounded-2xl h-32 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-green)] mb-4">
              Explore the Event
            </h2>
            <div className="w-24 h-1 bg-[var(--primary-orange)] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/floor-plan"
              className="group bg-white rounded-2xl p-8 text-center hover-lift shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4 group-hover:text-[var(--primary-orange)] transition-colors">
                Interactive Floor Plan
              </h3>
              <p className="text-gray-600 mb-4">
                Navigate through our smart exhibition floor with real-time booth
                information and exhibitor details
              </p>
              <div className="inline-flex items-center text-[var(--primary-orange)] font-semibold group-hover:translate-x-2 transition-transform">
                View Floor Plan
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group bg-white rounded-2xl p-8 text-center hover-lift shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                📞
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-green)] mb-4 group-hover:text-[var(--primary-orange)] transition-colors">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-4">
                Have questions about exhibition, or partnerships? Our team is
                ready to help you
              </p>
              <div className="inline-flex items-center text-[var(--primary-orange)] font-semibold group-hover:translate-x-2 transition-transform">
                Contact Us
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
