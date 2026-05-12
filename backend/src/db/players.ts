import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { playerProfiles as seedProfiles, topPlayers as seedTop } from "../data/mock.js";
import type { Player, PlayerProfile } from "../data/mock.js";

export type TopPlayerDoc = {
  _id: ObjectId;
} & Player;

export type PlayerProfileDoc = {
  _id: ObjectId;
} & PlayerProfile;

export async function topPlayersCollection(): Promise<Collection<TopPlayerDoc>> {
  const db = await getDb();
  return db.collection<TopPlayerDoc>("topPlayers");
}

export async function playerProfilesCollection(): Promise<Collection<PlayerProfileDoc>> {
  const db = await getDb();
  return db.collection<PlayerProfileDoc>("playerProfiles");
}

export async function listTopPlayersFromDb(): Promise<Player[]> {
  const col = await topPlayersCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ rank: 1 })
    .toArray();
  return docs as unknown as Player[];
}

export async function listPlayerProfilesFromDb(): Promise<PlayerProfile[]> {
  const col = await playerProfilesCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ rank: 1 })
    .toArray();
  return docs as unknown as PlayerProfile[];
}

export async function getPlayerProfileFromDb(id: number): Promise<PlayerProfile | null> {
  const col = await playerProfilesCollection();
  const doc = await col.findOne({ id }, { projection: { _id: 0 } });
  return (doc as unknown as PlayerProfile | null) ?? null;
}

export async function ensurePlayersSeed(db: Db) {
  const top = db.collection<TopPlayerDoc>("topPlayers");
  await top.createIndex({ id: 1 }, { unique: true, name: "uniq_top_id" });
  await top.createIndex({ rank: 1 });
  if ((await top.estimatedDocumentCount()) === 0 && seedTop.length > 0) {
    await top.insertMany(seedTop.map((p) => ({ _id: new ObjectId(), ...p })));
  }

  const profiles = db.collection<PlayerProfileDoc>("playerProfiles");
  await profiles.createIndex({ id: 1 }, { unique: true, name: "uniq_profile_id" });
  await profiles.createIndex({ rank: 1 });
  if ((await profiles.estimatedDocumentCount()) === 0 && seedProfiles.length > 0) {
    await profiles.insertMany(
      seedProfiles.map((p) => ({ _id: new ObjectId(), ...p })),
    );
  }
}
