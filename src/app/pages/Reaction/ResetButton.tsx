"use client";

import { resetActions } from "./functions";

export function ResetButton() {
  return (
    <button onClick={() => resetActions()}>Perform the resettenning</button>
  );
}
