"use client";

import { useState, useMemo } from "react";
import type { Player } from "@/services/types";
import TeamLogo from "@/components/TeamLogo";
import CountryFlag from "@/components/CountryFlag";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

interface StatsClientProps {
  initialPlayers: Player[];
}

type SortConfig = {
  key: keyof Player;
  direction: "asc" | "desc";
};

// Simplified Tooltip Component
function Tooltip({ children, content, position = "top" }: { children: React.ReactNode, content: string, position?: "top" | "bottom" }) {
  return (
    <div className="group relative inline-flex items-center">
      {children}
      <div className={`absolute ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"} left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-[1000] w-48`}>
        <div className="bg-[#161b22] border border-[#1e3a5f66] rounded-lg p-2.5 shadow-2xl backdrop-blur-md ring-1 ring-black/40 text-center">
          <p className="text-[10px] font-bold text-[#e2e8f0] normal-case tracking-normal leading-tight">
            {content}
          </p>
          <div className={`absolute ${position === "top" ? "top-full border-t-[#161b22]" : "bottom-full border-b-[#161b22]"} left-1/2 -translate-x-1/2 border-8 border-transparent`} />
        </div>
      </div>
    </div>
  );
}

const STAT_DEFINITIONS = {
  rank: "Player's position in the current ranking based on performance metrics.",
  rating: "HLTV Rating 2.0 - A comprehensive metric of player performance based on all aspects of the game.",
  kd: "Kill to Death ratio - Total kills divided by total deaths.",
  adr: "Average Damage per Round - Raw impact in terms of damage dealt.",
  kast: "Percentage of rounds with a Kill, Assist, Survival or Traded death.",
  swing: "Win Probability Swing - How much a player's actions shift round outcomes.",
  impact: "Impact Rating - Based on multi-kills, opening kills, and clutches.",
  hsPercent: "Headshot Percentage - Percentage of kills that were headshots.",
  openingKills: "First bloods - Very first kill of the round.",
  clutchesWon: "1vX situations won - Last alive player winning the round.",
};

export default function StatsClient({ initialPlayers }: StatsClientProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "rank", direction: "asc" });

  const filteredPlayers = useMemo(() => {
    let result = [...initialPlayers];

    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const aNum = parseFloat(aValue.replace("%", "").replace("+", ""));
        const bNum = parseFloat(bValue.replace("%", "").replace("+", ""));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }
        return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }

      return 0;
    });

    return result;
  }, [initialPlayers, sortConfig]);

  const fixedTop3 = useMemo(() => {
    return [...initialPlayers]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 3);
  }, [initialPlayers]);

  const requestSort = (key: keyof Player) => {
    let direction: "asc" | "desc" = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }: { column: keyof Player }) => {
    if (sortConfig.key !== column) return <div className="w-3 h-3 opacity-20"><ChevronDown className="w-3 h-3" /></div>;
    return sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3 text-blue-light" /> : <ChevronDown className="w-3 h-3 text-blue-light" />;
  };

  const StatHeader = ({ label, defKey, sortKey, align = "center" }: { label: string; defKey: keyof typeof STAT_DEFINITIONS; sortKey: keyof Player; align?: "left" | "center" | "right" }) => (
    <th 
      className={`py-2 px-2 text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 transition-colors ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`} 
      onClick={() => requestSort(sortKey)}
    >
      <div className={`flex items-center gap-1 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : ""}`}>
        <Tooltip content={STAT_DEFINITIONS[defKey]}>
          <span className="border-b border-dotted border-text-muted/30 cursor-help">{label}</span>
        </Tooltip>
        <SortIcon column={sortKey} />
      </div>
    </th>
  );

  return (
    <div className="space-y-5 pb-10">
      {/* Podium Section */}
      {fixedTop3.length >= 3 && (
        <section className="animate-fade-in-up relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <PodiumCard player={fixedTop3[1]} rank={2} delay="delay-2" />
            <PodiumCard player={fixedTop3[0]} rank={1} delay="delay-1" isHero />
            <PodiumCard player={fixedTop3[2]} rank={3} delay="delay-3" />
          </div>
        </section>
      )}

      {/* Main Table Section */}
      <section className="animate-fade-in-up delay-2 relative z-30">
        <div className="rounded-xl border border-border bg-bg-card card-glow">
          <div className="overflow-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-body/50 border-b border-border">
                  <th className="py-2 px-3 text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 rounded-tl-xl" onClick={() => requestSort("rank")}>
                    <div className="flex items-center gap-1">Rank <SortIcon column="rank" /></div>
                  </th>
                  <th className="py-2 px-3 text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5" onClick={() => requestSort("name")}>
                    <div className="flex items-center gap-1">Player <SortIcon column="name" /></div>
                  </th>
                  <StatHeader label="Rating" defKey="rating" sortKey="rating" />
                  <StatHeader label="K/D" defKey="kd" sortKey="kd" />
                  <StatHeader label="ADR" defKey="adr" sortKey="adr" />
                  <StatHeader label="KAST" defKey="kast" sortKey="kast" />
                  <StatHeader label="Swing" defKey="swing" sortKey="swing" />
                  <StatHeader label="Impact" defKey="impact" sortKey="impact" />
                  <StatHeader label="Clutches" defKey="clutchesWon" sortKey="clutchesWon" />
                  <StatHeader label="Open K" defKey="openingKills" sortKey="openingKills" />
                  <th className="py-2 px-4 text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 text-right rounded-tr-xl" onClick={() => requestSort("hsPercent")}>
                    <div className="flex items-center justify-end gap-1">HS% <SortIcon column="hsPercent" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredPlayers.map((player, idx) => (
                  <tr key={player.name} className="group hover:bg-bg-card-hover transition-colors">
                    <td className="py-1.5 px-3">
                      <span className={`text-[11px] font-bold tabular-nums ${idx === 0 ? "text-yellow" : idx === 1 ? "text-slate-400" : idx === 2 ? "text-amber-700" : "text-text-muted"}`}>
                        #{player.rank}
                      </span>
                    </td>
                    <td className="py-1.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col leading-tight">
                          <Link href={`/rankings/players/${player.id}`} className="flex items-center gap-1 group/name">
                            <CountryFlag countryCode={player.country} preferredFlag={player.countryFlag} className="text-[10px]" />
                            <span className="text-[12px] font-bold text-text-primary group-hover/name:text-blue-light transition-colors">{player.name}</span>
                          </Link>
                          <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-text-muted">
                            <TeamLogo src={player.teamLogo} name={player.team} size={10} />
                            {player.team}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <span className={`text-[12px] font-black tabular-nums ${
                        (player.rating ?? 0) >= 1.2 ? "text-green" : 
                        (player.rating ?? 0) >= 1.05 ? "text-blue-light" : 
                        "text-text-secondary"
                      }`}>
                        {(player.rating ?? 0).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {player.kd}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {(player.adr ?? 0).toFixed(1)}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[10px] font-bold tabular-nums text-text-secondary">
                      {player.kast}
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <span className={`text-[9px] font-black tabular-nums px-1 py-0 rounded ${
                        (player.swing || "").startsWith("+") ? "bg-green/10 text-green" : "bg-red/10 text-red"
                      }`}>
                        {player.swing || "0.00"}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {(player.impact ?? 0).toFixed(2)}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-black tabular-nums text-blue-light">
                      {player.clutchesWon}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {player.openingKills}
                    </td>
                    <td className="py-1.5 px-4 text-right text-[10px] font-bold tabular-nums text-text-muted">
                      {player.hsPercent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function PodiumCard({ player, rank, delay, isHero }: { 
  player: Player; 
  rank: number; 
  delay: string;
  isHero?: boolean;
}) {
  const bgColor = rank === 1 ? 'bg-yellow/5' : 'bg-bg-card';
  const portraitSize = isHero ? 'h-32 w-32 md:h-36 md:w-36' : 'h-28 w-28 md:h-48 md:w-32';
  
  return (
    <div className={`rounded-xl border border-border ${bgColor} overflow-hidden card-glow flex flex-col items-center p-4 relative transition-all hover:border-border-hover animate-fade-in-up ${delay}`}>
      <div className={`relative mb-1 flex h-32 w-32 items-center justify-center md:h-36 md:w-36 ${isHero ? 'scale-105' : ''}`}>
        <TeamLogo
          src={player.teamLogo}
          name={player.team}
          size={152}
          className="absolute left-1/2 top-1/2 z-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 opacity-25 grayscale md:h-[9.5rem] md:w-[9.5rem]"
        />
        <div className={`relative z-10 ${portraitSize}`}>
          <img src={player.image} alt={player.name} className="h-full w-full object-contain object-bottom drop-shadow-2xl" />
          <div className="pointer-events-none absolute inset-x-3 bottom-0 h-12 bg-gradient-to-t from-bg-card/80 to-transparent" />
        </div>
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-bg-card border-2 border-border rounded-full flex items-center justify-center text-[10px] font-black ${rank === 1 ? 'text-yellow' : 'text-text-muted'}`}>
          {rank}
        </div>
      </div>

      <div className="text-center w-full">
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <CountryFlag countryCode={player.country} preferredFlag={player.countryFlag} className="text-[10px]" />
          <span className={`text-base font-black tracking-tight ${rank === 1 ? 'text-white' : 'text-text-secondary'}`}>{player.name}</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider text-text-muted mb-3">
          <TeamLogo src={player.teamLogo} name={player.team} size={12} />
          {player.team}
        </div>
        
        <div className={`grid grid-cols-2 gap-1 border-t border-border pt-3`}>
          <div className="text-center border-r border-border">
            <p className="text-[8px] font-bold uppercase tracking-wider text-text-muted mb-0">Rating</p>
            <p className={`text-sm font-black tabular-nums ${rank === 1 ? 'text-yellow' : 'text-green'}`}>{(player.rating ?? 0).toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] font-bold uppercase tracking-wider text-text-muted mb-0">Impact</p>
            <p className="text-sm font-black tabular-nums text-text-primary">{(player.impact ?? 0).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
