import { createServer } from "node:http";
import { createRouter } from "./routes/index.js";

const port = Number(process.env.PORT || 4000);
const router = createRouter();

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  router.handle(req, res);
});

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
