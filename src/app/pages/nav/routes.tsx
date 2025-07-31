import { route, layout } from "rwsdk/router";

import { renderToStream } from "rwsdk/worker";

import { ViewTransitionLayout } from "./Layout";
import { Document } from "@/app/Document";

export const routes = [
  layout(ViewTransitionLayout, [
    route(
      "/",
      () =>
        new Response(null, {
          status: 302,
          headers: { location: "/nav/page-1" },
        })
    ),
    route("/page-1", () => (
      <div>
        <title>Page 1</title>
        <h1 className="text-2xl font-bold">Page 1</h1>
        goto{" "}
        <a href="/nav/page-2" className="text-blue-500 underline">
          Goto: Page 2
        </a>
        <div className="bg-orange-500 p-5 w-2xl">Hello</div>
      </div>
    )),
    route("/page-2", () => (
      <div>
        <title>Page 2</title>
        <h1 className="text-2xl font-bold">Page 2</h1>
        goto{" "}
        <a href="/nav/page-1" className="text-blue-500 underline">
          Goto: Page 1
        </a>
        <div className="bg-green-500 p-5">World</div>
      </div>
    )),
  ]),
  route("/*", async () => {
    const stream = await renderToStream(
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-2xl">Page not found</p>
      </div>,
      { Document }
    );
    return new Response(stream, {
      status: 404,
      headers: { "Content-Type": "text/html" },
    });
  }),
];
