import { MongoClient, type Db } from "mongodb";
import { ensureForumSeed } from "./forums.js";
import { ensureCommentSeed } from "./comments.js";

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
      await ensureIndexes(db);
      await ensureForumSeed(db);
      await ensureCommentSeed(db);
      return db;
    })();
  }
  return dbPromise;
}

async function ensureIndexes(db: Db) {
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
