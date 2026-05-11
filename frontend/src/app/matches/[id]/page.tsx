import TeamLogo from "@/components/TeamLogo";
import Image from "next/image";
import Link from "next/link";
import CountryFlag from "@/components/CountryFlag";
import { api } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import type { Event, Match, Player, Team, TeamProfile, TeamRoster } from "@/services/types";
import { compactTitle, matchTitle } from "@/lib/page-title";
import MatchHeadToHeadClient from "./MatchHeadToHeadClient";
import { getMapBackground, getMapIcon } from "@/lib/maps";
import { notFound } from "next/navigation";

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";
const CT_ICON = "https://static.wikia.nocookie.net/cswikia/images/2/2a/Ct_logo.svg/revision/latest/scale-to-width-down/250?cb=20250307112005";
const TR_ICON = "https://static.wikia.nocookie.net/cswikia/images/e/e0/Icon-t-patch-small.png/revision/latest?cb=20220130164538";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [liveMatches, upcomingMatches, recentResults] = await Promise.all([
    api.liveMatches(),
    api.upcomingMatches(),
    api.results(),
  ]);
  const [events, teams] = await Promise.all([api.events(), api.teamCards()]);
  const generatedEventMatches = buildListedEventMatches(events, teams, [...liveMatches, ...upcomingMatches, ...recentResults]);
  const match = [...liveMatches, ...upcomingMatches, ...recentResults, ...generatedEventMatches].find((m) => m.id.toString() === id);

  return {
    title: match ? compactTitle(matchTitle(match), 74) : "Match not found",
  };
}

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { topPlayers, teamProfiles, teamRosters, events, teams, liveMatches, upcomingMatches, recentResults } = await resolvePageData({
    liveMatches: api.liveMatches(),
    upcomingMatches: api.upcomingMatches(),
    recentResults: api.results(),
    topPlayers: api.topPlayers(),
    teamProfiles: api.teams(),
    teamRosters: api.teamRosters(),
    events: api.events(),
    teams: api.teamCards(),
  });

  const { id } = await params;
  const generatedEventMatches = buildListedEventMatches(events, teams, [...liveMatches, ...upcomingMatches, ...recentResults]);
  const allMatches = [...liveMatches, ...upcomingMatches, ...recentResults, ...generatedEventMatches];
  const match = allMatches.find((m) => m.id.toString() === id);
  if (!match) {
    notFound();
  }

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const fakePlayers = topPlayers.slice(0, 5);
  const team1Lineup = getTeamLineup(match.team1, teamProfiles, teamRosters, topPlayers);
  const team2Lineup = getTeamLineup(match.team2, teamProfiles, teamRosters, topPlayers);
  const team1Rank = getTeamWorldRank(match.team1, teamProfiles);
  const team2Rank = getTeamWorldRank(match.team2, teamProfiles);
  const primaryHeaderMap = getPrimaryHeaderMap(match);
  const mapBackground = getMapBackground(primaryHeaderMap);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-border bg-bg-body">
        <div className="mx-auto max-w-[1400px] px-5 pt-8 pb-4">
          <div className="mb-4 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary">Home</Link><span className="mx-2">&rsaquo;</span>
            <Link href="/matches" className="hover:text-text-secondary">Matches</Link><span className="mx-2">&rsaquo;</span>
            <span className="text-text-primary">{match.team1.shortname} vs {match.team2.shortname}</span>
          </div>
          <div
            className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-cover bg-center px-5 py-6 text-center"
            style={{
              backgroundImage: `
                linear-gradient(90deg, ${match.team1.color}2f 0%, rgba(10,14,22,0.58) 36%, rgba(10,14,22,0.58) 64%, ${match.team2.color}2f 100%),
                linear-gradient(180deg, rgba(10,14,22,0.6), rgba(10,14,22,0.9)),
                url("${mapBackground}")
              `,
            }}
          >
            <div className="mx-auto max-w-[1060px]">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                <HeaderPill label={match.format} />
                <HeaderPill label={primaryHeaderMap || "TBA"} tone="blue" />
                <HeaderPill label={isFinished ? "Finished" : match.date || "Upcoming"} />
              </div>

              <div className="grid items-center gap-5 md:grid-cols-[1fr_220px_1fr]">
                <MatchHeaderTeam team={match.team1} align="left" side="CT" />
                <div className="text-center">
                  {isLive && <div className="mb-2 inline-flex items-center gap-1.5 rounded bg-red px-2.5 py-1"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" /><span className="text-[10px] font-black uppercase tracking-wider text-white">Live</span></div>}
                  {isFinished || isLive ? (
                    <div className="flex items-center justify-center gap-3">
                      <span className={`text-5xl font-black tabular-nums ${(match.score1 ?? 0) > (match.score2 ?? 0) ? "text-green" : "text-text-muted"}`}>{match.score1}</span>
                      <span className="text-xl font-bold text-text-muted">:</span>
                      <span className={`text-5xl font-black tabular-nums ${(match.score2 ?? 0) > (match.score1 ?? 0) ? "text-green" : "text-text-muted"}`}>{match.score2}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-4xl font-black tabular-nums text-text-primary">{match.time}</p>
                      <p className="mt-1 text-xs font-bold text-text-muted">{match.date}</p>
                    </>
                  )}
                  <Link href="/events" className="mt-3 block text-sm font-bold text-blue-light hover:text-text-primary">{match.event}</Link>
                  <p className="mt-1 text-xs text-text-muted">{isFinished ? "Finished" : isLive ? "Current map" : "Scheduled match"}</p>
                </div>
                <MatchHeaderTeam team={match.team2} align="right" side="TR" />
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <HeaderVetoStrip match={match} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-[1120px] px-5 py-8 space-y-8 flex-1">
        {/* Scoreboard */}
        {(isFinished || isLive) && (
          <section className="hidden rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
            <div className="px-5 py-3 border-b border-border"><h2 className="text-base font-bold">Scoreboard — {match.team1.shortname}</h2></div>
            <div className="grid grid-cols-[1fr_60px_60px_50px_60px] gap-2 px-5 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
              <span>Player</span><span className="text-right">K</span><span className="text-right">D</span><span className="text-right">ADR</span><span className="text-right">Rating</span>
            </div>
            <div className="divide-y divide-border">
              {fakePlayers.map((p) => (
                <Link key={p.rank} href="/rankings/players" className="grid grid-cols-[1fr_60px_60px_50px_60px] gap-2 items-center px-5 py-2.5 hover:bg-bg-card-hover transition-all">
                  <div className="flex items-center gap-2"><span className="text-sm"><CountryFlag countryCode={p.country} preferredFlag={p.countryFlag} /></span><span className="text-sm font-semibold">{p.name}</span></div>
                  <span className="text-sm text-right tabular-nums">{18 + Math.floor(Math.random() * 10)}</span>
                  <span className="text-sm text-right tabular-nums">{10 + Math.floor(Math.random() * 8)}</span>
                  <span className="text-xs text-right tabular-nums text-text-muted">{65 + Math.floor(Math.random() * 30)}</span>
                  <span className="text-sm font-bold text-green text-right tabular-nums">{(0.9 + Math.random() * 0.6).toFixed(2)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <MatchHeadToHeadClient team1={match.team1} team2={match.team2} team1Rank={team1Rank} team2Rank={team2Rank} team1Lineup={team1Lineup} team2Lineup={team2Lineup} />
        <ConsolidatedMatchView match={match} />
      </main>
    </div>
  );
}
type LineupPlayer = {
  nickname: string;
  image: string;
  role?: string;
  country?: string;
  countryFlag?: string;
  rating?: number;
};

type MatchMapSummary = {
  map: string;
  score1?: number;
  score2?: number;
};

type HeaderVetoStep = {
  team: string;
  kind: "pick" | "ban" | "decider";
  map: string;
  score1?: number;
  score2?: number;
};

const activeMapPool = ["Mirage", "Inferno", "Nuke", "Ancient", "Anubis", "Dust II", "Overpass"];

function HeaderPill({ label, tone = "default" }: { label: string; tone?: "default" | "blue" | "red" }) {
  const toneClass = tone === "blue"
    ? "border-blue-light/30 bg-blue/15 text-blue-light"
    : tone === "red"
      ? "border-red/30 bg-red/15 text-red"
      : "border-white/10 bg-white/10 text-text-secondary";

  return (
    <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${toneClass}`}>
      {label}
    </span>
  );
}

function MatchHeaderTeam({ team, align, side }: { team: Team; align: "left" | "right"; side: "CT" | "TR" }) {
  const isRight = align === "right";
  const sideIcon = side === "CT" ? CT_ICON : TR_ICON;

  return (
    <div className={`flex items-center justify-center gap-4 ${isRight ? "md:flex-row-reverse md:text-right" : "md:text-left"}`}>
      <TeamLogo src={team.logo} name={team.name} size={74} className="h-[74px] w-[74px]" />
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-black text-text-primary md:text-3xl">{team.name}</h1>
        <div className={`mt-2 flex items-center justify-center gap-2 ${isRight ? "md:justify-end" : "md:justify-start"}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{team.shortname}</span>
          <span className="inline-flex items-center gap-1 rounded border border-white/10 bg-black/25 px-2 py-1 text-[10px] font-black text-text-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sideIcon} alt={side} className="h-4 w-4 object-contain" />
            {side}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConsolidatedMatchView({ match }: { match: Match }) {
  const maps = getHeaderMaps(match).slice(0, 3);
  const bettingRows = [
    { book: "CSGOLUCK", left: 1.88, right: 1.92, bonus: "+100% bonus", movement: "+0.04" },
    { book: "SkinClub", left: 1.94, right: 1.86, bonus: "Best return", movement: "-0.03" },
    { book: "HLTV Bet", left: 1.91, right: 1.89, bonus: "Most balanced", movement: "+0.01" },
  ];
  const pastMatches = [
    { date: "Mar 5", event: match.event, left: match.team1.shortname, right: match.team2.shortname, score: "13-11", map: match.map || "Mirage", winner: match.team1.shortname, type: "LAN" },
    { date: "Feb 28", event: "BLAST Premier", left: match.team2.shortname, right: match.team1.shortname, score: "2-1", map: "Inferno", winner: match.team2.shortname, type: "BO3" },
    { date: "Feb 16", event: "ESL Pro League", left: match.team1.shortname, right: match.team2.shortname, score: "10-13", map: "Anubis", winner: match.team2.shortname, type: "Online" },
  ];
  const team1Consensus = Math.round(bettingRows.reduce((sum, row) => sum + impliedProbability(row.left), 0) / bettingRows.length);
  const team2Consensus = Math.round(bettingRows.reduce((sum, row) => sum + impliedProbability(row.right), 0) / bettingRows.length);
  const h2hTeam1Wins = pastMatches.filter((item) => item.winner === match.team1.shortname).length;
  const h2hTeam2Wins = pastMatches.filter((item) => item.winner === match.team2.shortname).length;

  return (
    <section className="rounded-xl border border-border bg-bg-card card-glow animate-fade-in-up delay-2">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-black">Match overview</h2>
            <p className="text-xs text-text-muted">Betting, map stats and past matches in one view</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <OverviewMetric label="Maps" value={match.format} />
            <OverviewMetric label="H2H" value={`${h2hTeam1Wins}-${h2hTeam2Wins}`} />
            <OverviewMetric label="Market" value={`${team1Consensus}/${team2Consensus}`} suffix="%" />
          </div>
        </div>
      </div>
      <div className="grid gap-0 lg:grid-cols-3">
        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-text-secondary">Betting</h3>
            <span className="rounded bg-green/10 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-green">{match.status === "live" ? "live odds" : "odds"}</span>
          </div>
          <div className="mb-4 rounded-lg border border-border bg-bg-surface p-3">
            <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted">
              <span>Market consensus</span>
              <span>implied probability</span>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <span className="text-sm font-black text-text-primary">{match.team1.shortname}</span>
              <div className="h-2 rounded-full bg-bg-card">
                <div className="h-2 rounded-full bg-blue-light" style={{ width: `${team1Consensus}%` }} />
              </div>
              <span className="text-sm font-black text-blue-light tabular-nums">{team1Consensus}%</span>
            </div>
            <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <span className="text-sm font-black text-text-primary">{match.team2.shortname}</span>
              <div className="h-2 rounded-full bg-bg-card">
                <div className="h-2 rounded-full bg-green" style={{ width: `${team2Consensus}%` }} />
              </div>
              <span className="text-sm font-black text-green tabular-nums">{team2Consensus}%</span>
            </div>
          </div>
          <div className="space-y-3">
            {bettingRows.map((row) => (
              <div key={row.book} className="rounded-lg border border-border bg-bg-surface p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary">{row.book}</span>
                  <span className="text-[10px] font-bold uppercase text-text-muted">{row.bonus}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <OddBox team={match.team1.shortname} value={row.left} movement={row.movement} />
                  <OddBox team={match.team2.shortname} value={row.right} movement={row.movement.startsWith("-") ? "+0.03" : "-0.02"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-text-secondary">Map stats</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">last 3 months</span>
          </div>
          <div className="space-y-3">
            {maps.map((map, index) => (
              <MapStatCard key={`${map.map}-${index}`} map={map.map} index={index} team1={match.team1.shortname} team2={match.team2.shortname} />
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-text-secondary">Past matches</h3>
            <span className="rounded bg-bg-surface px-2 py-1 text-[10px] font-black uppercase tracking-wider text-text-muted">{h2hTeam1Wins + h2hTeam2Wins} listed</span>
          </div>
          <div className="space-y-3">
            {pastMatches.map((past, index) => (
              <div key={`${past.date}-${index}`} className="rounded-lg border border-border bg-bg-surface p-3">
                <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  <span>{past.date}</span>
                  <span>{past.type}</span>
                </div>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className={`font-bold ${past.winner === past.left ? "text-green" : "text-text-primary"}`}>{past.left}</span>
                  <span className="font-black text-blue-light tabular-nums">{past.score}</span>
                  <span className={`font-bold ${past.winner === past.right ? "text-green" : "text-text-primary"}`}>{past.right}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  <span className="truncate">{past.event}</span>
                  <span>{past.map}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewMetric({ label, value, suffix = "" }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded border border-border bg-bg-surface px-3 py-2">
      <p className="text-[10px] sm:text-[9px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
      <p className="mt-0.5 text-sm font-black text-text-primary">{value}{suffix}</p>
    </div>
  );
}

function OddBox({ team, value, movement }: { team: string; value: number; movement: string }) {
  const probability = impliedProbability(value);

  return (
    <div className="rounded border border-border bg-bg-card px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{team}</p>
      <p className="mt-1 text-lg font-black text-green tabular-nums">{value.toFixed(2)}</p>
      <div className="mt-1 flex items-center justify-center gap-2 text-[10px] sm:text-[9px] font-bold uppercase tracking-wider text-text-muted">
        <span>{probability}%</span>
        <span className={movement.startsWith("+") ? "text-green" : "text-red"}>{movement}</span>
      </div>
    </div>
  );
}

function MapStatCard({ map, index, team1, team2 }: { map: string; index: number; team1: string; team2: string }) {
  const icon = getMapIcon(map);
  const leftWin = 52 + ((index * 7) % 18);
  const rightWin = 100 - leftWin;

  return (
    <div className="rounded-lg border border-border bg-bg-surface p-3">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded bg-black/20">
          {icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon} alt={map} className="h-9 w-9 object-contain" />
          ) : (
            <span className="text-[10px] font-black text-text-muted">TBA</span>
          )}
        </div>
        <div>
          <p className="text-sm font-black text-text-primary">{map}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">last 3 months</p>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-3 gap-2 text-center">
        <TinyMapMetric label="Played" value={String(18 + index * 7)} />
        <TinyMapMetric label="CT" value={`${54 + index * 4}%`} />
        <TinyMapMetric label="TR" value={`${46 + index * 3}%`} />
      </div>
      <div className="space-y-2">
        <MapWinBar team={team1} value={leftWin} />
        <MapWinBar team={team2} value={rightWin} />
      </div>
    </div>
  );
}

function TinyMapMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-bg-card px-2 py-1.5">
      <p className="text-[10px] sm:text-[9px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
      <p className="text-xs font-black text-text-primary">{value}</p>
    </div>
  );
}

function impliedProbability(odds: number) {
  return Math.round((1 / odds) * 100);
}

function MapWinBar({ team, value }: { team: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted">
        <span>{team}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-bg-card">
        <div className="h-1.5 rounded-full bg-blue-light" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function HeaderVetoStrip({ match }: { match: Match }) {
  const steps = getVisibleHeaderVetoSteps(match);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={`${step.team}-${step.map}-${index}`} className="inline-flex items-center gap-2 border border-white/10 bg-black/25 px-3 py-2 text-xs backdrop-blur-sm">
          <span className={`rounded px-1.5 py-0.5 text-[10px] sm:text-[9px] font-black uppercase tracking-wider ${step.kind === "pick" ? "bg-green/15 text-green" : step.kind === "decider" ? "bg-yellow/15 text-yellow" : "bg-red/15 text-red"}`}>
            {step.kind}
          </span>
          <span className="font-bold text-text-secondary">{step.team}</span>
          <span className="text-text-muted">·</span>
          <span className="font-black text-text-primary">{step.map}</span>
          {step.score1 !== undefined && step.score2 !== undefined && (
            <span className="rounded bg-blue/20 px-1.5 py-0.5 text-[10px] font-black text-blue-light tabular-nums">
              {step.score1}-{step.score2}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function getTeamWorldRank(team: Team, teamProfiles: TeamProfile[]) {
  return teamProfiles.find((item) => teamMatchesProfile(team, item))?.worldRanking;
}

function teamMatchesProfile(team: Team, profile: TeamProfile) {
  const teamKeys = [team.name, team.shortname].map(normalizeTeamName);
  const profileKeys = [profile.name, profile.shortname, profile.id].map(normalizeTeamName);

  return teamKeys.some((key) => profileKeys.includes(key));
}

function teamMatchesRoster(team: Team, roster: TeamRoster) {
  const teamKeys = [team.name, team.shortname].map(normalizeTeamName);
  const rosterKeys = [roster.teamName, roster.teamshortname].map(normalizeTeamName);

  return teamKeys.some((key) => rosterKeys.includes(key));
}

function getTeamLineup(team: Team, teamProfiles: TeamProfile[], teamRosters: TeamRoster[], topPlayers: Player[]): LineupPlayer[] {
  const profile = teamProfiles.find((item) => teamMatchesProfile(team, item));
  const rosterPlayers = profile?.roster.map((player) => ({
    nickname: player.nickname,
    image: player.image,
    role: player.role,
    country: player.country,
    countryFlag: player.countryFlag,
    rating: player.rating,
  })) ?? [];

  const namedRosterPlayers = teamRosters
    .find((item) => teamMatchesRoster(team, item))
    ?.players.map((nickname) => ({
      nickname,
      image: getPlayerImageByNickname(nickname),
      role: "Player",
    })) ?? [];

  const rankedPlayers = topPlayers
    .filter((player) => normalizeTeamName(player.team) === normalizeTeamName(team.shortname) || normalizeTeamName(player.team) === normalizeTeamName(team.name))
    .map((player) => ({
      nickname: player.name,
      image: player.image,
      role: "Player",
      country: player.country,
      countryFlag: player.countryFlag,
      rating: player.rating,
    }));

  const uniquePlayers = [...rosterPlayers, ...namedRosterPlayers, ...rankedPlayers].filter((player, index, list) => (
    list.findIndex((item) => normalizeTeamName(item.nickname) === normalizeTeamName(player.nickname)) === index
  ));

  return [...uniquePlayers, ...Array.from({ length: 5 }, (_, index) => ({
    nickname: `${team.shortname} ${index + 1}`,
    image: getPlayerImageByNickname(),
    role: "Player",
  }))].slice(0, 5);
}

function getPlayerImageByNickname(nickname?: string) {
  if (!nickname) {
    return `${B}/players/default.png`;
  }

  const knownImages: Record<string, string> = {
    aleksib: "aleksib",
    apex: "apex",
    b1t: "b1t",
    broky: "broky",
    brollan: "brollan",
    cadian: "cadian",
    chelo: "chelo",
    chopper: "chopper",
    donk: "donk",
    elige: "elige",
    fallen: "fallen",
    flamez: "flamez",
    frozen: "frozen",
    heavygod: "heavygod",
    hooxi: "hooxi",
    hunter: "hunter",
    im: "im",
    jcobbb: "jcobbb",
    jimpphat: "jimpphat",
    jl: "jl",
    karrigan: "karrigan",
    kscerato: "kscerato",
    m0nesy: "m0nesy",
    magixx: "magixx",
    makazze: "makazze",
    malbsmd: "malbsmd",
    matys: "matys",
    mezii: "mezii",
    molodoy: "molodoy",
    naf: "naf",
    nertz: "nertz",
    nexa: "nexa",
    niko: "niko",
    osee: "osee",
    rain: "rain",
    ropz: "ropz",
    sh1ro: "sh1ro",
    siuhy: "siuhy",
    skullz: "skullz",
    spinx: "spinx",
    sunpayus: "sunpayus",
    tn1r: "tn1r",
    torzsi: "torzsi",
    twistzz: "twistzz",
    ultimate: "ultimate",
    w0nderful: "w0nderful",
    xelex: "xelex",
    xertion: "xertion",
    yekindar: "yekindar",
    yuurih: "yuurih",
    zont1x: "zont1x",
    zywoo: "zywoo",
    teses: "default",
    sjuush: "default",
    stavn: "default",
    jabbi: "default",
    kyxsan: "default",
    device: "default",
    blamef: "default",
    buzz: "default",
    br0: "default",
    staehr: "default",
  };
  const imageName = knownImages[normalizeTeamName(nickname)];

  return imageName ? `${B}/players/${imageName}.png` : `${B}/players/default.png`;
}

function normalizeTeamName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getMatchMaps(match: Match): MatchMapSummary[] {
  const pickedMaps = match.mapVeto
    ?.filter((item) => item.action === "picked" || item.action === "decider")
    .map((item) => ({
      map: item.map,
      score1: item.score1,
      score2: item.score2,
    }));

  if (pickedMaps && pickedMaps.length > 0) {
    return pickedMaps;
  }

  return match.map ? [{ map: match.map }] : [];
}

function getHeaderMaps(match: Match): MatchMapSummary[] {
  if (match.mapVeto && match.mapVeto.length > 0) {
    return getPlayedHeaderMapSteps(match).map((item) => ({ map: item.map, score1: item.score1, score2: item.score2 }));
  }

  return getPlayedHeaderMapSteps(match)
    .map((item) => ({ map: item.map, score1: item.score1, score2: item.score2 }));
}

function getPrimaryHeaderMap(match: Match) {
  return [...getPlayedHeaderMapSteps(match)].reverse().find((item) => item.kind === "pick" || item.kind === "decider")?.map
    ?? match.map;
}

function getVisibleHeaderVetoSteps(match: Match) {
  const steps = getHeaderVetoSteps(match);
  const isBestOfOne = match.format === "BO1";

  if (isBestOfOne) {
    return steps.filter((item) => item.kind === "decider").slice(0, 1);
  }

  return steps.slice(0, 7);
}

function getPlayedHeaderMapSteps(match: Match) {
  const mapSteps = getHeaderVetoSteps(match).filter((item) => item.kind === "pick" || item.kind === "decider");
  const playedMapCount = getPlayedMapCount(match);

  if (playedMapCount > 0) {
    return mapSteps.slice(0, playedMapCount);
  }

  return mapSteps.slice(0, 1);
}

function getHeaderVetoSteps(match: Match): HeaderVetoStep[] {
  if (match.mapVeto && match.mapVeto.length > 0) {
    return match.mapVeto.map((item) => ({
      team: item.team,
      kind: item.action === "picked" ? "pick" : item.action === "decider" ? "decider" : "ban",
      map: item.map,
      score1: item.score1,
      score2: item.score2,
    }));
  }

  return buildFallbackVetoSteps(match);
}

function buildFallbackVetoSteps(match: Match): HeaderVetoStep[] {
  const maps = rotateMapPool(match);

  if (match.format === "BO1") {
    return [
      { team: match.team1.shortname, kind: "ban", map: maps[0] },
      { team: match.team2.shortname, kind: "ban", map: maps[1] },
      { team: match.team1.shortname, kind: "ban", map: maps[2] },
      { team: match.team2.shortname, kind: "ban", map: maps[3] },
      { team: match.team1.shortname, kind: "ban", map: maps[4] },
      { team: match.team2.shortname, kind: "ban", map: maps[5] },
      { team: "Decider", kind: "decider", map: match.map || maps[6] },
    ];
  }

  if (match.format === "BO5") {
    return [
      { team: match.team1.shortname, kind: "ban", map: maps[0] },
      { team: match.team2.shortname, kind: "ban", map: maps[1] },
      { team: match.team1.shortname, kind: "pick", map: match.map || maps[2] },
      { team: match.team2.shortname, kind: "pick", map: maps[3] },
      { team: match.team1.shortname, kind: "pick", map: maps[4] },
      { team: match.team2.shortname, kind: "pick", map: maps[5] },
      { team: "Decider", kind: "decider", map: maps[6] },
    ];
  }

  return [
    { team: match.team1.shortname, kind: "ban", map: maps[0] },
    { team: match.team2.shortname, kind: "ban", map: maps[1] },
    { team: match.team1.shortname, kind: "pick", map: match.map || maps[2], ...getFallbackCompletedMapScore(match, 0) },
    { team: match.team2.shortname, kind: "pick", map: maps[3], ...getFallbackCompletedMapScore(match, 1) },
    { team: match.team1.shortname, kind: "ban", map: maps[4] },
    { team: match.team2.shortname, kind: "ban", map: maps[5] },
    { team: "Decider", kind: "decider", map: maps[6], ...getFallbackCompletedMapScore(match, 2) },
  ];
}

function getFallbackCompletedMapScore(match: Match, pickIndex: number) {
  if (match.status === "upcoming" || typeof match.score1 !== "number" || typeof match.score2 !== "number") {
    return {};
  }

  const team1WonSeries = match.score1 > match.score2;
  const team1MapWins = match.score1;
  const team2MapWins = match.score2;
  const playedMaps = Math.min(pickIndex + 1, team1MapWins + team2MapWins);

  if (pickIndex >= playedMaps) {
    return {};
  }

  const team1WinsThisMap = pickIndex < team1MapWins
    ? team1WonSeries
    : !team1WonSeries;
  const closeLoss = 9 + ((match.id + pickIndex) % 4);

  return team1WinsThisMap
    ? { score1: 13, score2: closeLoss }
    : { score1: closeLoss, score2: 13 };
}

function getPlayedMapCount(match: Match) {
  if (match.status === "upcoming" || typeof match.score1 !== "number" || typeof match.score2 !== "number") {
    return 0;
  }

  return Math.min(match.score1 + match.score2, getRequiredMapWins(match) * 2 - 1);
}

function getRequiredMapWins(match: Match) {
  if (match.format === "BO1") return 1;
  if (match.format === "BO5") return 3;
  return 2;
}

function rotateMapPool(match: Match) {
  const seed = `${match.id}-${match.team1.shortname}-${match.team2.shortname}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const offset = seed % activeMapPool.length;

  return [...activeMapPool.slice(offset), ...activeMapPool.slice(0, offset)];
}

function buildListedEventMatches(events: Event[], teams: Team[], existingMatches: Match[]) {
  return events.flatMap((event) => {
    const eventTeams = teams.slice(0, event.teams);
    const directMatches = existingMatches.filter((match) => sameEvent(match.event, event.name));

    return buildSyntheticEventMatches(event, eventTeams, directMatches);
  });
}

function buildSyntheticEventMatches(event: Event, teams: Team[], directMatches: Match[]): Match[] {
  const generated: Match[] = [];
  const teamCount = Math.max(teams.length, 2);
  const total = teamCount >= 16 ? 31 : teamCount >= 12 ? 23 : 15;

  for (let index = 0; index < total; index += 1) {
    const id = 10000 + event.id * 100 + index;
    if (directMatches.some((match) => match.id === id)) continue;

    const team1 = teams[index % teamCount];
    const opponentIndex = (index * 5 + 3) % teamCount;
    const team2 = teams[opponentIndex] === team1 ? teams[(index + 1) % teamCount] : teams[opponentIndex];
    const team1Wins = (index + event.id) % 3 !== 0;
    const score1 = team1Wins ? 2 : 1;
    const score2 = team1Wins ? 0 : 2;
    const finishedCutoff = Math.floor(total * (event.progress / 100));
    const initialStatus = index < finishedCutoff ? "finished" : index === finishedCutoff && event.progress > 0 ? "live" : "upcoming";
    const status = initialStatus === "live" && Math.max(score1, score2) >= 2 ? "finished" : initialStatus;

    generated.push({
      id,
      team1,
      team2,
      score1: status === "upcoming" ? undefined : score1,
      score2: status === "upcoming" ? undefined : score2,
      event: event.name,
      format: index > total - 2 ? "BO5" : "BO3",
      map: activeMapPool[(index + event.id) % activeMapPool.length],
      status,
      time: getListedMatchTime(index),
      date: getListedEventDay(event, index),
    });
  }

  return generated;
}

function getListedMatchTime(index: number) {
  return ["12:00", "14:30", "17:00", "19:30"][index % 4];
}

function getListedEventDay(event: Event, index: number) {
  const firstDate = event.dates.split(/-|–/)[0]?.trim() || "Event day";
  return `${firstDate} · Day ${Math.floor(index / 4) + 1}`;
}

function sameEvent(matchEvent: string, eventName: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/\b20\d{2}\b/g, "").replace(/[^a-z0-9]/g, "");
  return normalize(matchEvent) === normalize(eventName);
}
