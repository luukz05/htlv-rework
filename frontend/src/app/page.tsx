import Header from "@/components/Header";
import HeroMatch from "@/components/HeroMatch";
import NewsSection from "@/components/NewsSection";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { news, events, topPlayers, forumThreads, streams, playerOfTheWeek, roundHighlight, legends } from "@/data/mock";

/* ── Ad placeholder ── */
function AdBanner({ height, label }: { height: string; label: string }) {
  return (
    <div
      className="w-full rounded-xl border border-dashed border-border bg-bg-surface/30 flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-text-muted/50 mb-1">Advertisement</p>
        <p className="text-xs text-text-muted/30">{label}</p>
      </div>
    </div>
  );
}

/* ── Player of the Week ── */
function PlayerOfTheWeek() {
  const { player, event, maps, kills, deaths, title } = playerOfTheWeek;
  return (
    <section className="animate-fade-in-up">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {title}
        </h2>
        <span className="text-[11px] font-bold uppercase tracking-wider text-yellow bg-yellow/15 px-2.5 py-1 rounded-full">{event}</span>
      </div>
      <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
        <div className="relative grid grid-cols-1 md:grid-cols-[240px_1fr]">
          {/* Player image */}
          <div className="relative h-64 md:h-auto overflow-hidden bg-gradient-to-b from-bg-surface to-bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={player.image} alt={player.name} className="h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-bg-card" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-yellow/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-yellow/30">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-[10px] font-black uppercase tracking-wider text-yellow">MVP</span>
            </div>
          </div>

          {/* Player info */}
          <div className="p-5 md:p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-1">
              <TeamLogo src={player.teamLogo} name={player.team} size={28} />
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{player.team}</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg">{player.countryFlag}</span>
              <h3 className="text-2xl font-black">{player.name}</h3>
            </div>
            <p className="text-sm text-text-muted mb-4">{player.realName}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: "Rating", value: player.rating.toFixed(2), color: "text-green" },
                { label: "K/D", value: player.kd, color: "text-blue-light" },
                { label: "ADR", value: player.adr.toString(), color: "text-orange" },
                { label: "KAST", value: player.kast, color: "text-purple-400" },
                { label: "Maps", value: maps.toString(), color: "text-text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="text-center rounded-lg bg-bg-body/50 border border-border px-2 py-2.5">
                  <p className={`text-lg font-bold tabular-nums ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
              <span>{kills} kills</span>
              <span className="text-text-muted/30">|</span>
              <span>{deaths} deaths</span>
              <span className="text-text-muted/30">|</span>
              <span>{maps} maps played</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Round Highlight of the Week ── */
function RoundHighlightSection() {
  const hl = roundHighlight;
  return (
    <section className="animate-fade-in-up">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Round Highlight of the Week
        </h2>
        <span className="text-[11px] font-medium text-text-muted">{hl.event}</span>
      </div>
      <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
        {/* Video thumbnail with play overlay */}
        <div className="relative h-56 sm:h-72 overflow-hidden group cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hl.thumbnail} alt={hl.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/30">
            <div className="h-16 w-16 rounded-full bg-red/90 flex items-center justify-center shadow-lg shadow-red/30 transition-transform group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <polygon points="6 3 20 12 6 21 6 3"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <TeamLogo src={hl.team1.logo} name={hl.team1.name} size={24} />
            <span className="text-xs font-bold text-white/90">vs</span>
            <TeamLogo src={hl.team2.logo} name={hl.team2.name} size={24} />
          </div>
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-white">
            Round {hl.round}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{hl.title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">{hl.description}</p>
          <a
            href={`https://www.youtube.com/watch?v=${hl.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-red/15 border border-red/30 px-4 py-2 text-sm font-semibold text-red hover:bg-red/25 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Watch Replay
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Legend Anthem — Hall of Fame ── */
function LegendAnthem() {
  const legend = legends[0]; // FalleN
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow/5 via-bg-body to-yellow/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-10 md:py-16">
        {/* Header badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-yellow/40" />
          <div className="flex items-center gap-2 bg-yellow/10 border border-yellow/20 rounded-full px-5 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#eab308">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow">Hall of Fame</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#eab308">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-yellow/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-center">
          {/* Left — Player visual */}
          <div className="relative mx-auto lg:mx-0">
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-yellow/20 shadow-[0_0_60px_rgba(234,179,8,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={legend.image} alt={legend.nickname} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-transparent to-transparent" />
              {/* Country flag + name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{legend.countryFlag}</span>
                  <span className="text-xs font-bold text-yellow uppercase tracking-wider">{legend.epithet}</span>
                </div>
                <h3 className="text-3xl font-black text-white" style={{ textShadow: "0 0 30px rgba(234,179,8,0.4)" }}>{legend.nickname}</h3>
                <p className="text-sm text-text-muted">{legend.realName}</p>
              </div>
            </div>
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-3xl border border-yellow/10 -z-10" />
            <div className="absolute -inset-8 rounded-3xl border border-yellow/5 -z-10" />
          </div>

          {/* Right — Legend content */}
          <div>
            <p className="text-xs font-bold text-yellow/70 uppercase tracking-widest mb-2">{legend.role}</p>
            <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
              The Legend Who Built a Region
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-2xl">
              {legend.bio}
            </p>

            {/* Quote */}
            <div className="mb-6 pl-4 border-l-2 border-yellow/30">
              <p className="text-sm italic text-text-secondary">&ldquo;{legend.quote}&rdquo;</p>
              <p className="text-xs text-yellow mt-1">— {legend.nickname}</p>
            </div>

            {/* Trophies grid */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Career Achievements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {legend.achievements.slice(0, 8).map((a, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-yellow/5 border border-yellow/10 px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#eab308" className="shrink-0">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{a.title}</p>
                      <p className="text-[10px] text-text-muted">{a.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career stats */}
            <div className="grid grid-cols-4 gap-3">
              {legend.careerStats.slice(0, 4).map((s) => (
                <div key={s.label} className="text-center rounded-lg bg-bg-card border border-border px-2 py-3">
                  <p className="text-lg font-black text-yellow tabular-nums">{s.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Breaking News Ticker ── */
function BreakingNewsTicker() {
  const headlines = news.slice(0, 3);
  return (
    <div className="relative bg-bg-surface border-b border-border overflow-hidden">
      <div className="flex items-center px-0">
        <div className="shrink-0 flex items-center gap-2 bg-red px-4 py-2 z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Breaking</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee flex whitespace-nowrap py-2 pl-4">
            {[...headlines, ...headlines].map((article, i) => (
              <a key={`${article.id}-${i}`} href="#" className="inline-flex items-center gap-3 mr-12 text-sm text-text-secondary hover:text-text-primary transition-colors">
                <span className="h-1 w-1 rounded-full bg-red shrink-0" />
                <span className="font-medium">{article.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Live Events Bar ── */
function LiveEventsBar() {
  const liveEvents = events.filter(e => e.progress > 0);
  const upcomingEvents = events.filter(e => e.progress === 0).slice(0, 3);
  const allEvents = [...liveEvents, ...upcomingEvents];

  return (
    <section className="border-b border-border bg-bg-surface/50">
      <div className="mx-auto max-w-[1440px] px-6 py-4">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">Events</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {allEvents.map((event) => (
            <a
              key={event.id}
              href="#"
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-card px-4 py-3 hover:border-border-hover hover:bg-bg-card-hover transition-all group"
            >
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {event.progress > 0 ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red">
                      <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse-dot" />
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-text-muted uppercase">Upcoming</span>
                  )}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    event.tier === "S" ? "bg-yellow/15 text-yellow" : event.tier === "A" ? "bg-blue/15 text-blue-light" : "bg-text-muted/15 text-text-muted"
                  }`}>
                    {event.tier}-Tier
                  </span>
                </div>
                <span className="text-sm font-semibold truncate">{event.name}</span>
                <span className="text-[11px] text-text-muted truncate">{event.status} &middot; {event.location}</span>
              </div>
              {event.progress > 0 && (
                <div className="w-12 h-12 relative shrink-0">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" className="text-border" strokeWidth="3" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" className="text-blue" strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - event.progress / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{event.progress}%</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Hot Forum Discussions ── */
function ForumDiscussions() {
  const threads = forumThreads.slice(0, 6);
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Hot Forum Discussions
        </h2>
        <a href="#" className="text-sm font-medium text-blue-light hover:text-blue transition-colors">View forums</a>
      </div>
      <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
        <div className="divide-y divide-border">
          {threads.map((thread, i) => (
            <a
              key={thread.id}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 hover:bg-bg-card-hover transition-all group animate-fade-in-up delay-${Math.min(i + 1, 5)} ${thread.pinned ? "bg-blue/5 border-l-2 border-l-blue" : ""}`}
            >
              {thread.pinned && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue shrink-0">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
                </svg>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-blue-light transition-colors">{thread.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-text-muted">{thread.author}</span>
                  <span className="text-[10px] text-text-muted/50">&middot;</span>
                  <span className="text-[10px] text-text-muted">{thread.category}</span>
                  <span className="text-[10px] text-text-muted/50">&middot;</span>
                  <span className="text-[10px] text-text-muted">{thread.lastReply}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold tabular-nums">{thread.replies}</span>
                  <span className="text-[9px] text-text-muted">replies</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold tabular-nums text-text-secondary">{(thread.views / 1000).toFixed(1)}k</span>
                  <span className="text-[9px] text-text-muted">views</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Top Player Ratings ── */
function TopPlayerRatings() {
  const players = topPlayers.slice(0, 5);
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Top Player Ratings
        </h2>
        <a href="#" className="text-sm font-medium text-blue-light hover:text-blue transition-colors">Full stats</a>
      </div>
      <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow">
        <div className="grid grid-cols-[40px_1fr_60px_50px_50px_50px] gap-2 px-4 py-2 border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
          <span>#</span>
          <span>Player</span>
          <span className="text-right">Rating</span>
          <span className="text-right">K/D</span>
          <span className="text-right">ADR</span>
          <span className="text-right">Team</span>
        </div>
        <div className="divide-y divide-border">
          {players.map((player, i) => (
            <div
              key={player.rank}
              className={`grid grid-cols-[40px_1fr_60px_50px_50px_50px] gap-2 items-center px-4 py-3 hover:bg-bg-card-hover transition-all cursor-pointer animate-fade-in-up delay-${i + 1}`}
            >
              <span className={`text-sm font-bold tabular-nums ${i === 0 ? "rank-gold" : i === 1 ? "rank-silver" : i === 2 ? "rank-bronze" : "text-text-muted"}`}>
                {player.rank}.
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm">{player.countryFlag}</span>
                <span className="text-sm font-semibold truncate">{player.name}</span>
              </div>
              <span className="text-sm font-bold text-green text-right tabular-nums">{player.rating.toFixed(2)}</span>
              <span className="text-xs text-text-secondary text-right tabular-nums">{player.kd}</span>
              <span className="text-xs text-text-secondary text-right tabular-nums">{player.adr}</span>
              <div className="flex justify-end">
                <TeamLogo src={player.teamLogo} name={player.team} size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Popular Streams ── */
function PopularStreams() {
  const featured = streams.slice(0, 2);
  const rest = streams.slice(2);

  function StreamCard({ stream, featured: isFeatured, idx }: { stream: typeof streams[0]; featured?: boolean; idx: number }) {
    return (
      <a
        href="#"
        className={`group rounded-xl border border-border bg-bg-card overflow-hidden hover:border-border-hover transition-all card-glow animate-fade-in-up delay-${Math.min(idx + 1, 5)}`}
      >
        <div className={`relative overflow-hidden ${isFeatured ? "h-44" : "h-28"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stream.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red px-2 py-0.5 rounded text-[10px] font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
            LIVE
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-white">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/><circle cx="12" cy="12" r="3.5" fill="white"/></svg>
            {stream.viewers >= 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers}
          </div>
        </div>
        <div className="p-3">
          <p className={`font-semibold truncate ${isFeatured ? "text-sm" : "text-xs"}`}>{stream.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-medium text-purple-400">{stream.channel}</span>
            <span className="text-[10px] text-text-muted">&middot;</span>
            <span className="text-[10px] text-text-muted">{stream.language}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9146FF" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          Popular Streams
        </h2>
        <a href="#" className="text-sm font-medium text-blue-light hover:text-blue transition-colors">All streams</a>
      </div>
      {/* Featured 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {featured.map((s, i) => (
          <StreamCard key={s.id} stream={s} featured idx={i} />
        ))}
      </div>
      {/* Rest — smaller cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {rest.map((s, i) => (
          <StreamCard key={s.id} stream={s} idx={i + 2} />
        ))}
      </div>
    </section>
  );
}

/* ── Upcoming Events (full-width) ── */
function UpcomingEvents() {
  const upcoming = events.filter(e => e.progress === 0).slice(0, 6);
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Upcoming Events
        </h2>
        <a href="#" className="text-sm font-medium text-blue-light hover:text-blue transition-colors">All events</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcoming.map((event, i) => (
          <a
            key={event.id}
            href="#"
            className={`group rounded-xl border border-border bg-bg-card overflow-hidden hover:border-border-hover transition-all card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
          >
            <div className="relative h-32 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={event.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/30 to-transparent" />
              <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${
                event.tier === "S" ? "bg-yellow/20 text-yellow" : event.tier === "A" ? "bg-blue/20 text-blue-light" : "bg-text-muted/20 text-text-muted"
              }`}>
                {event.tier}-Tier
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold mb-1 truncate">{event.name}</h3>
              <div className="flex items-center gap-2 text-[11px] text-text-muted mb-1.5">
                <span>{event.dates}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-muted">{event.location}</span>
                <span className="font-bold text-green">{event.prize}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ── More News (full-width bottom grid) ── */
function MoreNews() {
  const moreArticles = news.slice(7, 12);
  if (moreArticles.length === 0) return null;
  return (
    <section className="border-t border-border bg-bg-surface/30">
      <div className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-bold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
              <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z"/>
            </svg>
            More News
          </h2>
          <a href="#" className="text-sm font-medium text-blue-light hover:text-blue transition-colors">View all news</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {moreArticles.map((article, i) => (
            <article
              key={`more-${article.id}`}
              className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
            >
              <div className="h-32 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <div className="flex gap-2 mb-1.5">
                  {article.tags.map((tag) => (
                    <span key={tag} className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-blue/15 text-blue-light">{tag}</span>
                  ))}
                </div>
                <h4 className="text-[13px] font-semibold leading-tight line-clamp-2 mb-1.5">{article.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <span>{article.time}</span>
                  <span>&middot;</span>
                  <span>{article.comments} comments</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main Page ── */
export default function Home() {
  return (
    <>
      <Header />

      {/* Breaking News Ticker — full bleed */}
      <BreakingNewsTicker />

      {/* Leaderboard Ad */}
      <div className="mx-auto max-w-[1440px] px-6 pt-6">
        <AdBanner height="90px" label="728 × 90 — Leaderboard" />
      </div>

      {/* Legend Anthem — full bleed */}
      <LegendAnthem />

      {/* Hero Match — full bleed bg */}
      <HeroMatch />

      {/* Live Events Bar — full bleed bg */}
      <LiveEventsBar />

      {/* Two-column grid */}
      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Left column */}
          <div className="space-y-8">
            <NewsSection />

            <PlayerOfTheWeek />

            <AdBanner height="250px" label="728 × 250 — Mid-content" />

            <ForumDiscussions />

            <RoundHighlightSection />

            <TopPlayerRatings />

            <AdBanner height="90px" label="728 × 90 — Mid-content" />

            <PopularStreams />

            <UpcomingEvents />
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <AdBanner height="250px" label="300 × 250 — Sidebar Rectangle" />

            <Sidebar />

            <AdBanner height="250px" label="300 × 250 — Sidebar Rectangle" />

            <div className="sticky top-4">
              <AdBanner height="600px" label="300 × 600 — Sidebar Skyscraper" />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom leaderboard ad — full bleed bg */}
      <div className="border-t border-b border-border bg-bg-surface/20">
        <div className="mx-auto max-w-[1440px] px-6 py-6">
          <AdBanner height="90px" label="728 × 90 — Bottom Leaderboard" />
        </div>
      </div>

      {/* More News — full bleed bg */}
      <MoreNews />

      <Footer />
    </>
  );
}
