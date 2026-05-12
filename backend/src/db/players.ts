import type { Collection, Db, ObjectId } from "mongodb";
import { getDb } from "./client.js";
import type { Player, PlayerProfile } from "../data/types.js";

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

export async function getFantasyPlayersFromDb(): Promise<
  (Player & { fantasyPoints: number; price: string; owned: string })[]
> {
  const top = await listTopPlayersFromDb();
  return top.slice(0, 8).map((player, index) => ({
    ...player,
    fantasyPoints: 320 - index * 26,
    price: (5.0 - index * 0.4).toFixed(1),
    owned: `${85 - index * 7}%`,
  }));
}

export async function ensurePlayersIndexes(db: Db) {
  const top = db.collection<TopPlayerDoc>("topPlayers");
  await top.createIndex({ id: 1 }, { unique: true, name: "uniq_top_id" });
  await top.createIndex({ rank: 1 });

  const profiles = db.collection<PlayerProfileDoc>("playerProfiles");
  await profiles.createIndex({ id: 1 }, { unique: true, name: "uniq_profile_id" });
  await profiles.createIndex({ rank: 1 });
}
