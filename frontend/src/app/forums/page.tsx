import { api } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import NewThreadDialog from "@/components/NewThreadDialog";
import ForumsList from "@/components/ForumsList";

export const metadata = {
  title: "Forums - Active Discussions",
};

export default async function ForumsPage() {
  const { forumThreads } = await resolvePageData({
    forumThreads: api.forums(),
  });

  return (
    <main className="mx-auto max-w-[1380px] px-4 py-8">
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
        <NewThreadDialog />
      </div>

      <ForumsList threads={forumThreads} />

      <div className="flex items-center justify-center gap-1.5 mt-6">
        <button className="h-11 w-11 sm:h-9 sm:w-9 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-all">&lsaquo;</button>
        {[1, 2, 3, "...", 10].map((p, i) => (
          <button key={i} className={`h-11 min-w-[44px] sm:h-9 sm:min-w-[36px] rounded-lg text-sm font-medium transition-all ${p === 1 ? "bg-blue text-white" : "border border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}>{p}</button>
        ))}
        <button className="h-11 w-11 sm:h-9 sm:w-9 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-all">&rsaquo;</button>
      </div>
    </main>
  );
}
