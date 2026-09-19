"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function Hero({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = useState(false);

  const { scrollY } = useScroll();
  
  // Custom progress that never resets to 0 when element leaves viewport
  const progress = useTransform(scrollY, (y) => {
    if (typeof window === "undefined") return 0;
    const wh = window.innerHeight;
    // Container is 200vh. "end end" offset means it scrolled 100vh (wh).
    const p = y / wh;
    return Math.max(0, Math.min(1, p));
  });

  // Phone moves from left to center (adjusting for left: 50% offset)
  const phoneX = useTransform(progress, [0, 0.5], ["calc(-50% - 30vw)", "calc(-50% - 5vw)"]);
  // Card moves from right to center (adjusting for left: 50% offset)
  const cardX = useTransform(progress, [0, 0.5], ["calc(-50% + 30vw)", "calc(-50% + 5vw)"]);
  
  // Logo fade in and scale up after touch
  const logoOpacity = useTransform(progress, [0.6, 0.9], [0, 1]);
  const logoScale = useTransform(progress, [0.6, 0.9], [0.5, 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= 0.5 && !isTouched) {
      setIsTouched(true);
    } else if (latest < 0.5 && isTouched) {
      setIsTouched(false);
    }
  });

  return (
    <div ref={containerRef} className="h-[200vh] relative w-full bg-transparent">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Decorative Element */}
        <div className="absolute inset-0 pointer-events-none" />

        {/* Brutalist Background Text */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full text-[15vw] md:text-[20vw] font-black leading-none text-[var(--text-primary)] whitespace-nowrap opacity-[0.03] flex items-center justify-center select-none">
            KEEP IT KEEP IT KEEP IT
          </div>
        </div>

        {/* Center Ripple Effect */}
        {isTouched && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-0">
            <div className="absolute inset-0 border-4 border-[var(--cta-bg)] rounded-none animate-ripple"></div>
            <div className="absolute inset-0 border-4 border-[var(--text-primary)] rounded-none animate-ripple" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}

        {/* Logo Reveal */}
        <motion.div 
          className="absolute z-30 flex flex-col items-center justify-center text-center"
          style={{ opacity: logoOpacity, scale: logoScale }}
        >
          {/* Logo */}
          <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-2">
            <img src="/logo.png" alt="Keep It Logo" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* 3D Smartphone Image */}
        <motion.div 
          className="absolute z-20 w-[200px] h-[420px] md:w-[320px] md:h-[660px] bg-transparent overflow-hidden rounded-none"
          style={{ top: "50%", left: "50%", y: "-50%", x: phoneX, rotate: -5 }}
        >
          <img 
            src="/mobile.png" 
            alt="Smartphone" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* NFC Card Image */}
        <motion.div 
          className="absolute z-20 w-[260px] h-[160px] md:w-[420px] md:h-[260px] bg-transparent overflow-hidden rounded-none"
          style={{ top: "50%", left: "50%", y: "-50%", x: cardX, rotate: 10 }}
        >
          <img 
            src="/nfccard.png" 
            alt="Keep It NFC Card" 
            className="w-full h-full object-contain"
          />
        </motion.div>

      </div>
    </div>
  );
}
