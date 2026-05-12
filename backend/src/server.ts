import { createServer } from "node:http";
import { createRouter } from "./routes/index.js";
import { getDb } from "./db/client.js";

const port = Number(process.env.PORT || 4000);
const defaultOrigins = [
  "http://localhost:3000",
  "https://htlv-rework.vercel.app",
];
const configuredOrigins = (process.env.FRONTEND_ORIGIN || defaultOrigins.join(","))
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const allowedOrigins = new Set(configuredOrigins);

// Derive Vercel project prefixes from configured origins so preview deploys are
// auto-allowed without manual env config. E.g. `https://htlv-rework.vercel.app`
// → allows `https://htlv-rework-<anything>.vercel.app`.
const vercelProjectPrefixes = new Set<string>();
for (const origin of configuredOrigins) {
  const m = origin.match(/^https:\/\/([a-z0-9-]+)\.vercel\.app$/);
  if (m) vercelProjectPrefixes.add(m[1]);
}

const router = createRouter();

const isAllowedOrigin = (origin: string) => {
  if (allowedOrigins.has(origin)) return true;
  const m = origin.match(/^https:\/\/([a-z0-9-]+)\.vercel\.app$/);
  if (m) {
    const host = m[1];
    for (const prefix of vercelProjectPrefixes) {
      if (host === prefix || host.startsWith(`${prefix}-`)) return true;
    }
  }
  return false;
};

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
      console.log(`Allowed origins:`, [...allowedOrigins]);
      if (vercelProjectPrefixes.size > 0) {
        console.log(`Vercel preview prefixes:`, [...vercelProjectPrefixes]);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
