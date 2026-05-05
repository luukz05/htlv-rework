"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loadProfile, getLevelName, getXpForNextLevel, ACHIEVEMENTS } from "@/lib/gamification";
import type { UserProfile } from "@/lib/gamification";

const games = [
  {
    id: "csdle",
    title: "CS-dle",
    description: "Guess the mystery CS pro",
    accent: "#a855f7",
    accentBg: "rgba(168,85,247,0.12)",
    href: "/games/csdle",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    id: "guess-lineup",
    title: "Guess the Lineup",
    description: "Name all 5 players",
    accent: "#22c55e",
    accentBg: "rgba(34,197,94,0.12)",
    href: "/games",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "higher-lower",
    title: "Higher or Lower",
    description: "Compare player ratings",
    accent: "#f97316",
    accentBg: "rgba(249,115,22,0.12)",
    href: "/games/higher-lower",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
        <polyline points="18 9 12 15 6 9" transform="translate(0,6)" />
      </svg>
    ),
  },
  {
    id: "map-guesser",
    title: "Map Guesser",
    description: "Identify maps by callouts",
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.12)",
    href: "/games",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    id: "crosshair-challenge",
    title: "Crosshair Challenge",
    description: "Test your aim speed",
    accent: "#ef4444",
    accentBg: "rgba(239,68,68,0.12)",
    href: "/games",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    id: "transfer-trivia",
    title: "Transfer Trivia",
    description: "Guess player careers",
    accent: "#eab308",
    accentBg: "rgba(234,179,8,0.12)",
    href: "/games",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    ),
  },
];

const dailyChallenges = [
  { title: "Win today's CS-dle", xp: 50, progress: 0, total: 1, icon: "🎯" },
  { title: "Get a 3-streak in Higher or Lower", xp: 30, progress: 0, total: 3, icon: "🔥" },
  { title: "Play any 2 games", xp: 20, progress: 0, total: 2, icon: "🎮" },
];

export default function GamesHubPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const level = profile?.level ?? 1;
  const xp = profile?.xp ?? 0;
  const needed = getXpForNextLevel(level);
  const pct = needed > 0 ? Math.min((xp / needed) * 100, 100) : 0;
  const levelName = getLevelName(level);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-secondary">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Games</span>
        </div>

        {/* Hero */}
        <div className="mb-10 rounded-xl border border-border bg-gradient-to-br from-blue/10 via-bg-card to-purple-500/10 p-8 md:p-12 text-center animate-fade-in-up card-glow">
          <div className="inline-flex items-center gap-2 bg-blue/15 border border-blue/30 rounded-full px-4 py-1.5 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M12 12h.01" />
              <path d="M17 12h.01" />
              <path d="M7 12h.01" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-light">Game Zone</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">HLTV Game Zone</h1>
          <p className="text-text-secondary max-w-lg mx-auto mb-6">
            Test your CS knowledge, train your aim, and compete for XP
          </p>

          {/* XP Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-blue-light">Lv. {level} &mdash; {levelName}</span>
              <span className="text-text-muted tabular-nums">{xp} / {needed} XP</span>
            </div>
            <div className="h-3 rounded-full bg-bg-surface overflow-hidden border border-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue to-purple-500 transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            {profile && (
              <p className="text-[10px] text-text-muted mt-1.5">
                Total XP earned: {profile.totalXpEarned.toLocaleString()} &middot; Games played: {profile.gamesPlayed} &middot; Daily streak: {profile.dailyStreak}
              </p>
            )}
          </div>
        </div>

        {/* Daily Challenges */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-base font-bold mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Daily Challenges
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dailyChallenges.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-bg-card p-4 hover:border-border-hover hover:bg-bg-card-hover transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{c.title}</p>
                    <p className="text-[11px] text-text-muted">+{c.xp} XP</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-bg-surface overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all"
                    style={{ width: `${(c.progress / c.total) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-text-muted mt-1 text-right tabular-nums">
                  {c.progress} / {c.total}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Games Grid */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-base font-bold mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M12 12h.01" />
            </svg>
            Minigames
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game, i) => (
              <Link
                key={game.id}
                href={game.href}
                className="group rounded-xl border border-border bg-bg-card overflow-hidden hover:border-border-hover hover:bg-bg-card-hover transition-all card-glow animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Accent strip */}
                <div className="h-1" style={{ background: game.accent }} />
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 flex items-center justify-center w-14 h-14 rounded-xl"
                      style={{ background: game.accentBg }}
                    >
                      {game.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold mb-1 group-hover:text-blue-light transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-xs text-text-muted mb-3">{game.description}</p>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors"
                        style={{
                          background: game.accentBg,
                          color: game.accent,
                        }}
                      >
                        Play Now
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-base font-bold mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            Achievements
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
            {ACHIEVEMENTS.map((a) => {
              const unlocked = profile?.achievements.includes(a.id) ?? false;
              return (
                <div
                  key={a.id}
                  className={`shrink-0 w-36 rounded-xl border p-4 text-center transition-all ${
                    unlocked
                      ? "border-yellow/40 bg-yellow/5"
                      : "border-border bg-bg-card opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{a.icon}</div>
                  <p className="text-xs font-bold mb-0.5 truncate">{a.name}</p>
                  <p className="text-[10px] text-text-muted leading-tight">{a.description}</p>
                  <p className="text-[10px] font-bold mt-1.5" style={{ color: unlocked ? "#eab308" : "var(--text-muted)" }}>
                    +{a.xpReward} XP
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
