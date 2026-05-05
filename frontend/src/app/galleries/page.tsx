import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { news, events } from "@/data/mock";

const galleries = [
  {
    id: 1,
    title: "IEM Katowice 2026 — Grand Final",
    category: "Events",
    images: 48,
    image: news[0].image,
    date: "Mar 3, 2026",
  },
  {
    id: 2,
    title: "BLAST Premier Spring — Opening Day",
    category: "Events",
    images: 32,
    image: news[4].image,
    date: "Mar 1, 2026",
  },
  {
    id: 3,
    title: "NAVI — Behind the Scenes at IEM",
    category: "Behind the Scenes",
    images: 24,
    image: news[8].image,
    date: "Feb 28, 2026",
  },
  {
    id: 4,
    title: "FaZe Clan — Bootcamp Photos",
    category: "Teams",
    images: 18,
    image: news[6].image,
    date: "Feb 25, 2026",
  },
  {
    id: 5,
    title: "ESL Pro League Season 21 — Venue Reveal",
    category: "Events",
    images: 36,
    image: news[7].image,
    date: "Feb 22, 2026",
  },
  {
    id: 6,
    title: "G2 Esports — New Facility Tour",
    category: "Teams",
    images: 22,
    image: news[6].image,
    date: "Feb 20, 2026",
  },
  {
    id: 7,
    title: "Vitality — Player Portraits 2026",
    category: "Teams",
    images: 15,
    image: news[1].image,
    date: "Feb 18, 2026",
  },
  {
    id: 8,
    title: "PGL Major Copenhagen — Stage Setup",
    category: "Behind the Scenes",
    images: 28,
    image: news[11].image,
    date: "Feb 15, 2026",
  },
  {
    id: 9,
    title: "Trophy Collection — Major Trophies Through the Years",
    category: "Behind the Scenes",
    images: 40,
    image: news[3].image,
    date: "Feb 10, 2026",
  },
];

const categories = ["All", "Events", "Teams", "Behind the Scenes"];

export default function GalleriesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <a href="/" className="hover:text-text-secondary">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Galleries</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Photo Galleries</h1>
        <p className="text-sm text-text-secondary mb-6">Browse event photos, team portraits, and behind-the-scenes content</p>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-blue text-white"
                  : "border border-border bg-bg-card text-text-secondary hover:text-text-primary hover:border-border-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleries.map((gallery, i) => (
            <a
              key={gallery.id}
              href="#"
              className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
            >
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gallery.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    {gallery.images} photos
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    gallery.category === "Events"
                      ? "bg-blue/20 text-blue-light"
                      : gallery.category === "Teams"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-yellow/20 text-yellow"
                  }`}>
                    {gallery.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold leading-tight mb-1.5 group-hover:text-blue-light transition-colors">{gallery.title}</h3>
                <span className="text-[11px] text-text-muted">{gallery.date}</span>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
