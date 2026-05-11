import { ObjectId } from "mongodb";
import type { RouteHandler } from "../http/router.js";
import { readJsonBody } from "../http/body.js";
import { badRequest, json, notFound, unauthorized } from "../http/response.js";
import {
  forumRepliesCollection,
  forumThreadsCollection,
  type ForumReplyDoc,
  type ForumThreadDoc,
} from "../db/forums.js";
import { getAuthedUser, rankForLevel, relativeTime } from "../lib/session.js";

const ALLOWED_CATEGORIES = new Set([
  "General",
  "Match Discussion",
  "Team Discussion",
  "Help",
  "Multimedia",
  "Off Topic",
]);

function serializeThread(doc: ForumThreadDoc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    pinned: doc.pinned,
    body: doc.body,
    author: doc.authorUsername,
    authorRank: doc.authorRank,
    replies: doc.replies,
    views: doc.views,
    lastReply: relativeTime(doc.lastActivityAt),
    createdAt: doc.createdAt.toISOString(),
  };
}

function serializeReply(doc: ForumReplyDoc, viewerId: ObjectId | null) {
  return {
    id: doc._id.toString(),
    user: doc.authorUsername,
    rank: doc.authorRank,
    text: doc.body,
    time: relativeTime(doc.createdAt),
    likes: doc.likes,
    likedByMe: viewerId ? doc.likedBy.some((id) => id.equals(viewerId)) : false,
    canDelete: viewerId ? doc.authorId?.equals(viewerId) ?? false : false,
  };
}

export const listForums: RouteHandler = async (_req, res) => {
  const threads = await forumThreadsCollection();
  const docs = await threads
    .find({})
    .sort({ pinned: -1, lastActivityAt: -1 })
    .limit(200)
    .toArray();
  json(res, docs.map(serializeThread));
};

export const getForum: RouteHandler = async (_req, res, params) => {
  if (!ObjectId.isValid(params.id)) return badRequest(res, "Invalid forum id");
  const threads = await forumThreadsCollection();
  const id = new ObjectId(params.id);
  const doc = await threads.findOneAndUpdate(
    { _id: id },
    { $inc: { views: 1 } },
    { returnDocument: "after" },
  );
  if (!doc) return notFound(res, "Forum thread not found");
  json(res, serializeThread(doc));
};

export const getForumReplies: RouteHandler = async (req, res, params) => {
  if (!ObjectId.isValid(params.id)) return badRequest(res, "Invalid forum id");
  const viewer = await getAuthedUser(req);
  const replies = await forumRepliesCollection();
  const docs = await replies
    .find({ threadId: new ObjectId(params.id) })
    .sort({ createdAt: 1 })
    .limit(500)
    .toArray();
  json(res, docs.map((doc) => serializeReply(doc, viewer?._id ?? null)));
};

export const createForumThread: RouteHandler = async (req, res) => {
  const user = await getAuthedUser(req);
  if (!user) return unauthorized(res);

  const body = await readJsonBody<{ title?: string; category?: string; body?: string }>(req);
  const title = (body.title || "").trim();
  const category = (body.category || "").trim();
  const text = (body.body || "").trim();

  if (title.length < 4 || title.length > 140) {
    return badRequest(res, "Title must be 4-140 characters");
  }
  if (!ALLOWED_CATEGORIES.has(category)) {
    return badRequest(res, "Invalid category");
  }
  if (text.length < 1 || text.length > 8000) {
    return badRequest(res, "Body must be 1-8000 characters");
  }

  const threads = await forumThreadsCollection();
  const now = new Date();
  const doc: ForumThreadDoc = {
    _id: new ObjectId(),
    title,
    category,
    pinned: false,
    body: text,
    authorId: user._id,
    authorUsername: user.username,
    authorRank: rankForLevel(user.profile.level),
    replies: 0,
    views: 0,
    createdAt: now,
    lastActivityAt: now,
  };
  await threads.insertOne(doc);
  json(res, serializeThread(doc), 201);
};

export const createForumReply: RouteHandler = async (req, res, params) => {
  const user = await getAuthedUser(req);
  if (!user) return unauthorized(res);
  if (!ObjectId.isValid(params.id)) return badRequest(res, "Invalid forum id");

  const body = await readJsonBody<{ body?: string }>(req);
  const text = (body.body || "").trim();
  if (text.length < 1 || text.length > 4000) {
    return badRequest(res, "Reply must be 1-4000 characters");
  }

  const threads = await forumThreadsCollection();
  const threadId = new ObjectId(params.id);
  const thread = await threads.findOne({ _id: threadId });
  if (!thread) return notFound(res, "Forum thread not found");

  const replies = await forumRepliesCollection();
  const now = new Date();
  const reply: ForumReplyDoc = {
    _id: new ObjectId(),
    threadId,
    authorId: user._id,
    authorUsername: user.username,
    authorRank: rankForLevel(user.profile.level),
    body: text,
    likes: 0,
    likedBy: [],
    createdAt: now,
  };
  await replies.insertOne(reply);
  await threads.updateOne(
    { _id: threadId },
    { $inc: { replies: 1 }, $set: { lastActivityAt: now } },
  );

  json(res, serializeReply(reply, user._id), 201);
};

export const toggleForumReplyLike: RouteHandler = async (req, res, params) => {
  const user = await getAuthedUser(req);
  if (!user) return unauthorized(res);
  if (!ObjectId.isValid(params.id)) return badRequest(res, "Invalid reply id");

  const replies = await forumRepliesCollection();
  const id = new ObjectId(params.id);
  const reply = await replies.findOne({ _id: id });
  if (!reply) return notFound(res, "Reply not found");

  const liked = reply.likedBy.some((entry) => entry.equals(user._id));
  const updated = await replies.findOneAndUpdate(
    { _id: id },
    liked
      ? { $pull: { likedBy: user._id }, $inc: { likes: -1 } }
      : { $addToSet: { likedBy: user._id }, $inc: { likes: 1 } },
    { returnDocument: "after" },
  );
  if (!updated) return notFound(res, "Reply not found");
  json(res, serializeReply(updated, user._id));
};
