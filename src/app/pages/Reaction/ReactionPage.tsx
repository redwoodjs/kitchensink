import { EmojiPicker } from "./EmojiPicker";

import { getReactions } from "./functions";

export function ReactionPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 text-4xl flex items-center justify-center relative">
        {getReactions().map((emoji, index) => {
          // Use index as part of the calculation for consistent positioning
          // This creates a pseudo-random but stable distribution
          const left = ((index * 37) % 80) + 10; // 10% to 90% of container width
          const top = ((index * 23) % 80) + 10; // 10% to 90% of container height

          return (
            <span
              key={index}
              className="float-up absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%)", // Center the emoji on its position
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>
      <div className="mt-auto">
        <EmojiPicker />
      </div>
    </div>
  );
}
