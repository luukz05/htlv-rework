import type {
  Comment,
  Event,
  ForumReply,
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
  AuthUser,
  AuthResponse,
  LeaderboardUser,
} from "./types";

export type GameResultPayload =
  | { game: "csdle"; solved: boolean; guesses: number }
  | { game: "higherLower"; streak: number }
  | { game: "crosshair"; score: number; hits: number; misses: number; flashed?: boolean; flashedCount?: number; goldenHits?: number }
  | { game: "mapGuesser"; score: number }
  | { game: "guessLineup"; correctCount: number; elapsedMs: number }
  | { game: "transferTrivia"; scores: number[]; perfectRounds: boolean[] };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function parseError(response: Response): Promise<never> {
  let message = `${response.status} ${response.statusText}`;
  try {
    const body = await response.json();
    if (body && typeof body.error === "string") message = body.error;
  } catch {
    /* ignore */
  }
  throw new ApiError(response.status, message);
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) return parseError(response);
  return response.json() as Promise<T>;
}

async function apiSend<T>(path: string, method: "POST" | "PATCH", body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    cache: "no-store",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!response.ok) return parseError(response);
  return response.json() as Promise<T>;
}

export const api = {
  health: () => apiGet<{ ok: boolean }>("/health"),
  navigation: () => apiGet<Array<{ label: string; href: string; badge?: string }>>("/navigation"),
  search: (q: string) => apiGet<GlobalSearchResult>(`/search?q=${encodeURIComponent(q)}`),

  register: (body: { username: string; email: string; password: string }) =>
    apiSend<AuthResponse>("/auth/register", "POST", body),
  login: (body: { email: string; password: string }) =>
    apiSend<AuthResponse>("/auth/login", "POST", body),
  logout: () => apiSend<{ ok: true }>("/auth/logout", "POST"),
  me: () => apiGet<AuthResponse>("/users/me"),
  usersLeaderboard: (limit = 100) => apiGet<LeaderboardUser[]>(`/users/leaderboard?limit=${limit}`),
  updateMe: (body: { username?: string }) => apiSend<AuthResponse>("/users/me/profile", "PATCH", body),
  recordGameResult: <G extends GameResultPayload["game"]>(
    gameId: G,
    body: Omit<Extract<GameResultPayload, { game: G }>, "game">,
  ) =>
    apiSend<{
      user: AuthUser;
      newAchievements: string[];
      xpGained: number;
      xpGameGranted: number;
      xpAchievementGranted: number;
      xpCapped: boolean;
    }>(`/users/me/games/${gameId}/result`, "POST", body),

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
  newsComments: (id: number | string) => apiGet<Comment[]>(`/news/${id}/comments`),
  postNewsComment: (id: number | string, body: string) =>
    apiSend<Comment>(`/news/${id}/comments`, "POST", { body }),
  matchComments: (id: number | string) => apiGet<Comment[]>(`/matches/${id}/comments`),
  postMatchComment: (id: number | string, body: string) =>
    apiSend<Comment>(`/matches/${id}/comments`, "POST", { body }),
  toggleCommentLike: (id: string) => apiSend<Comment>(`/comments/${id}/like`, "POST"),

  events: () => apiGet<Event[]>("/events"),
  event: (id: number | string) => apiGet<Event>(`/events/${id}`),

  forums: () => apiGet<ForumThread[]>("/forums"),
  forum: (id: number | string) => apiGet<ForumThread>(`/forums/${id}`),
  forumReplies: (id: number | string) => apiGet<ForumReply[]>(`/forums/${id}/replies`),
  createForumThread: (body: { title: string; category: string; body: string }) =>
    apiSend<ForumThread>("/forums", "POST", body),
  postForumReply: (id: number | string, body: string) =>
    apiSend<ForumReply>(`/forums/${id}/replies`, "POST", { body }),
  toggleForumReplyLike: (id: string) =>
    apiSend<ForumReply>(`/forum-replies/${id}/like`, "POST"),

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
  fantasyLeaderboard: () => apiGet<Array<{ rank: number; name: string; points: number; team: string; change: string }>>("/fantasy/leaderboard"),
  fantasyPlayers: () => apiGet<Array<Player & { fantasyPoints: number; price: string; owned: string }>>("/fantasy/players"),
  bookmakers: () => apiGet<string[]>("/betting/bookmakers"),
  bettingOdds: () => apiGet<Array<{ match: Match; odds: Array<{ bookmaker: string; team1: number; team2: number }> }>>("/betting/odds"),
};
