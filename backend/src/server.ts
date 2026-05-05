import { createServer } from "node:http";
import { playerProfiles, topPlayers } from "./data/mock.js";

const port = Number(process.env.PORT || 4000);

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/health") {
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (url.pathname === "/players") {
    res.end(JSON.stringify(playerProfiles));
    return;
  }

  if (url.pathname === "/players/top") {
    res.end(JSON.stringify(topPlayers));
    return;
  }

  const playerMatch = url.pathname.match(/^\/players\/([^/]+)$/);
  if (playerMatch) {
    const id = Number(playerMatch[1]);
    const player = playerProfiles.find((profile) => profile.id === id);

    if (!player) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Player not found" }));
      return;
    }

    res.end(JSON.stringify(player));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
