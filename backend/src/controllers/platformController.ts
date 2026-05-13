import type { RequestHandler } from "express";
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

export const listNavigation: RequestHandler = (_req, res) => json(res, navigation);
export const listGames: RequestHandler = (_req, res) => json(res, games);
export const listDailyChallenges: RequestHandler = (_req, res) => json(res, dailyChallenges);
export const listAchievements: RequestHandler = (_req, res) => json(res, achievements);
export const listFantasyLeaderboard: RequestHandler = (_req, res) => json(res, fantasyLeaderboard);
export const listFantasyPlayers: RequestHandler = async (_req, res) => {
  const players = await getFantasyPlayersFromDb();
  json(res, players);
};
export const listBookmakers: RequestHandler = (_req, res) => json(res, bookmakers);
export const listBettingOdds: RequestHandler = async (_req, res) => {
  const odds = await getBettingOddsFromDb(bookmakers);
  json(res, odds);
};
