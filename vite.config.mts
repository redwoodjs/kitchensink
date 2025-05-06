import { defineConfig } from "vite";
import { redwood } from "rwsdk/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // context(justinvdm, 2025-04-16): Tailwind vite plugin requires SSR environment, we only have worker environment
  environments: { ssr: {} },
  plugins: [redwood(), tailwindcss()],
});
