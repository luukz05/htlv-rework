import Link from "next/link";
import TeamLogo from "@/components/TeamLogo";
import CountryFlag from "@/components/CountryFlag";
import { api } from "@/services/api";

export const metadata = {
  title: "Fantasy - Leaderboard and Player Prices",
};

export default async function FantasyPage() {
  const { leaderboard, fantasyPlayers } = await resolvePageData({
    leaderboard: api.fantasyLeaderboard(),
    fantasyPlayers: api.fantasyPlayers(),
  });

  return (
    <main className="mx-auto max-w-[1380px] px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-secondary">Home</Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-text-primary">Fantasy</span>
      </div>

      {/* Hero */}
      <div className="mb-10 rounded-xl border border-border bg-gradient-to-br from-blue/10 via-bg-card to-purple-500/10 p-8 md:p-12 text-center animate-fade-in-up card-glow">
        <div className="inline-flex items-center gap-2 bg-blue/15 border border-blue/30 rounded-full px-4 py-1.5 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-light">Season 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">HLTV Fantasy League</h1>
        <p className="text-text-secondary max-w-lg mx-auto mb-6">
          Build your dream CS2 roster, compete against thousands of players, and climb the global leaderboard.
        </p>
        <button className="rounded-xl bg-blue px-8 py-3 text-sm font-bold text-white transition-all hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20">
          Create Your Team
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Player cards */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Top Fantasy Picks
            </h2>
            <span className="text-[11px] text-text-muted">IEM Katowice 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fantasyPlayers.map((player, i) => (
              <div
                key={player.rank}
                className={`rounded-xl border border-border bg-bg-card p-4 hover:border-border-hover hover:bg-bg-card-hover transition-all card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <span className="player-photo-frame block w-14 h-14 overflow-hidden rounded-lg">
                      <img src={player.image} alt={player.name} className="player-photo player-photo--avatar" />
                    </span>
                    <div className="absolute -bottom-1 -right-1">
                      <TeamLogo src={player.teamLogo} name={player.team} size={18} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm"><CountryFlag countryCode={player.country} preferredFlag={player.countryFlag} /></span>
                      <h3 className="text-sm font-bold">{player.name}</h3>
                    </div>
                    <p className="text-[11px] text-text-muted mb-2">{player.team}</p>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-lg font-black text-green tabular-nums">{player.fantasyPoints}</p>
                        <p className="text-[9px] font-bold uppercase text-text-muted">Points</p>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div className="text-center">
                        <p className="text-sm font-bold text-yellow tabular-nums">${player.price}M</p>
                        <p className="text-[9px] font-bold uppercase text-text-muted">Price</p>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div className="text-center">
                        <p className="text-sm font-bold text-blue-light tabular-nums">{player.owned}</p>
                        <p className="text-[9px] font-bold uppercase text-text-muted">Owned</p>
                      </div>
                    </div>
                  </div>
                  <button className="shrink-0 rounded-lg border border-green/30 bg-green/10 px-3 py-1.5 text-[11px] font-bold text-green hover:bg-green/20 transition-colors">
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Global Leaderboard
            </h2>
          </div>

          <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-1">
            <div className="grid grid-cols-[40px_1fr_80px_50px] gap-2 px-4 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
              <span>#</span>
              <span>Manager</span>
              <span className="text-right">Points</span>
              <span className="text-right">+/-</span>
            </div>
            <div className="divide-y divide-border">
              {leaderboard.map((entry, i) => (
                <div
                  key={entry.rank}
                  className={`grid grid-cols-[40px_1fr_80px_50px] gap-2 items-center px-4 py-3 hover:bg-bg-card-hover transition-all animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
                >
                  <span className={`text-sm font-bold tabular-nums ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}`}>
                    {entry.rank}.
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{entry.name}</p>
                    <p className="text-[10px] text-text-muted truncate">{entry.team}</p>
                  </div>
                  <span className="text-sm font-bold text-right tabular-nums">{entry.points.toLocaleString()}</span>
                  <span className={`text-xs font-bold text-right tabular-nums ${
                    entry.change.startsWith("+") ? "text-green" : entry.change.startsWith("-") ? "text-red" : "text-text-muted"
                  }`}>
                    {entry.change === "0" ? "—" : entry.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
