import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { recentResults, Match } from "@/data/mock";

export default function ResultsPage() {
  const grouped = recentResults.reduce((acc, m) => {
    const key = m.date || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary">Home</a><span className="mx-2">&rsaquo;</span><span className="text-text-primary">Results</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Results</h1>
        <p className="text-sm text-text-muted mb-8">Recent match results from all events</p>
        <div className="flex gap-2 mb-8 flex-wrap">
          {["All", "IEM Katowice", "BLAST Premier", "ESL Pro League", "ESL Challenger"].map((f, i) => (
            <button key={f} className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${i === 0 ? "bg-blue text-white" : "bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-hover"}`}>{f}</button>
          ))}
        </div>

        {Object.entries(grouped).map(([date, matches]) => (
          <section key={date} className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 px-1">{date}</h2>
            <div className="space-y-2.5">
              {matches.map((match, i) => {
                const t1Won = (match.score1 ?? 0) > (match.score2 ?? 0);
                const t2Won = (match.score2 ?? 0) > (match.score1 ?? 0);
                return (
                  <Link
                    href={`/matches/${match.id}`}
                    key={match.id}
                    className="block relative rounded-xl border border-border overflow-hidden transition-all hover:-translate-y-0.5 cursor-pointer card-glow animate-fade-in-up"
                    style={{
                      animationDelay: `${i * 0.04}s`,
                      background: `linear-gradient(90deg, ${match.team1.color}18 0%, #1a2332 30%, #1a2332 70%, ${match.team2.color}18 100%)`,
                    }}
                  >
                    {/* Colored edge accents */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl" style={{ background: t1Won ? match.team1.color : `${match.team1.color}66` }} />
                    <div className="absolute right-0 top-0 bottom-0 w-[3px] rounded-r-xl" style={{ background: t2Won ? match.team2.color : `${match.team2.color}66` }} />

                    <div className="flex items-center px-5 py-3.5">
                      {/* Team 1 - Left */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <TeamLogo src={match.team1.logo} name={match.team1.name} size={28} />
                        <span className={`text-sm font-bold truncate ${t1Won ? "text-text-primary" : "text-text-secondary"}`}>{match.team1.name}</span>
                      </div>

                      {/* Center - Score & Info */}
                      <div className="flex flex-col items-center px-4 sm:px-8 shrink-0">
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-black tabular-nums ${t1Won ? "text-green" : "text-text-muted"}`}>{match.score1}</span>
                          <span className="text-text-muted/40 text-xs font-light">:</span>
                          <span className={`text-lg font-black tabular-nums ${t2Won ? "text-green" : "text-text-muted"}`}>{match.score2}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">{match.event}</span>
                          <span className="text-[10px] text-text-muted">·</span>
                          <span className="text-[10px] text-text-muted">{match.format}</span>
                        </div>
                      </div>

                      {/* Team 2 - Right */}
                      <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                        <span className={`text-sm font-bold truncate ${t2Won ? "text-text-primary" : "text-text-secondary"}`}>{match.team2.name}</span>
                        <TeamLogo src={match.team2.logo} name={match.team2.name} size={28} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
