import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import {
  academyGuides,
  events,
  gameMaps,
  highlights,
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
export const listMaps: RouteHandler = (_req, res) => json(res, gameMaps);
export const listAcademy: RouteHandler = (_req, res) => json(res, academyGuides);
export const listHighlights: RouteHandler = (_req, res) => json(res, highlights);
export const listStreams: RouteHandler = (_req, res) => json(res, streams);
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
