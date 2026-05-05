"use client";

import { useState } from "react";
import Link from "next/link";
import TeamLogo from "@/components/TeamLogo";
import type { PlayerProfile } from "@/data/mock";

const tabs = ["Overview", "Statistics", "Matches", "Achievements"] as const;
type Tab = (typeof tabs)[number];

export default function PlayerDetailClient({ player: p }: { player: PlayerProfile }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const openingKdr = p.openingDeaths > 0 ? (p.openingKills / p.openingDeaths).toFixed(2) : "N/A";
  const clutchRate = p.clutchesTotal > 0 ? ((p.clutchesWon / p.clutchesTotal) * 100).toFixed(1) : "0";
  const maxFormRating = Math.max(...p.form.map((f) => f.rating), 1.0);

  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-gradient-to-b from-bg-surface to-bg-body">
        <div className="mx-auto max-w-[1200px] px-5 py-8">
          <div className="mb-4 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary">Home</Link>
            <span className="mx-2">&rsaquo;</span>
            <Link href="/players" className="hover:text-text-secondary">Players</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-text-primary">{p.nickname}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.nickname} className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover object-top border-2 border-border" />
              <div className="absolute -bottom-2 -right-2"><TeamLogo src={p.teamLogo} name={p.team} size={32} /></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{p.countryFlag}</span>
                <h1 className="text-3xl font-black">{p.nickname}</h1>
                <span className="text-sm text-text-muted">#{p.id}</span>
              </div>
              <p className="text-text-secondary mb-1">{p.realName} &middot; Age {p.age}</p>
              <p className="text-sm text-text-muted mb-4">
                <Link href={`/teams/${p.teamSlug}`} className="hover:text-blue-light transition-colors">{p.team}</Link> &middot; {p.role}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { l: "Rating 2.1", v: p.rating2.toFixed(2), c: "text-green" },
                  { l: "K/D", v: p.kd, c: "text-blue-light" },
                  { l: "ADR", v: p.adr.toString(), c: "text-orange" },
                  { l: "KAST", v: p.kast, c: "text-purple-400" },
                  { l: "HS%", v: p.hsPercent, c: "text-yellow" },
                  { l: "Impact", v: p.impact.toString(), c: "text-red" },
                ].map((s) => (
                  <div key={s.l} className="text-center rounded-lg bg-bg-card border border-border px-2 py-2.5">
                    <p className={`text-lg font-bold tabular-nums ${s.c}`}>{s.v}</p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="border-b border-border bg-bg-surface sticky top-14 z-40">
        <div className="mx-auto max-w-[1200px] px-5 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab ? "text-blue-light" : "text-text-secondary hover:text-text-primary"}`}
            >
              {tab}
              {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-light rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {activeTab === "Overview" && (
              <>
                {/* Bio */}
                {p.bio && (
                  <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up">
                    <h2 className="text-base font-bold mb-3">About {p.nickname}</h2>
                    <p className="text-sm text-text-secondary leading-relaxed">{p.bio}</p>
                  </section>
                )}

                {/* Career Overview */}
                <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-1">
                  <h2 className="text-base font-bold mb-4">Career Overview</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { l: "Maps Played", v: p.mapsPlayed.toLocaleString() },
                      { l: "Total Kills", v: p.totalKills.toLocaleString() },
                      { l: "Total Deaths", v: p.totalDeaths.toLocaleString() },
                      { l: "Rounds Played", v: p.roundsPlayed.toLocaleString() },
                      { l: "Clutches Won", v: `${p.clutchesWon}/${p.clutchesTotal}` },
                      { l: "Clutch Rate", v: `${clutchRate}%` },
                      { l: "Opening K/D", v: `${p.openingKills}/${p.openingDeaths}` },
                      { l: "Opening KDR", v: openingKdr },
                    ].map((s) => (
                      <div key={s.l} className="text-center rounded-lg bg-bg-body/50 border border-border px-2 py-3">
                        <p className="text-sm font-bold tabular-nums">{s.v}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Form Chart */}
                {p.form.length > 0 && (
                  <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-2">
                    <h2 className="text-base font-bold mb-4">Recent Form</h2>
                    <div className="flex items-end gap-2 h-32">
                      {p.form.map((f, i) => {
                        const height = (f.rating / maxFormRating) * 100;
                        const color = f.rating >= 1.10 ? "bg-green" : f.rating >= 1.00 ? "bg-blue-light" : "bg-orange";
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-[10px] font-bold tabular-nums text-text-secondary">{f.rating.toFixed(2)}</span>
                            <div className="w-full rounded-t-md relative" style={{ height: `${height}%` }}>
                              <div className={`absolute inset-0 ${color} rounded-t-md opacity-80`} />
                            </div>
                            <span className="text-[8px] text-text-muted whitespace-nowrap">{f.month.split(" ")[0]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Map stats */}
                <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-3">
                  <div className="px-5 py-3 border-b border-border">
                    <h2 className="text-base font-bold">Performance by Map</h2>
                  </div>
                  <div className="grid grid-cols-[1fr_70px_80px_60px] gap-2 px-5 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    <span>Map</span><span className="text-right">Rating</span><span className="text-right">Win Rate</span><span className="text-right">Matches</span>
                  </div>
                  <div className="divide-y divide-border">
                    {p.bestMaps.map((m) => (
                      <Link key={m.map} href={`/maps/${m.map.toLowerCase().replace(" ", "")}`} className="grid grid-cols-[1fr_70px_80px_60px] gap-2 items-center px-5 py-3 hover:bg-bg-card-hover transition-all">
                        <span className="text-sm font-semibold">{m.map}</span>
                        <span className="text-sm font-bold text-green text-right tabular-nums">{m.rating.toFixed(2)}</span>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                            <div className="h-full rounded-full bg-blue-light" style={{ width: `${m.winRate}%` }} />
                          </div>
                          <span className="text-xs tabular-nums text-text-secondary">{m.winRate}%</span>
                        </div>
                        <span className="text-xs text-text-muted text-right tabular-nums">{m.matches}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === "Statistics" && (
              <>
                {/* Event History */}
                <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                  <div className="px-5 py-3 border-b border-border">
                    <h2 className="text-base font-bold">Event History</h2>
                  </div>
                  <div className="grid grid-cols-[1fr_40px_60px_50px_80px_70px] gap-2 px-5 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    <span>Event</span><span>Tier</span><span className="text-right">Rating</span><span className="text-right">Maps</span><span className="text-right">Placement</span><span className="text-right">Date</span>
                  </div>
                  <div className="divide-y divide-border">
                    {p.eventHistory.map((e, i) => (
                      <div key={i} className="grid grid-cols-[1fr_40px_60px_50px_80px_70px] gap-2 items-center px-5 py-3 hover:bg-bg-card-hover transition-all">
                        <span className="text-sm font-semibold truncate">{e.event}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-center ${e.tier === "S" ? "bg-yellow/15 text-yellow" : e.tier === "A" ? "bg-blue-light/15 text-blue-light" : "bg-text-muted/15 text-text-secondary"}`}>{e.tier}</span>
                        <span className={`text-sm font-bold text-right tabular-nums ${Number(e.rating) >= 1.10 ? "text-green" : "text-text-secondary"}`}>{e.rating}</span>
                        <span className="text-xs text-text-muted text-right tabular-nums">{e.maps}</span>
                        <span className="text-xs font-medium text-right">{e.placement}</span>
                        <span className="text-xs text-text-muted text-right">{e.date}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Weapon Breakdown */}
                <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-1">
                  <div className="px-5 py-3 border-b border-border">
                    <h2 className="text-base font-bold">Weapon Breakdown</h2>
                  </div>
                  <div className="divide-y divide-border">
                    {p.weaponStats.map((w) => {
                      const maxKills = Math.max(...p.weaponStats.map((x) => x.kills));
                      return (
                        <div key={w.weapon} className="flex items-center gap-4 px-5 py-3 hover:bg-bg-card-hover transition-all">
                          <span className="text-sm font-semibold w-28">{w.weapon}</span>
                          <div className="flex-1">
                            <div className="h-2 rounded-full bg-border overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-blue to-blue-light" style={{ width: `${(w.kills / maxKills) * 100}%` }} />
                            </div>
                          </div>
                          <span className="text-sm font-bold tabular-nums w-16 text-right">{w.kills.toLocaleString()}</span>
                          <span className="text-xs text-yellow tabular-nums w-12 text-right">{w.hsPercent} HS</span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Opening Duels */}
                <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-2">
                  <h2 className="text-base font-bold mb-4">Opening Duels</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { l: "Opening Kills", v: p.openingKills.toLocaleString() },
                      { l: "Opening Deaths", v: p.openingDeaths.toLocaleString() },
                      { l: "Opening KDR", v: openingKdr },
                      { l: "First Kill Rate", v: `${p.openingDeaths > 0 ? ((p.openingKills / (p.openingKills + p.openingDeaths)) * 100).toFixed(1) : "0"}%` },
                    ].map((s) => (
                      <div key={s.l} className="text-center rounded-lg bg-bg-body/50 border border-border px-2 py-3">
                        <p className="text-sm font-bold tabular-nums">{s.v}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === "Matches" && (
              <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                <div className="px-5 py-3 border-b border-border">
                  <h2 className="text-base font-bold">Match History</h2>
                </div>
                <div className="divide-y divide-border">
                  {p.recentMatches.map((m, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-bg-card-hover transition-all">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${m.result.startsWith("W") ? "bg-green/15 text-green" : "bg-red/15 text-red"}`}>
                        {m.result}
                      </span>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-xs text-text-muted">vs</span>
                        <TeamLogo src={m.opponentLogo} name={m.opponent} size={18} />
                        <span className="text-sm font-semibold truncate">{m.opponent}</span>
                      </div>
                      <span className="text-xs text-text-muted hidden sm:block">{m.map}</span>
                      <span className="text-xs text-text-muted hidden sm:block">{m.event}</span>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-sm font-bold tabular-nums ${m.rating >= p.rating2 ? "text-green" : "text-text-secondary"}`}>{m.rating.toFixed(2)}</span>
                        <span className="text-xs text-text-muted tabular-nums">{m.kills}/{m.deaths}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Achievements" && (
              <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                <div className="px-5 py-3 border-b border-border">
                  <h2 className="text-base font-bold">Achievements &amp; Awards</h2>
                </div>
                {p.achievements.length > 0 ? (
                  <div className="p-5 space-y-3">
                    {p.achievements.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-yellow/5 border border-yellow/10 px-4 py-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#eab308" className="shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span className="text-sm font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-text-muted text-sm">No achievements recorded yet.</div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar - always visible */}
          <div className="space-y-6">
            {/* Liquipedia-style Infobox */}
            <section className="rounded-xl border border-border bg-bg-card p-4 card-glow animate-fade-in-up">
              <h3 className="text-sm font-bold mb-3">Player Info</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Nickname", p.nickname],
                  ["Real Name", p.realName],
                  ["Age", p.age.toString()],
                  ["Country", `${p.countryFlag} ${p.country}`],
                  ["Team", p.team],
                  ["Role", p.role],
                  ["Signature", p.signatureWeapon],
                  ["Earnings", p.careerEarnings],
                  ["Peak Rating", `${p.peakRating} (${p.peakRatingDate})`],
                  ["Majors Won", p.majorWins.toString()],
                  ["DPR", p.dpr.toString()],
                  ["AWP K/R", p.awpKillsRound.toString()],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-text-muted">{label}</span>
                    <span className="font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Team History */}
            {p.teamHistory.length > 0 && (
              <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-1">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-sm font-bold">Team History</h3>
                </div>
                <div className="divide-y divide-border">
                  {p.teamHistory.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                      <TeamLogo src={t.logo} name={t.team} size={22} />
                      <div>
                        <p className="text-sm font-semibold">{t.team}</p>
                        <p className="text-[10px] text-text-muted">{t.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements summary (sidebar, always visible) */}
            {p.achievements.length > 0 && activeTab !== "Achievements" && (
              <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-2">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#eab308"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                    Achievements ({p.achievements.length})
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  {p.achievements.slice(0, 4).map((a, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-yellow/5 border border-yellow/10 px-3 py-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308" className="shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span className="text-xs font-medium">{a}</span>
                    </div>
                  ))}
                  {p.achievements.length > 4 && (
                    <button onClick={() => setActiveTab("Achievements")} className="text-xs text-blue-light hover:underline">
                      View all {p.achievements.length} achievements
                    </button>
                  )}
                </div>
              </section>
            )}

            <Link href="/players" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-border-hover transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              All Players
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
