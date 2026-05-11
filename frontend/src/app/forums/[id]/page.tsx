import Link from "next/link";
import { api, ApiError } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import { compactTitle } from "@/lib/page-title";
import { notFound } from "next/navigation";
import ForumReplyList from "@/components/ForumReplyList";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const thread = await api.forum(id);
    return {
      title: compactTitle(`${thread.title} - ${thread.replies} replies`, 74),
    };
  } catch {
    return { title: "Thread not found" };
  }
}

export default async function ForumThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let thread: Awaited<ReturnType<typeof api.forum>>;
  try {
    thread = await api.forum(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const { replies } = await resolvePageData({
    replies: api.forumReplies(id),
  });

  return (
    <main className="mx-auto max-w-[900px] px-5 py-8">
      <div className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-secondary">Home</Link><span className="mx-2">&rsaquo;</span>
        <Link href="/forums" className="hover:text-text-secondary">Forums</Link><span className="mx-2">&rsaquo;</span>
        <span className="text-text-primary line-clamp-1">{thread.title}</span>
      </div>

      {/* Thread header */}
      <div className="rounded-xl border border-border bg-bg-card p-5 mb-4 card-glow animate-fade-in-up">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue/15 text-blue-light px-2 py-0.5 rounded">{thread.category}</span>
          {thread.pinned && <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow/15 text-yellow px-2 py-0.5 rounded">Pinned</span>}
        </div>
        <h1 className="text-xl md:text-2xl font-black mb-3">{thread.title}</h1>
        <div className="flex items-center gap-4 text-xs text-text-muted flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-400">{thread.author[0]?.toUpperCase()}</div>
            <div>
              <span className="font-semibold text-text-secondary">{thread.author}</span>
              <span className="text-text-muted ml-1.5 text-[10px] bg-bg-surface px-1.5 py-0.5 rounded">{thread.authorRank}</span>
            </div>
          </div>
          <span>{thread.replies} replies</span>
          <span>{thread.views >= 1000 ? `${(thread.views / 1000).toFixed(1)}K` : thread.views} views</span>
          <span>Last reply: {thread.lastReply}</span>
        </div>
      </div>

      {/* OP post */}
      <div className="rounded-xl border border-border bg-bg-card p-5 mb-4 card-glow animate-fade-in-up delay-1">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400 shrink-0">{thread.author[0]?.toUpperCase()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-sm font-bold">{thread.author}</span>
              <span className="text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded">{thread.authorRank}</span>
              <span className="text-[10px] text-text-muted">OP</span>
            </div>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
              {thread.body || "(no content)"}
            </div>
          </div>
        </div>
      </div>

      <ForumReplyList threadId={String(thread.id)} initialReplies={replies} />
    </main>
  );
}
