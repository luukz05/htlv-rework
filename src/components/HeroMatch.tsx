/* eslint-disable @next/next/no-img-element */
import { liveMatches } from "@/data/mock";
import TeamLogo from "./TeamLogo";

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function HeroMatch() {
  const match = liveMatches[0];

  return (
    <section className="relative overflow-hidden">
      {/* Katowice arena background — high-res, focused on top center */}
      <img
        src={`${B}/news/katowice-bg.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top scale-105"
      />
      {/* Heavy dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-bg-body/70" />
      {/* Team color side accents */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${match.team1.color}20 0%, transparent 25%, transparent 75%, ${match.team2.color}20 100%)`,
        }}
      />
      {/* Subtle blue radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(37,99,235,0.1),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-10 md:py-14">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-3 animate-fade-in-up">
          <span className="flex items-center gap-2 rounded-full bg-red/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red animate-glow">
            <span className="h-2 w-2 rounded-full bg-red animate-pulse-dot" />
            Live
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            {match.event} &middot; Grand Final
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 md:justify-between">
          <div className="flex items-center gap-6 md:gap-10 animate-scale-in">
            {/* Team 1 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: `radial-gradient(circle, ${match.team1.color}44, transparent)` }} />
                <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-2xl bg-bg-card border border-border p-2.5 md:p-4 flex items-center justify-center transition-transform group-hover:scale-105" style={{ borderColor: `${match.team1.color}33` }}>
                  <TeamLogo src={match.team1.logo} name={match.team1.name} size={64} className="w-full h-full" />
                </div>
              </div>
              <span className="text-base md:text-lg font-bold">{match.team1.name}</span>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl md:text-7xl font-black tabular-nums tracking-tight" style={{ color: (match.score1 ?? 0) >= (match.score2 ?? 0) ? match.team1.color : undefined }}>{match.score1}</span>
                <span className="text-xl text-text-muted font-light">:</span>
                <span className="text-5xl md:text-7xl font-black tabular-nums tracking-tight" style={{ color: (match.score2 ?? 0) >= (match.score1 ?? 0) ? match.team2.color : undefined }}>{match.score2}</span>
              </div>
              <span className="mt-2 rounded-full bg-blue/15 px-3 py-1 text-xs font-semibold text-blue-light border border-blue/20">
                Map 2: {match.map}
              </span>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: `radial-gradient(circle, ${match.team2.color}44, transparent)` }} />
                <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-2xl bg-bg-card border border-border p-2.5 md:p-4 flex items-center justify-center transition-transform group-hover:scale-105" style={{ borderColor: `${match.team2.color}33` }}>
                  <TeamLogo src={match.team2.logo} name={match.team2.name} size={64} className="w-full h-full" />
                </div>
              </div>
              <span className="text-base md:text-lg font-bold">{match.team2.name}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 animate-slide-in">
            <a href="#" className="flex items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20 hover:-translate-y-0.5 active:scale-95">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Watch Broadcast
            </a>
            <a href="#" className="flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:text-text-primary hover:border-blue/30 hover:bg-blue-glow">
              Detailed Stats
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
