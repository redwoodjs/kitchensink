import { initRealtimeClient } from "@redwoodjs/sdk/realtime/client";

initRealtimeClient({
  key: "redwood-realtime-client-key",
});
console.log("Realtime Client Initialized.");
