import type { RequestHandler } from "express";
import { badRequest, json, notFound } from "../http/response.js";
import { getExtendedMatchesFromDb } from "../db/matches.js";

export const listMatches: RequestHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches);
};

export const listLiveMatches: RequestHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches.filter((m) => m.status === "live"));
};

export const listUpcomingMatches: RequestHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches.filter((m) => m.status === "upcoming"));
};

export const listResults: RequestHandler = async (_req, res) => {
  const matches = await getExtendedMatchesFromDb();
  json(res, matches.filter((m) => m.status === "finished"));
};

export const getMatch: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
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
