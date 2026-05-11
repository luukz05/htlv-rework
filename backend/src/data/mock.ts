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
  teses: `${B}/players/default.png`,
  sjuush: `${B}/players/default.png`,
  stavn: `${B}/players/default.png`,
  jabbi: `${B}/players/default.png`,
  kyxsan: `${B}/players/default.png`,
  device: `${B}/players/default.png`,
  blamef: `${B}/players/default.png`,
  buzz: `${B}/players/default.png`,
  br0: `${B}/players/default.png`,
  staehr: `${B}/players/default.png`,
  default: `${B}/players/default.png`,
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
  PL: "🇵🇱", PT: "🇵🇹", AR: "🇦🇷", ES: "🇪🇸", DE: "🇩🇪", GB: "🇬🇧", HU: "🇭🇺",
  DK: "🇩🇰", FI: "🇫🇮", RO: "🇷🇴", XK: "🇽🇰", US: "🇺🇸", ZA: "🇿🇦", SA: "🇸🇦",
  BY: "🇧🇾", MN: "🇲🇳", UY: "🇺🇾", CL: "🇨🇱", SE: "🇸🇪", RS: "🇷🇸",
};

// -- Teams --
export const teams: Team[] = [
  { name: "Natus Vincere", color: "#fbbf24", shortname: "NAVI", logo: logo.navi },
  { name: "Vitality", color: "#fcd34d", shortname: "VIT", logo: logo.vitality },
  { name: "FaZe Clan", color: "#ef4444", shortname: "FaZe", logo: logo.faze },
  { name: "G2 Esports", color: "#c084fc", shortname: "G2", logo: logo.g2 },
  { name: "Team Spirit", color: "#34d399", shortname: "Spirit", logo: logo.spirit },
  { name: "Team Liquid", color: "#38bdf8", shortname: "TL", logo: logo.liquid },
  { name: "MOUZ", color: "#2dd4bf", shortname: "MOUZ", logo: logo.mouz },
  { name: "Heroic", color: "#f472b6", shortname: "Heroic", logo: logo.heroic },
  { name: "FURIA", color: "#fbbf24", shortname: "FURIA", logo: logo.furia },
  { name: "Astralis", color: "#fb923c", shortname: "Astralis", logo: logo.astralis },
  { name: "Cloud9", color: "#94a3b8", shortname: "C9", logo: logo.cloud9 },
  { name: "Complexity", color: "#60a5fa", shortname: "COL", logo: logo.complexity },
  { name: "paiN Gaming", color: "#4ade80", shortname: "paiN", logo: logo.pain },
  { name: "Falcons", color: "#a78bfa", shortname: "Falcons", logo: logo.falcons },
  { name: "Imperial", color: "#f59e0b", shortname: "IMP", logo: logo.imperial },
  { name: "9z Team", color: "#e879f9", shortname: "9z", logo: logo.nine_z },
  { name: "TheMongolz", color: "#f97316", shortname: "Mongolz", logo: logo.mongolz },
  { name: "Virtus.pro", color: "#fb923c", shortname: "VP", logo: logo.virtuspro },
  { name: "GamerLegion", color: "#a3e635", shortname: "GL", logo: logo.gamerlegion },
  { name: "SAW", color: "#67e8f9", shortname: "SAW", logo: logo.saw },
];

const t = (i: number) => teams[i];

// -- Live Matches --
export const liveMatches: Match[] = [
  {
    id: 1,
    team1: t(0),
    team2: t(2),
    score1: 3,
    score2: 2,
    event: "PGL ASTANA 2026",
    format: "BO3",
    map: "Overpass",
    mapVeto: [
      { team: "NAVI", action: "banned", map: "Nuke" },
      { team: "FaZe", action: "banned", map: "Ancient" },
      { team: "NAVI", action: "picked", map: "Mirage", score1: 13, score2: 11 },
      { team: "FaZe", action: "picked", map: "Inferno", score1: 8, score2: 13 },
      { team: "NAVI", action: "banned", map: "Anubis" },
      { team: "FaZe", action: "banned", map: "Dust II" },
      { team: "Decider", action: "decider", map: "Overpass" },
    ],
    broadcastUrl: "https://www.twitch.tv/eslcs",
    status: "live",
  },
  {
    id: 2,
    team1: t(1),
    team2: t(4),
    score1: 8,
    score2: 6,
    event: "PGL ASTANA 2026",
    format: "BO3",
    map: "Nuke",
    mapVeto: [
      { team: "VIT", action: "banned", map: "Ancient" },
      { team: "Spirit", action: "banned", map: "Anubis" },
      { team: "VIT", action: "picked", map: "Inferno", score1: 13, score2: 9 },
      { team: "Spirit", action: "picked", map: "Overpass", score1: 11, score2: 13 },
      { team: "VIT", action: "banned", map: "Mirage" },
      { team: "Spirit", action: "banned", map: "Dust II" },
      { team: "Decider", action: "decider", map: "Nuke" },
    ],
    status: "live",
  },
  { id: 3, team1: t(3), team2: t(5), score1: 7, score2: 10, event: "BLAST Premier Spring Spring", format: "BO1", map: "Anubis", status: "live" },
];

export const upcomingMatches: Match[] = [
  { id: 4, team1: t(7), team2: t(9), event: "PGL ASTANA 2026", format: "BO3", time: "18:00", date: "Today", status: "upcoming" },
  { id: 5, team1: t(6), team2: t(13), event: "BLAST Premier Spring Spring", format: "BO3", time: "20:30", date: "Today", status: "upcoming" },
  { id: 6, team1: t(8), team2: t(10), event: "ESL Pro League Season 21", format: "BO1", time: "22:00", date: "Today", status: "upcoming" },
  { id: 7, team1: t(0), team2: t(1), event: "PGL ASTANA 2026", format: "BO5", time: "14:00", date: "Tomorrow", status: "upcoming" },
  { id: 8, team1: t(11), team2: t(12), event: "ESL Pro League Season 21", format: "BO3", time: "16:00", date: "Tomorrow", status: "upcoming" },
  { id: 9, team1: t(3), team2: t(6), event: "BLAST Premier Spring Spring", format: "BO3", time: "19:00", date: "Tomorrow", status: "upcoming" },
  { id: 20, team1: t(14), team2: t(15), event: "ESL Challenger Valencia", format: "BO3", time: "15:00", date: "Mar 7", status: "upcoming" },
  { id: 21, team1: t(5), team2: t(9), event: "BLAST Premier Spring Spring", format: "BO3", time: "18:00", date: "Mar 7", status: "upcoming" },
];

export const recentResults: Match[] = [
  { id: 10, team1: t(1), team2: t(4), score1: 2, score2: 0, event: "PGL ASTANA 2026", format: "BO3", date: "Today", status: "finished" },
  { id: 11, team1: t(6), team2: t(7), score1: 1, score2: 2, event: "BLAST Premier Spring Spring", format: "BO3", date: "Today", status: "finished" },
  { id: 12, team1: t(8), team2: t(10), score1: 16, score2: 12, event: "ESL Pro League Season 21", format: "BO1", date: "Today", status: "finished" },
  { id: 13, team1: t(11), team2: t(12), score1: 2, score2: 1, event: "ESL Pro League Season 21", format: "BO3", date: "Yesterday", status: "finished" },
  { id: 14, team1: t(9), team2: t(3), score1: 0, score2: 2, event: "PGL ASTANA 2026", format: "BO3", date: "Yesterday", status: "finished" },
  { id: 15, team1: t(5), team2: t(0), score1: 1, score2: 2, event: "PGL ASTANA 2026", format: "BO3", date: "Yesterday", status: "finished" },
  { id: 16, team1: t(2), team2: t(7), score1: 2, score2: 0, event: "PGL ASTANA 2026", format: "BO3", date: "Mar 2", status: "finished" },
  { id: 17, team1: t(4), team2: t(6), score1: 2, score2: 1, event: "BLAST Premier Spring Spring", format: "BO3", date: "Mar 2", status: "finished" },
  { id: 18, team1: t(13), team2: t(14), score1: 2, score2: 0, event: "ESL Challenger Valencia", format: "BO3", date: "Mar 1", status: "finished" },
  { id: 19, team1: t(8), team2: t(15), score1: 16, score2: 8, event: "ESL Challenger Valencia", format: "BO1", date: "Mar 1", status: "finished" },
];

// -- News --
export const news: NewsArticle[] = [
  { id: 1, title: "PGL ASTANA 2026 Grand Finals: NAVI vs FaZe in an epic rematch for the title", description: "After an incredible run through the lower bracket, FaZe Clan faces NAVI in a best-of-five grand final that promises to be one of the most exciting matches of the year.", author: "HLTV Staff", time: "15 min ago", comments: 234, tags: ["Major", "Hot"], image: esportsArena, featured: true },
  { id: 2, title: "s1mple officially returns to competitive CS2 for upcoming Major cycle", description: "After a brief hiatus, the GOAT returns to the active roster of NAVI.", author: "Striker", time: "1h ago", comments: 891, tags: ["Roster Move"], image: gamingSetup },
  { id: 3, title: "Valve announces new map pool changes for CS2 competitive season", description: "Tuscan enters the active duty map pool while Vertigo is removed.", author: "HLTV Staff", time: "2h ago", comments: 456, tags: ["Update"], image: gamingKeyboard },
  { id: 4, title: "Top 20 players of 2025: The final list revealed with surprising entries", description: "donk takes the crown as the youngest ever #1.", author: "Nomad", time: "3h ago", comments: 1200, tags: ["Awards"], image: trophyCup },
  { id: 5, title: "BLAST Premier Spring Spring Groups 2026: Schedule, format, and teams confirmed", author: "HLTV Staff", time: "5h ago", comments: 189, tags: ["Event"], image: crowdArena },
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
  { id: "navi", rank: 1, name: "Natus Vincere", color: "#fbbf24", points: 1000, vrs: 1714, change: "same", region: "Europe", logo: logo.navi },
  { id: "g2", rank: 2, name: "G2 Esports", color: "#c084fc", points: 892, vrs: 1389, change: "up", changeVal: 1, region: "Europe", logo: logo.g2 },
  { id: "vitality", rank: 3, name: "Vitality", color: "#fcd34d", points: 845, vrs: 2076, change: "down", changeVal: 1, region: "Europe", logo: logo.vitality },
  { id: "mouz", rank: 4, name: "MOUZ", color: "#2dd4bf", points: 756, vrs: 1593, change: "same", region: "Europe", logo: logo.mouz },
  { id: "faze", rank: 5, name: "FaZe Clan", color: "#ef4444", points: 723, vrs: 2218, change: "up", changeVal: 2, region: "Europe", logo: logo.faze },
  { id: "spirit", rank: 6, name: "Team Spirit", color: "#34d399", points: 698, vrs: 1267, change: "down", changeVal: 1, region: "Europe", logo: logo.spirit },
  { id: "liquid", rank: 7, name: "Team Liquid", color: "#38bdf8", points: 654, vrs: 1884, change: "up", changeVal: 1, region: "Americas", logo: logo.liquid },
  { id: "heroic", rank: 8, name: "Heroic", color: "#f472b6", points: 612, vrs: 1451, change: "same", region: "Europe", logo: logo.heroic },
  { id: "furia", rank: 9, name: "FURIA", color: "#fbbf24", points: 589, vrs: 2142, change: "up", changeVal: 3, region: "Americas", logo: logo.furia },
  { id: "astralis", rank: 10, name: "Astralis", color: "#fb923c", points: 567, vrs: 1326, change: "down", changeVal: 2, region: "Europe", logo: logo.astralis },
  { id: "cloud9", rank: 11, name: "Cloud9", color: "#94a3b8", points: 534, vrs: 1769, change: "down", changeVal: 1, region: "Americas", logo: logo.cloud9 },
  { id: "complexity", rank: 12, name: "Complexity", color: "#60a5fa", points: 501, vrs: 1218, change: "up", changeVal: 2, region: "Americas", logo: logo.complexity },
  { id: "falcons", rank: 13, name: "Falcons", color: "#a78bfa", points: 478, vrs: 1947, change: "same", region: "Europe", logo: logo.falcons },
  { id: "pain", rank: 14, name: "paiN Gaming", color: "#4ade80", points: 445, vrs: 1662, change: "up", changeVal: 1, region: "Americas", logo: logo.pain },
  { id: "imperial", rank: 15, name: "Imperial", color: "#f59e0b", points: 412, vrs: 1095, change: "down", changeVal: 3, region: "Americas", logo: logo.imperial },
  { id: "nine_z", rank: 16, name: "9z Team", color: "#e879f9", points: 389, vrs: 1831, change: "same", region: "Americas", logo: logo.nine_z },
  { id: "mongolz", rank: 17, name: "TheMongolz", color: "#f97316", points: 367, vrs: 1517, change: "up", changeVal: 4, region: "Asia", logo: logo.mongolz },
  { id: "virtuspro", rank: 18, name: "Virtus.pro", color: "#fb923c", points: 345, vrs: 2284, change: "down", changeVal: 1, region: "Europe", logo: logo.virtuspro },
  { id: "gamerlegion", rank: 19, name: "GamerLegion", color: "#a3e635", points: 323, vrs: 1372, change: "up", changeVal: 2, region: "Europe", logo: logo.gamerlegion },
  { id: "saw", rank: 20, name: "SAW", color: "#67e8f9", points: 301, vrs: 2019, change: "same", region: "Europe", logo: logo.saw },
];

// -- Events --
export const events: Event[] = [
  { id: 1, name: "PGL ASTANA 2026", tier: "S", dates: "May 9 - 17, 2026", prize: "$1,600,000", teams: 16, progress: 30, status: "Main Event of the Month", location: "Astana, Kazakhstan", image: "https://files.bo3.gg/uploads/image/118495/image/webp-4f430eb3fc3a03b2beea7542deefb97b.webp" },
  { id: 2, name: "BLAST Premier Spring Spring", tier: "S", dates: "Mar 25 – Apr 6, 2026", prize: "$425,000", teams: 12, progress: 100, status: "Completed", location: "Copenhagen, Denmark", image: crowdArena },
  { id: 3, name: "ESL Pro League Season 21", tier: "A", dates: "Apr 14 – 27, 2026", prize: "$850,000", teams: 24, progress: 0, status: "Upcoming", location: "Malta", image: conferenceHall },
  { id: 4, name: "PGL Major Copenhagen", tier: "S", dates: "May 5 – 18, 2026", prize: "$1,250,000", teams: 24, progress: 0, status: "Upcoming", location: "Copenhagen, Denmark", image: stadium },
  { id: 5, name: "IEM Chengdu 2026", tier: "A", dates: "Jun 2 – 8, 2026", prize: "$500,000", teams: 16, progress: 0, status: "Upcoming", location: "Chengdu, China", image: fireworks },
  { id: 6, name: "BLAST Premier Spring Spring Final", tier: "S", dates: "Jun 18 – 22, 2026", prize: "$425,000", teams: 8, progress: 0, status: "Upcoming", location: "London, UK", image: esportStage },
  { id: 7, name: "ESL Challenger Valencia", tier: "B", dates: "Apr 7 – 13, 2026", prize: "$150,000", teams: 16, progress: 0, status: "Upcoming", location: "Valencia, Spain", image: gamingMonitor },
  { id: 8, name: "Thunderpick World Championship", tier: "A", dates: "Jul 1 – 13, 2026", prize: "$1,000,000", teams: 16, progress: 0, status: "Upcoming", location: "TBD", image: neonLights },
];

// -- Players --
export const topPlayers: Player[] = [
  { id: 1, rank: 1, name: "donk", realName: "Danil Kryshkovets", team: "Team Spirit", country: "RU", countryFlag: flag.RU, rating: 1.39, kd: "1.42", adr: 94.2, kast: "78.5%", swing: "+0.22", impact: 1.55, dpr: 0.62, hsPercent: "52.4%", image: playerPhoto.donk, teamLogo: logo.spirit, totalKills: 4520, totalDeaths: 3180, assists: 840, openingKills: 720, clutchesWon: 45 },
  { id: 2, rank: 2, name: "ZywOo", realName: "Mathieu Herbaut", team: "Vitality", country: "FR", countryFlag: flag.FR, rating: 1.31, kd: "1.35", adr: 88.7, kast: "75.2%", swing: "+0.18", impact: 1.42, dpr: 0.58, hsPercent: "41.8%", image: playerPhoto.zywoo, teamLogo: logo.vitality, totalKills: 12450, totalDeaths: 9200, assists: 2150, openingKills: 1850, clutchesWon: 120 },
  { id: 3, rank: 3, name: "NiKo", realName: "Nikola Kovač", team: "Falcons", country: "BA", countryFlag: flag.BA, rating: 1.25, kd: "1.30", adr: 85.4, kast: "73.8%", swing: "+0.12", impact: 1.38, dpr: 0.65, hsPercent: "62.1%", image: playerPhoto.niko, teamLogo: logo.falcons, totalKills: 15800, totalDeaths: 12100, assists: 3100, openingKills: 2400, clutchesWon: 95 },
  { id: 4, rank: 4, name: "m0NESY", realName: "Ilya Osipov", team: "Falcons", country: "RU", countryFlag: flag.RU, rating: 1.22, kd: "1.28", adr: 82.1, kast: "72.4%", swing: "+0.15", impact: 1.32, dpr: 0.59, hsPercent: "38.5%", image: playerPhoto.m0nesy, teamLogo: logo.falcons, totalKills: 8200, totalDeaths: 6400, assists: 1200, openingKills: 1100, clutchesWon: 85 },
  { id: 5, rank: 5, name: "ropz", realName: "Robin Kool", team: "Vitality", country: "EE", countryFlag: flag.EE, rating: 1.16, kd: "1.24", adr: 79.8, kast: "74.1%", swing: "+0.08", impact: 1.18, dpr: 0.61, hsPercent: "55.2%", image: playerPhoto.ropz, teamLogo: logo.vitality, totalKills: 11200, totalDeaths: 9000, assists: 1950, openingKills: 1400, clutchesWon: 110 },
  { id: 6, rank: 6, name: "b1t", realName: "Valeriy Vakhovskiy", team: "Natus Vincere", country: "UA", countryFlag: flag.UA, rating: 1.12, kd: "1.22", adr: 78.3, kast: "71.6%", swing: "+0.05", impact: 1.12, dpr: 0.63, hsPercent: "68.4%", image: playerPhoto.b1t, teamLogo: logo.navi, totalKills: 7800, totalDeaths: 6400, assists: 1400, openingKills: 950, clutchesWon: 65 },
  { id: 7, rank: 7, name: "jL", realName: "Justinas Lekavicius", team: "MOUZ", country: "LT", countryFlag: flag.LT, rating: 1.11, kd: "1.20", adr: 76.9, kast: "70.8%", swing: "+0.04", impact: 1.15, dpr: 0.64, hsPercent: "51.2%", image: playerPhoto.jl, teamLogo: logo.mouz, totalKills: 6200, totalDeaths: 5150, assists: 1150, openingKills: 880, clutchesWon: 72 },
  { id: 8, rank: 8, name: "Spinx", realName: "Lotan Giladi", team: "MOUZ", country: "IL", countryFlag: flag.IL, rating: 1.11, kd: "1.18", adr: 75.4, kast: "72.0%", swing: "+0.02", impact: 1.09, dpr: 0.66, hsPercent: "48.7%", image: playerPhoto.spinx, teamLogo: logo.mouz, totalKills: 8900, totalDeaths: 7550, assists: 1600, openingKills: 1050, clutchesWon: 58 },
  { id: 9, rank: 9, name: "frozen", realName: "David Čerňanský", team: "FaZe Clan", country: "SK", countryFlag: flag.SK, rating: 1.15, kd: "1.17", adr: 74.1, kast: "69.5%", swing: "-0.02", impact: 1.07, dpr: 0.62, hsPercent: "53.1%", image: playerPhoto.frozen, teamLogo: logo.faze, totalKills: 9400, totalDeaths: 8050, assists: 1800, openingKills: 1150, clutchesWon: 92 },
  { id: 10, rank: 10, name: "huNter-", realName: "Nemanja Kovač", team: "G2 Esports", country: "BA", countryFlag: flag.BA, rating: 1.10, kd: "1.16", adr: 73.8, kast: "71.2%", swing: "-0.01", impact: 1.11, dpr: 0.67, hsPercent: "49.5%", image: playerPhoto.hunter, teamLogo: logo.g2, totalKills: 13200, totalDeaths: 11400, assists: 2400, openingKills: 1850, clutchesWon: 88 },
  { id: 11, rank: 11, name: "broky", realName: "Helvijs Saukants", team: "FaZe Clan", country: "LV", countryFlag: flag.LV, rating: 1.13, kd: "1.15", adr: 72.5, kast: "68.9%", swing: "-0.05", impact: 1.05, dpr: 0.60, hsPercent: "35.2%", image: playerPhoto.broky, teamLogo: logo.faze, totalKills: 10800, totalDeaths: 9400, assists: 1550, openingKills: 1250, clutchesWon: 105 },
  { id: 12, rank: 12, name: "rain", realName: "Håvard Nygaard", team: "FaZe Clan", country: "NO", countryFlag: flag.NO, rating: 1.11, kd: "1.13", adr: 71.2, kast: "70.3%", swing: "-0.03", impact: 1.08, dpr: 0.68, hsPercent: "54.8%", image: playerPhoto.rain, teamLogo: logo.faze, totalKills: 14500, totalDeaths: 12850, assists: 2900, openingKills: 2100, clutchesWon: 74 },
  { id: 13, rank: 13, name: "sh1ro", realName: "Dmitry Sokolov", team: "Team Spirit", country: "RU", countryFlag: flag.RU, rating: 1.18, kd: "1.12", adr: 70.8, kast: "67.5%", swing: "-0.08", impact: 1.02, dpr: 0.57, hsPercent: "32.1%", image: playerPhoto.sh1ro, teamLogo: logo.spirit, totalKills: 9100, totalDeaths: 8100, assists: 1350, openingKills: 1050, clutchesWon: 112 },
  { id: 14, rank: 14, name: "yuurih", realName: "Yuri Santos", team: "FURIA", country: "BR", countryFlag: flag.BR, rating: 1.15, kd: "1.11", adr: 69.4, kast: "69.0%", swing: "-0.04", impact: 1.04, dpr: 0.69, hsPercent: "50.5%", image: playerPhoto.yuurih, teamLogo: logo.furia, totalKills: 11500, totalDeaths: 10400, assists: 2200, openingKills: 1650, clutchesWon: 78 },
  { id: 15, rank: 15, name: "KSCERATO", realName: "Kaike Cerato", team: "FURIA", country: "BR", countryFlag: flag.BR, rating: 1.19, kd: "1.10", adr: 68.1, kast: "71.8%", swing: "-0.02", impact: 1.03, dpr: 0.61, hsPercent: "52.9%", image: playerPhoto.kscerato, teamLogo: logo.furia, totalKills: 12200, totalDeaths: 10900, assists: 2100, openingKills: 1750, clutchesWon: 92 },
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
  { id: 1, channel: "ESL_CSGO", title: "PGL ASTANA 2026 - Semifinals", viewers: 124500, game: "Counter-Strike 2", language: "EN", thumbnail: esportsArena },
  { id: 2, channel: "gaules", title: "WATCHPARTY IEM Katowice - VAMO FURIA!", viewers: 51200, game: "Counter-Strike 2", language: "PT", thumbnail: crowdArena },
  { id: 3, channel: "MaDHousE_TV", title: "Analisando as semis do IEM Katowice", viewers: 14800, game: "Counter-Strike 2", language: "PT", thumbnail: esportStage },
  { id: 4, channel: "fl0m", title: "Rank S Grind & IEM Watch Along", viewers: 12300, game: "Counter-Strike 2", language: "EN", thumbnail: gamingSetup },
  { id: 5, channel: "BLAST_TV", title: "BLAST Premier Spring Spring Groups", viewers: 82300, game: "Counter-Strike 2", language: "EN", thumbnail: stadium },
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
      { title: "donk 1v4 clutch", player: "donk", event: "PGL ASTANA 2026", round: "Round 28", description: "donk dismantled NAVI's defense with a 1v4 clutch that turned the semifinal around." },
    ],
    recentMatches: [
      { team1: "NAVI", team1Logo: logo.navi, score1: 13, team2: "FaZe", team2Logo: logo.faze, score2: 11, event: "PGL ASTANA 2026", date: "Today" },
      { team1: "Spirit", team1Logo: logo.spirit, score1: 16, team2: "G2", team2Logo: logo.g2, score2: 9, event: "BLAST Premier Spring", date: "Yesterday" },
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
    recentMatches: [
      { team1: "Vitality", team1Logo: logo.vitality, score1: 16, team2: "Spirit", team2Logo: logo.spirit, score2: 9, event: "PGL ASTANA 2026", date: "Today" },
      { team1: "NAVI", team1Logo: logo.navi, score1: 16, team2: "G2", team2Logo: logo.g2, score2: 13, event: "BLAST Premier Spring", date: "Yesterday" },
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
    recentMatches: [
      { team1: "G2", team1Logo: logo.g2, score1: 16, team2: "FaZe", team2Logo: logo.faze, score2: 12, event: "ESL Pro League", date: "Mar 2" },
      { team1: "FURIA", team1Logo: logo.furia, score1: 13, team2: "Liquid", team2Logo: logo.liquid, score2: 16, event: "BLAST Premier Spring", date: "Mar 1" },
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
      { title: "donk ace through water", player: "donk", event: "BLAST Premier Spring 2025", round: "Round 18", description: "donk pushed through the canal and aced the entire CT side with a Deagle in a force buy round." },
    ],
    recentMatches: [
      { team1: "G2", team1Logo: logo.g2, score1: 7, team2: "Liquid", team2Logo: logo.liquid, score2: 10, event: "BLAST Premier Spring", date: "Today" },
      { team1: "Spirit", team1Logo: logo.spirit, score1: 16, team2: "MOUZ", team2Logo: logo.mouz, score2: 12, event: "PGL ASTANA 2026", date: "Yesterday" },
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
    recentMatches: [
      { team1: "Vitality", team1Logo: logo.vitality, score1: 16, team2: "Astralis", team2Logo: logo.astralis, score2: 10, event: "PGL ASTANA 2026", date: "Mar 2" },
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
    recentMatches: [
      { team1: "NAVI", team1Logo: logo.navi, score1: 16, team2: "Spirit", team2Logo: logo.spirit, score2: 14, event: "PGL ASTANA 2026", date: "Yesterday" },
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
    recentMatches: [
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

export interface MapCalloutQuiz {
  callout: string;
  description: string;
  correctMap: string;
  difficulty: "easy" | "medium" | "hard";
}

export const mapCalloutQuizzes: MapCalloutQuiz[] = gameMaps.flatMap((map) =>
  map.callouts.slice(0, 6).map((callout, index) => ({
    callout,
    description: `Identify the map that uses the ${callout} callout.`,
    correctMap: map.name,
    difficulty: index < 2 ? "easy" : index < 4 ? "medium" : "hard",
  }))
);

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
  { id: 1, title: "donk 1v4 AK clutch on Mirage", player: "donk", playerImage: playerPhoto.donk, team: "Team Spirit", teamLogo: logo.spirit, event: "PGL ASTANA 2026", map: "Mirage", type: "clutch", date: "Today", views: 524000, likes: 41200, thumbnail: esportsArena, description: "In the semifinal, donk found himself in an impossible 1v4 situation. What followed was a masterclass in positioning and aim that will be remembered for years." },
  { id: 2, title: "ZywOo insane AWP 4k holds B site", player: "ZywOo", playerImage: playerPhoto.zywoo, team: "Vitality", teamLogo: logo.vitality, event: "PGL ASTANA 2026", map: "Inferno", type: "awp", date: "Today", views: 312000, likes: 28500, thumbnail: crowdArena, description: "ZywOo locked down banana with four consecutive AWP kills, denying FaZe's B execute completely." },
  { id: 3, title: "NiKo pistol round ace with USP-S", player: "NiKo", playerImage: playerPhoto.niko, team: "Falcons", teamLogo: logo.falcons, event: "BLAST Premier Spring Spring", map: "Dust II", type: "pistol", date: "Yesterday", views: 267000, likes: 22300, thumbnail: gamingKeyboard, description: "NiKo opened the half with a clean pistol ace, hitting all five headshots with the USP-S." },
  { id: 4, title: "m0NESY no-scope collateral through smoke", player: "m0NESY", playerImage: playerPhoto.m0nesy, team: "Falcons", teamLogo: logo.falcons, event: "ESL Pro League S21", map: "Anubis", type: "awp", date: "Yesterday", views: 445000, likes: 38100, thumbnail: neonLights, description: "A blind no-scope through smoke that collateraled two players. The entire arena erupted." },
  { id: 5, title: "ropz 1v3 ninja defuse on Nuke", player: "ropz", playerImage: playerPhoto.ropz, team: "Vitality", teamLogo: logo.vitality, event: "PGL ASTANA 2026", map: "Nuke", type: "clutch", date: "Mar 2", views: 198000, likes: 15600, thumbnail: pcBuild, description: "ropz hid in secret, waited for all Ts to rotate away, and pulled off the ninja defuse to save the half." },
  { id: 6, title: "donk Deagle ace on eco round", player: "donk", playerImage: playerPhoto.donk, team: "Team Spirit", teamLogo: logo.spirit, event: "BLAST Premier Spring Spring", map: "Ancient", type: "deagle", date: "Mar 2", views: 389000, likes: 31200, thumbnail: conferenceHall, description: "On a full eco, donk bought a Deagle and proceeded to one-tap the entire enemy team in 8 seconds." },
  { id: 7, title: "ZywOo wallbang triple through mid doors", player: "ZywOo", playerImage: playerPhoto.zywoo, team: "Vitality", teamLogo: logo.vitality, event: "ESL Pro League S21", map: "Dust II", type: "wallbang", date: "Mar 1", views: 276000, likes: 21800, thumbnail: gamingKeyboard, description: "ZywOo wallbanged three players through mid doors with the AWP in rapid succession." },
  { id: 8, title: "NiKo 1v2 clutch with 1 HP", player: "NiKo", playerImage: playerPhoto.niko, team: "Falcons", teamLogo: logo.falcons, event: "PGL ASTANA 2026", map: "Mirage", type: "clutch", date: "Mar 1", views: 334000, likes: 27500, thumbnail: crowdArena, description: "At 1 HP, NiKo hit two insane headshots to win the round and secure the map for Falcons." },
  { id: 9, title: "m0NESY jumping AWP shot on Ancient", player: "m0NESY", playerImage: playerPhoto.m0nesy, team: "Falcons", teamLogo: logo.falcons, event: "BLAST Premier Spring Spring", map: "Ancient", type: "awp", date: "Feb 28", views: 512000, likes: 42100, thumbnail: conferenceHall, description: "Reminiscent of the legendary coldzera play, m0NESY hit a jumping AWP shot at A Main." },
  { id: 10, title: "ropz spray transfer 4k on Inferno", player: "ropz", playerImage: playerPhoto.ropz, team: "Vitality", teamLogo: logo.vitality, event: "ESL Pro League S21", map: "Inferno", type: "ace", date: "Feb 27", views: 178000, likes: 14200, thumbnail: esportsArena, description: "ropz pulled off a ridiculous spray transfer from banana to dark, killing four players in one spray." },
];

export const roundHighlight: RoundHighlight = {
  id: 1,
  title: "donk's Incredible 1v4 Clutch",
  event: "PGL ASTANA 2026",
  team1: { name: "Team Spirit", color: "#6164f5", shortname: "SPIRIT", logo: logo.spirit },
  team2: { name: "Falcons", color: "#34d399", shortname: "FALCONS", logo: logo.falcons },
  round: 22,
  player: "donk",
  description: "An incredible 1v4 clutch that turned the entire series around. Armed with only an AK-47 and a dream, he systematically eliminated each opponent in a masterclass of positioning and aim.",
  thumbnail: esportsArena,
  youtubeId: "dQw4w9WgXcQ",
};

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

// -- Player Profiles (detailed) --
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
  recentMatches: { event: string; opponent: string; opponentLogo: string; result: string; rating: number; kills: number; deaths: number; map: string }[];
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
  eventHistory: { event: string; tier: string; rating: number; maps: number; placement: string; date: string }[];
}

const makeProfile = (p: Player, pId: number, extra: Partial<PlayerProfile>): PlayerProfile => {
  const id = pId || p.id;
  const rating = p.rating || 1.0;
  
  return {
    id,
    nickname: p.name,
    realName: p.realName,
    age: extra.age || (18 + (id % 12)),
    rank: p.rank || 0,
    country: p.country,
    countryFlag: p.countryFlag,
    image: p.image,
    team: p.team,
    teamLogo: p.teamLogo,
    role: extra.role || (id % 3 === 0 ? "IGL" : id % 3 === 1 ? "AWPer" : "Rifler"),
    rating2: rating,
    dpr: p.dpr || 0.65,
    kast: p.kast || "72.5%",
    swing: p.swing || "+0.00",
    impact: p.impact || 1.05,
    adr: p.adr || 75.2,
    kd: p.kd || "1.05",
    hsPercent: p.hsPercent || "50.0%",
    mapsPlayed: extra.mapsPlayed || (200 + (id % 50) * 40),
    totalKills: p.totalKills || (4500 + (id % 50) * 300),
    totalDeaths: p.totalDeaths || (4200 + (id % 50) * 280),
    assists: p.assists || (900 + (id % 50) * 60),
    roundsPlayed: (extra.mapsPlayed || 200) * 24,
    clutchesWon: p.clutchesWon || (30 + (id % 20)),
    clutchesTotal: (p.clutchesWon ? Math.round(p.clutchesWon * 1.8) : (60 + (id % 20) * 2)),
    openingKills: p.openingKills || (250 + (id % 30)),
    openingDeaths: (p.openingKills ? Math.round(p.openingKills * 0.9) : (230 + (id % 30))),
    awpKillsRound: extra.awpKillsRound || (extra.role === "AWPer" ? 0.35 : 0.05),
    bestMaps: extra.bestMaps || [
      { map: "Ancient", rating: +(rating + 0.05).toFixed(2), winRate: 62.4, matches: 45 },
      { map: "Anubis", rating: +(rating + 0.02).toFixed(2), winRate: 58.1, matches: 38 },
      { map: "Mirage", rating: +(rating - 0.02).toFixed(2), winRate: 54.7, matches: 52 },
    ],
    weaponStats: extra.weaponStats || [
      { weapon: "AK-47", kills: 2450, hsPercent: "52.4%" },
      { weapon: "M4A1-S", kills: 1820, hsPercent: "48.5%" },
      { weapon: "Desert Eagle", kills: 420, hsPercent: "64.1%" },
    ],
    recentMatches: extra.recentMatches || [
      { event: "PGL ASTANA 2026", opponent: "Vitality", opponentLogo: logo.vitality, result: "L 1-2", rating: +(rating - 0.05).toFixed(2), kills: 48, deaths: 52, map: "BO3" },
      { event: "PGL ASTANA 2026", opponent: "G2 Esports", opponentLogo: logo.g2, result: "W 16-11", rating: +(rating + 0.12).toFixed(2), kills: 24, deaths: 15, map: "Dust II" },
    ],
    teamHistory: extra.teamHistory || [],
    achievements: extra.achievements || [],
    bio: extra.bio || `Professional Counter-Strike 2 player currently playing for ${p.team}.`,
    personalBio: extra.personalBio,
    biography: extra.biography,
    teamSlug: extra.teamSlug || p.team.toLowerCase().replace(/ /g, "-"),
    region: extra.region || "Europe",
    majorWins: extra.majorWins || 0,
    signatureWeapon: extra.signatureWeapon || (extra.role === "AWPer" ? "AWP" : "AK-47"),
    careerEarnings: extra.careerEarnings || "$150,000",
    peakRating: extra.peakRating || +(rating + 0.10).toFixed(2),
    peakRatingDate: extra.peakRatingDate || "2025",
    form: extra.form || [
      { month: "Jan", rating: +(rating - 0.02).toFixed(2) },
      { month: "Feb", rating: +(rating + 0.04).toFixed(2) },
      { month: "Mar", rating: rating },
    ],
    eventHistory: extra.eventHistory || [],
  };
};

const manuallyDefinedProfiles: PlayerProfile[] = [
  makeProfile(topPlayers[0], 1, {
    age: 19,
    role: "Star Player",
    bio: "The youngest player to ever reach #1 in the HLTV rankings. donk burst onto the scene from Spirit's academy and immediately dominated with unmatched aim and game sense.",
    majorWins: 0,
    careerEarnings: "$911,592",
    teamHistory: [
      { team: "Team Spirit", logo: logo.spirit, period: "Jul 2023 - Present" },
      { team: "Team Spirit Academy", logo: logo.spirit, period: "Dec 2021 - Jul 2023" },
    ],
    achievements: ["HLTV #1 Player 2025", "PGL ASTANA 2026 MVP"],
    personalBio: {
      born: "January 25, 2007",
      nationality: "Russia",
      status: "Active",
      yearsActive: "2021 - Present",
      liquipediaRole: "Entry",
      games: ["Global Offensive", "Counter-Strike 2"],
      summary: "Liquipedia lists Danil Kryshkovets as a Russian CS2 entry player for Team Spirit. His page highlights the jump from Spirit Academy into the main roster and his rapid rise as one of the world's standout riflers.",
      sourceUrl: "https://liquipedia.net/counterstrike/Donk",
      sourceLabel: "Liquipedia - donk",
    },
    biography: {
      intro: "Danil \"donk\" Kryshkovets is the rare academy prospect whose rise became a top-tier storyline almost immediately. Liquipedia's record traces a compact but explosive career: Team Spirit Academy at the end of 2021, promotion to the main Spirit roster in July 2023, then a run of awards, MVPs, and records that made him one of CS2's defining young stars.",
      sections: [
        {
          title: "Academy foundation",
          body: "donk's listed professional history starts on December 28, 2021 with Team Spirit Academy. That period matters because it frames him as a player developed inside Spirit's own system rather than a finished star bought from another top roster. By the time he left the academy, the identity was already clear: aggressive entry work, elite mechanical pressure, and confidence far beyond his age.",
        },
        {
          title: "Promotion to Spirit",
          body: "On July 5, 2023, Liquipedia records his move from Team Spirit Academy to Team Spirit's main roster. The jump turned his promise into a tier-one test. His early interviews around BetBoom Dacha Dubai show how quickly the conversation shifted from prospect to centerpiece, with Spirit building around his opening pressure and raw rifling output.",
        },
        {
          title: "Breakout and records",
          body: "Liquipedia's trivia and awards sections show how steep the climb became after the promotion. He was named HLTV's best player of 2024, runner-up for 2025, Rookie of the Year 2024, and Opener of the Year in both 2024 and 2025. The same page credits him with 10 HLTV MVP awards, including a Major MVP, and records tied to age, Big Event rating, Major rating, and early-career MVP pace.",
        },
      ],
      timeline: [
        { period: "2021-12-28", title: "Team Spirit Academy", description: "Begins his recorded professional run inside Spirit's academy system." },
        { period: "2023-07-05", title: "Team Spirit", description: "Promoted to the main roster and starts his tier-one breakthrough." },
        { period: "2023-12", title: "First major spotlight", description: "BetBoom Dacha Dubai becomes a public turning point, with interviews and MVP recognition around his first major international impact." },
        { period: "2024-2025", title: "Elite status", description: "Liquipedia lists HLTV yearly awards, multiple MVPs, and age-related records that establish him as one of CS2's headline riflers." },
      ],
      highlights: [
        "HLTV #1 player of 2024 and #2 player of 2025.",
        "Rookie of the Year 2024 and Opener of the Year in 2024 and 2025.",
        "10 HLTV MVP awards listed by Liquipedia, including one Major MVP.",
        "Recorded as the youngest player to win a Major and to be Major MVP on Liquipedia's records list.",
      ],
      sourceUrl: "https://liquipedia.net/counterstrike/Donk",
      sourceLabel: "Liquipedia - donk",
    },
  }),
  makeProfile(topPlayers[1], 2, {
    age: 25,
    role: "AWPer",
    bio: "The French prodigy who has won the HLTV #1 award twice. Led Vitality to a Major championship in Paris.",
    majorWins: 1,
    careerEarnings: "$2,167,560",
    teamHistory: [
      { team: "Team Vitality", logo: logo.vitality, period: "Oct 2018 - Present" },
      { team: "against All authority", logo: "", period: "Sep 2017 - Oct 2018" },
      { team: "WySix Team", logo: "", period: "Mar 2017 - Sep 2017" },
      { team: "E-Corp Bumpers", logo: "", period: "Jan 2017 - Mar 2017" },
      { team: "Nevermind", logo: "", period: "Aug 2016 - Jan 2017" },
      { team: "dizLown", logo: "", period: "2014 - 2015" },
    ],
    achievements: ["HLTV #1 Player 2020", "HLTV #1 Player 2021", "PGL Major Copenhagen 2024 MVP"],
    personalBio: {
      born: "November 9, 2000",
      nationality: "France",
      status: "Active",
      yearsActive: "2016 - Present",
      liquipediaRole: "AWPer / Rifler",
      alternateIds: ["Herbus Doubledoor"],
      nicknames: ["The Chosen One"],
      games: ["Global Offensive", "Counter-Strike 2"],
      summary: "Liquipedia presents Mathieu Herbaut as a French player who has been with Team Vitality since 2018 and currently plays CS2 as their AWPer.",
      sourceUrl: "https://liquipedia.net/counterstrike/ZywOo",
      sourceLabel: "Liquipedia - ZywOo",
    },
    biography: {
      intro: "Mathieu \"ZywOo\" Herbaut's Liquipedia page reads like the profile of a player who entered tier one already prepared for the spotlight. His path moves through several French teams before Team Vitality, but the dominant arc is simple: local prodigy, Vitality franchise player, then one of the most decorated players in Counter-Strike history.",
      sections: [
        {
          title: "French scene roots",
          body: "Liquipedia lists early stops with dizLown, Nevermind, E-Corp Bumpers, WySix Team, and against All authority before his move to Team Vitality. That path shows a steady climb through the French ecosystem rather than an instant jump into an international lineup. The aAa period closed just before his Vitality signing, making 2018 the clear transition point from prospect to tier-one centerpiece.",
        },
        {
          title: "Vitality era",
          body: "ZywOo joined Team Vitality on October 8, 2018 and remains listed there as an active AWPer. Liquipedia describes him as a French CS2 player and former CS:GO player, with roles listed as AWPer and rifler. His Vitality tenure is the spine of the biography: every major peak, ranking award, Major title, and Grand Slam listed on the page comes through that organization.",
        },
        {
          title: "All-time status",
          body: "Liquipedia states that ZywOo is widely considered one of the greatest players ever. The page credits him as HLTV's best player in 2019, 2020, 2023, and 2025, runner-up in 2021 and 2022, holder of a record 32 HLTV MVP awards, winner of three Major championships with three Major MVPs, and part of two ESL Grand Slam runs.",
        },
      ],
      timeline: [
        { period: "2014-2018", title: "French ascent", description: "Moves through dizLown, Nevermind, E-Corp Bumpers, WySix Team, and against All authority." },
        { period: "2018-10-08", title: "Team Vitality", description: "Joins Vitality, where his entire elite-level career is built." },
        { period: "2019-2020", title: "Immediate world-class peak", description: "Liquipedia lists him as HLTV's best player in back-to-back years." },
        { period: "2023-2026", title: "Major and Grand Slam legacy", description: "Liquipedia lists three Major titles, three Major MVPs, two ESL Grand Slams, and repeated player-of-the-year recognition." },
      ],
      highlights: [
        "HLTV #1 player in 2019, 2020, 2023, and 2025.",
        "Record 32 HLTV MVP awards listed by Liquipedia.",
        "Three Major championships and three Major MVP awards.",
        "Two ESL Grand Slams with Team Vitality.",
      ],
      sourceUrl: "https://liquipedia.net/counterstrike/ZywOo",
      sourceLabel: "Liquipedia - ZywOo",
    },
  }),
  makeProfile(topPlayers[2], 3, {
    age: 29,
    role: "Star Player",
    bio: "One of the most naturally gifted aimers in history. Now leading Falcons firepower.",
    majorWins: 0,
    careerEarnings: "$1,834,296",
    teamHistory: [
      { team: "Team Falcons", logo: logo.falcons, period: "Jan 2025 - Present" },
      { team: "G2 Esports", logo: logo.g2, period: "Oct 2020 - Jan 2025" },
      { team: "FaZe Clan", logo: logo.faze, period: "Feb 2017 - Oct 2020" },
      { team: "mousesports", logo: logo.mouz, period: "Mar 2015 - Feb 2017" },
      { team: "iNation", logo: "", period: "Jan 2015 - Mar 2015" },
      { team: "aimface", logo: "", period: "Aug 2014 - Jan 2015" },
      { team: "GamePub", logo: "", period: "Dec 2013 - Mar 2014" },
      { team: "iNation", logo: "", period: "Nov 2013 - Dec 2013" },
      { team: "Team Refuse", logo: "", period: "Aug 2013 - Nov 2013" },
      { team: "iNation", logo: "", period: "Mar 2013 - Aug 2013" },
      { team: "e-Sports.rs", logo: "", period: "Jan 2013 - Mar 2013" },
      { team: "iNation", logo: "", period: "2012 - 2013" },
    ],
    achievements: ["IEM Katowice 2022 MVP"],
    personalBio: {
      born: "February 16, 1997",
      nationality: "Bosnia and Herzegovina",
      status: "Active",
      yearsActive: "2009 - Present",
      liquipediaRole: "Entry",
      alternateIds: ["NiKolinho", "nIKOLINHO", "nik0k0"],
      games: ["Counter-Strike", "Global Offensive", "Counter-Strike 2"],
      summary: "Liquipedia describes Nikola Kovac as a Bosnian Serb Counter-Strike player for Team Falcons and notes his long career across CS, CS:GO, and CS2.",
      sourceUrl: "https://liquipedia.net/counterstrike/NiKo",
      sourceLabel: "Liquipedia - NiKo",
    },
    biography: {
      intro: "Nikola \"NiKo\" Kovac has the longest story of the top three. Liquipedia traces him back to Counter-Strike before CS:GO, with a career beginning in 2009 and a list of early Balkan teams before the international stages that made him a defining rifler of the modern era.",
      sections: [
        {
          title: "Counter-Strike beginnings",
          body: "Liquipedia records NiKo's early Counter-Strike history with FullProof, eu4ia, neWave, maksnet, and other pre-CS:GO stops. This gives his profile a different shape from younger CS2 stars: he is not only a CS:GO-era prodigy, but a player whose competitive timeline begins in the older Counter-Strike scene.",
        },
        {
          title: "International superstar",
          body: "The Liquipedia overview lists him as a Bosnian Serb professional Counter-Strike 2 player for Team Falcons, with Counter-Strike, Global Offensive, and Counter-Strike 2 all included in his games. His alternate IDs, including NiKolinho and nIKOLINHO, reflect the long arc of his career before the shortened NiKo identity became one of Counter-Strike's most recognizable names.",
        },
        {
          title: "Trophies and near-misses",
          body: "Liquipedia's achievements table captures both the wins and the tension of NiKo's career. It includes S-Tier titles such as IEM Katowice 2023, IEM Cologne 2023, BLAST Premier World Final 2022 and 2024, BLAST Premier Fall Final 2024, and PGL Bucharest 2025, while also listing the PGL Major Stockholm 2021 runner-up finish that remains a major chapter in his story.",
        },
      ],
      timeline: [
        { period: "2009-2012", title: "Early Counter-Strike years", description: "Liquipedia lists the start of his player activity and early teams including FullProof, eu4ia, neWave, and maksnet." },
        { period: "CS:GO era", title: "Rise as a rifler", description: "Builds a reputation as one of the elite individual players in Global Offensive." },
        { period: "2021-2024", title: "G2 trophy window", description: "Liquipedia's achievements include major S-Tier wins and the PGL Major Stockholm 2021 runner-up finish." },
        { period: "2025-Present", title: "Team Falcons", description: "Listed by Liquipedia as an active Team Falcons player, continuing his career in CS2." },
      ],
      highlights: [
        "Years active listed from 2009 to present.",
        "Liquipedia lists Counter-Strike, Global Offensive, and Counter-Strike 2 in his game history.",
        "S-Tier titles include IEM Katowice 2023, IEM Cologne 2023, BLAST Premier World Final 2024, and PGL Bucharest 2025.",
        "PGL Major Stockholm 2021 runner-up is listed among his major achievements.",
      ],
      sourceUrl: "https://liquipedia.net/counterstrike/NiKo",
      sourceLabel: "Liquipedia - NiKo",
    },
  }),
  makeProfile(topPlayers[3], 4, {
    age: 21,
    role: "AWPer",
    bio: "Explosive young sniper. Formed a legendary duo with NiKo in G2 before moving to Falcons.",
    majorWins: 0,
    careerEarnings: "$956,710",
    teamHistory: [
      { team: "Team Falcons", logo: logo.falcons, period: "Apr 2025 - Present" },
      { team: "G2 Esports", logo: logo.g2, period: "Jan 2022 - Apr 2025" },
      { team: "Natus Vincere Junior", logo: logo.navi, period: "Mar 2021 - Dec 2021" },
      { team: "Natus Vincere Youth", logo: logo.navi, period: "Apr 2020 - Feb 2021" },
      { team: "NAVI Junior", logo: logo.navi, period: "Jan 2020 - Mar 2021" },
      { team: "S-Gaming", logo: "", period: "Oct 2019 - Nov 2019" },
      { team: "NewBALLS", logo: "", period: "Jul 2019 - Oct 2019" },
    ],
    achievements: ["ESL Pro League S18 MVP"],
    personalBio: {
      born: "May 1, 2005",
      nationality: "Russia",
      status: "Active",
      yearsActive: "2019 - Present",
      liquipediaRole: "AWPer",
      alternateIds: ["m0"],
      nicknames: ["The Flash", "Baby GOAT"],
      games: ["Global Offensive", "Counter-Strike 2"],
      summary: "Liquipedia lists Ilya Osipov as a Russian AWPer for Team Falcons, with a career path that includes NAVI Junior and G2 before his Falcons move.",
      sourceUrl: "https://liquipedia.net/counterstrike/M0NESY",
      sourceLabel: "Liquipedia - m0NESY",
    },
  }),
  makeProfile(topPlayers[4], 5, {
    age: 26,
    role: "Lurker",
    bio: "The Estonian maestro known for precise spray transfers. Part of FaZe's Grand Slam winning core.",
    majorWins: 1,
    careerEarnings: "$2,585,227",
    teamHistory: [
      { team: "Team Vitality", logo: logo.vitality, period: "Jan 2025 - Present" },
      { team: "FaZe Clan", logo: logo.faze, period: "Jan 2022 - Dec 2024" },
      { team: "MOUZ", logo: logo.mouz, period: "Oct 2021 - Dec 2021" },
      { team: "mousesports", logo: logo.mouz, period: "Apr 2017 - Oct 2021" },
      { team: "AWTR", logo: "", period: "Oct 2016 - Nov 2016" },
      { team: "OnlineBOTS", logo: "", period: "May 2016 - Aug 2016" },
    ],
    achievements: ["PGL Major Antwerp 2022 Champion"],
    personalBio: {
      born: "December 22, 1999",
      nationality: "Estonia",
      status: "Active",
      yearsActive: "2015 - Present",
      liquipediaRole: "Lurker",
      games: ["Global Offensive", "Counter-Strike 2"],
      summary: "Liquipedia identifies Robin Kool as an Estonian CS2 player for Team Vitality and notes his decorated career across mousesports, MOUZ, FaZe Clan, and Vitality.",
      sourceUrl: "https://liquipedia.net/counterstrike/Ropz",
      sourceLabel: "Liquipedia - ropz",
    },
  }),
  
  // FalleN (Legend)
  makeProfile({
    id: 100, rank: 0, name: "FalleN", realName: "Gabriel Toledo", team: "FURIA", country: "BR", countryFlag: flag.BR,
    rating: 0.98, kd: "1.02", adr: 68.5, kast: "68.2%", swing: "-0.05", impact: 0.95, dpr: 0.68, hsPercent: "41.2%",
    image: playerPhoto.fallen, teamLogo: logo.furia, totalKills: 48392, totalDeaths: 44200, assists: 8200, openingKills: 5124, clutchesWon: 487
  }, 100, {
    age: 34, role: "AWPer / IGL", majorWins: 2, careerEarnings: "$1,250,000",
    bio: "The 'Godfather' of Brazilian Counter-Strike. Led Luminosity and SK Gaming to back-to-back Major titles in 2016.",
    teamHistory: [{ team: "FURIA", logo: logo.furia, period: "2023 – Present" }, { team: "Imperial", logo: logo.imperial, period: "2022 – 2023" }, { team: "Liquid", logo: logo.liquid, period: "2021 – 2022" }],
    achievements: ["Major Champion (MLG Columbus 2016)", "Major Champion (ESL One Cologne 2016)", "Intel Grand Slam S1 Champion"]
  }),

  // cadian
  makeProfile({
    id: 101, rank: 0, name: "cadian", realName: "Casper Møller", team: "Team Liquid", country: "DK", countryFlag: flag.DK,
    rating: 1.05, kd: "1.08", adr: 72.4, kast: "70.5%", swing: "+0.02", impact: 1.10, dpr: 0.64, hsPercent: "38.5%",
    image: playerPhoto.cadian, teamLogo: logo.liquid, totalKills: 22400, totalDeaths: 20100, assists: 4500, openingKills: 2800, clutchesWon: 310
  }, 101, {
    age: 30, role: "AWPer / IGL", majorWins: 0, careerEarnings: "$650,000",
    bio: "Passionate leader known for his emotional style and clutch plays. Built the modern Heroic era.",
    teamHistory: [{ team: "Liquid", logo: logo.liquid, period: "2023 – Present" }, { team: "Heroic", logo: logo.heroic, period: "2019 – 2023" }],
    achievements: ["BLAST Premier Fall Final 2022 Champion"]
  }),

  // jimpphat
  makeProfile({
    id: 102, rank: 0, name: "jimpphat", realName: "Jimi Salo", team: "MOUZ", country: "FI", countryFlag: flag.FI,
    rating: 1.15, kd: "1.18", adr: 78.2, kast: "74.1%", swing: "+0.08", impact: 1.12, dpr: 0.61, hsPercent: "48.5%",
    image: playerPhoto.jimpphat, teamLogo: logo.mouz, totalKills: 5800, totalDeaths: 4900, assists: 1100, openingKills: 650, clutchesWon: 54
  }, 102, {
    age: 18, role: "Rifler", bio: "One of the most composed young players in the world. Rapidly becoming an elite tier-one rifler.",
    teamHistory: [{ team: "MOUZ", logo: logo.mouz, period: "2023 – Present" }],
    achievements: ["ESL Pro League S18 Champion"]
  }),

  // chopper
  makeProfile({
    id: 103, rank: 0, name: "chopper", realName: "Leonid Vishnyakov", team: "Team Spirit", country: "RU", countryFlag: flag.RU,
    rating: 0.98, kd: "1.00", adr: 68.2, kast: "69.5%", swing: "-0.05", impact: 0.95, dpr: 0.68, hsPercent: "42.1%",
    image: playerPhoto.chopper, teamLogo: logo.spirit, totalKills: 28400, totalDeaths: 29100, assists: 7500, openingKills: 2100, clutchesWon: 245
  }, 103, {
    age: 28, role: "IGL", bio: "The architect behind Spirit's tactical depth. Orchestrated their rise to world #1.",
    teamHistory: [{ team: "Spirit", logo: logo.spirit, period: "2019 – Present" }],
    achievements: ["IEM Katowice 2024 Champion"]
  }),

  // nexa
  makeProfile({
    id: 104, rank: 0, name: "nexa", realName: "Nemanja Isaković", team: "G2 Esports", country: "RS", countryFlag: flag.RS,
    rating: 0.96, kd: "0.98", adr: 68.2, kast: "69.5%", swing: "-0.04", impact: 0.90, dpr: 0.70, hsPercent: "42.1%",
    image: playerPhoto.nexa, teamLogo: logo.g2, totalKills: 21200, totalDeaths: 21800, assists: 5800, openingKills: 1650, clutchesWon: 142
  }, 104, {
    age: 27, role: "Rifler / Support", bio: "A versatile tactical player who has led major European rosters.",
    teamHistory: [{ team: "G2", logo: logo.g2, period: "2023 – 2025" }, { team: "OG", logo: logo.vitality, period: "2022 – 2023" }],
    achievements: ["PGL Major Stockholm 2021 Finalist"]
  }),

  // hooxi
  makeProfile({
    id: 105, rank: 0, name: "hooxi", realName: "Rasmus Nielsen", team: "G2 Esports", country: "DK", countryFlag: flag.DK,
    rating: 0.88, kd: "0.85", adr: 64.2, kast: "66.8%", swing: "-0.12", impact: 0.82, dpr: 0.74, hsPercent: "44.5%",
    image: playerPhoto.hooxi, teamLogo: logo.g2, totalKills: 18400, totalDeaths: 21500, assists: 5200, openingKills: 1400, clutchesWon: 120
  }, 105, {
    age: 29, role: "IGL", bio: "The 'Gigachad' leader of G2's trophy-winning era.",
    teamHistory: [{ team: "G2", logo: logo.g2, period: "2022 – 2025" }],
    achievements: ["IEM Katowice 2023 Champion", "IEM Cologne 2023 Champion"]
  }),

  // brollan
  makeProfile({
    id: 106, rank: 0, name: "brollan", realName: "Ludvig Brolin", team: "MOUZ", country: "SE", countryFlag: "🇸🇪",
    rating: 1.08, kd: "1.05", adr: 74.2, kast: "71.5%", swing: "+0.01", impact: 1.10, dpr: 0.68, hsPercent: "48.5%",
    image: playerPhoto.brollan, teamLogo: logo.mouz, totalKills: 15400, totalDeaths: 14200, assists: 3100, openingKills: 1950, clutchesWon: 85
  }, 106, {
    age: 23, role: "Rifler", bio: "Swedish entry-fragging specialist. Former Fnatic superstar.",
    teamHistory: [{ team: "MOUZ", logo: logo.mouz, period: "2024 – Present" }, { team: "NiP", logo: logo.astralis, period: "2022 – 2023" }],
    achievements: ["ESL Pro League S11 Champion"]
  }),

  // osee
  makeProfile({
    id: 107, rank: 0, name: "osee", realName: "Josh Ohm", team: "Team Liquid", country: "US", countryFlag: flag.US,
    rating: 1.02, kd: "1.05", adr: 70.4, kast: "72.1%", swing: "+0.00", impact: 1.05, dpr: 0.62, hsPercent: "35.8%",
    image: playerPhoto.osee, teamLogo: logo.liquid, totalKills: 11500, totalDeaths: 10800, assists: 2100, openingKills: 1450, clutchesWon: 98
  }, 107, {
    age: 26, role: "AWPer", bio: "One of North America's most consistent snipers.",
    teamHistory: [{ team: "Liquid", logo: logo.liquid, period: "2022 – 2024" }],
    achievements: ["IEM Dallas 2023 3rd Place"]
  }),

  // chelo
  makeProfile({
    id: 108, rank: 0, name: "chelo", realName: "Marcelo Cespedes", team: "Imperial", country: "BR", countryFlag: flag.BR,
    rating: 1.05, kd: "1.06", adr: 76.5, kast: "71.2%", swing: "+0.01", impact: 1.12, dpr: 0.68, hsPercent: "52.4%",
    image: playerPhoto.chelo, teamLogo: logo.imperial, totalKills: 18500, totalDeaths: 17400, assists: 4100, openingKills: 2100, clutchesWon: 142
  }, 108, {
    age: 27, role: "Rifler", bio: "High-impact Brazilian entry fragger.",
    teamHistory: [{ team: "Imperial", logo: logo.imperial, period: "2025 – Present" }, { team: "FURIA", logo: logo.furia, period: "2023 – 2025" }]
  }),

  // skullz
  makeProfile({
    id: 109, rank: 0, name: "skullz", realName: "Felipe Medeiros", team: "Imperial", country: "BR", countryFlag: flag.BR,
    rating: 1.02, kd: "1.04", adr: 71.8, kast: "72.5%", swing: "+0.00", impact: 1.02, dpr: 0.64, hsPercent: "48.2%",
    image: playerPhoto.skullz, teamLogo: logo.imperial, totalKills: 9200, totalDeaths: 8800, assists: 1900, openingKills: 850, clutchesWon: 68
  }, 109, {
    age: 23, role: "Rifler", bio: "Rising Brazilian star, known for his time in Liquid and FURIA.",
    teamHistory: [{ team: "Imperial", logo: logo.imperial, period: "2025 – Present" }, { team: "FURIA", logo: logo.furia, period: "2024 – 2025" }, { team: "Liquid", logo: logo.liquid, period: "2023 – 2024" }]
  }),
];

const manuallyDefinedNames = new Set(manuallyDefinedProfiles.map(p => p.nickname.toLowerCase()));
const autoGeneratedProfiles: PlayerProfile[] = [];
let nextPlayerId = 200;

// -- Team Rosters (for Guess the Lineup game & Team pages) --
export interface TeamRoster {
  teamName: string;
  teamLogo: string;
  teamshortname: string;
  players: string[];
}

export const teamRosters: TeamRoster[] = [
  { teamName: "Team Spirit", teamLogo: logo.spirit, teamshortname: "Spirit", players: ["donk", "sh1ro", "magixx", "zont1x", "chopper"] },
  { teamName: "Vitality", teamLogo: logo.vitality, teamshortname: "VIT", players: ["ZywOo", "ropz", "flameZ", "apEX", "mezii"] },
  { teamName: "G2 Esports", teamLogo: logo.g2, teamshortname: "G2", players: ["huNter-", "NertZ", "SunPayus", "HeavyGod", "MATYS"] },
  { teamName: "FaZe Clan", teamLogo: logo.faze, teamshortname: "FaZe", players: ["karrigan", "frozen", "Twistzz", "broky", "rain"] },
  { teamName: "Natus Vincere", teamLogo: logo.navi, teamshortname: "NAVI", players: ["Aleksib", "iM", "b1t", "w0nderful", "makazze"] },
  { teamName: "MOUZ", teamLogo: logo.mouz, teamshortname: "MOUZ", players: ["torzsi", "Spinx", "jL", "xertioN", "xelex"] },
  { teamName: "FURIA", teamLogo: logo.furia, teamshortname: "FURIA", players: ["FalleN", "yuurih", "YEKINDAR", "KSCERATO", "molodoy"] },
  { teamName: "Team Liquid", teamLogo: logo.liquid, teamshortname: "TL", players: ["NAF", "EliGE", "malbsMd", "siuhy", "ultimate"] },
  { teamName: "Heroic", teamLogo: logo.heroic, teamshortname: "Heroic", players: ["TeSeS", "sjuush", "stavn", "jabbi", "kyxsan"] },
  { teamName: "Astralis", teamLogo: logo.astralis, teamshortname: "Astralis", players: ["device", "blameF", "Buzz", "br0", "Staehr"] },
  { teamName: "Cloud9", teamLogo: logo.cloud9, teamshortname: "C9", players: ["Ax1Le", "Boombl4", "Perfecto", "HObbit", "ICY"] },
  { teamName: "Complexity", teamLogo: logo.complexity, teamshortname: "COL", players: ["JT", "floppy", "Grim", "hallzerk", "EliGE"] },
  { teamName: "paiN Gaming", teamLogo: logo.pain, teamshortname: "paiN", players: ["biguzera", "lux", "kauez", "nqz", "snow"] },
  { teamName: "Falcons", teamLogo: logo.falcons, teamshortname: "Falcons", players: ["NiKo", "m0NESY", "Magisk", "Snappi", "Maduene"] },
  { teamName: "Imperial", teamLogo: logo.imperial, teamshortname: "IMP", players: ["VINI", "felps", "decenty", "noway", "try"] },
  { teamName: "9z Team", teamLogo: logo.nine_z, teamshortname: "9z", players: ["max", "dgt", "HUASOPEEK", "Martinez", "buda"] },
  { teamName: "TheMongolz", teamLogo: logo.mongolz, teamshortname: "Mongolz", players: ["bLitz", "Techno4K", "910", "Senzu", "mzinho"] },
  { teamName: "Virtus.pro", teamLogo: logo.virtuspro, teamshortname: "VP", players: ["Jame", "FL1T", "fame", "electroNic", "n0rb3r7"] },
  { teamName: "GamerLegion", teamLogo: logo.gamerlegion, teamshortname: "GL", players: ["Snax", "volt", "acoR", "a_N_D_R_E_Y", "sl3nd"] },
  { teamName: "SAW", teamLogo: logo.saw, teamshortname: "SAW", players: ["MUTiRiS", "rmn", "ewjerkz", "story", "roman"] },
];

// -- Team Profiles (for /teams/[id] pages) --
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
    id: "navi", name: "Natus Vincere", shortname: "NAVI", color: "#fbbf24", logo: logo.navi,
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
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "13-11", result: "W", event: "PGL ASTANA 2026", date: "Mar 5", format: "BO3" },
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "2-1", result: "W", event: "PGL ASTANA 2026", date: "Mar 4", format: "BO3" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "1-2", result: "L", event: "BLAST Premier Spring", date: "Mar 1", format: "BO3" },
      { opponent: "Team Spirit", opponentLogo: logo.spirit, score: "2-0", result: "W", event: "PGL ASTANA 2026", date: "Feb 28", format: "BO3" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "16-12", result: "W", event: "BLAST Premier Spring", date: "Feb 25", format: "BO1" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "2-1", result: "W", event: "BLAST Premier Spring", date: "Feb 22", format: "BO3" },
      { opponent: "Astralis", opponentLogo: logo.astralis, score: "16-9", result: "W", event: "ESL Pro League", date: "Feb 19", format: "BO1" },
      { opponent: "Heroic", opponentLogo: logo.heroic, score: "0-2", result: "L", event: "ESL Pro League", date: "Feb 16", format: "BO3" },
    ],
    achievements: [
      { event: "PGL ASTANA 2026", placement: "1st", tier: "S", date: "Mar 2026", prize: "$400,000" },
      { event: "PGL Major Copenhagen 2024", placement: "2nd", tier: "S", date: "May 2024" },
      { event: "PGL Major Stockholm 2021", placement: "1st", tier: "S", date: "Nov 2021", prize: "$500,000" },
      { event: "Intel Grand Slam S1", placement: "1st", tier: "S", date: "2021", prize: "$1,000,000" },
      { event: "IEM Cologne 2021", placement: "1st", tier: "S", date: "Jul 2021", prize: "$400,000" },
      { event: "BLAST Premier Spring World Final 2021", placement: "1st", tier: "S", date: "Dec 2021", prize: "$500,000" },
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
    id: "g2", name: "G2 Esports", shortname: "G2", color: "#c084fc", logo: logo.g2,
    region: "Europe", country: "DE", countryFlag: "🇩🇪", founded: "2013",
    coach: { nickname: "sAw", realName: "Eetu Saha", country: "FI", countryFlag: flag.FI },
    worldRanking: 12, rankingPoints: 548, peakRanking: 1, peakRankingDate: "Sep 2023",
    weeksInTop5: 120, weeksInTop10: 210,
    roster: [
      { playerId: 10, nickname: "huNter-", realName: "Nemanja Kovac", country: "BA", countryFlag: flag.BA, image: playerPhoto.hunter, role: "IGL / Rifler", joinDate: "Jan 2021", rating: 1.10, isCaptain: true },
      { playerId: 0, nickname: "NertZ", realName: "Guy Iluz", country: "IL", countryFlag: flag.IL, image: playerPhoto.nertz, role: "Rifler", joinDate: "Mar 2026", rating: 1.12 },
      { playerId: 0, nickname: "SunPayus", realName: "Álvaro García", country: "ES", countryFlag: flag.ES, image: playerPhoto.sunpayus, role: "AWPer", joinDate: "Jul 2025", rating: 1.05 },
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
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "7-10", result: "L", event: "BLAST Premier Spring", date: "Mar 5", format: "BO1" },
      { opponent: "Astralis", opponentLogo: logo.astralis, score: "2-0", result: "W", event: "PGL ASTANA 2026", date: "Mar 3", format: "BO3" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "12-16", result: "L", event: "BLAST Premier Spring", date: "Feb 25", format: "BO1" },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "2-1", result: "W", event: "ESL Pro League", date: "Feb 22", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-11", result: "W", event: "ESL Pro League", date: "Feb 19", format: "BO1" },
      { opponent: "Spirit", opponentLogo: logo.spirit, score: "1-2", result: "L", event: "BLAST Premier Spring", date: "Feb 16", format: "BO3" },
    ],
    achievements: [
      { event: "BLAST Premier Spring World Final 2024", placement: "1st", tier: "S", date: "Dec 2024", prize: "$500,000" },
      { event: "IEM Katowice 2022", placement: "3rd-4th", tier: "S", date: "Feb 2022" },
      { event: "BLAST Premier Spring Spring Final 2023", placement: "1st", tier: "S", date: "Jun 2023", prize: "$200,000" },
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
    id: "vitality", name: "Vitality", shortname: "VIT", color: "#fcd34d", logo: logo.vitality,
    region: "Europe", country: "FR", countryFlag: flag.FR, founded: "2018",
    coach: { nickname: "XTQZZZ", realName: "Remy Quoniam", country: "FR", countryFlag: flag.FR },
    worldRanking: 1, rankingPoints: 1000, peakRanking: 1, peakRankingDate: "May 2026",
    weeksInTop5: 140, weeksInTop10: 220,
    roster: [
      { playerId: 2, nickname: "ZywOo", realName: "Mathieu Herbaut", country: "FR", countryFlag: flag.FR, image: playerPhoto.zywoo, role: "AWPer", joinDate: "Oct 2019", rating: 1.31 },
      { playerId: 5, nickname: "ropz", realName: "Robin Kool", country: "EE", countryFlag: flag.EE, image: playerPhoto.ropz, role: "Lurker", joinDate: "Jan 2025", rating: 1.16 },
      { playerId: 0, nickname: "flameZ", realName: "Shahar Shushan", country: "IL", countryFlag: flag.IL, image: playerPhoto.flamez, role: "Entry Fragger", joinDate: "Sep 2022", rating: 1.12 },
      { playerId: 0, nickname: "apEX", realName: "Dan Madesclaire", country: "FR", countryFlag: flag.FR, image: playerPhoto.apex, role: "IGL", joinDate: "Oct 2018", rating: 0.95, isCaptain: true },
      { playerId: 0, nickname: "mezii", realName: "William Merriman", country: "GB", countryFlag: flag.GB, image: playerPhoto.mezii, role: "Support", joinDate: "Jun 2023", rating: 1.05 },
    ],
    mapStats: [
      { map: "Inferno", played: 94, wins: 72, winRate: 76.6, ctWinRate: 57.2, tWinRate: 42.8 },
      { map: "Ancient", played: 68, wins: 52, winRate: 76.5, ctWinRate: 58.3, tWinRate: 41.7 },
      { map: "Mirage", played: 72, wins: 47, winRate: 65.3, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Nuke", played: 55, wins: 37, winRate: 67.3, ctWinRate: 59.5, tWinRate: 40.5 },
      { map: "Anubis", played: 45, wins: 28, winRate: 62.2, ctWinRate: 55.0, tWinRate: 45.0 },
    ],
    recentMatches: [
      { opponent: "Team Spirit", opponentLogo: logo.spirit, score: "16-9", result: "W", event: "PGL ASTANA 2026", date: "Mar 5", format: "BO3" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "2-1", result: "W", event: "BLAST Premier Spring", date: "Mar 1", format: "BO3" },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "2-0", result: "W", event: "PGL ASTANA 2026", date: "Feb 28", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-13", result: "W", event: "ESL Pro League", date: "Feb 24", format: "BO1" },
      { opponent: "Heroic", opponentLogo: logo.heroic, score: "1-2", result: "L", event: "ESL Pro League", date: "Feb 21", format: "BO3" },
    ],
    achievements: [
      { event: "PGL Major Copenhagen 2024", placement: "1st", tier: "S", date: "May 2024", prize: "$500,000" },
      { event: "BLAST Premier Spring World Final 2023", placement: "1st", tier: "S", date: "Dec 2023", prize: "$500,000" },
      { event: "IEM Cologne 2023", placement: "1st", tier: "S", date: "Aug 2023", prize: "$400,000" },
      { event: "BLAST Premier Spring Spring Final 2024", placement: "2nd", tier: "S", date: "Jun 2024" },
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
    id: "faze", name: "FaZe Clan", shortname: "FaZe", color: "#ef4444", logo: logo.faze,
    region: "Europe", country: "EU", countryFlag: "🇪🇺", founded: "2010",
    coach: { nickname: "enkay J", realName: "Niclas Krumhorn", country: "DE", countryFlag: flag.DE },
    worldRanking: 13, rankingPoints: 492, peakRanking: 1, peakRankingDate: "May 2022",
    weeksInTop5: 165, weeksInTop10: 280,
    roster: [
      { playerId: 11, nickname: "broky", realName: "Helvijs Saukants", country: "LV", countryFlag: flag.LV, image: playerPhoto.broky, role: "AWPer", joinDate: "Oct 2019", rating: 1.13 },
      { playerId: 9, nickname: "frozen", realName: "David Cernansky", country: "SK", countryFlag: flag.SK, image: playerPhoto.frozen, role: "Rifler", joinDate: "Jan 2024", rating: 1.15 },
      { playerId: 0, nickname: "Twistzz", realName: "Russel Van Dulken", country: "CA", countryFlag: "CA", image: playerPhoto.twistzz, role: "Rifler", joinDate: "Sep 2025", rating: 1.14 },
      { playerId: 12, nickname: "rain", realName: "Håvard Nygaard", country: "NO", countryFlag: flag.NO, image: playerPhoto.rain, role: "Entry Fragger", joinDate: "Jan 2016", rating: 1.11 },
      { playerId: 0, nickname: "karrigan", realName: "Finn Andersen", country: "DK", countryFlag: flag.DK, image: playerPhoto.karrigan, role: "IGL", joinDate: "Dec 2021", rating: 0.92, isCaptain: true },
    ],
    mapStats: [
      { map: "Mirage", played: 85, wins: 61, winRate: 71.8, ctWinRate: 53.5, tWinRate: 46.5 },
      { map: "Ancient", played: 62, wins: 45, winRate: 72.6, ctWinRate: 56.8, tWinRate: 43.2 },
      { map: "Nuke", played: 58, wins: 41, winRate: 70.7, ctWinRate: 59.0, tWinRate: 41.0 },
      { map: "Dust II", played: 55, wins: 38, winRate: 69.1, ctWinRate: 51.5, tWinRate: 48.5 },
      { map: "Inferno", played: 70, wins: 45, winRate: 64.3, ctWinRate: 55.2, tWinRate: 44.8 },
    ],
    recentMatches: [
      { opponent: "NAVI", opponentLogo: logo.navi, score: "11-13", result: "L", event: "PGL ASTANA 2026", date: "Mar 5", format: "BO3" },
      { opponent: "Heroic", opponentLogo: logo.heroic, score: "2-0", result: "W", event: "PGL ASTANA 2026", date: "Mar 2", format: "BO3" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "1-2", result: "L", event: "ESL Pro League", date: "Feb 22", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-14", result: "W", event: "BLAST Premier Spring", date: "Feb 19", format: "BO1" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "0-2", result: "L", event: "PGL ASTANA 2026", date: "Feb 28", format: "BO3" },
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
    id: "spirit", name: "Team Spirit", shortname: "Spirit", color: "#34d399", logo: logo.spirit,
    region: "Europe", country: "RU", countryFlag: flag.RU, founded: "2015",
    coach: { nickname: "hally", realName: "Ilya Oleynik", country: "RU", countryFlag: flag.RU },
    worldRanking: 6, rankingPoints: 731, peakRanking: 1, peakRankingDate: "Dec 2024",
    weeksInTop5: 45, weeksInTop10: 85,
    roster: [
      { playerId: 1, nickname: "donk", realName: "Danil Kryshkovets", country: "RU", countryFlag: flag.RU, image: playerPhoto.donk, role: "Rifler", joinDate: "Jun 2023", rating: 1.39 },
      { playerId: 13, nickname: "sh1ro", realName: "Dmitry Sokolov", country: "RU", countryFlag: flag.RU, image: playerPhoto.sh1ro, role: "AWPer", joinDate: "Dec 2023", rating: 1.18 },
      { playerId: 0, nickname: "magixx", realName: "Boris Vorobiev", country: "RU", countryFlag: flag.RU, image: playerPhoto.magixx, role: "Rifler", joinDate: "Jan 2021", rating: 1.05 },
      { playerId: 0, nickname: "zont1x", realName: "Myroslav Plakhotia", country: "UA", countryFlag: flag.UA, image: playerPhoto.zont1x, role: "Rifler", joinDate: "Jun 2023", rating: 1.09 },
      { playerId: 0, nickname: "chopper", realName: "Leonid Vishnyakov", country: "RU", countryFlag: flag.RU, image: playerPhoto.chopper, role: "IGL", joinDate: "Mar 2019", rating: 0.98, isCaptain: true },
    ],
    mapStats: [
      { map: "Anubis", played: 72, wins: 53, winRate: 73.6, ctWinRate: 56.0, tWinRate: 44.0 },
      { map: "Mirage", played: 65, wins: 44, winRate: 67.7, ctWinRate: 53.5, tWinRate: 46.5 },
      { map: "Nuke", played: 48, wins: 33, winRate: 68.8, ctWinRate: 58.0, tWinRate: 42.0 },
      { map: "Inferno", played: 55, wins: 35, winRate: 63.6, ctWinRate: 54.5, tWinRate: 45.5 },
      { map: "Dust II", played: 38, wins: 22, winRate: 57.9, ctWinRate: 50.8, tWinRate: 49.2 },
    ],
    recentMatches: [
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "9-16", result: "L", event: "PGL ASTANA 2026", date: "Mar 5", format: "BO3" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "0-2", result: "L", event: "PGL ASTANA 2026", date: "Feb 28", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "16-12", result: "W", event: "PGL ASTANA 2026", date: "Feb 26", format: "BO1" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "2-1", result: "W", event: "BLAST Premier Spring", date: "Feb 16", format: "BO3" },
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "2-0", result: "W", event: "BLAST Premier Spring", date: "Feb 13", format: "BO3" },
    ],
    achievements: [
      { event: "BLAST Premier Spring 2025 Champion", placement: "1st", tier: "S", date: "Dec 2025", prize: "$500,000" },
      { event: "PGL ASTANA 2026", placement: "3rd-4th", tier: "S", date: "Mar 2026" },
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
    id: "mouz", name: "MOUZ", shortname: "MOUZ", color: "#2dd4bf", logo: logo.mouz,
    region: "Europe", country: "DE", countryFlag: flag.DE, founded: "2002",
    coach: { nickname: "sycrone", realName: "Dennis Nielsen", country: "DK", countryFlag: flag.DK },
    worldRanking: 11, rankingPoints: 575, peakRanking: 2, peakRankingDate: "2024",
    weeksInTop5: 30, weeksInTop10: 68,
    roster: [
      { playerId: 0, nickname: "torzsi", realName: "Adam Torzsas", country: "HU", countryFlag: flag.HU, image: playerPhoto.torzsi, role: "AWPer", joinDate: "Jan 2022", rating: 1.12 },
      { playerId: 0, nickname: "Spinx", realName: "Lotan Giladi", country: "IL", countryFlag: flag.IL, image: playerPhoto.spinx, role: "Rifler", joinDate: "Jan 2025", rating: 1.11 },
      { playerId: 7, nickname: "jL", realName: "Justinas Lekavicius", country: "LT", countryFlag: flag.LT, image: playerPhoto.jl, role: "Rifler", joinDate: "Apr 2026", rating: 1.11 },
      { playerId: 0, nickname: "xertioN", realName: "Dorian Berman", country: "IL", countryFlag: flag.IL, image: playerPhoto.xertion, role: "Entry Fragger", joinDate: "Sep 2022", rating: 1.12 },
      { playerId: 0, nickname: "xelex", realName: "Adrian Vincze", country: "HU", countryFlag: flag.HU, image: playerPhoto.xelex, role: "Rifler", joinDate: "Apr 2026", rating: 1.16 },
    ],
    mapStats: [
      { map: "Anubis", played: 60, wins: 42, winRate: 70.0, ctWinRate: 55.5, tWinRate: 44.5 },
      { map: "Tuscan", played: 28, wins: 19, winRate: 67.9, ctWinRate: 52.0, tWinRate: 48.0 },
      { map: "Dust II", played: 52, wins: 34, winRate: 65.4, ctWinRate: 51.0, tWinRate: 49.0 },
      { map: "Mirage", played: 48, wins: 30, winRate: 62.5, ctWinRate: 53.0, tWinRate: 47.0 },
      { map: "Inferno", played: 44, wins: 26, winRate: 59.1, ctWinRate: 54.0, tWinRate: 46.0 },
    ],
    recentMatches: [
      { opponent: "Spirit", opponentLogo: logo.spirit, score: "12-16", result: "L", event: "PGL ASTANA 2026", date: "Feb 26", format: "BO1" },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "14-16", result: "L", event: "BLAST Premier Spring", date: "Feb 19", format: "BO1" },
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "11-16", result: "L", event: "ESL Pro League", date: "Feb 19", format: "BO1" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "1-2", result: "L", event: "BLAST Premier Spring", date: "Feb 22", format: "BO3" },
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
    id: "liquid", name: "Team Liquid", shortname: "TL", color: "#38bdf8", logo: logo.liquid,
    region: "Americas", country: "US", countryFlag: flag.US, founded: "2000",
    coach: { nickname: "flashie", realName: "Viktor Tamás Bea", country: "HU", countryFlag: flag.HU },
    worldRanking: 25, rankingPoints: 341, peakRanking: 1, peakRankingDate: "Jul 2019",
    weeksInTop5: 95, weeksInTop10: 200,
    roster: [
      { playerId: 0, nickname: "NAF", realName: "Keith Markovic", country: "CA", countryFlag: "CA", image: playerPhoto.naf, role: "Rifler", joinDate: "Jan 2018", rating: 1.10 },
      { playerId: 0, nickname: "EliGE", realName: "Jonathan Jablonowski", country: "US", countryFlag: flag.US, image: playerPhoto.elige, role: "Rifler", joinDate: "Sep 2025", rating: 1.12 },
      { playerId: 0, nickname: "malbsMd", realName: "Mario Samayoa", country: "GT", countryFlag: "🇬🇹", image: playerPhoto.malbsmd, role: "Entry Fragger", joinDate: "Mar 2026", rating: 1.02 },
      { playerId: 0, nickname: "siuhy", realName: "Kamil Szkaradek", country: "PL", countryFlag: flag.PL, image: playerPhoto.siuhy, role: "IGL", joinDate: "Jan 2025", rating: 0.99, isCaptain: true },
      { playerId: 0, nickname: "ultimate", realName: "Roland Tomkowiak", country: "PL", countryFlag: flag.PL, image: playerPhoto.ultimate, role: "AWPer", joinDate: "Jul 2024", rating: 1.00 },
    ],
    mapStats: [
      { map: "Inferno", played: 70, wins: 47, winRate: 67.1, ctWinRate: 55.0, tWinRate: 45.0 },
      { map: "Mirage", played: 62, wins: 40, winRate: 64.5, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Nuke", played: 50, wins: 33, winRate: 66.0, ctWinRate: 58.0, tWinRate: 42.0 },
      { map: "Dust II", played: 45, wins: 28, winRate: 62.2, ctWinRate: 51.0, tWinRate: 49.0 },
      { map: "Anubis", played: 38, wins: 22, winRate: 57.9, ctWinRate: 54.0, tWinRate: 46.0 },
    ],
    recentMatches: [
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "10-7", result: "W", event: "BLAST Premier Spring", date: "Mar 5", format: "BO1" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "1-2", result: "L", event: "PGL ASTANA 2026", date: "Mar 4", format: "BO3" },
      { opponent: "Spirit", opponentLogo: logo.spirit, score: "0-2", result: "L", event: "BLAST Premier Spring", date: "Feb 13", format: "BO3" },
      { opponent: "FURIA", opponentLogo: logo.furia, score: "16-13", result: "W", event: "BLAST Premier Spring", date: "Feb 10", format: "BO1" },
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
    id: "furia", name: "FURIA", shortname: "FURIA", color: "#fbbf24", logo: logo.furia,
    region: "Americas", country: "BR", countryFlag: flag.BR, founded: "2017",
    coach: { nickname: "sidde", realName: "Sid Macedo", country: "BR", countryFlag: flag.BR },
    worldRanking: 3, rankingPoints: 846, peakRanking: 1, peakRankingDate: "May 2026",
    weeksInTop5: 22, weeksInTop10: 78,
    roster: [
      { playerId: 14, nickname: "yuurih", realName: "Yuri Santos", country: "BR", countryFlag: flag.BR, image: playerPhoto.yuurih, role: "Rifler", joinDate: "Mar 2018", rating: 1.15 },
      { playerId: 15, nickname: "KSCERATO", realName: "Kaike Cerato", country: "BR", countryFlag: flag.BR, image: playerPhoto.kscerato, role: "Rifler", joinDate: "May 2018", rating: 1.19 },
      { playerId: 100, nickname: "FalleN", realName: "Gabriel Toledo", country: "BR", countryFlag: flag.BR, image: playerPhoto.fallen, role: "AWPer / IGL", joinDate: "Apr 2023", rating: 0.98, isCaptain: true },
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
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "13-16", result: "L", event: "BLAST Premier Spring", date: "Feb 10", format: "BO1" },
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
  {
    id: "heroic", name: "Heroic", shortname: "Heroic", color: "#f472b6", logo: logo.heroic,
    region: "Europe", country: "NO", countryFlag: flag.NO, founded: "2016",
    coach: { nickname: "sAw", realName: "Eetu Saha", country: "FI", countryFlag: flag.FI },
    worldRanking: 8, rankingPoints: 612, peakRanking: 1, peakRankingDate: "Jun 2023",
    weeksInTop5: 85, weeksInTop10: 150,
    roster: [
      { playerId: 0, nickname: "TeSeS", realName: "René Madsen", country: "DK", countryFlag: flag.DK, image: playerPhoto.teses, role: "Rifler", joinDate: "Apr 2020", rating: 1.08 },
      { playerId: 0, nickname: "sjuush", realName: "Rasmus Beck", country: "DK", countryFlag: flag.DK, image: playerPhoto.sjuush, role: "Support", joinDate: "Feb 2021", rating: 1.02 },
      { playerId: 0, nickname: "stavn", realName: "Martin Lund", country: "DK", countryFlag: flag.DK, image: playerPhoto.stavn, role: "Rifler", joinDate: "Mar 2019", rating: 1.14 },
      { playerId: 0, nickname: "jabbi", realName: "Jakob Nygaard", country: "DK", countryFlag: flag.DK, image: playerPhoto.jabbi, role: "Rifler", joinDate: "Jun 2022", rating: 1.10 },
      { playerId: 0, nickname: "kyxsan", realName: "Damjan Stoilkovski", country: "MK", countryFlag: "🇲🇰", image: playerPhoto.kyxsan, role: "IGL", joinDate: "Dec 2023", rating: 0.95, isCaptain: true },
    ],
    mapStats: [
      { map: "Dust II", played: 45, wins: 29, winRate: 64.4, ctWinRate: 52.0, tWinRate: 48.0 },
      { map: "Anubis", played: 38, wins: 24, winRate: 63.2, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Tuscan", played: 25, wins: 16, winRate: 64.0, ctWinRate: 51.5, tWinRate: 48.5 },
      { map: "Nuke", played: 52, wins: 32, winRate: 61.5, ctWinRate: 58.0, tWinRate: 42.0 },
    ],
    recentMatches: [
      { opponent: "FaZe Clan", opponentLogo: logo.faze, score: "0-2", result: "L", event: "PGL ASTANA 2026", date: "Mar 2", format: "BO3" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "2-1", result: "W", event: "ESL Pro League", date: "Feb 21", format: "BO3" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "2-1", result: "W", event: "BLAST Premier Spring", date: "Feb 18", format: "BO3" },
    ],
    achievements: [
      { event: "BLAST Premier Fall Final 2022", placement: "1st", tier: "S", date: "Nov 2022", prize: "$200,000" },
      { event: "PGL Major Antwerp 2022", placement: "5th-8th", tier: "S", date: "May 2022" },
    ],
    transfers: [
      { player: "kyxsan", direction: "in", fromTeam: "Apeks", date: "Dec 2023" },
      { player: "stavn", direction: "out", toTeam: "Astralis", date: "Nov 2023" },
    ],
    headToHead: [
      { opponent: "Vitality", opponentLogo: logo.vitality, wins: 8, losses: 12 },
      { opponent: "FaZe Clan", opponentLogo: logo.faze, wins: 7, losses: 15 },
    ],
    totalMapsPlayed: 280, overallWinRate: 60.5, last10Results: ["L","W","W","L","W","W","L","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$2,850,000",
  },
  {
    id: "astralis", name: "Astralis", shortname: "Astralis", color: "#fb923c", logo: logo.astralis,
    region: "Europe", country: "DK", countryFlag: flag.DK, founded: "2016",
    coach: { nickname: "ruggah", realName: "Casper Due", country: "DK", countryFlag: flag.DK },
    worldRanking: 10, rankingPoints: 567, peakRanking: 1, peakRankingDate: "2018-2020",
    weeksInTop5: 180, weeksInTop10: 250,
    roster: [
      { playerId: 0, nickname: "device", realName: "Nicolai Reedtz", country: "DK", countryFlag: flag.DK, image: playerPhoto.device, role: "AWPer", joinDate: "Oct 2022", rating: 1.18, isCaptain: true },
      { playerId: 0, nickname: "blameF", realName: "Benjamin Bremer", country: "DK", countryFlag: flag.DK, image: playerPhoto.blamef, role: "Rifler", joinDate: "Nov 2021", rating: 1.15 },
      { playerId: 0, nickname: "Buzz", realName: "Christian Andersen", country: "DK", countryFlag: flag.DK, image: playerPhoto.buzz, role: "Rifler", joinDate: "Dec 2022", rating: 1.00 },
      { playerId: 0, nickname: "br0", realName: "Alexander Bro", country: "DK", countryFlag: flag.DK, image: playerPhoto.br0, role: "Rifler", joinDate: "Feb 2024", rating: 1.05 },
      { playerId: 0, nickname: "Staehr", realName: "Victor Staehr", country: "DK", countryFlag: flag.DK, image: playerPhoto.staehr, role: "Rifler", joinDate: "Jun 2023", rating: 1.06 },
    ],
    mapStats: [
      { map: "Nuke", played: 120, wins: 94, winRate: 78.3, ctWinRate: 62.0, tWinRate: 38.0 },
      { map: "Ancient", played: 45, wins: 30, winRate: 66.7, ctWinRate: 58.0, tWinRate: 42.0 },
      { map: "Inferno", played: 85, wins: 60, winRate: 70.6, ctWinRate: 55.0, tWinRate: 45.0 },
    ],
    recentMatches: [
      { opponent: "G2 Esports", opponentLogo: logo.g2, score: "0-2", result: "L", event: "PGL ASTANA 2026", date: "Mar 3", format: "BO3" },
      { opponent: "NAVI", opponentLogo: logo.navi, score: "9-16", result: "L", event: "ESL Pro League", date: "Feb 19", format: "BO1" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "10-16", result: "L", event: "PGL ASTANA 2026", date: "Mar 2", format: "BO3" },
    ],
    achievements: [
      { event: "StarLadder Major Berlin 2019", placement: "1st", tier: "S", date: "Sep 2019", prize: "$500,000" },
      { event: "IEM Katowice Major 2019", placement: "1st", tier: "S", date: "Mar 2019", prize: "$500,000" },
      { event: "FACEIT Major London 2018", placement: "1st", tier: "S", date: "Sep 2018", prize: "$500,000" },
      { event: "ELEAGUE Major Atlanta 2017", placement: "1st", tier: "S", date: "Jan 2017", prize: "$500,000" },
    ],
    transfers: [
      { player: "device", direction: "in", fromTeam: "Ninjas in Pyjamas", date: "Oct 2022" },
      { player: "br0", direction: "in", fromTeam: "Monte", date: "Feb 2024" },
    ],
    headToHead: [
      { opponent: "NAVI", opponentLogo: logo.navi, wins: 15, losses: 18 },
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 12, losses: 14 },
    ],
    totalMapsPlayed: 450, overallWinRate: 68.2, last10Results: ["L","L","L","W","W","L","W","W","L","W"],
    majorsWon: 4, totalPrizeEarnings: "$9,450,000",
  },
  {
    id: "cloud9", name: "Cloud9", shortname: "C9", color: "#94a3b8", logo: logo.cloud9,
    region: "Americas", country: "US", countryFlag: flag.US, founded: "2013",
    coach: { nickname: "groove", realName: "Konstantin Pikiner", country: "RU", countryFlag: flag.RU },
    worldRanking: 11, rankingPoints: 534, peakRanking: 1, peakRankingDate: "Oct 2022",
    weeksInTop5: 65, weeksInTop10: 120,
    roster: [
      { playerId: 0, nickname: "Ax1Le", realName: "Sergey Rykhtorov", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "Rifler", joinDate: "Apr 2022", rating: 1.10 },
      { playerId: 0, nickname: "Boombl4", realName: "Kirill Mikhailov", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "IGL", joinDate: "Nov 2023", rating: 0.98, isCaptain: true },
      { playerId: 0, nickname: "Perfecto", realName: "Ilya Zalutskiy", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "Support", joinDate: "Jul 2023", rating: 1.02 },
      { playerId: 0, nickname: "HObbit", realName: "Abay Khassenov", country: "KZ", countryFlag: "🇰🇿", image: playerPhoto.default, role: "Rifler", joinDate: "Apr 2022", rating: 1.05 },
      { playerId: 0, nickname: "ICY", realName: "Kaisar Islanov", country: "KZ", countryFlag: "🇰🇿", image: playerPhoto.default, role: "AWPer", joinDate: "Apr 2024", rating: 1.08 },
    ],
    mapStats: [
      { map: "Anubis", played: 35, wins: 22, winRate: 62.9, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Mirage", played: 42, wins: 26, winRate: 61.9, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Ancient", played: 28, wins: 16, winRate: 57.1, ctWinRate: 56.0, tWinRate: 44.0 },
    ],
    recentMatches: [
      { opponent: "FURIA", opponentLogo: logo.furia, score: "12-16", result: "L", event: "ESL Pro League", date: "Mar 3", format: "BO1" },
      { opponent: "Vitality", opponentLogo: logo.vitality, score: "1-2", result: "L", event: "PGL ASTANA 2026", date: "Feb 28", format: "BO3" },
    ],
    achievements: [
      { event: "ELEAGUE Major Boston 2018", placement: "1st", tier: "S", date: "Jan 2018", prize: "$500,000" },
      { event: "IEM Dallas 2022", placement: "1st", tier: "A", date: "Jun 2022", prize: "$100,000" },
    ],
    transfers: [
      { player: "ICY", direction: "in", fromTeam: "AMKAL", date: "Apr 2024" },
      { player: "sh1ro", direction: "out", toTeam: "Team Spirit", date: "Dec 2023" },
    ],
    headToHead: [
      { opponent: "FURIA", opponentLogo: logo.furia, wins: 6, losses: 8 },
      { opponent: "Natus Vincere", opponentLogo: logo.navi, wins: 10, losses: 12 },
    ],
    totalMapsPlayed: 320, overallWinRate: 61.2, last10Results: ["L","L","W","L","W","W","L","W","W","L"],
    majorsWon: 1, totalPrizeEarnings: "$3,850,000",
  },
  {
    id: "complexity", name: "Complexity", shortname: "COL", color: "#60a5fa", logo: logo.complexity,
    region: "Americas", country: "US", countryFlag: flag.US, founded: "2003",
    coach: { nickname: "T.c", realName: "Tiaan Coertzen", country: "ZA", countryFlag: flag.ZA },
    worldRanking: 12, rankingPoints: 501, peakRanking: 5, peakRankingDate: "Oct 2023",
    weeksInTop5: 5, weeksInTop10: 45,
    roster: [
      { playerId: 0, nickname: "JT", realName: "Johnny Theodosiou", country: "ZA", countryFlag: flag.ZA, image: playerPhoto.default, role: "IGL", joinDate: "Jan 2022", rating: 0.94, isCaptain: true },
      { playerId: 0, nickname: "floppy", realName: "Ricky Kemery", country: "US", countryFlag: flag.US, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2022", rating: 1.02 },
      { playerId: 0, nickname: "Grim", realName: "Michael Wince", country: "US", countryFlag: flag.US, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2022", rating: 1.06 },
      { playerId: 0, nickname: "hallzerk", realName: "Håkon Fjærli", country: "NO", countryFlag: flag.NO, image: playerPhoto.default, role: "AWPer", joinDate: "Jul 2022", rating: 1.08 },
      { playerId: 0, nickname: "EliGE", realName: "Jonathan Jablonowski", country: "US", countryFlag: flag.US, image: playerPhoto.elige, role: "Rifler", joinDate: "Jun 2023", rating: 1.15 },
    ],
    mapStats: [
      { map: "Overpass", played: 45, wins: 28, winRate: 62.2, ctWinRate: 56.0, tWinRate: 44.0 },
      { map: "Anubis", played: 32, wins: 18, winRate: 56.3, ctWinRate: 52.0, tWinRate: 48.0 },
      { map: "Ancient", played: 38, wins: 20, winRate: 52.6, ctWinRate: 54.5, tWinRate: 45.5 },
    ],
    recentMatches: [
      { opponent: "paiN Gaming", opponentLogo: logo.pain, score: "2-1", result: "W", event: "ESL Pro League", date: "Yesterday", format: "BO3" },
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "1-2", result: "L", event: "ESL Pro League", date: "Mar 1", format: "BO3" },
    ],
    achievements: [
      { event: "IEM Sydney 2023", placement: "2nd", tier: "S", date: "Oct 2023" },
      { event: "ESL Pro League S10", placement: "5th-6th", tier: "S", date: "Dec 2019" },
    ],
    transfers: [
      { player: "EliGE", direction: "in", fromTeam: "Liquid", date: "Jun 2023" },
      { player: "hallzerk", direction: "in", fromTeam: "Dignitas", date: "Jul 2022" },
    ],
    headToHead: [
      { opponent: "Team Liquid", opponentLogo: logo.liquid, wins: 8, losses: 12 },
      { opponent: "FURIA", opponentLogo: logo.furia, wins: 5, losses: 9 },
    ],
    totalMapsPlayed: 280, overallWinRate: 58.5, last10Results: ["W","L","W","L","W","W","L","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$2,150,000",
  },
  {
    id: "falcons", name: "Falcons", shortname: "Falcons", color: "#a78bfa", logo: logo.falcons,
    region: "Europe", country: "SA", countryFlag: flag.SA, founded: "2017",
    coach: { nickname: "zonic", realName: "Danny Sørensen", country: "DK", countryFlag: flag.DK },
    worldRanking: 13, rankingPoints: 478, peakRanking: 8, peakRankingDate: "Feb 2024",
    weeksInTop5: 0, weeksInTop10: 15,
    roster: [
      { playerId: 3, nickname: "NiKo", realName: "Nikola Kovač", country: "BA", countryFlag: flag.BA, image: playerPhoto.niko, role: "Rifler", joinDate: "Jan 2025", rating: 1.25 },
      { playerId: 4, nickname: "m0NESY", realName: "Ilya Osipov", country: "RU", countryFlag: flag.RU, image: playerPhoto.m0nesy, role: "AWPer", joinDate: "Jan 2025", rating: 1.22 },
      { playerId: 0, nickname: "Magisk", realName: "Emil Hoffmann Reif", country: "DK", countryFlag: flag.DK, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2024", rating: 1.10 },
      { playerId: 0, nickname: "Snappi", realName: "Marco Pfeiffer", country: "DK", countryFlag: flag.DK, image: playerPhoto.default, role: "IGL", joinDate: "Jan 2024", rating: 0.90, isCaptain: true },
      { playerId: 0, nickname: "Maduene", realName: "Maduene", country: "DK", countryFlag: flag.DK, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2025", rating: 1.05 },
    ],
    mapStats: [
      { map: "Dust II", played: 25, wins: 18, winRate: 72.0, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Anubis", played: 22, wins: 14, winRate: 63.6, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Mirage", played: 20, wins: 12, winRate: 60.0, ctWinRate: 53.0, tWinRate: 47.0 },
    ],
    recentMatches: [
      { opponent: "Team Liquid", opponentLogo: logo.liquid, score: "7-10", result: "L", event: "BLAST Premier Spring", date: "Mar 5", format: "BO1" },
      { opponent: "MOUZ", opponentLogo: logo.mouz, score: "2-0", result: "W", event: "PGL ASTANA 2026", date: "Mar 2", format: "BO3" },
    ],
    achievements: [
      { event: "IEM Katowice 2024", placement: "3rd-4th", tier: "S", date: "Feb 2024" },
    ],
    transfers: [
      { player: "NiKo", direction: "in", fromTeam: "G2", date: "Jan 2025" },
      { player: "m0NESY", direction: "in", fromTeam: "G2", date: "Jan 2025" },
      { player: "Magisk", direction: "in", fromTeam: "Vitality", date: "Jan 2024" },
    ],
    headToHead: [
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 4, losses: 6 },
      { opponent: "Natus Vincere", opponentLogo: logo.navi, wins: 3, losses: 7 },
    ],
    totalMapsPlayed: 120, overallWinRate: 62.5, last10Results: ["L","W","W","L","W","L","W","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$1,250,000",
  },
  {
    id: "pain", name: "paiN Gaming", shortname: "paiN", color: "#4ade80", logo: logo.pain,
    region: "Americas", country: "BR", countryFlag: flag.BR, founded: "2010",
    coach: { nickname: "rikz", realName: "Henrique Waku", country: "BR", countryFlag: flag.BR },
    worldRanking: 14, rankingPoints: 445, peakRanking: 13, peakRankingDate: "Mar 2024",
    weeksInTop5: 0, weeksInTop10: 0,
    roster: [
      { playerId: 0, nickname: "biguzera", realName: "Rodrigo Bittencourt", country: "BR", countryFlag: flag.BR, image: playerPhoto.default, role: "IGL", joinDate: "Feb 2019", rating: 1.08, isCaptain: true },
      { playerId: 0, nickname: "lux", realName: "Lucas Meneghini", country: "BR", countryFlag: flag.BR, image: playerPhoto.default, role: "Rifler", joinDate: "Jul 2023", rating: 1.02 },
      { playerId: 0, nickname: "kauez", realName: "Kaue Kaschuk", country: "BR", countryFlag: flag.BR, image: playerPhoto.default, role: "Rifler", joinDate: "Jul 2023", rating: 1.05 },
      { playerId: 0, nickname: "nqz", realName: "Lucas Soares", country: "BR", countryFlag: flag.BR, image: playerPhoto.default, role: "AWPer", joinDate: "Jan 2024", rating: 1.12 },
      { playerId: 0, nickname: "snow", realName: "Joao Vinicius", country: "BR", countryFlag: flag.BR, image: playerPhoto.default, role: "Rifler", joinDate: "Apr 2024", rating: 1.10 },
    ],
    mapStats: [
      { map: "Anubis", played: 42, wins: 29, winRate: 69.0, ctWinRate: 54.5, tWinRate: 45.5 },
      { map: "Inferno", played: 35, wins: 22, winRate: 62.9, ctWinRate: 53.0, tWinRate: 47.0 },
      { map: "Nuke", played: 28, wins: 16, winRate: 57.1, ctWinRate: 55.5, tWinRate: 44.5 },
    ],
    recentMatches: [
      { opponent: "Complexity", opponentLogo: logo.complexity, score: "1-2", result: "L", event: "ESL Pro League", date: "Yesterday", format: "BO3" },
      { opponent: "FURIA", opponentLogo: logo.furia, score: "0-2", result: "L", event: "ESL Challenger", date: "Feb 5", format: "BO3" },
    ],
    achievements: [
      { event: "PGL Major Copenhagen 2024", placement: "9th-11th", tier: "S", date: "Mar 2024" },
      { event: "Global Esports Tour Rio 2024", placement: "1st", tier: "A", date: "Apr 2024", prize: "$100,000" },
    ],
    transfers: [
      { player: "nqz", direction: "in", fromTeam: "Legacy", date: "Jan 2024" },
      { player: "snow", direction: "in", fromTeam: "Case", date: "Apr 2024" },
    ],
    headToHead: [
      { opponent: "FURIA", opponentLogo: logo.furia, wins: 4, losses: 15 },
      { opponent: "Imperial", opponentLogo: logo.imperial, wins: 12, losses: 10 },
    ],
    totalMapsPlayed: 250, overallWinRate: 62.0, last10Results: ["L","L","W","W","L","W","W","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$1,150,000",
  },
  {
    id: "imperial", name: "Imperial", shortname: "IMP", color: "#f59e0b", logo: logo.imperial,
    region: "Americas", country: "BR", countryFlag: flag.BR, founded: "2018",
    coach: { nickname: "zakk", realName: "Rafael Fernandes", country: "BR", countryFlag: flag.BR },
    worldRanking: 15, rankingPoints: 412, peakRanking: 14, peakRankingDate: "Mar 2024",
    weeksInTop5: 0, weeksInTop10: 0,
    roster: [
      { playerId: 108, nickname: "chelo", realName: "Marcelo Cespedes", country: "BR", countryFlag: flag.BR, image: playerPhoto.chelo, role: "Rifler", joinDate: "Jul 2025", rating: 1.05 },
      { playerId: 109, nickname: "skullz", realName: "Felipe Medeiros", country: "BR", countryFlag: flag.BR, image: playerPhoto.skullz, role: "Rifler", joinDate: "Aug 2025", rating: 1.02 },
      { playerId: 0, nickname: "VINI", realName: "Vinicius Figueiredo", country: "BR", countryFlag: flag.BR, image: playerPhoto.default, role: "IGL", joinDate: "Jan 2022", rating: 1.05, isCaptain: true },
      { playerId: 0, nickname: "felps", realName: "Joao Vasconcellos", country: "BR", countryFlag: flag.BR, image: playerPhoto.default, role: "Rifler", joinDate: "Jul 2023", rating: 1.14 },
      { playerId: 0, nickname: "try", realName: "Santino Rigal", country: "AR", countryFlag: flag.AR, image: playerPhoto.default, role: "AWPer", joinDate: "Jul 2025", rating: 1.12 },
    ],
    mapStats: [
      { map: "Dust II", played: 38, wins: 25, winRate: 65.8, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Mirage", played: 45, wins: 28, winRate: 62.2, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Inferno", played: 42, wins: 24, winRate: 57.1, ctWinRate: 55.0, tWinRate: 45.0 },
    ],
    recentMatches: [
      { opponent: "FURIA", opponentLogo: logo.furia, score: "8-16", result: "L", event: "ESL Challenger", date: "Feb 3", format: "BO1" },
      { opponent: "paiN", opponentLogo: logo.pain, score: "10-12", result: "L", event: "ESL Challenger", date: "Feb 1", format: "BO1" },
    ],
    achievements: [
      { event: "PGL Major Copenhagen 2024", placement: "12th-14th", tier: "S", date: "Mar 2024" },
      { event: "ESL Pro League S19", placement: "9th-12th", tier: "A", date: "Apr 2024" },
    ],
    transfers: [
      { player: "try", direction: "in", fromTeam: "9z", date: "Jul 2025" },
      { player: "HEN1", direction: "out", toTeam: "Bench", date: "Jul 2025" },
    ],
    headToHead: [
      { opponent: "FURIA", opponentLogo: logo.furia, wins: 5, losses: 13 },
      { opponent: "paiN Gaming", opponentLogo: logo.pain, wins: 10, losses: 12 },
    ],
    totalMapsPlayed: 230, overallWinRate: 60.2, last10Results: ["L","L","W","L","W","W","W","L","W","L"],
    majorsWon: 0, totalPrizeEarnings: "$1,450,000",
  },
  {
    id: "9z", name: "9z Team", shortname: "9z", color: "#e879f9", logo: logo.nine_z,
    region: "Americas", country: "AR", countryFlag: flag.AR, founded: "2018",
    coach: { nickname: "tge", realName: "Gustavo Motta", country: "BR", countryFlag: flag.BR },
    worldRanking: 16, rankingPoints: 389, peakRanking: 15, peakRankingDate: "May 2024",
    weeksInTop5: 0, weeksInTop10: 0,
    roster: [
      { playerId: 0, nickname: "max", realName: "Maximiliano Gonzalez", country: "UY", countryFlag: flag.UY, image: playerPhoto.default, role: "IGL", joinDate: "Feb 2019", rating: 1.02, isCaptain: true },
      { playerId: 0, nickname: "dgt", realName: "Franco Garcia", country: "UY", countryFlag: flag.UY, image: playerPhoto.default, role: "Rifler", joinDate: "Feb 2019", rating: 1.15 },
      { playerId: 0, nickname: "HUASOPEEK", realName: "Nicolas Hernandez", country: "CL", countryFlag: flag.CL, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2024", rating: 1.08 },
      { playerId: 0, nickname: "Martinez", realName: "Antonio Martinez", country: "ES", countryFlag: flag.ES, image: playerPhoto.default, role: "AWPer", joinDate: "Jan 2024", rating: 1.12 },
      { playerId: 0, nickname: "buda", realName: "Nicolas Kramer", country: "AR", countryFlag: flag.AR, image: playerPhoto.default, role: "Rifler", joinDate: "Jun 2022", rating: 1.00 },
    ],
    mapStats: [
      { map: "Anubis", played: 45, wins: 32, winRate: 71.1, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Dust II", played: 32, wins: 22, winRate: 68.8, ctWinRate: 51.5, tWinRate: 48.5 },
      { map: "Mirage", played: 38, wins: 20, winRate: 52.6, ctWinRate: 53.0, tWinRate: 47.0 },
    ],
    recentMatches: [
      { opponent: "paiN", opponentLogo: logo.pain, score: "8-16", result: "L", event: "ESL Challenger", date: "Mar 1", format: "BO1" },
    ],
    achievements: [
      { event: "IEM Dallas 2024", placement: "3rd-4th", tier: "S", date: "Jun 2024" },
      { event: "FiReLEAGUE Global Final 2023", placement: "1st", tier: "B", date: "Oct 2023", prize: "$100,000" },
    ],
    transfers: [
      { player: "Martinez", direction: "in", fromTeam: "Movistar Riders", date: "Jan 2024" },
      { player: "try", direction: "out", toTeam: "Imperial", date: "Jul 2025" },
    ],
    headToHead: [
      { opponent: "Imperial", opponentLogo: logo.imperial, wins: 8, losses: 10 },
      { opponent: "FURIA", opponentLogo: logo.furia, wins: 3, losses: 7 },
    ],
    totalMapsPlayed: 180, overallWinRate: 64.2, last10Results: ["L","W","W","L","W","L","W","W","W","L"],
    majorsWon: 0, totalPrizeEarnings: "$650,000",
  },
  {
    id: "mongolz", name: "TheMongolz", shortname: "Mongolz", color: "#f97316", logo: logo.mongolz,
    region: "Asia", country: "MN", countryFlag: flag.MN, founded: "2016",
    coach: { nickname: "maaRaa", realName: "Erdenedalai Bayanbat", country: "MN", countryFlag: flag.MN },
    worldRanking: 17, rankingPoints: 367, peakRanking: 11, peakRankingDate: "Jun 2024",
    weeksInTop5: 0, weeksInTop10: 0,
    roster: [
      { playerId: 0, nickname: "bLitz", realName: "Garidmagnai Byambasuren", country: "MN", countryFlag: flag.MN, image: playerPhoto.default, role: "IGL", joinDate: "Dec 2021", rating: 1.10, isCaptain: true },
      { playerId: 0, nickname: "Techno4K", realName: "Munkhbold Sodbayar", country: "MN", countryFlag: flag.MN, image: playerPhoto.default, role: "Rifler", joinDate: "Dec 2021", rating: 1.08 },
      { playerId: 0, nickname: "910", realName: "Usukhbayar Banzragch", country: "MN", countryFlag: flag.MN, image: playerPhoto.default, role: "AWPer", joinDate: "Apr 2023", rating: 1.12 },
      { playerId: 0, nickname: "Senzu", realName: "Munkhbold Azbayar", country: "MN", countryFlag: flag.MN, image: playerPhoto.default, role: "Rifler", joinDate: "Sep 2023", rating: 1.16 },
      { playerId: 0, nickname: "mzinho", realName: "Ayush Batbold", country: "MN", countryFlag: flag.MN, image: playerPhoto.default, role: "Rifler", joinDate: "Sep 2023", rating: 1.04 },
    ],
    mapStats: [
      { map: "Ancient", played: 42, wins: 32, winRate: 76.2, ctWinRate: 58.0, tWinRate: 42.0 },
      { map: "Mirage", played: 35, wins: 24, winRate: 68.6, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Inferno", played: 28, wins: 18, winRate: 64.3, ctWinRate: 54.0, tWinRate: 46.0 },
    ],
    recentMatches: [
      { opponent: "Spirit", opponentLogo: logo.spirit, score: "0-2", result: "L", event: "PGL Major", date: "Mar 17", format: "BO3" },
    ],
    achievements: [
      { event: "YaLLa Compass 2024", placement: "1st", tier: "A", date: "Jun 2024", prize: "$200,000" },
      { event: "MESA Nomadic Masters Spring 2024", placement: "1st", tier: "B", date: "May 2024", prize: "$50,000" },
    ],
    transfers: [
      { player: "Senzu", direction: "in", fromTeam: "NKT", date: "Sep 2023" },
    ],
    headToHead: [
      { opponent: "Natus Vincere", opponentLogo: logo.navi, wins: 1, losses: 3 },
    ],
    totalMapsPlayed: 150, overallWinRate: 68.5, last10Results: ["L","W","W","W","W","W","L","W","W","W"],
    majorsWon: 0, totalPrizeEarnings: "$850,000",
  },
  {
    id: "virtuspro", name: "Virtus.pro", shortname: "VP", color: "#fb923c", logo: logo.virtuspro,
    region: "Europe", country: "RU", countryFlag: flag.RU, founded: "2003",
    coach: { nickname: "Xoma", realName: "Andrey Mironenko", country: "RU", countryFlag: flag.RU },
    worldRanking: 18, rankingPoints: 345, peakRanking: 1, peakRankingDate: "2021",
    weeksInTop5: 85, weeksInTop10: 160,
    roster: [
      { playerId: 0, nickname: "Jame", realName: "Dzhami Ali", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "AWPer / IGL", joinDate: "Feb 2019", rating: 1.15, isCaptain: true },
      { playerId: 0, nickname: "FL1T", realName: "Evgeniy Lebedev", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "Rifler", joinDate: "Oct 2021", rating: 1.18 },
      { playerId: 0, nickname: "fame", realName: "Petr Bolyshev", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "Rifler", joinDate: "May 2022", rating: 1.08 },
      { playerId: 0, nickname: "electroNic", realName: "Denis Sharipov", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "Rifler", joinDate: "Apr 2024", rating: 1.12 },
      { playerId: 0, nickname: "n0rb3r7", realName: "David Danielyan", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "Rifler", joinDate: "May 2022", rating: 1.02 },
    ],
    mapStats: [
      { map: "Inferno", played: 85, wins: 58, winRate: 68.2, ctWinRate: 56.5, tWinRate: 43.5 },
      { map: "Ancient", played: 65, wins: 44, winRate: 67.7, ctWinRate: 58.0, tWinRate: 42.0 },
      { map: "Overpass", played: 72, wins: 42, winRate: 58.3, ctWinRate: 54.5, tWinRate: 45.5 },
    ],
    recentMatches: [
      { opponent: "Natus Vincere", opponentLogo: logo.navi, score: "1-2", result: "L", event: "PGL Major", date: "Mar 18", format: "BO3" },
    ],
    achievements: [
      { event: "IEM Rio Major 2022", placement: "1st", tier: "S", date: "Nov 2022", prize: "$500,000" },
      { event: "BetBoom Dacha Dubai 2023", placement: "1st", tier: "A", date: "Dec 2023", prize: "$180,000" },
    ],
    transfers: [
      { player: "electroNic", direction: "in", fromTeam: "Cloud9", date: "Apr 2024" },
      { player: "mir", direction: "out", toTeam: "Bench", date: "Apr 2024" },
    ],
    headToHead: [
      { opponent: "Natus Vincere", opponentLogo: logo.navi, wins: 12, losses: 15 },
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 9, losses: 11 },
    ],
    totalMapsPlayed: 410, overallWinRate: 63.8, last10Results: ["L","W","L","W","W","L","W","L","W","W"],
    majorsWon: 1, totalPrizeEarnings: "$5,250,000",
  },
  {
    id: "gamerlegion", name: "GamerLegion", shortname: "GL", color: "#a3e635", logo: logo.gamerlegion,
    region: "Europe", country: "DE", countryFlag: flag.DE, founded: "2017",
    coach: { nickname: "ashhh", realName: "Ashley Battye", country: "GB", countryFlag: flag.GB },
    worldRanking: 19, rankingPoints: 323, peakRanking: 6, peakRankingDate: "Jun 2023",
    weeksInTop5: 0, weeksInTop10: 12,
    roster: [
      { playerId: 0, nickname: "Snax", realName: "Janusz Pogorzelski", country: "PL", countryFlag: flag.PL, image: playerPhoto.default, role: "IGL", joinDate: "Sep 2023", rating: 0.98, isCaptain: true },
      { playerId: 0, nickname: "volt", realName: "Sebastian Malos", country: "GB", countryFlag: flag.GB, image: playerPhoto.default, role: "Rifler", joinDate: "Jul 2023", rating: 1.05 },
      { playerId: 0, nickname: "acoR", realName: "Frederik Gyldstrand", country: "DK", countryFlag: flag.DK, image: playerPhoto.default, role: "AWPer", joinDate: "Sep 2022", rating: 1.10 },
      { playerId: 0, nickname: "a_N_D_R_E_Y", realName: "Andrey Nyystrom", country: "EE", countryFlag: flag.EE, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2025", rating: 1.08 },
      { playerId: 0, nickname: "sl3nd", realName: "Henrich Hevesi", country: "HU", countryFlag: flag.HU, image: playerPhoto.default, role: "Rifler", joinDate: "Mar 2024", rating: 1.12 },
    ],
    mapStats: [
      { map: "Overpass", played: 35, wins: 22, winRate: 62.9, ctWinRate: 54.0, tWinRate: 46.0 },
      { map: "Anubis", played: 28, wins: 16, winRate: 57.1, ctWinRate: 52.5, tWinRate: 47.5 },
      { map: "Ancient", played: 32, wins: 18, winRate: 56.3, ctWinRate: 55.0, tWinRate: 45.0 },
    ],
    recentMatches: [
      { opponent: "Virtus.pro", opponentLogo: logo.virtuspro, score: "1-2", result: "L", event: "PGL Major", date: "Mar 15", format: "BO3" },
    ],
    achievements: [
      { event: "BLAST.tv Paris Major 2023", placement: "2nd", tier: "S", date: "May 2023", prize: "$170,000" },
    ],
    transfers: [
      { player: "Snax", direction: "in", fromTeam: "Pompa", date: "Sep 2023" },
      { player: "siuhy", direction: "out", toTeam: "MOUZ", date: "Jun 2023" },
    ],
    headToHead: [
      { opponent: "MOUZ", opponentLogo: logo.mouz, wins: 2, losses: 6 },
    ],
    totalMapsPlayed: 180, overallWinRate: 56.5, last10Results: ["L","W","L","W","L","W","L","W","L","W"],
    majorsWon: 0, totalPrizeEarnings: "$950,000",
  },
  {
    id: "saw", name: "SAW", shortname: "SAW", color: "#67e8f9", logo: logo.saw,
    region: "Europe", country: "PT", countryFlag: flag.PT, founded: "2020",
    coach: { nickname: "BERRY", realName: "Danny Krüger", country: "DK", countryFlag: flag.DK },
    worldRanking: 20, rankingPoints: 301, peakRanking: 17, peakRankingDate: "Mar 2024",
    weeksInTop5: 0, weeksInTop10: 0,
    roster: [
      { playerId: 0, nickname: "MUTiRiS", realName: "Christopher Fernandes", country: "PT", countryFlag: flag.PT, image: playerPhoto.default, role: "IGL", joinDate: "Jan 2020", rating: 1.06, isCaptain: true },
      { playerId: 0, nickname: "rmn", realName: "Ricardo Oliveira", country: "PT", countryFlag: flag.PT, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2020", rating: 1.04 },
      { playerId: 0, nickname: "ewjerkz", realName: "Michel Pinto", country: "PT", countryFlag: flag.PT, image: playerPhoto.default, role: "Rifler", joinDate: "Jul 2022", rating: 1.15 },
      { playerId: 0, nickname: "story", realName: "João Vieira", country: "PT", countryFlag: flag.PT, image: playerPhoto.default, role: "AWPer", joinDate: "Jul 2022", rating: 1.12 },
      { playerId: 0, nickname: "roman", realName: "Roman Shikhalev", country: "RU", countryFlag: flag.RU, image: playerPhoto.default, role: "Rifler", joinDate: "Jan 2025", rating: 1.08 },
    ],
    mapStats: [
      { map: "Ancient", played: 38, wins: 26, winRate: 68.4, ctWinRate: 56.0, tWinRate: 44.0 },
      { map: "Nuke", played: 42, wins: 28, winRate: 66.7, ctWinRate: 54.5, tWinRate: 45.5 },
      { map: "Vertigo", played: 35, wins: 22, winRate: 62.9, ctWinRate: 53.0, tWinRate: 47.0 },
    ],
    recentMatches: [
      { opponent: "Cloud9", opponentLogo: logo.cloud9, score: "10-13", result: "L", event: "PGL Major", date: "Mar 14", format: "BO1" },
    ],
    achievements: [
      { event: "PGL Major Copenhagen 2024", placement: "17th-19th", tier: "S", date: "Mar 2024" },
      { event: "ESL Challenger Katowice 2023", placement: "3rd-4th", tier: "B", date: "Jun 2023" },
    ],
    transfers: [
      { player: "roman", direction: "in", fromTeam: "Espionage", date: "Jan 2025" },
    ],
    headToHead: [
      { opponent: "G2 Esports", opponentLogo: logo.g2, wins: 1, losses: 2 },
    ],
    totalMapsPlayed: 210, overallWinRate: 61.5, last10Results: ["L","W","W","W","L","W","W","L","W","L"],
    majorsWon: 0, totalPrizeEarnings: "$450,000",
  },
];

teamProfiles.forEach(tp => {
  tp.roster.forEach(rp => {
    if (!manuallyDefinedNames.has(rp.nickname.toLowerCase())) {
      const pBase: Player = {
        id: rp.playerId || nextPlayerId++,
        rank: 0,
        name: rp.nickname,
        realName: rp.realName,
        team: tp.name,
        country: rp.country,
        countryFlag: rp.countryFlag,
        rating: rp.rating,
        kd: "1.00",
        adr: 75.0,
        kast: "70.0%",
        swing: "0.00",
        impact: 1.00,
        dpr: 0.65,
        hsPercent: "50%",
        totalKills: 1000,
        totalDeaths: 1000,
        assists: 200,
        openingKills: 150,
        clutchesWon: 20,
        image: rp.image,
        teamLogo: tp.logo,
      };
      autoGeneratedProfiles.push(makeProfile(pBase, pBase.id, { teamSlug: tp.id }));
    }
  });
});

export const playerProfiles: PlayerProfile[] = [
  ...manuallyDefinedProfiles,
  ...autoGeneratedProfiles,
];

// -- Player of the Week --
export const playerOfTheWeek: PlayerHighlight = {
  player: topPlayers[0],
  event: "PGL ASTANA 2026",
  maps: 12,
  kills: 312,
  deaths: 187,
  title: "Player of the Week",
};

// -- Round Highlight --
export const TBD_TEAM: Team = {
  name: "TBD",
  shortname: "TBD",
  color: "#666",
  logo: "",
};

function sameEvent(matchEvent: string, eventName: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/\b20\d{2}\b/g, "").replace(/[^a-z0-9]/g, "");
  return normalize(matchEvent) === normalize(eventName);
}

function getWinner(mId: number, t1: Team, t2: Team) {
  if (t1.name === "TBD" || t2.name === "TBD") return undefined;
  const hash = (mId + t1.name.length + t2.name.length) % 2;
  return hash === 0 ? t1 : t2;
}

function getMatchTime(index: number) {
  return ["10:00", "13:00", "16:00", "19:00", "22:00"][index % 5];
}

function simulateTournament(event: Event, teams: Team[]): Match[] {
  const generated: Match[] = [];
  const teamCount = teams.length;
  const totalMatches = teamCount >= 16 ? 40 : 20;
  const finishedCount = Math.floor(totalMatches * (event.progress / 100));

  const rounds = teamCount >= 16 ? [8, 8, 8, 6, 3, 4, 2, 1] : [4, 4, 4, 2, 1, 2, 1];
  let mId = 20000 + event.id * 1000;

  for (let r = 0; r < rounds.length; r++) {
    const matchesInRound = rounds[r];
    const isPlayoff = r >= (teamCount >= 16 ? 5 : 4);

    for (let m = 0; m < matchesInRound; m++) {
      const globalIndex = generated.length;
      const status: Match["status"] = globalIndex < finishedCount ? "finished" : (globalIndex === finishedCount && event.progress > 0 ? "live" : "upcoming");

      let t1 = TBD_TEAM;
      let t2 = TBD_TEAM;

      if (!isPlayoff) {
        if (r === 0) {
          t1 = teams[m % teamCount];
          t2 = teams[(m + matchesInRound) % teamCount];
        } else {
          const prevRoundFinished = (generated.length - matchesInRound) < finishedCount;
          if (prevRoundFinished) {
            t1 = teams[(m * 2) % teamCount];
            t2 = teams[(m * 2 + 1) % teamCount];
          }
        }
      } else {
        if (generated.length < finishedCount + 2) {
          t1 = teams[(m * 3) % teamCount];
          t2 = teams[(m * 3 + 2) % teamCount];
        }
      }

      const winner = status === "finished" ? getWinner(mId, t1, t2) : undefined;
      const score1 = status === "upcoming" ? undefined : (winner?.name === t1.name ? 2 : 1);
      const score2 = status === "upcoming" ? undefined : (winner?.name === t2.name ? 2 : 1);

      generated.push({
        id: mId++,
        team1: t1,
        team2: t2,
        score1,
        score2,
        event: event.name,
        format: isPlayoff ? (m === matchesInRound - 1 && r === rounds.length - 1 ? "BO5" : "BO3") : "BO3",
        status,
        time: getMatchTime(m),
      });
    }
  }
  return generated;
}

export function getExtendedMatches(): Match[] {
  const manualMatches = [...liveMatches, ...upcomingMatches, ...recentResults];
  const manualIds = new Set(manualMatches.map(m => m.id));

  // For each live event, if it has few manual matches, add simulated ones
  const allExtended: Match[] = [...manualMatches];

  events.forEach(event => {
    if (event.progress > 0) {
      const directMatches = manualMatches.filter(m => sameEvent(m.event, event.name));
      if (directMatches.length < 5) {
        const simulated = simulateTournament(event, teams);
        simulated.forEach(sm => {
          if (!manualIds.has(sm.id)) {
            allExtended.push(sm);
          }
        });
      }
    }
  });

  return allExtended;
}

// -- Team Rosters & Quizzes --
// (kept rosters list from previous section)

// -- Map Callout Quiz Data --
// (kept quizzes list from previous section)
