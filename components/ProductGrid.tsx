import ProductCard from "./ProductCard";

export default function ProductGrid({ dict }: { dict: any }) {
  const products = [
    {
      id: 1,
      name: "Classic NFC Card",
      price: "$29.99",
      color: "bg-[var(--text-primary)]/10",
    },
    {
      id: 2,
      name: "Premium Metal Card",
      price: "$59.99",
      color: "bg-[var(--text-primary)]/20",
    },
    {
      id: 3,
      name: "Smart Keyfob",
      price: "$39.99",
      color: "bg-[var(--text-primary)]/30",
    }
  ];

  return (
    <section className="relative z-30 bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-[var(--text-primary)] border-b-8 border-[var(--text-primary)] pb-4 inline-block rounded-none">
          {dict.products.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
