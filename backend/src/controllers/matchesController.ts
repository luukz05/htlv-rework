import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import { getExtendedMatches } from "../data/mock.js";

export const listMatches: RouteHandler = (_req, res) => {
  json(res, getExtendedMatches());
};

export const listLiveMatches: RouteHandler = (_req, res) => {
  const matches = getExtendedMatches().filter(m => m.status === "live");
  json(res, matches);
};

export const listUpcomingMatches: RouteHandler = (_req, res) => {
  const matches = getExtendedMatches().filter(m => m.status === "upcoming");
  json(res, matches);
};

export const listResults: RouteHandler = (_req, res) => {
  const matches = getExtendedMatches().filter(m => m.status === "finished");
  json(res, matches);
};

export const getMatch: RouteHandler = (_req, res, params) => {
  const id = Number(params?.id);
  if (!Number.isFinite(id)) {
    badRequest(res, "Invalid match id");
    return;
  }

  const match = getExtendedMatches().find((item) => item.id === id);
  if (!match) {
    notFound(res, "Match not found");
    return;
  }

  json(res, match);
};
