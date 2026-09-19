export default function ContactLoading() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pt-24">
      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-6 animate-pulse">
        <div className="w-full max-w-2xl bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-8 md:p-12 brutal-shadow">
          <div className="h-12 w-64 bg-[var(--text-primary)]/20 mx-auto mb-4 border-b-8 border-[var(--cta-bg)]"></div>
          <div className="h-6 w-48 bg-[var(--text-primary)]/10 mx-auto mb-12"></div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-6 w-24 bg-[var(--text-primary)]/20 mb-2"></div>
                <div className="h-14 w-full bg-[var(--text-primary)]/10 border-4 border-[var(--text-primary)]"></div>
              </div>
              <div>
                <div className="h-6 w-24 bg-[var(--text-primary)]/20 mb-2"></div>
                <div className="h-14 w-full bg-[var(--text-primary)]/10 border-4 border-[var(--text-primary)]"></div>
              </div>
            </div>
            <div>
              <div className="h-6 w-24 bg-[var(--text-primary)]/20 mb-2"></div>
              <div className="h-14 w-full bg-[var(--text-primary)]/10 border-4 border-[var(--text-primary)]"></div>
            </div>
            <div>
              <div className="h-6 w-24 bg-[var(--text-primary)]/20 mb-2"></div>
              <div className="h-32 w-full bg-[var(--text-primary)]/10 border-4 border-[var(--text-primary)]"></div>
            </div>
            
            <div className="h-16 w-full bg-[var(--text-primary)]/20 border-4 border-[var(--text-primary)] mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
