import { createServer } from "node:http";
import { createRouter } from "./routes/index.js";
import { getDb } from "./db/client.js";

const port = Number(process.env.PORT || 4000);
const defaultOrigins = [
  "http://localhost:3000",
  "https://htlv-rework.vercel.app",
];
const allowedOrigins = new Set(
  (process.env.FRONTEND_ORIGIN || defaultOrigins.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const router = createRouter();

const isAllowedOrigin = (origin: string) =>
  allowedOrigins.has(origin) || /^https:\/\/htlv-rework-[a-z0-9-]+\.vercel\.app$/.test(origin);

const server = createServer((req, res) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  router.handle(req, res);
});

getDb()
  .then(() => {
    server.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
