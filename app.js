"use strict";

const ITUNES_SEARCH = "https://itunes.apple.com/search";
const RADIO_SEARCH = "https://de1.api.radio-browser.info/json/stations/search";

const topArtists = [
  "Dani Martin",
  "Pablo Alboran",
  "Melendi",
  "Manuel Carrasco",
  "Alejandro Sanz",
  "Rosalia",
  "Aitana",
  "Quevedo",
  "Bad Bunny",
  "Dua Lipa",
  "The Weeknd",
  "Shakira"
];

const topSongQueries = [
  "Pablo Alboran Solamente Tu",
  "Pablo Alboran Saturno",
  "Dani Martin Cero",
  "Melendi Destino o Casualidad",
  "Manuel Carrasco No Dejes De Sonar",
  "Alejandro Sanz Corazon Partio",
  "Rosalia Despecha",
  "Aitana Mon Amour",
  "Quevedo Bzrp Music Sessions",
  "Shakira Te Felicito"
];

const spanishRadioNames = [
  "Los 40 Spain",
  "Cadena 100 Spain",
  "Cadena Dial Spain",
  "Rock FM Spain",
  "Kiss FM Spain",
  "Europa FM Spain",
  "Radio 3 RNE Spain",
  "Cadena SER Spain"
];

const state = {
  queue: [],
  currentIndex: -1,
  current: null,
  favorites: loadJson("cmf:favorites", []),
  profile: loadJson("cmf:profile", { name: "Carlos" }),
  lastRadio: null
};

const el = {
  audio: document.getElementById("audio"),
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("searchInput"),
  resultsPanel: document.getElementById("resultsPanel"),
  resultsTitle: document.getElementById("resultsTitle"),
  resultsGrid: document.getElementById("resultsGrid"),
  searchStatus: document.getElementById("searchStatus"),
  clearResults: document.getElementById("clearResults"),
  radioGrid: document.getElementById("radioGrid"),
  artistGrid: document.getElementById("artistGrid"),
  topSongs: document.getElementById("topSongs"),
  favoritesList: document.getElementById("favoritesList"),
  playTopSongs: document.getElementById("playTopSongs"),
  refreshRadios: document.getElementById("refreshRadios"),
  playerArt: document.getElementById("playerArt"),
  playerTitle: document.getElementById("playerTitle"),
  playerArtist: document.getElementById("playerArtist"),
  playButton: document.getElementById("playButton"),
  prevButton: document.getElementById("prevButton"),
  nextButton: document.getElementById("nextButton"),
  favoriteButton: document.getElementById("favoriteButton"),
  volumeControl: document.getElementById("volumeControl"),
  progressBar: document.getElementById("progressBar"),
  accountButton: document.getElementById("accountButton"),
  accountPanel: document.getElementById("accountPanel"),
  closeAccount: document.getElementById("closeAccount"),
  profileName: document.getElementById("profileName"),
  saveProfile: document.getElementById("saveProfile")
};

init();

function init() {
  el.audio.volume = Number(el.volumeControl.value);
  el.profileName.value = state.profile.name || "Carlos";
  bindEvents();
  renderFavorites();
  renderArtistPlaceholders();
  loadTopSongs();
  loadRadios();
}

function bindEvents() {
  el.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchEverything(el.searchInput.value.trim());
  });

  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => activateRoute(button.dataset.route));
  });

  el.clearResults.addEventListener("click", () => {
    el.resultsPanel.hidden = true;
    el.resultsGrid.replaceChildren();
    el.searchInput.value = "";
  });

  el.playButton.addEventListener("click", togglePlay);
  el.prevButton.addEventListener("click", playPrevious);
  el.nextButton.addEventListener("click", playNext);
  el.favoriteButton.addEventListener("click", toggleFavorite);
  el.playTopSongs.addEventListener("click", () => {
    if (state.queue.length) playTrack(state.queue[0], 0);
  });
  el.refreshRadios.addEventListener("click", loadRadios);

  el.volumeControl.addEventListener("input", () => {
    el.audio.volume = Number(el.volumeControl.value);
  });

  el.audio.addEventListener("play", () => {
    el.playButton.textContent = "Pause";
  });
  el.audio.addEventListener("pause", () => {
    el.playButton.textContent = "Play";
  });
  el.audio.addEventListener("timeupdate", updateProgress);
  el.audio.addEventListener("ended", playNext);
  el.audio.addEventListener("error", () => {
    el.playerArtist.textContent = "No se pudo reproducir esta fuente";
  });

  el.accountButton.addEventListener("click", () => {
    el.accountPanel.hidden = false;
  });
  el.closeAccount.addEventListener("click", () => {
    el.accountPanel.hidden = true;
  });
  el.saveProfile.addEventListener("click", () => {
    state.profile = { name: el.profileName.value.trim() || "Carlos" };
    saveJson("cmf:profile", state.profile);
    el.accountButton.querySelector("span:last-child").textContent = state.profile.name;
    el.accountPanel.hidden = true;
  });

  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", () => el.audio.play());
    navigator.mediaSession.setActionHandler("pause", () => el.audio.pause());
    navigator.mediaSession.setActionHandler("previoustrack", playPrevious);
    navigator.mediaSession.setActionHandler("nexttrack", playNext);
  }
}

function activateRoute(route) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.route === route);
  });

  document.querySelectorAll("[data-section]").forEach((section) => {
    section.scrollIntoView({ block: section.dataset.section === route ? "start" : "nearest" });
  });

  const target = document.querySelector(`[data-section="${route}"]`);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function searchEverything(query) {
  if (!query) return;
  el.resultsPanel.hidden = false;
  el.resultsTitle.textContent = `Busqueda: ${query}`;
  el.searchStatus.textContent = "Buscando artistas, canciones y radios en fuentes online...";
  el.resultsGrid.replaceChildren();

  try {
    const [songs, artists, radios] = await Promise.all([
      searchSongs(query, 12),
      searchArtists(query, 6),
      searchRadios(query, 8)
    ]);

    const items = [
      ...artists.map((item) => ({ ...item, resultType: "artist" })),
      ...songs.map((item) => ({ ...item, resultType: "song" })),
      ...radios.map((item) => ({ ...item, resultType: "radio" }))
    ];

    if (!items.length) {
      el.searchStatus.textContent = "No he encontrado resultados con audio oficial disponible. Prueba con otro nombre.";
      return;
    }

    el.searchStatus.textContent = `${items.length} resultados encontrados. Las canciones usan previews oficiales sin anuncios cuando estan disponibles.`;
    renderCards(el.resultsGrid, items);
  } catch (error) {
    el.searchStatus.textContent = "No se pudo buscar ahora. Revisa internet o prueba otra vez.";
  }
}

async function loadTopSongs() {
  const found = [];
  for (const query of topSongQueries) {
    const [track] = await searchSongs(query, 1).catch(() => []);
    if (track) found.push(track);
  }
  state.queue = found;
  renderSongs(el.topSongs, found);
  hydrateArtists(found);
}

async function loadRadios() {
  el.radioGrid.replaceChildren(cardSkeleton("Cargando radios..."));
  const results = [];
  for (const name of spanishRadioNames) {
    const [station] = await searchRadios(name, 1).catch(() => []);
    if (station) results.push(station);
  }
  renderCards(el.radioGrid, results);
}

async function searchSongs(query, limit = 12) {
  const local = `/api/music/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const remote = `${ITUNES_SEARCH}?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${limit}&country=ES`;
  const data = await fetchJson(firstServerThenRemote(local, remote));
  const rows = data.results || data.items || [];
  return rows.map(normalizeSong).filter((song) => song.previewUrl);
}

async function searchArtists(query, limit = 6) {
  const url = `${ITUNES_SEARCH}?term=${encodeURIComponent(query)}&media=music&entity=musicArtist&limit=${limit}&country=ES`;
  const data = await fetchJson(url);
  return (data.results || []).map((artist) => ({
    id: `artist:${artist.artistId}`,
    type: "artist",
    title: artist.artistName,
    artist: artist.primaryGenreName || "Artista",
    art: artist.artworkUrl100 || "",
    query: artist.artistName
  }));
}

async function searchRadios(query, limit = 8) {
  const url = `${RADIO_SEARCH}?name=${encodeURIComponent(query)}&countrycode=ES&hidebroken=true&limit=${limit}&order=clickcount&reverse=true`;
  const data = await fetchJson(url);
  return data
    .filter((radio) => radio.url_resolved || radio.url)
    .map((radio) => ({
      id: `radio:${radio.stationuuid}`,
      type: "radio",
      title: radio.name,
      artist: radio.tags || "Radio en directo",
      art: radio.favicon || "",
      streamUrl: radio.url_resolved || radio.url
    }));
}

function firstServerThenRemote(local, remote) {
  return window.location.protocol.startsWith("http") && !window.location.hostname.includes("github.io")
    ? local
    : remote;
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function normalizeSong(item) {
  return {
    id: `song:${item.trackId || item.id || item.previewUrl}`,
    type: "song",
    title: item.trackName || item.title,
    artist: item.artistName || item.artist?.name || item.artist,
    album: item.collectionName || item.album || "",
    art: biggerArtwork(item.artworkUrl100 || item.album?.cover_big || item.album?.cover_medium || item.art || ""),
    previewUrl: item.previewUrl,
    duration: item.trackTimeMillis || 30000,
    sourceName: item.sourceName || "Apple Music"
  };
}

function biggerArtwork(url) {
  return String(url || "").replace("100x100bb", "600x600bb");
}

function renderArtistPlaceholders() {
  const cards = topArtists.map((name) => ({
    id: `topartist:${name}`,
    type: "artist",
    title: name,
    artist: "Buscar canciones",
    art: "",
    query: name
  }));
  renderCards(el.artistGrid, cards);
}

function hydrateArtists(songs) {
  const byArtist = new Map();
  for (const song of songs) {
    if (!byArtist.has(normalize(song.artist))) byArtist.set(normalize(song.artist), song.art);
  }

  [...el.artistGrid.querySelectorAll("[data-title]")].forEach((card) => {
    const art = byArtist.get(normalize(card.dataset.title));
    const img = card.querySelector("img");
    if (art && img) img.src = art;
  });
}

function renderCards(container, items) {
  container.replaceChildren();
  if (!items.length) {
    container.append(cardSkeleton("No hay resultados"));
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.title = item.title;
    card.innerHTML = `
      <img alt="" src="${escapeAttr(item.art || fallbackArt(item.title))}" loading="lazy">
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(labelFor(item))}</small>
    `;
    card.addEventListener("click", () => {
      if (item.type === "artist" || item.resultType === "artist") {
        el.searchInput.value = item.query || item.title;
        searchEverything(item.query || item.title);
        return;
      }
      playTrack(item);
    });
    container.append(card);
  });
}

function renderSongs(container, songs) {
  container.replaceChildren();
  if (!songs.length) {
    const empty = document.createElement("div");
    empty.className = "status";
    empty.textContent = "Busca canciones para anadirlas a la lista.";
    container.append(empty);
    return;
  }

  songs.forEach((song, index) => {
    const row = document.createElement("article");
    row.className = "song";
    row.innerHTML = `
      <img alt="" src="${escapeAttr(song.art || fallbackArt(song.title))}" loading="lazy">
      <div>
        <strong>${escapeHtml(song.title)}</strong>
        <small>${escapeHtml(song.artist)}</small>
      </div>
      <button type="button" class="play-inline">Play</button>
      <button type="button" class="fav-inline">Fav</button>
    `;
    row.querySelector(".play-inline").addEventListener("click", () => playTrack(song, index));
    row.querySelector(".fav-inline").addEventListener("click", () => toggleFavorite(song));
    container.append(row);
  });
}

function playTrack(item, queueIndex = -1) {
  const source = item.streamUrl || item.previewUrl;
  if (!source) {
    el.playerArtist.textContent = "Esta fuente no tiene audio disponible";
    return;
  }

  if (item.type === "radio" || item.resultType === "radio") {
    state.lastRadio = item;
    el.audio.pause();
    el.audio.removeAttribute("src");
    el.audio.load();
    item.streamUrl = withLiveCacheBust(source);
  }

  state.current = item;
  state.currentIndex = queueIndex;
  el.audio.src = item.streamUrl || item.previewUrl;
  el.audio.play().catch(() => {
    el.playerArtist.textContent = "Pulsa Play otra vez para desbloquear el audio";
  });
  updatePlayer(item);
}

function withLiveCacheBust(url) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}cmf_live=${Date.now()}`;
}

function togglePlay() {
  if (!state.current && state.queue.length) {
    playTrack(state.queue[0], 0);
    return;
  }

  if (el.audio.paused) {
    if (state.current && (state.current.type === "radio" || state.current.resultType === "radio")) {
      playTrack(state.current);
    } else {
      el.audio.play();
    }
  } else {
    el.audio.pause();
  }
}

function playPrevious() {
  if (!state.queue.length) return;
  const nextIndex = state.currentIndex > 0 ? state.currentIndex - 1 : state.queue.length - 1;
  playTrack(state.queue[nextIndex], nextIndex);
}

function playNext() {
  if (!state.queue.length) return;
  const nextIndex = state.currentIndex >= 0 ? (state.currentIndex + 1) % state.queue.length : 0;
  playTrack(state.queue[nextIndex], nextIndex);
}

function updatePlayer(item) {
  el.playerArt.src = item.art || fallbackArt(item.title);
  el.playerTitle.textContent = item.title;
  el.playerArtist.textContent = labelFor(item);
  el.favoriteButton.textContent = isFavorite(item) ? "Saved" : "Fav";

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: item.title,
      artist: labelFor(item),
      artwork: item.art ? [{ src: item.art, sizes: "512x512", type: "image/jpeg" }] : []
    });
  }
}

function updateProgress() {
  const duration = el.audio.duration || 0;
  const current = el.audio.currentTime || 0;
  const percent = duration > 0 && Number.isFinite(duration) ? Math.min(100, (current / duration) * 100) : 0;
  el.progressBar.style.width = `${percent}%`;
}

function toggleFavorite(item = state.current) {
  if (!item) return;
  if (isFavorite(item)) {
    state.favorites = state.favorites.filter((favorite) => favorite.id !== item.id);
  } else {
    state.favorites.unshift(item);
  }
  saveJson("cmf:favorites", state.favorites);
  el.favoriteButton.textContent = isFavorite(item) ? "Saved" : "Fav";
  renderFavorites();
}

function renderFavorites() {
  renderSongs(el.favoritesList, state.favorites);
}

function isFavorite(item) {
  return state.favorites.some((favorite) => favorite.id === item.id);
}

function labelFor(item) {
  if (item.type === "radio" || item.resultType === "radio") return "Radio en directo";
  if (item.type === "artist" || item.resultType === "artist") return item.artist || "Artista";
  const source = item.sourceName ? ` · ${item.sourceName}` : "";
  return `${item.artist || item.album || "Cancion"}${source}`;
}

function fallbackArt(seed) {
  const text = encodeURIComponent((seed || "CMF").slice(0, 18));
  return `https://placehold.co/600x600/151b26/f4f7fb?text=${text}`;
}

function cardSkeleton(text) {
  const node = document.createElement("div");
  node.className = "card";
  node.textContent = text;
  return node;
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
