import type { Team } from "./types.js";

// Curated picks and runtime placeholders edited directly in code.
// (Seed arrays live in mock.ts and are copied to MongoDB at first boot.)

export const TBD_TEAM: Team = {
  name: "TBD",
  shortname: "TBD",
  color: "#666",
  logo: "",
};

// The `playerId` references a top-players row in MongoDB. Controller
// assembles the full PlayerHighlight at request time.
export const playerOfTheWeek = {
  playerId: 1,
  event: "PGL ASTANA 2026",
  maps: 12,
  kills: 312,
  deaths: 187,
  title: "Player of the Week",
};

// -- Site / UI config --

export const navigation = [
  { label: "News", href: "/news" },
  { label: "Matches", href: "/matches" },
  { label: "Results", href: "/results" },
  { label: "Events", href: "/events" },
  { label: "Stats", href: "/stats" },
  { label: "Maps", href: "/maps" },
  { label: "Galleries", href: "/galleries" },
  { label: "Rankings", href: "/rankings/teams" },
  { label: "Forums", href: "/forums" },
  { label: "Academy", href: "/academy" },
  { label: "Games", href: "/games", badge: "NEW" },
];

export const games = [
  { id: "csdle", title: "CS-dle", description: "Guess the mystery CS pro", accent: "#a855f7", accentBg: "rgba(168,85,247,0.12)", href: "/games/csdle" },
  { id: "guess-lineup", title: "Guess the Lineup", description: "Name all 5 players", accent: "#22c55e", accentBg: "rgba(34,197,94,0.12)", href: "/games/guess-lineup" },
  { id: "higher-lower", title: "Higher or Lower", description: "Compare player ratings", accent: "#f97316", accentBg: "rgba(249,115,22,0.12)", href: "/games/higher-lower" },
  { id: "map-guesser", title: "Map Guesser", description: "Identify maps by callouts", accent: "#3b82f6", accentBg: "rgba(59,130,246,0.12)", href: "/games/map-guesser" },
  { id: "crosshair-challenge", title: "Crosshair Challenge", description: "Test your aim speed", accent: "#ef4444", accentBg: "rgba(239,68,68,0.12)", href: "/games/crosshair-challenge" },
  { id: "transfer-trivia", title: "Transfer Trivia", description: "Guess player careers", accent: "#eab308", accentBg: "rgba(234,179,8,0.12)", href: "/games/transfer-trivia" },
];

export const dailyChallenges = [
  { title: "Win today's CS-dle", xp: 50, progress: 0, total: 1, icon: "target" },
  { title: "Get a 3-streak in Higher or Lower", xp: 30, progress: 0, total: 3, icon: "fire" },
  { title: "Play any 2 games", xp: 20, progress: 0, total: 2, icon: "gamepad" },
];

export const achievements = [
  { id: "first-blood", name: "First Blood", description: "Win your first CS-dle game", icon: "target", xpReward: 25 },
  { id: "one-tap", name: "One Tap", description: "Guess the CS-dle player on first try", icon: "burst", xpReward: 75 },
  { id: "weekly-warrior", name: "Weekly Warrior", description: "7-day CS-dle win streak", icon: "fire", xpReward: 100 },
  { id: "hot-streak", name: "Hot Streak", description: "5 correct in Higher or Lower", icon: "flame", xpReward: 25 },
  { id: "on-fire", name: "On Fire", description: "10 correct in Higher or Lower", icon: "fire", xpReward: 50 },
  { id: "unstoppable", name: "Unstoppable", description: "15 correct in Higher or Lower", icon: "bolt", xpReward: 100 },
  { id: "sharpshooter", name: "Sharpshooter", description: "Hit 20+ targets in Crosshair Challenge", icon: "target", xpReward: 20 },
  { id: "aimbot", name: "Aimbot", description: "Hit 30+ targets in Crosshair Challenge", icon: "bot", xpReward: 40 },
  { id: "precision", name: "Precision", description: "90%+ accuracy in Crosshair Challenge", icon: "bow", xpReward: 30 },
  { id: "callout-master", name: "Callout Master", description: "Perfect round in Map Guesser", icon: "map", xpReward: 50 },
  { id: "lineup-legend", name: "Lineup Legend", description: "Name all 5 players in under 20s", icon: "users", xpReward: 50 },
  { id: "agent", name: "Agent", description: "5 perfect answers in Transfer Trivia", icon: "briefcase", xpReward: 75 },
  { id: "jack-of-all-trades", name: "Jack of All Trades", description: "Play every minigame at least once", icon: "cards", xpReward: 100 },
  { id: "gold-nova", name: "Gold Nova", description: "Reach level 10", icon: "star", xpReward: 50 },
  { id: "master-guardian", name: "Master Guardian", description: "Reach level 20", icon: "shield", xpReward: 100 },
  { id: "veteran", name: "Veteran", description: "Play 100 total games", icon: "medal", xpReward: 150 },
];

export const fantasyLeaderboard = [
  { rank: 1, name: "FragMaster99", points: 2845, team: "Team Alpha", change: "+12" },
  { rank: 2, name: "ClutchKing", points: 2790, team: "Spirit Hunters", change: "+5" },
  { rank: 3, name: "AWPGod_BR", points: 2734, team: "FURIA Fantasy", change: "-1" },
  { rank: 4, name: "TacticianPro", points: 2698, team: "G2 Believers", change: "+8" },
  { rank: 5, name: "NadeExpert", points: 2651, team: "Smoke Squad", change: "+3" },
  { rank: 6, name: "HeadshotHero", points: 2623, team: "Click Heads FC", change: "-4" },
  { rank: 7, name: "CS_Veteran42", points: 2589, team: "Old Guard", change: "+1" },
  { rank: 8, name: "RushBNoStop", points: 2545, team: "B Site Rush", change: "-2" },
  { rank: 9, name: "SilentEntry", points: 2512, team: "Quiet Storm", change: "+6" },
  { rank: 10, name: "GlobalElite1", points: 2480, team: "Elite Squad", change: "0" },
];

export const bookmakers = ["Betway", "GG.bet", "Pinnacle"];
