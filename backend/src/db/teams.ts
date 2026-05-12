import type { Collection, Db, ObjectId } from "mongodb";
import { getDb } from "./client.js";
import type { Team } from "../data/types.js";

export type TeamDoc = {
  _id: ObjectId;
  name: string;
  shortname: string;
  color: string;
  logo: string;
};

export async function teamsCollection(): Promise<Collection<TeamDoc>> {
  const db = await getDb();
  return db.collection<TeamDoc>("teams");
}

export async function listTeamsFromDb(): Promise<Team[]> {
  const col = await teamsCollection();
  const docs = await col.find({}, { projection: { _id: 0 } }).toArray();
  return docs as unknown as Team[];
}

export async function ensureTeamsIndexes(db: Db) {
  const col = db.collection<TeamDoc>("teams");
  await col.createIndex({ name: 1 }, { unique: true, name: "uniq_name" });
}
