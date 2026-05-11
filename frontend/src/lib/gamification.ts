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
  40: "WikiHowl Legend",
};

export function getLevelName(level: number): string {
  const keys = Object.keys(LEVEL_NAMES).map(Number).sort((a, b) => b - a);
  for (const key of keys) {
    if (level >= key) return LEVEL_NAMES[key];
  }
  return "Silver I";
}

function getXpForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level <= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[level - 1];
  return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length) * 25000;
}

export function getXpForNextLevel(level: number): number {
  return getXpForLevel(level + 1) - getXpForLevel(level);
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-blood", name: "First Blood", description: "Win your first CS-dle game", icon: "\u{1F3AF}", xpReward: 25 },
  { id: "one-tap", name: "One Tap", description: "Guess the CS-dle player on first try", icon: "\u{1F4A5}", xpReward: 75 },
  { id: "weekly-warrior", name: "Weekly Warrior", description: "7-day CS-dle win streak", icon: "\u{1F525}", xpReward: 100 },
  { id: "hot-streak", name: "Hot Streak", description: "5 correct in Higher or Lower", icon: "♨️", xpReward: 25 },
  { id: "on-fire", name: "On Fire", description: "10 correct in Higher or Lower", icon: "\u{1F525}", xpReward: 50 },
  { id: "unstoppable", name: "Unstoppable", description: "15 correct in Higher or Lower", icon: "⚡", xpReward: 100 },
  { id: "sharpshooter", name: "Sharpshooter", description: "Hit 20+ targets in Crosshair Challenge", icon: "\u{1F3AF}", xpReward: 20 },
  { id: "aimbot", name: "Aimbot", description: "Hit 30+ targets in Crosshair Challenge", icon: "\u{1F916}", xpReward: 40 },
  { id: "precision", name: "Precision", description: "90%+ accuracy in Crosshair Challenge", icon: "\u{1F3F9}", xpReward: 30 },
  { id: "callout-master", name: "Callout Master", description: "Perfect round in Map Guesser", icon: "\u{1F5FA}️", xpReward: 50 },
  { id: "lineup-legend", name: "Lineup Legend", description: "Name all 5 players in under 20s", icon: "\u{1F465}", xpReward: 50 },
  { id: "agent", name: "Agent", description: "5 perfect answers in Transfer Trivia", icon: "\u{1F4BC}", xpReward: 75 },
  { id: "jack-of-all-trades", name: "Jack of All Trades", description: "Play every minigame at least once", icon: "\u{1F0CF}", xpReward: 100 },
  { id: "gold-nova", name: "Gold Nova", description: "Reach level 10", icon: "⭐", xpReward: 50 },
  { id: "master-guardian", name: "Master Guardian", description: "Reach level 20", icon: "\u{1F6E1}️", xpReward: 100 },
  { id: "veteran", name: "Veteran", description: "Play 100 total games", icon: "\u{1F396}️", xpReward: 150 },
];
