import type { Request } from "express";
import { ObjectId } from "mongodb";
import { getSessionToken } from "../http/cookies.js";
import { usersCollection, type UserDocument } from "../db/users.js";
import { verifyToken } from "./auth.js";

export async function getAuthedUser(req: Request): Promise<UserDocument | null> {
  const token = getSessionToken(req);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  if (!ObjectId.isValid(payload.userId)) return null;
  const users = await usersCollection();
  return users.findOne({ _id: new ObjectId(payload.userId) });
}

export function rankForLevel(level: number): string {
  if (level >= 31) return "Global Elite";
  if (level >= 26) return "Supreme";
  if (level >= 21) return "Legendary Eagle Master";
  if (level >= 16) return "Legendary Eagle";
  if (level >= 11) return "Distinguished Master Guardian";
  if (level >= 6) return "Master Guardian";
  if (level >= 3) return "Gold Nova";
  return "Silver";
}

export function relativeTime(date: Date): string {
  const diff = Math.max(0, Date.now() - date.getTime()) / 1000;
  if (diff < 45) return "just now";
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}d ago`;
  return date.toISOString().slice(0, 10);
}
