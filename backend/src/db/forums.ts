import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { forumThreads as seedThreads } from "../data/mock.js";

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

const SEED_OP_BODY = "What do you all think about this topic? I've been following the scene closely and wanted to get the community's perspective on this.\n\nWith everything that's been happening recently in the competitive scene, I feel like this is the perfect time to discuss this. The level of play we're seeing right now is absolutely insane.\n\nLet me know your thoughts below. Interested to hear from all skill levels and perspectives!";

const SEED_REPLIES = [
  { user: "ProAnalyst", rank: "Global Elite", body: "Great discussion topic! I think the current meta really favors aggressive play styles. Teams that can execute fast site takes with coordinated utility will dominate.", likes: 67, minsAgo: 5 },
  { user: "CasualFan22", rank: "Gold Nova", body: "I've been watching competitive CS for about 6 months now and this is exactly what got me hooked. The tactical depth is incredible.", likes: 23, minsAgo: 12 },
  { user: "VeteranGamer", rank: "Supreme", body: "This reminds me of the old days in CS 1.6. The game has evolved so much but the core competitive spirit remains the same. Love to see it.", likes: 45, minsAgo: 28 },
  { user: "StratMaster", rank: "Legendary Eagle", body: "If you look at the stats from the last three events, there's a clear trend towards mid-control based strategies. Teams that win mid on Mirage and Inferno are winning 60%+ of their rounds.", likes: 89, minsAgo: 45 },
  { user: "DataDrivenCS", rank: "Legendary Eagle Master", body: "KAST stands for Kill, Assist, Survived, or Traded. It measures how often a player contributes meaningfully to a round. A good KAST is 70%+.", likes: 34, minsAgo: 60 },
];

function parseAgo(label: string, now: Date): Date {
  const m = label.match(/(\d+)\s*(min|h|d)/);
  if (!m) return new Date(now.getTime() - 60_000);
  const n = Number(m[1]);
  const unit = m[2];
  const ms = unit === "min" ? n * 60_000 : unit === "h" ? n * 3_600_000 : n * 86_400_000;
  return new Date(now.getTime() - ms);
}

export async function ensureForumSeed(db: Db) {
  const threads = db.collection<ForumThreadDoc>("forumThreads");
  await threads.createIndex({ pinned: -1, lastActivityAt: -1 });
  const count = await threads.estimatedDocumentCount();
  if (count > 0) return;

  const replies = db.collection<ForumReplyDoc>("forumReplies");
  await replies.createIndex({ threadId: 1, createdAt: 1 });

  const now = new Date();
  for (const t of seedThreads) {
    const threadId = new ObjectId();
    const lastActivity = parseAgo(t.lastReply, now);
    const createdAt = new Date(lastActivity.getTime() - 86_400_000);
    await threads.insertOne({
      _id: threadId,
      title: t.title,
      category: t.category,
      pinned: !!t.pinned,
      body: SEED_OP_BODY,
      authorId: null,
      authorUsername: t.author,
      authorRank: t.authorRank,
      replies: t.replies,
      views: t.views,
      createdAt,
      lastActivityAt: lastActivity,
    });
    for (const r of SEED_REPLIES) {
      await replies.insertOne({
        _id: new ObjectId(),
        threadId,
        authorId: null,
        authorUsername: r.user,
        authorRank: r.rank,
        body: r.body,
        likes: r.likes,
        likedBy: [],
        createdAt: new Date(now.getTime() - r.minsAgo * 60_000),
      });
    }
  }
}
