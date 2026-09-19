export default function ProfileLoading() {
  return (
    <div className="min-h-screen pt-32 px-6 flex-grow max-w-4xl mx-auto w-full mb-20 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-16 w-64 bg-[var(--text-primary)]/20 mx-auto mb-4"></div>
        <div className="h-8 w-48 bg-[var(--text-primary)]/10 mx-auto"></div>
      </div>
      
      <div className="bg-[var(--bg-secondary)] border-4 border-[var(--text-primary)] p-6 md:p-12 brutal-shadow">
        <div className="flex justify-between items-center mb-8 border-b-4 border-[var(--text-primary)] pb-4">
          <div className="h-10 w-48 bg-[var(--text-primary)]/20"></div>
          <div className="h-12 w-24 bg-[var(--text-primary)]/20"></div>
        </div>
        
        <div className="space-y-10">
          <div>
            <div className="h-8 w-32 bg-[var(--text-primary)]/20 mb-4"></div>
            <div className="h-32 w-full bg-[var(--text-primary)]/10 border-4 border-[var(--text-primary)]"></div>
          </div>
          
          <div>
            <div className="h-8 w-32 bg-[var(--text-primary)]/20 mb-4"></div>
            <div className="flex gap-4">
              <div className="h-64 w-48 bg-[var(--text-primary)]/10 border-4 border-[var(--text-primary)]"></div>
              <div className="h-64 w-48 bg-[var(--text-primary)]/10 border-4 border-[var(--text-primary)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
