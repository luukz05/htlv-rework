import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { ranking as seedRanking } from "../data/mock.js";
import type { RankedTeam } from "../data/mock.js";

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

export async function ensureRankingSeed(db: Db) {
  const col = db.collection<RankingDoc>("ranking");
  await col.createIndex({ rank: 1 }, { unique: true, name: "uniq_rank" });
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;

  if (seedRanking.length === 0) return;
  await col.insertMany(
    seedRanking.map((r) => ({ _id: new ObjectId(), ...r })),
  );
}
