/* eslint-disable @next/next/no-img-element */
import TeamLogo from "./TeamLogo";
import StatusPill from "./StatusPill";
import { api } from "@/services/api";
import { mapBackgrounds, mapIcons, getMapAsset } from "@/lib/maps";

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default async function HeroMatch() {
  const { liveMatches } = await resolvePageData({
    liveMatches: api.liveMatches(),
  });

  const match = liveMatches[0];
  const mapVeto = match.mapVeto ?? [];
  const mapBackground = getMapAsset(mapBackgrounds, match.map) ?? `${B}/news/katowice-bg.jpg`;

  return (
    <section className="relative overflow-hidden">
      {/* Katowice arena background — high-res, focused on top center */}
      <img
        src={mapBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center scale-105"
      />
      {/* Heavy dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-bg-body/75" />
      {/* Team color side accents */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${match.team1.color}20 0%, transparent 25%, transparent 75%, ${match.team2.color}20 100%)`,
        }}
      />
      {/* Subtle blue radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(37,99,235,0.1),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1460px] px-4 sm:px-5 py-10 md:py-14">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-3 animate-fade-in-up">
          <StatusPill status="live" />
          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            {match.event} &middot; Grand Final
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-35">
          <div className="flex items-center gap-6 md:gap-10 animate-scale-in">
            {/* Team 1 */}
            <div className="flex flex-col items-center gap-3 group">
              <TeamLogo src={match.team1.logo} name={match.team1.name} size={96} className="h-16 w-16 object-contain transition-transform group-hover:scale-105 md:h-24 md:w-24" />
              <span className="text-base md:text-lg font-bold">{match.team1.name}</span>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl md:text-7xl font-black tabular-nums tracking-tight" style={{ color: (match.score1 ?? 0) >= (match.score2 ?? 0) ? match.team1.color : undefined }}>{match.score1}</span>
                <span className="text-xl text-text-muted font-light">:</span>
                <span className="text-5xl md:text-7xl font-black tabular-nums tracking-tight" style={{ color: (match.score2 ?? 0) >= (match.score1 ?? 0) ? match.team2.color : undefined }}>{match.score2}</span>
              </div>
              {mapVeto.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {mapVeto.map((item) => {
                    const icon = getMapAsset(mapIcons, item.map);
                    const isPlaying = item.map.toLowerCase() === match.map?.toLowerCase();
                    const isBanned = item.action === "banned";

                    if (!icon) {
                      return null;
                    }

                    return (
                      <img
                        key={`${item.team}-${item.action}-${item.map}`}
                        src={icon}
                        alt={item.map}
                        title={`${item.team} ${item.action} ${item.map}`}
                        className={[
                          "h-8 w-8 object-contain transition-all md:h-9 md:w-9",
                          isPlaying ? "animate-pulse" : "",
                          isBanned ? "opacity-45 grayscale brightness-50" : "opacity-100",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center gap-3 group">
              <TeamLogo src={match.team2.logo} name={match.team2.name} size={96} className="h-16 w-16 object-contain transition-transform group-hover:scale-105 md:h-24 md:w-24" />
              <span className="text-base md:text-lg font-bold">{match.team2.name}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full max-w-md space-y-4 animate-slide-in md:w-[340px] md:shrink-0">
            <div className="flex flex-col gap-2.5">
              <a href={match.broadcastUrl || "#"} target={match.broadcastUrl ? "_blank" : undefined} rel={match.broadcastUrl ? "noreferrer" : undefined} className="flex items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-light hover:shadow-lg hover:shadow-blue/20 hover:-translate-y-0.5 active:scale-95">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch Broadcast
              </a>
              <a href={`/matches/${match.id}`} className="flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:text-text-primary hover:border-blue/30 hover:bg-blue-glow">
                Detailed Stats
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
