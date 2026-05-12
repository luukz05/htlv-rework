import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { gameMaps as seedMaps } from "../data/mock.js";
import type { GameMap, MapCalloutQuiz } from "../data/mock.js";

export type GameMapDoc = {
  _id: ObjectId;
} & GameMap;

export async function gameMapsCollection(): Promise<Collection<GameMapDoc>> {
  const db = await getDb();
  return db.collection<GameMapDoc>("gameMaps");
}

export async function listGameMapsFromDb(): Promise<GameMap[]> {
  const col = await gameMapsCollection();
  const docs = await col.find({}, { projection: { _id: 0 } }).toArray();
  return docs as unknown as GameMap[];
}

export async function getGameMapBySlugFromDb(slug: string): Promise<GameMap | null> {
  const col = await gameMapsCollection();
  const doc = await col.findOne({ slug }, { projection: { _id: 0 } });
  return (doc as unknown as GameMap | null) ?? null;
}

export async function buildMapCalloutQuizzesFromDb(): Promise<MapCalloutQuiz[]> {
  const maps = await listGameMapsFromDb();
  return maps.flatMap((map) =>
    map.callouts.slice(0, 6).map((callout, index) => ({
      callout,
      description: `Identify the map that uses the ${callout} callout.`,
      correctMap: map.name,
      difficulty: (index < 2 ? "easy" : index < 4 ? "medium" : "hard") as
        | "easy"
        | "medium"
        | "hard",
    })),
  );
}

export async function ensureGameMapsSeed(db: Db) {
  const col = db.collection<GameMapDoc>("gameMaps");
  await col.createIndex({ slug: 1 }, { unique: true, name: "uniq_map_slug" });
  if ((await col.estimatedDocumentCount()) === 0 && seedMaps.length > 0) {
    await col.insertMany(
      seedMaps.map((m) => ({ _id: new ObjectId(), ...m })),
    );
  }
}
