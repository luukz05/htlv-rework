import type { IncomingMessage, ServerResponse } from "node:http";

const SESSION_COOKIE = "hltv_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function shouldUseSecure(): boolean {
  const override = process.env.COOKIE_SECURE;
  if (override === "true") return true;
  if (override === "false") return false;
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

export function setSessionCookie(res: ServerResponse, token: string) {
  const secure = shouldUseSecure();
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

export function clearSessionCookie(res: ServerResponse) {
  const secure = shouldUseSecure();
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
