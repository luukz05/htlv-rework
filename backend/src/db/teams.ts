import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { teams as seedTeams } from "../data/mock.js";
import type { Team } from "../data/mock.js";

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

export async function ensureTeamsSeed(db: Db) {
  const col = db.collection<TeamDoc>("teams");
  await col.createIndex({ name: 1 }, { unique: true, name: "uniq_name" });
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;

  if (seedTeams.length === 0) return;
  await col.insertMany(
    seedTeams.map((t) => ({
      _id: new ObjectId(),
      name: t.name,
      shortname: t.shortname,
      color: t.color,
      logo: t.logo,
    })),
  );
}
