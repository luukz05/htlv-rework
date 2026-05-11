"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import TeamLogo from "@/components/TeamLogo";
import CountryFlag, { CountryLabel } from "@/components/CountryFlag";
import type { PlayerProfile } from "@/services/types";

const baseTabs = ["Overview", "Statistics", "Matches", "Achievements"] as const;
type Tab = (typeof baseTabs)[number] | "Biography";

export default function PlayerDetailClient({ player: p }: { player: PlayerProfile }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const tabs: Tab[] = p.biography ? ["Overview", "Biography", "Statistics", "Matches", "Achievements"] : [...baseTabs];

  const openingKdr = p.openingDeaths > 0 ? (p.openingKills / p.openingDeaths).toFixed(2) : "N/A";
  const clutchRate = p.clutchesTotal > 0 ? ((p.clutchesWon / p.clutchesTotal) * 100).toFixed(1) : "0";
  const formRatings = p.form.map((f) => f.rating);
  const formAverage = formRatings.length > 0 ? formRatings.reduce((sum, rating) => sum + rating, 0) / formRatings.length : 0;
  const formPeak = formRatings.length > 0 ? Math.max(...formRatings) : 0;
  const formLow = formRatings.length > 0 ? Math.min(...formRatings) : 0;
  const chartWidth = 640;
  const chartHeight = 220;
  const chartPaddingX = 36;
  const chartPaddingY = 28;
  const ratingFloor = Math.max(0.75, formLow - 0.05);
  const ratingCeiling = Math.max(formPeak + 0.05, ratingFloor + 0.2);
  const chartInnerWidth = chartWidth - chartPaddingX * 2;
  const chartInnerHeight = chartHeight - chartPaddingY * 2;
  const formPoints = p.form.map((f, i) => {
    const x = p.form.length === 1 ? chartWidth / 2 : chartPaddingX + (i / (p.form.length - 1)) * chartInnerWidth;
    const y = chartPaddingY + ((ratingCeiling - f.rating) / (ratingCeiling - ratingFloor)) * chartInnerHeight;
    return { ...f, x, y };
  });
  const formLinePoints = formPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const formAreaPoints = formPoints.length > 0
    ? `${chartPaddingX},${chartHeight - chartPaddingY} ${formLinePoints} ${chartWidth - chartPaddingX},${chartHeight - chartPaddingY}`
    : "";
  const formTrend = formRatings.length > 1 ? formRatings[formRatings.length - 1] - formRatings[0] : 0;
  const personalFacts = p.personalBio ? [
    { label: "Born", value: p.personalBio.born },
    { label: "Nationality", value: p.personalBio.nationality },
    { label: "Status", value: p.personalBio.status },
    { label: "Years Active", value: p.personalBio.yearsActive },
    { label: "Liquipedia Role", value: p.personalBio.liquipediaRole },
    { label: "Games", value: p.personalBio.games?.join(", ") },
  ].filter((fact) => fact.value) : [];
  const personalAliases = [
    ...(p.personalBio?.nicknames?.map((value) => ({ label: "Nickname", value })) || []),
    ...(p.personalBio?.alternateIds?.map((value) => ({ label: "Alt ID", value })) || []),
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative border-b border-border bg-[#0d1117] overflow-hidden">
        {/* Background Team Logo */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07] flex items-center justify-center translate-x-1/4 translate-y-1/4">
          <img src={p.teamLogo} alt="" className="w-[800px] h-[800px] object-contain" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1380px] px-4 pt-8 pb-10">
          <div className="mb-6 text-sm text-text-muted flex items-center gap-2">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <span className="opacity-50">&rsaquo;</span>
            <Link href="/rankings/players" className="hover:text-text-secondary transition-colors">Players</Link>
            <span className="opacity-50">&rsaquo;</span>
            <span className="text-text-primary font-medium">{p.nickname}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-12">
            {/* Player Image */}
            <div className="relative shrink-0 self-end -mb-10">
              <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.nickname} 
                  className="w-full h-full object-contain object-bottom" 
                />
              </div>
            </div>

            {/* Player Info */}
            <div className="flex-1 text-center lg:text-left pb-10">
              <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-6">
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-text-muted">#{p.rank}</span>
                      <CountryFlag countryCode={p.country} preferredFlag={p.countryFlag} className="text-3xl shadow-sm" />
                    </div>
                    <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{p.nickname}</h1>
                  </div>
                  <h2 className="text-xl text-text-secondary font-medium">{p.realName} &middot; {p.age} years old</h2>
                </div>
                <div className="lg:ml-auto flex items-center justify-center gap-4">
                  <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-1">Rating 2.1</p>
                    <p className="text-3xl font-black text-green leading-none">{p.rating2.toFixed(2)}</p>
                  </div>
                  <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-1">Impact</p>
                    <p className="text-3xl font-black text-red leading-none">{p.impact.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Current Team", value: p.teamSlug ? <Link href={`/teams/${p.teamSlug}`} className="text-blue-light hover:underline">{p.team}</Link> : p.team, icon: <TeamLogo src={p.teamLogo} name={p.team} size={16} /> },
                  { label: "Role", value: p.role },
                  { label: "Signature", value: p.signatureWeapon },
                  { label: "Major Wins", value: p.majorWins > 0 ? `${p.majorWins} Title${p.majorWins > 1 ? "s" : ""}` : "None", color: p.majorWins > 0 ? "text-yellow" : "" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{item.label}</span>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      {item.icon}
                      <span className={`text-sm font-bold ${item.color || "text-text-primary"}`}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {[
                  { l: "K/D", v: p.kd, c: "text-blue-light" },
                  { l: "ADR", v: p.adr, c: "text-orange" },
                  { l: "KAST", v: p.kast, c: "text-purple-400" },
                  { l: "Swing", v: p.swing, c: p.swing?.startsWith("+") ? "text-green" : "text-red" },
                  { l: "HS%", v: p.hsPercent, c: "text-yellow" },
                  { l: "Earnings", v: p.careerEarnings, c: "text-green" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center gap-3 bg-bg-card/40 border border-border px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{s.l}</span>
                    <span className={`text-sm font-bold tabular-nums ${s.c}`}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="border-b border-border bg-bg-surface/80 backdrop-blur-xl sticky top-14 z-40">
        <div className="mx-auto max-w-[1380px] px-4 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-4 text-sm font-bold tracking-wide transition-all ${activeTab === tab ? "text-blue-light" : "text-text-secondary hover:text-text-primary"}`}
            >
              {tab}
              {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-light shadow-[0_0_12px_rgba(59,130,246,0.5)]" />}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1380px] px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* Main Content */}
          <div className="space-y-10">
            {activeTab === "Overview" && (
              <>
                {/* Achievements - Now directly accessible */}
                {p.achievements.length > 0 && (
                  <section className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-black flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#eab308"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                        Trophies & Awards
                      </h2>
                      <span className="text-xs font-bold px-2 py-1 bg-yellow/10 text-yellow border border-yellow/20 rounded-lg">
                        {p.achievements.length} TOTAL
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {p.achievements.map((a, i) => (
                        <div key={i} className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-bg-card to-bg-card/50 border border-border hover:border-yellow/30 transition-all card-glow">
                          <div className="w-10 h-10 rounded-full bg-yellow/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#eab308"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          </div>
                          <span className="text-sm font-bold text-text-primary">{a}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Bio */}
                {p.bio && (
                  <section className="rounded-2xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up delay-1">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      Player Biography
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{p.bio}</p>
                  </section>
                )}

                {p.personalBio && (
                  <section className="rounded-2xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up delay-2">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold flex items-center gap-2">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"/><path d="M20 21a8 8 0 0 0-16 0"/><path d="M15 6.5c.9.6 1.5 1.6 1.5 2.75"/></svg>
                          Personal Background
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">{p.personalBio.summary}</p>
                      </div>
                      <a href={p.personalBio.sourceUrl} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-blue-light/20 bg-blue-light/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-blue-light hover:border-blue-light/40 transition-colors">
                        {p.personalBio.sourceLabel}
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {personalFacts.map((fact) => (
                        <div key={fact.label} className="rounded-xl border border-border bg-bg-body/40 px-4 py-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{fact.label}</p>
                          <p className="mt-1 text-sm font-bold text-text-primary">{fact.value}</p>
                        </div>
                      ))}
                    </div>

                    {personalAliases.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {personalAliases.map((alias) => (
                          <span key={`${alias.label}-${alias.value}`} className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs font-bold text-text-secondary">
                            <span className="text-text-muted">{alias.label}:</span> {alias.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* Career Overview */}
                <section className="rounded-2xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up delay-3">
                  <h2 className="text-lg font-bold mb-5">Career Statistics</h2>
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
                      <div key={s.l} className="text-center rounded-xl bg-bg-body/50 border border-border px-3 py-4">
                        <p className="text-lg font-black tabular-nums">{s.v}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Form Chart */}
                {p.form.length > 0 && (
                  <section className="rounded-2xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up delay-4">
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold">Recent Form</h2>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-text-muted">Rating trend across recent months</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-right">
                        {[
                          { label: "Avg", value: formAverage.toFixed(2), color: "text-blue-light" },
                          { label: "Peak", value: formPeak.toFixed(2), color: "text-green" },
                          { label: "Trend", value: `${formTrend >= 0 ? "+" : ""}${formTrend.toFixed(2)}`, color: formTrend >= 0 ? "text-green" : "text-red" },
                        ].map((stat) => (
                          <div key={stat.label} className="rounded-lg border border-border bg-bg-body/40 px-3 py-2">
                            <p className={`text-sm font-black tabular-nums ${stat.color}`}>{stat.value}</p>
                            <p className="mt-0.5 text-[9px] font-black uppercase tracking-widest text-text-muted">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-border bg-bg-body/40">
                      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`Recent form chart for ${p.nickname}`} className="h-[260px] w-full">
                        <defs>
                          <linearGradient id={`form-area-${p.id}`} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                          </linearGradient>
                          <linearGradient id={`form-line-${p.id}`} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#22c55e" />
                          </linearGradient>
                        </defs>
                        {[0, 1, 2, 3].map((tick) => {
                          const y = chartPaddingY + (tick / 3) * chartInnerHeight;
                          const value = ratingCeiling - (tick / 3) * (ratingCeiling - ratingFloor);
                          return (
                            <g key={tick}>
                              <line x1={chartPaddingX} x2={chartWidth - chartPaddingX} y1={y} y2={y} stroke="rgba(148, 163, 184, 0.14)" strokeWidth="1" />
                              <text x="12" y={y + 4} fill="currentColor" className="text-[10px] font-bold text-text-muted tabular-nums">{value.toFixed(2)}</text>
                            </g>
                          );
                        })}
                        <polyline points={formAreaPoints} fill={`url(#form-area-${p.id})`} stroke="none" />
                        <polyline points={formLinePoints} fill="none" stroke={`url(#form-line-${p.id})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        {formPoints.map((point) => {
                          const pointColor = point.rating >= 1.10 ? "#22c55e" : point.rating >= 1.00 ? "#60a5fa" : "#f97316";
                          return (
                            <g key={point.month}>
                              <line x1={point.x} x2={point.x} y1={chartHeight - chartPaddingY} y2={chartHeight - chartPaddingY + 6} stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1" />
                              <circle cx={point.x} cy={point.y} r="6" fill={pointColor} stroke="#0d1117" strokeWidth="3" />
                              <text x={point.x} y={point.y - 12} textAnchor="middle" fill="currentColor" className="text-[11px] font-black text-text-primary tabular-nums">{point.rating.toFixed(2)}</text>
                              <text x={point.x} y={chartHeight - 8} textAnchor="middle" fill="currentColor" className="text-[10px] font-bold uppercase text-text-muted">{point.month.split(" ")[0]}</text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </section>
                )}

                {/* Map stats */}
                <section className="rounded-2xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-4">
                  <div className="px-6 py-4 border-b border-border bg-white/5">
                    <h2 className="text-lg font-bold">Performance by Map</h2>
                  </div>
                  <div className="grid grid-cols-[1fr_80px_100px_80px] gap-2 px-6 py-3 border-b border-border text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                    <span>Map Name</span><span className="text-right">Rating</span><span className="text-right">Win Rate</span><span className="text-right">Matches</span>
                  </div>
                  <div className="divide-y divide-border">
                    {p.bestMaps.map((m) => (
                      <Link key={m.map} href={`/maps/${m.map.toLowerCase().replace(" ", "")}`} className="grid grid-cols-[1fr_80px_100px_80px] gap-2 items-center px-6 py-4 hover:bg-white/[0.02] transition-all group">
                        <span className="text-sm font-bold group-hover:text-blue-light transition-colors">{m.map}</span>
                        <span className="text-sm font-black text-green text-right tabular-nums">{m.rating.toFixed(2)}</span>
                        <div className="flex items-center gap-3 justify-end">
                          <div className="w-20 h-2 rounded-full bg-border overflow-hidden">
                            <div className="h-full rounded-full bg-blue-light shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: `${m.winRate}%` }} />
                          </div>
                          <span className="text-xs font-bold tabular-nums text-text-secondary">{m.winRate}%</span>
                        </div>
                        <span className="text-xs font-medium text-text-muted text-right tabular-nums">{m.matches}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === "Statistics" && (
              <>
                {/* Event History */}
                <section className="rounded-2xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                  <div className="px-6 py-4 border-b border-border">
                    <h2 className="text-lg font-bold">Event History</h2>
                  </div>
                  <div className="grid grid-cols-[1fr_40px_80px_60px_100px_80px] gap-2 px-6 py-3 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    <span>Event</span><span>Tier</span><span className="text-right">Rating</span><span className="text-right">Maps</span><span className="text-right">Placement</span><span className="text-right">Date</span>
                  </div>
                  <div className="divide-y divide-border">
                    {p.eventHistory.map((e, i) => (
                      <div key={i} className="grid grid-cols-[1fr_40px_80px_60px_100px_80px] gap-2 items-center px-6 py-4 hover:bg-bg-card-hover transition-all">
                        <span className="text-sm font-bold truncate">{e.event}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded text-center ${e.tier === "S" ? "bg-yellow/20 text-yellow border border-yellow/20" : e.tier === "A" ? "bg-blue-light/20 text-blue-light border border-blue-light/20" : "bg-text-muted/20 text-text-secondary border border-text-muted/20"}`}>{e.tier}</span>
                        <span className={`text-sm font-black text-right tabular-nums ${Number(e.rating) >= 1.10 ? "text-green" : "text-text-secondary"}`}>{e.rating}</span>
                        <span className="text-xs font-bold text-text-muted text-right tabular-nums">{e.maps}</span>
                        <span className="text-xs font-black text-right">{e.placement}</span>
                        <span className="text-xs font-bold text-text-muted text-right">{e.date}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Weapon Breakdown */}
                <section className="rounded-2xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-1">
                  <div className="px-6 py-4 border-b border-border">
                    <h2 className="text-lg font-bold">Weapon Breakdown</h2>
                  </div>
                  <div className="divide-y divide-border">
                    {p.weaponStats.map((w) => {
                      const maxKills = Math.max(...p.weaponStats.map((x) => x.kills));
                      return (
                        <div key={w.weapon} className="flex items-center gap-6 px-6 py-4 hover:bg-bg-card-hover transition-all">
                          <span className="text-sm font-bold w-32">{w.weapon}</span>
                          <div className="flex-1">
                            <div className="h-2.5 rounded-full bg-border overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-blue to-blue-light shadow-[0_0_10px_rgba(59,130,246,0.3)]" style={{ width: `${(w.kills / maxKills) * 100}%` }} />
                            </div>
                          </div>
                          <span className="text-sm font-black tabular-nums w-20 text-right">{w.kills.toLocaleString()}</span>
                          <span className="text-xs font-bold text-yellow tabular-nums w-16 text-right">{w.hsPercent} HS</span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Opening Duels */}
                <section className="rounded-2xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up delay-2">
                  <h2 className="text-lg font-bold mb-5">Opening Duels</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { l: "Opening Kills", v: p.openingKills.toLocaleString() },
                      { l: "Opening Deaths", v: p.openingDeaths.toLocaleString() },
                      { l: "Opening KDR", v: openingKdr },
                      { l: "First Kill Rate", v: `${p.openingDeaths > 0 ? ((p.openingKills / (p.openingKills + p.openingDeaths)) * 100).toFixed(1) : "0"}%` },
                    ].map((s) => (
                      <div key={s.l} className="text-center rounded-xl bg-bg-body/50 border border-border px-3 py-4">
                        <p className="text-lg font-black tabular-nums">{s.v}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === "Biography" && p.biography && (
              <section className="rounded-2xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                <div className="border-b border-border bg-white/5 px-6 py-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-black">Complete Biography</h2>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">{p.biography.intro}</p>
                    </div>
                    <a href={p.biography.sourceUrl} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-blue-light/20 bg-blue-light/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-blue-light hover:border-blue-light/40 transition-colors">
                      {p.biography.sourceLabel}
                    </a>
                  </div>
                </div>

                <div className="grid gap-8 p-6 xl:grid-cols-[300px_1fr]">
                  <div>
                    <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted">Career Timeline</h3>
                    <div className="space-y-4 border-l border-border pl-5">
                      {p.biography.timeline.map((item) => (
                        <div key={`${item.period}-${item.title}`} className="relative">
                          <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-bg-card bg-blue-light shadow-[0_0_10px_rgba(59,130,246,0.55)]" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-blue-light">{item.period}</p>
                          <h4 className="mt-1 text-sm font-black text-text-primary">{item.title}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {p.biography.sections.map((section) => (
                      <article key={section.title} className="rounded-xl border border-border bg-bg-body/35 p-5">
                        <h3 className="text-base font-black text-text-primary">{section.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{section.body}</p>
                      </article>
                    ))}

                    <div className="rounded-xl border border-border bg-bg-body/35 p-5">
                      <h3 className="text-base font-black text-text-primary">Career Highlights</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {p.biography.highlights.map((highlight) => (
                          <div key={highlight} className="flex gap-3 rounded-lg border border-border bg-white/[0.03] p-3">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green shadow-[0_0_8px_rgba(34,197,94,0.45)]" />
                            <p className="text-xs font-bold leading-relaxed text-text-secondary">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Matches" && (
              <section className="rounded-2xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-bold">Match History</h2>
                </div>
                <div className="divide-y divide-border">
                  {p.recentMatches.map((m, i) => (
                    <div key={i} className="flex items-center gap-6 px-6 py-4 hover:bg-bg-card-hover transition-all">
                      <span className={`text-[10px] font-black px-2 py-1 rounded border ${m.result.startsWith("W") ? "bg-green/10 text-green border-green/20" : "bg-red/10 text-red border-red/20"}`}>
                        {m.result}
                      </span>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-xs font-bold text-text-muted uppercase">vs</span>
                        <TeamLogo src={m.opponentLogo} name={m.opponent} size={24} />
                        <span className="text-sm font-bold truncate">{m.opponent}</span>
                      </div>
                      <span className="text-xs font-bold text-text-muted hidden sm:block uppercase tracking-wider">{m.map}</span>
                      <span className="text-xs font-bold text-text-muted hidden sm:block truncate max-w-[150px]">{m.event}</span>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className={`text-sm font-black tabular-nums ${m.rating >= p.rating2 ? "text-green" : "text-text-secondary"}`}>{m.rating.toFixed(2)}</span>
                        <span className="text-xs font-bold text-text-muted tabular-nums">{m.kills}/{m.deaths}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Achievements" && (
              <section className="rounded-2xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-bold">All Achievements &amp; Awards</h2>
                </div>
                {p.achievements.length > 0 ? (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {p.achievements.map((a, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-xl bg-yellow/5 border border-yellow/10 px-5 py-4 group hover:bg-yellow/10 transition-colors">
                        <div className="p-2 bg-yellow/20 rounded-lg group-hover:scale-110 transition-transform">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#eab308"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <span className="text-sm font-bold">{a}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-text-muted font-medium">No achievements recorded yet.</div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-bg-card p-6 card-glow animate-fade-in-up">
              <h3 className="text-sm font-black uppercase tracking-[0.15em] text-text-muted mb-5">Technical Profile</h3>
              <div className="space-y-4">
                {([
                  ["Peak Rating", `${p.peakRating} (${p.peakRatingDate})`],
                  ["DPR", p.dpr.toString()],
                  ["AWP K/R", p.awpKillsRound.toString()],
                  ["Country", <CountryLabel key="country" countryCode={p.country} preferredFlag={p.countryFlag} />],
                ] as [string, ReactNode][]).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{label}</span>
                    <span className="text-sm font-black">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Team History */}
            {p.teamHistory.length > 0 && (
              <section className="rounded-2xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-1">
                <div className="px-5 py-4 border-b border-border bg-white/5">
                  <h3 className="text-sm font-black uppercase tracking-[0.15em] text-text-muted">Team History</h3>
                </div>
                <div className="max-h-[420px] divide-y divide-border overflow-y-auto">
                  {p.teamHistory.map((t, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                      <TeamLogo src={t.logo} name={t.team} size={28} />
                      <div>
                        <p className="text-sm font-bold">{t.team}</p>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <Link href="/rankings/players" className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-bg-card px-6 py-4 text-sm font-black uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-blue-light/50 transition-all group">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Browse Players
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
