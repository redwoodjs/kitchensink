"use client";

import { useEffect, useState } from "react";

export const ToggleNavigationModes = () => {
  const [navigationMode, setNavigationMode] = useState("server");
  const [networkTransport, setNetworkTransport] = useState("fetch");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNavigationMode(
        window.localStorage.getItem("navigationMode") || "server"
      );
      setNetworkTransport(
        window.localStorage.getItem("networkTransport") || "fetch"
      );
    }
  }, []);

  return (
    <div className="flex gap-4 justify-center border-2 border-gray-300 p-4 rounded-md">
      <div>
        <input
          type="checkbox"
          id="navigationMode"
          checked={navigationMode === "client"}
          onChange={(e) => {
            setNavigationMode(e.target.checked ? "client" : "server");
            window.localStorage.setItem(
              "navigationMode",
              e.target.checked ? "client" : "server"
            );
            window.location.reload();
          }}
        />{" "}
        <label className="font-bold" htmlFor="navigationMode">
          Navigation: Client Side
        </label>
        <p className="text-sm text-gray-500">
          When client-side navigation is enabled, the navigation events are
          hijacked by JavaScript. When you click on a link, RedwoodSDK will
          request the RSC flight data for that page, and React's client-side
          hydration to figure out which content has changed.
        </p>
      </div>
      <div>
        <input
          type="checkbox"
          id="networkTransport"
          checked={networkTransport === "realtime"}
          onChange={(e) => {
            setNetworkTransport(e.target.checked ? "realtime" : "fetch");
            window.localStorage.setItem(
              "networkTransport",
              e.target.checked ? "realtime" : "fetch"
            );
            window.location.reload();
          }}
        />{" "}
        <label className="font-bold" htmlFor="networkTransport">
          Network Transport: Realtime
        </label>
        <p className="text-sm text-gray-500">
          When real-time transport is enabled, RSC communication happens over
          websockets. When you perform a server action, or when client-side-nav
          is enabled, that is requested over the WebSocket, and the result as
          well as the new page content is returned over the WebSocket.
        </p>
      </div>
    </div>
  );
};
