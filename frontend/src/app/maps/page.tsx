import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import Link from "next/link";
import { gameMaps } from "@/data/mock";

export default function MapsPage() {
  const activeMaps = gameMaps.filter((m) => m.pool === "active");
  const removedMaps = gameMaps.filter((m) => m.pool === "removed");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-muted">
          <a href="/" className="hover:text-text-secondary">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary">Maps</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Competitive Map Pool</h1>
        <p className="text-sm text-text-secondary mb-8">Explore every map in the CS2 competitive pool with stats, utility guides, callouts, and historical highlights.</p>

        {/* Overall stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Maps", value: activeMaps.length.toString(), color: "text-green" },
            { label: "Total Pro Matches", value: gameMaps.reduce((a, m) => a + m.totalProMatches, 0).toLocaleString(), color: "text-blue-light" },
            { label: "Most Played", value: "Dust II", color: "text-yellow" },
            { label: "Most CT-Sided", value: "Nuke", color: "text-orange" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-bg-card p-4 text-center card-glow animate-fade-in-up">
              <p className={`text-xl font-black tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Maps */}
        <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
          <span className="h-2 w-2 rounded-full bg-green" />
          Active Duty Maps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {activeMaps.map((map, i) => (
            <Link
              key={map.slug}
              href={`/maps/${map.slug}`}
              className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
            >
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={map.image} alt={map.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                <div className="absolute top-2 right-2 bg-green/20 text-green text-[10px] font-bold px-2 py-0.5 rounded">
                  Active
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-xl font-black text-white drop-shadow-lg">{map.name}</h3>
                </div>
              </div>
              <div className="p-4">
                {/* Side balance bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span className="text-blue-light">CT {map.ctWinRate}%</span>
                    <span className="text-yellow">T {map.tWinRate}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-yellow/30 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-light" style={{ width: `${map.ctWinRate}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <p className="text-sm font-bold tabular-nums">{map.pickRate}%</p>
                    <p className="text-[9px] text-text-muted">Pick Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold tabular-nums">{map.banRate}%</p>
                    <p className="text-[9px] text-text-muted">Ban Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold tabular-nums">{map.totalProMatches.toLocaleString()}</p>
                    <p className="text-[9px] text-text-muted">Pro Matches</p>
                  </div>
                </div>

                {/* Best teams */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-text-muted mr-1">Top:</span>
                  {map.bestTeams.slice(0, 4).map((team) => (
                    <TeamLogo key={team.name} src={team.logo} name={team.name} size={16} />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Removed Maps */}
        {removedMaps.length > 0 && (
          <>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
              <span className="h-2 w-2 rounded-full bg-text-muted" />
              Removed Maps
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {removedMaps.map((map, i) => (
                <Link
                  key={map.slug}
                  href={`/maps/${map.slug}`}
                  className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover card-glow animate-fade-in-up delay-${Math.min(i + 1, 5)} opacity-70 hover:opacity-100`}
                >
                  <div className="relative h-40 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={map.image} alt={map.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                    <div className="absolute top-2 right-2 bg-text-muted/20 text-text-muted text-[10px] font-bold px-2 py-0.5 rounded">
                      Removed
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-xl font-black text-white drop-shadow-lg">{map.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center">
                        <p className="text-sm font-bold tabular-nums">{map.ctWinRate}% / {map.tWinRate}%</p>
                        <p className="text-[9px] text-text-muted">CT / T Win Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold tabular-nums">{map.totalProMatches.toLocaleString()}</p>
                        <p className="text-[9px] text-text-muted">Total Pro Matches</p>
                      </div>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2">{map.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
