const startScreen = document.getElementById('start-screen');
const countdownScreen = document.getElementById('countdown-screen');
const songScreen = document.getElementById('song-screen');
const settingsScreen = document.getElementById('settings-screen'); // 1. Hier ergänzt!

const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const statusDisplay = document.getElementById('status-display');
const artistDisplay = document.getElementById('artist-display');
const titleDisplay = document.getElementById('title-display');
const yearDisplay = document.getElementById('year-display');
const spotifyBtn = document.getElementById('spotify-btn');

export function showScreen(screenId) {
  // Alle bekannten Screens ausblenden
  startScreen.classList.add('hidden');
  countdownScreen.classList.add('hidden');
  songScreen.classList.add('hidden');
  settingsScreen.classList.add('hidden'); // 2. Hier ergänzt!
  
  // Gewünschten Screen einblenden
  document.getElementById(screenId).classList.remove('hidden');
}

export function updateStatusUI(availableCount, totalCount) {
  statusDisplay.innerText = `Noch ${availableCount} von ${totalCount} Songs verfügbar`;
  if (availableCount > 0) {
    startBtn.innerText = "Spiel starten";
    startBtn.disabled = false;
  } else {
    startBtn.innerText = "Alle Songs gespielt";
    startBtn.disabled = true;
  }
}

export function showErrorState(errorMsg) {
  statusDisplay.innerText = errorMsg;
  startBtn.innerText = "Ladefehler";
}

export function updateTimerUI(timeLeft) {
  timerElement.innerText = timeLeft;
}

export function displaySong(song) {
  artistDisplay.innerText = song.artist;
  titleDisplay.innerText = song.title;
  yearDisplay.innerText = song.year;

  spotifyBtn.onclick = function() {
    window.location.href = song.uri; 
  };
  
  // Optional: Versucht Spotify automatisch zu öffnen
  window.location.href = song.uri;
}
