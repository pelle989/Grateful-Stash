import { l as listStashes, c as createStash } from "../../../../chunks/db.js";
import { createHash } from "node:crypto";
import { json } from "@sveltejs/kit";
function getIpHash(headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  const fallback = headers.get("x-real-ip") ?? "";
  const ip = (forwardedFor?.split(",")[0] ?? fallback).trim();
  return createHash("sha256").update(ip).digest("hex");
}
const REQUIRED_HEADERS = ["artist", "title"];
const HEADER_MAP = {
  artist: "artist",
  "artist(s)": "artist",
  artist_name: "artist",
  artistname: "artist",
  "artist.name": "artist",
  "song.artist_name": "artist",
  band: "artist",
  performer: "artist",
  musician: "artist",
  creator: "artist",
  album_artist: "artist",
  "album artist": "artist",
  track_artist: "artist",
  "track artist": "artist",
  artist_id: "artist",
  title: "title",
  album: "title",
  "album title": "title",
  "release title": "title",
  album_title: "title",
  albumtitle: "title",
  "release.name": "title",
  "song.title": "title",
  track: "title",
  track_title: "title",
  "track title": "title",
  release: "title",
  record: "title",
  lp: "title",
  album_name: "title",
  "album name": "title",
  song_name: "title",
  "song name": "title",
  release_id: "title",
  year: "year",
  "song.year": "year",
  released: "year",
  release_year: "year",
  "release year": "year",
  release_date: "year",
  "release date": "year",
  date: "year",
  original_year: "year",
  "original year": "year",
  genre: "genre",
  subgenre: "genre",
  style: "genre",
  "artist.terms": "genre",
  genres: "genre",
  subgenres: "genre",
  styles: "genre",
  category: "genre",
  categories: "genre",
  tags: "genre",
  keywords: "genre",
  label: "label",
  record_label: "label",
  "record label": "label",
  publisher: "label",
  imprint: "label",
  "release.id": "discogsId",
  format: "format",
  media: "format",
  medium: "format",
  type: "format",
  release_format: "format",
  "release format": "format",
  "discogs id": "discogsId",
  discogsid: "discogsId",
  discogs_release_id: "discogsId",
  "discogs release id": "discogsId",
  mbid: "discogsId",
  musicbrainz_id: "discogsId",
  notes: "notes"
};
function splitCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells.map((cell) => cell.trim());
}
function normalizeHeader(header) {
  return header.trim().toLowerCase();
}
function parseYear(raw) {
  if (!/^\d{4}$/.test(raw.trim())) return null;
  return Number(raw);
}
function parseGenres(raw) {
  return raw.split(",").map((part) => part.trim()).filter(Boolean);
}
function nullable(raw) {
  const value = raw.trim();
  return value.length > 0 ? value : null;
}
function createRowObject(headers, values) {
  const base = {
    artist: "",
    title: "",
    year: "",
    genre: "",
    label: "",
    format: "",
    discogsId: "",
    notes: ""
  };
  headers.forEach((header, index) => {
    const mapped = HEADER_MAP[header];
    if (!mapped) return;
    base[mapped] = values[index] ?? "";
  });
  return base;
}
function resolveCanonicalHeaders(headers) {
  return headers.map((header) => {
    const mapped = HEADER_MAP[header];
    if (mapped === "artist") return "artist";
    if (mapped === "title") return "title";
    return header;
  });
}
function parseCsv(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { validAlbums: 0, skippedRows: 0, albums: [] };
  }
  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  const canonicalHeaders = resolveCanonicalHeaders(headers);
  const hasRequiredHeaders = REQUIRED_HEADERS.every((header) => canonicalHeaders.includes(header));
  if (!hasRequiredHeaders) {
    return { validAlbums: 0, skippedRows: Math.max(lines.length - 1, 0), albums: [] };
  }
  const albums = [];
  let skippedRows = 0;
  for (const line of lines.slice(1)) {
    const row = createRowObject(headers, splitCsvLine(line));
    const artist = row.artist.trim();
    const title = row.title.trim();
    if (!artist || !title) {
      skippedRows += 1;
      continue;
    }
    albums.push({
      artist,
      title,
      year: parseYear(row.year),
      genre: parseGenres(row.genre),
      label: nullable(row.label),
      format: nullable(row.format),
      discogsId: nullable(row.discogsId),
      notes: nullable(row.notes)
    });
  }
  return {
    validAlbums: albums.length,
    skippedRows,
    albums
  };
}
function fileLooksTooLarge(size) {
  return size > 5 * 1024 * 1024;
}
function validateStashName(name) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Stash name is required.");
  if (trimmed.length > 100) throw new Error("Stash name must be 100 characters or fewer.");
  return trimmed;
}
async function parseUploadFile(file) {
  if (fileLooksTooLarge(file.size)) {
    throw new Error("CSV file must be 5 MB or smaller.");
  }
  const text = await file.text();
  const preview = parseCsv(text);
  if (preview.validAlbums === 0) {
    throw new Error("No valid rows found. The CSV must include Artist and Title columns.");
  }
  if (preview.validAlbums > 2e3) {
    throw new Error("Stashes are limited to 2,000 valid albums.");
  }
  return preview;
}
const GET = async () => {
  return json(await listStashes());
};
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const rawName = formData.get("name");
    const file = formData.get("file");
    if (!(typeof rawName === "string") || !(file instanceof File)) {
      return json({ message: "A stash name and CSV file are required." }, { status: 400 });
    }
    const name = validateStashName(rawName);
    const preview = await parseUploadFile(file);
    const ipHash = getIpHash(request.headers);
    const stash = await createStash({
      name,
      albums: preview.albums,
      ipHash
    });
    return json({ stash });
  } catch (error) {
    if (error instanceof Error && error.name === "RateLimitError") {
      return json({ message: "Too many stash uploads from this IP. Please try again later." }, { status: 429 });
    }
    if (error instanceof Error) {
      return json({ message: error.message }, { status: 400 });
    }
    return json({ message: "Unexpected server error." }, { status: 500 });
  }
};
export {
  GET,
  POST
};
