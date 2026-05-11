// app/galleries/GalleriesClient.tsx

"use client";

import { useMemo, useState } from "react";

const categories = ["All", "Events", "Teams", "Behind the Scenes"];

type Gallery = {
  id: string | number;
  image: string | null;
  images: number;
  category: string;
  title: string;
  date: string;
};

type GalleriesClientProps = {
  galleries: Gallery[];
};

export default function GalleriesClient({ galleries }: GalleriesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredGalleries = useMemo(() => {
    if (selectedCategory === "All") {
      return galleries;
    }

    return galleries.filter(
      (gallery) => gallery.category === selectedCategory,
    );
  }, [galleries, selectedCategory]);

  return (
    <>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue text-white"
                  : "border border-border bg-bg-card text-text-secondary hover:border-border-hover hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery grid */}
      {filteredGalleries.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGalleries.map((gallery, i) => (
            <a
              key={gallery.id}
              href="#"
              className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(
                i + 1,
                5,
              )}`}
            >
              <div className="relative h-48 overflow-hidden">
                {gallery.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={gallery.image}
                    alt={gallery.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-bg-card-hover text-xs text-text-muted">
                    No image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    {gallery.images} photos
                  </span>
                </div>

                <div className="absolute right-2 top-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      gallery.category === "Events"
                        ? "bg-blue/20 text-blue-light"
                        : gallery.category === "Teams"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-yellow/20 text-yellow"
                    }`}
                  >
                    {gallery.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="mb-1.5 text-sm font-semibold leading-tight transition-colors group-hover:text-blue-light">
                  {gallery.title}
                </h3>

                <span className="text-[11px] text-text-muted">
                  {gallery.date}
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-bg-card p-8 text-center text-sm text-text-muted">
          No galleries found for this category.
        </div>
      )}
    </>
  );
}