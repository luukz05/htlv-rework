// Domain types shared between API responses, DB documents, and seed data.
// All interfaces here are pure type contracts — no runtime values.

export interface Team {
  name: string;
  color: string;
  shortname: string;
  logo: string;
}

export interface MapVeto {
  team: string;
  action: "picked" | "banned" | "decider";
  map: string;
  score1?: number;
  score2?: number;
}

export interface Match {
  id: number;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  event: string;
  format: string;
  map?: string;
  mapVeto?: MapVeto[];
  broadcastUrl?: string;
  time?: string;
  date?: string;
  status: "live" | "upcoming" | "finished";
}

export interface NewsArticle {
  id: number;
  title: string;
  description?: string;
  author: string;
  time: string;
  comments: number;
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface RankedTeam {
  id?: string;
  rank: number;
  name: string;
  color: string;
  points: number;
  vrs: number;
  change: "up" | "down" | "same";
  changeVal?: number;
  region: string;
  logo: string;
}

export interface Event {
  id: number;
  name: string;
  tier: "S" | "A" | "B";
  dates: string;
  prize: string;
  teams: number;
  progress: number;
  status: string;
  location: string;
  image: string;
}

export interface Player {
  id: number;
  rank: number;
  name: string;
  realName: string;
  team: string;
  country: string;
  countryFlag: string;
  rating: number;
  kd: string;
  adr: number;
  kast: string;
  swing: string;
  impact: number;
  dpr: number;
  hsPercent: string;
  totalKills?: number;
  totalDeaths?: number;
  assists?: number;
  openingKills?: number;
  openingDeaths?: number;
  clutchesWon?: number;
  clutchesTotal?: number;
  image: string;
  teamLogo: string;
}

export interface ForumThread {
  id: number;
  title: string;
  author: string;
  authorRank: string;
  replies: number;
  views: number;
  lastReply: string;
  category: string;
  pinned?: boolean;
}

export interface Stream {
  id: number;
  channel: string;
  title: string;
  viewers: number;
  game: string;
  language: string;
  thumbnail: string;
}

export interface PlayerHighlight {
  player: Player;
  event: string;
  maps: number;
  kills: number;
  deaths: number;
  title: string;
}

export interface RoundHighlight {
  id: number;
  title: string;
  event: string;
  team1: Team;
  team2: Team;
  round: number;
  player: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
}

export interface GameMap {
  slug: string;
  name: string;
  image: string;
  description: string;
  pool: "active" | "reserve" | "removed";
  ctWinRate: number;
  tWinRate: number;
  avgRounds: number;
  pickRate: number;
  banRate: number;
  totalProMatches: number;
  bestTeams: { name: string; logo: string; winRate: number }[];
  callouts: string[];
  utilityGuides: {
    type: "smoke" | "flash" | "molotov" | "he";
    name: string;
    from: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
  }[];
  highlights: {
    title: string;
    player: string;
    event: string;
    round: string;
    description: string;
  }[];
  recentResults?: {
    team1: string;
    team1Logo: string;
    score1: number;
    team2: string;
    team2Logo: string;
    score2: number;
    event: string;
    date: string;
  }[];
  recentMatches?: {
    team1: string;
    team1Logo: string;
    score1: number;
    team2: string;
    team2Logo: string;
    score2: number;
    event: string;
    date: string;
  }[];
}

export interface MapCalloutQuiz {
  callout: string;
  description: string;
  correctMap: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Highlight {
  id: number;
  title: string;
  player: string;
  playerImage: string;
  team: string;
  teamLogo: string;
  event: string;
  map: string;
  type: "clutch" | "ace" | "awp" | "pistol" | "wallbang" | "deagle";
  date: string;
  views: number;
  likes: number;
  thumbnail: string;
  description: string;
}

export interface Guide {
  id: number;
  title: string;
  category:
    | "economy"
    | "aim"
    | "movement"
    | "utility"
    | "communication"
    | "mindset";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  description: string;
  image: string;
  sections: { title: string; content: string }[];
}

export interface PlayerProfile {
  id: number;
  nickname: string;
  realName: string;
  age: number;
  rank: number;
  country: string;
  countryFlag: string;
  image: string;
  team: string;
  teamLogo: string;
  role: string;
  rating2: number;
  dpr: number;
  kast: string;
  swing: string;
  impact: number;
  adr: number;
  kd: string;
  hsPercent: string;
  mapsPlayed: number;
  totalKills: number;
  totalDeaths: number;
  assists: number;
  roundsPlayed: number;
  clutchesWon: number;
  clutchesTotal: number;
  openingKills: number;
  openingDeaths: number;
  awpKillsRound: number;
  bestMaps: { map: string; rating: number; winRate: number; matches: number }[];
  weaponStats: { weapon: string; kills: number; hsPercent: string }[];
  recentMatches: {
    event: string;
    opponent: string;
    opponentLogo: string;
    result: string;
    rating: number;
    kills: number;
    deaths: number;
    map: string;
  }[];
  teamHistory: { team: string; logo: string; period: string }[];
  achievements: string[];
  bio: string;
  personalBio?: {
    born?: string;
    nationality?: string;
    status?: string;
    yearsActive?: string;
    liquipediaRole?: string;
    alternateIds?: string[];
    nicknames?: string[];
    games?: string[];
    summary: string;
    sourceUrl: string;
    sourceLabel: string;
  };
  biography?: {
    intro: string;
    sections: { title: string; body: string }[];
    timeline: { period: string; title: string; description: string }[];
    highlights: string[];
    sourceUrl: string;
    sourceLabel: string;
  };
  teamSlug: string;
  region: string;
  majorWins: number;
  signatureWeapon: string;
  careerEarnings: string;
  peakRating: number;
  peakRatingDate: string;
  form: { month: string; rating: number }[];
  eventHistory: {
    event: string;
    tier: string;
    rating: number;
    maps: number;
    placement: string;
    date: string;
  }[];
}

export interface TeamRoster {
  teamName: string;
  teamLogo: string;
  teamshortname: string;
  players: string[];
}

export interface TeamProfile {
  id: string;
  name: string;
  shortname: string;
  color: string;
  logo: string;
  region: string;
  country: string;
  countryFlag: string;
  founded: string;
  coach: {
    nickname: string;
    realName: string;
    country: string;
    countryFlag: string;
  };
  worldRanking: number;
  rankingPoints: number;
  peakRanking: number;
  peakRankingDate: string;
  weeksInTop5: number;
  weeksInTop10: number;
  roster: {
    playerId: number;
    nickname: string;
    realName: string;
    country: string;
    countryFlag: string;
    image: string;
    role: string;
    joinDate: string;
    rating: number;
    isCaptain?: boolean;
  }[];
  mapStats: {
    map: string;
    played: number;
    wins: number;
    winRate: number;
    ctWinRate: number;
    tWinRate: number;
  }[];
  recentMatches: {
    opponent: string;
    opponentLogo: string;
    score: string;
    result: "W" | "L";
    event: string;
    date: string;
    format: string;
  }[];
  achievements: {
    event: string;
    placement: string;
    tier: "S" | "A" | "B";
    date: string;
    prize?: string;
  }[];
  transfers: {
    player: string;
    direction: "in" | "out";
    fromTeam?: string;
    toTeam?: string;
    date: string;
  }[];
  headToHead: {
    opponent: string;
    opponentLogo: string;
    wins: number;
    losses: number;
  }[];
  totalMapsPlayed: number;
  overallWinRate: number;
  last10Results: ("W" | "L")[];
  majorsWon: number;
  totalPrizeEarnings: string;
}
