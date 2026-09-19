import Link from "next/link";

export default function ProductCard({ product, dict, lang }: { product: any; dict: any; lang: string }) {
  return (
    <div className="group border-4 border-[var(--text-primary)] bg-[var(--bg-primary)] hover:-translate-y-2 transition-transform duration-300 flex flex-col rounded-none">
      <div className={`h-64 ${product.image ? '' : (product.colors && product.colors[0]) || 'bg-[var(--text-primary)]/10'} relative overflow-hidden`}>
        {product.image ? (
          <img src={`http://localhost:3001${product.image}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[var(--bg-primary)] opacity-50 group-hover:scale-125 transition-transform duration-500 rounded-none"></div>
          </div>
        )}
      </div>
      
      <div className="p-6 border-t-4 border-[var(--text-primary)] flex flex-col flex-1">
        <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">
          {product.name}
        </h3>
        
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex gap-2">
            {product.colors?.map((c: string, i: number) => (
              <div 
                key={i} 
                className={`w-6 h-6 rounded-full border-2 border-[var(--text-primary)] ${c.startsWith('bg-') ? c : ''}`} 
                style={{ backgroundColor: c.startsWith('bg-') ? undefined : c }} 
                title={c}
              ></div>
            ))}
          </div>
          <p className="text-xl font-medium text-[var(--text-primary)]/70">
            {product.price}
          </p>
        </div>
        
        <Link href={`/${lang}/shop/${product.id}`} className="mt-auto w-full">
          <button className="w-full bg-[var(--cta-bg)] text-[var(--cta-text)] text-sm font-bold uppercase tracking-widest py-3 hover:opacity-90 transition-colors rounded-none">
            {dict.products.buyNow}
          </button>
        </Link>
      </div>
    </div>
  );
}
