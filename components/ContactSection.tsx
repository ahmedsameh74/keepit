"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function ContactSection({ dict, lang }: { dict: any; lang: string }) {
  const isRtl = lang === "ar";
  
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[var(--text-primary)] text-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center shadow-[16px_16px_0px_0px_var(--cta-bg)]"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none flex items-center justify-center overflow-hidden">
          <div className="text-[25vw] font-black leading-none whitespace-nowrap text-[var(--bg-primary)]">
            BOOK BOOK BOOK
          </div>
        </div>
        
        <Calendar className="w-16 h-16 mb-8 relative z-10" />
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 relative z-10">
          {dict.contact.title}
        </h2>
        <p className="text-xl md:text-2xl font-medium mb-12 max-w-2xl relative z-10 opacity-90">
          {dict.contact.subtitle}
        </p>
        
        <Link href={`/${lang}/contact`} className="relative z-10 w-full sm:w-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex justify-center items-center gap-4 bg-[var(--cta-bg)] text-[var(--cta-text)] border-4 border-[var(--bg-primary)] py-5 px-10 text-xl font-black uppercase tracking-widest hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>{dict.contact.submit}</span>
            <ArrowRight className={`w-8 h-8 group-hover:translate-x-2 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
