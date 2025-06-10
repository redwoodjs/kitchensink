import { defineApp } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { env } from "cloudflare:workers";

import { setupDb } from "./db";
export { SessionDurableObject } from "./session/durableObject";

import { realtimeRoute } from "rwsdk/realtime/worker";
export { RealtimeDurableObject } from "rwsdk/realtime/durableObject";

import { Document } from "@/app/Document";

import { ReactionPage } from "@/app/pages/Reaction/ReactionPage";
import { ReactionAdminPage } from "./app/pages/Reaction/ReactionAdminPage";

import { routes as spaRoutes } from "./app/pages/spa/routes";

export type AppContext = {};

export default defineApp([
  // Middlware
  async () => {
    await setupDb(env);
  },
  // Route handlers
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  render(Document, [
    route("/", ReactionPage),
    route("/admin", ReactionAdminPage),
  ]),

  prefix("/spa", spaRoutes),
]);
