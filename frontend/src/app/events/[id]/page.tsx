import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { events, teams, recentResults } from "@/data/mock";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id.toString() }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id.toString() === id);
  if (!event) {
    return (<><Header /><main className="mx-auto max-w-[800px] px-5 py-16 text-center"><h1 className="text-2xl font-bold mb-4">Event not found</h1><Link href="/events" className="text-blue-light">Back to Events</Link></main><Footer /></>);
  }

  const eventTeams = teams.slice(0, event.teams);
  const eventMatches = recentResults.slice(0, 4);

  return (
    <>
      <Header />
      <div className="relative h-56 md:h-72 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt={event.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-bg-body/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-[1200px] px-5 pb-6">
            <div className="mb-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary">Home</Link><span className="mx-2">&rsaquo;</span>
              <Link href="/events" className="hover:text-text-secondary">Events</Link><span className="mx-2">&rsaquo;</span>
              <span className="text-text-primary">{event.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">{event.name}</h1>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${event.tier === "S" ? "bg-yellow/20 text-yellow" : event.tier === "A" ? "bg-blue/20 text-blue-light" : "bg-text-muted/20 text-text-muted"}`}>{event.tier}-Tier</span>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Info cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { l: "Date", v: event.dates },
            { l: "Prize Pool", v: event.prize, c: "text-green" },
            { l: "Teams", v: event.teams.toString() },
            { l: "Location", v: event.location },
            { l: "Status", v: event.status, c: event.progress > 0 ? "text-red" : "text-blue-light" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-bg-card p-4 text-center card-glow">
              <p className={`text-sm font-bold ${s.c || ""}`}>{s.v}</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted mt-1">{s.l}</p>
            </div>
          ))}
        </div>

        {event.progress > 0 && (
          <div className="mb-8 rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold">Tournament Progress</h3>
              <span className="text-sm font-bold text-blue-light">{event.progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-border overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue to-blue-light transition-all" style={{ width: `${event.progress}%` }} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-8">
            {/* Recent matches at event */}
            <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
              <div className="px-5 py-3 border-b border-border"><h2 className="text-base font-bold">Recent Matches</h2></div>
              <div className="divide-y divide-border">
                {eventMatches.map((m) => (
                  <div key={m.id} className="flex items-center gap-4 px-5 py-3 hover:bg-bg-card-hover transition-all">
                    <div className="flex items-center gap-2 flex-1 justify-end"><span className="text-sm font-semibold">{m.team1.abbr}</span><TeamLogo src={m.team1.logo} name={m.team1.name} size={20} /></div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-lg font-black tabular-nums ${(m.score1 ?? 0) > (m.score2 ?? 0) ? "text-green" : "text-text-muted"}`}>{m.score1}</span>
                      <span className="text-text-muted text-xs">:</span>
                      <span className={`text-lg font-black tabular-nums ${(m.score2 ?? 0) > (m.score1 ?? 0) ? "text-green" : "text-text-muted"}`}>{m.score2}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1"><TeamLogo src={m.team2.logo} name={m.team2.name} size={20} /><span className="text-sm font-semibold">{m.team2.abbr}</span></div>
                    <span className="text-[11px] text-text-muted shrink-0">{m.format} &middot; {m.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Format */}
            <section className="rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-1">
              <h2 className="text-base font-bold mb-4">Tournament Format</h2>
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-start gap-3"><span className="h-6 w-6 rounded-full bg-blue/15 text-blue-light text-xs font-bold flex items-center justify-center shrink-0">1</span><div><p className="font-semibold text-text-primary">Group Stage</p><p className="text-xs text-text-muted">{event.teams} teams divided into {Math.ceil(event.teams / 4)} groups. GSL format, BO3 matches. Top 2 from each group advance.</p></div></div>
                <div className="flex items-start gap-3"><span className="h-6 w-6 rounded-full bg-blue/15 text-blue-light text-xs font-bold flex items-center justify-center shrink-0">2</span><div><p className="font-semibold text-text-primary">Playoffs</p><p className="text-xs text-text-muted">Single elimination bracket. Quarterfinals and Semifinals are BO3.</p></div></div>
                <div className="flex items-start gap-3"><span className="h-6 w-6 rounded-full bg-yellow/15 text-yellow text-xs font-bold flex items-center justify-center shrink-0">3</span><div><p className="font-semibold text-text-primary">Grand Final</p><p className="text-xs text-text-muted">Best of 5 series for the championship title and {event.prize} prize pool.</p></div></div>
              </div>
            </section>
          </div>

          {/* Sidebar — Participating teams */}
          <div>
            <section className="rounded-xl border border-border bg-bg-card overflow-hidden card-glow animate-fade-in-up">
              <div className="px-4 py-3 border-b border-border"><h3 className="text-sm font-bold">Participating Teams ({event.teams})</h3></div>
              <div className="divide-y divide-border">
                {eventTeams.map((team) => (
                  <div key={team.name} className="flex items-center gap-3 px-4 py-2.5 hover:bg-bg-card-hover transition-all">
                    <TeamLogo src={team.logo} name={team.name} size={20} />
                    <span className="text-sm font-semibold">{team.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
