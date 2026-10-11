import { defineRailway, preserve, project, service } from "railway/iac";

// Этот репозиторий описывает только сервис zotov-by. В проекте nohable живут ещё чужой
// app и общий Postgres: их тут нет, и partial гарантирует, что apply их не тронет
// (без partial всё, чего нет в файле, считается подлежащим удалению).
export const partial = "zotov-by";

export default defineRailway(() => {
  const zotovBy = service("zotov-by", {
    replicas: { "europe-west4-drams3a": 1 },
    domains: [{ domain: "zotov.by", port: 3000 }],
    // node напрямую, а не `npm run start`: npm висит родителем и съедает ~40 МБ.
    // Флаги V8 не дают куче разрастаться: живых данных ~12 МБ, лимит 32 — с запасом.
    start: "node --max-old-space-size=32 --max-semi-space-size=1 dist/server.js",
    // Serverless: без исходящего трафика 5–10 минут сервис засыпает и не тратит память.
    // Пул pg сам закрывает простаивающие соединения через 10 с, сну он не мешает.
    deploy: { sleepApplication: true },
    env: {
      DATABASE_URL: preserve(),
      DB_SCHEMA: "zotovby",
      // Домен привязан к порту 3000, без явного PORT Railway подставит 8080 и будет 502.
      PORT: "3000",
    },
  });

  return project("nohable", { resources: [zotovBy] });
});
