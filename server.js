import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

function artwork(url, size = 600) {
  if (!url) return "";
  return url.replace(/100x100bb|60x60bb|30x30bb/g, `${size}x${size}bb`);
}

function mapItunes(item) {
  return {
    type: "song",
    title: item.trackName || item.collectionName || "Cancion",
    artist: item.artistName || "Artista",
    detail: item.primaryGenreName || "Preview oficial",
    stream: item.previewUrl || "",
    cover: artwork(item.artworkUrl100),
    source: "Apple Music Preview"
  };
}

app.use(express.static("."));

app.get("/api/music/search", async (req, res) => {
  const q = String(req.query.q || "").trim();
  const limit = Math.min(Number(req.query.limit || 24), 50);

  if (!q) {
    res.json({ results: [] });
    return;
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&media=music&limit=${limit}&country=ES`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`iTunes status ${response.status}`);
    const data = await response.json();
    const results = (data.results || []).map(mapItunes).filter((item) => item.stream);
    res.json({ results });
  } catch (error) {
    res.status(502).json({ error: "music_search_failed", results: [] });
  }
});

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: process.cwd() });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CarMusicaFree escuchando en http://0.0.0.0:${PORT}`);
});
