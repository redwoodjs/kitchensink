import { defineApp, ErrorResponse } from "@redwoodjs/sdk/worker";
import { route, render, prefix } from "@redwoodjs/sdk/router";
import { env } from "cloudflare:workers";

import { setCommonHeaders } from "@/app/headers";
// import { Session } from "./session/durableObject";
import { setupDb } from "./db";
// import type { User } from "@prisma/client";
export { SessionDurableObject } from "./session/durableObject";

import { realtimeRoute } from "@redwoodjs/sdk/realtime/worker";
export { RealtimeDurableObject } from "@redwoodjs/sdk/realtime/durableObject";

import { Document } from "@/app/Document";

import { ReactionPage } from "@/app/pages/Reaction/ReactionPage";
import { ReactionAdminPage } from "./app/pages/Reaction/ReactionAdminPage";

export type AppContext = {};

export default defineApp([
  async ({ ctx }) => {
    await setupDb(env);
  },
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),

  render(Document, [
    route("/", ReactionPage),
    route("/admin", ReactionAdminPage),
  ]),
]);
