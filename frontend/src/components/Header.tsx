"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TeamLogo from "./TeamLogo";
import { events, liveMatches, ranking, topPlayers } from "@/data/mock";

const navLinks = [
  { label: "News", href: "/news" },
  { label: "Matches", href: "/matches" },
  { label: "Results", href: "/results" },
  { label: "Events", href: "/events" },
  { label: "Stats", href: "/stats" },
  { label: "Maps", href: "/maps" },
  { label: "Hall of Fame", shortLabel: "HOF", href: "/hall-of-fame" },
  { label: "Galleries", href: "/galleries" },
  { label: "Rankings", href: "/rankings" },
  { label: "Forums", href: "/forums" },
  { label: "Academy", href: "/academy" },
  { label: "Games", href: "/games" },
];

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

const featuredMatch = liveMatches[0];
const featuredPlayer = topPlayers[0];
const featuredPlayers = topPlayers.slice(0, 5);
const featuredTeams = ranking.slice(0, 5);
const mainEvent = events[0];

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
      <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">{label}</span>
      {children}
    </>
  );

  const classes = `flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border bg-bg-surface/70 px-3 shadow-sm shadow-black/10 ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${classes} transition-all hover:border-border-hover hover:bg-bg-card`}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}

function DataRibbon() {
  const [liveIndex, setLiveIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(false);
  const currentLiveMatch = liveMatches[liveIndex % liveMatches.length] ?? featuredMatch;

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
  }, []);

  if (!featuredMatch || !featuredPlayer) {
    return null;
  }

  return (
    <div className="border-t border-border/70 bg-bg-body/80 backdrop-blur-md">
      <div className="data-ribbon-scroll mx-auto flex h-[60px] max-w-[1460px] items-center gap-3 overflow-x-auto px-4 py-2 sm:px-5">
        <Link href="/rankings" className="flex h-11 min-w-max shrink-0 items-center gap-2 transition-colors hover:text-text-primary">
          <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">Top 5 global</span>
          {featuredTeams.map((team) => (
            <span
              key={team.name}
              title={`${team.rank}. ${team.name}`}
              className="group flex items-center gap-1"
            >
              <span className="text-[10px] font-black tabular-nums text-text-muted">{team.rank}</span>
              <TeamLogo src={team.logo} name={team.name} size={22} className="transition-transform group-hover:scale-110" />
            </span>
          ))}
        </Link>

        <RibbonGroup
          label=""
          href={`/matches/${currentLiveMatch.id}`}
          className={`h-11 w-[300px] min-w-[300px] max-w-[300px] overflow-hidden border-red/20 bg-red/10 transition-opacity duration-200 hover:bg-red/15 ${
            isCycling ? "opacity-45" : "opacity-100"
          }`}
        >
          <span className="flex w-11 shrink-0 items-center gap-1 text-[10px] font-black uppercase tracking-wider text-red">
            <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse-dot" />
            Live
          </span>
          <TeamLogo src={currentLiveMatch.team1.logo} name={currentLiveMatch.team1.name} size={20} />
          <span className="w-5 text-center text-xs font-bold tabular-nums text-text-primary">{currentLiveMatch.score1}</span>
          <span className="w-2 text-center text-[10px] text-text-muted">:</span>
          <span className="w-5 text-center text-xs font-bold tabular-nums text-text-primary">{currentLiveMatch.score2}</span>
          <TeamLogo src={currentLiveMatch.team2.logo} name={currentLiveMatch.team2.name} size={20} />
          <span className="min-w-0 flex-1 truncate text-[10px] font-bold uppercase tracking-wider text-text-muted">{currentLiveMatch.event}</span>
        </RibbonGroup>

        <Link href="/stats" className="grid h-11 min-w-[360px] shrink-0 grid-cols-[auto_repeat(5,minmax(44px,1fr))] items-center gap-2 transition-colors hover:text-text-primary">
          <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">Top 5 players</span>
          {featuredPlayers.map((player) => (
            <span key={player.rank} title={`${player.rank}. ${player.name}`} className="group flex min-w-0 items-center justify-center gap-1">
              <span className="text-[10px] font-black tabular-nums text-text-muted">{player.rank}</span>
              <span className="truncate text-xs font-bold text-text-primary group-hover:text-blue-light">{player.name}</span>
            </span>
          ))}
        </Link>

        <Link href={`/events/${mainEvent.id}`} className="flex h-11 min-w-max flex-1 items-center justify-end gap-2 transition-colors hover:text-text-primary">
          <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.16em] text-text-muted">Evento do mes</span>
          <span className="max-w-40 truncate text-xs font-bold text-text-primary">{mainEvent.name}</span>
          <span className="rounded bg-yellow/15 px-1.5 py-0.5 text-[10px] font-black uppercase text-yellow">{mainEvent.tier}-Tier</span>
          <span className="hidden text-[10px] font-bold uppercase tracking-wider text-text-muted lg:inline">{mainEvent.location}</span>
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    return href !== "/" && pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1460px] items-center gap-4 px-4 sm:px-5">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${B}/hltv-logo.png`} alt="HLTV" className="h-8 w-8 rounded-md" />
            <span className="text-lg font-bold text-text-primary">HLTV</span>
          </Link>

          <nav className="hidden items-center gap-0 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2 py-4 text-[13px] font-medium transition-colors ${
                  isActive(link.href) ? "text-blue-light" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.shortLabel || link.label}
                {link.label === "Games" && <span className="ml-1 text-[8px] font-black uppercase bg-red text-white px-1 py-0.5 rounded-full leading-none">NEW</span>}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-full bg-blue-light rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-bg-input px-3 py-1.5 w-52 xl:w-60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search teams, players..." className="bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted w-full" />
            </div>
            <Link href="/login" className="rounded-lg bg-blue px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-light">Login</Link>
            <Link href="/register" className="hidden sm:block rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:border-border-hover">Sign Up</Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-text-secondary lg:hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
        <DataRibbon />
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-bg-surface border-l border-border p-5" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMobileOpen(false)} className="mb-4 ml-auto flex text-text-muted">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${isActive(link.href) ? "text-blue-light bg-blue-glow" : "text-text-secondary hover:text-text-primary"}`}
                >{link.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
