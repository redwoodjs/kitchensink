import { route, render, layout } from "rwsdk/router";
import { SpaDocument } from "./spaDocument";
import { ViewTransitionLayout } from "./Layout";

export const routes = [
  render(SpaDocument, [
    layout(ViewTransitionLayout, [
      route("/page-1", () => (
        <div>
          <title>Page 1</title>
          <h1 className="text-2xl font-bold">Page 1</h1>
          goto{" "}
          <a href="/spa/page-2" className="text-blue-500 underline">
            Page 2
          </a>
          <div className="bg-orange-500 p-5">Hello</div>
        </div>
      )),
      route("/page-2", () => (
        <div>
          <title>Page 2</title>
          <h1 className="text-2xl font-bold">Page 2</h1>
          goto{" "}
          <a href="/spa/page-1" className="text-blue-500 underline">
            Page 1
          </a>
          <div className="bg-green-500 p-5">World</div>
        </div>
      )),
    ]),
  ]),
];
