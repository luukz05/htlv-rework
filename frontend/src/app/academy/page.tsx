import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { academyGuides } from "@/data/mock";

const categoryIcons: Record<string, { icon: string; color: string; bg: string }> = {
  economy: { icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", color: "#22c55e", bg: "bg-green/15" },
  aim: { icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v8M8 12h8", color: "#ef4444", bg: "bg-red/15" },
  movement: { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", color: "#eab308", bg: "bg-yellow/15" },
  utility: { icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", color: "#f97316", bg: "bg-orange/15" },
  communication: { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", color: "#3b82f6", bg: "bg-blue/15" },
  mindset: { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", color: "#a855f7", bg: "bg-purple-500/15" },
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green/20 text-green",
  Intermediate: "bg-yellow/20 text-yellow",
  Advanced: "bg-red/20 text-red",
};

export default function AcademyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <a href="/" className="hover:text-text-secondary">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Academy</span>
        </div>

        {/* Hero */}
        <div className="mb-10 rounded-xl border border-border bg-gradient-to-br from-purple-500/10 via-bg-card to-blue/10 p-8 md:p-12 animate-fade-in-up card-glow">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Learning Center</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3">CS2 Academy</h1>
            <p className="text-text-secondary leading-relaxed mb-6">
              From Silver to Global Elite. Comprehensive guides on economy, aim, movement, utility, communication, and the mental game. Written by analysts and pro players.
            </p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(categoryIcons).map(([cat, { color, bg }]) => (
                <span
                  key={cat}
                  className={`${bg} px-3 py-1.5 rounded-lg text-xs font-bold capitalize`}
                  style={{ color }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Guides", value: academyGuides.length.toString(), color: "text-blue-light" },
            { label: "Categories", value: "6", color: "text-purple-400" },
            { label: "Total Read Time", value: `${academyGuides.reduce((a, g) => a + parseInt(g.readTime), 0)} min`, color: "text-green" },
            { label: "Skill Levels", value: "3", color: "text-yellow" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-bg-card p-4 text-center card-glow">
              <p className={`text-xl font-black tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Guides grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {academyGuides.map((guide, i) => {
            const cat = categoryIcons[guide.category];
            return (
              <Link
                key={guide.id}
                href={`/academy/${guide.id}`}
                className={`group overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
              >
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={guide.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cat.bg}`} style={{ color: cat.color }}>
                      {guide.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${difficultyColors[guide.difficulty]}`}>
                      {guide.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {guide.readTime} read
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold leading-tight mb-1.5 group-hover:text-blue-light transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2 mb-3">{guide.description}</p>
                  <div className="flex items-center gap-1">
                    {guide.sections.slice(0, 3).map((s) => (
                      <span key={s.title} className="text-[9px] bg-bg-surface px-2 py-0.5 rounded text-text-muted truncate">
                        {s.title}
                      </span>
                    ))}
                    {guide.sections.length > 3 && (
                      <span className="text-[9px] text-text-muted">+{guide.sections.length - 3}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Map Utility CTA */}
        <div className="mt-12 rounded-xl border border-border bg-bg-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 card-glow animate-fade-in-up">
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">Looking for Map-Specific Utility?</h2>
            <p className="text-sm text-text-secondary">Check out our individual map pages for detailed smoke, flash, and molotov lineups with step-by-step instructions.</p>
          </div>
          <Link href="/maps" className="shrink-0 rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20">
            Browse Maps
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
