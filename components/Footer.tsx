import Link from "next/link";

export default function Footer({ dict, lang }: { dict: any; lang: string }) {
  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t-4 border-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <img src="/logo.png" alt="Keep It Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-lg font-medium text-[var(--text-primary)]/80 max-w-sm">
              {dict.footer.description}
            </p>
          </div>

          {/* Links Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 text-[var(--text-primary)]">
              {dict.footer.links}
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href={`/${lang}/shop`} className="text-base font-semibold hover:opacity-70 transition-opacity">
                  {dict.nav.shop}
                </Link>
              </li>
              <li className="mb-2">
                <Link href={`/${lang}/contact`} className="text-base font-semibold hover:opacity-70 transition-opacity">
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/login`} className="text-base font-semibold hover:opacity-70 transition-opacity">
                  {dict.nav.login}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 text-[var(--text-primary)]">
              {dict.footer.social}
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="#" className="text-base font-semibold hover:opacity-70 transition-opacity">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-base font-semibold hover:opacity-70 transition-opacity">Twitter / X</a>
              </li>
              <li>
                <a href="#" className="text-base font-semibold hover:opacity-70 transition-opacity">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t-2 border-[var(--text-primary)]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold opacity-70">
            {dict.footer.rights}
          </p>
          {/* Subtle Logo Mark */}
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
            <img src="/32×32.png" alt="Keep It Icon" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
