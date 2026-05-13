import type { RequestHandler } from "express";
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
  const raw = params[key];
  if (raw === undefined) return null;
  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}

export const listNews: RequestHandler = async (_req, res) => {
  const news = await listNewsFromDb();
  json(res, news);
};
export const listEvents: RequestHandler = async (_req, res) => {
  const events = await listEventsFromDb();
  json(res, events);
};
export const listMaps: RequestHandler = async (_req, res) => {
  const maps = await listGameMapsFromDb();
  json(res, maps);
};
export const listAcademy: RequestHandler = async (_req, res) => {
  const guides = await listAcademyFromDb();
  json(res, guides);
};
export const listHighlights: RequestHandler = async (_req, res) => {
  const items = await listHighlightsFromDb();
  json(res, items);
};
export const listStreams: RequestHandler = async (_req, res) => {
  const items = await listStreamsFromDb();
  json(res, items);
};
export const listGalleries: RequestHandler = async (_req, res) => {
  const items = await listGalleriesFromDb();
  json(res, items);
};
export const listMapCalloutQuizzes: RequestHandler = async (_req, res) => {
  const quizzes = await buildMapCalloutQuizzesFromDb();
  json(res, quizzes);
};
export const getRoundHighlight: RequestHandler = async (_req, res) => {
  const item = await getRoundHighlightFromDb();
  if (!item) return notFound(res, "Round highlight not found");
  json(res, item);
};

export const getNews: RequestHandler<{ id: string }> = async (req, res) => {
  const id = getNumericId(req.params, "id");
  if (id === null) return badRequest(res, "Invalid news id");
  const item = await getNewsByIdFromDb(id);
  return item ? json(res, item) : notFound(res, "News article not found");
};

export const getEvent: RequestHandler<{ id: string }> = async (req, res) => {
  const id = getNumericId(req.params, "id");
  if (id === null) return badRequest(res, "Invalid event id");
  const item = await getEventByIdFromDb(id);
  return item ? json(res, item) : notFound(res, "Event not found");
};

export const getMap: RequestHandler<{ slug: string }> = async (req, res) => {
  const item = await getGameMapBySlugFromDb(req.params.slug);
  return item ? json(res, item) : notFound(res, "Map not found");
};

export const getAcademyGuide: RequestHandler<{ id: string }> = async (req, res) => {
  const id = getNumericId(req.params, "id");
  if (id === null) return badRequest(res, "Invalid guide id");
  const item = await getAcademyByIdFromDb(id);
  return item ? json(res, item) : notFound(res, "Academy guide not found");
};
