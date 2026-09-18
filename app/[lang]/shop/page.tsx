import { getDictionary } from "../../../dictionaries/getDictionary";
import Navbar from "../../../components/Navbar";
import ProductGrid from "../../../components/ProductGrid";
import Footer from "../../../components/Footer";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar dict={dict} lang={lang} />
      
      {/* Brutalist Background Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full text-[20vw] font-black leading-none text-[var(--text-primary)] whitespace-nowrap opacity-[0.03] flex items-center justify-center select-none">
          SHOP SHOP SHOP SHOP
        </div>
      </div>
      
      <div className="relative z-10 flex-grow pt-32 w-full">
        <div className="max-w-7xl mx-auto px-6 mb-[-2rem] md:mb-[-4rem]">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-[var(--text-primary)]">
            {dict.shopHeader.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[var(--text-primary)]/80 max-w-2xl border-l-4 border-[var(--cta-bg)] pl-4">
            {dict.shopHeader.subtitle}
          </p>
        </div>

        <ProductGrid dict={dict} />
      </div>
      
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
