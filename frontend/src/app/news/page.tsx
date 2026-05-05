import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { news } from "@/data/mock";

export default function NewsPage() {
  const featured = news[0];
  const rest = news.slice(1);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-secondary">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">News</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Latest News</h1>

        {/* Featured */}
        <Link href={`/news/${featured.id}`} className="group block mb-8 cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="mb-3 flex gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tag === "Hot" ? "bg-red/20 text-red" : "bg-blue/15 text-blue-light"}`}>{tag}</span>
                ))}
              </div>
              <h2 className="text-xl font-bold leading-snug mb-3">{featured.title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{featured.description}</p>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="font-medium">by {featured.author}</span>
                <span>&middot;</span>
                <span>{featured.time}</span>
                <span>&middot;</span>
                <span>{featured.comments} comments</span>
              </div>
            </div>
          </div>
        </Link>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <Link href={`/news/${article.id}`} key={article.id} className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover">
              <div className="h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="mb-2 flex gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tag === "Hot" ? "bg-red/20 text-red" : "bg-blue/15 text-blue-light"}`}>{tag}</span>
                  ))}
                </div>
                <h3 className="text-sm font-semibold leading-tight mb-2 line-clamp-2">{article.title}</h3>
                {article.description && <p className="text-xs text-text-secondary line-clamp-2 mb-2">{article.description}</p>}
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <span>{article.time}</span>
                  <span>&middot;</span>
                  <span>{article.comments} comments</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
