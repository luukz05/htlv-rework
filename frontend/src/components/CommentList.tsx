"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ApiError, api } from "@/services/api";
import { useAuth } from "@/lib/auth-context";
import type { Comment } from "@/services/types";

type Source = "news" | "match";

export default function CommentList({
  source,
  targetId,
  initialComments,
  title,
}: {
  source: Source;
  targetId: string | number;
  initialComments: Comment[];
  title?: string;
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    setPosting(true);
    setError(null);
    try {
      const created =
        source === "news"
          ? await api.postNewsComment(targetId, draft.trim())
          : await api.postMatchComment(targetId, draft.trim());
      setComments((prev) => [created, ...prev]);
      setDraft("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to post comment");
    } finally {
      setPosting(false);
    }
  }

  async function handleLike(commentId: string) {
    if (!user) return;
    try {
      const updated = await api.toggleCommentLike(commentId);
      setComments((prev) => prev.map((c) => (c.id === commentId ? updated : c)));
    } catch {
      /* swallow */
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-border bg-bg-card p-5 card-glow">
      <h3 className="text-base font-bold mb-4">{title ?? `${comments.length} Comments`}</h3>

      {user ? (
        <form onSubmit={handlePost} className="mb-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Comment as ${user.username}...`}
            className="w-full rounded-lg border border-border bg-bg-input px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-none h-20"
            maxLength={4000}
          />
          {error && (
            <p className="mt-2 text-xs text-red">{error}</p>
          )}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={posting || !draft.trim()}
              className="rounded-lg bg-blue px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {posting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-4 rounded-lg border border-border bg-bg-surface px-3 py-2.5 text-xs text-text-muted">
          <Link href="/login" className="font-semibold text-blue-light hover:text-blue">Sign in</Link>{" "}
          to leave a comment.
        </div>
      )}

      {comments.length === 0 ? (
        <p className="py-6 text-center text-xs text-text-muted">No comments yet. Be the first.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="flex gap-3 py-3 border-t border-border first:border-0">
            <div className="w-8 h-8 rounded-full bg-blue/20 flex items-center justify-center text-xs font-bold text-blue-light shrink-0">{c.user[0]?.toUpperCase()}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-semibold">{c.user}</span>
                <span className="text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded">{c.rank}</span>
                <span className="text-[10px] text-text-muted">{c.time}</span>
              </div>
              <p className="text-xs text-text-secondary whitespace-pre-wrap break-words">{c.text}</p>
              <button
                type="button"
                onClick={() => handleLike(c.id)}
                disabled={!user}
                className={`mt-1 inline-flex items-center gap-1 text-[10px] transition-colors ${c.likedByMe ? "text-blue-light" : "text-text-muted"} ${user ? "hover:text-blue-light cursor-pointer" : "cursor-default"}`}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill={c.likedByMe ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                {c.likes} {c.likes === 1 ? "like" : "likes"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
