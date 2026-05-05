import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import { highlights } from "@/data/mock";

const typeLabels: Record<string, { label: string; color: string }> = {
  clutch: { label: "Clutch", color: "bg-purple-500/20 text-purple-400" },
  ace: { label: "Ace", color: "bg-red/20 text-red" },
  awp: { label: "AWP", color: "bg-green/20 text-green" },
  pistol: { label: "Pistol", color: "bg-yellow/20 text-yellow" },
  wallbang: { label: "Wallbang", color: "bg-orange/20 text-orange" },
  deagle: { label: "Deagle", color: "bg-blue/20 text-blue-light" },
};

const allTypes = ["all", "clutch", "ace", "awp", "pistol", "wallbang", "deagle"];

export default function HighlightsPage() {
  const featured = highlights[0];
  const rest = highlights.slice(1);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <a href="/" className="hover:text-text-secondary">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Highlights</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Best Plays & Highlights</h1>
        <p className="text-sm text-text-secondary mb-6">The most insane plays from professional CS2 matches</p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {allTypes.map((type, i) => (
            <button
              key={type}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors capitalize ${
                i === 0
                  ? "bg-blue text-white"
                  : "border border-border bg-bg-card text-text-secondary hover:text-text-primary hover:border-border-hover"
              }`}
            >
              {type === "all" ? "All Plays" : type}
            </button>
          ))}
        </div>

        {/* Featured highlight */}
        <div className="mb-8 rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto overflow-hidden group cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all">
                <div className="h-16 w-16 rounded-full bg-red/90 flex items-center justify-center shadow-lg shadow-red/30 transition-transform group-hover:scale-110">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <polygon points="6 3 20 12 6 21 6 3"/>
                  </svg>
                </div>
              </div>
              <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded ${typeLabels[featured.type].color}`}>
                {typeLabels[featured.type].label}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.playerImage} alt={featured.player} className="w-10 h-10 rounded-full object-cover object-top" />
                <div>
                  <p className="text-sm font-bold">{featured.player}</p>
                  <div className="flex items-center gap-1.5">
                    <TeamLogo src={featured.teamLogo} name={featured.team} size={14} />
                    <span className="text-[11px] text-text-muted">{featured.team}</span>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold leading-snug mb-2">{featured.title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{featured.description}</p>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span>{featured.event}</span>
                <span>&middot;</span>
                <span>{featured.map}</span>
                <span>&middot;</span>
                <span>{featured.date}</span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1 text-text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  {(featured.views / 1000).toFixed(0)}K views
                </span>
                <span className="flex items-center gap-1 text-red">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {(featured.likes / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((hl, i) => (
            <div
              key={hl.id}
              className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
            >
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hl.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div className="h-12 w-12 rounded-full bg-red/90 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <polygon points="6 3 20 12 6 21 6 3"/>
                    </svg>
                  </div>
                </div>
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${typeLabels[hl.type].color}`}>
                  {typeLabels[hl.type].label}
                </span>
                <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {hl.map}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hl.playerImage} alt={hl.player} className="w-6 h-6 rounded-full object-cover object-top" />
                  <span className="text-xs font-semibold">{hl.player}</span>
                  <TeamLogo src={hl.teamLogo} name={hl.team} size={14} />
                </div>
                <h3 className="text-sm font-semibold leading-tight mb-1.5 group-hover:text-blue-light transition-colors">{hl.title}</h3>
                <p className="text-xs text-text-muted line-clamp-2 mb-2">{hl.description}</p>
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span>{hl.event} &middot; {hl.date}</span>
                  <div className="flex items-center gap-3">
                    <span>{(hl.views / 1000).toFixed(0)}K</span>
                    <span className="text-red">{(hl.likes / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
