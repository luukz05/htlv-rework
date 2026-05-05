import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { teamProfiles } from "@/data/mock";

export function generateStaticParams() {
  return teamProfiles.map((t) => ({ id: t.id }));
}

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = teamProfiles.find((t) => t.id === id);

  if (!team) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[800px] px-5 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Team not found</h1>
          <Link href="/rankings" className="text-blue-light">Back to Rankings</Link>
        </main>
        <Footer />
      </>
    );
  }

  const winCount = team.last10Results.filter((r) => r === "W").length;
  const captain = team.roster.find((p) => p.isCaptain);

  return (
    <>
      <Header />

      {/* Hero Banner */}
      <div className="border-b border-border" style={{ background: `linear-gradient(to bottom, ${team.color}12, var(--color-bg-body))` }}>
        <div className="mx-auto max-w-[1200px] px-5 py-8">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary">Home</Link>
            <span className="mx-2">&rsaquo;</span>
            <Link href="/rankings" className="hover:text-text-secondary">Rankings</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-text-primary">{team.name}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Team logo */}
            <div className="shrink-0">
              <TeamLogo src={team.logo} name={team.name} size={64} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-3xl font-black">{team.name}</h1>
                <span className="rounded-md bg-blue/15 px-2 py-0.5 text-xs font-bold text-blue-light">{team.region}</span>
                <span className="rounded-md bg-yellow/15 px-2 py-0.5 text-xs font-bold text-yellow">World #{team.worldRanking}</span>
              </div>
              <p className="text-sm text-text-muted mb-4">{team.countryFlag} {team.country} &middot; Est. {team.founded}</p>

              {/* Key stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { l: "Win Rate", v: `${team.overallWinRate}%`, c: "text-green" },
                  { l: "Maps Played", v: team.totalMapsPlayed.toLocaleString(), c: "text-blue-light" },
                  { l: "Majors Won", v: team.majorsWon.toString(), c: "text-yellow" },
                  { l: "Prize Earnings", v: team.totalPrizeEarnings, c: "text-orange" },
                ].map((s) => (
                  <div key={s.l} className="text-center rounded-lg bg-bg-card border border-border px-2 py-2.5">
                    <p className={`text-lg font-bold tabular-nums ${s.c}`}>{s.v}</p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Left column */}
          <div className="space-y-8">
            {/* Roster */}
            <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <h2 className="text-base font-bold">Active Roster</h2>
                <span className="text-xs text-text-muted">{team.roster.length} players</span>
              </div>
              <div className="divide-y divide-border">
                {team.roster.map((player) => (
                  <div key={player.nickname} className="flex items-center gap-4 px-5 py-3 hover:bg-bg-card-hover transition-all">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={player.image} alt={player.nickname} className="w-12 h-12 rounded-full object-cover object-top border border-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {player.playerId > 0 ? (
                          <Link href={`/players/${player.playerId}`} className="text-sm font-semibold hover:text-blue-light transition-colors">
                            {player.nickname}
                          </Link>
                        ) : (
                          <span className="text-sm font-semibold">{player.nickname}</span>
                        )}
                        {player.isCaptain && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308" className="shrink-0">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        )}
                        <span className="text-xs text-text-muted">{player.countryFlag}</span>
                      </div>
                      <p className="text-xs text-text-muted truncate">{player.realName}</p>
                    </div>
                    <span className="hidden sm:block rounded-md bg-blue/10 px-2 py-0.5 text-[10px] font-bold text-blue-light">{player.role}</span>
                    <span className={`text-sm font-bold tabular-nums ${player.rating >= 1.10 ? "text-green" : "text-text-secondary"}`}>
                      {player.rating.toFixed(2)}
                    </span>
                    <span className="text-xs text-text-muted hidden sm:block tabular-nums">{player.joinDate}</span>
                  </div>
                ))}
              </div>
              {/* Coach */}
              <div className="border-t border-border px-5 py-3 flex items-center gap-4 bg-bg-body/30">
                <div className="w-12 h-12 rounded-full bg-bg-surface border border-border flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{team.coach.nickname}</span>
                    <span className="text-xs text-text-muted">{team.coach.countryFlag}</span>
                  </div>
                  <p className="text-xs text-text-muted">{team.coach.realName}</p>
                </div>
                <span className="rounded-md bg-purple-400/10 px-2 py-0.5 text-[10px] font-bold text-purple-400">Coach</span>
              </div>
            </section>

            {/* Current Form */}
            <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-1">
              <h2 className="text-base font-bold mb-4">Current Form</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {team.last10Results.map((r, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        r === "W" ? "bg-green/20 text-green" : "bg-red/20 text-red"
                      }`}
                    >
                      {r}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-text-secondary ml-2">
                  Win Rate: <span className={winCount >= 6 ? "text-green" : winCount >= 4 ? "text-yellow" : "text-red"}>{winCount * 10}%</span>
                </span>
              </div>
            </section>

            {/* Map Pool */}
            <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-2">
              <div className="px-5 py-3 border-b border-border">
                <h2 className="text-base font-bold">Map Pool</h2>
              </div>
              <div className="grid grid-cols-[1fr_55px_80px_60px_60px] gap-2 px-5 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
                <span>Map</span>
                <span className="text-right">Played</span>
                <span className="text-right">Win Rate</span>
                <span className="text-right">CT%</span>
                <span className="text-right">T%</span>
              </div>
              <div className="divide-y divide-border">
                {team.mapStats.map((m) => (
                  <div key={m.map} className="grid grid-cols-[1fr_55px_80px_60px_60px] gap-2 items-center px-5 py-3 hover:bg-bg-card-hover transition-all">
                    <span className="text-sm font-semibold">{m.map}</span>
                    <span className="text-xs text-text-muted text-right tabular-nums">{m.played}</span>
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-14 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${m.winRate}%`,
                            backgroundColor: m.winRate >= 70 ? "#22c55e" : m.winRate >= 60 ? "#3b82f6" : "#eab308",
                          }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-text-secondary">{m.winRate}%</span>
                    </div>
                    <span className="text-xs tabular-nums text-blue-light text-right">{m.ctWinRate}%</span>
                    <span className="text-xs tabular-nums text-orange text-right">{m.tWinRate}%</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Matches */}
            <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-3">
              <div className="px-5 py-3 border-b border-border">
                <h2 className="text-base font-bold">Recent Matches</h2>
              </div>
              <div className="divide-y divide-border">
                {team.recentMatches.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-bg-card-hover transition-all">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${m.result === "W" ? "bg-green/15 text-green" : "bg-red/15 text-red"}`}>
                      {m.result}
                    </span>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xs text-text-muted">vs</span>
                      <TeamLogo src={m.opponentLogo} name={m.opponent} size={18} />
                      <span className="text-sm font-semibold truncate">{m.opponent}</span>
                    </div>
                    <span className="text-sm font-bold tabular-nums">{m.score}</span>
                    <span className="text-xs text-text-muted hidden sm:block truncate max-w-[140px]">{m.event}</span>
                    <span className="text-xs text-text-muted hidden sm:block">{m.format}</span>
                    <span className="text-xs text-text-muted tabular-nums">{m.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            {team.achievements.length > 0 && (
              <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                <div className="px-5 py-3 border-b border-border">
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#eab308">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                    Achievements
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {team.achievements.map((a, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-bg-card-hover transition-all">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        a.placement === "1st" ? "bg-yellow/15 text-yellow" : "bg-bg-body/50 text-text-secondary"
                      }`}>
                        <span className="text-xs font-black">{a.placement}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{a.event}</p>
                        <p className="text-xs text-text-muted">{a.date}</p>
                      </div>
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        a.tier === "S" ? "bg-yellow/15 text-yellow" : a.tier === "A" ? "bg-blue/15 text-blue-light" : "bg-bg-body/50 text-text-muted"
                      }`}>
                        Tier {a.tier}
                      </span>
                      {a.prize && (
                        <span className="text-xs font-bold text-green hidden sm:block">{a.prize}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Transfer History */}
            {team.transfers.length > 0 && (
              <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                <div className="px-5 py-3 border-b border-border">
                  <h2 className="text-base font-bold">Transfer History</h2>
                </div>
                <div className="divide-y divide-border">
                  {team.transfers.map((t, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-bg-card-hover transition-all">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        t.direction === "in" ? "bg-green/15 text-green" : "bg-red/15 text-red"
                      }`}>
                        {t.direction === "in" ? (
                          <span className="flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                            IN
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                            OUT
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-semibold flex-1">{t.player}</span>
                      <span className="text-xs text-text-muted">
                        {t.direction === "in" ? `from ${t.fromTeam}` : `to ${t.toTeam}`}
                      </span>
                      <span className="text-xs text-text-muted tabular-nums">{t.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Team Info card (Liquipedia-style infobox) */}
            <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
              <div className="px-4 py-5 flex flex-col items-center border-b border-border" style={{ background: `linear-gradient(to bottom, ${team.color}10, transparent)` }}>
                <TeamLogo src={team.logo} name={team.name} size={64} />
                <h3 className="text-lg font-bold mt-3">{team.name}</h3>
                <span className="text-xs text-text-muted">{team.abbr}</span>
              </div>
              <div className="p-4 space-y-2 text-xs">
                {[
                  ["Full Name", team.name],
                  ["Abbreviation", team.abbr],
                  ["Region", team.region],
                  ["Country", `${team.countryFlag} ${team.country}`],
                  ["Founded", team.founded],
                  ["Coach", `${team.coach.nickname} ${team.coach.countryFlag}`],
                  ["World Ranking", `#${team.worldRanking}`],
                  ["Peak Ranking", `#${team.peakRanking} (${team.peakRankingDate})`],
                  ["Weeks in Top 5", team.weeksInTop5.toString()],
                  ["Weeks in Top 10", team.weeksInTop10.toString()],
                  ["Total Prize", team.totalPrizeEarnings],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-text-muted">{label}</span>
                    <span className="font-bold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Head-to-Head */}
            {team.headToHead.length > 0 && (
              <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-1">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-sm font-bold">Head-to-Head</h3>
                </div>
                <div className="divide-y divide-border">
                  {team.headToHead.map((h, i) => {
                    const total = h.wins + h.losses;
                    const winPct = total > 0 ? (h.wins / total) * 100 : 50;
                    return (
                      <div key={i} className="px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-text-muted">vs</span>
                          <TeamLogo src={h.opponentLogo} name={h.opponent} size={16} />
                          <span className="text-xs font-semibold truncate">{h.opponent}</span>
                          <span className="ml-auto text-xs font-bold tabular-nums">
                            <span className="text-green">{h.wins}</span>
                            <span className="text-text-muted mx-0.5">-</span>
                            <span className="text-red">{h.losses}</span>
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-border overflow-hidden flex">
                          <div className="h-full bg-green rounded-l-full" style={{ width: `${winPct}%` }} />
                          <div className="h-full bg-red rounded-r-full" style={{ width: `${100 - winPct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Back link */}
            <Link href="/rankings" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              All Rankings
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
