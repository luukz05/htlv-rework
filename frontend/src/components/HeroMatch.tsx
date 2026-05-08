/* eslint-disable @next/next/no-img-element */
import TeamLogo from "./TeamLogo";
import { api } from "@/services/api";

const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

const mapBackgrounds: Record<string, string> = {
  ancient: `${B}/maps/Bomb-B-Ancient-CS-2.jpg`,
  anubis: `${B}/maps/Anubis-CS2.jpg`,
  "dust ii": `${B}/maps/dust2_ct_ramp_Cs2.jpg`,
  dust2: `${B}/maps/dust2_ct_ramp_Cs2.jpg`,
  inferno: `${B}/maps/Banana-Inferno-CS2-31.03.2025.jpg`,
  mirage: `${B}/maps/Bomb-A-Mirage-CS-2.jpg`,
  nuke: `${B}/maps/Bomb-B-Nuke-CS-2.jpg`,
  overpass: `${B}/maps/Overpass-CS2_Counter-Strike-anti-cheat-VAC-Live.jpg`,
};

const mapIcons: Record<string, string> = {
  ancient: `${B}/mapIcons/Map_icon_de_ancient.webp`,
  anubis: `${B}/mapIcons/Map_icon_de_anubis.webp`,
  "dust ii": `${B}/mapIcons/Map_icon_de_dust2.webp`,
  dust2: `${B}/mapIcons/Map_icon_de_dust2.webp`,
  inferno: `${B}/mapIcons/CS2_inferno_logo.webp`,
  mirage: `${B}/mapIcons/Set_mirage.webp`,
  nuke: `${B}/mapIcons/Set_nuke_2.webp`,
  overpass: `${B}/mapIcons/CS2_overpass_logo.webp`,
};

export default async function HeroMatch() {
  const { liveMatches } = await resolvePageData({
    liveMatches: api.liveMatches(),
  });

  const match = liveMatches[0];
  const mapVeto = match.mapVeto ?? [];
  const picks = mapVeto.filter((item) => item.action === "picked");
  const bans = mapVeto.filter((item) => item.action === "banned");
  const decider = mapVeto.find((item) => item.action === "decider");
  const mapBackground = getMapAsset(mapBackgrounds, match.map) ?? `${B}/news/katowice-bg.jpg`;
  const currentMapIcon = getMapAsset(mapIcons, match.map);

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

      <div className="relative mx-auto max-w-[1440px] px-6 py-10 md:py-14">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-3 animate-fade-in-up">
          <span className="flex items-center gap-2 rounded-full bg-red/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red animate-glow">
            <span className="h-2 w-2 rounded-full bg-red animate-pulse-dot" />
            Live
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            {match.event} &middot; Grand Final
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 md:justify-between">
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
              {currentMapIcon && (
                <span className="mt-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-blue/25 bg-bg-body/65 shadow-lg shadow-black/25 md:h-16 md:w-16" title={match.map}>
                  <img src={currentMapIcon} alt={match.map || "Current map"} className="h-full w-full object-cover" />
                </span>
              )}
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center gap-3 group">
              <TeamLogo src={match.team2.logo} name={match.team2.name} size={96} className="h-16 w-16 object-contain transition-transform group-hover:scale-105 md:h-24 md:w-24" />
              <span className="text-base md:text-lg font-bold">{match.team2.name}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full max-w-md space-y-4 animate-slide-in md:w-[360px]">
            {mapVeto.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <MapPoolGroup title="Picks" items={picks} tone="text-green" />
                  <MapPoolGroup title="Bans" items={bans} tone="text-red" muted />
                </div>
                {decider && (
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-bg-body/50 px-3 py-2 text-xs">
                    <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-text-muted">
                      {getMapAsset(mapIcons, decider.map) && (
                        <img src={getMapAsset(mapIcons, decider.map)} alt="" className="h-6 w-6 rounded object-cover" />
                      )}
                      Decider
                    </span>
                    <span className="font-semibold text-text-primary">{decider.map}</span>
                  </div>
                )}
              </div>
            )}

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

function MapPoolGroup({
  title,
  items,
  tone,
  muted = false,
}: {
  title: string;
  items: Array<{ team: string; map: string }>;
  tone: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-bg-body/50 p-3">
      <p className={`mb-2 text-[11px] font-bold uppercase tracking-wider ${tone}`}>{title}</p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={`${title}-${item.team}-${item.map}`} className={`flex items-center justify-between gap-3 text-xs ${muted ? "opacity-45 grayscale" : ""}`}>
            <span className="flex min-w-0 items-center gap-2 text-text-muted">
              {getMapAsset(mapIcons, item.map) && (
                <img src={getMapAsset(mapIcons, item.map)} alt="" className="h-8 w-8 rounded object-cover" />
              )}
              <span className="truncate">{item.team}</span>
            </span>
            <span className="shrink-0 font-semibold text-text-primary">{item.map}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getMapAsset(assets: Record<string, string>, map?: string) {
  if (!map) {
    return undefined;
  }

  return assets[map.toLowerCase()];
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
