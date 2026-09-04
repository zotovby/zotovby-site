import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { fileURLToPath } from "node:url";

import { createStore, isVoteOption, type Store } from "./db.js";
import { aboutPage } from "./pages/about.js";
import { computerPage } from "./pages/computer.js";
import { framesPage } from "./pages/frames.js";
import { guestbookPage } from "./pages/guestbook.js";
import { homePage } from "./pages/home.js";
import { linksPage } from "./pages/links.js";
import { menuPage } from "./pages/menu.js";
import { notFoundPage } from "./pages/notfound.js";
import { photosPage } from "./pages/photos.js";
import { splashPage } from "./pages/splash.js";
import { votePage } from "./pages/vote.js";

const MAX_ENTRIES_SHOWN = 50;
const POST_INTERVAL_MS = 30_000;

const publicRoot = fileURLToPath(new URL("../public/", import.meta.url));
const { store, kind } = await createStore();

const app = new Hono<{ Variables: { store: Store } }>();

for (const path of ["/img/*", "/music/*", "/favicon.ico", "/robots.txt", "/sitemap.xml", "/cursor.js"]) {
  app.use(path, serveStatic({ root: publicRoot }));
}

app.get("/", (c) => c.html(splashPage()));
app.get("/main", (c) => c.html(framesPage()));

app.get("/menu", (c) => c.html(menuPage(c.req.query("music") !== "off")));

app.get("/home", async (c) => c.html(homePage(await store.bumpCounter())));
app.get("/about", (c) => c.html(aboutPage()));
app.get("/computer", (c) => c.html(computerPage()));
app.get("/links", (c) => c.html(linksPage()));
app.get("/photos", (c) => c.html(photosPage()));

app.get("/guestbook", async (c) => {
  const [entries, total] = await Promise.all([
    store.listEntries(MAX_ENTRIES_SHOWN),
    store.countEntries(),
  ]);
  const error = c.req.query("error");
  return c.html(guestbookPage(entries, total, error));
});

/** Кто когда писал — чтобы одна и та же машина не забивала книгу. */
const lastPostAt = new Map<string, number>();

function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}

function field(body: Record<string, string | File>, name: string): string {
  const value = body[name];
  return typeof value === "string" ? value.trim() : "";
}

/** В href пускаем только http(s): иначе туда можно протащить javascript:. */
function safeHomepage(raw: string): string {
  if (!raw || raw === "http://" || raw === "https://") return "";
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `http://${raw}`;
  try {
    const url = new URL(withScheme);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

app.post("/guestbook", async (c) => {
  const body = await c.req.parseBody();

  // Приманка для роботов: поле спрятано, человек его не заполнит.
  if (field(body, "homepage_url")) return c.redirect("/guestbook", 303);

  const name = field(body, "name").slice(0, 40);
  const message = field(body, "message").slice(0, 2000);
  const city = field(body, "city").slice(0, 40);
  const homepage = safeHomepage(field(body, "homepage").slice(0, 200));

  if (!name || !message) {
    return c.redirect("/guestbook?error=Заполните имя и текст сообщения.", 303);
  }

  const key = clientKey(c.req.raw.headers);
  const now = Date.now();
  const previous = lastPostAt.get(key);
  if (previous !== undefined && now - previous < POST_INTERVAL_MS) {
    return c.redirect("/guestbook?error=Не так быстро! Подождите полминуты.", 303);
  }
  lastPostAt.set(key, now);

  await store.addEntry({ name, city, homepage, message });
  return c.redirect("/guestbook", 303);
});

app.get("/vote", async (c) =>
  c.html(votePage(await store.tally(), getCookie(c, "voted") === "1")),
);

app.post("/vote", async (c) => {
  if (getCookie(c, "voted") === "1") return c.redirect("/vote", 303);

  const body = await c.req.parseBody();
  const option = field(body, "option");
  if (!isVoteOption(option)) return c.redirect("/vote", 303);

  await store.castVote(option);
  setCookie(c, "voted", "1", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "Lax" });
  return c.redirect("/vote", 303);
});

app.notFound((c) => c.html(notFoundPage(), 404));

const port = Number(process.env.PORT ?? 3000);
serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Страничка поднята на порту ${info.port}, хранилище: ${kind}`);
});
