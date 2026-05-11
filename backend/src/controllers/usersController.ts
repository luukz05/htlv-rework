import { ObjectId } from "mongodb";
import type { RouteHandler } from "../http/router.js";
import { readJsonBody } from "../http/body.js";
import { badRequest, conflict, json, unauthorized } from "../http/response.js";
import { clearSessionCookie, getSessionToken, setSessionCookie } from "../http/cookies.js";
import { hashPassword, signToken, verifyPassword, verifyToken } from "../lib/auth.js";
import {
  defaultProfile,
  toPublicUser,
  usersCollection,
  type UserDocument,
  type GameStats,
  type UserProfile,
} from "../db/users.js";
import { achievements } from "../data/platform.js";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function authedUser(req: Parameters<RouteHandler>[0]): Promise<UserDocument | null> {
  const token = getSessionToken(req);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  if (!ObjectId.isValid(payload.userId)) return null;
  const users = await usersCollection();
  return users.findOne({ _id: new ObjectId(payload.userId) });
}

function levelThresholds() {
  return [
    0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200,
    4000, 5000, 6200, 7600, 9200, 11000, 13000, 15500, 18500, 22000,
    26000, 30500, 35500, 41000, 47000, 53500, 60500, 68000, 76000, 85000,
    95000, 106000, 118000, 131000, 145000, 160000, 176000, 193000, 211000, 230000,
  ];
}

function getXpForLevel(level: number) {
  const t = levelThresholds();
  if (level <= 0) return 0;
  if (level <= t.length) return t[level - 1];
  return t[t.length - 1] + (level - t.length) * 25000;
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
  for (const [id, ok] of checks) {
    if (ok && !profile.achievements.includes(id)) profile.achievements.push(id);
  }
  return profile.achievements.filter((id) => !before.has(id));
}

function issueSession(res: Parameters<RouteHandler>[1], userId: string) {
  setSessionCookie(res, signToken({ userId }));
}

export const register: RouteHandler = async (req, res) => {
  const body = await readJsonBody<{ username?: string; email?: string; password?: string }>(req);
  const username = (body.username || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (!USERNAME_RE.test(username)) {
    return badRequest(res, "Username must be 3-20 chars (letters, numbers, underscore)");
  }
  if (!EMAIL_RE.test(email)) return badRequest(res, "Invalid email");
  if (password.length < 8) return badRequest(res, "Password must be at least 8 characters");

  const users = await usersCollection();
  const existing = await users.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return conflict(res, existing.email === email ? "Email already registered" : "Username already taken");
  }

  const now = new Date();
  const doc: UserDocument = {
    _id: new ObjectId(),
    username,
    email,
    passwordHash: await hashPassword(password),
    createdAt: now,
    updatedAt: now,
    profile: defaultProfile(),
  };
  await users.insertOne(doc);
  issueSession(res, doc._id.toString());
  json(res, { user: toPublicUser(doc) }, 201);
};

export const login: RouteHandler = async (req, res) => {
  const body = await readJsonBody<{ email?: string; password?: string }>(req);
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (!email || !password) return badRequest(res, "Email and password required");

  const users = await usersCollection();
  const user = await users.findOne({ email });
  if (!user) return unauthorized(res, "Invalid credentials");

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return unauthorized(res, "Invalid credentials");

  issueSession(res, user._id.toString());
  json(res, { user: toPublicUser(user) });
};

export const logout: RouteHandler = (_req, res) => {
  clearSessionCookie(res);
  json(res, { ok: true });
};

export const getMe: RouteHandler = async (req, res) => {
  const user = await authedUser(req);
  if (!user) return unauthorized(res);
  json(res, { user: toPublicUser(user) });
};

export const updateMe: RouteHandler = async (req, res) => {
  const user = await authedUser(req);
  if (!user) return unauthorized(res);

  const body = await readJsonBody<{ username?: string }>(req);
  const updates: Partial<UserDocument> = { updatedAt: new Date() };

  if (typeof body.username === "string") {
    const username = body.username.trim();
    if (!USERNAME_RE.test(username)) return badRequest(res, "Invalid username");
    if (username !== user.username) {
      const users = await usersCollection();
      const taken = await users.findOne({ username });
      if (taken) return conflict(res, "Username already taken");
      updates.username = username;
    }
  }

  const users = await usersCollection();
  await users.updateOne({ _id: user._id }, { $set: updates });
  const updated = await users.findOne({ _id: user._id });
  json(res, { user: toPublicUser(updated!) });
};

export const recordGameResult: RouteHandler = async (req, res, params) => {
  const user = await authedUser(req);
  if (!user) return unauthorized(res);

  const body = await readJsonBody<{
    xp?: number;
    stats?: Partial<Record<keyof GameStats, Record<string, number | number[]>>>;
  }>(req);

  const gameId = params.gameId as keyof GameStats;
  const profile = user.profile;
  if (!profile.gameStats[gameId]) return badRequest(res, "Invalid game id");

  updateDailyStreak(profile);
  profile.gamesPlayed += 1;
  Object.assign(profile.gameStats[gameId], body.stats?.[gameId] || {});
  addXP(profile, Number(body.xp || 0));

  const newAchievements = unlockAchievements(profile);
  const reward = achievements
    .filter((a) => newAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.xpReward, 0);
  if (reward > 0) addXP(profile, reward);

  const users = await usersCollection();
  await users.updateOne(
    { _id: user._id },
    { $set: { profile, updatedAt: new Date() } },
  );

  json(res, { user: toPublicUser({ ...user, profile }), newAchievements });
};
