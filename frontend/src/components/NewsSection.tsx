import { news } from "@/data/mock";

export default function NewsSection() {
  const featured = news[0];
  const sideNews = news.slice(1, 4);
  const bottomNews = news.slice(4, 7);

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
            <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z"/>
          </svg>
          Latest News
        </h2>
        <a href="#" className="text-sm font-medium text-blue-light hover:text-blue transition-colors">View all news</a>
      </div>

      {/* Featured + Side news */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 mb-4">
        {/* Featured */}
        <article className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover">
          <div className="h-52 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-2 flex gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    tag === "Hot" ? "bg-red/20 text-red" : "bg-blue/15 text-blue-light"
                  }`}>{tag}</span>
                ))}
                <span className="text-[11px] text-text-muted">{featured.time}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug mb-1.5">{featured.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{featured.description}</p>
            </div>
          </div>
        </article>

        {/* Side list */}
        <div className="flex flex-col gap-3">
          {sideNews.map((article) => (
            <article key={article.id} className="group flex gap-3 cursor-pointer rounded-lg border border-border bg-bg-card p-3 transition-all hover:border-border-hover hover:bg-bg-card-hover">
              <div className="h-16 w-20 shrink-0 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="text-[13px] font-semibold leading-tight line-clamp-2 mb-1">{article.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <span>{article.time}</span>
                  <span>&middot;</span>
                  <span>{article.comments} comments</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {bottomNews.map((article) => (
          <article key={`b-${article.id}`} className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover">
            <div className="h-32 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-3">
              <h4 className="text-[13px] font-semibold leading-tight line-clamp-2">{article.title}</h4>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
