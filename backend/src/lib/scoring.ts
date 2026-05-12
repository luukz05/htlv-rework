import type { GameStats, UserProfile } from "../db/users.js";

const GAME_IDS_TABLE: Record<keyof GameStats, true> = Object.assign(Object.create(null), {
  csdle: true,
  guessLineup: true,
  higherLower: true,
  mapGuesser: true,
  crosshair: true,
  transferTrivia: true,
});
Object.freeze(GAME_IDS_TABLE);

export type GameId = keyof GameStats;

export function isGameId(value: unknown): value is GameId {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(GAME_IDS_TABLE, value);
}

const XP_CAP: Record<GameId, number> = {
  csdle: 100,
  higherLower: 100,
  crosshair: 220,
  mapGuesser: 200,
  guessLineup: 280,
  transferTrivia: 290,
};

export const DAILY_XP_CAP = 5000;

export type ScoredUpdate = {
  xp: number;
  inc: Record<string, number>;
  max: Record<string, number>;
  set: Record<string, unknown>;
};

function isFiniteInt(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
}

function readNumber(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

function cap(update: ScoredUpdate, game: GameId): ScoredUpdate {
  update.xp = Math.max(0, Math.min(update.xp, XP_CAP[game]));
  return update;
}

export function validateAndScore(
  gameId: GameId,
  body: unknown,
  profile: UserProfile,
): ScoredUpdate | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;

  switch (gameId) {
    case "csdle": {
      if (typeof input.solved !== "boolean") return null;
      if (!isFiniteInt(input.guesses, 1, 8)) return null;
      const solved = input.solved;
      const guesses = input.guesses;
      const xp = solved
        ? guesses === 1
          ? 100
          : guesses <= 3
            ? 60
            : guesses <= 5
              ? 40
              : 25
        : 5;
      const inc: Record<string, number> = { "profile.gameStats.csdle.played": 1 };
      const max: Record<string, number> = {};
      const set: Record<string, unknown> = {};
      const nextStreak = solved ? profile.gameStats.csdle.streak + 1 : 0;
      set["profile.gameStats.csdle.streak"] = nextStreak;
      if (solved) {
        inc["profile.gameStats.csdle.won"] = 1;
        inc[`profile.gameStats.csdle.distribution.${guesses - 1}`] = 1;
        max["profile.gameStats.csdle.maxStreak"] = nextStreak;
      }
      return cap({ xp, inc, max, set }, "csdle");
    }

    case "higherLower": {
      if (!isFiniteInt(input.streak, 0, 1000)) return null;
      const streak = input.streak;
      const xp = streak >= 15 ? 100 : streak >= 10 ? 60 : streak >= 5 ? 30 : streak >= 3 ? 15 : 5;
      return cap(
        {
          xp,
          inc: {
            "profile.gameStats.higherLower.played": 1,
            "profile.gameStats.higherLower.totalCorrect": streak,
          },
          max: { "profile.gameStats.higherLower.highStreak": streak },
          set: {},
        },
        "higherLower",
      );
    }

    case "crosshair": {
      if (!isFiniteInt(input.score, 0, 200)) return null;
      if (!isFiniteInt(input.hits, 0, 500)) return null;
      if (!isFiniteInt(input.misses, 0, 500)) return null;
      const score = input.score;
      const hits = input.hits;
      const misses = input.misses;
      if (score > hits) return null;
      const totalShots = hits + misses;
      const accuracy = totalShots > 0 ? Math.round((hits / totalShots) * 100) : 0;
      const xp = score * 3 + (accuracy >= 90 ? 40 : accuracy >= 70 ? 20 : 0);
      return cap(
        {
          xp,
          inc: { "profile.gameStats.crosshair.played": 1 },
          max: {
            "profile.gameStats.crosshair.highScore": score,
            "profile.gameStats.crosshair.bestAccuracy": accuracy,
          },
          set: {},
        },
        "crosshair",
      );
    }

    case "mapGuesser": {
      if (!isFiniteInt(input.score, 0, 10)) return null;
      const score = input.score;
      const xp = score * 12 + (score === 10 ? 80 : 0);
      const inc: Record<string, number> = {
        "profile.gameStats.mapGuesser.played": 1,
        "profile.gameStats.mapGuesser.totalCorrect": score,
      };
      if (score === 10) inc["profile.gameStats.mapGuesser.perfectRounds"] = 1;
      return cap({ xp, inc, max: {}, set: {} }, "mapGuesser");
    }

    case "guessLineup": {
      if (!isFiniteInt(input.correctCount, 0, 5)) return null;
      if (!readNumber(input.elapsedMs, 0, 600_000)) return null;
      const correctCount = input.correctCount;
      const elapsedMs = input.elapsedMs as number;
      const timeLeft = Math.max(0, Math.min(60, Math.floor((60_000 - elapsedMs) / 1000)));
      const xp = correctCount * 15 + timeLeft * 2 + (correctCount === 5 ? 50 : 0);
      const inc: Record<string, number> = { "profile.gameStats.guessLineup.played": 1 };
      if (correctCount === 5 && elapsedMs < 20_000) {
        inc["profile.gameStats.guessLineup.perfectRounds"] = 1;
      }
      return cap({ xp, inc, max: {}, set: {} }, "guessLineup");
    }

    case "transferTrivia": {
      if (!Array.isArray(input.scores) || input.scores.length !== 5) return null;
      for (const value of input.scores) {
        if (!isFiniteInt(value, -50, 100)) return null;
      }
      const scores = input.scores as number[];
      const positive = scores.filter((value) => value > 0).length;
      const perfect = scores.filter((value) => value >= 25).length;
      const xp = scores.reduce((sum, value) => sum + Math.max(value, 0), 0) + 15;
      return cap(
        {
          xp,
          inc: {
            "profile.gameStats.transferTrivia.played": 1,
            "profile.gameStats.transferTrivia.perfectAnswers": perfect,
            "profile.gameStats.transferTrivia.totalCorrect": positive,
          },
          max: {},
          set: {},
        },
        "transferTrivia",
      );
    }
  }
}

export function computeNewAchievements(profile: UserProfile): string[] {
  const owned = new Set(profile.achievements);
  const s = profile.gameStats;
  const checks: [string, boolean][] = [
    ["first-blood", s.csdle.won >= 1],
    ["one-tap", s.csdle.distribution[0] >= 1],
    ["weekly-warrior", s.csdle.streak >= 7],
    ["hot-streak", s.higherLower.highStreak >= 5],
    ["on-fire", s.higherLower.highStreak >= 10],
    ["unstoppable", s.higherLower.highStreak >= 15],
    ["sharpshooter", s.crosshair.highScore >= 20],
    ["aimbot", s.crosshair.highScore >= 30],
    ["precision", s.crosshair.bestAccuracy >= 90],
    ["callout-master", s.mapGuesser.perfectRounds >= 1],
    ["lineup-legend", s.guessLineup.perfectRounds >= 1],
    ["agent", s.transferTrivia.perfectAnswers >= 5],
    [
      "jack-of-all-trades",
      s.csdle.played > 0 &&
        s.guessLineup.played > 0 &&
        s.higherLower.played > 0 &&
        s.mapGuesser.played > 0 &&
        s.crosshair.played > 0 &&
        s.transferTrivia.played > 0,
    ],
    ["gold-nova", profile.level >= 10],
    ["master-guardian", profile.level >= 20],
    ["veteran", profile.gamesPlayed >= 100],
  ];

  const unlocked: string[] = [];
  for (const [id, ok] of checks) {
    if (ok && !owned.has(id)) unlocked.push(id);
  }
  return unlocked;
}
