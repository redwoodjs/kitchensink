"use server";

export let REACTIONS = ["🤦‍♂️"];

export function addReaction(reaction: string) {
  console.log("appending emoji");
  REACTIONS = [...REACTIONS, reaction];
}

export function getReactions() {
  console.log("returning emojis");
  return REACTIONS;
}
