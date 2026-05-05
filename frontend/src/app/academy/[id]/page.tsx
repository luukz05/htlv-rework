import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { academyGuides } from "@/data/mock";

export function generateStaticParams() {
  return academyGuides.map((g) => ({ id: g.id.toString() }));
}

const categoryColors: Record<string, { color: string; bg: string }> = {
  economy: { color: "#22c55e", bg: "bg-green/15" },
  aim: { color: "#ef4444", bg: "bg-red/15" },
  movement: { color: "#eab308", bg: "bg-yellow/15" },
  utility: { color: "#f97316", bg: "bg-orange/15" },
  communication: { color: "#3b82f6", bg: "bg-blue/15" },
  mindset: { color: "#a855f7", bg: "bg-purple-500/15" },
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green/20 text-green",
  Intermediate: "bg-yellow/20 text-yellow",
  Advanced: "bg-red/20 text-red",
};

export default async function GuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = academyGuides.find((g) => g.id.toString() === id);

  if (!guide) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[800px] px-5 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Guide not found</h1>
          <Link href="/academy" className="text-blue-light hover:text-blue">Back to Academy</Link>
        </main>
        <Footer />
      </>
    );
  }

  const cat = categoryColors[guide.category];

  return (
    <>
      <Header />

      {/* Hero image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={guide.image} alt={guide.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-bg-body/60 to-transparent" />
      </div>

      <main className="mx-auto max-w-[800px] px-5 -mt-16 relative z-10 pb-16">
        {/* Header card */}
        <div className="rounded-xl border border-border bg-bg-card p-6 md:p-8 mb-8 card-glow animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary">Home</Link>
            <span>&rsaquo;</span>
            <Link href="/academy" className="hover:text-text-secondary">Academy</Link>
            <span>&rsaquo;</span>
            <span className="text-text-primary truncate">{guide.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded capitalize ${cat.bg}`} style={{ color: cat.color }}>
              {guide.category}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${difficultyColors[guide.difficulty]}`}>
              {guide.difficulty}
            </span>
            <span className="text-[10px] text-text-muted bg-bg-surface px-2.5 py-1 rounded font-bold">
              {guide.readTime} read
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black mb-3">{guide.title}</h1>
          <p className="text-text-secondary leading-relaxed">{guide.description}</p>
        </div>

        {/* Table of Contents */}
        <div className="rounded-xl border border-border bg-bg-card p-5 mb-8 card-glow animate-fade-in-up delay-1">
          <h2 className="text-sm font-bold mb-3 text-text-muted uppercase tracking-wider">In this guide</h2>
          <ol className="space-y-1.5">
            {guide.sections.map((section, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="text-xs font-bold text-text-muted tabular-nums w-5">{i + 1}.</span>
                <span className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer">{section.title}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {guide.sections.map((section, i) => (
            <section
              key={i}
              className={`rounded-xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  {i + 1}
                </span>
                <h2 className="text-lg font-bold">{section.title}</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pl-11">{section.content}</p>
            </section>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Link
            href="/academy"
            className="flex items-center gap-2 rounded-xl border border-border bg-bg-card px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All Guides
          </Link>

          {/* Next guide */}
          {(() => {
            const idx = academyGuides.findIndex((g) => g.id === guide.id);
            const next = academyGuides[idx + 1];
            if (!next) return null;
            return (
              <Link
                href={`/academy/${next.id}`}
                className="flex items-center gap-2 rounded-xl border border-border bg-bg-card px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
              >
                {next.title.length > 30 ? next.title.slice(0, 30) + "..." : next.title}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            );
          })()}
        </div>
      </main>
      <Footer />
    </>
  );
}
