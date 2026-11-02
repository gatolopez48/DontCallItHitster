import { initData, getAvailableCount, getTotalCount, drawRandomSong, resetData } from './data.js';
import { showScreen, updateStatusUI, showErrorState, updateTimerUI, displaySong } from './ui.js';

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');

async function startApp() {
  try {
    await initData();
    updateStatusUI(getAvailableCount(), getTotalCount());
  } catch (error) {
    console.error("Fehler beim Laden der JSON:", error);
    showErrorState("Fehler: songs.json konnte nicht geladen werden.");
  }
}

function startCountdown() {
  if (getAvailableCount() === 0) {
    alert("Alle Songs wurden bereits gespielt! Setze das Spiel zurück.");
    showScreen('start-screen');
    return;
  }

  showScreen('countdown-screen');
  let timeLeft = 2;
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
  }, 500);
}

function resetGame() {
  const confirmReset = confirm("Möchtest du das Spiel wirklich zurücksetzen? Alle bisher gespielten Songs werden wieder verfügbar.");
  if (confirmReset) {
    resetData();
    location.reload();
  }
}

// Event Listener
startBtn.addEventListener('click', startCountdown);
nextBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetGame);

// App initialisieren
startApp();
