import { getDictionary } from "../../../dictionaries/getDictionary";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CartContent from "../../../components/CartContent";

export default async function CartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[var(--bg-primary)]">
      <Navbar dict={dict} lang={lang} />
      
      {/* Brutalist Background Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full text-[20vw] font-black leading-none break-all overflow-hidden text-[var(--text-primary)] whitespace-nowrap opacity-[0.03] flex items-center justify-center select-none">
          CART CART CART CART
        </div>
      </div>
      
      <div className="relative z-10 flex-grow pt-32 pb-16 w-full">
        <CartContent dict={dict} lang={lang} />
      </div>
      
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
