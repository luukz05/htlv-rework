import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import {
  academyGuides,
  events,
  forumThreads,
  gameMaps,
  highlights,
  legends,
  mapCalloutQuizzes,
  news,
  roundHighlight,
  streams,
} from "../data/mock.js";
import { galleries } from "../data/platform.js";

function getNumericId(params: Record<string, string>, key: string) {
  const id = Number(params[key]);
  return Number.isFinite(id) ? id : null;
}

export const listNews: RouteHandler = (_req, res) => json(res, news);
export const listEvents: RouteHandler = (_req, res) => json(res, events);
export const listForums: RouteHandler = (_req, res) => json(res, forumThreads);
export const listMaps: RouteHandler = (_req, res) => json(res, gameMaps);
export const listAcademy: RouteHandler = (_req, res) => json(res, academyGuides);
export const listHighlights: RouteHandler = (_req, res) => json(res, highlights);
export const listStreams: RouteHandler = (_req, res) => json(res, streams);
export const listLegends: RouteHandler = (_req, res) => json(res, legends);
export const listGalleries: RouteHandler = (_req, res) => json(res, galleries);
export const listMapCalloutQuizzes: RouteHandler = (_req, res) => json(res, mapCalloutQuizzes);
export const getRoundHighlight: RouteHandler = (_req, res) => json(res, roundHighlight);

export const getNews: RouteHandler = (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid news id");
  const item = news.find((article) => article.id === id);
  return item ? json(res, item) : notFound(res, "News article not found");
};

export const getEvent: RouteHandler = (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid event id");
  const item = events.find((event) => event.id === id);
  return item ? json(res, item) : notFound(res, "Event not found");
};

export const getForum: RouteHandler = (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid forum id");
  const item = forumThreads.find((thread) => thread.id === id);
  return item ? json(res, item) : notFound(res, "Forum thread not found");
};

export const getForumReplies: RouteHandler = (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid forum id");
  json(res, [
    { id: `${id}-1`, user: "ProAnalyst", rank: "Global Elite", time: "5 min ago", text: "Great discussion topic! I think the current meta really favors aggressive play styles. Teams that can execute fast site takes with coordinated utility will dominate.", likes: 67 },
    { id: `${id}-2`, user: "CasualFan22", rank: "Gold Nova", time: "12 min ago", text: "I've been watching competitive CS for about 6 months now and this is exactly what got me hooked. The tactical depth is incredible.", likes: 23 },
    { id: `${id}-3`, user: "VeteranGamer", rank: "Supreme", time: "28 min ago", text: "This reminds me of the old days in CS 1.6. The game has evolved so much but the core competitive spirit remains the same. Love to see it.", likes: 45 },
    { id: `${id}-4`, user: "StratMaster", rank: "Legendary Eagle", time: "45 min ago", text: "If you look at the stats from the last three events, there's a clear trend towards mid-control based strategies.", likes: 89 },
  ]);
};

export const getMap: RouteHandler = (_req, res, params) => {
  const item = gameMaps.find((map) => map.slug === params.slug);
  return item ? json(res, item) : notFound(res, "Map not found");
};

export const getAcademyGuide: RouteHandler = (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid guide id");
  const item = academyGuides.find((guide) => guide.id === id);
  return item ? json(res, item) : notFound(res, "Academy guide not found");
};
