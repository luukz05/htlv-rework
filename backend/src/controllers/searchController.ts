import type { IncomingMessage, ServerResponse } from "node:http";
import { json } from "../http/response.js";
import { listEventsFromDb } from "../db/events.js";
import { listPlayerProfilesFromDb } from "../db/players.js";
import { listTeamProfilesFromDb } from "../db/teamProfiles.js";

function normalize(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t");
}

export async function globalSearch(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
  const query = url.searchParams.get("q") || "";
  const q = query.toLowerCase().trim();
  const nQ = normalize(query);

  if (!q) {
    return json(res, { teams: [], players: [], events: [] });
  }

  const [teamProfiles, playerProfiles, events] = await Promise.all([
    listTeamProfilesFromDb(),
    listPlayerProfilesFromDb(),
    listEventsFromDb(),
  ]);

  const filteredTeams = teamProfiles
    .filter((team) => {
      const name = team.name.toLowerCase();
      const shortname = team.shortname.toLowerCase();
      return name.includes(q) || shortname.includes(q) || normalize(name).includes(nQ);
    })
    .slice(0, 5);

  const filteredPlayers = playerProfiles
    .filter((player) => {
      const nick = player.nickname.toLowerCase();
      const real = player.realName.toLowerCase();
      return nick.includes(q) || real.includes(q) || normalize(nick).includes(nQ);
    })
    .slice(0, 5);

  const filteredEvents = events
    .filter((event) => {
      const name = event.name.toLowerCase();
      return name.includes(q) || normalize(name).includes(nQ);
    })
    .slice(0, 5);

  return json(res, {
    teams: filteredTeams.map(t => ({ id: t.id, name: t.name, logo: t.logo, region: t.region })),
    players: filteredPlayers.map(p => ({ id: p.id, nickname: p.nickname, realName: p.realName, image: p.image, team: p.team })),
    events: filteredEvents.map(e => ({ id: e.id, name: e.name, image: e.image, date: e.dates }))
  });
}
