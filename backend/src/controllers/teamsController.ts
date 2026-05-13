import type { RequestHandler } from "express";
import { json, notFound } from "../http/response.js";
import { listTeamsFromDb } from "../db/teams.js";
import { listRankingFromDb } from "../db/ranking.js";
import {
  getTeamProfileFromDb,
  listTeamProfilesFromDb,
  listTeamRostersFromDb,
} from "../db/teamProfiles.js";

export const listTeams: RequestHandler = async (_req, res) => {
  const profiles = await listTeamProfilesFromDb();
  json(res, profiles);
};

export const getTeam: RequestHandler<{ id: string }> = async (req, res) => {
  const team = await getTeamProfileFromDb(req.params.id);
  if (!team) {
    notFound(res, "Team not found");
    return;
  }

  json(res, team);
};

export const listTeamRosters: RequestHandler = async (_req, res) => {
  const rosters = await listTeamRostersFromDb();
  json(res, rosters);
};

export const listRanking: RequestHandler = async (_req, res) => {
  const ranking = await listRankingFromDb();
  json(res, ranking);
};

export const listTeamCards: RequestHandler = async (_req, res) => {
  const teams = await listTeamsFromDb();
  json(res, teams);
};
