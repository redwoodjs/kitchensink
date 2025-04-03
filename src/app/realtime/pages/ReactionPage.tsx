import { EmojiPicker } from "./EmojiPicker";

import { EMOJIS } from "./functions";

export function ReactionPage() {
  return (
    <div>
      {EMOJIS.join(" ")}
      <EmojiPicker />
    </div>
  );
}
