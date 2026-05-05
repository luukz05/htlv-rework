import { liveMatches, upcomingMatches, recentResults, ranking } from "@/data/mock";
import TeamLogo from "./TeamLogo";

function LiveMatches() {
  const upcoming3 = upcomingMatches.slice(0, 3);
  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Live Matches
        </h3>
        <span className="rounded-full bg-red/15 px-2.5 py-0.5 text-[10px] font-bold text-red uppercase tracking-wider animate-pulse-dot">
          {liveMatches.length} Active
        </span>
      </div>
      <div className="divide-y divide-border">
        {liveMatches.map((match, i) => {
          const t1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
          const t2Won = (match.score2 ?? 0) > (match.score1 ?? 0);
          return (
            <div
              key={match.id}
              className={`relative overflow-hidden px-4 py-3 hover:bg-bg-card-hover transition-all cursor-pointer animate-fade-in-up delay-${i + 1}`}
              style={{
                background: `linear-gradient(90deg, ${match.team1.color}10 0%, transparent 40%, transparent 60%, ${match.team2.color}10 100%)`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">{match.event}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-red">
                  <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse-dot" />
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TeamLogo src={match.team1.logo} name={match.team1.name} size={18} />
                <span className={`flex-1 text-sm font-semibold truncate ${t1Won ? "text-text-primary" : "text-text-secondary"}`}>{match.team1.name}</span>
                <span className={`text-sm font-bold tabular-nums ${t1Won ? "text-green" : "text-text-muted"}`}>{match.score1}</span>
                <span className="text-text-muted/40 text-[10px]">:</span>
                <span className={`text-sm font-bold tabular-nums ${t2Won ? "text-green" : "text-text-muted"}`}>{match.score2}</span>
                <span className={`flex-1 text-sm font-semibold truncate text-right ${t2Won ? "text-text-primary" : "text-text-secondary"}`}>{match.team2.name}</span>
                <TeamLogo src={match.team2.logo} name={match.team2.name} size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming matches */}
      <div className="border-t border-border">
        <div className="px-4 py-2.5 border-b border-border">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Upcoming</span>
        </div>
        <div className="divide-y divide-border">
          {upcoming3.map((match, i) => (
            <div
              key={match.id}
              className={`flex items-center gap-2 px-4 py-2.5 hover:bg-bg-card-hover transition-all cursor-pointer animate-fade-in-up delay-${i + 1}`}
            >
              <TeamLogo src={match.team1.logo} name={match.team1.name} size={16} />
              <span className="text-xs font-medium truncate flex-1">{match.team1.abbr}</span>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[10px] font-bold text-blue-light">{match.time}</span>
                <span className="text-[9px] text-text-muted">{match.date}</span>
              </div>
              <span className="text-xs font-medium truncate flex-1 text-right">{match.team2.abbr}</span>
              <TeamLogo src={match.team2.logo} name={match.team2.name} size={16} />
            </div>
          ))}
        </div>
      </div>

      <a href="#" className="block border-t border-border px-4 py-2.5 text-center text-xs font-medium text-blue-light hover:text-blue hover:bg-blue-glow transition-all">
        All matches ({liveMatches.length + upcomingMatches.length})
      </a>
    </div>
  );
}

function RecentResults() {
  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Recent Results
        </h3>
      </div>
      <div className="divide-y divide-border">
        {recentResults.slice(0, 5).map((match, i) => {
          const t1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
          const t2Won = (match.score2 ?? 0) > (match.score1 ?? 0);
          return (
            <a
              key={match.id}
              href="#"
              className={`relative overflow-hidden flex items-center gap-2 px-4 py-2.5 hover:bg-bg-card-hover transition-all group animate-fade-in-up delay-${i + 1}`}
              style={{
                background: `linear-gradient(90deg, ${match.team1.color}08 0%, transparent 40%, transparent 60%, ${match.team2.color}08 100%)`,
              }}
            >
              <TeamLogo src={match.team1.logo} name={match.team1.name} size={16} />
              <span className={`text-xs truncate ${t1Won ? "font-bold" : "font-medium text-text-secondary"}`}>{match.team1.abbr}</span>
              <span className="mx-auto flex items-center gap-1.5 text-sm tabular-nums shrink-0">
                <span className={t1Won ? "font-bold text-green" : "text-text-muted"}>{match.score1}</span>
                <span className="text-text-muted/40 text-[10px]">:</span>
                <span className={t2Won ? "font-bold text-green" : "text-text-muted"}>{match.score2}</span>
              </span>
              <span className={`text-xs truncate text-right ${t2Won ? "font-bold" : "font-medium text-text-secondary"}`}>{match.team2.abbr}</span>
              <TeamLogo src={match.team2.logo} name={match.team2.name} size={16} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function TopRanking() {
  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          Top World Ranking
        </h3>
      </div>
      <div className="divide-y divide-border">
        {ranking.slice(0, 10).map((team, i) => (
          <div
            key={team.rank}
            className={`flex items-center gap-3 px-4 py-2.5 hover:bg-bg-card-hover transition-all cursor-pointer animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
            style={{ borderLeft: `3px solid ${team.color}` }}
          >
            <span className={`text-xs font-bold w-5 tabular-nums ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}`}>{team.rank}.</span>
            <TeamLogo src={team.logo} name={team.name} size={22} />
            <span className="flex-1 text-sm font-semibold">{team.name}</span>
            <div className="flex items-center gap-2">
              {team.change !== "same" && (
                <span className={`text-[10px] font-bold ${team.change === "up" ? "text-green" : "text-red"}`}>
                  {team.change === "up" ? "▲" : "▼"}{team.changeVal}
                </span>
              )}
              <span className="text-xs font-medium text-blue-light tabular-nums">{team.points} pts</span>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="block border-t border-border px-4 py-2.5 text-center text-xs font-semibold text-blue-light hover:text-blue hover:bg-blue-glow transition-all">
        Full Ranking
      </a>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="space-y-4">
      <LiveMatches />
      <RecentResults />
      <TopRanking />
    </aside>
  );
}
