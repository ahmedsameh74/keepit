export default function CartLoading() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 animate-pulse relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 w-64 bg-[var(--text-primary)]/20 mb-12 border-b-8 border-[var(--cta-bg)]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 p-4 border-4 border-[var(--text-primary)] bg-white shadow-[8px_8px_0px_0px_var(--text-primary)]">
                <div className="w-full sm:w-48 h-48 bg-[var(--text-primary)]/10 border-2 border-[var(--text-primary)]"></div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-8 w-3/4 bg-[var(--text-primary)]/20 mb-2"></div>
                    <div className="h-6 w-1/4 bg-[var(--text-primary)]/10 mb-4"></div>
                    <div className="h-4 w-1/2 bg-[var(--text-primary)]/10 mb-2"></div>
                    <div className="h-4 w-1/3 bg-[var(--text-primary)]/10"></div>
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="h-10 w-32 bg-[var(--text-primary)]/10 border-2 border-[var(--text-primary)]"></div>
                    <div className="h-10 w-10 bg-[var(--text-primary)]/20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-[var(--text-primary)] p-8 shadow-[12px_12px_0px_0px_var(--text-primary)] sticky top-32">
              <div className="h-8 w-48 bg-[var(--text-primary)]/20 mb-8 border-b-4 border-black pb-2"></div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <div className="h-6 w-24 bg-[var(--text-primary)]/10"></div>
                  <div className="h-6 w-16 bg-[var(--text-primary)]/20"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-6 w-24 bg-[var(--text-primary)]/10"></div>
                  <div className="h-6 w-16 bg-[var(--text-primary)]/20"></div>
                </div>
                <div className="flex justify-between border-t-4 border-black pt-4 mt-4">
                  <div className="h-8 w-32 bg-[var(--text-primary)]/20"></div>
                  <div className="h-8 w-24 bg-[var(--text-primary)]/30"></div>
                </div>
              </div>
              
              <div className="h-14 w-full bg-[var(--text-primary)]/20 border-4 border-[var(--text-primary)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
