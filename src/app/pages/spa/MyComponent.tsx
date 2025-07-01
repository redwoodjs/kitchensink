"use client";

import { useState } from "react";

export function MyComponent() {
  const [isCSR, setIsCSR] = useState(false);

  return (
    <button onClick={() => setIsCSR(!isCSR)}>
      {isCSR ? "CSR Routing" : "SSR Routing"}
    </button>
  );
}
