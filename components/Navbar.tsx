"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ dict, lang }: { dict: any; lang: string }) {
  const pathname = usePathname();
  const oppositeLang = lang === "ar" ? "en" : "ar";
  const togglePath = pathname.replace(`/${lang}`, `/${oppositeLang}`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--background)]/80 backdrop-blur-md border-b-0 border-[var(--color-primary)]">
      <div className="flex items-center gap-8">
        <Link href={`/${lang}`} className="text-2xl font-bold tracking-tighter text-[var(--color-accent)] uppercase">
          Keep It
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href={`/${lang}/shop`} className="text-sm font-semibold uppercase tracking-wide hover:text-[var(--color-primary)] transition-colors">
            {dict.nav.shop}
          </Link>
          <Link href={`/${lang}/events`} className="text-sm font-semibold uppercase tracking-wide hover:text-[var(--color-primary)] transition-colors">
            {dict.nav.bookEvent}
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Link href={togglePath} className="text-sm font-bold bg-[var(--color-secondary)]/20 px-3 py-1 text-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-colors">
          {lang === "ar" ? "EN" : "عربي"}
        </Link>
        <Link href={`/${lang}/login`} className="text-sm font-bold bg-[var(--color-primary)] text-white px-6 py-2 hover:bg-[#e59526] transition-colors">
          {dict.nav.login}
        </Link>
      </div>
    </nav>
  );
}
