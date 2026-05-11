import { Router } from "../http/router.js";
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
  getForum,
  getForumReplies,
  getMap,
  getNews,
  getRoundHighlight,
  listAcademy,
  listEvents,
  listForums,
  listGalleries,
  listHighlights,
  listLegends,
  listMapCalloutQuizzes,
  listMaps,
  listNews,
  listStreams,
} from "../controllers/contentController.js";
import {
  getNewsComments,
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
  getMe,
  login,
  recordGameResult,
  register,
  updateMe,
} from "../controllers/usersController.js";
import { globalSearch } from "../controllers/searchController.js";

export function createRouter() {
  const router = new Router();

  router.get("/health", (_req, res) => json(res, { ok: true }));
  router.get("/navigation", listNavigation);
  router.get("/search", globalSearch);

  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/users/me", getMe);
  router.patch("/users/me/profile", updateMe);
  router.post("/users/me/games/:gameId/result", recordGameResult);

  router.get("/achievements", listAchievements);
  router.get("/daily-challenges", listDailyChallenges);
  router.get("/games", listGames);

  router.get("/fantasy/leaderboard", listFantasyLeaderboard);
  router.get("/fantasy/players", listFantasyPlayers);
  router.get("/betting/bookmakers", listBookmakers);
  router.get("/betting/odds", listBettingOdds);
 
  router.get("/players/top", listTopPlayers);
  router.get("/players/of-the-week", getPlayerOfTheWeek);
  router.get("/players/:id", getPlayer);
  router.get("/players", listPlayers);

  router.get("/teams/cards", listTeamCards);
  router.get("/teams/rosters", listTeamRosters);
  router.get("/teams/:id", getTeam);
  router.get("/teams", listTeams);
  router.get("/rankings", listRanking);

  router.get("/matches/live", listLiveMatches);
  router.get("/matches/upcoming", listUpcomingMatches);
  router.get("/matches/results", listResults);
  router.get("/matches/:id", getMatch);
  router.get("/matches", listMatches);

  router.get("/news/:id/comments", getNewsComments);
  router.get("/news/:id", getNews);
  router.get("/news", listNews);

  router.get("/events/:id", getEvent);
  router.get("/events", listEvents);

  router.get("/forums/:id/replies", getForumReplies);
  router.get("/forums/:id", getForum);
  router.get("/forums", listForums);

  router.get("/maps/:slug", getMap);
  router.get("/maps", listMaps);
  router.get("/map-callout-quizzes", listMapCalloutQuizzes);

  router.get("/academy/:id", getAcademyGuide);
  router.get("/academy", listAcademy);

  router.get("/highlights/round", getRoundHighlight);
  router.get("/highlights", listHighlights);
  router.get("/streams", listStreams);
  router.get("/legends", listLegends);
  router.get("/galleries", listGalleries);

  return router;
}
