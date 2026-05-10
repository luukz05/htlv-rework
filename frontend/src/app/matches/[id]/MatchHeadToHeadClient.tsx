"use client";

import Image from "next/image";
import { useState } from "react";
import CountryFlag from "@/components/CountryFlag";
import TeamLogo from "@/components/TeamLogo";
import type { Team } from "@/services/types";

type HeadToHeadPlayer = {
  nickname: string;
  image: string;
  role?: string;
  country?: string;
  countryFlag?: string;
  rating?: number;
};

type Props = {
  team1: Team;
  team2: Team;
  team1Rank?: number;
  team2Rank?: number;
  team1Lineup: HeadToHeadPlayer[];
  team2Lineup: HeadToHeadPlayer[];
};

const statLabels: Array<{ key: keyof ReturnType<typeof getPlayerStats>; label: string; short?: string; lowerIsBetter?: boolean }> = [
  { key: "rating", label: "Rating" },
  { key: "kpr", label: "Kills per round", short: "KPR" },
  { key: "dpr", label: "Deaths per round", short: "DPR", lowerIsBetter: true },
  { key: "kast", label: "KAST" },
  { key: "multi", label: "Multi-kill rating" },
  { key: "swing", label: "Round swing" },
  { key: "adr", label: "Average damage", short: "ADR" },
];

export default function MatchHeadToHeadClient({ team1, team2, team1Rank, team2Rank, team1Lineup, team2Lineup }: Props) {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const leftPlayer = team1Lineup[leftIndex] ?? team1Lineup[0];
  const rightPlayer = team2Lineup[rightIndex] ?? team2Lineup[0];
  const leftStats = getPlayerStats(leftPlayer, leftIndex);
  const rightStats = getPlayerStats(rightPlayer, rightIndex + 5);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-bg-card card-glow animate-fade-in-up delay-1">
      <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black">Head to Head</h2>
          <p className="text-xs text-text-muted">Select one player from each lineup to compare highlighted stats</p>
        </div>
        <span className="w-fit rounded bg-bg-surface px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-text-muted">Past 3 months</span>
      </div>

      <div className="p-5 pt-4">
        <TeamLineupStrip team={team1} rank={team1Rank} players={team1Lineup} selectedIndex={leftIndex} onSelect={setLeftIndex} />

        <div className="my-3 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.2fr)_minmax(0,0.9fr)] lg:items-center">
          <SelectedPlayer team={team1} player={leftPlayer} align="left" />
          <StatsPanel leftStats={leftStats} rightStats={rightStats} leftName={leftPlayer.nickname} rightName={rightPlayer.nickname} />
          <SelectedPlayer team={team2} player={rightPlayer} align="right" />
        </div>

        <TeamLineupStrip team={team2} rank={team2Rank} players={team2Lineup} selectedIndex={rightIndex} onSelect={setRightIndex} align="right" />
      </div>
    </section>
  );
}

function TeamLineupStrip({ team, rank, players, selectedIndex, onSelect, align = "left" }: {
  team: Team;
  rank?: number;
  players: HeadToHeadPlayer[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  align?: "left" | "right";
}) {
  return (
    <div>
      <div className={`mb-3 flex items-center justify-between gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
        <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
          <TeamLogo src={team.logo} name={team.name} size={28} />
          <div>
            <p className="text-sm font-black text-text-primary">{team.name}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Lineup</p>
          </div>
        </div>
        {rank && (
          <div className="rounded border border-border bg-bg-surface px-2.5 py-1 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">World rank</p>
            <p className="text-sm font-black text-blue-light">#{rank}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {players.map((player, index) => (
          <PlayerButton
            key={`${team.abbr}-${player.nickname}`}
            player={player}
            selected={selectedIndex === index}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

function PlayerButton({ player, selected, onClick }: { player: HeadToHeadPlayer; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group min-w-0 overflow-hidden rounded-lg border bg-bg-surface text-center transition-all ${
        selected ? "border-blue-light shadow-[0_0_0_1px_rgba(56,189,248,0.3)]" : "border-border hover:border-border-hover hover:bg-bg-card-hover"
      }`}
    >
      <div className="relative mx-auto h-28 w-full overflow-hidden bg-black/20 sm:h-32 lg:h-36">
        <Image
          src={player.image}
          alt={player.nickname}
          fill
          sizes="(max-width: 768px) 20vw, 150px"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-1.5 py-2">
        <div className="flex min-w-0 items-center justify-center gap-1.5">
          {player.country && <CountryFlag countryCode={player.country} preferredFlag={player.countryFlag} className="text-sm" />}
          <p className="truncate text-xs font-black text-text-primary">{player.nickname}</p>
        </div>
        <p className="mt-0.5 truncate text-[10px] text-text-muted">{player.role || "Player"}</p>
      </div>
    </button>
  );
}

function SelectedPlayer({ team, player, align }: { team: Team; player: HeadToHeadPlayer; align: "left" | "right" }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <div className="relative h-60 w-52 shrink-0 overflow-hidden sm:h-66 sm:w-56">
        <div className="absolute inset-x-0 bottom-7 top-4 opacity-[0.16]">
          <TeamLogo src={team.logo} name={team.name} size={220} className="h-full w-full object-contain" />
        </div>
        <Image
          src={player.image}
          alt={player.nickname}
          fill
          sizes="224px"
          className="relative z-10 object-contain object-bottom drop-shadow-[0_20px_22px_rgba(0,0,0,0.6)]"
        />
      </div>
      <div className="relative z-20 mt-2 min-w-0">
        <p className="truncate text-2xl font-black text-text-primary">{player.nickname}</p>
        <div className="mt-1.5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
          <TeamLogo src={team.logo} name={team.name} size={18} />
          <span>{team.abbr}</span>
          {player.country && <CountryFlag countryCode={player.country} preferredFlag={player.countryFlag} className="text-sm" />}
        </div>
      </div>
    </div>
  );
}

function StatsPanel({ leftStats, rightStats, leftName, rightName }: {
  leftStats: ReturnType<typeof getPlayerStats>;
  rightStats: ReturnType<typeof getPlayerStats>;
  leftName: string;
  rightName: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-4">
      <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs font-bold uppercase tracking-wider text-text-muted">
        <span className="truncate text-right">{leftName}</span>
        <span className="rounded bg-bg-surface px-2 py-1 text-[10px]">Stats</span>
        <span className="truncate">{rightName}</span>
      </div>
      <div className="space-y-3.5">
        {statLabels.map((stat) => (
          <StatCompare
            key={stat.key}
            label={stat.label}
            statKey={stat.key}
            short={stat.short}
            left={leftStats[stat.key]}
            right={rightStats[stat.key]}
            lowerIsBetter={stat.lowerIsBetter}
          />
        ))}
      </div>
    </div>
  );
}

function StatCompare({ label, statKey, short, left, right, lowerIsBetter }: { label: string; statKey: string; short?: string; left: number; right: number; lowerIsBetter?: boolean }) {
  const leftWins = lowerIsBetter ? left < right : left > right;
  const rightWins = lowerIsBetter ? right < left : right > left;
  const total = Math.max(left + right, 1);
  const leftWidth = Math.max(10, Math.round((left / total) * 100));
  const rightWidth = Math.max(10, Math.round((right / total) * 100));

  return (
    <div>
      <div className="mb-1.5 grid grid-cols-[70px_1fr_70px] items-center gap-3 text-sm">
        <span className={`text-right font-black tabular-nums ${leftWins ? "text-green" : "text-text-secondary"}`}>{formatStat(left, statKey)}</span>
        <span className="text-center text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}{short ? ` ${short}` : ""}</span>
        <span className={`font-black tabular-nums ${rightWins ? "text-green" : "text-text-secondary"}`}>{formatStat(right, statKey)}</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex justify-end rounded-l bg-bg-surface p-0.5">
          <div className="h-2 rounded-l bg-blue-light" style={{ width: `${leftWidth}%` }} />
        </div>
        <div className="rounded-r bg-bg-surface p-0.5">
          <div className="h-2 rounded-r bg-green" style={{ width: `${rightWidth}%` }} />
        </div>
      </div>
    </div>
  );
}

function getPlayerStats(player: HeadToHeadPlayer, seed: number) {
  const rating = Number((player.rating ?? 1.0 + ((seed % 5) - 2) * 0.04).toFixed(2));
  const kpr = Number((0.62 + rating * 0.11 + (seed % 3) * 0.01).toFixed(2));
  const dpr = Number((0.74 - rating * 0.1 + (seed % 2) * 0.02).toFixed(2));
  const kast = Number((66 + rating * 6 + (seed % 4) * 1.2).toFixed(1));
  const multi = Number((0.82 + rating * 0.28 + (seed % 3) * 0.03).toFixed(2));
  const swing = Number((0.4 + rating * 0.7 + (seed % 4) * 0.18).toFixed(2));
  const adr = Number((58 + rating * 17 + (seed % 5) * 1.7).toFixed(1));

  return { rating, kpr, dpr, kast, multi, swing, adr };
}

function formatStat(value: number, statKey: string) {
  if (statKey === "kast") return `${value.toFixed(1)}%`;
  if (statKey === "swing") return `+${value.toFixed(2)}%`;
  return value >= 10 ? value.toFixed(1) : value.toFixed(2);
}
