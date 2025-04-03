import { defineApp, ErrorResponse } from "@redwoodjs/sdk/worker";
import { route, render, prefix } from "@redwoodjs/sdk/router";

import { setCommonHeaders } from "@/app/headers";
// import { Session } from "./session/durableObject";
import { setupDb } from "./db";
// import type { User } from "@prisma/client";
export { SessionDurableObject } from "./session/durableObject";

import { realtimeRoute } from "@redwoodjs/sdk/realtime/worker";
export { RealtimeDurableObject } from "@redwoodjs/sdk/realtime/durableObject";

export type AppContext = {
  // session: Session | null;
  // user: User | null;
};

import { Document as RealtimeDocument } from "@/app/realtime/Document";

import { Document as ResponseDocument } from "@/app/response/Document";
import { ReactionPage } from "@/app/realtime/pages/ReactionPage";

export default defineApp<AppContext>([
  // setCommonHeaders(),
  async ({ env, appContext, request, headers }) => {
    await setupDb(env);
  },
  realtimeRoute((env) => env.REALTIME_DURABLE_OBJECT),

  route("/", () => {
    return (
      <>
        <a href="/realtime">Realtime</a>
        <br />
        <a href="/request">Request/ Response</a>
      </>
    );
  }),

  render(RealtimeDocument, [prefix("/realtime", [route("/", ReactionPage)])]),

  // Request/ Response
  render(ResponseDocument, [
    // Streaming
    prefix("/request", [route("/", () => <div>Hello, Request World!</div>)]),
  ]),
]);
