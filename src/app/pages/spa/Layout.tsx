import { LayoutProps } from "rwsdk/router";

export const ViewTransitionLayout = ({ children }: LayoutProps) => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">
        Client Side Routing (SPA Mode)
      </h1>
      {children}
    </div>
  );
};
