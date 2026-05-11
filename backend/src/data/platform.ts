import { news, topPlayers, upcomingMatches } from "./mock.js";

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

export const fantasyPlayers = topPlayers.slice(0, 8).map((player, index) => ({
  ...player,
  fantasyPoints: 320 - index * 26,
  price: (5.0 - index * 0.4).toFixed(1),
  owned: `${85 - index * 7}%`,
}));

export const bookmakers = ["Betway", "GG.bet", "Pinnacle"];

export const bettingOdds = upcomingMatches.map((match, index) => ({
  match,
  odds: bookmakers.map((bookmaker, bookmakerIndex) => ({
    bookmaker,
    team1: Number((1.75 + index * 0.08 + bookmakerIndex * 0.03).toFixed(2)),
    team2: Number((2.05 - index * 0.04 + bookmakerIndex * 0.02).toFixed(2)),
  })),
}));

export const newsComments = [
  { user: "CSFanatic", rank: "Global Elite", time: "10 min ago", text: "Incredible news! This is going to change everything for the scene.", likes: 45 },
  { user: "TacticsMaster", rank: "Legendary Eagle", time: "25 min ago", text: "I saw this coming. The writing was on the wall after last month's results.", likes: 23 },
  { user: "NewPlayer2026", rank: "Gold Nova", time: "1h ago", text: "Can someone explain what this means for the upcoming Major? I'm new to following the pro scene.", likes: 8 },
];

export const galleries = [
  { id: 1, title: "IEM Katowice 2026 - Grand Final", category: "Events", images: 48, image: news[0]?.image, date: "Mar 3, 2026" },
  { id: 2, title: "BLAST Premier Spring - Opening Day", category: "Events", images: 32, image: news[4]?.image, date: "Mar 1, 2026" },
  { id: 3, title: "NAVI - Behind the Scenes at IEM", category: "Behind the Scenes", images: 24, image: news[8]?.image, date: "Feb 28, 2026" },
  { id: 4, title: "FaZe Clan - Bootcamp Photos", category: "Teams", images: 18, image: news[6]?.image, date: "Feb 25, 2026" },
  { id: 5, title: "ESL Pro League Season 21 - Venue Reveal", category: "Events", images: 36, image: news[7]?.image, date: "Feb 22, 2026" },
  { id: 6, title: "G2 Esports - New Facility Tour", category: "Teams", images: 22, image: news[6]?.image, date: "Feb 20, 2026" },
  { id: 7, title: "Vitality - Player Portraits 2026", category: "Teams", images: 15, image: news[1]?.image, date: "Feb 18, 2026" },
  { id: 8, title: "PGL Major Copenhagen - Stage Setup", category: "Behind the Scenes", images: 28, image: news[11]?.image, date: "Feb 15, 2026" },
  { id: 9, title: "Trophy Collection - Major Trophies Through the Years", category: "Behind the Scenes", images: 40, image: news[3]?.image, date: "Feb 10, 2026" },
];
