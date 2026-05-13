import { ObjectId } from "mongodb";
import type { RequestHandler } from "express";
import { badRequest, json, notFound, unauthorized } from "../http/response.js";
import {
  commentsCollection,
  type CommentDoc,
  type CommentTargetType,
} from "../db/comments.js";
import { getAuthedUser, rankForLevel, relativeTime } from "../lib/session.js";
import { getNewsByIdFromDb } from "../db/news.js";

const TARGET_ID_RE = /^\d{1,10}$/;

async function validateTargetId(
  targetType: CommentTargetType,
  targetId: string,
): Promise<{ ok: true } | { ok: false; status: 400 | 404; message: string }> {
  if (!TARGET_ID_RE.test(targetId)) {
    return { ok: false, status: 400, message: "Invalid target id" };
  }
  if (targetType === "news") {
    const article = await getNewsByIdFromDb(Number(targetId));
    if (!article) {
      return { ok: false, status: 404, message: "News article not found" };
    }
  }
  return { ok: true };
}

function serializeComment(doc: CommentDoc, viewerId: ObjectId | null) {
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

function listFactory(targetType: CommentTargetType): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const targetId = req.params.id;
    if (!targetId) return badRequest(res, "Missing target id");
    const validation = await validateTargetId(targetType, targetId);
    if (!validation.ok) {
      return validation.status === 404
        ? notFound(res, validation.message)
        : badRequest(res, validation.message);
    }
    const viewer = await getAuthedUser(req);
    const c = await commentsCollection();
    const docs = await c
      .find({ targetType, targetId })
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();
    json(res, docs.map((doc) => serializeComment(doc, viewer?._id ?? null)));
  };
}

function createFactory(targetType: CommentTargetType): RequestHandler<{ id: string }> {
  return async (req, res) => {
    const user = await getAuthedUser(req);
    if (!user) return unauthorized(res);
    const targetId = req.params.id;
    if (!targetId) return badRequest(res, "Missing target id");
    const validation = await validateTargetId(targetType, targetId);
    if (!validation.ok) {
      return validation.status === 404
        ? notFound(res, validation.message)
        : badRequest(res, validation.message);
    }

    const body = (req.body ?? {}) as { body?: string };
    const text = (body.body || "").trim();
    if (text.length < 1 || text.length > 4000) {
      return badRequest(res, "Comment must be 1-4000 characters");
    }

    const c = await commentsCollection();
    const doc: CommentDoc = {
      _id: new ObjectId(),
      targetType,
      targetId,
      authorId: user._id,
      authorUsername: user.username,
      authorRank: rankForLevel(user.profile.level),
      body: text,
      likes: 0,
      likedBy: [],
      createdAt: new Date(),
    };
    await c.insertOne(doc);
    json(res, serializeComment(doc, user._id), 201);
  };
}

export const listNewsComments = listFactory("news");
export const createNewsComment = createFactory("news");
export const listMatchComments = listFactory("match");
export const createMatchComment = createFactory("match");

export const toggleCommentLike: RequestHandler<{ id: string }> = async (req, res) => {
  const user = await getAuthedUser(req);
  if (!user) return unauthorized(res);
  if (!ObjectId.isValid(req.params.id)) return badRequest(res, "Invalid comment id");

  const c = await commentsCollection();
  const id = new ObjectId(req.params.id);
  const doc = await c.findOne({ _id: id });
  if (!doc) return notFound(res, "Comment not found");

  const liked = doc.likedBy.some((entry) => entry.equals(user._id));
  const updated = await c.findOneAndUpdate(
    { _id: id },
    liked
      ? { $pull: { likedBy: user._id }, $inc: { likes: -1 } }
      : { $addToSet: { likedBy: user._id }, $inc: { likes: 1 } },
    { returnDocument: "after" },
  );
  if (!updated) return notFound(res, "Comment not found");
  json(res, serializeComment(updated, user._id));
};
