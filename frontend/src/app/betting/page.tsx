import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import { upcomingMatches } from "@/data/mock";

const bookmakers = ["Betway", "GG.bet", "Pinnacle"];

function generateOdds() {
  return upcomingMatches.slice(0, 6).map((match) => {
    const team1Base = 1.3 + Math.random() * 2;
    const team2Base = 1.3 + Math.random() * 2;
    return {
      match,
      odds: bookmakers.map((bk) => ({
        bookmaker: bk,
        team1: +(team1Base + (Math.random() * 0.3 - 0.15)).toFixed(2),
        team2: +(team2Base + (Math.random() * 0.3 - 0.15)).toFixed(2),
      })),
    };
  });
}

const bettingMatches = generateOdds();

export default function BettingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <a href="/" className="hover:text-text-secondary">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Betting</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Match Betting</h1>
        <p className="text-sm text-text-secondary mb-6">Compare odds from top bookmakers for upcoming CS2 matches</p>

        {/* Disclaimer */}
        <div className="mb-8 rounded-xl border border-yellow/30 bg-yellow/5 p-4 flex items-start gap-3 animate-fade-in-up">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" className="shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div>
            <p className="text-sm font-semibold text-yellow mb-1">Responsible Gambling Disclaimer</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Gambling involves risk. Only bet what you can afford to lose. Odds are for informational purposes only. Must be 18+ to participate. If you have a gambling problem, seek help at begambleaware.org.
            </p>
          </div>
        </div>

        {/* Odds table */}
        <div className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up delay-1">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_repeat(3,140px)] gap-2 px-5 py-3 border-b border-border bg-bg-surface/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Match</span>
            {bookmakers.map((bk) => (
              <span key={bk} className="text-[10px] font-bold uppercase tracking-wider text-text-muted text-center">{bk}</span>
            ))}
          </div>

          {/* Matches */}
          <div className="divide-y divide-border">
            {bettingMatches.map(({ match, odds }, i) => (
              <div
                key={match.id}
                className={`grid grid-cols-[1fr_repeat(3,140px)] gap-2 items-center px-5 py-4 hover:bg-bg-card-hover transition-all animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
              >
                {/* Match info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <TeamLogo src={match.team1.logo} name={match.team1.name} size={20} />
                    <span className="text-sm font-semibold">{match.team1.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TeamLogo src={match.team2.logo} name={match.team2.name} size={20} />
                    <span className="text-sm font-semibold">{match.team2.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-text-muted">
                    <span>{match.event}</span>
                    <span>&middot;</span>
                    <span>{match.format}</span>
                    <span>&middot;</span>
                    <span>{match.date} {match.time}</span>
                  </div>
                </div>

                {/* Odds columns */}
                {odds.map((o) => (
                  <div key={o.bookmaker} className="flex flex-col gap-1.5">
                    <button className="rounded-lg border border-border bg-bg-body/50 px-3 py-2 text-sm font-bold text-green hover:border-green/50 hover:bg-green/5 transition-all text-center tabular-nums">
                      {o.team1.toFixed(2)}
                    </button>
                    <button className="rounded-lg border border-border bg-bg-body/50 px-3 py-2 text-sm font-bold text-blue-light hover:border-blue/50 hover:bg-blue/5 transition-all text-center tabular-nums">
                      {o.team2.toFixed(2)}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-[11px] text-text-muted mt-6">
          Odds are simulated for demonstration purposes and do not represent real betting lines.
        </p>
      </main>
      <Footer />
    </>
  );
}
