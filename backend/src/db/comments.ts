import type { Collection, Db, ObjectId } from "mongodb";
import { getDb } from "./client.js";

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

export async function ensureCommentIndexes(db: Db) {
  const c = db.collection<CommentDoc>("comments");
  await c.createIndex({ targetType: 1, targetId: 1, createdAt: -1 });
}
