import { getDictionary } from "../../dictionaries/getDictionary";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import ProductGrid from "../../components/ProductGrid";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen relative bg-transparent">
      <Navbar dict={dict} lang={lang} />
      <Hero dict={dict} />
      <ProductGrid dict={dict} limit={3} lang={lang} />
      <ContactSection dict={dict} lang={lang} />
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
