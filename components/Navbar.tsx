"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";

export default function Navbar({ dict, lang }: { dict: any; lang: string }) {
  const pathname = usePathname();
  const oppositeLang = lang === "ar" ? "en" : "ar";
  const togglePath = pathname.replace(`/${lang}`, `/${oppositeLang}`);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.length;
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 md:px-6 py-4 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b-4 border-[var(--text-primary)]">
        <div className="flex items-center gap-8">
          <Link href={`/${lang}`} className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Keep It Logo" className="h-8 md:h-10 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link href={`/${lang}/shop`} className="text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] hover:opacity-70 transition-colors">
              {dict.nav.shop}
            </Link>
            <Link href={`/${lang}/contact`} className="text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] hover:opacity-70 transition-colors">
              {dict.nav.contact}
            </Link>
            {!mounted ? (
              <div className="w-16 h-4 opacity-0"></div>
            ) : isLoggedIn ? (
              <Link href={`/${lang}/profile`} className="text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] hover:opacity-70 transition-colors">
                {dict.nav.profile}
              </Link>
            ) : null}
            
            <Link href={`/${lang}/cart`} className="text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] hover:opacity-70 transition-colors flex items-center gap-2">
              {dict.nav.cart}
              {!mounted ? (
                null
              ) : cartItemCount > 0 ? (
                <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-black px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {!mounted ? (
            <div className="w-32 h-11 opacity-0"></div>
          ) : isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-3 hover:opacity-90 transition-colors rounded-none">
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link href={`/${lang}/login`} className="text-sm font-bold uppercase tracking-widest bg-[var(--cta-bg)] text-[var(--cta-text)] px-8 py-3 hover:opacity-90 transition-colors rounded-none">
              {dict.nav.login}
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {!mounted ? (
            <div className="w-20 h-8 opacity-0"></div>
          ) : isLoggedIn ? (
            <button onClick={handleLogout} className="text-xs flex items-center gap-2 font-bold uppercase tracking-widest bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-2 hover:opacity-90 transition-colors rounded-none">
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <Link href={`/${lang}/login`} className="text-xs font-bold uppercase tracking-widest bg-[var(--cta-bg)] text-[var(--cta-text)] px-4 py-2 hover:opacity-90 transition-colors rounded-none">
              {dict.nav.login}
            </Link>
          )}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[var(--text-primary)] p-1 border-2 border-[var(--text-primary)] rounded-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[var(--bg-primary)] pt-24 px-6 flex flex-col gap-8 md:hidden">
          <Link 
            href={`/${lang}/shop`} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl font-black uppercase tracking-tighter text-[var(--text-primary)] border-b-4 border-[var(--text-primary)] pb-4"
          >
            {dict.nav.shop}
          </Link>
          <Link 
            href={`/${lang}/contact`} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl font-black uppercase tracking-tighter text-[var(--text-primary)] border-b-4 border-[var(--text-primary)] pb-4"
          >
            {dict.nav.contact}
          </Link>
          {mounted && isLoggedIn && (
            <Link 
              href={`/${lang}/profile`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter text-[var(--text-primary)] border-b-4 border-[var(--text-primary)] pb-4"
            >
              {dict.nav.profile}
            </Link>
          )}
          <Link 
            href={`/${lang}/cart`} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex justify-between items-center text-4xl font-black uppercase tracking-tighter text-[var(--text-primary)] border-b-4 border-[var(--text-primary)] pb-4"
          >
            {dict.nav.cart}
            {mounted && cartItemCount > 0 && (
              <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] text-2xl font-black px-4 py-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </>
  );
}
