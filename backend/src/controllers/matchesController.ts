import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import { liveMatches, recentResults, upcomingMatches } from "../data/mock.js";

const allMatches = [...liveMatches, ...upcomingMatches, ...recentResults];

export const listMatches: RouteHandler = (_req, res) => {
  json(res, allMatches);
};

export const listLiveMatches: RouteHandler = (_req, res) => {
  json(res, liveMatches);
};

export const listUpcomingMatches: RouteHandler = (_req, res) => {
  json(res, upcomingMatches);
};

export const listResults: RouteHandler = (_req, res) => {
  json(res, recentResults);
};

export const getMatch: RouteHandler = (_req, res, params) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    badRequest(res, "Invalid match id");
    return;
  }

  const match = allMatches.find((item) => item.id === id);
  if (!match) {
    notFound(res, "Match not found");
    return;
  }

  json(res, match);
};
