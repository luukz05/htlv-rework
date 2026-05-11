import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import { playerOfTheWeek, playerProfiles, topPlayers } from "../data/mock.js";
import type { Player, PlayerProfile } from "../data/mock.js";

export const listPlayers: RouteHandler = (_req, res) => {
  json(res, playerProfiles);
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

export const listTopPlayers: RouteHandler = (_req, res) => {
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
