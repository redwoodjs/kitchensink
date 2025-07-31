import { LayoutProps } from "rwsdk/router";
import { ToggleNavigationModes } from "@/app/components/ToggleNavigationModes";
import { PageLinks } from "@/app/components/PageLinks";

export const ViewTransitionLayout = ({ children }: LayoutProps) => {
  return (
    <div className="p-5">
      <div className="mb-2 flex items-center gap-2">
        <img src="https://media.tenor.com/SB66UNkGc0gAAAAM/sloth-slow.gif" />
        <marquee>
          <h1 className="text-4xl font-bold">The sloth is slow.</h1>

          <div className="text-sm text-gray-500">
            If this marquee's animation does not "restart" on navigation, you're
            using client side navigation. Only the content that changes will
            reload.
          </div>
        </marquee>
      </div>

      <div className="mb-2 w-2/3 mx-auto">
        <ToggleNavigationModes />
      </div>

      <br />
      <PageLinks />
      {children}
    </div>
  );
};
