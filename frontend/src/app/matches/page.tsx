import TeamLogo from "@/components/TeamLogo";
import StatusPill from "@/components/StatusPill";
import Link from "next/link";
import { api } from "@/services/api";
import type { Match } from "@/services/types";

export const metadata = {
  title: "Matches - Live and Upcoming",
};

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";
const CT_ICON = "https://static.wikia.nocookie.net/cswikia/images/2/2a/Ct_logo.svg/revision/latest/scale-to-width-down/250?cb=20250307112005";
const TR_ICON = "https://static.wikia.nocookie.net/cswikia/images/e/e0/Icon-t-patch-small.png/revision/latest?cb=20220130164538";

import { mapBackgrounds, mapIcons, getMapAsset, getMapIcon, getMapBackground } from "@/lib/maps";

const activeMapPool = ["Mirage", "Inferno", "Nuke", "Ancient", "Anubis", "Dust II", "Overpass"];

function MatchRow({ match, index }: { match: Match; index: number }) {
  const isLive = match.status === "live";
  const hasScore = match.score1 !== undefined;
  const t1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
  const t2Won = (match.score2 ?? 0) > (match.score1 ?? 0);
  const primaryMap = getPrimaryHeaderMap(match);
  const mapBackground = getMapAsset(mapBackgrounds, primaryMap) ?? `${B}/news/katowice-bg.jpg`;
  const mapPool = getMatchMaps(match);
  const showMapStrip = mapPool.length > 0;
  const hasSingleMap = mapPool.length === 1;
  const isUpcoming = match.status === "upcoming";

  return (
    <Link
      href={`/matches/${match.id}`}
      className={`group block relative min-h-[234px] rounded-xl border overflow-hidden bg-cover bg-center transition-all hover:-translate-y-0.5 cursor-pointer card-glow animate-fade-in-up sm:h-[212px] sm:min-h-[212px] ${
        isLive ? "border-red/40 animate-live-glow" : "border-border hover:border-border-hover"
      }`}
      style={{
        animationDelay: `${index * 0.04}s`,
        background: isUpcoming
          ? `linear-gradient(90deg, ${match.team1.color}18 0%, #263245 34%, #263245 66%, ${match.team2.color}18 100%)`
          : undefined,
        backgroundImage: isUpcoming
          ? undefined
          : `
            linear-gradient(90deg, ${match.team1.color}70 0%, ${match.team1.color}30 22%, rgba(30,41,59,0.68) 46%, rgba(30,41,59,0.68) 54%, ${match.team2.color}30 78%, ${match.team2.color}70 100%),
            linear-gradient(180deg, rgba(15,23,42,0.28), rgba(15,23,42,0.66)),
            url("${mapBackground}")
          `,
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: match.team1.color }} />
      <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{ background: match.team2.color }} />

      <div className="relative grid min-h-[234px] grid-cols-[minmax(0,1fr)] items-center gap-4 px-5 py-6 sm:h-full sm:min-h-0 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:px-7">
        <div className="flex min-h-24 min-w-0 items-center gap-4 sm:min-h-[112px] sm:gap-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
            <TeamLogo src={match.team1.logo} name={match.team1.name} size={96} className="h-20 w-20 transition-transform group-hover:scale-105 sm:h-24 sm:w-24" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-black text-white sm:text-2xl">{match.team1.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-white">{match.team1.shortname}</span>
              {!isUpcoming && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={CT_ICON} alt="CT" title="CT side" className="h-5 w-5 object-contain" />
              )}
            </div>
          </div>
        </div>

        <div className="flex min-h-[168px] min-w-[220px] flex-col items-center justify-center gap-2 px-5 py-2 sm:min-h-[176px] sm:w-[290px]">
          {hasScore ? (
            <div className="flex items-center gap-4">
              <span className={`text-4xl font-black tabular-nums sm:text-5xl ${t1Won ? "text-white" : "text-white/50"}`}>{match.score1}</span>
              <span className="text-sm text-white/50  text-text-muted/50">vs</span>
              <span className={`text-4xl font-black tabular-nums sm:text-5xl ${t2Won ? "text-white" : "text-white/50"}`}>{match.score2}</span>
            </div>
          ) : (
            <p className="text-3xl font-black text-blue-light sm:text-4xl">{match.time}</p>
          )}
          <div className="flex max-w-[260px] flex-wrap items-center justify-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary">{match.event}</span>
            <span className="text-[10px] text-text-muted">&middot;</span>
            <span className="text-[10px] font-bold text-text-secondary">{match.format}</span>
            {primaryMap && (
              <>
                <span className="text-[10px] text-text-muted">&middot;</span>
                <span className="text-[10px] font-bold text-text-secondary">{primaryMap}</span>
              </>
            )}
          </div>
          {showMapStrip && (
            <div className={[
              "flex flex-nowrap items-center justify-center gap-2 overflow-hidden bg-black/24 ring-1 ring-white/10",
              hasSingleMap ? "h-[72px] w-[72px] rounded-full p-3" : "min-h-11 rounded-full px-4 py-2",
            ].join(" ")}>
              {mapPool.map((map) => {
                const icon = getMapIcon(map.map);
                if (!icon) return null;
                const hasMapScore = map.score1 !== undefined && map.score2 !== undefined;
                const isCurrentMap = map.map.toLowerCase() === primaryMap?.toLowerCase();

                return (
                  <span key={map.map} className="relative flex w-10 shrink-0 flex-col items-center gap-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={icon}
                      alt={map.map}
                      title={map.map}
                      className={[
                        "h-9 w-9 object-contain transition-all sm:h-10 sm:w-10",
                        isCurrentMap ? "" : "opacity-80",
                      ].join(" ")}
                    />
                    {hasMapScore && (
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-black leading-none text-white/50 font-light tabular-nums">
                        {map.score1}-{map.score2}
                      </span>
                    )}
                    {!hasMapScore && isCurrentMap && isLive && (
                      <span className="text-[8px] font-black leading-none text-red">
                        LIVE
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex min-h-24 min-w-0 items-center justify-end gap-4 sm:min-h-[112px] sm:gap-5">
          <div className="min-w-0 text-right">
            <p className="truncate text-xl font-black text-white sm:text-2xl">{match.team2.name}</p>
            <div className="mt-1 flex items-center justify-end gap-2">
              {!isUpcoming && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={TR_ICON} alt="TR" title="TR side" className="h-5 w-5 object-contain" />
              )}
              <span className="text-[11px] font-black uppercase tracking-widest text-white">{match.team2.shortname}</span>
            </div>
          </div>
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
            <TeamLogo src={match.team2.logo} name={match.team2.name} size={96} className="h-20 w-20 transition-transform group-hover:scale-105 sm:h-24 sm:w-24" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function MatchesPage() {
  const { liveMatches, upcomingMatches } = await resolvePageData({
    liveMatches: api.liveMatches(),
    upcomingMatches: api.upcomingMatches(),
  });

  const grouped = upcomingMatches.reduce((acc, m) => {
    const key = m.date || "TBD";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <main className="mx-auto max-w-[1380px] px-4 py-8">
      <div className="mb-6 text-sm text-text-muted">
        <a href="#" className="hover:text-text-secondary">Home</a><span className="mx-2">&rsaquo;</span><span className="text-text-primary">Matches</span>
      </div>
      <h1 className="text-2xl font-bold mb-8">Matches &amp; Livescore</h1>
      {liveMatches.length > 0 && (
        <section className="mb-10">
          <div className="space-y-4">{liveMatches.map((m, i) => <MatchRow key={m.id} match={m} index={i} />)}</div>
        </section>
      )}
      {Object.entries(grouped).map(([date, matches]) => (
        <section key={date} className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">{date}</h2>
          <div className="space-y-4">{matches.map((m, i) => <MatchRow key={m.id} match={m} index={i} />)}</div>
        </section>
      ))}
    </main>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}

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

function getMatchMaps(match: Match): MatchMapSummary[] {
  const maps = getHeaderMaps(match);
  const seen = new Set<string>();

  return maps.filter((item) => {
    const key = item.map.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getHeaderMaps(match: Match): MatchMapSummary[] {
  if (match.mapVeto && match.mapVeto.length > 0) {
    return match.mapVeto
      .filter((item) => item.action === "picked" || item.action === "decider")
      .map((item) => ({
        map: item.map,
        score1: item.score1,
        score2: item.score2,
      }));
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

function getHeaderVetoSteps(match: Match): HeaderVetoStep[] {
  if (match.mapVeto && match.mapVeto.length > 0) {
    return match.mapVeto.map((item) => ({
      team: item.team,
      kind: item.action === "picked" ? "pick" : item.action === "decider" ? "decider" : "ban",
      map: item.map,
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
    { team: "Decider", kind: "decider", map: maps[6] },
  ];
}

function getFallbackCompletedMapScore(match: Match, _pickIndex: number) {
  if (match.status !== "finished") {
    return {};
  }

  return { score1: 0, score2: 0 };
}

function rotateMapPool(match: Match) {
  const seed = `${match.id}-${match.team1.shortname}-${match.team2.shortname}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const offset = seed % activeMapPool.length;

  return [...activeMapPool.slice(offset), ...activeMapPool.slice(0, offset)];
}
