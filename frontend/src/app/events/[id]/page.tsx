import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import StatusPill from "@/components/StatusPill";
import Link from "next/link";
import { api } from "@/services/api";
import type { Event, Match, Team } from "@/services/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const events = await api.events();
  const event = events.find((item) => item.id.toString() === id);

  return {
    title: event ? `${event.name} - ${event.status} - ${event.prize}` : "Event not found",
  };
}

type EventMatch = Match & {
  stage: string;
  round: string;
  day: string;
  matchNo: number;
};

type BracketSlot = {
  team?: Team;
  seed?: number;
  score?: number;
  currentScore?: number;
  status?: Match["status"] | "pending";
  source?: string;
};

type BracketMatch = {
  id: string;
  title: string;
  time: string;
  format: string;
  status: Match["status"] | "pending";
  team1: BracketSlot;
  team2: BracketSlot;
  winner?: Team;
};

type SwissRound = {
  title: string;
  pools: {
    record: string;
    status: "matches" | "advanced" | "eliminated";
    matches: BracketMatch[];
    teams?: Team[];
  }[];
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { events, teams, matches } = await resolvePageData({
    events: api.events(),
    teams: api.teamCards(),
    matches: api.matches(),
  });

  const { id } = await params;
  const event = events.find((item) => item.id.toString() === id);
  if (!event) {
    return (
      <main className="mx-auto max-w-[800px] px-5 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Event not found</h1>
        <Link href="/events" className="text-blue-light">Back to Events</Link>
      </main>
    );
  }

  // Ensure we have exactly the number of teams the event expects (filling with TBD if needed)
  const eventTeams = teams.slice(0, event.teams);
  while (eventTeams.length < event.teams) {
    eventTeams.push(TBD_TEAM);
  }

  const schedule = buildEventSchedule(event, eventTeams, matches);
  const scheduleByDay = groupBy(schedule, "day");
  const stageSummary = buildStageSummary(schedule);
  const swissBracket = buildSwissBracket(schedule, event.teams);
  const swissRows = buildSwissRows(eventTeams.filter(t => t.name !== "TBD"), schedule);
  const playoffBracket = buildPlayoffBracket(schedule);
  const liveOrNext = schedule.find((match) => match.status === "live") ?? schedule.find((match) => match.status === "upcoming");
  const completedMatches = schedule.filter((match) => match.status === "finished").length;

  return (
    <>
      <div className="relative h-64 overflow-hidden md:h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt={event.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-bg-body/75 to-bg-body/10" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-[1380px] px-4 pb-7">
            <div className="mb-3 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary">Home</Link>
              <span className="mx-2">&rsaquo;</span>
              <Link href="/events" className="hover:text-text-secondary">Events</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-text-primary">{event.name}</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={`rounded px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${event.tier === "S" ? "bg-yellow/20 text-yellow" : event.tier === "A" ? "bg-blue/20 text-blue-light" : "bg-text-muted/20 text-text-secondary"}`}>{event.tier}-Tier</span>
                  <span className="rounded bg-green/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green">{event.status}</span>
                </div>
                <h1 className="text-3xl font-black leading-tight md:text-5xl">{event.name}</h1>
                <p className="mt-2 text-sm text-text-secondary">{event.dates} · {event.location}</p>
              </div>
              {liveOrNext && (
                <Link
                  href={`/matches/${liveOrNext.id}`}
                  className={`min-w-[280px] rounded-lg border p-4 transition ${
                    liveOrNext.status === "live"
                      ? "border-red/40 bg-red/10 animate-live-glow shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]"
                      : "border-border bg-bg-card/90 hover:border-border-hover hover:bg-bg-card"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${liveOrNext.status === "live" ? "text-red animate-pulse" : "text-text-muted"}`}>
                      {liveOrNext.status === "live" ? "● Live now" : "Next match"}
                    </p>

                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <TeamChip team={liveOrNext.team1} />
                    <span className="text-xs font-bold text-text-muted">vs</span>
                    <TeamChip team={liveOrNext.team2} align="right" />
                  </div>
                  <p className={`mt-2 text-xs ${liveOrNext.status === "live" ? "font-bold text-red/80" : "text-text-muted"}`}>
                    {liveOrNext.round} · {liveOrNext.format} · {liveOrNext.day} {liveOrNext.time ? `at ${liveOrNext.time}` : ""}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1380px] px-4 py-8">
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-6">
          <StatCard label="Dates" value={event.dates} />
          <StatCard label="Prize Pool" value={event.prize} className="text-green" />
          <StatCard label="Teams" value={event.teams.toString()} />
          <StatCard label="Matches" value={schedule.length.toString()} />
          <StatCard label="Completed" value={`${completedMatches}/${schedule.length}`} className="text-blue-light" />
          <StatCard label="Location" value={event.location} />
        </div>

        <section className="mb-8 rounded-lg border border-border bg-bg-card p-4 card-glow">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold">Participating Teams</h2>
            <span className="rounded bg-bg-surface px-2.5 py-1 text-xs font-bold text-text-secondary">{event.teams}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-8">
            {eventTeams.map((team) => (
              <div key={team.name} className="flex min-w-0 items-center gap-3 rounded-lg bg-bg-surface px-3 py-2">                <TeamLogo src={team.logo} name={team.name} size={22} />
                <span className="min-w-0 truncate text-sm font-semibold">{getTeamShortName(team)}</span>
              </div>
            ))}
          </div>
        </section>

        {event.progress > 0 && (
          <section className="mb-8 rounded-lg border border-border bg-bg-card p-5 card-glow">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold">Tournament Progress</h2>
              <span className="text-sm font-bold text-blue-light">{event.progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-bg-surface">
              <div className="h-full rounded-full bg-gradient-to-r from-blue to-green transition-all" style={{ width: `${event.progress}%` }} />
            </div>
          </section>
        )}

        <div className="space-y-8">
            <section className="rounded-lg border border-border bg-bg-card p-6 card-glow">
              <input id="swiss-list-toggle" type="checkbox" className="peer sr-only" />
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight">Swiss Bracket</h2>
                  <p className="text-xs text-text-muted">Visual tournament progression following the Swiss system.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <label htmlFor="swiss-list-toggle" className="swiss-view-toggle flex cursor-pointer items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                    <span>List view</span>
                    <span className="swiss-view-toggle-track relative h-5 w-9 rounded-full border border-border bg-bg-surface transition">
                      <span className="swiss-view-toggle-thumb absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-text-muted transition-transform" />
                    </span>
                  </label>
                  <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      <span className="text-text-secondary">Qualified</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                      <span className="text-text-secondary">Eliminated</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto pb-4 peer-checked:hidden">
                <div className="swiss-visual-container min-w-[1000px]">
                  {swissBracket.map((round) => {
                    const matches = round.pools.flatMap(p => p.matches);
                    const isFinished = matches.length > 0 && matches.every(m => m.status === "finished");
                    const isActive = matches.some(m => m.status === "live");
                    const columnStatus = isFinished ? "finished" : isActive ? "active" : "upcoming";

                    return (
                      <div key={round.title} className={`swiss-visual-column ${columnStatus}`}>
                        {round.pools.map((pool) => (
                          <div key={`${round.title}-${pool.record}`} className={`swiss-visual-matchups-wrapper ${pool.status === "advanced" ? "swiss-visual-matchups-advanced" : pool.status === "eliminated" ? "swiss-visual-matchups-eliminated" : ""}`}>
                            <div className="swiss-visual-matchups-title">{pool.record}</div>
                            {pool.status === "matches" ? (
                              <div className="swiss-visual-matchups-container">
                                {pool.matches.map((match) => (
                                  <Link
                                    key={match.id}
                                    href={match.status === "pending" || match.id.includes("r") ? "#" : `/matches/${match.id}`}
                                    className={`swiss-visual-matchup group ${match.status === "pending" || match.id.includes("r") ? "cursor-default" : ""}`}
                                  >
                                    <div className="flex flex-1 items-center justify-end gap-1.5 min-w-0">
                                      <span className="truncate text-[10px] font-bold text-text-secondary group-hover:text-text-primary transition-colors">{match.team1.team ? getTeamShortName(match.team1.team) : "TBD"}</span>
                                      <div className={`swiss-visual-team ${match.winner?.name === match.team1.team?.name ? "swiss-visual-match-winner" : match.winner ? "swiss-visual-match-loser" : ""}`}>
                                        {match.team1.team && match.team1.team.name !== "TBD" ? (
                                          <TeamLogo src={match.team1.team.logo} name={match.team1.team.name} size={18} className="swiss-visual-team-logo" />
                                        ) : (
                                          <div className="h-[18px] w-[18px] rounded-full bg-border/20 flex items-center justify-center text-[8px] font-bold text-text-muted">?</div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex flex-col items-center min-w-[32px] px-1 border-x border-border/10">
                                      {match.status === "finished" || match.status === "live" ? (
                                        <span className={`text-[10px] font-black tabular-nums ${match.status === "live" ? "text-red animate-pulse" : "text-text-primary"}`}>
                                          {match.team1.score}:{match.team2.score}
                                        </span>
                                      ) : (
                                        <span className="text-[8px] font-black text-text-muted/50 uppercase tracking-tighter">
                                          {match.time || "vs"}
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex flex-1 items-center justify-start gap-1.5 min-w-0">
                                      <div className={`swiss-visual-team ${match.winner?.name === match.team2.team?.name ? "swiss-visual-match-winner" : match.winner ? "swiss-visual-match-loser" : ""}`}>
                                        {match.team2.team && match.team2.team.name !== "TBD" ? (
                                          <TeamLogo src={match.team2.team.logo} name={match.team2.team.name} size={18} className="swiss-visual-team-logo" />
                                        ) : (
                                          <div className="h-[18px] w-[18px] rounded-full bg-border/20 flex items-center justify-center text-[8px] font-bold text-text-muted">?</div>
                                        )}
                                      </div>
                                      <span className="truncate text-[10px] font-bold text-text-secondary group-hover:text-text-primary transition-colors">{match.team2.team ? getTeamShortName(match.team2.team) : "TBD"}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="swiss-matchups-team-wrapper">
                                {pool.teams?.map((team) => (
                                  <div key={team.name} className="swiss-visual-team">
                                    <TeamLogo src={team.logo} name={team.name} size={22} className="swiss-visual-team-logo" />
                                  </div>
                                ))}
                                {(!pool.teams || pool.teams.length === 0) && (
                                  <div className="flex h-[22px] w-full items-center justify-center opacity-20">
                                    <div className="h-px flex-1 bg-border" />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="hidden overflow-x-auto peer-checked:block">
                <div className="min-w-[920px] overflow-hidden rounded-lg border border-border">
                  <div className="grid grid-cols-[46px_1.2fr_repeat(5,minmax(110px,1fr))_72px] border-b border-border bg-bg-surface px-3 py-2 text-[10px] font-black uppercase tracking-wider text-text-muted">
                    <span>Seed</span>
                    <span>Team</span>
                    <span>R1</span>
                    <span>R2</span>
                    <span>R3</span>
                    <span>R4</span>
                    <span>R5</span>
                    <span className="text-right">Record</span>
                  </div>
                  {swissRows.map((row) => (
                    <div key={row.team.name} className="grid grid-cols-[46px_1.2fr_repeat(5,minmax(110px,1fr))_72px] items-center border-b border-border px-3 py-2 last:border-b-0">
                      <span className="text-xs font-black text-text-muted">#{row.seed}</span>
                      <div className="flex min-w-0 items-center gap-2">
                        <TeamLogo src={row.team.logo} name={row.team.name} size={20} />
                        <span className="truncate text-sm font-semibold">{row.team.name}</span>
                      </div>
                      {row.history.map((item, index) => (
                        <div key={`${row.team.name}-${index}`} className="min-w-0 text-xs">
                          {item ? (
                            <Link href={`/matches/${item.id}`} className="flex min-w-0 items-center gap-1.5 rounded bg-bg-surface px-2 py-1 transition hover:bg-bg-card-hover">
                              <span className={`shrink-0 font-black ${item.status === "finished" ? item.won ? "text-green" : "text-red" : item.status === "live" ? "text-red" : "text-text-muted"}`}>
                                {item.status === "finished" ? item.won ? "W" : "L" : item.status === "live" ? "LIVE" : "vs"}
                              </span>
                              <span className="truncate text-text-secondary">{getTeamShortName(item.opponent)}</span>
                            </Link>
                          ) : (
                            <span className="block rounded bg-bg-surface px-2 py-1 text-text-muted">TBD</span>
                          )}
                        </div>
                      ))}
                      <span className={`justify-self-end rounded px-2 py-0.5 text-xs font-bold ${row.wins >= row.losses ? "bg-green/15 text-green" : "bg-red/15 text-red"}`}>{row.wins}-{row.losses}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <style dangerouslySetInnerHTML={{ __html: `
                #swiss-list-toggle:checked ~ .swiss-view-toggle .swiss-view-toggle-track,
                #swiss-list-toggle:checked ~ div .swiss-view-toggle .swiss-view-toggle-track { border-color: rgba(59,130,246,0.5); background: rgba(59,130,246,0.2); }
                #swiss-list-toggle:checked ~ .swiss-view-toggle .swiss-view-toggle-thumb,
                #swiss-list-toggle:checked ~ div .swiss-view-toggle .swiss-view-toggle-thumb { transform: translateX(16px); background: #60a5fa; }
                .swiss-visual-container { display: flex; gap: 24px; justify-content: space-between; position: relative; padding: 30px 0; min-height: 700px; }
                .swiss-visual-column { flex: 1; display: flex; flex-direction: column; gap: 48px; justify-content: center; min-width: 220px; }
                .swiss-visual-matchups-wrapper { display: flex; flex-direction: column; gap: 12px; }
                .swiss-visual-matchups-title { 
                  font-size: 11px; font-weight: 900; color: #6b7280; text-align: center; 
                  padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);
                  letter-spacing: 0.15em;
                }
                .swiss-visual-matchups-container { display: flex; flex-direction: column; gap: 8px; }
                .swiss-visual-matchup { 
                  display: flex; align-items: center; gap: 0;
                  background: #1a1d21; border: 1px solid #2d3136; 
                  border-radius: 4px; padding: 10px 12px; transition: all 0.15s ease;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                }
                .swiss-visual-matchup:hover { background: #23272c; border-color: #3b82f6; transform: scale(1.04); z-index: 10; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
                .swiss-visual-team-logo { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
                .swiss-visual-match-loser { opacity: 0.3; filter: grayscale(1); }
                .swiss-visual-matchups-advanced .swiss-visual-matchups-title { color: #10b981; border-bottom-color: rgba(16, 185, 129, 0.3); }
                .swiss-visual-matchups-eliminated .swiss-visual-matchups-title { color: #ef4444; border-bottom-color: rgba(239, 68, 68, 0.3); }
                .swiss-matchups-team-wrapper { display: flex; flex-direction: column; gap: 8px; }
                
                /* Connectivity Flourish */
                .swiss-visual-column:not(:last-child) .swiss-visual-matchups-wrapper::after {
                  content: "→"; position: absolute; right: -18px; top: 50%; transform: translateY(-50%);
                  font-size: 18px; color: #374151; font-weight: 900; opacity: 0.4; pointer-events: none;
                }
              `}} />
            </section>

            {playoffBracket.length > 0 && (
              <section className="rounded-lg border border-border bg-bg-card p-6 card-glow">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black tracking-tight">Playoffs</h2>
                    <p className="text-xs text-text-muted">Qualified teams move from the Swiss stage into the knockout bracket.</p>
                  </div>
                  <span className="rounded bg-bg-surface px-2.5 py-1 text-xs font-bold text-text-secondary">{playoffBracket.length} rounds</span>
                </div>
                <div className="overflow-x-auto pb-2">
                  <div className="grid min-w-[760px] grid-cols-[repeat(3,minmax(220px,1fr))] items-center gap-6">
                    {playoffBracket.map((round) => (
                      <div key={round.title} className="space-y-3">
                        <div className="text-center">
                          <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary">{round.title}</h3>
                          <p className="text-[11px] text-text-muted">{round.matches.length} matches</p>
                        </div>
                        <div className="space-y-3">
                          {round.matches.map((match) => (
                            <PlayoffMatchCard key={match.id} match={match} />
                          ))}
                        </div>
                      </div>
                    ))}
                    {playoffBracket.length < 3 && (
                      <div className="space-y-3">
                        <div className="text-center">
                          <h3 className="text-xs font-black uppercase tracking-wider text-green">Champion</h3>
                          <p className="text-[11px] text-text-muted">Event winner</p>
                        </div>
                        <ChampionCard match={playoffBracket[playoffBracket.length - 1]?.matches[0]} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            <section className="rounded-lg border border-border bg-bg-card p-5 card-glow">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Whole Schedule</h2>
                  <p className="text-xs text-text-muted">Every planned event match grouped by tournament day and stage.</p>
                </div>
                <span className="rounded bg-bg-surface px-2.5 py-1 text-xs font-bold text-text-secondary">{schedule.length} matches</span>
              </div>
              <div className="space-y-5">
                {Object.entries(scheduleByDay).map(([day, dayMatches]) => (
                  <div key={day}>
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-sm font-bold">{day}</h3>
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-[11px] text-text-muted">{dayMatches.length} matches</span>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-border">
                      {dayMatches.map((match) => (
                        <ScheduleRow key={`${match.id}-${match.matchNo}`} match={match} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border bg-bg-card p-5 card-glow">
              <h2 className="mb-4 text-lg font-bold">Stage Breakdown</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                {stageSummary.map((stage, index) => (
                  <div key={stage.name} className="rounded-lg border border-border bg-bg-surface p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue/15 text-xs font-black text-blue-light">{index + 1}</span>
                      <div>
                        <h3 className="text-sm font-bold">{stage.name}</h3>
                        <p className="text-[11px] text-text-muted">{stage.matches} matches</p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-text-secondary">{stage.description}</p>
                  </div>
                ))}
              </div>
            </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-4 text-center card-glow">
      <p className={`text-sm font-bold ${className}`}>{value}</p>
      <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
    </div>
  );
}

function getTeamShortName(team: Team) {
  return team.shortname || (team as Team & { abbr?: string }).abbr || team.name;
}

function TeamChip({ team, align = "left" }: { team: Team; align?: "left" | "right" }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${align === "right" ? "flex-row-reverse justify-start text-right" : ""}`}>
      <TeamLogo src={team.logo} name={team.name} size={24} />
      <span className="truncate text-sm font-bold">{getTeamShortName(team)}</span>
    </div>
  );
}

function ScheduleRow({ match }: { match: EventMatch }) {
  const currentMapScore = getCurrentMapScore(match);
  const isLive = match.status === "live";

  return (
    <Link
      href={`/matches/${match.id}`}
      className={`grid grid-cols-[58px_1fr] gap-3 border-b border-border px-3 py-3 transition last:border-b-0 hover:bg-bg-card-hover md:grid-cols-[70px_130px_1fr_90px_95px] md:items-center ${
        isLive ? "bg-red/5 relative overflow-hidden" : ""
      }`}
    >
      {isLive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-red animate-pulse" />
      )}
      <div className={`text-xs font-bold ${isLive ? "text-red flex items-center gap-1.5" : "text-text-secondary"}`}>
        {isLive && <span className="flex h-2 w-2 rounded-full bg-red animate-ping" />}
        {match.time ?? "TBD"}
      </div>
      <div className="hidden text-xs text-text-muted md:block">{match.stage}</div>
      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] items-center gap-3">
          <div className="min-w-0 justify-self-end">
            <TeamChip team={match.team1} />
          </div>
          <div className="w-24 shrink-0 text-center">
            {typeof match.score1 === "number" && typeof match.score2 === "number" ? (
              <div className={`text-sm font-black tabular-nums ${isLive ? "text-text-primary scale-110 transition-transform" : ""}`}>
                <span className="inline-grid min-w-10 grid-cols-[1fr_auto_1fr] gap-1">
                  <span className="text-right">{match.score1}</span>
                  <span>:</span>
                  <span className="text-left">{match.score2}</span>
                </span>
                {currentMapScore && (
                  <span className={`ml-1 inline-block min-w-10 text-left text-xs ${isLive ? "text-red font-bold" : "text-text-secondary"}`}>
                    ({currentMapScore.score1}:{currentMapScore.score2})
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs font-bold text-text-muted">vs</span>
            )}
          </div>
          <div className="min-w-0 justify-self-start">
            <TeamChip team={match.team2} />
          </div>
        </div>
        <p className="mt-1 text-[11px] text-text-muted md:hidden">{match.stage} · {match.round}</p>
      </div>
      <div className="hidden text-xs text-text-muted md:block">{match.round}</div>
      <div className="hidden justify-self-end md:block"><StatusPill status={match.status} /></div>
    </Link>
  );
}

function PlayoffMatchCard({ match }: { match: EventMatch }) {
  const winner = getMatchWinner(match);

  return (
    <Link href={`/matches/${match.id}`} className="block rounded-lg border border-border bg-bg-surface p-3 transition hover:border-border-hover hover:bg-bg-card-hover">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-text-muted">{match.format}</span>
        <StatusPill status={match.status} />
      </div>
      <PlayoffTeamLine team={match.team1} score={match.score1} isWinner={winner?.name === match.team1.name} />
      <PlayoffTeamLine team={match.team2} score={match.score2} isWinner={winner?.name === match.team2.name} />
    </Link>
  );
}

function PlayoffTeamLine({ team, score, isWinner }: { team: Team; score?: number; isWinner: boolean }) {
  return (
    <div className="mt-2 grid grid-cols-[1fr_28px] items-center gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <TeamLogo src={team.logo} name={team.name} size={22} />
        <span className={`truncate text-sm font-bold ${isWinner ? "text-green" : "text-text-secondary"}`}>{getTeamShortName(team)}</span>
      </div>
      <span className={`text-right text-sm font-black tabular-nums ${isWinner ? "text-green" : "text-text-primary"}`}>
        {typeof score === "number" ? score : "-"}
      </span>
    </div>
  );
}

function ChampionCard({ match }: { match?: EventMatch }) {
  const winner = match ? getMatchWinner(match) : undefined;

  return (
    <div className="rounded-lg border border-green/30 bg-green/10 p-4 text-center">
      {winner ? (
        <div className="flex flex-col items-center gap-2">
          <TeamLogo src={winner.logo} name={winner.name} size={36} />
          <div>
            <p className="text-sm font-black text-green">{winner.name}</p>
            <p className="text-[11px] text-text-muted">Champion</p>
          </div>
        </div>
      ) : (
        <p className="text-sm font-bold text-text-muted">TBD</p>
      )}
    </div>
  );
}


function buildEventSchedule(event: Event, teams: Team[], matches: Match[]): EventMatch[] {
  const directMatches = matches.filter((match) => sameEvent(match.event, event.name));
  const source = simulateTournament(event, teams, directMatches);

  return source.map((match, index) => {
    const stage = getStage(index, teams.length);
    return {
      ...match,
      stage: stage.stage,
      round: stage.round,
      day: getEventDay(event, index, teams.length),
      matchNo: index + 1,
      time: match.time ?? getMatchTime(index),
      date: match.date ?? getEventDay(event, index, teams.length),
    };
  });
}

const TBD_TEAM: Team = {
  name: "TBD",
  shortname: "TBD",
  color: "#666",
  logo: "",
};

function getSwissRoundSizes(teamCount: number) {
  if (teamCount >= 16) return [8, 8, 8, 6, 3];
  if (teamCount >= 12) return [6, 6, 6, 4, 2];
  return [4, 4, 3, 2, 2];
}

function simulateTournament(event: Event, teams: Team[], actualMatches: Match[]): Match[] {
  const generated: Match[] = [];
  const teamCount = teams.length;
  const swissRounds = getSwissRoundSizes(teamCount);
  const playoffRounds = teamCount >= 16 ? [4, 2, 1] : [2, 1];
  const rounds = [...swissRounds, ...playoffRounds];
  const totalMatches = rounds.reduce((total, count) => total + count, 0);
  const finishedCount = Math.floor(totalMatches * (event.progress / 100));
  const champion = getEventChampion(event, teams);

  const teamStates = teams.map((t, i) => ({ team: t, wins: 0, losses: 0, qualified: false, eliminated: false, seed: i + 1 }));

  const getWinner = (mId: number, t1: Team, t2: Team) => {
    if (champion && (t1.name === champion.name || t2.name === champion.name)) {
      return champion;
    }

    const actual = actualMatches.find(am => 
      (am.team1.name === t1.name && am.team2.name === t2.name) || 
      (am.team1.name === t2.name && am.team2.name === t1.name)
    );
    if (actual && (actual.status === "finished" || actual.status === "live")) {
      const t1Won = actual.team1.name === t1.name ? (actual.score1 ?? 0) > (actual.score2 ?? 0) : (actual.score2 ?? 0) > (actual.score1 ?? 0);
      return t1Won ? t1 : t2;
    }

    if (t1.name === "TBD" || t2.name === "TBD") return undefined;
    const hash = (mId + t1.name.length + t2.name.length) % 2;
    return hash === 0 ? t1 : t2;
  };

  let mId = 10000 + event.id * 100;

  for (let r = 0; r < rounds.length; r++) {
    const matchesInRound = rounds[r];
    const isPlayoff = r >= swissRounds.length;
    const activeStates = teamStates.filter(s => !s.qualified && !s.eliminated);
    const qualifiedStates = teamStates.filter(s => s.qualified);
    const poolStates = isPlayoff
      ? sortPlayoffStates(qualifiedStates, champion)
      : activeStates.sort((a, b) => b.wins - a.wins || a.losses - b.losses || a.seed - b.seed);

    const currentRoundStartIndex = generated.length;
    const previousRoundsFinished = currentRoundStartIndex <= finishedCount;

    for (let m = 0; m < matchesInRound; m++) {
      const globalIndex = generated.length;
      const status: Match["status"] = globalIndex < finishedCount ? "finished" : (globalIndex === finishedCount && event.progress > 0 ? "live" : "upcoming");

      let t1 = TBD_TEAM;
      let t2 = TBD_TEAM;

      if (r === 0) {
        t1 = teams[m] || TBD_TEAM;
        t2 = teams[m + matchesInRound] || TBD_TEAM;
      } else if (isPlayoff && previousRoundsFinished) {
        if (r === swissRounds.length) {
          t1 = poolStates[m * 2]?.team || TBD_TEAM;
          t2 = poolStates[m * 2 + 1]?.team || TBD_TEAM;
        } else {
          const previousWinners = generated
            .slice(currentRoundStartIndex - rounds[r - 1], currentRoundStartIndex)
            .map((match) => getMatchWinner(match))
            .filter((team): team is Team => Boolean(team));
          t1 = previousWinners[m * 2] || TBD_TEAM;
          t2 = previousWinners[m * 2 + 1] || TBD_TEAM;
        }
      } else if (previousRoundsFinished) {
        t1 = poolStates[m * 2]?.team || TBD_TEAM;
        t2 = poolStates[m * 2 + 1]?.team || TBD_TEAM;
      }

      const winner = status === "finished" ? getWinner(mId, t1, t2) : undefined;
      const liveScore = status === "live" ? getLiveScore(t1, t2, actualMatches) : undefined;
      const score1 = status === "finished" ? (winner?.name === t1.name ? 2 : 1) : liveScore?.score1;
      const score2 = status === "finished" ? (winner?.name === t2.name ? 2 : 1) : liveScore?.score2;

      if (winner && t1.name !== "TBD" && t2.name !== "TBD") {
        const s1 = teamStates.find(s => s.team.name === t1.name);
        const s2 = teamStates.find(s => s.team.name === t2.name);
        if (s1 && s2) {
          if (winner.name === t1.name) { s1.wins++; s2.losses++; }
          else { s2.wins++; s1.losses++; }
          if (s1.wins >= 3) s1.qualified = true;
          if (s1.losses >= 3) s1.eliminated = true;
          if (s2.wins >= 3) s2.qualified = true;
          if (s2.losses >= 3) s2.eliminated = true;
        }
      }

      generated.push({
        id: mId++,
        team1: t1,
        team2: t2,
        score1,
        score2,
        event: event.name,
        format: isPlayoff ? (r === rounds.length - 1 ? "BO5" : "BO3") : (r >= 2 ? "BO3" : "BO1"),
        status,
        time: getMatchTime(m),
      });
    }
  }

  return generated;
}

function getEventChampion(event: Event, teams: Team[]) {
  if (event.id === 2) {
    return teams.find((team) => team.name === "FURIA");
  }

  return undefined;
}

function sortPlayoffStates(states: { team: Team; wins: number; losses: number; qualified: boolean; eliminated: boolean; seed: number }[], champion?: Team) {
  return [...states].sort((a, b) => {
    if (champion && a.team.name === champion.name) return -1;
    if (champion && b.team.name === champion.name) return 1;
    return b.wins - a.wins || a.losses - b.losses || a.seed - b.seed;
  });
}

function getMatchWinner(match: Match) {
  if (match.status !== "finished" || typeof match.score1 !== "number" || typeof match.score2 !== "number" || match.score1 === match.score2) {
    return undefined;
  }

  return match.score1 > match.score2 ? match.team1 : match.team2;
}

function getLiveScore(t1: Team, t2: Team, actualMatches: Match[]) {
  const actual = actualMatches.find(am =>
    (am.team1.name === t1.name && am.team2.name === t2.name) ||
    (am.team1.name === t2.name && am.team2.name === t1.name)
  );

  if (actual?.status === "live" && typeof actual.score1 === "number" && typeof actual.score2 === "number") {
    return actual.team1.name === t1.name
      ? { score1: actual.score1, score2: actual.score2 }
      : { score1: actual.score2, score2: actual.score1 };
  }

  return { score1: 0, score2: 0 };
}

function buildSwissBracket(schedule: EventMatch[], teamCount: number): SwissRound[] {
  const swissMatches = schedule.filter((m) => m.stage === "Swiss");
  
  const getRoundMatches = (roundName: string) => swissMatches.filter(m => m.round === roundName);
  const toBM = (m: EventMatch | undefined, id: string, title: string) => toBracketMatch(m, id, title);

  const r1 = getRoundMatches("Round 1");
  const r2 = getRoundMatches("Round 2");
  const r3 = getRoundMatches("Round 3");
  const r4 = getRoundMatches("Round 4");
  const r5 = getRoundMatches("Round 5");

  const getTeamsWithRecord = (targetWins: number, targetLosses: number): Team[] => {
    const teamRecords = new Map<string, { team: Team; wins: number; losses: number }>();
    
    swissMatches.forEach(match => {
      if (match.status !== "finished") return;
      
      const team1Name = match.team1.name;
      const team2Name = match.team2.name;
      
      if (team1Name === "TBD" || team2Name === "TBD") return;
      
      if (!teamRecords.has(team1Name)) {
        teamRecords.set(team1Name, { team: match.team1, wins: 0, losses: 0 });
      }
      if (!teamRecords.has(team2Name)) {
        teamRecords.set(team2Name, { team: match.team2, wins: 0, losses: 0 });
      }
      
      const t1Record = teamRecords.get(team1Name)!;
      const t2Record = teamRecords.get(team2Name)!;
      
      const team1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
      
      if (team1Won) {
        t1Record.wins++;
        t2Record.losses++;
      } else {
        t2Record.wins++;
        t1Record.losses++;
      }
    });
    
    // Filter teams with exact record
    return Array.from(teamRecords.values())
      .filter(record => record.wins === targetWins && record.losses === targetLosses)
      .map(record => record.team);
  };

  const hasKnownTeam = (match: EventMatch) => match.team1.name !== "TBD" || match.team2.name !== "TBD";

  const projectRecordPool = (
    matches: EventMatch[],
    targetWins: number,
    targetLosses: number,
    slots: number,
    idPrefix: string,
  ) => {
    if (matches.some(hasKnownTeam)) {
      return matches.map((m, i) => toBM(m, `${idPrefix}-${i}`, "Match"));
    }

    const teams = getTeamsWithRecord(targetWins, targetLosses);
    return Array.from({ length: slots }, (_, i) => {
      const team1 = teams[i * 2];
      const team2 = teams[i * 2 + 1];
      if (team1 || team2) {
        return {
          ...toBracketMatch(undefined, `${idPrefix}-${i}`, "Match", team1, team2),
          time: "vs",
        };
      }

      return toBM(matches[i], `${idPrefix}-${i}`, "Match");
    });
  };

  const round2Pools = teamCount >= 16 ? [
    { record: "1:0", status: "matches" as const, matches: projectRecordPool(r2.slice(0, 4), 1, 0, 4, "r2h") },
    { record: "0:1", status: "matches" as const, matches: projectRecordPool(r2.slice(4, 8), 0, 1, 4, "r2l") },
  ] : teamCount >= 12 ? [
    { record: "1:0", status: "matches" as const, matches: projectRecordPool(r2.slice(0, 3), 1, 0, 3, "r2h") },
    { record: "0:1", status: "matches" as const, matches: projectRecordPool(r2.slice(3, 6), 0, 1, 3, "r2l") },
  ] : [
    { record: "1:0", status: "matches" as const, matches: projectRecordPool(r2.slice(0, 2), 1, 0, 2, "r2h") },
    { record: "0:1", status: "matches" as const, matches: projectRecordPool(r2.slice(2, 4), 0, 1, 2, "r2l") },
  ];

  const round3Pools = teamCount >= 16 ? [
    { record: "2:0", status: "matches" as const, matches: projectRecordPool(r3.slice(0, 2), 2, 0, 2, "r3h") },
    { record: "1:1", status: "matches" as const, matches: projectRecordPool(r3.slice(2, 6), 1, 1, 4, "r3m") },
    { record: "0:2", status: "matches" as const, matches: projectRecordPool(r3.slice(6, 8), 0, 2, 2, "r3l") },
  ] : teamCount >= 12 ? [
    { record: "2:0", status: "matches" as const, matches: projectRecordPool(r3.slice(0, 1), 2, 0, 1, "r3h") },
    { record: "1:1", status: "matches" as const, matches: projectRecordPool(r3.slice(1, 5), 1, 1, 4, "r3m") },
    { record: "0:2", status: "matches" as const, matches: projectRecordPool(r3.slice(5, 6), 0, 2, 1, "r3l") },
  ] : [
    { record: "2:0", status: "matches" as const, matches: projectRecordPool(r3.slice(0, 1), 2, 0, 1, "r3h") },
    { record: "1:1", status: "matches" as const, matches: projectRecordPool(r3.slice(1, 3), 1, 1, 2, "r3m") },
    { record: "0:2", status: "matches" as const, matches: projectRecordPool(r3.slice(3, 4), 0, 2, 1, "r3l") },
  ];

  const round4Pools = teamCount >= 16 ? [
    { record: "3:0", status: "advanced" as const, matches: [], teams: getTeamsWithRecord(3, 0) },
    { record: "2:1", status: "matches" as const, matches: r4.slice(0, 3).map((m, i) => toBM(m, `r4h-${i}`, "Match")) },
    { record: "1:2", status: "matches" as const, matches: r4.slice(3, 6).map((m, i) => toBM(m, `r4l-${i}`, "Match")) },
    { record: "0:3", status: "eliminated" as const, matches: [], teams: getTeamsWithRecord(0, 3) },
  ] : teamCount >= 12 ? [
    { record: "3:0", status: "advanced" as const, matches: [], teams: getTeamsWithRecord(3, 0) },
    { record: "2:1", status: "matches" as const, matches: r4.slice(0, 2).map((m, i) => toBM(m, `r4h-${i}`, "Match")) },
    { record: "1:2", status: "matches" as const, matches: r4.slice(2, 4).map((m, i) => toBM(m, `r4l-${i}`, "Match")) },
    { record: "0:3", status: "eliminated" as const, matches: [], teams: getTeamsWithRecord(0, 3) },
  ] : [
    { record: "3:0", status: "advanced" as const, matches: [], teams: getTeamsWithRecord(3, 0) },
    { record: "2:1", status: "matches" as const, matches: r4.slice(0, 1).map((m, i) => toBM(m, `r4h-${i}`, "Match")) },
    { record: "1:2", status: "matches" as const, matches: r4.slice(1, 2).map((m, i) => toBM(m, `r4l-${i}`, "Match")) },
    { record: "0:3", status: "eliminated" as const, matches: [], teams: getTeamsWithRecord(0, 3) },
  ];

  return [
    {
      title: "Round 1",
      pools: [{ record: "0:0", status: "matches", matches: r1.map((m, i) => toBM(m, `r1-${i}`, "Match")) }],
    },
    {
      title: "Round 2",
      pools: round2Pools,
    },
    {
      title: "Round 3",
      pools: round3Pools,
    },
    {
      title: "Round 4",
      pools: round4Pools,
    },
    {
      title: "Round 5",
      pools: teamCount >= 16 ? [
        { record: "3:1", status: "advanced", matches: [], teams: getTeamsWithRecord(3, 1) },
        { record: "2:2", status: "matches", matches: r5.map((m, i) => toBM(m, `r5-${i}`, "Match")) },
        { record: "1:3", status: "eliminated", matches: [], teams: getTeamsWithRecord(1, 3) },
      ] : [
        { record: "3:1", status: "advanced", matches: [], teams: getTeamsWithRecord(3, 1) },
        { record: "2:2", status: "matches", matches: r5.map((m, i) => toBM(m, `r5-${i}`, "Match")) },
        { record: "1:3", status: "eliminated", matches: [], teams: getTeamsWithRecord(1, 3) },
      ],
    },
  ];
}

function getCurrentMapScore(match: Match) {
  if (match.mapVeto && match.mapVeto.length > 0) {
    const scoredMap = [...match.mapVeto].reverse().find((item) => typeof item.score1 === "number" && typeof item.score2 === "number");
    if (scoredMap) {
      return { score1: scoredMap.score1, score2: scoredMap.score2 };
    }
  }

  if (match.status === "live" && typeof match.score1 === "number" && typeof match.score2 === "number") {
    return { score1: match.score1, score2: match.score2 };
  }

  if (match.status === "finished" && typeof match.score1 === "number" && typeof match.score2 === "number") {
    const team1Won = match.score1 > match.score2;
    const closeLoss = 9 + (match.id % 4);
    return team1Won ? { score1: 13, score2: closeLoss } : { score1: closeLoss, score2: 13 };
  }

  return undefined;
}

function getMapsWon(match: Match) {
  if (match.status === "upcoming") {
    return undefined;
  }

  if (match.status === "live") {
    const scoredMaps = match.mapVeto?.filter((item) => typeof item.score1 === "number" && typeof item.score2 === "number") ?? [];
    return scoredMaps.reduce(
      (total, map) => ({
        score1: total.score1 + ((map.score1 ?? 0) > (map.score2 ?? 0) ? 1 : 0),
        score2: total.score2 + ((map.score2 ?? 0) > (map.score1 ?? 0) ? 1 : 0),
      }),
      { score1: 0, score2: 0 },
    );
  }

  if (typeof match.score1 === "number" && typeof match.score2 === "number") {
    return { score1: match.score1, score2: match.score2 };
  }

  return undefined;
}

function toBracketMatch(match: EventMatch | undefined, id: string, title: string, team1?: Team, team2?: Team, seed1?: number, seed2?: number, source1?: string, source2?: string): BracketMatch {
  const currentMapScore = match ? getCurrentMapScore(match) : undefined;
  const mapsWon = match ? getMapsWon(match) : undefined;
  const winner = match?.status === "finished" && typeof match.score1 === "number" && typeof match.score2 === "number" && match.score1 !== match.score2
    ? match.score1 > match.score2 ? (team1 ?? match.team1) : (team2 ?? match.team2)
    : undefined;

  return {
    id: match?.id.toString() ?? id,
    title,
    time: match?.time ?? "TBD",
    format: match?.format ?? "BO3",
    status: match?.status ?? "pending",
    team1: { team: team1 ?? match?.team1, seed: seed1, score: mapsWon?.score1, currentScore: currentMapScore?.score1, status: match?.status, source: source1 },
    team2: { team: team2 ?? match?.team2, seed: seed2, score: mapsWon?.score2, currentScore: currentMapScore?.score2, status: match?.status, source: source2 },
    winner,
  };
}

function buildSwissRows(teams: Team[], schedule: EventMatch[]) {
  return teams.map((team, index) => {
    const teamMatches = schedule.filter((match) => 
      match.stage === "Swiss" && 
      (match.team1.name === team.name || match.team2.name === team.name)
    );
    
    const finished = teamMatches.filter(m => m.status === "finished");
    const wins = finished.filter((match) => {
      const teamScore = match.team1.name === team.name ? match.score1 : match.score2;
      const opponentScore = match.team1.name === team.name ? match.score2 : match.score1;
      return (teamScore ?? 0) > (opponentScore ?? 0);
    }).length;

    // Map matches to rounds 1-5
    const history = ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"].map(roundName => {
      const match = teamMatches.find(m => m.round === roundName);
      if (!match) return null;
      const isTeam1 = match.team1.name === team.name;
      const opponent = isTeam1 ? match.team2 : match.team1;
      const score = isTeam1 ? `${match.score1}-${match.score2}` : `${match.score2}-${match.score1}`;
      const won = match.status === "finished" ? (isTeam1 ? (match.score1 ?? 0) > (match.score2 ?? 0) : (match.score2 ?? 0) > (match.score1 ?? 0)) : undefined;
      return { opponent, score, won, status: match.status, id: match.id };
    });

    return { team, seed: index + 1, wins, losses: finished.length - wins, history };
  }).sort((a, b) => b.wins - a.wins || a.losses - b.losses || a.seed - b.seed);
}

function buildPlayoffBracket(schedule: EventMatch[]) {
  return ["Quarterfinal", "Semifinal", "Final"]
    .map((roundName) => {
      const matches = schedule.filter((match) => match.round === roundName && match.stage !== "Swiss");
      return {
        title: roundName === "Final" ? "Grand Final" : `${roundName}s`,
        matches,
      };
    })
    .filter((round) => round.matches.length > 0);
}

function buildStageSummary(schedule: EventMatch[]) {
  const counts = groupBy(schedule, "stage");
  return [
    { name: "Swiss Stage", matches: schedule.filter(m => m.stage === "Swiss").length, description: "Teams compete in a Swiss system bracket to qualify for playoffs." },
    { name: "Playoffs", matches: counts.Playoffs?.length ?? 0, description: "Single-elimination bracket with quarterfinals and semifinals." },
    { name: "Grand Final", matches: counts["Grand Final"]?.length ?? 0, description: "Best-of-five title series for the trophy and top prize." },
  ];
}

function getStage(index: number, teamCount: number) {
  const swissRounds = getSwissRoundSizes(teamCount);
  const playoffRounds = teamCount >= 16 ? [4, 2, 1] : [2, 1];
  const rounds = [...swissRounds, ...playoffRounds];
  const stageLabels = [
    ...swissRounds.map((_, roundIndex) => ({ stage: "Swiss", round: `Round ${roundIndex + 1}` })),
    ...(teamCount >= 16
      ? [
          { stage: "Playoffs", round: "Quarterfinal" },
          { stage: "Playoffs", round: "Semifinal" },
          { stage: "Grand Final", round: "Final" },
        ]
      : [
          { stage: "Playoffs", round: "Semifinal" },
          { stage: "Grand Final", round: "Final" },
        ]),
  ];

  let currentSum = 0;
  for (let i = 0; i < rounds.length; i++) {
    currentSum += rounds[i];
    if (index < currentSum) {
      return stageLabels[i];
    }
  }
  return stageLabels[stageLabels.length - 1];
}

function getMatchTime(index: number) {
  return ["10:00", "13:00", "16:00", "19:00", "22:00"][index % 5];
}

function getEventDay(event: Event, index: number, teamCount: number) {
  const firstDate = event.dates.split(/-|–/)[0]?.trim() || "Event day";
  const swissRounds = getSwissRoundSizes(teamCount);
  const playoffRounds = teamCount >= 16 ? [4, 2, 1] : [2, 1];
  const rounds = [...swissRounds, ...playoffRounds];
  
  let currentSum = 0;
  let day = 1;
  for (let i = 0; i < rounds.length; i++) {
    currentSum += rounds[i];
    if (index < currentSum) {
      day = i + 1;
      break;
    }
    if (i === rounds.length - 1) day = rounds.length;
  }
  
  return `${firstDate} · Day ${day}`;
}

function sameEvent(matchEvent: string, eventName: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/\b20\d{2}\b/g, "").replace(/[^a-z0-9]/g, "");
  return normalize(matchEvent) === normalize(eventName);
}

function groupBy<T, K extends keyof T>(items: T[], key: K) {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const group = String(item[key]);
    acc[group] = acc[group] ?? [];
    acc[group].push(item);
    return acc;
  }, {});
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
