import { getDictionary } from "../../../../dictionaries/getDictionary";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import OrderForm from "../../../../components/OrderForm";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";
  
  // Hardcoded product lookup for now
  let productName = "Classic NFC Card";
  let price = 29.99;
  if (id === "2") {
    productName = "Premium Metal Card";
    price = 59.99;
  } else if (id === "3") {
    productName = "Smart Keyfob";
    price = 39.99;
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[var(--bg-primary)]">
      <Navbar dict={dict} lang={lang} />
      
      {/* Brutalist Background Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full text-[20vw] font-black leading-none break-all overflow-hidden text-[var(--text-primary)] whitespace-nowrap opacity-[0.03] flex items-center justify-center select-none">
          ORDER ORDER ORDER ORDER
        </div>
      </div>
      
      <div className="relative z-10 flex-grow pt-32 pb-16 w-full">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <Link href={`/${lang}/shop`} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity mb-8 border-b-2 border-transparent hover:border-[var(--text-primary)] pb-1">
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {dict.nav.shop}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-[var(--text-primary)]">
            {dict.orderForm.title}
          </h1>
        </div>

        <div className="px-6 relative z-10">
          <OrderForm dict={dict} lang={lang} productId={id} productName={productName} price={price} />
        </div>
      </div>
      
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
