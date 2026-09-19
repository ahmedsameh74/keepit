export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-transparent animate-pulse flex flex-col pt-24">
      {/* Hero Skeleton */}
      <div className="h-[70vh] flex flex-col justify-center px-6 max-w-7xl mx-auto w-full">
        <div className="h-20 w-3/4 md:w-1/2 bg-[var(--text-primary)]/20 mb-6"></div>
        <div className="h-16 w-1/2 md:w-1/3 bg-[var(--text-primary)]/10 mb-8"></div>
        <div className="h-14 w-48 bg-[var(--text-primary)]/20 border-4 border-transparent"></div>
      </div>

      {/* Featured Products Skeleton */}
      <div className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="h-12 w-64 bg-[var(--text-primary)]/20 mb-16"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[450px] border-4 border-[var(--text-primary)] bg-[var(--bg-primary)] flex flex-col">
              <div className="h-64 w-full bg-[var(--text-primary)]/10"></div>
              <div className="p-6 flex flex-col flex-1 border-t-4 border-[var(--text-primary)]">
                <div className="h-8 w-3/4 bg-[var(--text-primary)]/20 mb-2"></div>
                <div className="h-6 w-1/2 bg-[var(--text-primary)]/10 mb-8"></div>
                <div className="h-12 w-full bg-[var(--text-primary)]/20 mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
