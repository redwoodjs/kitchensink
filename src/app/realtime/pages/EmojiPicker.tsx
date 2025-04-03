"use client";

import { appendEmoji } from "./functions";

export function EmojiPicker() {
  return (
    <ol>
      <li onClick={() => appendEmoji("❤️")}>❤️</li>
      <li onClick={() => appendEmoji("🔥")}>🔥</li>
      <li onClick={() => appendEmoji("🦋")}>🦋</li>
    </ol>
  );
}
