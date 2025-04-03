"use client";

import { addReaction } from "./functions";

export function EmojiPicker() {
  return (
    <ol>
      <li onClick={() => addReaction("❤️")}>❤️</li>
      <li onClick={() => addReaction("🔥")}>🔥</li>
      <li onClick={() => addReaction("🦋")}>🦋</li>
    </ol>
  );
}
