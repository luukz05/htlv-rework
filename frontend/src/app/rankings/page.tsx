"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { ranking, teamProfiles } from "@/data/mock";

export default function RankingsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);
  const tabs = ["World Ranking", "Regional", "Teams", "Players"];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary">Home</a><span className="mx-2">&rsaquo;</span><span className="text-text-primary">Rankings</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold">CS2 World Ranking</h1>
            <p className="text-sm text-text-muted">Last updated: Monday, March 3rd, 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Archive
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              How it works
            </button>
          </div>
        </div>

        <div className="flex gap-0 mb-8 border-b border-border">
          {tabs.map((tab, i) => (
            <button key={tab} className={`px-4 py-3 text-sm font-medium transition-colors relative ${i === 0 ? "text-blue-light" : "text-text-muted hover:text-text-secondary"}`}>
              {tab}
              {i === 0 && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-light rounded-full" />}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* #2 */}
          <div className="rounded-xl border border-border bg-bg-card p-5 relative overflow-hidden order-1 md:order-1 animate-fade-in-up delay-1 card-glow">
            <span className="absolute top-3 right-4 text-6xl font-black text-text-primary/[0.04]">#2</span>
            <div className="flex items-center gap-3 mb-3">
              <TeamLogo src={top3[1].logo} name={top3[1].name} size={40} />
              <div>
                <p className="text-[11px] text-text-muted uppercase tracking-wider">{top3[1].region}</p>
                <p className="font-bold">{top3[1].name}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-light tabular-nums">{top3[1].points} pts</p>
            <p className="text-xs text-green mt-1">+{top3[1].changeVal} rank change</p>
          </div>

          {/* #1 */}
          <div className="rounded-xl border-2 border-blue/30 bg-gradient-to-b from-[#1a2744] to-bg-card p-6 relative overflow-hidden order-0 md:order-2 animate-scale-in animate-glow card-glow">
            <span className="absolute top-3 right-4 text-7xl font-black text-text-primary/[0.04]">#1</span>
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#eab308"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span className="text-[11px] font-bold text-yellow uppercase tracking-wider">World Leaders</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <TeamLogo src={top3[0].logo} name={top3[0].name} size={48} />
              <p className="text-xl font-bold">{top3[0].name}</p>
            </div>
            <p className="text-3xl font-bold rank-gold mb-1 tabular-nums">{top3[0].points} pts</p>
            <p className="text-xs text-text-muted mb-4">Rank steady</p>
            <Link href={`/teams/${teamProfiles.find(tp => tp.name === top3[0].name)?.id || "navi"}`} className="flex items-center gap-1.5 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-light transition-all hover:-translate-y-0.5 active:scale-95">
              View Team
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* #3 */}
          <div className="rounded-xl border border-border bg-bg-card p-5 relative overflow-hidden order-2 md:order-3 animate-fade-in-up delay-2 card-glow">
            <span className="absolute top-3 right-4 text-6xl font-black text-text-primary/[0.04]">#3</span>
            <div className="flex items-center gap-3 mb-3">
              <TeamLogo src={top3[2].logo} name={top3[2].name} size={40} />
              <div>
                <p className="text-[11px] text-text-muted uppercase tracking-wider">{top3[2].region}</p>
                <p className="font-bold">{top3[2].name}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-light tabular-nums">{top3[2].points} pts</p>
            <p className="text-xs text-red mt-1">-{top3[2].changeVal} rank change</p>
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[60px_1fr_100px_40px] gap-4 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">
          <span>Rank</span><span>Team</span><span className="text-right">Points</span><span />
        </div>

        <div className="space-y-1.5">
          {rest.map((team, i) => (
            <div key={team.rank}>
              <div
                onClick={() => setExpanded(expanded === team.rank ? null : team.rank)}
                className={`grid grid-cols-[60px_1fr_100px_40px] gap-4 items-center rounded-xl border px-5 py-3.5 cursor-pointer transition-all animate-fade-in-up card-glow ${
                  expanded === team.rank ? "border-blue/30 bg-bg-card-hover" : "border-border bg-bg-card hover:bg-bg-card-hover hover:border-border-hover"
                }`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <span className={`text-sm font-bold tabular-nums ${team.change === "up" ? "text-green" : team.change === "down" ? "text-red" : "text-text-muted"}`}>#{team.rank}</span>
                <div className="flex items-center gap-3">
                  <TeamLogo src={team.logo} name={team.name} size={28} />
                  <span className="text-sm font-bold">{team.name}</span>
                </div>
                <span className="text-right text-sm font-semibold text-blue-light tabular-nums">{team.points} pts</span>
                <div className="text-right">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" className={`transition-transform ${expanded === team.rank ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>

              {expanded === team.rank && (() => {
                const tp = teamProfiles.find(t2 => t2.name === team.name);
                return (
                  <div className="mx-2 rounded-b-xl border border-t-0 border-blue/20 bg-bg-card p-5 animate-scale-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Core Roster</h4>
                        <div className="flex gap-4">
                          {tp ? tp.roster.slice(0, 5).map((p, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1.5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.image} alt={p.nickname} className="h-10 w-10 rounded-full object-cover object-top border border-border" />
                              <span className="text-[11px] text-text-secondary">{p.nickname}</span>
                            </div>
                          )) : [1,2,3,4,5].map((idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1.5">
                              <div className="h-10 w-10 rounded-full bg-bg-surface flex items-center justify-center text-xs text-text-muted border border-border">P{idx}</div>
                              <span className="text-[11px] text-text-secondary">player{idx}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Recent Results</h4>
                        <div className="space-y-1.5">
                          {tp ? tp.recentMatches.slice(0, 3).map((m, idx) => (
                            <div key={idx} className="flex items-center justify-between rounded-lg bg-bg-surface px-3 py-2 text-sm">
                              <span className="text-text-secondary">vs {m.opponent}</span>
                              <span className={`font-bold ${m.result === "W" ? "text-green" : "text-red"}`}>{m.score}</span>
                            </div>
                          )) : (
                            <>
                              <div className="flex items-center justify-between rounded-lg bg-bg-surface px-3 py-2 text-sm">
                                <span className="text-text-secondary">No data</span>
                              </div>
                            </>
                          )}
                        </div>
                        {tp && <Link href={`/teams/${tp.id}`} className="block mt-3 text-center text-xs font-medium text-blue-light hover:text-blue transition-colors">Go to Team Page</Link>}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-8">
          <button className="h-8 w-8 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-all">&lsaquo;</button>
          {[1, 2, 3, "...", 10].map((p, i) => (
            <button key={i} className={`h-8 min-w-[32px] rounded-lg text-sm font-medium transition-all ${p === 1 ? "bg-blue text-white" : "border border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}>{p}</button>
          ))}
          <button className="h-8 w-8 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-all">&rsaquo;</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
