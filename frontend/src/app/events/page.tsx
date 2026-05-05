import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { events } from "@/data/mock";

export default function EventsPage() {
  const ongoing = events.filter((e) => e.progress > 0);
  const upcoming = events.filter((e) => e.progress === 0);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Events</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Events &amp; Tournaments</h1>
        <p className="text-sm text-text-muted mb-8">Professional Counter-Strike tournament calendar</p>

        {/* Ongoing */}
        {ongoing.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">Ongoing Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ongoing.map((event) => (
                <Link href={`/events/${event.id}`} key={event.id} className="group overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover cursor-pointer">
                  <div className="h-44 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={event.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${event.tier === "S" ? "bg-yellow/15 text-yellow" : "bg-blue/15 text-blue-light"}`}>{event.tier}-Tier</span>
                        <span className="rounded bg-green/15 px-2 py-0.5 text-[10px] font-bold text-green">{event.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-2">{event.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        {event.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        {event.location}
                      </span>
                      <span>{event.prize}</span>
                      <span>{event.teams} teams</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-bg-surface">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue to-blue-light" style={{ width: `${event.progress}%` }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcoming.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id} className="group overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover cursor-pointer">
                <div className="h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={event.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${event.tier === "S" ? "bg-yellow/15 text-yellow" : event.tier === "A" ? "bg-blue/15 text-blue-light" : "bg-bg-surface text-text-muted"}`}>{event.tier}-Tier</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2">{event.name}</h3>
                  <div className="space-y-1 text-xs text-text-muted">
                    <p>{event.dates}</p>
                    <p>{event.location}</p>
                    <div className="flex gap-3">
                      <span>{event.prize}</span>
                      <span>{event.teams} teams</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
