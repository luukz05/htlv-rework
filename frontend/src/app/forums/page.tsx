import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { forumThreads } from "@/data/mock";

const rankColors: Record<string, string> = {
  "Global Elite": "text-red",
  "Supreme": "text-orange",
  "Legendary Eagle": "text-yellow",
  "Distinguished Master Guardian": "text-blue-light",
  "Master Guardian": "text-blue-light",
  "Gold Nova": "text-yellow",
  "Silver": "text-text-muted",
};

export default function ForumsPage() {
  const categories = ["All", "General", "Match Discussion", "Team Discussion", "Help", "Multimedia", "Off Topic"];
  const pinned = forumThreads.filter((t) => t.pinned);
  const regular = forumThreads.filter((t) => !t.pinned);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Forums</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Forums</h1>
            <p className="text-sm text-text-muted">Join the discussion with the CS2 community</p>
          </div>
          <button className="rounded-lg bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-light shrink-0">
            + New Thread
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((c, i) => (
            <button key={c} className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${i === 0 ? "bg-blue text-white" : "bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-hover"}`}>{c}</button>
          ))}
        </div>

        {/* Thread list */}
        <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_80px_100px] gap-4 px-5 py-2.5 border-b border-border text-[11px] font-bold uppercase tracking-wider text-text-muted">
            <span>Thread</span>
            <span className="text-center">Replies</span>
            <span className="text-center">Views</span>
            <span className="text-right">Last Reply</span>
          </div>

          {/* Pinned */}
          {pinned.map((thread) => (
            <Link href={`/forums/${thread.id}`} key={thread.id} className="grid grid-cols-[1fr_80px_80px_100px] gap-4 px-5 py-3.5 border-b border-border bg-blue/[0.03] hover:bg-bg-card-hover transition-colors cursor-pointer items-center">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2563eb" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-[10px] font-bold text-blue-light uppercase">Pinned</span>
                  <span className="rounded bg-bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-muted">{thread.category}</span>
                </div>
                <p className="text-sm font-semibold">{thread.title}</p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  by <span className={`font-medium ${rankColors[thread.authorRank] || "text-text-secondary"}`}>{thread.author}</span>
                  <span className="mx-1">&middot;</span>
                  <span className="text-text-muted">{thread.authorRank}</span>
                </p>
              </div>
              <span className="text-center text-sm text-text-secondary tabular-nums">{thread.replies}</span>
              <span className="text-center text-sm text-text-muted tabular-nums">{thread.views >= 1000 ? `${(thread.views / 1000).toFixed(1)}k` : thread.views}</span>
              <span className="text-right text-xs text-text-muted">{thread.lastReply}</span>
            </Link>
          ))}

          {/* Regular threads */}
          {regular.map((thread) => (
            <Link href={`/forums/${thread.id}`} key={thread.id} className="grid grid-cols-[1fr_80px_80px_100px] gap-4 px-5 py-3.5 border-b border-border last:border-b-0 hover:bg-bg-card-hover transition-colors cursor-pointer items-center">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="rounded bg-bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-muted">{thread.category}</span>
                </div>
                <p className="text-sm font-semibold">{thread.title}</p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  by <span className={`font-medium ${rankColors[thread.authorRank] || "text-text-secondary"}`}>{thread.author}</span>
                  <span className="mx-1">&middot;</span>
                  <span>{thread.authorRank}</span>
                </p>
              </div>
              <span className="text-center text-sm text-text-secondary tabular-nums">{thread.replies}</span>
              <span className="text-center text-sm text-text-muted tabular-nums">{thread.views >= 1000 ? `${(thread.views / 1000).toFixed(1)}k` : thread.views}</span>
              <span className="text-right text-xs text-text-muted">{thread.lastReply}</span>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <button className="h-8 w-8 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-all">&lsaquo;</button>
          {[1, 2, 3, "...", 10].map((p, i) => (
            <button key={i} className={`h-8 min-w-[32px] rounded-lg text-sm font-medium transition-all ${p === 1 ? "bg-blue text-white" : "border border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}>{p}</button>
          ))}
          <button className="h-8 w-8 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-all">&rsaquo;</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
