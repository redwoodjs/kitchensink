"use server";

export let EMOJIS = ["🤦‍♂️"];

export function appendEmoji(emoji: string) {
  EMOJIS = [...EMOJIS, emoji];
}
