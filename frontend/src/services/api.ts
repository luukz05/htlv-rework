import type {
  Event,
  ForumThread,
  GameMap,
  Guide,
  Highlight,
  MapCalloutQuiz,
  Match,
  NewsArticle,
  Player,
  PlayerHighlight,
  PlayerProfile,
  RankedTeam,
  RoundHighlight,
  Stream,
  Team,
  TeamProfile,
  TeamRoster,
  GlobalSearchResult,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function apiSend<T>(path: string, method: "POST" | "PATCH", body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  health: () => apiGet<{ ok: boolean }>("/health"),
  navigation: () => apiGet<Array<{ label: string; href: string; badge?: string }>>("/navigation"),
  search: (q: string) => apiGet<GlobalSearchResult>(`/search?q=${encodeURIComponent(q)}`),

  register: (body: { username?: string; email?: string; password?: string }) => apiSend("/auth/register", "POST", body),
  login: (body: { username?: string; email?: string; password?: string }) => apiSend("/auth/login", "POST", body),
  me: () => apiGet<unknown>("/users/me"),
  updateMe: (body: unknown) => apiSend("/users/me/profile", "PATCH", body),
  recordGameResult: (gameId: string, body: unknown) => apiSend(`/users/me/games/${gameId}/result`, "POST", body),

  achievements: () => apiGet<unknown[]>("/achievements"),
  dailyChallenges: () => apiGet<unknown[]>("/daily-challenges"),
  games: () => apiGet<unknown[]>("/games"),

  players: () => apiGet<PlayerProfile[]>("/players"),
  player: (id: number | string) => apiGet<PlayerProfile>(`/players/${id}`),
  topPlayers: () => apiGet<Player[]>("/players/top"),

  teams: () => apiGet<TeamProfile[]>("/teams"),
  team: (id: string) => apiGet<TeamProfile>(`/teams/${id}`),
  teamCards: () => apiGet<Team[]>("/teams/cards"),
  teamRosters: () => apiGet<TeamRoster[]>("/teams/rosters"),
  rankings: () => apiGet<RankedTeam[]>("/rankings"),

  matches: () => apiGet<Match[]>("/matches"),
  match: (id: number | string) => apiGet<Match>(`/matches/${id}`),
  liveMatches: () => apiGet<Match[]>("/matches/live"),
  upcomingMatches: () => apiGet<Match[]>("/matches/upcoming"),
  results: () => apiGet<Match[]>("/matches/results"),

  news: () => apiGet<NewsArticle[]>("/news"),
  newsArticle: (id: number | string) => apiGet<NewsArticle>(`/news/${id}`),
  newsComments: (id: number | string) => apiGet<unknown[]>(`/news/${id}/comments`),

  events: () => apiGet<Event[]>("/events"),
  event: (id: number | string) => apiGet<Event>(`/events/${id}`),

  forums: () => apiGet<ForumThread[]>("/forums"),
  forum: (id: number | string) => apiGet<ForumThread>(`/forums/${id}`),
  forumReplies: (id: number | string) => apiGet<unknown[]>(`/forums/${id}/replies`),

  maps: () => apiGet<GameMap[]>("/maps"),
  map: (slug: string) => apiGet<GameMap>(`/maps/${slug}`),
  mapCalloutQuizzes: () => apiGet<MapCalloutQuiz[]>("/map-callout-quizzes"),

  academy: () => apiGet<Guide[]>("/academy"),
  academyGuide: (id: number | string) => apiGet<Guide>(`/academy/${id}`),

  highlights: () => apiGet<Highlight[]>("/highlights"),
  roundHighlight: () => apiGet<RoundHighlight>("/highlights/round"),
  streams: () => apiGet<Stream[]>("/streams"),
  galleries: () => apiGet<Array<{ id: number; title: string; category: string; images: number; image: string; date: string }>>("/galleries"),
  playerOfTheWeek: () => apiGet<PlayerHighlight>("/players/of-the-week"),
  legends: () => apiGet<unknown[]>("/legends"),
  fantasyLeaderboard: () => apiGet<Array<{ rank: number; name: string; points: number; team: string; change: string }>>("/fantasy/leaderboard"),
  fantasyPlayers: () => apiGet<Array<Player & { fantasyPoints: number; price: string; owned: string }>>("/fantasy/players"),
  bookmakers: () => apiGet<string[]>("/betting/bookmakers"),
  bettingOdds: () => apiGet<Array<{ match: Match; odds: Array<{ bookmaker: string; team1: number; team2: number }> }>>("/betting/odds"),
};
