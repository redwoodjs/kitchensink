import { EmojiPicker } from "./EmojiPicker";

import { getReactions } from "./functions";

export function ReactionPage() {
  return (
    <div>
      {getReactions().join(" ")}
      <EmojiPicker />
    </div>
  );
}
