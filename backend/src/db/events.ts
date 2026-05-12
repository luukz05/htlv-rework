import { ObjectId, type Collection, type Db } from "mongodb";
import { getDb } from "./client.js";
import { events as seedEvents } from "../data/mock.js";
import type { Event } from "../data/mock.js";

export type EventDoc = {
  _id: ObjectId;
} & Event;

export async function eventsCollection(): Promise<Collection<EventDoc>> {
  const db = await getDb();
  return db.collection<EventDoc>("events");
}

export async function listEventsFromDb(): Promise<Event[]> {
  const col = await eventsCollection();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ id: 1 })
    .toArray();
  return docs as unknown as Event[];
}

export async function getEventByIdFromDb(id: number): Promise<Event | null> {
  const col = await eventsCollection();
  const doc = await col.findOne({ id }, { projection: { _id: 0 } });
  return (doc as unknown as Event | null) ?? null;
}

export async function ensureEventsSeed(db: Db) {
  const col = db.collection<EventDoc>("events");
  await col.createIndex({ id: 1 }, { unique: true, name: "uniq_event_id" });
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;

  if (seedEvents.length === 0) return;
  await col.insertMany(
    seedEvents.map((e) => ({ _id: new ObjectId(), ...e })),
  );
}
