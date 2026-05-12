import type { IncomingMessage, ServerResponse } from "node:http";

const SESSION_COOKIE = "hltv_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function envOverride(): boolean | null {
  const override = process.env.COOKIE_SECURE;
  if (override === "true") return true;
  if (override === "false") return false;
  return null;
}

/**
 * Decide cookie mode from the incoming request origin / forwarded protocol.
 * Cross-site HTTPS (e.g. Vercel frontend → Render backend) needs
 * `SameSite=None; Secure` so the browser stores and sends the cookie.
 * Localhost dev keeps `SameSite=Lax` (no Secure) so it works over HTTP.
 */
function shouldUseSecure(req?: IncomingMessage): boolean {
  const override = envOverride();
  if (override !== null) return override;

  if (req) {
    const origin = (req.headers.origin || "").toLowerCase();
    if (origin.startsWith("https://")) return true;
    if (origin.startsWith("http://")) return false;

    const proto = (req.headers["x-forwarded-proto"] || "").toString().toLowerCase();
    if (proto.includes("https")) return true;
    if (proto.includes("http")) return false;
  }

  return process.env.NODE_ENV === "production";
}

export function parseCookies(req: IncomingMessage): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const pair of header.split(";")) {
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

export function getSessionToken(req: IncomingMessage): string | null {
  return parseCookies(req)[SESSION_COOKIE] ?? null;
}

export function setSessionCookie(res: ServerResponse, token: string, req?: IncomingMessage) {
  const secure = shouldUseSecure(req);
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "HttpOnly",
    `SameSite=${secure ? "None" : "Lax"}`,
    "Path=/",
    `Max-Age=${MAX_AGE_SECONDS}`,
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearSessionCookie(res: ServerResponse, req?: IncomingMessage) {
  const secure = shouldUseSecure(req);
  const parts = [
    `${SESSION_COOKIE}=`,
    "HttpOnly",
    `SameSite=${secure ? "None" : "Lax"}`,
    "Path=/",
    "Max-Age=0",
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function describeCookieMode(req?: IncomingMessage): {
  secure: boolean;
  sameSite: "None" | "Lax";
  nodeEnv: string | undefined;
  cookieSecureEnv: string | undefined;
  origin: string | undefined;
  forwardedProto: string | undefined;
} {
  const secure = shouldUseSecure(req);
  return {
    secure,
    sameSite: secure ? "None" : "Lax",
    nodeEnv: process.env.NODE_ENV,
    cookieSecureEnv: process.env.COOKIE_SECURE,
    origin: req?.headers.origin?.toString(),
    forwardedProto: req?.headers["x-forwarded-proto"]?.toString(),
  };
}
