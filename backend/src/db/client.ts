import { MongoClient, type Db } from "mongodb";
import { ensureForumIndexes } from "./forums.js";
import { ensureCommentIndexes } from "./comments.js";
import { ensureTeamsIndexes } from "./teams.js";
import { ensureMatchesIndexes } from "./matches.js";
import { ensureNewsIndexes } from "./news.js";
import { ensureEventsIndexes } from "./events.js";
import { ensureRankingIndexes } from "./ranking.js";
import { ensurePlayersIndexes } from "./players.js";
import { ensureTeamProfilesIndexes } from "./teamProfiles.js";
import { ensureGameMapsIndexes } from "./maps.js";
import { ensureContentIndexes } from "./content.js";

let clientPromise: Promise<MongoClient> | null = null;
let dbPromise: Promise<Db> | null = null;

function getUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  return uri;
}

function getDbName() {
  return process.env.MONGODB_DB || "hltv";
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const client = new MongoClient(getUri());
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const client = await getMongoClient();
      const db = client.db(getDbName());
      await ensureUsersIndexes(db);
      await ensureTeamsIndexes(db);
      await ensureMatchesIndexes(db);
      await ensureNewsIndexes(db);
      await ensureEventsIndexes(db);
      await ensureRankingIndexes(db);
      await ensurePlayersIndexes(db);
      await ensureTeamProfilesIndexes(db);
      await ensureGameMapsIndexes(db);
      await ensureContentIndexes(db);
      await ensureForumIndexes(db);
      await ensureCommentIndexes(db);
      return db;
    })();
  }
  return dbPromise;
}

async function ensureUsersIndexes(db: Db) {
  await db.collection("users").createIndexes([
    { key: { email: 1 }, unique: true, name: "uniq_email" },
    { key: { username: 1 }, unique: true, name: "uniq_username" },
  ]);
}

export async function closeMongo() {
  if (clientPromise) {
    const client = await clientPromise;
    await client.close();
    clientPromise = null;
    dbPromise = null;
  }
}
