import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import { getExtendedMatchesFromDb } from "../db/matches.js";

export const listMatches: RouteHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches);
};

export const listLiveMatches: RouteHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches.filter((m) => m.status === "live"));
};

export const listUpcomingMatches: RouteHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches.filter((m) => m.status === "upcoming"));
};

export const listResults: RouteHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches.filter((m) => m.status === "finished"));
};

export const getMatch: RouteHandler = async (_req, res, params) => {
  const id = Number(params?.id);
  if (!Number.isFinite(id)) {
    badRequest(res, "Invalid match id");
    return;
  }

  const matches = await getExtendedMatchesFromDb();
  const match = matches.find((item) => item.id === id);
  if (!match) {
    notFound(res, "Match not found");
    return;
  }

  json(res, match);
};
