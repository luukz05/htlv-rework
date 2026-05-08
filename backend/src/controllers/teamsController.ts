import type { RouteHandler } from "../http/router.js";
import { json, notFound } from "../http/response.js";
import { ranking, teamProfiles, teamRosters, teams } from "../data/mock.js";

export const listTeams: RouteHandler = (_req, res) => {
  json(res, teamProfiles);
};

export const getTeam: RouteHandler = (_req, res, params) => {
  const team = teamProfiles.find((profile) => profile.id === params.id);
  if (!team) {
    notFound(res, "Team not found");
    return;
  }

  json(res, team);
};

export const listTeamRosters: RouteHandler = (_req, res) => {
  json(res, teamRosters);
};

export const listRanking: RouteHandler = (_req, res) => {
  json(res, ranking);
};

export const listTeamCards: RouteHandler = (_req, res) => {
  json(res, teams);
};
