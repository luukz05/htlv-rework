import type { Collection, Db, ObjectId } from "mongodb";
import { getDb } from "./client.js";

export type ForumThreadDoc = {
  _id: ObjectId;
  title: string;
  category: string;
  pinned: boolean;
  body: string;
  authorId: ObjectId | null;
  authorUsername: string;
  authorRank: string;
  replies: number;
  views: number;
  createdAt: Date;
  lastActivityAt: Date;
};

export type ForumReplyDoc = {
  _id: ObjectId;
  threadId: ObjectId;
  authorId: ObjectId | null;
  authorUsername: string;
  authorRank: string;
  body: string;
  likes: number;
  likedBy: ObjectId[];
  createdAt: Date;
};

export async function forumThreadsCollection(): Promise<Collection<ForumThreadDoc>> {
  const db = await getDb();
  return db.collection<ForumThreadDoc>("forumThreads");
}

export async function forumRepliesCollection(): Promise<Collection<ForumReplyDoc>> {
  const db = await getDb();
  return db.collection<ForumReplyDoc>("forumReplies");
}

export async function ensureForumIndexes(db: Db) {
  const threads = db.collection<ForumThreadDoc>("forumThreads");
  await threads.createIndex({ pinned: -1, lastActivityAt: -1 });

  const replies = db.collection<ForumReplyDoc>("forumReplies");
  await replies.createIndex({ threadId: 1, createdAt: 1 });
}
