export default function Loading() {
  return (
    <main className="mx-auto max-w-[1380px] animate-pulse px-4 py-8">
      <div className="mb-6 h-4 w-56 rounded-full bg-text-muted/20" />

      <section className="mb-8 grid gap-4 rounded-xl border border-border bg-bg-card p-5 md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="h-8 w-72 max-w-full rounded-full bg-text-muted/20" />
          <div className="h-3 w-full max-w-lg rounded-full bg-text-muted/15" />
          <div className="h-3 w-4/5 max-w-md rounded-full bg-text-muted/15" />
          <div className="flex flex-wrap gap-2 pt-3">
            <div className="h-9 w-28 rounded-lg bg-bg-card-hover" />
            <div className="h-9 w-24 rounded-lg bg-bg-card-hover" />
            <div className="h-9 w-32 rounded-lg bg-bg-card-hover" />
          </div>
        </div>

        <div className="hidden rounded-xl border border-border bg-bg-body/45 p-4 md:block">
          <div className="mb-4 h-4 w-28 rounded-full bg-text-muted/20" />
          <div className="space-y-3">
            <LoadingRow />
            <LoadingRow />
            <LoadingRow />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-xl border border-border bg-bg-card">
          <div className="grid grid-cols-[56px_1fr_80px_80px_80px] gap-3 border-b border-border bg-bg-body/45 px-4 py-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-3 rounded-full bg-text-muted/15" />
            ))}
          </div>
          <div className="divide-y divide-border/60">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="grid grid-cols-[56px_1fr_80px_80px_80px] items-center gap-3 px-4 py-3">
                <div className="h-3 rounded-full bg-text-muted/20" />
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-bg-card-hover" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3 w-2/5 rounded-full bg-text-muted/25" />
                    <div className="h-2 w-1/4 rounded-full bg-text-muted/15" />
                  </div>
                </div>
                <div className="h-3 rounded-full bg-text-muted/15" />
                <div className="h-3 rounded-full bg-text-muted/15" />
                <div className="h-3 rounded-full bg-text-muted/15" />
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <SideSkeleton />
          <SideSkeleton compact />
        </aside>
      </section>
    </main>
  );
}

function LoadingRow() {
  return (
    <div className="grid grid-cols-[32px_1fr] items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-bg-card-hover" />
      <div className="space-y-2">
        <div className="h-2.5 w-4/5 rounded-full bg-text-muted/20" />
        <div className="h-2 w-1/2 rounded-full bg-text-muted/15" />
      </div>
    </div>
  );
}

function SideSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-4">
      <div className="mb-4 h-4 w-32 rounded-full bg-text-muted/20" />
      <div className="space-y-3">
        {Array.from({ length: compact ? 4 : 6 }).map((_, index) => (
          <LoadingRow key={index} />
        ))}
      </div>
    </div>
  );
}
