import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { news } from "@/data/mock";

export function generateStaticParams() {
  return news.map((n) => ({ id: n.id.toString() }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = news.find((n) => n.id.toString() === id);
  if (!article) {
    return (<><Header /><main className="mx-auto max-w-[800px] px-5 py-16 text-center"><h1 className="text-2xl font-bold mb-4">Article not found</h1><Link href="/news" className="text-blue-light">Back to News</Link></main><Footer /></>);
  }
  const related = news.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <>
      <Header />
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
            <p>Community reaction has been overwhelmingly positive, with fans taking to social media and the HLTV forums to share their excitement. The comment section below this article has already seen hundreds of passionate discussions.</p>
            <p>Stay tuned to HLTV for continued coverage and analysis as this story develops. We will be providing live updates and expert commentary throughout the upcoming events.</p>
          </div>
        </article>

        {/* Comments section */}
        <div className="mt-8 rounded-xl border border-border bg-bg-card p-5 card-glow">
          <h3 className="text-base font-bold mb-4">{article.comments} Comments</h3>
          {[
            { user: "CSFanatic", rank: "Global Elite", time: "10 min ago", text: "Incredible news! This is going to change everything for the scene.", likes: 45 },
            { user: "TacticsMaster", rank: "Legendary Eagle", time: "25 min ago", text: "I saw this coming. The writing was on the wall after last month's results.", likes: 23 },
            { user: "NewPlayer2026", rank: "Gold Nova", time: "1h ago", text: "Can someone explain what this means for the upcoming Major? I'm new to following the pro scene.", likes: 8 },
          ].map((c, i) => (
            <div key={i} className="flex gap-3 py-3 border-t border-border first:border-0">
              <div className="w-8 h-8 rounded-full bg-blue/20 flex items-center justify-center text-xs font-bold text-blue-light shrink-0">{c.user[0]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{c.user}</span>
                  <span className="text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded">{c.rank}</span>
                  <span className="text-[10px] text-text-muted">{c.time}</span>
                </div>
                <p className="text-xs text-text-secondary">{c.text}</p>
                <span className="text-[10px] text-text-muted mt-1 inline-block">{c.likes} likes</span>
              </div>
            </div>
          ))}
        </div>

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
      <Footer />
    </>
  );
}
