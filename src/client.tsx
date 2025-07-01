import { initClient, initClientNavigation } from "rwsdk/client";
import { initRealtimeClient } from "rwsdk/realtime/client";

// initRealtimeClient({
//   key: window.location.pathname, // Used to group related clients
// });

// should we use localstorage?

window.localStorage.getItem("mode");

// I need to switch this out based on the flag that the user has set, so...
