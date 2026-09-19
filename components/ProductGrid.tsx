import ProductCard from "./ProductCard";

export default async function ProductGrid({ dict, limit, lang }: { dict: any; limit?: number; lang: string }) {
  let products: any[] = [];
  try {
    const res = await fetch("http://localhost:3001/api/products", { cache: "no-store" });
    if (res.ok) {
      products = await res.json();
    }
  } catch(err) {
    console.error("Failed to fetch products", err);
  }

  // Group by category
  const categoriesMap = new Map();
  for (const product of products) {
    if (!categoriesMap.has(product.category)) {
      categoriesMap.set(product.category, []);
    }
    categoriesMap.get(product.category).push({
      ...product,
      price: `${product.price} EGP` // Format price for frontend
    });
  }
  
  const categories = Array.from(categoriesMap.entries()).map(([title, items]) => ({
    title,
    items
  }));

  const displayedProducts = limit ? products.slice(0, limit).map((p: any) => ({...p, price: `${p.price} EGP`})) : products.map((p: any) => ({...p, price: `${p.price} EGP`}));

  return (
    <section className="relative z-30 bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-[var(--text-primary)] border-b-8 border-[var(--text-primary)] pb-4 inline-block rounded-none">
          {dict.products.title}
        </h2>
        
        {limit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} dict={dict} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {categories.length === 0 && (
              <div className="text-xl font-bold uppercase text-[var(--text-primary)]/50">No products available.</div>
            )}
            {categories.map((category, idx) => (
              <div key={idx} className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] border-l-8 border-[var(--cta-bg)] pl-4">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((product: any) => (
                    <ProductCard key={product.id} product={product} dict={dict} lang={lang} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
