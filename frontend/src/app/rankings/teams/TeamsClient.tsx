"use client";

import { useState, useMemo } from "react";
import type { RankedTeam, TeamProfile } from "@/services/types";
import TeamLogo from "@/components/TeamLogo";
import CountryFlag from "@/components/CountryFlag";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TeamWithProfile extends RankedTeam {
  profile?: TeamProfile;
}

interface TeamsClientProps {
  initialTeams: TeamWithProfile[];
}

type SortConfig = {
  key: keyof TeamWithProfile | keyof TeamProfile;
  direction: "asc" | "desc";
};

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
  rank: "Team's position in the current world ranking.",
  points: "Total ranking points based on recent tournament performances.",
  vrs: "Valve Regional Standings points. Shown for context; table rank is still based on Points.",
  winRate: "Overall map win percentage.",
  mapsPlayed: "Total number of competitive maps played.",
  peakRank: "Highest world ranking achieved.",
  top5Weeks: "Total weeks spent in the top 5.",
  top10Weeks: "Total weeks spent in the top 10.",
  majors: "Total number of Major championships won.",
};

export default function TeamsClient({ initialTeams }: TeamsClientProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "rank", direction: "asc" });

  const filteredTeams = useMemo(() => {
    let result = [...initialTeams];

    result.sort((a, b) => {
      // Helper to safely get value whether it's on TeamWithProfile or the nested profile
      const getVal = (team: TeamWithProfile, key: string) => {
        if (key in team) return (team as any)[key];
        if (team.profile && key in team.profile) return (team.profile as any)[key];
        return 0;
      };

      const aValue = getVal(a, sortConfig.key as string);
      const bValue = getVal(b, sortConfig.key as string);

      if (typeof aValue === "string" && typeof bValue === "string") {
        const aNum = parseFloat(aValue.replace("%", "").replace("+", ""));
        const bNum = parseFloat(bValue.replace("%", "").replace("+", ""));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }
        return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [initialTeams, sortConfig]);

  const fixedTop3 = useMemo(() => {
    return [...initialTeams]
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 3);
  }, [initialTeams]);

  const requestSort = (key: keyof TeamWithProfile | keyof TeamProfile) => {
    let direction: "asc" | "desc" = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column) return <div className="w-3 h-3 opacity-20"><ChevronDown className="w-3 h-3" /></div>;
    return sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3 text-blue-light" /> : <ChevronDown className="w-3 h-3 text-blue-light" />;
  };

  const StatHeader = ({ label, defKey, sortKey, align = "center" }: { label: string; defKey: keyof typeof STAT_DEFINITIONS; sortKey: string; align?: "left" | "center" | "right" }) => (
    <th 
      className={`py-2 px-2 text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 transition-colors ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`} 
      onClick={() => requestSort(sortKey as any)}
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
            <PodiumCard team={fixedTop3[1]} rank={2} delay="delay-2" />
            <PodiumCard team={fixedTop3[0]} rank={1} delay="delay-1" isHero />
            <PodiumCard team={fixedTop3[2]} rank={3} delay="delay-3" />
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
                    <div className="flex items-center gap-1">Team <SortIcon column="name" /></div>
                  </th>
                  <StatHeader label="Points" defKey="points" sortKey="points" />
                  <th className="py-2 px-2 text-[9px] font-black text-text-muted uppercase tracking-wider text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Tooltip content={STAT_DEFINITIONS.vrs}>
                        <span className="border-b border-dotted border-text-muted/30 cursor-help">VRS</span>
                      </Tooltip>
                    </div>
                  </th>
                  <StatHeader label="Win %" defKey="winRate" sortKey="overallWinRate" />
                  <StatHeader label="Maps" defKey="mapsPlayed" sortKey="totalMapsPlayed" />
                  <StatHeader label="Peak" defKey="peakRank" sortKey="peakRanking" />
                  <StatHeader label="Top 5 Wks" defKey="top5Weeks" sortKey="weeksInTop5" />
                  <StatHeader label="Top 10 Wks" defKey="top10Weeks" sortKey="weeksInTop10" />
                  <th className="py-2 px-4 text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 text-right rounded-tr-xl" onClick={() => requestSort("majorsWon")}>
                    <div className="flex items-center justify-end gap-1">Majors <SortIcon column="majorsWon" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredTeams.map((team, idx) => (
                  <tr key={team.name} className="group hover:bg-bg-card-hover transition-colors">
                    <td className="py-1.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold tabular-nums ${idx === 0 ? "text-yellow" : idx === 1 ? "text-slate-400" : idx === 2 ? "text-amber-700" : "text-text-muted"}`}>
                          #{team.rank}
                        </span>
                        {team.change === "up" && <span className="text-[9px] font-bold text-green">+{team.changeVal}</span>}
                        {team.change === "down" && <span className="text-[9px] font-bold text-red">-{team.changeVal}</span>}
                        {team.change === "same" && <span className="text-[9px] font-bold text-text-muted">-</span>}
                      </div>
                    </td>
                    <td className="py-1.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col leading-tight">
                          <Link href={`/teams/${team.profile?.id || team.name.toLowerCase()}`} className="flex items-center gap-1.5 group/name">
                            <TeamLogo src={team.logo} name={team.name} size={16} />
                            <span className="text-[12px] font-bold text-text-primary group-hover/name:text-blue-light transition-colors">{team.name}</span>
                          </Link>
                          {team.profile && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <CountryFlag countryCode={team.profile.country} preferredFlag={team.profile.countryFlag} className="text-[9px]" />
                              <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">{team.region}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <span className={`text-[12px] font-black tabular-nums ${
                        team.points >= 800 ? "text-yellow" : 
                        team.points >= 500 ? "text-green" : 
                        team.points >= 250 ? "text-blue-light" : 
                        "text-text-secondary"
                      }`}>
                        {team.points}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-secondary">
                      {typeof team.vrs === "number" ? team.vrs.toLocaleString() : "-"}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {team.profile?.overallWinRate ? `${team.profile.overallWinRate}%` : "-"}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {team.profile?.totalMapsPlayed || "-"}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[10px] font-bold tabular-nums text-text-secondary">
                      {team.profile?.peakRanking ? `#${team.profile.peakRanking}` : "-"}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {team.profile?.weeksInTop5 || "-"}
                    </td>
                    <td className="py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                      {team.profile?.weeksInTop10 || "-"}
                    </td>
                    <td className="py-1.5 px-4 text-right text-[11px] font-black tabular-nums text-blue-light">
                      {team.profile?.majorsWon || "-"}
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

function PodiumCard({ team, rank, delay, isHero }: { 
  team: TeamWithProfile; 
  rank: number; 
  delay: string;
  isHero?: boolean;
}) {
  const bgColor = rank === 1 ? 'bg-yellow/5' : 'bg-bg-card';
  const logoSize = isHero ? 112 : 80;
  
  return (
    <div className={`rounded-xl border border-border ${bgColor} overflow-hidden card-glow flex flex-col items-center p-4 relative transition-all hover:border-border-hover animate-fade-in-up ${delay}`}>
      <div className={`relative mb-3 flex items-center justify-center h-24 ${isHero ? 'scale-110' : ''}`}>
        <TeamLogo src={team.logo} name={team.name} size={logoSize} className="drop-shadow-2xl" />
        <div className={`absolute -bottom-1 -right-4 w-6 h-6 bg-bg-card border-2 border-border rounded-full flex items-center justify-center text-[10px] font-black ${rank === 1 ? 'text-yellow' : 'text-text-muted'}`}>
          {rank}
        </div>
      </div>

      <div className="text-center w-full">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          {team.profile && <CountryFlag countryCode={team.profile.country} preferredFlag={team.profile.countryFlag} className="text-[10px]" />}
          <span className={`text-base font-black tracking-tight ${rank === 1 ? 'text-white' : 'text-text-secondary'}`}>{team.name}</span>
        </div>
        
        <div className={`grid grid-cols-2 gap-1 border-t border-border pt-3 mt-2`}>
          <div className="text-center border-r border-border">
            <p className="text-[8px] font-bold uppercase tracking-wider text-text-muted mb-0">Points</p>
            <p className={`text-sm font-black tabular-nums ${rank === 1 ? 'text-yellow' : 'text-green'}`}>{team.points}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] font-bold uppercase tracking-wider text-text-muted mb-0">Win Rate</p>
            <p className="text-sm font-black tabular-nums text-text-primary">{team.profile?.overallWinRate ? `${team.profile.overallWinRate}%` : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
