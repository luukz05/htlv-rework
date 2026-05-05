"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  loadProfile,
  saveProfile,
  addXP,
  updateDailyStreak,
  checkNewAchievements,
  ACHIEVEMENTS,
} from "@/lib/gamification";

/* ── types ─────────────────────────────────────────────── */

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  spawnedAt: number;
  lifetime: number;
}

type Phase = "idle" | "playing" | "results";

interface Stats {
  hits: number;
  misses: number;
  totalReactionMs: number;
  score: number;
}

const ROUND_DURATION = 30; // seconds

/* ── component ─────────────────────────────────────────── */

export default function CrosshairChallengePage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [stats, setStats] = useState<Stats>({
    hits: 0,
    misses: 0,
    totalReactionMs: 0,
    score: 0,
  });
  const [targets, setTargets] = useState<Target[]>([]);
  const [hitEffects, setHitEffects] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const targetIdRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const statsRef = useRef(stats);
  const targetsRef = useRef(targets);
  const phaseRef = useRef(phase);
  const timeLeftRef = useRef(timeLeft);

  /* keep refs in sync */
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);
  useEffect(() => {
    targetsRef.current = targets;
  }, [targets]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  /* ── difficulty scaling ──────────────────────────────── */

  const getTargetSize = useCallback(
    (score: number) => Math.max(20, 35 - Math.floor(score / 5) * 2),
    [],
  );
  const getTargetLifetime = useCallback(
    (score: number) => Math.max(500, 1500 - Math.floor(score / 3) * 80),
    [],
  );

  /* ── spawn target ────────────────────────────────────── */

  const spawnTarget = useCallback(() => {
    if (phaseRef.current !== "playing") return;

    const area = gameAreaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const size = getTargetSize(statsRef.current.score);
    const padding = size + 10;
    const x = padding + Math.random() * (rect.width - padding * 2);
    const y = padding + Math.random() * (rect.height - padding * 2);
    const lifetime = getTargetLifetime(statsRef.current.score);

    const newTarget: Target = {
      id: ++targetIdRef.current,
      x,
      y,
      size,
      spawnedAt: performance.now(),
      lifetime,
    };

    setTargets((prev) => [...prev, newTarget]);

    /* auto-remove expired target */
    setTimeout(() => {
      setTargets((prev) => {
        const exists = prev.find((t) => t.id === newTarget.id);
        if (exists && phaseRef.current === "playing") {
          setStats((s) => ({ ...s, misses: s.misses + 1 }));
        }
        return prev.filter((t) => t.id !== newTarget.id);
      });
    }, lifetime);

    /* schedule next spawn */
    const nextDelay = Math.max(
      400,
      1000 - Math.floor(statsRef.current.score / 4) * 50,
    );
    spawnTimerRef.current = setTimeout(spawnTarget, nextDelay);
  }, [getTargetSize, getTargetLifetime]);

  /* ── start game ──────────────────────────────────────── */

  const startGame = useCallback(() => {
    setPhase("playing");
    setTimeLeft(ROUND_DURATION);
    setStats({ hits: 0, misses: 0, totalReactionMs: 0, score: 0 });
    setTargets([]);
    setHitEffects([]);
    setXpEarned(0);
    setNewAchievements([]);
    targetIdRef.current = 0;

    /* small delay then first spawn */
    setTimeout(() => spawnTarget(), 400);
  }, [spawnTarget]);

  /* ── countdown timer ─────────────────────────────────── */

  useEffect(() => {
    if (phase !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  /* ── end game ────────────────────────────────────────── */

  const endGame = useCallback(() => {
    setPhase("results");
    setTargets([]);
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);

    /* XP calculation (use ref for latest stats) */
    setTimeout(() => {
      const s = statsRef.current;
      const accuracy =
        s.hits + s.misses > 0
          ? Math.round((s.hits / (s.hits + s.misses)) * 100)
          : 0;
      const xp =
        s.score * 3 + (accuracy >= 90 ? 40 : accuracy >= 70 ? 20 : 0);
      setXpEarned(xp);

      let profile = loadProfile();
      profile = updateDailyStreak(profile);
      profile.gamesPlayed += 1;
      profile.gameStats.crosshair.played += 1;
      if (s.score > profile.gameStats.crosshair.highScore) {
        profile.gameStats.crosshair.highScore = s.score;
      }
      if (accuracy > profile.gameStats.crosshair.bestAccuracy) {
        profile.gameStats.crosshair.bestAccuracy = accuracy;
      }

      const { profile: updated } = addXP(profile, xp);
      const achs = checkNewAchievements(updated);
      if (achs.length) {
        updated.achievements = [...updated.achievements, ...achs];
        setNewAchievements(achs);
      }
      saveProfile(updated);
    }, 50);
  }, []);

  /* ── cleanup ─────────────────────────────────────────── */

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── hit target ──────────────────────────────────────── */

  const hitTarget = (target: Target, e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase !== "playing") return;

    const reactionMs = performance.now() - target.spawnedAt;

    setStats((prev) => ({
      hits: prev.hits + 1,
      misses: prev.misses,
      totalReactionMs: prev.totalReactionMs + reactionMs,
      score: prev.score + 1,
    }));

    setTargets((prev) => prev.filter((t) => t.id !== target.id));

    /* hit effect */
    const effectId = target.id;
    setHitEffects((prev) => [
      ...prev,
      { id: effectId, x: target.x, y: target.y },
    ]);
    setTimeout(() => {
      setHitEffects((prev) => prev.filter((e) => e.id !== effectId));
    }, 400);
  };

  /* ── miss click (empty area) ─────────────────────────── */

  const handleAreaClick = () => {
    if (phase !== "playing") return;
    setStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
  };

  /* ── derived stats ───────────────────────────────────── */

  const accuracy =
    stats.hits + stats.misses > 0
      ? Math.round((stats.hits / (stats.hits + stats.misses)) * 100)
      : 0;
  const avgReaction =
    stats.hits > 0 ? Math.round(stats.totalReactionMs / stats.hits) : 0;

  const timerPct = (timeLeft / ROUND_DURATION) * 100;
  const timerColor =
    timerPct > 50 ? "text-green" : timerPct > 25 ? "text-yellow" : "text-red";

  /* ── render ──────────────────────────────────────────── */

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[900px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <a href="/" className="hover:text-text-secondary">
            Home
          </a>
          <span className="mx-2">&rsaquo;</span>
          <a href="/games" className="hover:text-text-secondary">
            Games
          </a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Crosshair Challenge</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black mb-6 text-center animate-fade-in-up">
          Crosshair Challenge
        </h1>

        {/* ── IDLE SCREEN ──────────────────────────────── */}
        {phase === "idle" && (
          <div className="flex flex-col items-center gap-6 py-16 animate-fade-in-up">
            <div className="rounded-xl border border-border bg-bg-card p-10 text-center card-glow max-w-md w-full">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                className="mx-auto mb-4"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h2 className="text-lg font-bold mb-2">How to Play</h2>
              <p className="text-sm text-text-secondary mb-6">
                Click on red targets as fast as you can! You have{" "}
                <span className="text-blue-light font-bold">30 seconds</span>.
                Targets get smaller and faster as your score increases. Clicking
                empty space counts as a miss!
              </p>
              <button
                onClick={startGame}
                className="rounded-xl bg-blue px-8 py-3 text-sm font-bold text-white transition-all hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20"
              >
                Click to Start
              </button>
            </div>
          </div>
        )}

        {/* ── PLAYING ──────────────────────────────────── */}
        {phase === "playing" && (
          <div className="animate-fade-in-up">
            {/* HUD */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={timerColor}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span
                  className={`text-lg font-black tabular-nums ${timerColor}`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-black text-blue-light tabular-nums animate-score-pop">
                  {stats.score}
                </span>
                <span className="text-xs text-text-muted ml-1">hits</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold tabular-nums">
                  {accuracy}%
                </span>
                <span className="text-xs text-text-muted ml-1">accuracy</span>
              </div>
            </div>

            {/* Timer bar */}
            <div className="h-1.5 rounded-full bg-bg-surface overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                  timerPct > 50
                    ? "bg-green"
                    : timerPct > 25
                      ? "bg-yellow"
                      : "bg-red"
                }`}
                style={{ width: `${timerPct}%` }}
              />
            </div>

            {/* Game area */}
            <div
              ref={gameAreaRef}
              onClick={handleAreaClick}
              className="relative w-full rounded-xl border border-border bg-bg-card overflow-hidden select-none"
              style={{
                height: "500px",
                cursor: "crosshair",
                backgroundImage:
                  "radial-gradient(circle, rgba(37,99,235,0.03) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {/* Targets */}
              {targets.map((target) => (
                <div
                  key={target.id}
                  onClick={(e) => hitTarget(target, e)}
                  className="absolute animate-target-spawn"
                  style={{
                    left: target.x - target.size / 2,
                    top: target.y - target.size / 2,
                    width: target.size,
                    height: target.size,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 35% 35%, #ff6b6b, #ef4444, #b91c1c)",
                    boxShadow:
                      "0 0 12px rgba(239, 68, 68, 0.5), inset 0 -2px 4px rgba(0,0,0,0.3)",
                    cursor: "crosshair",
                  }}
                />
              ))}

              {/* Hit effects */}
              {hitEffects.map((eff) => (
                <div
                  key={eff.id}
                  className="absolute pointer-events-none animate-target-hit"
                  style={{
                    left: eff.x - 15,
                    top: eff.y - 15,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    border: "2px solid rgba(34, 197, 94, 0.8)",
                    boxShadow: "0 0 16px rgba(34, 197, 94, 0.4)",
                  }}
                />
              ))}

              {/* Center crosshair watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="2" x2="12" y2="8" />
                  <line x1="12" y1="16" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="8" y2="12" />
                  <line x1="16" y1="12" x2="22" y2="12" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS SCREEN ───────────────────────────── */}
        {phase === "results" && (
          <div className="animate-scale-in max-w-lg mx-auto">
            <div className="rounded-xl border border-border bg-bg-card p-8 text-center card-glow">
              <h2 className="text-2xl font-black mb-2">
                {stats.score >= 30
                  ? "Aimbot Detected!"
                  : stats.score >= 20
                    ? "Sharpshooter!"
                    : stats.score >= 10
                      ? "Nice Aim!"
                      : "Keep Practicing!"}
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Round complete &mdash; here are your stats
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-border bg-bg-surface p-4 text-center">
                  <p className="text-3xl font-black text-blue-light tabular-nums animate-score-pop">
                    {stats.score}
                  </p>
                  <p className="text-[10px] font-bold uppercase text-text-muted mt-1">
                    Targets Hit
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-bg-surface p-4 text-center">
                  <p className="text-3xl font-black text-green tabular-nums">
                    {accuracy}%
                  </p>
                  <p className="text-[10px] font-bold uppercase text-text-muted mt-1">
                    Accuracy
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-bg-surface p-4 text-center">
                  <p className="text-3xl font-black text-yellow tabular-nums">
                    {avgReaction}
                  </p>
                  <p className="text-[10px] font-bold uppercase text-text-muted mt-1">
                    Avg Reaction (ms)
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-bg-surface p-4 text-center">
                  <p className="text-3xl font-black text-red tabular-nums">
                    {stats.misses}
                  </p>
                  <p className="text-[10px] font-bold uppercase text-text-muted mt-1">
                    Misses
                  </p>
                </div>
              </div>

              {/* XP */}
              <div className="rounded-xl border border-green/20 bg-green/5 p-4 mb-6">
                <p className="text-2xl font-black text-green tabular-nums">
                  +{xpEarned} XP
                </p>
                <p className="text-[10px] font-bold uppercase text-text-muted mt-1">
                  Experience Earned
                </p>
              </div>

              {/* Detailed breakdown */}
              <div className="rounded-xl border border-border bg-bg-surface p-4 mb-6 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                  Breakdown
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">
                      Hits ({stats.score} x 3 XP)
                    </span>
                    <span className="font-bold tabular-nums">
                      +{stats.score * 3}
                    </span>
                  </div>
                  {accuracy >= 90 && (
                    <div className="flex justify-between">
                      <span className="text-text-secondary">
                        90%+ Accuracy Bonus
                      </span>
                      <span className="font-bold text-green tabular-nums">
                        +40
                      </span>
                    </div>
                  )}
                  {accuracy >= 70 && accuracy < 90 && (
                    <div className="flex justify-between">
                      <span className="text-text-secondary">
                        70%+ Accuracy Bonus
                      </span>
                      <span className="font-bold text-green tabular-nums">
                        +20
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* New achievements */}
              {newAchievements.length > 0 && (
                <div className="mb-6 space-y-2">
                  {newAchievements.map((id) => {
                    const ach = ACHIEVEMENTS.find((a) => a.id === id);
                    if (!ach) return null;
                    return (
                      <div
                        key={id}
                        className="rounded-lg border border-yellow/30 bg-yellow/10 px-4 py-2 text-sm animate-fade-in-up"
                      >
                        <span className="mr-2">{ach.icon}</span>
                        <span className="font-bold text-yellow">
                          {ach.name}
                        </span>
                        <span className="text-text-secondary ml-1">
                          &mdash; {ach.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={startGame}
                className="rounded-xl bg-blue px-8 py-3 text-sm font-bold text-white transition-all hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
