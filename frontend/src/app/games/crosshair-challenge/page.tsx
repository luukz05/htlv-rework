"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  loadProfile,
  saveProfile,
  addXP,
  updateDailyStreak,
  checkNewAchievements,
  ACHIEVEMENTS,
} from "@/lib/gamification";
import { usePageTitle } from "@/lib/use-page-title";

/* ── types ─────────────────────────────────────────────── */

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  spawnedAt: number;
  lifetime: number;
  kind: "tr" | "bomb";
}

interface Chicken {
  id: number;
  kind: "golden" | "bomb";
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  width: number;
  height: number;
  flip: boolean;
  duration: number;
}

interface Flashbang {
  id: number;
  x: number;
  y: number;
  detonateAt: number;
  dodgeStart: number;
  dodgeEnd: number;
}

type Phase = "idle" | "playing" | "results";

interface Stats {
  hits: number;
  misses: number;
  totalReactionMs: number;
  score: number;
}

const ROUND_DURATION = 30; // seconds
const STARTING_LIVES = 3;
const MISSES_PER_LIFE = 10;
const GOLDEN_CHICKEN_BONUS = 5;
const FLASH_WARNING_MS = 1100;
const FLASH_DODGE_BEFORE_MS = 500;
const FLASH_DODGE_AFTER_MS = 180;
const FLASH_BLIND_MS = 1800;
const FLASH_SPAWN_MIN_MS = 6200;
const FLASH_SPAWN_MAX_MS = 9800;
const BOMB_SPAWN_CHANCE_MIN = 0.09;
const BOMB_SPAWN_CHANCE_MAX = 0.18;
const FLYING_BOMB_CHANCE = 0.22;
const BOMB_EXPLOSION_FLASH_MS = 500;
const TERRORIST_IMAGE =
  "https://static.wikia.nocookie.net/cswikia/images/1/18/Terrorist_large.png/revision/latest/scale-to-width-down/250?cb=20210528221152";
const FLASHBANG_IMAGE =
  "https://www.pngmart.com/files/23/Flashbang-PNG-Image.png";
const BOMB_IMAGE =
  "https://images.steamusercontent.com/ugc/2091415411420134200/0C3E17B0C0E62DC5A6BBD0FB0ECDADB7E55ACA38/";
const GOLDEN_CHICKEN_IMAGE =
  "https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNquOmmb_Glx5obj5BbkSRTylZPus3NatqT9MaFrIfXGWzfGkrcvseM7F3zmwxsi5T-Hzo6sJynDagIhWJFuBblddS7UA_M/330x192?allow_animated=1";

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function buildChickenPath(width: number, height: number, entityWidth: number) {
  const pad = entityWidth + 32;
  const paths = [
    {
      fromX: -pad,
      fromY: randomBetween(50, height - 90),
      toX: width + pad,
      toY: randomBetween(50, height - 90),
      flip: false,
    },
    {
      fromX: width + pad,
      fromY: randomBetween(50, height - 90),
      toX: -pad,
      toY: randomBetween(50, height - 90),
      flip: true,
    },
    {
      fromX: randomBetween(40, width - 40),
      fromY: -pad,
      toX: randomBetween(40, width - 40),
      toY: height + pad,
      flip: false,
    },
    {
      fromX: randomBetween(40, width - 40),
      fromY: height + pad,
      toX: randomBetween(40, width - 40),
      toY: -pad,
      flip: true,
    },
    {
      fromX: -pad,
      fromY: -pad,
      toX: width + pad,
      toY: height + pad,
      flip: false,
    },
    {
      fromX: width + pad,
      fromY: -pad,
      toX: -pad,
      toY: height + pad,
      flip: true,
    },
    {
      fromX: -pad,
      fromY: height + pad,
      toX: width + pad,
      toY: -pad,
      flip: false,
    },
    {
      fromX: width + pad,
      fromY: height + pad,
      toX: -pad,
      toY: -pad,
      flip: true,
    },
  ];

  return paths[Math.floor(Math.random() * paths.length)];
}

/* ── component ─────────────────────────────────────────── */

export default function CrosshairChallengePage() {
  usePageTitle("Crosshair Challenge - Aim Speed");

  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [stats, setStats] = useState<Stats>({
    hits: 0,
    misses: 0,
    totalReactionMs: 0,
    score: 0,
  });
  const [targets, setTargets] = useState<Target[]>([]);
  const [chickens, setChickens] = useState<Chicken[]>([]);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [missedShots, setMissedShots] = useState(0);
  const [missFlash, setMissFlash] = useState(false);
  const [flashbang, setFlashbang] = useState<Flashbang | null>(null);
  const [isBlinded, setIsBlinded] = useState(false);
  const [flashFeedback, setFlashFeedback] = useState<"dodged" | "blinded" | null>(null);
  const [hitEffects, setHitEffects] = useState<
    { id: number; x: number; y: number; variant: "hit" | "gold" | "boom" }[]
  >([]);
  const [explosionFlash, setExplosionFlash] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const targetIdRef = useRef(0);
  const chickenIdRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chickenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashDetonateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blindTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const statsRef = useRef(stats);
  const targetsRef = useRef(targets);
  const livesRef = useRef(lives);
  const missedShotsRef = useRef(missedShots);
  const flashbangRef = useRef<Flashbang | null>(null);
  const flashDodgedRef = useRef(false);
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
    livesRef.current = lives;
  }, [lives]);
  useEffect(() => {
    missedShotsRef.current = missedShots;
  }, [missedShots]);
  useEffect(() => {
    flashbangRef.current = flashbang;
  }, [flashbang]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  /* ── difficulty scaling ──────────────────────────────── */

  const getTargetSize = useCallback(
    (score: number) => Math.max(46, 72 - Math.floor(score / 5) * 4),
    [],
  );
  const getTargetLifetime = useCallback(
    (score: number) => Math.max(620, 1700 - Math.floor(score / 3) * 80),
    [],
  );
  const getBombChance = useCallback(
    (score: number) =>
      Math.min(
        BOMB_SPAWN_CHANCE_MAX,
        BOMB_SPAWN_CHANCE_MIN + Math.floor(score / 8) * 0.02,
      ),
    [],
  );

  /* ── spawn target ────────────────────────────────────── */

  const spawnTarget = useCallback(() => {
    if (phaseRef.current !== "playing") return;

    const area = gameAreaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const baseSize = getTargetSize(statsRef.current.score);
    const size = Math.round(baseSize * randomBetween(0.78, 1.28));
    const padding = size + 10;
    const x = padding + Math.random() * (rect.width - padding * 2);
    const y = padding + Math.random() * (rect.height - padding * 2);
    const lifetime = getTargetLifetime(statsRef.current.score);

    const isBomb = Math.random() < getBombChance(statsRef.current.score);
    const newTarget: Target = {
      id: ++targetIdRef.current,
      x,
      y,
      size,
      spawnedAt: performance.now(),
      lifetime,
      kind: isBomb ? "bomb" : "tr",
    };

    setTargets((prev) => [...prev, newTarget]);

    /* auto-remove expired target */
    setTimeout(() => {
      setTargets((prev) => {
        return prev.filter((t) => t.id !== newTarget.id);
      });
    }, lifetime);

    /* schedule next spawn */
    const nextDelay = Math.max(
      400,
      1000 - Math.floor(statsRef.current.score / 4) * 50,
    );
    spawnTimerRef.current = setTimeout(spawnTarget, nextDelay);
  }, [getTargetSize, getTargetLifetime, getBombChance]);

  const spawnChicken = useCallback(() => {
    if (phaseRef.current !== "playing") return;

    const area = gameAreaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const isFlyingBomb = Math.random() < FLYING_BOMB_CHANCE;
    const chickenWidth = Math.round(randomBetween(isFlyingBomb ? 70 : 78, isFlyingBomb ? 110 : 122));
    const chickenHeight = Math.round(chickenWidth * (isFlyingBomb ? 1 : 0.59));
    const path = buildChickenPath(rect.width, rect.height, chickenWidth);
    const chicken: Chicken = {
      id: ++chickenIdRef.current,
      kind: isFlyingBomb ? "bomb" : "golden",
      ...path,
      width: chickenWidth,
      height: chickenHeight,
      duration: 3600 + Math.random() * 1900,
    };

    setChickens((prev) => [...prev, chicken]);
    setTimeout(() => {
      setChickens((prev) => prev.filter((c) => c.id !== chicken.id));
    }, chicken.duration);

    chickenTimerRef.current = setTimeout(spawnChicken, 2400 + Math.random() * 1400);
  }, []);

  const clearFlashTimers = useCallback(() => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    if (flashDetonateTimerRef.current) clearTimeout(flashDetonateTimerRef.current);
    if (blindTimerRef.current) clearTimeout(blindTimerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  const showFlashFeedback = useCallback((feedback: "dodged" | "blinded") => {
    setFlashFeedback(feedback);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setFlashFeedback(null), 700);
  }, []);

  const scheduleFlashbang = useCallback(() => {
    if (phaseRef.current !== "playing") return;

    const delay = randomBetween(FLASH_SPAWN_MIN_MS, FLASH_SPAWN_MAX_MS);
    flashTimerRef.current = setTimeout(() => {
      if (phaseRef.current !== "playing") return;

      const area = gameAreaRef.current;
      if (!area) return;

      const rect = area.getBoundingClientRect();
      const now = performance.now();
      const detonateAt = now + FLASH_WARNING_MS;
      const nextFlashbang: Flashbang = {
        id: now,
        x: randomBetween(70, rect.width - 70),
        y: randomBetween(70, rect.height - 70),
        detonateAt,
        dodgeStart: detonateAt - FLASH_DODGE_BEFORE_MS,
        dodgeEnd: detonateAt + FLASH_DODGE_AFTER_MS,
      };

      flashDodgedRef.current = false;
      setFlashbang(nextFlashbang);
      flashbangRef.current = nextFlashbang;

      flashDetonateTimerRef.current = setTimeout(() => {
        const current = flashbangRef.current;
        if (phaseRef.current !== "playing" || !current || current.id !== nextFlashbang.id) return;

        setFlashbang(null);
        flashbangRef.current = null;

        if (flashDodgedRef.current) {
          scheduleFlashbang();
          return;
        }

        setIsBlinded(true);
        blindTimerRef.current = setTimeout(() => setIsBlinded(false), FLASH_BLIND_MS);
        scheduleFlashbang();
      }, FLASH_WARNING_MS);
    }, delay);
  }, [showFlashFeedback]);

  /* ── start game ──────────────────────────────────────── */

  const startGame = useCallback(() => {
    phaseRef.current = "playing";
    setPhase("playing");
    setTimeLeft(ROUND_DURATION);
    setStats({ hits: 0, misses: 0, totalReactionMs: 0, score: 0 });
    setTargets([]);
    setChickens([]);
    setLives(STARTING_LIVES);
    setMissedShots(0);
    setMissFlash(false);
    setFlashbang(null);
    setIsBlinded(false);
    setFlashFeedback(null);
    flashbangRef.current = null;
    flashDodgedRef.current = false;
    clearFlashTimers();
    setHitEffects([]);
    setExplosionFlash(false);
    setXpEarned(0);
    setNewAchievements([]);
    targetIdRef.current = 0;

    /* small delay then first spawn */
    setTimeout(() => spawnTarget(), 400);
    setTimeout(() => spawnChicken(), 900);
    scheduleFlashbang();
  }, [clearFlashTimers, scheduleFlashbang, spawnChicken, spawnTarget]);

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
    if (phaseRef.current !== "playing") return;
    phaseRef.current = "results";
    setPhase("results");
    setTargets([]);
    setChickens([]);
    setFlashbang(null);
    setIsBlinded(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    if (chickenTimerRef.current) clearTimeout(chickenTimerRef.current);
    clearFlashTimers();

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
      if (chickenTimerRef.current) clearTimeout(chickenTimerRef.current);
      clearFlashTimers();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [clearFlashTimers]);

  /* ── hit target ──────────────────────────────────────── */

  const dodgeFlashbang = useCallback(() => {
    const current = flashbangRef.current;
    if (phaseRef.current !== "playing" || !current) return;

    const now = performance.now();
    if (now < current.dodgeStart || now > current.dodgeEnd) return;

    flashDodgedRef.current = true;
    setFlashbang(null);
    flashbangRef.current = null;
    if (flashDetonateTimerRef.current) clearTimeout(flashDetonateTimerRef.current);
    showFlashFeedback("dodged");
    scheduleFlashbang();
  }, [scheduleFlashbang, showFlashFeedback]);

  useEffect(() => {
    if (phase !== "playing") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      event.preventDefault();
      dodgeFlashbang();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dodgeFlashbang, phase]);

  const hitTarget = (target: Target, e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase !== "playing") return;

    setTargets((prev) => prev.filter((t) => t.id !== target.id));

    if (target.kind === "bomb") {
      const effectId = target.id;
      setHitEffects((prev) => [
        ...prev,
        { id: effectId, x: target.x, y: target.y, variant: "boom" },
      ]);
      setTimeout(() => {
        setHitEffects((prev) => prev.filter((eff) => eff.id !== effectId));
      }, 600);

      setExplosionFlash(true);
      setTimeout(() => setExplosionFlash(false), BOMB_EXPLOSION_FLASH_MS);

      const nextLives = livesRef.current - 1;
      setLives(nextLives);
      livesRef.current = nextLives;
      setMissedShots(0);
      missedShotsRef.current = 0;
      if (nextLives <= 0) {
        endGame();
      }
      return;
    }

    const reactionMs = performance.now() - target.spawnedAt;

    setStats((prev) => ({
      hits: prev.hits + 1,
      misses: prev.misses,
      totalReactionMs: prev.totalReactionMs + reactionMs,
      score: prev.score + 1,
    }));

    /* hit effect */
    const effectId = target.id;
    setHitEffects((prev) => [
      ...prev,
      { id: effectId, x: target.x, y: target.y, variant: "hit" },
    ]);
    setTimeout(() => {
      setHitEffects((prev) => prev.filter((eff) => eff.id !== effectId));
    }, 400);
  };

  const hitChicken = (chicken: Chicken, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (phase !== "playing") return;

    setChickens((prev) => prev.filter((c) => c.id !== chicken.id));

    const areaRect = gameAreaRef.current?.getBoundingClientRect();
    const x = areaRect ? e.clientX - areaRect.left : chicken.fromX;
    const y = areaRect ? e.clientY - areaRect.top : chicken.fromY;

    if (chicken.kind === "bomb") {
      const effectId = chicken.id + 20000;
      setHitEffects((prev) => [
        ...prev,
        { id: effectId, x, y, variant: "boom" },
      ]);
      setTimeout(() => {
        setHitEffects((prev) => prev.filter((eff) => eff.id !== effectId));
      }, 600);

      setExplosionFlash(true);
      setTimeout(() => setExplosionFlash(false), BOMB_EXPLOSION_FLASH_MS);

      const nextLives = livesRef.current - 1;
      setLives(nextLives);
      livesRef.current = nextLives;
      setMissedShots(0);
      missedShotsRef.current = 0;
      if (nextLives <= 0) {
        endGame();
      }
      return;
    }

    setStats((prev) => ({
      ...prev,
      score: prev.score + GOLDEN_CHICKEN_BONUS,
    }));
    const effectId = chicken.id + 10000;
    setHitEffects((prev) => [
      ...prev,
      { id: effectId, x, y, variant: "gold" },
    ]);
    setTimeout(() => {
      setHitEffects((prev) => prev.filter((effect) => effect.id !== effectId));
    }, 500);
  };

  /* ── miss click (empty area) ─────────────────────────── */

  const handleAreaClick = () => {
    if (phase !== "playing") return;
    setMissFlash(true);
    setTimeout(() => setMissFlash(false), 160);
    setStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
    const nextMissedShots = missedShotsRef.current + 1;
    if (nextMissedShots >= MISSES_PER_LIFE) {
      setMissedShots(0);
      missedShotsRef.current = 0;
      const nextLives = livesRef.current - 1;
      setLives(nextLives);
      livesRef.current = nextLives;
      if (nextLives <= 0) {
        endGame();
      }
      return;
    }
    setMissedShots(nextMissedShots);
    missedShotsRef.current = nextMissedShots;
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
    <main className="mx-auto max-w-[900px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-secondary">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/games" className="hover:text-text-secondary">Games</Link>
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
                Shoot terrorists as fast as you can! You have{" "}
                <span className="text-blue-light font-bold">30 seconds</span>.
                Watch out for the <span className="text-red font-bold">C4</span>{" "}
                — it spawns where a terrorist would <em>and</em> sometimes flies across the
                screen like a chicken; clicking it costs one life.
                Golden chickens give bonus points, every 10 missed shots costs one
                life, and flashbangs must be dodged with Space or right click.
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
                <span className="text-xs text-text-muted ml-1">pts</span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-sm font-bold text-red tabular-nums">
                  {Array.from({ length: STARTING_LIVES }).map((_, i) => (
                    <span
                      key={i}
                      className={`transition-all duration-300 ${
                        i < lives ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    >
                      ♥
                    </span>
                  ))}
                </span>
                <span className="text-xs text-text-muted ml-2 tabular-nums">
                  {missedShots}/{MISSES_PER_LIFE} misses
                </span>
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
              onMouseDown={(e) => {
                if (e.button === 2) {
                  e.preventDefault();
                  dodgeFlashbang();
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              className={`relative w-full rounded-xl border border-border bg-bg-card overflow-hidden select-none ${
                missFlash ? "miss-flash" : ""
              }`}
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
                <button
                  key={target.id}
                  onClick={(e) => hitTarget(target, e)}
                  className="absolute animate-target-spawn border-0 bg-transparent p-0"
                  style={{
                    left: target.x - target.size / 2,
                    top: target.y - target.size / 2,
                    width: target.size,
                    height: target.size,
                    cursor: "crosshair",
                  }}
                  aria-label={target.kind === "bomb" ? "C4 — do not shoot" : "Shoot terrorist"}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={target.kind === "bomb" ? BOMB_IMAGE : TERRORIST_IMAGE}
                    alt=""
                    draggable={false}
                    className={`h-full w-full object-contain ${
                      target.kind === "bomb"
                        ? "drop-shadow-[0_0_16px_rgba(239,68,68,0.85)] animate-bomb-pulse"
                        : "drop-shadow-[0_0_12px_rgba(239,68,68,0.45)]"
                    }`}
                  />
                </button>
              ))}

              {chickens.map((chicken) => (
                <button
                  key={chicken.id}
                  onClick={(e) => hitChicken(chicken, e)}
                  className="absolute border-0 bg-transparent p-0 animate-chicken-path"
                  style={{
                    "--from-x": `${chicken.fromX}px`,
                    "--from-y": `${chicken.fromY}px`,
                    "--to-x": `${chicken.toX}px`,
                    "--to-y": `${chicken.toY}px`,
                    width: chicken.width,
                    height: chicken.height,
                    animationDuration: `${chicken.duration}ms`,
                    cursor: "crosshair",
                  } as React.CSSProperties}
                  aria-label={chicken.kind === "bomb" ? "Flying C4 — do not shoot" : "Shoot golden chicken"}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chicken.kind === "bomb" ? BOMB_IMAGE : GOLDEN_CHICKEN_IMAGE}
                    alt=""
                    draggable={false}
                    className={`h-full w-full object-contain ${
                      chicken.kind === "bomb"
                        ? "drop-shadow-[0_0_16px_rgba(239,68,68,0.85)] animate-bomb-pulse"
                        : "drop-shadow-[0_0_16px_rgba(234,179,8,0.95)] saturate-150"
                    }`}
                    style={{ transform: chicken.flip ? "scaleX(-1)" : undefined }}
                  />
                </button>
              ))}

              {flashbang && (
                <div
                  className="absolute z-20 flex h-16 w-16 items-center justify-center animate-flashbang-warning pointer-events-none"
                  style={{
                    left: flashbang.x - 32,
                    top: flashbang.y - 32,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FLASHBANG_IMAGE}
                    alt=""
                    draggable={false}
                    className="h-full w-full object-contain drop-shadow-[0_0_18px_rgba(234,179,8,0.85)]"
                  />
                </div>
              )}

              {flashFeedback === "dodged" && (
                <div
                  className="absolute left-1/2 top-5 z-40 -translate-x-1/2 rounded-lg border border-green/40 bg-green/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-green shadow-lg"
                >
                  Flash avoided
                </div>
              )}

              {/* Hit effects */}
              {hitEffects.map((eff) => {
                if (eff.variant === "boom") {
                  return (
                    <div
                      key={eff.id}
                      className="absolute pointer-events-none animate-bomb-boom z-30"
                      style={{
                        left: eff.x - 50,
                        top: eff.y - 50,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle, rgba(254,215,170,0.95) 0%, rgba(239,68,68,0.85) 35%, rgba(120,20,20,0) 75%)",
                        boxShadow: "0 0 60px rgba(239,68,68,0.85)",
                      }}
                    />
                  );
                }
                return (
                  <div
                    key={eff.id}
                    className="absolute pointer-events-none animate-target-hit"
                    style={{
                      left: eff.x - 15,
                      top: eff.y - 15,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: eff.variant === "gold" ? "2px solid rgba(234, 179, 8, 0.95)" : "2px solid rgba(34, 197, 94, 0.8)",
                      boxShadow: eff.variant === "gold" ? "0 0 20px rgba(234, 179, 8, 0.7)" : "0 0 16px rgba(34, 197, 94, 0.4)",
                    }}
                  />
                );
              })}

              {explosionFlash && (
                <div className="absolute inset-0 z-30 pointer-events-none animate-explosion-flash" />
              )}

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
            <style jsx>{`
              .miss-flash::after {
                animation: missFlash 160ms ease-out;
                background: rgba(239, 68, 68, 0.18);
                content: "";
                inset: 0;
                pointer-events: none;
                position: absolute;
                z-index: 30;
              }
              @keyframes missFlash {
                from { opacity: 1; }
                to { opacity: 0; }
              }
              @keyframes flashbangWarning {
                0% { opacity: 0.55; transform: scale(0.85); }
                50% { opacity: 1; transform: scale(1.08); }
                100% { opacity: 0.7; transform: scale(0.95); }
              }
              .animate-flashbang-warning {
                animation: flashbangWarning 380ms ease-in-out infinite;
              }
              @keyframes blindFade {
                0% { opacity: 1; }
                65% { opacity: 0.96; }
                100% { opacity: 0; }
              }
              .animate-blind-fade {
                animation: blindFade ${FLASH_BLIND_MS}ms ease-out forwards;
              }
              @keyframes chickenPath {
                from { transform: translate(var(--from-x), var(--from-y)); }
                to { transform: translate(var(--to-x), var(--to-y)); }
              }
              .animate-chicken-path {
                animation: chickenPath linear forwards;
                left: 0;
                top: 0;
              }
              @keyframes bombPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.15); }
              }
              .animate-bomb-pulse {
                animation: bombPulse 700ms ease-in-out infinite;
              }
              @keyframes bombBoom {
                0% { transform: scale(0.4); opacity: 0.95; }
                60% { transform: scale(1.4); opacity: 0.85; }
                100% { transform: scale(1.8); opacity: 0; }
              }
              .animate-bomb-boom {
                animation: bombBoom 600ms ease-out forwards;
              }
              @keyframes explosionFlash {
                0% { background-color: rgba(239, 68, 68, 0.65); }
                100% { background-color: rgba(239, 68, 68, 0); }
              }
              .animate-explosion-flash {
                animation: explosionFlash ${BOMB_EXPLOSION_FLASH_MS}ms ease-out forwards;
              }
            `}</style>
          </div>
        )}

        {isBlinded && (
          <div className="fixed inset-0 z-[9999] bg-white animate-blind-fade pointer-events-none" />
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
                    Score
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
                      Score ({stats.score} x 3 XP)
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
    );
  }

