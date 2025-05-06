"use server";

import { env } from "cloudflare:workers";
import { renderRealtimeClients } from "rwsdk/realtime/worker";

export let REACTIONS = ["🤦‍♂️"];

export function addReaction(reaction: string) {
  console.log("appending emoji");
  REACTIONS = [...REACTIONS, reaction];
}

export function getReactions() {
  console.log("returning emojis");
  return REACTIONS;
}

export async function resetActions() {
  REACTIONS = ["🤷‍♂️"];

  await renderRealtimeClients({
    durableObjectNamespace: env.REALTIME_DURABLE_OBJECT,
    key: "redwood-realtime-client-key",
  });
}
