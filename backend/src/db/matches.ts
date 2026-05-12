import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import {
  liveMatches,
  recentResults,
  sameEvent,
  simulateTournament,
  upcomingMatches,
} from "../data/mock.js";
import type { Match } from "../data/mock.js";
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

export async function ensureMatchesSeed(db: Db) {
  const col = db.collection<MatchDoc>("matches");
  await col.createIndex({ id: 1 }, { unique: true, name: "uniq_match_id" });
  await col.createIndex({ status: 1, id: 1 });
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;

  const seed: Match[] = [...liveMatches, ...upcomingMatches, ...recentResults];
  if (seed.length === 0) return;

  await col.insertMany(
    seed.map((m) => ({ _id: new ObjectId(), ...m })),
  );
}
