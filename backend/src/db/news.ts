import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { news as seedNews } from "../data/mock.js";
import type { NewsArticle } from "../data/mock.js";

export type NewsDoc = {
  _id: ObjectId;
} & NewsArticle;

export async function newsCollection(): Promise<Collection<NewsDoc>> {
  const db = await getDb();
  return db.collection<NewsDoc>("news");
}

export async function listNewsFromDb(): Promise<NewsArticle[]> {
  const col = await newsCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ id: 1 })
    .toArray();
  return docs as unknown as NewsArticle[];
}

export async function getNewsByIdFromDb(id: number): Promise<NewsArticle | null> {
  const col = await newsCollection();
  const doc = await col.findOne({ id }, { projection: { _id: 0 } });
  return (doc as unknown as NewsArticle | null) ?? null;
}

export async function ensureNewsSeed(db: Db) {
  const col = db.collection<NewsDoc>("news");
  await col.createIndex({ id: 1 }, { unique: true, name: "uniq_news_id" });
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;

  if (seedNews.length === 0) return;
  await col.insertMany(
    seedNews.map((n) => ({ _id: new ObjectId(), ...n })),
  );
}
