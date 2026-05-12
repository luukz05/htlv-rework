"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import { api } from "@/services/api";
import type { GameMap, MapCalloutQuiz } from "@/services/types";
import { ACHIEVEMENTS } from "@/lib/gamification";
import { useAuth } from "@/lib/auth-context";
import SignInWall from "@/components/SignInWall";
import { usePageTitle } from "@/lib/use-page-title";

/* ── helpers ───────────────────────────────────────────── */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function slugToName(slug: string, gameMaps: GameMap[]): string {
  const found = gameMaps.find((m) => m.slug === slug);
  return found ? found.name : slug;
}

/* ── types ─────────────────────────────────────────────── */

interface Question {
  callout: string;
  description: string;
  correctMap: string;
  options: string[];
}

type Phase = "idle" | "playing" | "feedback" | "results";

interface GameState {
  questions: Question[];
  current: number;
  answers: (string | null)[];
  score: number;
}

const TOTAL_QUESTIONS = 10;

/* ── build questions ───────────────────────────────────── */

function buildQuestions(mapCalloutQuizzes: MapCalloutQuiz[], gameMaps: GameMap[]): Question[] {
  const mapNames = gameMaps.map((m) => m.name);
  const pool = shuffle(mapCalloutQuizzes).slice(0, TOTAL_QUESTIONS);

  return pool.map((q) => {
    const correctName = slugToName(q.correctMap, gameMaps);
    const wrongOptions = shuffle(
      mapNames.filter((n) => n !== correctName),
    ).slice(0, 3);
    const options = shuffle([correctName, ...wrongOptions]);

    return {
      callout: q.callout,
      description: q.description,
      correctMap: correctName,
      options,
    };
  });
}

/* ── component ─────────────────────────────────────────── */

export default function MapGuesserPage() {
  usePageTitle("Map Guesser - Daily Callouts");
  const { user, loading: authLoading, recordGameResult } = useAuth();

  const [mapCalloutQuizzes, setMapCalloutQuizzes] = useState<MapCalloutQuiz[]>([]);
  const [gameMaps, setGameMaps] = useState<GameMap[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [game, setGame] = useState<GameState | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [xpCapped, setXpCapped] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;
    Promise.all([api.mapCalloutQuizzes(), api.maps()])
      .then(([quizData, mapData]) => {
        if (ignore) return;
        setMapCalloutQuizzes(quizData);
        setGameMaps(mapData);
      })
      .catch(() => {
        if (ignore) return;
        setMapCalloutQuizzes([]);
        setGameMaps([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  /* ── start ───────────────────────────────────────────── */

  const startGame = useCallback(() => {
    if (mapCalloutQuizzes.length === 0 || gameMaps.length === 0) return;
    setGame({
      questions: buildQuestions(mapCalloutQuizzes, gameMaps),
      current: 0,
      answers: [],
      score: 0,
    });
    setPhase("playing");
    setSelected(null);
    setXpEarned(0);
    setXpCapped(false);
    setNewAchievements([]);
  }, [mapCalloutQuizzes, gameMaps]);

  /* ── answer ──────────────────────────────────────────── */

  const handleAnswer = (mapName: string) => {
    if (!game || phase !== "playing") return;

    const q = game.questions[game.current];
    const isCorrect = mapName === q.correctMap;
    const newScore = isCorrect ? game.score + 1 : game.score;

    setSelected(mapName);
    setGame({
      ...game,
      answers: [...game.answers, mapName],
      score: newScore,
    });
    setPhase("feedback");

    /* auto-advance after delay */
    setTimeout(() => {
      const nextIdx = game.current + 1;
      if (nextIdx >= TOTAL_QUESTIONS) {
        finishGame(newScore, [...game.answers, mapName]);
      } else {
        setGame((prev) =>
          prev ? { ...prev, current: nextIdx, score: newScore } : prev,
        );
        setSelected(null);
        setPhase("playing");
      }
    }, 1200);
  };

  /* ── finish & XP ─────────────────────────────────────── */

  const finishGame = (finalScore: number, _allAnswers: (string | null)[]) => {
    const xp = finalScore * 12 + (finalScore === TOTAL_QUESTIONS ? 80 : 0);
    setXpEarned(xp);

    if (user) {
      recordGameResult("mapGuesser", { score: finalScore })
        .then(({ newAchievements: achs, xpGained, xpCapped: capped }) => {
          setXpEarned(xpGained);
          setXpCapped(capped);
          if (achs.length) setNewAchievements(achs);
        })
        .catch((err) => console.error("Failed to record Map Guesser result", err));
    }

    setPhase("results");
  };

  /* ── derived ─────────────────────────────────────────── */

  const currentQ = game ? game.questions[game.current] : null;

  /* ── render ──────────────────────────────────────────── */

  if (authLoading) {
    return (
      <main className="mx-auto max-w-[800px] px-5 py-16 text-center">
        <div className="animate-pulse text-text-muted">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return <SignInWall gameName="Map Guesser" />;
  }

  return (
    <main className="mx-auto max-w-[800px] px-3 py-5 sm:px-5 sm:py-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-text-muted sm:mb-6">
        <Link href="/" className="hover:text-text-secondary">Home</Link>
        <span className="mx-2">&rsaquo;</span>
        <Link href="/games" className="hover:text-text-secondary">Games</Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-text-primary">Map Guesser</span>
      </div>

      <h1 className="text-xl font-black mb-4 text-center animate-fade-in-up sm:text-2xl sm:mb-6 md:text-3xl">
        Map Guesser
      </h1>

      {/* ── IDLE SCREEN ──────────────────────────────── */}
      {phase === "idle" && (
        <div className="flex flex-col items-center gap-6 py-8 animate-fade-in-up sm:py-16">
          <div className="rounded-xl border border-border bg-bg-card p-5 text-center card-glow max-w-md w-full sm:p-10">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
              className="mx-auto mb-4"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h2 className="text-lg font-bold mb-2">How to Play</h2>
            <p className="text-sm text-text-secondary mb-6">
              You will see a callout name and description. Guess which CS2 map
              it belongs to! Answer{" "}
              <span className="text-blue-light font-bold">10 questions</span>{" "}
              and earn XP for each correct answer.
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

      {/* ── PLAYING / FEEDBACK ───────────────────────── */}
      {(phase === "playing" || phase === "feedback") && game && currentQ && (
        <div className="animate-fade-in-up">
          {/* Progress bar */}
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-text-muted">
                Question {game.current + 1} / {TOTAL_QUESTIONS}
              </span>
              <span className="text-xs font-bold text-blue-light tabular-nums">
                Score: {game.score} / {TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="h-2 rounded-full bg-bg-surface overflow-hidden">
              <div
                className="h-full rounded-full bg-blue transition-all duration-300"
                style={{
                  width: `${((game.current + (phase === "feedback" ? 1 : 0)) / TOTAL_QUESTIONS) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Callout card */}
          <div className="rounded-xl border border-border bg-bg-card p-5 text-center mb-5 card-glow sm:p-8 sm:mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2 sm:text-xs">
              Which map has this callout?
            </p>
            <h2 className="text-2xl font-black text-blue-light mb-2 sm:text-3xl sm:mb-3 md:text-4xl">
              {currentQ.callout}
            </h2>
            <p className="text-[13px] text-text-secondary max-w-lg mx-auto sm:text-sm">
              {currentQ.description}
            </p>
          </div>

          {/* Options grid 2x2 */}
          <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto sm:gap-4">
            {currentQ.options.map((opt) => {
              let borderClass = "border-border hover:border-blue/50";
              let bgClass =
                "bg-bg-card hover:bg-bg-card-hover cursor-pointer";

              if (phase === "feedback") {
                if (opt === currentQ.correctMap) {
                  borderClass = "border-green/60";
                  bgClass = "bg-green/10";
                } else if (opt === selected && opt !== currentQ.correctMap) {
                  borderClass = "border-red/60";
                  bgClass = "bg-red/10";
                } else {
                  bgClass = "bg-bg-card opacity-50";
                }
              }

              return (
                <button
                  key={opt}
                  disabled={phase === "feedback"}
                  onClick={() => handleAnswer(opt)}
                  className={`rounded-xl border p-3 text-center transition-all sm:p-5 ${borderClass} ${bgClass}`}
                >
                  <span className="text-sm font-bold">{opt}</span>

                  {/* Feedback icons */}
                  {phase === "feedback" && opt === currentQ.correctMap && (
                    <div className="mt-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2.5"
                        className="mx-auto"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  {phase === "feedback" &&
                    opt === selected &&
                    opt !== currentQ.correctMap && (
                      <div className="mt-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2.5"
                          className="mx-auto"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                    )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── RESULTS SCREEN ───────────────────────────── */}
      {phase === "results" && game && (
        <div className="animate-scale-in max-w-lg mx-auto">
          <div className="rounded-xl border border-border bg-bg-card p-8 text-center card-glow">
            <h2 className="text-2xl font-black mb-2">
              {game.score === TOTAL_QUESTIONS
                ? "Perfect Score!"
                : game.score >= 7
                  ? "Great Job!"
                  : game.score >= 4
                    ? "Not Bad!"
                    : "Keep Practicing!"}
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              You answered{" "}
              <span className="text-blue-light font-bold">{game.score}</span>{" "}
              out of {TOTAL_QUESTIONS} correctly
            </p>

            {/* Score & XP */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-3xl font-black text-blue-light tabular-nums animate-score-pop">
                  {game.score}/{TOTAL_QUESTIONS}
                </p>
                <p className="text-[10px] font-bold uppercase text-text-muted mt-1">
                  Correct
                </p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-black text-green tabular-nums">
                  +{xpEarned}
                </p>
                <p className="text-[10px] font-bold uppercase text-text-muted mt-1">
                  XP Earned
                </p>
                {xpCapped && (
                  <p className="text-[10px] text-yellow mt-1">Daily cap reached</p>
                )}
              </div>
            </div>

            {/* Answer breakdown */}
            <div className="rounded-xl border border-border bg-bg-surface p-4 mb-6 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                Answer Breakdown
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {game.questions.map((q, i) => {
                  const userAnswer = game.answers[i];
                  const isCorrect = userAnswer === q.correctMap;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                        isCorrect ? "bg-green/5" : "bg-red/5"
                      }`}
                    >
                      <span
                        className={`shrink-0 text-xs font-bold ${isCorrect ? "text-green" : "text-red"}`}
                      >
                        {isCorrect ? "+" : "-"}
                      </span>
                      <span className="font-bold text-blue-light min-w-[80px]">
                        {q.callout}
                      </span>
                      <span className="text-text-secondary text-xs">
                        {isCorrect ? (
                          q.correctMap
                        ) : (
                          <>
                            <span className="line-through text-red/60">
                              {userAnswer}
                            </span>{" "}
                            <span className="text-green">{q.correctMap}</span>
                          </>
                        )}
                      </span>
                    </div>
                  );
                })}
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
