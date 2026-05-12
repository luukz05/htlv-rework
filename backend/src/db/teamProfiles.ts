import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import {
  teamProfiles as seedProfiles,
  teamRosters as seedRosters,
} from "../data/mock.js";
import type { TeamProfile, TeamRoster } from "../data/mock.js";

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

export async function ensureTeamProfilesSeed(db: Db) {
  const profiles = db.collection<TeamProfileDoc>("teamProfiles");
  await profiles.createIndex({ id: 1 }, { unique: true, name: "uniq_team_profile_id" });
  if ((await profiles.estimatedDocumentCount()) === 0 && seedProfiles.length > 0) {
    await profiles.insertMany(
      seedProfiles.map((p) => ({ _id: new ObjectId(), ...p })),
    );
  }

  const rosters = db.collection<TeamRosterDoc>("teamRosters");
  await rosters.createIndex(
    { teamName: 1 },
    { unique: true, name: "uniq_roster_team" },
  );
  if ((await rosters.estimatedDocumentCount()) === 0 && seedRosters.length > 0) {
    await rosters.insertMany(
      seedRosters.map((r) => ({ _id: new ObjectId(), ...r })),
    );
  }
}
