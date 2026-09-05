const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(__dirname));

const externalMusicSearchCache = new Map();

function normalizeExternalTrack(track, index) {
  const artistName = track.artist?.name || 'Artista';
  return {
    id: `deezer-${track.id}`,
    source: 'deezer',
    title: track.title_short || track.title || 'Cancion',
    artist: artistName,
    album: track.album?.title || 'Resultado online',
    time: track.duration ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, '0')}` : '0:30',
    genre: 'online',
    bpm: 100 + (index % 40),
    cover: track.album?.cover_medium || track.artist?.picture_medium || getArtistPhoto(artistName),
    artistPhoto: track.artist?.picture_medium || track.album?.cover_medium || getArtistPhoto(artistName),
    previewUrl: track.preview || '',
    deezerUrl: track.link || '',
    fallbackGrad: 'linear-gradient(135deg, #2f80ed, #10131f)',
    isExternal: true,
    isPreview: true
  };
}

async function searchITunesFallback(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&media=music&limit=12&country=ES`;
  const response = await fetch(url);
  if (!response.ok) return [];
  const data = await response.json();
  return (data.results || []).map((track, index) => ({
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
  }));
}

// Real authentic verified portrait photos of artists
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

// Initial top Spanish and Latin artists songs catalog (with real artist portraits)
let liveSongs = [
  {
    id: 0,
    title: 'Solamente Tú',
    artist: 'Pablo Alborán',
    album: 'Pablo Alborán',
    time: '4:08',
    genre: 'pop',
    bpm: 96,
    cover: getArtistPhoto('Pablo Alborán'),
    fallbackGrad: 'linear-gradient(135deg, #e37b42, #381a18)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #3d52a0, #13172e)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #e65c7b, #3b172a)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #6c5ce7, #1e1938)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #d82436, #240c10)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #2b77e5, #0f2249)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #9635b5, #140e34)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #38c5b0, #13393f)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #ffc54d, #2f1d10)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #f35b42, #2d182e)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #d38136, #361a15)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #e0325b, #43132e)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #2b77e5, #0f2249)',
    isNew: false
  },
  {
    id: 13,
    title: 'Tú Me Dejaste De Querer',
    artist: 'C. Tangana, Niño de Elche, La Húngara',
    album: 'El Madrileño',
    time: '3:17',
    genre: 'pop',
    bpm: 112,
    cover: getArtistPhoto('C. Tangana'),
    fallbackGrad: 'linear-gradient(135deg, #d38136, #361a15)',
    isNew: false
  },
  {
    id: 14,
    title: 'Formentera',
    artist: 'Aitana, Nicki Nicole',
    album: '11 Razones +',
    time: '3:12',
    genre: 'pop',
    bpm: 126,
    cover: getArtistPhoto('Aitana'),
    fallbackGrad: 'linear-gradient(135deg, #ff715b, #441732)',
    isNew: false
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
    fallbackGrad: 'linear-gradient(135deg, #d82436, #160824)',
    isNew: false
  },
  {
    id: 16,
    title: 'MONACO',
    artist: 'Bad Bunny',
    album: 'Nadie sabe lo que va a pasar mañana',
    time: '4:27',
    genre: 'pop',
    bpm: 140,
    cover: getArtistPhoto('Bad Bunny'),
    fallbackGrad: 'linear-gradient(135deg, #f35b42, #2d182e)',
    isNew: false
  }
];

// Curated queue of upcoming live releases from top artists (with real artist portraits)
const upcomingArtistDrops = [
  {
    title: 'Portales',
    artist: 'Dani Martín',
    album: 'No, No Sigo Siendo el Mismo',
    time: '3:34',
    genre: 'rock',
    bpm: 132,
    cover: getArtistPhoto('Dani Martín'),
    fallbackGrad: 'linear-gradient(135deg, #e63946, #1d3557)'
  },
  {
    title: 'Castillos de Arena',
    artist: 'Pablo Alborán',
    album: 'La Cuarta Hoja (Edición Platino)',
    time: '3:48',
    genre: 'pop',
    bpm: 104,
    cover: getArtistPhoto('Pablo Alborán'),
    fallbackGrad: 'linear-gradient(135deg, #e37b42, #1c2541)'
  },
  {
    title: 'Caminando por la Vida',
    artist: 'Melendi',
    album: '20 Años Sin Noticias',
    time: '3:38',
    genre: 'pop',
    bpm: 114,
    cover: getArtistPhoto('Melendi'),
    fallbackGrad: 'linear-gradient(135deg, #06d6a0, #073b4c)'
  },
  {
    title: 'Fue',
    artist: 'Manuel Carrasco',
    album: 'Corazón y Flecha',
    time: '3:42',
    genre: 'pop',
    bpm: 116,
    cover: getArtistPhoto('Manuel Carrasco'),
    fallbackGrad: 'linear-gradient(135deg, #f77f00, #003049)'
  },
  {
    title: 'Palmeras en el Jardín',
    artist: 'Alejandro Sanz',
    album: 'Palmeras en el Jardín - Single',
    time: '4:02',
    genre: 'pop',
    bpm: 98,
    cover: getArtistPhoto('Alejandro Sanz'),
    fallbackGrad: 'linear-gradient(135deg, #d38136, #361a15)'
  },
  {
    title: 'Akureyri',
    artist: 'Aitana, Sebastián Yatra',
    album: 'Alpha Directos',
    time: '3:10',
    genre: 'pop',
    bpm: 120,
    cover: getArtistPhoto('Aitana'),
    fallbackGrad: 'linear-gradient(135deg, #ff715b, #441732)'
  }
];

// SSE Clients registry for real-time pushing
const sseClients = new Set();

function broadcastToClients(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// In-memory cache for dynamic YouTube song resolution (No manual IDs needed!)
const ytResolveCache = new Map();

// 1. API: Get all current songs
app.get('/api/songs', (req, res) => {
  res.json({
    success: true,
    songs: liveSongs,
    timestamp: Date.now()
  });
});

// API: worldwide music search with legal no-ad previews when the provider exposes them.
app.get('/api/music/search', async (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) {
    return res.status(400).json({ success: false, error: 'Busqueda requerida' });
  }

  const cacheKey = query.toLowerCase();
  if (externalMusicSearchCache.has(cacheKey)) {
    return res.json({ success: true, ...externalMusicSearchCache.get(cacheKey), cached: true });
  }

  try {
    const deezerUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=15`;
    const deezerResponse = await fetch(deezerUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Carmusicfree/1.0'
      }
    });

    let tracks = [];
    if (deezerResponse.ok) {
      const deezerData = await deezerResponse.json();
      tracks = (deezerData.data || []).map(normalizeExternalTrack);
    }

    if (tracks.length === 0) {
      tracks = await searchITunesFallback(query);
    }

    const artistMap = new Map();
    tracks.forEach((track, index) => {
      const key = track.artist.toLowerCase();
      if (!artistMap.has(key)) {
        artistMap.set(key, {
          id: `online-artist-${key.replace(/[^a-z0-9]+/gi, '-')}`,
          name: track.artist,
          genre: 'Artista encontrado online',
          photo: track.artistPhoto || track.cover || getArtistPhoto(track.artist),
          songId: track.id,
          songIndex: index,
          isExternal: true
        });
      }
    });

    const payload = {
      tracks,
      artists: Array.from(artistMap.values()),
      source: tracks.some(t => t.source === 'deezer') ? 'deezer' : 'itunes',
      timestamp: Date.now()
    };

    externalMusicSearchCache.set(cacheKey, payload);
    res.json({ success: true, ...payload });
  } catch (err) {
    console.warn('External music search error:', err.message);
    res.status(500).json({ success: false, error: 'No se pudo buscar musica online ahora mismo' });
  }
});

// 2. API: Auto-resolve YouTube official track by title and artist directly without IDs!
app.get('/api/yt/resolve', async (req, res) => {
  const title = (req.query.title || '').trim();
  const artist = (req.query.artist || '').trim();
  if (!title && !artist) {
    return res.status(400).json({ success: false, error: 'Título o artista requerido' });
  }

  const cacheKey = `${artist.toLowerCase()}___${title.toLowerCase()}`.replace(/\s+/g, '_');
  if (ytResolveCache.has(cacheKey)) {
    return res.json({ success: true, videoId: ytResolveCache.get(cacheKey), cached: true });
  }

  const searchQuery = `${artist} ${title} audio oficial`.trim();
  try {
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    const ytRes = await fetch(ytUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    });
    const html = await ytRes.text();
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if (match && match[1]) {
      const videoId = match[1];
      ytResolveCache.set(cacheKey, videoId);
      return res.json({ success: true, videoId });
    }
  } catch (err) {
    console.warn('YouTube auto-resolve error:', err.message);
  }

  // Safe popular audio fallback
  res.json({ success: true, videoId: 'F0rwOsAteXM' });
});

// 2b. API: Search YouTube directly for any song/artist query in real-time
app.get('/api/yt/search', async (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) {
    return res.status(400).json({ success: false, error: 'Término de búsqueda requerido' });
  }

  try {
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    const ytRes = await fetch(ytUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    });
    const html = await ytRes.text();

    const results = [];
    const seenIds = new Set();
    const splitted = html.split('"videoRenderer":');

    for (let i = 1; i < splitted.length && results.length < 12; i++) {
      const chunk = splitted[i].slice(0, 3000);
      const idMatch = chunk.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
      const titleMatch = chunk.match(/"title":\{"runs":\[\{"text":"([^"]+)"/);
      const channelMatch = chunk.match(/"longBylineText":\{"runs":\[\{"text":"([^"]+)"/) || chunk.match(/"shortBylineText":\{"runs":\[\{"text":"([^"]+)"/);
      const timeMatch = chunk.match(/"lengthText":\{"simpleText":"([^"]+)"/) || chunk.match(/"lengthText":\{"accessibility":\{"accessibilityData":\{"label":"[^"]*"\}\},"simpleText":"([^"]+)"/);

      if (idMatch && titleMatch && !seenIds.has(idMatch[1])) {
        const vId = idMatch[1];
        seenIds.add(vId);
        const rawTitle = titleMatch[1].replace(/\\u0026/g, '&').replace(/\\"/g, '"').replace(/\\\\/g, '').trim();
        const channel = channelMatch ? channelMatch[1].replace(/\\u0026/g, '&').trim() : 'Artista';
        const trackTime = timeMatch ? timeMatch[1].trim() : '3:30';

        let artistName = channel;
        let songTitle = rawTitle;

        if (rawTitle.includes(' - ')) {
          const parts = rawTitle.split(' - ');
          artistName = parts[0].trim();
          songTitle = parts.slice(1).join(' - ').replace(/\(Videoclip Oficial\)|\(Video Oficial\)|\(Audio Oficial\)|\(Official Video\)|\(Letra\)|\[.*?\]/gi, '').trim();
        } else {
          songTitle = songTitle.replace(/\(Videoclip Oficial\)|\(Video Oficial\)|\(Audio Oficial\)|\(Official Video\)|\(Letra\)|\[.*?\]/gi, '').trim();
        }

        results.push({
          videoId: vId,
          title: songTitle || rawTitle,
          artist: artistName || channel,
          time: trackTime,
          cover: `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`,
          channel
        });
      }
    }

    res.json({ success: true, results });
  } catch (err) {
    console.warn('YouTube search error:', err.message);
    res.status(500).json({ success: false, error: 'Error al buscar en YouTube' });
  }
});

// 3. API: Server-Sent Events (SSE) Live Feed for instantaneous song drops
app.get('/api/songs/live-feed', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseClients.add(res);

  // Send initial welcome & status
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', totalSongs: liveSongs.length, time: Date.now() })}\n\n`);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// Keep SSE connections alive with heartbeat
setInterval(() => {
  broadcastToClients({ type: 'HEARTBEAT', time: Date.now() });
}, 25000);

// Helper to register and broadcast a newly dropped song
function publishNewSong(songData, source = 'artist_upload') {
  const newId = (liveSongs.length > 0) ? Math.max(...liveSongs.map(s => s.id)) + 1 : 100;
  const newSong = {
    id: newId,
    title: (songData.title || 'Nueva Canción').trim(),
    artist: (songData.artist || 'Artista Destacado').trim(),
    album: (songData.album || 'Sencillo Exclusivo').trim(),
    time: songData.time || '3:30',
    genre: songData.genre || 'pop',
    bpm: Number(songData.bpm) || 120,
    cover: songData.cover || getArtistPhoto(songData.artist),
    fallbackGrad: songData.fallbackGrad || 'linear-gradient(135deg, #ff5436, #2d182e)',
    audioDataUrl: songData.audioDataUrl || null,
    isNew: true,
    uploadedAt: new Date().toISOString(),
    source
  };

  // Add at top of catalog so it appears immediately
  liveSongs.unshift(newSong);

  // Broadcast in real-time to all connected users
  broadcastToClients({
    type: 'NEW_SONG',
    song: newSong,
    message: `¡${newSong.artist} acaba de estrenar "${newSong.title}"!`
  });

  return newSong;
}

// 4. API: Simulate an artist upload drop (can be triggered by button or timer)
app.post('/api/songs/simulate-drop', (req, res) => {
  let dropData;
  if (upcomingArtistDrops.length > 0) {
    dropData = upcomingArtistDrops.shift();
  } else {
    const randomArtists = [
      { name: 'Dani Martín', title: 'Carretera y Manta', genre: 'rock', bpm: 136 },
      { name: 'Pablo Alborán', title: 'Viento en Popa', genre: 'pop', bpm: 102 },
      { name: 'Melendi', title: 'Hijos del Humo', genre: 'pop', bpm: 116 },
      { name: 'Manuel Carrasco', title: 'Desde la Orilla', genre: 'pop', bpm: 110 },
      { name: 'Alejandro Sanz', title: 'Al Alba de Madrid', genre: 'pop', bpm: 95 }
    ];
    const picked = randomArtists[Math.floor(Math.random() * randomArtists.length)];
    dropData = {
      title: `${picked.title} (Estreno 2026)`,
      artist: picked.name,
      album: 'Lanzamiento Exclusivo Carmusicfree',
      time: '3:25',
      genre: picked.genre,
      bpm: picked.bpm,
      cover: getArtistPhoto(picked.name),
      fallbackGrad: 'linear-gradient(135deg, #ff5436, #1a1e2d)'
    };
  }

  const newSong = publishNewSong(dropData, 'radar_auto_drop');
  res.json({ success: true, song: newSong });
});

// Automated live artist drops: Drops a new track every 50 seconds if listeners are online
setInterval(() => {
  if (sseClients.size > 0 && upcomingArtistDrops.length > 0) {
    const dropData = upcomingArtistDrops.shift();
    publishNewSong(dropData, 'radar_auto_drop');
    console.log(`[Auto-Drop Radar] Released: ${dropData.title} by ${dropData.artist}`);
  }
}, 50000);

// Fallback SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
