"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BigTextScrollProps {
    text: string;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

export default function BigTextScroll({ text, direction = "left", speed = 150, className = "" }: BigTextScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const xMove = direction === "left" ? -speed : speed;

            gsap.to(textRef.current, {
                xPercent: xMove,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [direction, speed]);

    return (
        <div ref={containerRef} className={`w-full overflow-hidden py-10 ${className}`}>
            <div
                ref={textRef}
                className="whitespace-nowrap flex gap-8 items-center select-none"
                style={{ willChange: "transform" }}
            >
                {/* Repeated text for seamless scrolling effect */}
                {[...Array(4)].map((_, i) => (
                    <span
                        key={i}
                        className="text-[12rem] md:text-[20rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-[background-position,opacity] duration-700 ease-in-out opacity-60 hover:opacity-100"
                        style={{
                            fontFamily: "Impact, sans-serif"
                        }}
                    >
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
