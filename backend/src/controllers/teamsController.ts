import type { RouteHandler } from "../http/router.js";
import { json, notFound } from "../http/response.js";
import { listTeamsFromDb } from "../db/teams.js";
import { listRankingFromDb } from "../db/ranking.js";
import {
  getTeamProfileFromDb,
  listTeamProfilesFromDb,
  listTeamRostersFromDb,
} from "../db/teamProfiles.js";

export const listTeams: RouteHandler = async (_req, res) => {
  const profiles = await listTeamProfilesFromDb();
  json(res, profiles);
};

export const getTeam: RouteHandler = async (_req, res, params) => {
  const team = await getTeamProfileFromDb(params.id);
  if (!team) {
    notFound(res, "Team not found");
    return;
  }

  json(res, team);
};

export const listTeamRosters: RouteHandler = async (_req, res) => {
  const rosters = await listTeamRostersFromDb();
  json(res, rosters);
};

export const listRanking: RouteHandler = async (_req, res) => {
  const ranking = await listRankingFromDb();
  json(res, ranking);
};

export const listTeamCards: RouteHandler = async (_req, res) => {
  const teams = await listTeamsFromDb();
  json(res, teams);
};
