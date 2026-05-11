import TeamLogo from "@/components/TeamLogo";
import CountryFlag, { CountryLabel } from "@/components/CountryFlag";
import Link from "next/link";
import type { ReactNode } from "react";
import { api } from "@/services/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teamProfiles = await api.teams();
  const team = teamProfiles.find((t) => t.id === id);

  return {
    title: team
      ? `${team.name} - World #${team.worldRanking} - ${team.overallWinRate}% win rate`
      : "Team not found",
  };
}

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { teamProfiles } = await resolvePageData({
    teamProfiles: api.teams(),
  });

  const { id } = await params;
  const team = teamProfiles.find((t) => t.id === id);

  if (!team) {
    notFound();
  }

  const winCount = team.last10Results.filter((r) => r === "W").length;

  return (
    <>
      {/* Hero Banner */}
      <div
        className="border-b border-border"
        style={{
          background: `linear-gradient(to bottom, ${team.color}12, var(--color-bg-body))`,
        }}
      >
        <div className="mx-auto max-w-[1380px] px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary">
              Home
            </Link>
            <span className="mx-2">&rsaquo;</span>
            <Link href="/rankings" className="hover:text-text-secondary">
              Rankings
            </Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-text-primary">{team.name}</span>
          </div>

          {/* Hero */}
  {/* Background team logo */}
 

  {/* Hero gradient */}
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      background: `linear-gradient(90deg, ${team.color}1f, transparent 38%, ${team.color}14), linear-gradient(to top, var(--color-bg-card), transparent 44%)`,
    }}
  />

  {/* Team header */}
  <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div className="flex items-start gap-4">
      <TeamLogo src={team.logo} name={team.name} size={64} />

      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-black">{team.name}</h1>

          <span className="rounded-md bg-blue/15 px-2 py-0.5 text-xs font-bold text-blue-light">
            {team.region}
          </span>

          <span className="rounded-md bg-yellow/15 px-2 py-0.5 text-xs font-bold text-yellow">
            World #{team.worldRanking}
          </span>
        </div>

        <p className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted">
          <CountryLabel countryCode={team.country} preferredFlag={team.countryFlag} />
          <span>&middot; Est. {team.founded}</span>
          <span>&middot; {team.roster.length} active players</span>
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 rounded-lg border border-border bg-bg-body/50 px-3 py-2 text-xs font-bold text-text-secondary">
      <span className="text-text-muted">Coach</span>
      <span>{team.coach.nickname}</span>
      <CountryFlag
        countryCode={team.coach.country}
        preferredFlag={team.coach.countryFlag}
        className="text-xs"
      />
    </div>
  </div>

  {/* Player photos */}
  <div className="relative z-10 -mt-20 flex h-[200px] items-end justify-center overflow-hidden px-1 md:mt-auto md:h-[350px] md:justify-center md:overflow-visible">
     <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.09] md:justify-end md:opacity-[0.12]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={team.logo || "/images/team-default.png"}
      alt=""
      aria-hidden="true"
      className="h-[112%] w-[112%] object-contain grayscale brightness-150 contrast-125 md:mr-10 md:h-[150%] md:w-[56%]"
    />
  </div>
    {team.roster.map((player) => {
      const playerImage = (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={player.image || "/images/player-default.png"}
          alt={player.nickname}
          className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]"
        />
      );

      return player.playerId > 0 ? (
        <Link
          key={player.nickname}
          href={`/rankings/players/${player.playerId}`}
          className="-mx-0.5 flex h-full min-w-0 flex-1 items-end transition-transform duration-300 hover:-translate-y-2 md:-mx-5 md:min-w-0 md:flex-1"
          title={player.nickname}
        >
          {playerImage}
        </Link>
      ) : (
        <div
          key={player.nickname}
          className="-mx-0.5 flex h-full min-w-0 flex-1 items-end md:-mx-5 md:min-w-0 md:flex-1"
          title={player.nickname}
        >
          {playerImage}
        </div>
      );
    })}
  </div>
          {/* Player info below hero */}
          <div
  className="relative z-20 grid grid-cols-5 overflow-hidden rounded-xl border-x border-b border-border"
  style={{ backgroundColor: "#1b2333" }}
>
  {team.roster.map((player) => {
    const playerInfo = (
      <div
        className="h-full border-r border-border px-1 py-1.5 text-center transition-all last:border-r-0 sm:px-3 sm:py-3"
        style={{ backgroundColor: "#1b2333" }}
      >
        <p className="text-[10px] font-black text-text-primary whitespace-nowrap sm:text-sm">
          {player.nickname}
        </p>

        <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-text-muted sm:gap-1.5 sm:text-xs">
          <CountryFlag
            countryCode={player.country}
            preferredFlag={player.countryFlag}
            className="text-xs"
          />
          <span className="hidden whitespace-nowrap sm:inline">{player.country}</span>
        </p>

        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-light sm:mt-1 sm:text-[11px]">
          {player.role}
        </p>
      </div>
    );

    return player.playerId > 0 ? (
      <Link
        key={player.nickname}
        href={`/rankings/players/${player.playerId}`}
        className="block h-full"
        style={{ backgroundColor: "#1b2333" }}
      >
        {playerInfo}
      </Link>
    ) : (
      <div
        key={player.nickname}
        className="h-full"
        style={{ backgroundColor: "#1b2333" }}
      >
        {playerInfo}
      </div>
    );
  })}
</div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-[1380px] px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left column */}
          <div className="space-y-8">
            {/* Current Form */}
            <section className="card-glow animate-fade-in-up delay-1 rounded-xl border border-border bg-bg-card p-5">
              <h2 className="mb-4 text-base font-bold">Current Form</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {team.last10Results.map((r, i) => (
                    <div
                      key={i}
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${
                        r === "W" ? "bg-green/20 text-green" : "bg-red/20 text-red"
                      }`}
                    >
                      {r}
                    </div>
                  ))}
                </div>

                <span className="ml-2 text-sm font-bold text-text-secondary">
                  Win Rate:{" "}
                  <span
                    className={
                      winCount >= 6 ? "text-green" : winCount >= 4 ? "text-yellow" : "text-red"
                    }
                  >
                    {winCount * 10}%
                  </span>
                </span>
              </div>
            </section>

            {/* Map Pool */}
            <section className="card-glow animate-fade-in-up delay-2 overflow-hidden rounded-xl border border-border bg-bg-card">
              <div className="border-b border-border px-5 py-3">
                <h2 className="text-base font-bold">Map Pool</h2>
              </div>

              <div className="grid grid-cols-[1fr_55px_80px_60px_60px] gap-2 border-b border-border px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                <span>Map</span>
                <span className="text-right">Played</span>
                <span className="text-right">Win Rate</span>
                <span className="text-right">CT%</span>
                <span className="text-right">T%</span>
              </div>

              <div className="divide-y divide-border">
                {team.mapStats.map((m) => (
                  <div
                    key={m.map}
                    className="grid grid-cols-[1fr_55px_80px_60px_60px] items-center gap-2 px-5 py-3 transition-all hover:bg-bg-card-hover"
                  >
                    <span className="text-sm font-semibold">{m.map}</span>
                    <span className="text-right text-xs tabular-nums text-text-muted">
                      {m.played}
                    </span>

                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${m.winRate}%`,
                            backgroundColor:
                              m.winRate >= 70
                                ? "#22c55e"
                                : m.winRate >= 60
                                  ? "#3b82f6"
                                  : "#eab308",
                          }}
                        />
                      </div>

                      <span className="text-xs tabular-nums text-text-secondary">
                        {m.winRate}%
                      </span>
                    </div>

                    <span className="text-right text-xs tabular-nums text-blue-light">
                      {m.ctWinRate}%
                    </span>

                    <span className="text-right text-xs tabular-nums text-orange">
                      {m.tWinRate}%
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Matches */}
            <section className="card-glow animate-fade-in-up delay-3 overflow-hidden rounded-xl border border-border bg-bg-card">
              <div className="border-b border-border px-5 py-3">
                <h2 className="text-base font-bold">Recent Matches</h2>
              </div>

              <div className="divide-y divide-border">
                {team.recentMatches.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-3 transition-all hover:bg-bg-card-hover"
                  >
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-bold ${
                        m.result === "W" ? "bg-green/15 text-green" : "bg-red/15 text-red"
                      }`}
                    >
                      {m.result}
                    </span>

                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="text-xs text-text-muted">vs</span>
                      <TeamLogo src={m.opponentLogo} name={m.opponent} size={18} />
                      <span className="truncate text-sm font-semibold">{m.opponent}</span>
                    </div>

                    <span className="text-sm font-bold tabular-nums">{m.score}</span>
                    <span className="hidden max-w-[140px] truncate text-xs text-text-muted sm:block">
                      {m.event}
                    </span>
                    <span className="hidden text-xs text-text-muted sm:block">{m.format}</span>
                    <span className="text-xs tabular-nums text-text-muted">{m.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            {team.achievements.length > 0 && (
              <section className="card-glow animate-fade-in-up overflow-hidden rounded-xl border border-border bg-bg-card">
                <div className="border-b border-border px-5 py-3">
                  <h2 className="flex items-center gap-2 text-base font-bold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#eab308">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                    Achievements
                  </h2>
                </div>

                <div className="divide-y divide-border">
                  {team.achievements.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-5 py-3 transition-all hover:bg-bg-card-hover"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          a.placement === "1st"
                            ? "bg-yellow/15 text-yellow"
                            : "bg-bg-body/50 text-text-secondary"
                        }`}
                      >
                        <span className="text-xs font-black">{a.placement}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{a.event}</p>
                        <p className="text-xs text-text-muted">{a.date}</p>
                      </div>

                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          a.tier === "S"
                            ? "bg-yellow/15 text-yellow"
                            : a.tier === "A"
                              ? "bg-blue/15 text-blue-light"
                              : "bg-bg-body/50 text-text-muted"
                        }`}
                      >
                        Tier {a.tier}
                      </span>

                      {a.prize && (
                        <span className="hidden text-xs font-bold text-green sm:block">
                          {a.prize}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Transfer History */}
            {team.transfers.length > 0 && (
              <section className="card-glow animate-fade-in-up overflow-hidden rounded-xl border border-border bg-bg-card">
                <div className="border-b border-border px-5 py-3">
                  <h2 className="text-base font-bold">Transfer History</h2>
                </div>

                <div className="divide-y divide-border">
                  {team.transfers.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-5 py-3 transition-all hover:bg-bg-card-hover"
                    >
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-bold ${
                          t.direction === "in" ? "bg-green/15 text-green" : "bg-red/15 text-red"
                        }`}
                      >
                        {t.direction === "in" ? (
                          <span className="flex items-center gap-1">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                            IN
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                            OUT
                          </span>
                        )}
                      </span>

                      <span className="flex-1 text-sm font-semibold">{t.player}</span>

                      <span className="text-xs text-text-muted">
                        {t.direction === "in" ? `from ${t.fromTeam}` : `to ${t.toTeam}`}
                      </span>

                      <span className="text-xs tabular-nums text-text-muted">{t.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Team Info card */}
            <section className="card-glow animate-fade-in-up overflow-hidden rounded-xl border border-border bg-bg-card">
              <div
                className="flex flex-col items-center border-b border-border px-4 py-5"
                style={{
                  background: `linear-gradient(to bottom, ${team.color}10, transparent)`,
                }}
              >
                <TeamLogo src={team.logo} name={team.name} size={64} />
                <h3 className="mt-3 text-lg font-bold">{team.name}</h3>
                <span className="text-xs text-text-muted">{team.shortname}</span>
              </div>

              <div className="space-y-2 p-4 text-xs">
                {(
                  [
                    ["Full Name", team.name],
                    ["Shortname", team.shortname],
                    ["Region", team.region],
                    [
                      "Country",
                      <CountryLabel
                        key="country"
                        countryCode={team.country}
                        preferredFlag={team.countryFlag}
                      />,
                    ],
                    ["Founded", team.founded],
                    [
                      "Coach",
                      <span key="coach" className="inline-flex items-center gap-1.5">
                        {team.coach.nickname}
                        <CountryFlag
                          countryCode={team.coach.country}
                          preferredFlag={team.coach.countryFlag}
                        />
                      </span>,
                    ],
                    ["World Ranking", `#${team.worldRanking}`],
                    ["Peak Ranking", `#${team.peakRanking} (${team.peakRankingDate})`],
                    ["Weeks in Top 5", team.weeksInTop5.toString()],
                    ["Weeks in Top 10", team.weeksInTop10.toString()],
                    ["Total Prize", team.totalPrizeEarnings],
                  ] as [string, ReactNode][]
                ).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-text-muted">{label}</span>
                    <span className="text-right font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Head-to-Head */}
            {team.headToHead.length > 0 && (
              <section className="card-glow animate-fade-in-up delay-1 overflow-hidden rounded-xl border border-border bg-bg-card">
                <div className="border-b border-border px-4 py-3">
                  <h3 className="text-sm font-bold">Head-to-Head</h3>
                </div>

                <div className="divide-y divide-border">
                  {team.headToHead.map((h, i) => {
                    const total = h.wins + h.losses;
                    const winPct = total > 0 ? (h.wins / total) * 100 : 50;

                    return (
                      <div key={i} className="px-4 py-3">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-xs text-text-muted">vs</span>
                          <TeamLogo src={h.opponentLogo} name={h.opponent} size={16} />
                          <span className="truncate text-xs font-semibold">{h.opponent}</span>

                          <span className="ml-auto text-xs font-bold tabular-nums">
                            <span className="text-green">{h.wins}</span>
                            <span className="mx-0.5 text-text-muted">-</span>
                            <span className="text-red">{h.losses}</span>
                          </span>
                        </div>

                        <div className="flex h-1.5 overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-l-full bg-green"
                            style={{ width: `${winPct}%` }}
                          />
                          <div
                            className="h-full rounded-r-full bg-red"
                            style={{ width: `${100 - winPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Back link */}
            <Link
              href="/rankings"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-3 text-sm font-semibold text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Rankings
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(
    Object.entries(promises).map(async ([key, promise]) => [key, await promise]),
  );

  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
