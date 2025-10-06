(async () => {
  const networkTransport =
    window.localStorage.getItem("networkTransport") || "fetch";
  const navigationMode =
    window.localStorage.getItem("navigationMode") || "server";

  let handleResponse: ((response: Response) => boolean) | undefined = undefined;

  if (networkTransport === "realtime") {
    console.log("initializing realtime client");
    const { initRealtimeClient } = await import("rwsdk/realtime/client");

    if (navigationMode === "client") {
      console.log("initializing client navigation for realtime");
      const { initClientNavigation } = await import("rwsdk/client");
      const nav = initClientNavigation();
      handleResponse = nav.handleResponse;
    }

    initRealtimeClient({ handleResponse });
  } else {
    // fetch
    const rwsdkClient = await import("rwsdk/client");

    if (navigationMode === "client") {
      console.log("initializing client navigation for fetch");
      const nav = rwsdkClient.initClientNavigation();
      handleResponse = nav.handleResponse;
    }

    rwsdkClient.initClient({
      handleResponse: (response) => {
        console.log("handleResponse", response);
        console.log(response.ok);
        return handleResponse?.(response) ?? false;
      },
    });
  }
})();
