const STORAGE_KEY = 'customHitsterPlayedSongs';

let songDB = [];
let availableSongs = [];
let playedSongIds = [];

export async function initData() {
  const response = await fetch('songs.json');
  if (!response.ok) throw new Error('Netzwerk-Fehler oder Datei nicht gefunden');
  const rawSongs = await response.json();

  songDB = rawSongs.map(song => {
    const uniqueId = (song.artist + song.title).toLowerCase().replace(/[^a-z0-9]/g, '');
    return { 
      id: uniqueId, 
      artist: song.artist, 
      title: song.title, 
      year: song.year,
      uri: song.uri 
    };
  });

  playedSongIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  availableSongs = songDB.filter(song => !playedSongIds.includes(song.id));
}

export function getAvailableCount() {
  return availableSongs.length;
}

export function getTotalCount() {
  return songDB.length;
}

export function drawRandomSong() {
  if (availableSongs.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableSongs.length);
  const selectedSong = availableSongs[randomIndex];

  availableSongs.splice(randomIndex, 1);
  playedSongIds.push(selectedSong.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playedSongIds));

  return selectedSong;
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
}
