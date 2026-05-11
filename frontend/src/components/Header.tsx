"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TeamLogo from "./TeamLogo";
import StatusPill from "./StatusPill";
import SearchBar from "./SearchBar";
import { api } from "@/services/api";
import type { Event, Match, Player, RankedTeam } from "@/services/types";

const navLinks = [
  { label: "News", href: "/news" },
  { label: "Matches", href: "/matches" },
  { label: "Results", href: "/results" },
  { label: "Events", href: "/events" },
  {
    label: "Rankings",
    href: "/rankings/teams",
    children: [
      { label: "Teams", href: "/rankings/teams" },
      { label: "Players", href: "/rankings/players" },
    ],
  },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  {
    label: "Media",
    href: "/galleries",
    children: [
      { label: "Galleries", href: "/galleries" },
      { label: "Highlights", href: "/highlights" },
    ],
  },
  {
    label: "Community",
    href: "/forums",
    children: [
      { label: "Forums", href: "/forums" },
      { label: "Fantasy", href: "/fantasy" },
      { label: "Betting", href: "/betting" },
      { label: "Academy", href: "/academy" },
    ],
  },
  { label: "Games", href: "/games", isNew: true },
];

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

function NavDropdown({
  link,
  isActive,
}: {
  link: any;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={link.href}
        className={`flex h-full items-center gap-1.5 px-3 text-[13px] font-medium transition-colors ${
          isActive(link.href) ||
          link.children?.some((c: any) => isActive(c.href))
            ? "text-blue-light"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        {link.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        {(isActive(link.href) ||
          link.children?.some((c: any) => isActive(c.href))) && (
          <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-light rounded-full" />
        )}
      </Link>

      {open && (
        <div className="absolute left-0 top-full z-[100] min-w-[180px] animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="mt-1 overflow-hidden rounded-xl border border-border bg-bg-surface p-1.5 shadow-xl shadow-black/40 backdrop-blur-md">
            {link.children.map((child: any) => (
              <Link
                key={child.href}
                href={child.href}
                className={`block rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  isActive(child.href)
                    ? "bg-blue/10 text-blue-light"
                    : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RibbonGroup({
  label,
  href,
  children,
  className = "",
}: {
  label: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const content = (
    <>
      <span className="shrink-0 text-[10px] sm:text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">
        {label}
      </span>
      {children}
    </>
  );

  const classes = `flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border bg-bg-surface/70 px-3 shadow-sm shadow-black/10 ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} transition-all hover:border-border-hover hover:bg-bg-card`}
      >
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}

function DataRibbon() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [ranking, setRanking] = useState<RankedTeam[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [liveIndex, setLiveIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(false);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      api.liveMatches(),
      api.topPlayers(),
      api.rankings(),
      api.events(),
    ])
      .then(([liveData, playerData, rankingData, eventData]) => {
        if (ignore) return;
        setLiveMatches(liveData);
        setTopPlayers(playerData);
        setRanking(rankingData);
        setEvents(eventData);
      })
      .catch(() => {
        if (ignore) return;
        setLiveMatches([]);
        setTopPlayers([]);
        setRanking([]);
        setEvents([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const featuredMatch = liveMatches[0];
  const featuredPlayer = topPlayers[0];
  const featuredPlayers = topPlayers.slice(0, 5);
  const featuredTeams = ranking.slice(0, 5);
  const mainEvent = events[0];
  const currentLiveMatch =
    liveMatches[liveIndex % liveMatches.length] ?? featuredMatch;

  useEffect(() => {
    if (liveMatches.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setIsCycling(true);
      window.setTimeout(() => {
        setLiveIndex((index) => (index + 1) % liveMatches.length);
        setIsCycling(false);
      }, 180);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [liveMatches.length]);

  if (
    !featuredMatch ||
    !featuredPlayer ||
    !mainEvent ||
    featuredTeams.length === 0
  ) {
    return null;
  }

  return (
    <div className="border-t border-border/70 bg-bg-body/80 backdrop-blur-md">
      <div className="data-ribbon-scroll scroll-fade-right mx-auto flex h-[60px] max-w-[1460px] items-center gap-3 overflow-x-auto px-4 py-2 sm:px-5">
        <div className="flex h-11 min-w-max shrink-0 items-center gap-2">
          <span className="shrink-0 text-[10px] sm:text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">
            Top 5 global
          </span>
          {featuredTeams.map((team) => (
            <Link
              key={team.name}
              href={team.id ? `/teams/${team.id}` : "/rankings/teams"}
              title={`${team.rank}. ${team.name}`}
              className="group flex items-center gap-1 transition-colors"
            >
              <span className="text-[10px] font-black tabular-nums text-text-muted">
                {team.rank}
              </span>
              <TeamLogo
                src={team.logo}
                name={team.name}
                size={22}
                className="transition-transform group-hover:scale-110"
              />
            </Link>
          ))}
        </div>

        <RibbonGroup
          label=""
          href={`/matches/${currentLiveMatch.id}`}
          className={`h-11 w-[300px] min-w-[300px] max-w-[300px] overflow-hidden border-red/20 bg-red/10 transition-opacity duration-200 hover:bg-red/15 ${
            isCycling ? "opacity-45" : "opacity-100"
          }`}
        >
          <StatusPill status="live" />
          <TeamLogo
            src={currentLiveMatch.team1.logo}
            name={currentLiveMatch.team1.name}
            size={20}
          />
          <span className="w-5 text-center text-xs font-bold tabular-nums text-text-primary">
            {currentLiveMatch.score1}
          </span>
          <span className="w-2 text-center text-[10px] text-text-muted">:</span>
          <span className="w-5 text-center text-xs font-bold tabular-nums text-text-primary">
            {currentLiveMatch.score2}
          </span>
          <TeamLogo
            src={currentLiveMatch.team2.logo}
            name={currentLiveMatch.team2.name}
            size={20}
          />
          <span className="min-w-0 flex-1 truncate text-[10px] font-bold uppercase tracking-wider text-text-muted">
            {currentLiveMatch.event}
          </span>
        </RibbonGroup>

        <div className="grid h-11 min-w-[360px] shrink-0 grid-cols-[auto_repeat(5,minmax(44px,1fr))] items-center gap-2">
          <span className="shrink-0 text-[10px] sm:text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">
            Top 5 players
          </span>
          {featuredPlayers.map((player) => (
            <Link
              key={player.rank}
              href="/rankings/players"
              title={`${player.rank}. ${player.name}`}
              className="group flex min-w-0 items-center justify-center gap-1"
            >
              <span className="text-[10px] font-black tabular-nums text-text-muted">
                {player.rank}
              </span>
              <span className="truncate text-xs font-bold text-text-primary group-hover:text-blue-light transition-colors">
                {player.name}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href={`/events/${mainEvent.id}`}
          className="flex h-11 min-w-max flex-1 items-center justify-end gap-2 transition-colors hover:text-text-primary"
        >
          <span className="shrink-0 text-[10px] sm:text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">
            Evento do mes
          </span>
          <span className="max-w-40 truncate text-xs font-bold text-text-primary">
            {mainEvent.name}
          </span>
          <span className="rounded bg-yellow/15 px-1.5 py-0.5 text-[10px] font-black uppercase text-yellow">
            {mainEvent.tier}-Tier
          </span>
          <span className="hidden text-[10px] font-bold uppercase tracking-wider text-text-muted lg:inline">
            {mainEvent.location}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = previous;
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1460px] items-center gap-1 px-4 sm:px-5">
          <Link href="/" className="mr-3 flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7delpVHoVhH4kJHf-SNM4bz9bKY_dPWQWDCUkLxy57g_H3DgkB5w42uAzIv4I3meOAQlApdwFO5YrFDmxUNp_lL7/256fx256f"
              alt="WikiHowl"
              className="h-15 w-15 object-contain"
            />
            <span className="text-3xl font-normal tracking-wide text-text-primary leading-none [font-family:var(--font-display)]">
              WikiHowl
            </span>
          </Link>

          <nav className="hidden h-15 items-center lg:flex">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <NavDropdown
                    key={link.label}
                    link={link}
                    isActive={isActive}
                  />
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex h-full items-center px-2.5 text-[13px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-blue-light"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {link.isNew && (
                    <span className="ml-1 text-[10px] sm:text-[8px] font-black uppercase bg-red text-white px-1 py-0.5 rounded-full leading-none">
                      NEW
                    </span>
                  )}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-light rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <SearchBar />
            <Link
              href="/login"
              className="rounded-lg bg-blue px-3 sm:px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-light"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hidden sm:block rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:border-border-hover"
            >
              Sign Up
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="relative z-[210] flex h-10 w-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-bg-card lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <DataRibbon />
        </div>
      </header>

      {portalTarget &&
        createPortal(
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-hidden={!mobileOpen}
            className={`fixed inset-0 z-[250] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            style={{ height: "100dvh" }}
          >
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => setMobileOpen(false)}
              className={`absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
                mobileOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute right-0 top-0 bottom-0 flex w-72 max-w-[85vw] flex-col bg-bg-surface border-l border-border shadow-2xl shadow-black/50 transition-transform duration-200 ease-out ${
                mobileOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {navLinks.map((link) => {
                  if (link.children) {
                    return (
                      <div key={link.label} className="space-y-1 mt-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-muted px-3 mb-2">
                          {link.label}
                        </div>
                        <div className="flex flex-col gap-1">
                          {link.children.map((child: any) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                                isActive(child.href)
                                  ? "text-blue-light bg-blue/10"
                                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium flex items-center gap-2 ${
                        isActive(link.href)
                          ? "text-blue-light bg-blue/10"
                          : "text-text-primary hover:bg-bg-card"
                      }`}
                    >
                      {link.label}
                      {link.isNew && (
                        <span className="text-[10px] sm:text-[8px] font-black uppercase bg-red text-white px-1.5 py-0.5 rounded-full leading-none">
                          NEW
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>,
          portalTarget,
        )}
    </>
  );
}
