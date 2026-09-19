export default function ShopLoading() {
  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col max-w-7xl mx-auto">
      <div className="h-12 w-48 bg-[var(--text-primary)]/20 mb-16 animate-pulse"></div>
      
      <div className="space-y-16">
        <div className="space-y-8">
          <div className="h-10 w-64 bg-[var(--text-primary)]/20 animate-pulse border-l-8 border-[var(--cta-bg)]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse border-4 border-[var(--text-primary)] bg-[var(--bg-primary)] flex flex-col h-full rounded-none">
                <div className="h-64 bg-[var(--text-primary)]/10"></div>
                <div className="p-6 border-t-4 border-[var(--text-primary)] flex flex-col flex-1">
                  <div className="h-8 w-3/4 bg-[var(--text-primary)]/20 mb-2"></div>
                  <div className="h-6 w-1/2 bg-[var(--text-primary)]/10 mb-8"></div>
                  <div className="h-12 w-full bg-[var(--text-primary)]/20 mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
