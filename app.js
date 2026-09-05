// Carmusicfree - Audio Engine, Real Catalog, Spanish Radios & Mobile Background Playback

// Real Spanish Radio Stations with live online streams
const spanishRadios = [
  {
    id: 'los40',
    name: 'Los 40',
    freq: '93.9 FM · Nacional',
    desc: 'Todos los éxitos pop, urbano y números uno de España.',
    color: 'linear-gradient(135deg, #ff0055, #ff9900)',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_SC',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'cadenadial',
    name: 'Cadena Dial',
    freq: '91.7 FM · En directo',
    desc: 'Lo mejor de nuestra música en español sin interrupciones.',
    color: 'linear-gradient(135deg, #00b050, #006622)',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CADENADIAL_SC',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'cadena100',
    name: 'Cadena 100',
    freq: '91.9 FM · En directo',
    desc: 'La mejor variedad musical con los temas más optimistas.',
    color: 'linear-gradient(135deg, #0099ff, #0033aa)',
    streamUrl: 'https://cadena100-cope.flumotion.com/cope/cadena100-low.mp3',
    fallbackUrls: [
      'https://cadena100-cope.flumotion.com/cope/cadena100.mp3',
      'https://playerservices.streamtheworld.com/api/livestream-redirect/CADENA100_SC'
    ],
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'rockfm',
    name: 'Rock FM',
    freq: '101.7 FM · 500 Clásicos',
    desc: 'Una hora de rock sin pausa. Clásicos legendarios de la historia.',
    color: 'linear-gradient(135deg, #222222, #b8860b)',
    streamUrl: 'https://rockfm-cope.flumotion.com/cope/rockfm-low.mp3',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'kissfm',
    name: 'Kiss FM',
    freq: '102.7 FM · Lo mejor 80/90',
    desc: 'Los grandes éxitos y baladas de los 80, 90 y 2000.',
    color: 'linear-gradient(135deg, #cc1122, #550011)',
    streamUrl: 'https://kissfm.kissfmradio.cires21.com/kissfm.mp3',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'europafm',
    name: 'Europa FM',
    freq: '91.0 FM · Tus éxitos',
    desc: 'El mejor pop y dance contemporáneo nacional e internacional.',
    color: 'linear-gradient(135deg, #ff5500, #aa1100)',
    streamUrl: 'https://icecast-europafm.flumotion.com/europafm/europafm-low.mp3',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'radio3',
    name: 'Radio 3 (RTVE)',
    freq: '94.5 FM · Alternativa',
    desc: 'Música indie, cultura, electrónica y propuestas emergentes.',
    color: 'linear-gradient(135deg, #8833bb, #331155)',
    streamUrl: 'https://rtvelivestream.akamaized.net/rne_r3_main.mp3',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'locafm',
    name: 'Loca FM',
    freq: '96.0 FM · Dance & House',
    desc: 'Sonido electrónico ininterrumpido para no parar de bailar.',
    color: 'linear-gradient(135deg, #00ccbb, #004455)',
    streamUrl: 'https://stream.locafm.com/locafm.mp3',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'los40classic',
    name: 'Los 40 Classic',
    freq: '89.0 FM · Éxitos de Oro',
    desc: 'Los himnos más memorables de la historia de Los 40.',
    color: 'linear-gradient(135deg, #cc9900, #443300)',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_CLASSIC_SC',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'cadenaser',
    name: 'Cadena SER',
    freq: '105.4 FM · Actualidad',
    desc: 'Líder en información, deporte, entretenimiento y directos.',
    color: 'linear-gradient(135deg, #112244, #001122)',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CADENASER_SC',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80'
  }
];

// Fotos auténticas y reales de los artistas verificadas
const REAL_ARTIST_PHOTOS = {
  'Dani Martín': 'https://commons.wikimedia.org/wiki/Special:FilePath/Dani_Martin.jpg?width=400',
  'Pablo Alborán': 'https://commons.wikimedia.org/wiki/Special:FilePath/2023-11-16_Gala_de_los_Latin_Grammy,_23_(cropped).jpg?width=400',
  'Melendi': 'https://commons.wikimedia.org/wiki/Special:FilePath/Melendi_Guayaquil_2017.jpg?width=400',
  'Manuel Carrasco': 'https://commons.wikimedia.org/wiki/Special:FilePath/2023-11-16_Gala_de_los_Latin_Grammy,_24_(Manuel_Carrasco).jpg?width=400',
  'Alejandro Sanz': 'https://commons.wikimedia.org/wiki/Special:FilePath/Goyas_2025_-_Alejandro_Sanz_(cropped).jpg?width=400',
  'Rosalía': 'https://commons.wikimedia.org/wiki/Special:FilePath/2023-11-16_Gala_de_los_Latin_Grammy,_27_(cropped)02.jpg?width=400',
  'Aitana': 'https://commons.wikimedia.org/wiki/Special:FilePath/173794_aitana-estrena-dark-red-hair-40-music-awards-2023_(cropped).jpg?width=400',
  'C. Tangana': 'https://commons.wikimedia.org/wiki/Special:FilePath/Goyas_2025_-_C_Tangana_(cropped).jpg?width=400',
  'Quevedo': 'https://commons.wikimedia.org/wiki/Special:FilePath/Quevedo2023hh.jpg?width=400',
  'Bad Bunny': 'https://commons.wikimedia.org/wiki/Special:FilePath/Bad_Bunny_2019_by_Glenn_Francis_(cropped).jpg?width=400',
  'The Weeknd': 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Weeknd_Cannes_2023.png?width=400'
};

function getArtistPhoto(artist) {
  if (!artist) return 'https://commons.wikimedia.org/wiki/Special:FilePath/Dani_Martin.jpg?width=400';
  for (const [name, url] of Object.entries(REAL_ARTIST_PHOTOS)) {
    if (artist.toLowerCase().includes(name.toLowerCase())) {
      return url;
    }
  }
  return 'https://commons.wikimedia.org/wiki/Special:FilePath/Dani_Martin.jpg?width=400';
}

// Canciones más tops 🔝 (Reproducidas directamente desde YouTube sin IDs ni configuraciones manuales)
let songs = [
  {
    id: 0,
    title: 'Solamente Tú',
    artist: 'Pablo Alborán',
    album: 'Pablo Alborán',
    time: '4:08',
    genre: 'pop',
    bpm: 96,
    cover: getArtistPhoto('Pablo Alborán'),
    fallbackGrad: 'linear-gradient(135deg, #e37b42, #381a18)'
  },
  {
    id: 1,
    title: 'Saturno',
    artist: 'Pablo Alborán',
    album: 'Prometo',
    time: '4:14',
    genre: 'pop',
    bpm: 100,
    cover: getArtistPhoto('Pablo Alborán'),
    fallbackGrad: 'linear-gradient(135deg, #3d52a0, #13172e)'
  },
  {
    id: 2,
    title: 'Dónde Está el Amor',
    artist: 'Pablo Alborán ft. Jesse & Joy',
    album: 'Tanto',
    time: '3:43',
    genre: 'pop',
    bpm: 108,
    cover: getArtistPhoto('Pablo Alborán'),
    fallbackGrad: 'linear-gradient(135deg, #e65c7b, #3b172a)'
  },
  {
    id: 3,
    title: 'Prometo',
    artist: 'Pablo Alborán',
    album: 'Prometo (Edición Especial)',
    time: '5:16',
    genre: 'pop',
    bpm: 90,
    cover: getArtistPhoto('Pablo Alborán'),
    fallbackGrad: 'linear-gradient(135deg, #6c5ce7, #1e1938)'
  },
  {
    id: 4,
    title: 'Zapatillas',
    artist: 'Dani Martín (El Canto del Loco)',
    album: 'Zapatillas',
    time: '3:35',
    genre: 'rock',
    bpm: 140,
    cover: getArtistPhoto('Dani Martín'),
    fallbackGrad: 'linear-gradient(135deg, #d82436, #240c10)'
  },
  {
    id: 5,
    title: 'Cero',
    artist: 'Dani Martín',
    album: 'Dani Martín',
    time: '4:14',
    genre: 'rock',
    bpm: 124,
    cover: getArtistPhoto('Dani Martín'),
    fallbackGrad: 'linear-gradient(135deg, #2b77e5, #0f2249)'
  },
  {
    id: 6,
    title: 'Emocional',
    artist: 'Dani Martín',
    album: 'Dani Martín',
    time: '3:45',
    genre: 'pop',
    bpm: 115,
    cover: getArtistPhoto('Dani Martín'),
    fallbackGrad: 'linear-gradient(135deg, #9635b5, #140e34)'
  },
  {
    id: 7,
    title: 'Tu Jardín con Enanitos',
    artist: 'Melendi',
    album: 'Lágrimas Desordenadas',
    time: '3:58',
    genre: 'pop',
    bpm: 118,
    cover: getArtistPhoto('Melendi'),
    fallbackGrad: 'linear-gradient(135deg, #38c5b0, #13393f)'
  },
  {
    id: 8,
    title: 'Destino o Casualidad',
    artist: 'Melendi ft. Ha*Ash',
    album: 'Quítate las Gafas',
    time: '4:16',
    genre: 'pop',
    bpm: 102,
    cover: getArtistPhoto('Melendi'),
    fallbackGrad: 'linear-gradient(135deg, #ffc54d, #2f1d10)'
  },
  {
    id: 9,
    title: 'No Dejes de Soñar',
    artist: 'Manuel Carrasco',
    album: 'Confieso Que He Sentido',
    time: '3:55',
    genre: 'pop',
    bpm: 122,
    cover: getArtistPhoto('Manuel Carrasco'),
    fallbackGrad: 'linear-gradient(135deg, #f35b42, #2d182e)'
  },
  {
    id: 10,
    title: 'Corazón Partío',
    artist: 'Alejandro Sanz',
    album: 'Más',
    time: '5:44',
    genre: 'pop',
    bpm: 104,
    cover: getArtistPhoto('Alejandro Sanz'),
    fallbackGrad: 'linear-gradient(135deg, #d38136, #361a15)'
  },
  {
    id: 11,
    title: 'DESPECHÁ',
    artist: 'Rosalía',
    album: 'MOTOMAMI +',
    time: '2:37',
    genre: 'pop',
    bpm: 130,
    cover: getArtistPhoto('Rosalía'),
    fallbackGrad: 'linear-gradient(135deg, #e0325b, #43132e)'
  },
  {
    id: 12,
    title: 'Quédate (Bzrp Music Sessions, Vol. 52)',
    artist: 'Quevedo, Bizarrap',
    album: 'Donde Quiero Estar',
    time: '3:19',
    genre: 'carretera',
    bpm: 128,
    cover: getArtistPhoto('Quevedo'),
    fallbackGrad: 'linear-gradient(135deg, #2b77e5, #0f2249)'
  },
  {
    id: 13,
    title: 'Tú Me Dejaste De Querer',
    artist: 'C. Tangana, Niño de Elche, La Húngara',
    album: 'El Madrileño',
    time: '3:17',
    genre: 'urbano',
    bpm: 110,
    cover: getArtistPhoto('C. Tangana'),
    fallbackGrad: 'linear-gradient(135deg, #d38136, #361a15)'
  },
  {
    id: 14,
    title: 'Formentera',
    artist: 'Aitana, Nicki Nicole',
    album: '11 Razones +',
    time: '3:28',
    genre: 'pop',
    bpm: 126,
    cover: getArtistPhoto('Aitana'),
    fallbackGrad: 'linear-gradient(135deg, #ff715b, #441732)'
  },
  {
    id: 15,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    time: '3:20',
    genre: 'synth',
    bpm: 171,
    cover: getArtistPhoto('The Weeknd'),
    fallbackGrad: 'linear-gradient(135deg, #d82436, #160824)'
  },
  {
    id: 16,
    title: 'MONACO',
    artist: 'Bad Bunny',
    album: 'Nadie sabe lo que va a pasar mañana',
    time: '4:27',
    genre: 'urbano',
    bpm: 140,
    cover: getArtistPhoto('Bad Bunny'),
    fallbackGrad: 'linear-gradient(135deg, #f35b42, #2d182e)'
  }
];

// Artistas más tops 🔝 con fotos reales auténticas
let artists = [
  { name: 'Dani Martín', genre: 'Pop Rock Español', photo: getArtistPhoto('Dani Martín'), songIndex: 4 },
  { name: 'Pablo Alborán', genre: 'Balada Pop & Romántico', photo: getArtistPhoto('Pablo Alborán'), songIndex: 0 },
  { name: 'Melendi', genre: 'Pop Rock & Rumba', photo: getArtistPhoto('Melendi'), songIndex: 7 },
  { name: 'Manuel Carrasco', genre: 'Pop & Canción de Autor', photo: getArtistPhoto('Manuel Carrasco'), songIndex: 9 },
  { name: 'Alejandro Sanz', genre: 'Pop Latino & Baladas', photo: getArtistPhoto('Alejandro Sanz'), songIndex: 10 },
  { name: 'Rosalía', genre: 'Flamenco Pop', photo: getArtistPhoto('Rosalía'), songIndex: 11 },
  { name: 'Aitana', genre: 'Pop & Éxitos', photo: getArtistPhoto('Aitana'), songIndex: 14 },
  { name: 'C. Tangana', genre: 'Música Española', photo: getArtistPhoto('C. Tangana'), songIndex: 13 },
  { name: 'Quevedo', genre: 'Reggaetón & Carretera', photo: getArtistPhoto('Quevedo'), songIndex: 12 },
  { name: 'Bad Bunny', genre: 'Urbano Latino', photo: getArtistPhoto('Bad Bunny'), songIndex: 16 }
];

// Curated Playlists
const defaultPlaylists = [
  {
    title: 'Pablo Alborán: Esenciales',
    desc: 'Solamente Tú, Saturno, Prometo y sus baladas más memorables.',
    cover: getArtistPhoto('Pablo Alborán'),
    songIndex: 0
  },
  {
    title: 'Dani Martín & Pop Rock Español',
    desc: 'Himnos de carretera: Zapatillas, Cero y canciones para cantar a pleno.',
    cover: getArtistPhoto('Dani Martín'),
    songIndex: 4
  },
  {
    title: 'Pop & Sentimiento en Carretera',
    desc: 'Melendi, Manuel Carrasco y Alejandro Sanz al volante.',
    cover: getArtistPhoto('Melendi'),
    songIndex: 7
  },
  {
    title: 'Autovía al Atardecer',
    desc: 'El ritmo perfecto para bajar las ventanillas en autovía.',
    cover: getArtistPhoto('Quevedo'),
    songIndex: 12
  },
  {
    title: 'Ruta Nocturna & Synth',
    desc: 'Luces de faros, asfalto brillante y sintetizadores profundos.',
    cover: getArtistPhoto('The Weeknd'),
    songIndex: 15
  }
];

// Application State
let currentSongIndex = 0;
let currentRadioId = null; // null if playing a song, or radio id
let isPlaying = false;
let progressPercent = 0;
let progressTimer = null;
let currentFilter = 'all';
let isShuffle = false;
let isRepeat = false;
let currentVolume = 0.75;
let isMuted = false;

const GUEST_ACCOUNT = {
  name: 'Invitado',
  email: '',
  avatar: 'I',
  plan: 'Cuenta gratis',
  loggedIn: false,
  backgroundPlay: true,
  bassBoost: false,
  ultraHD: false
};

const DEFAULT_ACCOUNT = {
  name: 'Carlos',
  email: 'carlos@carmusicfree.com',
  avatar: 'C',
  plan: 'Carmusicfree Plus ★',
  loggedIn: true,
  backgroundPlay: true,
  bassBoost: true,
  ultraHD: true
};

function loadJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (err) {
    return fallback;
  }
}

function normalizeAccount(account) {
  return {
    ...GUEST_ACCOUNT,
    ...account,
    avatar: account?.avatar || account?.name?.charAt(0)?.toUpperCase() || 'I',
    loggedIn: !!account?.loggedIn
  };
}

function saveUserAccount(account) {
  userAccount = normalizeAccount(account);
  localStorage.setItem('carmusicfree_user', JSON.stringify(userAccount));

  if (userAccount.loggedIn && userAccount.email) {
    const accounts = loadJson('carmusicfree_accounts', {});
    accounts[userAccount.email.toLowerCase()] = userAccount;
    localStorage.setItem('carmusicfree_accounts', JSON.stringify(accounts));
  }
}

// Local Persistence
let likedSongIds = new Set(loadJson('carmusicfree_liked', [0, 1, 4]).map(String));
let userPlaylists = loadJson('carmusicfree_custom_playlists', []);
let userAccount = normalizeAccount(loadJson('carmusicfree_user', DEFAULT_ACCOUNT));

let externalSearchState = {
  query: '',
  loading: false,
  tracks: [],
  artists: []
};
let externalSearchTimer = null;
let externalSearchRequestId = 0;

function songKey(songId) {
  return String(songId);
}

// AUDIO SYSTEM: HTML5 Native Audio for Background Playback (keeps phone playback alive with screen locked on iOS & Android)
const nativeAudio = document.getElementById('nativeAudioPlayer') || new Audio();
nativeAudio.preload = 'auto';
nativeAudio.crossOrigin = 'anonymous';

// Safe volume setter for iOS Safari (which rejects script-based volume), Android and YouTube
function setNativeVolume(vol) {
  currentVolume = Math.max(0, Math.min(1, vol));
  try {
    nativeAudio.volume = isMuted ? 0 : currentVolume;
  } catch (e) {
    // iOS Safari manages audio volume via physical device buttons
  }
  if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
    try {
      ytPlayer.setVolume(isMuted ? 0 : Math.round(currentVolume * 100));
    } catch (e) {}
  }
  if (masterGain && audioCtx) {
    try {
      masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);
    } catch (e) {}
  }
}

// YOUTUBE AUDIO ENGINE: In-App Direct Stream (Sin anuncios, dentro de la web, sin IDs manuales)
let ytPlayer = null;
let isYtReady = false;
let ytPendingPlay = false;

// Dynamic cache of resolved YouTube videos (No user IDs needed!)
const clientYtCache = new Map();

async function resolveYouTubeVideoForSong(song) {
  if (!song) return 'F0rwOsA6k8M';
  if (song.resolvedVideoId) return song.resolvedVideoId;
  const cacheKey = `${song.artist}___${song.title}`.toLowerCase();
  if (clientYtCache.has(cacheKey)) {
    song.resolvedVideoId = clientYtCache.get(cacheKey);
    return song.resolvedVideoId;
  }

  try {
    const res = await fetch(`/api/yt/resolve?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.videoId) {
        song.resolvedVideoId = data.videoId;
        clientYtCache.set(cacheKey, data.videoId);
        return data.videoId;
      }
    }
  } catch (err) {
    console.warn('YouTube auto-resolve note:', err);
  }

  return 'F0rwOsA6k8M';
}

window.onYouTubeIframeAPIReady = function() {
  try {
    ytPlayer = new YT.Player('ytPlayer', {
      height: '100',
      width: '100',
      host: 'https://www.youtube-nocookie.com', // Bloquea cookies publicitarias y minimiza interrupciones
      videoId: 'F0rwOsA6k8M',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1, // Crucial: Mantiene la reproducción dentro de la web sin abrir la app externa de YouTube
        rel: 0,
        iv_load_policy: 3, // Elimina tarjetas publicitarias y superposiciones de anotaciones
        origin: window.location.origin
      },
      events: {
        onReady: (event) => {
          isYtReady = true;
          try {
            event.target.setVolume(Math.round(currentVolume * 100));
          } catch (e) {}
          if (ytPendingPlay && currentRadioId === null) {
            ytPendingPlay = false;
            const s = songs[currentSongIndex];
            if (s) {
              resolveYouTubeVideoForSong(s).then(videoId => {
                event.target.loadVideoById({ videoId, startSeconds: 0 });
                event.target.playVideo();
              });
            }
          }
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            // Detección y salto inmediato de anuncios en caso de reproducirse alguno
            try {
              const videoData = ytPlayer.getVideoData ? ytPlayer.getVideoData() : null;
              if (videoData && (videoData.isAd || (ytPlayer.getDuration && ytPlayer.getDuration() < 30 && videoData.title && videoData.title.toLowerCase().includes('ad')))) {
                ytPlayer.setVolume(0);
                const dur = ytPlayer.getDuration ? ytPlayer.getDuration() : 0;
                if (dur > 0) ytPlayer.seekTo(dur, true);
                return;
              }
              // Restaurar volumen normal
              if (!isMuted) {
                ytPlayer.setVolume(Math.round(currentVolume * 100));
              }
            } catch (e) {}

            if (currentRadioId === null) {
              isPlaying = true;
              syncPlayerUI();
            }
          } else if (event.data === YT.PlayerState.PAUSED) {
            if (currentRadioId === null && isPlaying) {
              isPlaying = false;
              syncPlayerUI();
            }
          } else if (event.data === YT.PlayerState.ENDED) {
            if (currentRadioId === null) {
              if (isRepeat) {
                ytPlayer.seekTo(0, true);
                ytPlayer.playVideo();
              } else {
                playNext();
              }
            }
          }
        },
        onError: (err) => {
          console.warn('YouTube Player note:', err);
        }
      }
    });
  } catch (err) {
    console.warn('YouTube API init note:', err);
  }
};

// Automatic recovery on stream errors (e.g. mobile 4G/5G temporary packet drop)
nativeAudio.onerror = (e) => {
  console.warn('Native audio stream error:', e);
  if (currentRadioId !== null && isPlaying) {
    const radio = spanishRadios.find(r => r.id === currentRadioId);
    if (radio && radio.fallbackUrls && radio.fallbackUrls.length > 0) {
      const nextFallback = radio.fallbackUrls.shift();
      radio.fallbackUrls.push(radio.streamUrl);
      radio.streamUrl = nextFallback;
      console.log('Reconectando radio a stream de respaldo:', nextFallback);
      nativeAudio.src = nextFallback;
      nativeAudio.play().catch(() => {});
    }
  }
};

// Web Audio API Synthesizer (optional harmonic enhancer)
let audioCtx = null;
let masterGain = null;
let synthTimer = null;

// Creates a silent/ambient audio data URI wav as a fallback carrier
function createSilentAudioCarrier() {
  const sampleRate = 8000;
  const numSamples = sampleRate * 2; // 2 seconds loop
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // WAV header
  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Silence with tiny sub-audible dither to prevent OS power-off of audio unit
  for (let i = 0; i < numSamples; i++) {
    view.setInt16(44 + i * 2, (i % 2 === 0 ? 1 : -1), true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

const backgroundCarrierUrl = createSilentAudioCarrier();

// Generates real, rhythmic and melodic audio files for each song in the catalog.
// Because it is a native WAV loaded into HTML5 <audio>, iOS Safari and Android Chrome
// keep playing it seamlessly in the background with the screen locked or turned off!
const songWavBlobCache = new Map();

function getSongAudioWavUrl(song) {
  if (songWavBlobCache.has(song.id)) {
    return songWavBlobCache.get(song.id);
  }
  const sampleRate = 22050;
  const bpm = song.bpm || 120;
  const beatDuration = 60 / bpm; // duration of a single beat in seconds
  const totalBeats = 16; // 4 bars of 4/4
  const totalDuration = totalBeats * beatDuration;
  const numSamples = Math.floor(sampleRate * totalDuration);

  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // RIFF header
  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Musical progressions tailored to each genre
  let progressions = [
    [220, 261.63, 329.63, 392], // Am7
    [174.61, 220, 261.63, 349.23], // Fmaj7
    [261.63, 329.63, 392, 523.25], // C
    [196, 246.94, 293.66, 392] // G
  ];

  if (song.genre === 'rock') {
    // Dani Martín rock progression: E - G - A - C
    progressions = [
      [164.81, 207.65, 246.94, 329.63],
      [196, 246.94, 293.66, 392],
      [220, 277.18, 329.63, 440],
      [261.63, 329.63, 392, 523.25]
    ];
  } else if (song.genre === 'pop') {
    // Pablo Alborán / Pop Español baladas: C - G - Am - F
    progressions = [
      [261.63, 329.63, 392, 523.25],
      [196, 246.94, 293.66, 392],
      [220, 261.63, 329.63, 392],
      [174.61, 220, 261.63, 349.23]
    ];
  }

  const isDembow = (song.genre === 'urbano');
  const isRock = (song.genre === 'rock');

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const currentBeat = (t / beatDuration);
    const beatPos = currentBeat % 1.0;
    const bar = Math.floor(currentBeat / 4) % progressions.length;
    const currentChord = progressions[bar];
    const root = currentChord[0];

    let sample = 0;

    // 1. Kick drum
    let kickTrigger = false;
    if (isDembow) {
      // Reggaetón 4-on-the-floor kick
      kickTrigger = (beatPos < 0.25);
    } else if (isRock) {
      // Rock beats 1 & 3
      kickTrigger = (beatPos < 0.22) && (Math.floor(currentBeat) % 2 === 0);
    } else {
      kickTrigger = (beatPos < 0.20);
    }

    if (kickTrigger) {
      const kickEnv = Math.exp(-beatPos * 22);
      const kickFreq = 135 * Math.exp(-beatPos * 28) + 42;
      sample += 0.38 * Math.sin(2 * Math.PI * kickFreq * beatPos) * kickEnv;
    }

    // 2. Hi-hat / Snare rhythm
    if (isDembow) {
      // 3:3:2 syncopation
      const sixteenth = (currentBeat * 4) % 4;
      if (sixteenth >= 1.4 && sixteenth <= 1.7) {
        const snareEnv = Math.exp(-(sixteenth - 1.4) * 16);
        sample += 0.18 * (Math.random() * 2 - 1) * snareEnv;
      }
      if (sixteenth >= 2.9 && sixteenth <= 3.2) {
        const snareEnv = Math.exp(-(sixteenth - 2.9) * 16);
        sample += 0.16 * (Math.random() * 2 - 1) * snareEnv;
      }
    } else if (isRock) {
      // Rock snare on beats 2 & 4
      const isSnareBeat = (Math.floor(currentBeat) % 2 === 1);
      if (isSnareBeat && beatPos < 0.3) {
        const snareEnv = Math.exp(-beatPos * 14);
        sample += 0.22 * (Math.random() * 2 - 1) * snareEnv;
      }
      const eighth = (currentBeat * 2) % 1.0;
      const hatEnv = Math.exp(-eighth * 28);
      sample += 0.07 * (Math.random() * 2 - 1) * hatEnv;
    } else {
      const eighth = (currentBeat * 2) % 1.0;
      const hatEnv = Math.exp(-eighth * 28);
      sample += 0.08 * (Math.random() * 2 - 1) * hatEnv;
    }

    // 3. Bassline
    const eighthPos = (currentBeat * 2) % 1.0;
    const bassEnv = Math.exp(-eighthPos * 4.5);
    sample += 0.24 * Math.sin(2 * Math.PI * (root / 2) * t) * bassEnv;

    // 4. Melodic Arpeggio
    const arpStep = Math.floor(currentBeat * 4) % currentChord.length;
    const noteFreq = currentChord[arpStep];
    const arpEnv = Math.exp(-((currentBeat * 4) % 1.0) * 8);
    sample += 0.16 * Math.sin(2 * Math.PI * noteFreq * t) * arpEnv;

    // Master Soft Limiter
    sample = Math.max(-0.95, Math.min(0.95, sample));
    view.setInt16(44 + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  const blobUrl = URL.createObjectURL(blob);
  songWavBlobCache.set(song.id, blobUrl);
  return blobUrl;
}

function initAudioEngine() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// MediaSession API Integration (Enables mobile lock screen controls & background play for iOS & Android)
function updateMediaSessionMetadata(title, artist, album, artworkUrl) {
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: album || 'Carmusicfree',
        artwork: [
          { src: artworkUrl, sizes: '96x96', type: 'image/jpeg' },
          { src: artworkUrl, sizes: '192x192', type: 'image/jpeg' },
          { src: artworkUrl, sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

      navigator.mediaSession.setActionHandler('play', () => {
        if (!isPlaying) togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (isPlaying) togglePlay();
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        if (isPlaying) togglePlay();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        playPrev();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        playNext();
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        progressPercent = Math.min(100, progressPercent + 5);
        syncPlayerUI();
      });
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        progressPercent = Math.max(0, progressPercent - 5);
        syncPlayerUI();
      });
    } catch (err) {
      console.debug('MediaSession update info:', err);
    }
  }
}

// Handle natural song completion
nativeAudio.onended = () => {
  if (currentRadioId === null) {
    if (isRepeat) {
      nativeAudio.currentTime = 0;
      nativeAudio.play().catch(() => {});
    } else {
      playNext();
    }
  }
};

// One-time user gesture unlock for iOS Safari and Android
function unlockMobileAudio() {
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  if (!isPlaying) {
    const origSrc = nativeAudio.src;
    nativeAudio.src = backgroundCarrierUrl;
    nativeAudio.play().then(() => {
      nativeAudio.pause();
      if (origSrc) nativeAudio.src = origSrc;
    }).catch(() => {});
  }
  window.removeEventListener('touchstart', unlockMobileAudio);
  window.removeEventListener('click', unlockMobileAudio);
}
window.addEventListener('touchstart', unlockMobileAudio, { once: true, passive: true });
window.addEventListener('click', unlockMobileAudio, { once: true });

// DOM Selector helpers
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function matchesSearch(item, fields, query) {
  const q = normalizeSearchText(query);
  if (!q) return true;
  return fields.some((field) => normalizeSearchText(item[field]).includes(q));
}

function addOrUpdateOnlineResults(tracks = [], onlineArtists = []) {
  tracks.forEach((track) => {
    if (!track || !track.id) return;
    const existingIndex = songs.findIndex((song) => String(song.id) === String(track.id));
    if (existingIndex >= 0) {
      songs[existingIndex] = { ...songs[existingIndex], ...track };
    } else {
      songs.push(track);
    }
  });

  onlineArtists.forEach((artist) => {
    if (!artist || !artist.name) return;
    const existingIndex = artists.findIndex((item) => normalizeSearchText(item.name) === normalizeSearchText(artist.name));
    const firstTrack = tracks.find((track) => normalizeSearchText(track.artist) === normalizeSearchText(artist.name));
    const nextArtist = {
      name: artist.name,
      genre: artist.genre || 'Artista encontrado online',
      photo: artist.photo || firstTrack?.artistPhoto || firstTrack?.cover || getArtistPhoto(artist.name),
      songIndex: firstTrack ? songs.findIndex((song) => String(song.id) === String(firstTrack.id)) : artist.songIndex,
      songId: firstTrack?.id || artist.songId,
      isExternal: true
    };

    if (existingIndex >= 0) {
      artists[existingIndex] = { ...artists[existingIndex], ...nextArtist };
    } else {
      artists.push(nextArtist);
    }
  });
}

function normalizeITunesTrack(track, index) {
  return {
    id: `itunes-${track.trackId}`,
    source: 'itunes',
    title: track.trackName || 'Cancion',
    artist: track.artistName || 'Artista',
    album: track.collectionName || 'Resultado online',
    time: track.trackTimeMillis ? `${Math.floor(track.trackTimeMillis / 60000)}:${String(Math.floor((track.trackTimeMillis % 60000) / 1000)).padStart(2, '0')}` : '0:30',
    genre: track.primaryGenreName || 'online',
    bpm: 100 + (index % 40),
    cover: (track.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
    artistPhoto: (track.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
    previewUrl: track.previewUrl || '',
    storeUrl: track.trackViewUrl || '',
    fallbackGrad: 'linear-gradient(135deg, #2f80ed, #10131f)',
    isExternal: true,
    isPreview: true
  };
}

function buildOnlineArtistsFromTracks(tracks) {
  const artistMap = new Map();
  tracks.forEach((track) => {
    const key = normalizeSearchText(track.artist);
    if (!artistMap.has(key)) {
      artistMap.set(key, {
        id: `online-artist-${key.replace(/[^a-z0-9]+/gi, '-')}`,
        name: track.artist,
        genre: 'Artista encontrado online',
        photo: track.artistPhoto || track.cover || getArtistPhoto(track.artist),
        songId: track.id,
        isExternal: true
      });
    }
  });
  return Array.from(artistMap.values());
}

async function searchMusicFromBrowser(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&media=music&limit=15&country=ES`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('No se pudo buscar musica online');
  const data = await response.json();
  const tracks = (data.results || []).map(normalizeITunesTrack);
  return {
    tracks,
    artists: buildOnlineArtistsFromTracks(tracks)
  };
}

async function fetchExternalMusicSearch(query, requestId) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return;

  externalSearchState = {
    query,
    loading: true,
    tracks: externalSearchState.query === query ? externalSearchState.tracks : [],
    artists: externalSearchState.query === query ? externalSearchState.artists : []
  };
  renderSearchDropdown(
    songs.filter(s => matchesSearch(s, ['title', 'artist', 'album', 'genre'], query)),
    artists.filter(a => matchesSearch(a, ['name', 'genre'], query)),
    spanishRadios.filter(r => matchesSearch(r, ['name', 'freq', 'desc'], query)),
    query
  );

  try {
    let data;
    try {
      const response = await fetch(`/api/music/search?q=${encodeURIComponent(query)}`);
      data = response.ok ? await response.json() : null;
    } catch (err) {
      data = null;
    }

    if (!data || !Array.isArray(data.tracks)) {
      data = await searchMusicFromBrowser(query);
    }

    if (requestId !== externalSearchRequestId || normalizeSearchText($('#search')?.value || '') !== normalizedQuery) return;

    const tracks = Array.isArray(data.tracks) ? data.tracks : [];
    const onlineArtists = Array.isArray(data.artists) ? data.artists : [];
    addOrUpdateOnlineResults(tracks, onlineArtists);
    externalSearchState = {
      query,
      loading: false,
      tracks,
      artists: onlineArtists
    };
    updateSearchResults(false);
  } catch (err) {
    if (requestId !== externalSearchRequestId) return;
    console.warn('Online music search note:', err);
    externalSearchState = {
      query,
      loading: false,
      tracks: [],
      artists: []
    };
    renderSearchDropdown(
      songs.filter(s => matchesSearch(s, ['title', 'artist', 'album', 'genre'], query)),
      artists.filter(a => matchesSearch(a, ['name', 'genre'], query)),
      spanishRadios.filter(r => matchesSearch(r, ['name', 'freq', 'desc'], query)),
      query
    );
  }
}

function queueExternalMusicSearch(query) {
  clearTimeout(externalSearchTimer);
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return;

  const hasStrongLocalResult = songs.some(song => matchesSearch(song, ['title', 'artist'], query))
    || artists.some(artist => matchesSearch(artist, ['name'], query));
  const delay = hasStrongLocalResult ? 500 : 180;
  const requestId = ++externalSearchRequestId;
  externalSearchTimer = setTimeout(() => fetchExternalMusicSearch(query, requestId), delay);
}

// Render Spanish Radios
function renderRadios(radiosList = spanishRadios) {
  const container = $('#radiosGrid');
  if (!container) return;

  if (radiosList.length === 0) {
    container.innerHTML = `
      <div class="empty-search-result">
        No se han encontrado radios con esa búsqueda.
      </div>
    `;
    return;
  }

  container.innerHTML = radiosList.map((r) => {
    const isThisPlaying = (currentRadioId === r.id && isPlaying);
    return `
      <div class="radio-card ${isThisPlaying ? 'playing' : ''}" id="radioCard_${r.id}" data-radio="${r.id}">
        <div class="radio-badge-box" style="background: ${r.color}">
          <span>${r.name}</span>
          <div class="radio-live-tag">
            <span class="live-dot"></span> VIVO
          </div>
        </div>
        <strong>${r.name}</strong>
        <span class="freq">${r.freq}</span>
        <span class="desc">${r.desc}</span>
        <button class="radio-play-btn" type="button">
          ${isThisPlaying ? '❚❚ En directo' : '▶ Escuchar radio'}
        </button>
      </div>
    `;
  }).join('');
}

// Render Quick Picks
function renderPicks() {
  const container = $('#picks');
  if (!container) return;
  const picksList = defaultPlaylists.slice(0, 3);
  container.innerHTML = picksList.map((p, idx) => `
    <button class="pick" id="pickItem_${idx}" data-song="${p.songIndex}" type="button">
      <div class="mini-cover" style="background-image: url('${p.cover}');"></div>
      <div class="pick-info">
        <span class="pick-title">${p.title}</span>
        <span class="pick-subtitle">${p.desc}</span>
      </div>
      <span class="play-mini">▶</span>
    </button>
  `).join('');
}

// Render Artistas más tops 🔝
function renderArtists(artistsList = artists) {
  const container = $('#artistsGrid');
  if (!container) return;

  if (artistsList.length === 0) {
    container.innerHTML = `
      <div class="empty-search-result">
        No se han encontrado artistas con esa búsqueda.
      </div>
    `;
    return;
  }

  container.innerHTML = artistsList.map((a, idx) => `
    <button class="artist-card" id="artistItem_${idx}" data-artist="${a.name}" data-song="${a.songIndex}" data-song-id="${a.songId || ''}" type="button">
      <div class="artist-photo" style="background-image: url('${a.photo}');"></div>
      <strong>${a.name}</strong>
      <span>${a.genre}</span>
    </button>
  `).join('');
}

// Render Playlists
function renderCards(playlistItems = [...defaultPlaylists, ...userPlaylists]) {
  const container = $('#cards');
  if (!container) return;
  container.innerHTML = playlistItems.map((p, idx) => `
    <button class="card" id="cardItem_${idx}" data-song="${p.songIndex}" type="button">
      <div class="card-cover" style="background-image: url('${p.cover || defaultPlaylists[0].cover}');">
        <span class="card-play-btn">▶</span>
      </div>
      <strong>${p.title}</strong>
      <span>${p.desc || 'Playlist destacada'}</span>
    </button>
  `).join('');
}

// Get Filtered Songs
function getFilteredSongs() {
  const query = $('#search')?.value || '';
  let list = songs;

  if (currentFilter === 'liked') {
    list = songs.filter(s => likedSongIds.has(songKey(s.id)));
  } else if (currentFilter === 'radios') {
    return []; // Handled separately
  } else if (currentFilter !== 'all') {
    list = songs.filter(s => s.genre === currentFilter);
  }

  if (query) {
    list = list.filter(s =>
      matchesSearch(s, ['title', 'artist', 'album', 'genre'], query)
    );
  }
  return list;
}

function updateSearchResults(allowOnlineSearch = true) {
  const searchInput = $('#search');
  const q = searchInput?.value || '';
  const normalizedQuery = normalizeSearchText(q);

  if (!normalizedQuery) {
    externalSearchState = { query: '', loading: false, tracks: [], artists: [] };
    renderRadios();
    renderArtists();
    renderTracks();
    closeSearchDropdown();
    return;
  }

  const matchingSongs = songs.filter(s => matchesSearch(s, ['title', 'artist', 'album', 'genre'], q));
  const matchingArtists = artists.filter(a => matchesSearch(a, ['name', 'genre'], q));
  const matchingRadios = spanishRadios.filter(r => matchesSearch(r, ['name', 'freq', 'desc'], q));

  renderRadios(matchingRadios);
  renderArtists(matchingArtists);
  renderTracks();
  renderSearchDropdown(matchingSongs, matchingArtists, matchingRadios, q);
  if (allowOnlineSearch) queueExternalMusicSearch(q);
}

function closeSearchDropdown() {
  const dropdown = $('#searchDropdown');
  if (!dropdown) return;
  dropdown.classList.remove('open');
  dropdown.innerHTML = '';
}

function renderSearchDropdown(matchingSongs, matchingArtists, matchingRadios, query) {
  const dropdown = $('#searchDropdown');
  if (!dropdown) return;

  const results = [
    ...matchingSongs.slice(0, 5).map(song => ({
      type: 'song',
      id: song.id,
      title: song.title,
      subtitle: song.artist,
      thumb: song.cover,
      action: '▶'
    })),
    ...matchingArtists.slice(0, 4).map(artist => ({
      type: 'artist',
      id: artist.name,
      title: artist.name,
      subtitle: artist.genre,
      thumb: artist.photo,
      action: '🎤'
    })),
    ...matchingRadios.slice(0, 4).map(radio => ({
      type: 'radio',
      id: radio.id,
      title: radio.name,
      subtitle: radio.freq,
      thumb: radio.cover,
      action: '📻'
    }))
  ];

  if (results.length === 0) {
    dropdown.innerHTML = `
      <div class="search-dropdown-header">Sin resultados para "${query}"</div>
      <div class="search-empty">
        ${externalSearchState.loading ? 'Buscando artistas y canciones online...' : 'Prueba con otro artista, canción o radio.'}
      </div>
    `;
    dropdown.classList.add('open');
    return;
  }

  dropdown.innerHTML = `
    <div class="search-dropdown-header">
      <span>${externalSearchState.loading ? 'Resultados · buscando online...' : 'Resultados'}</span>
      <span>${results.length}</span>
    </div>
    ${results.map(result => `
      <button class="search-dropdown-item" type="button" data-search-result="${result.type}" data-search-id="${result.id}">
        <span class="search-item-thumb" style="background-image: url('${result.thumb || ''}');"></span>
        <span class="search-item-info">
          <span class="search-item-title">${result.title}</span>
          <span class="search-item-artist">${result.subtitle}</span>
        </span>
        <span class="search-item-play">${result.action}</span>
      </button>
    `).join('')}
  `;
  dropdown.classList.add('open');
}

// Render Canciones más tops 🔝
function renderTracks() {
  const container = $('#tracks');
  if (!container) return;
  const list = getFilteredSongs();

  if (currentFilter === 'radios') {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: #8e93a6;">
        <p style="font-size: 15px; margin-bottom: 8px;">Estás en la sección de Radios Españolas en directo.</p>
        <button id="btnScrollToRadios" style="background: var(--accent); color: #fff; border: 0; padding: 8px 18px; border-radius: 20px; font-weight: 700; cursor: pointer;">Subir a Radios</button>
      </div>
    `;
    const btn = $('#btnScrollToRadios');
    if (btn) btn.onclick = () => {
      $('#sectionRadios')?.scrollIntoView({ behavior: 'smooth' });
    };
    return;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="padding: 30px; text-align: center; color: #8e93a6;">
        <p style="font-size: 15px; margin-bottom: 8px;">No se han encontrado canciones en este filtro</p>
        <button id="btnResetFilter" style="background: transparent; color: var(--accent); border: 0; font-weight: 700; cursor: pointer;">Mostrar todas las canciones</button>
      </div>
    `;
    const resetBtn = $('#btnResetFilter');
    if (resetBtn) resetBtn.onclick = () => setFilter('all');
    return;
  }

  container.innerHTML = list.map((song, idx) => {
    const isCurrent = (songs[currentSongIndex] && song.id === songs[currentSongIndex].id && currentRadioId === null);
    const isLiked = likedSongIds.has(songKey(song.id));
    const waveAnimation = (isCurrent && isPlaying)
      ? `<div class="sound-bars"><span></span><span></span><span></span><span></span></div>`
      : `${idx + 1}`;
    const newBadge = song.isNew ? `<span class="track-tag-new">✨ ESTRENO</span>` : '';
    const onlineBadge = song.isExternal ? `<span class="track-yt-tag">ONLINE</span>` : '';

    return `
      <div class="track ${isCurrent ? 'playing' : ''}" id="trackItem_${song.id}" data-song="${song.id}">
        <span class="track-number">${waveAnimation}</span>
        <div class="track-image" style="background-image: url('${song.cover}');"></div>
        <span class="track-title">${song.title} ${newBadge} ${onlineBadge} <span>${song.artist}</span></span>
        <span class="track-album">${song.album}</span>
        <span class="track-time">${song.time}</span>
        <span class="track-like ${isLiked ? 'liked' : ''}" data-like="${song.id}" title="Favorita">${isLiked ? '♥' : '♡'}</span>
      </div>
    `;
  }).join('');
}

// Sync UI Player with Active Audio (Radio or Song)
function syncPlayerUI() {
  if (currentRadioId !== null) {
    // A Spanish Radio station is playing
    const radio = spanishRadios.find(r => r.id === currentRadioId);
    if (radio) {
      $('#playerTitle').textContent = radio.name;
      $('#playerArtist').textContent = `${radio.freq} (En directo)`;
      $('#duration').textContent = 'VIVO';
      $('#playerCover').style.backgroundImage = `url('${radio.cover}')`;
      $('#playToggle').textContent = isPlaying ? '❚❚' : '▶';

      $('#playerHeart').textContent = '♡';
      $('#playerHeart').classList.remove('liked');
      $('#progress').value = 100;
      $('#elapsed').textContent = 'EN DIRECTO';

      updateMediaSessionMetadata(radio.name, 'Radios Españolas', radio.freq, radio.cover);
    }
  } else {
    // A Top song is playing (sourced from YouTube)
    const song = songs[currentSongIndex];
    if (song) {
      $('#playerTitle').textContent = song.title;
      $('#playerArtist').textContent = song.artist;
      $('#duration').textContent = song.time;
      $('#playerCover').style.backgroundImage = `url('${song.cover}')`;
      $('#playToggle').textContent = isPlaying ? '❚❚' : '▶';

      const isLiked = likedSongIds.has(songKey(song.id));
      const heart = $('#playerHeart');
      heart.textContent = isLiked ? '♥' : '♡';
      heart.classList.toggle('liked', isLiked);

      $('#progress').value = progressPercent;

      const totalSeconds = (ytPlayer && isYtReady && typeof ytPlayer.getDuration === 'function' && ytPlayer.getDuration() > 0)
        ? ytPlayer.getDuration()
        : parseDurationToSeconds(song.time);
      const currentSeconds = Math.floor((progressPercent / 100) * totalSeconds);
      const min = Math.floor(currentSeconds / 60);
      const sec = String(currentSeconds % 60).padStart(2, '0');
      $('#elapsed').textContent = `${min}:${sec}`;

      updateMediaSessionMetadata(song.title, song.artist, song.album, song.cover);
    }
  }

  renderRadios();
  renderTracks();
}

function parseDurationToSeconds(str) {
  const parts = str.split(':').map(Number);
  return (parts[0] || 0) * 60 + (parts[1] || 0);
}

// Toggle Play / Pause
function togglePlay() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    if (currentRadioId !== null) {
      // Connect in real-time to live radio stream (never resume old buffered audio)
      const radio = spanishRadios.find(r => r.id === currentRadioId);
      if (radio) {
        const sep = radio.streamUrl.includes('?') ? '&' : '?';
        const liveUrl = `${radio.streamUrl}${sep}_live=${Date.now()}`;
        nativeAudio.pause();
        nativeAudio.src = liveUrl;
        nativeAudio.currentTime = 0;
        nativeAudio.load();
        nativeAudio.loop = false;
        setNativeVolume(currentVolume);
        nativeAudio.play().catch(e => {
          console.warn('Radio stream live autoplay note:', e);
        });
        showToast(`📻 Sintonizando en directo: ${radio.name}`);
      }
    } else {
      // Playing song through an official preview when available, otherwise through embedded YouTube.
      const song = songs[currentSongIndex];
      if (song) {
        if (song.previewUrl) {
          nativeAudio.play().catch(() => {});
        } else if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
          ytPlayer.playVideo();
        } else {
          nativeAudio.play().catch(() => {});
        }
      }
    }
  } else {
    // Paused
    if (currentRadioId !== null) {
      nativeAudio.pause();
      // CRITICAL: Unload buffered source so when resuming, it reconnects to the LIVE on-air broadcast!
      try {
        nativeAudio.removeAttribute('src');
        nativeAudio.load();
      } catch (err) {}
    } else {
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        try {
          ytPlayer.pauseVideo();
        } catch (e) {}
      }
      nativeAudio.pause();
    }
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  }
  syncPlayerUI();
}

// Play Spanish Radio
function playRadio(radioId) {
  currentRadioId = radioId;
  const radio = spanishRadios.find(r => r.id === radioId);
  if (!radio) return;

  // Stop YouTube playback so it doesn't overlap
  if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
    try {
      ytPlayer.pauseVideo();
    } catch (e) {}
  }

  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }

  isPlaying = true;
  const sep = radio.streamUrl.includes('?') ? '&' : '?';
  const liveUrl = `${radio.streamUrl}${sep}_live=${Date.now()}`;
  nativeAudio.pause();
  nativeAudio.src = liveUrl;
  nativeAudio.currentTime = 0;
  nativeAudio.load();
  nativeAudio.loop = false;
  setNativeVolume(currentVolume);
  nativeAudio.play().catch(err => {
    console.warn('Live radio direct stream playback error:', err);
    showToast(`Conectando a ${radio.name}...`);
  });

  syncPlayerUI();
  showToast(`📻 Sintonizando en directo: ${radio.name} (${radio.freq})`);
}

// Play Song. Online search results use official provider previews without ads when available.
async function playSong(songIdentifier) {
  currentRadioId = null; // Switch back to songs catalog

  // Pause and clear radio stream
  try {
    nativeAudio.pause();
    nativeAudio.removeAttribute('src');
    nativeAudio.load();
  } catch (e) {}

  let targetIndex = songs.findIndex(s => String(s.id) === String(songIdentifier));
  if (targetIndex === -1 && typeof songIdentifier === 'number' && songIdentifier >= 0 && songIdentifier < songs.length) {
    targetIndex = songIdentifier;
  }
  if (targetIndex === -1) targetIndex = 0;

  currentSongIndex = targetIndex;
  progressPercent = 0;

  const song = songs[currentSongIndex];
  if (!song) return;

  isPlaying = true;
  syncPlayerUI();
  showToast(`▶ Reproduciendo: ${song.title} (${song.artist})`);

  if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
    try {
      ytPlayer.pauseVideo();
    } catch (e) {}
  }

  nativeAudio.src = song.previewUrl || song.audioDataUrl || getSongAudioWavUrl(song);
  nativeAudio.loop = !song.previewUrl;
  setNativeVolume(currentVolume);

  if (song.previewUrl) {
    nativeAudio.currentTime = 0;
    nativeAudio.play().catch((err) => {
      console.warn('Preview playback note:', err);
      showToast('Toca otra vez para activar el audio del navegador');
    });
  }

  const videoId = song.previewUrl ? null : await resolveYouTubeVideoForSong(song);

  // Guard against rapid switching
  if (currentSongIndex !== targetIndex || currentRadioId !== null || !isPlaying) return;

  if (!song.previewUrl && ytPlayer && isYtReady && typeof ytPlayer.loadVideoById === 'function') {
    try {
      ytPlayer.loadVideoById({
        videoId: videoId,
        startSeconds: 0
      });
      ytPlayer.setVolume(Math.round(currentVolume * 100));
      ytPlayer.playVideo();
      // Mute/pause fallback audio once YouTube stream engages
      setTimeout(() => {
        try {
          nativeAudio.pause();
        } catch (e) {}
      }, 700);
    } catch (err) {
      console.warn('YouTube load error:', err);
    }
  } else if (!song.previewUrl) {
    ytPendingPlay = true;
    nativeAudio.play().catch(() => {});
  }

  initAudioEngine();

  if (progressTimer) clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    if (!isPlaying || currentRadioId !== null) return;
    if (song.previewUrl && nativeAudio.duration > 0) {
      const current = nativeAudio.currentTime || 0;
      const dur = nativeAudio.duration || parseDurationToSeconds(song.time);
      progressPercent = Math.min(100, (current / dur) * 100);
      const min = Math.floor(current / 60);
      const sec = String(Math.floor(current % 60)).padStart(2, '0');
      const durMin = Math.floor(dur / 60);
      const durSec = String(Math.floor(dur % 60)).padStart(2, '0');
      $('#progress').value = progressPercent;
      $('#elapsed').textContent = `${min}:${sec}`;
      $('#duration').textContent = `${durMin}:${durSec}`;
      if (nativeAudio.ended) playNext();
      return;
    }
    if (ytPlayer && isYtReady && typeof ytPlayer.getCurrentTime === 'function' && typeof ytPlayer.getDuration === 'function') {
      const current = ytPlayer.getCurrentTime() || 0;
      const dur = ytPlayer.getDuration() || parseDurationToSeconds(song.time);
      if (dur > 0) {
        progressPercent = Math.min(100, (current / dur) * 100);
        const min = Math.floor(current / 60);
        const sec = String(Math.floor(current % 60)).padStart(2, '0');
        const durMin = Math.floor(dur / 60);
        const durSec = String(Math.floor(dur % 60)).padStart(2, '0');
        $('#progress').value = progressPercent;
        $('#elapsed').textContent = `${min}:${sec}`;
        $('#duration').textContent = `${durMin}:${durSec}`;
        return;
      }
    }

    // Fallback timer if player metadata still loading
    progressPercent += 0.5;
    if (progressPercent > 100) {
      progressPercent = 0;
      if (isRepeat) {
        syncPlayerUI();
      } else {
        playNext();
      }
    } else {
      syncPlayerUI();
    }
  }, 500);

  syncPlayerUI();
  showToast(`▶ Reproduciendo: ${song.title} (${song.artist})`);
}

function playNext() {
  if (currentRadioId !== null) {
    const currentIdx = spanishRadios.findIndex(r => r.id === currentRadioId);
    const nextIdx = (currentIdx + 1) % spanishRadios.length;
    playRadio(spanishRadios[nextIdx].id);
    return;
  }
  let nextIdx;
  if (isShuffle) {
    nextIdx = Math.floor(Math.random() * songs.length);
  } else {
    nextIdx = (currentSongIndex + 1) % songs.length;
  }
  playSong(nextIdx);
}

function playPrev() {
  if (currentRadioId !== null) {
    const currentIdx = spanishRadios.findIndex(r => r.id === currentRadioId);
    const prevIdx = (currentIdx - 1 + spanishRadios.length) % spanishRadios.length;
    playRadio(spanishRadios[prevIdx].id);
    return;
  }
  const prevIdx = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(prevIdx);
}

function toggleLike(songId) {
  const key = songKey(songId);
  if (likedSongIds.has(key)) {
    likedSongIds.delete(key);
    showToast('Eliminada de tus favoritas');
  } else {
    likedSongIds.add(key);
    showToast('Añadida a tus favoritas ♥');
  }
  localStorage.setItem('carmusicfree_liked', JSON.stringify([...likedSongIds]));
  syncPlayerUI();
}

function setFilter(filter) {
  currentFilter = filter;
  $$('.chip').forEach(c => {
    c.classList.toggle('active', c.dataset.filter === filter);
  });
  if (filter === 'radios') {
    $('#sectionRadios')?.scrollIntoView({ behavior: 'smooth' });
  }
  renderTracks();
}

function showToast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// User Account UI
function updateUserUI() {
  const account = normalizeAccount(userAccount);
  const displayName = account.loggedIn ? account.name : 'Entrar';
  const displayAvatar = account.avatar || displayName.charAt(0).toUpperCase();

  $('#topbarUserName').textContent = displayName;
  $('#topbarAvatar').textContent = displayAvatar;
  $('#modalProfileAvatar').textContent = displayAvatar;
  $('#modalProfileName').textContent = account.name;
  $('#modalProfileEmail').textContent = account.email || 'Sin cuenta iniciada';
  $('#modalProfilePlan').textContent = account.plan;

  if ($('#prefBassBoost')) $('#prefBassBoost').checked = !!account.bassBoost;
  if ($('#prefUltraHD')) $('#prefUltraHD').checked = !!account.ultraHD;
  if ($('#prefBackgroundPlay')) $('#prefBackgroundPlay').checked = !!account.backgroundPlay;
}

function openAccountPanel() {
  if (userAccount.loggedIn) {
    openModal('#profileModal');
  } else {
    openModal('#authModal');
  }
}

function openModal(modalId) {
  const modal = $(modalId);
  if (modal) modal.classList.add('show');
}

function closeModal(modalId) {
  const modal = $(modalId);
  if (modal) modal.classList.remove('show');
}

// SPA Navigation Views (Guarantees zero 404s on mobile and desktop)
function navigateView(viewName) {
  $$('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.view === viewName);
  });
  $$('.mobile-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  const heroSection = $('#heroSection');
  const sectionPicks = $('#sectionPicks');
  const sectionRadios = $('#sectionRadios');
  const sectionArtists = $('#sectionArtists');
  const sectionPlaylists = $('#sectionPlaylists');
  const sectionTracks = $('#sectionTracks');

  if (viewName === 'inicio') {
    heroSection.style.display = 'block';
    sectionPicks.style.display = 'block';
    sectionRadios.style.display = 'block';
    sectionArtists.style.display = 'block';
    sectionPlaylists.style.display = 'block';
    sectionTracks.style.display = 'block';
    setFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'explorar') {
    heroSection.style.display = 'none';
    sectionPicks.style.display = 'none';
    sectionRadios.style.display = 'block';
    sectionArtists.style.display = 'block';
    sectionPlaylists.style.display = 'block';
    sectionTracks.style.display = 'block';
    setFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Explorando artistas tops, canciones y radios');
  } else if (viewName === 'radios') {
    heroSection.style.display = 'none';
    sectionPicks.style.display = 'none';
    sectionRadios.style.display = 'block';
    sectionArtists.style.display = 'none';
    sectionPlaylists.style.display = 'none';
    sectionTracks.style.display = 'none';
    setFilter('radios');
    sectionRadios.scrollIntoView({ behavior: 'smooth' });
    showToast('📻 Radios españolas en directo');
  } else if (viewName === 'biblioteca') {
    heroSection.style.display = 'none';
    sectionPicks.style.display = 'none';
    sectionRadios.style.display = 'none';
    sectionArtists.style.display = 'none';
    sectionPlaylists.style.display = 'block';
    sectionTracks.style.display = 'block';
    setFilter('liked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Tu biblioteca: favoritas y playlists');
  }
}

// Events Initialization
function initEvents() {
  document.addEventListener('click', (e) => {
    const searchResult = e.target.closest('[data-search-result]');
    if (searchResult) {
      const type = searchResult.dataset.searchResult;
      const id = searchResult.dataset.searchId;
      closeSearchDropdown();

      if (type === 'song') {
        playSong(id);
      } else if (type === 'radio') {
        navigateView('radios');
        playRadio(id);
      } else if (type === 'artist') {
        const artist = artists.find(a => a.name === id);
        if (artist) {
          $('#sectionArtists')?.scrollIntoView({ behavior: 'smooth' });
          playSong(artist.songId || artist.songIndex);
        }
      }
      return;
    }

    if (!e.target.closest('#searchContainer')) {
      closeSearchDropdown();
    }

    // Like button clicked
    const likeBtn = e.target.closest('[data-like]');
    if (likeBtn) {
      e.stopPropagation();
      toggleLike(likeBtn.dataset.like);
      return;
    }

    // Radio Card Clicked
    const radioElem = e.target.closest('[data-radio]');
    if (radioElem) {
      const radioId = radioElem.dataset.radio;
      if (currentRadioId === radioId && isPlaying) {
        togglePlay();
      } else {
        playRadio(radioId);
      }
      return;
    }

    // Artist Card Clicked
    const artistElem = e.target.closest('[data-artist]');
    if (artistElem) {
      const artistName = artistElem.dataset.artist;
      const songIdx = +artistElem.dataset.song;
      const songId = artistElem.dataset.songId;
      playSong(songId || songIdx);
      showToast(`🎤 Artista top 🔝: ${artistName}`);
      return;
    }

    // Song clicked
    const songElem = e.target.closest('[data-song]');
    if (songElem) {
      playSong(songElem.dataset.song);
      return;
    }

    // Filter chip click
    const chip = e.target.closest('.chip');
    if (chip) {
      setFilter(chip.dataset.filter);
      return;
    }

    // View Navigation Buttons
    const viewBtn = e.target.closest('[data-view]');
    if (viewBtn) {
      e.preventDefault();
      navigateView(viewBtn.dataset.view);
      return;
    }

    // Mobile specific action buttons
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      const act = actionBtn.dataset.action;
      if (act === 'perfil') openAccountPanel();
      return;
    }
  });

  // Player controls
  $('#playToggle').onclick = togglePlay;
  $('#nextTrack').onclick = playNext;
  $('#prevTrack').onclick = playPrev;
  $('#playerHeart').onclick = () => {
    if (currentRadioId === null) {
      toggleLike(currentSongIndex);
    } else {
      showToast('Las radios se guardan en tus sintonías habituales');
    }
  };

  $('#shuffleBtn').onclick = function() {
    isShuffle = !isShuffle;
    this.classList.toggle('active', isShuffle);
    showToast(isShuffle ? 'Modo aleatorio activado' : 'Modo aleatorio desactivado');
  };

  $('#repeatBtn').onclick = function() {
    isRepeat = !isRepeat;
    this.classList.toggle('active', isRepeat);
    showToast(isRepeat ? 'Repetir canción activado' : 'Repetición desactivada');
  };

  $('#progress').oninput = (e) => {
    if (currentRadioId !== null) return;
    progressPercent = +e.target.value;
    if (ytPlayer && isYtReady && typeof ytPlayer.seekTo === 'function' && typeof ytPlayer.getDuration === 'function') {
      const dur = ytPlayer.getDuration() || parseDurationToSeconds(songs[currentSongIndex].time);
      if (dur > 0) {
        const targetSec = (progressPercent / 100) * dur;
        try {
          ytPlayer.seekTo(targetSec, true);
        } catch (err) {}
      }
    }
    syncPlayerUI();
  };

  // Volume slider (iOS Safari & Android friendly)
  const volSlider = $('#volumeSlider');
  if (volSlider) {
    volSlider.oninput = (e) => {
      const vol = +e.target.value / 100;
      isMuted = vol === 0;
      setNativeVolume(vol);
      $('#muteBtn').textContent = isMuted ? '🔇' : '🔊';
    };
  }

  $('#muteBtn').onclick = () => {
    isMuted = !isMuted;
    if (isMuted) {
      $('#muteBtn').textContent = '🔇';
      setNativeVolume(0);
    } else {
      $('#muteBtn').textContent = '🔊';
      setNativeVolume(currentVolume || 0.75);
    }
  };

  // Search input
  const searchInput = $('#search');
  if (searchInput) {
    searchInput.oninput = updateSearchResults;
    searchInput.onfocus = updateSearchResults;
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        updateSearchResults();
        searchInput.blur();
      }
      if (e.key === 'Enter') {
        const firstResult = $('#searchDropdown [data-search-result]');
        if (firstResult) firstResult.click();
      }
    });
  }

  // Hero Actions
  $('#heroPlay').onclick = () => playSong(0);
  $('#heroRadios').onclick = () => navigateView('radios');
  $('#heroLikeAll').onclick = () => {
    songs.forEach(s => likedSongIds.add(songKey(s.id)));
    localStorage.setItem('carmusicfree_liked', JSON.stringify([...likedSongIds]));
    syncPlayerUI();
    showToast('¡Todas las canciones añadidas a favoritas!');
  };

  // Profile Button & Modals
  $('#profileButton').onclick = openAccountPanel;

  $('#closeProfileModal').onclick = () => closeModal('#profileModal');
  $('#closeAuthModal').onclick = () => closeModal('#authModal');
  $('#closePlaylistModal').onclick = () => closeModal('#createPlaylistModal');

  $('#tabLogin').onclick = () => {
    $('#tabLogin').classList.add('active');
    $('#tabRegister').classList.remove('active');
    $('#groupName').style.display = 'none';
    $('#btnSubmitAuth').textContent = 'Entrar';
    $('#authModalTitle').textContent = 'Bienvenido a Carmusicfree';
  };

  $('#tabRegister').onclick = () => {
    $('#tabRegister').classList.add('active');
    $('#tabLogin').classList.remove('active');
    $('#groupName').style.display = 'block';
    $('#btnSubmitAuth').textContent = 'Crear cuenta Plus';
    $('#authModalTitle').textContent = 'Crea tu cuenta gratis';
  };

  $('#btnQuickDemoLogin').onclick = () => {
    saveUserAccount({
      name: 'Carlos',
      email: 'carlos@carmusicfree.com',
      avatar: 'C',
      plan: 'Carmusicfree Plus ★',
      loggedIn: true,
      backgroundPlay: true,
      bassBoost: true,
      ultraHD: true
    });
    updateUserUI();
    closeModal('#authModal');
    showToast('Sesión iniciada: Carlos (Carmusicfree Plus)');
  };

  $('#authForm').onsubmit = (e) => {
    e.preventDefault();
    const email = $('#inputAuthEmail').value.trim();
    const password = $('#inputAuthPassword').value.trim();
    const isRegister = $('#tabRegister').classList.contains('active');
    const accounts = loadJson('carmusicfree_accounts', {});
    const storedAccount = accounts[email.toLowerCase()];

    if (!email || !password) {
      showToast('Escribe correo y contraseña');
      return;
    }

    if (!isRegister && storedAccount) {
      saveUserAccount({
        ...storedAccount,
        loggedIn: true
      });
      updateUserUI();
      closeModal('#authModal');
      showToast(`Sesión iniciada: ${userAccount.name}`);
      return;
    }

    const name = ($('#inputAuthName').value || storedAccount?.name || email.split('@')[0]).trim();
    saveUserAccount({
      ...(storedAccount || {}),
      name,
      email: email,
      avatar: name.charAt(0).toUpperCase(),
      plan: 'Carmusicfree Plus ★',
      loggedIn: true,
      backgroundPlay: storedAccount?.backgroundPlay ?? true,
      bassBoost: storedAccount?.bassBoost ?? true,
      ultraHD: storedAccount?.ultraHD ?? true
    });
    updateUserUI();
    closeModal('#authModal');
    showToast(isRegister ? `Cuenta guardada: ${name}` : `Sesión iniciada: ${name}`);
  };

  $('#btnLogout').onclick = () => {
    saveUserAccount({
      ...GUEST_ACCOUNT,
      backgroundPlay: userAccount.backgroundPlay
    });
    updateUserUI();
    closeModal('#profileModal');
    showToast('Sesión cerrada correctamente');
  };

  $('#btnEditProfile').onclick = () => {
    const newName = prompt('Introduce tu nuevo nombre de usuario:', userAccount.name);
    if (newName && newName.trim()) {
      userAccount.name = newName.trim();
      userAccount.avatar = userAccount.name.charAt(0).toUpperCase();
      saveUserAccount(userAccount);
      updateUserUI();
      showToast(`Nombre actualizado a ${userAccount.name}`);
    }
  };

  ['prefBackgroundPlay', 'prefBassBoost', 'prefUltraHD'].forEach(prefId => {
    const pref = $(`#${prefId}`);
    if (!pref) return;

    pref.onchange = () => {
      const prefKey = prefId.replace('pref', '');
      const accountKey = prefKey.charAt(0).toLowerCase() + prefKey.slice(1);
      userAccount[accountKey] = pref.checked;
      saveUserAccount(userAccount);
      showToast('Preferencias guardadas');
    };
  });

  // Playlists
  $('#newPlaylist').onclick = () => openModal('#createPlaylistModal');
  $('#btnNewPlaylistHeading').onclick = () => openModal('#createPlaylistModal');

  $('#playlistForm').onsubmit = (e) => {
    e.preventDefault();
    const title = $('#playlistTitle').value.trim();
    const desc = $('#playlistDesc').value.trim() || 'Mi playlist destacada';
    if (!title) return;

    const newPl = {
      title,
      desc,
      cover: songs[currentSongIndex].cover,
      songIndex: currentSongIndex
    };

    userPlaylists.push(newPl);
    localStorage.setItem('carmusicfree_custom_playlists', JSON.stringify(userPlaylists));
    renderCards();
    closeModal('#createPlaylistModal');
    $('#playlistTitle').value = '';
    $('#playlistDesc').value = '';
    showToast(`Playlist "${title}" creada con éxito!`);
  };

  $('#showLiked').onclick = () => navigateView('biblioteca');
  $('#historyBack').onclick = () => navigateView('inicio');
  $('#historyForward').onclick = () => navigateView('explorar');

  $('#btnRefreshPicks').onclick = () => {
    showToast('Tu selección rápida ha sido actualizada');
  };

  $('#btnFilterArtists').onclick = () => navigateView('explorar');
  $('#btnPlayAllTracks').onclick = () => playSong(0);
  $('#btnFilterRadiosAll').onclick = () => navigateView('radios');

  // Keep AudioContext resumed when tab or phone unlocks
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isPlaying && audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  });

  // Modals closing
  $$('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $$('.modal-overlay').forEach(m => m.classList.remove('show'));
    }
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Play a pleasant chime tone using Web Audio API when a new artist track lands
function playNewReleaseChime() {
  try {
    initAudioEngine();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) {}
}

// Display Live Drop Alert Banner with "Escuchar ya" button
let liveAlertTimeout = null;
function showLiveAlertBanner(song, customMessage) {
  const alertBox = $('#liveDropAlert');
  const msgElem = $('#liveAlertMessage');
  const playBtn = $('#btnPlayLiveDrop');
  if (!alertBox || !msgElem) return;

  msgElem.innerHTML = customMessage || `<strong>${song.artist}</strong> acaba de subir su tema <strong>"${song.title}"</strong>.`;
  alertBox.style.display = 'flex';

  if (playBtn) {
    playBtn.onclick = () => {
      playSong(song.id);
      alertBox.style.display = 'none';
    };
  }

  playNewReleaseChime();

  if (liveAlertTimeout) clearTimeout(liveAlertTimeout);
  liveAlertTimeout = setTimeout(() => {
    alertBox.style.display = 'none';
  }, 22000);
}

// When a new song arrives from an artist, update catalog immediately
function onNewSongPublished(newSong, message) {
  if (!newSong) return;

  // Prevent duplicate additions
  const alreadyExists = songs.some(s => s.id === newSong.id || (s.title.toLowerCase() === newSong.title.toLowerCase() && s.artist.toLowerCase() === newSong.artist.toLowerCase()));
  if (alreadyExists) return;

  newSong.isNew = true;
  // Prepend so it sits right at the top of the list
  songs.unshift(newSong);

  // If this artist exists in top artists, update their latest songIndex to this new song
  const existingArtist = artists.find(a => a.name.toLowerCase() === newSong.artist.toLowerCase());
  if (existingArtist) {
    existingArtist.songIndex = newSong.id;
  } else {
    // Add new artist to the top artists grid as well
    artists.unshift({
      name: newSong.artist,
      genre: newSong.genre ? newSong.genre.toUpperCase() : 'Nuevo Artista Top',
      photo: newSong.cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
      songIndex: newSong.id
    });
    renderArtists();
  }

  // Re-render tracks and UI immediately without page refresh!
  renderTracks();
  renderPicks();

  // Show live banner alert & toast
  showLiveAlertBanner(newSong, message);
  showToast(`🔴 ¡Novedad en directo! ${newSong.artist} - "${newSong.title}"`);
}

// Connect to Server-Sent Events (SSE) Live Feed
let sseLiveFeed = null;
function initLiveSongStream() {
  if (!window.EventSource) return;

  try {
    if (sseLiveFeed) sseLiveFeed.close();

    sseLiveFeed = new EventSource('/api/songs/live-feed');

    sseLiveFeed.onopen = () => {
      const badge = $('#liveAutoBadge');
      if (badge) {
        badge.style.display = 'inline-flex';
        badge.title = 'Conectado al radar en tiempo real: cuando un artista sube un tema, aparece solo al instante.';
      }
    };

    sseLiveFeed.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'NEW_SONG' && data.song) {
          onNewSongPublished(data.song, data.message);
        }
      } catch (err) {
        console.error('SSE JSON error:', err);
      }
    };

    sseLiveFeed.onerror = () => {
      console.debug('SSE reconnecting in background...');
    };
  } catch (err) {
    console.warn('SSE live feed error:', err);
  }

  // Backup polling: Every 10 seconds check /api/songs so that if network or iframe drops SSE,
  // new songs are guaranteed to still auto-update and appear!
  setInterval(async () => {
    try {
      const res = await fetch('/api/songs');
      if (res.ok) {
        const data = await res.json();
        if (data.songs && Array.isArray(data.songs)) {
          const currentIds = new Set(songs.map(s => s.id));
          const freshSongs = data.songs.filter(s => !currentIds.has(s.id));
          if (freshSongs.length > 0) {
            freshSongs.reverse().forEach(s => {
              onNewSongPublished(s, `¡${s.artist} acaba de subir "${s.title}"!`);
            });
          }
        }
      }
    } catch (e) {}
  }, 10000);
}

// Initial Sync with Server Songs
async function syncSongsWithServer() {
  try {
    const res = await fetch('/api/songs');
    if (res.ok) {
      const data = await res.json();
      if (data.songs && Array.isArray(data.songs) && data.songs.length > 0) {
        // Merge without losing any local state
        const serverMap = new Map(data.songs.map(s => [s.id, s]));
        // Keep order from server
        const merged = [...data.songs];
        songs.forEach(localSong => {
          if (!serverMap.has(localSong.id)) {
            merged.push(localSong);
          }
        });
        songs = merged;
        renderTracks();
        renderPicks();
      }
    }
  } catch (e) {
    console.debug('Using initial embedded songs catalog:', e);
  }
}

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  renderRadios();
  renderPicks();
  renderArtists();
  renderCards();
  renderTracks();
  updateUserUI();
  syncPlayerUI();
  initEvents();
  syncSongsWithServer();
  initLiveSongStream();
});
