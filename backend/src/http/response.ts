import type { ServerResponse } from "node:http";

export function json(res: ServerResponse, data: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

export function notFound(res: ServerResponse, message = "Not found") {
  json(res, { error: message }, 404);
}

export function badRequest(res: ServerResponse, message = "Bad request") {
  json(res, { error: message }, 400);
}

export function unauthorized(res: ServerResponse, message = "Unauthorized") {
  json(res, { error: message }, 401);
}

export function conflict(res: ServerResponse, message = "Conflict") {
  json(res, { error: message }, 409);
}
