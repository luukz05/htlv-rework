import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Image from "next/image";
import Link from "next/link";
import CountryFlag from "@/components/CountryFlag";
import { api } from "@/services/api";
import type { Match, Player, Team, TeamProfile, TeamRoster } from "@/services/types";
import MatchHeadToHeadClient from "./MatchHeadToHeadClient";

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";
const CT_ICON = "https://static.wikia.nocookie.net/cswikia/images/2/2a/Ct_logo.svg/revision/latest/scale-to-width-down/250?cb=20250307112005";
const TR_ICON = "https://static.wikia.nocookie.net/cswikia/images/e/e0/Icon-t-patch-small.png/revision/latest?cb=20220130164538";

const mapBackgrounds: Record<string, string> = {
  ancient: `${B}/maps/Bomb-B-Ancient-CS-2.jpg`,
  anubis: `${B}/maps/Anubis-CS2.jpg`,
  "dust ii": `${B}/maps/dust2_ct_ramp_Cs2.jpg`,
  dust2: `${B}/maps/dust2_ct_ramp_Cs2.jpg`,
  inferno: `${B}/maps/Banana-Inferno-CS2-31.03.2025.jpg`,
  mirage: `${B}/maps/Bomb-A-Mirage-CS-2.jpg`,
  nuke: `${B}/maps/Bomb-B-Nuke-CS-2.jpg`,
  overpass: `${B}/maps/Overpass-CS2_Counter-Strike-anti-cheat-VAC-Live.jpg`,
};

const mapIcons: Record<string, string> = {
  ancient: `${B}/mapIcons/Map_icon_de_ancient.webp`,
  anubis: `${B}/mapIcons/Map_icon_de_anubis.webp`,
  "dust ii": `${B}/mapIcons/Map_icon_de_dust2.webp`,
  dust2: `${B}/mapIcons/Map_icon_de_dust2.webp`,
  inferno: `${B}/mapIcons/CS2_inferno_logo.webp`,
  mirage: `${B}/mapIcons/Set_mirage.webp`,
  nuke: `${B}/mapIcons/Set_nuke_2.webp`,
  overpass: `${B}/mapIcons/CS2_overpass_logo.webp`,
};

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { liveMatches, upcomingMatches, recentResults, topPlayers, teamProfiles, teamRosters } = await resolvePageData({
    liveMatches: api.liveMatches(),
    upcomingMatches: api.upcomingMatches(),
    recentResults: api.results(),
    topPlayers: api.topPlayers(),
    teamProfiles: api.teams(),
    teamRosters: api.teamRosters(),
  });

  const { id } = await params;
  const allMatches = [...liveMatches, ...upcomingMatches, ...recentResults];
  const match = allMatches.find((m) => m.id.toString() === id);
  if (!match) {
    return (<><Header /><main className="mx-auto max-w-[800px] px-5 py-16 text-center"><h1 className="text-2xl font-bold mb-4">Match not found</h1><Link href="/matches" className="text-blue-light">Back to Matches</Link></main><Footer /></>);
  }

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const fakePlayers = topPlayers.slice(0, 5);
  const team1Lineup = getTeamLineup(match.team1, teamProfiles, teamRosters, topPlayers);
  const team2Lineup = getTeamLineup(match.team2, teamProfiles, teamRosters, topPlayers);
  const team1Rank = getTeamWorldRank(match.team1, teamProfiles);
  const team2Rank = getTeamWorldRank(match.team2, teamProfiles);
  const headerMaps = getHeaderMaps(match);
  const primaryHeaderMap = getPrimaryHeaderMap(match);
  const mapBackground = getMapBackground(primaryHeaderMap);

  return (
    <>
      <Header />
      <div className="border-b border-border bg-bg-body">
        <div className="mx-auto max-w-[1400px] px-5 pt-8 pb-4">
          <div className="mb-4 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary">Home</Link><span className="mx-2">&rsaquo;</span>
            <Link href="/matches" className="hover:text-text-secondary">Matches</Link><span className="mx-2">&rsaquo;</span>
            <span className="text-text-primary">{match.team1.abbr} vs {match.team2.abbr}</span>
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
                <div className="hidden">
                  <div><span className="text-text-muted">Maps</span><p className="mt-1 font-bold text-text-primary">{match.format}{match.status !== "upcoming" && match.map ? ` · ${match.map}` : ""}</p></div>
                  <div><span className="text-text-muted">Event</span><p className="mt-1 font-bold text-text-primary">{match.event}</p></div>
                  <div><span className="text-text-muted">Type</span><p className="mt-1 font-bold text-text-primary">{isFinished ? "Result" : "Upcoming match"}</p></div>
                </div>
                <HeaderVetoStrip match={match} />
              </div>
            </div>
            <p className="hidden text-sm text-text-muted mb-4">{match.event} &middot; {match.format}{match.map ? ` — ${match.map}` : ""}</p>
            <div className="hidden items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 lg:gap-10">
              <MatchLineup team={match.team1} players={team1Lineup} align="left" />
              <div className="order-first mx-auto min-w-[150px] self-center pb-8 text-center md:order-none md:pb-0">
                {isFinished || isLive ? (
                  <div className="flex items-center justify-center gap-3"><span className={`text-5xl font-black tabular-nums ${(match.score1 ?? 0) > (match.score2 ?? 0) ? "text-green" : "text-text-muted"}`}>{match.score1}</span><span className="text-2xl text-text-muted">:</span><span className={`text-5xl font-black tabular-nums ${(match.score2 ?? 0) > (match.score1 ?? 0) ? "text-green" : "text-text-muted"}`}>{match.score2}</span></div>
                ) : (
                  <div><p className="text-3xl font-black">{match.time}</p><p className="text-sm text-text-muted">{match.date}</p></div>
                )}
                <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">{match.team1.abbr} vs {match.team2.abbr}</div>
              </div>
              <MatchLineup team={match.team2} players={team2Lineup} align="right" />
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-[1120px] px-5 py-8 space-y-8">
        {/* Scoreboard */}
        {(isFinished || isLive) && (
          <section className="hidden rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
            <div className="px-5 py-3 border-b border-border"><h2 className="text-base font-bold">Scoreboard — {match.team1.abbr}</h2></div>
            <div className="grid grid-cols-[1fr_60px_60px_50px_60px] gap-2 px-5 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
              <span>Player</span><span className="text-right">K</span><span className="text-right">D</span><span className="text-right">ADR</span><span className="text-right">Rating</span>
            </div>
            <div className="divide-y divide-border">
              {fakePlayers.map((p) => (
                <Link key={p.rank} href={`/players/${p.rank}`} className="grid grid-cols-[1fr_60px_60px_50px_60px] gap-2 items-center px-5 py-2.5 hover:bg-bg-card-hover transition-all">
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

        {/* Map veto (simulated) */}
        <section className="hidden rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-2">
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

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
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
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{team.abbr}</span>
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
    { date: "Mar 5", event: match.event, left: match.team1.abbr, right: match.team2.abbr, score: "13-11", map: match.map || "Mirage", winner: match.team1.abbr, type: "LAN" },
    { date: "Feb 28", event: "BLAST Premier", left: match.team2.abbr, right: match.team1.abbr, score: "2-1", map: "Inferno", winner: match.team2.abbr, type: "BO3" },
    { date: "Feb 16", event: "ESL Pro League", left: match.team1.abbr, right: match.team2.abbr, score: "10-13", map: "Anubis", winner: match.team2.abbr, type: "Online" },
  ];
  const team1Consensus = Math.round(bettingRows.reduce((sum, row) => sum + impliedProbability(row.left), 0) / bettingRows.length);
  const team2Consensus = Math.round(bettingRows.reduce((sum, row) => sum + impliedProbability(row.right), 0) / bettingRows.length);
  const h2hTeam1Wins = pastMatches.filter((item) => item.winner === match.team1.abbr).length;
  const h2hTeam2Wins = pastMatches.filter((item) => item.winner === match.team2.abbr).length;

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
            <span className="rounded bg-green/10 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-green">live odds</span>
          </div>
          <div className="mb-4 rounded-lg border border-border bg-bg-surface p-3">
            <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted">
              <span>Market consensus</span>
              <span>implied probability</span>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <span className="text-sm font-black text-text-primary">{match.team1.abbr}</span>
              <div className="h-2 rounded-full bg-bg-card">
                <div className="h-2 rounded-full bg-blue-light" style={{ width: `${team1Consensus}%` }} />
              </div>
              <span className="text-sm font-black text-blue-light tabular-nums">{team1Consensus}%</span>
            </div>
            <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <span className="text-sm font-black text-text-primary">{match.team2.abbr}</span>
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
                  <OddBox team={match.team1.abbr} value={row.left} movement={row.movement} />
                  <OddBox team={match.team2.abbr} value={row.right} movement={row.movement.startsWith("-") ? "+0.03" : "-0.02"} />
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
              <MapStatCard key={`${map.map}-${index}`} map={map.map} index={index} team1={match.team1.abbr} team2={match.team2.abbr} />
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
      <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
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
      <div className="mt-1 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-wider text-text-muted">
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
      <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
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
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${step.kind === "pick" ? "bg-green/15 text-green" : step.kind === "decider" ? "bg-yellow/15 text-yellow" : "bg-red/15 text-red"}`}>
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

function MapSlots({ match }: { match: Match }) {
  const maps = getMatchMaps(match);
  const slots: MatchMapSummary[] = maps.length > 0 ? maps.slice(0, 3) : Array.from({ length: match.format === "BO1" ? 1 : 3 }, () => ({ map: "TBA" }));

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      {slots.map((item, index) => (
        <div key={`${item.map}-${index}`} className="flex items-center gap-3 border border-white/10 bg-black/25 px-4 py-3 text-left backdrop-blur-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-white/10">
            {getMapIcon(item.map) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={getMapIcon(item.map)} alt={item.map} className="h-9 w-9 object-contain" />
            ) : (
              <span className="text-[10px] font-black text-text-muted">TBA</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Map {index + 1}</p>
            <p className="mt-0.5 truncate text-sm font-black text-text-primary">{item.map}</p>
          </div>
          {item.score1 !== undefined && item.score2 !== undefined && (
            <p className="text-xs font-black text-blue-light">{item.score1}-{item.score2}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function MatchLineup({ team, players, align }: { team: Team; players: LineupPlayer[]; align: "left" | "right" }) {
  const isRight = align === "right";

  return (
    <div className={isRight ? "relative text-center md:text-right" : "relative text-center md:text-left"}>
      <div className={`mb-2 flex items-center justify-center gap-2 ${isRight ? "md:justify-end" : "md:justify-start"}`}>
        <TeamLogo src={team.logo} name={team.name} size={34} />
        <h2 className="text-lg font-bold leading-tight">{team.name}</h2>
      </div>
      <div className="relative min-h-[178px] overflow-visible rounded-lg">
        <div className={`relative z-10 grid grid-cols-[repeat(5,minmax(70px,1fr))] items-end gap-x-3 overflow-visible sm:gap-x-4 lg:gap-x-5 ${isRight ? "md:[direction:rtl]" : ""}`}>
          {players.map((player) => (
            <div key={`${team.abbr}-${player.nickname}`} className="group flex h-[168px] min-w-0 flex-col items-center justify-end overflow-visible [direction:ltr]">
              <div className="relative h-[122px] w-[82px] max-w-none sm:h-[132px] sm:w-[90px]">
                <Image
                  src={player.image}
                  alt={player.nickname}
                  fill
                  sizes="90px"
                  className="object-contain object-bottom drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                />
              </div>
              <div className="h-8 w-full pt-1 text-center">
                <p className="truncate text-[11px] font-black leading-tight text-text-primary drop-shadow">{player.nickname}</p>
                <p className="truncate text-[9px] leading-tight text-text-muted">{player.role || "Player"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
    .filter((player) => normalizeTeamName(player.team) === normalizeTeamName(team.abbr) || normalizeTeamName(player.team) === normalizeTeamName(team.name))
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
    nickname: `${team.abbr} ${index + 1}`,
    image: getPlayerImageByNickname(),
    role: "Player",
  }))].slice(0, 5);
}

function getTeamWorldRank(team: Team, teamProfiles: TeamProfile[]) {
  return teamProfiles.find((item) => teamMatchesProfile(team, item))?.worldRanking;
}

function teamMatchesProfile(team: Team, profile: TeamProfile) {
  const teamKeys = [team.name, team.abbr].map(normalizeTeamName);
  const profileKeys = [profile.name, profile.abbr, profile.id].map(normalizeTeamName);

  return teamKeys.some((key) => profileKeys.includes(key));
}

function teamMatchesRoster(team: Team, roster: TeamRoster) {
  const teamKeys = [team.name, team.abbr].map(normalizeTeamName);
  const rosterKeys = [roster.teamName, roster.teamAbbr].map(normalizeTeamName);

  return teamKeys.some((key) => rosterKeys.includes(key));
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
    fallen: "fallen",
    flamez: "flamez",
    frozen: "frozen",
    heavygod: "heavygod",
    hunter: "hunter",
    im: "im",
    jcobbb: "jcobbb",
    jimpphat: "jimpphat",
    jl: "jl",
    karrigan: "karrigan",
    kscerato: "kscerato",
    magixx: "magixx",
    makazze: "makazze",
    malbsmd: "malbsmd",
    matys: "matys",
    mezii: "mezii",
    molodoy: "molodoy",
    naf: "naf",
    nertz: "nertz",
    ropz: "ropz",
    sh1ro: "sh1ro",
    siuhy: "siuhy",
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
  };
  const imageName = knownImages[normalizeTeamName(nickname)];

  return imageName ? `${B}/players/${imageName}.png` : `${B}/players/default.png`;
}

function normalizeTeamName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getMapBackground(map?: string) {
  if (!map) {
    return `${B}/news/katowice-bg.jpg`;
  }

  return mapBackgrounds[map.toLowerCase()] ?? `${B}/news/katowice-bg.jpg`;
}

function getMapIcon(map: string) {
  return mapIcons[map.toLowerCase()];
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
    return getMatchMaps(match);
  }

  return getHeaderVetoSteps(match)
    .filter((item) => item.kind === "pick" || item.kind === "decider")
    .map((item) => ({ map: item.map, score1: item.score1, score2: item.score2 }));
}

function getPrimaryHeaderMap(match: Match) {
  const steps = getHeaderVetoSteps(match);
  return steps.find((item) => item.kind === "decider")?.map
    ?? steps.find((item) => item.kind === "pick")?.map
    ?? match.map;
}

function getVisibleHeaderVetoSteps(match: Match) {
  const steps = getHeaderVetoSteps(match);
  const isBestOfOne = match.format === "BO1";

  return (isBestOfOne ? steps.filter((item) => item.kind === "decider") : steps).slice(0, 7);
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
      { team: match.team1.abbr, kind: "ban", map: maps[0] },
      { team: match.team2.abbr, kind: "ban", map: maps[1] },
      { team: match.team1.abbr, kind: "ban", map: maps[2] },
      { team: match.team2.abbr, kind: "ban", map: maps[3] },
      { team: match.team1.abbr, kind: "ban", map: maps[4] },
      { team: match.team2.abbr, kind: "ban", map: maps[5] },
      { team: "Decider", kind: "decider", map: match.map || maps[6] },
    ];
  }

  if (match.format === "BO5") {
    return [
      { team: match.team1.abbr, kind: "ban", map: maps[0] },
      { team: match.team2.abbr, kind: "ban", map: maps[1] },
      { team: match.team1.abbr, kind: "pick", map: match.map || maps[2] },
      { team: match.team2.abbr, kind: "pick", map: maps[3] },
      { team: match.team1.abbr, kind: "pick", map: maps[4] },
      { team: match.team2.abbr, kind: "pick", map: maps[5] },
      { team: "Decider", kind: "decider", map: maps[6] },
    ];
  }

  return [
    { team: match.team1.abbr, kind: "ban", map: maps[0] },
    { team: match.team2.abbr, kind: "ban", map: maps[1] },
    { team: match.team1.abbr, kind: "pick", map: match.map || maps[2], ...getFallbackCompletedMapScore(match, 0) },
    { team: match.team2.abbr, kind: "pick", map: maps[3], ...getFallbackCompletedMapScore(match, 1) },
    { team: match.team1.abbr, kind: "ban", map: maps[4] },
    { team: match.team2.abbr, kind: "ban", map: maps[5] },
    { team: "Decider", kind: "decider", map: maps[6] },
  ];
}

function getFallbackCompletedMapScore(_match: Match, _pickIndex: number) {
  return { score1: 0, score2: 0 };
}

function rotateMapPool(match: Match) {
  const seed = `${match.id}-${match.team1.abbr}-${match.team2.abbr}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const offset = seed % activeMapPool.length;

  return [...activeMapPool.slice(offset), ...activeMapPool.slice(0, offset)];
}
