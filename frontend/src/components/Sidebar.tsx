import Link from "next/link";
import TeamLogo from "./TeamLogo";
import CountryFlag, { LanguageFlag } from "./CountryFlag";
import StatusPill from "./StatusPill";
import { api } from "@/services/api";
import type { Match, Player, RankedTeam, Stream } from "@/services/types";

function LiveMatches({ liveMatches, upcomingMatches }: { liveMatches: Match[]; upcomingMatches: Match[] }) {
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
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className={`block relative overflow-hidden px-4 py-3 hover:bg-bg-card-hover transition-all cursor-pointer animate-fade-in-up delay-${i + 1} ${
                match.status === "live" ? "animate-live-glow border-l-2 border-l-red bg-red/5" : ""
              }`}
              style={{
                background: match.status === "live" ? undefined : `linear-gradient(90deg, ${match.team1.color}10 0%, transparent 40%, transparent 60%, ${match.team2.color}10 100%)`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">{match.event}</span>
                <StatusPill status={match.status} />
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
            </Link>
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
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className={`flex items-center gap-2 px-4 py-2.5 hover:bg-bg-card-hover transition-all cursor-pointer animate-fade-in-up delay-${i + 1}`}
            >
              <TeamLogo src={match.team1.logo} name={match.team1.name} size={16} />
              <span className="text-xs font-medium truncate flex-1">{match.team1.shortname}</span>
              <div className="flex flex-col items-center shrink-0">
                <StatusPill status="upcoming" />
                <span className="text-[10px] font-bold text-blue-light">{match.time}</span>
              </div>
              <span className="text-xs font-medium truncate flex-1 text-right">{match.team2.shortname}</span>
              <TeamLogo src={match.team2.logo} name={match.team2.name} size={16} />
            </Link>
          ))}
        </div>
      </div>

      <Link href="/matches" className="block border-t border-border px-4 py-2.5 text-center text-xs font-medium text-blue-light hover:text-blue hover:bg-blue-glow transition-all">
        All matches ({liveMatches.length + upcomingMatches.length})
      </Link>
    </div>
  );
}

function RecentResults({ recentResults }: { recentResults: Match[] }) {
  return (
    <div className="flex h-[254px] flex-col rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
      <div className="shrink-0 px-4 py-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Recent Results
        </h3>
      </div>
      <div className="min-h-0 flex-1 divide-y divide-border overflow-hidden">
        {recentResults.slice(0, 5).map((match, i) => {
          const t1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
          const t2Won = (match.score2 ?? 0) > (match.score1 ?? 0);
          return (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className={`relative grid h-[41px] grid-cols-[16px_minmax(0,1fr)_52px_minmax(0,1fr)_16px] items-center gap-2 overflow-hidden px-4 hover:bg-bg-card-hover transition-all group animate-fade-in-up delay-${i + 1}`}
              style={{
                background: `linear-gradient(90deg, ${match.team1.color}08 0%, transparent 40%, transparent 60%, ${match.team2.color}08 100%)`,
              }}
            >
              <TeamLogo src={match.team1.logo} name={match.team1.name} size={16} />
              <span className={`min-w-0 truncate text-xs ${t1Won ? "font-bold" : "font-medium text-text-secondary"}`}>{match.team1.shortname}</span>
              <span className="flex items-center justify-center gap-1.5 text-sm tabular-nums">
                <span className={t1Won ? "font-bold text-green" : "text-text-muted"}>{match.score1}</span>
                <span className="text-text-muted/40 text-[10px]">:</span>
                <span className={t2Won ? "font-bold text-green" : "text-text-muted"}>{match.score2}</span>
              </span>
              <span className={`min-w-0 truncate text-right text-xs ${t2Won ? "font-bold" : "font-medium text-text-secondary"}`}>{match.team2.shortname}</span>
              <TeamLogo src={match.team2.logo} name={match.team2.name} size={16} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TopRanking({ ranking }: { ranking: RankedTeam[] }) {
  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          Top World Ranking
        </h3>
      </div>
      <div className="divide-y divide-border">
        {ranking.slice(0, 10).map((team, i) => {
          const content = (
            <>
              <span className={`text-xs font-bold w-5 tabular-nums ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}`}>{team.rank}.</span>
              <TeamLogo src={team.logo} name={team.name} size={22} />
              <span className="flex-1 text-sm font-semibold truncate">{team.name}</span>
              <div className="flex items-center gap-2">
                {team.change !== "same" && (
                  <span className={`text-[10px] font-bold ${team.change === "up" ? "text-green" : "text-red"}`}>
                    {team.change === "up" ? "▲" : "▼"}{team.changeVal}
                  </span>
                )}
                <span className="text-xs font-medium text-blue-light tabular-nums">{team.points} pts</span>
              </div>
            </>
          );

          const className = `flex items-center gap-3 px-4 py-2.5 hover:bg-bg-card-hover transition-all cursor-pointer animate-fade-in-up delay-${Math.min(i + 1, 5)}`;
          const style = { borderLeft: `3px solid ${team.color}` };

          return team.id ? (
            <Link key={team.rank} href={`/teams/${team.id}`} className={className} style={style}>
              {content}
            </Link>
          ) : (
            <div key={team.rank} className={className} style={style}>
              {content}
            </div>
          );
        })}
      </div>
      <Link href="/rankings" className="block border-t border-border px-4 py-2.5 text-center text-xs font-semibold text-blue-light hover:text-blue hover:bg-blue-glow transition-all">
        Full Ranking
      </Link>
    </div>
  );
}

function TopPlayerRatings({ topPlayers }: { topPlayers: Player[] }) {
  const players = topPlayers.slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Top Player Ratings
        </h3>
        <Link href="/rankings/players" className="text-xs font-semibold text-blue-light hover:text-blue transition-colors">Stats</Link>
      </div>
      <div className="divide-y divide-border">
        {players.map((player, i) => {
          const content = (
            <>
              <span className={`text-xs font-bold tabular-nums ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}`}>
                {player.rank}.
              </span>
              <div className="flex min-w-0 items-center gap-2">
                <CountryFlag countryCode={player.country} preferredFlag={player.countryFlag} className="text-xs" />
                <span className="truncate text-xs font-semibold">{player.name}</span>
              </div>
              <span className="text-right text-xs font-bold tabular-nums text-green">{player.rating.toFixed(2)}</span>
              <div className="flex justify-end">
                <TeamLogo src={player.teamLogo} name={player.team} size={16} />
              </div>
            </>
          );

          const className = `grid grid-cols-[24px_1fr_46px_34px] items-center gap-2 px-4 py-2.5 hover:bg-bg-card-hover transition-all animate-fade-in-up delay-${Math.min(i + 1, 5)}`;

          return (
            <Link key={player.rank} href="/rankings/players" className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function StreamList({ streams }: { streams: Stream[] }) {
  const sortedStreams = [...streams].sort((a, b) => b.viewers - a.viewers);

  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9146FF" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          Popular Streams
        </h3>
        <StatusPill status="live" />
      </div>
      <div className="divide-y divide-border">
        {sortedStreams.map((stream, i) => (
          <a
            key={stream.id}
            href="#"
            className={`grid grid-cols-[32px_1fr_auto] items-center gap-3 px-4 py-2.5 hover:bg-bg-card-hover transition-all animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
          >
            <span className="relative h-8 w-8 overflow-hidden rounded-md bg-bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stream.thumbnail} alt="" className="h-full w-full object-cover" />
              <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-red" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold">{stream.channel}</span>
              <span className="mt-0.5 flex items-center gap-1 text-[10px] text-text-muted">
                <LanguageFlag languageCode={stream.language} />
                {stream.language}
              </span>
            </span>
            <span className="text-xs font-bold text-purple-400 tabular-nums">
              {stream.viewers >= 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers}
            </span>
          </a>
        ))}
      </div>
      <Link href="/forums" className="block border-t border-border px-4 py-2.5 text-center text-xs font-semibold text-blue-light hover:text-blue hover:bg-blue-glow transition-all">
        All streams
      </Link>
    </div>
  );
}

export default async function Sidebar() {
  const { liveMatches, upcomingMatches, recentResults, ranking, topPlayers, streams } = await resolvePageData({
    liveMatches: api.liveMatches(),
    upcomingMatches: api.upcomingMatches(),
    recentResults: api.results(),
    ranking: api.rankings(),
    topPlayers: api.topPlayers(),
    streams: api.streams(),
  });

  return (
    <aside className="space-y-4">
      <LiveMatches liveMatches={liveMatches} upcomingMatches={upcomingMatches} />
      <RecentResults recentResults={recentResults} />
      <TopRanking ranking={ranking} />
      <TopPlayerRatings topPlayers={topPlayers} />
      <StreamList streams={streams} />
    </aside>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
