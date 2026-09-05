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
  ".json": "application/json; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/api/music/search") {
      const q = url.searchParams.get("q") || "";
      const limit = Math.min(Number(url.searchParams.get("limit") || 12), 25);
      const results = await searchMusic(q, limit);
      json(res, 200, { results });
      return;
    }

    const requested = url.pathname === "/" ? "/index.html" : url.pathname;
    const safePath = path.normalize(decodeURIComponent(requested)).replace(/^(\.\.[/\\])+/, "");
    const filePath = path.join(ROOT, safePath);
    const finalPath = filePath.startsWith(ROOT) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()
      ? filePath
      : path.join(ROOT, "index.html");
    const ext = path.extname(finalPath);
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" });
    fs.createReadStream(finalPath).pipe(res);
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Error interno");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`CarMusicFree en http://0.0.0.0:${PORT}`);
});

function json(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*"
  });
  res.end(JSON.stringify(payload));
}

async function searchMusic(query, limit) {
  if (!query.trim()) return [];
  const target = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${limit}&country=ES`;
  const response = await fetch(target);
  if (!response.ok) return [];
  const data = await response.json();
  return data.results || [];
}
