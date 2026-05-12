import { type Collection, type Db, ObjectId } from "mongodb";
import { getDb } from "./client.js";
import type { Match } from "../data/types.js";
import { sameEvent, simulateTournament } from "../lib/tournament.js";
import { listTeamsFromDb } from "./teams.js";
import { listEventsFromDb } from "./events.js";

export type MatchDoc = {
  _id: ObjectId;
} & Match;

export async function matchesCollection(): Promise<Collection<MatchDoc>> {
  const db = await getDb();
  return db.collection<MatchDoc>("matches");
}

export async function listMatchesFromDb(): Promise<Match[]> {
  const col = await matchesCollection();
  const docs = await col.find({}, { projection: { _id: 0 } }).toArray();
  return docs as unknown as Match[];
}

export async function getExtendedMatchesFromDb(): Promise<Match[]> {
  const manualMatches = await listMatchesFromDb();
  const manualIds = new Set(manualMatches.map((m) => m.id));
  const allExtended: Match[] = [...manualMatches];

  const [teams, events] = await Promise.all([
    listTeamsFromDb(),
    listEventsFromDb(),
  ]);
  if (teams.length === 0) return allExtended;

  events.forEach((event) => {
    if (event.progress > 0) {
      const directMatches = manualMatches.filter((m) =>
        sameEvent(m.event, event.name),
      );
      if (directMatches.length < 5) {
        const simulated = simulateTournament(event, teams);
        simulated.forEach((sm) => {
          if (!manualIds.has(sm.id)) {
            allExtended.push(sm);
          }
        });
      }
    }
  });

  return allExtended;
}

export async function getBettingOddsFromDb(bookmakers: string[]): Promise<{
  match: Match;
  odds: { bookmaker: string; team1: number; team2: number }[];
}[]> {
  const all = await listMatchesFromDb();
  const upcoming = all.filter((m) => m.status === "upcoming");
  return upcoming.map((match, index) => ({
    match,
    odds: bookmakers.map((bookmaker, bookmakerIndex) => ({
      bookmaker,
      team1: Number((1.75 + index * 0.08 + bookmakerIndex * 0.03).toFixed(2)),
      team2: Number((2.05 - index * 0.04 + bookmakerIndex * 0.02).toFixed(2)),
    })),
  }));
}

export async function ensureMatchesIndexes(db: Db) {
  const col = db.collection<MatchDoc>("matches");
  await col.createIndex({ id: 1 }, { unique: true, name: "uniq_match_id" });
  await col.createIndex({ status: 1, id: 1 });
}
