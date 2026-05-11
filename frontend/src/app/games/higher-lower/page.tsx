"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { api } from "@/services/api";
import type { Player } from "@/services/types";
import CountryFlag from "@/components/CountryFlag";
import { loadProfile, saveProfile, addXP, updateDailyStreak, checkNewAchievements } from "@/lib/gamification";
import type { UserProfile } from "@/lib/gamification";
import { usePageTitle } from "@/lib/use-page-title";

/* ---------- helpers ---------- */
const HL_STREAK_KEY = "wikihowl-hl-best-streak";

function pickTwo(players: Player[], exclude?: number): [Player, Player] {
  const pool = [...players];
  let a: Player, b: Player;
  do {
    a = pool[Math.floor(Math.random() * pool.length)];
  } while (exclude !== undefined && a.rank === exclude);
  do {
    b = pool[Math.floor(Math.random() * pool.length)];
  } while (b.rank === a.rank);
  return [a, b];
}

type Phase = "playing" | "revealing" | "gameover";

/* ---------- component ---------- */
export default function HigherLowerPage() {
  usePageTitle("Higher or Lower - Player Ratings");

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [leftPlayer, setLeftPlayer] = useState<Player | null>(null);
  const [rightPlayer, setRightPlayer] = useState<Player | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [lastAnswer, setLastAnswer] = useState<"correct" | "wrong" | null>(null);
  const [slideClass, setSlideClass] = useState("");
  const [xpEarned, setXpEarned] = useState(0);

  // Init
  useEffect(() => {
    let ignore = false;
    const p = loadProfile();
    setProfile(p);

    try {
      const stored = localStorage.getItem(HL_STREAK_KEY);
      if (stored) setBestStreak(Number(stored));
    } catch { /* ignore */ }

    api.topPlayers()
      .then((players) => {
        if (ignore) return;
        setTopPlayers(players);
        if (players.length >= 2) {
          const [a, b] = pickTwo(players);
          setLeftPlayer(a);
          setRightPlayer(b);
        }
      })
      .catch(() => {
        if (ignore) return;
        setTopPlayers([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleGuess = useCallback(
    (choice: "higher" | "lower") => {
      if (phase !== "playing") return;
      if (!leftPlayer || !rightPlayer || topPlayers.length < 2) return;

      const leftR = leftPlayer.rating;
      const rightR = rightPlayer.rating;
      const isHigher = rightR >= leftR;
      const correct =
        (choice === "higher" && isHigher) || (choice === "lower" && !isHigher);

      setLastAnswer(correct ? "correct" : "wrong");
      setPhase("revealing");

      if (correct) {
        const newStreak = streak + 1;
        setStreak(newStreak);

        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          try { localStorage.setItem(HL_STREAK_KEY, String(newStreak)); } catch { /* */ }
        }

        // After reveal animation, slide next player in
        setTimeout(() => {
          setSlideClass("slide-out");
          setTimeout(() => {
            const newLeft = rightPlayer;
            let newRight: Player;
            do {
              newRight = topPlayers[Math.floor(Math.random() * topPlayers.length)];
            } while (newRight.rank === newLeft.rank);

            setLeftPlayer(newLeft);
            setRightPlayer(newRight);
            setPhase("playing");
            setLastAnswer(null);
            setSlideClass("slide-in");
            setTimeout(() => setSlideClass(""), 400);
          }, 400);
        }, 1000);
      } else {
        // Game over
        setTimeout(() => {
          // Calculate XP
          let earned = 5; // base
          if (streak >= 3) earned = 15;
          if (streak >= 5) earned = 30;
          if (streak >= 10) earned = 60;
          if (streak >= 15) earned = 100;
          setXpEarned(earned);

          // Update profile
          if (profile) {
            let p = updateDailyStreak(profile);
            p = { ...p, gamesPlayed: p.gamesPlayed + 1 };
            const stats = { ...p.gameStats.higherLower };
            stats.played++;
            stats.totalCorrect += streak;
            if (streak > stats.highStreak) stats.highStreak = streak;
            p = { ...p, gameStats: { ...p.gameStats, higherLower: stats } };
            const result = addXP(p, earned);
            const achievements = checkNewAchievements(result.profile);
            const updated = achievements.length > 0
              ? { ...result.profile, achievements: [...result.profile.achievements, ...achievements] }
              : result.profile;
            setProfile(updated);
            saveProfile(updated);
          }

          setPhase("gameover");
        }, 1200);
      }
    },
    [phase, leftPlayer, rightPlayer, topPlayers, streak, bestStreak, profile],
  );

  const playAgain = useCallback(() => {
    if (topPlayers.length < 2) return;
    const [a, b] = pickTwo(topPlayers);
    setLeftPlayer(a);
    setRightPlayer(b);
    setStreak(0);
    setPhase("playing");
    setLastAnswer(null);
    setSlideClass("");
    setXpEarned(0);
  }, [topPlayers]);

  const isRevealing = phase === "revealing" || phase === "gameover";

  if (!leftPlayer || !rightPlayer) {
    return (
      <main className="mx-auto max-w-[1100px] px-5 py-16 text-center">
        <div className="animate-pulse text-text-muted">Loading...</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-3 py-5 sm:px-5 sm:py-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-text-muted sm:mb-6">
        <Link href="/" className="hover:text-text-secondary">Home</Link>
        <span className="mx-2">&rsaquo;</span>
        <Link href="/games" className="hover:text-text-secondary">Games</Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-text-primary">Higher or Lower</span>
      </div>

      {/* Title + streak */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:gap-4 sm:mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
                <polyline points="18 9 12 15 6 9" transform="translate(0,6)" />
              </svg>
            </span>
            Higher or Lower
          </h1>
          <p className="text-sm text-text-muted mt-1">Does this player have a higher or lower WikiHowl rating?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-border bg-bg-card px-4 py-2 text-center">
            <p className="text-lg font-black text-orange-400 tabular-nums">
              {streak}{streak >= 5 ? " \u{1F525}" : ""}
            </p>
            <p className="text-[10px] sm:text-[9px] font-bold uppercase text-text-muted">Streak</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-card px-4 py-2 text-center">
            <p className="text-lg font-black text-blue-light tabular-nums">{bestStreak}</p>
            <p className="text-[10px] sm:text-[9px] font-bold uppercase text-text-muted">Best</p>
          </div>
        </div>
      </div>

      {/* Game area */}
      <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 mb-5 sm:mb-8 ${slideClass}`}>
        {/* Left player - rating visible */}
        <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
          <div className="relative h-32 sm:h-56 overflow-hidden bg-gradient-to-b from-bg-surface to-bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leftPlayer.image}
              alt={leftPlayer.name}
              className="w-full h-full object-cover object-top opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
          </div>
          <div className="p-3 text-center -mt-6 relative z-10 sm:p-5 sm:-mt-12">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span><CountryFlag countryCode={leftPlayer.country} preferredFlag={leftPlayer.countryFlag} /></span>
              <h2 className="text-lg font-black sm:text-xl">{leftPlayer.name}</h2>
            </div>
            <p className="text-[11px] text-text-muted mb-2 sm:text-xs sm:mb-3">{leftPlayer.team}</p>
            <div className="inline-flex items-center gap-2 rounded-xl bg-blue/15 border border-blue/30 px-3 py-1.5 sm:px-5 sm:py-2.5">
              <span className="text-[10px] font-bold uppercase text-text-muted sm:text-xs">Rating</span>
              <span className="text-lg font-black text-blue-light tabular-nums sm:text-2xl">{leftPlayer.rating.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* VS divider */}
        <div className="flex items-center justify-center -my-1 sm:my-0">
          <div className="w-10 h-10 rounded-full border-2 border-border bg-bg-surface flex items-center justify-center sm:w-14 sm:h-14">
            <span className="text-xs font-black text-text-muted sm:text-sm">VS</span>
          </div>
        </div>

        {/* Right player - rating hidden/revealed */}
        <div className={`rounded-xl border overflow-hidden card-glow transition-all duration-300 ${
          lastAnswer === "correct" ? "border-green/50 bg-bg-card" :
          lastAnswer === "wrong" ? "border-red/50 bg-bg-card" :
          "border-border bg-bg-card"
        }`}>
          <div className="relative h-32 sm:h-56 overflow-hidden bg-gradient-to-b from-bg-surface to-bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rightPlayer.image}
              alt={rightPlayer.name}
              className="w-full h-full object-cover object-top opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
          </div>
          <div className="p-3 text-center -mt-6 relative z-10 sm:p-5 sm:-mt-12">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span><CountryFlag countryCode={rightPlayer.country} preferredFlag={rightPlayer.countryFlag} /></span>
              <h2 className="text-lg font-black sm:text-xl">{rightPlayer.name}</h2>
            </div>
            <p className="text-[11px] text-text-muted mb-2 sm:text-xs sm:mb-3">{rightPlayer.team}</p>

            {isRevealing ? (
              <div className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all sm:px-5 sm:py-2.5 ${
                lastAnswer === "correct"
                  ? "bg-green/15 border-green/30"
                  : "bg-red/15 border-red/30"
              }`}>
                <span className="text-[10px] font-bold uppercase text-text-muted sm:text-xs">Rating</span>
                <span className={`text-lg font-black tabular-nums sm:text-2xl ${
                  lastAnswer === "correct" ? "text-green" : "text-red"
                }`}>
                  {rightPlayer.rating.toFixed(2)}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl bg-bg-surface border border-border px-3 py-1.5 sm:px-5 sm:py-2.5">
                <span className="text-[10px] font-bold uppercase text-text-muted sm:text-xs">Rating</span>
                <span className="text-lg font-black text-text-muted sm:text-2xl">?</span>
              </div>
            )}
          </div>

          {/* Buttons */}
          {phase === "playing" && (
            <div className="flex gap-2 p-3 pt-0 sm:gap-3 sm:p-5">
              <button
                onClick={() => handleGuess("higher")}
                className="flex-1 rounded-xl bg-green/15 border border-green/30 py-2.5 text-sm font-bold text-green hover:bg-green/25 transition-all active:scale-95 flex items-center justify-center gap-2 sm:py-3"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                HIGHER
              </button>
              <button
                onClick={() => handleGuess("lower")}
                className="flex-1 rounded-xl bg-red/15 border border-red/30 py-2.5 text-sm font-bold text-red hover:bg-red/25 transition-all active:scale-95 flex items-center justify-center gap-2 sm:py-3"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                LOWER
              </button>
            </div>
          )}

          {/* Result feedback */}
          {isRevealing && lastAnswer && (
            <div className={`mx-5 mb-5 rounded-xl p-3 text-center text-sm font-bold ${
              lastAnswer === "correct"
                ? "bg-green/10 border border-green/30 text-green"
                : "bg-red/10 border border-red/30 text-red"
            }`}>
              {lastAnswer === "correct" ? "\u2713 Correct!" : "\u2717 Wrong!"}
            </div>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="rounded-xl border border-border bg-bg-card p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-black text-text-primary tabular-nums">{profile?.gameStats.higherLower.played ?? 0}</p>
            <p className="text-[10px] font-bold uppercase text-text-muted">Games Played</p>
          </div>
          <div>
            <p className="text-lg font-black text-orange-400 tabular-nums">{profile?.gameStats.higherLower.highStreak ?? 0}</p>
            <p className="text-[10px] font-bold uppercase text-text-muted">Best Streak</p>
          </div>
          <div>
            <p className="text-lg font-black text-green tabular-nums">{profile?.gameStats.higherLower.totalCorrect ?? 0}</p>
            <p className="text-[10px] font-bold uppercase text-text-muted">Total Correct</p>
          </div>
        </div>
      </div>

      {/* Slide animations */}
      <style jsx>{`
        .slide-out {
          animation: slideOut 0.4s ease forwards;
        }
        .slide-in {
          animation: slideIn 0.4s ease forwards;
        }
        @keyframes slideOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Game Over Modal */}
      {phase === "gameover" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-surface p-6 shadow-xl animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{streak >= 10 ? "\u{1F525}" : streak >= 5 ? "\u{1F4AA}" : "\u{1F3AE}"}</div>
              <h2 className="text-xl font-black mb-1">Game Over</h2>
              <p className="text-sm text-text-muted">
                You reached a streak of <span className="font-bold text-orange-400">{streak}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-border bg-bg-card p-3 text-center">
                <p className="text-lg font-black text-orange-400 tabular-nums">{streak}</p>
                <p className="text-[10px] text-text-muted font-bold uppercase">Final Streak</p>
              </div>
              <div className="rounded-xl border border-border bg-bg-card p-3 text-center">
                <p className="text-lg font-black text-blue-light tabular-nums">{bestStreak}</p>
                <p className="text-[10px] text-text-muted font-bold uppercase">Best Ever</p>
              </div>
            </div>

            <div className="rounded-xl border border-blue/30 bg-blue/10 p-3 text-center mb-6">
              <p className="text-sm font-bold text-blue-light">+{xpEarned} XP earned</p>
            </div>

            <button
              onClick={playAgain}
              className="w-full rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20 transition-all"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
