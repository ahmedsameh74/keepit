"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function Hero({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phone moves from left to center (adjusting for left: 50% offset)
  const phoneX = useTransform(scrollYProgress, [0, 0.5], ["calc(-50% - 30vw)", "calc(-50% - 5vw)"]);
  // Card moves from right to center (adjusting for left: 50% offset)
  const cardX = useTransform(scrollYProgress, [0, 0.5], ["calc(-50% + 30vw)", "calc(-50% + 5vw)"]);
  
  // Logo fade in and scale up after touch
  const logoOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0.55, 0.8], [0.5, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5 && !isTouched) {
      setIsTouched(true);
    } else if (latest < 0.5 && isTouched) {
      setIsTouched(false);
    }
  });

  return (
    <div ref={containerRef} className="h-[250vh] relative w-full bg-[var(--background)]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Decorative Element */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-secondary)]/5 to-[var(--background)] pointer-events-none" />

        {/* Center Ripple Effect */}
        {isTouched && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-0">
            <div className="absolute inset-0 border-4 border-[var(--color-primary)] rounded-none animate-ripple"></div>
            <div className="absolute inset-0 border-4 border-[var(--color-accent)] rounded-none animate-ripple" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}

        {/* Logo Reveal */}
        <motion.div 
          className="absolute z-30 flex flex-col items-center justify-center text-center"
          style={{ opacity: logoOpacity, scale: logoScale }}
        >
          {/* Logo Placeholder */}
          <div className="w-32 h-32 bg-[var(--color-accent)] text-[var(--color-highlight)] flex items-center justify-center text-4xl font-black mb-6">
            KI
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-[var(--foreground)] uppercase tracking-tighter">
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-primary/70 mt-4 max-w-lg">
            {dict.hero.subtitle}
          </p>
        </motion.div>

        {/* 3D Smartphone Image */}
        <motion.div 
          className="absolute z-20 w-[160px] h-[340px] md:w-[240px] md:h-[500px] shadow-2xl border-[6px] border-[var(--foreground)] bg-black overflow-hidden"
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
          className="absolute z-20 w-[200px] h-[120px] md:w-[320px] md:h-[200px] shadow-2xl border-4 border-[var(--foreground)] bg-transparent overflow-hidden"
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
