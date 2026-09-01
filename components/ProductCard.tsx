export default function ProductCard({ product, dict }: { product: any; dict: any }) {
  return (
    <div className="group border-4 border-[var(--foreground)] bg-[var(--background)] hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className={`h-64 ${product.color} relative overflow-hidden`}>
        {/* Abstract Product Representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[var(--background)] opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
        </div>
      </div>
      
      <div className="p-6 border-t-4 border-[var(--foreground)] flex flex-col flex-1">
        <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">
          {product.name}
        </h3>
        <p className="text-xl font-medium text-[var(--foreground)]/70 mb-8">
          {product.price}
        </p>
        
        <button className="mt-auto w-full bg-[var(--foreground)] text-[var(--background)] font-bold uppercase tracking-widest py-4 hover:bg-[var(--color-primary)] transition-colors">
          {dict.products.buyNow}
        </button>
      </div>
    </div>
  );
}
