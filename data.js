import { currentSettings } from './settings.js';

const STORAGE_KEY = 'customHitsterPlayedSongs';

let songDB = [];
let availableSongs = [];
let playedSongIds = [];

export async function initData() {
  const response = await fetch('songs.json');
  if (!response.ok) throw new Error('Netzwerk-Fehler oder Datei nicht gefunden');
  const rawSongs = await response.json();

  // Rohe Songdaten in die Datenbank laden
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

  // Gespielte Songs aus dem LocalStorage abrufen
  playedSongIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
  // Songs filtern: Darf noch nicht gespielt sein UND muss im eingestellten Zeitraum liegen
  availableSongs = songDB.filter(song => {
    const notPlayed = !playedSongIds.includes(song.id);
    const inYearRange = song.year >= currentSettings.startYear && song.year <= currentSettings.endYear;
    
    return notPlayed && inYearRange;
  });
}

export function getAvailableCount() {
  return availableSongs.length;
}

export function getTotalCount() {
  // Gibt die Gesamtzahl aller geladenen Songs zurück (unabhängig vom Filter)
  return songDB.length;
}

export function drawRandomSong() {
  if (availableSongs.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableSongs.length);
  const selectedSong = availableSongs[randomIndex];

  // Song aus den verfügbaren entfernen und zu den gespielten hinzufügen
  availableSongs.splice(randomIndex, 1);
  playedSongIds.push(selectedSong.id);
  
  // Gespielte Songs dauerhaft speichern
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playedSongIds));

  return selectedSong;
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
}
