import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { gameMaps } from "@/data/mock";

export function generateStaticParams() {
  return gameMaps.map((m) => ({ slug: m.slug }));
}

const utilityColors: Record<string, { bg: string; text: string; label: string }> = {
  smoke: { bg: "bg-blue/15", text: "text-blue-light", label: "Smoke" },
  flash: { bg: "bg-yellow/15", text: "text-yellow", label: "Flash" },
  molotov: { bg: "bg-orange/15", text: "text-orange", label: "Molotov" },
  he: { bg: "bg-red/15", text: "text-red", label: "HE Grenade" },
};

const diffColors: Record<string, string> = {
  Easy: "text-green",
  Medium: "text-yellow",
  Hard: "text-red",
};

export default async function MapDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const map = gameMaps.find((m) => m.slug === slug);

  if (!map) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[1200px] px-5 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Map not found</h1>
          <Link href="/maps" className="text-blue-light hover:text-blue">Back to Maps</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={map.image} alt={map.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-bg-body/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-[1200px] px-5 pb-6">
            <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary">Home</Link>
              <span>&rsaquo;</span>
              <Link href="/maps" className="hover:text-text-secondary">Maps</Link>
              <span>&rsaquo;</span>
              <span className="text-text-primary">{map.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-black">{map.name}</h1>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                map.pool === "active" ? "bg-green/20 text-green" : "bg-text-muted/20 text-text-muted"
              }`}>
                {map.pool === "active" ? "Active Duty" : "Removed"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Description */}
        <p className="text-text-secondary leading-relaxed mb-8 max-w-3xl">{map.description}</p>

        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {[
            { label: "CT Win Rate", value: `${map.ctWinRate}%`, color: "text-blue-light" },
            { label: "T Win Rate", value: `${map.tWinRate}%`, color: "text-yellow" },
            { label: "Avg Rounds", value: map.avgRounds.toString(), color: "text-text-primary" },
            { label: "Pick Rate", value: `${map.pickRate}%`, color: "text-green" },
            { label: "Ban Rate", value: `${map.banRate}%`, color: "text-red" },
            { label: "Pro Matches", value: map.totalProMatches.toLocaleString(), color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-bg-card p-4 text-center card-glow animate-fade-in-up">
              <p className={`text-2xl font-black tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Side balance visualization */}
        <section className="mb-10 rounded-xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up">
          <h2 className="text-base font-bold mb-4">Side Balance</h2>
          <div className="max-w-xl">
            <div className="flex items-center justify-between text-sm font-bold mb-2">
              <span className="text-blue-light">CT Side — {map.ctWinRate}%</span>
              <span className="text-yellow">T Side — {map.tWinRate}%</span>
            </div>
            <div className="h-4 rounded-full bg-yellow/30 overflow-hidden">
              <div className="h-full rounded-full bg-blue-light transition-all" style={{ width: `${map.ctWinRate}%` }} />
            </div>
            <p className="text-xs text-text-muted mt-2">
              {map.ctWinRate > 53 ? "This map favors CT side. Strong defensive positions make it harder for T side to execute." :
               map.ctWinRate < 48 ? "This map slightly favors T side with strong attacking options and good utility potential." :
               "This is one of the most balanced maps in the pool, offering fair chances for both sides."}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-10">

            {/* Utility Guides */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                Utility Guide ({map.utilityGuides.length} lineups)
              </h2>
              <div className="space-y-3">
                {map.utilityGuides.map((util, i) => {
                  const uc = utilityColors[util.type];
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border border-border bg-bg-card p-4 hover:bg-bg-card-hover transition-all card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`shrink-0 ${uc.bg} ${uc.text} text-[10px] font-bold px-2.5 py-1 rounded-lg mt-0.5`}>
                          {uc.label}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-bold">{util.name}</h3>
                            <span className={`text-[10px] font-bold ${diffColors[util.difficulty]}`}>
                              {util.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted mb-1">
                            <span className="font-semibold text-text-secondary">From:</span> {util.from}
                          </p>
                          <p className="text-xs text-text-secondary leading-relaxed">{util.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Callouts */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Callouts ({map.callouts.length} positions)
              </h2>
              <div className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up">
                <div className="flex flex-wrap gap-2">
                  {map.callouts.map((callout) => (
                    <span
                      key={callout}
                      className="rounded-lg border border-border bg-bg-body/50 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors cursor-default"
                    >
                      {callout}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Famous highlights */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Famous Plays on {map.name}
              </h2>
              <div className="space-y-3">
                {map.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border border-border bg-bg-card p-4 hover:bg-bg-card-hover transition-all card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold">{hl.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-text-muted mb-2">
                      <span className="font-semibold text-text-secondary">{hl.player}</span>
                      <span>&middot;</span>
                      <span>{hl.event}</span>
                      <span>&middot;</span>
                      <span>{hl.round}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{hl.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Results */}
            {map.recentResults.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Recent Results on {map.name}
                </h2>
                <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                  <div className="divide-y divide-border">
                    {map.recentResults.map((result, i) => (
                      <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-bg-card-hover transition-all">
                        <div className="flex items-center gap-2 flex-1 justify-end">
                          <span className="text-sm font-semibold">{result.team1}</span>
                          <TeamLogo src={result.team1Logo} name={result.team1} size={20} />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-lg font-black tabular-nums ${result.score1 > result.score2 ? "text-green" : "text-text-muted"}`}>{result.score1}</span>
                          <span className="text-text-muted text-xs">:</span>
                          <span className={`text-lg font-black tabular-nums ${result.score2 > result.score1 ? "text-green" : "text-text-muted"}`}>{result.score2}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <TeamLogo src={result.team2Logo} name={result.team2} size={20} />
                          <span className="text-sm font-semibold">{result.team2}</span>
                        </div>
                        <div className="text-right shrink-0 hidden sm:block">
                          <p className="text-[11px] text-text-muted">{result.event}</p>
                          <p className="text-[10px] text-text-muted/60">{result.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Best teams */}
            <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-bold">Best Teams on {map.name}</h3>
              </div>
              <div className="divide-y divide-border">
                {map.bestTeams.map((team, i) => (
                  <div key={team.name} className="flex items-center gap-3 px-4 py-3 hover:bg-bg-card-hover transition-all">
                    <span className={`text-sm font-bold tabular-nums w-5 ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}`}>
                      {i + 1}.
                    </span>
                    <TeamLogo src={team.logo} name={team.name} size={20} />
                    <span className="text-sm font-semibold flex-1 truncate">{team.name}</span>
                    <span className="text-sm font-bold text-green tabular-nums">{team.winRate}%</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Map pool info */}
            <section className="rounded-xl border border-border bg-bg-card p-4 card-glow animate-fade-in-up">
              <h3 className="text-sm font-bold mb-3">Map Pool Status</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Status</span>
                  <span className={map.pool === "active" ? "text-green font-bold" : "text-text-muted font-bold"}>
                    {map.pool === "active" ? "Active Duty" : "Removed"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Pick Rate</span>
                  <span className="font-bold">{map.pickRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Ban Rate</span>
                  <span className="font-bold">{map.banRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Avg Rounds</span>
                  <span className="font-bold">{map.avgRounds}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Total Pro Matches</span>
                  <span className="font-bold">{map.totalProMatches.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* Utility count */}
            <section className="rounded-xl border border-border bg-bg-card p-4 card-glow animate-fade-in-up">
              <h3 className="text-sm font-bold mb-3">Utility Guide Summary</h3>
              <div className="space-y-2">
                {(["smoke", "flash", "molotov", "he"] as const).map((type) => {
                  const count = map.utilityGuides.filter((u) => u.type === type).length;
                  if (count === 0) return null;
                  const uc = utilityColors[type];
                  return (
                    <div key={type} className="flex items-center justify-between text-xs">
                      <span className={`${uc.bg} ${uc.text} px-2 py-0.5 rounded font-bold`}>{uc.label}</span>
                      <span className="font-bold">{count} lineup{count > 1 ? "s" : ""}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Back to maps */}
            <Link
              href="/maps"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All Maps
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
