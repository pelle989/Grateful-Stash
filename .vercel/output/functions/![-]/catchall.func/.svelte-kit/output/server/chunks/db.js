import { Pool } from "pg";
import { b as private_env } from "./shared-server.js";
const DATABASE_URL = private_env.DATABASE_URL ?? process.env.DATABASE_URL ?? "";
const DATABASE_URL_UNPOOLED = private_env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL_UNPOOLED ?? "";
let readPool = null;
let writePool = null;
function getReadPool() {
  if (!DATABASE_URL) return null;
  readPool ??= new Pool({ connectionString: DATABASE_URL });
  return readPool;
}
function getWritePool() {
  if (!DATABASE_URL_UNPOOLED) return null;
  writePool ??= new Pool({ connectionString: DATABASE_URL_UNPOOLED });
  return writePool;
}
function mapSummary(row) {
  return {
    id: String(row.id),
    name: String(row.name),
    albumCount: Number(row.album_count),
    createdAt: new Date(String(row.created_at)).toISOString(),
    stashPreview: Array.isArray(row.stash_preview_json) ? row.stash_preview_json : []
  };
}
async function listStashes() {
  const pool = getReadPool();
  if (!pool) {
    return { stashes: [], databaseAvailable: false };
  }
  const result = await pool.query(
    `select id, name, album_count, created_at, stash_preview_json
     from stashes
     order by created_at desc
     limit 10`
  );
  return {
    stashes: result.rows.map(mapSummary),
    databaseAvailable: true
  };
}
async function getStash(id) {
  const pool = getReadPool();
  if (!pool) return null;
  const summaryResult = await pool.query(
    `select id, name, album_count, created_at, stash_preview_json
     from stashes
     where id = $1`,
    [id]
  );
  if (summaryResult.rowCount === 0) return null;
  const albumsResult = await pool.query(
    `select id, title, artist, year, genre, label, format, discogs_id, notes
     from stash_albums
     where stash_id = $1
     order by row_order asc`,
    [id]
  );
  const summary = mapSummary(summaryResult.rows[0]);
  return {
    ...summary,
    albums: albumsResult.rows.map((row) => ({
      id: String(row.id),
      title: String(row.title),
      artist: String(row.artist),
      year: row.year ? Number(row.year) : void 0,
      genre: Array.isArray(row.genre) ? row.genre : void 0,
      label: row.label ? String(row.label) : void 0,
      format: row.format ? String(row.format) : void 0,
      discogsId: row.discogs_id ? String(row.discogs_id) : void 0,
      notes: row.notes ? String(row.notes) : void 0
    }))
  };
}
async function createStash(args) {
  const pool = getWritePool();
  if (!pool) {
    throw new Error("DATABASE_URL_UNPOOLED is not configured");
  }
  const result = await pool.query(
    "select * from create_stash($1::text, $2::jsonb, $3::text)",
    [args.name, JSON.stringify(args.albums), args.ipHash]
  );
  const row = result.rows[0];
  if (!row) {
    throw new Error("create_stash returned no rows");
  }
  if (row.outcome === "rate_limited") {
    const error = new Error("Rate limited");
    error.name = "RateLimitError";
    throw error;
  }
  return mapSummary(row);
}
export {
  createStash as c,
  getStash as g,
  listStashes as l
};
