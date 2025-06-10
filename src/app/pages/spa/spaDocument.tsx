import styles from "../../../styles.css?url";

export const SpaDocument: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Single Page App - Client With Navigation</title>
      <link rel="modulepreload" href="/src/app/pages/spa/spaClient.tsx" />
      <link href={styles} rel="stylesheet" />
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/app/pages/spa/spaClient.tsx")</script>
    </body>
  </html>
);
