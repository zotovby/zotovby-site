import pg from "pg";

const { Pool } = pg;

export type GuestEntry = {
  id: number;
  name: string;
  city: string;
  homepage: string;
  message: string;
  createdAt: Date;
};

export type NewEntry = {
  name: string;
  city: string;
  homepage: string;
  message: string;
};

export type VoteTally = Record<string, number>;

export const VOTE_OPTIONS = [
  "Клёво!!!",
  "Супер!",
  "Отпад",
  "Ничего особенного",
] as const;

export type VoteOption = (typeof VOTE_OPTIONS)[number];

export function isVoteOption(value: string): value is VoteOption {
  return (VOTE_OPTIONS as readonly string[]).includes(value);
}

export interface Store {
  bumpCounter(): Promise<number>;
  readCounter(): Promise<number>;
  listEntries(limit: number): Promise<GuestEntry[]>;
  countEntries(): Promise<number>;
  addEntry(entry: NewEntry): Promise<void>;
  castVote(option: VoteOption): Promise<void>;
  tally(): Promise<VoteTally>;
}

/** Живёт, пока живёт процесс. Нужна, чтобы страничку можно было крутить без базы. */
class MemoryStore implements Store {
  #hits = 1337;
  #entries: GuestEntry[] = [];
  #nextId = 1;
  #votes: VoteTally = Object.fromEntries(VOTE_OPTIONS.map((o) => [o, 0]));

  async bumpCounter(): Promise<number> {
    this.#hits += 1;
    return this.#hits;
  }

  async readCounter(): Promise<number> {
    return this.#hits;
  }

  async listEntries(limit: number): Promise<GuestEntry[]> {
    return this.#entries.slice(0, limit);
  }

  async countEntries(): Promise<number> {
    return this.#entries.length;
  }

  async addEntry(entry: NewEntry): Promise<void> {
    this.#entries.unshift({ id: this.#nextId++, createdAt: new Date(), ...entry });
  }

  async castVote(option: VoteOption): Promise<void> {
    this.#votes[option] = (this.#votes[option] ?? 0) + 1;
  }

  async tally(): Promise<VoteTally> {
    return { ...this.#votes };
  }
}

class PostgresStore implements Store {
  readonly #pool: pg.Pool;
  readonly #schema: string;

  constructor(connectionString: string, schema: string) {
    const internal = /\.railway\.internal(:|\/|$)/.test(connectionString);
    this.#schema = schema;
    this.#pool = new Pool({
      connectionString,
      ssl: internal ? undefined : { rejectUnauthorized: false },
      max: 4,
      // Своя схема: база общая с другим проектом, в public не лезем.
      options: `-c search_path=${schema}`,
    });
  }

  async init(): Promise<void> {
    await this.#pool.query(`CREATE SCHEMA IF NOT EXISTS "${this.#schema}"`);
    await this.#pool.query(`
      CREATE TABLE IF NOT EXISTS counter (
        id    text PRIMARY KEY,
        hits  bigint NOT NULL DEFAULT 0
      )
    `);
    await this.#pool.query(`
      CREATE TABLE IF NOT EXISTS guestbook (
        id         serial PRIMARY KEY,
        name       text NOT NULL,
        city       text NOT NULL DEFAULT '',
        homepage   text NOT NULL DEFAULT '',
        message    text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await this.#pool.query(`
      CREATE TABLE IF NOT EXISTS votes (
        option text PRIMARY KEY,
        count  integer NOT NULL DEFAULT 0
      )
    `);
    await this.#pool.query(
      `INSERT INTO counter (id, hits) VALUES ('main', 1337) ON CONFLICT (id) DO NOTHING`,
    );
    for (const option of VOTE_OPTIONS) {
      await this.#pool.query(
        `INSERT INTO votes (option, count) VALUES ($1, 0) ON CONFLICT (option) DO NOTHING`,
        [option],
      );
    }
  }

  async bumpCounter(): Promise<number> {
    const res = await this.#pool.query<{ hits: string }>(
      `UPDATE counter SET hits = hits + 1 WHERE id = 'main' RETURNING hits`,
    );
    return Number(res.rows[0]?.hits ?? 0);
  }

  async readCounter(): Promise<number> {
    const res = await this.#pool.query<{ hits: string }>(
      `SELECT hits FROM counter WHERE id = 'main'`,
    );
    return Number(res.rows[0]?.hits ?? 0);
  }

  async listEntries(limit: number): Promise<GuestEntry[]> {
    const res = await this.#pool.query<{
      id: number;
      name: string;
      city: string;
      homepage: string;
      message: string;
      created_at: Date;
    }>(
      `SELECT id, name, city, homepage, message, created_at
         FROM guestbook ORDER BY id DESC LIMIT $1`,
      [limit],
    );
    return res.rows.map((r) => ({
      id: r.id,
      name: r.name,
      city: r.city,
      homepage: r.homepage,
      message: r.message,
      createdAt: r.created_at,
    }));
  }

  async countEntries(): Promise<number> {
    const res = await this.#pool.query<{ count: string }>(
      `SELECT count(*) AS count FROM guestbook`,
    );
    return Number(res.rows[0]?.count ?? 0);
  }

  async addEntry(entry: NewEntry): Promise<void> {
    await this.#pool.query(
      `INSERT INTO guestbook (name, city, homepage, message) VALUES ($1, $2, $3, $4)`,
      [entry.name, entry.city, entry.homepage, entry.message],
    );
  }

  async castVote(option: VoteOption): Promise<void> {
    await this.#pool.query(
      `UPDATE votes SET count = count + 1 WHERE option = $1`,
      [option],
    );
  }

  async tally(): Promise<VoteTally> {
    const res = await this.#pool.query<{ option: string; count: number }>(
      `SELECT option, count FROM votes`,
    );
    const out: VoteTally = Object.fromEntries(VOTE_OPTIONS.map((o) => [o, 0]));
    for (const row of res.rows) out[row.option] = row.count;
    return out;
  }
}

/** Имя схемы уходит в SQL как есть, поэтому пускаем только простые идентификаторы. */
function resolveSchema(): string {
  const raw = process.env.DB_SCHEMA?.trim() || "zotovby";
  if (!/^[a-z_][a-z0-9_]{0,62}$/.test(raw)) {
    throw new Error(`DB_SCHEMA="${raw}" — ожидается [a-z_][a-z0-9_]*`);
  }
  return raw;
}

export async function createStore(): Promise<{ store: Store; kind: string }> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("DATABASE_URL не задан — гостевая книга и счётчик живут в памяти процесса.");
    return { store: new MemoryStore(), kind: "memory" };
  }
  const schema = resolveSchema();
  const store = new PostgresStore(url, schema);
  await store.init();
  return { store, kind: `postgres (${schema})` };
}
