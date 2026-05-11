"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import TeamLogo from "@/components/TeamLogo";
import StatusPill from "@/components/StatusPill";
import type { Match } from "@/services/types";
import { mapBackgrounds, mapIcons, getMapAsset, getMapIcon } from "@/lib/maps";

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";
const CT_ICON = "https://static.wikia.nocookie.net/cswikia/images/2/2a/Ct_logo.svg/revision/latest/scale-to-width-down/250?cb=20250307112005";
const TR_ICON = "https://static.wikia.nocookie.net/cswikia/images/e/e0/Icon-t-patch-small.png/revision/latest?cb=20220130164538";

const activeMapPool = ["Mirage", "Inferno", "Nuke", "Ancient", "Anubis", "Dust II", "Overpass"];
const periodFilters = [
  { label: "All time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last week", value: "week" },
] as const;

type PeriodFilter = (typeof periodFilters)[number]["value"];

export default function ResultsClient({ results }: { results: Match[] }) {
  const [eventFilter, setEventFilter] = useState("all");
  const [mapFilter, setMapFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("all");
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const eventOptions = useMemo(() => getUniqueOptions(results.map((match) => match.event)), [results]);
  const mapOptions = useMemo(() => getUniqueOptions(results.flatMap((match) => getMatchMaps(match).map((item) => item.map))), [results]);

  const filteredResults = useMemo(() => {
    return results.filter((match) => {
      const eventMatches = eventFilter === "all" || match.event === eventFilter;
      const mapMatches = mapFilter === "all" || getMatchMaps(match).some((item) => item.map === mapFilter);
      const periodMatches = periodFilter === "all" || isWithinPeriod(match.date, periodFilter);

      return eventMatches && mapMatches && periodMatches;
    });
  }, [eventFilter, mapFilter, periodFilter, results]);

  const grouped = useMemo(() => groupByDate(filteredResults), [filteredResults]);

  return (
    <>
      <div className={`mb-8 grid gap-3 rounded-xl border border-border bg-bg-card/70 p-4 sm:grid-cols-3 relative ${openFilter ? "z-50" : "z-10"}`}>
        <FilterDropdown
          id="championship"
          label="Championship"
          value={eventFilter}
          options={[{ label: "All championships", value: "all" }, ...eventOptions.map((event) => ({ label: event, value: event }))]}
          isOpen={openFilter === "championship"}
          onOpenChange={(isOpen) => setOpenFilter(isOpen ? "championship" : null)}
          onChange={setEventFilter}
        />

        <FilterDropdown
          id="map"
          label="Map"
          value={mapFilter}
          options={[{ label: "All maps", value: "all" }, ...mapOptions.map((map) => ({ label: map, value: map }))]}
          isOpen={openFilter === "map"}
          onOpenChange={(isOpen) => setOpenFilter(isOpen ? "map" : null)}
          onChange={setMapFilter}
        />

        <FilterDropdown
          id="period"
          label="Period"
          value={periodFilter}
          options={periodFilters}
          isOpen={openFilter === "period"}
          onOpenChange={(isOpen) => setOpenFilter(isOpen ? "period" : null)}
          onChange={(value) => setPeriodFilter(value as PeriodFilter)}
        />
      </div>

      {filteredResults.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-card p-10 text-center animate-fade-in">
          <p className="text-sm font-bold text-text-secondary">No finished matches found for these filters.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, matches]) => (
          <section key={date} className="mb-8 relative z-0">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">{date}</h2>
            <div className="space-y-4">
              {matches.map((match, index) => (
                <ResultRow key={match.id} match={match} index={index} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}

type FilterOption = {
  label: string;
  value: string;
};

function FilterDropdown({
  id,
  label,
  value,
  options,
  isOpen,
  onOpenChange,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly FilterOption[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onChange: (value: string) => void;
}) {
  const selected = options.find((option) => option.value === value) ?? options[0];

  return (
    <div className={`relative flex flex-col gap-2 ${isOpen ? "z-[110]" : ""}`}>
      <span className="text-[10px] font-black uppercase tracking-wider text-text-muted">{label}</span>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
        onClick={() => onOpenChange(!isOpen)}
        className={`flex h-10 w-full items-center justify-between gap-3 rounded-xl border px-3 text-left text-[13px] font-medium transition-all outline-none ${
          isOpen 
            ? "border-blue-light bg-bg-surface ring-1 ring-blue-light/30 shadow-lg shadow-blue/5" 
            : "border-border bg-bg-surface/70 hover:border-border-hover hover:bg-bg-surface shadow-sm"
        } text-text-primary`}
      >
        <span className="truncate">{selected.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`shrink-0 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close filters"
            className="fixed inset-0 z-[100] cursor-default bg-transparent"
            onClick={() => onOpenChange(false)}
          />
          <div
            id={`${id}-menu`}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-[120] max-h-64 overflow-auto rounded-xl border border-border bg-bg-surface p-1.5 shadow-xl shadow-black/40 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-200"
          >
            {options.map((option) => {
              const active = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    onOpenChange(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${
                    active 
                      ? "bg-blue/10 text-blue-light" 
                      : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ResultRow({ match, index }: { match: Match; index: number }) {
  const t1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
  const t2Won = (match.score2 ?? 0) > (match.score1 ?? 0);
  const primaryMap = getPrimaryHeaderMap(match);
  const mapBackground = getMapAsset(mapBackgrounds, primaryMap) ?? `${B}/news/katowice-bg.jpg`;
  const mapPool = getMatchMaps(match);
  const hasSingleMap = mapPool.length === 1;

  return (
    <Link
      href={`/matches/${match.id}`}
      className="group block relative min-h-[234px] rounded-xl border border-border overflow-hidden bg-cover bg-center transition-all hover:-translate-y-0.5 hover:border-border-hover cursor-pointer card-glow animate-fade-in-up sm:h-[212px] sm:min-h-[212px]"
      style={{
        animationDelay: `${index * 0.04}s`,
        backgroundImage: `
          linear-gradient(90deg, ${match.team1.color}70 0%, ${match.team1.color}30 22%, rgba(30,41,59,0.68) 46%, rgba(30,41,59,0.68) 54%, ${match.team2.color}30 78%, ${match.team2.color}70 100%),
          linear-gradient(180deg, rgba(15,23,42,0.28), rgba(15,23,42,0.72)),
          url("${mapBackground}")
        `,
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: t1Won ? match.team1.color : `${match.team1.color}88` }} />
      <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{ background: t2Won ? match.team2.color : `${match.team2.color}88` }} />

      <div className="relative grid min-h-[234px] grid-cols-[minmax(0,1fr)] items-center gap-4 px-5 py-6 sm:h-full sm:min-h-0 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:px-7">
        <div className="flex min-h-24 min-w-0 items-center gap-4 sm:min-h-[112px] sm:gap-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
            <TeamLogo src={match.team1.logo} name={match.team1.name} size={96} className={`h-20 w-20 transition-transform group-hover:scale-105 sm:h-24 sm:w-24 ${t1Won ? "" : "opacity-55 grayscale"}`} />
          </div>
          <div className="min-w-0">
            <p className={`truncate text-xl font-black sm:text-2xl ${t1Won ? "text-white" : "text-white/55"}`}>{match.team1.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className={`text-[11px] font-black uppercase tracking-widest ${t1Won ? "text-white" : "text-white/55"}`}>{match.team1.shortname}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CT_ICON} alt="CT" title="CT side" className="h-5 w-5 object-contain opacity-85" />
            </div>
          </div>
        </div>

        <div className="flex min-h-[168px] min-w-[220px] flex-col items-center justify-center gap-2 px-5 py-2 sm:min-h-[176px] sm:w-[290px]">
          <div className="flex items-center gap-4">
            <span className={`text-4xl font-black tabular-nums sm:text-5xl ${t1Won ? "text-white" : "text-white/50"}`}>{match.score1}</span>
            <span className="text-sm text-white/50">vs</span>
            <span className={`text-4xl font-black tabular-nums sm:text-5xl ${t2Won ? "text-white" : "text-white/50"}`}>{match.score2}</span>
          </div>
          <div className="flex max-w-[260px] flex-wrap items-center justify-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary">{match.event}</span>
            <span className="text-[10px] text-text-muted">·</span>
            <span className="text-[10px] font-bold text-text-secondary">{match.format}</span>
            {primaryMap && (
              <>
                <span className="text-[10px] text-text-muted">·</span>
                <span className="text-[10px] font-bold text-text-secondary">{primaryMap}</span>
              </>
            )}
          </div>
          {mapPool.length > 0 && (
            <div className={[
              "flex flex-nowrap items-center justify-center gap-2 overflow-hidden bg-black/24 ring-1 ring-white/10",
              hasSingleMap ? "h-[72px] w-[72px] rounded-full p-3" : "min-h-11 rounded-full px-4 py-2",
            ].join(" ")}>
              {mapPool.map((map) => {
                const icon = getMapAsset(mapIcons, map.map);
                if (!icon) return null;

                return (
                  <span key={map.map} className="relative flex w-10 shrink-0 flex-col items-center gap-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt={map.map} title={map.map} className="h-9 w-9 object-contain opacity-90 transition-all sm:h-10 sm:w-10" />
                    {map.score1 !== undefined && map.score2 !== undefined && (
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-light leading-none text-white/50 tabular-nums">
                        {map.score1}-{map.score2}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          )}
          <StatusPill status="finished" />
        </div>

        <div className="flex min-h-24 min-w-0 items-center justify-end gap-4 sm:min-h-[112px] sm:gap-5">
          <div className="min-w-0 text-right">
            <p className={`truncate text-xl font-black sm:text-2xl ${t2Won ? "text-white" : "text-white/55"}`}>{match.team2.name}</p>
            <div className="mt-1 flex items-center justify-end gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={TR_ICON} alt="TR" title="TR side" className="h-5 w-5 object-contain opacity-85" />
              <span className={`text-[11px] font-black uppercase tracking-widest ${t2Won ? "text-white" : "text-white/55"}`}>{match.team2.shortname}</span>
            </div>
          </div>
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
            <TeamLogo src={match.team2.logo} name={match.team2.name} size={96} className={`h-20 w-20 transition-transform group-hover:scale-105 sm:h-24 sm:w-24 ${t2Won ? "" : "opacity-55 grayscale"}`} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function groupByDate(matches: Match[]) {
  return matches.reduce((acc, match) => {
    const key = match.date || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(match);
    return acc;
  }, {} as Record<string, Match[]>);
}

function getUniqueOptions(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function isWithinPeriod(date: string | undefined, period: PeriodFilter) {
  const normalized = (date || "").toLowerCase();

  if (period === "today") return normalized === "today";
  if (period === "yesterday") return normalized === "yesterday";
  if (period === "week") return normalized === "today" || normalized === "yesterday" || /^mar [1-7]$/.test(normalized);

  return true;
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
      { team: "Decider", kind: "decider", map: match.map || maps[6], ...getFallbackCompletedMapScore(match, 0) },
    ];
  }

  if (match.format === "BO5") {
    const playedMaps = getPlayedMapCount(match);
    return [
      { team: match.team1.shortname, kind: "ban", map: maps[0] },
      { team: match.team2.shortname, kind: "ban", map: maps[1] },
      ...[
        { team: match.team1.shortname, kind: "pick" as const, map: match.map || maps[2] },
        { team: match.team2.shortname, kind: "pick" as const, map: maps[3] },
        { team: match.team1.shortname, kind: "pick" as const, map: maps[4] },
        { team: match.team2.shortname, kind: "pick" as const, map: maps[5] },
        { team: "Decider", kind: "decider" as const, map: maps[6] },
      ].slice(0, playedMaps).map((step, index) => ({
        ...step,
        ...getFallbackCompletedMapScore(match, index),
      })),
    ];
  }

  const playedMaps = getPlayedMapCount(match);
  return [
    { team: match.team1.shortname, kind: "ban", map: maps[0] },
    { team: match.team2.shortname, kind: "ban", map: maps[1] },
    ...[
      { team: match.team1.shortname, kind: "pick" as const, map: match.map || maps[2] },
      { team: match.team2.shortname, kind: "pick" as const, map: maps[3] },
      { team: "Decider", kind: "decider" as const, map: maps[6] },
    ].slice(0, playedMaps).map((step, index) => ({
      ...step,
      ...getFallbackCompletedMapScore(match, index),
    })),
    { team: match.team1.shortname, kind: "ban", map: maps[4] },
    { team: match.team2.shortname, kind: "ban", map: maps[5] },
  ];
}

function getFallbackCompletedMapScore(match: Match, pickIndex: number) {
  const winnerScore = match.format === "BO1" ? Math.max(match.score1 ?? 13, match.score2 ?? 11) : 13;
  const loserScore = match.format === "BO1" ? Math.min(match.score1 ?? 13, match.score2 ?? 11) : 9 + ((match.id + pickIndex) % 4);
  const isTeam1Map = getFallbackMapWinner(match, pickIndex) === "team1";

  return {
    score1: isTeam1Map ? winnerScore : loserScore,
    score2: isTeam1Map ? loserScore : winnerScore,
  };
}

function getPlayedMapCount(match: Match) {
  if (match.format === "BO1") {
    return 1;
  }

  const score1 = match.score1 ?? 0;
  const score2 = match.score2 ?? 0;
  const playedMaps = score1 + score2;

  if (playedMaps > 0 && playedMaps <= 5) {
    return playedMaps;
  }

  return match.format === "BO5" ? 3 : 2;
}

function getFallbackMapWinner(match: Match, pickIndex: number) {
  const team1SeriesWins = match.score1 ?? 0;
  const team2SeriesWins = match.score2 ?? 0;
  const seriesWinner = team1SeriesWins > team2SeriesWins ? "team1" : "team2";
  const seriesLoser = seriesWinner === "team1" ? "team2" : "team1";
  const loserWins = Math.min(team1SeriesWins, team2SeriesWins);

  if (match.format === "BO1") {
    return (match.score1 ?? 0) > (match.score2 ?? 0) ? "team1" : "team2";
  }

  return pickIndex % 2 === 1 && pickIndex / 2 < loserWins ? seriesLoser : seriesWinner;
}

function rotateMapPool(match: Match) {
  const seed = `${match.id}-${match.team1.shortname}-${match.team2.shortname}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const offset = seed % activeMapPool.length;

  return [...activeMapPool.slice(offset), ...activeMapPool.slice(0, offset)];
}
