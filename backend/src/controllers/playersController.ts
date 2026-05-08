import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import { playerOfTheWeek, playerProfiles, topPlayers } from "../data/mock.js";

export const listPlayers: RouteHandler = (_req, res) => {
  json(res, playerProfiles);
};

export const listTopPlayers: RouteHandler = (_req, res) => {
  json(res, topPlayers);
};

export const getPlayerOfTheWeek: RouteHandler = (_req, res) => {
  json(res, playerOfTheWeek);
};

export const getPlayer: RouteHandler = (_req, res, params) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    badRequest(res, "Invalid player id");
    return;
  }

  const player = playerProfiles.find((profile) => profile.id === id);
  if (!player) {
    notFound(res, "Player not found");
    return;
  }

  json(res, player);
};
