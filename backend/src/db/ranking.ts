import type { Collection, Db, ObjectId } from "mongodb";
import { getDb } from "./client.js";
import type { RankedTeam } from "../data/types.js";

export type RankingDoc = {
  _id: ObjectId;
} & RankedTeam;

export async function rankingCollection(): Promise<Collection<RankingDoc>> {
  const db = await getDb();
  return db.collection<RankingDoc>("ranking");
}

export async function listRankingFromDb(): Promise<RankedTeam[]> {
  const col = await rankingCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ rank: 1 })
    .toArray();
  return docs as unknown as RankedTeam[];
}

export async function ensureRankingIndexes(db: Db) {
  const col = db.collection<RankingDoc>("ranking");
  await col.createIndex({ rank: 1 }, { unique: true, name: "uniq_rank" });
}
