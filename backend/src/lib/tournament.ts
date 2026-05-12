import { TBD_TEAM } from "../data/config.js";
import type { Event, Match, Team } from "../data/types.js";

export function sameEvent(matchEvent: string, eventName: string) {
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/\b20\d{2}\b/g, "")
      .replace(/[^a-z0-9]/g, "");
  return normalize(matchEvent) === normalize(eventName);
}

function getWinner(mId: number, t1: Team, t2: Team) {
  if (t1.name === "TBD" || t2.name === "TBD") return undefined;
  const hash = (mId + t1.name.length + t2.name.length) % 2;
  return hash === 0 ? t1 : t2;
}

function getMatchTime(index: number) {
  return ["10:00", "13:00", "16:00", "19:00", "22:00"][index % 5];
}

export function simulateTournament(event: Event, teams: Team[]): Match[] {
  const generated: Match[] = [];
  const teamCount = teams.length;
  const totalMatches = teamCount >= 16 ? 40 : 20;
  const finishedCount = Math.floor(totalMatches * (event.progress / 100));

  const rounds =
    teamCount >= 16 ? [8, 8, 8, 6, 3, 4, 2, 1] : [4, 4, 4, 2, 1, 2, 1];
  let mId = 20000 + event.id * 1000;

  for (let r = 0; r < rounds.length; r++) {
    const matchesInRound = rounds[r];
    const isPlayoff = r >= (teamCount >= 16 ? 5 : 4);

    for (let m = 0; m < matchesInRound; m++) {
      const globalIndex = generated.length;
      const status: Match["status"] =
        globalIndex < finishedCount
          ? "finished"
          : globalIndex === finishedCount && event.progress > 0
            ? "live"
            : "upcoming";

      let t1 = TBD_TEAM;
      let t2 = TBD_TEAM;

      if (!isPlayoff) {
        if (r === 0) {
          t1 = teams[m % teamCount];
          t2 = teams[(m + matchesInRound) % teamCount];
        } else {
          const prevRoundFinished =
            generated.length - matchesInRound < finishedCount;
          if (prevRoundFinished) {
            t1 = teams[(m * 2) % teamCount];
            t2 = teams[(m * 2 + 1) % teamCount];
          }
        }
      } else {
        if (generated.length < finishedCount + 2) {
          t1 = teams[(m * 3) % teamCount];
          t2 = teams[(m * 3 + 2) % teamCount];
        }
      }

      const winner = status === "finished" ? getWinner(mId, t1, t2) : undefined;
      const score1 =
        status === "upcoming" ? undefined : winner?.name === t1.name ? 2 : 1;
      const score2 =
        status === "upcoming" ? undefined : winner?.name === t2.name ? 2 : 1;

      generated.push({
        id: mId++,
        team1: t1,
        team2: t2,
        score1,
        score2,
        event: event.name,
        format: isPlayoff
          ? m === matchesInRound - 1 && r === rounds.length - 1
            ? "BO5"
            : "BO3"
          : "BO3",
        status,
        time: getMatchTime(m),
      });
    }
  }
  return generated;
}
