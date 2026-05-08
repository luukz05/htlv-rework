import type { RouteHandler } from "../http/router.js";
import { readJsonBody } from "../http/body.js";
import { badRequest, json } from "../http/response.js";
import { achievements } from "../data/platform.js";

type GameStats = {
  csdle: { played: number; won: number; streak: number; maxStreak: number; distribution: number[] };
  guessLineup: { played: number; perfectRounds: number };
  higherLower: { played: number; highStreak: number; totalCorrect: number };
  mapGuesser: { played: number; perfectRounds: number; totalCorrect: number };
  crosshair: { played: number; highScore: number; bestAccuracy: number };
  transferTrivia: { played: number; perfectAnswers: number; totalCorrect: number };
};

type UserProfile = {
  username: string;
  level: number;
  xp: number;
  totalXpEarned: number;
  gamesPlayed: number;
  dailyStreak: number;
  lastPlayedDate: string;
  achievements: string[];
  gameStats: GameStats;
};

const levelThresholds = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200,
  4000, 5000, 6200, 7600, 9200, 11000, 13000, 15500, 18500, 22000,
  26000, 30500, 35500, 41000, 47000, 53500, 60500, 68000, 76000, 85000,
  95000, 106000, 118000, 131000, 145000, 160000, 176000, 193000, 211000, 230000,
];

const users = new Map<string, UserProfile>();

function getDefaultProfile(username = "Player"): UserProfile {
  return {
    username,
    level: 1,
    xp: 0,
    totalXpEarned: 0,
    gamesPlayed: 0,
    dailyStreak: 0,
    lastPlayedDate: "",
    achievements: [],
    gameStats: {
      csdle: { played: 0, won: 0, streak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0, 0, 0] },
      guessLineup: { played: 0, perfectRounds: 0 },
      higherLower: { played: 0, highStreak: 0, totalCorrect: 0 },
      mapGuesser: { played: 0, perfectRounds: 0, totalCorrect: 0 },
      crosshair: { played: 0, highScore: 0, bestAccuracy: 0 },
      transferTrivia: { played: 0, perfectAnswers: 0, totalCorrect: 0 },
    },
  };
}

function getSessionId(req: Parameters<RouteHandler>[0]) {
  const auth = req.headers.authorization;
  return auth?.startsWith("Bearer ") ? auth.slice(7) : "demo-user";
}

function getProfile(req: Parameters<RouteHandler>[0]) {
  const sessionId = getSessionId(req);
  if (!users.has(sessionId)) users.set(sessionId, getDefaultProfile());
  return users.get(sessionId)!;
}

function getXpForLevel(level: number) {
  if (level <= 0) return 0;
  if (level <= levelThresholds.length) return levelThresholds[level - 1];
  return levelThresholds[levelThresholds.length - 1] + (level - levelThresholds.length) * 25000;
}

function getXpForNextLevel(level: number) {
  return getXpForLevel(level + 1) - getXpForLevel(level);
}

function addXP(profile: UserProfile, amount: number) {
  let xp = profile.xp + amount;
  let level = profile.level;
  let needed = getXpForNextLevel(level);

  while (xp >= needed) {
    xp -= needed;
    level++;
    needed = getXpForNextLevel(level);
  }

  profile.xp = xp;
  profile.level = level;
  profile.totalXpEarned += amount;
}

function updateDailyStreak(profile: UserProfile) {
  const today = new Date().toISOString().split("T")[0];
  if (profile.lastPlayedDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  profile.dailyStreak = profile.lastPlayedDate === yesterdayStr ? profile.dailyStreak + 1 : 1;
  profile.lastPlayedDate = today;
}

function unlockAchievements(profile: UserProfile) {
  const before = new Set(profile.achievements);
  const stats = profile.gameStats;
  const checks: [string, boolean][] = [
    ["first-blood", stats.csdle.won >= 1],
    ["one-tap", stats.csdle.distribution[0] >= 1],
    ["weekly-warrior", stats.csdle.streak >= 7],
    ["hot-streak", stats.higherLower.highStreak >= 5],
    ["on-fire", stats.higherLower.highStreak >= 10],
    ["unstoppable", stats.higherLower.highStreak >= 15],
    ["sharpshooter", stats.crosshair.highScore >= 20],
    ["aimbot", stats.crosshair.highScore >= 30],
    ["precision", stats.crosshair.bestAccuracy >= 90],
    ["callout-master", stats.mapGuesser.perfectRounds >= 1],
    ["lineup-legend", stats.guessLineup.perfectRounds >= 1],
    ["agent", stats.transferTrivia.perfectAnswers >= 5],
    ["jack-of-all-trades", stats.csdle.played > 0 && stats.guessLineup.played > 0 && stats.higherLower.played > 0 && stats.mapGuesser.played > 0 && stats.crosshair.played > 0 && stats.transferTrivia.played > 0],
    ["gold-nova", profile.level >= 10],
    ["master-guardian", profile.level >= 20],
    ["veteran", profile.gamesPlayed >= 100],
  ];

  for (const [id, ok] of checks) {
    if (ok && !profile.achievements.includes(id)) profile.achievements.push(id);
  }

  return profile.achievements.filter((id) => !before.has(id));
}

export const register: RouteHandler = async (req, res) => {
  const body = await readJsonBody<{ username?: string }>(req);
  const sessionId = `user-${Date.now()}`;
  const profile = getDefaultProfile(body.username || "Player");
  users.set(sessionId, profile);
  json(res, { token: sessionId, profile }, 201);
};

export const login: RouteHandler = async (req, res) => {
  const body = await readJsonBody<{ username?: string }>(req);
  const sessionId = "demo-user";
  const profile = getDefaultProfile(body.username || "Player");
  users.set(sessionId, profile);
  json(res, { token: sessionId, profile });
};

export const getMe: RouteHandler = (req, res) => json(res, getProfile(req));

export const updateMe: RouteHandler = async (req, res) => {
  const body = await readJsonBody<Partial<UserProfile>>(req);
  const profile = getProfile(req);
  if (typeof body.username === "string") profile.username = body.username;
  json(res, profile);
};

export const recordGameResult: RouteHandler = async (req, res, params) => {
  const body = await readJsonBody<{ xp?: number; stats?: Partial<Record<keyof GameStats, Record<string, number>>> }>(req);
  const profile = getProfile(req);
  const gameId = params.gameId as keyof GameStats;

  if (!profile.gameStats[gameId]) {
    badRequest(res, "Invalid game id");
    return;
  }

  updateDailyStreak(profile);
  profile.gamesPlayed += 1;
  Object.assign(profile.gameStats[gameId], body.stats?.[gameId] || {});
  addXP(profile, Number(body.xp || 0));

  const newAchievements = unlockAchievements(profile);
  const reward = achievements
    .filter((achievement) => newAchievements.includes(achievement.id))
    .reduce((sum, achievement) => sum + achievement.xpReward, 0);
  if (reward > 0) addXP(profile, reward);

  json(res, { profile, newAchievements });
};
