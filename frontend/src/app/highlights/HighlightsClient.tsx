"use client";

import { useMemo, useState } from "react";
import TeamLogo from "@/components/TeamLogo";

const typeLabels: Record<string, { label: string; color: string }> = {
  clutch: { label: "Clutch", color: "bg-purple-500/20 text-purple-400" },
  ace: { label: "Ace", color: "bg-red/20 text-red" },
  awp: { label: "AWP", color: "bg-green/20 text-green" },
  pistol: { label: "Pistol", color: "bg-yellow/20 text-yellow" },
  wallbang: { label: "Wallbang", color: "bg-orange/20 text-orange" },
  deagle: { label: "Deagle", color: "bg-blue/20 text-blue-light" },
};

const allTypes = ["all", "clutch", "ace", "awp", "pistol", "wallbang", "deagle"];

type Highlight = {
  id: string | number;
  thumbnail: string | null;
  type: string;
  player: string;
  playerImage: string | null;
  team: string;
  teamLogo: string | null;
  title: string;
  description: string;
  event: string;
  map: string;
  date: string;
  views: number;
  likes: number;
};

type HighlightsClientProps = {
  highlights: Highlight[];
};

export default function HighlightsClient({ highlights }: HighlightsClientProps) {
  const [selectedType, setSelectedType] = useState("all");

  const filteredHighlights = useMemo(() => {
    if (selectedType === "all") {
      return highlights;
    }

    return highlights.filter((highlight) => highlight.type === selectedType);
  }, [highlights, selectedType]);

  const featured = filteredHighlights[0];
  const rest = filteredHighlights.slice(1);

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {allTypes.map((type) => {
          const isActive = selectedType === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                isActive
                  ? "bg-blue text-white"
                  : "border border-border bg-bg-card text-text-secondary hover:border-border-hover hover:text-text-primary"
              }`}
            >
              {type === "all" ? "All Plays" : type}
            </button>
          );
        })}
      </div>

      {featured ? (
        <>
          {/* Featured highlight */}
          <div className="mb-8 overflow-hidden rounded-xl border border-border bg-bg-card card-glow animate-fade-in-up">
            <div className="grid md:grid-cols-2">
              <div className="group relative h-64 cursor-pointer overflow-hidden md:h-auto">
                {featured.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-bg-card-hover text-xs text-text-muted">
                    No thumbnail
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red/90 shadow-lg shadow-red/30 transition-transform group-hover:scale-110">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>

                <span
                  className={`absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold ${
                    typeLabels[featured.type]?.color ??
                    "bg-bg-card-hover text-text-secondary"
                  }`}
                >
                  {typeLabels[featured.type]?.label ?? featured.type}
                </span>
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="player-photo-frame block h-10 w-10 overflow-hidden rounded-full">
                    {featured.playerImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.playerImage}
                        alt={featured.player}
                        className="player-photo player-photo--avatar"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-bg-card-hover text-xs text-text-muted">
                        ?
                      </span>
                    )}
                  </span>

                  <div>
                    <p className="text-sm font-bold">{featured.player}</p>

                    <div className="flex items-center gap-1.5">
                      <TeamLogo
                        src={featured.teamLogo ?? ""}
                        name={featured.team}
                        size={14}
                      />
                      <span className="text-[11px] text-text-muted">
                        {featured.team}
                      </span>
                    </div>
                  </div>
                </div>

                <h2 className="mb-2 text-xl font-bold leading-snug">
                  {featured.title}
                </h2>

                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  {featured.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span>{featured.event}</span>
                  <span>&middot;</span>
                  <span>{featured.map}</span>
                  <span>&middot;</span>
                  <span>{featured.date}</span>
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 text-text-muted">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {(featured.views / 1000).toFixed(0)}K views
                  </span>

                  <span className="flex items-center gap-1 text-red">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {(featured.likes / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((hl, i) => (
              <div
                key={hl.id}
                className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(
                  i + 1,
                  5,
                )}`}
              >
                <div className="relative h-40 overflow-hidden">
                  {hl.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={hl.thumbnail}
                      alt={hl.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-bg-card-hover text-xs text-text-muted">
                      No thumbnail
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/90">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                    </div>
                  </div>

                  <span
                    className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold ${
                      typeLabels[hl.type]?.color ??
                      "bg-bg-card-hover text-text-secondary"
                    }`}
                  >
                    {typeLabels[hl.type]?.label ?? hl.type}
                  </span>

                  <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                    {hl.map}
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="player-photo-frame block h-6 w-6 overflow-hidden rounded-full">
                      {hl.playerImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={hl.playerImage}
                          alt={hl.player}
                          className="player-photo player-photo--avatar"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-bg-card-hover text-[10px] text-text-muted">
                          ?
                        </span>
                      )}
                    </span>

                    <span className="text-xs font-semibold">{hl.player}</span>

                    <TeamLogo src={hl.teamLogo ?? ""} name={hl.team} size={14} />
                  </div>

                  <h3 className="mb-1.5 text-sm font-semibold leading-tight transition-colors group-hover:text-blue-light">
                    {hl.title}
                  </h3>

                  <p className="mb-2 line-clamp-2 text-xs text-text-muted">
                    {hl.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-text-muted">
                    <span>
                      {hl.event} &middot; {hl.date}
                    </span>

                    <div className="flex items-center gap-3">
                      <span>{(hl.views / 1000).toFixed(0)}K</span>
                      <span className="text-red">
                        {(hl.likes / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-bg-card p-8 text-center text-sm text-text-muted">
          No highlights found for this type.
        </div>
      )}
    </>
  );
}