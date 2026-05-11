"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Users, User, Trophy, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { GlobalSearchResult } from "@/services/types";
import TeamLogo from "./TeamLogo";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten results for keyboard navigation
  const flattenedResults = results
    ? [
        ...results.teams.map((t) => ({ ...t, type: "team", href: `/teams/${t.id}` })),
        ...results.players.map((p) => ({ ...p, type: "player", href: "/rankings/players" })),
        ...results.events.map((e) => ({ ...e, type: "event", href: `/events/${e.id}` })),
      ]
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(null);
      setIsLoading(false);
      setSelectedIndex(-1);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await api.search(query);
        setResults(data);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flattenedResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && flattenedResults[selectedIndex]) {
        const result = flattenedResults[selectedIndex];
        router.push(result.href);
        setIsOpen(false);
        setQuery("");
      } else if (flattenedResults.length > 0) {
        // Default to first result if none selected
        router.push(flattenedResults[0].href);
        setIsOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const hasResults = results && (results.teams.length > 0 || results.players.length > 0 || results.events.length > 0);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-bg-input px-3 py-1.5 w-52 xl:w-64 transition-all focus-within:border-blue/50 focus-within:ring-1 focus-within:ring-blue/20">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-text-muted" />
        ) : (
          <Search className="h-4 w-4 text-text-muted" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search teams, players..."
          className="bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted w-full"
        />
      </div>

      {isOpen && query.trim().length >= 2 && (
        <div className="absolute top-full mt-2 w-[320px] max-h-[480px] overflow-y-auto rounded-xl border border-border bg-bg-surface p-2 shadow-2xl shadow-black/50 z-[100] backdrop-blur-xl">
          {isLoading && !results && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue" />
            </div>
          )}

          {!isLoading && !hasResults && (
            <div className="py-8 text-center text-sm text-text-muted">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {results && (
            <div className="flex flex-col gap-4">
              {results.teams.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-2 mb-1">
                    <Users className="h-3.5 w-3.5 text-text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Teams</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {results.teams.map((team, idx) => {
                      const isSelected = selectedIndex === idx;
                      return (
                        <Link
                          key={team.id}
                          href={`/teams/${team.id}`}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                          }}
                          className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                            isSelected ? "bg-bg-card ring-1 ring-blue/30" : "hover:bg-bg-card"
                          }`}
                        >
                          <TeamLogo src={team.logo} name={team.name} size={24} />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-text-primary leading-none">{team.name}</span>
                            <span className="text-[10px] text-text-muted">{team.region}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.players.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-2 mb-1">
                    <User className="h-3.5 w-3.5 text-text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Players</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {results.players.map((player, idx) => {
                      const overallIdx = results.teams.length + idx;
                      const isSelected = selectedIndex === overallIdx;
                      return (
                        <Link
                          key={player.id}
                          href="/rankings/players"
                          onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                          }}
                          className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                            isSelected ? "bg-bg-card ring-1 ring-blue/30" : "hover:bg-bg-card"
                          }`}
                        >
                          <div className="h-6 w-6 rounded-full overflow-hidden bg-bg-card border border-border flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={player.image} alt={player.nickname} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-text-primary leading-none">{player.nickname}</span>
                            <span className="text-[10px] text-text-muted">{player.team} • {player.realName}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.events.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-2 mb-1">
                    <Trophy className="h-3.5 w-3.5 text-text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Events</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {results.events.map((event, idx) => {
                      const overallIdx = results.teams.length + results.players.length + idx;
                      const isSelected = selectedIndex === overallIdx;
                      return (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                          }}
                          className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                            isSelected ? "bg-bg-card ring-1 ring-blue/30" : "hover:bg-bg-card"
                          }`}
                        >
                          <div className="h-6 w-10 rounded overflow-hidden bg-bg-card border border-border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={event.image} alt={event.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-text-primary leading-none truncate max-w-[240px]">{event.name}</span>
                            <span className="text-[10px] text-text-muted">{event.date}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
