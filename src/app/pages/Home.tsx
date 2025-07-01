import { ClientComponent } from "./ClientC";

const Feature = ({ children }: { children: React.ReactNode }) => {
  return <li className="bg-white p-4 rounded-md min-h-20 max-w">{children}</li>;
};

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center h-screen py-16">
      <h1 className="text-4xl font-bold">The KitchenSink</h1>
      <p className="text-lg">
        This is an experimental repo that shows off the main features of
        RedwoodSDK
      </p>

      <ul className="grid grid-cols-2 gap-8 m-8">
        <Feature>
          <h2 className="text-2xl font-bold mb-4">Render modes</h2>
          <p>
            We say that "you control every byte." What we mean by this is that
            every byte that is sent over the wire is accessible to you. We do
            not abstract anything.
          </p>
          <p>SSR, CSR, SSG, ISR</p>
        </Feature>
        <Feature>
          <h2 className="text-2xl font-bold mb-4">Transports</h2>
          <p>
            We support both Fetch and WebSocket transports. You can use them
            interchangeably.
          </p>
          <p>Fetch, WebSocket</p>
        </Feature>
        <Feature>
          <h2 className="text-2xl font-bold mb-4">RSC</h2>
          <p>
            Server components, client components, and server functions.
            Supported in node_modules.
          </p>
          <p>What are the main features: Suspense, streaming, etc.</p>
        </Feature>
        <Feature>
          <h2 className="text-2xl font-bold mb-4">Routing</h2>
          <p>
            Routing is handled by the server, but we provide a client-side
            mechanism. This allows you to the use the same definition on client
            and server, but have a smoother transition between views.
          </p>
          <a href="/routing/spa" className="text-blue-400">
            Client Side Routing (SPA Mode)
          </a>
          <ClientComponent />
        </Feature>
      </ul>
    </div>
  );
};
