"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { teamRosters } from "@/data/mock";
import {
  loadProfile,
  saveProfile,
  addXP,
  updateDailyStreak,
  checkNewAchievements,
  ACHIEVEMENTS,
  type UserProfile,
} from "@/lib/gamification";

/* ── helpers ───────────────────────────────────────────── */

const ALL_PLAYER_NAMES = Array.from(
  new Set(teamRosters.flatMap((t) => t.players)),
);

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ── types ─────────────────────────────────────────────── */

type Phase = "playing" | "ended";

interface GameState {
  teamIndex: number;
  found: boolean[];
  timeLeft: number;
  phase: Phase;
  score: number;
}

const ROUND_SECONDS = 60;

/* ── component ─────────────────────────────────────────── */

export default function GuessLineupPage() {
  const [game, setGame] = useState<GameState | null>(null);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef(0);

  /* ── start new round ─────────────────────────────────── */

  const startGame = useCallback(() => {
    const idx = Math.floor(Math.random() * teamRosters.length);
    setGame({
      teamIndex: idx,
      found: Array(5).fill(false) as boolean[],
      timeLeft: ROUND_SECONDS,
      phase: "playing",
      score: 0,
    });
    setInput("");
    setSuggestions([]);
    setShake(false);
    setXpEarned(0);
    setNewAchievements([]);
    startTimeRef.current = Date.now();
  }, []);

  /* ── timer ───────────────────────────────────────────── */

  useEffect(() => {
    if (!game || game.phase !== "playing") return;

    timerRef.current = setInterval(() => {
      setGame((prev) => {
        if (!prev || prev.phase !== "playing") return prev;
        const next = prev.timeLeft - 1;
        if (next <= 0) return { ...prev, timeLeft: 0, phase: "ended" };
        return { ...prev, timeLeft: next };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [game?.phase]);

  /* ── end‑of‑game XP ─────────────────────────────────── */

  useEffect(() => {
    if (!game || game.phase !== "ended") return;

    const correctCount = game.found.filter(Boolean).length;
    const timeBonus = game.timeLeft * 2;
    const baseXP = correctCount * 15;
    const total = baseXP + timeBonus + (correctCount === 5 ? 50 : 0);

    setXpEarned(total);

    let profile = loadProfile();
    profile = updateDailyStreak(profile);
    profile.gamesPlayed += 1;
    profile.gameStats.guessLineup.played += 1;

    const elapsedMs = Date.now() - startTimeRef.current;
    if (correctCount === 5 && elapsedMs < 20_000) {
      profile.gameStats.guessLineup.perfectRounds += 1;
    }

    const { profile: updated } = addXP(profile, total);
    const achs = checkNewAchievements(updated);
    if (achs.length) {
      updated.achievements = [...updated.achievements, ...achs];
      setNewAchievements(achs);
    }
    saveProfile(updated);
  }, [game?.phase]);

  /* ── autocomplete ────────────────────────────────────── */

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.length < 1) {
      setSuggestions([]);
      return;
    }
    const lower = value.toLowerCase();
    const matches = ALL_PLAYER_NAMES.filter(
      (n) =>
        n.toLowerCase().includes(lower) &&
        !(game && teamRosters[game.teamIndex].players.includes(n) && game.found[teamRosters[game.teamIndex].players.indexOf(n)]),
    ).slice(0, 6);
    setSuggestions(matches);
  };

  /* ── submit guess ────────────────────────────────────── */

  const submitGuess = (name: string) => {
    if (!game || game.phase !== "playing") return;

    const roster = teamRosters[game.teamIndex];
    const idx = roster.players.findIndex(
      (p) => p.toLowerCase() === name.toLowerCase(),
    );

    if (idx !== -1 && !game.found[idx]) {
      const newFound = [...game.found];
      newFound[idx] = true;
      const allFound = newFound.every(Boolean);
      const bonus = game.timeLeft * 2;
      setGame({
        ...game,
        found: newFound,
        score: game.score + 20 + Math.floor(bonus / 5),
        phase: allFound ? "ended" : "playing",
      });
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }

    setInput("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  /* ── timer bar color ─────────────────────────────────── */

  const timerPct = game ? (game.timeLeft / ROUND_SECONDS) * 100 : 100;
  const timerColor =
    timerPct > 50 ? "bg-green" : timerPct > 25 ? "bg-yellow" : "bg-red";

  const roster = game ? teamRosters[game.teamIndex] : null;

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
          <span className="text-text-primary">Guess the Lineup</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black mb-6 text-center animate-fade-in-up">
          Guess the Lineup
        </h1>

        {/* ── START SCREEN ─────────────────────────────── */}
        {!game && (
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h2 className="text-lg font-bold mb-2">How to Play</h2>
              <p className="text-sm text-text-secondary mb-6">
                A random CS2 team will appear. You have{" "}
                <span className="text-blue-light font-bold">60 seconds</span> to
                name all 5 players on the roster. Type a name and select from the
                autocomplete list. Score is based on speed!
              </p>
              <button
                onClick={startGame}
                className="rounded-xl bg-blue px-8 py-3 text-sm font-bold text-white transition-all hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20"
              >
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* ── PLAYING / ENDED ──────────────────────────── */}
        {game && roster && (
          <div className="animate-fade-in-up">
            {/* Timer bar */}
            <div className="mb-6">
              <div className="h-2 rounded-full bg-bg-surface overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerColor}`}
                  style={{ width: `${timerPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-text-muted">
                  {game.timeLeft}s remaining
                </span>
                <span className="text-xs font-bold text-blue-light tabular-nums">
                  Score: {game.score}
                </span>
              </div>
            </div>

            {/* Team display */}
            <div className="flex flex-col items-center mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={roster.teamLogo}
                alt={roster.teamName}
                className="w-24 h-24 object-contain mb-3"
              />
              <h2 className="text-xl font-black">{roster.teamName}</h2>
              <p className="text-xs text-text-muted mt-1">
                Name all 5 players on this roster
              </p>
            </div>

            {/* Player slots */}
            <div className="grid grid-cols-5 gap-3 mb-8">
              {roster.players.map((player, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col items-center justify-center rounded-xl border p-4 min-h-[100px] transition-all duration-300 ${
                    game.found[i]
                      ? "border-green/40 bg-green/10"
                      : "border-border bg-bg-card"
                  }`}
                >
                  {game.found[i] ? (
                    <div className="animate-scale-in text-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        className="mx-auto mb-1"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 1 0-16 0" />
                      </svg>
                      <span className="text-xs font-bold text-green">
                        {player}
                      </span>
                    </div>
                  ) : (
                    <div className="text-center opacity-30">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mx-auto mb-1"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 1 0-16 0" />
                      </svg>
                      <span className="text-[10px] text-text-muted">???</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input (playing only) */}
            {game.phase === "playing" && (
              <div className="relative max-w-md mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && input.trim()) {
                      if (suggestions.length > 0) {
                        submitGuess(suggestions[0]);
                      } else {
                        submitGuess(input.trim());
                      }
                    }
                  }}
                  placeholder="Type a player name..."
                  autoFocus
                  className={`w-full rounded-xl border bg-bg-input px-5 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted transition-all ${
                    shake
                      ? "animate-shake border-red"
                      : "border-border focus:border-blue focus:ring-1 focus:ring-blue"
                  }`}
                />

                {/* Autocomplete dropdown */}
                {suggestions.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-bg-card shadow-lg overflow-hidden">
                    {suggestions.map((name) => (
                      <button
                        key={name}
                        onClick={() => submitGuess(name)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-bg-card-hover transition-colors text-text-primary"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* End screen */}
            {game.phase === "ended" && (
              <div className="rounded-xl border border-border bg-bg-card p-8 text-center card-glow animate-scale-in max-w-md mx-auto">
                <h3 className="text-xl font-black mb-2">
                  {game.found.every(Boolean) ? "Perfect!" : "Time's Up!"}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  You found{" "}
                  <span className="text-blue-light font-bold">
                    {game.found.filter(Boolean).length}
                  </span>{" "}
                  out of 5 players
                </p>

                <div className="flex justify-center gap-6 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-black text-blue-light tabular-nums animate-score-pop">
                      {game.score}
                    </p>
                    <p className="text-[10px] font-bold uppercase text-text-muted">
                      Score
                    </p>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-black text-green tabular-nums">
                      +{xpEarned}
                    </p>
                    <p className="text-[10px] font-bold uppercase text-text-muted">
                      XP Earned
                    </p>
                  </div>
                </div>

                {/* Missed players */}
                {!game.found.every(Boolean) && (
                  <div className="mb-4">
                    <p className="text-xs text-text-muted mb-2">
                      Players you missed:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {roster.players.map(
                        (p, i) =>
                          !game.found[i] && (
                            <span
                              key={i}
                              className="rounded-lg bg-red/10 border border-red/20 px-3 py-1 text-xs font-medium text-red"
                            >
                              {p}
                            </span>
                          ),
                      )}
                    </div>
                  </div>
                )}

                {/* New achievements */}
                {newAchievements.length > 0 && (
                  <div className="mb-4 space-y-2">
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
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
