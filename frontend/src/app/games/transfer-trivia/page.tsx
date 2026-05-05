"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import { playerProfiles, teams } from "@/data/mock";
import {
  loadProfile,
  saveProfile,
  addXP,
  updateDailyStreak,
  checkNewAchievements,
  ACHIEVEMENTS,
  type UserProfile,
} from "@/lib/gamification";

const TOTAL_ROUNDS = 5;
const TEAM_POOL_SIZE = 8;
const POINTS_CORRECT = 10;
const POINTS_WRONG = -5;
const POINTS_PERFECT_BONUS = 25;

/* Only players who actually have team history entries */
const eligiblePlayers = playerProfiles.filter((p) => p.teamHistory.length > 0);

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface RoundData {
  player: (typeof playerProfiles)[number];
  correctTeams: { name: string; logo: string; period: string }[];
  pool: { name: string; logo: string }[];
}

function buildRound(usedPlayerIds: Set<number>): RoundData {
  const available = eligiblePlayers.filter((p) => !usedPlayerIds.has(p.id));
  const player = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];

  const correctTeams = player.teamHistory.map((th) => ({
    name: th.team,
    logo: th.logo,
    period: th.period,
  }));

  const correctNames = new Set(correctTeams.map((t) => t.name));

  /* Build decoy pool from available teams, excluding correct ones */
  const decoys = shuffleArray(
    teams.filter((t) => !correctNames.has(t.name) && !correctNames.has(t.abbr))
  ).slice(0, TEAM_POOL_SIZE - correctTeams.length);

  const pool = shuffleArray([
    ...correctTeams.map((t) => ({ name: t.name, logo: t.logo })),
    ...decoys.map((t) => ({ name: t.name, logo: t.logo })),
  ]).slice(0, TEAM_POOL_SIZE);

  return { player, correctTeams, pool };
}

export default function TransferTriviaPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [round, setRound] = useState(0);
  const [roundData, setRoundData] = useState<RoundData | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [usedPlayerIds, setUsedPlayerIds] = useState<Set<number>>(new Set());
  const [gameFinished, setGameFinished] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  /* Load profile on mount */
  useEffect(() => {
    setMounted(true);
    setProfile(loadProfile());
  }, []);

  /* Start first round */
  useEffect(() => {
    if (mounted && !roundData && !gameFinished) {
      const rd = buildRound(usedPlayerIds);
      setRoundData(rd);
      setUsedPlayerIds((prev) => new Set(prev).add(rd.player.id));
    }
  }, [mounted, roundData, gameFinished, usedPlayerIds]);

  const correctNames = useMemo(() => {
    if (!roundData) return new Set<string>();
    return new Set(roundData.correctTeams.map((t) => t.name));
  }, [roundData]);

  const toggleTeam = useCallback(
    (teamName: string) => {
      if (submitted) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(teamName)) next.delete(teamName);
        else next.add(teamName);
        return next;
      });
    },
    [submitted]
  );

  const handleSubmit = useCallback(() => {
    if (!roundData || submitted) return;
    setSubmitted(true);

    let roundScore = 0;
    let perfectRound = true;

    /* Score correct picks */
    for (const teamName of selected) {
      if (correctNames.has(teamName)) {
        roundScore += POINTS_CORRECT;
      } else {
        roundScore += POINTS_WRONG;
        perfectRound = false;
      }
    }

    /* Check for missed teams */
    for (const name of correctNames) {
      if (!selected.has(name)) {
        perfectRound = false;
      }
    }

    if (perfectRound) roundScore += POINTS_PERFECT_BONUS;

    setScores((prev) => [...prev, roundScore]);
  }, [roundData, submitted, selected, correctNames]);

  const handleNextRound = useCallback(() => {
    const nextRound = round + 1;
    if (nextRound >= TOTAL_ROUNDS) {
      /* End game */
      const totalXP = scores.reduce((sum, s) => sum + Math.max(s, 0), 0) + 15; /* base XP for playing */
      const perfectCount = scores.filter((s, i) => {
        /* Reconstruct if perfect - a round with bonus means perfect */
        return s >= POINTS_PERFECT_BONUS;
      }).length;

      if (profile) {
        let updated = updateDailyStreak(profile);
        updated = {
          ...updated,
          gamesPlayed: updated.gamesPlayed + 1,
          gameStats: {
            ...updated.gameStats,
            transferTrivia: {
              played: updated.gameStats.transferTrivia.played + 1,
              perfectAnswers: updated.gameStats.transferTrivia.perfectAnswers + perfectCount,
              totalCorrect: updated.gameStats.transferTrivia.totalCorrect + scores.filter((s) => s > 0).length,
            },
          },
        };
        const result = addXP(updated, totalXP);
        const achievements = checkNewAchievements(result.profile);
        setNewAchievements(achievements);
        if (achievements.length > 0) {
          result.profile.achievements = [...result.profile.achievements, ...achievements];
        }
        saveProfile(result.profile);
        setProfile(result.profile);
      }

      setGameFinished(true);
    } else {
      setRound(nextRound);
      setSelected(new Set());
      setSubmitted(false);
      const rd = buildRound(usedPlayerIds);
      setRoundData(rd);
      setUsedPlayerIds((prev) => new Set(prev).add(rd.player.id));
    }
  }, [round, scores, profile, usedPlayerIds]);

  const handlePlayAgain = useCallback(() => {
    setRound(0);
    setScores([]);
    setSelected(new Set());
    setSubmitted(false);
    setGameFinished(false);
    setNewAchievements([]);
    const newUsed = new Set<number>();
    const rd = buildRound(newUsed);
    setRoundData(rd);
    setUsedPlayerIds(new Set<number>().add(rd.player.id));
  }, []);

  const totalScore = scores.reduce((s, v) => s + v, 0);

  if (!mounted || !roundData) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[900px] px-5 py-16 text-center">
          <div className="animate-pulse text-text-muted">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[900px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-secondary">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/games" className="hover:text-text-secondary">Games</Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Transfer Trivia</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Transfer Trivia</h1>
          <p className="text-sm text-text-muted">
            Test your CS2 roster knowledge! Identify which teams each player has competed for.
          </p>
        </div>

        {/* Game finished screen */}
        {gameFinished ? (
          <div className="rounded-xl border border-border bg-bg-card p-8 text-center card-glow animate-fade-in-up">
            <div className="mb-6">
              <div className="text-5xl mb-3">
                {totalScore >= TOTAL_ROUNDS * 20 ? "🏆" : totalScore >= TOTAL_ROUNDS * 10 ? "⭐" : "🎮"}
              </div>
              <h2 className="text-2xl font-bold mb-2">Game Complete!</h2>
              <p className="text-text-secondary">
                You scored <span className="text-blue-light font-bold">{totalScore}</span> points across {TOTAL_ROUNDS} rounds
              </p>
            </div>

            {/* Round breakdown */}
            <div className="grid grid-cols-5 gap-2 mb-6 max-w-md mx-auto">
              {scores.map((s, i) => (
                <div key={i} className={`rounded-lg border px-3 py-2 ${s >= POINTS_PERFECT_BONUS ? "border-green/30 bg-green/10" : s > 0 ? "border-blue/30 bg-blue/10" : "border-red/30 bg-red/10"}`}>
                  <p className="text-xs text-text-muted">R{i + 1}</p>
                  <p className={`text-sm font-bold ${s >= POINTS_PERFECT_BONUS ? "text-green" : s > 0 ? "text-blue-light" : "text-red"}`}>+{Math.max(s, 0)}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-text-muted mb-2">
              XP earned: <span className="text-green font-bold">+{scores.reduce((sum, s) => sum + Math.max(s, 0), 0) + 15}</span>
            </p>

            {/* New achievements */}
            {newAchievements.length > 0 && (
              <div className="mb-6 space-y-2">
                <p className="text-sm font-bold text-yellow">New Achievements Unlocked!</p>
                {newAchievements.map((aId) => {
                  const ach = ACHIEVEMENTS.find((a) => a.id === aId);
                  return ach ? (
                    <div key={aId} className="inline-flex items-center gap-2 rounded-lg bg-yellow/10 border border-yellow/20 px-3 py-2 mx-1">
                      <span>{ach.icon}</span>
                      <span className="text-xs font-semibold">{ach.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            <div className="flex items-center justify-center gap-3">
              <button onClick={handlePlayAgain} className="rounded-lg bg-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-light transition-colors">
                Play Again
              </button>
              <Link href="/games" className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-border-hover transition-all">
                All Games
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-light transition-all duration-300"
                  style={{ width: `${((round + 1) / TOTAL_ROUNDS) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-text-muted tabular-nums">
                {round + 1} / {TOTAL_ROUNDS}
              </span>
              <span className="text-xs font-bold text-blue-light tabular-nums">
                {totalScore} pts
              </span>
            </div>

            {/* Player card */}
            <div className="rounded-xl border border-border bg-bg-card p-6 mb-6 card-glow animate-fade-in-up">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={roundData.player.image}
                    alt={roundData.player.nickname}
                    className="w-28 h-28 rounded-xl object-cover object-top border-2 border-border"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="text-2xl">{roundData.player.countryFlag}</span>
                    <h2 className="text-2xl font-black">{roundData.player.nickname}</h2>
                  </div>
                  <p className="text-text-secondary text-sm">{roundData.player.realName}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <TeamLogo src={roundData.player.teamLogo} name={roundData.player.team} size={20} />
                    <span className="text-sm text-text-muted">Current: {roundData.player.team}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-5">
              <h3 className="text-lg font-bold">Which teams has this player played for?</h3>
              <p className="text-xs text-text-muted mt-1">Select all teams you think are part of their career history</p>
            </div>

            {/* Team grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {roundData.pool.map((team) => {
                const isSelected = selected.has(team.name);
                const isCorrect = correctNames.has(team.name);

                let borderStyle = "border-border";
                let bgStyle = "bg-bg-card hover:bg-bg-card-hover";
                let glowStyle = "";

                if (submitted) {
                  if (isSelected && isCorrect) {
                    borderStyle = "border-green/50";
                    bgStyle = "bg-green/10";
                  } else if (isSelected && !isCorrect) {
                    borderStyle = "border-red/50";
                    bgStyle = "bg-red/10";
                  } else if (!isSelected && isCorrect) {
                    borderStyle = "border-yellow/50";
                    bgStyle = "bg-yellow/10";
                  }
                } else if (isSelected) {
                  borderStyle = "border-blue/60";
                  bgStyle = "bg-blue/10";
                  glowStyle = "shadow-[0_0_12px_rgba(37,99,235,0.25)]";
                }

                return (
                  <button
                    key={team.name}
                    onClick={() => toggleTeam(team.name)}
                    disabled={submitted}
                    className={`flex flex-col items-center gap-2 rounded-xl border ${borderStyle} ${bgStyle} ${glowStyle} p-4 transition-all ${
                      submitted ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <TeamLogo src={team.logo} name={team.name} size={40} />
                    <span className="text-xs font-semibold text-text-primary">{team.name}</span>
                    {submitted && isSelected && isCorrect && (
                      <span className="text-[10px] font-bold text-green">CORRECT</span>
                    )}
                    {submitted && isSelected && !isCorrect && (
                      <span className="text-[10px] font-bold text-red">WRONG</span>
                    )}
                    {submitted && !isSelected && isCorrect && (
                      <span className="text-[10px] font-bold text-yellow">MISSED</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit / Next */}
            {!submitted ? (
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={selected.size === 0}
                  className="rounded-lg bg-blue px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in-up">
                {/* Results summary */}
                <div className="rounded-xl border border-border bg-bg-card p-5">
                  <h4 className="text-sm font-bold mb-3">Career Timeline</h4>
                  <div className="space-y-2">
                    {roundData.correctTeams.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-bg-body/50 border border-border px-3 py-2">
                        <TeamLogo src={t.logo} name={t.name} size={24} />
                        <div className="flex-1">
                          <span className="text-sm font-semibold">{t.name}</span>
                        </div>
                        <span className="text-xs text-text-muted tabular-nums">{t.period}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-text-muted">Round Score</span>
                    <span className={`text-sm font-bold ${scores[scores.length - 1] >= POINTS_PERFECT_BONUS ? "text-green" : scores[scores.length - 1] > 0 ? "text-blue-light" : "text-red"}`}>
                      {scores[scores.length - 1] >= POINTS_PERFECT_BONUS && (
                        <span className="text-yellow mr-1">PERFECT!</span>
                      )}
                      +{Math.max(scores[scores.length - 1], 0)} XP
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleNextRound}
                    className="rounded-lg bg-blue px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-light transition-colors"
                  >
                    {round + 1 >= TOTAL_ROUNDS ? "See Results" : "Next Round"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
