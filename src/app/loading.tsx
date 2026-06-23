
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="animate-pulse space-y-12">
        <header className="space-y-4">
          <div className="h-12 w-3/4 bg-muted rounded-xl"></div>
          <div className="h-6 w-1/2 bg-muted rounded-xl"></div>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 border rounded-xl p-4">
              <div className="h-48 w-full bg-muted rounded-lg"></div>
              <div className="h-8 w-3/4 bg-muted rounded-lg"></div>
              <div className="h-4 w-full bg-muted rounded-lg"></div>
              <div className="h-4 w-full bg-muted rounded-lg"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-muted rounded-full"></div>
                <div className="h-6 w-16 bg-muted rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
