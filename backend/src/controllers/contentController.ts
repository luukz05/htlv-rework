import type { RouteHandler } from "../http/router.js";
import { badRequest, json, notFound } from "../http/response.js";
import { getNewsByIdFromDb, listNewsFromDb } from "../db/news.js";
import { getEventByIdFromDb, listEventsFromDb } from "../db/events.js";
import {
  buildMapCalloutQuizzesFromDb,
  getGameMapBySlugFromDb,
  listGameMapsFromDb,
} from "../db/maps.js";
import {
  getAcademyByIdFromDb,
  getRoundHighlightFromDb,
  listAcademyFromDb,
  listGalleriesFromDb,
  listHighlightsFromDb,
  listStreamsFromDb,
} from "../db/content.js";

function getNumericId(params: Record<string, string>, key: string) {
  const id = Number(params[key]);
  return Number.isFinite(id) ? id : null;
}

export const listNews: RouteHandler = async (_req, res) => {
  const news = await listNewsFromDb();
  json(res, news);
};
export const listEvents: RouteHandler = async (_req, res) => {
  const events = await listEventsFromDb();
  json(res, events);
};
export const listMaps: RouteHandler = async (_req, res) => {
  const maps = await listGameMapsFromDb();
  json(res, maps);
};
export const listAcademy: RouteHandler = async (_req, res) => {
  const guides = await listAcademyFromDb();
  json(res, guides);
};
export const listHighlights: RouteHandler = async (_req, res) => {
  const items = await listHighlightsFromDb();
  json(res, items);
};
export const listStreams: RouteHandler = async (_req, res) => {
  const items = await listStreamsFromDb();
  json(res, items);
};
export const listGalleries: RouteHandler = async (_req, res) => {
  const items = await listGalleriesFromDb();
  json(res, items);
};
export const listMapCalloutQuizzes: RouteHandler = async (_req, res) => {
  const quizzes = await buildMapCalloutQuizzesFromDb();
  json(res, quizzes);
};
export const getRoundHighlight: RouteHandler = async (_req, res) => {
  const item = await getRoundHighlightFromDb();
  if (!item) return notFound(res, "Round highlight not found");
  json(res, item);
};

export const getNews: RouteHandler = async (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid news id");
  const item = await getNewsByIdFromDb(id);
  return item ? json(res, item) : notFound(res, "News article not found");
};

export const getEvent: RouteHandler = async (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid event id");
  const item = await getEventByIdFromDb(id);
  return item ? json(res, item) : notFound(res, "Event not found");
};

export const getMap: RouteHandler = async (_req, res, params) => {
  const item = await getGameMapBySlugFromDb(params.slug);
  return item ? json(res, item) : notFound(res, "Map not found");
};

export const getAcademyGuide: RouteHandler = async (_req, res, params) => {
  const id = getNumericId(params, "id");
  if (id === null) return badRequest(res, "Invalid guide id");
  const item = await getAcademyByIdFromDb(id);
  return item ? json(res, item) : notFound(res, "Academy guide not found");
};
