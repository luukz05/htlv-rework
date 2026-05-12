import type { Collection, Db, ObjectId } from "mongodb";
import { getDb } from "./client.js";
import type { TeamProfile, TeamRoster } from "../data/types.js";

export type TeamProfileDoc = {
  _id: ObjectId;
} & TeamProfile;

export type TeamRosterDoc = {
  _id: ObjectId;
} & TeamRoster;

export async function teamProfilesCollection(): Promise<Collection<TeamProfileDoc>> {
  const db = await getDb();
  return db.collection<TeamProfileDoc>("teamProfiles");
}

export async function teamRostersCollection(): Promise<Collection<TeamRosterDoc>> {
  const db = await getDb();
  return db.collection<TeamRosterDoc>("teamRosters");
}

export async function listTeamProfilesFromDb(): Promise<TeamProfile[]> {
  const col = await teamProfilesCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ worldRanking: 1 })
    .toArray();
  return docs as unknown as TeamProfile[];
}

export async function getTeamProfileFromDb(id: string): Promise<TeamProfile | null> {
  const col = await teamProfilesCollection();
  const doc = await col.findOne({ id }, { projection: { _id: 0 } });
  return (doc as unknown as TeamProfile | null) ?? null;
}

export async function listTeamRostersFromDb(): Promise<TeamRoster[]> {
  const col = await teamRostersCollection();
  const docs = await col.find({}, { projection: { _id: 0 } }).toArray();
  return docs as unknown as TeamRoster[];
}

export async function ensureTeamProfilesIndexes(db: Db) {
  const profiles = db.collection<TeamProfileDoc>("teamProfiles");
  await profiles.createIndex({ id: 1 }, { unique: true, name: "uniq_team_profile_id" });

  const rosters = db.collection<TeamRosterDoc>("teamRosters");
  await rosters.createIndex(
    { teamName: 1 },
    { unique: true, name: "uniq_roster_team" },
  );
}
