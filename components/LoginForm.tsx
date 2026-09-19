"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { RootState } from "../store/store";

export default function LoginForm({ dict, lang }: { dict: any; lang: string }) {
  const isRtl = lang === "ar";
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLoggedIn) {
      router.push(`/${lang}/profile`);
    }
  }, [mounted, isLoggedIn, router, lang]);

const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(login(data.user));
        router.push(`/${lang}/profile`);
      } else {
        const err = await res.json();
        setError(err.error || "Login failed");
      }
    } catch (err) {
      setError("Server error. Ensure the dashboard is running.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || isLoggedIn) return null;

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

        {error && (
          <div className="mb-6 p-4 border-4 border-red-500 bg-red-50 text-red-700 font-bold uppercase tracking-widest text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                placeholder={dict.login.passwordPlaceholder}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full group relative flex justify-center items-center gap-2 py-4 px-4 border-4 border-[var(--text-primary)] ${loading ? 'bg-gray-400' : 'bg-[var(--cta-bg)]'} text-[var(--cta-text)] text-sm font-black uppercase tracking-widest hover:bg-[var(--text-primary)] transition-colors overflow-hidden`}
          >
            <span className="relative z-10">{loading ? "Logging in..." : dict.login.submit}</span>
            {!loading && <ArrowRight className={`relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />}
            
            {/* Hover effect background */}
            {!loading && <div className="absolute inset-0 h-full w-0 bg-[var(--text-primary)] group-hover:w-full transition-all duration-300 ease-out z-0"></div>}
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




