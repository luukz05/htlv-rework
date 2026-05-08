export interface Team {
  name: string;
  color: string;
  abbr: string;
  logo: string;
}

export interface MapVeto {
  team: string;
  action: "picked" | "banned" | "decider";
  map: string;
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
  rank: number;
  name: string;
  color: string;
  points: number;
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

// -- Base path for static assets (must match next.config.ts basePath) --
const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

// -- Team Logos (local, downloaded from Liquipedia) --
const logo = {
  navi: `${B}/teams/navi.png`,
  vitality: `${B}/teams/vitality.png`,
  faze: `${B}/teams/faze.png`,
  g2: `${B}/teams/g2.png`,
  spirit: `${B}/teams/spirit.png`,
  liquid: `${B}/teams/liquid.png`,
  mouz: `${B}/teams/mouz.png`,
  heroic: `${B}/teams/heroic.png`,
  furia: `${B}/teams/furia.png`,
  astralis: `${B}/teams/astralis.png`,
  cloud9: `${B}/teams/cloud9.png`,
  complexity: `${B}/teams/complexity.png`,
  pain: `${B}/teams/pain.png`,
  falcons: `${B}/teams/falcons.png`,
  imperial: `${B}/teams/imperial.png`,
  nine_z: `${B}/teams/9z.png`,
  mongolz: `${B}/teams/mongolz.png`,
  virtuspro: `${B}/teams/virtuspro.png`,
  gamerlegion: `${B}/teams/gamerlegion.png`,
  saw: `${B}/teams/saw.png`,
};

// -- Player Photos (local, downloaded from HLTV) --
const playerPhoto = {
  donk: `${B}/players/donk.png`,
  zywoo: `${B}/players/zywoo.png`,
  niko: `${B}/players/niko.png`,
  m0nesy: `${B}/players/m0nesy.png`,
  ropz: `${B}/players/ropz.png`,
  b1t: `${B}/players/b1t.png`,
  jl: `${B}/players/jl.png`,
  spinx: `${B}/players/spinx.png`,
  frozen: `${B}/players/frozen.png`,
  hunter: `${B}/players/hunter.png`,
  broky: `${B}/players/broky.png`,
  rain: `${B}/players/rain.png`,
  sh1ro: `${B}/players/sh1ro.png`,
  yuurih: `${B}/players/yuurih.png`,
  kscerato: `${B}/players/kscerato.png`,
  aleksib: `${B}/players/aleksib.png`,
  im: `${B}/players/im.png`,
  w0nderful: `${B}/players/w0nderful.png`,
  nexa: `${B}/players/nexa.png`,
  hooxi: `${B}/players/hooxi.png`,
  flamez: `${B}/players/flamez.png`,
  apex: `${B}/players/apex.png`,
  mezii: `${B}/players/mezii.png`,
  karrigan: `${B}/players/karrigan.png`,
  chopper: `${B}/players/chopper.png`,
  magixx: `${B}/players/magixx.png`,
  zont1x: `${B}/players/zont1x.png`,
  torzsi: `${B}/players/torzsi.png`,
  brollan: `${B}/players/brollan.png`,
  xertion: `${B}/players/xertion.png`,
  siuhy: `${B}/players/siuhy.png`,
  jimpphat: `${B}/players/jimpphat.png`,
  naf: `${B}/players/naf.png`,
  elige: `${B}/players/elige.png`,
  twistzz: `${B}/players/twistzz.png`,
  osee: `${B}/players/osee.png`,
  cadian: `${B}/players/cadian.png`,
  fallen: `${B}/players/fallen.png`,
  chelo: `${B}/players/chelo.png`,
  skullz: `${B}/players/skullz.png`,
  makazze: `${B}/players/makazze.png`,
  nertz: `${B}/players/nertz.png`,
  sunpayus: `${B}/players/sunpayus.png`,
  heavygod: `${B}/players/heavygod.png`,
  matys: `${B}/players/matys.png`,
  tn1r: `${B}/players/tn1r.png`,
  xelex: `${B}/players/xelex.png`,
  ultimate: `${B}/players/ultimate.png`,
  malbsmd: `${B}/players/malbsmd.png`,
  yekindar: `${B}/players/yekindar.png`,
  molodoy: `${B}/players/molodoy.png`,
  jcobbb: `${B}/players/jcobbb.png`,
};

// -- News/Event Images (local, downloaded from Unsplash) --
const esportsArena = `${B}/news/arena.jpg`;
const gamingSetup = `${B}/news/setup.jpg`;
const crowdArena = `${B}/news/crowd.jpg`;
const gamingKeyboard = `${B}/news/keyboard.jpg`;
const esportStage = `${B}/news/stage.jpg`;
const trophyCup = `${B}/news/trophy.jpg`;
const gamingMonitor = `${B}/news/monitor.jpg`;
const teamPhoto = `${B}/news/team.jpg`;
const conferenceHall = `${B}/news/conference.jpg`;
const gamingChair = `${B}/news/chair.jpg`;
const neonLights = `${B}/news/neon.jpg`;
const pcBuild = `${B}/news/pc.jpg`;
const headphones = `${B}/news/headphones.jpg`;
const stadium = `${B}/news/stadium.jpg`;
const fireworks = `${B}/news/fireworks.jpg`;

// -- Country Flags (emoji) --
const flag = {
  RU: "🇷🇺", FR: "🇫🇷", BA: "🇧🇦", EE: "🇪🇪", UA: "🇺🇦",
  LV: "🇱🇻", IL: "🇮🇱", SK: "🇸🇰", BR: "🇧🇷", NO: "🇳🇴", LT: "🇱🇹",
};

// -- Teams --
export const teams: Team[] = [
  { name: "Natus Vincere", color: "#fbbf24", abbr: "NAVI", logo: logo.navi },
  { name: "Vitality", color: "#fcd34d", abbr: "VIT", logo: logo.vitality },
  { name: "FaZe Clan", color: "#ef4444", abbr: "FaZe", logo: logo.faze },
  { name: "G2 Esports", color: "#c084fc", abbr: "G2", logo: logo.g2 },
  { name: "Team Spirit", color: "#34d399", abbr: "Spirit", logo: logo.spirit },
  { name: "Team Liquid", color: "#38bdf8", abbr: "TL", logo: logo.liquid },
  { name: "MOUZ", color: "#2dd4bf", abbr: "MOUZ", logo: logo.mouz },
  { name: "Heroic", color: "#f472b6", abbr: "Heroic", logo: logo.heroic },
  { name: "FURIA", color: "#fbbf24", abbr: "FURIA", logo: logo.furia },
  { name: "Astralis", color: "#fb923c", abbr: "Astralis", logo: logo.astralis },
  { name: "Cloud9", color: "#94a3b8", abbr: "C9", logo: logo.cloud9 },
  { name: "Complexity", color: "#60a5fa", abbr: "COL", logo: logo.complexity },
  { name: "paiN Gaming", color: "#4ade80", abbr: "paiN", logo: logo.pain },
  { name: "Falcons", color: "#a78bfa", abbr: "Falcons", logo: logo.falcons },
  { name: "Imperial", color: "#f59e0b", abbr: "IMP", logo: logo.imperial },
  { name: "9z Team", color: "#e879f9", abbr: "9z", logo: logo.nine_z },
];

const t = (i: number) => teams[i];

// -- Live Matches --
export const liveMatches: Match[] = [
  {
    id: 1,
    team1: t(0),
    team2: t(2),
    score1: 13,
    score2: 11,
    event: "IEM Katowice 2026",
    format: "BO3",
    map: "Mirage",
    mapVeto: [
      { team: "NAVI", action: "banned", map: "Nuke" },
      { team: "FaZe", action: "banned", map: "Ancient" },
      { team: "NAVI", action: "picked", map: "Mirage" },
      { team: "FaZe", action: "picked", map: "Inferno" },
      { team: "NAVI", action: "banned", map: "Anubis" },
      { team: "FaZe", action: "banned", map: "Dust II" },
      { team: "Decider", action: "decider", map: "Overpass" },
    ],
    broadcastUrl: "https://www.twitch.tv/eslcs",
    status: "live",
  },
  { id: 2, team1: t(1), team2: t(4), score1: 16, score2: 9, event: "IEM Katowice 2026", format: "BO3", map: "Inferno", status: "live" },
  { id: 3, team1: t(3), team2: t(5), score1: 7, score2: 10, event: "BLAST Premier", format: "BO1", map: "Anubis", status: "live" },
];

export const upcomingMatches: Match[] = [
  { id: 4, team1: t(7), team2: t(9), event: "IEM Katowice 2026", format: "BO3", time: "18:00", date: "Today", status: "upcoming" },
  { id: 5, team1: t(6), team2: t(13), event: "BLAST Premier", format: "BO3", time: "20:30", date: "Today", status: "upcoming" },
  { id: 6, team1: t(8), team2: t(10), event: "ESL Pro League", format: "BO1", time: "22:00", date: "Today", status: "upcoming" },
  { id: 7, team1: t(0), team2: t(1), event: "IEM Katowice 2026", format: "BO5", time: "14:00", date: "Tomorrow", status: "upcoming" },
  { id: 8, team1: t(11), team2: t(12), event: "ESL Pro League", format: "BO3", time: "16:00", date: "Tomorrow", status: "upcoming" },
  { id: 9, team1: t(3), team2: t(6), event: "BLAST Premier", format: "BO3", time: "19:00", date: "Tomorrow", status: "upcoming" },
  { id: 20, team1: t(14), team2: t(15), event: "ESL Challenger", format: "BO3", time: "15:00", date: "Mar 7", status: "upcoming" },
  { id: 21, team1: t(5), team2: t(9), event: "BLAST Premier", format: "BO3", time: "18:00", date: "Mar 7", status: "upcoming" },
];

export const recentResults: Match[] = [
  { id: 10, team1: t(1), team2: t(4), score1: 2, score2: 0, event: "IEM Katowice", format: "BO3", date: "Today", status: "finished" },
  { id: 11, team1: t(6), team2: t(7), score1: 1, score2: 2, event: "BLAST Premier", format: "BO3", date: "Today", status: "finished" },
  { id: 12, team1: t(8), team2: t(10), score1: 16, score2: 12, event: "ESL Pro League", format: "BO1", date: "Today", status: "finished" },
  { id: 13, team1: t(11), team2: t(12), score1: 2, score2: 1, event: "ESL Pro League", format: "BO3", date: "Yesterday", status: "finished" },
  { id: 14, team1: t(9), team2: t(3), score1: 0, score2: 2, event: "IEM Katowice", format: "BO3", date: "Yesterday", status: "finished" },
  { id: 15, team1: t(5), team2: t(0), score1: 1, score2: 2, event: "IEM Katowice", format: "BO3", date: "Yesterday", status: "finished" },
  { id: 16, team1: t(2), team2: t(7), score1: 2, score2: 0, event: "IEM Katowice", format: "BO3", date: "Mar 2", status: "finished" },
  { id: 17, team1: t(4), team2: t(6), score1: 2, score2: 1, event: "BLAST Premier", format: "BO3", date: "Mar 2", status: "finished" },
  { id: 18, team1: t(13), team2: t(14), score1: 2, score2: 0, event: "ESL Challenger", format: "BO3", date: "Mar 1", status: "finished" },
  { id: 19, team1: t(8), team2: t(15), score1: 16, score2: 8, event: "ESL Challenger", format: "BO1", date: "Mar 1", status: "finished" },
];

// -- News --
export const news: NewsArticle[] = [
  { id: 1, title: "IEM Katowice 2026 Grand Finals: NAVI vs FaZe in an epic rematch for the title", description: "After an incredible run through the lower bracket, FaZe Clan faces NAVI in a best-of-five grand final that promises to be one of the most exciting matches of the year.", author: "HLTV Staff", time: "15 min ago", comments: 234, tags: ["Major", "Hot"], image: esportsArena, featured: true },
  { id: 2, title: "s1mple officially returns to competitive CS2 for upcoming Major cycle", description: "After a brief hiatus, the GOAT returns to the active roster of NAVI.", author: "Striker", time: "1h ago", comments: 891, tags: ["Roster Move"], image: gamingSetup },
  { id: 3, title: "Valve announces new map pool changes for CS2 competitive season", description: "Tuscan enters the active duty map pool while Vertigo is removed.", author: "HLTV Staff", time: "2h ago", comments: 456, tags: ["Update"], image: gamingKeyboard },
  { id: 4, title: "Top 20 players of 2025: The final list revealed with surprising entries", description: "donk takes the crown as the youngest ever #1.", author: "Nomad", time: "3h ago", comments: 1200, tags: ["Awards"], image: trophyCup },
  { id: 5, title: "BLAST Premier Spring Groups 2026: Schedule, format, and teams confirmed", author: "HLTV Staff", time: "5h ago", comments: 189, tags: ["Event"], image: crowdArena },
  { id: 6, title: "Workshop creators highlight the best community skins of March 2026", author: "HLTV Staff", time: "6h ago", comments: 342, tags: ["Community"], image: neonLights },
  { id: 7, title: "G2 Esports announce new performance facility in Berlin", author: "Striker", time: "8h ago", comments: 156, tags: ["Org News"], image: gamingChair },
  { id: 8, title: "ESL Pro League Season 21: Groups and opening matchups revealed", description: "The stage is set for one of the most stacked seasons.", author: "HLTV Staff", time: "10h ago", comments: 278, tags: ["Event"], image: conferenceHall },
  { id: 9, title: "Heroic complete roster with signing of rising Danish talent", author: "Nomad", time: "12h ago", comments: 445, tags: ["Roster Move"], image: teamPhoto },
  { id: 10, title: "New anti-cheat measures coming to CS2 matchmaking next month", author: "HLTV Staff", time: "14h ago", comments: 1890, tags: ["Update"], image: pcBuild },
  { id: 11, title: "FURIA sign promising Brazilian AWPer from Academy roster", author: "Striker", time: "16h ago", comments: 367, tags: ["Roster Move"], image: headphones },
  { id: 12, title: "IEM Chengdu 2026 tickets go on sale next week", author: "HLTV Staff", time: "18h ago", comments: 98, tags: ["Event"], image: stadium },
];

// -- Rankings --
export const ranking: RankedTeam[] = [
  { rank: 1, name: "Natus Vincere", color: "#fbbf24", points: 1000, change: "same", region: "Europe", logo: logo.navi },
  { rank: 2, name: "G2 Esports", color: "#c084fc", points: 892, change: "up", changeVal: 1, region: "Europe", logo: logo.g2 },
  { rank: 3, name: "Vitality", color: "#fcd34d", points: 845, change: "down", changeVal: 1, region: "Europe", logo: logo.vitality },
  { rank: 4, name: "MOUZ", color: "#2dd4bf", points: 756, change: "same", region: "Europe", logo: logo.mouz },
  { rank: 5, name: "FaZe Clan", color: "#ef4444", points: 723, change: "up", changeVal: 2, region: "Europe", logo: logo.faze },
  { rank: 6, name: "Team Spirit", color: "#34d399", points: 698, change: "down", changeVal: 1, region: "Europe", logo: logo.spirit },
  { rank: 7, name: "Team Liquid", color: "#38bdf8", points: 654, change: "up", changeVal: 1, region: "Americas", logo: logo.liquid },
  { rank: 8, name: "Heroic", color: "#f472b6", points: 612, change: "same", region: "Europe", logo: logo.heroic },
  { rank: 9, name: "FURIA", color: "#fbbf24", points: 589, change: "up", changeVal: 3, region: "Americas", logo: logo.furia },
  { rank: 10, name: "Astralis", color: "#fb923c", points: 567, change: "down", changeVal: 2, region: "Europe", logo: logo.astralis },
  { rank: 11, name: "Cloud9", color: "#94a3b8", points: 534, change: "down", changeVal: 1, region: "Americas", logo: logo.cloud9 },
  { rank: 12, name: "Complexity", color: "#60a5fa", points: 501, change: "up", changeVal: 2, region: "Americas", logo: logo.complexity },
  { rank: 13, name: "Falcons", color: "#a78bfa", points: 478, change: "same", region: "Europe", logo: logo.falcons },
  { rank: 14, name: "paiN Gaming", color: "#4ade80", points: 445, change: "up", changeVal: 1, region: "Americas", logo: logo.pain },
  { rank: 15, name: "Imperial", color: "#f59e0b", points: 412, change: "down", changeVal: 3, region: "Americas", logo: logo.imperial },
  { rank: 16, name: "9z Team", color: "#e879f9", points: 389, change: "same", region: "Americas", logo: logo.nine_z },
  { rank: 17, name: "TheMongolz", color: "#f97316", points: 367, change: "up", changeVal: 4, region: "Asia", logo: logo.mongolz },
  { rank: 18, name: "Virtus.pro", color: "#fb923c", points: 345, change: "down", changeVal: 1, region: "Europe", logo: logo.virtuspro },
  { rank: 19, name: "GamerLegion", color: "#a3e635", points: 323, change: "up", changeVal: 2, region: "Europe", logo: logo.gamerlegion },
  { rank: 20, name: "SAW", color: "#67e8f9", points: 301, change: "same", region: "Europe", logo: logo.saw },
];

// -- Events --
export const events: Event[] = [
  { id: 1, name: "IEM Katowice 2026", tier: "S", dates: "Mar 10 – 23, 2026", prize: "$1,000,000", teams: 16, progress: 75, status: "Playoffs", location: "Katowice, Poland", image: esportsArena },
  { id: 2, name: "BLAST Premier Spring", tier: "S", dates: "Mar 25 – Apr 6, 2026", prize: "$425,000", teams: 12, progress: 20, status: "Group Stage", location: "Copenhagen, Denmark", image: crowdArena },
  { id: 3, name: "ESL Pro League Season 21", tier: "A", dates: "Apr 14 – 27, 2026", prize: "$850,000", teams: 24, progress: 0, status: "Upcoming", location: "Malta", image: conferenceHall },
  { id: 4, name: "PGL Major Copenhagen", tier: "S", dates: "May 5 – 18, 2026", prize: "$1,250,000", teams: 24, progress: 0, status: "Upcoming", location: "Copenhagen, Denmark", image: stadium },
  { id: 5, name: "IEM Chengdu 2026", tier: "A", dates: "Jun 2 – 8, 2026", prize: "$500,000", teams: 16, progress: 0, status: "Upcoming", location: "Chengdu, China", image: fireworks },
  { id: 6, name: "BLAST Premier Spring Final", tier: "S", dates: "Jun 18 – 22, 2026", prize: "$425,000", teams: 8, progress: 0, status: "Upcoming", location: "London, UK", image: esportStage },
  { id: 7, name: "ESL Challenger Valencia", tier: "B", dates: "Apr 7 – 13, 2026", prize: "$150,000", teams: 16, progress: 0, status: "Upcoming", location: "Valencia, Spain", image: gamingMonitor },
  { id: 8, name: "Thunderpick World Championship", tier: "A", dates: "Jul 1 – 13, 2026", prize: "$1,000,000", teams: 16, progress: 0, status: "Upcoming", location: "TBD", image: neonLights },
];

// -- Players --
export const topPlayers: Player[] = [
  { rank: 1, name: "donk", realName: "Danil Kryshkovets", team: "Spirit", country: "RU", countryFlag: flag.RU, rating: 1.36, kd: "1.42", adr: 94.2, kast: "78.5%", image: playerPhoto.donk, teamLogo: logo.spirit },
  { rank: 2, name: "ZywOo", realName: "Mathieu Herbaut", team: "Vitality", country: "FR", countryFlag: flag.FR, rating: 1.31, kd: "1.35", adr: 88.7, kast: "75.2%", image: playerPhoto.zywoo, teamLogo: logo.vitality },
  { rank: 3, name: "NiKo", realName: "Nikola Kovač", team: "Falcons", country: "BA", countryFlag: flag.BA, rating: 1.27, kd: "1.30", adr: 85.4, kast: "73.8%", image: playerPhoto.niko, teamLogo: logo.falcons },
  { rank: 4, name: "m0NESY", realName: "Ilya Osipov", team: "Falcons", country: "RU", countryFlag: flag.RU, rating: 1.25, kd: "1.28", adr: 82.1, kast: "72.4%", image: playerPhoto.m0nesy, teamLogo: logo.falcons },
  { rank: 5, name: "ropz", realName: "Robin Kool", team: "Vitality", country: "EE", countryFlag: flag.EE, rating: 1.21, kd: "1.24", adr: 79.8, kast: "74.1%", image: playerPhoto.ropz, teamLogo: logo.vitality },
  { rank: 6, name: "b1t", realName: "Valeriy Vakhovskiy", team: "NAVI", country: "UA", countryFlag: flag.UA, rating: 1.19, kd: "1.22", adr: 78.3, kast: "71.6%", image: playerPhoto.b1t, teamLogo: logo.navi },
  { rank: 7, name: "jL", realName: "Justinas Lekavicius", team: "MOUZ", country: "LT", countryFlag: flag.LT, rating: 1.18, kd: "1.20", adr: 76.9, kast: "70.8%", image: playerPhoto.jl, teamLogo: logo.mouz },
  { rank: 8, name: "Spinx", realName: "Lotan Giladi", team: "MOUZ", country: "IL", countryFlag: flag.IL, rating: 1.16, kd: "1.18", adr: 75.4, kast: "72.0%", image: playerPhoto.spinx, teamLogo: logo.mouz },
  { rank: 9, name: "frozen", realName: "David Čerňanský", team: "FaZe", country: "SK", countryFlag: flag.SK, rating: 1.15, kd: "1.17", adr: 74.1, kast: "69.5%", image: playerPhoto.frozen, teamLogo: logo.faze },
  { rank: 10, name: "huNter-", realName: "Nemanja Kovač", team: "G2", country: "BA", countryFlag: flag.BA, rating: 1.14, kd: "1.16", adr: 73.8, kast: "71.2%", image: playerPhoto.hunter, teamLogo: logo.g2 },
  { rank: 11, name: "broky", realName: "Helvijs Saukants", team: "FaZe", country: "LV", countryFlag: flag.LV, rating: 1.13, kd: "1.15", adr: 72.5, kast: "68.9%", image: playerPhoto.broky, teamLogo: logo.faze },
  { rank: 12, name: "rain", realName: "Håvard Nygaard", team: "FaZe", country: "NO", countryFlag: flag.NO, rating: 1.11, kd: "1.13", adr: 71.2, kast: "70.3%", image: playerPhoto.rain, teamLogo: logo.faze },
  { rank: 13, name: "sh1ro", realName: "Dmitry Sokolov", team: "Spirit", country: "RU", countryFlag: flag.RU, rating: 1.10, kd: "1.12", adr: 70.8, kast: "67.5%", image: playerPhoto.sh1ro, teamLogo: logo.spirit },
  { rank: 14, name: "yuurih", realName: "Yuri Santos", team: "FURIA", country: "BR", countryFlag: flag.BR, rating: 1.09, kd: "1.11", adr: 69.4, kast: "69.0%", image: playerPhoto.yuurih, teamLogo: logo.furia },
  { rank: 15, name: "KSCERATO", realName: "Kaike Cerato", team: "FURIA", country: "BR", countryFlag: flag.BR, rating: 1.08, kd: "1.10", adr: 68.1, kast: "71.8%", image: playerPhoto.kscerato, teamLogo: logo.furia },
];

// -- Forum Threads --
export const forumThreads: ForumThread[] = [
  { id: 1, title: "NAVI vs FaZe Grand Final predictions?", author: "CSGOfan123", authorRank: "Global Elite", replies: 342, views: 12400, lastReply: "2 min ago", category: "Match Discussion", pinned: true },
  { id: 2, title: "s1mple comeback - will he be the same?", author: "Hiko_Fan", authorRank: "Legendary Eagle", replies: 567, views: 28900, lastReply: "5 min ago", category: "General" },
  { id: 3, title: "Best crosshair settings for 2026?", author: "NovicePlayer", authorRank: "Gold Nova", replies: 89, views: 4500, lastReply: "12 min ago", category: "Help" },
  { id: 4, title: "Tuscan replacing Vertigo - good or bad?", author: "MapLover99", authorRank: "Supreme", replies: 234, views: 9800, lastReply: "18 min ago", category: "General" },
  { id: 5, title: "donk is the most talented player ever", author: "SpiritFanBoy", authorRank: "Master Guardian", replies: 445, views: 15600, lastReply: "25 min ago", category: "General" },
  { id: 6, title: "FaZe roster needs changes after this event", author: "TacticsMaster", authorRank: "Legendary Eagle", replies: 178, views: 7200, lastReply: "32 min ago", category: "Team Discussion" },
  { id: 7, title: "Best CS2 clips of the week - March edition", author: "ClipHunter", authorRank: "Distinguished Master Guardian", replies: 56, views: 3400, lastReply: "45 min ago", category: "Multimedia" },
  { id: 8, title: "Mouse sensitivity guide for beginners", author: "AimTrainer", authorRank: "Gold Nova", replies: 123, views: 18900, lastReply: "1h ago", category: "Help", pinned: true },
  { id: 9, title: "Brazilian CS is back? FURIA and Imperial looking strong", author: "BRfan", authorRank: "Master Guardian", replies: 267, views: 11200, lastReply: "1h ago", category: "Team Discussion" },
  { id: 10, title: "Rate my inventory - just got a new knife!", author: "SkinCollector", authorRank: "Silver", replies: 45, views: 2100, lastReply: "2h ago", category: "Off Topic" },
  { id: 11, title: "Why ZywOo deserves #1 over donk", author: "VitalityFan", authorRank: "Supreme", replies: 678, views: 23400, lastReply: "2h ago", category: "General" },
  { id: 12, title: "New smoke lineups for Tuscan - complete guide", author: "NadeKing", authorRank: "Global Elite", replies: 89, views: 6700, lastReply: "3h ago", category: "Help" },
];

// -- Streams --
export const streams: Stream[] = [
  { id: 1, channel: "ESL_CSGO", title: "IEM Katowice 2026 - Semifinals", viewers: 124500, game: "Counter-Strike 2", language: "EN", thumbnail: esportsArena },
  { id: 2, channel: "gaules", title: "WATCHPARTY IEM Katowice - VAMO FURIA!", viewers: 51200, game: "Counter-Strike 2", language: "PT", thumbnail: crowdArena },
  { id: 3, channel: "MaDHousE_TV", title: "Analisando as semis do IEM Katowice", viewers: 14800, game: "Counter-Strike 2", language: "PT", thumbnail: esportStage },
  { id: 4, channel: "fl0m", title: "Rank S Grind & IEM Watch Along", viewers: 12300, game: "Counter-Strike 2", language: "EN", thumbnail: gamingSetup },
  { id: 5, channel: "BLAST_TV", title: "BLAST Premier Spring Groups", viewers: 82300, game: "Counter-Strike 2", language: "EN", thumbnail: stadium },
  { id: 6, channel: "s1mple", title: "Ranked Grind - Road to Global", viewers: 38700, game: "Counter-Strike 2", language: "RU", thumbnail: gamingKeyboard },
  { id: 7, channel: "Pimp", title: "IEM Katowice Co-stream w/ analysis", viewers: 8400, game: "Counter-Strike 2", language: "EN", thumbnail: gamingMonitor },
  { id: 8, channel: "mch_agg", title: "FPL ao vivo - grind noturno", viewers: 6200, game: "Counter-Strike 2", language: "PT", thumbnail: neonLights },
];

// -- Maps --
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
  recentResults: {
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

export const gameMaps: GameMap[] = [
  {
    slug: "mirage",
    name: "Mirage",
    image: crowdArena,
    description: "One of the most iconic and balanced maps in CS history. Set in a Moroccan-inspired setting, Mirage features a classic three-lane layout with mid control being the key to success. It rewards both strategic play and individual skill.",
    pool: "active",
    ctWinRate: 52.3,
    tWinRate: 47.7,
    avgRounds: 26.4,
    pickRate: 28.5,
    banRate: 12.3,
    totalProMatches: 14820,
    bestTeams: [
      { name: "Natus Vincere", logo: logo.navi, winRate: 74.2 },
      { name: "FaZe Clan", logo: logo.faze, winRate: 71.8 },
      { name: "G2 Esports", logo: logo.g2, winRate: 69.5 },
      { name: "Team Spirit", logo: logo.spirit, winRate: 67.3 },
      { name: "Vitality", logo: logo.vitality, winRate: 65.1 },
    ],
    callouts: ["A Site", "A Ramp", "Tetris", "Ticket", "Jungle", "Connector", "CT Spawn", "Window", "Mid", "Top Mid", "Underpass", "B Site", "B Apps", "B Short", "Van", "Kitchen", "Market", "Palace", "T Spawn", "Catwalk"],
    utilityGuides: [
      { type: "smoke", name: "Window Smoke from T Spawn", from: "T Spawn", description: "Line up with the corner of the building on the left, aim at the antenna tip, and throw. This blocks CT sniper from Window room.", difficulty: "Easy" },
      { type: "smoke", name: "Connector Smoke from A Ramp", from: "A Ramp", description: "Stand at the corner of A Ramp near the boxes, aim at the edge of the building above connector, jump-throw.", difficulty: "Medium" },
      { type: "smoke", name: "Jungle Smoke from T Spawn", from: "T Spawn", description: "Position yourself against the wall at T Spawn, crosshair at the specific gap in the building, running throw.", difficulty: "Easy" },
      { type: "flash", name: "A Site Pop Flash from Palace", from: "Palace", description: "Turn away from A site, right-click throw over the wall for a perfect pop flash that blinds site players.", difficulty: "Easy" },
      { type: "flash", name: "B Apartments Flash", from: "B Apartments", description: "Throw over the wall from B apps entrance, bounces once and pops right as you peek.", difficulty: "Medium" },
      { type: "molotov", name: "Under Window Molotov", from: "Top Mid", description: "From top mid, aim at the bottom of window room and throw. Forces the AWPer out of position.", difficulty: "Medium" },
      { type: "he", name: "B Van HE", from: "B Apartments", description: "Peek the corner and throw at the van. Does massive damage to anyone playing behind it.", difficulty: "Easy" },
    ],
    highlights: [
      { title: "coldzera's jumping AWP double kill", player: "coldzera", event: "MLG Columbus 2016", round: "OT Round 4", description: "The most iconic play in CS history. coldzera jumped from the boxes on B site and hit two no-scope AWP kills mid-air." },
      { title: "NiKo 1v5 ace clutch", player: "NiKo", event: "ESL Pro League S14", round: "Round 24", description: "NiKo single-handedly won a 1v5 on the A site retake with all headshots." },
      { title: "donk 1v4 clutch", player: "donk", event: "IEM Katowice 2026", round: "Round 28", description: "donk dismantled NAVI's defense with a 1v4 clutch that turned the semifinal around." },
    ],
    recentResults: [
      { team1: "NAVI", team1Logo: logo.navi, score1: 13, team2: "FaZe", team2Logo: logo.faze, score2: 11, event: "IEM Katowice 2026", date: "Today" },
      { team1: "Spirit", team1Logo: logo.spirit, score1: 16, team2: "G2", team2Logo: logo.g2, score2: 9, event: "BLAST Premier", date: "Yesterday" },
      { team1: "Vitality", team1Logo: logo.vitality, score1: 13, team2: "MOUZ", team2Logo: logo.mouz, score2: 16, event: "ESL Pro League", date: "Mar 2" },
    ],
  },
  {
    slug: "inferno",
    name: "Inferno",
    image: esportsArena,
    description: "A classic map set in an Italian village. Inferno is known for its tight corridors, crucial banana control, and intense A site executions. Team play and utility usage are essential here.",
    pool: "active",
    ctWinRate: 53.8,
    tWinRate: 46.2,
    avgRounds: 27.1,
    pickRate: 25.2,
    banRate: 14.1,
    totalProMatches: 15340,
    bestTeams: [
      { name: "Vitality", logo: logo.vitality, winRate: 76.1 },
      { name: "Natus Vincere", logo: logo.navi, winRate: 72.4 },
      { name: "Astralis", logo: logo.astralis, winRate: 70.8 },
      { name: "FURIA", logo: logo.furia, winRate: 68.2 },
      { name: "Team Liquid", logo: logo.liquid, winRate: 66.9 },
    ],
    callouts: ["A Site", "Pit", "Graveyard", "Library", "Arch", "Apartments", "Balcony", "Mid", "Second Mid", "Banana", "B Site", "Coffins", "New Box", "Dark", "CT Spawn", "Construction", "Hay Bales", "T Spawn", "Top Banana", "Bottom Banana"],
    utilityGuides: [
      { type: "smoke", name: "Coffins Smoke from Banana", from: "Banana", description: "From top banana, aim at the specific spot on the sky above the building and throw. Covers coffins position on B site.", difficulty: "Easy" },
      { type: "smoke", name: "CT Smoke from Banana", from: "Banana", description: "Stand at the corner of top banana, aim at the edge of the church tower, jump-throw. Blocks CT rotations.", difficulty: "Medium" },
      { type: "smoke", name: "Arch Smoke from T Spawn", from: "T Spawn", description: "Line up with the chimney and throw. Essential for A executions to block rotations from arch.", difficulty: "Hard" },
      { type: "flash", name: "Banana Pop Flash", from: "Top Banana", description: "Throw against the right wall at top banana for a perfect pop that catches aggressive CTs.", difficulty: "Easy" },
      { type: "molotov", name: "Pit Molotov from Apartments", from: "Apartments", description: "Aim at the wall above pit from apartments balcony. Forces the AWPer out of pit during A exec.", difficulty: "Medium" },
    ],
    highlights: [
      { title: "s1mple 1v3 AWP clutch", player: "s1mple", event: "Cologne 2018", round: "Round 30", description: "s1mple hit three insane flick shots to win a 1v3 and save NAVI from elimination." },
      { title: "flusha 4k through smoke", player: "flusha", event: "DreamHack Winter 2014", round: "Round 15", description: "The controversial 4k through smoke on B site that became one of the most debated plays ever." },
    ],
    recentResults: [
      { team1: "Vitality", team1Logo: logo.vitality, score1: 16, team2: "Spirit", team2Logo: logo.spirit, score2: 9, event: "IEM Katowice 2026", date: "Today" },
      { team1: "NAVI", team1Logo: logo.navi, score1: 16, team2: "G2", team2Logo: logo.g2, score2: 13, event: "BLAST Premier", date: "Yesterday" },
    ],
  },
  {
    slug: "dust2",
    name: "Dust II",
    image: gamingKeyboard,
    description: "The most famous map in FPS history. Dust II's simple yet deep layout makes it perfect for both casual and pro play. Long range duels, mid control, and fast rotations define gameplay here.",
    pool: "active",
    ctWinRate: 50.8,
    tWinRate: 49.2,
    avgRounds: 25.8,
    pickRate: 18.7,
    banRate: 22.4,
    totalProMatches: 18560,
    bestTeams: [
      { name: "G2 Esports", logo: logo.g2, winRate: 72.3 },
      { name: "FaZe Clan", logo: logo.faze, winRate: 69.8 },
      { name: "FURIA", logo: logo.furia, winRate: 67.5 },
      { name: "MOUZ", logo: logo.mouz, winRate: 65.2 },
      { name: "Heroic", logo: logo.heroic, winRate: 64.1 },
    ],
    callouts: ["A Site", "A Long", "A Short", "A Car", "Goose", "A Platform", "CT Spawn", "Mid", "Mid Doors", "B Site", "B Tunnels", "Upper Tunnels", "B Car", "B Window", "B Closet", "Catwalk", "T Spawn", "Outside Long", "Pit", "Xbox"],
    utilityGuides: [
      { type: "smoke", name: "Cross Smoke from T Spawn", from: "T Spawn", description: "Blocks mid doors so you can cross to B tunnels safely. Essential T-side fundamental.", difficulty: "Easy" },
      { type: "smoke", name: "A Long Corner Smoke", from: "A Long", description: "Throw at the corner of A long to block the CT's vision from the site. Allows safe entry.", difficulty: "Easy" },
      { type: "flash", name: "A Long Flash", from: "Outside Long", description: "Pop flash over the wall from outside long. Perfect for peeking long doors.", difficulty: "Easy" },
      { type: "molotov", name: "B Car Molotov", from: "B Tunnels", description: "Molotov the car position on B site from tunnels entrance.", difficulty: "Medium" },
    ],
    highlights: [
      { title: "ScreaM's one-taps on Long", player: "ScreaM", event: "ECS Season 2", round: "Round 8", description: "The Headshot Machine hit 4 consecutive one-taps at Long, showcasing the purest aim in CS history." },
      { title: "s1mple no-scope across mid", player: "s1mple", event: "ESL One Cologne 2016", round: "Round 22", description: "s1mple hit a falling no-scope AWP shot through mid doors that defied all logic." },
    ],
    recentResults: [
      { team1: "G2", team1Logo: logo.g2, score1: 16, team2: "FaZe", team2Logo: logo.faze, score2: 12, event: "ESL Pro League", date: "Mar 2" },
      { team1: "FURIA", team1Logo: logo.furia, score1: 13, team2: "Liquid", team2Logo: logo.liquid, score2: 16, event: "BLAST Premier", date: "Mar 1" },
    ],
  },
  {
    slug: "anubis",
    name: "Anubis",
    image: neonLights,
    description: "An ancient Egyptian-themed map that joined the competitive pool in CS2. Known for its unique vertical gameplay, water canal, and multi-level engagements. Teams are still developing the meta.",
    pool: "active",
    ctWinRate: 54.1,
    tWinRate: 45.9,
    avgRounds: 27.8,
    pickRate: 15.3,
    banRate: 25.8,
    totalProMatches: 3240,
    bestTeams: [
      { name: "Team Spirit", logo: logo.spirit, winRate: 73.4 },
      { name: "MOUZ", logo: logo.mouz, winRate: 70.2 },
      { name: "G2 Esports", logo: logo.g2, winRate: 68.9 },
      { name: "Natus Vincere", logo: logo.navi, winRate: 66.5 },
      { name: "Heroic", logo: logo.heroic, winRate: 64.8 },
    ],
    callouts: ["A Site", "A Main", "A Connector", "Palace", "Pillar", "Water", "Canal", "Mid", "Bridge", "B Site", "B Main", "B Connector", "Ruins", "Heaven", "CT Spawn", "T Spawn", "Walkway", "Boat", "Alley", "Street"],
    utilityGuides: [
      { type: "smoke", name: "Bridge Smoke from T Spawn", from: "T Spawn", description: "Blocks bridge crossing to allow mid control takes. Standard T-side opener.", difficulty: "Medium" },
      { type: "smoke", name: "Heaven Smoke for B Execute", from: "B Main", description: "Blocks the heaven/elevated position watching B site. Critical for any B execute.", difficulty: "Medium" },
      { type: "flash", name: "Canal Pop Flash", from: "Canal", description: "Bounce off the wall in canal for a flash that catches A site defenders.", difficulty: "Hard" },
      { type: "molotov", name: "A Pillar Molotov", from: "A Main", description: "Forces the defender from behind the pillar on A site. Key to clearing common positions.", difficulty: "Medium" },
    ],
    highlights: [
      { title: "donk ace through water", player: "donk", event: "BLAST Premier 2025", round: "Round 18", description: "donk pushed through the canal and aced the entire CT side with a Deagle in a force buy round." },
    ],
    recentResults: [
      { team1: "G2", team1Logo: logo.g2, score1: 7, team2: "Liquid", team2Logo: logo.liquid, score2: 10, event: "BLAST Premier", date: "Today" },
      { team1: "Spirit", team1Logo: logo.spirit, score1: 16, team2: "MOUZ", team2Logo: logo.mouz, score2: 12, event: "IEM Katowice 2026", date: "Yesterday" },
    ],
  },
  {
    slug: "ancient",
    name: "Ancient",
    image: conferenceHall,
    description: "Set in ancient Aztec ruins, this map features a compact layout with tight angles and quick rotations. It has evolved significantly since its introduction, becoming a staple in competitive play.",
    pool: "active",
    ctWinRate: 55.2,
    tWinRate: 44.8,
    avgRounds: 27.3,
    pickRate: 14.8,
    banRate: 20.1,
    totalProMatches: 4560,
    bestTeams: [
      { name: "Vitality", logo: logo.vitality, winRate: 75.8 },
      { name: "FaZe Clan", logo: logo.faze, winRate: 72.1 },
      { name: "Cloud9", logo: logo.cloud9, winRate: 68.4 },
      { name: "Astralis", logo: logo.astralis, winRate: 66.7 },
      { name: "NAVI", logo: logo.navi, winRate: 65.3 },
    ],
    callouts: ["A Site", "A Main", "Donut", "Elbow", "Temple", "Cave", "Mid", "B Site", "B Ramp", "Alley", "CT Spawn", "T Spawn", "Jaguar", "Totem", "Red Room", "Water", "Side Path", "House", "Garden", "Sniper Nest"],
    utilityGuides: [
      { type: "smoke", name: "Donut Smoke from A Main", from: "A Main", description: "Blocks the donut connection allowing you to take A without being flanked.", difficulty: "Easy" },
      { type: "smoke", name: "CT Smoke for B Execute", from: "B Ramp", description: "Blocks CT spawn rotation to B site. Essential for any B take.", difficulty: "Medium" },
      { type: "flash", name: "A Site Entry Flash", from: "A Main", description: "Bounce off the left wall for a flash that pops right as you enter A site.", difficulty: "Easy" },
      { type: "molotov", name: "Cave Molotov from Mid", from: "Mid", description: "Clears the cave position which is a common off-angle hold.", difficulty: "Hard" },
    ],
    highlights: [
      { title: "ZywOo 1v3 retake on B", player: "ZywOo", event: "PGL Major 2025", round: "Match Point", description: "ZywOo clutched a 1v3 retake on B site at match point to keep Vitality alive in the Major." },
    ],
    recentResults: [
      { team1: "Vitality", team1Logo: logo.vitality, score1: 16, team2: "Astralis", team2Logo: logo.astralis, score2: 10, event: "IEM Katowice 2026", date: "Mar 2" },
    ],
  },
  {
    slug: "nuke",
    name: "Nuke",
    image: pcBuild,
    description: "A nuclear power plant map with a unique dual-level layout. Nuke's vertical gameplay, with A site above B site, creates a distinct tactical challenge. Sound plays a massive role here.",
    pool: "active",
    ctWinRate: 57.4,
    tWinRate: 42.6,
    avgRounds: 28.2,
    pickRate: 12.1,
    banRate: 28.7,
    totalProMatches: 8920,
    bestTeams: [
      { name: "Astralis", logo: logo.astralis, winRate: 78.3 },
      { name: "Natus Vincere", logo: logo.navi, winRate: 73.6 },
      { name: "FaZe Clan", logo: logo.faze, winRate: 70.2 },
      { name: "Team Spirit", logo: logo.spirit, winRate: 68.9 },
      { name: "Vitality", logo: logo.vitality, winRate: 67.1 },
    ],
    callouts: ["A Site", "Heaven", "Hell", "Hut", "Main", "Squeaky", "Vent", "B Site", "Ramp", "Secret", "Decon", "CT Spawn", "T Spawn", "Outside", "Silo", "Yard", "Garage", "Control Room", "Trophy", "Radio"],
    utilityGuides: [
      { type: "smoke", name: "Heaven Smoke from Outside", from: "Outside", description: "Blocks heaven allowing safe plant on A site. One of the most important smokes on the map.", difficulty: "Hard" },
      { type: "smoke", name: "Ramp Smoke from T Spawn", from: "T Spawn", description: "Blocks CT vision down ramp. Allows B site take.", difficulty: "Medium" },
      { type: "flash", name: "Squeaky Door Flash", from: "Lobby", description: "Flash through squeaky door. Pop flash catches anyone playing on A site.", difficulty: "Easy" },
      { type: "molotov", name: "Vent Molotov from Outside", from: "Outside", description: "Molotov into the vent to deny rotations from B to A. Critical for splits.", difficulty: "Hard" },
    ],
    highlights: [
      { title: "device 4k AWP hold", player: "device", event: "IEM Katowice 2019", round: "Round 27", description: "device held outside with the AWP and hit four consecutive picks to shut down the T execute." },
    ],
    recentResults: [
      { team1: "NAVI", team1Logo: logo.navi, score1: 16, team2: "Spirit", team2Logo: logo.spirit, score2: 14, event: "IEM Katowice 2026", date: "Yesterday" },
    ],
  },
  {
    slug: "tuscan",
    name: "Tuscan",
    image: esportStage,
    description: "The long-awaited return of Tuscan to competitive CS! Set in an Italian town, Tuscan features wide open spaces, complex mid control, and multiple angles. It replaced Vertigo in the active pool.",
    pool: "active",
    ctWinRate: 51.2,
    tWinRate: 48.8,
    avgRounds: 26.1,
    pickRate: 8.9,
    banRate: 18.5,
    totalProMatches: 890,
    bestTeams: [
      { name: "G2 Esports", logo: logo.g2, winRate: 71.2 },
      { name: "MOUZ", logo: logo.mouz, winRate: 68.5 },
      { name: "FaZe Clan", logo: logo.faze, winRate: 66.3 },
      { name: "Heroic", logo: logo.heroic, winRate: 64.8 },
      { name: "FURIA", logo: logo.furia, winRate: 63.1 },
    ],
    callouts: ["A Site", "A Main", "A Halls", "Ivy", "Balcony", "Mid", "Connector", "B Site", "B Lobby", "B Halls", "CT Spawn", "T Spawn", "Garage", "Arch", "Vineyards", "Church", "Patio", "Stairs", "Olive", "Fountain"],
    utilityGuides: [
      { type: "smoke", name: "Connector Smoke from T Spawn", from: "T Spawn", description: "Blocks connector to allow safe mid control or A split. Still being optimized in the meta.", difficulty: "Medium" },
      { type: "smoke", name: "Church Smoke for B Execute", from: "B Lobby", description: "Covers the church angle watching B site. Essential for B executes.", difficulty: "Easy" },
      { type: "flash", name: "A Main Entry Flash", from: "A Main", description: "Pop flash around the corner into A main. Catches defenders off guard.", difficulty: "Easy" },
    ],
    highlights: [
      { title: "m0NESY ace on debut", player: "m0NESY", event: "ESL Pro League S21", round: "Round 5", description: "m0NESY opened Tuscan's competitive debut with a clean ace, setting the tone for G2's dominance on the map." },
    ],
    recentResults: [
      { team1: "G2", team1Logo: logo.g2, score1: 16, team2: "MOUZ", team2Logo: logo.mouz, score2: 11, event: "ESL Pro League", date: "Mar 1" },
    ],
  },
  {
    slug: "vertigo",
    name: "Vertigo",
    image: headphones,
    description: "Set on top of a skyscraper under construction, Vertigo was known for its tight corridors, vertical duels, and unique aesthetic. Removed from the active pool in 2026 after the Tuscan update.",
    pool: "removed",
    ctWinRate: 53.5,
    tWinRate: 46.5,
    avgRounds: 27.6,
    pickRate: 0,
    banRate: 0,
    totalProMatches: 6780,
    bestTeams: [
      { name: "Astralis", logo: logo.astralis, winRate: 77.5 },
      { name: "Team Liquid", logo: logo.liquid, winRate: 73.1 },
      { name: "Natus Vincere", logo: logo.navi, winRate: 71.8 },
      { name: "Cloud9", logo: logo.cloud9, winRate: 69.4 },
      { name: "Complexity", logo: logo.complexity, winRate: 67.2 },
    ],
    callouts: ["A Site", "A Ramp", "Elevator", "Scaffolding", "Heaven", "Hell", "B Site", "B Stairs", "B Default", "Generator", "Mid", "CT Spawn", "T Spawn", "Sandbags", "Silo", "Ladder", "Window", "Tunnels", "Construction", "Bridge"],
    utilityGuides: [
      { type: "smoke", name: "CT Smoke from T Stairs", from: "T Stairs", description: "Blocks CT rotation to A site. Classic Vertigo execute smoke.", difficulty: "Easy" },
      { type: "flash", name: "B Stairs Flash", from: "B Stairs", description: "Pop flash from stairs to clear site. Bounces off ceiling.", difficulty: "Medium" },
    ],
    highlights: [
      { title: "gla1ve's perfect B execute", player: "gla1ve", event: "Stockholm Major 2021", round: "Round 23", description: "Astralis showcased the perfect Vertigo B execute with gla1ve's calling, winning the round without a single trade." },
    ],
    recentResults: [],
  },
];

// -- Highlights --
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

export const highlights: Highlight[] = [
  { id: 1, title: "donk 1v4 AK clutch on Mirage", player: "donk", playerImage: playerPhoto.donk, team: "Spirit", teamLogo: logo.spirit, event: "IEM Katowice 2026", map: "Mirage", type: "clutch", date: "Today", views: 524000, likes: 41200, thumbnail: esportsArena, description: "In the semifinal, donk found himself in an impossible 1v4 situation. What followed was a masterclass in positioning and aim that will be remembered for years." },
  { id: 2, title: "ZywOo insane AWP 4k holds B site", player: "ZywOo", playerImage: playerPhoto.zywoo, team: "Vitality", teamLogo: logo.vitality, event: "IEM Katowice 2026", map: "Inferno", type: "awp", date: "Today", views: 312000, likes: 28500, thumbnail: crowdArena, description: "ZywOo locked down banana with four consecutive AWP kills, denying FaZe's B execute completely." },
  { id: 3, title: "NiKo pistol round ace with USP-S", player: "NiKo", playerImage: playerPhoto.niko, team: "Falcons", teamLogo: logo.falcons, event: "BLAST Premier 2026", map: "Dust II", type: "pistol", date: "Yesterday", views: 267000, likes: 22300, thumbnail: gamingKeyboard, description: "NiKo opened the half with a clean pistol ace, hitting all five headshots with the USP-S." },
  { id: 4, title: "m0NESY no-scope collateral through smoke", player: "m0NESY", playerImage: playerPhoto.m0nesy, team: "Falcons", teamLogo: logo.falcons, event: "ESL Pro League S21", map: "Anubis", type: "awp", date: "Yesterday", views: 445000, likes: 38100, thumbnail: neonLights, description: "A blind no-scope through smoke that collateraled two players. The entire arena erupted." },
  { id: 5, title: "ropz 1v3 ninja defuse on Nuke", player: "ropz", playerImage: playerPhoto.ropz, team: "Vitality", teamLogo: logo.vitality, event: "IEM Katowice 2026", map: "Nuke", type: "clutch", date: "Mar 2", views: 198000, likes: 15600, thumbnail: pcBuild, description: "ropz hid in secret, waited for all Ts to rotate away, and pulled off the ninja defuse to save the half." },
  { id: 6, title: "donk Deagle ace on eco round", player: "donk", playerImage: playerPhoto.donk, team: "Spirit", teamLogo: logo.spirit, event: "BLAST Premier 2026", map: "Ancient", type: "deagle", date: "Mar 2", views: 389000, likes: 31200, thumbnail: conferenceHall, description: "On a full eco, donk bought a Deagle and proceeded to one-tap the entire enemy team in 8 seconds." },
  { id: 7, title: "ZywOo wallbang triple through mid doors", player: "ZywOo", playerImage: playerPhoto.zywoo, team: "Vitality", teamLogo: logo.vitality, event: "ESL Pro League S21", map: "Dust II", type: "wallbang", date: "Mar 1", views: 276000, likes: 21800, thumbnail: gamingKeyboard, description: "ZywOo wallbanged three players through mid doors with the AWP in rapid succession." },
  { id: 8, title: "NiKo 1v2 clutch with 1 HP", player: "NiKo", playerImage: playerPhoto.niko, team: "Falcons", teamLogo: logo.falcons, event: "IEM Katowice 2026", map: "Mirage", type: "clutch", date: "Mar 1", views: 334000, likes: 27500, thumbnail: crowdArena, description: "At 1 HP, NiKo hit two insane headshots to win the round and secure the map for Falcons." },
  { id: 9, title: "m0NESY jumping AWP shot on Ancient", player: "m0NESY", playerImage: playerPhoto.m0nesy, team: "Falcons", teamLogo: logo.falcons, event: "BLAST Premier 2026", map: "Ancient", type: "awp", date: "Feb 28", views: 512000, likes: 42100, thumbnail: conferenceHall, description: "Reminiscent of the legendary coldzera play, m0NESY hit a jumping AWP shot at A Main." },
  { id: 10, title: "ropz spray transfer 4k on Inferno", player: "ropz", playerImage: playerPhoto.ropz, team: "Vitality", teamLogo: logo.vitality, event: "ESL Pro League S21", map: "Inferno", type: "ace", date: "Feb 27", views: 178000, likes: 14200, thumbnail: esportsArena, description: "ropz pulled off a ridiculous spray transfer from banana to dark, killing four players in one spray." },
];

// -- Academy Guides --
export interface Guide {
  id: number;
  title: string;
  category: "economy" | "aim" | "movement" | "utility" | "communication" | "mindset";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  description: string;
  image: string;
  sections: { title: string; content: string }[];
}

export const academyGuides: Guide[] = [
  {
    id: 1, title: "CS2 Economy Guide — Buy, Save, Force", category: "economy", difficulty: "Beginner", readTime: "8 min", image: trophyCup,
    description: "Master the CS2 economy system to make smart buy decisions every round.",
    sections: [
      { title: "Round Loss Bonus", content: "After losing consecutive rounds, your team earns increasing loss bonuses: $1400, $1900, $2400, $2900, $3400. This resets when you win a round." },
      { title: "When to Full Buy", content: "Full buy when your team has $4000+ (rifles) or $4750+ (AWP). Ensure at least 3 players can buy full utility." },
      { title: "When to Eco", content: "Eco when your team can't afford rifles. Buy only pistols or nothing. Save for next round's full buy." },
      { title: "Force Buy", content: "Force buy on crucial rounds (match point, half-ending). SMGs, Deagles, or cheap rifles + limited utility." },
      { title: "Kill Rewards", content: "Different weapons give different kill rewards. Shotguns: $900, SMGs: $600, Rifles: $300, AWP: $100, Knife: $1500." },
    ],
  },
  {
    id: 2, title: "Aim Training Routine — From Silver to Global", category: "aim", difficulty: "Beginner", readTime: "12 min", image: gamingSetup,
    description: "A structured daily aim training routine to improve your mechanics.",
    sections: [
      { title: "Warmup (10 min)", content: "Start with Aim Botz or a similar workshop map. Focus on flicking between bots at medium distance. 500 kills minimum." },
      { title: "Tracking (5 min)", content: "Use a strafing bot map. Track moving targets smoothly without over-aiming. Focus on crosshair placement." },
      { title: "Spray Control (10 min)", content: "Practice spray patterns for AK-47 and M4A4 against a wall. Then apply against bots. Master first 10 bullets first." },
      { title: "Flick Shots (5 min)", content: "Use Aim Lab or Kovaak's for flick training. Focus on accuracy over speed initially." },
      { title: "Deathmatch (15 min)", content: "Join a community FFA DM server. Focus on crosshair placement at head level. Don't chase kills." },
    ],
  },
  {
    id: 3, title: "Movement Mechanics — Counter-strafing & Peeking", category: "movement", difficulty: "Intermediate", readTime: "10 min", image: gamingKeyboard,
    description: "Learn the movement mechanics that separate good players from great ones.",
    sections: [
      { title: "Counter-strafing", content: "Press the opposite direction key before shooting. A→D or D→A. This stops your momentum instantly for accurate shots." },
      { title: "Jiggle Peeking", content: "Tap A or D to quickly peek and unpee. Used to bait out AWP shots or gather info without committing." },
      { title: "Wide Swinging", content: "Sprint past an angle with W+A or W+D. Forces opponents to flick. Best against AWPs or holding angles." },
      { title: "Shoulder Peeking", content: "Expose only your shoulder to bait a shot. Immediately pull back. Perfect for info gathering." },
      { title: "Bunny Hopping", content: "Time your jumps on landing while air-strafing. Difficult in CS2 but can give speed advantages in specific spots." },
    ],
  },
  {
    id: 4, title: "Crosshair Settings — Find Your Perfect Setup", category: "aim", difficulty: "Beginner", readTime: "6 min", image: gamingMonitor,
    description: "Explore crosshair styles used by pros and find what works for you.",
    sections: [
      { title: "Static vs Dynamic", content: "Static crosshairs don't move when you shoot — preferred by most pros. Dynamic crosshairs expand to show inaccuracy." },
      { title: "Size & Gap", content: "Small crosshairs (size 2-3, gap -2 to 0) are most popular. They're precise without covering enemies at range." },
      { title: "Color Choices", content: "Green (#00FF00) and cyan (#00FFFF) are most popular. They contrast well with most map textures." },
      { title: "Pro Settings", content: "donk: size 2, gap -1, thickness 0, green. s1mple: size 3, gap -1, thickness 1, cyan. NiKo: size 1, gap -3, thickness 0, green." },
      { title: "Dot Crosshair", content: "Some players use a single dot. Pros: extremely precise. Cons: hard to track during movement. Try cl_crosshairsize 0 with dot enabled." },
    ],
  },
  {
    id: 5, title: "Advanced Utility Usage — Win Rounds With Nades", category: "utility", difficulty: "Advanced", readTime: "15 min", image: esportStage,
    description: "Learn how pro teams use coordinated utility to execute and retake sites.",
    sections: [
      { title: "Smoke Principles", content: "Always smoke before you need it. One-way smokes give massive advantages. Coordinate smokes with teammates for site executes." },
      { title: "Flash Coordination", content: "Pop flashes (thrown so they pop immediately on the enemy's screen) are key. Call out your flashes so teammates can peek." },
      { title: "Molotov Timing", content: "Molotovs deny positions for 7 seconds. Use them to clear common holds, delay pushes, or force enemies into open positions." },
      { title: "HE Nade Stacks", content: "Coordinate HE grenades with teammates. Two HEs at the same spot can deal 100+ damage, getting kills through walls." },
      { title: "Fake Executes", content: "Throw execute utility at one site, then rotate. Forces CT rotations. The key is selling the fake with proper utility count." },
    ],
  },
  {
    id: 6, title: "Communication & Callouts Guide", category: "communication", difficulty: "Beginner", readTime: "7 min", image: teamPhoto,
    description: "Effective communication wins more rounds than raw aim. Learn how to call.",
    sections: [
      { title: "Essential Callouts", content: "Always call: enemy position, number of enemies, weapon type, and HP if known. 'Two B tunnels, one AWP' is better than 'they're B'." },
      { title: "Death Calls", content: "When you die, give a quick call then stay quiet. Don't clutter comms. 'Died to AWP mid, one player' is enough." },
      { title: "Economy Calls", content: "IGL should call team economy decisions. 'Full buy', 'eco', or 'force' at round start. Discuss before freeze time ends." },
      { title: "Mid-round Calls", content: "Only the IGL should make mid-round calls. Others provide info. Avoid conflicting calls or backseat gaming." },
      { title: "Positive Comms", content: "Stay positive even when losing. 'Nice try', 'we got this next round' keeps morale up. Toxicity loses games." },
    ],
  },
  {
    id: 7, title: "Mental Game — Dealing With Tilt and Pressure", category: "mindset", difficulty: "Intermediate", readTime: "9 min", image: gamingChair,
    description: "The mental aspect of competitive CS is often overlooked but critical.",
    sections: [
      { title: "Recognizing Tilt", content: "Signs: rushing without thinking, overaggression, blaming teammates, checking stats mid-game. If you notice these, take a breath." },
      { title: "Reset Between Rounds", content: "Take a deep breath during freeze time. Remind yourself of the game plan. Don't dwell on the last round." },
      { title: "Dealing With Loss Streaks", content: "After 3 losses in a row, take a 15-30 minute break. Play aim trainers or watch demos. Don't queue while tilted." },
      { title: "Clutch Mentality", content: "In clutch situations: slow down, think about info you have, play time, use utility wisely. Panic is the enemy." },
      { title: "Pre-game Routine", content: "Warm up for 15-20 minutes before ranked. Set up your environment: water, comfy position, minimal distractions." },
    ],
  },
];

// -- Legend Anthem --
export interface Legend {
  id: number;
  nickname: string;
  realName: string;
  country: string;
  countryFlag: string;
  image: string;
  role: string;
  epithet: string;
  bio: string;
  achievements: { title: string; year: string }[];
  careerStats: { label: string; value: string }[];
  teams: { name: string; logo: string; period: string }[];
  quote: string;
}

export const legends: Legend[] = [
  {
    id: 1,
    nickname: "FalleN",
    realName: "Gabriel Toledo",
    country: "BR",
    countryFlag: flag.BR,
    image: playerPhoto.fallen,
    role: "AWPer / In-Game Leader",
    epithet: "The Professor",
    bio: "Gabriel \"FalleN\" Toledo is the godfather of Brazilian Counter-Strike. An AWPer, in-game leader, mentor, and visionary, FalleN didn't just play the game — he built an entire region's scene from the ground up. He founded Games Academy, mentored an entire generation of Brazilian talent, and led Luminosity/SK Gaming to back-to-back Major championships in 2016, making history as the first South American team to ever win a Major. Known as \"The Professor\" for his tactical genius and leadership, FalleN's legacy extends far beyond his trophies. He proved that greatness can come from anywhere.",
    achievements: [
      { title: "Major Champion — MLG Columbus 2016", year: "2016" },
      { title: "Major Champion — ESL One Cologne 2016", year: "2016" },
      { title: "Major MVP — MLG Columbus 2016", year: "2016" },
      { title: "Intel Grand Slam Season 1", year: "2017" },
      { title: "ESL One New York Champion", year: "2016" },
      { title: "ECS Season 1 Champion", year: "2016" },
      { title: "ESL Pro League Season 3 Champion", year: "2016" },
      { title: "ESL Pro League Season 4 Champion", year: "2016" },
      { title: "EPICENTER Champion", year: "2017" },
      { title: "DreamHack Masters Las Vegas Champion", year: "2017" },
      { title: "HLTV Top 20 Players — 6 appearances", year: "2015–2022" },
      { title: "Games Academy Founder", year: "2014" },
    ],
    careerStats: [
      { label: "Maps Played", value: "2,847" },
      { label: "Total Kills", value: "48,392" },
      { label: "Career Rating", value: "1.08" },
      { label: "Headshot %", value: "41.2%" },
      { label: "AWP Kills/Round", value: "0.28" },
      { label: "Opening Kills", value: "5,124" },
      { label: "Clutches Won", value: "487" },
      { label: "1v1 Win Rate", value: "58.3%" },
    ],
    teams: [
      { name: "Imperial", logo: logo.imperial, period: "2023 – Present" },
      { name: "Team Liquid", logo: logo.liquid, period: "2022 – 2023" },
      { name: "FURIA", logo: logo.furia, period: "2021 – 2022" },
      { name: "MiBR/SK Gaming/Luminosity", logo: logo.imperial, period: "2015 – 2020" },
    ],
    quote: "I don't play for myself. I play for every kid in Brazil who dreams of being a pro. I play for the region. That's what drives me.",
  },
];

// -- Player Profiles (detailed) --
export interface PlayerProfile {
  id: number;
  nickname: string;
  realName: string;
  age: number;
  country: string;
  countryFlag: string;
  image: string;
  team: string;
  teamLogo: string;
  role: string;
  rating2: number;
  dpr: number;
  kast: string;
  impact: number;
  adr: number;
  kd: string;
  hsPercent: string;
  mapsPlayed: number;
  totalKills: number;
  totalDeaths: number;
  roundsPlayed: number;
  clutchesWon: number;
  clutchesTotal: number;
  openingKills: number;
  openingDeaths: number;
  awpKillsRound: number;
  bestMaps: { map: string; rating: number; winRate: number; matches: number }[];
  weaponStats: { weapon: string; kills: number; hsPercent: string }[];
  recentMatches: { event: string; opponent: string; opponentLogo: string; result: string; rating: number; kills: number; deaths: number; map: string }[];
  teamHistory: { team: string; logo: string; period: string }[];
  achievements: string[];
  // Extended fields
  bio: string;
  teamSlug: string;
  region: string;
  majorWins: number;
  signatureWeapon: string;
  careerEarnings: string;
  peakRating: number;
  peakRatingDate: string;
  form: { month: string; rating: number }[];
  eventHistory: { event: string; tier: string; rating: number; maps: number; placement: string; date: string }[];
}

// -- Team Rosters (for Guess the Lineup game & Team pages) --
export interface TeamRoster {
  teamName: string;
  teamLogo: string;
  teamAbbr: string;
  players: string[];
}

export const teamRosters: TeamRoster[] = [
  { teamName: "Team Spirit", teamLogo: logo.spirit, teamAbbr: "Spirit", players: ["donk", "sh1ro", "magixx", "zont1x", "tN1R"] },
  { teamName: "Vitality", teamLogo: logo.vitality, teamAbbr: "VIT", players: ["ZywOo", "ropz", "flameZ", "apEX", "mezii"] },
  { teamName: "G2 Esports", teamLogo: logo.g2, teamAbbr: "G2", players: ["huNter-", "NertZ", "SunPayus", "HeavyGod", "MATYS"] },
  { teamName: "FaZe Clan", teamLogo: logo.faze, teamAbbr: "FaZe", players: ["karrigan", "frozen", "Twistzz", "broky", "jcobbb"] },
  { teamName: "Natus Vincere", teamLogo: logo.navi, teamAbbr: "NAVI", players: ["Aleksib", "iM", "b1t", "w0nderful", "makazze"] },
  { teamName: "MOUZ", teamLogo: logo.mouz, teamAbbr: "MOUZ", players: ["torzsi", "Spinx", "jL", "xertioN", "xelex"] },
  { teamName: "FURIA", teamLogo: logo.furia, teamAbbr: "FURIA", players: ["FalleN", "yuurih", "YEKINDAR", "KSCERATO", "molodoy"] },
  { teamName: "Team Liquid", teamLogo: logo.liquid, teamAbbr: "TL", players: ["NAF", "EliGE", "malbsMd", "siuhy", "ultimate"] },
  { teamName: "Heroic", teamLogo: logo.heroic, teamAbbr: "Heroic", players: ["TeSeS", "sjuush", "stavn", "jabbi", "kyxsan"] },
  { teamName: "Astralis", teamLogo: logo.astralis, teamAbbr: "Astralis", players: ["device", "blameF", "Buzz", "br0", "Staehr"] },
];

// -- Map Callout Quiz Data (for Map Guesser game) --
export interface MapCalloutQuiz {
  callout: string;
  description: string;
  correctMap: string;
  difficulty: "easy" | "medium" | "hard";
}

export const mapCalloutQuizzes: MapCalloutQuiz[] = [
  { callout: "Tetris", description: "A boxy structure near A site used for cover during retakes", correctMap: "mirage", difficulty: "easy" },
  { callout: "Banana", description: "A curved, narrow path leading to the B bombsite", correctMap: "inferno", difficulty: "easy" },
  { callout: "Xbox", description: "A cross-shaped shadow area in the middle of the map, near mid doors", correctMap: "dust2", difficulty: "easy" },
  { callout: "Palace", description: "A decorated indoor area leading to the A bombsite with ornate walls", correctMap: "mirage", difficulty: "easy" },
  { callout: "Pit", description: "A sunken area below A site often held by an AWPer, in an Italian village", correctMap: "inferno", difficulty: "easy" },
  { callout: "Jungle", description: "A vegetated area near A site connecting to the connector area", correctMap: "mirage", difficulty: "medium" },
  { callout: "Squeaky", description: "A distinctive door that makes noise when opened, leading to A site in a nuclear facility", correctMap: "nuke", difficulty: "medium" },
  { callout: "Donut", description: "A circular connection area near A site in ancient Aztec ruins", correctMap: "ancient", difficulty: "medium" },
  { callout: "Canal", description: "A water-filled passage on an Egyptian-themed map, used for rotations", correctMap: "anubis", difficulty: "medium" },
  { callout: "Scaffolding", description: "Metal construction platforms high up on a skyscraper map", correctMap: "vertigo", difficulty: "medium" },
  { callout: "Heaven", description: "An elevated position overlooking the B site inside a nuclear power plant", correctMap: "nuke", difficulty: "medium" },
  { callout: "Vineyards", description: "An open area with grape vines on an Italian town map, newly added to the pool", correctMap: "tuscan", difficulty: "hard" },
  { callout: "Goose", description: "A small corner on A site with a graffiti of a goose on the wall, on the most iconic map", correctMap: "dust2", difficulty: "medium" },
  { callout: "Coffins", description: "Stone burial boxes used as cover on the B bombsite, Italian village map", correctMap: "inferno", difficulty: "easy" },
  { callout: "Ticket", description: "A booth area near A site with a small enclosed space for cover", correctMap: "mirage", difficulty: "medium" },
  { callout: "Window", description: "A room overlooking mid from the CT side on a Moroccan-themed map", correctMap: "mirage", difficulty: "easy" },
  { callout: "Decon", description: "A decontamination chamber used for rotations between sites", correctMap: "nuke", difficulty: "hard" },
  { callout: "Jaguar", description: "A statue-like position near one of the bombsites in ancient ruins", correctMap: "ancient", difficulty: "hard" },
  { callout: "Church", description: "A religious building that provides cover near one of the bombsites in an Italian town", correctMap: "tuscan", difficulty: "hard" },
  { callout: "Silo", description: "A tall cylindrical structure outside a nuclear power plant used for boosting", correctMap: "nuke", difficulty: "medium" },
  { callout: "Underpass", description: "A tunnel beneath the mid area connecting T side to B short", correctMap: "mirage", difficulty: "easy" },
  { callout: "Secret", description: "A hidden passage inside a nuclear facility used for sneaky B takes", correctMap: "nuke", difficulty: "hard" },
  { callout: "Ruins", description: "Crumbling stone structures near B site on an Egyptian-themed map", correctMap: "anubis", difficulty: "medium" },
  { callout: "Graveyard", description: "An area with tombstones near A site in an Italian village", correctMap: "inferno", difficulty: "easy" },
  { callout: "Elbow", description: "A sharp turn in the path connecting mid to A site in Aztec ruins", correctMap: "ancient", difficulty: "medium" },
  { callout: "Catwalk", description: "An elevated walkway connecting A short to A site on the most famous map", correctMap: "dust2", difficulty: "easy" },
  { callout: "Boat", description: "A watercraft near one of the connection areas on an Egyptian map", correctMap: "anubis", difficulty: "hard" },
  { callout: "Fountain", description: "A decorative water feature in the center of an Italian town map", correctMap: "tuscan", difficulty: "medium" },
  { callout: "Generator", description: "Industrial equipment providing cover on a bombsite atop a skyscraper", correctMap: "vertigo", difficulty: "hard" },
  { callout: "Library", description: "A room with bookshelves near A site in an Italian village map", correctMap: "inferno", difficulty: "medium" },
  { callout: "Trophy", description: "A room inside a nuclear facility with display cases", correctMap: "nuke", difficulty: "hard" },
  { callout: "Olive", description: "Trees near one of the sites on a newly competitive Italian map", correctMap: "tuscan", difficulty: "hard" },
  { callout: "Red Room", description: "A distinctly colored room used for rotations in ancient ruins", correctMap: "ancient", difficulty: "hard" },
  { callout: "Van", description: "A vehicle providing cover on B site, Moroccan-themed map", correctMap: "mirage", difficulty: "easy" },
  { callout: "Bridge", description: "A crossing structure over a water canal on an Egyptian map", correctMap: "anubis", difficulty: "easy" },
];

// -- Team Profiles (for /teams/[id] pages) --
export interface TeamProfile {
  id: string;
  name: string;
  abbr: string;
  color: string;
  logo: string;
  region: string;
  country: string;
  countryFlag: string;
  founded: string;
  coach: { nickname: string; realName: string; country: string; countryFlag: string };
  worldRanking: number;
  rankingPoints: number;
  peakRanking: number;
  peakRankingDate: string;
  weeksInTop5: number;
  weeksInTop10: number;
  roster: { playerId: number; nickname: string; realName: string; country: string; countryFlag: string; image: string; role: string; joinDate: string; rating: number; isCaptain?: boolean }[];
  mapStats: { map: string; played: number; wins: number; winRate: number; ctWinRate: number; tWinRate: number }[];
  recentMatches: { opponent: string; opponentLogo: string; score: string; result: "W" | "L"; event: string; date: string; format: string }[];
  achievements: { event: string; placement: string; tier: "S" | "A" | "B"; date: string; prize?: string }[];
  transfers: { player: string; direction: "in" | "out"; fromTeam?: string; toTeam?: string; date: string }[];
  headToHead: { opponent: string; opponentLogo: string; wins: number; losses: number }[];
  totalMapsPlayed: number;
  overallWinRate: number;
  last10Results: ("W" | "L")[];
  majorsWon: number;
  totalPrizeEarnings: string;
}

export const teamProfiles: TeamProfile[] = [
  {
    id: "navi", name: "Natus Vincere", abbr: "NAVI", color: "#fbbf24", logo: logo.navi,
    region: "Europe", country: "UA", countryFlag: flag.UA, founded: "2009",
    coach: { nickname: "B1ad3", realName: "Andrey Gorodenskiy", country: "UA", countryFlag: flag.UA },
    worldRanking: 2, rankingPoints: 934, peakRanking: 1, peakRankingDate: "Oct 2021",
    weeksInTop5: 245, weeksInTop10: 380,
    roster: [
      { playerId: 6, nickname: "b1t", realName: "Valeriy Vakhovskiy", country: "UA", countryFlag: flag.UA, image: playerPhoto.b1t, role: "Rifler", joinDate: "Feb 2021", rating: 1.12 },
      { playerId: 0, nickname: "Aleksib", realName: "Aleksi Virolainen", country: "FI", countryFlag: "🇫🇮", image: playerPhoto.aleksib, role: "IGL", joinDate: "Jun 2023", rating: 0.90, isCaptain: true },
      { playerId: 0, nickname: "iM", realName: "Mihai Ivan", country: "RO", countryFlag: "🇷🇴", image: playerPhoto.im, role: "Rifler", joinDate: "Jun 2023", rating: 1.01 },
      { playerId: 0, nickname: "w0nderful", realName: "Ihor Zhdanov", country: "UA", countryFlag: flag.UA, image: playerPhoto.w0nderful, role: "AWPer", joinDate: "Nov 2023", rating: 1.10 },
      { playerId: 0, nickname: "makazze", realName: "Drin Shaqiri", country: "XK", countryFlag: "🇽🇰", image: playerPhoto.makazze, role: "Rifler", joinDate: "Jun 2025", rating: 1.18 },
    ],
    mapStats: [
      { map: "Mirage", played: 89, wins: 66, winRate: 74.2, ctWinRate: 55.8, tWinRate: 44.2 },
      { map: "Inferno", played: 82, wins: 59, winRate: 72.0, ctWinRate: 56.3, tWinRate: 43.7 },
      { map: "Nuke", played: 65, wins: 48, winRate: 73.8, ctWinRate: 60.2, tWinRate: 39.8 },
      { map: "Anubis", played: 54, wins: 36, winRate: 66.7, ctWinRate: 54.1, tWinRate: 45.9 },
      { map: "Dust II", played: 48, wins: 32, winRate: 66.7, ctWinRate: 52.0, tWinRate: 48.0 },
      { map: "Ancient", played: 41, wins: 27, winRate: 65.9, ctWinRate: 57.5, tWinRate: 42.5 },
    ],
    recentMatches: [
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "13-11", result: "W", event: "IEM Katowice 2026", date: "Mar 5", format: "BO3" },
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "2-1", result: "W", event: "IEM Katowice 2026", date: "Mar 4", format: "BO3" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "1-2", result: "L", event: "BLAST Premier", date: "Mar 1", format: "BO3" },
      { opponent: "Team Spirit", opponentLogo: logo.spirit, score: "2-0", result: "W", event: "IEM Katowice 2026", date: "Feb 28", format: "BO3" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "16-12", result: "W", event: "BLAST Premier", date: "Feb 25", format: "BO1" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "2-1", result: "W", event: "BLAST Premier", date: "Feb 22", format: "BO3" },
      { opponent: "Astralis", opponentLogo: logo.astralis, score: "16-9", result: "W", event: "ESL Pro League", date: "Feb 19", format: "BO1" },
      { opponent: "Heroic", opponentLogo: logo.heroic, score: "0-2", result: "L", event: "ESL Pro League", date: "Feb 16", format: "BO3" },
    ],
    achievements: [
      { event: "IEM Katowice 2026", placement: "1st", tier: "S", date: "Mar 2026", prize: "$400,000" },
      { event: "PGL Major Copenhagen 2024", placement: "2nd", tier: "S", date: "May 2024" },
      { event: "PGL Major Stockholm 2021", placement: "1st", tier: "S", date: "Nov 2021", prize: "$500,000" },
      { event: "Intel Grand Slam S1", placement: "1st", tier: "S", date: "2021", prize: "$1,000,000" },
      { event: "IEM Cologne 2021", placement: "1st", tier: "S", date: "Jul 2021", prize: "$400,000" },
      { event: "BLAST Premier World Final 2021", placement: "1st", tier: "S", date: "Dec 2021", prize: "$500,000" },
    ],
    transfers: [
      { player: "Aleksib", direction: "in", fromTeam: "Ninjas in Pyjamas", date: "Jun 2023" },
      { player: "w0nderful", direction: "in", fromTeam: "Spirit", date: "Nov 2023" },
      { player: "makazze", direction: "in", fromTeam: "NAVI Junior", date: "Jun 2025" },
      { player: "jL", direction: "out", toTeam: "MOUZ", date: "Apr 2026" },
    ],
    headToHead: [
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 18, losses: 14 },
      { opponent: "Vitality", opponentLogo: logo.vitality, wins: 15, losses: 16 },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, wins: 20, losses: 12 },
      { opponent: "Team Spirit", opponentLogo: logo.spirit, wins: 12, losses: 8 },
      { opponent: "MOUZ", opponentLogo: logo.mouz, wins: 9, losses: 5 },
    ],
    totalMapsPlayed: 432, overallWinRate: 68.5, last10Results: ["W","W","L","W","W","W","W","L","W","W"],
    majorsWon: 2, totalPrizeEarnings: "$18,450,000",
  },
  {
    id: "g2", name: "G2 Esports", abbr: "G2", color: "#c084fc", logo: logo.g2,
    region: "Europe", country: "DE", countryFlag: "🇩🇪", founded: "2013",
    coach: { nickname: "sAw", realName: "Eetu Saha", country: "FI", countryFlag: "🇫🇮" },
    worldRanking: 12, rankingPoints: 548, peakRanking: 1, peakRankingDate: "Sep 2023",
    weeksInTop5: 120, weeksInTop10: 210,
    roster: [
      { playerId: 10, nickname: "huNter-", realName: "Nemanja Kovac", country: "BA", countryFlag: flag.BA, image: playerPhoto.hunter, role: "IGL / Rifler", joinDate: "Jan 2021", rating: 1.10, isCaptain: true },
      { playerId: 0, nickname: "NertZ", realName: "Guy Iluz", country: "IL", countryFlag: flag.IL, image: playerPhoto.nertz, role: "Rifler", joinDate: "Mar 2026", rating: 1.12 },
      { playerId: 0, nickname: "SunPayus", realName: "Álvaro García", country: "ES", countryFlag: "🇪🇸", image: playerPhoto.sunpayus, role: "AWPer", joinDate: "Jul 2025", rating: 1.05 },
      { playerId: 0, nickname: "HeavyGod", realName: "Nikita Martynenko", country: "IL", countryFlag: flag.IL, image: playerPhoto.heavygod, role: "Rifler", joinDate: "Jan 2025", rating: 1.15 },
      { playerId: 0, nickname: "MATYS", realName: "Matúš Šimko", country: "SK", countryFlag: flag.SK, image: playerPhoto.matys, role: "Entry Fragger", joinDate: "Jul 2025", rating: 1.14 },
    ],
    mapStats: [
      { map: "Dust II", played: 76, wins: 55, winRate: 72.4, ctWinRate: 51.8, tWinRate: 48.2 },
      { map: "Mirage", played: 71, wins: 49, winRate: 69.0, ctWinRate: 53.2, tWinRate: 46.8 },
      { map: "Anubis", played: 58, wins: 40, winRate: 69.0, ctWinRate: 55.0, tWinRate: 45.0 },
      { map: "Tuscan", played: 32, wins: 23, winRate: 71.9, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Inferno", played: 65, wins: 42, winRate: 64.6, ctWinRate: 54.8, tWinRate: 45.2 },
      { map: "Ancient", played: 40, wins: 24, winRate: 60.0, ctWinRate: 56.0, tWinRate: 44.0 },
    ],
    recentMatches: [
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "7-10", result: "L", event: "BLAST Premier", date: "Mar 5", format: "BO1" },
      { opponent: "Astralis", opponentLogo: logo.astralis, score: "2-0", result: "W", event: "IEM Katowice 2026", date: "Mar 3", format: "BO3" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "12-16", result: "L", event: "BLAST Premier", date: "Feb 25", format: "BO1" },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "2-1", result: "W", event: "ESL Pro League", date: "Feb 22", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-11", result: "W", event: "ESL Pro League", date: "Feb 19", format: "BO1" },
      { opponent: "Spirit", opponentLogo: logo.spirit, score: "1-2", result: "L", event: "BLAST Premier", date: "Feb 16", format: "BO3" },
    ],
    achievements: [
      { event: "BLAST Premier World Final 2024", placement: "1st", tier: "S", date: "Dec 2024", prize: "$500,000" },
      { event: "IEM Katowice 2022", placement: "3rd-4th", tier: "S", date: "Feb 2022" },
      { event: "BLAST Premier Spring Final 2023", placement: "1st", tier: "S", date: "Jun 2023", prize: "$200,000" },
      { event: "IEM Cologne 2023", placement: "2nd", tier: "S", date: "Aug 2023" },
    ],
    transfers: [
      { player: "HeavyGod", direction: "in", fromTeam: "Cloud9", date: "Jan 2025" },
      { player: "SunPayus", direction: "in", fromTeam: "HEROIC", date: "Jul 2025" },
      { player: "MATYS", direction: "in", fromTeam: "fnatic", date: "Jul 2025" },
      { player: "NertZ", direction: "in", fromTeam: "Liquid", date: "Mar 2026" },
    ],
    headToHead: [
      { opponent: "NAVI", opponentLogo: logo.navi, wins: 14, losses: 18 },
      { opponent: "Vitality", opponentLogo: logo.vitality, wins: 12, losses: 13 },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, wins: 16, losses: 11 },
      { opponent: "Team Spirit", opponentLogo: logo.spirit, wins: 8, losses: 10 },
      { opponent: "MOUZ", opponentLogo: logo.mouz, wins: 11, losses: 7 },
    ],
    totalMapsPlayed: 398, overallWinRate: 66.8, last10Results: ["L","W","L","W","W","L","W","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$9,850,000",
  },
  {
    id: "vitality", name: "Vitality", abbr: "VIT", color: "#fcd34d", logo: logo.vitality,
    region: "Europe", country: "FR", countryFlag: flag.FR, founded: "2018",
    coach: { nickname: "XTQZZZ", realName: "Remy Quoniam", country: "FR", countryFlag: flag.FR },
    worldRanking: 1, rankingPoints: 1000, peakRanking: 1, peakRankingDate: "May 2026",
    weeksInTop5: 140, weeksInTop10: 220,
    roster: [
      { playerId: 2, nickname: "ZywOo", realName: "Mathieu Herbaut", country: "FR", countryFlag: flag.FR, image: playerPhoto.zywoo, role: "AWPer", joinDate: "Oct 2019", rating: 1.31 },
      { playerId: 5, nickname: "ropz", realName: "Robin Kool", country: "EE", countryFlag: flag.EE, image: playerPhoto.ropz, role: "Lurker", joinDate: "Jan 2025", rating: 1.16 },
      { playerId: 0, nickname: "flameZ", realName: "Shahar Shushan", country: "IL", countryFlag: flag.IL, image: playerPhoto.flamez, role: "Entry Fragger", joinDate: "Sep 2022", rating: 1.12 },
      { playerId: 0, nickname: "apEX", realName: "Dan Madesclaire", country: "FR", countryFlag: flag.FR, image: playerPhoto.apex, role: "IGL", joinDate: "Oct 2018", rating: 0.95, isCaptain: true },
      { playerId: 0, nickname: "mezii", realName: "William Merriman", country: "GB", countryFlag: "🇬🇧", image: playerPhoto.mezii, role: "Support", joinDate: "Jun 2023", rating: 1.05 },
    ],
    mapStats: [
      { map: "Inferno", played: 94, wins: 72, winRate: 76.6, ctWinRate: 57.2, tWinRate: 42.8 },
      { map: "Ancient", played: 68, wins: 52, winRate: 76.5, ctWinRate: 58.3, tWinRate: 41.7 },
      { map: "Mirage", played: 72, wins: 47, winRate: 65.3, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Nuke", played: 55, wins: 37, winRate: 67.3, ctWinRate: 59.5, tWinRate: 40.5 },
      { map: "Anubis", played: 45, wins: 28, winRate: 62.2, ctWinRate: 55.0, tWinRate: 45.0 },
    ],
    recentMatches: [
      { opponent: "Team Spirit", opponentLogo: logo.spirit, score: "16-9", result: "W", event: "IEM Katowice 2026", date: "Mar 5", format: "BO3" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "2-1", result: "W", event: "BLAST Premier", date: "Mar 1", format: "BO3" },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "2-0", result: "W", event: "IEM Katowice 2026", date: "Feb 28", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-13", result: "W", event: "ESL Pro League", date: "Feb 24", format: "BO1" },
      { opponent: "Heroic", opponentLogo: logo.heroic, score: "1-2", result: "L", event: "ESL Pro League", date: "Feb 21", format: "BO3" },
    ],
    achievements: [
      { event: "PGL Major Copenhagen 2024", placement: "1st", tier: "S", date: "May 2024", prize: "$500,000" },
      { event: "BLAST Premier World Final 2023", placement: "1st", tier: "S", date: "Dec 2023", prize: "$500,000" },
      { event: "IEM Cologne 2023", placement: "1st", tier: "S", date: "Aug 2023", prize: "$400,000" },
      { event: "BLAST Premier Spring Final 2024", placement: "2nd", tier: "S", date: "Jun 2024" },
    ],
    transfers: [
      { player: "mezii", direction: "in", fromTeam: "Cloud9", date: "Jun 2023" },
      { player: "ropz", direction: "in", fromTeam: "FaZe", date: "Jan 2025" },
      { player: "Spinx", direction: "out", toTeam: "MOUZ", date: "Jan 2025" },
      { player: "flameZ", direction: "in", fromTeam: "OG", date: "Jun 2023" },
    ],
    headToHead: [
      { opponent: "NAVI", opponentLogo: logo.navi, wins: 16, losses: 15 },
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 13, losses: 12 },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, wins: 14, losses: 10 },
      { opponent: "Team Spirit", opponentLogo: logo.spirit, wins: 10, losses: 7 },
    ],
    totalMapsPlayed: 410, overallWinRate: 69.3, last10Results: ["W","W","W","W","L","W","W","L","W","W"],
    majorsWon: 1, totalPrizeEarnings: "$12,300,000",
  },
  {
    id: "faze", name: "FaZe Clan", abbr: "FaZe", color: "#ef4444", logo: logo.faze,
    region: "Europe", country: "EU", countryFlag: "🇪🇺", founded: "2010",
    coach: { nickname: "enkay J", realName: "Niclas Krumhorn", country: "DE", countryFlag: "🇩🇪" },
    worldRanking: 13, rankingPoints: 492, peakRanking: 1, peakRankingDate: "May 2022",
    weeksInTop5: 165, weeksInTop10: 280,
    roster: [
      { playerId: 11, nickname: "broky", realName: "Helvijs Saukants", country: "LV", countryFlag: flag.LV, image: playerPhoto.broky, role: "AWPer", joinDate: "Oct 2019", rating: 1.13 },
      { playerId: 9, nickname: "frozen", realName: "David Cernansky", country: "SK", countryFlag: flag.SK, image: playerPhoto.frozen, role: "Rifler", joinDate: "Jan 2024", rating: 1.15 },
      { playerId: 0, nickname: "Twistzz", realName: "Russel Van Dulken", country: "CA", countryFlag: "🇨🇦", image: playerPhoto.twistzz, role: "Rifler", joinDate: "Sep 2025", rating: 1.14 },
      { playerId: 0, nickname: "jcobbb", realName: "Jakub Pietruszewski", country: "PL", countryFlag: "🇵🇱", image: playerPhoto.jcobbb, role: "Entry Fragger", joinDate: "Aug 2025", rating: 0.96 },
      { playerId: 0, nickname: "karrigan", realName: "Finn Andersen", country: "DK", countryFlag: "🇩🇰", image: playerPhoto.karrigan, role: "IGL", joinDate: "Dec 2021", rating: 0.92, isCaptain: true },
    ],
    mapStats: [
      { map: "Mirage", played: 85, wins: 61, winRate: 71.8, ctWinRate: 53.5, tWinRate: 46.5 },
      { map: "Ancient", played: 62, wins: 45, winRate: 72.6, ctWinRate: 56.8, tWinRate: 43.2 },
      { map: "Nuke", played: 58, wins: 41, winRate: 70.7, ctWinRate: 59.0, tWinRate: 41.0 },
      { map: "Dust II", played: 55, wins: 38, winRate: 69.1, ctWinRate: 51.5, tWinRate: 48.5 },
      { map: "Inferno", played: 70, wins: 45, winRate: 64.3, ctWinRate: 55.2, tWinRate: 44.8 },
    ],
    recentMatches: [
      { opponent: "NAVI", opponentLogo: logo.navi, score: "11-13", result: "L", event: "IEM Katowice 2026", date: "Mar 5", format: "BO3" },
      { opponent: "Heroic", opponentLogo: logo.heroic, score: "2-0", result: "W", event: "IEM Katowice 2026", date: "Mar 2", format: "BO3" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "1-2", result: "L", event: "ESL Pro League", date: "Feb 22", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-14", result: "W", event: "BLAST Premier", date: "Feb 19", format: "BO1" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "0-2", result: "L", event: "IEM Katowice 2026", date: "Feb 28", format: "BO3" },
    ],
    achievements: [
      { event: "PGL Major Antwerp 2022", placement: "1st", tier: "S", date: "May 2022", prize: "$500,000" },
      { event: "IEM Katowice 2022", placement: "1st", tier: "S", date: "Feb 2022", prize: "$400,000" },
      { event: "IEM Cologne 2022", placement: "2nd", tier: "S", date: "Jul 2022" },
      { event: "ESL Pro League S15", placement: "1st", tier: "A", date: "Apr 2022", prize: "$175,000" },
    ],
    transfers: [
      { player: "frozen", direction: "in", fromTeam: "MOUZ", date: "Jan 2024" },
      { player: "Twistzz", direction: "in", fromTeam: "Liquid", date: "Sep 2025" },
      { player: "jcobbb", direction: "in", fromTeam: "Betclic", date: "Aug 2025" },
      { player: "ropz", direction: "out", toTeam: "Vitality", date: "Jan 2025" },
    ],
    headToHead: [
      { opponent: "NAVI", opponentLogo: logo.navi, wins: 12, losses: 20 },
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 11, losses: 16 },
      { opponent: "Vitality", opponentLogo: logo.vitality, wins: 10, losses: 14 },
      { opponent: "Team Spirit", opponentLogo: logo.spirit, wins: 9, losses: 6 },
    ],
    totalMapsPlayed: 415, overallWinRate: 65.1, last10Results: ["L","W","L","W","L","W","W","L","W","W"],
    majorsWon: 1, totalPrizeEarnings: "$15,200,000",
  },
  {
    id: "spirit", name: "Team Spirit", abbr: "Spirit", color: "#34d399", logo: logo.spirit,
    region: "Europe", country: "RU", countryFlag: flag.RU, founded: "2015",
    coach: { nickname: "hally", realName: "Ilya Oleynik", country: "RU", countryFlag: flag.RU },
    worldRanking: 6, rankingPoints: 731, peakRanking: 1, peakRankingDate: "Dec 2024",
    weeksInTop5: 45, weeksInTop10: 85,
    roster: [
      { playerId: 1, nickname: "donk", realName: "Danil Kryshkovets", country: "RU", countryFlag: flag.RU, image: playerPhoto.donk, role: "Rifler", joinDate: "Jun 2023", rating: 1.39 },
      { playerId: 13, nickname: "sh1ro", realName: "Dmitry Sokolov", country: "RU", countryFlag: flag.RU, image: playerPhoto.sh1ro, role: "AWPer", joinDate: "Dec 2023", rating: 1.18 },
      { playerId: 0, nickname: "magixx", realName: "Boris Vorobiev", country: "RU", countryFlag: flag.RU, image: playerPhoto.magixx, role: "Rifler", joinDate: "Jan 2021", rating: 1.05 },
      { playerId: 0, nickname: "zont1x", realName: "Myroslav Plakhotia", country: "UA", countryFlag: "🇺🇦", image: playerPhoto.zont1x, role: "Rifler", joinDate: "Jun 2023", rating: 1.09 },
      { playerId: 0, nickname: "tN1R", realName: "Andrey Tatarinovich", country: "BY", countryFlag: "🇧🇾", image: playerPhoto.tn1r, role: "Rifler", joinDate: "Sep 2025", rating: 1.02 },
    ],
    mapStats: [
      { map: "Anubis", played: 72, wins: 53, winRate: 73.6, ctWinRate: 56.0, tWinRate: 44.0 },
      { map: "Mirage", played: 65, wins: 44, winRate: 67.7, ctWinRate: 53.5, tWinRate: 46.5 },
      { map: "Nuke", played: 48, wins: 33, winRate: 68.8, ctWinRate: 58.0, tWinRate: 42.0 },
      { map: "Inferno", played: 55, wins: 35, winRate: 63.6, ctWinRate: 54.5, tWinRate: 45.5 },
      { map: "Dust II", played: 38, wins: 22, winRate: 57.9, ctWinRate: 50.8, tWinRate: 49.2 },
    ],
    recentMatches: [
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "9-16", result: "L", event: "IEM Katowice 2026", date: "Mar 5", format: "BO3" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "0-2", result: "L", event: "IEM Katowice 2026", date: "Feb 28", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-12", result: "W", event: "IEM Katowice 2026", date: "Feb 26", format: "BO1" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "2-1", result: "W", event: "BLAST Premier", date: "Feb 16", format: "BO3" },
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "2-0", result: "W", event: "BLAST Premier", date: "Feb 13", format: "BO3" },
    ],
    achievements: [
      { event: "BLAST Premier 2025 Champion", placement: "1st", tier: "S", date: "Dec 2025", prize: "$500,000" },
      { event: "IEM Katowice 2026", placement: "3rd-4th", tier: "S", date: "Mar 2026" },
      { event: "ESL Pro League S20", placement: "2nd", tier: "A", date: "Oct 2025" },
    ],
    transfers: [
      { player: "tN1R", direction: "in", fromTeam: "HEROIC", date: "Sep 2025" },
      { player: "chopper", direction: "out", toTeam: "Bench", date: "Dec 2025" },
      { player: "magixx", direction: "in", fromTeam: "Bench", date: "Dec 2025" },
    ],
    headToHead: [
      { opponent: "NAVI", opponentLogo: logo.navi, wins: 8, losses: 12 },
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 10, losses: 8 },
      { opponent: "Vitality", opponentLogo: logo.vitality, wins: 7, losses: 10 },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, wins: 6, losses: 9 },
    ],
    totalMapsPlayed: 320, overallWinRate: 64.4, last10Results: ["L","L","W","W","W","W","L","W","W","L"],
    majorsWon: 0, totalPrizeEarnings: "$4,850,000",
  },
  {
    id: "mouz", name: "MOUZ", abbr: "MOUZ", color: "#2dd4bf", logo: logo.mouz,
    region: "Europe", country: "DE", countryFlag: "🇩🇪", founded: "2002",
    coach: { nickname: "sycrone", realName: "Dennis Nielsen", country: "DK", countryFlag: "🇩🇰" },
    worldRanking: 11, rankingPoints: 575, peakRanking: 2, peakRankingDate: "2024",
    weeksInTop5: 30, weeksInTop10: 68,
    roster: [
      { playerId: 0, nickname: "torzsi", realName: "Adam Torzsas", country: "HU", countryFlag: "🇭🇺", image: playerPhoto.torzsi, role: "AWPer", joinDate: "Jan 2022", rating: 1.12 },
      { playerId: 0, nickname: "Spinx", realName: "Lotan Giladi", country: "IL", countryFlag: flag.IL, image: playerPhoto.spinx, role: "Rifler", joinDate: "Jan 2025", rating: 1.11 },
      { playerId: 7, nickname: "jL", realName: "Justinas Lekavicius", country: "LT", countryFlag: flag.LT, image: playerPhoto.jl, role: "Rifler", joinDate: "Apr 2026", rating: 1.11 },
      { playerId: 0, nickname: "xertioN", realName: "Dorian Berman", country: "IL", countryFlag: flag.IL, image: playerPhoto.xertion, role: "Entry Fragger", joinDate: "Sep 2022", rating: 1.12 },
      { playerId: 0, nickname: "xelex", realName: "Adrian Vincze", country: "HU", countryFlag: "🇭🇺", image: playerPhoto.xelex, role: "Rifler", joinDate: "Apr 2026", rating: 1.16 },
    ],
    mapStats: [
      { map: "Anubis", played: 60, wins: 42, winRate: 70.0, ctWinRate: 55.5, tWinRate: 44.5 },
      { map: "Tuscan", played: 28, wins: 19, winRate: 67.9, ctWinRate: 52.0, tWinRate: 48.0 },
      { map: "Dust II", played: 52, wins: 34, winRate: 65.4, ctWinRate: 51.0, tWinRate: 49.0 },
      { map: "Mirage", played: 48, wins: 30, winRate: 62.5, ctWinRate: 53.0, tWinRate: 47.0 },
      { map: "Inferno", played: 44, wins: 26, winRate: 59.1, ctWinRate: 54.0, tWinRate: 46.0 },
    ],
    recentMatches: [
      { opponent: "Spirit", opponentLogo: logo.spirit, score: "12-16", result: "L", event: "IEM Katowice 2026", date: "Feb 26", format: "BO1" },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "14-16", result: "L", event: "BLAST Premier", date: "Feb 19", format: "BO1" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "11-16", result: "L", event: "ESL Pro League", date: "Feb 19", format: "BO1" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "1-2", result: "L", event: "BLAST Premier", date: "Feb 22", format: "BO3" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "13-16", result: "L", event: "ESL Pro League", date: "Feb 24", format: "BO1" },
    ],
    achievements: [
      { event: "ESL Pro League S19", placement: "1st", tier: "A", date: "Apr 2024", prize: "$175,000" },
      { event: "IEM Cologne 2024", placement: "2nd", tier: "S", date: "Aug 2024" },
      { event: "IEM Dallas 2024", placement: "1st", tier: "A", date: "Jun 2024", prize: "$100,000" },
    ],
    transfers: [
      { player: "Spinx", direction: "in", fromTeam: "Vitality", date: "Jan 2025" },
      { player: "jL", direction: "in", fromTeam: "NAVI", date: "Apr 2026" },
      { player: "xelex", direction: "in", fromTeam: "MOUZ NXT", date: "Apr 2026" },
      { player: "Brollan", direction: "out", toTeam: "Bench", date: "Apr 2026" },
    ],
    headToHead: [
      { opponent: "NAVI", opponentLogo: logo.navi, wins: 5, losses: 9 },
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 7, losses: 11 },
      { opponent: "Vitality", opponentLogo: logo.vitality, wins: 6, losses: 8 },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, wins: 8, losses: 7 },
    ],
    totalMapsPlayed: 290, overallWinRate: 62.1, last10Results: ["L","L","L","L","L","W","W","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$3,450,000",
  },
  {
    id: "liquid", name: "Team Liquid", abbr: "TL", color: "#38bdf8", logo: logo.liquid,
    region: "Americas", country: "US", countryFlag: "🇺🇸", founded: "2000",
    coach: { nickname: "flashie", realName: "Viktor Tamás Bea", country: "HU", countryFlag: "🇭🇺" },
    worldRanking: 25, rankingPoints: 341, peakRanking: 1, peakRankingDate: "Jul 2019",
    weeksInTop5: 95, weeksInTop10: 200,
    roster: [
      { playerId: 0, nickname: "NAF", realName: "Keith Markovic", country: "CA", countryFlag: "🇨🇦", image: playerPhoto.naf, role: "Rifler", joinDate: "Jan 2018", rating: 1.10 },
      { playerId: 0, nickname: "EliGE", realName: "Jonathan Jablonowski", country: "US", countryFlag: "🇺🇸", image: playerPhoto.elige, role: "Rifler", joinDate: "Sep 2025", rating: 1.12 },
      { playerId: 0, nickname: "malbsMd", realName: "Mario Samayoa", country: "GT", countryFlag: "🇬🇹", image: playerPhoto.malbsmd, role: "Entry Fragger", joinDate: "Mar 2026", rating: 1.02 },
      { playerId: 0, nickname: "siuhy", realName: "Kamil Szkaradek", country: "PL", countryFlag: "🇵🇱", image: playerPhoto.siuhy, role: "IGL", joinDate: "Jan 2025", rating: 0.99, isCaptain: true },
      { playerId: 0, nickname: "ultimate", realName: "Roland Tomkowiak", country: "PL", countryFlag: "🇵🇱", image: playerPhoto.ultimate, role: "AWPer", joinDate: "Jul 2024", rating: 1.00 },
    ],
    mapStats: [
      { map: "Inferno", played: 70, wins: 47, winRate: 67.1, ctWinRate: 55.0, tWinRate: 45.0 },
      { map: "Mirage", played: 62, wins: 40, winRate: 64.5, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Nuke", played: 50, wins: 33, winRate: 66.0, ctWinRate: 58.0, tWinRate: 42.0 },
      { map: "Dust II", played: 45, wins: 28, winRate: 62.2, ctWinRate: 51.0, tWinRate: 49.0 },
      { map: "Anubis", played: 38, wins: 22, winRate: 57.9, ctWinRate: 54.0, tWinRate: 46.0 },
    ],
    recentMatches: [
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "10-7", result: "W", event: "BLAST Premier", date: "Mar 5", format: "BO1" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "1-2", result: "L", event: "IEM Katowice 2026", date: "Mar 4", format: "BO3" },
      { opponent: "Spirit", opponentLogo: logo.spirit, score: "0-2", result: "L", event: "BLAST Premier", date: "Feb 13", format: "BO3" },
      { opponent: "FURIA", opponentLogo: logo.furia, score: "16-13", result: "W", event: "BLAST Premier", date: "Feb 10", format: "BO1" },
    ],
    achievements: [
      { event: "IEM Grand Slam S3", placement: "1st", tier: "S", date: "2019", prize: "$1,000,000" },
      { event: "IEM Sydney 2019", placement: "1st", tier: "A", date: "May 2019", prize: "$100,000" },
      { event: "ESL One Cologne 2019", placement: "2nd", tier: "S", date: "Jul 2019" },
    ],
    transfers: [
      { player: "siuhy", direction: "in", fromTeam: "MOUZ", date: "Jan 2025" },
      { player: "ultimate", direction: "in", fromTeam: "Illuminar", date: "Jul 2024" },
      { player: "EliGE", direction: "in", fromTeam: "FaZe", date: "Sep 2025" },
      { player: "malbsMd", direction: "in", fromTeam: "G2", date: "Mar 2026" },
    ],
    headToHead: [
      { opponent: "NAVI", opponentLogo: logo.navi, wins: 8, losses: 14 },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, wins: 10, losses: 12 },
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 9, losses: 11 },
      { opponent: "Vitality", opponentLogo: logo.vitality, wins: 7, losses: 13 },
    ],
    totalMapsPlayed: 350, overallWinRate: 62.9, last10Results: ["W","L","L","W","W","L","W","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$11,200,000",
  },
  {
    id: "furia", name: "FURIA", abbr: "FURIA", color: "#fbbf24", logo: logo.furia,
    region: "Americas", country: "BR", countryFlag: flag.BR, founded: "2017",
    coach: { nickname: "sidde", realName: "Sid Macedo", country: "BR", countryFlag: flag.BR },
    worldRanking: 3, rankingPoints: 846, peakRanking: 1, peakRankingDate: "May 2026",
    weeksInTop5: 22, weeksInTop10: 78,
    roster: [
      { playerId: 14, nickname: "yuurih", realName: "Yuri Santos", country: "BR", countryFlag: flag.BR, image: playerPhoto.yuurih, role: "Rifler", joinDate: "Mar 2018", rating: 1.15 },
      { playerId: 15, nickname: "KSCERATO", realName: "Kaike Cerato", country: "BR", countryFlag: flag.BR, image: playerPhoto.kscerato, role: "Rifler", joinDate: "May 2018", rating: 1.19 },
      { playerId: 0, nickname: "FalleN", realName: "Gabriel Toledo", country: "BR", countryFlag: flag.BR, image: playerPhoto.fallen, role: "AWPer / IGL", joinDate: "Apr 2023", rating: 0.98, isCaptain: true },
      { playerId: 0, nickname: "YEKINDAR", realName: "Mareks Gaļinskis", country: "LV", countryFlag: flag.LV, image: playerPhoto.yekindar, role: "Rifler", joinDate: "Apr 2025", rating: 1.06 },
      { playerId: 0, nickname: "molodoy", realName: "Danil Golubenko", country: "KZ", countryFlag: "🇰🇿", image: playerPhoto.molodoy, role: "AWPer", joinDate: "Apr 2025", rating: 1.13 },
    ],
    mapStats: [
      { map: "Inferno", played: 68, wins: 46, winRate: 67.6, ctWinRate: 55.5, tWinRate: 44.5 },
      { map: "Dust II", played: 55, wins: 37, winRate: 67.3, ctWinRate: 51.0, tWinRate: 49.0 },
      { map: "Mirage", played: 60, wins: 38, winRate: 63.3, ctWinRate: 52.0, tWinRate: 48.0 },
      { map: "Tuscan", played: 22, wins: 14, winRate: 63.6, ctWinRate: 50.5, tWinRate: 49.5 },
      { map: "Anubis", played: 35, wins: 20, winRate: 57.1, ctWinRate: 53.0, tWinRate: 47.0 },
    ],
    recentMatches: [
      { opponent: "Cloud9", opponentLogo: logo.cloud9, score: "16-12", result: "W", event: "ESL Pro League", date: "Mar 3", format: "BO1" },
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "13-16", result: "L", event: "BLAST Premier", date: "Feb 10", format: "BO1" },
      { opponent: "paiN", opponentLogo: logo.pain, score: "2-0", result: "W", event: "ESL Challenger", date: "Feb 5", format: "BO3" },
      { opponent: "Imperial", opponentLogo: logo.imperial, score: "16-8", result: "W", event: "ESL Challenger", date: "Feb 3", format: "BO1" },
    ],
    achievements: [
      { event: "ESL Pro League S20", placement: "3rd-4th", tier: "A", date: "Oct 2025" },
      { event: "IEM Rio Major 2022", placement: "9th-12th", tier: "S", date: "Nov 2022" },
      { event: "IEM Dallas 2023", placement: "2nd", tier: "A", date: "Jun 2023" },
    ],
    transfers: [
      { player: "YEKINDAR", direction: "in", fromTeam: "Liquid", date: "Apr 2025" },
      { player: "molodoy", direction: "in", fromTeam: "AMKAL", date: "Apr 2025" },
      { player: "skullz", direction: "out", toTeam: "Imperial", date: "Aug 2025" },
      { player: "chelo", direction: "out", toTeam: "Imperial", date: "Jul 2025" },
    ],
    headToHead: [
      { opponent: "Team Liquid", opponentLogo: logo.liquid, wins: 11, losses: 9 },
      { opponent: "paiN Gaming", opponentLogo: logo.pain, wins: 15, losses: 4 },
      { opponent: "Imperial", opponentLogo: logo.imperial, wins: 13, losses: 5 },
      { opponent: "Cloud9", opponentLogo: logo.cloud9, wins: 8, losses: 6 },
    ],
    totalMapsPlayed: 305, overallWinRate: 61.6, last10Results: ["W","L","W","W","W","L","W","L","W","W"],
    majorsWon: 0, totalPrizeEarnings: "$3,100,000",
  },
];

const makeProfile = (p: Player, id: number, extra: Partial<PlayerProfile>): PlayerProfile => ({
  id,
  nickname: p.name,
  realName: p.realName,
  age: 18 + id,
  country: p.country,
  countryFlag: p.countryFlag,
  image: p.image,
  team: p.team,
  teamLogo: p.teamLogo,
  role: id <= 2 ? "Star Player" : id <= 5 ? "Rifler" : "Support",
  rating2: p.rating,
  dpr: +(0.55 + Math.random() * 0.15).toFixed(2),
  kast: p.kast,
  impact: +(1.0 + Math.random() * 0.4).toFixed(2),
  adr: p.adr,
  kd: p.kd,
  hsPercent: `${(42 + Math.floor(Math.random() * 16))}%`,
  mapsPlayed: 180 + id * 35,
  totalKills: 4200 + id * 280,
  totalDeaths: 3100 + id * 210,
  roundsPlayed: 8500 + id * 700,
  clutchesWon: 45 + Math.floor(Math.random() * 40),
  clutchesTotal: 120 + Math.floor(Math.random() * 60),
  openingKills: 320 + Math.floor(Math.random() * 200),
  openingDeaths: 190 + Math.floor(Math.random() * 100),
  awpKillsRound: +(Math.random() * 0.35).toFixed(2),
  bio: "",
  teamSlug: "",
  region: "Europe",
  majorWins: 0,
  signatureWeapon: "AK-47",
  careerEarnings: "$500,000",
  peakRating: +(p.rating + 0.08).toFixed(2),
  peakRatingDate: "2025",
  form: [
    { month: "Oct 2025", rating: +(p.rating - 0.04 + Math.random() * 0.08).toFixed(2) },
    { month: "Nov 2025", rating: +(p.rating - 0.02 + Math.random() * 0.06).toFixed(2) },
    { month: "Dec 2025", rating: +(p.rating + Math.random() * 0.05).toFixed(2) },
    { month: "Jan 2026", rating: +(p.rating - 0.03 + Math.random() * 0.08).toFixed(2) },
    { month: "Feb 2026", rating: +(p.rating + Math.random() * 0.04).toFixed(2) },
    { month: "Mar 2026", rating: +(p.rating - 0.01 + Math.random() * 0.06).toFixed(2) },
  ],
  eventHistory: [
    { event: "IEM Katowice 2026", tier: "S", rating: +(p.rating + 0.05).toFixed(2), maps: 12, placement: "5th-8th", date: "Mar 2026" },
    { event: "BLAST Premier Spring 2026", tier: "S", rating: +(p.rating - 0.02).toFixed(2), maps: 8, placement: "9th-12th", date: "Feb 2026" },
    { event: "ESL Pro League S21", tier: "A", rating: +(p.rating + 0.01).toFixed(2), maps: 14, placement: "3rd-4th", date: "Jan 2026" },
    { event: "BLAST Premier World Final 2025", tier: "S", rating: +(p.rating + 0.08).toFixed(2), maps: 10, placement: "1st", date: "Dec 2025" },
    { event: "IEM Cologne 2025", tier: "S", rating: +(p.rating - 0.05).toFixed(2), maps: 6, placement: "9th-12th", date: "Oct 2025" },
  ],
  bestMaps: [
    { map: "Mirage", rating: +(p.rating + Math.random() * 0.1).toFixed(2), winRate: 60 + Math.floor(Math.random() * 18), matches: 30 + Math.floor(Math.random() * 20) },
    { map: "Inferno", rating: +(p.rating - 0.02 + Math.random() * 0.1).toFixed(2), winRate: 55 + Math.floor(Math.random() * 20), matches: 28 + Math.floor(Math.random() * 18) },
    { map: "Anubis", rating: +(p.rating - 0.05 + Math.random() * 0.12).toFixed(2), winRate: 50 + Math.floor(Math.random() * 22), matches: 22 + Math.floor(Math.random() * 15) },
    { map: "Nuke", rating: +(p.rating - 0.08 + Math.random() * 0.15).toFixed(2), winRate: 48 + Math.floor(Math.random() * 25), matches: 18 + Math.floor(Math.random() * 12) },
    { map: "Dust II", rating: +(p.rating - 0.03 + Math.random() * 0.1).toFixed(2), winRate: 52 + Math.floor(Math.random() * 20), matches: 25 + Math.floor(Math.random() * 15) },
  ],
  weaponStats: [
    { weapon: "AK-47", kills: 1800 + Math.floor(Math.random() * 600), hsPercent: `${48 + Math.floor(Math.random() * 12)}%` },
    { weapon: "M4A4", kills: 1200 + Math.floor(Math.random() * 400), hsPercent: `${42 + Math.floor(Math.random() * 10)}%` },
    { weapon: "AWP", kills: 600 + Math.floor(Math.random() * 800), hsPercent: `${8 + Math.floor(Math.random() * 6)}%` },
    { weapon: "Desert Eagle", kills: 280 + Math.floor(Math.random() * 150), hsPercent: `${55 + Math.floor(Math.random() * 15)}%` },
    { weapon: "USP-S", kills: 220 + Math.floor(Math.random() * 120), hsPercent: `${60 + Math.floor(Math.random() * 12)}%` },
    { weapon: "Glock-18", kills: 180 + Math.floor(Math.random() * 100), hsPercent: `${35 + Math.floor(Math.random() * 15)}%` },
  ],
  recentMatches: [
    { event: "IEM Katowice 2026", opponent: "NAVI", opponentLogo: logo.navi, result: "W 16-12", rating: +(p.rating + Math.random() * 0.2 - 0.1).toFixed(2), kills: 22 + Math.floor(Math.random() * 8), deaths: 14 + Math.floor(Math.random() * 6), map: "Mirage" },
    { event: "IEM Katowice 2026", opponent: "FaZe", opponentLogo: logo.faze, result: "L 13-16", rating: +(p.rating - Math.random() * 0.2).toFixed(2), kills: 18 + Math.floor(Math.random() * 6), deaths: 16 + Math.floor(Math.random() * 5), map: "Inferno" },
    { event: "BLAST Premier", opponent: "G2", opponentLogo: logo.g2, result: "W 2-0", rating: +(p.rating + Math.random() * 0.15).toFixed(2), kills: 45 + Math.floor(Math.random() * 12), deaths: 28 + Math.floor(Math.random() * 8), map: "BO3" },
    { event: "ESL Pro League", opponent: "Vitality", opponentLogo: logo.vitality, result: "W 16-9", rating: +(p.rating + Math.random() * 0.3).toFixed(2), kills: 26 + Math.floor(Math.random() * 8), deaths: 10 + Math.floor(Math.random() * 5), map: "Anubis" },
    { event: "ESL Pro League", opponent: "MOUZ", opponentLogo: logo.mouz, result: "L 1-2", rating: +(p.rating - Math.random() * 0.15).toFixed(2), kills: 38 + Math.floor(Math.random() * 10), deaths: 32 + Math.floor(Math.random() * 8), map: "BO3" },
  ],
  teamHistory: [],
  achievements: [],
  ...extra,
});

export const playerProfiles: PlayerProfile[] = [
  makeProfile(topPlayers[0], 1, { age: 18, role: "Rifler / Entry Fragger", bio: "The youngest player to ever reach #1 in the HLTV rankings. donk burst onto the scene from Spirit's academy and immediately dominated with unmatched aim and game sense, becoming the undisputed best player in the world.", teamSlug: "spirit", region: "Europe", majorWins: 0, signatureWeapon: "AK-47", careerEarnings: "$850,000", peakRating: 1.42, peakRatingDate: "Nov 2025", teamHistory: [{ team: "Spirit", logo: logo.spirit, period: "2023 – Present" }], achievements: ["HLTV #1 Player 2025", "IEM Katowice 2026 MVP", "BLAST Premier Champion 2025", "Intel Grand Slam S3"] }),
  makeProfile(topPlayers[1], 2, { age: 24, role: "AWPer / Star Player", bio: "The French prodigy who has won the HLTV #1 award twice and led Vitality to a Major championship. ZywOo's AWP and rifling make him one of the most complete players ever.", teamSlug: "vitality", region: "Europe", majorWins: 1, signatureWeapon: "AWP", careerEarnings: "$2,100,000", peakRating: 1.38, peakRatingDate: "Dec 2023", teamHistory: [{ team: "Vitality", logo: logo.vitality, period: "2019 – Present" }], achievements: ["HLTV #1 Player 2020", "HLTV #1 Player 2021", "PGL Major Copenhagen 2024 MVP", "Intel Grand Slam S2"] }),
  makeProfile(topPlayers[2], 3, { age: 28, role: "Rifler / Star Player", bio: "One of the most naturally gifted aimers in Counter-Strike history. NiKo remains an elite mechanical force and is now leading Falcons' firepower after his move away from G2.", teamSlug: "", region: "Europe", majorWins: 0, signatureWeapon: "AK-47", careerEarnings: "$1,800,000", peakRating: 1.34, peakRatingDate: "Oct 2023", teamHistory: [{ team: "Falcons", logo: logo.falcons, period: "2025 – Present" }, { team: "G2", logo: logo.g2, period: "2020 – 2025" }, { team: "FaZe", logo: logo.faze, period: "2017 – 2020" }], achievements: ["IEM Katowice 2022 MVP", "BLAST Premier Champion 2024", "ESL One Cologne 2023 MVP"] }),
  makeProfile(topPlayers[3], 4, { age: 20, role: "AWPer", bio: "m0NESY quickly became one of the world's most explosive AWPers and now carries that same star power into Falcons after his years with G2.", teamSlug: "", region: "Europe", majorWins: 0, signatureWeapon: "AWP", careerEarnings: "$750,000", peakRating: 1.32, peakRatingDate: "Jun 2024", teamHistory: [{ team: "Falcons", logo: logo.falcons, period: "2025 – Present" }, { team: "G2", logo: logo.g2, period: "2022 – 2025" }, { team: "NAVI Junior", logo: logo.navi, period: "2020 – 2022" }], achievements: ["BLAST Premier Champion 2024", "ESL Pro League S18 MVP"] }),
  makeProfile(topPlayers[4], 5, { age: 25, role: "Lurker / Rifler", bio: "The Estonian maestro known for precise spray transfers and immaculate spacing is now part of Vitality's superteam after his championship run with FaZe.", teamSlug: "vitality", region: "Europe", majorWins: 1, signatureWeapon: "M4A4", careerEarnings: "$1,500,000", peakRating: 1.29, peakRatingDate: "May 2022", teamHistory: [{ team: "Vitality", logo: logo.vitality, period: "2025 – Present" }, { team: "FaZe", logo: logo.faze, period: "2022 – 2024" }, { team: "MOUZ", logo: logo.mouz, period: "2017 – 2021" }], achievements: ["PGL Major Antwerp 2022 Champion", "IEM Katowice 2022 Champion", "HLTV #4 Player 2022"] }),
  makeProfile(topPlayers[5], 6, { age: 21, role: "Rifler", bio: "A key part of NAVI's Major-winning roster and one of the most talented young Ukrainian players, b1t contributes consistently with his versatile rifling.", teamSlug: "navi", region: "Europe", majorWins: 1, signatureWeapon: "AK-47", careerEarnings: "$1,200,000", peakRating: 1.25, peakRatingDate: "Nov 2021", teamHistory: [{ team: "NAVI", logo: logo.navi, period: "2021 – Present" }], achievements: ["PGL Major Stockholm 2021 Champion", "Intel Grand Slam S1 (NAVI)"] }),
  makeProfile(topPlayers[6], 7, { age: 26, role: "Rifler", bio: "Known for his explosiveness and clutching, jL starred on NAVI's 2024 Major run and moved to MOUZ on loan in April 2026 to rejoin tier-one competition.", teamSlug: "mouz", region: "Europe", majorWins: 1, signatureWeapon: "AK-47", careerEarnings: "$600,000", peakRating: 1.24, peakRatingDate: "Mar 2025", teamHistory: [{ team: "MOUZ", logo: logo.mouz, period: "Apr 2026 – Present" }, { team: "NAVI", logo: logo.navi, period: "Jun 2023 – Apr 2026" }], achievements: ["PGL CS2 Major Copenhagen 2024 Champion", "PGL CS2 Major Copenhagen 2024 MVP"] }),
  makeProfile(topPlayers[7], 8, { age: 24, role: "Rifler", bio: "Spinx remains one of the scene's cleanest riflers and now anchors MOUZ after his championship spell with Vitality.", teamSlug: "mouz", region: "Europe", majorWins: 1, signatureWeapon: "AK-47", careerEarnings: "$900,000", peakRating: 1.22, peakRatingDate: "May 2024", teamHistory: [{ team: "MOUZ", logo: logo.mouz, period: "Jan 2025 – Present" }, { team: "Vitality", logo: logo.vitality, period: "2022 – 2025" }], achievements: ["PGL Major Copenhagen 2024 Champion", "BLAST Premier Champion 2023"] }),
  makeProfile(topPlayers[8], 9, { age: 23, role: "Rifler", bio: "The Slovak star developed at MOUZ and turned into one of tier-one's most complete riflers before joining FaZe's current core.", teamSlug: "faze", region: "Europe", majorWins: 0, signatureWeapon: "AK-47", careerEarnings: "$450,000", peakRating: 1.23, peakRatingDate: "Sep 2024", teamHistory: [{ team: "FaZe", logo: logo.faze, period: "2024 – Present" }, { team: "MOUZ", logo: logo.mouz, period: "2019 – 2023" }], achievements: ["ESL Pro League S19 Champion", "IEM Cologne 2024 Finalist"] }),
  makeProfile(topPlayers[9], 10, { age: 29, role: "Rifler / Support", bio: "NiKo's cousin and long-time partner in crime, huNter brings veteran experience and reliable fragging to G2's lineup.", teamSlug: "g2", region: "Europe", majorWins: 0, signatureWeapon: "AK-47", careerEarnings: "$1,100,000", peakRating: 1.20, peakRatingDate: "Sep 2023", teamHistory: [{ team: "G2", logo: logo.g2, period: "2021 – Present" }, { team: "FaZe", logo: logo.faze, period: "2017 – 2021" }], achievements: ["BLAST Premier Champion 2024", "IEM Katowice 2022 Champion"] }),
  makeProfile(topPlayers[10], 11, { age: 23, role: "AWPer / Rifler", bio: "A hybrid AWPer/rifler who has been part of FaZe's championship core, broky provides FaZe with a second firepower threat alongside ropz.", teamSlug: "faze", region: "Europe", majorWins: 1, signatureWeapon: "AWP", careerEarnings: "$1,000,000", peakRating: 1.20, peakRatingDate: "Feb 2022", teamHistory: [{ team: "FaZe", logo: logo.faze, period: "2020 – Present" }], achievements: ["PGL Major Antwerp 2022 Champion", "IEM Katowice 2022 Champion"] }),
  makeProfile(topPlayers[11], 12, { age: 30, role: "Rifler / Support", bio: "One of the longest-serving players in tier 1 CS, rain has been FaZe's heart and soul since 2016, finally winning a Major in 2022 after years of close calls.", teamSlug: "faze", region: "Europe", majorWins: 1, signatureWeapon: "AK-47", careerEarnings: "$2,300,000", peakRating: 1.18, peakRatingDate: "May 2022", teamHistory: [{ team: "FaZe", logo: logo.faze, period: "2016 – Present" }], achievements: ["PGL Major Antwerp 2022 Champion", "IEM Katowice 2022 Champion", "Intel Grand Slam S2 (FaZe)"] }),
  makeProfile(topPlayers[12], 13, { age: 23, role: "AWPer", bio: "Spirit's reliable AWPer who complements donk perfectly, sh1ro is known for his passive, consistent AWP style that anchors the team's defense.", teamSlug: "spirit", region: "Europe", majorWins: 0, signatureWeapon: "AWP", careerEarnings: "$550,000", peakRating: 1.18, peakRatingDate: "Dec 2025", teamHistory: [{ team: "Spirit", logo: logo.spirit, period: "2020 – Present" }], achievements: ["IEM Katowice 2026 Finalist", "BLAST Premier 2025 Champion"] }),
  makeProfile(topPlayers[13], 14, { age: 25, role: "Rifler", bio: "The backbone of FURIA alongside KSCERATO, yuurih is the Brazilian scene's most consistent rifler with insane spray control and clutch ability.", teamSlug: "furia", region: "Americas", majorWins: 0, signatureWeapon: "AK-47", careerEarnings: "$400,000", peakRating: 1.15, peakRatingDate: "Aug 2023", teamHistory: [{ team: "FURIA", logo: logo.furia, period: "2018 – Present" }], achievements: ["ESL Pro League S20 Finalist", "IEM Rio Major 2022 Legend Stage"] }),
  makeProfile(topPlayers[14], 15, { age: 26, role: "Rifler / Anchor", bio: "KSCERATO is widely regarded as the best Brazilian player of the modern era, known for his robotic consistency and impenetrable site anchoring.", teamSlug: "furia", region: "Americas", majorWins: 0, signatureWeapon: "M4A4", careerEarnings: "$380,000", peakRating: 1.14, peakRatingDate: "Jun 2023", teamHistory: [{ team: "FURIA", logo: logo.furia, period: "2018 – Present" }], achievements: ["ESL Pro League S20 Finalist", "IEM Rio Major 2022 Legend Stage"] }),
];

// -- Player of the Week --
export const playerOfTheWeek: PlayerHighlight = {
  player: topPlayers[0],
  event: "IEM Katowice 2026",
  maps: 12,
  kills: 312,
  deaths: 187,
  title: "Player of the Week",
};

// -- Round Highlight --
export const roundHighlight: RoundHighlight = {
  id: 1,
  title: "donk 1v4 clutch on Mirage",
  event: "IEM Katowice 2026 — Semifinal",
  team1: teams[4],
  team2: teams[0],
  round: 28,
  player: "donk",
  description: "In a crucial semifinal round, donk single-handedly dismantled NAVI's defense with an incredible 1v4 clutch that turned the entire series around. Armed with only an AK-47 and a dream, he systematically eliminated each opponent in a masterclass of positioning and aim.",
  thumbnail: esportsArena,
  youtubeId: "dQw4w9WgXcQ",
};
