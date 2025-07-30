import { defineApp } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { env } from "cloudflare:workers";

import { setupDb } from "./db";
export { SessionDurableObject } from "./session/durableObject";

import { realtimeRoute } from "rwsdk/realtime/worker";
export { RealtimeDurableObject } from "rwsdk/realtime/durableObject";

import { Document } from "@/app/Document";

import { ReactionPage } from "@/app/pages/Reaction/ReactionPage";

import { routes as navRoutes } from "./app/pages/nav/routes";

export type AppContext = {};

export default defineApp([
  // Middlware
  async () => {
    await setupDb(env);
  },
  // Route handlers
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  render(Document, [
    route("/", () => {
      return (
        <ol>
          <li>
            <a href="/realtime">realtime</a>
          </li>
          <li>
            <a href="/nav">nav</a>
          </li>
        </ol>
      );
    }),
    route("/realtime", ReactionPage),
    prefix("/nav", navRoutes),
  ]),
]);
