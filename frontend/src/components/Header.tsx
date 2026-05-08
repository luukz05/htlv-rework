"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    return href !== "/" && pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg-surface">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-6">
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
