"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginForm({ dict, lang }: { dict: any; lang: string }) {
  const isRtl = lang === "ar";

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-8 md:p-10 shadow-[8px_8px_0px_0px_var(--text-primary)]"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
            {dict.login.title}
          </h2>
          <p className="text-[var(--text-primary)]/80 font-medium">
            {dict.login.subtitle}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-bold uppercase tracking-wider"
            >
              {dict.login.emailLabel}
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
                placeholder={dict.login.emailPlaceholder}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-bold uppercase tracking-wider"
              >
                {dict.login.passwordLabel}
              </label>
              <Link
                href={`/${lang}/forgot-password`}
                className="text-xs font-bold underline hover:text-[var(--text-primary)]/70 transition-colors"
              >
                {dict.login.forgotPassword}
              </Link>
            </div>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Lock className="h-5 w-5 text-[var(--text-primary)]/50" />
              </div>
              <input
                id="password"
                type="password"
                required
                className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                placeholder={dict.login.passwordPlaceholder}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full group relative flex justify-center items-center gap-2 py-4 px-4 border-4 border-[var(--text-primary)] bg-[var(--cta-bg)] text-[var(--cta-text)] text-sm font-black uppercase tracking-widest hover:bg-[var(--text-primary)] transition-colors overflow-hidden"
          >
            <span className="relative z-10">{dict.login.submit}</span>
            <ArrowRight className={`relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            
            {/* Hover effect background */}
            <div className="absolute inset-0 h-full w-0 bg-[var(--text-primary)] group-hover:w-full transition-all duration-300 ease-out z-0"></div>
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-[var(--text-primary)]/20 text-center">
          <p className="text-sm font-bold">
            {dict.login.noAccount}{" "}
            <Link
              href={`/${lang}/signup`}
              className="underline decoration-2 underline-offset-4 hover:text-[var(--text-primary)]/70 transition-colors"
            >
              {dict.login.signUp}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
