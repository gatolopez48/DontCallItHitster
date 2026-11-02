import { initData, getAvailableCount, getTotalCount, drawRandomSong, resetData } from './data.js';
import { showScreen, updateStatusUI, showErrorState, updateTimerUI, displaySong } from './ui.js';
import { loadSettings, saveSettings } from './settings.js';

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const openSettingsBtn = document.getElementById('open-settings-btn');
const saveSettingsBtn = document.getElementById('save-settings-btn');

async function startApp() {
  try {
    loadSettings(); // Lade gespeicherte Einstellungen vor den Song-Daten
    await initData();
    updateStatusUI(getAvailableCount(), getTotalCount());
  } catch (error) {
    console.error("Fehler beim Laden der JSON:", error);
    showErrorState("Fehler: songs.json konnte nicht geladen werden.");
  }
}

function startCountdown() {
  if (getAvailableCount() === 0) {
    alert("Alle Songs wurden bereits gespielt (oder entsprechen nicht dem Filter)! Setze das Spiel zurück oder passe die Filter an.");
    showScreen('start-screen');
    return;
  }

  showScreen('countdown-screen');
  let timeLeft = 3;
  updateTimerUI(timeLeft);

  const countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      updateTimerUI(timeLeft);
    } else {
      clearInterval(countdownInterval);
      const song = drawRandomSong();
      displaySong(song);
      showScreen('song-screen');
    }
  }, 1000);
}

function resetGame() {
  const confirmReset = confirm("Möchtest du das Spiel wirklich zurücksetzen? Alle bisher gespielten Songs werden wieder verfügbar.");
  if (confirmReset) {
    resetData();
    location.reload();
  }
}

// --- Event Listener ---
startBtn.addEventListener('click', startCountdown);
nextBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetGame);

// Einstellungen öffnen
openSettingsBtn.addEventListener('click', () => {
  showScreen('settings-screen');
});

// Einstellungen speichern und zurück zum Start
saveSettingsBtn.addEventListener('click', async () => {
  const startYear = parseInt(document.getElementById('setting-start-year').value);
  const endYear = parseInt(document.getElementById('setting-end-year').value);
  
  saveSettings({ startYear, endYear });
  
  // Daten anhand der neuen Filter neu laden und UI aktualisieren
  await initData(); 
  updateStatusUI(getAvailableCount(), getTotalCount());
  
  showScreen('start-screen');
});

// App initialisieren
startApp();
