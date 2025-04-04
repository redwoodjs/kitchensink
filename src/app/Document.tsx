export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>RedwoodSDK</title>
      <link href="/src/styles.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <script type="module" src="/src/client.tsx"></script>
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
);
