import { currentSettings } from './settings.js';

const STORAGE_KEY = 'customHitsterPlayedSongs';

let songDB = [];
let availableSongs = [];
let playedSongIds = [];

export async function initData() {
  try {
    const response = await fetch('songs.json');
    if (!response.ok) throw new Error(`Netzwerk-Fehler: ${response.status}`);
    const rawSongs = await response.json();

    // Absicherung: Ist rawSongs wirklich ein Array?
    if (!Array.isArray(rawSongs)) throw new Error('songs.json enthält kein Array');

    songDB = rawSongs.map(song => {
      const uniqueId = (song.artist + song.title).toLowerCase().replace(/[^a-z0-9]/g, '');
      return { 
        id: uniqueId, 
        artist: song.artist, 
        title: song.title, 
        year: Number(song.year), // Sicherstellen, dass es eine Zahl ist
        uri: song.uri 
      };
    });

    // Absicherung: Try-Catch für den LocalStorage
    try {
      playedSongIds = JSON.parse(localStorage.getItem(STORAGE_KEY));
      // Falls der Storage leer war oder kein Array ist, auf [] setzen
      if (!Array.isArray(playedSongIds)) playedSongIds = [];
    } catch (e) {
      console.warn('LocalStorage war korrupt. Gespielte Songs werden zurückgesetzt.', e);
      playedSongIds = [];
    }
    
    // Songs filtern
    availableSongs = songDB.filter(song => {
      const notPlayed = !playedSongIds.includes(song.id);
      
      // Auch bei den Settings sicherstellen, dass wir mit echten Zahlen rechnen
      const start = Number(currentSettings.startYear) || 0;
      const end = Number(currentSettings.endYear) || 9999;
      const inYearRange = song.year >= start && song.year <= end;
      
      return notPlayed && inYearRange;
    });

    console.log(`${availableSongs.length} von ${songDB.length} Songs geladen.`);

  } catch (error) {
    console.error('Kritischer Fehler beim Laden der Songs:', error);
  }
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
  playedSongIds = []; // WICHTIG: Auch den lokalen Array leeren!
}
