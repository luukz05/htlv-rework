import type { RequestHandler } from "express";
import { badRequest, json, notFound } from "../http/response.js";
import { playerOfTheWeek } from "../data/config.js";
import type { Player, PlayerProfile } from "../data/types.js";
import {
  getPlayerProfileFromDb,
  listPlayerProfilesFromDb,
  listTopPlayersFromDb,
} from "../db/players.js";

export const listPlayers: RequestHandler = async (_req, res) => {
  const profiles = await listPlayerProfilesFromDb();
  json(res, profiles);
};

function profileToPlayer(profile: PlayerProfile): Player {
  return {
    id: profile.id,
    rank: profile.rank,
    name: profile.nickname,
    realName: profile.realName,
    team: profile.team,
    country: profile.country,
    countryFlag: profile.countryFlag,
    rating: profile.rating2,
    kd: profile.kd,
    adr: profile.adr,
    kast: profile.kast,
    swing: profile.swing,
    impact: profile.impact,
    dpr: profile.dpr,
    hsPercent: profile.hsPercent,
    totalKills: profile.totalKills,
    totalDeaths: profile.totalDeaths,
    assists: profile.assists,
    openingKills: profile.openingKills,
    openingDeaths: profile.openingDeaths,
    clutchesWon: profile.clutchesWon,
    clutchesTotal: profile.clutchesTotal,
    image: profile.image,
    teamLogo: profile.teamLogo,
  };
}

export const listTopPlayers: RequestHandler = async (_req, res) => {
  const [topPlayers, playerProfiles] = await Promise.all([
    listTopPlayersFromDb(),
    listPlayerProfilesFromDb(),
  ]);

  const topPlayerIds = new Set(topPlayers.map((p) => p.id));
  const extras: Player[] = playerProfiles
    .filter((p) => !topPlayerIds.has(p.id))
    .map(profileToPlayer)
    .sort((a, b) => b.rating - a.rating);

  const top = topPlayers.map((p) => ({ ...p }));
  const baseRank = top.length;
  extras.forEach((p, i) => {
    p.rank = baseRank + i + 1;
  });

  json(res, [...top, ...extras]);
};

export const getPlayerOfTheWeek: RequestHandler = async (_req, res) => {
  const topPlayers = await listTopPlayersFromDb();
  const { playerId, ...meta } = playerOfTheWeek;
  const player = topPlayers.find((p) => p.id === playerId) ?? topPlayers[0];
  json(res, { ...meta, player });
};

export const getPlayer: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    badRequest(res, "Invalid player id");
    return;
  }

  const player = await getPlayerProfileFromDb(id);
  if (!player) {
    notFound(res, "Player not found");
    return;
  }

  json(res, player);
};
