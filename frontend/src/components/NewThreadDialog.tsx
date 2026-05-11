"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError, api } from "@/services/api";
import { useAuth } from "@/lib/auth-context";

const CATEGORIES = ["General", "Match Discussion", "Team Discussion", "Help", "Multimedia", "Off Topic"];

export default function NewThreadDialog() {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleOpen() {
    if (!user) {
      router.push("/login");
      return;
    }
    setOpen(true);
  }

  function handleClose() {
    if (submitting) return;
    setOpen(false);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const thread = await api.createForumThread({
        title: title.trim(),
        category,
        body: body.trim(),
      });
      setOpen(false);
      setTitle("");
      setBody("");
      router.push(`/forums/${thread.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create thread");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="rounded-lg bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-light shrink-0"
      >
        + New Thread
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-10 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-[560px] rounded-xl border border-border bg-bg-card p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Start a thread</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  minLength={4}
                  maxLength={140}
                  placeholder="What do you want to discuss?"
                  className="w-full rounded-lg border border-border bg-bg-input px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-bg-input px-3 py-2 text-sm text-text-primary outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">First post</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  minLength={1}
                  maxLength={8000}
                  rows={6}
                  placeholder="Write the body of your opening post..."
                  className="w-full rounded-lg border border-border bg-bg-input px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-y"
                />
              </div>

              {error && <p className="text-xs text-red">{error}</p>}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-xs font-semibold text-text-secondary transition-colors hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-blue px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Creating..." : "Create thread"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
