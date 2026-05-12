import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import {
  academyGuides as seedGuides,
  highlights as seedHighlights,
  roundHighlight as seedRoundHighlight,
  streams as seedStreams,
} from "../data/mock.js";
import { galleries as seedGalleries } from "../data/platform.js";
import type {
  Guide,
  Highlight,
  RoundHighlight,
  Stream,
} from "../data/mock.js";

type GalleryItem = (typeof seedGalleries)[number];

export type AcademyGuideDoc = { _id: ObjectId } & Guide;
export type HighlightDoc = { _id: ObjectId } & Highlight;
export type StreamDoc = { _id: ObjectId } & Stream;
export type GalleryDoc = { _id: ObjectId } & GalleryItem;
export type RoundHighlightDoc = { _id: ObjectId; key: "current" } & RoundHighlight;

export async function academyCollection(): Promise<Collection<AcademyGuideDoc>> {
  const db = await getDb();
  return db.collection<AcademyGuideDoc>("academyGuides");
}

export async function highlightsCollection(): Promise<Collection<HighlightDoc>> {
  const db = await getDb();
  return db.collection<HighlightDoc>("highlights");
}

export async function roundHighlightCollection(): Promise<Collection<RoundHighlightDoc>> {
  const db = await getDb();
  return db.collection<RoundHighlightDoc>("roundHighlight");
}

export async function streamsCollection(): Promise<Collection<StreamDoc>> {
  const db = await getDb();
  return db.collection<StreamDoc>("streams");
}

export async function galleriesCollection(): Promise<Collection<GalleryDoc>> {
  const db = await getDb();
  return db.collection<GalleryDoc>("galleries");
}

export async function listAcademyFromDb(): Promise<Guide[]> {
  const col = await academyCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ id: 1 })
    .toArray();
  return docs as unknown as Guide[];
}

export async function getAcademyByIdFromDb(id: number): Promise<Guide | null> {
  const col = await academyCollection();
  const doc = await col.findOne({ id }, { projection: { _id: 0 } });
  return (doc as unknown as Guide | null) ?? null;
}

export async function listHighlightsFromDb(): Promise<Highlight[]> {
  const col = await highlightsCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ id: 1 })
    .toArray();
  return docs as unknown as Highlight[];
}

export async function getRoundHighlightFromDb(): Promise<RoundHighlight | null> {
  const col = await roundHighlightCollection();
  const doc = await col.findOne(
    { key: "current" },
    { projection: { _id: 0, key: 0 } },
  );
  return (doc as unknown as RoundHighlight | null) ?? null;
}

export async function listStreamsFromDb(): Promise<Stream[]> {
  const col = await streamsCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ viewers: -1 })
    .toArray();
  return docs as unknown as Stream[];
}

export async function listGalleriesFromDb(): Promise<GalleryItem[]> {
  const col = await galleriesCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ id: 1 })
    .toArray();
  return docs as unknown as GalleryItem[];
}

export async function ensureContentSeed(db: Db) {
  const academy = db.collection<AcademyGuideDoc>("academyGuides");
  await academy.createIndex({ id: 1 }, { unique: true, name: "uniq_guide_id" });
  if ((await academy.estimatedDocumentCount()) === 0 && seedGuides.length > 0) {
    await academy.insertMany(seedGuides.map((g) => ({ _id: new ObjectId(), ...g })));
  }

  const hl = db.collection<HighlightDoc>("highlights");
  await hl.createIndex({ id: 1 }, { unique: true, name: "uniq_highlight_id" });
  if ((await hl.estimatedDocumentCount()) === 0 && seedHighlights.length > 0) {
    await hl.insertMany(seedHighlights.map((h) => ({ _id: new ObjectId(), ...h })));
  }

  const rh = db.collection<RoundHighlightDoc>("roundHighlight");
  await rh.createIndex({ key: 1 }, { unique: true, name: "uniq_round_key" });
  if ((await rh.estimatedDocumentCount()) === 0) {
    await rh.insertOne({ _id: new ObjectId(), key: "current", ...seedRoundHighlight });
  }

  const st = db.collection<StreamDoc>("streams");
  await st.createIndex({ id: 1 }, { unique: true, name: "uniq_stream_id" });
  if ((await st.estimatedDocumentCount()) === 0 && seedStreams.length > 0) {
    await st.insertMany(seedStreams.map((s) => ({ _id: new ObjectId(), ...s })));
  }

  const gal = db.collection<GalleryDoc>("galleries");
  await gal.createIndex({ id: 1 }, { unique: true, name: "uniq_gallery_id" });
  if ((await gal.estimatedDocumentCount()) === 0 && seedGalleries.length > 0) {
    await gal.insertMany(seedGalleries.map((g) => ({ _id: new ObjectId(), ...g })));
  }
}
