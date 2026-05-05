import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { playerProfiles } from "@/data/mock";

export default function PlayersPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-secondary">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Players</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Player Database</h1>
        <p className="text-sm text-text-secondary mb-8">Detailed statistics and profiles for the top CS2 professional players</p>

        {/* Top 3 podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {playerProfiles.slice(0, 3).map((p, i) => (
            <Link
              key={p.id}
              href={`/players/${p.id}`}
              className={`group relative rounded-xl border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-${i + 1} ${
                i === 0 ? "border-yellow/30 md:row-start-1 md:-mt-0" : i === 1 ? "border-text-muted/30" : "border-orange/30"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.nickname} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-2xl font-black ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : "rank-bronze"}`}>#{p.id}</span>
                </div>
                <div className="absolute top-3 right-3">
                  <TeamLogo src={p.teamLogo} name={p.team} size={28} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{p.countryFlag}</span>
                  <h3 className="text-xl font-black group-hover:text-blue-light transition-colors">{p.nickname}</h3>
                </div>
                <p className="text-xs text-text-muted mb-3">{p.realName} &middot; {p.role}</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { l: "Rating", v: p.rating2.toFixed(2), c: "text-green" },
                    { l: "K/D", v: p.kd, c: "text-blue-light" },
                    { l: "ADR", v: p.adr.toString(), c: "text-orange" },
                    { l: "HS%", v: p.hsPercent, c: "text-yellow" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className={`text-sm font-bold tabular-nums ${s.c}`}>{s.v}</p>
                      <p className="text-[9px] text-text-muted uppercase">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Full table */}
        <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
          <div className="grid grid-cols-[40px_1fr_70px_50px_55px_50px_50px_55px_70px] gap-2 px-5 py-3 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
            <span>#</span>
            <span>Player</span>
            <span className="text-right">Rating</span>
            <span className="text-right">K/D</span>
            <span className="text-right">ADR</span>
            <span className="text-right">HS%</span>
            <span className="text-right">KAST</span>
            <span className="text-right">Maps</span>
            <span className="text-right">Team</span>
          </div>
          <div className="divide-y divide-border">
            {playerProfiles.map((p, i) => (
              <Link
                key={p.id}
                href={`/players/${p.id}`}
                className={`grid grid-cols-[40px_1fr_70px_50px_55px_50px_50px_55px_70px] gap-2 items-center px-5 py-3 hover:bg-bg-card-hover transition-all animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
              >
                <span className={`text-sm font-bold tabular-nums ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}`}>
                  {p.id}.
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.nickname} className="w-8 h-8 rounded-full object-cover object-top shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{p.countryFlag}</span>
                      <span className="text-sm font-semibold truncate">{p.nickname}</span>
                    </div>
                    <span className="text-[10px] text-text-muted">{p.realName}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-green text-right tabular-nums">{p.rating2.toFixed(2)}</span>
                <span className="text-xs text-text-secondary text-right tabular-nums">{p.kd}</span>
                <span className="text-xs text-text-secondary text-right tabular-nums">{p.adr}</span>
                <span className="text-xs text-text-secondary text-right tabular-nums">{p.hsPercent}</span>
                <span className="text-xs text-text-secondary text-right tabular-nums">{p.kast}</span>
                <span className="text-xs text-text-secondary text-right tabular-nums">{p.mapsPlayed}</span>
                <div className="flex justify-end">
                  <TeamLogo src={p.teamLogo} name={p.team} size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
