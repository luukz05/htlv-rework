"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { playerProfiles } from "@/data/mock";
import type { PlayerProfile } from "@/data/mock";
import { getDailySeed, getTimeUntilMidnight } from "@/lib/daily-seed";
import { loadProfile, saveProfile, addXP, updateDailyStreak } from "@/lib/gamification";
import type { UserProfile } from "@/lib/gamification";

/* ---------- types ---------- */
interface ClueCell {
  label: string;
  value: string;
  status: "green" | "yellow" | "red";
  arrow?: "up" | "down";
}

interface GuessRow {
  player: PlayerProfile;
  clues: ClueCell[];
}

interface SavedState {
  date: string;
  guesses: number[]; // player ids
  solved: boolean;
  failed: boolean;
}

/* ---------- helpers ---------- */
const MAX_GUESSES = 8;
const STORAGE_KEY = "hltv-csdle-state";
const REGIONS: Record<string, string> = {
  RU: "Europe", UA: "Europe", FR: "Europe", BA: "Europe", EE: "Europe",
  LV: "Europe", IL: "Europe", SK: "Europe", NO: "Europe", BR: "Americas",
  DE: "Europe", PL: "Europe", DK: "Europe", SE: "Europe", FI: "Europe",
  US: "Americas", CA: "Americas",
};

function getRegion(p: PlayerProfile): string {
  return p.region || REGIONS[p.country] || "Europe";
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function buildClues(guess: PlayerProfile, answer: PlayerProfile): ClueCell[] {
  const nameMatch = guess.id === answer.id;
  const countryMatch = guess.country === answer.country;
  const teamMatch = guess.team === answer.team;
  const roleMatch = guess.role === answer.role;
  const regionMatch = getRegion(guess) === getRegion(answer);

  const ageDiff = guess.age - answer.age;
  let ageStatus: "green" | "yellow" | "red" = "red";
  let ageArrow: "up" | "down" | undefined;
  if (ageDiff === 0) { ageStatus = "green"; }
  else if (Math.abs(ageDiff) <= 2) { ageStatus = "yellow"; ageArrow = ageDiff > 0 ? "down" : "up"; }
  else { ageArrow = ageDiff > 0 ? "down" : "up"; }

  const ratingDiff = guess.rating2 - answer.rating2;
  let ratingStatus: "green" | "yellow" | "red" = "red";
  let ratingArrow: "up" | "down" | undefined;
  if (Math.abs(ratingDiff) < 0.005) { ratingStatus = "green"; }
  else if (Math.abs(ratingDiff) <= 0.05) { ratingStatus = "yellow"; ratingArrow = ratingDiff > 0 ? "down" : "up"; }
  else { ratingArrow = ratingDiff > 0 ? "down" : "up"; }

  return [
    { label: "Player", value: guess.nickname, status: nameMatch ? "green" : "red" },
    { label: "Country", value: guess.countryFlag + " " + guess.country, status: countryMatch ? "green" : "red" },
    { label: "Team", value: guess.team, status: teamMatch ? "green" : "red" },
    { label: "Role", value: guess.role.split(" / ")[0], status: roleMatch ? "green" : "red" },
    { label: "Age", value: String(guess.age), status: ageStatus, arrow: ageArrow },
    { label: "Rating", value: guess.rating2.toFixed(2), status: ratingStatus, arrow: ratingArrow },
    { label: "Region", value: getRegion(guess), status: regionMatch ? "green" : "red" },
  ];
}

function cellColor(s: "green" | "yellow" | "red"): string {
  if (s === "green") return "bg-green/20 border-green/40 text-green";
  if (s === "yellow") return "bg-yellow/20 border-yellow/40 text-yellow";
  return "bg-red/20 border-red/40 text-red";
}

function emojiFor(s: "green" | "yellow" | "red"): string {
  if (s === "green") return "\u{1F7E9}";
  if (s === "yellow") return "\u{1F7E8}";
  return "\u{2B1B}";
}

/* ---------- component ---------- */
export default function CsdlePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [guesses, setGuesses] = useState<GuessRow[]>([]);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timer, setTimer] = useState(getTimeUntilMidnight());
  const [showModal, setShowModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine daily answer
  const answer = useMemo(() => {
    const seed = getDailySeed();
    const idx = seed % playerProfiles.length;
    return playerProfiles[idx];
  }, []);

  // Load saved state
  useEffect(() => {
    const p = loadProfile();
    setProfile(p);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedState = JSON.parse(raw);
        if (saved.date === todayStr()) {
          const rows: GuessRow[] = saved.guesses.map((id) => {
            const player = playerProfiles.find((pp) => pp.id === id)!;
            return { player, clues: buildClues(player, answer) };
          });
          setGuesses(rows);
          setSolved(saved.solved);
          setFailed(saved.failed);
          if (saved.solved || saved.failed) {
            setTimeout(() => setShowModal(true), 400);
          }
        }
      }
    } catch { /* ignore */ }
  }, [answer]);

  // Midnight timer
  useEffect(() => {
    const id = setInterval(() => setTimer(getTimeUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  // Persist state
  const persist = useCallback((rows: GuessRow[], s: boolean, f: boolean) => {
    const state: SavedState = {
      date: todayStr(),
      guesses: rows.map((r) => r.player.id),
      solved: s,
      failed: f,
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, []);

  // Filter suggestions
  const guessedIds = useMemo(() => new Set(guesses.map((g) => g.player.id)), [guesses]);
  const suggestions = useMemo(() => {
    if (input.length < 1) return [];
    const q = input.toLowerCase();
    return playerProfiles
      .filter((p) => !guessedIds.has(p.id) && (p.nickname.toLowerCase().includes(q) || p.realName.toLowerCase().includes(q)))
      .slice(0, 6);
  }, [input, guessedIds]);

  const submitGuess = useCallback(
    (player: PlayerProfile) => {
      if (solved || failed) return;
      if (guessedIds.has(player.id)) return;

      const clues = buildClues(player, answer);
      const row: GuessRow = { player, clues };
      const newGuesses = [...guesses, row];
      const isSolved = player.id === answer.id;
      const isFailed = !isSolved && newGuesses.length >= MAX_GUESSES;

      setGuesses(newGuesses);
      setInput("");
      setShowSuggestions(false);
      setSolved(isSolved);
      setFailed(isFailed);
      persist(newGuesses, isSolved, isFailed);

      if (isSolved || isFailed) {
        let earned = 0;
        if (isSolved) {
          const guessNum = newGuesses.length;
          earned = guessNum === 1 ? 100 : guessNum <= 3 ? 60 : guessNum <= 5 ? 40 : 25;
        } else {
          earned = 5; // participation XP
        }
        setXpEarned(earned);

        if (profile) {
          let p = updateDailyStreak(profile);
          p = { ...p, gamesPlayed: p.gamesPlayed + 1 };
          const stats = { ...p.gameStats.csdle };
          stats.played++;
          if (isSolved) {
            stats.won++;
            stats.streak++;
            if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
            const distIdx = Math.min(newGuesses.length - 1, 7);
            stats.distribution = [...stats.distribution];
            stats.distribution[distIdx]++;
          } else {
            stats.streak = 0;
          }
          p = { ...p, gameStats: { ...p.gameStats, csdle: stats } };
          const { profile: updated } = addXP(p, earned);
          setProfile(updated);
          saveProfile(updated);
        }

        setTimeout(() => setShowModal(true), 1200);
      }
    },
    [guesses, solved, failed, answer, guessedIds, persist, profile],
  );

  const shareResult = useCallback(() => {
    const lines = guesses.map((row) => row.clues.map((c) => emojiFor(c.status)).join(""));
    const text = `CS-dle ${todayStr()}\n${solved ? guesses.length : "X"}/${MAX_GUESSES}\n\n${lines.join("\n")}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [guesses, solved]);

  const gameOver = solved || failed;

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
          <span className="text-text-primary">CS-dle</span>
        </div>

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </span>
              CS-dle
            </h1>
            <p className="text-sm text-text-muted mt-1">Guess the mystery CS2 pro player in {MAX_GUESSES} tries</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span className="tabular-nums">Next reset: {String(timer.hours).padStart(2, "0")}:{String(timer.minutes).padStart(2, "0")}:{String(timer.seconds).padStart(2, "0")}</span>
            <span className="tabular-nums">{guesses.length}/{MAX_GUESSES} guesses</span>
          </div>
        </div>

        {/* Input */}
        <div className="relative mb-6">
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={gameOver}
            onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={gameOver ? (solved ? "You got it!" : `It was ${answer.nickname}`) : "Type a player name..."}
            className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-sm outline-none transition-all focus:border-blue placeholder:text-text-muted disabled:opacity-50"
          />
          {showSuggestions && suggestions.length > 0 && !gameOver && (
            <div className="absolute z-20 top-full mt-1 left-0 right-0 rounded-xl border border-border bg-bg-surface shadow-lg overflow-hidden">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => submitGuess(p)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-bg-card-hover transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.nickname} className="w-8 h-8 rounded-lg object-cover object-top" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold">{p.nickname}</span>
                    <span className="text-text-muted ml-2 text-xs">{p.team}</span>
                  </div>
                  <span className="text-xs">{p.countryFlag}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column headers */}
        {guesses.length > 0 && (
          <div className="grid grid-cols-7 gap-1.5 mb-2 px-1">
            {["Player", "Country", "Team", "Role", "Age", "Rating", "Region"].map((h) => (
              <div key={h} className="text-[10px] font-bold uppercase tracking-wider text-text-muted text-center">
                {h}
              </div>
            ))}
          </div>
        )}

        {/* Guess rows */}
        <div className="space-y-2 mb-6">
          {guesses.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7 gap-1.5">
              {row.clues.map((cell, ci) => (
                <div
                  key={ci}
                  className={`rounded-lg border p-2 text-center text-xs font-semibold transition-all ${cellColor(cell.status)}`}
                  style={{
                    animationDelay: `${ci * 120}ms`,
                    animation: "fadeInUp 0.4s ease forwards",
                    opacity: 0,
                  }}
                >
                  <span>{cell.value}</span>
                  {cell.arrow && (
                    <span className="ml-0.5">
                      {cell.arrow === "up" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Empty guess slots */}
        {!gameOver && (
          <div className="space-y-2 mb-6">
            {Array.from({ length: MAX_GUESSES - guesses.length }).map((_, i) => (
              <div key={i} className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="rounded-lg border border-border/50 bg-bg-card/30 p-2 h-[38px]" />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Inline animation style */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Game Over Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
            <div
              className="w-full max-w-md rounded-2xl border border-border bg-bg-surface p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                {solved ? (
                  <>
                    <div className="text-5xl mb-3">{guesses.length === 1 ? "\u{1F4A5}" : "\u{1F389}"}</div>
                    <h2 className="text-xl font-black mb-1">
                      {guesses.length === 1 ? "One Tap!" : "Well Played!"}
                    </h2>
                    <p className="text-sm text-text-muted">
                      You guessed <span className="font-bold text-green">{answer.nickname}</span> in {guesses.length} {guesses.length === 1 ? "try" : "tries"}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-3">{"\u{1F614}"}</div>
                    <h2 className="text-xl font-black mb-1">Game Over</h2>
                    <p className="text-sm text-text-muted">
                      The answer was <span className="font-bold text-red">{answer.nickname}</span>
                    </p>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl border border-border bg-bg-card p-3 text-center">
                  <p className="text-lg font-black text-blue-light tabular-nums">{profile?.gameStats.csdle.played ?? 0}</p>
                  <p className="text-[10px] text-text-muted font-bold uppercase">Played</p>
                </div>
                <div className="rounded-xl border border-border bg-bg-card p-3 text-center">
                  <p className="text-lg font-black text-green tabular-nums">{profile?.gameStats.csdle.won ?? 0}</p>
                  <p className="text-[10px] text-text-muted font-bold uppercase">Won</p>
                </div>
                <div className="rounded-xl border border-border bg-bg-card p-3 text-center">
                  <p className="text-lg font-black text-orange-400 tabular-nums">{profile?.gameStats.csdle.streak ?? 0}</p>
                  <p className="text-[10px] text-text-muted font-bold uppercase">Streak</p>
                </div>
              </div>

              {/* Distribution */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase text-text-muted mb-2">Guess Distribution</p>
                <div className="space-y-1">
                  {(profile?.gameStats.csdle.distribution ?? [0, 0, 0, 0, 0, 0, 0, 0]).map((count, i) => {
                    const maxDist = Math.max(...(profile?.gameStats.csdle.distribution ?? [1]));
                    const width = maxDist > 0 ? Math.max((count / maxDist) * 100, 8) : 8;
                    const isActive = solved && guesses.length === i + 1;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-text-muted w-3 text-right tabular-nums">{i + 1}</span>
                        <div
                          className={`h-5 rounded px-2 flex items-center justify-end text-[10px] font-bold transition-all ${
                            isActive ? "bg-green/30 text-green" : "bg-bg-card text-text-muted"
                          }`}
                          style={{ width: `${width}%`, minWidth: "24px" }}
                        >
                          {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* XP Earned */}
              <div className="rounded-xl border border-blue/30 bg-blue/10 p-3 text-center mb-4">
                <p className="text-sm font-bold text-blue-light">+{xpEarned} XP earned</p>
              </div>

              {/* Timer */}
              <p className="text-xs text-text-muted text-center mb-4 tabular-nums">
                Next CS-dle in {String(timer.hours).padStart(2, "0")}:{String(timer.minutes).padStart(2, "0")}:{String(timer.seconds).padStart(2, "0")}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={shareResult}
                  className="flex-1 rounded-xl bg-green/15 border border-green/30 px-4 py-2.5 text-sm font-bold text-green hover:bg-green/25 transition-colors"
                >
                  {copied ? "Copied!" : "Share Result"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl bg-bg-card border border-border px-4 py-2.5 text-sm font-bold text-text-secondary hover:bg-bg-card-hover transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
