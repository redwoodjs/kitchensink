import { LayoutProps } from "rwsdk/router";
import { ToggleNavigationModes } from "./components/ToggleNavigationModes";

export const ViewTransitionLayout = ({ children }: LayoutProps) => {
  return (
    <div className="p-5">
      <div className="bg-amber-200 mb-2">
        <img src="https://media.tenor.com/SB66UNkGc0gAAAAM/sloth-slow.gif" />
      </div>
      <h1 className="text-2xl font-bold">Navigation Examples</h1>
      <ToggleNavigationModes />
      {children}
    </div>
  );
};
