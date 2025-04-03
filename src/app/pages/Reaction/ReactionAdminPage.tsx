import { getReactions } from "./functions";
import { ResetButton } from "./ResetButton";

export function ReactionAdminPage() {
  return (
    <div>
      {getReactions().join(" ")}
      <br />
      <ResetButton />
    </div>
  );
}
