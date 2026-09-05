"use strict";

const ITUNES_SEARCH = "https://itunes.apple.com/search";
const RADIO_SEARCH = "https://de1.api.radio-browser.info/json/stations/search";

const topArtists = [
  "Fito y Fitipaldis",
  "Dani Martin",
  "Antonio Orozco",
  "Pablo Alboran",
  "Melendi",
  "Manuel Carrasco",
  "Alejandro Sanz",
  "Estopa",
  "Rosalia",
  "Aitana",
  "Shakira",
  "LaLion"
];

const topSongQueries = [
  "Fito y Fitipaldis Soldadito Marinero",
  "Dani Martin Cero",
  "Antonio Orozco Estoy Hecho De Pedacitos De Ti",
  "Pablo Alboran Saturno",
  "Melendi Destino o Casualidad",
  "Manuel Carrasco No Dejes De Sonar",
  "Alejandro Sanz Corazon Partio",
  "Estopa Como Camaron",
  "Rosalia Despecha",
  "Aitana Mon Amour"
];

const spanishRadios = [
  { display: "Los 40", query: "Los 40 Spain", detail: "Radio musical" },
  { display: "Cadena 100", query: "Cadena 100 Spain", detail: "91.9 FM" },
  { display: "Cadena Dial", query: "Cadena Dial Spain", detail: "Pop en espanol" },
  { display: "Rock FM", query: "Rock FM Spain", detail: "Rock y clasicos" },
  { display: "Kiss FM", query: "Kiss FM Spain", detail: "Exitos" },
  { display: "Europa FM", query: "Europa FM Spain", detail: "Musica actual" },
  { display: "Radio 3", query: "Radio 3 RNE Spain", detail: "RTVE" },
  { display: "Cadena SER", query: "Cadena SER Spain", detail: "Noticias y radio" }
];

const state = {
  queue: [],
  currentIndex: -1,
  current: null,
  favorites: loadJson("cmf:favorites", []),
  progressTimer: null,
  loadingId: 0
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
  songList: document.getElementById("songList"),
  favoritesList: document.getElementById("favoritesList"),
  playTopButton: document.getElementById("playTopButton"),
  reloadRadios: document.getElementById("reloadRadios"),
  playerArt: document.getElementById("playerArt"),
  playerTitle: document.getElementById("playerTitle"),
  playerSubtitle: document.getElementById("playerSubtitle"),
  progressBar: document.getElementById("progressBar"),
  playButton: document.getElementById("playButton"),
  prevButton: document.getElementById("prevButton"),
  nextButton: document.getElementById("nextButton"),
  favButton: document.getElementById("favButton"),
  volume: document.getElementById("volume"),
  settingsButton: document.getElementById("settingsButton"),
  settingsPanel: document.getElementById("settingsPanel"),
  closeSettings: document.getElementById("closeSettings"),
  defaultVolume: document.getElementById("defaultVolume")
};

init();

function init() {
  const savedVolume = Number(localStorage.getItem("cmf:volume") || "0.85");
  el.audio.volume = savedVolume;
  el.volume.value = String(savedVolume);
  el.defaultVolume.value = String(savedVolume);

  bindEvents();
  renderArtistCards();
  renderFavorites();
  loadTopSongs();
  loadRadios();
  updatePlayer(null);
}

function bindEvents() {
  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => jumpTo(button.dataset.jump));
  });

  el.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchEverything(el.searchInput.value.trim());
  });

  el.clearResults.addEventListener("click", () => {
    el.resultsPanel.hidden = true;
    el.resultsGrid.replaceChildren();
    el.searchStatus.textContent = "";
    el.searchInput.value = "";
  });

  el.playTopButton.addEventListener("click", () => {
    if (state.queue.length) playItem(state.queue[0], 0);
  });

  el.reloadRadios.addEventListener("click", loadRadios);
  el.playButton.addEventListener("click", togglePlay);
  el.prevButton.addEventListener("click", playPrevious);
  el.nextButton.addEventListener("click", playNext);
  el.favButton.addEventListener("click", () => toggleFavorite());

  el.volume.addEventListener("input", () => setVolume(el.volume.value));
  el.defaultVolume.addEventListener("input", () => setVolume(el.defaultVolume.value));

  el.settingsButton.addEventListener("click", () => {
    el.settingsPanel.hidden = false;
  });
  el.closeSettings.addEventListener("click", () => {
    el.settingsPanel.hidden = true;
  });

  el.audio.addEventListener("play", () => {
    el.playButton.textContent = "Pausa";
    startProgress();
  });
  el.audio.addEventListener("pause", () => {
    el.playButton.textContent = "Play";
    stopProgress();
  });
  el.audio.addEventListener("playing", () => {
    el.playButton.textContent = "Pausa";
    el.playerSubtitle.textContent = subtitleFor(state.current);
    startProgress();
  });
  el.audio.addEventListener("timeupdate", updateProgress);
  el.audio.addEventListener("loadedmetadata", updateProgress);
  el.audio.addEventListener("ended", playNext);
  el.audio.addEventListener("error", () => {
    el.playButton.textContent = "Play";
    el.playerSubtitle.textContent = "Ese audio no carga. Prueba otro resultado.";
    stopProgress();
  });

  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", () => resumeAudio());
    navigator.mediaSession.setActionHandler("pause", () => el.audio.pause());
    navigator.mediaSession.setActionHandler("previoustrack", playPrevious);
    navigator.mediaSession.setActionHandler("nexttrack", playNext);
  }
}

function jumpTo(id) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.jump === id);
  });
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function searchEverything(query) {
  if (!query) return;
  el.resultsPanel.hidden = false;
  el.resultsTitle.textContent = `Busqueda: ${query}`;
  el.searchStatus.textContent = "Buscando canciones, artistas y radios...";
  el.resultsGrid.replaceChildren();

  try {
    const [songs, artists, radios] = await Promise.all([
      searchSongs(query, 18),
      searchArtists(query, 8),
      searchRadios(query, 8)
    ]);

    const items = [
      ...artists,
      ...songs,
      ...radios
    ];

    if (!items.length) {
      el.searchStatus.textContent = "No encontre resultados. Prueba con otro nombre o menos palabras.";
      return;
    }

    el.searchStatus.textContent = `${items.length} resultados. Las canciones reproducen previews oficiales si existen.`;
    renderCards(el.resultsGrid, items);
  } catch (error) {
    el.searchStatus.textContent = "No se pudo buscar ahora. Revisa internet y prueba otra vez.";
  }
}

async function loadTopSongs() {
  el.songList.replaceChildren(messageNode("Cargando canciones top..."));
  const results = await Promise.all(topSongQueries.map((query) => searchSongs(query, 1).catch(() => [])));
  const songs = results.flat().filter(Boolean);
  state.queue = songs;
  renderSongs(el.songList, songs);
  hydrateArtistImages(songs);
}

async function loadRadios() {
  el.radioGrid.replaceChildren(messageNode("Cargando radios..."));
  const batches = await Promise.all(spanishRadios.map((radio) => findRadio(radio).catch(() => null)));
  const radios = batches.filter(Boolean);
  renderCards(el.radioGrid, radios);
}

async function findRadio(radio) {
  const [found] = await searchRadios(radio.query, 1);
  if (!found) return {
    id: `radio:${radio.display}`,
    type: "radio",
    title: radio.display,
    artist: radio.detail,
    art: fallbackArt(radio.display),
    unavailable: true
  };
  return {
    ...found,
    title: radio.display,
    artist: radio.detail || found.artist
  };
}

async function searchSongs(query, limit = 12) {
  const serverUrl = `/api/music/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const publicUrl = `${ITUNES_SEARCH}?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${limit}&country=ES`;
  const url = useServerApi() ? serverUrl : publicUrl;
  const data = await fetchJson(url);
  const rows = data.results || [];
  return rows.map(normalizeSong).filter((song) => song.previewUrl);
}

async function searchArtists(query, limit = 8) {
  const url = `${ITUNES_SEARCH}?term=${encodeURIComponent(query)}&media=music&entity=musicArtist&limit=${limit}&country=ES`;
  const data = await fetchJson(url);
  return (data.results || []).map((artist) => ({
    id: `artist:${artist.artistId}`,
    type: "artist",
    title: artist.artistName,
    artist: artist.primaryGenreName || "Artista",
    art: fallbackArt(artist.artistName),
    query: artist.artistName
  }));
}

async function searchRadios(query, limit = 8) {
  const url = `${RADIO_SEARCH}?name=${encodeURIComponent(query)}&countrycode=ES&hidebroken=true&limit=${limit}&order=clickcount&reverse=true`;
  const data = await fetchJson(url);
  return (data || [])
    .filter((radio) => radio.url_resolved || radio.url)
    .map((radio) => ({
      id: `radio:${radio.stationuuid}`,
      type: "radio",
      title: radio.name,
      artist: radio.tags || "Radio en directo",
      art: radio.favicon || fallbackArt(radio.name),
      streamUrl: radio.url_resolved || radio.url
    }));
}

function useServerApi() {
  return location.protocol.startsWith("http") && !location.hostname.includes("github.io") && location.hostname !== "";
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
    title: item.trackName || item.title || "Cancion",
    artist: item.artistName || item.artist?.name || item.artist || "Artista",
    album: item.collectionName || item.album?.title || "",
    art: biggerArtwork(item.artworkUrl100 || item.album?.cover_big || item.album?.cover_medium || ""),
    previewUrl: item.previewUrl || item.preview,
    duration: item.trackTimeMillis || 30000,
    sourceName: item.sourceName || "Apple Music"
  };
}

function renderArtistCards() {
  const cards = topArtists.map((name) => ({
    id: `artist:${name}`,
    type: "artist",
    title: name,
    artist: "Toca para buscar canciones",
    art: fallbackArt(name),
    query: name
  }));
  renderCards(el.artistGrid, cards);
}

function hydrateArtistImages(songs) {
  const artByArtist = new Map();
  for (const song of songs) {
    const key = clean(song.artist);
    if (!artByArtist.has(key)) artByArtist.set(key, song.art);
  }
  el.artistGrid.querySelectorAll(".card").forEach((card) => {
    const img = card.querySelector("img");
    const art = artByArtist.get(clean(card.dataset.title));
    if (img && art) img.src = art;
  });
}

function renderCards(container, items) {
  container.replaceChildren();
  if (!items.length) {
    container.append(messageNode("No hay resultados"));
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
      <small>${escapeHtml(subtitleFor(item))}</small>
    `;
    card.addEventListener("click", () => {
      if (item.type === "artist") {
        el.searchInput.value = item.query || item.title;
        searchEverything(item.query || item.title);
      } else {
        playItem(item);
      }
    });
    container.append(card);
  });
}

function renderSongs(container, songs) {
  container.replaceChildren();
  if (!songs.length) {
    container.append(messageNode("No hay canciones cargadas. Usa el buscador."));
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
      <button class="play-inline" type="button">Play</button>
      <button class="save-inline" type="button">${isFavorite(song) ? "Guardada" : "Guardar"}</button>
    `;
    row.querySelector(".play-inline").addEventListener("click", () => playItem(song, index));
    row.querySelector(".save-inline").addEventListener("click", () => toggleFavorite(song));
    container.append(row);
  });
}

async function playItem(item, queueIndex = -1) {
  if (item.unavailable) {
    el.playerSubtitle.textContent = "Esta radio no tiene stream disponible ahora.";
    return;
  }

  const source = item.streamUrl || item.previewUrl;
  if (!source) {
    el.playerSubtitle.textContent = "Este resultado no tiene audio disponible.";
    return;
  }

  const loadingId = Date.now();
  state.loadingId = loadingId;
  state.current = item;
  state.currentIndex = queueIndex;
  updatePlayer(item);
  stopProgress();
  el.progressBar.style.width = "0%";
  el.playButton.textContent = "Cargando";
  el.playerSubtitle.textContent = "Cargando audio...";

  el.audio.pause();
  el.audio.removeAttribute("src");
  el.audio.load();
  el.audio.src = isRadio(item) ? liveUrl(source) : source;
  el.audio.load();

  try {
    await el.audio.play();
    if (state.loadingId !== loadingId) return;
    el.playButton.textContent = "Pausa";
    el.playerSubtitle.textContent = subtitleFor(item);
    startProgress();
  } catch (error) {
    if (state.loadingId !== loadingId) return;
    el.playButton.textContent = "Play";
    el.playerSubtitle.textContent = "El navegador bloqueo el audio. Pulsa Play otra vez.";
  }
}

function togglePlay() {
  if (!state.current) {
    if (state.queue.length) playItem(state.queue[0], 0);
    return;
  }

  if (el.audio.paused) {
    resumeAudio();
  } else {
    el.audio.pause();
  }
}

function resumeAudio() {
  if (!state.current) return;
  if (isRadio(state.current)) {
    playItem(state.current, state.currentIndex);
    return;
  }
  el.audio.play().catch(() => {
    el.playerSubtitle.textContent = "Pulsa Play otra vez para activar el audio.";
  });
}

function playPrevious() {
  if (!state.queue.length) return;
  const index = state.currentIndex > 0 ? state.currentIndex - 1 : state.queue.length - 1;
  playItem(state.queue[index], index);
}

function playNext() {
  if (!state.queue.length) return;
  const index = state.currentIndex >= 0 ? (state.currentIndex + 1) % state.queue.length : 0;
  playItem(state.queue[index], index);
}

function updatePlayer(item) {
  if (!item) {
    el.playerArt.src = fallbackArt("CMF");
    el.playerTitle.textContent = "Elige una cancion o radio";
    el.playerSubtitle.textContent = "CarMusicFree";
    el.favButton.textContent = "Favorita";
    return;
  }

  el.playerArt.src = item.art || fallbackArt(item.title);
  el.playerTitle.textContent = item.title;
  el.playerSubtitle.textContent = subtitleFor(item);
  el.favButton.textContent = isFavorite(item) ? "Guardada" : "Favorita";

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: item.title,
      artist: subtitleFor(item),
      artwork: item.art ? [{ src: item.art, sizes: "512x512", type: "image/jpeg" }] : []
    });
  }
}

function updateProgress() {
  if (isRadio(state.current)) {
    el.progressBar.style.width = el.audio.paused ? "0%" : "100%";
    return;
  }

  const duration = el.audio.duration;
  const current = el.audio.currentTime || 0;
  const percent = duration && Number.isFinite(duration) ? Math.min(100, (current / duration) * 100) : 0;
  el.progressBar.style.width = `${percent}%`;
}

function startProgress() {
  if (state.progressTimer) return;
  state.progressTimer = window.setInterval(updateProgress, 500);
}

function stopProgress() {
  if (!state.progressTimer) return;
  window.clearInterval(state.progressTimer);
  state.progressTimer = null;
}

function toggleFavorite(item = state.current) {
  if (!item || isRadio(item)) return;
  if (isFavorite(item)) {
    state.favorites = state.favorites.filter((favorite) => favorite.id !== item.id);
  } else {
    state.favorites.unshift(item);
  }
  saveJson("cmf:favorites", state.favorites);
  el.favButton.textContent = isFavorite(item) ? "Guardada" : "Favorita";
  renderFavorites();
  renderSongs(el.songList, state.queue);
}

function renderFavorites() {
  renderSongs(el.favoritesList, state.favorites);
}

function setVolume(value) {
  const volume = Number(value);
  el.audio.volume = volume;
  el.volume.value = String(volume);
  el.defaultVolume.value = String(volume);
  localStorage.setItem("cmf:volume", String(volume));
}

function isFavorite(item) {
  return state.favorites.some((favorite) => favorite.id === item.id);
}

function isRadio(item) {
  return item?.type === "radio";
}

function subtitleFor(item) {
  if (!item) return "CarMusicFree";
  if (isRadio(item)) return item.artist || "Radio en directo";
  if (item.type === "artist") return item.artist || "Artista";
  return `${item.artist || "Artista"} · ${item.sourceName || "Preview oficial"}`;
}

function liveUrl(url) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}cmf_live=${Date.now()}`;
}

function biggerArtwork(url) {
  return String(url || "").replace("100x100bb", "600x600bb");
}

function fallbackArt(seed) {
  const text = encodeURIComponent(String(seed || "CMF").slice(0, 16));
  return `https://placehold.co/600x600/182335/f6f8fb?text=${text}`;
}

function messageNode(text) {
  const node = document.createElement("div");
  node.className = "status";
  node.textContent = text;
  return node;
}

function clean(value) {
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
    const value = JSON.parse(localStorage.getItem(key));
    return value || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
