const FALLBACK_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%2317202a'/%3E%3Ccircle cx='300' cy='300' r='154' fill='%231ed760'/%3E%3Ccircle cx='300' cy='300' r='54' fill='%2317202a'/%3E%3C/svg%3E";

const radios = [
  {
    name: "Los 40",
    detail: "Exitos actuales",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40.mp3",
    color: "#ec1c24"
  },
  {
    name: "Cadena 100",
    detail: "91.9 FM",
    stream: "https://cadena100-cope-rrcast.flumotion.com/cope/cadena100.mp3",
    color: "#f8c300"
  },
  {
    name: "Cadena Dial",
    detail: "Musica en espanol",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/CADENADIAL.mp3",
    color: "#16a0dc"
  },
  {
    name: "Rock FM",
    detail: "Rock clasico",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/ROCKFM.mp3",
    color: "#f05a28"
  },
  {
    name: "Kiss FM",
    detail: "Pop y clasicos",
    stream: "https://kissfm.kissfmradio.cires21.com/kissfm.mp3",
    color: "#008ed6"
  },
  {
    name: "Europa FM",
    detail: "Pop internacional",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/EUROPAFM.mp3",
    color: "#f49d1a"
  },
  {
    name: "Radio 3",
    detail: "RTVE",
    stream: "https://rtvelivestream.akamaized.net/rtvesec/rne_r3_main.m3u8",
    color: "#8bc34a"
  },
  {
    name: "Cadena SER",
    detail: "Noticias y radio",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/CADENASER.mp3",
    color: "#d71920"
  }
];

const featuredArtists = [
  { name: "Fito y Fitipaldis", detail: "Rock español", query: "Fito y Fitipaldis Soldadito Marinero" },
  { name: "Dani Martin", detail: "Pop rock", query: "Dani Martin Cero" },
  { name: "Antonio Orozco", detail: "Pop espanol", query: "Antonio Orozco Estoy hecho de pedacitos de ti" },
  { name: "Pablo Alboran", detail: "Balada pop", query: "Pablo Alboran Saturno" },
  { name: "Melendi", detail: "Pop urbano", query: "Melendi Destino o Casualidad" },
  { name: "Manuel Carrasco", detail: "Pop flamenco", query: "Manuel Carrasco No dejes de sonar" },
  { name: "Alejandro Sanz", detail: "Pop latino", query: "Alejandro Sanz Corazon Partio" },
  { name: "Aitana", detail: "Pop", query: "Aitana Las Babys" }
];

const topSongQueries = [
  "Fito y Fitipaldis Soldadito Marinero",
  "Fito y Fitipaldis La casa por el tejado",
  "Dani Martin Cero",
  "Dani Martin Que bonita la vida",
  "Antonio Orozco Mi Heroe",
  "Pablo Alboran Solamente Tu",
  "Melendi Destino o Casualidad",
  "Alejandro Sanz Corazon Partio"
];

const state = {
  current: null,
  results: [],
  topSongs: [],
  featuredArtwork: new Map(),
  lastQuery: ""
};

const audio = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("playPauseButton");
const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const progressBar = document.getElementById("progressBar");
const radioGrid = document.getElementById("radioGrid");
const artistGrid = document.getElementById("artistGrid");
const topSongs = document.getElementById("topSongs");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchResultsSection = document.getElementById("searchResultsSection");
const searchStatus = document.getElementById("searchStatus");

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function artwork(url, size = 600) {
  if (!url) return FALLBACK_COVER;
  return url.replace(/100x100bb|60x60bb|30x30bb/g, `${size}x${size}bb`);
}

function setActiveNav(id) {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === id);
  });
}

function scrollToView(id) {
  const target = document.getElementById(id);
  if (!target) return;
  setActiveNav(id);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function songFromItunes(item) {
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

async function searchOnline(query, limit = 24) {
  const endpoint = `/api/music/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  try {
    const serverResponse = await fetch(endpoint);
    if (serverResponse.ok) {
      const data = await serverResponse.json();
      if (Array.isArray(data.results) && data.results.length) return data.results;
    }
  } catch (error) {
    // GitHub Pages has no Node server; browser fallback below keeps search working.
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&media=music&limit=${limit}&country=ES`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo buscar musica ahora");
  const data = await response.json();
  return (data.results || []).map(songFromItunes);
}

function createCard(item, options = {}) {
  const button = document.createElement("button");
  button.className = `card ${options.className || ""}`.trim();
  button.type = "button";
  button.setAttribute("aria-label", `Reproducir ${item.title || item.name}`);

  if (item.cover) {
    const img = document.createElement("img");
    img.src = item.cover;
    img.alt = "";
    img.loading = "lazy";
    button.appendChild(img);
  }

  if (options.radioLogo) {
    const logo = document.createElement("span");
    logo.className = "radio-logo";
    logo.style.background = item.color || "";
    logo.textContent = item.name.split(" ").map((word) => word[0]).join("").slice(0, 3);
    button.appendChild(logo);
  }

  const content = document.createElement("span");
  content.className = "card-content";
  content.innerHTML = `<strong>${item.title || item.name}</strong><span>${item.artist || item.detail || ""}</span>`;
  button.appendChild(content);

  button.addEventListener("click", () => {
    if (item.type === "artist") {
      runSearch(item.query || item.name);
      return;
    }
    playItem(item);
  });

  return button;
}

function renderRadios() {
  radioGrid.replaceChildren();
  radios.forEach((radio) => {
    const item = {
      type: "radio",
      name: radio.name,
      title: radio.name,
      artist: radio.detail,
      detail: radio.detail,
      stream: radio.stream,
      color: radio.color,
      cover: FALLBACK_COVER
    };
    radioGrid.appendChild(createCard(item, { className: "radio-card", radioLogo: true }));
  });
}

function renderArtists() {
  artistGrid.replaceChildren();
  featuredArtists.forEach((artist) => {
    const item = {
      type: "artist",
      name: artist.name,
      title: artist.name,
      detail: artist.detail,
      query: artist.query,
      cover: state.featuredArtwork.get(artist.name) || FALLBACK_COVER
    };
    artistGrid.appendChild(createCard(item));
  });
}

function renderSongs(container, songs) {
  container.replaceChildren();
  songs.forEach((song) => container.appendChild(createCard(song)));
}

async function loadFeaturedArtwork() {
  await Promise.all(featuredArtists.map(async (artist) => {
    try {
      const songs = await searchOnline(artist.query, 1);
      if (songs[0]?.cover) state.featuredArtwork.set(artist.name, songs[0].cover);
    } catch (error) {
      state.featuredArtwork.set(artist.name, FALLBACK_COVER);
    }
  }));
  renderArtists();
}

async function loadTopSongs() {
  const found = [];
  for (const query of topSongQueries) {
    try {
      const songs = await searchOnline(query, 1);
      if (songs[0]) found.push(songs[0]);
    } catch (error) {
      // Skip missing previews; the rest of the page must stay usable.
    }
  }
  state.topSongs = found;
  renderSongs(topSongs, found);
}

async function runSearch(rawQuery) {
  const query = rawQuery.trim();
  if (!query) return;

  state.lastQuery = query;
  searchInput.value = query;
  searchResultsSection.hidden = false;
  searchStatus.textContent = "Buscando...";
  searchResults.replaceChildren();
  scrollToView("searchResultsSection");

  try {
    const online = await searchOnline(query, 30);
    const localRadios = radios
      .filter((radio) => normalize(radio.name).includes(normalize(query)))
      .map((radio) => ({
        type: "radio",
        title: radio.name,
        artist: radio.detail,
        detail: radio.detail,
        stream: radio.stream,
        cover: FALLBACK_COVER,
        color: radio.color
      }));
    const songs = [...localRadios, ...online].filter((item) => item.stream);
    state.results = songs;
    searchStatus.textContent = songs.length ? `${songs.length} resultados` : "Sin previews";
    renderSongs(searchResults, songs);
  } catch (error) {
    searchStatus.textContent = "Error";
    const message = document.createElement("p");
    message.textContent = "No se pudo buscar ahora. Prueba otra vez en unos segundos.";
    searchResults.appendChild(message);
  }
}

function updatePlayerText(item, subtitle) {
  playerTitle.textContent = item.title || item.name;
  playerArtist.textContent = subtitle || item.artist || item.detail || "";
  playerCover.src = item.cover || FALLBACK_COVER;
}

async function playItem(item) {
  if (!item.stream) {
    updatePlayerText(item, "Esta cancion no tiene preview disponible");
    playPauseButton.textContent = "Play";
    return;
  }

  state.current = item;
  updatePlayerText(item, item.type === "radio" ? "Conectando en directo..." : "Cargando preview oficial...");
  playPauseButton.textContent = "Cargando";

  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  audio.src = item.stream;
  audio.currentTime = 0;

  try {
    await audio.play();
    updatePlayerText(item, item.type === "radio" ? "Radio en directo" : `${item.artist} · ${item.source || "Preview oficial"}`);
    playPauseButton.textContent = "Pausa";
    updateMediaSession(item);
  } catch (error) {
    playPauseButton.textContent = "Play";
    updatePlayerText(item, "El navegador ha bloqueado el audio. Toca Play otra vez.");
  }
}

function togglePlay() {
  if (!state.current) {
    const first = state.topSongs[0] || {
      type: "radio",
      title: radios[0].name,
      artist: radios[0].detail,
      stream: radios[0].stream,
      cover: FALLBACK_COVER
    };
    playItem(first);
    return;
  }

  if (audio.paused) {
    if (state.current.type === "radio") {
      playItem(state.current);
      return;
    }
    audio.play().then(() => {
      playPauseButton.textContent = "Pausa";
    }).catch(() => {
      updatePlayerText(state.current, "Toca otra vez para activar el audio");
    });
  } else {
    audio.pause();
    playPauseButton.textContent = "Play";
  }
}

function updateProgress() {
  if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
    progressBar.style.width = audio.paused ? "0%" : "100%";
    return;
  }
  progressBar.style.width = `${Math.min(100, (audio.currentTime / audio.duration) * 100)}%`;
}

function updateMediaSession(item) {
  if (!("mediaSession" in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: item.title || item.name,
    artist: item.artist || item.detail || "CarMusicaFree",
    album: item.type === "radio" ? "Radio en directo" : "Preview oficial",
    artwork: [
      { src: item.cover || FALLBACK_COVER, sizes: "512x512", type: "image/png" }
    ]
  });
  navigator.mediaSession.setActionHandler("play", togglePlay);
  navigator.mediaSession.setActionHandler("pause", togglePlay);
  navigator.mediaSession.setActionHandler("stop", () => {
    audio.pause();
    playPauseButton.textContent = "Play";
  });
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => scrollToView(button.dataset.view));
});

document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => runSearch(button.dataset.query));
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch(searchInput.value);
});

playPauseButton.addEventListener("click", togglePlay);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("playing", () => {
  playPauseButton.textContent = "Pausa";
  if (state.current) updatePlayerText(state.current, state.current.type === "radio" ? "Radio en directo" : `${state.current.artist} · Preview oficial`);
});
audio.addEventListener("pause", () => {
  if (!audio.ended) playPauseButton.textContent = "Play";
});
audio.addEventListener("ended", () => {
  playPauseButton.textContent = "Play";
  progressBar.style.width = "0%";
});
audio.addEventListener("error", () => {
  playPauseButton.textContent = "Play";
  if (state.current) updatePlayerText(state.current, "No se pudo reproducir esta fuente");
});

renderRadios();
renderArtists();
loadFeaturedArtwork();
loadTopSongs();
