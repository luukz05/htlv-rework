import type { Match } from "@/services/types";

export const SITE_NAME = "HLTV";
export const DEFAULT_TITLE = "Counter-Strike Coverage";

export function compactTitle(value: string, maxLength = 64) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`;
}

export function matchTitle(match: Match) {
  const teams = `${match.team1.shortname} vs ${match.team2.shortname}`;
  const context = [match.event, match.format].filter(Boolean).join(" - ");

  if (match.status === "live") {
    const score = typeof match.score1 === "number" && typeof match.score2 === "number"
      ? `${match.score1}-${match.score2}`
      : "LIVE";

    return `${score} LIVE: ${teams}${context ? ` - ${context}` : ""}`;
  }

  if (match.status === "finished") {
    const score = typeof match.score1 === "number" && typeof match.score2 === "number"
      ? `${match.score1}-${match.score2}`
      : "Result";

    return `${score}: ${teams}${context ? ` - ${context}` : ""}`;
  }

  const start = [match.date, match.time].filter(Boolean).join(" ");
  return `${teams}${start ? ` at ${start}` : ""}${context ? ` - ${context}` : ""}`;
}
