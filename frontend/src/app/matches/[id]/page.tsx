import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { liveMatches, upcomingMatches, recentResults, topPlayers } from "@/data/mock";

const allMatches = [...liveMatches, ...upcomingMatches, ...recentResults];

export function generateStaticParams() {
  return allMatches.map((m) => ({ id: m.id.toString() }));
}

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = allMatches.find((m) => m.id.toString() === id);
  if (!match) {
    return (<><Header /><main className="mx-auto max-w-[800px] px-5 py-16 text-center"><h1 className="text-2xl font-bold mb-4">Match not found</h1><Link href="/matches" className="text-blue-light">Back to Matches</Link></main><Footer /></>);
  }

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const fakePlayers = topPlayers.slice(0, 5);

  return (
    <>
      <Header />
      <div className={`border-b border-border ${isLive ? "bg-gradient-to-b from-red/5 to-bg-body" : "bg-gradient-to-b from-bg-surface to-bg-body"}`}>
        <div className="mx-auto max-w-[1000px] px-5 py-8">
          <div className="mb-4 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary">Home</Link><span className="mx-2">&rsaquo;</span>
            <Link href="/matches" className="hover:text-text-secondary">Matches</Link><span className="mx-2">&rsaquo;</span>
            <span className="text-text-primary">{match.team1.abbr} vs {match.team2.abbr}</span>
          </div>
          <div className="text-center">
            {isLive && <div className="inline-flex items-center gap-1.5 bg-red px-3 py-1 rounded-full mb-4"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" /><span className="text-[10px] font-black uppercase tracking-wider text-white">Live</span></div>}
            <p className="text-sm text-text-muted mb-4">{match.event} &middot; {match.format}{match.map ? ` — ${match.map}` : ""}</p>
            <div className="flex items-center justify-center gap-8 md:gap-16 mb-4">
              <div className="text-center"><TeamLogo src={match.team1.logo} name={match.team1.name} size={64} /><h2 className="text-lg font-bold mt-2">{match.team1.name}</h2></div>
              <div className="text-center">
                {isFinished || isLive ? (
                  <div className="flex items-center gap-3"><span className={`text-4xl font-black tabular-nums ${(match.score1 ?? 0) > (match.score2 ?? 0) ? "text-green" : "text-text-muted"}`}>{match.score1}</span><span className="text-2xl text-text-muted">:</span><span className={`text-4xl font-black tabular-nums ${(match.score2 ?? 0) > (match.score1 ?? 0) ? "text-green" : "text-text-muted"}`}>{match.score2}</span></div>
                ) : (
                  <div><p className="text-3xl font-black">{match.time}</p><p className="text-sm text-text-muted">{match.date}</p></div>
                )}
              </div>
              <div className="text-center"><TeamLogo src={match.team2.logo} name={match.team2.name} size={64} /><h2 className="text-lg font-bold mt-2">{match.team2.name}</h2></div>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-[1000px] px-5 py-8 space-y-8">
        {/* Scoreboard */}
        {(isFinished || isLive) && (
          <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
            <div className="px-5 py-3 border-b border-border"><h2 className="text-base font-bold">Scoreboard — {match.team1.abbr}</h2></div>
            <div className="grid grid-cols-[1fr_60px_60px_50px_60px] gap-2 px-5 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
              <span>Player</span><span className="text-right">K</span><span className="text-right">D</span><span className="text-right">ADR</span><span className="text-right">Rating</span>
            </div>
            <div className="divide-y divide-border">
              {fakePlayers.map((p) => (
                <Link key={p.rank} href={`/players/${p.rank}`} className="grid grid-cols-[1fr_60px_60px_50px_60px] gap-2 items-center px-5 py-2.5 hover:bg-bg-card-hover transition-all">
                  <div className="flex items-center gap-2"><span className="text-sm">{p.countryFlag}</span><span className="text-sm font-semibold">{p.name}</span></div>
                  <span className="text-sm text-right tabular-nums">{18 + Math.floor(Math.random() * 10)}</span>
                  <span className="text-sm text-right tabular-nums">{10 + Math.floor(Math.random() * 8)}</span>
                  <span className="text-xs text-right tabular-nums text-text-muted">{65 + Math.floor(Math.random() * 30)}</span>
                  <span className="text-sm font-bold text-green text-right tabular-nums">{(0.9 + Math.random() * 0.6).toFixed(2)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Head to head */}
        <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-1">
          <h2 className="text-base font-bold mb-4">Head to Head</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-black text-green">7</p><p className="text-[10px] text-text-muted uppercase">{match.team1.abbr} Wins</p></div>
            <div><p className="text-2xl font-black text-text-muted">2</p><p className="text-[10px] text-text-muted uppercase">Draws</p></div>
            <div><p className="text-2xl font-black text-blue-light">5</p><p className="text-[10px] text-text-muted uppercase">{match.team2.abbr} Wins</p></div>
          </div>
        </section>

        {/* Map veto (simulated) */}
        <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-2">
          <h2 className="text-base font-bold mb-4">Map Veto</h2>
          <div className="space-y-2 text-sm">
            {[
              { team: match.team1.abbr, action: "removed", map: "Nuke" },
              { team: match.team2.abbr, action: "removed", map: "Ancient" },
              { team: match.team1.abbr, action: "picked", map: match.map || "Mirage" },
              { team: match.team2.abbr, action: "picked", map: "Inferno" },
              { team: match.team1.abbr, action: "removed", map: "Anubis" },
              { team: match.team2.abbr, action: "removed", map: "Tuscan" },
              { team: "Decider", action: "left over", map: "Dust II" },
            ].map((v, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${v.action === "picked" ? "bg-green/5 border border-green/20" : v.action === "left over" ? "bg-yellow/5 border border-yellow/20" : "bg-red/5 border border-red/10"}`}>
                <span className="text-xs font-bold w-16">{v.team}</span>
                <span className={`text-[10px] font-bold uppercase ${v.action === "picked" ? "text-green" : v.action === "left over" ? "text-yellow" : "text-red"}`}>{v.action}</span>
                <span className="font-semibold">{v.map}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
