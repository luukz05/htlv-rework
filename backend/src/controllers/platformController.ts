import type { RouteHandler } from "../http/router.js";
import { json } from "../http/response.js";
import {
  achievements,
  bettingOdds,
  bookmakers,
  dailyChallenges,
  fantasyLeaderboard,
  fantasyPlayers,
  games,
  navigation,
} from "../data/platform.js";

export const listNavigation: RouteHandler = (_req, res) => json(res, navigation);
export const listGames: RouteHandler = (_req, res) => json(res, games);
export const listDailyChallenges: RouteHandler = (_req, res) => json(res, dailyChallenges);
export const listAchievements: RouteHandler = (_req, res) => json(res, achievements);
export const listFantasyLeaderboard: RouteHandler = (_req, res) => json(res, fantasyLeaderboard);
export const listFantasyPlayers: RouteHandler = (_req, res) => json(res, fantasyPlayers);
export const listBookmakers: RouteHandler = (_req, res) => json(res, bookmakers);
export const listBettingOdds: RouteHandler = (_req, res) => json(res, bettingOdds);
