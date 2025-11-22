"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import BigTextScroll from "./BigTextScroll";

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <span className={`${className} inline-block relative`}>
      {children.split("").map((char, index) => (
        <span key={index} className="inline-block char-reveal">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Added contentRef back

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch Effect for Title
      const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
      glitchTimeline
        .to(titleRef.current, {
          skewX: 70,
          ease: "power4.inOut",
          duration: 0.1,
        })
        .to(titleRef.current, {
          skewX: 0,
          ease: "power4.inOut",
          duration: 0.04,
        })
        .to(titleRef.current, { opacity: 0, duration: 0.04 })
        .to(titleRef.current, { opacity: 1, duration: 0.04 })
        .to(titleRef.current, { x: -20, duration: 0.04 })
        .to(titleRef.current, { x: 0, duration: 0.04 });

      // Initial Title Reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, filter: "blur(20px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power3.out",
        }
      );

      // Staggered Text Reveal for Subtitle and Buttons
      gsap.fromTo(
        ".reveal-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
        }
      );

      // Scroll Triggered Animations for Sections
      const sections = gsap.utils.toArray(".content-section") as HTMLElement[];
      sections.forEach((section) => {
        const chars = section.querySelectorAll(".char-reveal");

        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 100 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none", // Changed to none so it stays visible
            },
          }
        );

        // Staggered Character Reveal for Headings - REMOVED as per user request
        /* if (chars.length > 0) {
                    gsap.fromTo(
                        chars,
                        { autoAlpha: 0, y: 20, rotateX: -90 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            rotateX: 0,
                            stagger: 0.02,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            }
                        }
                    );
                } */
      });

      // Force refresh to ensure positions are correct after render
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 perspective-1000">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center text-white relative">
        <div className="text-center z-20 p-4 mix-blend-difference">
          <h1
            ref={titleRef}
            className="text-8xl md:text-[10rem] font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ textShadow: "4px 4px 0px #00ffff, -4px -4px 0px #ff00ff" }}
          >
            AI Pavilion
          </h1>
          <p className="reveal-text mt-6 text-2xl md:text-4xl text-cyan-300 font-mono tracking-widest uppercase border-b border-cyan-500/50 pb-2 inline-block">
            Redefining Pharmacy & Healthcare
          </p>

          <div className="reveal-text mt-16 flex gap-8 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("content-start")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-12 py-5 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-xl tracking-widest hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] clip-path-polygon"
              style={{
                clipPath:
                  "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)",
              }}
            >
              EXPLORE
            </button>
            <Link
              href="/"
              className="px-12 py-5 bg-transparent border-2 border-purple-500 text-purple-500 font-bold text-xl tracking-widest hover:bg-purple-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
              style={{
                clipPath:
                  "polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)",
              }}
            >
              HOME
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-1 h-20 bg-gradient-to-b from-cyan-500 to-transparent rounded-full" />
        </div>
      </div>

      {/* Detailed Content Sections */}
      <div
        id="content-start"
        ref={contentRef}
        className="w-full max-w-7xl mx-auto px-6 pb-40 space-y-40"
      >
        {/* Section 1: AI in Drug Discovery */}
        <section className="content-section flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <SplitText className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-600">
                AI IN DRUG DISCOVERY
              </SplitText>
            </h2>
            <div className="h-1 w-20 bg-cyan-500" />
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              Accelerate the future of medicine. Artificial Intelligence is
              revolutionizing how we identify potential drug candidates,
              predicting molecular behavior with unprecedented accuracy. From
              protein folding to toxicity prediction, AI reduces years of
              research into mere months.
            </p>
            <ul className="space-y-4 text-cyan-200/80 font-mono text-sm tracking-wider">
              <li className="flex items-center gap-4 border-l-2 border-cyan-500 pl-4">
                MOLECULAR DOCKING SIMULATIONS
              </li>
              <li className="flex items-center gap-4 border-l-2 border-cyan-500 pl-4">
                PREDICTIVE TOXICOLOGY
              </li>
              <li className="flex items-center gap-4 border-l-2 border-cyan-500 pl-4">
                DE NOVO DRUG DESIGN
              </li>
            </ul>
          </div>
          <div className="flex-1 h-96 bg-gradient-to-br from-cyan-900/10 to-blue-900/10 rounded-3xl border border-cyan-500/20 flex items-center justify-center relative overflow-hidden group hover:border-cyan-500/60 transition-colors duration-500">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          </div>
        </section>

        {/* Big Text Animation 1 */}
        <div className="-mx-40 opacity-50 mix-blend-screen pointer-events-none">
          <BigTextScroll text="FUTURE PHARMACY" direction="left" speed={100} />
        </div>

        {/* Section 2: Robotics & Automation */}
        <section className="content-section flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-6 text-right">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight flex justify-end">
              <SplitText className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-pink-600">
                ROBOTICS & AUTOMATION
              </SplitText>
            </h2>
            <div className="h-1 w-20 bg-purple-500 ml-auto" />
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              Precision meets efficiency. Advanced robotics are transforming
              pharmaceutical manufacturing and dispensing. Automated systems
              ensure zero-error compounding, high-speed packaging, and 24/7
              pharmacy operations.
            </p>
            <ul className="space-y-4 text-purple-200/80 font-mono text-sm tracking-wider flex flex-col items-end">
              <li className="flex items-center gap-4 border-r-2 border-purple-500 pr-4">
                AUTOMATED DISPENSING CABINETS
              </li>
              <li className="flex items-center gap-4 border-r-2 border-purple-500 pr-4">
                ROBOTIC COMPOUNDING ARMS
              </li>
              <li className="flex items-center gap-4 border-r-2 border-purple-500 pr-4">
                SMART INVENTORY MANAGEMENT
              </li>
            </ul>
          </div>
          <div className="flex-1 h-96 bg-gradient-to-br from-purple-900/10 to-pink-900/10 rounded-3xl border border-purple-500/20 flex items-center justify-center relative overflow-hidden group hover:border-purple-500/60 transition-colors duration-500">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          </div>
        </section>

        {/* Big Text Animation 2 */}
        <div className="-mx-40 opacity-50 mix-blend-screen pointer-events-none">
          <BigTextScroll text="AI REVOLUTION" direction="right" speed={120} />
        </div>

        {/* Section 3: Patient Care & Diagnostics */}
        <section className="content-section flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <SplitText className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-emerald-600">
                AI IN PATIENT CARE
              </SplitText>
            </h2>
            <div className="h-1 w-20 bg-green-500" />
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              Personalized healthcare at scale. AI algorithms analyze vast
              patient data to recommend personalized treatment plans, detect
              interactions, and monitor adherence. Virtual health assistants
              provide round-the-clock support.
            </p>
          </div>
          <div className="flex-1 h-96 bg-gradient-to-br from-green-900/10 to-emerald-900/10 rounded-3xl border border-green-500/20 flex items-center justify-center relative overflow-hidden group hover:border-green-500/60 transition-colors duration-500">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          </div>
        </section>
      </div>
    </div>
  );
}
