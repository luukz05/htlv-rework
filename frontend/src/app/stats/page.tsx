/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import CountryFlag from "@/components/CountryFlag";
import { api } from "@/services/api";

export const metadata = {
  title: "Stats - Player Ratings",
};

export default async function StatsPage() {
  const { topPlayers } = await resolvePageData({
    topPlayers: api.topPlayers(),
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1380px] px-4 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary">Home</a><span className="mx-2">&rsaquo;</span><span className="text-text-primary">Stats</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Player Statistics</h1>
        <p className="text-sm text-text-muted mb-8">Top-rated players across all events in 2026</p>
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All Maps", "Mirage", "Inferno", "Nuke", "Anubis", "Ancient", "Dust2"].map((f, i) => (
            <button key={f} className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${i === 0 ? "bg-blue text-white" : "bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-hover"}`}>{f}</button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-bold uppercase tracking-wider text-text-muted">
                <th className="px-4 py-3 text-left w-12">#</th>
                <th className="px-4 py-3 text-left">Player</th>
                <th className="px-4 py-3 text-left">Team</th>
                <th className="px-4 py-3 text-center">K-D Diff</th>
                <th className="px-4 py-3 text-center">ADR</th>
                <th className="px-4 py-3 text-center">KAST</th>
                <th className="px-4 py-3 text-center">Rating 2.1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topPlayers.map((player, i) => (
                <tr key={player.rank} className="transition-all hover:bg-bg-card-hover cursor-pointer animate-fade-in-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  <td className="px-4 py-3.5 font-bold tabular-nums">
                    <span className={i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}>{player.rank}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="player-photo-frame h-10 w-10 rounded-full overflow-hidden shrink-0 border-2 border-border">
                        <img src={player.image} alt={player.name} className="player-photo player-photo--avatar" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-base"><CountryFlag countryCode={player.country} preferredFlag={player.countryFlag} /></span>
                          <p className="font-semibold leading-tight">{player.name}</p>
                        </div>
                        <p className="text-[11px] text-text-muted">{player.realName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <TeamLogo src={player.teamLogo} name={player.team} size={18} />
                      <span className="text-text-secondary">{player.team}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center font-medium">
                    <span className="text-green">+{player.kd}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center text-text-secondary tabular-nums">{player.adr.toFixed(1)}</td>
                  <td className="px-4 py-3.5 text-center text-text-secondary">{player.kast}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-block rounded-md px-2.5 py-1 font-bold tabular-nums ${
                      player.rating >= 1.20 ? "bg-green/15 text-green" :
                      player.rating >= 1.10 ? "bg-blue/15 text-blue-light" :
                      "bg-bg-surface text-text-secondary"
                    }`}>
                      {player.rating.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link href="/players" className="text-sm font-medium text-blue-light hover:text-blue transition-colors">View All Player Profiles →</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
