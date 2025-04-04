"use client";

import { addReaction } from "./functions";
import { useEffect } from "react";

export function EmojiPicker() {
  const emojis = ["❤️", "🔥", "🦋", "👍", "😂", "🎉", "🌟", "💯", "🚀"];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key pressed is a number between 1-9
      const keyNum = parseInt(event.key);
      if (keyNum >= 1 && keyNum <= 9) {
        // Subtract 1 from the key number to get the correct index (0-based)
        const emojiIndex = keyNum - 1;
        if (emojiIndex < emojis.length) {
          addReaction(emojis[emojiIndex]);
        }
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ol className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/50">
      {emojis.map((emoji, index) => (
        <li
          key={emoji}
          className="text-4xl hover:scale-150 transition-transform cursor-pointer relative group flex flex-col items-center"
          onClick={() => addReaction(emoji)}
        >
          {emoji}
          <span className="mt-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            {index + 1}
          </span>
        </li>
      ))}
    </ol>
  );
}
