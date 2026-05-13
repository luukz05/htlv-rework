"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LeaderboardUser } from "@/services/types";
import { getLevelName, getXpForNextLevel } from "@/lib/gamification";

interface UsersClientProps {
  initialUsers: LeaderboardUser[];
}

type SortKey =
  | "rank"
  | "username"
  | "level"
  | "totalXpEarned"
  | "gamesPlayed"
  | "dailyStreak"
  | "achievementsCount";

type SortConfig = { key: SortKey; direction: "asc" | "desc" };

const STAT_DEFINITIONS: Record<Exclude<SortKey, "username">, string> = {
  rank: "Position on the leaderboard, based on total XP earned.",
  level: "Account level reached. Higher level requires exponentially more XP.",
  totalXpEarned: "Total experience points earned from minigames and achievements.",
  gamesPlayed: "Total number of minigame sessions completed.",
  dailyStreak: "Current consecutive-day play streak.",
  achievementsCount: "Number of achievements unlocked.",
};

function Tooltip({ children, content, position = "top" }: { children: React.ReactNode; content: string; position?: "top" | "bottom" }) {
  return (
    <div className="group relative inline-flex items-center">
      {children}
      <div
        className={`absolute ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"} left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-[1000] w-48`}
      >
        <div className="bg-[#161b22] border border-[#1e3a5f66] rounded-lg p-2.5 shadow-2xl backdrop-blur-md ring-1 ring-black/40 text-center">
          <p className="text-[10px] font-bold text-[#e2e8f0] normal-case tracking-normal leading-tight">{content}</p>
          <div
            className={`absolute ${position === "top" ? "top-full border-t-[#161b22]" : "bottom-full border-b-[#161b22]"} left-1/2 -translate-x-1/2 border-8 border-transparent`}
          />
        </div>
      </div>
    </div>
  );
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "rank", direction: "asc" });

  const fixedTop3 = useMemo(
    () => [...initialUsers].sort((a, b) => b.totalXpEarned - a.totalXpEarned).slice(0, 3),
    [initialUsers],
  );

  const sortedUsers = useMemo(() => {
    const list = [...initialUsers];
    list.sort((a, b) => {
      const dir = sortConfig.direction === "asc" ? 1 : -1;
      if (sortConfig.key === "username") return a.username.localeCompare(b.username) * dir;
      const aVal = a[sortConfig.key] as number;
      const bVal = b[sortConfig.key] as number;
      return (aVal - bVal) * dir;
    });
    return list;
  }, [initialUsers, sortConfig]);

  const requestSort = (key: SortKey) => {
    const sameKey = sortConfig.key === key;
    const direction: "asc" | "desc" = sameKey ? (sortConfig.direction === "desc" ? "asc" : "desc") : key === "rank" || key === "username" ? "asc" : "desc";
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column)
      return (
        <div className="w-3 h-3 opacity-20">
          <ChevronDown className="w-3 h-3" />
        </div>
      );
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-3 h-3 text-blue-light" />
    ) : (
      <ChevronDown className="w-3 h-3 text-blue-light" />
    );
  };

  const StatHeader = ({
    label,
    defKey,
    sortKey,
    align = "center",
    hideOn,
  }: {
    label: string;
    defKey: Exclude<SortKey, "username">;
    sortKey: SortKey;
    align?: "left" | "center" | "right";
    hideOn?: "sm" | "md" | "lg" | "xl";
  }) => {
    const hideClass = hideOn === "sm" ? "hidden sm:table-cell"
      : hideOn === "md" ? "hidden md:table-cell"
      : hideOn === "lg" ? "hidden lg:table-cell"
      : hideOn === "xl" ? "hidden xl:table-cell"
      : "";
    return (
      <th
        className={`${hideClass} py-2 px-2 text-[10px] sm:text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 transition-colors ${
          align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
        }`}
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
  };

  if (initialUsers.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-bg-card p-10 text-center text-text-muted text-sm">
        No users have earned XP yet. Be the first by playing a{" "}
        <a href="/games" className="text-blue-light hover:underline">minigame</a>.
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-10">
      {fixedTop3.length >= 3 && (
        <section className="animate-fade-in-up relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="order-2 md:order-1">
              <PodiumCard user={fixedTop3[1]} rank={2} delay="delay-2" />
            </div>
            <div className="order-1 md:order-2">
              <PodiumCard user={fixedTop3[0]} rank={1} delay="delay-1" isHero />
            </div>
            <div className="order-3">
              <PodiumCard user={fixedTop3[2]} rank={3} delay="delay-3" />
            </div>
          </div>
        </section>
      )}

      <section className="animate-fade-in-up delay-2 relative z-30">
        <div className="rounded-xl border border-border bg-bg-card card-glow">
          <div className="table-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-body/50 border-b border-border">
                  <th
                    className="py-2 px-3 text-[10px] sm:text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 rounded-tl-xl"
                    onClick={() => requestSort("rank")}
                  >
                    <div className="flex items-center gap-1">
                      Rank <SortIcon column="rank" />
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-[10px] sm:text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5"
                    onClick={() => requestSort("username")}
                  >
                    <div className="flex items-center gap-1">
                      User <SortIcon column="username" />
                    </div>
                  </th>
                  <StatHeader label="Level" defKey="level" sortKey="level" />
                  <StatHeader label="Total XP" defKey="totalXpEarned" sortKey="totalXpEarned" align="right" />
                  <StatHeader label="Games" defKey="gamesPlayed" sortKey="gamesPlayed" hideOn="sm" />
                  <StatHeader label="Streak" defKey="dailyStreak" sortKey="dailyStreak" hideOn="md" />
                  <th
                    className="hidden lg:table-cell py-2 px-4 text-[10px] sm:text-[9px] font-black text-text-muted uppercase tracking-wider cursor-pointer hover:bg-white/5 text-right rounded-tr-xl"
                    onClick={() => requestSort("achievementsCount")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <Tooltip content={STAT_DEFINITIONS.achievementsCount}>
                        <span className="border-b border-dotted border-text-muted/30 cursor-help">Achv.</span>
                      </Tooltip>
                      <SortIcon column="achievementsCount" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sortedUsers.map((user) => {
                  const isPodium = user.rank <= 3;
                  return (
                    <tr key={user.id} className="group hover:bg-bg-card-hover transition-colors">
                      <td className="py-1.5 px-3">
                        <span
                          className={`text-[11px] font-bold tabular-nums ${
                            user.rank === 1
                              ? "text-yellow"
                              : user.rank === 2
                              ? "text-slate-400"
                              : user.rank === 3
                              ? "text-amber-700"
                              : "text-text-muted"
                          }`}
                        >
                          #{user.rank}
                        </span>
                      </td>
                      <td className="py-1.5 px-3 min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white ${
                              isPodium ? "bg-gradient-to-br from-blue to-blue-light" : "bg-blue/70"
                            }`}
                            aria-hidden="true"
                          >
                            {user.username.slice(0, 1).toUpperCase()}
                          </div>
                          <div className="flex flex-col leading-tight min-w-0">
                            <span className="text-[12px] font-bold text-text-primary truncate">{user.username}</span>
                            <span className="text-[10px] sm:text-[9px] font-bold uppercase tracking-wider text-text-muted truncate">
                              {getLevelName(user.level)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className="inline-flex items-center justify-center rounded bg-blue/15 px-1.5 py-0.5 text-[11px] font-black tabular-nums text-blue-light">
                          {user.level}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-right text-[12px] font-black tabular-nums text-text-primary">
                        {user.totalXpEarned.toLocaleString()}
                      </td>
                      <td className="hidden sm:table-cell py-1.5 px-2 text-center text-[11px] font-bold tabular-nums text-text-primary">
                        {user.gamesPlayed.toLocaleString()}
                      </td>
                      <td className="hidden md:table-cell py-1.5 px-2 text-center">
                        <span
                          className={`text-[10px] font-black tabular-nums px-1 py-0 rounded ${
                            user.dailyStreak > 0 ? "bg-green/10 text-green" : "text-text-muted"
                          }`}
                        >
                          {user.dailyStreak}d
                        </span>
                      </td>
                      <td className="hidden lg:table-cell py-1.5 px-4 text-right text-[11px] font-bold tabular-nums text-yellow">
                        {user.achievementsCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function PodiumCard({
  user,
  rank,
  delay,
  isHero,
}: {
  user: LeaderboardUser;
  rank: number;
  delay: string;
  isHero?: boolean;
}) {
  const bgColor = rank === 1 ? "bg-yellow/5" : "bg-bg-card";
  const avatarSize = isHero ? "h-28 w-28 md:h-32 md:w-32 text-5xl" : "h-24 w-24 md:h-28 md:w-28 text-4xl";
  const rankColor = rank === 1 ? "text-yellow" : rank === 2 ? "text-slate-400" : "text-amber-700";
  const xpForNext = getXpForNextLevel(user.level);
  const progressPercent = xpForNext > 0 ? Math.min(100, Math.round((user.xp / xpForNext) * 100)) : 0;

  return (
    <div
      className={`rounded-xl border border-border ${bgColor} overflow-hidden card-glow flex h-full flex-col items-center p-4 relative transition-all hover:border-border-hover animate-fade-in-up ${delay}`}
    >
      <div className={`relative mb-3 flex items-center justify-center ${isHero ? "scale-105" : ""}`}>
        <div
          className={`relative z-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue to-blue-light font-black text-white shadow-lg ${avatarSize}`}
          aria-hidden="true"
        >
          {user.username.slice(0, 1).toUpperCase()}
        </div>
        <div
          className={`absolute -bottom-1 -right-1 w-7 h-7 bg-bg-card border-2 border-border rounded-full flex items-center justify-center text-[11px] font-black ${rankColor}`}
        >
          {rank}
        </div>
      </div>

      <div className="text-center w-full">
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span className="text-base font-black tracking-tight text-text-primary truncate">{user.username}</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[9px] font-bold uppercase tracking-wider text-text-muted mb-3">
          {getLevelName(user.level)}
        </div>

        <div className="mb-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-input">
            <div
              className="h-full bg-gradient-to-r from-blue to-blue-light transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-text-muted tabular-nums">
            {user.xp.toLocaleString()} / {xpForNext.toLocaleString()} XP
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 border-t border-border pt-3">
          <div className="text-center border-r border-border">
            <p className="text-[10px] sm:text-[8px] font-bold uppercase tracking-wider text-text-muted mb-0">Level</p>
            <p className={`text-sm font-black tabular-nums ${rank === 1 ? "text-yellow" : "text-blue-light"}`}>
              {user.level}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-[8px] font-bold uppercase tracking-wider text-text-muted mb-0">Total XP</p>
            <p className="text-sm font-black tabular-nums text-text-primary">{user.totalXpEarned.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
