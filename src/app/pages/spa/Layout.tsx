import { unstable_ViewTransition as ViewTransition } from "react";
import { LayoutProps } from "rwsdk/router";

export const ViewTransitionLayout = ({ children }: LayoutProps) => {
  return (
    <div className="p-5">
      <div className="bg-amber-200 mb-2">
        I am the layout: Static, unchanging. Never alone.
      </div>
      <ViewTransition enter="slide-in">{children}</ViewTransition>
    </div>
  );
};
