export interface GameStats {
  csdle: { played: number; won: number; streak: number; maxStreak: number; distribution: number[] };
  guessLineup: { played: number; perfectRounds: number };
  higherLower: { played: number; highStreak: number; totalCorrect: number };
  mapGuesser: { played: number; perfectRounds: number; totalCorrect: number };
  crosshair: { played: number; highScore: number; bestAccuracy: number };
  transferTrivia: { played: number; perfectAnswers: number; totalCorrect: number };
}

export interface UserProfile {
  username: string;
  level: number;
  xp: number;
  totalXpEarned: number;
  gamesPlayed: number;
  dailyStreak: number;
  lastPlayedDate: string;
  achievements: string[];
  gameStats: GameStats;
}

const LEVEL_THRESHOLDS = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200,
  4000, 5000, 6200, 7600, 9200, 11000, 13000, 15500, 18500, 22000,
  26000, 30500, 35500, 41000, 47000, 53500, 60500, 68000, 76000, 85000,
  95000, 106000, 118000, 131000, 145000, 160000, 176000, 193000, 211000, 230000,
];

const LEVEL_NAMES: Record<number, string> = {
  1: "Silver I",
  3: "Silver II",
  5: "Silver Elite",
  7: "Gold Nova I",
  10: "Gold Nova Master",
  13: "Master Guardian I",
  16: "Master Guardian Elite",
  19: "Distinguished Master Guardian",
  22: "Legendary Eagle",
  25: "Legendary Eagle Master",
  28: "Supreme Master First Class",
  31: "The Global Elite",
  35: "Pro Player",
  40: "HLTV Legend",
};

export function getLevelName(level: number): string {
  const keys = Object.keys(LEVEL_NAMES).map(Number).sort((a, b) => b - a);
  for (const key of keys) {
    if (level >= key) return LEVEL_NAMES[key];
  }
  return "Silver I";
}

export function getXpForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level <= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[level - 1];
  return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length) * 25000;
}

export function getXpForNextLevel(level: number): number {
  return getXpForLevel(level + 1) - getXpForLevel(level);
}

export function addXP(profile: UserProfile, amount: number): { profile: UserProfile; leveledUp: boolean } {
  let newXP = profile.xp + amount;
  let newLevel = profile.level;
  let leveledUp = false;
  let needed = getXpForNextLevel(newLevel);

  while (newXP >= needed) {
    newXP -= needed;
    newLevel++;
    leveledUp = true;
    needed = getXpForNextLevel(newLevel);
  }

  return {
    profile: { ...profile, xp: newXP, level: newLevel, totalXpEarned: profile.totalXpEarned + amount },
    leveledUp,
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-blood", name: "First Blood", description: "Win your first CS-dle game", icon: "🎯", xpReward: 25 },
  { id: "one-tap", name: "One Tap", description: "Guess the CS-dle player on first try", icon: "💥", xpReward: 75 },
  { id: "weekly-warrior", name: "Weekly Warrior", description: "7-day CS-dle win streak", icon: "🔥", xpReward: 100 },
  { id: "hot-streak", name: "Hot Streak", description: "5 correct in Higher or Lower", icon: "♨️", xpReward: 25 },
  { id: "on-fire", name: "On Fire", description: "10 correct in Higher or Lower", icon: "🔥", xpReward: 50 },
  { id: "unstoppable", name: "Unstoppable", description: "15 correct in Higher or Lower", icon: "⚡", xpReward: 100 },
  { id: "sharpshooter", name: "Sharpshooter", description: "Hit 20+ targets in Crosshair Challenge", icon: "🎯", xpReward: 20 },
  { id: "aimbot", name: "Aimbot", description: "Hit 30+ targets in Crosshair Challenge", icon: "🤖", xpReward: 40 },
  { id: "precision", name: "Precision", description: "90%+ accuracy in Crosshair Challenge", icon: "🏹", xpReward: 30 },
  { id: "callout-master", name: "Callout Master", description: "Perfect round in Map Guesser", icon: "🗺️", xpReward: 50 },
  { id: "lineup-legend", name: "Lineup Legend", description: "Name all 5 players in under 20s", icon: "👥", xpReward: 50 },
  { id: "agent", name: "Agent", description: "5 perfect answers in Transfer Trivia", icon: "💼", xpReward: 75 },
  { id: "jack-of-all-trades", name: "Jack of All Trades", description: "Play every minigame at least once", icon: "🃏", xpReward: 100 },
  { id: "gold-nova", name: "Gold Nova", description: "Reach level 10", icon: "⭐", xpReward: 50 },
  { id: "master-guardian", name: "Master Guardian", description: "Reach level 20", icon: "🛡️", xpReward: 100 },
  { id: "veteran", name: "Veteran", description: "Play 100 total games", icon: "🎖️", xpReward: 150 },
];

export function checkNewAchievements(profile: UserProfile): string[] {
  const newAchievements: string[] = [];
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
    ["jack-of-all-trades", s.csdle.played > 0 && s.guessLineup.played > 0 && s.higherLower.played > 0 && s.mapGuesser.played > 0 && s.crosshair.played > 0 && s.transferTrivia.played > 0],
    ["gold-nova", profile.level >= 10],
    ["master-guardian", profile.level >= 20],
    ["veteran", profile.gamesPlayed >= 100],
  ];

  for (const [id, condition] of checks) {
    if (condition && !profile.achievements.includes(id)) {
      newAchievements.push(id);
    }
  }

  return newAchievements;
}

const STORAGE_KEY = "hltv-games-profile";

export function getDefaultProfile(): UserProfile {
  return {
    username: "Player",
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

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return getDefaultProfile();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return getDefaultProfile();
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch { /* ignore */ }
}

export function updateDailyStreak(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split("T")[0];
  if (profile.lastPlayedDate === today) return profile;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const newStreak = profile.lastPlayedDate === yesterdayStr ? profile.dailyStreak + 1 : 1;

  return { ...profile, dailyStreak: newStreak, lastPlayedDate: today };
}
