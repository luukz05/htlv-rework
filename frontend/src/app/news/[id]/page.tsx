import Link from "next/link";
import { api } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import { compactTitle } from "@/lib/page-title";
import { notFound } from "next/navigation";
import CommentList from "@/components/CommentList";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = await api.news();
  const article = news.find((n) => n.id.toString() === id);

  return {
    title: article ? compactTitle(`${article.title} - ${article.comments} comments`, 74) : "Article not found",
    description: article?.description,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { news, comments } = await resolvePageData({
    news: api.news(),
    comments: api.newsComments(id),
  });

  const article = news.find((n) => n.id.toString() === id);
  if (!article) {
    notFound();
  }
  const related = news.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <main className="mx-auto max-w-[800px] px-5 py-8">
      <div className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-secondary">Home</Link>
        <span className="mx-2">&rsaquo;</span>
        <Link href="/news" className="hover:text-text-secondary">News</Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-text-primary line-clamp-1">{article.title}</span>
      </div>

      <article className="animate-fade-in-up">
        <div className="flex gap-2 mb-3">
          {article.tags.map((tag) => (
            <span key={tag} className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tag === "Hot" ? "bg-red/20 text-red" : "bg-blue/15 text-blue-light"}`}>{tag}</span>
          ))}
        </div>
        <h1 className="text-2xl md:text-3xl font-black leading-tight mb-4">{article.title}</h1>
        <div className="flex items-center gap-3 text-sm text-text-muted mb-6">
          <span className="font-medium text-text-secondary">by {article.author}</span>
          <span>&middot;</span>
          <span>{article.time}</span>
          <span>&middot;</span>
          <span>{article.comments} comments</span>
        </div>
        <div className="rounded-xl overflow-hidden mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt="" className="w-full h-64 md:h-96 object-cover" />
        </div>
        {article.description && <p className="text-text-secondary leading-relaxed mb-4 text-lg">{article.description}</p>}
        <div className="prose prose-invert max-w-none space-y-4 text-sm text-text-secondary leading-relaxed">
          <p>The CS2 competitive scene continues to deliver thrilling moments as we head into the second quarter of 2026. With teams battling for rankings points and Major qualification spots, every match carries significant weight.</p>
          <p>Industry experts have weighed in on the implications of this development, noting that it could reshape the competitive landscape for months to come. Teams are already adjusting their strategies in preparation.</p>
          <p>Community reaction has been overwhelmingly positive, with fans taking to social media and the WikiHowl forums to share their excitement. The comment section below this article has already seen hundreds of passionate discussions.</p>
          <p>Stay tuned to WikiHowl for continued coverage and analysis as this story develops. We will be providing live updates and expert commentary throughout the upcoming events.</p>
        </div>
      </article>

      <CommentList
        source="news"
        targetId={article.id}
        initialComments={comments}
        title={`${comments.length} ${comments.length === 1 ? "Comment" : "Comments"}`}
      />

      {/* Related */}
      <div className="mt-8">
        <h3 className="text-base font-bold mb-4">Related Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link key={r.id} href={`/news/${r.id}`} className="group rounded-xl border border-border bg-bg-card overflow-hidden hover:border-border-hover transition-all card-glow">
              <div className="h-28 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h4 className="text-xs font-semibold leading-tight line-clamp-2 group-hover:text-blue-light transition-colors">{r.title}</h4>
                <span className="text-[10px] text-text-muted mt-1 block">{r.time}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}