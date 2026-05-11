"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/lib/use-page-title";
import { useAuth } from "@/lib/auth-context";
import {
  ACHIEVEMENTS,
  getLevelName,
  getXpForNextLevel,
} from "@/lib/gamification";
import type { AuthUser } from "@/services/types";

const GAMES: Array<{
  id: keyof AuthUser["profile"]["gameStats"];
  title: string;
  accent: string;
  href: string;
}> = [
  { id: "csdle", title: "CS-dle", accent: "#a855f7", href: "/games/csdle" },
  { id: "guessLineup", title: "Guess the Lineup", accent: "#22c55e", href: "/games/guess-lineup" },
  { id: "higherLower", title: "Higher or Lower", accent: "#f97316", href: "/games/higher-lower" },
  { id: "mapGuesser", title: "Map Guesser", accent: "#3b82f6", href: "/games/map-guesser" },
  { id: "crosshair", title: "Crosshair Challenge", accent: "#ef4444", href: "/games/crosshair-challenge" },
  { id: "transferTrivia", title: "Transfer Trivia", accent: "#eab308", href: "/games/transfer-trivia" },
];

export default function ProfilePage() {
  usePageTitle("Profile");
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="mx-auto max-w-[1100px] px-4 py-10">
        <div className="h-40 rounded-xl border border-border bg-bg-card animate-pulse" />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl border border-border bg-bg-card animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  const { profile } = user;
  const xpInLevel = profile.xp;
  const xpForNext = getXpForNextLevel(profile.level);
  const progressPercent = xpForNext > 0 ? Math.min(100, Math.round((xpInLevel / xpForNext) * 100)) : 0;
  const unlocked = new Set(profile.achievements);
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlocked.has(a.id)).length;

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-8 space-y-8">
      <ProfileHeader user={user} progressPercent={progressPercent} xpInLevel={xpInLevel} xpForNext={xpForNext} />
      <StatsOverview
        gamesPlayed={profile.gamesPlayed}
        totalXpEarned={profile.totalXpEarned}
        dailyStreak={profile.dailyStreak}
        unlockedCount={unlockedCount}
        totalAchievements={totalAchievements}
      />
      <AchievementsSection unlocked={unlocked} />
      <GameStatsSection stats={profile.gameStats} />
    </main>
  );
}

function ProfileHeader({
  user,
  progressPercent,
  xpInLevel,
  xpForNext,
}: {
  user: AuthUser;
  progressPercent: number;
  xpInLevel: number;
  xpForNext: number;
}) {
  const initial = user.username.slice(0, 1).toUpperCase();
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-bg-card card-glow">
      <div
        className="px-6 py-8 sm:px-10 sm:py-10"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(168,85,247,0.10) 60%, transparent)",
        }}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue text-4xl font-black text-white shadow-lg"
            aria-hidden="true"
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold truncate">{user.username}</h1>
            <p className="text-sm text-text-muted truncate">{user.email}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="rounded bg-blue/15 px-2 py-0.5 text-xs font-bold uppercase text-blue-light">
                Level {user.profile.level}
              </span>
              <span className="text-sm font-medium text-text-secondary">{getLevelName(user.profile.level)}</span>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-bg-input">
                <div
                  className="h-full bg-gradient-to-r from-blue to-blue-light transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-text-muted tabular-nums">
                {xpInLevel.toLocaleString()} / {xpForNext.toLocaleString()} XP &middot; {progressPercent}% to level{" "}
                {user.profile.level + 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsOverview({
  gamesPlayed,
  totalXpEarned,
  dailyStreak,
  unlockedCount,
  totalAchievements,
}: {
  gamesPlayed: number;
  totalXpEarned: number;
  dailyStreak: number;
  unlockedCount: number;
  totalAchievements: number;
}) {
  const tiles = [
    { label: "Games played", value: gamesPlayed.toLocaleString() },
    { label: "Total XP", value: totalXpEarned.toLocaleString() },
    { label: "Daily streak", value: `${dailyStreak}d` },
    { label: "Achievements", value: `${unlockedCount} / ${totalAchievements}` },
  ];
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-xl border border-border bg-bg-card px-4 py-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{t.label}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-text-primary">{t.value}</p>
        </div>
      ))}
    </section>
  );
}

function AchievementsSection({ unlocked }: { unlocked: Set<string> }) {
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlocked.has(a.id)).length;
  return (
    <section className="rounded-xl border border-border bg-bg-card p-5 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-bold">Achievements</h2>
        <span className="text-xs text-text-muted">{unlockedCount} of {ACHIEVEMENTS.length} unlocked</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.has(a.id);
          return (
            <div
              key={a.id}
              className={`rounded-xl border p-4 text-center transition-all ${
                isUnlocked
                  ? "border-yellow/40 bg-yellow/5"
                  : "border-border bg-bg-surface opacity-50"
              }`}
            >
              <div className="text-3xl mb-2 leading-none">{a.icon}</div>
              <p className="text-xs font-bold mb-0.5 truncate text-text-primary">{a.name}</p>
              <p className="text-[10px] leading-tight text-text-muted">{a.description}</p>
              <p
                className="text-[10px] font-bold mt-1.5"
                style={{ color: isUnlocked ? "#eab308" : "var(--color-text-muted)" }}
              >
                +{a.xpReward} XP
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function GameStatsSection({ stats }: { stats: AuthUser["profile"]["gameStats"] }) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold">Game stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {GAMES.map((g) => (
          <GameCard key={g.id} title={g.title} accent={g.accent} href={g.href}>
            <GameStatRows gameId={g.id} stats={stats} />
          </GameCard>
        ))}
      </div>
    </section>
  );
}

function GameCard({
  title,
  accent,
  href,
  children,
}: {
  title: string;
  accent: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-border-hover"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-text-primary group-hover:text-blue-light transition-colors">{title}</h3>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
      </div>
      <dl className="space-y-1.5">{children}</dl>
    </Link>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline justify-between text-sm">
      <dt className="text-text-muted">{label}</dt>
      <dd className="font-bold tabular-nums text-text-primary">{value}</dd>
    </div>
  );
}

function GameStatRows({
  gameId,
  stats,
}: {
  gameId: keyof AuthUser["profile"]["gameStats"];
  stats: AuthUser["profile"]["gameStats"];
}) {
  switch (gameId) {
    case "csdle": {
      const s = stats.csdle;
      const winRate = s.played > 0 ? Math.round((s.won / s.played) * 100) : 0;
      return (
        <>
          <StatRow label="Played" value={s.played} />
          <StatRow label="Won" value={`${s.won} (${winRate}%)`} />
          <StatRow label="Current streak" value={s.streak} />
          <StatRow label="Max streak" value={s.maxStreak} />
        </>
      );
    }
    case "guessLineup": {
      const s = stats.guessLineup;
      return (
        <>
          <StatRow label="Played" value={s.played} />
          <StatRow label="Perfect rounds" value={s.perfectRounds} />
        </>
      );
    }
    case "higherLower": {
      const s = stats.higherLower;
      return (
        <>
          <StatRow label="Played" value={s.played} />
          <StatRow label="Best streak" value={s.highStreak} />
          <StatRow label="Total correct" value={s.totalCorrect} />
        </>
      );
    }
    case "mapGuesser": {
      const s = stats.mapGuesser;
      return (
        <>
          <StatRow label="Played" value={s.played} />
          <StatRow label="Perfect rounds" value={s.perfectRounds} />
          <StatRow label="Total correct" value={s.totalCorrect} />
        </>
      );
    }
    case "crosshair": {
      const s = stats.crosshair;
      return (
        <>
          <StatRow label="Played" value={s.played} />
          <StatRow label="High score" value={s.highScore} />
          <StatRow label="Best accuracy" value={`${s.bestAccuracy}%`} />
        </>
      );
    }
    case "transferTrivia": {
      const s = stats.transferTrivia;
      return (
        <>
          <StatRow label="Played" value={s.played} />
          <StatRow label="Perfect answers" value={s.perfectAnswers} />
          <StatRow label="Total correct" value={s.totalCorrect} />
        </>
      );
    }
  }
}
