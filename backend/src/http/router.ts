import type { IncomingMessage, ServerResponse } from "node:http";
import { notFound } from "./response.js";

export type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  params: Record<string, string>,
  url: URL,
) => void;

type Route = {
  method: string;
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
};

export class Router {
  private routes: Route[] = [];

  get(path: string, handler: RouteHandler) {
    this.add("GET", path, handler);
  }

  post(path: string, handler: RouteHandler) {
    this.add("POST", path, handler);
  }

  patch(path: string, handler: RouteHandler) {
    this.add("PATCH", path, handler);
  }

  handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const method = req.method || "GET";

    for (const route of this.routes) {
      if (route.method !== method) continue;

      const match = url.pathname.match(route.pattern);
      if (!match) continue;

      const params = route.keys.reduce<Record<string, string>>((acc, key, index) => {
        acc[key] = decodeURIComponent(match[index + 1] || "");
        return acc;
      }, {});

      route.handler(req, res, params, url);
      return;
    }

    notFound(res);
  }

  private add(method: string, path: string, handler: RouteHandler) {
    const keys: string[] = [];
    const pattern = path
      .replace(/\/:([^/]+)/g, (_, key: string) => {
        keys.push(key);
        return "/([^/]+)";
      })
      .replace(/\//g, "\\/");

    this.routes.push({
      method,
      keys,
      pattern: new RegExp(`^${pattern}$`),
      handler,
    });
  }
}
