"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ApiError, api } from "@/services/api";
import { useAuth } from "@/lib/auth-context";
import type { ForumReply } from "@/services/types";

export default function ForumReplyList({
  threadId,
  initialReplies,
}: {
  threadId: string;
  initialReplies: ForumReply[];
}) {
  const { user } = useAuth();
  const [replies, setReplies] = useState<ForumReply[]>(initialReplies);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setReplies(initialReplies);
  }, [initialReplies]);

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    setPosting(true);
    setError(null);
    try {
      const created = await api.postForumReply(threadId, draft.trim());
      setReplies((prev) => [...prev, created]);
      setDraft("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to post reply");
    } finally {
      setPosting(false);
    }
  }

  async function handleLike(replyId: string) {
    if (!user) return;
    try {
      const updated = await api.toggleForumReplyLike(replyId);
      setReplies((prev) => prev.map((r) => (r.id === replyId ? updated : r)));
    } catch {
      /* swallow */
    }
  }

  return (
    <>
      <div className="space-y-3">
        {replies.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg-card px-5 py-8 text-center text-sm text-text-muted">
            No replies yet. Be the first to chime in.
          </div>
        ) : (
          replies.map((r, i) => (
            <div
              key={r.id}
              className={`rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-${Math.min(i + 2, 5)}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue/20 flex items-center justify-center text-sm font-bold text-blue-light shrink-0">
                  {r.user[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-sm font-bold">{r.user}</span>
                    <span className="text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded">{r.rank}</span>
                    <span className="text-[10px] text-text-muted">{r.time}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words">{r.text}</p>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-text-muted">
                    <button
                      type="button"
                      onClick={() => handleLike(r.id)}
                      disabled={!user}
                      className={`flex items-center gap-1 transition-colors ${r.likedByMe ? "text-blue-light" : "text-text-muted"} ${user ? "hover:text-blue-light cursor-pointer" : "cursor-default"}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill={r.likedByMe ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      {r.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-bg-card p-5 card-glow">
        <h3 className="text-sm font-bold mb-3">Post a Reply</h3>
        {user ? (
          <form onSubmit={handlePost}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={4000}
              className="w-full rounded-lg border border-border bg-bg-input px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-none h-24"
              placeholder={`Reply as ${user.username}...`}
            />
            {error && <p className="mt-2 text-xs text-red">{error}</p>}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={posting || !draft.trim()}
                className="rounded-lg bg-blue px-5 py-2 text-sm font-bold text-white hover:bg-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {posting ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-text-muted">
            <Link href="/login" className="font-semibold text-blue-light hover:text-blue">Sign in</Link>{" "}
            to join the discussion.
          </p>
        )}
      </div>
    </>
  );
}
