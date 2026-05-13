import { ObjectId } from "mongodb";
import type { Request, RequestHandler, Response } from "express";
import { badRequest, conflict, json, unauthorized } from "../http/response.js";
import { clearSessionCookie, describeCookieMode, getSessionToken, setSessionCookie } from "../http/cookies.js";
import { hashPassword, signToken, verifyPassword, verifyToken } from "../lib/auth.js";
import {
  defaultProfile,
  toPublicUser,
  usersCollection,
  type UserDocument,
  type UserProfile,
} from "../db/users.js";
import { achievements } from "../data/config.js";
import { computeNewAchievements, DAILY_XP_CAP, isGameId, validateAndScore } from "../lib/scoring.js";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function authedUser(req: Request): Promise<UserDocument | null> {
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

const SUBMIT_DEBOUNCE_MS = 2000;
const lastSubmitAt = new Map<string, number>();

function todayISODate() {
  return new Date().toISOString().split("T")[0];
}

function yesterdayISODate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
}

function nextDailyStreak(profile: UserProfile, today: string): number {
  if (profile.lastPlayedDate === today) return profile.dailyStreak;
  return profile.lastPlayedDate === yesterdayISODate() ? profile.dailyStreak + 1 : 1;
}

function issueSession(req: Request, res: Response, userId: string) {
  setSessionCookie(res, signToken({ userId }), req);
}

export const register: RequestHandler = async (req, res) => {
  const body = (req.body ?? {}) as { username?: string; email?: string; password?: string };
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
  issueSession(req, res, doc._id.toString());
  json(res, { user: toPublicUser(doc) }, 201);
};

export const login: RequestHandler = async (req, res) => {
  const body = (req.body ?? {}) as { email?: string; password?: string };
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (!email || !password) return badRequest(res, "Email and password required");

  const users = await usersCollection();
  const user = await users.findOne({ email });
  if (!user) return unauthorized(res, "Invalid credentials");

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return unauthorized(res, "Invalid credentials");

  issueSession(req, res, user._id.toString());
  json(res, { user: toPublicUser(user) });
};

export const logout: RequestHandler = (req, res) => {
  clearSessionCookie(res, req);
  json(res, { ok: true });
};

export const authDiag: RequestHandler = async (req, res) => {
  const token = getSessionToken(req);
  let tokenStatus: "missing" | "invalid" | "valid" = "missing";
  let userId: string | null = null;
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      tokenStatus = "valid";
      userId = payload.userId;
    } else {
      tokenStatus = "invalid";
    }
  }
  json(res, {
    cookieMode: describeCookieMode(req),
    tokenStatus,
    userId,
    cookieHeaderPresent: Boolean(req.headers.cookie),
    sessionCookieName: "hltv_session",
  });
};

export const getMe: RequestHandler = async (req, res) => {
  const user = await authedUser(req);
  if (!user) return unauthorized(res);
  json(res, { user: toPublicUser(user) });
};

export const updateMe: RequestHandler = async (req, res) => {
  const user = await authedUser(req);
  if (!user) return unauthorized(res);

  const body = (req.body ?? {}) as { username?: string };
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

export const recordGameResult: RequestHandler<{ gameId: string }> = async (req, res) => {
  const user = await authedUser(req);
  if (!user) {
    console.warn(
      `[recordGameResult] unauthorized — origin=${req.headers.origin || "-"} hasCookie=${Boolean(req.headers.cookie)}`,
    );
    return unauthorized(res);
  }

  const gameId = req.params.gameId;
  if (!isGameId(gameId)) {
    console.warn(`[recordGameResult] invalid gameId=${gameId} user=${user._id.toString()}`);
    return badRequest(res, "Invalid game id");
  }

  const debounceKey = `${user._id.toString()}:${gameId}`;
  const now = Date.now();
  const last = lastSubmitAt.get(debounceKey) ?? 0;
  if (now - last < SUBMIT_DEBOUNCE_MS) {
    res.status(429).json({ error: "Slow down" });
    return;
  }
  lastSubmitAt.set(debounceKey, now);

  const body = req.body as unknown;
  const scored = validateAndScore(gameId, body, user.profile);
  if (!scored) {
    console.warn(
      `[recordGameResult] validation failed gameId=${gameId} user=${user._id.toString()} body=${JSON.stringify(body)}`,
    );
    return badRequest(res, "Invalid game result");
  }

  const today = todayISODate();
  const dailyStreak = nextDailyStreak(user.profile, today);

  const sameDay = user.profile.dailyXpDate === today;
  const dailySoFar = sameDay ? user.profile.dailyXp : 0;
  const remainingDaily = Math.max(0, DAILY_XP_CAP - dailySoFar);
  const grantedXp = Math.min(scored.xp, remainingDaily);
  const xpCapped = grantedXp < scored.xp;

  const setFields: Record<string, unknown> = {
    ...scored.set,
    "profile.lastPlayedDate": today,
    "profile.dailyStreak": dailyStreak,
    "profile.dailyXpDate": today,
    "profile.dailyXp": dailySoFar + grantedXp,
    updatedAt: new Date(),
  };

  const incFields: Record<string, number> = {
    "profile.gamesPlayed": 1,
    ...scored.inc,
  };

  const users = await usersCollection();
  const updated = await users.findOneAndUpdate(
    { _id: user._id },
    {
      $inc: incFields,
      ...(Object.keys(scored.max).length > 0 ? { $max: scored.max } : {}),
      $set: setFields,
    },
    { returnDocument: "after" },
  );
  if (!updated) return unauthorized(res);

  if (grantedXp > 0) addXP(updated.profile, grantedXp);

  const newAchievements = computeNewAchievements(updated.profile);
  const achievementXp = achievements
    .filter((entry) => newAchievements.includes(entry.id))
    .reduce((sum, entry) => sum + entry.xpReward, 0);

  const cappedAchievementXp = Math.min(
    achievementXp,
    Math.max(0, DAILY_XP_CAP - (updated.profile.dailyXp ?? 0)),
  );
  if (cappedAchievementXp > 0) addXP(updated.profile, cappedAchievementXp);

  if (grantedXp > 0 || newAchievements.length > 0 || cappedAchievementXp > 0) {
    const persist: Record<string, unknown> = {
      "profile.xp": updated.profile.xp,
      "profile.level": updated.profile.level,
      "profile.totalXpEarned": updated.profile.totalXpEarned,
      updatedAt: new Date(),
    };
    if (cappedAchievementXp > 0) {
      persist["profile.dailyXp"] = updated.profile.dailyXp + cappedAchievementXp;
      updated.profile.dailyXp += cappedAchievementXp;
    }
    await users.updateOne(
      { _id: user._id },
      {
        $set: persist,
        ...(newAchievements.length > 0
          ? { $addToSet: { "profile.achievements": { $each: newAchievements } } }
          : {}),
      },
    );
    if (newAchievements.length > 0) {
      for (const id of newAchievements) {
        if (!updated.profile.achievements.includes(id)) updated.profile.achievements.push(id);
      }
    }
  }

  const xpGained = grantedXp + cappedAchievementXp;
  json(res, {
    user: toPublicUser(updated),
    newAchievements,
    xpGained,
    xpGameGranted: grantedXp,
    xpAchievementGranted: cappedAchievementXp,
    xpCapped,
  });
};
