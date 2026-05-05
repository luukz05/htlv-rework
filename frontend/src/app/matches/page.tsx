import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { liveMatches, upcomingMatches } from "@/data/mock";
import { Match } from "@/data/mock";

function MatchRow({ match, index }: { match: Match; index: number }) {
  const isLive = match.status === "live";
  const hasScore = match.score1 !== undefined;
  const t1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
  const t2Won = (match.score2 ?? 0) > (match.score1 ?? 0);

  return (
    <Link
      href={`/matches/${match.id}`}
      className="block relative rounded-xl border border-border overflow-hidden transition-all hover:-translate-y-0.5 cursor-pointer card-glow animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.04}s`,
        background: `linear-gradient(90deg, ${match.team1.color}18 0%, #1a2332 30%, #1a2332 70%, ${match.team2.color}18 100%)`,
      }}
    >
      {/* Colored edge accents */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl" style={{ background: match.team1.color }} />
      <div className="absolute right-0 top-0 bottom-0 w-[3px] rounded-r-xl" style={{ background: match.team2.color }} />

      <div className="flex items-center px-5 py-4">
        {/* Team 1 - Left */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TeamLogo src={match.team1.logo} name={match.team1.name} size={32} />
          <div className="min-w-0">
            <p className={`text-sm font-bold truncate ${hasScore && t1Won ? "text-text-primary" : "text-text-secondary"}`}>{match.team1.name}</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">{match.team1.abbr}</p>
          </div>
        </div>

        {/* Center - Score & Info */}
        <div className="flex flex-col items-center px-4 sm:px-8 shrink-0">
          {hasScore ? (
            <div className="flex items-center gap-3">
              <span className={`text-xl font-black tabular-nums ${t1Won ? "text-green" : "text-text-muted"}`}>{match.score1}</span>
              <span className="text-text-muted/40 text-xs font-light">vs</span>
              <span className={`text-xl font-black tabular-nums ${t2Won ? "text-green" : "text-text-muted"}`}>{match.score2}</span>
            </div>
          ) : (
            <p className="text-lg font-bold text-blue-light">{match.time}</p>
          )}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">{match.event}</span>
            <span className="text-[10px] text-text-muted">·</span>
            <span className="text-[10px] text-text-muted">{match.format}</span>
            {match.map && (
              <>
                <span className="text-[10px] text-text-muted">·</span>
                <span className="text-[10px] text-text-muted">{match.map}</span>
              </>
            )}
          </div>
          {isLive && (
            <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-red/15 px-2.5 py-0.5 text-[10px] font-bold text-red">
              <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse-dot" />
              LIVE
            </span>
          )}
        </div>

        {/* Team 2 - Right */}
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <p className={`text-sm font-bold truncate ${hasScore && t2Won ? "text-text-primary" : "text-text-secondary"}`}>{match.team2.name}</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">{match.team2.abbr}</p>
          </div>
          <TeamLogo src={match.team2.logo} name={match.team2.name} size={32} />
        </div>
      </div>
    </Link>
  );
}

export default function MatchesPage() {
  const grouped = upcomingMatches.reduce((acc, m) => {
    const key = m.date || "TBD";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary">Home</a><span className="mx-2">&rsaquo;</span><span className="text-text-primary">Matches</span>
        </div>
        <h1 className="text-2xl font-bold mb-8">Matches &amp; Livescore</h1>
        {liveMatches.length > 0 && (
          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red mb-4">
              <span className="h-2 w-2 rounded-full bg-red animate-pulse-dot" />
              Live Now
            </h2>
            <div className="space-y-2.5">{liveMatches.map((m, i) => <MatchRow key={m.id} match={m} index={i} />)}</div>
          </section>
        )}
        {Object.entries(grouped).map(([date, matches]) => (
          <section key={date} className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">{date}</h2>
            <div className="space-y-2.5">{matches.map((m, i) => <MatchRow key={m.id} match={m} index={i} />)}</div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
