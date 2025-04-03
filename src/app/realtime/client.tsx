import { initRealtimeClient } from "@redwoodjs/sdk/realtime/client";

initRealtimeClient({
    key: window.location.pathname,
});
console.log("Realtime Client Initialized.")