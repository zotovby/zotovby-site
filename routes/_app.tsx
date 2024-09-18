import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗿</text></svg>"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sergey Zotov - @zotovby</title>
        <meta name="description" content="Personal page of Sergey Zotov @zotovby" />
        <meta name="keywords" content="Sergey Zotov, zotovby, personal page, social media" />
        <meta name="author" content="Sergey Zotov" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
