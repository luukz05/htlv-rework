import type { Response } from "express";

export function json(res: Response, data: unknown, statusCode = 200) {
  res.status(statusCode).json(data);
}

export function notFound(res: Response, message = "Not found") {
  json(res, { error: message }, 404);
}

export function badRequest(res: Response, message = "Bad request") {
  json(res, { error: message }, 400);
}

export function unauthorized(res: Response, message = "Unauthorized") {
  json(res, { error: message }, 401);
}

export function conflict(res: Response, message = "Conflict") {
  json(res, { error: message }, 409);
}
