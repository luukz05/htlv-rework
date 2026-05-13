import express, { type Express } from "express";
import cors from "cors";
import { json } from "../http/response.js";
import {
  getPlayer,
  getPlayerOfTheWeek,
  listPlayers,
  listTopPlayers,
} from "../controllers/playersController.js";
import {
  getTeam,
  listRanking,
  listTeamCards,
  listTeamRosters,
  listTeams,
} from "../controllers/teamsController.js";
import {
  getMatch,
  listLiveMatches,
  listMatches,
  listResults,
  listUpcomingMatches,
} from "../controllers/matchesController.js";
import {
  getAcademyGuide,
  getEvent,
  getMap,
  getNews,
  getRoundHighlight,
  listAcademy,
  listEvents,
  listGalleries,
  listHighlights,
  listMapCalloutQuizzes,
  listMaps,
  listNews,
  listStreams,
} from "../controllers/contentController.js";
import {
  listAchievements,
  listBettingOdds,
  listBookmakers,
  listDailyChallenges,
  listFantasyLeaderboard,
  listFantasyPlayers,
  listGames,
  listNavigation,
} from "../controllers/platformController.js";
import {
  createForumReply,
  createForumThread,
  getForum,
  getForumReplies,
  listForums,
  toggleForumReplyLike,
} from "../controllers/forumsController.js";
import {
  createMatchComment,
  createNewsComment,
  listMatchComments,
  listNewsComments,
  toggleCommentLike,
} from "../controllers/commentsController.js";
import {
  authDiag,
  getMe,
  listLeaderboard,
  login,
  logout,
  recordGameResult,
  register,
  updateMe,
} from "../controllers/usersController.js";
import { globalSearch } from "../controllers/searchController.js";

function buildAllowedOriginChecker() {
  const defaultOrigins = [
    "http://localhost:3000",
    "https://htlv-rework.vercel.app",
  ];
  const configuredOrigins = (process.env.FRONTEND_ORIGIN || defaultOrigins.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowedOrigins = new Set(configuredOrigins);

  // Derive Vercel project prefixes from configured origins so preview deploys are
  // auto-allowed without manual env config. E.g. `https://htlv-rework.vercel.app`
  // → allows `https://htlv-rework-<anything>.vercel.app`.
  const vercelProjectPrefixes = new Set<string>();
  for (const origin of configuredOrigins) {
    const m = origin.match(/^https:\/\/([a-z0-9-]+)\.vercel\.app$/);
    if (m) vercelProjectPrefixes.add(m[1]);
  }

  const isAllowedOrigin = (origin: string) => {
    if (allowedOrigins.has(origin)) return true;
    const m = origin.match(/^https:\/\/([a-z0-9-]+)\.vercel\.app$/);
    if (m) {
      const host = m[1];
      for (const prefix of vercelProjectPrefixes) {
        if (host === prefix || host.startsWith(`${prefix}-`)) return true;
      }
    }
    return false;
  };

  return { isAllowedOrigin, allowedOrigins, vercelProjectPrefixes };
}

export function createApp(): Express {
  const app = express();

  const { isAllowedOrigin, allowedOrigins, vercelProjectPrefixes } = buildAllowedOriginChecker();
  console.log(`Allowed origins:`, [...allowedOrigins]);
  if (vercelProjectPrefixes.size > 0) {
    console.log(`Vercel preview prefixes:`, [...vercelProjectPrefixes]);
  }

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        cb(null, isAllowedOrigin(origin));
      },
      credentials: true,
      methods: ["GET", "POST", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(express.json({ limit: "100kb" }));

  app.get("/health", (_req, res) => json(res, { ok: true }));
  app.get("/navigation", listNavigation);
  app.get("/search", globalSearch);

  app.post("/auth/register", register);
  app.post("/auth/login", login);
  app.post("/auth/logout", logout);
  app.get("/auth/diag", authDiag);
  app.get("/users/leaderboard", listLeaderboard);
  app.get("/users/me", getMe);
  app.patch("/users/me/profile", updateMe);
  app.post("/users/me/games/:gameId/result", recordGameResult);

  app.get("/achievements", listAchievements);
  app.get("/daily-challenges", listDailyChallenges);
  app.get("/games", listGames);

  app.get("/fantasy/leaderboard", listFantasyLeaderboard);
  app.get("/fantasy/players", listFantasyPlayers);
  app.get("/betting/bookmakers", listBookmakers);
  app.get("/betting/odds", listBettingOdds);

  app.get("/players/top", listTopPlayers);
  app.get("/players/of-the-week", getPlayerOfTheWeek);
  app.get("/players/:id", getPlayer);
  app.get("/players", listPlayers);

  app.get("/teams/cards", listTeamCards);
  app.get("/teams/rosters", listTeamRosters);
  app.get("/teams/:id", getTeam);
  app.get("/teams", listTeams);
  app.get("/rankings", listRanking);

  app.get("/matches/live", listLiveMatches);
  app.get("/matches/upcoming", listUpcomingMatches);
  app.get("/matches/results", listResults);
  app.get("/matches/:id", getMatch);
  app.get("/matches", listMatches);

  app.get("/news/:id/comments", listNewsComments);
  app.post("/news/:id/comments", createNewsComment);
  app.get("/news/:id", getNews);
  app.get("/news", listNews);

  app.get("/matches/:id/comments", listMatchComments);
  app.post("/matches/:id/comments", createMatchComment);

  app.post("/comments/:id/like", toggleCommentLike);

  app.get("/events/:id", getEvent);
  app.get("/events", listEvents);

  app.get("/forums/:id/replies", getForumReplies);
  app.post("/forums/:id/replies", createForumReply);
  app.get("/forums/:id", getForum);
  app.get("/forums", listForums);
  app.post("/forums", createForumThread);
  app.post("/forum-replies/:id/like", toggleForumReplyLike);

  app.get("/maps/:slug", getMap);
  app.get("/maps", listMaps);
  app.get("/map-callout-quizzes", listMapCalloutQuizzes);

  app.get("/academy/:id", getAcademyGuide);
  app.get("/academy", listAcademy);

  app.get("/highlights/round", getRoundHighlight);
  app.get("/highlights", listHighlights);
  app.get("/streams", listStreams);
  app.get("/galleries", listGalleries);

  return app;
}
