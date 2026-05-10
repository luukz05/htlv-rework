import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
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
  subtitle: string;
  pools: {
    record: string;
    tone: "neutral" | "high" | "mid" | "low";
    matches: BracketMatch[];
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
      <>
        <Header />
        <main className="mx-auto max-w-[800px] px-5 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Event not found</h1>
          <Link href="/events" className="text-blue-light">Back to Events</Link>
        </main>
        <Footer />
      </>
    );
  }

  const eventTeams = teams.slice(0, event.teams);
  const schedule = buildEventSchedule(event, eventTeams, matches);
  const scheduleByDay = groupBy(schedule, "day");
  const stageSummary = buildStageSummary(schedule);
  const swissBracket = buildSwissBracket(schedule);
  const swissRows = buildSwissRows(eventTeams, schedule);
  const liveOrNext = schedule.find((match) => match.status === "live") ?? schedule.find((match) => match.status === "upcoming");
  const completedMatches = schedule.filter((match) => match.status === "finished").length;

  return (
    <>
      <Header />
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
                <Link href={`/matches/${liveOrNext.id}`} className="min-w-[280px] rounded-lg border border-border bg-bg-card/90 p-4 transition hover:border-border-hover hover:bg-bg-card">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">{liveOrNext.status === "live" ? "Live now" : "Next match"}</p>
                  <div className="flex items-center justify-between gap-3">
                    <TeamChip team={liveOrNext.team1} />
                    <span className="text-xs font-bold text-text-muted">vs</span>
                    <TeamChip team={liveOrNext.team2} align="right" />
                  </div>
                  <p className="mt-2 text-xs text-text-muted">{liveOrNext.round} · {liveOrNext.format} · {liveOrNext.day} {liveOrNext.time ? `at ${liveOrNext.time}` : ""}</p>
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

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <section className="rounded-lg border border-border bg-bg-card p-5 card-glow">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Swiss Bracket</h2>
                  <p className="text-xs text-text-muted">Record pools show how teams move toward qualification or elimination through the stage.</p>
                </div>
                <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
                  <span className="rounded bg-green/15 px-2 py-1 text-green">Advance</span>
                  <span className="rounded bg-yellow/15 px-2 py-1 text-yellow">Decider</span>
                  <span className="rounded bg-red/15 px-2 py-1 text-red">Eliminate</span>
                </div>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[920px]">
                  <div className="grid grid-cols-5 gap-2">
                    {swissBracket.map((round) => (
                      <div key={round.title} className="space-y-3">
                        <div className="rounded-lg border border-border bg-bg-surface px-2.5 py-2">
                          <h3 className="text-sm font-bold">{round.title}</h3>
                          <p className="text-[11px] text-text-muted">{round.subtitle}</p>
                        </div>
                        <div className="space-y-3">
                          {round.pools.map((pool) => (
                            <div key={`${round.title}-${pool.record}`} className={`rounded-lg border p-2 ${getSwissPoolClass(pool.tone)}`}>
                              <div className="mb-2 flex items-center justify-between gap-1.5">
                                <span className="rounded bg-bg-body px-2 py-0.5 text-[10px] font-black text-text-secondary">{pool.record}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{getPoolLabel(pool.record)}</span>
                              </div>
                              <div className="space-y-2">
                                {pool.matches.map((match) => (
                                  <SwissMatchCard key={match.id} match={match} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

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

          <aside className="space-y-6">
            <section className="rounded-lg border border-border bg-bg-card p-4 card-glow">
              <h2 className="mb-4 text-sm font-bold">Swiss Standings</h2>
              <div className="space-y-2">
                {swissRows.map((row) => (
                  <div key={row.team.name} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-lg bg-bg-surface px-3 py-2">
                    <span className="text-xs font-black text-text-muted">#{row.seed}</span>
                    <div className="flex min-w-0 items-center gap-2">
                      <TeamLogo src={row.team.logo} name={row.team.name} size={20} />
                      <span className="truncate text-sm font-semibold">{row.team.name}</span>
                    </div>
                    <span className={`rounded px-2 py-0.5 text-xs font-bold ${row.wins >= row.losses ? "bg-green/15 text-green" : "bg-red/15 text-red"}`}>{row.wins}-{row.losses}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border bg-bg-card p-4 card-glow">
              <h2 className="mb-4 text-sm font-bold">Participating Teams ({event.teams})</h2>
              <div className="grid grid-cols-1 gap-2">
                {eventTeams.map((team, index) => (
                  <div key={team.name} className="flex items-center gap-3 rounded-lg bg-bg-surface px-3 py-2">
                    <span className="w-5 text-xs font-bold text-text-muted">{index + 1}</span>
                    <TeamLogo src={team.logo} name={team.name} size={22} />
                    <span className="min-w-0 truncate text-sm font-semibold">{team.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
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

function TeamChip({ team, align = "left" }: { team: Team; align?: "left" | "right" }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <TeamLogo src={team.logo} name={team.name} size={24} />
      <span className="truncate text-sm font-bold">{team.abbr}</span>
    </div>
  );
}

function SwissMatchCard({ match }: { match: BracketMatch }) {
  return (
    <Link href={match.status === "pending" ? "#" : `/matches/${match.id.replace(/\D/g, "") || "1"}`} className="block rounded border border-border bg-bg-card px-2 py-2 transition hover:border-border-hover hover:bg-bg-card-hover">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="truncate text-[10px] font-bold text-text-muted">{match.title}</span>
        <span className="text-[10px] text-text-muted">{match.time}</span>
      </div>
      <SwissTeamLine slot={match.team1} isWinner={match.winner?.name === match.team1.team?.name} />
      <SwissTeamLine slot={match.team2} isWinner={match.winner?.name === match.team2.team?.name} />
    </Link>
  );
}

function SwissTeamLine({ slot, isWinner }: { slot: BracketSlot; isWinner: boolean }) {
  const mapScore = slot.score;
  const currentScore = slot.currentScore;
  const status = slot.status;

  return (
    <div className="mt-1 grid grid-cols-[1fr_auto] items-center gap-2">
      <div className="flex min-w-0 items-center gap-1.5">
        {slot.team ? <TeamLogo src={slot.team.logo} name={slot.team.name} size={16} /> : <span className="h-4 w-4 rounded-full bg-border" />}
        <span className={`truncate text-[11px] font-semibold ${isWinner ? "text-green" : "text-text-secondary"}`}>{slot.team?.abbr ?? slot.source}</span>
      </div>
      <span className="text-[11px] font-black tabular-nums">
        {status === "live" && typeof currentScore === "number" ? (
          <>
            <span className={isWinner ? "text-green" : "text-text-primary"}>{currentScore}</span>
            <span className={isWinner ? "text-green" : "text-text-muted"}>({mapScore ?? 0})</span>
          </>
        ) : status === "finished" && typeof mapScore === "number" ? (
          <span className={isWinner ? "text-green" : "text-text-primary"}>{mapScore}</span>
        ) : (
          <span className="text-text-muted">-</span>
        )}
      </span>
    </div>
  );
}

function ScheduleRow({ match }: { match: EventMatch }) {
  const currentMapScore = getCurrentMapScore(match);

  return (
    <Link href={`/matches/${match.id}`} className="grid grid-cols-[58px_1fr] gap-3 border-b border-border px-3 py-3 transition last:border-b-0 hover:bg-bg-card-hover md:grid-cols-[70px_130px_1fr_90px_95px] md:items-center">
      <div className="text-xs font-bold text-text-secondary">{match.time ?? "TBD"}</div>
      <div className="hidden text-xs text-text-muted md:block">{match.stage}</div>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <TeamChip team={match.team1} />
          <div className="shrink-0 text-center">
            {typeof match.score1 === "number" && typeof match.score2 === "number" ? (
              <div className="text-sm font-black tabular-nums">
                <span>{match.score1} : {match.score2}</span>
                {currentMapScore && <span className="ml-1 text-xs text-text-secondary">({currentMapScore.score1}:{currentMapScore.score2})</span>}
              </div>
            ) : (
              <span className="text-xs font-bold text-text-muted">vs</span>
            )}
          </div>
          <TeamChip team={match.team2} align="right" />
        </div>
        <p className="mt-1 text-[11px] text-text-muted md:hidden">{match.stage} · {match.round}</p>
      </div>
      <div className="hidden text-xs text-text-muted md:block">{match.round}</div>
      <div className="hidden justify-self-end md:block"><StatusPill status={match.status} /></div>
    </Link>
  );
}

function StatusPill({ status }: { status: Match["status"] | "pending" }) {
  const className = status === "finished"
    ? "bg-green/15 text-green"
    : status === "live"
      ? "bg-red/15 text-red"
      : status === "upcoming"
        ? "bg-blue/15 text-blue-light"
        : "bg-text-muted/15 text-text-muted";

  return <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${className}`}>{status}</span>;
}

function buildEventSchedule(event: Event, teams: Team[], matches: Match[]): EventMatch[] {
  const directMatches = matches.filter((match) => sameEvent(match.event, event.name));
  const source = directMatches.length >= 6 ? directMatches : buildSyntheticMatches(event, teams, directMatches);

  return source.map((match, index) => {
    const stage = getStage(index, source.length);
    return {
      ...match,
      stage: stage.stage,
      round: stage.round,
      day: getEventDay(event, index),
      matchNo: index + 1,
      time: match.time ?? getMatchTime(index),
      date: match.date ?? getEventDay(event, index),
    };
  });
}

function buildSyntheticMatches(event: Event, teams: Team[], directMatches: Match[]): Match[] {
  const used = new Set(directMatches.map((match) => match.id));
  const generated: Match[] = [...directMatches];
  const teamCount = Math.max(teams.length, 2);
  const total = teamCount >= 16 ? 31 : teamCount >= 12 ? 23 : 15;

  for (let index = 0; generated.length < total; index += 1) {
    const team1 = teams[index % teamCount];
    const team2 = teams[(index * 5 + 3) % teamCount] === team1 ? teams[(index + 1) % teamCount] : teams[(index * 5 + 3) % teamCount];
    const id = 10000 + event.id * 100 + index;
    if (used.has(id)) continue;

    const team1Wins = (index + event.id) % 3 !== 0;
    const score1 = team1Wins ? 2 : 1;
    const score2 = team1Wins ? 0 : 2;
    const initialStatus = index < Math.floor(total * (event.progress / 100)) ? "finished" : index === Math.floor(total * (event.progress / 100)) && event.progress > 0 ? "live" : "upcoming";
    const status = initialStatus === "live" && Math.max(score1, score2) >= 2 ? "finished" : initialStatus;

    generated.push({
      id,
      team1,
      team2,
      score1: status === "upcoming" ? undefined : score1,
      score2: status === "upcoming" ? undefined : score2,
      event: event.name,
      format: index > total - 2 ? "BO5" : "BO3",
      status,
      time: getMatchTime(index),
      date: getEventDay(event, index),
    });
  }

  return generated;
}

function buildSwissBracket(schedule: EventMatch[]): SwissRound[] {
  const swissMatches = schedule.slice(0, 24);
  const pair = (index: number, title: string) => (
    toBracketMatch(swissMatches[index], `swiss-${index}`, title)
  );

  return [
    {
      title: "Round 1",
      subtitle: "All teams start 0-0",
      pools: [{
        record: "0-0",
        tone: "neutral",
        matches: [0, 1, 2, 3].map((offset) => pair(offset, `Opening match ${offset + 1}`)),
      }],
    },
    {
      title: "Round 2",
      subtitle: "Winners and losers split",
      pools: [
        { record: "1-0", tone: "high", matches: [0, 1].map((offset) => pair(4 + offset, `High match ${offset + 1}`)) },
        { record: "0-1", tone: "low", matches: [0, 1].map((offset) => pair(6 + offset, `Low match ${offset + 1}`)) },
      ],
    },
    {
      title: "Round 3",
      subtitle: "First advance and elimination games",
      pools: [
        { record: "2-0", tone: "high", matches: [pair(8, "Advance match")] },
        { record: "1-1", tone: "mid", matches: [0, 1].map((offset) => pair(9 + offset, `Mid match ${offset + 1}`)) },
        { record: "0-2", tone: "low", matches: [pair(11, "Elimination match")] },
      ],
    },
    {
      title: "Round 4",
      subtitle: "Qualification pressure",
      pools: [
        { record: "2-1", tone: "high", matches: [0, 1].map((offset) => pair(12 + offset, `Qualification ${offset + 1}`)) },
        { record: "1-2", tone: "low", matches: [0, 1].map((offset) => pair(14 + offset, `Survival ${offset + 1}`)) },
      ],
    },
    {
      title: "Round 5",
      subtitle: "Final deciders",
      pools: [{
        record: "2-2",
        tone: "mid",
        matches: [0, 1, 2].map((offset) => pair(16 + offset, `Decider ${offset + 1}`)),
      }],
    },
  ];
}

function getSwissPoolClass(tone: SwissRound["pools"][number]["tone"]) {
  if (tone === "high") return "border-green/25 bg-green/5";
  if (tone === "mid") return "border-yellow/25 bg-yellow/5";
  if (tone === "low") return "border-red/25 bg-red/5";
  return "border-border bg-bg-surface";
}

function getPoolLabel(record: string) {
  if (record === "2-0" || record === "2-1") return "advance lane";
  if (record === "0-2" || record === "1-2") return "elimination lane";
  if (record === "2-2") return "decider lane";
  return "pool";
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
  const winner = match && typeof match.score1 === "number" && typeof match.score2 === "number"
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
    const finished = schedule.filter((match) => match.status === "finished" && (match.team1.name === team.name || match.team2.name === team.name));
    const wins = finished.filter((match) => {
      const teamScore = match.team1.name === team.name ? match.score1 : match.score2;
      const opponentScore = match.team1.name === team.name ? match.score2 : match.score1;
      return (teamScore ?? 0) > (opponentScore ?? 0);
    }).length;
    return { team, seed: index + 1, wins, losses: finished.length - wins };
  }).sort((a, b) => b.wins - a.wins || a.losses - b.losses || a.seed - b.seed);
}

function buildStageSummary(schedule: EventMatch[]) {
  const counts = groupBy(schedule, "stage");
  return [
    { name: "Opening Swiss", matches: counts["Opening Swiss"]?.length ?? 0, description: "Initial seeded pairings establish early 1-0 and 0-1 pools." },
    { name: "Swiss Advancement", matches: counts["Swiss Advancement"]?.length ?? 0, description: "Teams with matching records play for playoff qualification or survival." },
    { name: "Playoffs", matches: counts.Playoffs?.length ?? 0, description: "Single-elimination bracket with quarterfinals and semifinals." },
    { name: "Grand Final", matches: counts["Grand Final"]?.length ?? 0, description: "Best-of-five title series for the trophy and top prize." },
  ];
}

function getStage(index: number, total: number) {
  if (index >= total - 1) return { stage: "Grand Final", round: "Final" };
  if (index >= total - 7) return { stage: "Playoffs", round: index >= total - 3 ? "Semifinal" : "Quarterfinal" };
  if (index >= Math.floor(total * 0.45)) return { stage: "Swiss Advancement", round: `Round ${Math.floor(index / 4) + 1}` };
  return { stage: "Opening Swiss", round: `Round ${Math.floor(index / 4) + 1}` };
}

function getMatchTime(index: number) {
  return ["12:00", "14:30", "17:00", "19:30"][index % 4];
}

function getEventDay(event: Event, index: number) {
  const firstDate = event.dates.split(/-|–/)[0]?.trim() || "Event day";
  return `${firstDate} · Day ${Math.floor(index / 4) + 1}`;
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
