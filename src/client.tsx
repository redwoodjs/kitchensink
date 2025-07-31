import { initClient, initClientNavigation } from "rwsdk/client";
import { initRealtimeClient } from "rwsdk/realtime/client";

const networkTransport =
  window.localStorage.getItem("networkTransport") || "fetch";

let handleResponse = undefined;
const navigationMode =
  window.localStorage.getItem("navigationMode") || "server";
if (navigationMode === "client") {
  console.log("initializing client navigation");
  const nav = initClientNavigation();
  handleResponse = nav.handleResponse;
}

if (networkTransport === "realtime") {
  console.log("initializing realtime client");
  initRealtimeClient({ key: window.location.href, handleResponse });
} else {
  initClient({
    handleResponse: (response) => {
      console.log("handleResponse", response);
      console.log(response.ok);
      return handleResponse(response);
    },
  });
}
