import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { news } from "../data/mock.js";

export type CommentTargetType = "news" | "match";

export type CommentDoc = {
  _id: ObjectId;
  targetType: CommentTargetType;
  targetId: string;
  authorId: ObjectId | null;
  authorUsername: string;
  authorRank: string;
  body: string;
  likes: number;
  likedBy: ObjectId[];
  createdAt: Date;
};

export async function commentsCollection(): Promise<Collection<CommentDoc>> {
  const db = await getDb();
  return db.collection<CommentDoc>("comments");
}

const NEWS_SEED = [
  { user: "CSFanatic", rank: "Global Elite", body: "Incredible news! This is going to change everything for the scene.", likes: 45, minsAgo: 10 },
  { user: "TacticsMaster", rank: "Legendary Eagle", body: "I saw this coming. The writing was on the wall after last month's results.", likes: 23, minsAgo: 25 },
  { user: "NewPlayer2026", rank: "Gold Nova", body: "Can someone explain what this means for the upcoming Major? I'm new to following the pro scene.", likes: 8, minsAgo: 60 },
];

export async function ensureCommentSeed(db: Db) {
  const c = db.collection<CommentDoc>("comments");
  await c.createIndex({ targetType: 1, targetId: 1, createdAt: -1 });
  const count = await c.estimatedDocumentCount();
  if (count > 0) return;

  const now = new Date();
  for (const article of news) {
    for (const seed of NEWS_SEED) {
      await c.insertOne({
        _id: new ObjectId(),
        targetType: "news",
        targetId: String(article.id),
        authorId: null,
        authorUsername: seed.user,
        authorRank: seed.rank,
        body: seed.body,
        likes: seed.likes,
        likedBy: [],
        createdAt: new Date(now.getTime() - seed.minsAgo * 60_000),
      });
    }
  }
}
