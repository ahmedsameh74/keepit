import { getDictionary } from "../../dictionaries/getDictionary";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import ProductGrid from "../../components/ProductGrid";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar dict={dict} lang={lang} />
      <Hero dict={dict} />
      <ProductGrid dict={dict} />
    </main>
  );
}
