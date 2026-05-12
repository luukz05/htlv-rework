import type { RouteHandler } from "../http/router.js";
import { json } from "../http/response.js";
import {
  achievements,
  bookmakers,
  dailyChallenges,
  fantasyLeaderboard,
  games,
  navigation,
} from "../data/config.js";
import { getFantasyPlayersFromDb } from "../db/players.js";
import { getBettingOddsFromDb } from "../db/matches.js";

export const listNavigation: RouteHandler = (_req, res) => json(res, navigation);
export const listGames: RouteHandler = (_req, res) => json(res, games);
export const listDailyChallenges: RouteHandler = (_req, res) => json(res, dailyChallenges);
export const listAchievements: RouteHandler = (_req, res) => json(res, achievements);
export const listFantasyLeaderboard: RouteHandler = (_req, res) => json(res, fantasyLeaderboard);
export const listFantasyPlayers: RouteHandler = async (_req, res) => {
  const players = await getFantasyPlayersFromDb();
  json(res, players);
};
export const listBookmakers: RouteHandler = (_req, res) => json(res, bookmakers);
export const listBettingOdds: RouteHandler = async (_req, res) => {
  const odds = await getBettingOddsFromDb(bookmakers);
  json(res, odds);
};
