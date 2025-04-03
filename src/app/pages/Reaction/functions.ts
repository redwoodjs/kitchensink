"use server";

import { RouteOptions } from "@redwoodjs/sdk/router";
import { setTimeout } from "node:timers/promises";
import { renderRealtimeClients } from "@redwoodjs/sdk/realtime/worker";
import { AppContext } from "@/worker";

export let REACTIONS = ["🤦‍♂️"];

export function addReaction(reaction: string) {
  console.log("appending emoji");
  REACTIONS = [...REACTIONS, reaction];
}

export function getReactions() {
  console.log("returning emojis");
  return REACTIONS;
}

export async function resetActions(opts: any) {
  REACTIONS = ["🤷‍♂️"];

  await renderRealtimeClients({
    durableObjectNamespace: opts?.env?.REALTIME_DURABLE_OBJECT,
    key: "redwood-realtime-client-key",
  });
}
