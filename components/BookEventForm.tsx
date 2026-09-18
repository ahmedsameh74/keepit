"use client";

import { motion } from "framer-motion";
import { User, Mail, Calendar, Users, ArrowRight, Sparkles } from "lucide-react";

export default function BookEventForm({ dict, lang }: { dict: any; lang: string }) {
  const isRtl = lang === "ar";

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-8 md:p-10 shadow-[8px_8px_0px_0px_var(--text-primary)] relative"
      >
        <div className="absolute top-4 right-4 text-[var(--text-primary)]">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
            {dict.bookEvent.title}
          </h2>
          <p className="text-[var(--text-primary)]/80 font-medium">
            {dict.bookEvent.subtitle}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-bold uppercase tracking-wider"
              >
                {dict.bookEvent.nameLabel}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <User className="h-5 w-5 text-[var(--text-primary)]/50" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                  placeholder={dict.bookEvent.namePlaceholder}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-bold uppercase tracking-wider"
              >
                {dict.bookEvent.emailLabel}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Mail className="h-5 w-5 text-[var(--text-primary)]/50" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                  placeholder={dict.bookEvent.emailPlaceholder}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="eventType"
              className="block text-sm font-bold uppercase tracking-wider"
            >
              {dict.bookEvent.eventTypeLabel}
            </label>
            <div className="relative">
              <select
                id="eventType"
                required
                className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all appearance-none cursor-pointer`}
              >
                <option value="corporate">Corporate Event / حدث شركة</option>
                <option value="wedding">Wedding / زفاف</option>
                <option value="party">Private Party / حفلة خاصة</option>
                <option value="other">Other / أخرى</option>
              </select>
              <div className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
                <svg className="h-5 w-5 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-sm font-bold uppercase tracking-wider"
              >
                {dict.bookEvent.dateLabel}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Calendar className="h-5 w-5 text-[var(--text-primary)]/50" />
                </div>
                <input
                  id="date"
                  type="date"
                  required
                  className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="guests"
                className="block text-sm font-bold uppercase tracking-wider"
              >
                {dict.bookEvent.guestsLabel}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Users className="h-5 w-5 text-[var(--text-primary)]/50" />
                </div>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  required
                  className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                  placeholder={dict.bookEvent.guestsPlaceholder}
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full group relative flex justify-center items-center gap-2 py-4 px-4 border-4 border-[var(--text-primary)] bg-[var(--cta-bg)] text-[var(--cta-text)] text-sm font-black uppercase tracking-widest hover:bg-[var(--text-primary)] transition-colors overflow-hidden"
          >
            <span className="relative z-10">{dict.bookEvent.submit}</span>
            <ArrowRight className={`relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            
            {/* Hover effect background */}
            <div className="absolute inset-0 h-full w-0 bg-[var(--text-primary)] group-hover:w-full transition-all duration-300 ease-out z-0"></div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
