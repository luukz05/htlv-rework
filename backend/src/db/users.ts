import { ObjectId, type Collection } from "mongodb";
import { getDb } from "./client.js";

export type GameStats = {
  csdle: { played: number; won: number; streak: number; maxStreak: number; distribution: number[] };
  guessLineup: { played: number; perfectRounds: number };
  higherLower: { played: number; highStreak: number; totalCorrect: number };
  mapGuesser: { played: number; perfectRounds: number; totalCorrect: number };
  crosshair: { played: number; highScore: number; bestAccuracy: number };
  transferTrivia: { played: number; perfectAnswers: number; totalCorrect: number };
};

export type UserProfile = {
  level: number;
  xp: number;
  totalXpEarned: number;
  gamesPlayed: number;
  dailyStreak: number;
  lastPlayedDate: string;
  achievements: string[];
  gameStats: GameStats;
};

export type UserDocument = {
  _id: ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  profile: UserProfile;
};

export type PublicUser = {
  id: string;
  username: string;
  email: string;
  profile: UserProfile;
};

export async function usersCollection(): Promise<Collection<UserDocument>> {
  const db = await getDb();
  return db.collection<UserDocument>("users");
}

export function defaultProfile(): UserProfile {
  return {
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

export function toPublicUser(doc: UserDocument): PublicUser {
  return {
    id: doc._id.toString(),
    username: doc.username,
    email: doc.email,
    profile: doc.profile,
  };
}
