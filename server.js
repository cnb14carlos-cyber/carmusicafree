"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/api/music/search") {
      const q = url.searchParams.get("q") || "";
      const limit = Math.min(Number(url.searchParams.get("limit") || 12), 25);
      const results = await searchMusic(q, limit);
      res.writeHead(200, {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
        "access-control-allow-origin": "*"
      });
      res.end(JSON.stringify({ results }));
      return;
    }

    const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
    const filePath = path.join(ROOT, safePath === "/" ? "index.html" : safePath);
    const resolved = filePath.startsWith(ROOT) ? filePath : path.join(ROOT, "index.html");
    const finalPath = fs.existsSync(resolved) && fs.statSync(resolved).isFile() ? resolved : path.join(ROOT, "index.html");
    const ext = path.extname(finalPath);
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" });
    fs.createReadStream(finalPath).pipe(res);
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Error interno");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`CarMusicFree escuchando en http://0.0.0.0:${PORT}`);
});

async function searchMusic(query, limit) {
  if (!query.trim()) return [];

  const [itunes, deezer] = await Promise.allSettled([
    searchItunes(query, limit),
    searchDeezer(query, limit)
  ]);

  const rows = [
    ...(itunes.status === "fulfilled" ? itunes.value : []),
    ...(deezer.status === "fulfilled" ? deezer.value : [])
  ];

  const seen = new Set();
  return rows.filter((song) => {
    const key = `${song.artistName}|${song.trackName}`.toLowerCase();
    if (seen.has(key) || !song.previewUrl) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

async function searchItunes(query, limit) {
  const target = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${encodeURIComponent(limit)}&country=ES`;
  const response = await fetch(target);
  if (!response.ok) return [];
  const data = await response.json();
  return data.results || [];
}

async function searchDeezer(query, limit) {
  const target = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=${encodeURIComponent(limit)}`;
  const response = await fetch(target);
  if (!response.ok) return [];
  const data = await response.json();
  return (data.data || []).map((item) => ({
    trackId: `deezer:${item.id}`,
    trackName: item.title,
    artistName: item.artist?.name || "",
    collectionName: item.album?.title || "",
    artworkUrl100: item.album?.cover_big || item.album?.cover_medium || "",
    previewUrl: item.preview,
    trackTimeMillis: 30000,
    sourceName: "Deezer"
  }));
}
